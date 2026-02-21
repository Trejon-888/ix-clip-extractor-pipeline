import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export interface ZoomKeyframe {
  frame: number;
  zoom: number;
}

export interface DynamicZoomWrapperProps {
  children: React.ReactNode;
  keyframes: ZoomKeyframe[];
}

export const DynamicZoomWrapper: React.FC<DynamicZoomWrapperProps> = ({
  children,
  keyframes,
}) => {
  const frame = useCurrentFrame();

  if (keyframes.length === 0) {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }

  // Sort keyframes by frame
  const sorted = [...keyframes].sort((a, b) => a.frame - b.frame);

  const frames = sorted.map((k) => k.frame);
  const zooms = sorted.map((k) => k.zoom);

  const zoom = interpolate(frame, frames, zooms, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
