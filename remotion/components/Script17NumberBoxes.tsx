import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface Script17NumberBoxesProps {
  durationInFrames: number;
}

/**
 * Number boxes for Script17: "5 logins, 5 dashboards, and nothing was connected"
 * Shows: 5 LOGINS | 5 DASHBOARDS | 0 CONNECTION
 * Pops in 1-2-3 sequence with frosted glass effect
 */
export const Script17NumberBoxes: React.FC<Script17NumberBoxesProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered pop-in for each box
  const box1Scale = spring({
    frame,
    fps,
    from: 0.3,
    to: 1,
    config: { damping: 10, stiffness: 180 },
  });

  const box2Scale = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0.3,
    to: 1,
    config: { damping: 10, stiffness: 180 },
  });

  const box3Scale = spring({
    frame: Math.max(0, frame - 16),
    fps,
    from: 0.3,
    to: 1,
    config: { damping: 10, stiffness: 180 },
  });

  // Opacity for each box
  const box1Opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const box2Opacity = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const box3Opacity = spring({
    frame: Math.max(0, frame - 16),
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

  const boxStyle: React.CSSProperties = {
    width: 200,
    height: 200,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "3px solid #FF6B00",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.15), 0px 0px 20px rgba(255, 107, 0, 0.2)",
  };

  const numberStyle: React.CSSProperties = {
    fontFamily,
    fontWeight: 900,
    fontSize: 80,
    color: "#0D0D0D",
    lineHeight: 1,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily,
    fontWeight: 700,
    fontSize: 18,
    color: "#666666",
    letterSpacing: 2,
    marginTop: 8,
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        opacity: fadeOut,
      }}
    >
      {/* Box 1: 5 LOGINS */}
      <div
        style={{
          ...boxStyle,
          transform: `scale(${box1Scale})`,
          opacity: box1Opacity,
        }}
      >
        <span style={numberStyle}>5</span>
        <span style={labelStyle}>LOGINS</span>
      </div>

      {/* Box 2: 5 DASHBOARDS */}
      <div
        style={{
          ...boxStyle,
          transform: `scale(${box2Scale})`,
          opacity: box2Opacity,
        }}
      >
        <span style={numberStyle}>5</span>
        <span style={labelStyle}>DASHBOARDS</span>
      </div>

      {/* Box 3: 0 CONNECTION - Red accent to emphasize the problem */}
      <div
        style={{
          ...boxStyle,
          border: "3px solid #FF4444",
          transform: `scale(${box3Scale})`,
          opacity: box3Opacity,
          boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.15), 0px 0px 20px rgba(255, 68, 68, 0.3)",
        }}
      >
        <span style={{ ...numberStyle, color: "#FF4444" }}>0</span>
        <span style={{ ...labelStyle, color: "#FF4444" }}>CONNECTION</span>
      </div>
    </AbsoluteFill>
  );
};
