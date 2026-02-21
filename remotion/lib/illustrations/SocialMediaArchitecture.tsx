/**
 * Social Media Architecture Diagram
 *
 * Flow diagram: Claude Code → Late MCP → 13 Platforms
 * Explicitly shown in script at Framework section (~1:30-2:00)
 *
 * Apple aesthetic: white background, clean boxes, orange accents
 */

import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../colors';

interface SocialMediaArchitectureProps {
  size?: number;
}

export const SocialMediaArchitecture: React.FC<SocialMediaArchitectureProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Staggered reveals for each component
  const box1Opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrow1Opacity = interpolate(frame, [10, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const box2Opacity = interpolate(frame, [20, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrow2Opacity = interpolate(frame, [30, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const box3Opacity = interpolate(frame, [40, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle pulse animation for the bridge (MCP)
  const bridgePulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.05, 1],
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
      {/* Box 1: Claude Code */}
      <g opacity={box1Opacity}>
        <rect
          x="40"
          y="230"
          width="140"
          height="140"
          rx="12"
          fill="#F3F4F6"
          stroke="#1A1A1A"
          strokeWidth="3"
        />
        <text
          x="110"
          y="285"
          textAnchor="middle"
          fill="#1A1A1A"
          fontSize="18"
          fontWeight="700"
        >
          Claude
        </text>
        <text
          x="110"
          y="310"
          textAnchor="middle"
          fill="#1A1A1A"
          fontSize="18"
          fontWeight="700"
        >
          Code
        </text>
        <text
          x="110"
          y="340"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="14"
          fontWeight="500"
        >
          The Brain
        </text>
      </g>

      {/* Arrow 1 */}
      <g opacity={arrow1Opacity}>
        <line
          x1="180"
          y1="300"
          x2="220"
          y2="300"
          stroke={COLORS.primary}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <polygon
          points="220,300 210,295 210,305"
          fill={COLORS.primary}
        />
      </g>

      {/* Box 2: Late MCP (Bridge) */}
      <g opacity={box2Opacity} transform={`scale(${bridgePulse})`} transform-origin="300 300">
        <rect
          x="230"
          y="230"
          width="140"
          height="140"
          rx="12"
          fill={COLORS.primary}
          stroke="#1A1A1A"
          strokeWidth="3"
        />
        <text
          x="300"
          y="285"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="18"
          fontWeight="700"
        >
          Late
        </text>
        <text
          x="300"
          y="310"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="18"
          fontWeight="700"
        >
          MCP
        </text>
        <text
          x="300"
          y="340"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="14"
          fontWeight="500"
          opacity="0.9"
        >
          The Bridge
        </text>
      </g>

      {/* Arrow 2 */}
      <g opacity={arrow2Opacity}>
        <line
          x1="370"
          y1="300"
          x2="410"
          y2="300"
          stroke={COLORS.primary}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <polygon
          points="410,300 400,295 400,305"
          fill={COLORS.primary}
        />
      </g>

      {/* Box 3: 13 Platforms (Grid) */}
      <g opacity={box3Opacity}>
        <rect
          x="420"
          y="230"
          width="140"
          height="140"
          rx="12"
          fill="#F3F4F6"
          stroke="#1A1A1A"
          strokeWidth="3"
        />

        {/* Platform dots (3x3 grid representing multiple platforms) */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={450 + col * 30}
              cy={260 + row * 30}
              r="8"
              fill={COLORS.primary}
            />
          ))
        )}

        <text
          x="490"
          y="340"
          textAnchor="middle"
          fill="#1A1A1A"
          fontSize="16"
          fontWeight="700"
        >
          13 Platforms
        </text>
      </g>

      {/* Labels at bottom */}
      <g opacity={box1Opacity}>
        <text
          x="110"
          y="410"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="14"
          fontWeight="600"
        >
          You talk to Claude
        </text>
      </g>

      <g opacity={box2Opacity}>
        <text
          x="300"
          y="410"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="14"
          fontWeight="600"
        >
          MCP connects
        </text>
      </g>

      <g opacity={box3Opacity}>
        <text
          x="490"
          y="410"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="14"
          fontWeight="600"
        >
          Posts go live
        </text>
      </g>
    </svg>
  );
};
