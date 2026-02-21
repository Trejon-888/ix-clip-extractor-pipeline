"""MediaPipe Pose Landmarker wrapper for body-aware framing.

Uses the MediaPipe Tasks API with the Pose Landmarker Lite model.
Returns a BoundingBox centered on the upper body (head + shoulders region),
useful when the face is partially occluded or turned away.
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
_MODEL_PATH = str(Path(__file__).parent.parent / "models" / "pose_landmarker_lite.task")

# Key landmark indices (MediaPipe Pose has 33 landmarks)
_NOSE = 0
_LEFT_SHOULDER = 11
_RIGHT_SHOULDER = 12


class PoseEstimator(DetectorBase):
    """Estimates upper body center using MediaPipe Pose Landmarker.

    Computes a weighted average of nose and shoulder landmarks to produce
    a crop target that frames the speaker's upper body. Useful as a fallback
    when face detection fails (side profile, looking down, etc.).
    """

    def __init__(self, config: dict):
        self.min_confidence = config.get("min_confidence", 0.5)
        self._frame_timestamp_ms = 0

        # Landmark weights for body center computation
        weights_cfg = config.get("landmark_weights", {})
        self._nose_weight = weights_cfg.get("nose", 0.4)
        self._lshoulder_weight = weights_cfg.get("left_shoulder", 0.3)
        self._rshoulder_weight = weights_cfg.get("right_shoulder", 0.3)

        model_path = config.get("model_path", _MODEL_PATH)

        base_options = mp_python.BaseOptions(model_asset_path=model_path)
        options = vision.PoseLandmarkerOptions(
            base_options=base_options,
            running_mode=vision.RunningMode.VIDEO,
            min_pose_detection_confidence=self.min_confidence,
            min_tracking_confidence=self.min_confidence,
        )
        self._landmarker = vision.PoseLandmarker.create_from_options(options)

    def detect(self, frame: np.ndarray) -> Optional[BoundingBox]:
        """Detect the primary pose and return upper body center as BoundingBox.

        Returns a BoundingBox centered on the weighted average of nose and
        shoulder landmarks. The box size represents the shoulder span with
        margins for body framing.
        """
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

        self._frame_timestamp_ms += 33  # ~30fps increment
        result = self._landmarker.detect_for_video(mp_image, self._frame_timestamp_ms)

        if not result.pose_landmarks or len(result.pose_landmarks) == 0:
            return None

        landmarks = result.pose_landmarks[0]

        # Extract key landmarks
        nose = landmarks[_NOSE]
        l_shoulder = landmarks[_LEFT_SHOULDER]
        r_shoulder = landmarks[_RIGHT_SHOULDER]

        # Check visibility — skip if key landmarks are not visible enough
        min_vis = min(nose.visibility, l_shoulder.visibility, r_shoulder.visibility)
        if min_vis < self.min_confidence:
            return None

        # Compute weighted body center (normalized 0-1 coordinates)
        total_weight = self._nose_weight + self._lshoulder_weight + self._rshoulder_weight
        x_center = (
            nose.x * self._nose_weight
            + l_shoulder.x * self._lshoulder_weight
            + r_shoulder.x * self._rshoulder_weight
        ) / total_weight
        y_center = (
            nose.y * self._nose_weight
            + l_shoulder.y * self._lshoulder_weight
            + r_shoulder.y * self._rshoulder_weight
        ) / total_weight

        # Estimate body width from shoulder span
        shoulder_span = abs(l_shoulder.x - r_shoulder.x)
        body_width = shoulder_span * 1.5  # Add margin
        body_height = body_width * 1.5    # Rough upper body aspect

        # Average visibility as confidence
        confidence = (nose.visibility + l_shoulder.visibility + r_shoulder.visibility) / 3

        return BoundingBox(
            x_center=float(np.clip(x_center, 0, 1)),
            y_center=float(np.clip(y_center, 0, 1)),
            width=float(np.clip(body_width, 0, 1)),
            height=float(np.clip(body_height, 0, 1)),
            confidence=float(confidence),
        )

    def close(self) -> None:
        self._landmarker.close()
