"""Detect layout type per frame and group into segments for dynamic podcast reframing.

Classifies each analyzed frame as SPLIT_SCREEN (gallery/Zoom: 2+ small faces far apart)
or CLOSE_UP (studio: 1-2 large faces near center) based on face size and spatial spread.
Groups consecutive same-type frames into LayoutSegments.

Uses the `all_faces` DNN detection data already stored in CropKeyframe during analyze() —
no extra video scan required.
"""

import json
from collections import Counter
from dataclasses import dataclass
from enum import Enum

from ..crop.crop_path_io import CropKeyframe


class LayoutType(Enum):
    SPLIT_SCREEN = "split_screen"
    CLOSE_UP = "close_up"


@dataclass
class LayoutSegment:
    layout: LayoutType
    start_frame: int
    end_frame: int
    start_sec: float
    end_sec: float


def classify_frame(
    faces: list[dict],
    face_size_threshold: float = 0.06,
    spatial_spread_threshold: float = 0.15,
) -> LayoutType | None:
    """Classify a single frame's layout based on detected faces.

    Args:
        faces: List of face dicts with keys "x", "y", "w", "h", "conf".
        face_size_threshold: Faces below this normalized width = gallery/split.
        spatial_spread_threshold: Min horizontal distance between faces for split.

    Returns:
        LayoutType or None if insufficient data.
    """
    if not faces or len(faces) < 2:
        return None  # Can't classify with fewer than 2 faces

    # Filter low-confidence detections
    good_faces = [f for f in faces if f.get("conf", 0) > 0.3]
    if len(good_faces) < 2:
        return None

    # Primary signal: median face width
    widths = sorted([f["w"] for f in good_faces])
    median_width = widths[len(widths) // 2]

    # Secondary signal: max horizontal distance between face centers
    xs = [f["x"] for f in good_faces]
    max_h_distance = max(xs) - min(xs)

    # Classification
    if median_width < face_size_threshold and max_h_distance > spatial_spread_threshold:
        return LayoutType.SPLIT_SCREEN
    elif median_width >= face_size_threshold * 0.67 and max_h_distance < spatial_spread_threshold * 0.8:
        return LayoutType.CLOSE_UP
    else:
        # Scoring tiebreak: weight face size more heavily
        split_score = (1.0 if median_width < face_size_threshold else 0.0) * 0.5 + \
                      (1.0 if max_h_distance > spatial_spread_threshold else 0.0) * 0.3 + \
                      (1.0 if len(good_faces) >= 2 else 0.0) * 0.2
        return LayoutType.SPLIT_SCREEN if split_score > 0.5 else LayoutType.CLOSE_UP


def _majority_vote_smooth(
    classifications: list[LayoutType | None],
    window: int = 15,
) -> list[LayoutType | None]:
    """Apply majority-vote smoothing to eliminate single-frame classification noise."""
    n = len(classifications)
    smoothed = list(classifications)
    half = window // 2

    for i in range(n):
        start = max(0, i - half)
        end = min(n, i + half + 1)
        votes = [c for c in classifications[start:end] if c is not None]
        if votes:
            counter = Counter(votes)
            smoothed[i] = counter.most_common(1)[0][0]

    return smoothed


def detect_segments(
    keyframes: list[CropKeyframe],
    fps: float,
    config: dict | None = None,
) -> list[LayoutSegment]:
    """Detect layout segments from analyzed keyframes.

    Args:
        keyframes: List of CropKeyframe from analyze().
        fps: Source video FPS.
        config: Optional dynamic_layout config dict.

    Returns:
        List of LayoutSegment sorted by start_frame.
    """
    if config is None:
        config = {}

    face_size_threshold = config.get("face_size_threshold", 0.06)
    spatial_spread_threshold = config.get("spatial_spread_threshold", 0.15)
    min_segment_duration = config.get("min_segment_duration", 1.0)
    smoothing_window = config.get("smoothing_window", 15)

    # Step 1: Classify each keyframe
    classifications: list[LayoutType | None] = []
    for kf in keyframes:
        if not kf.all_faces:
            classifications.append(None)
            continue
        try:
            faces = json.loads(kf.all_faces)
        except (json.JSONDecodeError, TypeError):
            classifications.append(None)
            continue

        layout = classify_frame(faces, face_size_threshold, spatial_spread_threshold)
        classifications.append(layout)

    # Step 2: Majority-vote smoothing
    smoothed = _majority_vote_smooth(classifications, smoothing_window)

    # Step 3: Group consecutive same-type frames into segments
    raw_segments: list[LayoutSegment] = []
    current_layout = None
    seg_start_idx = 0

    for i, layout in enumerate(smoothed):
        if layout is None:
            continue

        if current_layout is None:
            current_layout = layout
            seg_start_idx = i

        if layout != current_layout:
            # Close current segment
            raw_segments.append(LayoutSegment(
                layout=current_layout,
                start_frame=keyframes[seg_start_idx].frame,
                end_frame=keyframes[i - 1].frame,
                start_sec=keyframes[seg_start_idx].time_sec,
                end_sec=keyframes[i - 1].time_sec,
            ))
            current_layout = layout
            seg_start_idx = i

    # Close final segment
    if current_layout is not None and keyframes:
        raw_segments.append(LayoutSegment(
            layout=current_layout,
            start_frame=keyframes[seg_start_idx].frame,
            end_frame=keyframes[-1].frame,
            start_sec=keyframes[seg_start_idx].time_sec,
            end_sec=keyframes[-1].time_sec,
        ))

    if not raw_segments:
        return []

    # Step 4: Merge short segments into neighbors
    min_frames = int(min_segment_duration * fps)
    merged: list[LayoutSegment] = [raw_segments[0]]

    for seg in raw_segments[1:]:
        duration_frames = seg.end_frame - seg.start_frame
        if duration_frames < min_frames:
            # Merge into previous segment
            merged[-1] = LayoutSegment(
                layout=merged[-1].layout,
                start_frame=merged[-1].start_frame,
                end_frame=seg.end_frame,
                start_sec=merged[-1].start_sec,
                end_sec=seg.end_sec,
            )
        else:
            merged.append(seg)

    return merged
