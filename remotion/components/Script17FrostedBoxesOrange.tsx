import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLORS } from "../lib/colors";

const { fontFamily } = loadFont();

export interface Script17FrostedBoxesOrangeProps {
  durationInFrames: number;
}

/**
 * "5 logins, 5 dashboards, 0 connection" concept
 * Orange-themed frosted glass boxes
 * Positioned in upper area to avoid caption overlap
 */
export const Script17FrostedBoxesOrange: React.FC<Script17FrostedBoxesOrangeProps> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boxes = [
    { number: "5", label: "LOGINS", isError: false },
    { number: "5", label: "DASHBOARDS", isError: false },
    { number: "0", label: "CONNECTION", isError: true },
  ];

  // Fade in/out
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", // Position at TOP
        paddingTop: 250, // Leave room at top
      }}
    >
      {/* Dark overlay background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(13, 13, 13, 0.88)",
          backdropFilter: "blur(12px)",
        }}
      />

      {/* Boxes container */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 35,
          position: "relative",
          zIndex: 1,
        }}
      >
        {boxes.map((box, i) => {
          const delay = i * 8;
          const boxFrame = Math.max(0, frame - delay);

          const scale = spring({
            frame: boxFrame,
            fps,
            from: 0.2,
            to: 1,
            config: { damping: 12, stiffness: 150 },
          });

          const boxOpacity = spring({
            frame: boxFrame,
            fps,
            from: 0,
            to: 1,
            config: { damping: 200 },
          });

          // Shake animation for the "0 CONNECTION" box
          const shakeOffset = box.isError
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
                opacity: boxOpacity,
              }}
            >
              {/* Frosted box */}
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 24,
                  backgroundColor: box.isError
                    ? "rgba(255, 68, 68, 0.15)"
                    : "rgba(255, 107, 0, 0.12)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: box.isError
                    ? "3px solid rgba(255, 68, 68, 0.5)"
                    : `3px solid ${COLORS.primary}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: box.isError
                    ? "0px 8px 32px rgba(255, 68, 68, 0.3)"
                    : `0px 8px 32px ${COLORS.primaryGlow}`,
                }}
              >
                <span
                  style={{
                    fontFamily,
                    fontWeight: 900,
                    fontSize: 80,
                    color: box.isError ? COLORS.error : COLORS.white,
                    textShadow: box.isError
                      ? "0px 4px 12px rgba(255, 68, 68, 0.6)"
                      : `0px 4px 12px ${COLORS.primaryGlow}`,
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
                  fontSize: 22,
                  color: box.isError ? COLORS.error : COLORS.primary,
                  letterSpacing: 3,
                  textShadow: "0px 2px 8px rgba(0, 0, 0, 0.5)",
                }}
              >
                {box.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional subtitle below boxes */}
      <div
        style={{
          fontFamily,
          fontWeight: 600,
          fontSize: 28,
          color: COLORS.lightGray,
          marginTop: 50,
          letterSpacing: 2,
          opacity: interpolate(frame, [30, 45], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "relative",
          zIndex: 1,
        }}
      >
        NOTHING WAS CONNECTED
      </div>
    </AbsoluteFill>
  );
};
