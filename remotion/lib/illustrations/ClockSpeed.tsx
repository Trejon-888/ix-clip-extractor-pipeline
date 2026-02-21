import React from "react";

// Cartoon alarm clock running fast — represents reply speed urgency
// Style: thick black outlines, panicked face, vibrant colors
export const ClockSpeed: React.FC<{ size?: number }> = ({ size = 280 }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none">
    {/* Clock body */}
    <circle cx="140" cy="145" r="85" fill="#FFF5E8" stroke="#1A1A1A" strokeWidth="4.5" />
    <circle cx="140" cy="145" r="75" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
    {/* Bells */}
    <circle cx="95" cy="65" r="20" fill="#FFD700" stroke="#1A1A1A" strokeWidth="3.5" />
    <circle cx="185" cy="65" r="20" fill="#FFD700" stroke="#1A1A1A" strokeWidth="3.5" />
    <path d="M105 55 C115 40, 165 40, 175 55" stroke="#1A1A1A" strokeWidth="3" fill="none" />
    <rect x="135" y="38" width="10" height="16" rx="3" fill="#1A1A1A" />
    <circle cx="140" cy="35" r="5" fill="#FF4444" stroke="#1A1A1A" strokeWidth="2" />
    {/* Panicked face */}
    <ellipse cx="120" cy="135" rx="12" ry="14" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
    <ellipse cx="160" cy="135" rx="12" ry="14" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
    <circle cx="122" cy="133" r="6" fill="#1A1A1A" />
    <circle cx="162" cy="133" r="6" fill="#1A1A1A" />
    <circle cx="120" cy="131" r="2" fill="#FFFFFF" />
    <circle cx="160" cy="131" r="2" fill="#FFFFFF" />
    <path d="M108 118 C112 114, 125 114, 130 118" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M150 118 C155 114, 168 114, 172 118" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <ellipse cx="140" cy="168" rx="15" ry="10" fill="#FF4444" stroke="#1A1A1A" strokeWidth="2.5" />
    {/* Clock hands */}
    <line x1="140" y1="145" x2="140" y2="95" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" />
    <line x1="140" y1="145" x2="165" y2="120" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
    <circle cx="140" cy="145" r="5" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="2" />
    {/* Running legs */}
    <path d="M108 225 C100 240, 85 245, 75 240" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M172 225 C180 240, 195 245, 205 240" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <ellipse cx="72" cy="241" rx="10" ry="5" fill="#FFF5E8" stroke="#1A1A1A" strokeWidth="2.5" />
    <ellipse cx="208" cy="241" rx="10" ry="5" fill="#FFF5E8" stroke="#1A1A1A" strokeWidth="2.5" />
    {/* Speed lines */}
    <line x1="35" y1="120" x2="15" y2="115" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    <line x1="30" y1="145" x2="8" y2="145" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
    <line x1="35" y1="170" x2="15" y2="175" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    {/* "5 MIN!" badge */}
    <rect x="195" y="175" width="60" height="26" rx="6" fill="#FF4444" stroke="#1A1A1A" strokeWidth="2" />
    <text x="225" y="193" textAnchor="middle" fontSize="14" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">5 MIN!</text>
    {/* Alarm waves */}
    <path d="M70 50 C65 40, 55 40, 50 48" stroke="#FF4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M210 50 C215 40, 225 40, 230 48" stroke="#FF4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);
