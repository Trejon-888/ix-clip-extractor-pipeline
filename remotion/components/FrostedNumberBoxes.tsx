import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface FrostedNumberBoxesProps {
  durationInFrames: number;
}

export const FrostedNumberBoxes: React.FC<FrostedNumberBoxesProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boxes = [1, 2, 3];

  // Fade out near end so it disappears before section badge
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        opacity: fadeOut,
      }}
    >
      {boxes.map((num, i) => {
        const delay = i * 8;
        const boxFrame = Math.max(0, frame - delay);

        const scale = spring({
          frame: boxFrame,
          fps,
          from: 0.2,
          to: 1,
          config: { damping: 15, stiffness: 180 },
        });

        const opacity = spring({
          frame: boxFrame,
          fps,
          from: 0,
          to: 1,
          config: { damping: 200 },
        });

        return (
          <div
            key={num}
            style={{
              width: 220,
              height: 220,
              borderRadius: 32,
              backgroundColor: "rgba(255, 255, 255, 0.18)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "3px solid rgba(255, 255, 255, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${scale})`,
              opacity,
              boxShadow: "0px 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <span
              style={{
                fontFamily,
                fontWeight: 900,
                fontSize: 100,
                color: "#FFFFFF",
                textShadow: "0px 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              {num}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
