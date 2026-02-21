/**
 * Voice Control V2 — Microphone with animated sound waves
 *
 * V2 pattern: useCurrentFrame + interpolate for motion
 * Used for "one voice prompt" popup moments.
 */

import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS } from "../colors";

interface VoiceControlV2Props {
  size?: number;
}

export const VoiceControlV2: React.FC<VoiceControlV2Props> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Microphone spring entrance
  const micScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // Pulse animation on mic body
  const pulse = interpolate(frame % 30, [0, 15, 30], [1, 1.04, 1], {
    extrapolateRight: "clamp",
  });

  // Sound waves — staggered reveal with spring
  const wave1 = spring({
    frame: Math.max(0, frame - 8),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });
  const wave2 = spring({
    frame: Math.max(0, frame - 14),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });
  const wave3 = spring({
    frame: Math.max(0, frame - 20),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });

  // Label slide-up
  const labelProgress = spring({
    frame: Math.max(0, frame - 10),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 16, stiffness: 100 },
  });
  const labelY = interpolate(labelProgress, [0, 1], [20, 0]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Microphone group with spring + pulse */}
      <g
        transform={`translate(260, 120) scale(${micScale * pulse})`}
        style={{ transformOrigin: "40px 100px" }}
      >
        {/* Mic capsule */}
        <rect x={5} y={0} width={70} height={140} rx={35} fill={COLORS.primary} />

        {/* Mic grille lines */}
        {[30, 50, 70, 90].map((y) => (
          <line
            key={y}
            x1={18}
            y1={y}
            x2={62}
            y2={y}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={2}
            strokeLinecap="round"
          />
        ))}

        {/* Mic cradle arc */}
        <path
          d="M-20 120 Q-20 200 40 200 Q100 200 100 120"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth={7}
          strokeLinecap="round"
        />

        {/* Stand pole */}
        <line
          x1={40}
          y1={200}
          x2={40}
          y2={270}
          stroke="#1A1A1A"
          strokeWidth={7}
        />

        {/* Stand base */}
        <line
          x1={-10}
          y1={270}
          x2={90}
          y2={270}
          stroke="#1A1A1A"
          strokeWidth={7}
          strokeLinecap="round"
        />
      </g>

      {/* Sound waves (right side, staggered) */}
      {[
        { progress: wave1, offset: 90, opacity: 0.9 },
        { progress: wave2, offset: 130, opacity: 0.6 },
        { progress: wave3, offset: 170, opacity: 0.35 },
      ].map(({ progress, offset, opacity }, i) => (
        <path
          key={i}
          d={`M${300 + offset} 200 Q${315 + offset} 280 ${300 + offset} 360`}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={5}
          opacity={progress * opacity}
          strokeLinecap="round"
        />
      ))}

      {/* Sound waves (left side, mirrored, staggered) */}
      {[
        { progress: wave1, offset: 90, opacity: 0.7 },
        { progress: wave2, offset: 130, opacity: 0.45 },
        { progress: wave3, offset: 170, opacity: 0.25 },
      ].map(({ progress, offset, opacity }, i) => (
        <path
          key={`l-${i}`}
          d={`M${300 - offset} 200 Q${285 - offset} 280 ${300 - offset} 360`}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={5}
          opacity={progress * opacity}
          strokeLinecap="round"
        />
      ))}

      {/* Label */}
      <text
        x={300}
        y={490}
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize={38}
        fontWeight={800}
        fontFamily="Inter, sans-serif"
        opacity={labelProgress}
        transform={`translate(0, ${labelY})`}
      >
        VOICE CONTROL
      </text>

      {/* Subtitle */}
      <text
        x={300}
        y={530}
        textAnchor="middle"
        fill="#6B7280"
        fontSize={20}
        fontWeight={500}
        fontFamily="Inter, sans-serif"
        opacity={labelProgress * 0.8}
        transform={`translate(0, ${labelY})`}
      >
        Talk → Post → Done
      </text>

      {/* Orange accent bar */}
      <rect
        x={250}
        y={560}
        width={interpolate(frame, [24, 34], [0, 100], {
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
