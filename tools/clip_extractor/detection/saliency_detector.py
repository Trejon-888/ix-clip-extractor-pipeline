"""OpenCV spectral residual saliency detector.

Identifies visually prominent regions in frames — useful for screen recordings,
demos, and content-heavy frames where face detection alone is insufficient.
Uses OpenCV's StaticSaliencySpectralResidual (fast, CPU-only, no PyTorch).
"""

from typing import Optional

import cv2
import numpy as np

from .detector_base import BoundingBox, DetectorBase


class SaliencyDetector(DetectorBase):
    """Detects the most visually salient region in a frame.

    Computes a spectral residual saliency map, thresholds it, and returns
    a BoundingBox centered on the largest salient region. Fast (~2ms/frame).
    """

    def __init__(self, config: dict):
        self._threshold = config.get("threshold", 0.4)
        self._min_area_pct = config.get("min_area_pct", 0.02)
        self._saliency = cv2.saliency.StaticSaliencySpectralResidual_create()

    def detect(self, frame: np.ndarray) -> Optional[BoundingBox]:
        """Detect the most salient region in a BGR frame.

        Returns a BoundingBox centered on the salient region's centroid,
        with confidence proportional to the saliency strength.
        """
        h, w = frame.shape[:2]

        # Compute saliency map (returns float32, 0-1 range)
        success, saliency_map = self._saliency.computeSaliency(frame)
        if not success or saliency_map is None:
            return None

        saliency_map = saliency_map.astype(np.float32)

        # Normalize to 0-1 if not already
        map_max = saliency_map.max()
        if map_max > 0:
            saliency_map = saliency_map / map_max

        # Threshold to find salient regions
        binary = (saliency_map > self._threshold).astype(np.uint8) * 255

        # Find contours of salient regions
        contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            return None

        # Find the largest salient region
        largest = max(contours, key=cv2.contourArea)
        area = cv2.contourArea(largest)

        # Skip if salient region is too small
        frame_area = h * w
        if area / frame_area < self._min_area_pct:
            return None

        # Get bounding rect and centroid
        x, y, bw, bh = cv2.boundingRect(largest)
        cx = (x + bw / 2) / w
        cy = (y + bh / 2) / h
        norm_w = bw / w
        norm_h = bh / h

        # Confidence from average saliency within the region
        mask = np.zeros((h, w), dtype=np.uint8)
        cv2.drawContours(mask, [largest], -1, 255, -1)
        avg_saliency = float(cv2.mean(saliency_map, mask=mask)[0])

        return BoundingBox(
            x_center=float(np.clip(cx, 0, 1)),
            y_center=float(np.clip(cy, 0, 1)),
            width=float(np.clip(norm_w, 0, 1)),
            height=float(np.clip(norm_h, 0, 1)),
            confidence=avg_saliency,
        )

    def close(self) -> None:
        pass
