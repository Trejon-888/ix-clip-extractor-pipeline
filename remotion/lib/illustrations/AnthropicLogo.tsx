import React from "react";
import { COLORS } from "../colors";

/**
 * Anthropic Logo (Stylized)
 * Shows the Anthropic "A" mark with brand colors
 */
export const AnthropicLogo: React.FC<{ size?: number }> = ({ size = 600 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Background glow */}
      <defs>
        <radialGradient id="anthropicGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#D97757" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D97757" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="300" cy="300" r="250" fill="url(#anthropicGlow)" />

      {/* Anthropic "A" mark - stylized */}
      <g transform="translate(150, 150)">
        {/* Main "A" shape */}
        <path
          d="M 150 50 L 50 250 L 90 250 L 110 200 L 190 200 L 210 250 L 250 250 L 150 50 Z M 125 165 L 150 100 L 175 165 L 125 165 Z"
          fill="#D97757"
        />
        {/* Subtle inner detail */}
        <path
          d="M 150 80 L 130 160 L 170 160 Z"
          fill={COLORS.darkGray}
        />
      </g>

      {/* "ANTHROPIC" text below */}
      <text
        x="300"
        y="450"
        textAnchor="middle"
        fill="#D97757"
        fontSize="48"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="8"
      >
        ANTHROPIC
      </text>

      {/* Subtle border ring */}
      <circle
        cx="300"
        cy="280"
        r="180"
        fill="none"
        stroke="#D97757"
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  );
};
