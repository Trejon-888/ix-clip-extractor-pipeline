import React from "react";
import { COLORS } from "../colors";

/**
 * Reference Documents - Third layer
 * Stack of documents with magnifying glass showing detail
 */
export const ReferenceDocuments: React.FC<{ size?: number }> = ({ size = 600 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Document stack (back to front) */}
      {/* Doc 3 (back) */}
      <rect x="185" y="100" width="240" height="300" rx="8" fill={COLORS.mediumGray} opacity="0.5" />

      {/* Doc 2 (middle) */}
      <rect x="170" y="115" width="240" height="300" rx="8" fill={COLORS.mediumGray} opacity="0.7" />

      {/* Doc 1 (front) */}
      <rect x="155" y="130" width="240" height="300" rx="8" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="2" />

      {/* Document content lines */}
      <rect x="180" y="160" width="140" height="8" rx="4" fill={COLORS.primary} opacity="0.8" />
      <rect x="180" y="185" width="190" height="6" rx="3" fill={COLORS.gray} opacity="0.5" />
      <rect x="180" y="200" width="170" height="6" rx="3" fill={COLORS.gray} opacity="0.5" />
      <rect x="180" y="215" width="185" height="6" rx="3" fill={COLORS.gray} opacity="0.5" />
      <rect x="180" y="240" width="130" height="8" rx="4" fill={COLORS.primary} opacity="0.6" />
      <rect x="180" y="260" width="190" height="6" rx="3" fill={COLORS.gray} opacity="0.5" />
      <rect x="180" y="275" width="160" height="6" rx="3" fill={COLORS.gray} opacity="0.5" />
      <rect x="180" y="300" width="120" height="8" rx="4" fill={COLORS.primary} opacity="0.6" />
      <rect x="180" y="320" width="180" height="6" rx="3" fill={COLORS.gray} opacity="0.5" />
      <rect x="180" y="335" width="175" height="6" rx="3" fill={COLORS.gray} opacity="0.5" />
      <rect x="180" y="350" width="155" height="6" rx="3" fill={COLORS.gray} opacity="0.5" />

      {/* Magnifying glass */}
      <g transform="translate(380, 280)">
        <circle cx="40" cy="40" r="50" fill="none" stroke={COLORS.primary} strokeWidth="6" />
        <circle cx="40" cy="40" r="42" fill={COLORS.primary} opacity="0.1" />
        <line x1="75" y1="75" x2="120" y2="120" stroke={COLORS.primary} strokeWidth="8" strokeLinecap="round" />

        {/* Zoom lines inside magnifier */}
        <rect x="15" y="25" width="50" height="4" rx="2" fill={COLORS.primary} opacity="0.6" />
        <rect x="15" y="35" width="40" height="4" rx="2" fill={COLORS.primary} opacity="0.4" />
        <rect x="15" y="45" width="50" height="4" rx="2" fill={COLORS.primary} opacity="0.6" />
        <rect x="15" y="55" width="35" height="4" rx="2" fill={COLORS.primary} opacity="0.4" />
      </g>

      {/* Label */}
      <text x="300" y="500" textAnchor="middle" fill={COLORS.primary} fontSize="24" fontWeight="800" letterSpacing="1">
        REFERENCE DOCUMENTS
      </text>
      <text x="300" y="530" textAnchor="middle" fill={COLORS.lightGray} fontSize="16">
        Layer 3: Deep Specifics
      </text>
    </svg>
  );
};
