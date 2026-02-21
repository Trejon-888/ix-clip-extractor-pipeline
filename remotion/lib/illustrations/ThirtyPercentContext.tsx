import React from "react";
import { COLORS } from "../colors";

/**
 * 30% of Total Context
 * Pie chart showing skill.md taking only 30% of context
 */
export const ThirtyPercentContext: React.FC<{ size?: number }> = ({ size = 600 }) => {
  // 30% = 108 degrees
  const radius = 140;
  const cx = 300;
  const cy = 260;

  // SVG arc for 30% (108 degrees)
  const startAngle = -90; // top
  const endAngle = startAngle + 108;
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const x1 = cx + radius * Math.cos(startRad);
  const y1 = cy + radius * Math.sin(startRad);
  const x2 = cx + radius * Math.cos(endRad);
  const y2 = cy + radius * Math.sin(endRad);

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Full circle (70% - remaining context) */}
      <circle cx={cx} cy={cy} r={radius} fill={COLORS.mediumGray} stroke={COLORS.gray} strokeWidth="2" />

      {/* 30% slice (skill.md) */}
      <path
        d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
        fill={COLORS.primary}
        opacity="0.9"
      />

      {/* Center circle for donut effect */}
      <circle cx={cx} cy={cy} r="70" fill={COLORS.darkGray} />

      {/* 30% text in center */}
      <text x={cx} y={cy - 5} textAnchor="middle" fill={COLORS.primary} fontSize="48" fontWeight="900">30%</text>
      <text x={cx} y={cy + 25} textAnchor="middle" fill={COLORS.lightGray} fontSize="16" fontWeight="500">of context</text>

      {/* Label for skill.md slice */}
      <line x1="370" y1="170" x2="430" y2="120" stroke={COLORS.primary} strokeWidth="2" />
      <text x="435" y="115" fill={COLORS.primary} fontSize="18" fontWeight="700">skill.md</text>
      <text x="435" y="135" fill={COLORS.lightGray} fontSize="14">Main instructions</text>

      {/* Label for remaining */}
      <line x1="230" y1="370" x2="170" y2="420" stroke={COLORS.gray} strokeWidth="1" />
      <text x="100" y="435" fill={COLORS.lightGray} fontSize="16">70% Available</text>
      <text x="100" y="455" fill={COLORS.gray} fontSize="13">for conversation</text>

      {/* Bottom label */}
      <text x="300" y="520" textAnchor="middle" fill={COLORS.primary} fontSize="24" fontWeight="800" letterSpacing="1">
        EFFICIENT CONTEXT USAGE
      </text>
    </svg>
  );
};
