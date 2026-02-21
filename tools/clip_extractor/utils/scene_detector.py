"""Scene change detection using frame histogram comparison.

Detects hard cuts between scenes by comparing HSV color histograms.
When a scene change is detected, smoothers and deadzone should be reset
to prevent the crop from drifting based on the previous scene's positions.
"""

import cv2
import numpy as np


class SceneDetector:
    """Detects scene changes by comparing consecutive frame histograms.

    Uses HSV histogram correlation — when the correlation drops below
    a threshold, it signals a hard cut (scene change).
    """

    def __init__(self, threshold: float = 0.15, min_interval: int = 30):
        """
        Args:
            threshold: Correlation threshold below which a scene change
                       is detected. Lower = less sensitive. Default 0.15.
            min_interval: Minimum frames between scene change detections
                          (cooldown to prevent rapid-fire false positives).
        """
        self._threshold = threshold
        self._min_interval = min_interval
        self._frames_since_last = min_interval  # Allow first detection
        self._prev_hist: np.ndarray | None = None

    def _compute_hist(self, frame: np.ndarray) -> np.ndarray:
        """Compute normalized HSV histogram for a frame."""
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        hist = cv2.calcHist(
            [hsv], [0, 1], None,
            [50, 60],          # H bins, S bins
            [0, 180, 0, 256],  # H range, S range
        )
        cv2.normalize(hist, hist, 0, 1, cv2.NORM_MINMAX)
        return hist

    def check(self, frame: np.ndarray) -> bool:
        """Check if this frame represents a scene change.

        Args:
            frame: BGR image as numpy array.

        Returns:
            True if a scene change is detected.
        """
        self._frames_since_last += 1
        hist = self._compute_hist(frame)

        if self._prev_hist is None:
            self._prev_hist = hist
            return False

        # Compare histograms using correlation
        correlation = cv2.compareHist(self._prev_hist, hist, cv2.HISTCMP_CORREL)
        self._prev_hist = hist

        # Low correlation = scene change (with cooldown to prevent rapid-fire)
        if correlation < self._threshold and self._frames_since_last >= self._min_interval:
            self._frames_since_last = 0
            return True
        return False

    def reset(self) -> None:
        """Reset detector state."""
        self._prev_hist = None
        self._frames_since_last = self._min_interval  # Allow immediate detection after reset
