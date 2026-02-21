/**
 * Skills Activated — Gear + Lightning Bolt
 *
 * Represents "skills" / tools / automation concept.
 * Large gear with lightning bolt inside.
 * Designed for solid-white ConceptOverlay backgrounds.
 */

import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS } from "../colors";

interface SkillsIllustrationProps {
  size?: number;
}

export const SkillsIllustration: React.FC<SkillsIllustrationProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Gear entrance
  const gearScale = spring({
    frame,
    fps: 30,
    from: 0.3,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  // Gear subtle rotation
  const gearRotation = interpolate(frame, [0, 60], [0, 15], {
    extrapolateRight: "clamp",
  });

  // Lightning bolt entrance
  const boltScale = spring({
    frame: Math.max(0, frame - 6),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 200 },
  });

  // Lightning pulse
  const boltGlow = interpolate(frame % 25, [0, 12, 25], [0.3, 0.7, 0.3], {
    extrapolateRight: "clamp",
  });

  // Sparkle dots
  const sparkles = [
    { cx: 160, cy: 140, delay: 10 },
    { cx: 440, cy: 160, delay: 14 },
    { cx: 150, cy: 400, delay: 18 },
    { cx: 450, cy: 380, delay: 12 },
    { cx: 300, cy: 100, delay: 16 },
    { cx: 480, cy: 280, delay: 20 },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gear with rotation */}
      <g
        transform={`translate(300, 260) scale(${gearScale}) rotate(${gearRotation})`}
        style={{ transformOrigin: "0 0" }}
      >
        {/* Gear outer teeth — 8 teeth */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = Math.cos(angle) * 120;
          const cy = Math.sin(angle) * 120;
          return (
            <rect
              key={i}
              x={cx - 22}
              y={cy - 22}
              width={44}
              height={44}
              rx={8}
              fill="#1A1A1A"
              transform={`rotate(${i * 45}, ${cx}, ${cy})`}
            />
          );
        })}

        {/* Gear body */}
        <circle cx={0} cy={0} r={100} fill="#1A1A1A" />

        {/* Inner circle */}
        <circle cx={0} cy={0} r={70} fill="#2A2A2A" />

        {/* Lightning bolt glow */}
        <circle cx={0} cy={0} r={55} fill={COLORS.primary} opacity={boltGlow * 0.3} />
      </g>

      {/* Lightning bolt — centered on gear */}
      <g
        transform={`translate(300, 260) scale(${boltScale})`}
        style={{ transformOrigin: "0 0" }}
      >
        <path
          d="M-15 -50 L10 -10 L-5 -10 L15 50 L-10 5 L5 5 Z"
          fill={COLORS.primary}
          stroke="white"
          strokeWidth={2}
          transform="scale(1.8)"
        />
      </g>

      {/* Sparkle dots */}
      {sparkles.map((s, i) => {
        const sparkleScale = spring({
          frame: Math.max(0, frame - s.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 200 },
        });
        const sparkleSize = interpolate(
          frame % 30,
          [0, 15, 30],
          [3, 6, 3],
          { extrapolateRight: "clamp" }
        );
        return (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={sparkleSize}
            fill={COLORS.primary}
            opacity={sparkleScale * 0.6}
          />
        );
      })}

      {/* Label */}
      <text
        x={300}
        y={470}
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize={36}
        fontWeight={800}
        fontFamily="Inter, sans-serif"
        letterSpacing="3"
        opacity={spring({
          frame: Math.max(0, frame - 12),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 16, stiffness: 100 },
        })}
      >
        SKILLS ACTIVATED
      </text>

      {/* Accent bar */}
      <rect
        x={250}
        y={495}
        width={interpolate(frame, [18, 28], [0, 100], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
        height={3}
        rx={2}
        fill={COLORS.primary}
      />
    </svg>
  );
};
