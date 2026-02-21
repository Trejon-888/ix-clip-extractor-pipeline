/**
 * Short-Form Video — Phone with Play Button
 *
 * Represents the concept of "short-form video" visually.
 * Large phone mockup, centered play triangle, film accents.
 * Designed for solid-white ConceptOverlay backgrounds.
 */

import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS } from "../colors";

interface ShortFormVideoIllustrationProps {
  size?: number;
}

export const ShortFormVideoIllustration: React.FC<ShortFormVideoIllustrationProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Phone entrance
  const phoneScale = spring({
    frame,
    fps: 30,
    from: 0.5,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  // Play button entrance (delayed)
  const playScale = spring({
    frame: Math.max(0, frame - 8),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 180 },
  });

  // Play button pulse
  const playPulse = interpolate(frame % 40, [0, 20, 40], [1, 1.08, 1], {
    extrapolateRight: "clamp",
  });

  // Film strip accent entrance
  const stripOpacity = spring({
    frame: Math.max(0, frame - 14),
    fps: 30,
    from: 0,
    to: 0.6,
    config: { damping: 16, stiffness: 100 },
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform={`translate(300, 270) scale(${phoneScale})`}
        style={{ transformOrigin: "0 0" }}
      >
        {/* Phone body */}
        <rect
          x={-110}
          y={-200}
          width={220}
          height={380}
          rx={30}
          fill="#1A1A1A"
          stroke="#333"
          strokeWidth={3}
        />

        {/* Screen */}
        <rect
          x={-95}
          y={-175}
          width={190}
          height={330}
          rx={12}
          fill="#2A2A2A"
        />

        {/* Gradient on screen */}
        <defs>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <rect
          x={-95}
          y={-175}
          width={190}
          height={330}
          rx={12}
          fill="url(#screenGrad)"
        />

        {/* Play button */}
        <g transform={`scale(${playScale * playPulse})`} style={{ transformOrigin: "0 -10px" }}>
          <circle cx={0} cy={-10} r={42} fill={COLORS.primary} opacity={0.9} />
          <polygon
            points="-14,-28 -14,8 18,-10"
            fill="white"
          />
        </g>

        {/* Time bar at bottom of screen */}
        <rect x={-80} y={130} width={160} height={4} rx={2} fill="#444" />
        <rect
          x={-80}
          y={130}
          width={interpolate(frame, [0, 30], [0, 80], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          height={4}
          rx={2}
          fill={COLORS.primary}
        />

        {/* "Shorts" text on screen */}
        <text
          x={0}
          y={-140}
          textAnchor="middle"
          fill="white"
          fontSize={16}
          fontWeight={700}
          fontFamily="Inter, sans-serif"
          letterSpacing="2"
          opacity={0.6}
        >
          SHORT-FORM
        </text>
      </g>

      {/* Film strip accents — left */}
      <g opacity={stripOpacity}>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={`l${i}`}
            x={60}
            y={120 + i * 70}
            width={40}
            height={50}
            rx={4}
            fill="#E5E5E5"
            stroke="#CCC"
            strokeWidth={1}
          />
        ))}
      </g>

      {/* Film strip accents — right */}
      <g opacity={stripOpacity}>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={`r${i}`}
            x={500}
            y={120 + i * 70}
            width={40}
            height={50}
            rx={4}
            fill="#E5E5E5"
            stroke="#CCC"
            strokeWidth={1}
          />
        ))}
      </g>
    </svg>
  );
};
