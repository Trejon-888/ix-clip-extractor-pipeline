/**
 * KineticText — Character-level spring animation
 *
 * Each letter animates independently with staggered entrances.
 * Replaces static text overlays with text that has MOTION.
 *
 * Entrance modes:
 *   "spring-up"    — Characters rise from below with bounce
 *   "spring-scale" — Characters scale from 0 to 1 with bounce
 *   "fade-blur"    — Characters fade in with decreasing blur
 */

import React from "react";
import {
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export interface KineticTextProps {
  text: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  accentColor?: string;
  /** Frames between each character entrance */
  staggerDelay?: number;
  /** Spring damping (lower = bouncier) */
  damping?: number;
  /** Spring stiffness */
  stiffness?: number;
  entrance?: "spring-up" | "spring-scale" | "fade-blur";
  /** Vertical position from top (0-1 range, e.g. 0.5 = center) */
  verticalPosition?: number;
  /** Letter spacing in px */
  letterSpacing?: number;
  /** Optional subtitle text below main text */
  subtitle?: string;
  subtitleColor?: string;
  /** Duration for exit fade (0 = no fade) */
  exitFadeFrames?: number;
  /** Total duration — used for exit timing */
  durationInFrames?: number;
  /** Text shadow for readability on video */
  textShadow?: string;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  fontSize = 72,
  fontWeight = 800,
  color = "#FFFFFF",
  accentColor = "#FF7614",
  staggerDelay = 2,
  damping = 12,
  stiffness = 160,
  entrance = "spring-up",
  verticalPosition = 0.5,
  letterSpacing = 4,
  subtitle,
  subtitleColor = "#888888",
  exitFadeFrames = 10,
  durationInFrames = 60,
  textShadow = "0 4px 20px rgba(0,0,0,0.5)",
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const characters = text.split("");

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

  // Subtitle entrance (delayed after last character)
  const subtitleDelay = characters.length * staggerDelay + 5;
  const subtitleProgress = spring({
    frame: Math.max(0, frame - subtitleDelay),
    fps,
    from: 0,
    to: 1,
    config: { damping: 18, stiffness: 80 },
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [15, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: `${verticalPosition * 100}%`,
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity: exitOpacity,
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      {/* Main text — character-by-character */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {characters.map((char, i) => {
          const charDelay = i * staggerDelay;
          const charFrame = Math.max(0, frame - charDelay);

          // Spring progress for this character
          const progress = spring({
            frame: charFrame,
            fps,
            from: 0,
            to: 1,
            config: { damping, stiffness },
          });

          let charStyle: React.CSSProperties = {};

          if (entrance === "spring-up") {
            const y = interpolate(progress, [0, 1], [20, 0]);
            charStyle = {
              transform: `translateY(${y}px)`,
              opacity: progress,
            };
          } else if (entrance === "spring-scale") {
            const scale = interpolate(progress, [0, 1], [0.3, 1]);
            charStyle = {
              transform: `scale(${scale})`,
              opacity: progress,
            };
          } else if (entrance === "fade-blur") {
            const blur = interpolate(progress, [0, 1], [8, 0]);
            charStyle = {
              filter: `blur(${blur}px)`,
              opacity: progress,
            };
          }

          return (
            <span
              key={`${char}-${i}`}
              style={{
                fontFamily,
                fontWeight,
                fontSize,
                color,
                letterSpacing,
                textShadow,
                display: "inline-block",
                whiteSpace: "pre",
                ...charStyle,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontFamily,
            fontWeight: 500,
            fontSize: fontSize * 0.42,
            color: subtitleColor,
            letterSpacing: 2,
            textAlign: "center",
            opacity: subtitleProgress,
            transform: `translateY(${subtitleY}px)`,
            textShadow: "0 2px 10px rgba(0,0,0,0.4)",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
