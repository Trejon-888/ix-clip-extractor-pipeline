import React from "react";
import { COLORS } from "../colors";

/**
 * "That's Completely Wrong" X Mark
 * Bold red X with emphasis
 */
export const WrongX: React.FC<{ size?: number }> = ({ size = 600 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Background glow */}
      <defs>
        <radialGradient id="wrongGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor={COLORS.error} stopOpacity="0.4" />
          <stop offset="100%" stopColor={COLORS.error} stopOpacity="0" />
        </radialGradient>
        <filter id="wrongShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor={COLORS.error} floodOpacity="0.6"/>
        </filter>
      </defs>

      <circle cx="300" cy="280" r="280" fill="url(#wrongGlow)" />

      {/* Circle background */}
      <circle
        cx="300"
        cy="280"
        r="160"
        fill={COLORS.darkGray}
        stroke={COLORS.error}
        strokeWidth="8"
      />

      {/* Big X mark */}
      <g filter="url(#wrongShadow)">
        <line
          x1="200"
          y1="180"
          x2="400"
          y2="380"
          stroke={COLORS.error}
          strokeWidth="40"
          strokeLinecap="round"
        />
        <line
          x1="400"
          y1="180"
          x2="200"
          y2="380"
          stroke={COLORS.error}
          strokeWidth="40"
          strokeLinecap="round"
        />
      </g>

      {/* "WRONG" text below */}
      <text
        x="300"
        y="500"
        textAnchor="middle"
        fill={COLORS.error}
        fontSize="56"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="6"
      >
        WRONG
      </text>
    </svg>
  );
};
