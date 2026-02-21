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

export interface DisconnectedToolsVisualProps {
  durationInFrames: number;
}

/**
 * V9 - Visual representation of fragmented tools
 * Shows 5 tool icons that are NOT connected
 * Much more visually engaging than text only
 */

// Tool icon component
const ToolIcon: React.FC<{
  delay: number;
  x: number;
  y: number;
  icon: "email" | "crm" | "chat" | "calendar" | "analytics";
  label: string;
}> = ({ delay, x, y, icon, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  const scale = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: 0.3,
    to: 1,
    config: { damping: 10, stiffness: 180 },
  });

  // Subtle floating animation
  const float = Math.sin((frame + delay * 10) * 0.08) * 5;

  const iconPaths: Record<string, React.ReactNode> = {
    email: (
      <path
        d="M4 6h16v12H4V6zm0 0l8 6 8-6"
        stroke={COLORS.primary}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    crm: (
      <>
        <circle cx="12" cy="8" r="4" stroke={COLORS.primary} strokeWidth="2" fill="none" />
        <path
          d="M4 20c0-4 4-6 8-6s8 2 8 6"
          stroke={COLORS.primary}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </>
    ),
    chat: (
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke={COLORS.primary}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" stroke={COLORS.primary} strokeWidth="2" fill="none" />
        <path d="M16 2v4M8 2v4M3 10h18" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    analytics: (
      <>
        <path d="M18 20V10M12 20V4M6 20v-6" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  };

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + float,
        opacity: progress,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      {/* Icon container - BIGGER */}
      <div
        style={{
          width: 130,
          height: 130,
          borderRadius: 24,
          backgroundColor: "rgba(255, 107, 0, 0.2)",
          border: `3px solid ${COLORS.primary}70`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 30px ${COLORS.primaryGlow}`,
        }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24">
          {iconPaths[icon]}
        </svg>
      </div>
      {/* Label - BIGGER */}
      <span
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 18,
          color: COLORS.white,
          letterSpacing: 2,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}
      >
        {label}
      </span>
    </div>
  );
};

// Broken connection line
const BrokenLine: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}> = ({ x1, y1, x2, y2, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: 0,
    to: 1,
    config: { damping: 20 },
  });

  // Calculate midpoint for the break
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Gap in the middle
  const gapSize = 30;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const gapX = Math.cos(angle) * gapSize;
  const gapY = Math.sin(angle) * gapSize;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: progress * 0.4,
      }}
    >
      {/* First segment */}
      <line
        x1={x1 + 65}
        y1={y1 + 65}
        x2={midX - gapX / 2}
        y2={midY - gapY / 2}
        stroke={COLORS.error}
        strokeWidth="3"
        strokeDasharray="12 6"
      />
      {/* Second segment */}
      <line
        x1={midX + gapX / 2}
        y1={midY + gapY / 2}
        x2={x2 + 65}
        y2={y2 + 65}
        stroke={COLORS.error}
        strokeWidth="3"
        strokeDasharray="12 6"
      />
      {/* X mark at break */}
      <g transform={`translate(${midX}, ${midY})`}>
        <line x1="-8" y1="-8" x2="8" y2="8" stroke={COLORS.error} strokeWidth="3" />
        <line x1="8" y1="-8" x2="-8" y2="8" stroke={COLORS.error} strokeWidth="3" />
      </g>
    </svg>
  );
};

export const DisconnectedToolsVisual: React.FC<DisconnectedToolsVisualProps> = ({
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

  // "NOTHING CONNECTED" text animation
  const nothingProgress = spring({
    frame: Math.max(0, frame - 50),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 150 },
  });

  const nothingScale = spring({
    frame: Math.max(0, frame - 50),
    fps,
    from: 0.7,
    to: 1,
    config: { damping: 8, stiffness: 200 },
  });

  // Tool positions (arranged in a pentagon pattern) - BIGGER spread
  const centerX = 540; // Center of 1080
  const centerY = 780; // Upper-center area
  const radius = 280; // Larger radius for bigger icons

  const tools = [
    { icon: "email" as const, label: "EMAIL", angle: -90 },
    { icon: "crm" as const, label: "CRM", angle: -18 },
    { icon: "analytics" as const, label: "ANALYTICS", angle: 54 },
    { icon: "calendar" as const, label: "CALENDAR", angle: 126 },
    { icon: "chat" as const, label: "CHATBOT", angle: 198 },
  ];

  const toolPositions = tools.map((tool, i) => {
    const angleRad = (tool.angle * Math.PI) / 180;
    return {
      ...tool,
      x: centerX + Math.cos(angleRad) * radius - 65,
      y: centerY + Math.sin(angleRad) * radius - 65,
      delay: i * 5,
    };
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(10, 10, 10, 0.88)",
          backdropFilter: "blur(10px)",
        }}
      />

      {/* Header text */}
      <div
        style={{
          position: "absolute",
          top: 180,
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
            fontWeight: 900,
            fontSize: 72,
            color: COLORS.white,
            letterSpacing: -2,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}
        >
          5 TOOLS
        </div>
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 28,
            color: COLORS.lightGray,
            letterSpacing: 6,
          }}
        >
          5 LOGINS • 5 DASHBOARDS
        </div>
      </div>

      {/* Tool icons in a circle */}
      {toolPositions.map((tool, i) => (
        <ToolIcon
          key={tool.icon}
          delay={tool.delay + 10}
          x={tool.x}
          y={tool.y}
          icon={tool.icon}
          label={tool.label}
        />
      ))}

      {/* Broken connection lines between tools */}
      {toolPositions.map((tool, i) => {
        const nextTool = toolPositions[(i + 1) % toolPositions.length];
        return (
          <BrokenLine
            key={`line-${i}`}
            x1={tool.x}
            y1={tool.y}
            x2={nextTool.x}
            y2={nextTool.y}
            delay={25 + i * 3}
          />
        );
      })}

      {/* "NOTHING CONNECTED" text at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 52,
            color: COLORS.error,
            letterSpacing: 3,
            opacity: nothingProgress,
            transform: `scale(${nothingScale})`,
            padding: "15px 40px",
            backgroundColor: "rgba(255, 68, 68, 0.15)",
            borderRadius: 12,
            border: `3px solid ${COLORS.error}60`,
            textShadow: `0 0 40px ${COLORS.error}80`,
          }}
        >
          NOTHING CONNECTED
        </div>
      </div>
    </AbsoluteFill>
  );
};
