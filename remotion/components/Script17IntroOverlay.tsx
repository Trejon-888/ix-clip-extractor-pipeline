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

const { fontFamily } = loadFont();

export interface Script17IntroOverlayProps {
  durationInFrames: number;
}

/**
 * V7 Intro - Overlays DIRECTLY on video (not a separate scene)
 * Simple, bold, attention-grabbing text
 * Appears while speaker says "over fifty agencies... same mistake"
 */
export const Script17IntroOverlay: React.FC<Script17IntroOverlayProps> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === FADE OUT at end ===
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === "50+" appears first (frame ~5) ===
  const numberProgress = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  const numberScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 10, stiffness: 180 },
  });

  // === "AGENCIES" slides in (frame ~20) ===
  const agenciesProgress = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const agenciesX = interpolate(agenciesProgress, [0, 1], [-100, 0]);

  // === "SAME MISTAKE" punches in later (around frame ~55 when he says it) ===
  const mistakeProgress = spring({
    frame: Math.max(0, frame - 55),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 180 },
  });

  const mistakeScale = spring({
    frame: Math.max(0, frame - 55),
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 10, stiffness: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeOut,
        pointerEvents: "none",
      }}
    >
      {/* Semi-transparent gradient overlay for text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }}
      />

      {/* Main content - positioned in upper portion */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* "50+" - big impact number */}
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 200,
            color: COLORS.white,
            lineHeight: 0.9,
            letterSpacing: -8,
            opacity: numberProgress,
            transform: `scale(${numberScale})`,
            textShadow: `
              0 0 60px rgba(0,0,0,0.8),
              0 4px 20px rgba(0,0,0,0.6)
            `,
          }}
        >
          50+
        </div>

        {/* "AGENCIES" */}
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: 64,
            color: COLORS.primary,
            letterSpacing: 10,
            marginTop: -15,
            opacity: agenciesProgress,
            transform: `translateX(${agenciesX}px)`,
            textShadow: `
              0 0 40px ${COLORS.primaryGlow},
              0 4px 12px rgba(0,0,0,0.5)
            `,
          }}
        >
          AGENCIES
        </div>

        {/* "SAME MISTAKE" - appears when he says it */}
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 42,
            color: COLORS.white,
            letterSpacing: 6,
            marginTop: 30,
            padding: "12px 30px",
            backgroundColor: "rgba(0,0,0,0.7)",
            borderRadius: 8,
            opacity: mistakeProgress,
            transform: `scale(${mistakeScale})`,
          }}
        >
          SAME MISTAKE
        </div>
      </div>
    </AbsoluteFill>
  );
};
