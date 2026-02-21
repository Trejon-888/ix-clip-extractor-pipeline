import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLORS } from "../lib/colors";
import {
  ORANGE_ILLUSTRATIONS,
  OrangeIllustrationType,
} from "../lib/illustrations/OrangeIllustrations";

const { fontFamily } = loadFont();

export interface OrangeIllustrationRevealProps {
  durationInFrames: number;
  illustration: OrangeIllustrationType;
  caption?: string;
  subcaption?: string;
  position?: "center" | "top" | "top-center"; // Avoid bottom to prevent caption overlap
  size?: number;
}

/**
 * Orange-themed illustration reveal component
 * Positioned to AVOID overlap with bottom captions
 * Uses top/center positioning only
 */
export const OrangeIllustrationReveal: React.FC<OrangeIllustrationRevealProps> = ({
  durationInFrames,
  illustration,
  caption,
  subcaption,
  position = "top-center",
  size = 450,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const Illustration = ORANGE_ILLUSTRATIONS[illustration];

  // === FADE IN/OUT ===
  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // === ILLUSTRATION ANIMATION ===
  const illustrationScale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  const illustrationOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // === CAPTION ANIMATION ===
  const captionProgress = spring({
    frame: Math.max(0, frame - 15),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const captionY = interpolate(captionProgress, [0, 1], [25, 0]);

  // === POSITIONING ===
  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case "top":
        return {
          justifyContent: "flex-start",
          paddingTop: 120,
        };
      case "top-center":
        return {
          justifyContent: "flex-start",
          paddingTop: 200,
        };
      case "center":
      default:
        return {
          justifyContent: "center",
          paddingBottom: 300, // Leave room for captions at bottom
        };
    }
  };

  return (
    <AbsoluteFill
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
        ...getPositionStyles(),
      }}
    >
      {/* Background overlay - semi-transparent dark */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(13, 13, 13, 0.85)",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Glow effect behind illustration */}
      <div
        style={{
          position: "absolute",
          width: size * 1.5,
          height: size * 1.5,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primaryGlow} 0%, transparent 60%)`,
          filter: "blur(40px)",
          opacity: illustrationOpacity * 0.6,
          transform: `scale(${illustrationScale})`,
        }}
      />

      {/* Illustration */}
      <div
        style={{
          transform: `scale(${illustrationScale})`,
          opacity: illustrationOpacity,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Illustration size={size} />
      </div>

      {/* Caption */}
      {caption && (
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 48,
            color: COLORS.white,
            opacity: captionProgress,
            transform: `translateY(${captionY}px)`,
            textAlign: "center",
            letterSpacing: 2,
            position: "relative",
            zIndex: 1,
            textShadow: `0 0 30px ${COLORS.primaryGlow}`,
          }}
        >
          {caption}
        </div>
      )}

      {/* Subcaption */}
      {subcaption && (
        <div
          style={{
            fontFamily,
            fontWeight: 500,
            fontSize: 28,
            color: COLORS.lightGray,
            opacity: captionProgress,
            transform: `translateY(${captionY}px)`,
            textAlign: "center",
            letterSpacing: 1,
            position: "relative",
            zIndex: 1,
          }}
        >
          {subcaption}
        </div>
      )}
    </AbsoluteFill>
  );
};
