import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface Script17OutroCTAProps {
  durationInFrames: number;
}

/**
 * Outro CTA for Script17: "just comment the word 'system,' and I will show you how it works."
 * - IX Logo
 * - "WANT TO SEE HOW IT WORKS?"
 * - Pulsing "COMMENT 'SYSTEM'" button
 * - "I'll DM you the link" subtext
 */
export const Script17OutroCTA: React.FC<Script17OutroCTAProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Logo bounce in
  const logoScale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  // Headline slides up
  const headlineProgress = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });
  const headlineY = interpolate(headlineProgress, [0, 1], [50, 0]);

  // Button pops in and pulses
  const buttonProgress = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 10, stiffness: 180 },
  });

  // Subtle pulse animation for the button
  const pulseFrame = Math.max(0, frame - 35);
  const pulse = 1 + Math.sin(pulseFrame * 0.15) * 0.03;

  // Subtext fades in
  const subtextProgress = spring({
    frame: Math.max(0, frame - 30),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        padding: "80px 40px",
      }}
    >
      {/* IX Logo */}
      <div style={{ transform: `scale(${logoScale})` }}>
        <Img
          src={staticFile("infinitx-logo.png")}
          style={{ width: 260, height: "auto" }}
        />
      </div>

      {/* Headline */}
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 52,
          color: "#0D0D0D",
          textAlign: "center",
          lineHeight: 1.2,
          transform: `translateY(${headlineY}px)`,
          opacity: headlineProgress,
          maxWidth: 800,
        }}
      >
        WANT TO SEE HOW{" "}
        <span style={{ color: "#FF6B00" }}>IT WORKS?</span>
      </div>

      {/* CTA Button */}
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 44,
          color: "#FFFFFF",
          backgroundColor: "#FF6B00",
          borderRadius: 60,
          padding: "24px 60px",
          letterSpacing: 3,
          transform: `scale(${buttonProgress * pulse})`,
          boxShadow: "0px 8px 40px rgba(255, 107, 0, 0.5), 0px 0px 60px rgba(255, 107, 0, 0.3)",
          textAlign: "center",
        }}
      >
        COMMENT "SYSTEM"
      </div>

      {/* Subtext */}
      <div
        style={{
          fontFamily,
          fontWeight: 500,
          fontSize: 28,
          color: "#666666",
          opacity: subtextProgress,
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        I'll DM you the link
      </div>

      {/* Arrow indicator pointing down (to comments) */}
      <div
        style={{
          opacity: subtextProgress,
          transform: `translateY(${Math.sin(pulseFrame * 0.2) * 5}px)`,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 5 L20 30 M10 22 L20 32 L30 22"
            stroke="#FF6B00"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
