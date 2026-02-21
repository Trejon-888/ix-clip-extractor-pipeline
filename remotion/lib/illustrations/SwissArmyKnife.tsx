import React from "react";
import { COLORS } from "../colors";

/**
 * Swiss Army Knife for AI
 * Multi-tool visual with skill blades fanning out
 */
export const SwissArmyKnife: React.FC<{ size?: number }> = ({ size = 600 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#CCCCCC" />
          <stop offset="100%" stopColor="#EEEEEE" />
        </linearGradient>
      </defs>

      {/* Main body (red handle) */}
      <rect x="220" y="240" width="160" height="120" rx="16" fill={COLORS.error} />
      <rect x="225" y="245" width="150" height="110" rx="14" fill="#CC3333" />

      {/* Cross/plus symbol on handle */}
      <rect x="287" y="270" width="26" height="60" rx="4" fill={COLORS.white} opacity="0.9" />
      <rect x="270" y="287" width="60" height="26" rx="4" fill={COLORS.white} opacity="0.9" />

      {/* Blade 1 - top-left (fanned out) */}
      <g transform="rotate(-60, 230, 250)">
        <rect x="230" y="150" width="16" height="100" rx="8" fill="url(#bladeGrad)" />
        <text x="238" y="140" textAnchor="middle" fill={COLORS.primary} fontSize="14" fontWeight="700">SKILL 1</text>
      </g>

      {/* Blade 2 - top */}
      <g transform="rotate(-30, 260, 250)">
        <rect x="260" y="140" width="16" height="110" rx="8" fill="url(#bladeGrad)" />
        <text x="268" y="125" textAnchor="middle" fill={COLORS.primary} fontSize="14" fontWeight="700">SKILL 2</text>
      </g>

      {/* Blade 3 - top-center */}
      <g transform="rotate(0, 292, 240)">
        <rect x="292" y="120" width="16" height="120" rx="8" fill="url(#bladeGrad)" />
        <text x="300" y="110" textAnchor="middle" fill={COLORS.primary} fontSize="14" fontWeight="700">SKILL 3</text>
      </g>

      {/* Blade 4 - top-right */}
      <g transform="rotate(30, 324, 250)">
        <rect x="324" y="140" width="16" height="110" rx="8" fill="url(#bladeGrad)" />
        <text x="332" y="125" textAnchor="middle" fill={COLORS.primary} fontSize="14" fontWeight="700">SKILL 4</text>
      </g>

      {/* Blade 5 - right (fanned out) */}
      <g transform="rotate(60, 360, 250)">
        <rect x="354" y="150" width="16" height="100" rx="8" fill="url(#bladeGrad)" />
        <text x="362" y="140" textAnchor="middle" fill={COLORS.primary} fontSize="14" fontWeight="700">SKILL 5</text>
      </g>

      {/* Bottom tools */}
      {/* Screwdriver */}
      <g transform="rotate(30, 260, 360)">
        <rect x="252" y="360" width="12" height="80" rx="3" fill={COLORS.lightGray} />
        <rect x="248" y="440" width="20" height="8" rx="2" fill={COLORS.gray} />
      </g>

      {/* Bottle opener */}
      <g transform="rotate(-20, 340, 360)">
        <rect x="334" y="360" width="12" height="70" rx="3" fill={COLORS.lightGray} />
        <circle cx="340" cy="435" r="8" fill="none" stroke={COLORS.gray} strokeWidth="3" />
      </g>

      {/* Label */}
      <text
        x="300"
        y="530"
        textAnchor="middle"
        fill={COLORS.primary}
        fontSize="28"
        fontWeight="800"
        letterSpacing="2"
      >
        ONE TOOL, EVERY SKILL
      </text>
    </svg>
  );
};
