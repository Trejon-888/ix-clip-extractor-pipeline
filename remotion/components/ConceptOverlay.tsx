/**
 * ConceptOverlay — Frosted glass concept visualization
 *
 * Replaces AppleStylePopup for scenarios where the concept should
 * feel integrated with the video rather than overlaid on top.
 * Speaker video bleeds through the glassmorphic background.
 *
 * Entrance modes:
 *   "clip-circle"  — Expanding circle clip-path reveal from center
 *   "wipe-right"   — Horizontal wipe from left to right
 *   "fade-blur"    — Fade in with increasing blur sharpness
 */

import React, { ReactNode } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export interface ConceptOverlayProps {
  durationInFrames: number;
  illustration: ReactNode;
  caption?: string;
  subtitle?: string;
  illustrationSize?: number;
  accentColor?: string;
  entrance?: "clip-circle" | "wipe-right" | "fade-blur";
  backgroundStyle?: "frosted" | "solid-white" | "dark-blur";
}

export const ConceptOverlay: React.FC<ConceptOverlayProps> = ({
  durationInFrames,
  illustration,
  caption,
  subtitle,
  illustrationSize = 460,
  accentColor = "#FF7614",
  entrance = "clip-circle",
  backgroundStyle = "frosted",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === EXIT: Smooth fade (last 12 frames) ===
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === ENTRANCE animations ===
  let clipPath = "none";
  let entranceOpacity = 1;

  if (entrance === "clip-circle") {
    // Circle expands from center (0% to 75% radius over 15 frames)
    const radius = interpolate(frame, [0, 15], [0, 75], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    clipPath = `circle(${radius}% at 50% 50%)`;
    entranceOpacity = 1; // clip-path handles reveal
  } else if (entrance === "wipe-right") {
    // Horizontal wipe from left
    const wipeProgress = interpolate(frame, [0, 12], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    clipPath = `inset(0 ${100 - wipeProgress}% 0 0)`;
  } else if (entrance === "fade-blur") {
    entranceOpacity = interpolate(frame, [0, 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  const overallOpacity = entranceOpacity * fadeOut;

  // === BACKGROUND style ===
  let bgStyles: React.CSSProperties = {};
  if (backgroundStyle === "frosted") {
    bgStyles = {
      backgroundColor: "rgba(255, 255, 255, 0.82)",
      backdropFilter: "blur(40px)",
      WebkitBackdropFilter: "blur(40px)",
    };
  } else if (backgroundStyle === "solid-white") {
    bgStyles = { backgroundColor: "#FFFFFF" };
  } else if (backgroundStyle === "dark-blur") {
    bgStyles = {
      backgroundColor: "rgba(10, 10, 10, 0.75)",
      backdropFilter: "blur(30px)",
      WebkitBackdropFilter: "blur(30px)",
    };
  }

  // === ILLUSTRATION: Spring pop-in from frame 5 ===
  const illoScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  const illoOpacity = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Subtle float
  const floatY = interpolate(
    frame,
    [0, durationInFrames * 0.5, durationInFrames],
    [0, -5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === CAPTION: KineticText-style entrance ===
  const captionProgress = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0,
    to: 1,
    config: { damping: 16, stiffness: 100 },
  });
  const captionY = interpolate(captionProgress, [0, 1], [25, 0]);

  // === SUBTITLE ===
  const subtitleProgress = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: 0,
    to: 1,
    config: { damping: 18, stiffness: 80 },
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [15, 0]);

  // === ACCENT LINE ===
  const lineWidth = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 120,
    config: { damping: 14, stiffness: 100 },
  });

  // === ORANGE GLOW PULSE at edges ===
  const glowOpacity = interpolate(frame % 50, [0, 25, 50], [0.02, 0.06, 0.02], {
    extrapolateRight: "clamp",
  });

  const isDark = backgroundStyle === "dark-blur";
  const textColor = isDark ? "#FFFFFF" : "#1A1A1A";
  const subtitleColor = isDark ? "#AAAAAA" : "#888888";

  return (
    <AbsoluteFill
      style={{
        opacity: overallOpacity,
        clipPath: clipPath !== "none" ? clipPath : undefined,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          ...bgStyles,
        }}
      />

      {/* Orange glow pulse at edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 100%, ${accentColor}${Math.round(glowOpacity * 255).toString(16).padStart(2, "0")} 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Content container */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {/* Illustration */}
        <div
          style={{
            transform: `scale(${illoScale}) translateY(${floatY}px)`,
            opacity: illoOpacity,
            width: illustrationSize,
            height: illustrationSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.08))",
          }}
        >
          <div
            style={{
              transform: `scale(${illustrationSize / 600})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {illustration}
          </div>
        </div>

        {/* Accent line (only when caption present) */}
        {caption && (
          <div
            style={{
              width: lineWidth,
              height: 3,
              backgroundColor: accentColor,
              borderRadius: 2,
              opacity: captionProgress * 0.8,
            }}
          />
        )}

        {/* Caption */}
        {caption && (
          <div
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 52,
              color: textColor,
              letterSpacing: 4,
              textAlign: "center",
              opacity: captionProgress,
              transform: `translateY(${captionY}px)`,
              padding: "0 60px",
              lineHeight: 1.1,
            }}
          >
            {caption}
          </div>
        )}

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontFamily,
              fontWeight: 500,
              fontSize: 30,
              color: subtitleColor,
              letterSpacing: 2,
              textAlign: "center",
              opacity: subtitleProgress,
              transform: `translateY(${subtitleY}px)`,
              padding: "0 80px",
            }}
          >
            {subtitle}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
