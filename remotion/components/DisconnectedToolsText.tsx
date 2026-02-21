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

export interface DisconnectedToolsTextProps {
  durationInFrames: number;
}

/**
 * V7 - Text overlay showing the disconnected tools concept
 * Matches what the speaker actually says:
 * "five logins, five dashboards, and nothing was connected"
 *
 * NO fake numbers like "0" - uses actual words from script
 */
export const DisconnectedToolsText: React.FC<DisconnectedToolsTextProps> = ({
  durationInFrames,
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
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // "FIVE LOGINS" animation
  const loginsProgress = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0,
    to: 1,
    config: { damping: 15, stiffness: 180 },
  });

  // "FIVE DASHBOARDS" animation
  const dashboardsProgress = spring({
    frame: Math.max(0, frame - 15),
    fps,
    from: 0,
    to: 1,
    config: { damping: 15, stiffness: 180 },
  });

  // "NOTHING CONNECTED" animation - dramatic
  const nothingProgress = spring({
    frame: Math.max(0, frame - 30),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 150 },
  });

  const nothingScale = spring({
    frame: Math.max(0, frame - 30),
    fps,
    from: 0.7,
    to: 1,
    config: { damping: 8, stiffness: 200 },
  });

  const items = [
    {
      text: "FIVE LOGINS",
      progress: loginsProgress,
      scale: 1,
      color: COLORS.white,
    },
    {
      text: "FIVE DASHBOARDS",
      progress: dashboardsProgress,
      scale: 1,
      color: COLORS.white,
    },
    {
      text: "NOTHING CONNECTED",
      progress: nothingProgress,
      scale: nothingScale,
      color: COLORS.error,
      isError: true,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 25,
        paddingBottom: 200, // Keep room for captions at bottom
      }}
    >
      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Text items */}
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: item.isError ? 48 : 40,
            color: item.color,
            letterSpacing: 4,
            opacity: item.progress,
            transform: `scale(${typeof item.scale === "number" ? item.scale : item.scale})`,
            textShadow: item.isError
              ? `0 0 30px ${COLORS.error}80`
              : "0 2px 10px rgba(0,0,0,0.5)",
            position: "relative",
            zIndex: 1,
            padding: item.isError ? "12px 30px" : "8px 24px",
            backgroundColor: item.isError ? "rgba(255, 68, 68, 0.15)" : "transparent",
            borderRadius: item.isError ? 10 : 0,
            border: item.isError ? `2px solid ${COLORS.error}50` : "none",
          }}
        >
          {item.text}
        </div>
      ))}
    </AbsoluteFill>
  );
};
