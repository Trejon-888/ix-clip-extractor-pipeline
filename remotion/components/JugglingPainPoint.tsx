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

export interface JugglingPainPointProps {
  durationInFrames: number;
}

/**
 * V9 - Visual showing the pain of juggling multiple tools
 * For the "tired of juggling multiple tools, not booking enough calls" section
 * Shows frustrated state with multiple tool icons spinning chaotically
 */

// Spinning tool icon
const SpinningTool: React.FC<{
  delay: number;
  angle: number;
  distance: number;
  icon: string;
  speed: number;
}> = ({ delay, angle, distance, icon, speed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: 0,
    to: 1,
    config: { damping: 15 },
  });

  // Chaotic orbit
  const orbitAngle = angle + frame * speed;
  const wobble = Math.sin(frame * 0.15 + delay) * 15;

  const x = Math.cos((orbitAngle * Math.PI) / 180) * (distance + wobble);
  const y = Math.sin((orbitAngle * Math.PI) / 180) * (distance + wobble) * 0.6; // Oval orbit

  const rotation = frame * speed * 2;

  const icons: Record<string, React.ReactNode> = {
    email: (
      <path
        d="M4 6h16v12H4V6zm0 0l8 6 8-6"
        stroke={COLORS.lightGray}
        strokeWidth="2"
        fill="none"
      />
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" stroke={COLORS.lightGray} strokeWidth="2" fill="none" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={COLORS.lightGray} strokeWidth="2" fill="none" />
      </>
    ),
    chat: (
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke={COLORS.lightGray}
        strokeWidth="2"
        fill="none"
      />
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" stroke={COLORS.lightGray} strokeWidth="2" fill="none" />
        <path d="M16 2v4M8 2v4M3 10h18" stroke={COLORS.lightGray} strokeWidth="2" />
      </>
    ),
    analytics: (
      <path d="M18 20V10M12 20V4M6 20v-6" stroke={COLORS.lightGray} strokeWidth="2" strokeLinecap="round" />
    ),
    phone: (
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke={COLORS.lightGray}
        strokeWidth="2"
        fill="none"
      />
    ),
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${x}px - 50px)`,
        top: `calc(42% + ${y}px - 50px)`,
        width: 100,
        height: 100,
        opacity: progress * 0.85,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24">
          {icons[icon]}
        </svg>
      </div>
    </div>
  );
};

// Missed call indicator
const MissedCall: React.FC<{ delay: number; x: number; y: number }> = ({ delay, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 200 },
  });

  const pulse = Math.sin(frame * 0.2) * 0.1 + 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: progress,
        transform: `scale(${progress * pulse})`,
      }}
    >
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: 45,
          backgroundColor: COLORS.error,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 50px ${COLORS.error}90, 0 8px 30px rgba(0,0,0,0.4)`,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24">
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
            stroke={COLORS.white}
            strokeWidth="2"
            fill="none"
          />
          <line x1="4" y1="4" x2="20" y2="20" stroke={COLORS.white} strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
};

export const JugglingPainPoint: React.FC<JugglingPainPointProps> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in/out
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

  // Text animations
  const tiredProgress = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0,
    to: 1,
    config: { damping: 15 },
  });

  const notBookingProgress = spring({
    frame: Math.max(0, frame - 25),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  const notBookingScale = spring({
    frame: Math.max(0, frame - 25),
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 10, stiffness: 180 },
  });

  // Tools orbiting chaotically - BIGGER orbits to fill screen
  const spinningTools = [
    { icon: "email", angle: 0, distance: 280, speed: 1.2, delay: 8 },
    { icon: "user", angle: 72, distance: 240, speed: -0.9, delay: 12 },
    { icon: "chat", angle: 144, distance: 300, speed: 1.5, delay: 16 },
    { icon: "calendar", angle: 216, distance: 220, speed: -1.1, delay: 20 },
    { icon: "analytics", angle: 288, distance: 290, speed: 0.8, delay: 24 },
    { icon: "phone", angle: 36, distance: 260, speed: -1.3, delay: 28 },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(10, 10, 10, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      />

      {/* Top text - TIRED OF JUGGLING - BIGGER */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 40,
            color: COLORS.lightGray,
            letterSpacing: 6,
            opacity: tiredProgress,
          }}
        >
          TIRED OF JUGGLING
        </div>
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 72,
            color: COLORS.white,
            letterSpacing: -2,
            opacity: tiredProgress,
            textShadow: "0 4px 40px rgba(0,0,0,0.6)",
          }}
        >
          MULTIPLE TOOLS?
        </div>
      </div>

      {/* Chaotic spinning tools */}
      {spinningTools.map((tool, i) => (
        <SpinningTool
          key={i}
          delay={tool.delay}
          angle={tool.angle}
          distance={tool.distance}
          icon={tool.icon}
          speed={tool.speed}
        />
      ))}

      {/* Missed calls indicators - spread across screen */}
      <MissedCall delay={30} x={120} y={650} />
      <MissedCall delay={40} x={850} y={720} />
      <MissedCall delay={50} x={460} y={900} />
      <MissedCall delay={60} x={700} y={580} />

      {/* Bottom text - NOT BOOKING ENOUGH CALLS - BIGGER */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 36,
            color: COLORS.lightGray,
            letterSpacing: 6,
            opacity: notBookingProgress,
          }}
        >
          STILL NOT BOOKING
        </div>
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 80,
            color: COLORS.error,
            letterSpacing: -2,
            opacity: notBookingProgress,
            transform: `scale(${notBookingScale})`,
            textShadow: `0 0 60px ${COLORS.error}70`,
          }}
        >
          ENOUGH CALLS?
        </div>
      </div>
    </AbsoluteFill>
  );
};
