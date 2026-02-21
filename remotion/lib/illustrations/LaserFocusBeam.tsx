import React from "react";
import { COLORS } from "../colors";

/**
 * Laser Focus Beam Illustration
 * Laser beam from top-left hitting bullseye target at center
 * Represents precision, focus, and transformation from chaos to clarity
 */
export const LaserFocusBeam: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Laser beam from top-left to center */}
    <defs>
      {/* Gradient for laser beam */}
      <linearGradient id="laserGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.3" />
        <stop offset="100%" stopColor={COLORS.primary} stopOpacity="1" />
      </linearGradient>

      {/* Glow filter */}
      <filter id="glow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Outer glow beam */}
    <line
      x1="80"
      y1="80"
      x2="300"
      y2="300"
      stroke={COLORS.primary}
      strokeWidth="40"
      strokeLinecap="round"
      opacity="0.15"
      filter="url(#glow)"
    />

    {/* Main laser beam */}
    <line
      x1="80"
      y1="80"
      x2="300"
      y2="300"
      stroke="url(#laserGradient)"
      strokeWidth="12"
      strokeLinecap="round"
      filter="url(#glow)"
    />

    {/* Laser source (top-left) */}
    <circle
      cx="80"
      cy="80"
      r="20"
      fill={COLORS.primary}
      opacity="0.8"
    />
    <circle
      cx="80"
      cy="80"
      r="12"
      fill={COLORS.white}
    />
    <circle
      cx="80"
      cy="80"
      r="30"
      fill={COLORS.primary}
      opacity="0.3"
      filter="blur(10px)"
    />

    {/* Target circles (bullseye) at center */}
    <circle
      cx="300"
      cy="300"
      r="120"
      fill="none"
      stroke={COLORS.silver}
      strokeWidth="3"
      opacity="0.4"
    />
    <circle
      cx="300"
      cy="300"
      r="80"
      fill="none"
      stroke={COLORS.lightGray}
      strokeWidth="3"
      opacity="0.5"
    />
    <circle
      cx="300"
      cy="300"
      r="40"
      fill="none"
      stroke={COLORS.primary}
      strokeWidth="4"
    />

    {/* Center bullseye (laser hit point) */}
    <circle
      cx="300"
      cy="300"
      r="20"
      fill={COLORS.primary}
    />
    <circle
      cx="300"
      cy="300"
      r="12"
      fill={COLORS.white}
    />

    {/* Impact glow at target */}
    <circle
      cx="300"
      cy="300"
      r="60"
      fill={COLORS.primary}
      opacity="0.3"
      filter="blur(25px)"
    />

    {/* Crosshair on target */}
    <line
      x1="300"
      y1="260"
      x2="300"
      y2="340"
      stroke={COLORS.primary}
      strokeWidth="2"
      opacity="0.6"
    />
    <line
      x1="260"
      y1="300"
      x2="340"
      y2="300"
      stroke={COLORS.primary}
      strokeWidth="2"
      opacity="0.6"
    />

    {/* Text label */}
    <text
      x="300"
      y="460"
      textAnchor="middle"
      fill={COLORS.white}
      fontSize="32"
      fontWeight="800"
      letterSpacing="3"
    >
      LASER FOCUS
    </text>

    {/* Decorative particles along beam path */}
    {[0.2, 0.4, 0.6, 0.8].map((t) => {
      const x = 80 + (300 - 80) * t;
      const y = 80 + (300 - 80) * t;
      const offset = (Math.random() - 0.5) * 30;

      return (
        <circle
          key={t}
          cx={x + offset}
          cy={y + offset}
          r={4}
          fill={COLORS.primary}
          opacity={0.6}
        />
      );
    })}
  </svg>
);
