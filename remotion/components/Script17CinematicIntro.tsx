import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, OffthreadVideo, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface Script17CinematicIntroProps {
  durationInFrames: number;
  videoSrc: string;
}

/**
 * Cinematic intro: Zoomed face (cropped to chin/chest) with centered title overlay
 * Style: Like Instantly channel - dramatic zoom, bold centered text
 * "I spent eight months helping over fifty agencies... same mistake"
 */
export const Script17CinematicIntro: React.FC<Script17CinematicIntroProps> = ({
  durationInFrames,
  videoSrc
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Zoom starts tight, slowly pulls back
  const zoomProgress = interpolate(
    frame,
    [0, durationInFrames],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const zoom = interpolate(zoomProgress, [0, 1], [2.2, 1.6]);

  // Vertical position - starts lower (showing chin/chest), moves up
  const verticalOffset = interpolate(zoomProgress, [0, 1], [300, 150]);

  // Title animations
  const titleScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0.7,
    to: 1,
    config: { damping: 15, stiffness: 150 },
  });

  const titleOpacity = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Subtitle "SAME MISTAKE" comes in later with punch
  const subtitleProgress = spring({
    frame: Math.max(0, frame - 40),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 180 },
  });

  const subtitleScale = spring({
    frame: Math.max(0, frame - 40),
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 10, stiffness: 200 },
  });

  // Fade out entire overlay
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Scale factor for video
  const scaleFactor = width / 1440;
  const scaledHeight = 2560 * scaleFactor;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0D0D0D" }}>
      {/* Zoomed video layer */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            transform: `scale(${zoom}) translateY(${verticalOffset}px)`,
            transformOrigin: "center center",
          }}
        >
          <OffthreadVideo
            src={staticFile(videoSrc)}
            style={{
              width: width,
              height: scaledHeight,
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* Dark gradient overlay for text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.1) 30%,
            rgba(0, 0, 0, 0.1) 70%,
            rgba(0, 0, 0, 0.5) 100%
          )`,
          opacity: fadeOut,
        }}
      />

      {/* Centered title overlay */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeOut,
          padding: "0 60px",
        }}
      >
        {/* Main title - "50+ AGENCIES" */}
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 72,
            color: "#FFFFFF",
            textAlign: "center",
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            textShadow: "0px 4px 20px rgba(0, 0, 0, 0.8), 0px 2px 4px rgba(0, 0, 0, 0.9)",
            letterSpacing: 2,
          }}
        >
          50+ AGENCIES
        </div>

        {/* Subtitle - "SAME MISTAKE" with punch */}
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 56,
            color: "#FF6B00",
            textAlign: "center",
            transform: `scale(${subtitleScale})`,
            opacity: subtitleProgress,
            marginTop: 16,
            textShadow: "0px 4px 20px rgba(0, 0, 0, 0.8), 0px 0px 40px rgba(255, 107, 0, 0.5)",
            letterSpacing: 4,
          }}
        >
          SAME MISTAKE
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
