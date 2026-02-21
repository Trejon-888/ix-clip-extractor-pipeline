import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export interface CustomIllustrationRevealProps {
  durationInFrames: number;
  illustration: React.ComponentType<{ size?: number }>;
  caption?: string;
}

/**
 * Custom illustration reveal component for character-based SVG illustrations
 * Features:
 * - Dark overlay for contrast
 * - Spring-based scale animation
 * - Caption above illustration
 * - Smooth fade in/out
 */
export const CustomIllustrationReveal: React.FC<CustomIllustrationRevealProps> = ({
  durationInFrames,
  illustration: Illustration,
  caption,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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

  // Scale animation - pop in effect
  const scale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  // Caption animation - slight delay
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
      {/* Full screen illustration - scales to fill */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: `scale(${scale})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Illustration size={Math.max(720, 1280)} />
      </div>

      {/* Caption above illustration - BLACK TEXT */}
      {caption && (
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: `translateX(-50%) translateY(${captionY}px)`,
            fontFamily,
            fontSize: 56,
            fontWeight: 900,
            color: "#000000",
            textShadow: "0 4px 12px rgba(154, 255, 0, 0.6), 0 0 30px rgba(154, 255, 0, 0.3)",
            letterSpacing: 3,
            opacity: captionProgress,
            textAlign: "center",
            maxWidth: "90%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "16px 48px",
            borderRadius: 16,
            border: "4px solid #000000",
          }}
        >
          {caption}
        </div>
      )}
    </AbsoluteFill>
  );
};
