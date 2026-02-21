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

export interface AppleStylePopupProps {
  durationInFrames: number;
  illustration: ReactNode;
  caption?: string;
  subtitle?: string;
  illustrationSize?: number;
  accentColor?: string;
}

/**
 * Apple-Style Popup — Clean white background, premium feel
 *
 * Design principles:
 * - Pure white background (like Apple keynote slides)
 * - Dark text on light (not white on dark)
 * - Subtle shadow depth behind illustration
 * - Brand orange as accent, not dominant
 * - Smooth spring animations with staggered reveals
 * - Premium typography (Inter, bold, tracked)
 */
export const AppleStylePopup: React.FC<AppleStylePopupProps> = ({
  durationInFrames,
  illustration,
  caption,
  subtitle,
  illustrationSize = 500,
  accentColor = "#FF7614",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === ENTRANCE: Quick white flash (0-6 frames) ===
  const bgOpacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === EXIT: Smooth fade out (last 12 frames) ===
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const overallOpacity = Math.min(bgOpacity, fadeOut);

  // === ILLUSTRATION: Spring pop-in from frame 5 ===
  const illoScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0.6,
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

  // Subtle float animation (breathing effect)
  const floatY = interpolate(
    frame,
    [0, durationInFrames * 0.5, durationInFrames],
    [0, -6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === CAPTION: Slide up from frame 8 ===
  const captionProgress = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 16, stiffness: 100 },
  });
  const captionY = interpolate(captionProgress, [0, 1], [30, 0]);

  // === SUBTITLE: Slide up from frame 12 ===
  const subtitleProgress = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 18, stiffness: 80 },
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [20, 0]);

  // === ACCENT LINE: Grows from center from frame 6 ===
  const lineWidth = spring({
    frame: Math.max(0, frame - 6),
    fps,
    from: 0,
    to: 120,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ opacity: overallOpacity, pointerEvents: "none" }}>
      {/* Pure white background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#FFFFFF",
        }}
      />

      {/* Subtle warm tint at bottom (very subtle gradient) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "40%",
          background: `linear-gradient(transparent, rgba(255, 118, 20, 0.03))`,
        }}
      />

      {/* Content container */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {/* Illustration with spring + float */}
        <div
          style={{
            transform: `scale(${illoScale}) translateY(${floatY}px)`,
            opacity: illoOpacity,
            width: illustrationSize,
            height: illustrationSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // Subtle shadow for depth
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

        {/* Caption — bold, dark, tracked */}
        {caption && (
          <div
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 56,
              color: "#1A1A1A",
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

        {/* Subtitle — lighter, smaller */}
        {subtitle && (
          <div
            style={{
              fontFamily,
              fontWeight: 500,
              fontSize: 32,
              color: "#888888",
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
