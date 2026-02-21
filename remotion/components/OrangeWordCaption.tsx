import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLORS } from "../lib/colors";

const { fontFamily } = loadFont();

export interface OrangeWordCaptionProps {
  word: string;
  emphasis?: boolean;
}

/**
 * Orange-themed word caption - positioned at BOTTOM ONLY
 * This prevents overlap with illustrations in center/top
 */
export const OrangeWordCaption: React.FC<OrangeWordCaptionProps> = ({
  word,
  emphasis = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quick pop-in animation
  const scale = spring({
    frame,
    fps,
    from: 0.85,
    to: emphasis ? 1.1 : 1,
    config: { damping: 15, stiffness: 200 },
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
        display: "flex",
        alignItems: "flex-end", // Position at BOTTOM
        justifyContent: "center",
        paddingBottom: 180, // Lower third positioning
      }}
    >
      {/* Caption with background pill for emphasis words */}
      <div
        style={{
          backgroundColor: emphasis
            ? COLORS.primary
            : "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
          padding: emphasis ? "14px 36px" : "10px 28px",
          borderRadius: emphasis ? 14 : 10,
          transform: `scale(${scale})`,
          opacity,
          boxShadow: emphasis
            ? `0 0 40px ${COLORS.primaryGlow}, 0 4px 20px rgba(0,0,0,0.3)`
            : "0 4px 16px rgba(0,0,0,0.4)",
        }}
      >
        <span
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: emphasis ? 56 : 48,
            color: emphasis ? COLORS.dark : COLORS.white,
            letterSpacing: emphasis ? 2 : 0,
            textShadow: emphasis
              ? "none"
              : `0 0 20px ${COLORS.primaryGlow}`,
          }}
        >
          {word}
        </span>
      </div>
    </AbsoluteFill>
  );
};
