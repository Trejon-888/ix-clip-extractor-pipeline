import React from "react";

// Cartoon illustration of tools messily duct-taped together
// Style: thick black outlines, chaotic composition, silver duct tape strips
export const DuctTapeTools: React.FC<{ size?: number }> = ({ size = 280 }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none">
    {/* Background chaos cloud */}
    <ellipse cx="140" cy="145" rx="110" ry="95" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="2" />

    {/* Tool 1: Email envelope (tilted left) */}
    <g transform="translate(35, 75) rotate(-15)">
      <rect x="0" y="0" width="50" height="35" rx="3" fill="#4A90D9" stroke="#1A1A1A" strokeWidth="3" />
      <path d="M0 5 L25 20 L50 5" stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
      <circle cx="25" cy="18" r="6" fill="#FF4444" stroke="#1A1A1A" strokeWidth="1.5" />
      <text x="25" y="22" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">!</text>
    </g>

    {/* Tool 2: Chat bubble (tilted right) */}
    <g transform="translate(175, 60) rotate(12)">
      <rect x="0" y="0" width="55" height="40" rx="8" fill="#25D366" stroke="#1A1A1A" strokeWidth="3" />
      <polygon points="10,40 20,55 25,40" fill="#25D366" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="15" cy="20" r="4" fill="#1A1A1A" />
      <circle cx="28" cy="20" r="4" fill="#1A1A1A" />
      <circle cx="41" cy="20" r="4" fill="#1A1A1A" />
    </g>

    {/* Tool 3: Phone (center, slightly tilted) */}
    <g transform="translate(105, 100) rotate(-5)">
      <rect x="0" y="0" width="40" height="65" rx="6" fill="#333333" stroke="#1A1A1A" strokeWidth="3" />
      <rect x="4" y="8" width="32" height="45" rx="2" fill="#4A90D9" />
      <circle cx="20" cy="58" r="4" fill="#555555" stroke="#1A1A1A" strokeWidth="1" />
      {/* Confused face on screen */}
      <circle cx="12" cy="25" r="2.5" fill="#1A1A1A" />
      <circle cx="28" cy="25" r="2.5" fill="#1A1A1A" />
      <path d="M12 35 Q20 32 28 35" stroke="#1A1A1A" strokeWidth="2" fill="none" />
    </g>

    {/* Tool 4: Calendar (bottom left) */}
    <g transform="translate(50, 165) rotate(8)">
      <rect x="0" y="0" width="45" height="50" rx="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
      <rect x="0" y="0" width="45" height="12" rx="3" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="10" cy="6" r="2" fill="#1A1A1A" />
      <circle cx="35" cy="6" r="2" fill="#1A1A1A" />
      {/* Calendar grid */}
      <line x1="15" y1="18" x2="15" y2="45" stroke="#CCCCCC" strokeWidth="1" />
      <line x1="30" y1="18" x2="30" y2="45" stroke="#CCCCCC" strokeWidth="1" />
      <line x1="5" y1="27" x2="40" y2="27" stroke="#CCCCCC" strokeWidth="1" />
      <line x1="5" y1="36" x2="40" y2="36" stroke="#CCCCCC" strokeWidth="1" />
      {/* X marks */}
      <text x="22" y="34" fontSize="10" fill="#FF4444" fontWeight="bold">X</text>
    </g>

    {/* Tool 5: Robot/AI bot (bottom right) */}
    <g transform="translate(165, 155) rotate(-10)">
      <rect x="0" y="10" width="45" height="45" rx="6" fill="#9B59B6" stroke="#1A1A1A" strokeWidth="3" />
      {/* Antenna */}
      <line x1="22" y1="0" x2="22" y2="10" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="22" cy="0" r="4" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="2" />
      {/* Eyes */}
      <circle cx="14" cy="28" r="5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="31" cy="28" r="5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="14" cy="28" r="2" fill="#1A1A1A" />
      <circle cx="31" cy="28" r="2" fill="#1A1A1A" />
      {/* Worried mouth */}
      <path d="M15 42 Q22 38 30 42" stroke="#1A1A1A" strokeWidth="2" fill="none" />
    </g>

    {/* Duct tape strips - silver with texture */}
    {/* Tape 1: Diagonal across top */}
    <g transform="translate(60, 85) rotate(-25)">
      <rect x="0" y="0" width="90" height="18" rx="1" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="1" />
      <rect x="0" y="0" width="90" height="18" rx="1" fill="url(#tapePattern)" opacity="0.3" />
      {/* Tape edges (torn look) */}
      <path d="M0 0 L3 3 L0 6 L2 9 L0 12 L3 15 L0 18" stroke="#A0A0A0" strokeWidth="1" fill="none" />
      <path d="M90 0 L87 3 L90 6 L88 9 L90 12 L87 15 L90 18" stroke="#A0A0A0" strokeWidth="1" fill="none" />
    </g>

    {/* Tape 2: Horizontal across middle */}
    <g transform="translate(75, 130) rotate(5)">
      <rect x="0" y="0" width="100" height="16" rx="1" fill="#D0D0D0" stroke="#A0A0A0" strokeWidth="1" />
      <line x1="10" y1="8" x2="90" y2="8" stroke="#B0B0B0" strokeWidth="1" strokeDasharray="5 3" />
    </g>

    {/* Tape 3: Diagonal across bottom */}
    <g transform="translate(80, 185) rotate(20)">
      <rect x="0" y="0" width="80" height="15" rx="1" fill="#C5C5C5" stroke="#A0A0A0" strokeWidth="1" />
    </g>

    {/* Tape 4: Vertical strip */}
    <g transform="translate(130, 95)">
      <rect x="0" y="0" width="16" height="70" rx="1" fill="#BEBEBE" stroke="#A0A0A0" strokeWidth="1" />
      <line x1="8" y1="5" x2="8" y2="65" stroke="#B0B0B0" strokeWidth="1" strokeDasharray="4 4" />
    </g>

    {/* Tape 5: Small patch */}
    <g transform="translate(155, 120) rotate(-8)">
      <rect x="0" y="0" width="35" height="14" rx="1" fill="#D8D8D8" stroke="#A0A0A0" strokeWidth="1" />
    </g>

    {/* Warning/stress marks */}
    <text x="35" y="55" fontSize="18" fill="#FF6B00" fontWeight="bold">!</text>
    <text x="235" y="145" fontSize="18" fill="#FF6B00" fontWeight="bold">!</text>
    <text x="245" y="200" fontSize="14" fill="#FF4444" fontWeight="bold">?</text>

    {/* Stress lines around the mess */}
    <path d="M20 140 L10 140" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 130 L8 125" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 150 L8 155" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />

    <path d="M260 140 L270 140" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
    <path d="M265 130 L272 125" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
    <path d="M265 150 L272 155" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />

    {/* Pattern definition for tape texture */}
    <defs>
      <pattern id="tapePattern" patternUnits="userSpaceOnUse" width="4" height="4">
        <rect width="4" height="4" fill="#C0C0C0" />
        <rect width="2" height="2" fill="#B0B0B0" />
        <rect x="2" y="2" width="2" height="2" fill="#B0B0B0" />
      </pattern>
    </defs>
  </svg>
);
