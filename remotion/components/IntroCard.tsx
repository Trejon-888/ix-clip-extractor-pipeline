import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface IntroCardProps {
  durationInFrames: number;
}

export const IntroCard: React.FC<IntroCardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "99%" scales up with playful bounce
  const numberScale = spring({
    frame,
    fps,
    from: 0.3,
    to: 1,
    config: { damping: 8 },
  });

  const numberOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // "COLD MESSAGES" slides up, delayed
  const subtitleProgress = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const subtitleY = interpolate(subtitleProgress, [0, 1], [60, 0]);

  // "NEVER GET A RESPONSE" fades in later
  const taglineProgress = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Fade out near end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 200,
          color: "#0D0D0D",
          transform: `scale(${numberScale})`,
          opacity: numberOpacity,
          lineHeight: 1,
        }}
      >
        99%
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 56,
          color: "#FF6B00",
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleProgress,
          marginTop: 16,
          letterSpacing: 3,
        }}
      >
        COLD MESSAGES
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 500,
          fontSize: 28,
          color: "#999999",
          opacity: taglineProgress,
          marginTop: 12,
          letterSpacing: 2,
        }}
      >
        NEVER GET A RESPONSE
      </div>
    </AbsoluteFill>
  );
};
