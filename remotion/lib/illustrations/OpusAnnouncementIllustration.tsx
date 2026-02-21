/**
 * Opus 4.6 Announcement — Premium Product Card
 *
 * Shows Claude AI wordmark + "OPUS 4.6" in an elegant
 * announcement-style layout. Clean, premium, Apple-like.
 * Designed for solid-white ConceptOverlay backgrounds.
 */

import React from "react";
import { useCurrentFrame, interpolate, spring, Img, staticFile } from "remotion";
import { COLORS } from "../colors";

interface OpusAnnouncementIllustrationProps {
  size?: number;
}

export const OpusAnnouncementIllustration: React.FC<OpusAnnouncementIllustrationProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // Logo entrance
  const logoScale = spring({
    frame,
    fps: 30,
    from: 0.6,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  const logoOpacity = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Version text entrance (staggered)
  const versionProgress = spring({
    frame: Math.max(0, frame - 6),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 160 },
  });
  const versionY = interpolate(versionProgress, [0, 1], [20, 0]);

  // "DROPPED TODAY" entrance
  const droppedProgress = spring({
    frame: Math.max(0, frame - 12),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const droppedY = interpolate(droppedProgress, [0, 1], [15, 0]);

  // Orange accent line grows
  const lineWidth = interpolate(frame, [14, 24], [0, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle glow pulse behind version text
  const glowPulse = interpolate(frame % 40, [0, 20, 40], [0.08, 0.2, 0.08], {
    extrapolateRight: "clamp",
  });

  const scale = size / 600;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24 * scale,
        position: "relative",
      }}
    >
      {/* Subtle glow behind */}
      <div
        style={{
          position: "absolute",
          width: 300 * scale,
          height: 300 * scale,
          borderRadius: "50%",
          backgroundColor: COLORS.primary,
          opacity: glowPulse,
          filter: `blur(${60 * scale}px)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
        }}
      />

      {/* Claude AI wordmark */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <Img
          src={staticFile("logos/claude-ai-wordmark.png")}
          style={{
            width: 280 * scale,
            height: "auto",
          }}
        />
      </div>

      {/* Version badge */}
      <div
        style={{
          opacity: versionProgress,
          transform: `translateY(${versionY}px)`,
          display: "flex",
          alignItems: "center",
          gap: 12 * scale,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 96 * scale,
            color: "#1A1A1A",
            letterSpacing: -2 * scale,
            lineHeight: 1,
          }}
        >
          OPUS
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 96 * scale,
            color: COLORS.primary,
            letterSpacing: -2 * scale,
            lineHeight: 1,
          }}
        >
          4.6
        </div>
      </div>

      {/* Orange accent line */}
      <div
        style={{
          width: lineWidth * scale,
          height: 3 * scale,
          backgroundColor: COLORS.primary,
          borderRadius: 2,
        }}
      />

      {/* "DROPPED TODAY" */}
      <div
        style={{
          opacity: droppedProgress,
          transform: `translateY(${droppedY}px)`,
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 28 * scale,
          color: "#888",
          letterSpacing: 6 * scale,
          textTransform: "uppercase",
        }}
      >
        DROPPED TODAY
      </div>
    </div>
  );
};
