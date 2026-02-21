import React from "react";

// Cartoon calendar bursting with meetings — celebration style
// Style: thick black outlines, character face, green meeting blocks
export const CalendarMeetings: React.FC<{ size?: number }> = ({ size = 280 }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none">
    {/* Calendar body */}
    <rect x="30" y="55" width="220" height="180" rx="14" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="4" />
    {/* Top bar */}
    <rect x="30" y="55" width="220" height="50" rx="14" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="4" />
    <rect x="30" y="90" width="220" height="15" fill="#FF6B00" />
    {/* Rings */}
    <rect x="80" y="42" width="12" height="28" rx="6" fill="#1A1A1A" />
    <rect x="188" y="42" width="12" height="28" rx="6" fill="#1A1A1A" />
    {/* Happy face in header */}
    <circle cx="115" cy="78" r="5" fill="#FFFFFF" />
    <circle cx="165" cy="78" r="5" fill="#FFFFFF" />
    <path d="M125 90 C135 97, 145 97, 155 90" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Meeting blocks */}
    {[
      { x: 42, y: 112, w: 38, h: 22 }, { x: 84, y: 112, w: 38, h: 22 },
      { x: 126, y: 112, w: 38, h: 22 }, { x: 168, y: 112, w: 38, h: 22 },
      { x: 210, y: 112, w: 30, h: 22 }, { x: 42, y: 140, w: 38, h: 22 },
      { x: 84, y: 140, w: 38, h: 22 }, { x: 168, y: 140, w: 38, h: 22 },
      { x: 210, y: 140, w: 30, h: 22 }, { x: 42, y: 168, w: 38, h: 22 },
      { x: 84, y: 168, w: 38, h: 22 }, { x: 126, y: 168, w: 38, h: 22 },
      { x: 168, y: 168, w: 38, h: 22 }, { x: 42, y: 196, w: 38, h: 22 },
      { x: 126, y: 196, w: 38, h: 22 }, { x: 168, y: 196, w: 38, h: 22 },
      { x: 210, y: 196, w: 30, h: 22 },
    ].map((b, i) => (
      <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="4"
        fill={i % 3 === 0 ? "#4CAF50" : i % 3 === 1 ? "#66BB6A" : "#81C784"}
        stroke="#1A1A1A" strokeWidth="1.5" />
    ))}
    {/* Checkmarks */}
    {[{ x: 61, y: 126 }, { x: 145, y: 126 }, { x: 103, y: 154 }, { x: 187, y: 182 }, { x: 61, y: 210 }].map((c, i) => (
      <path key={i} d={`M${c.x - 5} ${c.y} L${c.x - 1} ${c.y + 3} L${c.x + 5} ${c.y - 3}`}
        stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ))}
    {/* Sparkles */}
    <path d="M20 45 L24 35 L28 45 L24 55 Z" fill="#FFD700" />
    <path d="M252 45 L255 38 L258 45 L255 52 Z" fill="#FFD700" />
    {/* Badge */}
    <rect x="75" y="245" width="130" height="28" rx="14" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="2.5" />
    <text x="140" y="264" textAnchor="middle" fontSize="14" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">20-30 / WEEK</text>
  </svg>
);
