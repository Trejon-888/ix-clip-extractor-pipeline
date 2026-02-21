/**
 * PlatformCascade — Progressive platform logo reveal
 *
 * As the speaker names platforms, each logo springs in and joins a
 * growing grid. Creates a "collecting" feeling where platforms
 * accumulate. Uses real SVG logos from public/logos/.
 *
 * The grid auto-layouts: 1 logo = large & centered, 2 = side-by-side,
 * 3-4 = 2x2 grid, 5+ = flexible grid.
 */

import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export interface PlatformEntry {
  name: string;
  logoSrc: string; // path relative to public/ (e.g. "logos/youtube.svg")
  /** Frame when this platform should appear */
  frame: number;
  /** Brand color for glow effect */
  brandColor?: string;
}

export interface PlatformCascadeProps {
  platforms: PlatformEntry[];
  /** Total duration for the cascade display */
  durationInFrames: number;
  /** Start frame offset (absolute frame when cascade begins) */
  startFrame?: number;
  /** Logo size in px */
  logoSize?: number;
  /** Position: where on screen to place the cascade */
  position?: "center" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Exit fade duration */
  exitFadeFrames?: number;
  /** Show platform name labels */
  showLabels?: boolean;
}

export const PlatformCascade: React.FC<PlatformCascadeProps> = ({
  platforms,
  durationInFrames,
  startFrame = 0,
  logoSize = 80,
  position = "top-right",
  exitFadeFrames = 12,
  showLabels = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Exit fade
  const exitOpacity =
    exitFadeFrames > 0
      ? interpolate(
          frame,
          [durationInFrames - exitFadeFrames, durationInFrames],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      : 1;

  // Determine which platforms are visible at current frame
  const visiblePlatforms = platforms.filter(
    (p) => frame >= p.frame - startFrame
  );

  if (visiblePlatforms.length === 0) return null;

  // Grid layout calculation
  const count = visiblePlatforms.length;
  const cols = count <= 2 ? count : count <= 4 ? 2 : 3;
  const gap = 16;

  // Position mapping
  const positionStyles: Record<string, React.CSSProperties> = {
    center: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    "top-right": {
      top: 80,
      right: 40,
    },
    "top-left": {
      top: 80,
      left: 40,
    },
    "bottom-right": {
      bottom: 200,
      right: 40,
    },
    "bottom-left": {
      bottom: 200,
      left: 40,
    },
  };

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyles[position],
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap,
        opacity: exitOpacity,
        zIndex: 25,
        pointerEvents: "none",
      }}
    >
      {visiblePlatforms.map((platform, index) => {
        const localFrame = frame - (platform.frame - startFrame);

        // Spring entrance per platform
        const scale = spring({
          frame: Math.max(0, localFrame),
          fps,
          from: 0.3,
          to: 1,
          config: { damping: 12, stiffness: 160 },
        });

        const opacity = spring({
          frame: Math.max(0, localFrame),
          fps,
          from: 0,
          to: 1,
          config: { damping: 200 },
        });

        // Newest platform gets subtle glow pulse
        const isNewest = index === visiblePlatforms.length - 1 && localFrame < 20;
        const glowIntensity = isNewest
          ? interpolate(localFrame, [0, 10, 20], [0, 0.4, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          : 0;

        return (
          <div
            key={platform.name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              transform: `scale(${scale})`,
              opacity,
            }}
          >
            {/* Logo container with glassmorphic card */}
            <div
              style={{
                width: logoSize + 24,
                height: logoSize + 24,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: glowIntensity > 0
                  ? `0 0 20px rgba(255, 118, 20, ${glowIntensity}), 0 4px 12px rgba(0,0,0,0.1)`
                  : "0 4px 12px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
              }}
            >
              <Img
                src={staticFile(platform.logoSrc)}
                style={{
                  width: logoSize,
                  height: logoSize,
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Label */}
            {showLabels && (
              <div
                style={{
                  fontFamily,
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#FFFFFF",
                  textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                  textAlign: "center",
                  letterSpacing: 1,
                }}
              >
                {platform.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
