/**
 * One Voice Prompt — Clean, modern microphone with soundwave → platforms flow.
 *
 * Apple aesthetic: smooth shapes, limited palette, spring animations.
 * NOT pixel art — clean vectors. Designed for white backgrounds.
 */

import React from "react";
import { useCurrentFrame, spring, interpolate, Img, staticFile } from "remotion";

const PLATFORMS = [
  { logo: "logos/youtube.svg", color: "#FF0000", delay: 12 },
  { logo: "logos/instagram.svg", color: "#E4405F", delay: 14 },
  { logo: "logos/tiktok.svg", color: "#000000", delay: 16 },
  { logo: "logos/threads.svg", color: "#000000", delay: 18 },
  { logo: "logos/linkedin.svg", color: "#0A66C2", delay: 20 },
];

interface OneVoicePromptIllustrationProps {
  size?: number;
}

export const OneVoicePromptIllustration: React.FC<OneVoicePromptIllustrationProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  // Microphone entrance
  const micScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  // Soundwave pulse
  const wave1 = spring({
    frame: Math.max(0, frame - 6),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const wave2 = spring({
    frame: Math.max(0, frame - 10),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const wave3 = spring({
    frame: Math.max(0, frame - 14),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // Arrow flow
  const arrowProgress = spring({
    frame: Math.max(0, frame - 8),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 16, stiffness: 80 },
  });

  // Subtle mic glow pulse
  const glowOpacity = interpolate(frame % 50, [0, 25, 50], [0.15, 0.35, 0.15]);

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Microphone glow */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 180 * s,
          height: 180 * s,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,118,20,${glowOpacity}) 0%, transparent 70%)`,
        }}
      />

      {/* Microphone icon */}
      <div
        style={{
          transform: `scale(${micScale})`,
          marginBottom: 10 * s,
        }}
      >
        <svg
          width={120 * s}
          height={160 * s}
          viewBox="0 0 120 160"
          fill="none"
        >
          {/* Mic capsule */}
          <rect
            x="30"
            y="5"
            width="60"
            height="85"
            rx="30"
            fill="#FF7614"
            stroke="#1A1A1A"
            strokeWidth="3"
          />
          {/* Grille lines */}
          <line x1="42" y1="30" x2="78" y2="30" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
          <line x1="42" y1="45" x2="78" y2="45" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
          <line x1="42" y1="60" x2="78" y2="60" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
          {/* Highlight */}
          <rect x="38" y="15" width="8" height="55" rx="4" fill="#FFFFFF" opacity="0.25" />

          {/* Cradle */}
          <path
            d="M20 85 Q20 115 60 115 Q100 115 100 85"
            stroke="#1A1A1A"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Stand */}
          <line x1="60" y1="115" x2="60" y2="140" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
          {/* Base */}
          <line x1="35" y1="140" x2="85" y2="140" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />

          {/* Sound waves right */}
          <path
            d="M105 35 Q115 50 105 65"
            stroke="#FF7614"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity={wave1}
          />
          <path
            d="M112 25 Q127 50 112 75"
            stroke="#FF7614"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity={wave2 * 0.7}
          />

          {/* Sound waves left */}
          <path
            d="M15 35 Q5 50 15 65"
            stroke="#FF7614"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity={wave1}
          />
          <path
            d="M8 25 Q-7 50 8 75"
            stroke="#FF7614"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity={wave3 * 0.7}
          />
        </svg>
      </div>

      {/* Flow arrow */}
      <div
        style={{
          opacity: arrowProgress,
          transform: `scaleY(${arrowProgress})`,
          marginBottom: 16 * s,
        }}
      >
        <svg width={40 * s} height={50 * s} viewBox="0 0 40 50" fill="none">
          <line x1="20" y1="0" x2="20" y2="35" stroke="#FF7614" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 4" />
          <path d="M10 30 L20 45 L30 30" stroke="#FF7614" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Platform icons row */}
      <div
        style={{
          display: "flex",
          gap: 14 * s,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {PLATFORMS.map((platform, i) => {
          const enter = spring({
            frame: Math.max(0, frame - platform.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 10, stiffness: 160 },
          });
          const y = interpolate(enter, [0, 1], [20, 0]);

          return (
            <div
              key={i}
              style={{
                width: 64 * s,
                height: 64 * s,
                borderRadius: 14 * s,
                backgroundColor: "#F5F5F5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: enter,
                transform: `translateY(${y}px) scale(${interpolate(enter, [0, 1], [0.6, 1])})`,
                boxShadow: `0 ${3 * s}px ${12 * s}px rgba(0,0,0,0.08)`,
              }}
            >
              <Img
                src={staticFile(platform.logo)}
                style={{
                  width: 36 * s,
                  height: 36 * s,
                  objectFit: "contain",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
