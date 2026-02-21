/**
 * Pipeline Metric Visualization
 *
 * Shows the $350M pipeline sourcing achievement.
 * Used in the hook section when mentioning INFINITX track record.
 *
 * Clean, impactful number display with context.
 */

import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../colors';

interface PipelineMetricProps {
  size?: number;
}

export const PipelineMetric: React.FC<PipelineMetricProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Count-up animation for the number
  const displayNumber = interpolate(
    frame,
    [0, 40],
    [0, 350],
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

  // Orange accent line grows
  const accentWidth = interpolate(
    frame,
    [0, 20],
    [0, 250],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Subtle glow pulse
  const glowOpacity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.6, 0.3],
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
        fill={COLORS.primary}
        opacity={glowOpacity * 0.15}
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

      {/* Orange accent line */}
      <rect
        x={300 - accentWidth / 2}
        y="200"
        width={accentWidth}
        height="6"
        rx="3"
        fill={COLORS.primary}
      />

      {/* Dollar sign */}
      <text
        x="180"
        y="310"
        textAnchor="middle"
        fill={COLORS.primary}
        fontSize="72"
        fontWeight="800"
      >
        $
      </text>

      {/* Animated number */}
      <text
        x="380"
        y="310"
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize="96"
        fontWeight="900"
        letterSpacing="-2"
      >
        {Math.floor(displayNumber)}M
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
        Pipeline Sourced
      </text>

      {/* Additional context */}
      <text
        x="300"
        y="395"
        textAnchor="middle"
        fill="#9CA3AF"
        fontSize="16"
        fontWeight="500"
        opacity={subtitleOpacity}
      >
        by INFINITX AI Client Acquisition System
      </text>
    </svg>
  );
};
