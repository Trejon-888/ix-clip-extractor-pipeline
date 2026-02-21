import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface ScreenshotRevealProps {
  durationInFrames: number;
  imageSrc: string;
}

/**
 * Shows a screenshot with a camera-shutter-like snap animation.
 * White flash → screenshot scales in with a slight rotation snap.
 */
export const ScreenshotReveal: React.FC<ScreenshotRevealProps> = ({
  durationInFrames,
  imageSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quick white flash at start (shutter effect)
  const flashOpacity = interpolate(frame, [0, 3, 6], [1, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Screenshot scales in with snap
  const imgScale = spring({
    frame: Math.max(0, frame - 2),
    fps,
    from: 1.15,
    to: 1,
    config: { damping: 15, stiffness: 200 },
  });

  const imgOpacity = interpolate(frame, [2, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0D0D0D",
        opacity: fadeOut,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* White flash (shutter) */}
      <AbsoluteFill
        style={{
          backgroundColor: "#FFFFFF",
          opacity: flashOpacity,
          zIndex: 10,
        }}
      />

      {/* Screenshot image */}
      <div
        style={{
          transform: `scale(${imgScale})`,
          opacity: imgOpacity,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0px 12px 60px rgba(0,0,0,0.6)",
          maxWidth: 900,
        }}
      >
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: 900,
            height: "auto",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
