import React from "react";

// Cartoon friendly robot writing personalized messages
// Style: thick black outlines, character face, vibrant orange accents
export const AIBrain: React.FC<{ size?: number }> = ({ size = 280 }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none">
    {/* Robot body */}
    <rect x="80" y="110" width="120" height="100" rx="16" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="4" />
    {/* Robot head */}
    <rect x="90" y="45" width="100" height="72" rx="14" fill="#F0F0F0" stroke="#1A1A1A" strokeWidth="4" />
    {/* Antenna */}
    <line x1="140" y1="45" x2="140" y2="25" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
    <circle cx="140" cy="20" r="6" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="2.5" />
    <circle cx="140" cy="20" r="10" fill="none" stroke="#FF6B00" strokeWidth="1" opacity="0.4" />
    <circle cx="140" cy="20" r="15" fill="none" stroke="#FF6B00" strokeWidth="0.8" opacity="0.2" />
    {/* Happy eyes */}
    <circle cx="120" cy="72" r="10" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="2.5" />
    <circle cx="160" cy="72" r="10" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="2.5" />
    <circle cx="117" cy="69" r="3" fill="#FFFFFF" />
    <circle cx="157" cy="69" r="3" fill="#FFFFFF" />
    {/* Smile */}
    <path d="M122 93 C130 102, 150 102, 158 93" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Neck */}
    <rect x="130" y="117" width="20" height="5" fill="#D0D0D0" stroke="#1A1A1A" strokeWidth="2" />
    {/* Arms holding message */}
    <path d="M80 140 L50 155 L55 170" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="55" cy="173" r="6" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="2.5" />
    <path d="M200 140 L230 155 L225 170" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="225" cy="173" r="6" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="2.5" />
    {/* Message envelope */}
    <rect x="55" y="168" width="170" height="45" rx="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
    <path d="M58 171 L140 200 L222 171" stroke="#FF6B00" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
    <text x="140" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FF6B00" fontFamily="sans-serif">Hi [Name]...</text>
    {/* Chest panel */}
    <rect x="115" y="135" width="50" height="30" rx="6" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="2" />
    <text x="140" y="156" textAnchor="middle" fontSize="18" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">AI</text>
    {/* Legs */}
    <rect x="105" y="210" width="18" height="30" rx="4" fill="#D0D0D0" stroke="#1A1A1A" strokeWidth="2.5" />
    <rect x="157" y="210" width="18" height="30" rx="4" fill="#D0D0D0" stroke="#1A1A1A" strokeWidth="2.5" />
    <rect x="98" y="237" width="30" height="10" rx="5" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="2" />
    <rect x="152" y="237" width="30" height="10" rx="5" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="2" />
    {/* Sparkles */}
    <path d="M50 60 L54 50 L58 60 L54 70 Z" fill="#FF6B00" opacity="0.5" />
    <path d="M225 40 L228 33 L231 40 L228 47 Z" fill="#FF6B00" opacity="0.4" />
  </svg>
);
