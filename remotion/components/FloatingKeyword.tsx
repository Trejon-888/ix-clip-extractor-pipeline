import React, { ReactNode } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export interface FloatingKeywordProps {
  durationInFrames: number;
  /** The keyword text to display */
  text: string;
  /** Position: left or right of speaker */
  side: "left" | "right";
  /** Optional icon above the text */
  icon?: ReactNode;
  /** Larger visual element (image) — shown as hero above text */
  visual?: ReactNode;
  /** Text color — default white */
  color?: string;
  /** Font size — default 90 */
  fontSize?: number;
  /** Vertical position as % from top — default 40 (center-ish) */
  topPercent?: number;
  /** Secondary smaller text below main keyword */
  subtext?: string;
  /** If true, hide text and only show the visual */
  visualOnly?: boolean;
}

/**
 * FloatingKeyword — Matt Gray / Founder OS style
 *
 * Bold text floating directly on the video. No background panels.
 * Placed on left or right of the speaker.
 * Quick spring pop-in, brief hold, smooth fade-out.
 *
 * v2: Hero-sized visuals with dramatic shadow, bigger icons,
 *     optimized for 1920×1080 canvas presence.
 */
export const FloatingKeyword: React.FC<FloatingKeywordProps> = ({
  durationInFrames,
  text,
  side,
  icon,
  visual,
  color = "#FFFFFF",
  fontSize = 90,
  topPercent = 40,
  subtext,
  visualOnly = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring pop-in (scale from 0.7 to 1)
  const scaleIn = spring({
    frame,
    fps,
    from: 0.7,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  // Opacity in (quick fade)
  const opacityIn = interpolate(frame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const opacityOut = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(opacityIn, opacityOut);

  // Slight Y offset on entry
  const yOffset = interpolate(scaleIn, [0.7, 1], [20, 0]);

  // Visual/icon spring (slightly delayed for stagger effect)
  const visualScale = spring({
    frame: Math.max(0, frame - 3),
    fps,
    from: 0.4,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  const isLeft = side === "left";

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: `${topPercent}%`,
          left: isLeft ? "5%" : undefined,
          right: isLeft ? undefined : "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: isLeft ? "flex-start" : "flex-end",
          opacity,
          transform: `scale(${scaleIn}) translateY(${yOffset}px)`,
        }}
      >
        {/* Icon above text */}
        {icon && (
          <div
            style={{
              marginBottom: 14,
              transform: `scale(${visualScale})`,
              opacity: visualScale,
            }}
          >
            {icon}
          </div>
        )}

        {/* Hero visual (image) — prominent with dramatic shadow */}
        {visual && (
          <div
            style={{
              marginBottom: visualOnly ? 0 : 12,
              transform: `scale(${visualScale})`,
              opacity: visualScale,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow:
                "0 12px 50px rgba(0,0,0,0.7), 0 0 100px rgba(0,0,0,0.25)",
              border: "2px solid rgba(255,255,255,0.15)",
            }}
          >
            {visual}
          </div>
        )}

        {/* Main keyword text */}
        {!visualOnly && (
          <div
            style={{
              fontFamily,
              fontWeight: 900,
              fontSize,
              color,
              lineHeight: 1.1,
              textShadow: `
                0 3px 12px rgba(0,0,0,0.8),
                0 0 40px rgba(0,0,0,0.4),
                0 0 80px rgba(0,0,0,0.2)
              `,
              textAlign: isLeft ? "left" : "right",
              letterSpacing: -1,
            }}
          >
            {text}
          </div>
        )}

        {/* Subtext */}
        {subtext && !visualOnly && (
          <div
            style={{
              fontFamily,
              fontWeight: 700,
              fontSize: fontSize * 0.38,
              color,
              opacity: 0.85,
              marginTop: 6,
              textShadow: `
                0 2px 6px rgba(0,0,0,0.7),
                0 0 20px rgba(0,0,0,0.3)
              `,
              textAlign: isLeft ? "left" : "right",
              letterSpacing: 2,
            }}
          >
            {subtext}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
