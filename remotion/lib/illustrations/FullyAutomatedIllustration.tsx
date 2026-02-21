/**
 * Fully Automated — Voice-to-Post Pipeline Illustration
 *
 * Concept: Visual flow from voice input → processing → multi-platform output.
 * Top: Microphone icon (voice input)
 * Middle: Animated gear processing
 * Bottom: 4 platform icons spring in as output
 * Flow arrows connecting each stage.
 * V2 pattern with spring + interpolate animations.
 * Designed for white backgrounds (ConceptOverlay solid-white).
 */

import React from "react";
import { useCurrentFrame, spring, interpolate, Img, staticFile } from "remotion";

interface FullyAutomatedIllustrationProps {
  size?: number;
}

const PLATFORMS = [
  { logo: "logos/youtube.svg", name: "YT" },
  { logo: "logos/tiktok.svg", name: "TK" },
  { logo: "logos/threads.svg", name: "TH" },
  { logo: "logos/instagram.svg", name: "IG" },
];

export const FullyAutomatedIllustration: React.FC<FullyAutomatedIllustrationProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  // Stage 1: Microphone entrance
  const micProgress = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  // Stage 2: Arrow flow + Gear
  const gearProgress = spring({
    frame: Math.max(0, frame - 6),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  // Gear rotation
  const gearRotation = interpolate(frame, [0, 60], [0, 360], {
    extrapolateRight: "extend",
  });

  // Stage 3: Output platforms (staggered)
  const platformDelays = [12, 15, 18, 21];

  // Flow arrow progress
  const arrow1 = spring({
    frame: Math.max(0, frame - 4),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 100 },
  });

  const arrow2 = spring({
    frame: Math.max(0, frame - 10),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 100 },
  });

  // Processing pulse
  const processingPulse = interpolate(frame % 20, [0, 10, 20], [0.7, 1, 0.7], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${50 * s}px ${30 * s}px`,
      }}
    >
      {/* ── STAGE 1: Voice Input ─────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8 * s,
          opacity: micProgress,
          transform: `scale(${interpolate(micProgress, [0, 1], [0.7, 1])})`,
        }}
      >
        {/* Mic circle */}
        <div
          style={{
            width: 90 * s,
            height: 90 * s,
            borderRadius: "50%",
            backgroundColor: "#FF6B00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 ${6 * s}px ${24 * s}px rgba(255, 107, 0, 0.3)`,
          }}
        >
          <svg width={40 * s} height={40 * s} viewBox="0 0 40 40" fill="none">
            <rect x="14" y="4" width="12" height="20" rx="6" fill="white" />
            <path d="M10 18C10 24.6 14.5 28 20 28C25.5 28 30 24.6 30 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="20" y1="28" x2="20" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="14" y1="36" x2="26" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 16 * s,
            color: "#1A1A1A",
            letterSpacing: 2 * s,
          }}
        >
          VOICE INPUT
        </div>
      </div>

      {/* ── ARROW 1 ──────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: arrow1,
        }}
      >
        <svg width={24 * s} height={50 * s} viewBox="0 0 24 50" fill="none">
          <line
            x1="12" y1="0" x2="12"
            y2={interpolate(arrow1, [0, 1], [0, 38])}
            stroke="#FF6B00"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <path
            d="M6 38L12 48L18 38"
            fill="#FF6B00"
            opacity={arrow1}
          />
        </svg>
      </div>

      {/* ── STAGE 2: Processing ──────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8 * s,
          opacity: gearProgress,
          transform: `scale(${interpolate(gearProgress, [0, 1], [0.7, 1])})`,
        }}
      >
        {/* Gear with glow */}
        <div
          style={{
            position: "relative",
            width: 80 * s,
            height: 80 * s,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Glow behind gear */}
          <div
            style={{
              position: "absolute",
              width: 100 * s,
              height: 100 * s,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,118,20,0.2) 0%, transparent 70%)",
              opacity: processingPulse,
            }}
          />
          <svg
            width={64 * s}
            height={64 * s}
            viewBox="0 0 64 64"
            fill="none"
            style={{ transform: `rotate(${gearRotation}deg)` }}
          >
            <circle cx="32" cy="32" r="10" stroke="#1A1A1A" strokeWidth="3" fill="none" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 32 + Math.cos(rad) * 16;
              const y1 = 32 + Math.sin(rad) * 16;
              const x2 = 32 + Math.cos(rad) * 24;
              const y2 = 32 + Math.sin(rad) * 24;
              return (
                <line
                  key={angle}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#1A1A1A"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 14 * s,
            color: "#888",
            letterSpacing: 2 * s,
          }}
        >
          PROCESSING
        </div>
      </div>

      {/* ── ARROW 2 ──────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: arrow2,
        }}
      >
        <svg width={24 * s} height={50 * s} viewBox="0 0 24 50" fill="none">
          <line
            x1="12" y1="0" x2="12"
            y2={interpolate(arrow2, [0, 1], [0, 38])}
            stroke="#FF6B00"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <path
            d="M6 38L12 48L18 38"
            fill="#FF6B00"
            opacity={arrow2}
          />
        </svg>
      </div>

      {/* ── STAGE 3: Platform Output ─────────────────────── */}
      <div
        style={{
          display: "flex",
          gap: 16 * s,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {PLATFORMS.map((platform, i) => {
          const pProgress = spring({
            frame: Math.max(0, frame - platformDelays[i]),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 160 },
          });
          const pY = interpolate(pProgress, [0, 1], [20, 0]);

          // Green checkmark after platform enters
          const checkProgress = spring({
            frame: Math.max(0, frame - platformDelays[i] - 8),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 14, stiffness: 200 },
          });

          return (
            <div
              key={platform.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6 * s,
                opacity: pProgress,
                transform: `translateY(${pY}px) scale(${interpolate(pProgress, [0, 1], [0.7, 1])})`,
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 64 * s,
                  height: 64 * s,
                  borderRadius: 16 * s,
                  backgroundColor: "#F5F5F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 ${3 * s}px ${12 * s}px rgba(0,0,0,0.08)`,
                }}
              >
                <Img
                  src={staticFile(platform.logo)}
                  style={{ width: 36 * s, height: 36 * s }}
                />
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 12 * s,
                  color: "#888",
                  letterSpacing: 1 * s,
                }}
              >
                {platform.name}
              </div>
              {/* Green check */}
              <div
                style={{
                  position: "absolute",
                  top: -6 * s,
                  right: -6 * s,
                  width: 22 * s,
                  height: 22 * s,
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: checkProgress,
                  transform: `scale(${checkProgress})`,
                }}
              >
                <svg width={12 * s} height={12 * s} viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
