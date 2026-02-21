import React from "react";
import { COLORS } from "../colors";

/**
 * Information Flow - "Feeding info only when needed"
 * Shows filtered information flow from many sources → AI agent
 */
export const InformationFlow: React.FC<{ size?: number }> = ({ size = 600 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.2" />
          <stop offset="50%" stopColor={COLORS.primary} stopOpacity="0.8" />
          <stop offset="100%" stopColor={COLORS.primary} />
        </linearGradient>
      </defs>

      {/* Left side: Multiple info blocks (many) */}
      <g opacity="0.4">
        <rect x="40" y="80" width="100" height="40" rx="6" fill={COLORS.mediumGray} stroke={COLORS.gray} strokeWidth="1" />
        <rect x="40" y="140" width="100" height="40" rx="6" fill={COLORS.mediumGray} stroke={COLORS.gray} strokeWidth="1" />
        <rect x="40" y="200" width="100" height="40" rx="6" fill={COLORS.mediumGray} stroke={COLORS.gray} strokeWidth="1" />
        <rect x="40" y="260" width="100" height="40" rx="6" fill={COLORS.mediumGray} stroke={COLORS.gray} strokeWidth="1" />
        <rect x="40" y="320" width="100" height="40" rx="6" fill={COLORS.mediumGray} stroke={COLORS.gray} strokeWidth="1" />
        <rect x="40" y="380" width="100" height="40" rx="6" fill={COLORS.mediumGray} stroke={COLORS.gray} strokeWidth="1" />
        <rect x="40" y="440" width="100" height="40" rx="6" fill={COLORS.mediumGray} stroke={COLORS.gray} strokeWidth="1" />
      </g>

      {/* Only 2 highlighted blocks that pass through */}
      <rect x="40" y="200" width="100" height="40" rx="6" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="2" />
      <text x="90" y="225" textAnchor="middle" fill={COLORS.primary} fontSize="12" fontWeight="600">SKILL A</text>

      <rect x="40" y="320" width="100" height="40" rx="6" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="2" />
      <text x="90" y="345" textAnchor="middle" fill={COLORS.primary} fontSize="12" fontWeight="600">SKILL B</text>

      {/* Filter funnel in the middle */}
      <path d="M 200 100 L 200 460 L 280 340 L 280 220 Z" fill={COLORS.mediumGray} opacity="0.6" />
      <path d="M 200 100 L 200 460 L 280 340 L 280 220 Z" fill="none" stroke={COLORS.primary} strokeWidth="2" />
      <text x="230" y="285" textAnchor="middle" fill={COLORS.primary} fontSize="16" fontWeight="700" transform="rotate(-90, 230, 285)">FILTER</text>

      {/* Flow arrows from filter to AI */}
      <path d="M 280 260 Q 340 260, 380 260" stroke="url(#flowGrad)" strokeWidth="6" fill="none" markerEnd="url(#arrowhead)" />
      <path d="M 280 300 Q 340 300, 380 300" stroke="url(#flowGrad)" strokeWidth="6" fill="none" />

      {/* Arrow marker */}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={COLORS.primary} />
        </marker>
      </defs>

      {/* Right side: AI Agent box */}
      <rect x="380" y="220" width="180" height="120" rx="16" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="3" />
      <text x="470" y="265" textAnchor="middle" fill={COLORS.primary} fontSize="22" fontWeight="800">AI AGENT</text>
      <text x="470" y="295" textAnchor="middle" fill={COLORS.lightGray} fontSize="14">Gets only what</text>
      <text x="470" y="315" textAnchor="middle" fill={COLORS.lightGray} fontSize="14">it needs</text>

      {/* Bottom label */}
      <text x="300" y="540" textAnchor="middle" fill={COLORS.primary} fontSize="24" fontWeight="800" letterSpacing="1">
        ONLY WHEN NEEDED
      </text>
    </svg>
  );
};
