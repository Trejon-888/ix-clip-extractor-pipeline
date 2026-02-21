/**
 * Voice Control — Pixel Art × Apple Style
 *
 * Aesthetic: pixel art charm + Apple premium polish.
 * Grid-based blocky shapes, limited palette, smooth spring animations.
 * Designed for white backgrounds (AppleStylePopup).
 */

import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS } from "../colors";

interface VoiceControlPixelAppleProps {
  size?: number;
}

// Pixel block helper
const Px: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  color: string;
  delay: number;
  frame: number;
}> = ({ x, y, w = 1, h = 1, color, delay, frame }) => {
  const S = 20; // pixel size
  const scale = spring({
    frame: Math.max(0, frame - delay),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 160 },
  });

  return (
    <rect
      x={x * S}
      y={y * S}
      width={w * S}
      height={h * S}
      rx={3}
      fill={color}
      opacity={scale}
      transform={`scale(${scale})`}
      style={{ transformOrigin: `${x * S + (w * S) / 2}px ${y * S + (h * S) / 2}px` }}
    />
  );
};

export const VoiceControlPixelApple: React.FC<VoiceControlPixelAppleProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const O = COLORS.primary;  // Orange
  const D = "#1A1A1A";       // Dark
  const G = "#E5E5E5";       // Light gray
  const W = "#FFFFFF";        // White (highlight)

  // Microphone capsule (centered around x=13, y=4)
  const micPixels = [
    // Capsule body (orange, rows 4-12)
    { x: 12, y: 4, w: 3, h: 1, c: O, d: 0 },
    { x: 11, y: 5, w: 5, h: 1, c: O, d: 1 },
    { x: 11, y: 6, w: 5, h: 1, c: O, d: 1 },
    { x: 11, y: 7, w: 5, h: 1, c: O, d: 2 },
    { x: 11, y: 8, w: 5, h: 1, c: O, d: 2 },
    { x: 11, y: 9, w: 5, h: 1, c: O, d: 3 },
    { x: 11, y: 10, w: 5, h: 1, c: O, d: 3 },
    { x: 11, y: 11, w: 5, h: 1, c: O, d: 4 },
    { x: 12, y: 12, w: 3, h: 1, c: O, d: 4 },

    // Grille lines (white highlights)
    { x: 12, y: 6, w: 3, h: 1, c: W, d: 3 },
    { x: 12, y: 8, w: 3, h: 1, c: W, d: 4 },
    { x: 12, y: 10, w: 3, h: 1, c: W, d: 5 },

    // Cradle arc (dark)
    { x: 9, y: 12, w: 2, h: 1, c: D, d: 5 },
    { x: 16, y: 12, w: 2, h: 1, c: D, d: 5 },
    { x: 9, y: 13, w: 1, h: 1, c: D, d: 6 },
    { x: 17, y: 13, w: 1, h: 1, c: D, d: 6 },
    { x: 9, y: 14, w: 1, h: 1, c: D, d: 6 },
    { x: 17, y: 14, w: 1, h: 1, c: D, d: 6 },
    { x: 10, y: 15, w: 7, h: 1, c: D, d: 7 },

    // Stand (dark)
    { x: 13, y: 16, w: 1, h: 3, c: D, d: 7 },

    // Base (dark)
    { x: 10, y: 19, w: 7, h: 1, c: D, d: 8 },
  ];

  // Sound waves — right side (orange, staggered)
  const wavesRight = [
    // Wave 1
    { x: 18, y: 7, w: 1, h: 1, c: O, d: 6 },
    { x: 18, y: 8, w: 1, h: 1, c: O, d: 6 },
    { x: 18, y: 9, w: 1, h: 1, c: O, d: 7 },
    { x: 18, y: 10, w: 1, h: 1, c: O, d: 7 },
    // Wave 2
    { x: 20, y: 6, w: 1, h: 1, c: O, d: 9 },
    { x: 20, y: 7, w: 1, h: 1, c: O, d: 9 },
    { x: 20, y: 8, w: 1, h: 1, c: O, d: 10 },
    { x: 20, y: 9, w: 1, h: 1, c: O, d: 10 },
    { x: 20, y: 10, w: 1, h: 1, c: O, d: 11 },
    { x: 20, y: 11, w: 1, h: 1, c: O, d: 11 },
    // Wave 3
    { x: 22, y: 5, w: 1, h: 1, c: O, d: 12 },
    { x: 22, y: 6, w: 1, h: 1, c: O, d: 12 },
    { x: 22, y: 7, w: 1, h: 1, c: O, d: 13 },
    { x: 22, y: 8, w: 1, h: 1, c: O, d: 13 },
    { x: 22, y: 9, w: 1, h: 1, c: O, d: 14 },
    { x: 22, y: 10, w: 1, h: 1, c: O, d: 14 },
    { x: 22, y: 11, w: 1, h: 1, c: O, d: 15 },
    { x: 22, y: 12, w: 1, h: 1, c: O, d: 15 },
  ];

  // Sound waves — left side (mirrored, lighter)
  const wavesLeft = wavesRight.map((p) => ({
    ...p,
    x: 26 - p.x, // mirror around center (x=13)
    c: O,
    d: p.d + 1,
  }));

  // Platform dots (bottom area — tiny squares representing connected platforms)
  const platformDots = [
    { x: 7, y: 22, w: 1, h: 1, c: "#FF0000", d: 14 },  // YouTube red
    { x: 9, y: 22, w: 1, h: 1, c: "#E4405F", d: 15 },  // Instagram
    { x: 11, y: 22, w: 1, h: 1, c: "#0A66C2", d: 16 },  // LinkedIn
    { x: 13, y: 22, w: 1, h: 1, c: "#000000", d: 17 },  // X/Twitter
    { x: 15, y: 22, w: 1, h: 1, c: "#000000", d: 18 },  // TikTok
    { x: 17, y: 22, w: 1, h: 1, c: "#0085FF", d: 19 },  // Bluesky
    { x: 19, y: 22, w: 1, h: 1, c: "#26A5E4", d: 20 },  // Telegram
  ];

  const allPixels = [...micPixels, ...wavesRight, ...wavesLeft, ...platformDots];

  // Label animation
  const labelProgress = spring({
    frame: Math.max(0, frame - 12),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 16, stiffness: 100 },
  });
  const labelY = interpolate(labelProgress, [0, 1], [15, 0]);

  // Pulse glow on microphone (subtle)
  const glowOpacity = interpolate(frame % 40, [0, 20, 40], [0.1, 0.25, 0.1], {
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Offset to center the 30×30 grid (600/20=30) in the viewBox */}
      <g transform="translate(40, 60)">
        {/* Subtle glow behind mic */}
        <circle
          cx={13 * 20 + 10}
          cy={9 * 20}
          r={80}
          fill={COLORS.primary}
          opacity={glowOpacity}
        />

        {/* All pixel blocks */}
        {allPixels.map((p, i) => (
          <Px
            key={i}
            x={p.x}
            y={p.y}
            w={p.w}
            h={p.h}
            color={p.c}
            delay={p.d}
            frame={frame}
          />
        ))}
      </g>

      {/* Label — Apple typography */}
      <text
        x={300}
        y={520}
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize={34}
        fontWeight={800}
        fontFamily="Inter, sans-serif"
        letterSpacing="3"
        opacity={labelProgress}
        transform={`translate(0, ${labelY})`}
      >
        VOICE CONTROL
      </text>

      <text
        x={300}
        y={555}
        textAnchor="middle"
        fill="#888888"
        fontSize={18}
        fontWeight={500}
        fontFamily="Inter, sans-serif"
        letterSpacing="1"
        opacity={labelProgress * 0.8}
        transform={`translate(0, ${labelY})`}
      >
        Talk → Post → Done
      </text>

      {/* Accent bar */}
      <rect
        x={250}
        y={575}
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
