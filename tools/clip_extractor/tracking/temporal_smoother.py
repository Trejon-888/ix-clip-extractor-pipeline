"""Temporal smoothing to prevent jittery crop movements.

Supports EMA (simple) and Kalman filter (predictive, velocity-aware).
"""


class EMASmoother:
    """Exponential Moving Average for smooth crop transitions.

    Lower alpha = smoother (more lag, less responsive to sudden movements).
    Higher alpha = more responsive (less smooth, follows face closely).

    Recommended: 0.08-0.15 for talking head videos.
    """

    def __init__(self, alpha: float = 0.12):
        self.alpha = alpha
        self._prev_x: float | None = None
        self._prev_y: float | None = None

    def smooth(self, x: float, y: float) -> tuple[float, float]:
        """Apply EMA smoothing to a new position.

        Args:
            x: Raw detected x position (normalized 0-1).
            y: Raw detected y position (normalized 0-1).

        Returns:
            Smoothed (x, y) position.
        """
        if self._prev_x is None:
            self._prev_x = x
            self._prev_y = y
            return x, y

        self._prev_x = self.alpha * x + (1 - self.alpha) * self._prev_x
        self._prev_y = self.alpha * y + (1 - self.alpha) * self._prev_y
        return self._prev_x, self._prev_y

    def reset(self) -> None:
        """Reset smoother state (e.g., on scene change)."""
        self._prev_x = None
        self._prev_y = None

    @property
    def current(self) -> tuple[float, float] | None:
        """Current smoothed position, or None if not yet initialized."""
        if self._prev_x is None:
            return None
        return self._prev_x, self._prev_y


def create_smoother(config: dict):
    """Factory function to create the configured smoother.

    Supports 'ema' (simple exponential) and 'kalman' (predictive velocity model).
    """
    method = config.get("method", "ema")

    if method == "ema":
        alpha = config.get("ema", {}).get("alpha", 0.12)
        return EMASmoother(alpha=alpha)
    elif method == "kalman":
        from .kalman_smoother import KalmanSmoother
        kalman_cfg = config.get("kalman", {})
        return KalmanSmoother(
            process_noise=kalman_cfg.get("process_noise", 0.01),
            measurement_noise=kalman_cfg.get("measurement_noise", 0.1),
        )
    else:
        print(f"[clip-extractor] Unknown smoothing method '{method}', using EMA")
        return EMASmoother(alpha=0.12)
