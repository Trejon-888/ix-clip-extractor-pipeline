import React from "react";
import { COLORS } from "../colors";

/**
 * Simplicity Text Illustration
 * Bold "SIMPLE" text with radiating sun rays
 * Represents the core message that the system is ridiculously simple
 */
export const SimplicityText: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Radiating sun rays (background) */}
    <g opacity="0.3">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
        const radians = (angle * Math.PI) / 180;
        const x1 = 300 + Math.cos(radians) * 120;
        const y1 = 300 + Math.sin(radians) * 120;
        const x2 = 300 + Math.cos(radians) * 280;
        const y2 = 300 + Math.sin(radians) * 280;

        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={COLORS.primary}
            strokeWidth="6"
            strokeLinecap="round"
          />
        );
      })}
    </g>

    {/* Central circle glow */}
    <circle
      cx="300"
      cy="300"
      r="120"
      fill={COLORS.primary}
      opacity="0.15"
    />
    <circle
      cx="300"
      cy="300"
      r="120"
      fill="none"
      stroke={COLORS.primary}
      strokeWidth="4"
    />

    {/* Main text: SIMPLE */}
    <text
      x="300"
      y="330"
      textAnchor="middle"
      fill={COLORS.white}
      fontSize="80"
      fontWeight="900"
      letterSpacing="4"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      SIMPLE
    </text>

    {/* Subtitle */}
    <text
      x="300"
      y="380"
      textAnchor="middle"
      fill={COLORS.primaryLight}
      fontSize="24"
      fontWeight="700"
      letterSpacing="3"
      opacity="0.8"
    >
      RIDICULOUSLY
    </text>

    {/* Decorative dots around circle */}
    {[45, 135, 225, 315].map((angle) => {
      const radians = (angle * Math.PI) / 180;
      const x = 300 + Math.cos(radians) * 140;
      const y = 300 + Math.sin(radians) * 140;

      return (
        <circle
          key={angle}
          cx={x}
          cy={y}
          r="8"
          fill={COLORS.primary}
        />
      );
    })}

    {/* Glow effect */}
    <circle
      cx="300"
      cy="300"
      r="100"
      fill={COLORS.primary}
      opacity="0.2"
      filter="blur(30px)"
    />
  </svg>
);
