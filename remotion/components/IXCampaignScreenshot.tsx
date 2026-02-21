import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLORS } from "../lib/colors";

const { fontFamily } = loadFont();

export interface IXCampaignScreenshotProps {
  durationInFrames: number;
}

/**
 * V9 - IX Campaign Screenshot reveal
 * Shows the actual IX platform screenshot after the logo
 * Dramatic reveal animation
 */
export const IXCampaignScreenshot: React.FC<IXCampaignScreenshotProps> = ({
  durationInFrames,
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
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Screenshot scale and slide animation
  const screenshotScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0.7,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });

  const screenshotY = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 50,
    to: 0,
    config: { damping: 15, stiffness: 150 },
  });

  // Glow pulse
  const glowPulse = Math.sin(frame * 0.15) * 0.3 + 0.7;

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(10, 10, 10, 0.92)",
          backdropFilter: "blur(12px)",
        }}
      />

      {/* Glow behind screenshot */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 900,
          height: 600,
          marginLeft: -450,
          marginTop: -280,
          borderRadius: 30,
          background: `radial-gradient(ellipse, ${COLORS.primaryGlow} 0%, transparent 60%)`,
          filter: "blur(50px)",
          opacity: glowPulse * 0.5,
        }}
      />

      {/* Content container */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {/* Label above screenshot */}
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: 32,
            color: COLORS.primary,
            letterSpacing: 6,
            textShadow: `0 0 30px ${COLORS.primaryGlow}`,
          }}
        >
          THE IX SYSTEM
        </div>

        {/* Screenshot with frame */}
        <div
          style={{
            transform: `scale(${screenshotScale}) translateY(${screenshotY}px)`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `
              0 20px 60px rgba(0,0,0,0.6),
              0 0 40px ${COLORS.primaryGlow},
              inset 0 0 0 3px ${COLORS.primary}40
            `,
          }}
        >
          <Img
            src={staticFile("ix-campaign-screenshot.png")}
            style={{
              width: 850,
              height: "auto",
              display: "block",
            }}
          />
        </div>

        {/* Caption below */}
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 24,
            color: COLORS.lightGray,
            letterSpacing: 2,
          }}
        >
          EVERYTHING IN ONE PLACE
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
