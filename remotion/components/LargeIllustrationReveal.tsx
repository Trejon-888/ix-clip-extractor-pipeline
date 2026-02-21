import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import {
  FragmentedToolsLarge,
  UnifiedSystemLarge,
  EngineLarge,
  PipelineLarge,
  BrokenConnectionLarge,
  SuccessLarge,
} from "../lib/illustrations/LargeIllustrations";

const { fontFamily } = loadFont();

const LIME_GREEN = "#BFFF00";
const GRAY_BG = "#F5F5F5";

export type LargeIllustrationName =
  | "fragmented-tools"
  | "unified-system"
  | "engine"
  | "pipeline"
  | "broken-connection"
  | "success";

const ILLUSTRATIONS: Record<LargeIllustrationName, React.FC<{ size?: number }>> = {
  "fragmented-tools": FragmentedToolsLarge,
  "unified-system": UnifiedSystemLarge,
  "engine": EngineLarge,
  "pipeline": PipelineLarge,
  "broken-connection": BrokenConnectionLarge,
  "success": SuccessLarge,
};

export interface LargeIllustrationRevealProps {
  durationInFrames: number;
  illustration: LargeIllustrationName;
  caption?: string;
  subcaption?: string;
  backgroundColor?: string;
}

/**
 * Large, full-screen illustration reveal
 * No emojis - pure SVG graphics
 * Prominent, attention-grabbing animations
 */
export const LargeIllustrationReveal: React.FC<LargeIllustrationRevealProps> = ({
  durationInFrames,
  illustration,
  caption,
  subcaption,
  backgroundColor = GRAY_BG,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const Illustration = ILLUSTRATIONS[illustration];

  // Fade in/out
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
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

  // Illustration animation - big and prominent
  const illustrationScale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  const illustrationOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Caption animations
  const captionProgress = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const captionY = interpolate(captionProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {/* Large illustration - takes up most of the screen */}
      <div
        style={{
          transform: `scale(${illustrationScale})`,
          opacity: illustrationOpacity,
        }}
      >
        <Illustration size={600} />
      </div>

      {/* Caption */}
      {caption && (
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 52,
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
            fontWeight: 600,
            fontSize: 32,
            color: "#666666",
            opacity: captionProgress,
            transform: `translateY(${captionY}px)`,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          {subcaption}
        </div>
      )}
    </AbsoluteFill>
  );
};
