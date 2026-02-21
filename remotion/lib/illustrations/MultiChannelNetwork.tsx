import React from "react";

// Cartoon rocket with multiple exhaust trails — multi-channel outreach
// Style: thick black outlines, character face, vibrant colors
export const MultiChannelNetwork: React.FC<{ size?: number }> = ({ size = 300 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none">
    {/* Rocket body */}
    <path d="M150 30 C135 30, 115 70, 115 140 L115 200 L185 200 L185 140 C185 70, 165 30, 150 30 Z"
      fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="4" strokeLinejoin="round" />
    {/* Rocket nose cone */}
    <path d="M150 30 C140 30, 125 55, 120 80 L180 80 C175 55, 160 30, 150 30 Z"
      fill="#FF6B00" stroke="#1A1A1A" strokeWidth="3" />
    {/* Window */}
    <circle cx="150" cy="130" r="30" fill="#4A90D9" stroke="#1A1A1A" strokeWidth="3" />
    {/* Happy face */}
    <circle cx="140" cy="125" r="4" fill="#1A1A1A" />
    <circle cx="160" cy="125" r="4" fill="#1A1A1A" />
    <path d="M138 138 C142 145, 158 145, 162 138" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="138" cy="123" r="1.5" fill="#FFFFFF" />
    <circle cx="158" cy="123" r="1.5" fill="#FFFFFF" />
    {/* Fins */}
    <path d="M115 170 L80 210 L115 200 Z" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="3" />
    <path d="M185 170 L220 210 L185 200 Z" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="3" />
    {/* Exhaust flames - multiple channels */}
    <path d="M125 200 C120 230, 100 250, 90 270" stroke="#FF6B00" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
    <circle cx="90" cy="270" r="8" fill="#FF6B00" opacity="0.6" />
    <text x="72" y="290" fontSize="10" fontWeight="700" fill="#FF6B00" fontFamily="sans-serif">EMAIL</text>
    <path d="M150 200 C150 230, 150 250, 150 270" stroke="#FFCC00" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
    <circle cx="150" cy="270" r="8" fill="#FFCC00" opacity="0.6" />
    <text x="140" y="290" fontSize="10" fontWeight="700" fill="#FFCC00" fontFamily="sans-serif">SMS</text>
    <path d="M175 200 C180 230, 200 250, 210 270" stroke="#44CC44" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
    <circle cx="210" cy="270" r="8" fill="#44CC44" opacity="0.6" />
    <text x="192" y="290" fontSize="10" fontWeight="700" fill="#44CC44" fontFamily="sans-serif">VOICE</text>
    {/* Speed lines */}
    <line x1="85" y1="90" x2="65" y2="85" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    <line x1="90" y1="110" x2="60" y2="108" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
    <line x1="215" y1="90" x2="235" y2="85" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
  </svg>
);
