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

export interface CleanIllustrationRevealProps {
  durationInFrames: number;
  illustration: OrangeIllustrationType;
  caption?: string;
}

/**
 * V7 - Clean illustration reveal
 * - Full dark overlay for focus
 * - Centered illustration
 * - Caption above illustration (not at bottom)
 * - NO captions shown during this (handled by composition)
 */
export const CleanIllustrationReveal: React.FC<CleanIllustrationRevealProps> = ({
  durationInFrames,
  illustration,
  caption,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const Illustration = ORANGE_ILLUSTRATIONS[illustration];

  // Fade in/out
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
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

  // Illustration animation
  const illustrationScale = spring({
    frame,
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });

  const illustrationOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Caption animation
  const captionProgress = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Full dark overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(13, 13, 13, 0.92)",
          backdropFilter: "blur(12px)",
        }}
      />

      {/* Glow behind illustration */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 500,
          height: 500,
          marginLeft: -250,
          marginTop: -250,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primaryGlow} 0%, transparent 60%)`,
          filter: "blur(50px)",
          opacity: illustrationOpacity * 0.5,
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
              fontSize: 44,
              color: COLORS.white,
              letterSpacing: 3,
              opacity: captionProgress,
              textShadow: `0 0 30px ${COLORS.primaryGlow}`,
            }}
          >
            {caption}
          </div>
        )}

        {/* Illustration */}
        <div
          style={{
            transform: `scale(${illustrationScale})`,
            opacity: illustrationOpacity,
          }}
        >
          <Illustration size={380} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
