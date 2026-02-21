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

export interface BigIllustrationRevealProps {
  durationInFrames: number;
  illustration: OrangeIllustrationType;
  caption?: string;
}

/**
 * V8 - BIG illustration reveal (550px+)
 * Full dark overlay, centered, prominent
 * Caption ABOVE illustration
 */
export const BigIllustrationReveal: React.FC<BigIllustrationRevealProps> = ({
  durationInFrames,
  illustration,
  caption,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const Illustration = ORANGE_ILLUSTRATIONS[illustration];

  // Fade in/out
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Illustration animation - dramatic entrance
  const illustrationScale = spring({
    frame,
    fps,
    from: 0.4,
    to: 1,
    config: { damping: 10, stiffness: 100 },
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
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const captionY = interpolate(captionProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Full dark overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(10, 10, 10, 0.92)",
          backdropFilter: "blur(12px)",
        }}
      />

      {/* Glow behind illustration */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 700,
          height: 700,
          marginLeft: -350,
          marginTop: -350,
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
          gap: 25,
        }}
      >
        {/* Caption ABOVE illustration */}
        {caption && (
          <div
            style={{
              fontFamily,
              fontWeight: 900,
              fontSize: 42,
              color: COLORS.white,
              letterSpacing: 4,
              opacity: captionProgress,
              transform: `translateY(${captionY}px)`,
              textShadow: `0 0 30px ${COLORS.primaryGlow}`,
            }}
          >
            {caption}
          </div>
        )}

        {/* BIG Illustration - 700px */}
        <div
          style={{
            transform: `scale(${illustrationScale})`,
            opacity: illustrationOpacity,
          }}
        >
          <Illustration size={700} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
