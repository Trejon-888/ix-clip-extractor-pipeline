"""Deadzone filter to suppress micro-movements in crop positioning.

Prevents the crop from moving when the face barely shifts — reduces
visual noise from detection jitter without adding smoothing lag.
"""


class DeadzoneFilter:
    """Don't move the crop unless the face moves beyond a threshold.

    The threshold is a percentage of frame width/height. For example,
    threshold_pct=0.05 means the face must move at least 5% of the
    frame width before the crop follows.
    """

    def __init__(
        self,
        threshold_pct: float = 0.05,
        vertical_threshold_pct: float | None = None,
    ):
        self.h_threshold = threshold_pct
        self.v_threshold = vertical_threshold_pct or threshold_pct
        self._locked_x: float | None = None
        self._locked_y: float | None = None

    def apply(self, x: float, y: float) -> tuple[float, float]:
        """Apply deadzone filtering to a position.

        Args:
            x: Input x position (normalized 0-1).
            y: Input y position (normalized 0-1).

        Returns:
            Filtered (x, y) — same as locked position unless threshold exceeded.
        """
        if self._locked_x is None:
            self._locked_x = x
            self._locked_y = y
            return x, y

        dx = abs(x - self._locked_x)
        dy = abs(y - self._locked_y)

        if dx > self.h_threshold or dy > self.v_threshold:
            self._locked_x = x
            self._locked_y = y

        return self._locked_x, self._locked_y

    def reset(self) -> None:
        """Reset locked position (e.g., on scene change)."""
        self._locked_x = None
        self._locked_y = None

    @property
    def is_active(self) -> bool:
        """Whether the deadzone is currently suppressing movement."""
        return self._locked_x is not None
