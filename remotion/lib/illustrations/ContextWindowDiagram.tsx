import React from "react";
import { COLORS } from "../colors";

/**
 * Context Window Diagram Illustration
 * Shows stacked boxes representing context window capacity
 * Top 3 boxes inside frame (managed), bottom 2 faded/outside (overflow)
 * Represents the concept of not overwhelming the model's context window
 */
export const ContextWindowDiagram: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Frame representing context window boundary */}
    <rect
      x="150"
      y="100"
      width="300"
      height="300"
      rx="12"
      fill="none"
      stroke={COLORS.primary}
      strokeWidth="5"
    />

    {/* Label: CONTEXT WINDOW */}
    <text
      x="300"
      y="85"
      textAnchor="middle"
      fill={COLORS.white}
      fontSize="26"
      fontWeight="800"
      letterSpacing="3"
    >
      CONTEXT WINDOW
    </text>

    {/* Box 1 - Inside (top, bright orange) */}
    <g>
      <rect
        x="180"
        y="130"
        width="240"
        height="60"
        rx="8"
        fill={COLORS.primary}
        opacity="0.9"
      />
      <text
        x="300"
        y="167"
        textAnchor="middle"
        fill={COLORS.dark}
        fontSize="20"
        fontWeight="700"
      >
        SKILL 1
      </text>
    </g>

    {/* Box 2 - Inside (middle, bright orange) */}
    <g>
      <rect
        x="180"
        y="205"
        width="240"
        height="60"
        rx="8"
        fill={COLORS.primary}
        opacity="0.9"
      />
      <text
        x="300"
        y="242"
        textAnchor="middle"
        fill={COLORS.dark}
        fontSize="20"
        fontWeight="700"
      >
        SKILL 2
      </text>
    </g>

    {/* Box 3 - Inside (lower, bright orange) */}
    <g>
      <rect
        x="180"
        y="280"
        width="240"
        height="60"
        rx="8"
        fill={COLORS.primary}
        opacity="0.9"
      />
      <text
        x="300"
        y="317"
        textAnchor="middle"
        fill={COLORS.dark}
        fontSize="20"
        fontWeight="700"
      >
        SKILL 3
      </text>
    </g>

    {/* Checkmark indicator (managed successfully) */}
    <g transform="translate(430, 240)">
      <circle r="25" fill={COLORS.success} opacity="0.9" />
      <path
        d="M-8 0 L-3 5 L8 -6"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>

    {/* Box 4 - Outside/Overflow (faded gray) */}
    <g opacity="0.4">
      <rect
        x="180"
        y="420"
        width="240"
        height="60"
        rx="8"
        fill={COLORS.gray}
      />
      <text
        x="300"
        y="457"
        textAnchor="middle"
        fill={COLORS.lightGray}
        fontSize="20"
        fontWeight="700"
      >
        OVERFLOW
      </text>
    </g>

    {/* Box 5 - Outside/Overflow (faded gray) */}
    <g opacity="0.3">
      <rect
        x="180"
        y="495"
        width="240"
        height="60"
        rx="8"
        fill={COLORS.gray}
      />
      <text
        x="300"
        y="532"
        textAnchor="middle"
        fill={COLORS.lightGray}
        fontSize="20"
        fontWeight="700"
      >
        OVERFLOW
      </text>
    </g>

    {/* Warning indicator (overflow) */}
    <g transform="translate(430, 480)">
      <circle r="25" fill={COLORS.error} opacity="0.7" />
      <path
        d="M-8 -8 L8 8 M8 -8 L-8 8"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>

    {/* Arrows showing overflow direction */}
    <g opacity="0.5">
      <path
        d="M 300 365 L 300 405"
        stroke={COLORS.error}
        strokeWidth="3"
        strokeDasharray="8 4"
      />
      <path
        d="M 300 405 L 290 395 M 300 405 L 310 395"
        stroke={COLORS.error}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>

    {/* Label: WITHOUT PROGRESSIVE DISCLOSURE */}
    <text
      x="300"
      y="580"
      textAnchor="middle"
      fill={COLORS.lightGray}
      fontSize="18"
      fontWeight="600"
      opacity="0.6"
    >
      WITHOUT PROGRESSIVE DISCLOSURE
    </text>

    {/* Glow effect around frame */}
    <rect
      x="150"
      y="100"
      width="300"
      height="300"
      rx="12"
      fill="none"
      stroke={COLORS.primary}
      strokeWidth="2"
      opacity="0.3"
      filter="blur(8px)"
    />
  </svg>
);
