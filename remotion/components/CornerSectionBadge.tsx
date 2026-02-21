import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLORS } from "../lib/colors";

const { fontFamily } = loadFont();

export interface CornerSectionBadgeProps {
  label: string;
  subtitle?: string;
  durationInFrames: number;
}

/**
 * V9 Section Badge - TOP LEFT CORNER position
 * Not in the center - stays in corner
 * Smaller, doesn't block the video content
 */
export const CornerSectionBadge: React.FC<CornerSectionBadgeProps> = ({
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
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Slide in from left
  const slideX = spring({
    frame,
    fps,
    from: -100,
    to: 0,
    config: { damping: 15, stiffness: 150 },
  });

  const scale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 180 },
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        pointerEvents: "none",
      }}
    >
      {/* Top-left corner positioning */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 40,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          transform: `translateX(${slideX}px) scale(${scale})`,
        }}
      >
        {/* Number badge */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            backgroundColor: COLORS.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 20px ${COLORS.primaryGlow}`,
          }}
        >
          <span
            style={{
              fontFamily,
              fontWeight: 900,
              fontSize: 36,
              color: COLORS.dark,
            }}
          >
            {label}
          </span>
        </div>

        {/* Subtitle text */}
        {subtitle && (
          <div
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 24,
              color: COLORS.white,
              letterSpacing: 3,
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: "10px 20px",
              borderRadius: 10,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
