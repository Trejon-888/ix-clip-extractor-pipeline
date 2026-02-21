import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface WordByWordCaptionProps {
  word: string;
  frame: number;          // Frame when word should appear
  duration: number;       // Word display duration in frames
  emphasis: boolean;      // True for emphasis styling
  portraitHeight: number; // 1920 for portrait
}

export const WordByWordCaption: React.FC<WordByWordCaptionProps> = ({
  word,
  frame: appearFrame,
  duration,
  emphasis,
  portraitHeight,
}) => {
  const currentFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Only render when word is active
  if (currentFrame < appearFrame || currentFrame >= appearFrame + duration) {
    return null;
  }

  const framesSinceAppear = currentFrame - appearFrame;

  // Spring animation: scale 0.8→1.0, opacity 0→1
  const scale = spring({
    frame: framesSinceAppear,
    fps,
    from: 0.8,
    to: 1.0,
    config: {
      damping: 12,
      stiffness: 200,
    },
  });

  const opacity = spring({
    frame: framesSinceAppear,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 12,
      stiffness: 200,
    },
  });

  // Font size: 42px (2.2% of 1920px)
  const fontSize = Math.round(portraitHeight * 0.022);

  // Vertical position: baseline at 634px (33% of 1920px)
  const top = Math.round(portraitHeight * 0.33);

  const style: React.CSSProperties = {
    position: "absolute",
    top: `${top}px`,
    left: "50%",
    transform: `translateX(-50%) scale(${scale})`,
    fontFamily,
    fontWeight: 900,
    fontSize: `${fontSize}px`,
    color: "#FFFFFF",
    textAlign: "center",
    opacity,
    WebkitTextStroke: emphasis ? "4px #000000" : "3px #000000", // Thicker stroke for emphasis
    textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
    whiteSpace: "nowrap",
  };

  return <div style={style}>{word}</div>;
};
