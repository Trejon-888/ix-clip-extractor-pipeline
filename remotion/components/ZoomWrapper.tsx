import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export interface ZoomWrapperProps {
  children: React.ReactNode;
  segmentIndex: number;      // Which segment (0, 1, 2)
  segmentDuration: number;   // Duration in frames
  punchInFrames?: number[];  // Frames for punch-in effects
}

export const ZoomWrapper: React.FC<ZoomWrapperProps> = ({
  children,
  segmentIndex,
  segmentDuration,
  punchInFrames = [],
}) => {
  const frame = useCurrentFrame();

  // Continuous zoom: 1.0→1.05 over segment duration
  const continuousZoom = interpolate(
    frame,
    [0, segmentDuration],
    [1.0, 1.05],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Punch-in zoom: 1.1x for 10 frames at specified frames
  let punchInZoom = 1.0;
  for (const punchFrame of punchInFrames) {
    if (frame >= punchFrame && frame < punchFrame + 10) {
      // Interpolate in/out of punch: 1.0→1.1→1.0 over 10 frames
      if (frame < punchFrame + 5) {
        punchInZoom = interpolate(frame, [punchFrame, punchFrame + 5], [1.0, 1.1]);
      } else {
        punchInZoom = interpolate(frame, [punchFrame + 5, punchFrame + 10], [1.1, 1.0]);
      }
      break;
    }
  }

  const totalZoom = continuousZoom * punchInZoom;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${totalZoom})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
