/**
 * AnnotationBadge — Glassmorphic label for annotating screen content
 *
 * Floats near screen areas to call attention and label things.
 * Designed for moments when speaker is showing their screen
 * (YouTube Studio, published results, etc.).
 *
 * Design: Frosted glass pill, thin orange border, dark text.
 * Animation: Spring slide-in from pointer direction, hold, spring slide-out.
 */

import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export interface AnnotationBadgeProps {
  label: string;
  /** Position as percentage of frame (0-100) */
  x: number;
  y: number;
  durationInFrames: number;
  accentColor?: string;
  /** Which direction the badge slides in from */
  slideFrom?: "left" | "right" | "up" | "down";
  /** Show green checkmark icon */
  showCheck?: boolean;
  /** Font size */
  fontSize?: number;
}

export const AnnotationBadge: React.FC<AnnotationBadgeProps> = ({
  label,
  x,
  y,
  durationInFrames,
  accentColor = "#FF7614",
  slideFrom = "right",
  showCheck = false,
  fontSize = 22,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterProgress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 140 },
  });

  // Exit spring (last 10 frames)
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Slide offset based on direction
  let translateX = 0;
  let translateY = 0;
  const slideDistance = 30;

  if (slideFrom === "left") {
    translateX = interpolate(enterProgress, [0, 1], [-slideDistance, 0]);
  } else if (slideFrom === "right") {
    translateX = interpolate(enterProgress, [0, 1], [slideDistance, 0]);
  } else if (slideFrom === "up") {
    translateY = interpolate(enterProgress, [0, 1], [-slideDistance, 0]);
  } else if (slideFrom === "down") {
    translateY = interpolate(enterProgress, [0, 1], [slideDistance, 0]);
  }

  // Orange accent glow on entrance (first 15 frames)
  const glowOpacity = interpolate(frame, [0, 5, 15], [0, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px)`,
        opacity: enterProgress * exitOpacity,
        zIndex: 35,
        pointerEvents: "none",
      }}
    >
      {/* Frosted glass pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 22px",
          borderRadius: 50,
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1.5px solid ${accentColor}40`,
          boxShadow: glowOpacity > 0
            ? `0 0 16px rgba(255, 118, 20, ${glowOpacity}), 0 4px 12px rgba(0,0,0,0.1)`
            : "0 4px 12px rgba(0,0,0,0.1)",
          whiteSpace: "nowrap",
        }}
      >
        {/* Checkmark icon */}
        {showCheck && (
          <svg width={fontSize} height={fontSize} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#22C55E" />
            <path
              d="M7 12.5L10.5 16L17 9"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {/* Label */}
        <span
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize,
            color: "#1A1A1A",
            letterSpacing: 1.5,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
