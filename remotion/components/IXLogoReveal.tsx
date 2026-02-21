import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface IXLogoRevealProps {
  durationInFrames: number;
}

export const IXLogoReveal: React.FC<IXLogoRevealProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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

  const logoScale = spring({
    frame,
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 15, stiffness: 150 },
  });

  // CTA text slides up with delay
  const ctaProgress = spring({
    frame: Math.max(0, frame - 15),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const ctaY = interpolate(ctaProgress, [0, 1], [40, 0]);

  // "Link in bio" fades in later
  const linkProgress = spring({
    frame: Math.max(0, frame - 25),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
      }}
    >
      {/* IX Logo — actual image file */}
      <div style={{ transform: `scale(${logoScale})` }}>
        <Img
          src={staticFile("infinitx-logo.png")}
          style={{ width: 600, height: "auto" }}
        />
      </div>

      {/* CTA */}
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 52,
          color: "#0D0D0D",
          textAlign: "center",
          lineHeight: 1.2,
          transform: `translateY(${ctaY}px)`,
          opacity: ctaProgress,
          maxWidth: 850,
        }}
      >
        Build Your First AI Sales{"\n"}
        Campaign <span style={{ color: "#FF6B00" }}>For Free</span>
      </div>

      {/* Link in bio nudge */}
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 30,
          color: "#FF6B00",
          letterSpacing: 3,
          opacity: linkProgress,
        }}
      >
        LINK IN BIO · FREE TO START
      </div>
    </AbsoluteFill>
  );
};
