"""Read and write crop_path.json — the inspectable intermediate format."""

import json
from dataclasses import dataclass, asdict, field
from pathlib import Path
from typing import Optional


@dataclass
class CropKeyframe:
    """A single keyframe in the crop path."""

    frame: int
    time_sec: float
    crop_x: int
    crop_y: int
    crop_w: int
    crop_h: int
    face_detected: bool
    face_confidence: float
    face_center_x: float
    face_center_y: float
    smoothed: bool
    deadzone_active: bool
    # Phase 2 fields (optional, backward compatible with Phase 1 JSON)
    pose_detected: bool = False
    pose_confidence: float = 0.0
    pose_center_x: float = 0.0
    pose_center_y: float = 0.0
    saliency_detected: bool = False
    saliency_score: float = 0.0
    saliency_center_x: float = 0.0
    saliency_center_y: float = 0.0
    scene_change: bool = False
    smoother_method: str = "ema"
    # Phase 5: Multi-face data for split-screen layout
    all_faces: str = ""  # JSON: [{"x": 0.2, "y": 0.3, "w": 0.1, "h": 0.15, "conf": 0.9}, ...]
    # Phase 6: Per-frame layout classification for dynamic podcast reframing
    layout_type: str = ""  # "split_screen" or "close_up" (empty = unclassified)


@dataclass
class DetectionStats:
    frames_sampled: int
    faces_detected: int
    face_detected_pct: float
    avg_confidence: float
    sampling_rate: int
    interpolated_frames: int


@dataclass
class CropPath:
    """Full crop path data for a clip."""

    version: str
    source_file: str
    source_width: int
    source_height: int
    source_fps: float
    source_total_frames: int
    output_format: str
    output_crop_w: int
    output_crop_h: int
    config_used: str
    detection_stats: DetectionStats
    keyframes: list[CropKeyframe]
    # Phase 6: Layout segments for dynamic podcast reframing
    layout_segments: list[dict] = field(default_factory=list)


def save_crop_path(crop_path: CropPath, output_file: str) -> None:
    """Write crop path to JSON file."""
    data = {
        "version": crop_path.version,
        "source": {
            "file": crop_path.source_file,
            "width": crop_path.source_width,
            "height": crop_path.source_height,
            "fps": crop_path.source_fps,
            "total_frames": crop_path.source_total_frames,
        },
        "output": {
            "format": crop_path.output_format,
            "crop_w": crop_path.output_crop_w,
            "crop_h": crop_path.output_crop_h,
        },
        "config_used": crop_path.config_used,
        "detection_stats": asdict(crop_path.detection_stats),
        "keyframes": [asdict(kf) for kf in crop_path.keyframes],
        "layout_segments": crop_path.layout_segments,
    }

    Path(output_file).parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, "w") as f:
        json.dump(data, f, indent=2)


def load_crop_path(input_file: str) -> CropPath:
    """Load crop path from JSON file."""
    with open(input_file, "r") as f:
        data = json.load(f)

    src = data["source"]
    out = data["output"]
    stats = data["detection_stats"]

    # Phase 2 backward compat: supply defaults for fields missing in Phase 1 JSON
    _PHASE2_DEFAULTS = {
        "pose_detected": False, "pose_confidence": 0.0,
        "pose_center_x": 0.0, "pose_center_y": 0.0,
        "saliency_detected": False, "saliency_score": 0.0,
        "saliency_center_x": 0.0, "saliency_center_y": 0.0,
        "scene_change": False, "smoother_method": "ema",
        "all_faces": "",
        "layout_type": "",
    }
    keyframes = [
        CropKeyframe(**{**_PHASE2_DEFAULTS, **kf})
        for kf in data["keyframes"]
    ]

    return CropPath(
        version=data["version"],
        source_file=src["file"],
        source_width=src["width"],
        source_height=src["height"],
        source_fps=src["fps"],
        source_total_frames=src["total_frames"],
        config_used=data.get("config_used", ""),
        output_format=out["format"],
        output_crop_w=out["crop_w"],
        output_crop_h=out["crop_h"],
        detection_stats=DetectionStats(**stats),
        keyframes=keyframes,
        layout_segments=data.get("layout_segments", []),
    )


def get_crop_at_frame(crop_path: CropPath, frame: int) -> Optional[CropKeyframe]:
    """Get the crop keyframe for a specific frame.

    Uses the nearest keyframe at or before the requested frame.
    """
    best = None
    for kf in crop_path.keyframes:
        if kf.frame <= frame:
            best = kf
        else:
            break
    return best
