import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const TransitionFlash: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 3, 8],
    [0, 0.35, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
