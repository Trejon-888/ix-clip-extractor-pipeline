import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface OutroCTAProps {
  durationInFrames: number;
}

/**
 * End-of-video CTA card: IX logo + "Build Your First AI Sales Campaign"
 * + "Check the link in my bio · Free to start" + screenshot preview
 */
export const OutroCTA: React.FC<OutroCTAProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Logo bounce
  const logoScale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  // CTA text slides up
  const ctaProgress = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });
  const ctaY = interpolate(ctaProgress, [0, 1], [50, 0]);

  // Screenshot slides up from bottom
  const screenshotProgress = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 150 },
  });
  const screenshotY = interpolate(screenshotProgress, [0, 1], [200, 0]);

  // "Link in bio" pulses
  const linkProgress = spring({
    frame: Math.max(0, frame - 28),
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
        gap: 24,
        padding: "60px 40px",
      }}
    >
      {/* IX Logo */}
      <div style={{ transform: `scale(${logoScale})` }}>
        <Img
          src={staticFile("infinitx-logo.png")}
          style={{ width: 280, height: "auto" }}
        />
      </div>

      {/* Headline */}
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
        Build Your First AI Sales Campaign{" "}
        <span style={{ color: "#9AFF00" }}>For Free</span>
      </div>

      {/* Screenshot preview */}
      <div
        style={{
          transform: `translateY(${screenshotY}px)`,
          opacity: screenshotProgress,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0px 8px 40px rgba(0,0,0,0.15)",
          maxWidth: 600,
        }}
      >
        <Img
          src={staticFile("ix-campaign-screenshot.png")}
          style={{ width: 600, height: "auto" }}
        />
      </div>

      {/* Link in bio badge */}
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 28,
          color: "#FFFFFF",
          backgroundColor: "#9AFF00",
          borderRadius: 50,
          padding: "14px 40px",
          letterSpacing: 2,
          opacity: linkProgress,
          boxShadow: "0px 4px 20px rgba(255, 107, 0, 0.4)",
        }}
      >
        LINK IN BIO · FREE TO START
      </div>
    </AbsoluteFill>
  );
};
