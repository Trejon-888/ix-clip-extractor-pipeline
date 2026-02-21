/**
 * Voice Prompt — Clean Microphone + Sound Waves
 *
 * Replaces the pixel-art VoiceControlPixelApple.
 * Clean vectors, no colored boxes. Orange mic, concentric arcs.
 * Designed for solid-white ConceptOverlay backgrounds.
 */

import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS } from "../colors";

interface VoicePromptCleanProps {
  size?: number;
}

export const VoicePromptClean: React.FC<VoicePromptCleanProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Microphone body entrance
  const micScale = spring({
    frame,
    fps: 30,
    from: 0.4,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  // Sound wave arcs — staggered
  const wave1 = spring({
    frame: Math.max(0, frame - 8),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const wave2 = spring({
    frame: Math.max(0, frame - 14),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const wave3 = spring({
    frame: Math.max(0, frame - 20),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // Pulse glow
  const pulse = interpolate(frame % 30, [0, 15, 30], [0.15, 0.35, 0.15], {
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
      {/* Subtle glow behind mic */}
      <circle cx="300" cy="240" r="120" fill={COLORS.primary} opacity={pulse} />

      {/* Microphone body */}
      <g
        transform={`translate(300, 240) scale(${micScale})`}
        style={{ transformOrigin: "0 0" }}
      >
        {/* Mic capsule — rounded rectangle */}
        <rect
          x={-50}
          y={-120}
          width={100}
          height={160}
          rx={50}
          fill={COLORS.primary}
        />
        {/* Highlight stripes */}
        <rect x={-30} y={-80} width={60} height={6} rx={3} fill="white" opacity={0.4} />
        <rect x={-30} y={-60} width={60} height={6} rx={3} fill="white" opacity={0.3} />
        <rect x={-30} y={-40} width={60} height={6} rx={3} fill="white" opacity={0.2} />

        {/* Cradle arc */}
        <path
          d="M-70 40 Q-70 100 0 100 Q70 100 70 40"
          stroke="#1A1A1A"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
        />

        {/* Stand */}
        <rect x={-5} y={100} width={10} height={60} rx={5} fill="#1A1A1A" />

        {/* Base */}
        <rect x={-50} y={155} width={100} height={10} rx={5} fill="#1A1A1A" />
      </g>

      {/* Sound wave arcs — right side */}
      <g opacity={wave1}>
        <path
          d="M390 180 Q420 240 390 300"
          stroke={COLORS.primary}
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          opacity={0.8}
        />
      </g>
      <g opacity={wave2}>
        <path
          d="M430 150 Q480 240 430 330"
          stroke={COLORS.primary}
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
          opacity={0.5}
        />
      </g>
      <g opacity={wave3}>
        <path
          d="M470 120 Q540 240 470 360"
          stroke={COLORS.primary}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
          opacity={0.3}
        />
      </g>

      {/* Sound wave arcs — left side (mirrored) */}
      <g opacity={wave1}>
        <path
          d="M210 180 Q180 240 210 300"
          stroke={COLORS.primary}
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          opacity={0.8}
        />
      </g>
      <g opacity={wave2}>
        <path
          d="M170 150 Q120 240 170 330"
          stroke={COLORS.primary}
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
          opacity={0.5}
        />
      </g>
      <g opacity={wave3}>
        <path
          d="M130 120 Q60 240 130 360"
          stroke={COLORS.primary}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
          opacity={0.3}
        />
      </g>

      {/* Label */}
      <text
        x={300}
        y={480}
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
        VOICE CONTROL
      </text>

      <text
        x={300}
        y={520}
        textAnchor="middle"
        fill="#888"
        fontSize={20}
        fontWeight={500}
        fontFamily="Inter, sans-serif"
        letterSpacing="1"
        opacity={spring({
          frame: Math.max(0, frame - 16),
          fps: 30,
          from: 0,
          to: 0.8,
          config: { damping: 16, stiffness: 100 },
        })}
      >
        Talk → Post → Done
      </text>

      {/* Orange accent bar */}
      <rect
        x={250}
        y={545}
        width={interpolate(frame, [20, 30], [0, 100], {
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
