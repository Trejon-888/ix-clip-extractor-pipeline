import React from "react";

// Two cartoon AI agents — text agent (phone) and voice agent (headset)
// Style: thick black outlines, character faces, vibrant colors
export const AIAgents: React.FC<{ size?: number }> = ({ size = 280 }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none">
    {/* === Left Agent: Text/SMS (phone shape) === */}
    <rect x="30" y="60" width="90" height="150" rx="16" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="3.5" />
    {/* Screen */}
    <rect x="40" y="80" width="70" height="95" rx="4" fill="#4A90D9" />
    {/* Text bubbles on screen */}
    <rect x="46" y="88" width="40" height="12" rx="6" fill="#FFFFFF" />
    <rect x="56" y="106" width="44" height="12" rx="6" fill="#FF6B00" />
    <rect x="46" y="124" width="36" height="12" rx="6" fill="#FFFFFF" />
    <rect x="52" y="142" width="48" height="12" rx="6" fill="#FF6B00" />
    {/* Happy face on phone */}
    <circle cx="58" cy="192" r="3" fill="#1A1A1A" />
    <circle cx="82" cy="192" r="3" fill="#1A1A1A" />
    <path d="M62 199 C66 203, 78 203, 82 199" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Arms */}
    <path d="M30 130 L12 140" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
    <circle cx="10" cy="142" r="5" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="2" />
    {/* Legs */}
    <rect x="50" y="210" width="12" height="22" rx="4" fill="#D0D0D0" stroke="#1A1A1A" strokeWidth="2" />
    <rect x="88" y="210" width="12" height="22" rx="4" fill="#D0D0D0" stroke="#1A1A1A" strokeWidth="2" />
    <rect x="44" y="229" width="22" height="8" rx="4" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="1.5" />
    <rect x="82" y="229" width="22" height="8" rx="4" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="1.5" />
    {/* "SMS" label */}
    <text x="75" y="55" textAnchor="middle" fontSize="14" fontWeight="900" fill="#4A90D9" fontFamily="sans-serif">TEXT</text>

    {/* === Right Agent: Voice (headset robot) === */}
    {/* Body */}
    <rect x="170" y="100" width="80" height="110" rx="14" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="3.5" />
    {/* Head */}
    <circle cx="210" cy="75" r="35" fill="#F0F0F0" stroke="#1A1A1A" strokeWidth="3.5" />
    {/* Headset band */}
    <path d="M178 60 C178 38, 242 38, 242 60" stroke="#1A1A1A" strokeWidth="4" fill="none" />
    {/* Headset earpieces */}
    <rect x="168" y="55" width="14" height="22" rx="7" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="2.5" />
    <rect x="238" y="55" width="14" height="22" rx="7" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="2.5" />
    {/* Microphone */}
    <path d="M175 70 L160 85" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
    <circle cx="157" cy="88" r="6" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="2" />
    {/* Happy face */}
    <circle cx="197" cy="72" r="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
    <circle cx="223" cy="72" r="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
    <circle cx="198" cy="71" r="3" fill="#1A1A1A" />
    <circle cx="224" cy="71" r="3" fill="#1A1A1A" />
    <path d="M200 90 C205 97, 215 97, 220 90" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Sound waves from mouth */}
    <path d="M230 85 C238 82, 238 88, 230 85" stroke="#FF6B00" strokeWidth="1.5" opacity="0.5" />
    <path d="M235 85 C245 80, 245 90, 235 85" stroke="#FF6B00" strokeWidth="1.5" opacity="0.3" />
    {/* Chest panel */}
    <rect x="195" y="120" width="30" height="20" rx="4" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="2" />
    <text x="210" y="135" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">AI</text>
    {/* Arms */}
    <path d="M250 140 L268 150" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
    <circle cx="270" cy="152" r="5" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="2" />
    {/* Legs */}
    <rect x="188" y="210" width="12" height="22" rx="4" fill="#D0D0D0" stroke="#1A1A1A" strokeWidth="2" />
    <rect x="222" y="210" width="12" height="22" rx="4" fill="#D0D0D0" stroke="#1A1A1A" strokeWidth="2" />
    <rect x="182" y="229" width="22" height="8" rx="4" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="1.5" />
    <rect x="216" y="229" width="22" height="8" rx="4" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="1.5" />
    {/* "VOICE" label */}
    <text x="210" y="55" textAnchor="middle" fontSize="14" fontWeight="900" fill="#FF6B00" fontFamily="sans-serif">VOICE</text>

    {/* Connection bolt between them */}
    <path d="M135 140 L145 130 L140 140 L150 130" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Sparkles */}
    <path d="M140 40 L143 33 L146 40 L143 47 Z" fill="#FFD700" />
  </svg>
);
