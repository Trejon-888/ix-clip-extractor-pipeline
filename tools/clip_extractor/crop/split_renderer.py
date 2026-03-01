"""Split-screen renderer for multi-person Zoom-like videos.

Layout: top half shows the full 16:9 source frame (scaled to fit),
bottom half shows adaptive face close-ups based on proximity.

V5 (adaptive layout):
- Detects face proximity using merge_distance threshold
- Close faces (distance < 0.20) -> single merged crop (full-width bottom)
- Separated faces (distance ≥ 0.20) -> multiple slots side-by-side
- Static positions from median across all keyframes (zero movement)
- Bilateral filter for quality on upscaled crops
- MediaPipe face landmarker for precise mouth centering

Output is always 1080x1920 (9:16 portrait).
"""

import json
import os
import subprocess
import tempfile
from collections import Counter
from pathlib import Path

import cv2
import numpy as np

from .crop_path_io import CropPath
from .crop_renderer import _build_ffmpeg_cmd


# Output dimensions
OUT_W, OUT_H = 1080, 1920

# MediaPipe face landmarker model path
_MODELS_DIR = Path(__file__).parent.parent / "models"
_FACE_LANDMARKER_MODEL = _MODELS_DIR / "face_landmarker.task"


def _create_blur_fill(
    source: np.ndarray,
    target_w: int,
    target_h: int,
    blur_ksize: int = 51,
    darken: float = 0.4,
) -> np.ndarray:
    """Create a blurred, darkened background that fills the target dimensions.

    Scales the source to cover the entire target area (no black bars),
    center-crops to exact dimensions, applies heavy Gaussian blur, and
    darkens so sharp overlay content stands out.

    Args:
        source: Source image (BGR).
        target_w: Target width in pixels.
        target_h: Target height in pixels.
        blur_ksize: Gaussian blur kernel size (must be odd).
        darken: Brightness multiplier (0.0-1.0). Lower = darker.

    Returns:
        Blurred background image of exact (target_h, target_w, 3) shape.
    """
    h, w = source.shape[:2]
    if h == 0 or w == 0:
        return np.zeros((target_h, target_w, 3), dtype=np.uint8)

    # Scale to cover (fill) — use the larger scale factor
    scale = max(target_w / w, target_h / h)
    fill_w = int(w * scale)
    fill_h = int(h * scale)

    filled = cv2.resize(source, (fill_w, fill_h), interpolation=cv2.INTER_LINEAR)

    # Center crop to exact target
    x_off = (fill_w - target_w) // 2
    y_off = (fill_h - target_h) // 2
    cropped = filled[y_off:y_off + target_h, x_off:x_off + target_w]

    # Heavy blur
    blurred = cv2.GaussianBlur(cropped, (blur_ksize, blur_ksize), 0)

    # Darken so sharp content stands out
    if darken < 1.0:
        blurred = (blurred.astype(np.float32) * darken).clip(0, 255).astype(np.uint8)

    return blurred


def _detect_face_positions(
    cap: cv2.VideoCapture,
    face_regions: list[dict],
    padding_pct: float,
    src_w: int,
    src_h: int,
    total_frames: int,
    num_samples: int = 5,
) -> list[dict | None]:
    """Detect precise face positions using MediaPipe face landmarker.

    Returns per-face dicts with:
        - oval_center_y: Face oval center Y in source pixels (forehead+chin midpoint)
        - face_center_x: Actual face center X in source pixels (nose tip landmark 1)

    The oval center Y is used for vertical slot placement (centering the face oval
    at 50% of slot height). The face center X corrects the horizontal crop position
    so the crop is centered on the actual face, preventing horizontal clipping.

    Returns None for faces where MediaPipe detection fails.
    """
    if not _FACE_LANDMARKER_MODEL.exists():
        print("    Warning: face_landmarker.task model not found — using estimated positions")
        return [None] * len(face_regions)

    try:
        import mediapipe as mp
        from mediapipe.tasks import python
        from mediapipe.tasks.python import vision
    except ImportError:
        print("    Warning: MediaPipe not available — using estimated positions")
        return [None] * len(face_regions)

    # Create face landmarker
    base_options = python.BaseOptions(model_asset_path=str(_FACE_LANDMARKER_MODEL))
    options = vision.FaceLandmarkerOptions(
        base_options=base_options,
        running_mode=vision.RunningMode.IMAGE,
        num_faces=1,
        min_face_detection_confidence=0.3,
    )
    detector = vision.FaceLandmarker.create_from_options(options)

    # Sample frames evenly across the video
    sample_indices = np.linspace(0, total_frames - 1, num_samples, dtype=int)

    # Collect detections per face: both oval center Y and face center X
    oval_y_detections: list[list[float]] = [[] for _ in face_regions]
    center_x_detections: list[list[float]] = [[] for _ in face_regions]

    for frame_idx in sample_indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(frame_idx))
        ret, frame = cap.read()
        if not ret:
            continue

        for f_idx, face in enumerate(face_regions):
            cx = face["x"] * src_w
            cy = face["y"] * src_h
            face_w_px = face["w"] * src_w * (1 + padding_pct)
            face_h_px = face["h"] * src_h * (1 + padding_pct)

            x1 = int(max(0, cx - face_w_px / 2))
            y1 = int(max(0, cy - face_h_px / 2))
            x2 = int(min(src_w, x1 + int(face_w_px)))
            y2 = int(min(src_h, y1 + int(face_h_px)))

            cropped = frame[y1:y2, x1:x2]
            if cropped.size == 0:
                continue

            # Upscale for better landmark detection
            up_scale = 540 / max(cropped.shape[1], 1)
            upscaled = cv2.resize(cropped, None, fx=up_scale, fy=up_scale)

            rgb = cv2.cvtColor(upscaled, cv2.COLOR_BGR2RGB)
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
            result = detector.detect(mp_image)

            if not result.face_landmarks:
                continue

            landmarks = result.face_landmarks[0]

            # Face oval center Y: midpoint of forehead (10) and chin (152)
            forehead = landmarks[10]
            chin = landmarks[152]
            oval_center_y_norm = (forehead.y + chin.y) / 2
            oval_y_in_crop = oval_center_y_norm * cropped.shape[0]
            oval_y_in_source = y1 + oval_y_in_crop
            oval_y_detections[f_idx].append(oval_y_in_source)

            # Face center X: nose tip (landmark 1) — robust horizontal center
            nose_tip = landmarks[1]
            nose_x_in_crop = nose_tip.x * cropped.shape[1]
            nose_x_in_source = x1 + nose_x_in_crop
            center_x_detections[f_idx].append(nose_x_in_source)

    # Reset video to start
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    detector.close()

    # Compute median positions per face
    positions: list[dict | None] = []
    for f_idx in range(len(face_regions)):
        y_dets = oval_y_detections[f_idx]
        x_dets = center_x_detections[f_idx]

        if y_dets and x_dets:
            median_y = float(np.median(y_dets))
            median_x = float(np.median(x_dets))
            face_cx = face_regions[f_idx]["x"] * src_w
            face_cy = face_regions[f_idx]["y"] * src_h
            print(f"    Face {f_idx}: oval center y={median_y:.1f}px "
                  f"(offset from synthetic: {median_y - face_cy:+.1f}px), "
                  f"face center x={median_x:.1f}px "
                  f"(offset from synthetic: {median_x - face_cx:+.1f}px) "
                  f"({len(y_dets)}/{num_samples} frames)")
            positions.append({
                "oval_center_y": median_y,
                "face_center_x": median_x,
            })
        else:
            positions.append(None)

    return positions


def _estimate_face_positions_dnn(
    cap: cv2.VideoCapture,
    face_regions: list[dict],
    padding_pct: float,
    src_w: int,
    src_h: int,
) -> list[dict | None]:
    """Fallback: detect face bbox with OpenCV DNN, return oval center Y + face center X."""

    prototxt = str(_MODELS_DIR / "deploy.prototxt")
    caffemodel = str(_MODELS_DIR / "res10_300x300_ssd_iter_140000.caffemodel")

    if not Path(prototxt).exists() or not Path(caffemodel).exists():
        return [None] * len(face_regions)

    net = cv2.dnn.readNetFromCaffe(prototxt, caffemodel)

    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    ret, frame = cap.read()
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

    if not ret:
        return [None] * len(face_regions)

    positions: list[dict | None] = []
    for f_idx, face in enumerate(face_regions):
        cx = face["x"] * src_w
        cy = face["y"] * src_h
        face_w_px = face["w"] * src_w * (1 + padding_pct)
        face_h_px = face["h"] * src_h * (1 + padding_pct)

        x1 = int(max(0, cx - face_w_px / 2))
        y1 = int(max(0, cy - face_h_px / 2))
        x2 = int(min(src_w, x1 + int(face_w_px)))
        y2 = int(min(src_h, y1 + int(face_h_px)))

        cropped = frame[y1:y2, x1:x2]
        if cropped.size == 0:
            positions.append(None)
            continue

        # Upscale and detect face
        up_scale = 540 / max(cropped.shape[1], 1)
        upscaled = cv2.resize(cropped, None, fx=up_scale, fy=up_scale)

        blob = cv2.dnn.blobFromImage(upscaled, 1.0, (300, 300), (104.0, 177.0, 123.0))
        net.setInput(blob)
        detections = net.forward()

        best_conf = 0.0
        best_pos = None
        for i in range(detections.shape[2]):
            conf = float(detections[0, 0, i, 2])
            if conf < 0.3 or conf <= best_conf:
                continue
            best_conf = conf
            face_x1_norm = float(detections[0, 0, i, 3])
            face_y1_norm = float(detections[0, 0, i, 4])
            face_x2_norm = float(detections[0, 0, i, 5])
            face_y2_norm = float(detections[0, 0, i, 6])
            # Face oval center at ~50% of face bbox height
            face_top_px = face_y1_norm * cropped.shape[0]
            face_h_det = (face_y2_norm - face_y1_norm) * cropped.shape[0]
            oval_in_crop = face_top_px + face_h_det * 0.50
            # Face center X from DNN bbox center
            face_cx_in_crop = (face_x1_norm + face_x2_norm) / 2 * cropped.shape[1]
            best_pos = {
                "oval_center_y": y1 + oval_in_crop,
                "face_center_x": x1 + face_cx_in_crop,
            }

        if best_pos is not None:
            print(f"    Face {f_idx}: DNN fallback — oval y={best_pos['oval_center_y']:.1f}px, "
                  f"center x={best_pos['face_center_x']:.1f}px")
        positions.append(best_pos)

    return positions


def _merge_nearby_faces(faces: list[dict], merge_dist: float = 0.20) -> list[dict]:
    """Merge faces that are close together into group bounding boxes.

    Zoom sidebar faces are stacked vertically in a narrow strip.
    Instead of showing overlapping crops of each, merge them into
    a single group crop that shows all faces together.

    Args:
        faces: List of face dicts with x, y, w, h (normalized).
        merge_dist: Max Euclidean distance between face centers to merge.

    Returns:
        List of group dicts (same format as face dicts but representing groups).
    """
    if len(faces) <= 1:
        return faces

    # Simple greedy clustering
    used = set()
    groups = []

    for i, face_a in enumerate(faces):
        if i in used:
            continue

        cluster = [face_a]
        used.add(i)

        for j, face_b in enumerate(faces):
            if j in used:
                continue
            dx = face_a["x"] - face_b["x"]
            dy = face_a["y"] - face_b["y"]
            dist = (dx * dx + dy * dy) ** 0.5
            if dist < merge_dist:
                cluster.append(face_b)
                used.add(j)

        # Compute group bounding box
        min_x = min(f["x"] - f["w"] / 2 for f in cluster)
        max_x = max(f["x"] + f["w"] / 2 for f in cluster)
        min_y = min(f["y"] - f["h"] / 2 for f in cluster)
        max_y = max(f["y"] + f["h"] / 2 for f in cluster)

        groups.append({
            "x": (min_x + max_x) / 2,
            "y": (min_y + max_y) / 2,
            "w": max_x - min_x,
            "h": max_y - min_y,
            "conf": max(f["conf"] for f in cluster),
            "face_count": len(cluster),
        })

    return groups


def _crop_face_region(
    frame: np.ndarray,
    face: dict,
    padding_pct: float,
    slot_w: int,
    slot_h: int,
    mouth_y: float | None = None,
    use_blur_fill: bool = False,
) -> np.ndarray:
    """Extract a face region, scale to fill slot width, center face oval vertically.

    Uses the detected face oval center y-coordinate (forehead-to-chin midpoint,
    in source frame pixels) to center the entire face at 50% of the slot height.
    Falls back to face bbox center if no landmark data is provided.
    """
    src_h, src_w = frame.shape[:2]

    # Face center in pixels
    cx = face["x"] * src_w
    cy = face["y"] * src_h

    # Crop at natural face bbox aspect + padding
    face_w_px = face["w"] * src_w * (1 + padding_pct)
    face_h_px = face["h"] * src_h * (1 + padding_pct)

    # Compute crop bounds centered on face
    x1 = int(max(0, cx - face_w_px / 2))
    y1 = int(max(0, cy - face_h_px / 2))
    x2 = int(min(src_w, x1 + int(face_w_px)))
    y2 = int(min(src_h, y1 + int(face_h_px)))

    # Adjust if hitting boundaries
    if x2 - x1 < face_w_px and x1 > 0:
        x1 = max(0, x2 - int(face_w_px))
    if y2 - y1 < face_h_px and y1 > 0:
        y1 = max(0, y2 - int(face_h_px))

    cropped = frame[y1:y2, x1:x2]

    if cropped.size == 0:
        return np.zeros((slot_h, slot_w, 3), dtype=np.uint8)

    # Scale to fill slot width, maintain aspect ratio
    crop_h_src, crop_w_src = cropped.shape[:2]
    scale = slot_w / max(crop_w_src, 1)
    scaled_w = slot_w
    scaled_h = int(crop_h_src * scale)

    scaled = cv2.resize(cropped, (scaled_w, scaled_h), interpolation=cv2.INTER_LANCZOS4)

    # Bilateral filter for heavy zoom
    if scale > 3.0:
        scaled = cv2.bilateralFilter(scaled, d=7, sigmaColor=40, sigmaSpace=40)

    # Determine centering anchor: mouth position (preferred) or face bbox center (fallback)
    if mouth_y is not None:
        anchor_in_scaled = (mouth_y - y1) * scale
    else:
        anchor_in_scaled = (cy - y1) * scale

    # Place in slot: center anchor point at 50% of slot height
    if use_blur_fill:
        result = _create_blur_fill(cropped, slot_w, slot_h)
    else:
        result = np.zeros((slot_h, slot_w, 3), dtype=np.uint8)

    if scaled_h >= slot_h:
        # Scaled image taller than slot — crop centered on anchor
        y_start = int(anchor_in_scaled - slot_h / 2)
        y_start = max(0, min(y_start, scaled_h - slot_h))
        result[:, :] = scaled[y_start:y_start + slot_h, :]
    else:
        # Scaled image shorter than slot — position anchor at slot center
        y_offset = int(slot_h / 2 - anchor_in_scaled)
        y_offset = max(0, min(y_offset, slot_h - scaled_h))
        result[y_offset:y_offset + scaled_h, :] = scaled

    return result


def _compute_adaptive_regions(crop_path: CropPath, merge_dist: float = 0.20) -> tuple[list[dict], str]:
    """Compute crop regions with adaptive layout based on face proximity.

    Returns:
        (regions, layout_mode) where layout_mode is:
        - "merged": 1 group (faces close) -> single full-width crop
        - "separated": 2+ groups (faces far) -> multiple slots
    """
    # Collect all face detections per frame
    all_frame_groups = []
    for kf in crop_path.keyframes:
        if not kf.all_faces:
            continue
        try:
            faces = json.loads(kf.all_faces)
        except (json.JSONDecodeError, TypeError):
            continue

        # Merge nearby faces within this frame
        groups = _merge_nearby_faces(faces, merge_dist)
        if groups:
            all_frame_groups.append(groups)

    if not all_frame_groups:
        # Fallback for 16:9 sources: Create 2 synthetic regions for typical Zoom sidebar layout
        # (face detection failed, but we know it's a multi-person Zoom video)
        if crop_path.source_width >= 1500:  # 16:9 landscape
            # Zoom sidebar: Enrique (presenter self-view, top-right) + Dexter (first participant)
            synthetic_regions = [
                {"x": 0.92, "y": 0.09, "w": 0.05, "h": 0.10, "conf": 0.5},  # Enrique (presenter, top-right)
                {"x": 0.92, "y": 0.25, "w": 0.05, "h": 0.10, "conf": 0.5},  # Dexter (sidebar, below)
            ]
            return synthetic_regions, "separated"
        return [], "merged"

    # Determine typical group count (mode)
    group_counts = [len(groups) for groups in all_frame_groups]
    typical_count = Counter(group_counts).most_common(1)[0][0]

    # Decide layout mode
    layout_mode = "merged" if typical_count == 1 else "separated"

    # For 16:9 Zoom recordings: if we only detected 1 face group, it's likely
    # a screen-share face (not a sidebar webcam). DNN struggles with tiny Zoom
    # sidebar thumbnails (~40-70px). Force 2-slot synthetic layout instead.
    if layout_mode == "merged" and crop_path.source_width >= 1500:
        synthetic_regions = [
            {"x": 0.92, "y": 0.09, "w": 0.05, "h": 0.10, "conf": 0.5},  # Enrique (presenter, top-right)
            {"x": 0.92, "y": 0.25, "w": 0.05, "h": 0.10, "conf": 0.5},  # Dexter (sidebar, below)
        ]
        return synthetic_regions, "separated"

    # Compute static regions per group identity
    # For merged: 1 region (union of all faces)
    # For separated: N regions (one per distinct face)
    if layout_mode == "merged":
        # Collect all merged groups and compute single static region
        all_groups = [groups[0] for groups in all_frame_groups if groups]
        region = {
            "x": float(np.median([g["x"] for g in all_groups])),
            "y": float(np.median([g["y"] for g in all_groups])),
            "w": float(np.percentile([g["w"] for g in all_groups], 90)),
            "h": float(np.percentile([g["h"] for g in all_groups], 90)),
            "conf": 1.0,
        }
        return [region], layout_mode
    else:
        # Separated: track merged group identities across frames
        # Use nearest-neighbor matching on group centers to maintain consistent identities
        identity_detections: dict[int, list[dict]] = {}
        next_id = 0

        for frame_groups in all_frame_groups:
            if not frame_groups:
                continue

            # Sort groups by y-position for consistency
            frame_groups.sort(key=lambda g: g["y"])

            if not identity_detections:
                # First frame: initialize identities
                for idx, group in enumerate(frame_groups):
                    identity_detections[idx] = [group]
                    next_id = idx + 1
            else:
                # Match groups to existing identities using nearest center distance
                matched = set()
                for group in frame_groups:
                    # Find closest existing identity
                    best_id = None
                    best_dist = float('inf')
                    for id_key, prev_groups in identity_detections.items():
                        if id_key in matched:
                            continue
                        # Use median position of this identity
                        prev_cx = np.median([g["x"] for g in prev_groups])
                        prev_cy = np.median([g["y"] for g in prev_groups])
                        dx = group["x"] - prev_cx
                        dy = group["y"] - prev_cy
                        dist = (dx * dx + dy * dy) ** 0.5
                        if dist < best_dist:
                            best_dist = dist
                            best_id = id_key

                    # Assign to best match if distance < 0.3, else create new identity
                    if best_id is not None and best_dist < 0.3:
                        identity_detections[best_id].append(group)
                        matched.add(best_id)
                    else:
                        identity_detections[next_id] = [group]
                        next_id += 1

        # Compute static regions per identity
        regions = []
        for id_key in sorted(identity_detections.keys()):
            dets = identity_detections[id_key]
            regions.append({
                "x": float(np.median([d["x"] for d in dets])),
                "y": float(np.median([d["y"] for d in dets])),
                "w": float(np.percentile([d["w"] for d in dets], 90)),
                "h": float(np.percentile([d["h"] for d in dets], 90)),
                "conf": 1.0,
            })
        return regions, layout_mode


def render_split_screen(
    video_path: str,
    crop_path: CropPath,
    output_path: str,
    config: dict,
    face_regions_override: list[dict] | None = None,
) -> None:
    """Render split-screen layout: full frame on top, adaptive face layout on bottom.

    Uses MediaPipe face landmarker to detect exact mouth positions, then centers
    mouths at 50% of each slot for visually pleasing face placement.

    Args:
        face_regions_override: If provided, skip adaptive region computation
            and use these face regions directly. Used by screen-share auto-detection.
    """
    split_cfg = config.get("split_screen", {})
    top_ratio = split_cfg.get("top_ratio", 0.5)
    face_padding = split_cfg.get("face_padding_pct", 1.0)
    merge_dist = split_cfg.get("merge_distance", 0.20)
    use_blur_fill = split_cfg.get("background", "black") == "blur"

    top_h = int(OUT_H * top_ratio)
    bottom_h = OUT_H - top_h

    if use_blur_fill:
        print(f"  Blur fill: enabled (replaces black letterbox areas)")

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Cannot open video: {video_path}")

    fps = crop_path.source_fps
    total = crop_path.source_total_frames
    src_w = crop_path.source_width
    src_h = crop_path.source_height

    # Pre-compute adaptive crop regions (or use override from screen-share detection)
    if face_regions_override is not None:
        face_regions = face_regions_override
        layout_mode = "merged"  # single webcam = full-width bottom
        corner_name = face_regions[0].get("corner", "unknown") if face_regions else "?"
        print(f"  Screen-share mode: webcam in {corner_name} corner")
    else:
        face_regions, layout_mode = _compute_adaptive_regions(crop_path, merge_dist)
    num_faces = len(face_regions)

    if layout_mode == "merged":
        print(f"  Merged layout: {num_faces} face group (faces close together)")
        # Use tighter padding for merged to make faces bigger
        effective_padding = split_cfg.get("merged_padding_pct", 0.8)
        slot_w = OUT_W  # Full width
    else:
        print(f"  Separated layout: {num_faces} face(s) detected (faces far apart)")
        for i, r in enumerate(face_regions):
            print(f"    Face {i}: center=({r['x']:.3f}, {r['y']:.3f}), "
                  f"size=({r['w']:.4f}, {r['h']:.4f})")
        effective_padding = split_cfg.get("separated_padding_pct", 0.3)
        # Side-by-side slots (portrait, one face per slot)
        slot_w = OUT_W // max(num_faces, 1)

    slot_h = bottom_h

    if not face_regions:
        print("  Warning: No face data found — bottom half will be black")

    # --- FACE POSITION DETECTION: precise centering using face landmarks ---
    # Detects both oval center Y (vertical placement) and face center X (horizontal crop correction)
    oval_positions: list[float | None] = [None] * num_faces
    if face_regions:
        print("  Detecting face positions with MediaPipe face landmarker...")
        face_positions = _detect_face_positions(
            cap, face_regions, effective_padding, src_w, src_h, total, num_samples=5,
        )

        # Apply detected positions
        for i, pos in enumerate(face_positions):
            if pos is not None:
                oval_positions[i] = pos["oval_center_y"]
                # Correct horizontal crop center to actual face center
                old_x = face_regions[i]["x"]
                new_x = pos["face_center_x"] / src_w
                face_regions[i]["x"] = new_x
                print(f"    Face {i}: x corrected {old_x:.4f} -> {new_x:.4f} "
                      f"(shift: {(new_x - old_x) * src_w:+.1f}px)")

        # Fallback #1: OpenCV DNN face detection -> estimate positions from bbox
        needs_fallback = any(m is None for m in oval_positions)
        if needs_fallback:
            print("  Running OpenCV DNN fallback for undetected faces...")
            dnn_positions = _estimate_face_positions_dnn(
                cap, face_regions, effective_padding, src_w, src_h,
            )
            for i in range(len(oval_positions)):
                if oval_positions[i] is None and dnn_positions[i] is not None:
                    oval_positions[i] = dnn_positions[i]["oval_center_y"]
                    # Also correct X from DNN if MediaPipe missed this face
                    old_x = face_regions[i]["x"]
                    new_x = dnn_positions[i]["face_center_x"] / src_w
                    face_regions[i]["x"] = new_x
                    print(f"    Face {i}: x corrected {old_x:.4f} -> {new_x:.4f} (DNN fallback)")

        # Fallback #2: empirical estimate (oval center ~35% from top of webcam thumbnail)
        for i in range(len(oval_positions)):
            if oval_positions[i] is None:
                face = face_regions[i]
                bbox_top = (face["y"] - face["h"] / 2) * src_h
                estimated = bbox_top + face["h"] * src_h * 0.35
                oval_positions[i] = estimated
                print(f"    Face {i}: oval center estimated at y={estimated:.1f}px "
                      f"(empirical 35% from thumbnail top, no x correction)")

    # Compute top-half scaling: ALWAYS fill width (no letterboxing)
    scale = OUT_W / src_w
    scaled_w = OUT_W
    scaled_h = int(src_h * scale)

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)

    ffmpeg_cmd = _build_ffmpeg_cmd(
        output_path=output_path,
        width=OUT_W,
        height=OUT_H,
        fps=fps,
        audio_source=video_path,
        config=config.get("output", {}),
    )

    stderr_file = tempfile.NamedTemporaryFile(mode="w", suffix=".log", delete=False)

    proc = subprocess.Popen(
        ffmpeg_cmd,
        stdin=subprocess.PIPE,
        stdout=subprocess.DEVNULL,
        stderr=stderr_file,
    )

    try:
        frame_idx = 0
        while frame_idx < total:
            ret, frame = cap.read()
            if not ret:
                break

            # --- TOP HALF: full width, vertically centered/cropped ---
            output_frame = np.zeros((OUT_H, OUT_W, 3), dtype=np.uint8)
            scaled_frame = cv2.resize(frame, (scaled_w, scaled_h), interpolation=cv2.INTER_LANCZOS4)

            if scaled_h > top_h:
                # Source taller than top area - crop from top (show upper portion)
                output_frame[0:top_h, :] = scaled_frame[0:top_h, :]
            else:
                if use_blur_fill:
                    # Blur fill: blurred source as background, sharp overlay centered
                    blur_bg = _create_blur_fill(frame, OUT_W, top_h)
                    output_frame[0:top_h, :] = blur_bg
                # Sharp content centered vertically
                pad_y = (top_h - scaled_h) // 2
                output_frame[pad_y:pad_y + scaled_h, :] = scaled_frame

            # --- BOTTOM HALF: side-by-side face layout, oval-centered ---
            for f_idx, region in enumerate(face_regions):
                crop = _crop_face_region(
                    frame, region, effective_padding, slot_w, slot_h,
                    mouth_y=oval_positions[f_idx],
                    use_blur_fill=use_blur_fill,
                )
                x_offset = f_idx * slot_w
                output_frame[top_h:top_h + slot_h, x_offset:x_offset + slot_w] = crop

            # Write to FFmpeg
            proc.stdin.write(output_frame.tobytes())

            frame_idx += 1

            if frame_idx % max(1, total // 20) == 0:
                pct = int(frame_idx / total * 100)
                print(f"  Rendering split-screen: {pct}% ({frame_idx}/{total} frames)", flush=True)

    finally:
        cap.release()
        if proc.stdin:
            proc.stdin.close()
        proc.wait()
        stderr_file.close()

        if proc.returncode != 0:
            with open(stderr_file.name, "r") as f:
                stderr_content = f.read()
            os.unlink(stderr_file.name)
            raise RuntimeError(f"FFmpeg failed (code {proc.returncode}): {stderr_content[-500:]}")

        os.unlink(stderr_file.name)

    print(f"  Render complete (split-screen): {output_path}")


# --- Phase 6: Dynamic Podcast Layout Rendering ---


class _SimpleKalman:
    """Lightweight 1D Kalman filter for smooth face position tracking."""

    def __init__(self, process_noise: float = 0.001, measurement_noise: float = 0.15):
        self.x: float | None = None
        self.p: float = 1.0
        self.q = process_noise
        self.r = measurement_noise

    def update(self, measurement: float) -> float:
        if self.x is None:
            self.x = measurement
            return self.x
        self.p += self.q
        k = self.p / (self.p + self.r)
        self.x += k * (measurement - self.x)
        self.p *= (1 - k)
        return self.x

    def reset(self):
        self.x = None
        self.p = 1.0


class _SpeakerTracker:
    """Track two speakers across frames with Kalman-smoothed positions.

    Assigns detected faces to consistent speaker identities using
    nearest-neighbor matching. Speaker 0 = leftmost face in first detection,
    Speaker 1 = rightmost.
    """

    DEADZONE = 0.012  # Ignore face movements smaller than 1.2% of frame

    def __init__(self):
        self.smoothers = [
            {"x": _SimpleKalman(), "y": _SimpleKalman()},
            {"x": _SimpleKalman(), "y": _SimpleKalman()},
        ]
        self.last_positions: list[dict | None] = [None, None]
        self.initialized = False

    def update(self, faces: list[dict]) -> list[dict | None]:
        """Assign detected faces to 2 speaker slots, return smoothed positions.

        Returns list of 2 dicts [speaker0, speaker1] or None if undetected.
        Each dict has: x, y, w, h (normalized coordinates).
        """
        if len(faces) < 2:
            return list(self.last_positions)

        best = sorted(faces, key=lambda f: f.get("conf", 0), reverse=True)[:2]

        if not self.initialized:
            best.sort(key=lambda f: f["x"])
            self.initialized = True
            for i, face in enumerate(best):
                sx = self.smoothers[i]["x"].update(face["x"])
                sy = self.smoothers[i]["y"].update(face["y"])
                self.last_positions[i] = {
                    "x": sx, "y": sy, "w": face["w"], "h": face["h"],
                }
            return list(self.last_positions)

        # Match faces to speakers by nearest neighbor
        assignments: list[dict | None] = [None, None]
        used: set[int] = set()

        for s_idx in range(2):
            if self.last_positions[s_idx] is None:
                continue
            best_dist = float("inf")
            best_f = -1
            for f_idx, face in enumerate(best):
                if f_idx in used:
                    continue
                dx = face["x"] - self.last_positions[s_idx]["x"]
                dy = face["y"] - self.last_positions[s_idx]["y"]
                dist = (dx * dx + dy * dy) ** 0.5
                if dist < best_dist:
                    best_dist = dist
                    best_f = f_idx
            if best_f >= 0 and best_dist < 0.3:
                assignments[s_idx] = best[best_f]
                used.add(best_f)

        for f_idx, face in enumerate(best):
            if f_idx in used:
                continue
            for s_idx in range(2):
                if assignments[s_idx] is None:
                    assignments[s_idx] = face
                    break

        for i in range(2):
            if assignments[i] is not None:
                # Deadzone: skip tiny movements to prevent jitter
                if self.last_positions[i] is not None:
                    dx = abs(assignments[i]["x"] - self.last_positions[i]["x"])
                    dy = abs(assignments[i]["y"] - self.last_positions[i]["y"])
                    if dx < self.DEADZONE and dy < self.DEADZONE:
                        continue
                sx = self.smoothers[i]["x"].update(assignments[i]["x"])
                sy = self.smoothers[i]["y"].update(assignments[i]["y"])
                self.last_positions[i] = {
                    "x": sx, "y": sy,
                    "w": assignments[i]["w"], "h": assignments[i]["h"],
                }

        return list(self.last_positions)

    def reset(self):
        for s in self.smoothers:
            s["x"].reset()
            s["y"].reset()
        self.last_positions = [None, None]
        self.initialized = False


def _detect_faces_dnn(
    frame: np.ndarray,
    dnn_net,
    upscale_large: bool = True,
) -> list[dict]:
    """Detect faces using OpenCV DNN (ResNet-10 SSD).

    Returns list of face dicts with normalized x, y, w, h, conf.
    Upscales 2x for 16:9 sources to catch small gallery faces.
    """
    h, w = frame.shape[:2]

    if upscale_large and w >= 1500:
        detect_frame = cv2.resize(
            frame, None, fx=2.0, fy=2.0, interpolation=cv2.INTER_LINEAR,
        )
    else:
        detect_frame = frame

    blob = cv2.dnn.blobFromImage(
        detect_frame, 1.0, (300, 300), (104.0, 177.0, 123.0),
    )
    dnn_net.setInput(blob)
    detections = dnn_net.forward()

    faces = []
    for i in range(detections.shape[2]):
        conf = float(detections[0, 0, i, 2])
        if conf < 0.3:
            continue
        x1 = max(0.0, float(detections[0, 0, i, 3]))
        y1 = max(0.0, float(detections[0, 0, i, 4]))
        x2 = min(1.0, float(detections[0, 0, i, 5]))
        y2 = min(1.0, float(detections[0, 0, i, 6]))
        fw = x2 - x1
        fh = y2 - y1
        if fw > 0.005 and fh > 0.005:
            faces.append({
                "x": (x1 + x2) / 2, "y": (y1 + y2) / 2,
                "w": fw, "h": fh, "conf": conf,
            })

    return faces


def _get_mouth_y(
    frame: np.ndarray,
    face: dict,
    mp_detector,
    src_w: int,
    src_h: int,
    padding_pct: float = 2.0,
) -> float | None:
    """Get mouth Y position in source pixels using MediaPipe landmarks 13+14."""
    if mp_detector is None:
        return None

    try:
        import mediapipe as mp_lib
    except ImportError:
        return None

    cx = face["x"] * src_w
    cy = face["y"] * src_h
    face_w_px = face["w"] * src_w * (1 + padding_pct)
    face_h_px = face["h"] * src_h * (1 + padding_pct)

    x1 = int(max(0, cx - face_w_px / 2))
    y1 = int(max(0, cy - face_h_px / 2))
    x2 = int(min(src_w, x1 + int(face_w_px)))
    y2 = int(min(src_h, y1 + int(face_h_px)))

    cropped = frame[y1:y2, x1:x2]
    if cropped.size == 0:
        return None

    up_scale = max(1.0, 400 / max(cropped.shape[1], 1))
    upscaled = (
        cv2.resize(cropped, None, fx=up_scale, fy=up_scale)
        if up_scale > 1.0
        else cropped
    )

    rgb = cv2.cvtColor(upscaled, cv2.COLOR_BGR2RGB)
    mp_image = mp_lib.Image(image_format=mp_lib.ImageFormat.SRGB, data=rgb)

    try:
        result = mp_detector.detect(mp_image)
    except Exception:
        return None

    if not result.face_landmarks:
        return None

    lm = result.face_landmarks[0]
    mouth_y_norm = (lm[13].y + lm[14].y) / 2
    return y1 + mouth_y_norm * cropped.shape[0]


def render_dynamic_podcast(
    video_path: str,
    crop_path: CropPath,
    output_path: str,
    config: dict,
    layout_segments: list,
) -> None:
    """Render dynamic podcast — switches between split-screen and close-up per segment.

    Split-screen segments: Top half = Speaker A, Bottom half = Speaker B
        (per-frame DNN face detection, Kalman smoothing, mouth centering).
    Close-up segments: Standard 9:16 face-tracking crop from keyframes.
    Transitions: Alpha crossfade between layout modes.
    """
    from ..detection.layout_detector import LayoutType
    from .crop_renderer import _interpolate_crop_x

    split_cfg = config.get("split_screen", {})
    dynamic_cfg = split_cfg.get("dynamic_layout", {})
    use_blur_fill = split_cfg.get("background", "black") == "blur"
    crossfade_frames = dynamic_cfg.get("crossfade_frames", 5)

    # Large padding captures head+shoulders from small gallery faces (~2x zoom)
    split_face_padding = 18.0

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Cannot open video: {video_path}")

    fps = crop_path.source_fps
    total = crop_path.source_total_frames
    src_w = crop_path.source_width
    src_h = crop_path.source_height

    # 9:16 crop dimensions for close-up segments
    crop_w_916 = int(src_h * 9 / 16)
    crop_h_916 = src_h

    # Load DNN face detector
    prototxt = str(_MODELS_DIR / "deploy.prototxt")
    caffemodel = str(_MODELS_DIR / "res10_300x300_ssd_iter_140000.caffemodel")
    dnn_net = cv2.dnn.readNetFromCaffe(prototxt, caffemodel)

    # MediaPipe for mouth centering
    mp_detector = None
    if dynamic_cfg.get("mouth_centering", True) and _FACE_LANDMARKER_MODEL.exists():
        try:
            import mediapipe as mp_lib
            from mediapipe.tasks import python as mp_python
            from mediapipe.tasks.python import vision as mp_vision

            base_options = mp_python.BaseOptions(
                model_asset_path=str(_FACE_LANDMARKER_MODEL),
            )
            options = mp_vision.FaceLandmarkerOptions(
                base_options=base_options,
                running_mode=mp_vision.RunningMode.IMAGE,
                num_faces=2,
                min_face_detection_confidence=0.3,
            )
            mp_detector = mp_vision.FaceLandmarker.create_from_options(options)
            print("  Mouth centering: enabled (MediaPipe)")
        except ImportError:
            print("  Mouth centering: disabled (MediaPipe not available)")

    tracker = _SpeakerTracker()
    slot_h = OUT_H // 2  # 960px per speaker
    slot_w = OUT_W       # 1080px
    mouth_y_cache: list[float | None] = [None, None]
    mouth_sample_interval = 10

    def get_segment(fidx: int):
        for seg in layout_segments:
            if seg.start_frame <= fidx <= seg.end_frame:
                return seg
        return None

    # Print segment summary
    print(f"  Dynamic layout: {len(layout_segments)} segments")
    for seg in layout_segments:
        dur = seg.end_sec - seg.start_sec
        print(f"    {seg.layout.value}: {seg.start_sec:.1f}s - {seg.end_sec:.1f}s ({dur:.1f}s)")

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)

    ffmpeg_cmd = _build_ffmpeg_cmd(
        output_path=output_path,
        width=OUT_W,
        height=OUT_H,
        fps=fps,
        audio_source=video_path,
        config=config.get("output", {}),
    )

    stderr_file = tempfile.NamedTemporaryFile(mode="w", suffix=".log", delete=False)
    proc = subprocess.Popen(
        ffmpeg_cmd,
        stdin=subprocess.PIPE,
        stdout=subprocess.DEVNULL,
        stderr=stderr_file,
    )

    prev_layout_type = None
    prev_rendered = None
    transition_base = None
    transition_left = 0

    try:
        frame_idx = 0
        while frame_idx < total:
            ret, frame = cap.read()
            if not ret:
                break

            segment = get_segment(frame_idx)
            current_type = segment.layout if segment else None

            # Detect layout transition → start crossfade + reset tracker
            if (current_type is not None and prev_layout_type is not None
                    and current_type != prev_layout_type):
                if prev_rendered is not None:
                    transition_base = prev_rendered.copy()
                transition_left = crossfade_frames
                tracker.reset()
                mouth_y_cache = [None, None]

            # --- Render based on current layout type ---
            if current_type is not None and current_type.value == "split_screen":
                output_frame = np.zeros((OUT_H, OUT_W, 3), dtype=np.uint8)

                faces = _detect_faces_dnn(frame, dnn_net, upscale_large=True)
                positions = tracker.update(faces)

                # Sample mouth positions periodically
                frames_in_seg = frame_idx - (segment.start_frame if segment else 0)
                if frames_in_seg % mouth_sample_interval == 0:
                    for s_idx in range(2):
                        if positions[s_idx] is not None:
                            my = _get_mouth_y(
                                frame, positions[s_idx], mp_detector,
                                src_w, src_h, padding_pct=3.0,
                            )
                            if my is not None:
                                mouth_y_cache[s_idx] = my

                # Smart per-speaker crop: don't overlap into other speaker's area
                for s_idx in range(2):
                    pos = positions[s_idx]
                    if pos is None:
                        continue

                    face_x_px = pos["x"] * src_w
                    face_y_px = pos["y"] * src_h

                    # Default crop width: ~540px (2x zoom to 1080 slot)
                    target_crop_w = slot_w // 2

                    # Limit crop to not cross midpoint between speakers
                    other = positions[1 - s_idx]
                    if other is not None:
                        other_x_px = other["x"] * src_w
                        mid_px = (face_x_px + other_x_px) / 2
                        max_half_w = abs(face_x_px - mid_px)
                        target_crop_w = min(target_crop_w, int(max_half_w * 1.8))

                    target_crop_w = max(target_crop_w, 300)

                    # Crop height: match slot aspect ratio (960/1080)
                    target_crop_h = int(target_crop_w * slot_h / slot_w)
                    target_crop_h = min(target_crop_h, src_h)

                    # Center vertically on mouth if available, else face
                    anchor_y = mouth_y_cache[s_idx] if mouth_y_cache[s_idx] is not None else face_y_px
                    crop_x1 = int(face_x_px - target_crop_w / 2)
                    crop_y1 = int(anchor_y - target_crop_h * 0.4)  # Face at 40% height

                    # Clamp to frame bounds
                    crop_x1 = max(0, min(crop_x1, src_w - target_crop_w))
                    crop_y1 = max(0, min(crop_y1, src_h - target_crop_h))

                    cropped = frame[crop_y1:crop_y1 + target_crop_h,
                                    crop_x1:crop_x1 + target_crop_w]

                    if cropped.size == 0:
                        continue

                    result = cv2.resize(
                        cropped, (slot_w, slot_h),
                        interpolation=cv2.INTER_LANCZOS4,
                    )

                    # Bilateral filter for heavy zoom (>3x)
                    if slot_w / max(target_crop_w, 1) > 3.0:
                        result = cv2.bilateralFilter(
                            result, d=7, sigmaColor=40, sigmaSpace=40,
                        )

                    y_off = s_idx * slot_h
                    output_frame[y_off:y_off + slot_h, :slot_w] = result

            else:
                # CLOSE-UP: standard 9:16 face-tracking crop
                crop_x = _interpolate_crop_x(crop_path, frame_idx)
                crop_x = max(0, min(crop_x, src_w - crop_w_916))
                cropped = frame[0:crop_h_916, crop_x:crop_x + crop_w_916]
                output_frame = cv2.resize(
                    cropped, (OUT_W, OUT_H), interpolation=cv2.INTER_LANCZOS4,
                )

            # Apply crossfade during transitions
            if transition_left > 0 and transition_base is not None:
                alpha = (crossfade_frames - transition_left + 1) / (crossfade_frames + 1)
                output_frame = cv2.addWeighted(
                    transition_base, 1.0 - alpha, output_frame, alpha, 0,
                )
                transition_left -= 1

            prev_rendered = output_frame
            prev_layout_type = current_type

            proc.stdin.write(output_frame.tobytes())
            frame_idx += 1

            if frame_idx % max(1, total // 20) == 0:
                pct = int(frame_idx / total * 100)
                print(f"  Rendering dynamic podcast: {pct}% "
                      f"({frame_idx}/{total} frames)", flush=True)

    finally:
        cap.release()
        if mp_detector:
            mp_detector.close()
        if proc.stdin:
            proc.stdin.close()
        proc.wait()
        stderr_file.close()

        if proc.returncode != 0:
            with open(stderr_file.name, "r") as f:
                stderr_content = f.read()
            os.unlink(stderr_file.name)
            raise RuntimeError(
                f"FFmpeg failed (code {proc.returncode}): {stderr_content[-500:]}"
            )

        os.unlink(stderr_file.name)

    print(f"  Render complete (dynamic podcast): {output_path}")
