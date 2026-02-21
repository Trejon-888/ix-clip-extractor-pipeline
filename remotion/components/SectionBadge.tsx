import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface SectionBadgeProps {
  label: string;
  subtitle?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({ label, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    from: 0.4,
    to: 1,
    config: { damping: 12, stiffness: 180 },
  });

  const opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const subtitleOpacity = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        opacity,
      }}
    >
      <div
        style={{
          width: 260,
          height: 260,
          borderRadius: 130,
          backgroundColor: "#FF6B00",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${scale})`,
          boxShadow: "0px 0px 80px rgba(255, 107, 0, 0.4)",
        }}
      >
        <span
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 96,
            color: "#FFFFFF",
          }}
        >
          {label}
        </span>
      </div>
      {subtitle && (
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: 40,
            color: "#0D0D0D",
            letterSpacing: 4,
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};
