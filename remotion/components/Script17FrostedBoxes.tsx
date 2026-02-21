import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

const LIME_GREEN = "#BFFF00";

export interface Script17FrostedBoxesProps {
  durationInFrames: number;
}

/**
 * "5 logins, 5 dashboards, 0 connection" concept
 * Three frosted glass boxes with numbers and labels
 * Emphasizes the disconnected nature of duct-taped tools
 */
export const Script17FrostedBoxes: React.FC<Script17FrostedBoxesProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boxes = [
    { number: "5", label: "LOGINS", color: "#FFFFFF" },
    { number: "5", label: "DASHBOARDS", color: "#FFFFFF" },
    { number: "0", label: "CONNECTION", color: "#FF4444" },
  ];

  // Fade out near end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
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
        gap: 40,
        opacity: fadeOut,
      }}
    >
      {boxes.map((box, i) => {
        const delay = i * 10;
        const boxFrame = Math.max(0, frame - delay);

        const scale = spring({
          frame: boxFrame,
          fps,
          from: 0.2,
          to: 1,
          config: { damping: 12, stiffness: 150 },
        });

        const opacity = spring({
          frame: boxFrame,
          fps,
          from: 0,
          to: 1,
          config: { damping: 200 },
        });

        // Special shake animation for the "0 CONNECTION" box
        const isZeroBox = box.number === "0";
        const shakeOffset = isZeroBox
          ? Math.sin(frame * 0.5) * 3 * Math.min(1, boxFrame / 30)
          : 0;

        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              transform: `scale(${scale}) translateX(${shakeOffset}px)`,
              opacity,
            }}
          >
            {/* Frosted box */}
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: 28,
                backgroundColor: isZeroBox
                  ? "rgba(255, 68, 68, 0.15)"
                  : "rgba(255, 255, 255, 0.18)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: isZeroBox
                  ? "3px solid rgba(255, 68, 68, 0.5)"
                  : "3px solid rgba(255, 255, 255, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isZeroBox
                  ? "0px 8px 32px rgba(255, 68, 68, 0.3)"
                  : "0px 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              <span
                style={{
                  fontFamily,
                  fontWeight: 900,
                  fontSize: 90,
                  color: box.color,
                  textShadow: isZeroBox
                    ? "0px 4px 12px rgba(255, 68, 68, 0.6)"
                    : "0px 4px 12px rgba(0, 0, 0, 0.4)",
                }}
              >
                {box.number}
              </span>
            </div>

            {/* Label */}
            <div
              style={{
                fontFamily,
                fontWeight: 700,
                fontSize: 24,
                color: isZeroBox ? "#FF4444" : LIME_GREEN,
                letterSpacing: 3,
                textShadow: "0px 2px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              {box.label}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
