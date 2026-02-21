import React from "react";

const LIME_GREEN = "#BFFF00";
const DARK = "#1A1A1A";

/**
 * Clean, minimal line-art style icons in lime green
 * Style: Professional, modern, like the "Friendly tech" reference
 */

// Unified system icon - represents "one platform"
export const UnifiedSystemIcon: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    {/* Central hub */}
    <circle cx="60" cy="60" r="20" fill={LIME_GREEN} />
    <circle cx="60" cy="60" r="12" fill={DARK} />

    {/* Connection lines */}
    <line x1="60" y1="40" x2="60" y2="15" stroke={DARK} strokeWidth="2" />
    <line x1="60" y1="80" x2="60" y2="105" stroke={DARK} strokeWidth="2" />
    <line x1="40" y1="60" x2="15" y2="60" stroke={DARK} strokeWidth="2" />
    <line x1="80" y1="60" x2="105" y2="60" stroke={DARK} strokeWidth="2" />

    {/* Outer dots */}
    <circle cx="60" cy="10" r="6" fill={DARK} />
    <circle cx="60" cy="110" r="6" fill={DARK} />
    <circle cx="10" cy="60" r="6" fill={DARK} />
    <circle cx="110" cy="60" r="6" fill={DARK} />
  </svg>
);

// Fragmented tools icon - represents chaos/disconnection
export const FragmentedToolsIcon: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    {/* Scattered pieces */}
    <rect x="10" y="20" width="25" height="25" rx="4" fill={DARK} transform="rotate(-15 22 32)" />
    <rect x="70" y="10" width="25" height="25" rx="4" fill={DARK} transform="rotate(10 82 22)" />
    <rect x="15" y="70" width="25" height="25" rx="4" fill={DARK} transform="rotate(5 27 82)" />
    <rect x="75" y="75" width="25" height="25" rx="4" fill={DARK} transform="rotate(-8 87 87)" />
    <rect x="45" y="45" width="30" height="30" rx="4" fill={LIME_GREEN} />

    {/* Broken connection lines */}
    <line x1="35" y1="35" x2="45" y2="45" stroke={DARK} strokeWidth="2" strokeDasharray="4 2" />
    <line x1="75" y1="45" x2="85" y2="30" stroke={DARK} strokeWidth="2" strokeDasharray="4 2" />
  </svg>
);

// Engine icon - represents "the whole engine"
export const EngineIcon: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    {/* Gear/cog shape */}
    <circle cx="60" cy="60" r="35" fill="none" stroke={DARK} strokeWidth="3" />
    <circle cx="60" cy="60" r="20" fill={LIME_GREEN} />
    <circle cx="60" cy="60" r="10" fill={DARK} />

    {/* Gear teeth */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 60 + Math.cos(rad) * 35;
      const y1 = 60 + Math.sin(rad) * 35;
      const x2 = 60 + Math.cos(rad) * 48;
      const y2 = 60 + Math.sin(rad) * 48;
      return (
        <line
          key={angle}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={DARK}
          strokeWidth="8"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

// Pipeline icon - represents "one pipeline view"
export const PipelineIcon: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    {/* Pipeline flow */}
    <rect x="10" y="45" width="30" height="30" rx="6" fill={DARK} />
    <rect x="45" y="45" width="30" height="30" rx="6" fill={LIME_GREEN} />
    <rect x="80" y="45" width="30" height="30" rx="6" fill={DARK} />

    {/* Flow arrows */}
    <path d="M40 60 L44 56 L44 58 L44 62 L44 64 L40 60" fill={DARK} />
    <path d="M75 60 L79 56 L79 58 L79 62 L79 64 L75 60" fill={DARK} />

    {/* Progress dots */}
    <circle cx="25" cy="85" r="4" fill={LIME_GREEN} />
    <circle cx="60" cy="85" r="4" fill={LIME_GREEN} />
    <circle cx="95" cy="85" r="4" fill={DARK} opacity="0.3" />
  </svg>
);

// AI Brain icon - represents AI agents
export const AIBrainIcon: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    {/* Brain outline */}
    <path
      d="M60 20 C35 20, 20 40, 20 60 C20 85, 40 100, 60 100 C80 100, 100 85, 100 60 C100 40, 85 20, 60 20"
      fill="none"
      stroke={DARK}
      strokeWidth="3"
    />

    {/* Neural connections */}
    <circle cx="45" cy="45" r="8" fill={LIME_GREEN} />
    <circle cx="75" cy="45" r="8" fill={LIME_GREEN} />
    <circle cx="60" cy="65" r="10" fill={LIME_GREEN} />
    <circle cx="40" cy="75" r="6" fill={LIME_GREEN} />
    <circle cx="80" cy="75" r="6" fill={LIME_GREEN} />

    {/* Connection lines */}
    <line x1="45" y1="53" x2="55" y2="58" stroke={DARK} strokeWidth="2" />
    <line x1="75" y1="53" x2="65" y2="58" stroke={DARK} strokeWidth="2" />
    <line x1="55" y1="72" x2="45" y2="72" stroke={DARK} strokeWidth="2" />
    <line x1="65" y1="72" x2="75" y2="72" stroke={DARK} strokeWidth="2" />
  </svg>
);

// Connection broken icon - represents "nothing was connected"
export const BrokenConnectionIcon: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    {/* Two disconnected pieces */}
    <circle cx="35" cy="60" r="20" fill={DARK} />
    <circle cx="85" cy="60" r="20" fill={DARK} />

    {/* Broken link */}
    <path
      d="M55 55 L58 52 M62 58 L65 55"
      stroke={LIME_GREEN}
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M55 65 L58 68 M62 62 L65 65"
      stroke={LIME_GREEN}
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* X marks */}
    <path d="M58 58 L62 62 M62 58 L58 62" stroke="#FF4444" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Checkmark success icon
export const SuccessCheckIcon: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="45" fill={LIME_GREEN} />
    <path
      d="M35 60 L52 77 L85 44"
      stroke={DARK}
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Person/User centered icon
export const UserCenteredIcon: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="45" fill={LIME_GREEN} />
    <circle cx="60" cy="45" r="15" fill={DARK} />
    <path
      d="M35 85 C35 70, 45 60, 60 60 C75 60, 85 70, 85 85"
      fill={DARK}
    />
  </svg>
);
