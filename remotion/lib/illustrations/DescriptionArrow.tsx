/**
 * Description Arrow CTA
 *
 * Animated arrow pointing down with "👇 Description" text.
 * Used for "Link in the description" CTA moments.
 *
 * Bouncing animation to draw attention.
 */

import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../colors';

interface DescriptionArrowProps {
  size?: number;
}

export const DescriptionArrow: React.FC<DescriptionArrowProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Bouncing arrow animation
  const arrowY = interpolate(
    frame % 40,
    [0, 20, 40],
    [0, 15, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'extend',
    }
  );

  // Text fade in
  const textOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Arrow fade in
  const arrowOpacity = interpolate(frame, [10, 25], [0, 1], {
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
      {/* Main text */}
      <g opacity={textOpacity}>
        <text
          x="300"
          y="220"
          textAnchor="middle"
          fill="#1A1A1A"
          fontSize="56"
          fontWeight="800"
        >
          Link in the
        </text>

        <text
          x="300"
          y="290"
          textAnchor="middle"
          fill={COLORS.primary}
          fontSize="72"
          fontWeight="900"
        >
          DESCRIPTION
        </text>
      </g>

      {/* Animated arrow */}
      <g opacity={arrowOpacity} transform={`translate(0, ${arrowY})`}>
        {/* Arrow shaft */}
        <rect
          x="285"
          y="350"
          width="30"
          height="120"
          rx="15"
          fill={COLORS.primary}
        />

        {/* Arrow head */}
        <polygon
          points="300,500 350,450 250,450"
          fill={COLORS.primary}
        />

        {/* Emoji pointer */}
        <text
          x="220"
          y="440"
          fontSize="64"
        >
          👇
        </text>

        <text
          x="350"
          y="440"
          fontSize="64"
        >
          👇
        </text>
      </g>

      {/* Pulsing glow effect */}
      <circle
        cx="300"
        cy="450"
        r="80"
        fill={COLORS.primary}
        opacity={
          interpolate(
            frame % 60,
            [0, 30, 60],
            [0.1, 0.2, 0.1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'extend',
            }
          ) * arrowOpacity
        }
      />
    </svg>
  );
};
