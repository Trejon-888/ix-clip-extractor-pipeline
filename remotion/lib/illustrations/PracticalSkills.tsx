import React from "react";
import { COLORS } from "../colors";

/**
 * Practical Skills - Intent Recognition & API Integration
 * Shows connected nodes: user intent → AI → API calls
 */
export const PracticalSkills: React.FC<{ size?: number }> = ({ size = 600 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <linearGradient id="practicalFlow" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor={COLORS.primaryLight} />
          <stop offset="100%" stopColor={COLORS.primary} />
        </linearGradient>
      </defs>

      {/* User intent box (left) */}
      <rect x="40" y="220" width="140" height="120" rx="12" fill={COLORS.darkGray} stroke={COLORS.primaryLight} strokeWidth="2" />
      <text x="110" y="260" textAnchor="middle" fill={COLORS.white} fontSize="32">💬</text>
      <text x="110" y="295" textAnchor="middle" fill={COLORS.primaryLight} fontSize="14" fontWeight="700">USER</text>
      <text x="110" y="315" textAnchor="middle" fill={COLORS.primaryLight} fontSize="14" fontWeight="700">INTENT</text>

      {/* Arrow 1 */}
      <path d="M 180 280 L 220 280" stroke="url(#practicalFlow)" strokeWidth="4" markerEnd="url(#practArrow)" />

      {/* AI Agent (center) */}
      <rect x="220" y="200" width="160" height="160" rx="16" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="3" />
      <circle cx="300" cy="260" r="30" fill={COLORS.primary} opacity="0.2" />
      <circle cx="300" cy="260" r="20" fill={COLORS.primary} opacity="0.4" />
      <text x="300" y="267" textAnchor="middle" fill={COLORS.white} fontSize="20" fontWeight="900">AI</text>
      <text x="300" y="310" textAnchor="middle" fill={COLORS.primary} fontSize="13" fontWeight="600">RECOGNIZES</text>
      <text x="300" y="330" textAnchor="middle" fill={COLORS.primary} fontSize="13" fontWeight="600">& ROUTES</text>

      {/* Arrow 2 */}
      <path d="M 380 280 L 420 280" stroke="url(#practicalFlow)" strokeWidth="4" markerEnd="url(#practArrow)" />

      {/* API Integration (right) */}
      <rect x="420" y="180" width="140" height="200" rx="12" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="2" />
      <text x="490" y="215" textAnchor="middle" fill={COLORS.primary} fontSize="14" fontWeight="700">API CALLS</text>

      {/* API endpoint rows */}
      <rect x="435" y="230" width="110" height="28" rx="6" fill={COLORS.mediumGray} />
      <text x="490" y="249" textAnchor="middle" fill={COLORS.success} fontSize="11" fontWeight="600">GET /users</text>

      <rect x="435" y="268" width="110" height="28" rx="6" fill={COLORS.mediumGray} />
      <text x="490" y="287" textAnchor="middle" fill={COLORS.warning} fontSize="11" fontWeight="600">POST /data</text>

      <rect x="435" y="306" width="110" height="28" rx="6" fill={COLORS.mediumGray} />
      <text x="490" y="325" textAnchor="middle" fill={COLORS.primary} fontSize="11" fontWeight="600">PUT /update</text>

      <rect x="435" y="344" width="110" height="28" rx="6" fill={COLORS.mediumGray} />
      <text x="490" y="363" textAnchor="middle" fill={COLORS.error} fontSize="11" fontWeight="600">DEL /remove</text>

      {/* Arrow marker */}
      <defs>
        <marker id="practArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={COLORS.primary} />
        </marker>
      </defs>

      {/* vs theoretical text crossed out */}
      <g transform="translate(150, 430)">
        <text x="0" y="0" fill={COLORS.gray} fontSize="20" textDecoration="line-through" opacity="0.5">theoretical knowledge</text>
        <text x="280" y="0" fill={COLORS.primary} fontSize="20" fontWeight="800">PRACTICAL</text>
      </g>

      {/* Bottom label */}
      <text x="300" y="510" textAnchor="middle" fill={COLORS.primary} fontSize="24" fontWeight="800" letterSpacing="1">
        REAL-WORLD INTEGRATION
      </text>
    </svg>
  );
};
