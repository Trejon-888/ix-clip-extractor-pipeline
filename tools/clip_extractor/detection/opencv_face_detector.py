"""OpenCV DNN face detector for small face detection.

Uses the ResNet-10 SSD Caffe model which reliably detects faces as small as
~20px. Designed as a fallback for split-screen mode where BlazeFace short-range
cannot detect small Zoom webcam thumbnail faces.

Model files (in tools/clip_extractor/models/):
  - deploy.prototxt (~28KB)
  - res10_300x300_ssd_iter_140000.caffemodel (~10.3MB)
"""

from pathlib import Path
from typing import Optional

import cv2
import numpy as np

from .detector_base import BoundingBox, DetectorBase

_MODELS_DIR = Path(__file__).parent.parent / "models"
_PROTOTXT = str(_MODELS_DIR / "deploy.prototxt")
_CAFFEMODEL = str(_MODELS_DIR / "res10_300x300_ssd_iter_140000.caffemodel")

# Mean subtraction values for the Caffe model
_MEAN_VALUES = (104.0, 177.0, 123.0)


class OpenCVFaceDetector(DetectorBase):
    """Detects faces using OpenCV DNN (ResNet-10 SSD).

    Optimized for small face detection in Zoom-like layouts where faces
    may be as small as 30-60px in a 1920x1080 frame.
    """

    def __init__(self, config: dict):
        self.min_confidence = config.get("min_confidence", 0.5)
        self._blob_size = config.get("dnn_blob_size", 900)

        prototxt = config.get("dnn_prototxt", _PROTOTXT)
        caffemodel = config.get("dnn_caffemodel", _CAFFEMODEL)

        self._net = cv2.dnn.readNetFromCaffe(prototxt, caffemodel)

    def detect(self, frame: np.ndarray) -> Optional[BoundingBox]:
        """Detect the largest face in a BGR frame."""
        boxes = self.detect_all(frame, max_faces=1)
        return boxes[0] if boxes else None

    def detect_all(self, frame: np.ndarray, max_faces: int = 3) -> list[BoundingBox]:
        """Detect all faces in a frame, sorted by size (largest first)."""
        h, w = frame.shape[:2]

        blob = cv2.dnn.blobFromImage(
            frame, 1.0, (self._blob_size, self._blob_size), _MEAN_VALUES
        )
        self._net.setInput(blob)
        detections = self._net.forward()

        boxes = []
        for i in range(detections.shape[2]):
            conf = float(detections[0, 0, i, 2])
            if conf < self.min_confidence:
                continue

            x1 = float(detections[0, 0, i, 3])
            y1 = float(detections[0, 0, i, 4])
            x2 = float(detections[0, 0, i, 5])
            y2 = float(detections[0, 0, i, 6])

            # Clamp to [0, 1]
            x1 = max(0.0, min(1.0, x1))
            y1 = max(0.0, min(1.0, y1))
            x2 = max(0.0, min(1.0, x2))
            y2 = max(0.0, min(1.0, y2))

            bw = x2 - x1
            bh = y2 - y1
            if bw <= 0 or bh <= 0:
                continue

            boxes.append(BoundingBox(
                x_center=(x1 + x2) / 2,
                y_center=(y1 + y2) / 2,
                width=bw,
                height=bh,
                confidence=conf,
            ))

        boxes.sort(key=lambda b: b.width * b.height, reverse=True)
        return boxes[:max_faces]
