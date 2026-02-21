import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface Script17IntroCardProps {
  durationInFrames: number;
}

/**
 * Intro card for Script17: "50+ AGENCIES" hook
 * "I spent eight months helping over fifty agencies with client acquisition,
 *  and almost every single one made the same mistake."
 */
export const Script17IntroCard: React.FC<Script17IntroCardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "50+" scales up with playful bounce
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

  // "AGENCIES" slides up, delayed
  const agenciesProgress = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const agenciesY = interpolate(agenciesProgress, [0, 1], [60, 0]);

  // "SAME MISTAKE" fades in later with emphasis
  const mistakeProgress = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Subtle scale pulse on "SAME MISTAKE" for emphasis
  const mistakeScale = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 180 },
  });

  // Fade out near end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
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
          fontSize: 220,
          color: "#0D0D0D",
          transform: `scale(${numberScale})`,
          opacity: numberOpacity,
          lineHeight: 1,
        }}
      >
        50+
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 64,
          color: "#FF6B00",
          transform: `translateY(${agenciesY}px)`,
          opacity: agenciesProgress,
          marginTop: 8,
          letterSpacing: 6,
        }}
      >
        AGENCIES
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 600,
          fontSize: 32,
          color: "#666666",
          opacity: mistakeProgress,
          transform: `scale(${mistakeScale})`,
          marginTop: 20,
          letterSpacing: 3,
        }}
      >
        SAME MISTAKE
      </div>
    </AbsoluteFill>
  );
};
