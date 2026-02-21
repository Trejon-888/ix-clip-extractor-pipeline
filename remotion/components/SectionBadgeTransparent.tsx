import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLORS } from "../lib/colors";

const { fontFamily } = loadFont();

export interface SectionBadgeTransparentProps {
  label: string;
  subtitle?: string;
  durationInFrames: number;
}

/**
 * V8 Section Badge - TRANSPARENT background
 * Shows briefly, doesn't cover the video
 * Fades out smoothly
 */
export const SectionBadgeTransparent: React.FC<SectionBadgeTransparentProps> = ({
  label,
  subtitle,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  const scale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 12, stiffness: 180 },
  });

  const subtitleOpacity = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        // NO solid background - just a semi-transparent dark overlay
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        opacity,
      }}
    >
      {/* Orange circle with number */}
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: COLORS.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${scale})`,
          boxShadow: `0px 0px 60px ${COLORS.primaryGlow}`,
        }}
      >
        <span
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 80,
            color: COLORS.white,
          }}
        >
          {label}
        </span>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: 36,
            color: COLORS.white,
            letterSpacing: 6,
            opacity: subtitleOpacity,
            textShadow: `0 0 20px ${COLORS.primaryGlow}`,
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};
