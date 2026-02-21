/**
 * Skills Document Icon
 *
 * Markdown file with instructions/code
 * Represents the Skills system
 */

import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../colors';

interface SkillsDocumentProps {
  size?: number;
}

export const SkillsDocument: React.FC<SkillsDocumentProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Pop-in animation
  const scale = interpolate(
    frame,
    [0, 15],
    [0.8, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Code lines animate in
  const line1Opacity = interpolate(frame, [10, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const line2Opacity = interpolate(frame, [15, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const line3Opacity = interpolate(frame, [20, 30], [0, 1], {
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
      style={{ transform: `scale(${scale})` }}
    >
      {/* Title */}
      <text
        x="300"
        y="100"
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize="48"
        fontWeight="800"
      >
        Skills
      </text>

      <text
        x="300"
        y="140"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="20"
        fontWeight="500"
      >
        Job Descriptions for Your AI
      </text>

      {/* Document shape */}
      <rect
        x="150"
        y="180"
        width="300"
        height="320"
        rx="16"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="3"
      />

      {/* Folded corner */}
      <path
        d="M450 180V230L400 180H450Z"
        fill={COLORS.primary}
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* File type indicator */}
      <text
        x="200"
        y="235"
        fill="#6B7280"
        fontSize="16"
        fontWeight="600"
      >
        SKILL.md
      </text>

      {/* Code lines with icons */}
      <g opacity={line1Opacity}>
        <circle cx="200" cy="280" r="8" fill={COLORS.primary} />
        <rect
          x="225"
          y="270"
          width="180"
          height="20"
          rx="4"
          fill="#F3F4F6"
        />
        <text
          x="235"
          y="285"
          fill="#6B7280"
          fontSize="14"
          fontWeight="500"
        >
          Platform posting
        </text>
      </g>

      <g opacity={line2Opacity}>
        <circle cx="200" cy="340" r="8" fill={COLORS.primary} />
        <rect
          x="225"
          y="330"
          width="200"
          height="20"
          rx="4"
          fill="#F3F4F6"
        />
        <text
          x="235"
          y="345"
          fill="#6B7280"
          fontSize="14"
          fontWeight="500"
        >
          Content formatting
        </text>
      </g>

      <g opacity={line3Opacity}>
        <circle cx="200" cy="400" r="8" fill={COLORS.primary} />
        <rect
          x="225"
          y="390"
          width="160"
          height="20"
          rx="4"
          fill="#F3F4F6"
        />
        <text
          x="235"
          y="405"
          fill="#6B7280"
          fontSize="14"
          fontWeight="500"
        >
          API endpoints
        </text>
      </g>

      {/* Bottom accent */}
      <rect
        x="150"
        y="470"
        width="300"
        height="6"
        rx="3"
        fill={COLORS.primary}
      />
    </svg>
  );
};
