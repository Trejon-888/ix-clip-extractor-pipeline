"""Abstract base class for all detection layers."""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Optional

import numpy as np


@dataclass
class BoundingBox:
    """Normalized bounding box (0-1 range relative to frame dimensions)."""

    x_center: float   # Horizontal center (0=left, 1=right)
    y_center: float   # Vertical center (0=top, 1=bottom)
    width: float       # Box width as fraction of frame width
    height: float      # Box height as fraction of frame height
    confidence: float  # Detection confidence (0-1)


class DetectorBase(ABC):
    """Base class for detection layers (face, pose, saliency)."""

    @abstractmethod
    def detect(self, frame: np.ndarray) -> Optional[BoundingBox]:
        """Run detection on a single frame.

        Args:
            frame: BGR image as numpy array (H, W, 3).

        Returns:
            BoundingBox with normalized coordinates, or None if nothing detected.
        """
        ...

    def close(self) -> None:
        """Release any resources held by the detector."""
        pass
