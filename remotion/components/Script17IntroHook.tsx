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

export interface Script17IntroHookProps {
  durationInFrames: number;
}

/**
 * V8 Intro Hook - Better copywriting
 *
 * From viewer's perspective (agency owner):
 * - Establishes credibility: "I helped 50+ agencies"
 * - Creates curiosity: "They all made this mistake"
 * - Matches what speaker actually says
 *
 * Hook structure: CREDIBILITY + CURIOSITY GAP
 */
export const Script17IntroHook: React.FC<Script17IntroHookProps> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade out at end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === LINE 1: "I HELPED" appears first (credibility opener) ===
  const line1Progress = spring({
    frame: Math.max(0, frame - 3),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const line1Y = interpolate(line1Progress, [0, 1], [30, 0]);

  // === LINE 2: "50+ AGENCIES" - big impact number ===
  const numberProgress = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 150 },
  });

  const numberScale = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0.4,
    to: 1,
    config: { damping: 8, stiffness: 180 },
  });

  // === LINE 3: "THEY ALL MADE" ===
  const line3Progress = spring({
    frame: Math.max(0, frame - 35),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // === LINE 4: "THIS MISTAKE" - punch line ===
  const mistakeProgress = spring({
    frame: Math.max(0, frame - 50),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 200 },
  });

  const mistakeScale = spring({
    frame: Math.max(0, frame - 50),
    fps,
    from: 0.7,
    to: 1,
    config: { damping: 10, stiffness: 180 },
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeOut,
        pointerEvents: "none",
      }}
    >
      {/* Gradient overlay for readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "55%",
          background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)",
        }}
      />

      {/* Content - positioned in upper area */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* "I HELPED" - small credibility opener */}
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 32,
            color: COLORS.lightGray,
            letterSpacing: 6,
            opacity: line1Progress,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          I HELPED
        </div>

        {/* "50+ AGENCIES" - BIG number */}
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 140,
            color: COLORS.white,
            lineHeight: 1,
            letterSpacing: -4,
            opacity: numberProgress,
            transform: `scale(${numberScale})`,
            textShadow: `
              0 0 80px rgba(0,0,0,0.9),
              0 4px 30px rgba(0,0,0,0.7)
            `,
            marginTop: -10,
          }}
        >
          50+
        </div>

        {/* "AGENCIES" */}
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: 56,
            color: COLORS.primary,
            letterSpacing: 10,
            opacity: numberProgress,
            textShadow: `
              0 0 40px ${COLORS.primaryGlow},
              0 2px 10px rgba(0,0,0,0.5)
            `,
            marginTop: -5,
          }}
        >
          AGENCIES
        </div>

        {/* Divider */}
        <div
          style={{
            width: interpolate(line3Progress, [0, 1], [0, 200]),
            height: 3,
            backgroundColor: COLORS.white,
            marginTop: 25,
            marginBottom: 25,
            opacity: 0.6,
          }}
        />

        {/* "THEY ALL MADE" */}
        <div
          style={{
            fontFamily,
            fontWeight: 600,
            fontSize: 28,
            color: COLORS.lightGray,
            letterSpacing: 4,
            opacity: line3Progress,
          }}
        >
          THEY ALL MADE
        </div>

        {/* "THIS MISTAKE" - punch */}
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 52,
            color: COLORS.white,
            letterSpacing: 3,
            opacity: mistakeProgress,
            transform: `scale(${mistakeScale})`,
            marginTop: 8,
            padding: "10px 25px",
            backgroundColor: "rgba(255, 107, 0, 0.2)",
            borderRadius: 8,
            border: `2px solid ${COLORS.primary}`,
          }}
        >
          THIS MISTAKE
        </div>
      </div>
    </AbsoluteFill>
  );
};
