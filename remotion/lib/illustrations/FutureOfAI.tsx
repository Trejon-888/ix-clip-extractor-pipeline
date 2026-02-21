import React from "react";
import { COLORS } from "../colors";

/**
 * Future of AI Agent Design Illustration
 * Represents the empowering moment: "This is the actual future of AI agent design"
 * Shows: Rising graph/trajectory + AI agent + tools/skills radiating out
 */
export const FutureOfAI: React.FC<{ size?: number }> = ({ size = 600 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Background glow */}
      <defs>
        <radialGradient id="futureGlow" cx="50%" cy="40%">
          <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.3" />
          <stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="trajectoryGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={COLORS.primaryLight} stopOpacity="0.3" />
          <stop offset="100%" stopColor={COLORS.primary} stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Background radial glow */}
      <circle cx="300" cy="240" r="280" fill="url(#futureGlow)" />

      {/* Rising trajectory line */}
      <path
        d="M 80 480 Q 150 420, 220 380 T 380 280 T 520 120"
        stroke="url(#trajectoryGradient)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Data points along trajectory */}
      <circle cx="80" cy="480" r="6" fill={COLORS.primaryLight} opacity="0.5" />
      <circle cx="185" cy="405" r="8" fill={COLORS.primaryLight} opacity="0.6" />
      <circle cx="300" cy="325" r="10" fill={COLORS.primary} opacity="0.7" />
      <circle cx="410" cy="235" r="12" fill={COLORS.primary} opacity="0.85" />

      {/* Final point - glowing */}
      <circle cx="520" cy="120" r="20" fill={COLORS.primary} opacity="0.2" />
      <circle cx="520" cy="120" r="14" fill={COLORS.primary} />
      <circle cx="520" cy="120" r="8" fill={COLORS.white} />

      {/* Central AI Agent icon (robot/brain hybrid) */}
      <g transform="translate(240, 180)">
        {/* Main circle */}
        <circle cx="60" cy="60" r="55" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="4" />

        {/* Brain pattern */}
        <path
          d="M 40 45 Q 50 35, 60 35 Q 70 35, 80 45 M 40 55 Q 50 50, 60 50 Q 70 50, 80 55 M 40 65 Q 50 60, 60 60 Q 70 60, 80 65 M 45 75 Q 55 70, 65 70 Q 75 70, 80 75"
          stroke={COLORS.primary}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Eyes/sensors */}
        <circle cx="48" cy="50" r="4" fill={COLORS.primary} />
        <circle cx="72" cy="50" r="4" fill={COLORS.primary} />

        {/* Core energy pulse */}
        <circle cx="60" cy="70" r="8" fill={COLORS.primary} opacity="0.6" />
        <circle cx="60" cy="70" r="4" fill={COLORS.white} />
      </g>

      {/* Radiating skill nodes (6 surrounding nodes) */}
      {/* Top */}
      <g transform="translate(300, 60)">
        <circle r="20" fill={COLORS.mediumGray} stroke={COLORS.primary} strokeWidth="2" />
        <text textAnchor="middle" y="6" fontSize="16" fill={COLORS.primary} fontWeight="700">SK</text>
        <line x1="0" y1="20" x2="0" y2="110" stroke={COLORS.primary} strokeWidth="2" opacity="0.4" strokeDasharray="4 4" />
      </g>

      {/* Top Right */}
      <g transform="translate(440, 140)">
        <circle r="18" fill={COLORS.mediumGray} stroke={COLORS.primary} strokeWidth="2" />
        <text textAnchor="middle" y="6" fontSize="14" fill={COLORS.primary} fontWeight="700">AI</text>
        <line x1="-40" y1="0" x2="-120" y2="60" stroke={COLORS.primary} strokeWidth="2" opacity="0.4" strokeDasharray="4 4" />
      </g>

      {/* Bottom Right */}
      <g transform="translate(440, 320)">
        <circle r="18" fill={COLORS.mediumGray} stroke={COLORS.primary} strokeWidth="2" />
        <text textAnchor="middle" y="6" fontSize="14" fill={COLORS.primary} fontWeight="700">API</text>
        <line x1="-40" y1="-20" x2="-120" y2="-60" stroke={COLORS.primary} strokeWidth="2" opacity="0.4" strokeDasharray="4 4" />
      </g>

      {/* Bottom */}
      <g transform="translate(300, 400)">
        <circle r="18" fill={COLORS.mediumGray} stroke={COLORS.primary} strokeWidth="2" />
        <text textAnchor="middle" y="6" fontSize="14" fill={COLORS.primary} fontWeight="700">DB</text>
        <line x1="0" y1="-20" x2="0" y2="-110" stroke={COLORS.primary} strokeWidth="2" opacity="0.4" strokeDasharray="4 4" />
      </g>

      {/* Bottom Left */}
      <g transform="translate(160, 320)">
        <circle r="18" fill={COLORS.mediumGray} stroke={COLORS.primary} strokeWidth="2" />
        <text textAnchor="middle" y="6" fontSize="14" fill={COLORS.primary} fontWeight="700">ML</text>
        <line x1="40" y1="-20" x2="120" y2="-60" stroke={COLORS.primary} strokeWidth="2" opacity="0.4" strokeDasharray="4 4" />
      </g>

      {/* Top Left */}
      <g transform="translate(160, 140)">
        <circle r="18" fill={COLORS.mediumGray} stroke={COLORS.primary} strokeWidth="2" />
        <text textAnchor="middle" y="6" fontSize="14" fill={COLORS.primary} fontWeight="700">UI</text>
        <line x1="40" y1="20" x2="120" y2="60" stroke={COLORS.primary} strokeWidth="2" opacity="0.4" strokeDasharray="4 4" />
      </g>

      {/* Upward arrow indicator (subtle) */}
      <g transform="translate(520, 80)">
        <path
          d="M 0 20 L 0 0 L -8 8 M 0 0 L 8 8"
          stroke={COLORS.primary}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Success/achievement badge at bottom */}
      <g transform="translate(300, 510)">
        <rect x="-90" y="-20" width="180" height="40" rx="20" fill={COLORS.mediumGray} opacity="0.8" />
        <text textAnchor="middle" y="6" fontSize="20" fill={COLORS.primary} fontWeight="800" letterSpacing="1">
          YOU BUILT THIS
        </text>
      </g>

      {/* Sparkles/stars for achievement feeling */}
      <g opacity="0.7">
        <polygon points="100,100 102,106 108,108 102,110 100,116 98,110 92,108 98,106" fill={COLORS.primary} />
        <polygon points="500,380 502,385 507,387 502,389 500,394 498,389 493,387 498,385" fill={COLORS.primary} />
        <polygon points="520,280 521,283 524,284 521,285 520,288 519,285 516,284 519,283" fill={COLORS.primaryLight} />
        <polygon points="80,180 81,183 84,184 81,185 80,188 79,185 76,184 79,183" fill={COLORS.primaryLight} />
      </g>
    </svg>
  );
};
