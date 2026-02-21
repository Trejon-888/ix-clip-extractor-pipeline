import React from "react";

// Cartoon laptop on fire — represents broken single-account outreach
// Style: thick black outlines, character face, vibrant fire colors (like reference image)
export const EmailIcon: React.FC<{ size?: number }> = ({ size = 280 }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none">
    {/* Laptop base */}
    <rect x="40" y="180" width="200" height="16" rx="4" fill="#E0E0E0" stroke="#1A1A1A" strokeWidth="4" />
    {/* Laptop keyboard */}
    <rect x="60" y="150" width="160" height="34" rx="4" fill="#D0D0D0" stroke="#1A1A1A" strokeWidth="3.5" />
    {/* Keyboard lines */}
    <line x1="80" y1="162" x2="200" y2="162" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.3" />
    <line x1="80" y1="172" x2="200" y2="172" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.3" />
    {/* Trackpad */}
    <rect x="120" y="176" width="40" height="4" rx="2" fill="#B0B0B0" stroke="#1A1A1A" strokeWidth="1" />

    {/* Laptop screen */}
    <rect x="55" y="60" width="170" height="95" rx="6" fill="#3A3A3A" stroke="#1A1A1A" strokeWidth="4" />
    <rect x="63" y="68" width="154" height="79" rx="3" fill="#4A90D9" />

    {/* Fire behind screen */}
    <path d="M100 65 C95 30, 115 10, 120 25 C125 5, 145 -5, 140 30 C150 15, 165 5, 160 35 C170 20, 185 25, 175 55 C180 45, 190 50, 180 65"
      fill="#FF4444" />
    <path d="M108 65 C105 40, 120 25, 125 38 C130 20, 148 12, 140 40 C150 28, 160 22, 155 48 C162 38, 172 40, 168 60"
      fill="#FF8800" />
    <path d="M118 65 C116 48, 128 38, 132 48 C135 35, 150 30, 145 50 C152 42, 158 44, 155 60"
      fill="#FFCC00" />

    {/* Fire sparks */}
    <circle cx="105" cy="18" r="3" fill="#FF4444" />
    <circle cx="155" cy="8" r="2.5" fill="#FF4444" />
    <circle cx="130" cy="5" r="2" fill="#FF8800" />

    {/* Angry face on screen */}
    <line x1="115" y1="98" x2="125" y2="103" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="155" y1="98" x2="165" y2="103" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="122" cy="105" r="3" fill="#1A1A1A" />
    <circle cx="158" cy="105" r="3" fill="#1A1A1A" />
    <path d="M128 120 C132 118, 148 118, 152 120" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
    <line x1="112" y1="93" x2="128" y2="96" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="168" y1="93" x2="152" y2="96" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />

    {/* Little flame hands */}
    <ellipse cx="48" cy="130" rx="10" ry="8" fill="#FF8800" stroke="#1A1A1A" strokeWidth="2" />
    <ellipse cx="232" cy="130" rx="10" ry="8" fill="#FF8800" stroke="#1A1A1A" strokeWidth="2" />
  </svg>
);
