"""Main pipeline orchestrator — ties detection, smoothing, crop, and render together."""

import cv2
import json
import subprocess
import time
from collections import Counter
from pathlib import Path

import numpy as np

from ..core.config_loader import load_config, get_sample_rate
from ..detection.face_detector import FaceDetector
from ..detection.pose_estimator import PoseEstimator
from ..detection.saliency_detector import SaliencyDetector
from ..detection.signal_fusion import fuse_signals
from ..tracking.temporal_smoother import create_smoother
from ..tracking.deadzone import DeadzoneFilter
from ..crop.crop_calculator import CropCalculator
from ..crop.crop_path_io import (
    CropPath,
    CropKeyframe,
    DetectionStats,
    save_crop_path,
    load_crop_path,
)
from ..crop.crop_renderer import render_with_crop_path
from ..crop.split_renderer import render_split_screen, render_dynamic_podcast
from ..detection.layout_detector import detect_segments, LayoutType
from ..detection.opencv_face_detector import OpenCVFaceDetector
from ..utils.video_info import get_video_info
from ..utils.frame_reader import read_frames, interpolate_positions
from ..utils.scene_detector import SceneDetector


# Screen-share auto-detection threshold
_SCREENSHARE_FACE_PCT_THRESHOLD = 15.0


def _find_webcam_overlay(
    video_path: str,
    config: dict,
    num_samples: int = 10,
) -> dict | None:
    """Scan frame corners to find a small webcam overlay.

    Screen-share recordings typically have a small webcam PiP in one corner.
    This function detects which corner has a face by cropping each corner
    region, upscaling, and running DNN face detection.

    Args:
        video_path: Path to the video file.
        config: Full config dict (needs detection.face section).
        num_samples: Number of frames to sample.

    Returns:
        Face region dict {"x", "y", "w", "h", "conf", "corner"} or None.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return None

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    src_w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    src_h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    # Corner search regions: each covers ~30% of frame from each corner
    # Format: (name, x_start_pct, y_start_pct, width_pct, height_pct)
    corners = [
        ("top-left",     0.00, 0.00, 0.35, 0.35),
        ("top-right",    0.65, 0.00, 0.35, 0.35),
        ("bottom-left",  0.00, 0.65, 0.35, 0.35),
        ("bottom-right", 0.65, 0.65, 0.35, 0.35),
    ]

    # Initialize DNN face detector with lower confidence for small faces
    dnn_config = {**config.get("detection", {}).get("face", {})}
    dnn_config["min_confidence"] = 0.3
    dnn_config["dnn_blob_size"] = 300
    detector = OpenCVFaceDetector(dnn_config)

    # Sample frames evenly
    sample_indices = np.linspace(
        int(total_frames * 0.05),  # skip first 5%
        int(total_frames * 0.95),  # skip last 5%
        num_samples,
        dtype=int,
    )

    # Count face detections per corner
    corner_detections: dict[str, list[dict]] = {c[0]: [] for c in corners}

    print("  Scanning corners for webcam overlay...")

    for frame_idx in sample_indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(frame_idx))
        ret, frame = cap.read()
        if not ret:
            continue

        for name, cx_pct, cy_pct, cw_pct, ch_pct in corners:
            # Crop corner region
            x1 = int(cx_pct * src_w)
            y1 = int(cy_pct * src_h)
            x2 = int((cx_pct + cw_pct) * src_w)
            y2 = int((cy_pct + ch_pct) * src_h)
            corner_crop = frame[y1:y2, x1:x2]

            if corner_crop.size == 0:
                continue

            # Upscale corner for better detection (at least 600px wide)
            crop_h, crop_w = corner_crop.shape[:2]
            scale = max(600 / crop_w, 1.0)
            if scale > 1.0:
                corner_crop = cv2.resize(
                    corner_crop, None, fx=scale, fy=scale,
                    interpolation=cv2.INTER_CUBIC,
                )

            # Detect faces in this corner
            boxes = detector.detect_all(corner_crop, max_faces=1)
            if boxes:
                box = boxes[0]
                # Convert back to full-frame coordinates (normalized 0-1)
                face_x = cx_pct + box.x_center * cw_pct
                face_y = cy_pct + box.y_center * ch_pct
                face_w = box.width * cw_pct
                face_h = box.height * ch_pct
                corner_detections[name].append({
                    "x": face_x,
                    "y": face_y,
                    "w": face_w,
                    "h": face_h,
                    "conf": box.confidence,
                })

    cap.release()

    # Find the corner with the most consistent detections
    best_corner = None
    best_count = 0
    for name, dets in corner_detections.items():
        if len(dets) > best_count:
            best_count = len(dets)
            best_corner = name

    # Need at least 40% of sampled frames to have a face in a corner
    min_detections = max(2, int(num_samples * 0.4))
    if best_corner is None or best_count < min_detections:
        print(f"  No webcam overlay found (best corner: {best_corner}, "
              f"detections: {best_count}/{num_samples})")
        return None

    # Compute median position for the best corner
    dets = corner_detections[best_corner]
    region = {
        "x": float(np.median([d["x"] for d in dets])),
        "y": float(np.median([d["y"] for d in dets])),
        "w": float(np.percentile([d["w"] for d in dets], 90)),
        "h": float(np.percentile([d["h"] for d in dets], 90)),
        "conf": float(np.mean([d["conf"] for d in dets])),
        "corner": best_corner,
    }

    print(f"  Webcam overlay found: {best_corner} "
          f"(detected in {best_count}/{num_samples} frames, "
          f"avg confidence: {region['conf']:.2f})")
    print(f"    Position: ({region['x']:.3f}, {region['y']:.3f}), "
          f"size: ({region['w']:.4f}, {region['h']:.4f})")

    return region


def extract_clip(
    source_video: str,
    output_path: str,
    start_sec: float,
    end_sec: float,
) -> None:
    """Extract a clip from a longer video using FFmpeg stream copy (no re-encode).

    Args:
        source_video: Path to the full-length source video.
        output_path: Where to write the extracted clip.
        start_sec: Start time in seconds.
        end_sec: End time in seconds.
    """
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)

    cmd = [
        "ffmpeg", "-y",
        "-ss", str(start_sec),
        "-to", str(end_sec),
        "-i", source_video,
        "-c", "copy",
        "-avoid_negative_ts", "make_zero",
        output_path,
    ]

    print(f"  Extracting clip: {start_sec:.1f}s - {end_sec:.1f}s")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"FFmpeg extract failed: {result.stderr[:500]}")
    print(f"  Extracted: {output_path}")


def analyze(
    video_path: str,
    config_path: str | None = None,
    output_format: str = "9x16",
    crop_path_output: str | None = None,
) -> CropPath:
    """Run face detection and compute crop path without rendering.

    This is the core of the reframe engine:
    1. Get video metadata
    2. Sample frames at adaptive rate
    3. Run face detection on each sampled frame
    4. Apply temporal smoothing (EMA)
    5. Apply deadzone filter
    6. Compute crop window for each keyframe
    7. Write crop_path.json

    Args:
        video_path: Input video file.
        config_path: Optional path to config.yaml override.
        output_format: "9x16" or "1x1".
        crop_path_output: Where to save crop_path.json (default: next to video).

    Returns:
        CropPath object with all keyframes.
    """
    config = load_config(config_path)
    info = get_video_info(video_path)
    sample_rate = get_sample_rate(config, info.duration)

    print(f"\n[clip-extractor] Analyzing: {video_path}")
    print(f"  Source: {info.width}x{info.height} @ {info.fps:.1f}fps, {info.duration:.1f}s, {info.total_frames} frames")
    print(f"  Sampling: every {sample_rate}th frame ({info.total_frames // sample_rate} samples)")
    print(f"  Output format: {output_format}")

    # Initialize components
    detector = FaceDetector(config["detection"]["face"])
    smoother = create_smoother(config["smoothing"])
    smoother_method = config["smoothing"].get("method", "ema")
    deadzone = DeadzoneFilter(
        threshold_pct=config["deadzone"]["threshold_pct"],
        vertical_threshold_pct=config["deadzone"].get("vertical_threshold_pct"),
    ) if config["deadzone"]["enabled"] else None
    # Split format uses its own renderer; CropCalculator just needs a valid format for the analysis phase
    calc_format = "9x16" if output_format == "split" else output_format
    calculator = CropCalculator(info.width, info.height, calc_format)

    # Phase 2: Optional detectors
    pose_detector = None
    if config["detection"]["pose"].get("enabled", False):
        pose_detector = PoseEstimator(config["detection"]["pose"])
        print(f"  Pose estimation: enabled")

    saliency_detector = None
    if config["detection"]["saliency"].get("enabled", False):
        saliency_detector = SaliencyDetector(config["detection"]["saliency"])
        print(f"  Saliency detection: enabled")

    scene_detector = None
    scene_cfg = config.get("scene_detection", {})
    if scene_cfg.get("enabled", False):
        scene_threshold = scene_cfg.get("threshold", 0.15)
        scene_min_interval = scene_cfg.get("min_interval", 30)
        scene_detector = SceneDetector(threshold=scene_threshold, min_interval=scene_min_interval)
        print(f"  Scene detection: enabled (threshold={scene_threshold}, cooldown={scene_min_interval})")

    fusion_weights = config.get("fusion", {})

    # Detection + Smoothing + Crop computation
    keyframes: list[CropKeyframe] = []
    faces_detected = 0
    poses_detected = 0
    total_confidence = 0.0
    last_known_x = 0.5  # Fallback: center
    last_known_y = 0.5

    start_time = time.time()

    # Phase 5: Split-screen mode needs multi-face detection
    is_split_mode = output_format == "split"
    split_cfg = config.get("split_screen", {})
    min_face_area = split_cfg.get("min_face_size_pct", 0.02)
    dnn_detector = None
    if is_split_mode:
        dnn_detector = OpenCVFaceDetector(config["detection"]["face"])
        print(f"  Split-screen mode: OpenCV DNN face detection enabled")

    for frame_idx, frame in read_frames(video_path, sample_rate=sample_rate):
        # Face detection
        bbox = detector.detect(frame)

        if bbox is not None:
            face_x, face_y = bbox.x_center, bbox.y_center
            confidence = bbox.confidence
            face_detected = True
            faces_detected += 1
            total_confidence += confidence
            last_known_x, last_known_y = face_x, face_y
        else:
            face_x, face_y = last_known_x, last_known_y
            confidence = 0.0
            face_detected = False

        # Phase 5: Multi-face detection for split-screen (using OpenCV DNN)
        all_faces_json = ""
        if is_split_mode and dnn_detector is not None:
            # For 16:9 sources, upscale 2x before detection to catch small Zoom faces
            h, w = frame.shape[:2]
            if w >= 1500:  # Likely 16:9 landscape (1920×1080)
                scale_factor = 2.0
                upscaled = cv2.resize(frame, None, fx=scale_factor, fy=scale_factor,
                                     interpolation=cv2.INTER_CUBIC)
                all_boxes = dnn_detector.detect_all(upscaled, max_faces=3)
                # Scale coordinates back to original frame
                for box in all_boxes:
                    box.x_center /= scale_factor
                    box.y_center /= scale_factor
                    box.width /= scale_factor
                    box.height /= scale_factor
            else:
                all_boxes = dnn_detector.detect_all(frame, max_faces=3)

            all_boxes = [b for b in all_boxes if b.width * b.height >= min_face_area]

            if all_boxes:
                all_faces_json = json.dumps([
                    {"x": round(b.x_center, 4), "y": round(b.y_center, 4),
                     "w": round(b.width, 4), "h": round(b.height, 4),
                     "conf": round(b.confidence, 3)}
                    for b in all_boxes
                ])

        # Phase 2: Pose detection
        pose_bbox = pose_detector.detect(frame) if pose_detector else None
        pose_detected = pose_bbox is not None
        if pose_detected:
            poses_detected += 1

        # Phase 2: Saliency detection
        saliency_bbox = saliency_detector.detect(frame) if saliency_detector else None
        saliency_detected = saliency_bbox is not None

        # Phase 2: Scene change detection — reset smoother on cut
        # Note: deadzone is NOT reset to prevent visible snap/jump
        is_scene_change = False
        if scene_detector is not None:
            is_scene_change = scene_detector.check(frame)
            if is_scene_change:
                smoother.reset()

        # Phase 2: Signal fusion (or Phase 1 face-only path)
        if pose_detector or saliency_detector:
            fused_x, fused_y, fused_conf = fuse_signals(
                face=bbox, pose=pose_bbox, saliency=saliency_bbox,
                weights=fusion_weights, last_known=(last_known_x, last_known_y),
            )
        else:
            fused_x, fused_y = face_x, face_y

        # Apply smoothing
        smooth_x, smooth_y = smoother.smooth(fused_x, fused_y)

        # Apply deadzone
        dz_active = False
        if deadzone is not None:
            final_x, final_y = deadzone.apply(smooth_x, smooth_y)
            dz_active = (final_x != smooth_x or final_y != smooth_y)
        else:
            final_x, final_y = smooth_x, smooth_y

        # Compute crop window
        crop = calculator.compute(final_x, final_y)

        keyframes.append(CropKeyframe(
            frame=frame_idx,
            time_sec=round(frame_idx / info.fps, 3),
            crop_x=crop.x,
            crop_y=crop.y,
            crop_w=crop.width,
            crop_h=crop.height,
            face_detected=face_detected,
            face_confidence=round(confidence, 3),
            face_center_x=round(face_x, 4),
            face_center_y=round(face_y, 4),
            smoothed=True,
            deadzone_active=dz_active,
            pose_detected=pose_detected,
            pose_confidence=round(pose_bbox.confidence, 3) if pose_bbox else 0.0,
            pose_center_x=round(pose_bbox.x_center, 4) if pose_bbox else 0.0,
            pose_center_y=round(pose_bbox.y_center, 4) if pose_bbox else 0.0,
            saliency_detected=saliency_detected,
            saliency_score=round(saliency_bbox.confidence, 3) if saliency_bbox else 0.0,
            saliency_center_x=round(saliency_bbox.x_center, 4) if saliency_bbox else 0.0,
            saliency_center_y=round(saliency_bbox.y_center, 4) if saliency_bbox else 0.0,
            scene_change=is_scene_change,
            smoother_method=smoother_method,
            all_faces=all_faces_json,
        ))

        # Progress
        if len(keyframes) % 50 == 0:
            elapsed = time.time() - start_time
            print(f"  Analyzed {len(keyframes)} frames ({elapsed:.1f}s)", flush=True)

    detector.close()
    if pose_detector:
        pose_detector.close()
    if saliency_detector:
        saliency_detector.close()

    elapsed = time.time() - start_time
    total_sampled = len(keyframes)
    face_pct = (faces_detected / total_sampled * 100) if total_sampled > 0 else 0
    avg_conf = (total_confidence / faces_detected) if faces_detected > 0 else 0

    print(f"\n  Detection complete ({elapsed:.1f}s)")
    print(f"  Frames sampled: {total_sampled}")
    print(f"  Face detected: {faces_detected}/{total_sampled} ({face_pct:.1f}%)")
    print(f"  Avg confidence: {avg_conf:.3f}")
    if pose_detector:
        pose_pct = (poses_detected / total_sampled * 100) if total_sampled > 0 else 0
        print(f"  Pose detected: {poses_detected}/{total_sampled} ({pose_pct:.1f}%)")
    print(f"  Smoother: {smoother_method}")

    # Build crop path
    crop_path = CropPath(
        version="2.0",
        source_file=video_path,
        source_width=info.width,
        source_height=info.height,
        source_fps=info.fps,
        source_total_frames=info.total_frames,
        output_format=output_format,
        output_crop_w=calculator.crop_w,
        output_crop_h=calculator.crop_h,
        config_used=config_path or "default",
        detection_stats=DetectionStats(
            frames_sampled=total_sampled,
            faces_detected=faces_detected,
            face_detected_pct=round(face_pct, 1),
            avg_confidence=round(avg_conf, 3),
            sampling_rate=sample_rate,
            interpolated_frames=info.total_frames - total_sampled,
        ),
        keyframes=keyframes,
    )

    # Save crop path
    if crop_path_output is None:
        crop_path_output = str(Path(video_path).parent / "crop_path.json")

    save_crop_path(crop_path, crop_path_output)
    print(f"  Crop path saved: {crop_path_output}")

    return crop_path


def reframe(
    video_path: str,
    output_path: str,
    config_path: str | None = None,
    output_format: str = "9x16",
    start_sec: float | None = None,
    end_sec: float | None = None,
) -> str:
    """Full reframe pipeline: extract (optional) -> analyze -> render.

    Args:
        video_path: Input video (full source or pre-cut clip).
        output_path: Output directory for all artifacts.
        config_path: Optional config.yaml override.
        output_format: "9x16" or "1x1".
        start_sec: If provided, extract a clip first.
        end_sec: If provided, extract a clip first.

    Returns:
        Path to the final reframed video.
    """
    out_dir = Path(output_path)
    out_dir.mkdir(parents=True, exist_ok=True)
    config = load_config(config_path)

    # Step 1: Extract clip if start/end provided
    if start_sec is not None and end_sec is not None:
        raw_path = str(out_dir / "raw.mp4")
        extract_clip(video_path, raw_path, start_sec, end_sec)
        clip_path = raw_path
    else:
        clip_path = video_path

    # Step 2: Analyze (detect faces, compute crop path)
    crop_path_file = str(out_dir / "crop_path.json")
    crop_path = analyze(
        video_path=clip_path,
        config_path=config_path,
        output_format=output_format,
        crop_path_output=crop_path_file,
    )

    # Step 2.5a: Dynamic layout detection for split-screen mode
    layout_segments = []
    use_dynamic_layout = False

    if output_format == "split":
        dynamic_cfg = config.get("split_screen", {}).get("dynamic_layout", {})
        if dynamic_cfg.get("enabled", True):
            print(f"\n[clip-extractor] Detecting layout segments...")
            layout_segments = detect_segments(
                crop_path.keyframes, crop_path.source_fps, dynamic_cfg,
            )

            if layout_segments:
                # Check if we have mixed layouts (both split-screen and close-up)
                layout_types = set(seg.layout for seg in layout_segments)
                has_mixed = len(layout_types) > 1

                print(f"  Found {len(layout_segments)} segments:")
                for seg in layout_segments:
                    dur = seg.end_sec - seg.start_sec
                    print(f"    {seg.layout.value}: {seg.start_sec:.1f}s - {seg.end_sec:.1f}s ({dur:.1f}s)")

                if has_mixed:
                    use_dynamic_layout = True
                    # Store segments in crop_path for persistence
                    crop_path.layout_segments = [
                        {
                            "layout": seg.layout.value,
                            "start_frame": seg.start_frame,
                            "end_frame": seg.end_frame,
                            "start_sec": round(seg.start_sec, 3),
                            "end_sec": round(seg.end_sec, 3),
                        }
                        for seg in layout_segments
                    ]
                    save_crop_path(crop_path, crop_path_file)
                    print(f"  Mixed layouts detected -- using dynamic renderer")
                else:
                    layout_name = layout_segments[0].layout.value
                    print(f"  All segments are {layout_name} -- using standard renderer")

    # Step 2.5b: Auto-detect screen-share mode (only for non-split formats)
    face_pct = crop_path.detection_stats.face_detected_pct
    use_screenshare_split = False
    webcam_region = None

    if output_format == "9x16" and face_pct < _SCREENSHARE_FACE_PCT_THRESHOLD:
        print(f"\n[clip-extractor] Low face detection ({face_pct:.1f}%) — "
              f"checking for screen-share layout...")
        webcam_region = _find_webcam_overlay(clip_path, config)
        if webcam_region is not None:
            use_screenshare_split = True
            print(f"  Auto-switching to screen-share split layout")

    # Step 3: Render
    suffix = output_format.replace("x", "x")
    final_path = str(out_dir / f"reframed-{suffix}.mp4")

    print(f"\n[clip-extractor] Rendering: {final_path}")

    if use_dynamic_layout and layout_segments:
        render_dynamic_podcast(
            video_path=clip_path,
            crop_path=crop_path,
            output_path=final_path,
            config=config,
            layout_segments=layout_segments,
        )
    elif output_format == "split" or use_screenshare_split:
        render_split_screen(
            video_path=clip_path,
            crop_path=crop_path,
            output_path=final_path,
            config=config,
            face_regions_override=[webcam_region] if webcam_region else None,
        )
    else:
        render_with_crop_path(
            video_path=clip_path,
            crop_path=crop_path,
            output_path=final_path,
            config=config["output"],
        )

    return final_path


def render_from_crop_path(
    video_path: str,
    crop_path_file: str,
    output_path: str,
    config_path: str | None = None,
) -> str:
    """Render using a pre-existing (possibly manually edited) crop_path.json.

    Args:
        video_path: Input video file.
        crop_path_file: Path to crop_path.json.
        output_path: Output video path.
        config_path: Optional config.yaml override.

    Returns:
        Path to the rendered video.
    """
    config = load_config(config_path)
    crop_path = load_crop_path(crop_path_file)

    print(f"\n[clip-extractor] Rendering from crop path: {crop_path_file}")
    render_with_crop_path(
        video_path=video_path,
        crop_path=crop_path,
        output_path=output_path,
        config=config["output"],
    )

    return output_path
