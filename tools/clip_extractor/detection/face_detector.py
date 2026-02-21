"""MediaPipe BlazeFace wrapper for per-frame face detection.

Uses the MediaPipe Tasks API (v0.10.20+) with the BlazeFace short-range model.
Model file is bundled at tools/clip_extractor/models/blaze_face_short_range.tflite.
"""

from pathlib import Path
from typing import Optional

import cv2
import mediapipe as mp
import numpy as np
from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision

from .detector_base import BoundingBox, DetectorBase

# Model path relative to this file
_MODEL_PATH = str(Path(__file__).parent.parent / "models" / "blaze_face_short_range.tflite")


class FaceDetector(DetectorBase):
    """Detects the primary face in each frame using MediaPipe BlazeFace.

    Uses the Tasks API with VIDEO running mode for frame-by-frame processing
    with temporal context. BlazeFace short-range model runs on CPU in real-time.
    """

    def __init__(self, config: dict):
        self.min_confidence = config.get("min_confidence", 0.5)
        self.prefer_largest = config.get("prefer_largest", True)
        self._frame_timestamp_ms = 0

        model_path = config.get("model_path", _MODEL_PATH)

        base_options = mp_python.BaseOptions(model_asset_path=model_path)
        options = vision.FaceDetectorOptions(
            base_options=base_options,
            running_mode=vision.RunningMode.VIDEO,
            min_detection_confidence=self.min_confidence,
        )
        self._detector = vision.FaceDetector.create_from_options(options)

    def detect(self, frame: np.ndarray) -> Optional[BoundingBox]:
        """Detect the primary face in a BGR frame.

        Returns the largest detected face (closest to camera) as a normalized
        bounding box, or None if no face is found.
        """
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

        self._frame_timestamp_ms += 33  # ~30fps increment
        result = self._detector.detect_for_video(mp_image, self._frame_timestamp_ms)

        if not result.detections:
            return None

        detections = result.detections

        if self.prefer_largest and len(detections) > 1:
            detection = max(
                detections,
                key=lambda d: d.bounding_box.width * d.bounding_box.height,
            )
        else:
            detection = detections[0]

        bb = detection.bounding_box
        h, w = frame.shape[:2]

        # Convert pixel coordinates to normalized (0-1)
        x_center = (bb.origin_x + bb.width / 2) / w
        y_center = (bb.origin_y + bb.height / 2) / h
        norm_w = bb.width / w
        norm_h = bb.height / h
        confidence = detection.categories[0].score if detection.categories else 0.5

        return BoundingBox(
            x_center=x_center,
            y_center=y_center,
            width=norm_w,
            height=norm_h,
            confidence=confidence,
        )

    def detect_all(self, frame: np.ndarray, max_faces: int = 3) -> list[BoundingBox]:
        """Detect all faces in a frame (for multi-speaker scenarios)."""
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

        self._frame_timestamp_ms += 33
        result = self._detector.detect_for_video(mp_image, self._frame_timestamp_ms)

        if not result.detections:
            return []

        h, w = frame.shape[:2]
        boxes = []
        for detection in result.detections[:max_faces]:
            bb = detection.bounding_box
            x_center = (bb.origin_x + bb.width / 2) / w
            y_center = (bb.origin_y + bb.height / 2) / h
            norm_w = bb.width / w
            norm_h = bb.height / h
            confidence = detection.categories[0].score if detection.categories else 0.5

            boxes.append(
                BoundingBox(
                    x_center=x_center,
                    y_center=y_center,
                    width=norm_w,
                    height=norm_h,
                    confidence=confidence,
                )
            )

        boxes.sort(key=lambda b: b.width * b.height, reverse=True)
        return boxes

    def close(self) -> None:
        self._detector.close()
