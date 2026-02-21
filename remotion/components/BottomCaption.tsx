import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLORS } from "../lib/colors";

const { fontFamily } = loadFont();

export interface BottomCaptionProps {
  word: string;
  emphasis?: boolean;
}

/**
 * V7 Caption - Truly at the BOTTOM of the screen
 * Lower third positioning - below the speaker's face
 * Clean, readable, not intrusive
 */
export const BottomCaption: React.FC<BottomCaptionProps> = ({
  word,
  emphasis = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quick, subtle pop animation
  const scale = spring({
    frame,
    fps,
    from: 0.9,
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
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        // Position at very bottom - lower third
        paddingBottom: 80, // Much lower on 1920 height screen
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <span
          style={{
            fontFamily,
            fontWeight: emphasis ? 900 : 800,
            fontSize: emphasis ? 52 : 44,
            color: emphasis ? COLORS.primary : COLORS.white,
            textShadow: emphasis
              ? `0 0 30px ${COLORS.primaryGlow}, 0 4px 12px rgba(0,0,0,0.8)`
              : "0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)",
            letterSpacing: emphasis ? 2 : 0,
            // Outline for readability on any background
            WebkitTextStroke: "1px rgba(0,0,0,0.3)",
          }}
        >
          {word}
        </span>
      </div>
    </AbsoluteFill>
  );
};
