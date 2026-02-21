import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../lib/colors";

/**
 * Centered Caption Bar for Educational Explainer Style
 *
 * Middle zone caption - full-width centered text with semi-transparent background bar
 * Word-by-word highlighting with smooth transitions
 */

interface CenteredCaptionBarProps {
  word: string;
  emphasis?: boolean;
}

export const CenteredCaptionBar: React.FC<CenteredCaptionBarProps> = ({
  word,
  emphasis = false,
}) => {
  const frame = useCurrentFrame();

  // Entrance animation (first 5 frames)
  const opacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, 5], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Emphasis pulse effect
  const emphasisScale = emphasis
    ? interpolate(frame % 20, [0, 10, 20], [1, 1.05, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "62%", // Positioned between top content zone and bottom face
        transform: `translate(-50%, -50%) scale(${scale * emphasisScale})`,
        opacity,
        width: "90%",
        maxWidth: "900px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background bar */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(13, 13, 13, 0.85)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.5)",
        }}
      />

      {/* Text content */}
      <div
        style={{
          position: "relative",
          padding: "24px 40px",
          fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
          fontSize: emphasis ? "52px" : "48px",
          fontWeight: emphasis ? 800 : 700,
          color: emphasis ? COLORS.primary : COLORS.white,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "0.02em",
          lineHeight: 1.2,
          textShadow: emphasis
            ? `0 0 20px ${COLORS.primary}40, 0 2px 8px rgba(0, 0, 0, 0.8)`
            : "0 2px 8px rgba(0, 0, 0, 0.8)",
        }}
      >
        {word}
      </div>

      {/* Emphasis glow effect */}
      {emphasis && (
        <div
          style={{
            position: "absolute",
            inset: "-4px",
            background: `linear-gradient(135deg, ${COLORS.primary}20, transparent)`,
            borderRadius: "18px",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
