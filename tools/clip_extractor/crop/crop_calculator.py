"""Compute crop window from face center position and configuration."""

from dataclasses import dataclass


@dataclass
class CropWindow:
    """Pixel-level crop coordinates for FFmpeg."""

    x: int       # Left edge of crop
    y: int       # Top edge of crop
    width: int   # Crop width in pixels
    height: int  # Crop height in pixels


class CropCalculator:
    """Converts normalized face center position to pixel crop window.

    For 9:16 output from 16:9 source:
    - Crop height = source height (use full vertical)
    - Crop width = source_height * (9/16) ≈ 607px from 1080p
    - Horizontal position follows face center
    - Vertical crop always starts at y=0 (full height)

    For 1:1 output:
    - Crop is square with side = source height
    - Same logic but wider crop window
    """

    def __init__(self, source_w: int, source_h: int, output_format: str = "9x16"):
        self.source_w = source_w
        self.source_h = source_h

        if output_format == "9x16":
            self.aspect = 9 / 16
        elif output_format == "1x1":
            self.aspect = 1.0
        else:
            raise ValueError(f"Unsupported format: {output_format}. Use '9x16' or '1x1'.")

        self.crop_h = source_h
        self.crop_w = int(source_h * self.aspect)

        # Ensure crop fits within source
        if self.crop_w > source_w:
            self.crop_w = source_w

    def compute(self, face_x_norm: float, face_y_norm: float = 0.5) -> CropWindow:
        """Compute crop window centered on face position.

        Args:
            face_x_norm: Normalized face x center (0=left, 1=right).
            face_y_norm: Normalized face y center (unused for 9:16 — always full height).

        Returns:
            CropWindow with pixel coordinates clamped to frame boundaries.
        """
        # Convert normalized face position to pixels
        face_x_px = face_x_norm * self.source_w

        # Center crop on face
        crop_x = int(face_x_px - self.crop_w / 2)

        # Clamp to frame boundaries (never show black bars)
        crop_x = max(0, min(crop_x, self.source_w - self.crop_w))

        return CropWindow(
            x=crop_x,
            y=0,
            width=self.crop_w,
            height=self.crop_h,
        )

    @property
    def output_dimensions(self) -> tuple[int, int]:
        """Final output dimensions after scaling."""
        if self.aspect == 9 / 16:
            return 1080, 1920
        elif self.aspect == 1.0:
            return 1080, 1080
        return self.crop_w, self.crop_h
