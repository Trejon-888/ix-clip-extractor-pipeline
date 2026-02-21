import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLORS } from "../lib/colors";

const { fontFamily } = loadFont();

export interface FullWidthCaptionProps {
  word: string;
  emphasis?: boolean;
}

/**
 * V9 Caption - FULL WIDTH, truly centered
 * Takes up the entire width of the screen
 * Positioned at VERY bottom to not cover face
 */
export const FullWidthCaption: React.FC<FullWidthCaptionProps> = ({
  word,
  emphasis = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle scale animation
  const scale = spring({
    frame,
    fps,
    from: 0.92,
    to: 1,
    config: { damping: 20, stiffness: 300 },
  });

  const opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        // Full width container
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        // Position at absolute bottom edge of screen
        paddingBottom: 5,
        paddingLeft: 40,
        paddingRight: 40,
      }}
    >
      {/* Full width caption bar */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <span
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: emphasis ? 58 : 50,
            color: emphasis ? COLORS.primary : COLORS.white,
            textAlign: "center",
            textShadow: emphasis
              ? `0 0 40px ${COLORS.primaryGlow}, 0 4px 20px rgba(0,0,0,0.9)`
              : "0 2px 4px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
            letterSpacing: emphasis ? 2 : 0,
            // Ensure text is readable on any background
            WebkitTextStroke: "1px rgba(0,0,0,0.5)",
            paintOrder: "stroke fill",
          }}
        >
          {word}
        </span>
      </div>
    </AbsoluteFill>
  );
};
