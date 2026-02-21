import React from "react";
import { COLORS } from "../colors";

/**
 * LangChain Logo (SVG wordmark)
 * Simple text-based logo as fallback
 */
export const LangChainLogo: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Background circle */}
    <circle
      cx="300"
      cy="300"
      r="200"
      fill={COLORS.darkGray}
      opacity="0.3"
    />

    {/* Chain link icon */}
    <g transform="translate(300, 220)">
      {/* Left link */}
      <ellipse
        cx="-40"
        cy="0"
        rx="30"
        ry="45"
        fill="none"
        stroke={COLORS.primary}
        strokeWidth="12"
        transform="rotate(-25)"
      />
      {/* Right link */}
      <ellipse
        cx="40"
        cy="0"
        rx="30"
        ry="45"
        fill="none"
        stroke={COLORS.primary}
        strokeWidth="12"
        transform="rotate(25)"
      />
      {/* Center connector */}
      <rect
        x="-15"
        y="-8"
        width="30"
        height="16"
        rx="8"
        fill={COLORS.primary}
      />
    </g>

    {/* LangChain text */}
    <text
      x="300"
      y="360"
      textAnchor="middle"
      fill={COLORS.white}
      fontSize="52"
      fontWeight="800"
      letterSpacing="1"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      LangChain
    </text>

    {/* Glow effect */}
    <circle
      cx="300"
      cy="300"
      r="150"
      fill={COLORS.primary}
      opacity="0.1"
      filter="blur(40px)"
    />
  </svg>
);
