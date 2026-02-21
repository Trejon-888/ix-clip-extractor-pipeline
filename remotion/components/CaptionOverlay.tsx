import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface CaptionOverlayProps {
  text: string;
  position?: "top" | "center" | "bottom";
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
}

export const CaptionOverlay: React.FC<CaptionOverlayProps> = ({
  text,
  position = "bottom",
  fontSize = 48,
  color = "#ffffff",
  backgroundColor = "rgba(0, 0, 0, 0.7)",
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const justifyContent =
    position === "top"
      ? "flex-start"
      : position === "center"
        ? "center"
        : "flex-end";

  return (
    <AbsoluteFill style={{ justifyContent, alignItems: "center", opacity }}>
      <div
        style={{
          backgroundColor,
          padding: "16px 32px",
          borderRadius: 8,
          margin: 40,
          maxWidth: "80%",
        }}
      >
        <span
          style={{
            fontSize,
            fontWeight: "bold",
            color,
            fontFamily: "sans-serif",
            textAlign: "center",
          }}
        >
          {text}
        </span>
      </div>
    </AbsoluteFill>
  );
};
