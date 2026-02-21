/**
 * $90K Metric Card
 *
 * Zach's reselling result: $90,000 in 90 days
 * Count-up animation for testimonial section
 */

import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../colors';

interface MetricCard90KProps {
  size?: number;
}

export const MetricCard90K: React.FC<MetricCard90KProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Count-up animation
  const displayNumber = interpolate(
    frame,
    [0, 40],
    [0, 90],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Fade in subtitle
  const subtitleOpacity = interpolate(
    frame,
    [30, 40],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Green accent (success color)
  const accentWidth = interpolate(
    frame,
    [0, 20],
    [0, 250],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background glow */}
      <circle
        cx="300"
        cy="280"
        r="180"
        fill="#10B981"
        opacity="0.10"
      />

      {/* Main container */}
      <rect
        x="100"
        y="180"
        width="400"
        height="240"
        rx="20"
        fill="#FFFFFF"
        stroke="#E5E7EB"
        strokeWidth="2"
      />

      {/* Green accent line */}
      <rect
        x={300 - accentWidth / 2}
        y="200"
        width={accentWidth}
        height="6"
        rx="3"
        fill="#10B981"
      />

      {/* Dollar sign */}
      <text
        x="150"
        y="310"
        textAnchor="middle"
        fill="#10B981"
        fontSize="72"
        fontWeight="800"
      >
        $
      </text>

      {/* Animated number */}
      <text
        x="350"
        y="310"
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize="96"
        fontWeight="900"
        letterSpacing="-2"
      >
        {Math.floor(displayNumber)}K
      </text>

      {/* Subtitle */}
      <text
        x="300"
        y="365"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="24"
        fontWeight="600"
        opacity={subtitleOpacity}
      >
        in 90 Days
      </text>

      {/* Context */}
      <text
        x="300"
        y="395"
        textAnchor="middle"
        fill="#9CA3AF"
        fontSize="16"
        fontWeight="500"
        opacity={subtitleOpacity}
      >
        Reselling the IX System
      </text>
    </svg>
  );
};
