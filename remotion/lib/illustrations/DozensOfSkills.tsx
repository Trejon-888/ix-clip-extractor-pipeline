import React from "react";
import { COLORS } from "../colors";

/**
 * Dozens of Skills - Expanding grid of skill blocks
 * Shows many skills fitting without overwhelming context
 */
export const DozensOfSkills: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const skills = [
    "Email", "Search", "Code", "Chat",
    "Data", "Deploy", "Test", "Auth",
    "DB", "API", "UI", "ML",
    "Docs", "Parse", "Cache", "Log",
    "OCR", "CRM", "PDF", "CSV",
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Grid of skill blocks - 5x4 */}
      {skills.map((skill, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 60 + col * 104;
        const y = 80 + row * 100;
        const opacity = 0.5 + (i < 12 ? 0.5 : 0.2);
        const isBright = i < 12;

        return (
          <g key={skill}>
            <rect
              x={x}
              y={y}
              width="88"
              height="80"
              rx="10"
              fill={isBright ? COLORS.darkGray : COLORS.mediumGray}
              stroke={isBright ? COLORS.primary : COLORS.gray}
              strokeWidth={isBright ? 2 : 1}
              opacity={opacity}
            />
            <text
              x={x + 44}
              y={y + 45}
              textAnchor="middle"
              fill={isBright ? COLORS.primary : COLORS.lightGray}
              fontSize="16"
              fontWeight="700"
            >
              {skill}
            </text>
          </g>
        );
      })}

      {/* "+" indicators showing more can be added */}
      <text x="540" y="230" fill={COLORS.primary} fontSize="32" fontWeight="700" opacity="0.6">+</text>
      <text x="540" y="330" fill={COLORS.primary} fontSize="32" fontWeight="700" opacity="0.4">+</text>
      <text x="540" y="430" fill={COLORS.primary} fontSize="32" fontWeight="700" opacity="0.3">+</text>

      {/* Bottom label */}
      <text x="300" y="520" textAnchor="middle" fill={COLORS.primary} fontSize="28" fontWeight="800" letterSpacing="1">
        DOZENS OF SKILLS
      </text>
      <text x="300" y="555" textAnchor="middle" fill={COLORS.lightGray} fontSize="16">
        Without overwhelming context
      </text>
    </svg>
  );
};
