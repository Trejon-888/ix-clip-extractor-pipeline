/**
 * Video Posted — Success Checkmark + Radiating Lines
 *
 * Represents "video posted" / "published" concept.
 * Large green checkmark, radiating success lines, platform dots.
 * Designed for solid-white ConceptOverlay backgrounds.
 */

import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS } from "../colors";

interface VideoPostedIllustrationProps {
  size?: number;
}

export const VideoPostedIllustration: React.FC<VideoPostedIllustrationProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Circle entrance
  const circleScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  // Checkmark draw
  const checkDraw = interpolate(frame, [6, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Radiating lines
  const lineScale = spring({
    frame: Math.max(0, frame - 10),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 200 },
  });

  // Platform dot entrances
  const platformColors = [
    "#FF0000", "#E4405F", "#0A66C2", "#000000",
    "#000000", "#1877F2", "#E60023",
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Success glow */}
      <circle
        cx={300}
        cy={240}
        r={140}
        fill="#22C55E"
        opacity={interpolate(frame, [0, 10], [0, 0.15], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      />

      {/* Main circle */}
      <circle
        cx={300}
        cy={240}
        r={100 * circleScale}
        fill="#22C55E"
      />

      {/* Checkmark */}
      <path
        d={`M260 240 L285 270 L340 215`}
        stroke="white"
        strokeWidth={14}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={140}
        strokeDashoffset={140 * (1 - checkDraw)}
      />

      {/* Radiating lines — 8 directions */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const innerR = 120;
        const outerR = 160;
        const x1 = 300 + Math.cos(angle) * innerR * lineScale;
        const y1 = 240 + Math.sin(angle) * innerR * lineScale;
        const x2 = 300 + Math.cos(angle) * outerR * lineScale;
        const y2 = 240 + Math.sin(angle) * outerR * lineScale;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={COLORS.primary}
            strokeWidth={4}
            strokeLinecap="round"
            opacity={lineScale * 0.7}
          />
        );
      })}

      {/* Platform dots — bottom row */}
      {platformColors.map((color, i) => {
        const dotScale = spring({
          frame: Math.max(0, frame - 16 - i * 2),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 180 },
        });
        const x = 170 + i * 44;
        return (
          <circle
            key={i}
            cx={x}
            cy={430}
            r={14 * dotScale}
            fill={color}
          />
        );
      })}

      {/* Connected line through platform dots */}
      <line
        x1={170}
        y1={430}
        x2={170 + 6 * 44}
        y2={430}
        stroke="#E5E5E5"
        strokeWidth={2}
        opacity={spring({
          frame: Math.max(0, frame - 16),
          fps: 30,
          from: 0,
          to: 0.5,
          config: { damping: 16, stiffness: 100 },
        })}
      />

      {/* Label */}
      <text
        x={300}
        y={490}
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize={36}
        fontWeight={800}
        fontFamily="Inter, sans-serif"
        letterSpacing="3"
        opacity={spring({
          frame: Math.max(0, frame - 14),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 16, stiffness: 100 },
        })}
      >
        POSTED
      </text>

      <text
        x={300}
        y={525}
        textAnchor="middle"
        fill="#888"
        fontSize={20}
        fontWeight={500}
        fontFamily="Inter, sans-serif"
        letterSpacing="1"
        opacity={spring({
          frame: Math.max(0, frame - 18),
          fps: 30,
          from: 0,
          to: 0.8,
          config: { damping: 16, stiffness: 100 },
        })}
      >
        Across all your platforms
      </text>

      {/* Accent bar */}
      <rect
        x={250}
        y={550}
        width={interpolate(frame, [22, 32], [0, 100], {
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
