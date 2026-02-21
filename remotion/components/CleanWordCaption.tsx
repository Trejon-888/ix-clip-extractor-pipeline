import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface CleanWordCaptionProps {
  word: string;
  emphasis?: boolean;
  position?: "center" | "lower";
}

/**
 * Clean, bold single-word captions
 * Style: White text, minimal, modern - like the "Hormozi's" example
 * More subtle than OrangeWordCaption, cleaner aesthetic
 */
export const CleanWordCaption: React.FC<CleanWordCaptionProps> = ({
  word,
  emphasis = false,
  position = "lower",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quick, snappy entrance
  const scale = spring({
    frame,
    fps,
    from: 0.85,
    to: emphasis ? 1.1 : 1.0,
    config: { damping: 18, stiffness: 200 },
  });

  const opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Subtle vertical slide
  const slideY = interpolate(
    spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } }),
    [0, 1],
    [8, 0]
  );

  const topPosition = position === "center" ? "50%" : "68%";

  const style: React.CSSProperties = {
    position: "absolute",
    top: topPosition,
    left: "50%",
    transform: `translateX(-50%) translateY(calc(-50% + ${slideY}px)) scale(${scale})`,
    fontFamily,
    fontWeight: 900,
    fontSize: emphasis ? 76 : 64,
    color: "#FFFFFF",
    textAlign: "center",
    opacity,
    textShadow: emphasis
      ? "0px 0px 40px rgba(255, 255, 255, 0.4), 0px 4px 12px rgba(0, 0, 0, 0.8)"
      : "0px 4px 12px rgba(0, 0, 0, 0.8)",
    whiteSpace: "nowrap",
    letterSpacing: emphasis ? 3 : 1,
  };

  return <div style={style}>{word}</div>;
};

/**
 * Accent word caption - orange highlight for key words
 * Use sparingly for maximum impact
 */
export const AccentWordCaption: React.FC<CleanWordCaptionProps> = ({
  word,
  emphasis = false,
  position = "lower",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    from: 0.7,
    to: 1.0,
    config: { damping: 12, stiffness: 180 },
  });

  const opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const topPosition = position === "center" ? "50%" : "68%";

  const style: React.CSSProperties = {
    position: "absolute",
    top: topPosition,
    left: "50%",
    transform: `translateX(-50%) translateY(-50%) scale(${scale})`,
    fontFamily,
    fontWeight: 900,
    fontSize: 72,
    color: "#FF6B00",
    textAlign: "center",
    opacity,
    textShadow: "0px 0px 50px rgba(255, 107, 0, 0.6), 0px 4px 12px rgba(0, 0, 0, 0.8)",
    whiteSpace: "nowrap",
    letterSpacing: 2,
  };

  return <div style={style}>{word}</div>;
};
