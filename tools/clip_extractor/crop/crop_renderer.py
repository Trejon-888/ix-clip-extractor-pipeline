"""FFmpeg-based crop rendering with dynamic per-frame positions.

Uses a frame-by-frame Python pipeline: OpenCV reads → crop → FFmpeg pipe encodes.
More reliable than FFmpeg sendcmd for dynamic crops, with full per-frame control.
"""

import os
import subprocess
import sys
import tempfile
from pathlib import Path

import cv2
import numpy as np

from .crop_path_io import CropPath


def _detect_nvenc() -> bool:
    """Check if NVIDIA NVENC encoder is available."""
    try:
        result = subprocess.run(
            ["ffmpeg", "-hide_banner", "-encoders"],
            capture_output=True,
            text=True,
            timeout=10,
        )
        return "h264_nvenc" in result.stdout
    except Exception:
        return False


def _build_ffmpeg_cmd(
    output_path: str,
    width: int,
    height: int,
    fps: float,
    audio_source: str,
    config: dict,
) -> list[str]:
    """Build the FFmpeg command for piped encoding."""
    use_nvenc = config.get("use_nvenc", "auto")
    has_nvenc = _detect_nvenc() if use_nvenc == "auto" else use_nvenc == "force"

    cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-pix_fmt", "bgr24",
        "-s", f"{width}x{height}",
        "-r", str(fps),
        "-i", "pipe:0",          # Video from stdin
        "-i", audio_source,       # Audio from original file
        "-map", "0:v:0",
        "-map", "1:a:0?",        # ? = don't fail if no audio
    ]

    if has_nvenc:
        cmd.extend([
            "-c:v", "h264_nvenc",
            "-preset", config.get("nvenc_preset", "p4"),
            "-rc", "vbr",
            "-b:v", "8M",
            "-maxrate", "12M",
            "-pix_fmt", "yuv420p",
        ])
    else:
        cmd.extend([
            "-c:v", "libx264",
            "-preset", config.get("preset", "medium"),
            "-crf", str(config.get("crf", 18)),
            "-pix_fmt", "yuv420p",
        ])

    cmd.extend([
        "-c:a", "copy",
        "-movflags", "+faststart",
        output_path,
    ])

    return cmd


def _interpolate_crop_x(crop_path: CropPath, frame_idx: int) -> int:
    """Get interpolated crop_x for any frame index.

    Linear interpolation between keyframes for smooth motion.
    """
    keyframes = crop_path.keyframes
    if not keyframes:
        return 0

    # Before first keyframe
    if frame_idx <= keyframes[0].frame:
        return keyframes[0].crop_x

    # After last keyframe
    if frame_idx >= keyframes[-1].frame:
        return keyframes[-1].crop_x

    # Find surrounding keyframes
    for i in range(len(keyframes) - 1):
        if keyframes[i].frame <= frame_idx < keyframes[i + 1].frame:
            kf_a = keyframes[i]
            kf_b = keyframes[i + 1]
            # Linear interpolation
            t = (frame_idx - kf_a.frame) / (kf_b.frame - kf_a.frame)
            return int(kf_a.crop_x + t * (kf_b.crop_x - kf_a.crop_x))

    return keyframes[-1].crop_x


def render_with_crop_path(
    video_path: str,
    crop_path: CropPath,
    output_path: str,
    config: dict,
) -> None:
    """Render the final cropped video using the computed crop path.

    Reads frames with OpenCV, applies per-frame crop, pipes to FFmpeg for encoding.
    This approach gives full control over every frame's crop position.

    Args:
        video_path: Path to the input video.
        crop_path: CropPath object with keyframes.
        output_path: Path for the output video.
        config: Output config section from config.yaml.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Cannot open video: {video_path}")

    fps = crop_path.source_fps
    crop_w = crop_path.output_crop_w
    crop_h = crop_path.output_crop_h
    total = crop_path.source_total_frames

    # Determine output dimensions
    if config.get("scale_output", True):
        if crop_path.output_format == "9x16":
            out_w, out_h = 1080, 1920
        elif crop_path.output_format == "1x1":
            out_w, out_h = 1080, 1080
        else:
            out_w, out_h = crop_w, crop_h
    else:
        out_w, out_h = crop_w, crop_h

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)

    ffmpeg_cmd = _build_ffmpeg_cmd(
        output_path=output_path,
        width=out_w,
        height=out_h,
        fps=fps,
        audio_source=video_path,
        config=config,
    )

    # Write stderr to a temp file to avoid pipe deadlock
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

            # Get interpolated crop position for this frame
            crop_x = _interpolate_crop_x(crop_path, frame_idx)
            crop_y = 0  # Always full height

            # Apply crop
            cropped = frame[crop_y:crop_y + crop_h, crop_x:crop_x + crop_w]

            # Scale to output dimensions
            if (out_w, out_h) != (crop_w, crop_h):
                cropped = cv2.resize(cropped, (out_w, out_h), interpolation=cv2.INTER_LANCZOS4)

            # Write to FFmpeg pipe
            proc.stdin.write(cropped.tobytes())

            frame_idx += 1

            # Progress reporting (every 5%)
            if frame_idx % max(1, total // 20) == 0:
                pct = int(frame_idx / total * 100)
                print(f"  Rendering: {pct}% ({frame_idx}/{total} frames)", flush=True)

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

    print(f"  Render complete: {output_path}")
