import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export const StarterKitBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  const fadeIn = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 18, stiffness: 120 },
  });

  // Fade out in last 20 frames
  const totalFrames = useVideoConfig().durationInFrames;
  const fadeOutStart = totalFrames - 20;
  const fadeOut =
    frame > fadeOutStart
      ? Math.max(0, 1 - (frame - fadeOutStart) / 20)
      : 1;

  const opacity = fadeIn * fadeOut;

  return (
    <div
      style={{
        position: "absolute",
        bottom: isPortrait ? "36%" : "22%",
        left: "50%",
        transform: `translateX(-50%) translateY(${(1 - fadeIn) * 16}px)`,
        opacity,
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        padding: "18px 32px",
        borderRadius: 14,
        border: "1px solid rgba(255, 255, 255, 0.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: isPortrait ? 24 : 20,
          fontWeight: 800,
          color: "#FFFFFF",
          letterSpacing: 0.5,
        }}
      >
        ix-claude-code-starter-kit
      </div>
      <div
        style={{
          fontFamily,
          fontSize: isPortrait ? 15 : 13,
          fontWeight: 500,
          color: "rgba(255, 255, 255, 0.55)",
          marginTop: 2,
        }}
      >
        Memory for Claude Code · Free · 30s setup
      </div>
    </div>
  );
};
