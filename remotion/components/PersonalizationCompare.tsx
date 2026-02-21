import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface PersonalizationCompareProps {
  durationInFrames: number;
}

/**
 * Animated comparison: generic "Hi, [First Name]" message (bad, crosses out)
 * vs AI-personalized message (good, slides in).
 * Shows during the personalization section when speaker says
 * "I'm not talking about Hi, square bracket, first name. No."
 */
export const PersonalizationCompare: React.FC<PersonalizationCompareProps> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Overall fade in/out
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
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

  // Bad message slides in from left
  const badSlide = spring({
    frame,
    fps,
    from: -400,
    to: 0,
    config: { damping: 20, stiffness: 200 },
  });

  const badOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Red X strike-through appears after delay
  const strikeProgress = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Good message slides in from right after delay
  const goodSlide = spring({
    frame: Math.max(0, frame - 30),
    fps,
    from: 400,
    to: 0,
    config: { damping: 20, stiffness: 200 },
  });

  const goodOpacity = spring({
    frame: Math.max(0, frame - 30),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Good message glow pulse
  const goodScale = spring({
    frame: Math.max(0, frame - 30),
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  const messageCard: React.CSSProperties = {
    width: 800,
    borderRadius: 24,
    padding: "32px 40px",
    fontFamily,
    position: "relative",
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {/* BAD: Generic message */}
      <div
        style={{
          ...messageCard,
          backgroundColor: "#FFF0F0",
          border: "3px solid #FF4444",
          transform: `translateX(${badSlide}px)`,
          opacity: badOpacity,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#FF4444",
            marginBottom: 12,
            letterSpacing: 2,
          }}
        >
          GENERIC MESSAGE
        </div>
        <div style={{ fontSize: 32, fontWeight: 600, color: "#333", lineHeight: 1.4 }}>
          Hi, [First Name] 👋
        </div>
        <div style={{ fontSize: 24, color: "#666", marginTop: 8, lineHeight: 1.4 }}>
          I wanted to reach out about our services...
        </div>

        {/* Red X overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: strikeProgress,
          }}
        >
          <svg width={120} height={120} viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="55" fill="rgba(255,68,68,0.15)" stroke="#FF4444" strokeWidth="4" />
            <line x1="35" y1="35" x2="85" y2="85" stroke="#FF4444" strokeWidth="6" strokeLinecap="round" />
            <line x1="85" y1="35" x2="35" y2="85" stroke="#FF4444" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* GOOD: AI-personalized message */}
      <div
        style={{
          ...messageCard,
          backgroundColor: "#F0FFF0",
          border: "3px solid #4CAF50",
          transform: `translateX(${goodSlide}px) scale(${goodScale})`,
          opacity: goodOpacity,
          boxShadow: "0px 8px 40px rgba(76, 175, 80, 0.2)",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#4CAF50",
            marginBottom: 12,
            letterSpacing: 2,
          }}
        >
          ✓ AI-PERSONALIZED
        </div>
        <div style={{ fontSize: 32, fontWeight: 600, color: "#333", lineHeight: 1.4 }}>
          Hey Sarah, saw your post on scaling agencies...
        </div>
        <div style={{ fontSize: 24, color: "#666", marginTop: 8, lineHeight: 1.4 }}>
          We helped 3 similar agencies book 20+ meetings/week.
          <br />
          Mind if I share how?
        </div>
      </div>
    </AbsoluteFill>
  );
};
