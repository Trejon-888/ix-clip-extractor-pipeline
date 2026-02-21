import React from "react";
import { COLORS } from "../colors";

/**
 * Progressive Disclosure Concept Illustration
 * Shows 3 layers revealing progressively from center
 * Represents the core concept of revealing information only when needed
 */
export const ProgressiveDisclosureConcept: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Outer layer - hint only (faded) */}
    <circle
      cx="300"
      cy="300"
      r="240"
      fill="none"
      stroke={COLORS.gray}
      strokeWidth="3"
      strokeDasharray="12 8"
      opacity="0.4"
    />
    <text
      x="300"
      y="85"
      textAnchor="middle"
      fill={COLORS.lightGray}
      fontSize="20"
      fontWeight="600"
      opacity="0.5"
    >
      LAYER 3: REFERENCE
    </text>

    {/* Middle layer - when needed (medium) */}
    <circle
      cx="300"
      cy="300"
      r="170"
      fill="none"
      stroke={COLORS.primary}
      strokeWidth="4"
      opacity="0.7"
    />
    <circle
      cx="300"
      cy="300"
      r="170"
      fill={COLORS.primary}
      opacity="0.05"
    />
    <text
      x="300"
      y="155"
      textAnchor="middle"
      fill={COLORS.primaryLight}
      fontSize="22"
      fontWeight="700"
      opacity="0.8"
    >
      LAYER 2: SKILL.MD
    </text>

    {/* Inner layer - always visible (bright) */}
    <circle
      cx="300"
      cy="300"
      r="100"
      fill={COLORS.primary}
      opacity="0.15"
    />
    <circle
      cx="300"
      cy="300"
      r="100"
      fill="none"
      stroke={COLORS.primary}
      strokeWidth="6"
    />
    <text
      x="300"
      y="285"
      textAnchor="middle"
      fill={COLORS.white}
      fontSize="24"
      fontWeight="800"
      letterSpacing="2"
    >
      LAYER 1:
    </text>
    <text
      x="300"
      y="315"
      textAnchor="middle"
      fill={COLORS.white}
      fontSize="24"
      fontWeight="800"
      letterSpacing="2"
    >
      DESCRIPTION
    </text>

    {/* Arrow indicators showing progressive reveal */}
    <g opacity="0.8">
      {/* Arrow from inner to middle */}
      <path
        d="M 300 100 L 300 70 M 300 70 L 290 80 M 300 70 L 310 80"
        stroke={COLORS.primary}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Arrow from middle to outer */}
      <path
        d="M 300 130 L 300 60 M 300 60 L 290 70 M 300 60 L 310 70"
        stroke={COLORS.primaryLight}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>

    {/* Central glow effect */}
    <circle
      cx="300"
      cy="300"
      r="60"
      fill={COLORS.primary}
      opacity="0.2"
      filter="blur(20px)"
    />
  </svg>
);
