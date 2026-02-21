import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface BigTextRevealProps {
  durationInFrames: number;
  mainText: string;
  subText?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

/**
 * Big bold text reveal - full screen takeover for key moments
 * Clean, impactful, modern
 */
export const BigTextReveal: React.FC<BigTextRevealProps> = ({
  durationInFrames,
  mainText,
  subText,
  backgroundColor = "#0D0D0D",
  textColor = "#FFFFFF",
  accentColor = "#FF6B00",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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

  // Main text animation - punchy scale
  const mainScale = spring({
    frame,
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 10, stiffness: 180 },
  });

  const mainOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Subtext slides up
  const subProgress = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const subY = interpolate(subProgress, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: "0 60px",
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 100,
          color: textColor,
          textAlign: "center",
          transform: `scale(${mainScale})`,
          opacity: mainOpacity,
          lineHeight: 1.1,
          letterSpacing: -2,
        }}
      >
        {mainText}
      </div>

      {subText && (
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 40,
            color: accentColor,
            textAlign: "center",
            transform: `translateY(${subY}px)`,
            opacity: subProgress,
            letterSpacing: 4,
          }}
        >
          {subText}
        </div>
      )}
    </AbsoluteFill>
  );
};
