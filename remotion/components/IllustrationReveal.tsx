import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import {
  UnifiedSystemIcon,
  FragmentedToolsIcon,
  EngineIcon,
  PipelineIcon,
  AIBrainIcon,
  BrokenConnectionIcon,
  SuccessCheckIcon,
  UserCenteredIcon,
} from "../lib/illustrations/LimeGreenIcons";

const { fontFamily } = loadFont();

const LIME_GREEN = "#BFFF00";
const GRAY_BG = "#F0F0F0";

export type IllustrationName =
  | "unified-system"
  | "fragmented-tools"
  | "engine"
  | "pipeline"
  | "ai-brain"
  | "broken-connection"
  | "success"
  | "user-centered";

const ILLUSTRATIONS: Record<IllustrationName, React.FC<{ size?: number }>> = {
  "unified-system": UnifiedSystemIcon,
  "fragmented-tools": FragmentedToolsIcon,
  "engine": EngineIcon,
  "pipeline": PipelineIcon,
  "ai-brain": AIBrainIcon,
  "broken-connection": BrokenConnectionIcon,
  "success": SuccessCheckIcon,
  "user-centered": UserCenteredIcon,
};

export interface IllustrationRevealProps {
  durationInFrames: number;
  illustration: IllustrationName;
  caption?: string;
  subcaption?: string;
  size?: number;
  backgroundColor?: string;
}

/**
 * Clean illustration reveal with smooth animation
 * Uses the lime green style icons
 */
export const IllustrationReveal: React.FC<IllustrationRevealProps> = ({
  durationInFrames,
  illustration,
  caption,
  subcaption,
  size = 280,
  backgroundColor = GRAY_BG,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const Illustration = ILLUSTRATIONS[illustration];

  // Fade in/out
  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
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

  // Illustration animation
  const illustrationScale = spring({
    frame,
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 15, stiffness: 120 },
  });

  // Caption animations
  const captionProgress = spring({
    frame: Math.max(0, frame - 15),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const captionY = interpolate(captionProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
      }}
    >
      {/* Illustration */}
      <div style={{ transform: `scale(${illustrationScale})` }}>
        <Illustration size={size} />
      </div>

      {/* Caption */}
      {caption && (
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: 44,
            color: "#1A1A1A",
            opacity: captionProgress,
            transform: `translateY(${captionY}px)`,
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          {caption}
        </div>
      )}

      {/* Subcaption */}
      {subcaption && (
        <div
          style={{
            fontFamily,
            fontWeight: 500,
            fontSize: 28,
            color: "#666666",
            opacity: captionProgress,
            transform: `translateY(${captionY}px)`,
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          {subcaption}
        </div>
      )}
    </AbsoluteFill>
  );
};
