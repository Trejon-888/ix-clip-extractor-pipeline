/**
 * FloatingCard — Tier 2 Popup Component
 *
 * A rounded card that floats in from the edge of the screen.
 * Speaker stays visible. Used for supporting points, brand mentions, data.
 *
 * Part of the Short-Form Editing System v2:
 *   Tier 1: Full-screen AppleStylePopup (max 2 per clip, wow + concept)
 *   Tier 2: FloatingCard (3-5 per clip, supporting points)
 */

import React, { ReactNode } from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export interface FloatingCardProps {
  durationInFrames: number;
  icon?: ReactNode;
  caption: string;
  subtitle?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  accentColor?: string;
  iconSize?: number;
  /** Scale the entire card (default 1). Use 1.4-1.6 for bigger presence. */
  cardScale?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  durationInFrames,
  icon,
  caption,
  subtitle,
  position = "top-right",
  accentColor = "#FF6B00",
  iconSize = 72,
  cardScale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === Positioning ===
  const isTop = position.startsWith("top");
  const isRight = position.endsWith("right");

  const positionStyle: React.CSSProperties = {
    position: "absolute",
    ...(isTop ? { top: "6%" } : { bottom: "18%" }),
    ...(isRight ? { right: "4%" } : { left: "4%" }),
  };

  // === Entrance: slide in from edge ===
  const slideDistance = isRight ? 80 : -80;
  const slideX = interpolate(
    spring({
      frame,
      fps,
      from: 0,
      to: 1,
      config: { damping: 16, stiffness: 120 },
    }),
    [0, 1],
    [slideDistance, 0]
  );

  const enterOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 150 },
  });

  // === Exit: fade out last 10 frames ===
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const overallOpacity = Math.min(enterOpacity, exitOpacity);

  // === Icon scale entrance (slightly delayed) ===
  const iconScale = spring({
    frame: Math.max(0, frame - 4),
    fps,
    from: 0.7,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  // === Accent line grows from left ===
  const lineWidth = spring({
    frame: Math.max(0, frame - 6),
    fps,
    from: 0,
    to: 60,
    config: { damping: 14, stiffness: 100 },
  });

  // Transform origin based on position (scale from the corner nearest to the edge)
  const originX = isRight ? "right" : "left";
  const originY = isTop ? "top" : "bottom";

  return (
    <div
      style={{
        ...positionStyle,
        transform: `translateX(${slideX}px)`,
        opacity: overallOpacity,
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 20,
          padding: "16px 24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)",
          maxWidth: 420 * cardScale,
          minWidth: 240 * cardScale,
          transform: cardScale !== 1 ? `scale(${cardScale})` : undefined,
          transformOrigin: `${originY} ${originX}`,
        }}
      >
        {/* Icon area */}
        {icon && (
          <div
            style={{
              width: iconSize,
              height: iconSize,
              minWidth: iconSize,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${iconScale})`,
              borderRadius: 14,
              backgroundColor: "rgba(0,0,0,0.04)",
              overflow: "hidden",
            }}
          >
            {icon}
          </div>
        )}

        {/* Text area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Caption */}
          <div
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 24,
              color: "#1A1A1A",
              letterSpacing: 1.5,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {caption}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                fontFamily,
                fontWeight: 500,
                fontSize: 16,
                color: "#888888",
                letterSpacing: 0.5,
                marginTop: 4,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {subtitle}
            </div>
          )}

          {/* Accent line */}
          <div
            style={{
              width: lineWidth,
              height: 2.5,
              backgroundColor: accentColor,
              borderRadius: 2,
              marginTop: 8,
              opacity: 0.8,
            }}
          />
        </div>
      </div>
    </div>
  );
};
