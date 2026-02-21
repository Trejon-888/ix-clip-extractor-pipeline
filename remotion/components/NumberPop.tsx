import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface NumberPopEntry {
  text: string;
  start: number;
  duration: number;
}

const SingleNumberPop: React.FC<{
  text: string;
  durationFrames: number;
}> = ({ text, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scale in with spring
  const scaleIn = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 200 },
  });

  // Fade out in last 10 frames
  const fadeOut =
    frame > durationFrames - 10
      ? spring({
          frame: frame - (durationFrames - 10),
          fps,
          from: 1,
          to: 0,
          config: { damping: 20 },
        })
      : 1;

  return (
    <div
      style={{
        position: "absolute",
        top: "8%",
        right: "5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${scaleIn})`,
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          padding: "16px 32px",
          borderRadius: 12,
          border: "2px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        <span
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 48,
            color: "#FFFFFF",
            letterSpacing: 2,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export const NumberPops: React.FC<{ pops: NumberPopEntry[] }> = ({ pops }) => {
  const { fps } = useVideoConfig();

  return (
    <>
      {pops.map((pop) => (
        <Sequence
          key={`${pop.text}-${pop.start}`}
          from={Math.round(pop.start * fps)}
          durationInFrames={Math.round(pop.duration * fps)}
        >
          <SingleNumberPop
            text={pop.text}
            durationFrames={Math.round(pop.duration * fps)}
          />
        </Sequence>
      ))}
    </>
  );
};
