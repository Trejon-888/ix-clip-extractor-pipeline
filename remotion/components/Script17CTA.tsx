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

export interface Script17CTAProps {
  durationInFrames: number;
}

/**
 * Script17-specific CTA: "Comment 'SYSTEM'"
 * Matches the actual transcript ending:
 * "comment the word 'system,' and I will show you how it works"
 */
export const Script17CTA: React.FC<Script17CTAProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === FADE IN/OUT ===
  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
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

  // === COMMENT ICON ANIMATION ===
  const iconScale = spring({
    frame,
    fps,
    from: 0.3,
    to: 1,
    config: { damping: 10, stiffness: 150 },
  });

  const iconBounce = Math.sin(frame * 0.15) * 5;

  // === "COMMENT" TEXT ===
  const commentProgress = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const commentY = interpolate(commentProgress, [0, 1], [40, 0]);

  // === "SYSTEM" BADGE ===
  const systemProgress = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 180 },
  });

  const systemScale = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 10, stiffness: 200 },
  });

  // System badge pulse
  const systemPulse = 1 + Math.sin(frame * 0.12) * 0.03;

  // === SUBTITLE ===
  const subtitleProgress = spring({
    frame: Math.max(0, frame - 30),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // === POINTER ANIMATION ===
  const pointerProgress = spring({
    frame: Math.max(0, frame - 25),
    fps,
    from: 0,
    to: 1,
    config: { damping: 15, stiffness: 100 },
  });

  const pointerBounce = Math.sin(frame * 0.2) * 8;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 600,
          height: 600,
          marginLeft: -300,
          marginTop: -300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primaryGlow} 0%, transparent 60%)`,
          filter: "blur(60px)",
          opacity: 0.5,
        }}
      />

      {/* Comment icon */}
      <div
        style={{
          transform: `scale(${iconScale}) translateY(${iconBounce}px)`,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          {/* Speech bubble */}
          <path
            d="M20 25 C20 15, 30 10, 40 10 L80 10 C90 10, 100 15, 100 25 L100 65 C100 75, 90 80, 80 80 L50 80 L30 100 L35 80 L40 80 C30 80, 20 75, 20 65 Z"
            fill={COLORS.primary}
          />
          {/* Typing dots */}
          <circle cx="45" cy="45" r="6" fill={COLORS.dark}>
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="1s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>
          <circle cx="60" cy="45" r="6" fill={COLORS.dark}>
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="1s"
              repeatCount="indefinite"
              begin="0.2s"
            />
          </circle>
          <circle cx="75" cy="45" r="6" fill={COLORS.dark}>
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="1s"
              repeatCount="indefinite"
              begin="0.4s"
            />
          </circle>
        </svg>
      </div>

      {/* "COMMENT" text */}
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 48,
          color: COLORS.white,
          letterSpacing: 6,
          opacity: commentProgress,
          transform: `translateY(${commentY}px)`,
        }}
      >
        COMMENT
      </div>

      {/* "SYSTEM" badge with pointer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: systemProgress,
          transform: `scale(${systemScale * systemPulse})`,
        }}
      >
        {/* Pointer finger */}
        <div
          style={{
            transform: `translateX(${pointerBounce}px)`,
            opacity: pointerProgress,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path
              d="M45 30 L20 30 M20 30 L28 22 M20 30 L28 38"
              stroke={COLORS.primary}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* SYSTEM badge */}
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 72,
            color: COLORS.dark,
            backgroundColor: COLORS.primary,
            padding: "20px 50px",
            borderRadius: 20,
            letterSpacing: 4,
            boxShadow: `
              0 0 40px ${COLORS.primaryGlow},
              0 8px 30px rgba(0,0,0,0.3)
            `,
          }}
        >
          "SYSTEM"
        </div>

        {/* Pointer finger (right side) */}
        <div
          style={{
            transform: `translateX(${-pointerBounce}px) scaleX(-1)`,
            opacity: pointerProgress,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path
              d="M45 30 L20 30 M20 30 L28 22 M20 30 L28 38"
              stroke={COLORS.primary}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily,
          fontWeight: 500,
          fontSize: 32,
          color: COLORS.lightGray,
          letterSpacing: 2,
          opacity: subtitleProgress,
          marginTop: 20,
        }}
      >
        I'll show you how it works
      </div>

      {/* Decorative corner accents */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          width: 60,
          height: 60,
          borderTop: `4px solid ${COLORS.primary}`,
          borderLeft: `4px solid ${COLORS.primary}`,
          opacity: commentProgress * 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 80,
          width: 60,
          height: 60,
          borderTop: `4px solid ${COLORS.primary}`,
          borderRight: `4px solid ${COLORS.primary}`,
          opacity: commentProgress * 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 80,
          width: 60,
          height: 60,
          borderBottom: `4px solid ${COLORS.primary}`,
          borderLeft: `4px solid ${COLORS.primary}`,
          opacity: commentProgress * 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 80,
          width: 60,
          height: 60,
          borderBottom: `4px solid ${COLORS.primary}`,
          borderRight: `4px solid ${COLORS.primary}`,
          opacity: commentProgress * 0.5,
        }}
      />
    </AbsoluteFill>
  );
};
