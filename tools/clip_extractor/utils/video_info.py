"""FFprobe wrapper for extracting video metadata."""

import json
import subprocess
from dataclasses import dataclass


@dataclass
class VideoInfo:
    width: int
    height: int
    fps: float
    duration: float
    total_frames: int
    codec: str


def get_video_info(video_path: str) -> VideoInfo:
    """Extract video metadata using ffprobe."""
    cmd = [
        "ffprobe",
        "-v", "quiet",
        "-print_format", "json",
        "-show_format",
        "-show_streams",
        "-select_streams", "v:0",
        video_path,
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    data = json.loads(result.stdout)

    stream = data["streams"][0]
    fmt = data["format"]

    # Parse FPS from r_frame_rate (e.g., "30/1" or "30000/1001")
    fps_parts = stream.get("r_frame_rate", "30/1").split("/")
    fps = float(fps_parts[0]) / float(fps_parts[1]) if len(fps_parts) == 2 else 30.0

    duration = float(fmt.get("duration", stream.get("duration", 0)))
    width = int(stream["width"])
    height = int(stream["height"])
    total_frames = int(stream.get("nb_frames", int(duration * fps)))
    codec = stream.get("codec_name", "unknown")

    return VideoInfo(
        width=width,
        height=height,
        fps=fps,
        duration=duration,
        total_frames=total_frames,
        codec=codec,
    )
