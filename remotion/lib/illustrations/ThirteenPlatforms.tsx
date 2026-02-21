/**
 * Thirteen Platforms Grid
 *
 * Visual grid showing all 13 supported social media platforms.
 * Used for "13 platforms" popup moments.
 *
 * Platforms: YouTube, Instagram, LinkedIn, Twitter/X, TikTok, Facebook,
 * Pinterest, Threads, Bluesky, Google Business, Telegram, Snapchat, Reddit
 */

import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../colors';

interface ThirteenPlatformsProps {
  size?: number;
}

export const ThirteenPlatforms: React.FC<ThirteenPlatformsProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Platform names and colors
  const platforms = [
    { name: 'YouTube', color: '#FF0000', abbr: 'YT' },
    { name: 'Instagram', color: '#E4405F', abbr: 'IG' },
    { name: 'LinkedIn', color: '#0A66C2', abbr: 'LI' },
    { name: 'Twitter/X', color: '#1DA1F2', abbr: 'X' },
    { name: 'TikTok', color: '#000000', abbr: 'TT' },
    { name: 'Facebook', color: '#1877F2', abbr: 'FB' },
    { name: 'Pinterest', color: '#E60023', abbr: 'PI' },
    { name: 'Threads', color: '#000000', abbr: 'TH' },
    { name: 'Bluesky', color: '#0085FF', abbr: 'BS' },
    { name: 'Google Biz', color: '#4285F4', abbr: 'GB' },
    { name: 'Telegram', color: '#26A5E4', abbr: 'TG' },
    { name: 'Snapchat', color: '#FFFC00', abbr: 'SC' },
    { name: 'Reddit', color: '#FF4500', abbr: 'RD' },
  ];

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
        13 Platforms
      </text>

      <text
        x="300"
        y="115"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="20"
        fontWeight="500"
      >
        All connected. All automated.
      </text>

      {/* Platform grid (3 columns x 5 rows, with last row having 1) */}
      {platforms.map((platform, index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);

        const x = 120 + col * 140;
        const y = 180 + row * 80;

        // Staggered reveal animation
        const opacity = interpolate(
          frame,
          [index * 2, index * 2 + 10],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        const scale = interpolate(
          frame,
          [index * 2, index * 2 + 10],
          [0.8, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        return (
          <g
            key={platform.name}
            opacity={opacity}
            transform={`translate(${x}, ${y}) scale(${scale})`}
            transform-origin={`${x} ${y}`}
          >
            {/* Platform circle */}
            <circle
              cx="0"
              cy="0"
              r="28"
              fill={platform.color}
              stroke="#1A1A1A"
              strokeWidth="2"
            />

            {/* Platform abbreviation */}
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="16"
              fontWeight="700"
            >
              {platform.abbr}
            </text>

            {/* Platform name below */}
            <text
              x="0"
              y="48"
              textAnchor="middle"
              fill="#1A1A1A"
              fontSize="12"
              fontWeight="600"
            >
              {platform.name}
            </text>
          </g>
        );
      })}

      {/* Orange accent line at bottom */}
      <rect
        x="200"
        y="560"
        width="200"
        height="4"
        rx="2"
        fill={COLORS.primary}
        opacity={interpolate(frame, [26, 36], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
      />
    </svg>
  );
};
