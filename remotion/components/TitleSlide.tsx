import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface TitleSlideProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  accentColor?: string;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({
  title,
  subtitle,
  backgroundColor = "#1a0533",
  accentColor = "#a855f7",
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <h1
        style={{
          fontSize: 72,
          fontWeight: "bold",
          color: accentColor,
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontSize: 36,
            color: "#e2e8f0",
            marginTop: 16,
            fontFamily: "sans-serif",
          }}
        >
          {subtitle}
        </p>
      )}
    </AbsoluteFill>
  );
};
