"""Kalman filter for predictive position smoothing.

Better than EMA for sudden movements because it models velocity.
Uses filterpy's KalmanFilter with a constant-velocity model:
state = [x, y, vx, vy], measurement = [x, y].
"""

import numpy as np
from filterpy.kalman import KalmanFilter


class KalmanSmoother:
    """Kalman filter smoother with constant-velocity motion model.

    State vector: [x, y, vx, vy] (position + velocity)
    Measurement: [x, y] (observed position from detection)

    Predicts position based on velocity, then corrects with measurement.
    Handles detection gaps by running predict-only steps.
    """

    def __init__(self, process_noise: float = 0.01, measurement_noise: float = 0.1):
        self._process_noise = process_noise
        self._measurement_noise = measurement_noise
        self._kf: KalmanFilter | None = None
        self._initialized = False

    def _init_filter(self, x: float, y: float) -> None:
        """Initialize the Kalman filter with first measurement."""
        kf = KalmanFilter(dim_x=4, dim_z=2)

        # State transition matrix (constant velocity model)
        # [x, y, vx, vy] -> [x + vx*dt, y + vy*dt, vx, vy]
        dt = 1.0  # Normalized time step
        kf.F = np.array([
            [1, 0, dt, 0],
            [0, 1, 0, dt],
            [0, 0, 1,  0],
            [0, 0, 0,  1],
        ])

        # Measurement matrix (we observe x, y)
        kf.H = np.array([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
        ])

        # Process noise covariance
        q = self._process_noise
        kf.Q = np.array([
            [q, 0, 0, 0],
            [0, q, 0, 0],
            [0, 0, q * 2, 0],
            [0, 0, 0, q * 2],
        ])

        # Measurement noise covariance
        r = self._measurement_noise
        kf.R = np.array([
            [r, 0],
            [0, r],
        ])

        # Initial state covariance (high uncertainty)
        kf.P *= 1.0

        # Initial state
        kf.x = np.array([x, y, 0, 0])

        self._kf = kf
        self._initialized = True

    def smooth(self, x: float, y: float) -> tuple[float, float]:
        """Apply Kalman filter smoothing to a new measurement.

        Args:
            x: Measured x position (normalized 0-1).
            y: Measured y position (normalized 0-1).

        Returns:
            Smoothed (x, y) position.
        """
        if not self._initialized:
            self._init_filter(x, y)
            return x, y

        # Predict next state
        self._kf.predict()

        # Update with measurement
        self._kf.update(np.array([x, y]))

        # Return smoothed position
        sx = float(np.clip(self._kf.x[0], 0, 1))
        sy = float(np.clip(self._kf.x[1], 0, 1))
        return sx, sy

    def reset(self) -> None:
        """Reset filter state (e.g., on scene change)."""
        self._kf = None
        self._initialized = False

    @property
    def current(self) -> tuple[float, float] | None:
        """Current smoothed position, or None if not yet initialized."""
        if not self._initialized:
            return None
        return float(self._kf.x[0]), float(self._kf.x[1])
