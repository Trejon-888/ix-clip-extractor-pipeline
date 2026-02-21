import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

const LIME_GREEN = "#BFFF00";

export interface Script17IntroCardV2Props {
  durationInFrames: number;
}

/**
 * High-impact intro card for Script17
 * "50+ AGENCIES" with attention-grabbing animation
 * Style: Like Script19's "99% Cold Messages" but adapted for this content
 */
export const Script17IntroCardV2: React.FC<Script17IntroCardV2Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "50+" number - dramatic scale up with bounce
  const numberScale = spring({
    frame,
    fps,
    from: 0.2,
    to: 1,
    config: { damping: 8, stiffness: 120 },
  });

  const numberOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // "AGENCIES" slides up with delay
  const agenciesProgress = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const agenciesY = interpolate(agenciesProgress, [0, 1], [80, 0]);

  // "SAME MISTAKE" punches in later
  const mistakeProgress = spring({
    frame: Math.max(0, frame - 25),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  const mistakeScale = spring({
    frame: Math.max(0, frame - 25),
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 10, stiffness: 180 },
  });

  // Decorative ring animation
  const ringScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 15, stiffness: 100 },
  });

  const ringOpacity = interpolate(
    spring({ frame: Math.max(0, frame - 5), fps, from: 0, to: 1, config: { damping: 200 } }),
    [0, 1],
    [0, 0.3]
  );

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
      {/* Decorative background rings */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: `3px solid ${LIME_GREEN}`,
          transform: `scale(${ringScale})`,
          opacity: ringOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          border: `2px solid ${LIME_GREEN}`,
          transform: `scale(${ringScale * 0.9})`,
          opacity: ringOpacity * 0.6,
        }}
      />

      {/* Main number "50+" */}
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 280,
          color: "#0D0D0D",
          transform: `scale(${numberScale})`,
          opacity: numberOpacity,
          lineHeight: 0.9,
          letterSpacing: -10,
        }}
      >
        50+
      </div>

      {/* "AGENCIES" */}
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 72,
          color: LIME_GREEN,
          transform: `translateY(${agenciesY}px)`,
          opacity: agenciesProgress,
          marginTop: -10,
          letterSpacing: 8,
          textShadow: `0px 0px 30px ${LIME_GREEN}66`,
        }}
      >
        AGENCIES
      </div>

      {/* Divider line */}
      <div
        style={{
          width: interpolate(mistakeProgress, [0, 1], [0, 300]),
          height: 4,
          backgroundColor: "#0D0D0D",
          marginTop: 30,
          marginBottom: 30,
          borderRadius: 2,
        }}
      />

      {/* "SAME MISTAKE" */}
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 48,
          color: "#666666",
          opacity: mistakeProgress,
          transform: `scale(${mistakeScale})`,
          letterSpacing: 6,
        }}
      >
        SAME MISTAKE
      </div>
    </AbsoluteFill>
  );
};
