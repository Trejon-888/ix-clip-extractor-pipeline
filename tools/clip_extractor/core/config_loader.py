"""Load and validate YAML configuration with sensible defaults."""

import os
from pathlib import Path
from typing import Any

import yaml


DEFAULTS = {
    "detection": {
        "face": {
            "enabled": True,
            "min_confidence": 0.5,
            "model_selection": 1,
            "prefer_largest": True,
            "dnn_blob_size": 900,
        },
        "pose": {
            "enabled": False,
            "min_confidence": 0.5,
            "body_margin_pct": 0.15,
            "landmark_weights": {"nose": 0.4, "left_shoulder": 0.3, "right_shoulder": 0.3},
        },
        "saliency": {
            "enabled": False,
            "threshold": 0.4,
            "min_area_pct": 0.02,
        },
    },
    "fusion": {
        "face_weight": 0.6,
        "pose_weight": 0.25,
        "saliency_weight": 0.15,
    },
    "sampling": {
        "auto": True,
        "frame_rate": 6,
        "interpolation": "cubic",
    },
    "smoothing": {
        "method": "ema",
        "ema": {"alpha": 0.12},
        "kalman": {"process_noise": 0.01, "measurement_noise": 0.1},
    },
    "scene_detection": {
        "enabled": False,
        "threshold": 0.15,
        "min_interval": 30,
    },
    "deadzone": {
        "enabled": True,
        "threshold_pct": 0.05,
        "vertical_threshold_pct": 0.08,
    },
    "crop": {
        "default_format": "9x16",
        "face_position": {"x_target": 0.5, "y_target": 0.38},
        "padding": {"top_pct": 0.15, "bottom_pct": 0.45},
        "boundary_clamp": True,
    },
    "output": {
        "codec": "h264",
        "preset": "medium",
        "crf": 18,
        "use_nvenc": "auto",
        "nvenc_preset": "p4",
        "scale_output": True,
        "generate_debug": False,
    },
    "speakers": {
        "mode": "primary",
        "max_faces": 3,
        "switch_threshold": 0.3,
    },
    "split_screen": {
        "top_ratio": 0.5,
        "face_padding_pct": 1.0,
        "merged_padding_pct": 0.8,
        "min_face_size_pct": 0.0005,
        "merge_distance": 0.20,
        "background": "black",
    },
    "selection": {
        "clip_count": 7,
        "min_duration": 45,
        "max_duration": 90,
        "padding": 1.0,
        "anchor": {
            "search_window_sec": 15.0,
            "min_confidence": 0.5,
            "fuzzy_threshold": 75,
        },
        "scoring": {
            "min_total_score": 50,
        },
    },
}


def _deep_merge(base: dict, override: dict) -> dict:
    """Recursively merge override into base, preferring override values."""
    result = base.copy()
    for key, value in override.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = _deep_merge(result[key], value)
        else:
            result[key] = value
    return result


def load_config(config_path: str | None = None) -> dict[str, Any]:
    """Load config from YAML file, merged with defaults.

    Resolution order:
    1. Built-in defaults
    2. config.yaml from package directory (if no path given)
    3. User-specified config file (if path given)
    """
    config = DEFAULTS.copy()

    if config_path is None:
        # Look for config.yaml next to this package
        package_dir = Path(__file__).parent.parent
        config_path = str(package_dir / "config.yaml")

    if os.path.exists(config_path):
        with open(config_path, "r") as f:
            user_config = yaml.safe_load(f) or {}
        config = _deep_merge(config, user_config)

    return config


def get_sample_rate(config: dict, duration_seconds: float) -> int:
    """Determine frame sampling rate based on video duration.

    Shorter videos get more samples (higher quality).
    Longer videos sample less frequently (performance).
    """
    if not config["sampling"]["auto"]:
        return config["sampling"]["frame_rate"]

    if duration_seconds < 300:       # < 5 min
        return 3                     # every 3rd frame (10fps equiv at 30fps)
    elif duration_seconds < 1800:    # < 30 min
        return 6                     # every 6th frame (5fps equiv)
    else:                            # 30+ min
        return 10                    # every 10th frame (3fps equiv)
