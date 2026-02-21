/**
 * MCP Bridge Concept
 *
 * Visual representation of MCP as a bridge
 * connecting Claude to social platforms
 */

import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../colors';

interface MCPBridgeProps {
  size?: number;
}

export const MCPBridge: React.FC<MCPBridgeProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Draw animation for bridge
  const bridgeProgress = interpolate(
    frame,
    [0, 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Platforms fade in
  const platformsOpacity = interpolate(
    frame,
    [25, 35],
    [0, 1],
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
      {/* Title */}
      <text
        x="300"
        y="80"
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize="42"
        fontWeight="800"
      >
        MCP Server
      </text>

      <text
        x="300"
        y="115"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="20"
        fontWeight="500"
      >
        The Bridge Between AI and Platforms
      </text>

      {/* Claude side (left) */}
      <g opacity={bridgeProgress}>
        <rect
          x="50"
          y="300"
          width="120"
          height="80"
          rx="12"
          fill="#F3F4F6"
          stroke="#1A1A1A"
          strokeWidth="3"
        />
        <text
          x="110"
          y="350"
          textAnchor="middle"
          fill="#1A1A1A"
          fontSize="20"
          fontWeight="700"
        >
          Claude
        </text>
      </g>

      {/* Bridge structure */}
      <g opacity={bridgeProgress}>
        {/* Bridge deck */}
        <rect
          x="170"
          y="330"
          width={260 * bridgeProgress}
          height="20"
          fill={COLORS.primary}
          stroke="#1A1A1A"
          strokeWidth="2"
        />

        {/* Bridge supports */}
        <line
          x1="250"
          y1="350"
          x2="250"
          y2="420"
          stroke={COLORS.primary}
          strokeWidth="4"
          opacity={bridgeProgress}
        />
        <line
          x1="350"
          y1="350"
          x2="350"
          y2="420"
          stroke={COLORS.primary}
          strokeWidth="4"
          opacity={bridgeProgress}
        />

        {/* MCP label on bridge */}
        <text
          x="300"
          y="320"
          textAnchor="middle"
          fill={COLORS.primary}
          fontSize="24"
          fontWeight="700"
        >
          MCP
        </text>
      </g>

      {/* Platforms side (right) */}
      <g opacity={platformsOpacity}>
        <rect
          x="430"
          y="240"
          width="120"
          height="60"
          rx="12"
          fill="#F3F4F6"
          stroke="#1A1A1A"
          strokeWidth="2"
        />
        <text
          x="490"
          y="275"
          textAnchor="middle"
          fill="#1A1A1A"
          fontSize="14"
          fontWeight="600"
        >
          YouTube
        </text>

        <rect
          x="430"
          y="310"
          width="120"
          height="60"
          rx="12"
          fill="#F3F4F6"
          stroke="#1A1A1A"
          strokeWidth="2"
        />
        <text
          x="490"
          y="345"
          textAnchor="middle"
          fill="#1A1A1A"
          fontSize="14"
          fontWeight="600"
        >
          Instagram
        </text>

        <rect
          x="430"
          y="380"
          width="120"
          height="60"
          rx="12"
          fill="#F3F4F6"
          stroke="#1A1A1A"
          strokeWidth="2"
        />
        <text
          x="490"
          y="415"
          textAnchor="middle"
          fill="#1A1A1A"
          fontSize="14"
          fontWeight="600"
        >
          LinkedIn
        </text>

        {/* ... more label */}
        <text
          x="490"
          y="465"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="18"
          fontWeight="600"
        >
          + 10 more
        </text>
      </g>

      {/* Data flow animation */}
      <g opacity={interpolate(frame % 60, [0, 30, 60], [0.3, 1, 0.3], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'extend',
      })}>
        <circle cx="200" cy="340" r="6" fill={COLORS.primary} />
        <circle cx="300" cy="340" r="6" fill={COLORS.primary} />
        <circle cx="400" cy="340" r="6" fill={COLORS.primary} />
      </g>
    </svg>
  );
};
