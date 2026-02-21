import React from "react";

// Cartoon trophy with "3X" — represents 3X more replies
// Style: thick black outlines, character face, vibrant gold
export const ThreeXReplies: React.FC<{ size?: number }> = ({ size = 280 }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none">
    {/* Trophy body */}
    <path d="M100 60 L100 160 C100 195, 140 210, 140 210 C140 210, 180 195, 180 160 L180 60 Z"
      fill="#FFD700" stroke="#1A1A1A" strokeWidth="4" />
    {/* Trophy rim */}
    <rect x="90" y="52" width="100" height="16" rx="8" fill="#FFE44D" stroke="#1A1A1A" strokeWidth="3.5" />
    {/* Handles */}
    <path d="M100 85 C65 85, 55 120, 80 140" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M100 85 C70 85, 62 115, 82 135" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M180 85 C215 85, 225 120, 200 140" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M180 85 C210 85, 218 115, 198 135" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Happy face */}
    <circle cx="125" cy="115" r="10" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
    <circle cx="155" cy="115" r="10" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
    <circle cx="127" cy="113" r="5" fill="#1A1A1A" />
    <circle cx="157" cy="113" r="5" fill="#1A1A1A" />
    <circle cx="125" cy="111" r="2" fill="#FFFFFF" />
    <circle cx="155" cy="111" r="2" fill="#FFFFFF" />
    <path d="M120 140 C128 152, 152 152, 160 140" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* "3X" text on trophy */}
    <text x="140" y="185" textAnchor="middle" fontSize="32" fontWeight="900" fill="#FF6B00" fontFamily="sans-serif">3X</text>
    {/* Stem */}
    <rect x="130" y="210" width="20" height="24" rx="3" fill="#E0C200" stroke="#1A1A1A" strokeWidth="2.5" />
    {/* Base */}
    <rect x="105" y="232" width="70" height="14" rx="7" fill="#E0C200" stroke="#1A1A1A" strokeWidth="2.5" />
    {/* Star sparkles */}
    <path d="M60 50 L64 40 L68 50 L64 60 Z" fill="#FFD700" />
    <path d="M220 40 L223 33 L226 40 L223 47 Z" fill="#FFD700" />
    <path d="M50 130 L53 124 L56 130 L53 136 Z" fill="#FF6B00" opacity="0.5" />
    {/* Confetti */}
    <rect x="75" y="30" width="8" height="4" rx="2" fill="#FF6B00" transform="rotate(-20 75 30)" />
    <rect x="200" y="35" width="8" height="4" rx="2" fill="#4CAF50" transform="rotate(15 200 35)" />
    <rect x="230" y="100" width="8" height="4" rx="2" fill="#FF4444" transform="rotate(-10 230 100)" />
  </svg>
);
