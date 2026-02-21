/**
 * Time Comparison Visualization
 *
 * Compares "90 seconds" (new way) vs "1 hour" (old way).
 * Shows the dramatic efficiency improvement.
 *
 * Used in Live Demo section when highlighting time savings.
 */

import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../colors';

interface TimeComparisonProps {
  size?: number;
}

export const TimeComparison: React.FC<TimeComparisonProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Reveal animations
  const oldWayOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const vsOpacity = interpolate(frame, [15, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const newWayOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Checkmark animation
  const checkmarkScale = interpolate(frame, [40, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Title */}
      <text
        x="300"
        y="80"
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize="36"
        fontWeight="800"
      >
        Time to Post to 5 Platforms
      </text>

      {/* OLD WAY - Left side */}
      <g opacity={oldWayOpacity}>
        {/* Container */}
        <rect
          x="50"
          y="150"
          width="220"
          height="300"
          rx="16"
          fill="#FEE2E2"
          stroke="#EF4444"
          strokeWidth="3"
        />

        {/* Label */}
        <text
          x="160"
          y="190"
          textAnchor="middle"
          fill="#991B1B"
          fontSize="20"
          fontWeight="700"
        >
          OLD WAY
        </text>

        {/* Big time number */}
        <text
          x="160"
          y="280"
          textAnchor="middle"
          fill="#DC2626"
          fontSize="72"
          fontWeight="900"
        >
          1
        </text>

        <text
          x="160"
          y="330"
          textAnchor="middle"
          fill="#DC2626"
          fontSize="48"
          fontWeight="700"
        >
          HOUR
        </text>

        {/* X mark */}
        <g transform="translate(160, 390)">
          <circle cx="0" cy="0" r="25" fill="#DC2626" />
          <line
            x1="-12"
            y1="-12"
            x2="12"
            y2="12"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="-12"
            x2="-12"
            y2="12"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* VS divider */}
      <g opacity={vsOpacity}>
        <circle cx="300" cy="300" r="35" fill={COLORS.primary} />
        <text
          x="300"
          y="312"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="24"
          fontWeight="800"
        >
          VS
        </text>
      </g>

      {/* NEW WAY - Right side */}
      <g opacity={newWayOpacity}>
        {/* Container */}
        <rect
          x="330"
          y="150"
          width="220"
          height="300"
          rx="16"
          fill="#D1FAE5"
          stroke="#10B981"
          strokeWidth="3"
        />

        {/* Label */}
        <text
          x="440"
          y="190"
          textAnchor="middle"
          fill="#065F46"
          fontSize="20"
          fontWeight="700"
        >
          NEW WAY
        </text>

        {/* Big time number */}
        <text
          x="440"
          y="280"
          textAnchor="middle"
          fill="#059669"
          fontSize="72"
          fontWeight="900"
        >
          90
        </text>

        <text
          x="440"
          y="330"
          textAnchor="middle"
          fill="#059669"
          fontSize="36"
          fontWeight="700"
        >
          SECONDS
        </text>

        {/* Checkmark */}
        <g transform={`translate(440, 390) scale(${checkmarkScale})`}>
          <circle cx="0" cy="0" r="25" fill="#10B981" />
          <polyline
            points="-10,0 -3,8 12,-8"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>

      {/* Bottom text */}
      <text
        x="300"
        y="520"
        textAnchor="middle"
        fill={COLORS.primary}
        fontSize="28"
        fontWeight="700"
        opacity={newWayOpacity}
      >
        40x Faster
      </text>
    </svg>
  );
};
