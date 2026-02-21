import React, { ReactNode } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLORS } from "../lib/colors";

const { fontFamily } = loadFont();

export interface WhitePopupRevealProps {
  durationInFrames: number;    // 60-90 frames (2-3 seconds)
  illustration: ReactNode;      // SVG or Img component
  caption?: string;
  blurIntensity?: number;       // Default: 16px
  illustrationSize?: number;    // Default: 600px
}

/**
 * White-Screen Popup Reveal Component
 *
 * Creates professional popup effect:
 * 1. White flash fills screen
 * 2. Illustration scales up with spring animation
 * 3. Holds for 2-3 seconds
 * 4. Fades out smoothly
 *
 * Used to emphasize key concepts in video compositions
 */
export const WhitePopupReveal: React.FC<WhitePopupRevealProps> = ({
  durationInFrames,
  illustration,
  caption,
  blurIntensity = 16,
  illustrationSize = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // White flash animation (frames 0-8)
  const whiteFlashOpacity = interpolate(
    frame,
    [0, 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Overall fade out (last 15 frames)
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const overallOpacity = Math.min(whiteFlashOpacity, fadeOut);

  // Illustration entrance animation - dramatic spring (frames 8-20)
  const illustrationScale = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0.4,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });

  const illustrationOpacity = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Caption delayed entrance (starts frame 8)
  const captionProgress = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const captionY = interpolate(captionProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ opacity: overallOpacity, pointerEvents: "none" }}>
      {/* White background fill */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#FFFFFF",
        }}
      />

      {/* Semi-transparent dark content area with blur */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(10, 10, 10, 0.88)",
          backdropFilter: `blur(${blurIntensity}px)`,
        }}
      />

      {/* Orange glow behind illustration */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: illustrationSize + 100,
          height: illustrationSize + 100,
          marginLeft: -(illustrationSize + 100) / 2,
          marginTop: -(illustrationSize + 100) / 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primaryGlow} 0%, transparent 55%)`,
          filter: "blur(60px)",
          opacity: illustrationOpacity * 0.4,
        }}
      />

      {/* Content container - centered */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {/* Caption ABOVE illustration */}
        {caption && (
          <div
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 64,
              color: COLORS.white,
              letterSpacing: 8,
              textAlign: "center",
              opacity: captionProgress,
              transform: `translateY(${captionY}px)`,
              textShadow: `0 0 30px ${COLORS.primaryGlow}`,
              padding: "0 40px",
            }}
          >
            {caption}
          </div>
        )}

        {/* Illustration with spring animation */}
        <div
          style={{
            transform: `scale(${illustrationScale})`,
            opacity: illustrationOpacity,
            width: illustrationSize,
            height: illustrationSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Inner scale to fill container - SVGs default to 600px but container is larger */}
          <div style={{
            transform: `scale(${illustrationSize / 600})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {illustration}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
