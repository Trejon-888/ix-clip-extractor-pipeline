/**
 * Pillar Transition Component — "4 Mechanisms" Style
 *
 * Progressive reveal: cards appear → lines connect → title reveals
 * Apple aesthetic: white background, clean typography, orange accent.
 *
 * Shows all 3 pillars as connected cards, highlighting the current one.
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS } from "../lib/colors";

interface PillarTransitionProps {
  pillarNumber: 1 | 2 | 3;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  startFrame: number;
  durationInFrames: number;
}

const PILLARS = [
  { num: 1, label: "SETUP", desc: "Claude Code + Late MCP" },
  { num: 2, label: "MCP & LATE", desc: "Connecting AI to Social" },
  { num: 3, label: "LIVE DEMOS", desc: "Watch It Work" },
];

export const PillarTransition: React.FC<PillarTransitionProps> = ({
  pillarNumber,
  title,
  subtitle,
  startFrame,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0 || relativeFrame >= durationInFrames) {
    return null;
  }

  // Fade in/out
  const fadeIn = interpolate(relativeFrame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    relativeFrame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  // Title appears first
  const titleOpacity = spring({
    frame: relativeFrame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });
  const titleY = spring({
    frame: relativeFrame,
    fps: 30,
    from: -30,
    to: 0,
    config: { damping: 14, stiffness: 100 },
  });

  // Cards appear staggered
  const card1 = spring({
    frame: Math.max(0, relativeFrame - 8),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const card2 = spring({
    frame: Math.max(0, relativeFrame - 14),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const card3 = spring({
    frame: Math.max(0, relativeFrame - 20),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const cardScales = [card1, card2, card3];

  // Connecting lines draw after cards
  const line1Progress = interpolate(relativeFrame, [18, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Progress = interpolate(relativeFrame, [26, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle appears last
  const subtitleOpacity = interpolate(relativeFrame, [35, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card positions
  const cardW = 340;
  const cardH = 110;
  const positions = [
    { x: 200, y: 380 },
    { x: 790, y: 480 },
    { x: 1380, y: 380 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        opacity,
        zIndex: 100,
      }}
    >
      {/* Title — "PILLAR 2" style */}
      <div
        style={{
          position: "absolute",
          top: 120,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.primary,
            letterSpacing: 6,
            marginBottom: 16,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          PILLAR {pillarNumber}
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#1A1A1A",
            letterSpacing: -2,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {title}
        </div>
      </div>

      {/* Connecting lines (SVG overlay) */}
      <svg
        width="1920"
        height="1080"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        {/* Line 1→2 */}
        <path
          d={`M ${positions[0].x + cardW} ${positions[0].y + cardH / 2} C ${positions[0].x + cardW + 120} ${positions[0].y + cardH / 2 + 80}, ${positions[1].x - 120} ${positions[1].y + cardH / 2 - 40}, ${positions[1].x} ${positions[1].y + cardH / 2}`}
          stroke="#1A1A1A"
          strokeWidth="3"
          fill="none"
          strokeDasharray={`${line1Progress * 500} 500`}
          opacity={0.2}
        />
        {/* Line 2→3 */}
        <path
          d={`M ${positions[1].x + cardW} ${positions[1].y + cardH / 2} C ${positions[1].x + cardW + 120} ${positions[1].y + cardH / 2 - 60}, ${positions[2].x - 120} ${positions[2].y + cardH / 2 + 40}, ${positions[2].x} ${positions[2].y + cardH / 2}`}
          stroke="#1A1A1A"
          strokeWidth="3"
          fill="none"
          strokeDasharray={`${line2Progress * 500} 500`}
          opacity={0.2}
        />
      </svg>

      {/* 3 Pillar cards */}
      {PILLARS.map((pillar, i) => {
        const isActive = pillar.num === pillarNumber;

        return (
          <div
            key={pillar.num}
            style={{
              position: "absolute",
              left: positions[i].x,
              top: positions[i].y,
              width: cardW,
              height: cardH,
              background: "#FFFFFF",
              borderRadius: 20,
              boxShadow: isActive
                ? `0 8px 32px rgba(255, 107, 0, 0.15), 0 0 0 3px ${COLORS.primary}`
                : "0 4px 20px rgba(0,0,0,0.08)",
              border: isActive ? "none" : "1.5px solid #E5E7EB",
              transform: `scale(${cardScales[i]})`,
              transformOrigin: "center center",
              display: "flex",
              alignItems: "center",
              padding: "0 30px",
              gap: 20,
            }}
          >
            {/* Number badge */}
            <div
              style={{
                position: "absolute",
                top: -18,
                left: -14,
                width: 44,
                height: 44,
                borderRadius: 12,
                background: isActive ? COLORS.primary : "#FFFFFF",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: isActive ? "#FFFFFF" : "#1A1A1A",
              }}
            >
              {pillar.num}.
            </div>

            {/* Content */}
            <div>
              <div
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 700,
                  fontSize: 24,
                  color: isActive ? COLORS.primary : "#1A1A1A",
                }}
              >
                {pillar.label}
              </div>
              <div
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#9CA3AF",
                  marginTop: 4,
                }}
              >
                {pillar.desc}
              </div>
            </div>
          </div>
        );
      })}

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          textAlign: "center",
          opacity: subtitleOpacity,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: "#6B7280",
            letterSpacing: 1,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
