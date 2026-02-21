"""Signal fusion — weighted merge of face, pose, and saliency detections.

Combines multiple detection signals into a single (x, y) crop target.
Gracefully handles missing signals by re-normalizing weights.
"""

from typing import Optional

from .detector_base import BoundingBox


def fuse_signals(
    face: Optional[BoundingBox],
    pose: Optional[BoundingBox],
    saliency: Optional[BoundingBox],
    weights: dict,
    last_known: tuple[float, float] = (0.5, 0.5),
) -> tuple[float, float, float]:
    """Fuse multiple detection signals into a single crop target.

    Uses weighted average of available signals. Re-normalizes weights when
    some detectors return None.

    Args:
        face: Face detection result (highest priority).
        pose: Pose estimation result (body center).
        saliency: Saliency detection result (visual focus point).
        weights: Config dict with face_weight, pose_weight, saliency_weight.
        last_known: Fallback (x, y) if all detectors return None.

    Returns:
        Tuple of (x, y, confidence) where x, y are normalized 0-1.
    """
    face_w = weights.get("face_weight", 0.6)
    pose_w = weights.get("pose_weight", 0.25)
    saliency_w = weights.get("saliency_weight", 0.15)

    # Collect available signals with their weights
    signals: list[tuple[float, float, float, float]] = []  # (x, y, confidence, weight)

    if face is not None:
        signals.append((face.x_center, face.y_center, face.confidence, face_w))
    if pose is not None:
        signals.append((pose.x_center, pose.y_center, pose.confidence, pose_w))
    if saliency is not None:
        signals.append((saliency.x_center, saliency.y_center, saliency.confidence, saliency_w))

    if not signals:
        return last_known[0], last_known[1], 0.0

    # Re-normalize weights so they sum to 1.0
    total_weight = sum(s[3] for s in signals)

    fused_x = sum(s[0] * s[3] for s in signals) / total_weight
    fused_y = sum(s[1] * s[3] for s in signals) / total_weight
    fused_conf = sum(s[2] * s[3] for s in signals) / total_weight

    return fused_x, fused_y, fused_conf
