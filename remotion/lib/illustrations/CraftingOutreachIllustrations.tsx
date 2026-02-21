import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";

/**
 * Crafting Outreach Campaign — Illustrations V2
 *
 * 6 reusable templates + 4 unique components = 10 total.
 * Covers all 37 popup edit points across intro, mid-roll, and end sections.
 * Design: Clean vectors on white bg, subtle motion, Apple aesthetic.
 */

const ORANGE = "#FF6B00";
const BLACK = "#1A1A1A";
const GRAY = "#666666";
const LIGHT_GRAY = "#E5E7EB";
const GREEN = "#10B981";
const BLUE = "#0A66C2";
const RED = "#FF0000";
const FONT = "system-ui, -apple-system, sans-serif";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ICON PATH DATA — Clean minimal icons
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ICON_PATHS: Record<string, string> = {
  rocket:
    "M 0 -20 C 0 -34 12 -42 12 -42 C 12 -42 24 -34 24 -20 L 24 6 L 18 12 L 6 12 L 0 6 Z M 12 -28 A 4 4 0 1 0 12 -20 A 4 4 0 1 0 12 -28 M 2 14 L 8 14 L 8 22 L 2 22 Z M 16 14 L 22 14 L 22 22 L 16 22 Z",
  flag: "M 4 -24 L 4 24 M 4 -24 L 28 -14 L 4 -4",
  network:
    "M 0 0 A 8 8 0 1 0 0.01 0 M -20 -18 A 5 5 0 1 0 -19.99 -18 M 20 -18 A 5 5 0 1 0 20.01 -18 M -24 14 A 5 5 0 1 0 -23.99 14 M 24 14 A 5 5 0 1 0 24.01 14 M -3 -6 L -17 -15 M 3 -6 L 17 -15 M -6 4 L -20 11 M 6 4 L 20 11",
  lightbulb:
    "M 0 -24 C -14 -24 -16 -10 -10 -2 C -6 4 -6 8 -6 12 L 6 12 C 6 8 6 4 10 -2 C 16 -10 14 -24 0 -24 Z M -4 16 L 4 16 M -3 20 L 3 20",
  flask:
    "M -6 -24 L -6 -8 L -18 16 C -20 20 -18 24 -14 24 L 14 24 C 18 24 20 20 18 16 L 6 -8 L 6 -24 M -8 -24 L 8 -24 M -14 10 L 14 10",
  pen: "M -20 24 L -8 -20 L 8 -20 L 20 24 M -14 2 L 14 2 M 0 -20 L 0 -28",
  brain:
    "M 0 -20 C -12 -24 -22 -16 -22 -6 C -26 -4 -26 8 -20 12 C -20 20 -10 26 0 22 C 10 26 20 20 20 12 C 26 8 26 -4 22 -6 C 22 -16 12 -24 0 -20 M 0 -20 L 0 22 M -18 0 C -10 -4 -4 4 0 0 M 18 0 C 10 -4 4 4 0 0",
  power:
    "M 0 -24 L 0 0 M -12 -18 A 18 18 0 1 0 12 -18",
  question:
    "M -6 -16 C -6 -24 6 -24 6 -16 C 6 -10 0 -10 0 -2 M 0 6 A 2 2 0 1 0 0.01 6",
  check:
    "M -16 0 L -4 12 L 16 -12",
  share:
    "M 16 -16 A 6 6 0 1 0 16.01 -16 M 16 16 A 6 6 0 1 0 16.01 16 M -16 0 A 6 6 0 1 0 -15.99 0 M -10 -3 L 10 -13 M -10 3 L 10 13",
  people:
    "M -12 -10 A 8 8 0 1 0 -11.99 -10 M -22 12 C -22 2 -2 2 -2 12 M 12 -10 A 8 8 0 1 0 12.01 -10 M 2 12 C 2 2 22 2 22 12",
  link: "M -8 4 L -14 10 A 8 8 0 0 0 -2 22 L 4 16 M 8 -4 L 14 -10 A 8 8 0 0 0 2 -22 L -4 -16 M -6 6 L 6 -6",
  list: "M -18 -16 L -10 -16 M -18 0 L -10 0 M -18 16 L -10 16 M -4 -16 L 20 -16 M -4 0 L 20 0 M -4 16 L 20 16",
  chess:
    "M -6 -24 L -10 -16 L -2 -16 L -6 -8 L 6 -8 L 2 -16 L 10 -16 L 6 -24 Z M -10 -8 L 10 -8 M -14 24 L 14 24 M -10 -8 L -14 24 M 10 -8 L 14 24",
  infinity:
    "M 0 0 C -4 -12 -20 -12 -20 0 C -20 12 -4 12 0 0 C 4 -12 20 -12 20 0 C 20 12 4 12 0 0",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. ConceptBadge — Icon in circle + label text
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ConceptBadge: React.FC<{
  icon: string;
  label: string;
  sublabel?: string;
  color?: string;
  size?: number;
}> = ({ icon, label, sublabel, color = ORANGE, size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popIn = spring({
    frame: Math.max(0, frame - 3),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Subtle float
  const floatY = interpolate(frame, [0, 40, 80], [0, -4, 0], {
    extrapolateRight: "extend",
  });

  const iconPath = ICON_PATHS[icon] || ICON_PATHS.check;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <g
        transform={`translate(300, ${260 + floatY}) scale(${popIn})`}
        opacity={popIn}
      >
        {/* Outer glow */}
        <circle cx="0" cy="0" r="100" fill={color} opacity={0.08} />
        {/* Main circle */}
        <circle cx="0" cy="0" r="72" fill={color} opacity={0.15} />
        <circle cx="0" cy="0" r="56" fill={color} />
        {/* Icon */}
        <g transform="translate(-12, -12) scale(1.3)">
          <path
            d={iconPath}
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(12, 12)"
          />
        </g>
      </g>

      {/* Label */}
      <text
        x="300"
        y="400"
        textAnchor="middle"
        fontSize="32"
        fontWeight="800"
        fill={BLACK}
        fontFamily={FONT}
        letterSpacing="4"
        opacity={popIn}
      >
        {label}
      </text>

      {/* Sublabel */}
      {sublabel && (
        <text
          x="300"
          y="440"
          textAnchor="middle"
          fontSize="20"
          fontWeight="500"
          fill={GRAY}
          fontFamily={FONT}
          opacity={popIn * 0.8}
        >
          {sublabel}
        </text>
      )}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. MetricHighlight — Big animated number + label
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const MetricHighlight: React.FC<{
  value: string;
  label: string;
  color?: string;
  size?: number;
}> = ({ value, label, color = ORANGE, size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleIn = spring({
    frame: Math.max(0, frame - 4),
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 10, stiffness: 80 },
  });

  const labelReveal = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {/* Card background */}
      <rect
        x="80"
        y="140"
        width="440"
        height="320"
        rx="28"
        fill="white"
        stroke={LIGHT_GRAY}
        strokeWidth="2"
        opacity={scaleIn}
      />

      {/* Big value */}
      <g transform={`translate(300, 280) scale(${scaleIn})`}>
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="100"
          fontWeight="900"
          fill={color}
          fontFamily={FONT}
        >
          {value}
        </text>
      </g>

      {/* Accent line */}
      <rect
        x={300 - 60 * labelReveal}
        y="330"
        width={120 * labelReveal}
        height="4"
        rx="2"
        fill={color}
      />

      {/* Label below */}
      <text
        x="300"
        y="380"
        textAnchor="middle"
        fontSize="24"
        fontWeight="700"
        fill={GRAY}
        fontFamily={FONT}
        letterSpacing="4"
        opacity={labelReveal}
      >
        {label}
      </text>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. GrowthChart — Animated bar growing with multiplier
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const GrowthChart: React.FC<{
  label: string;
  multiplier?: number;
  size?: number;
}> = ({ label, multiplier = 2, size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bar1Height = spring({
    frame: Math.max(0, frame - 6),
    fps,
    from: 0,
    to: 120,
    config: { damping: 14, stiffness: 80 },
  });

  const bar2Height = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: 0,
    to: 120 * multiplier,
    config: { damping: 14, stiffness: 60 },
  });

  const textReveal = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  const barBottom = 400;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {/* Before bar */}
      <rect
        x="170"
        y={barBottom - bar1Height}
        width="80"
        height={bar1Height}
        rx="8"
        fill={LIGHT_GRAY}
      />
      <text
        x="210"
        y={barBottom + 30}
        textAnchor="middle"
        fontSize="16"
        fontWeight="600"
        fill={GRAY}
        fontFamily={FONT}
        opacity={textReveal}
      >
        BEFORE
      </text>

      {/* After bar */}
      <rect
        x="350"
        y={barBottom - bar2Height}
        width="80"
        height={bar2Height}
        rx="8"
        fill={ORANGE}
      />
      <text
        x="390"
        y={barBottom + 30}
        textAnchor="middle"
        fontSize="16"
        fontWeight="600"
        fill={ORANGE}
        fontFamily={FONT}
        opacity={textReveal}
      >
        AFTER
      </text>

      {/* Multiplier badge */}
      <g opacity={textReveal}>
        <rect
          x="335"
          y={barBottom - bar2Height - 50}
          width="110"
          height="40"
          rx="20"
          fill={ORANGE}
        />
        <text
          x="390"
          y={barBottom - bar2Height - 24}
          textAnchor="middle"
          fontSize="22"
          fontWeight="800"
          fill="white"
          fontFamily={FONT}
        >
          {multiplier}X
        </text>
      </g>

      {/* Label */}
      <text
        x="300"
        y="480"
        textAnchor="middle"
        fontSize="28"
        fontWeight="800"
        fill={BLACK}
        fontFamily={FONT}
        letterSpacing="3"
        opacity={textReveal}
      >
        {label}
      </text>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. SystemDiagram — Pipeline flow with connected steps
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SystemDiagram: React.FC<{
  steps?: number;
  highlightStep?: number;
  size?: number;
}> = ({ steps = 3, highlightStep, size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stepLabels = ["SETUP", "BUILD", "LAUNCH", "GROW"];
  const nodePositions = Array.from({ length: steps }, (_, i) => ({
    x: 100 + (400 / (steps - 1)) * i,
    y: 280,
  }));

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {/* Connecting lines */}
      {nodePositions.slice(0, -1).map((pos, i) => {
        const lineProgress = spring({
          frame: Math.max(0, frame - 8 - i * 8),
          fps,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 80 },
        });
        const next = nodePositions[i + 1];
        return (
          <line
            key={`line-${i}`}
            x1={pos.x + 30}
            y1={pos.y}
            x2={pos.x + 30 + (next.x - pos.x - 60) * lineProgress}
            y2={pos.y}
            stroke={ORANGE}
            strokeWidth="3"
            strokeDasharray="8 4"
            opacity={0.5}
          />
        );
      })}

      {/* Nodes */}
      {nodePositions.map((pos, i) => {
        const nodeScale = spring({
          frame: Math.max(0, frame - 4 - i * 6),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 100 },
        });

        const isHighlighted =
          highlightStep !== undefined ? i + 1 === highlightStep : false;

        return (
          <g
            key={`node-${i}`}
            transform={`translate(${pos.x}, ${pos.y}) scale(${nodeScale})`}
            opacity={nodeScale}
          >
            {/* Circle */}
            <circle
              cx="0"
              cy="0"
              r="30"
              fill={isHighlighted ? ORANGE : "white"}
              stroke={ORANGE}
              strokeWidth="3"
            />
            {/* Step number */}
            <text
              x="0"
              y="7"
              textAnchor="middle"
              fontSize="22"
              fontWeight="800"
              fill={isHighlighted ? "white" : ORANGE}
              fontFamily={FONT}
            >
              {i + 1}
            </text>
            {/* Label */}
            <text
              x="0"
              y="56"
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill={isHighlighted ? ORANGE : GRAY}
              fontFamily={FONT}
              letterSpacing="2"
            >
              {stepLabels[i] || `STEP ${i + 1}`}
            </text>
          </g>
        );
      })}

      {/* Title */}
      <text
        x="300"
        y="180"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill={BLACK}
        fontFamily={FONT}
        letterSpacing="3"
        opacity={spring({
          frame: Math.max(0, frame - 2),
          fps,
          from: 0,
          to: 1,
          config: { damping: 200 },
        })}
      >
        CAMPAIGN FLOW
      </text>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. PersonIntro — Name card with silhouette
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const PersonIntro: React.FC<{
  name: string;
  role?: string;
  size?: number;
}> = ({ name, role, size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    from: 0.85,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  const textReveal = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <g transform={`translate(300, 280) scale(${cardScale})`} opacity={cardScale}>
        {/* Card */}
        <rect
          x="-180"
          y="-100"
          width="360"
          height="200"
          rx="24"
          fill="white"
          stroke={ORANGE}
          strokeWidth="3"
        />

        {/* Avatar circle */}
        <circle cx="-90" cy="0" r="48" fill={ORANGE} opacity={0.12} />
        <circle cx="-90" cy="0" r="40" fill={ORANGE} />
        {/* Person silhouette */}
        <circle cx="-90" cy="-10" r="14" fill="white" />
        <path
          d="M -108 16 Q -108 2 -90 2 Q -72 2 -72 16 L -72 24 L -108 24 Z"
          fill="white"
        />

        {/* Name */}
        <text
          x="30"
          y="-10"
          textAnchor="middle"
          fontSize="36"
          fontWeight="800"
          fill={BLACK}
          fontFamily={FONT}
          opacity={textReveal}
        >
          {name}
        </text>

        {/* Role */}
        {role && (
          <text
            x="30"
            y="30"
            textAnchor="middle"
            fontSize="18"
            fontWeight="600"
            fill={ORANGE}
            fontFamily={FONT}
            letterSpacing="3"
            opacity={textReveal * 0.8}
          >
            {role}
          </text>
        )}
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. ChatBubbles — Animated conversation bubbles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ChatBubbles: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bubbles = [
    { x: 160, y: 200, w: 200, align: "left" as const, delay: 0 },
    { x: 240, y: 280, w: 240, align: "right" as const, delay: 8 },
    { x: 160, y: 360, w: 180, align: "left" as const, delay: 16 },
  ];

  // Live pulse indicator
  const pulse = interpolate(frame % 30, [0, 15, 30], [1, 0.3, 1]);

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {bubbles.map((b, i) => {
        const progress = spring({
          frame: Math.max(0, frame - b.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 100 },
        });

        const bx = b.align === "right" ? 600 - b.x - b.w : b.x;

        return (
          <g
            key={i}
            opacity={progress}
            transform={`translate(0, ${(1 - progress) * 15})`}
          >
            <rect
              x={bx}
              y={b.y}
              width={b.w}
              height="50"
              rx="25"
              fill={b.align === "right" ? ORANGE : LIGHT_GRAY}
            />
            {/* Text lines */}
            <rect
              x={bx + 20}
              y={b.y + 16}
              width={b.w * 0.6}
              height="6"
              rx="3"
              fill={b.align === "right" ? "white" : GRAY}
              opacity={0.5}
            />
            <rect
              x={bx + 20}
              y={b.y + 28}
              width={b.w * 0.35}
              height="6"
              rx="3"
              fill={b.align === "right" ? "white" : GRAY}
              opacity={0.3}
            />
          </g>
        );
      })}

      {/* Live indicator */}
      <circle cx="300" cy="160" r="8" fill={GREEN} opacity={pulse} />
      <text
        x="320"
        y="166"
        fontSize="16"
        fontWeight="700"
        fill={GREEN}
        fontFamily={FONT}
        letterSpacing="2"
      >
        LIVE REPLIES
      </text>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. YouTubeSubscribeCTA — Real YouTube logo + subscribe button
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const YouTubeSubscribeCTA: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: Math.max(0, frame - 4),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  const btnScale = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
      }}
    >
      {/* Real YouTube logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoScale,
        }}
      >
        <Img
          src={staticFile("logos/youtube.svg")}
          style={{ width: 120, height: 120 }}
        />
      </div>

      {/* Subscribe button */}
      <div
        style={{
          transform: `scale(${btnScale})`,
          opacity: btnScale,
          backgroundColor: RED,
          borderRadius: 28,
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 3,
            fontFamily: FONT,
          }}
        >
          SUBSCRIBE
        </span>
      </div>

      {/* Sub-text */}
      <div
        style={{
          opacity: btnScale * 0.7,
          fontSize: 18,
          fontWeight: 500,
          color: GRAY,
          fontFamily: FONT,
        }}
      >
        Leave a like & subscribe
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. LinkedInConnectCTA — Real LinkedIn logo + connect button
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const LinkedInConnectCTA: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: Math.max(0, frame - 4),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  const btnScale = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
      }}
    >
      {/* Real LinkedIn logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoScale,
        }}
      >
        <Img
          src={staticFile("logos/linkedin.svg")}
          style={{ width: 120, height: 120 }}
        />
      </div>

      {/* Connect button */}
      <div
        style={{
          transform: `scale(${btnScale})`,
          opacity: btnScale,
          backgroundColor: BLUE,
          borderRadius: 28,
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 3,
            fontFamily: FONT,
          }}
        >
          CONNECT
        </span>
      </div>

      {/* Sub-text */}
      <div
        style={{
          opacity: btnScale * 0.7,
          fontSize: 18,
          fontWeight: 500,
          color: GRAY,
          fontFamily: FONT,
        }}
      >
        Connect on LinkedIn
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. ZoneOfGeniusIcon — Spotlight/halo effect
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ZoneOfGeniusIcon: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowExpand = spring({
    frame: Math.max(0, frame - 4),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 60 },
  });

  const personReveal = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Subtle pulse
  const pulseSc = interpolate(frame, [0, 30, 60], [1, 1.04, 1], {
    extrapolateRight: "extend",
  });

  // Rays
  const rayCount = 12;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {/* Glow rings */}
      <circle
        cx="300"
        cy="280"
        r={160 * glowExpand}
        fill={ORANGE}
        opacity={0.06}
      />
      <circle
        cx="300"
        cy="280"
        r={120 * glowExpand}
        fill={ORANGE}
        opacity={0.1}
      />
      <circle
        cx="300"
        cy="280"
        r={80 * glowExpand}
        fill={ORANGE}
        opacity={0.15}
      />

      {/* Radiating rays */}
      {Array.from({ length: rayCount }).map((_, i) => {
        const angle = (i / rayCount) * Math.PI * 2;
        const rayProgress = spring({
          frame: Math.max(0, frame - 6 - i * 1.5),
          fps,
          from: 0,
          to: 1,
          config: { damping: 20, stiffness: 60 },
        });
        const inner = 70;
        const outer = inner + 50 * rayProgress;
        return (
          <line
            key={i}
            x1={300 + Math.cos(angle) * inner}
            y1={280 + Math.sin(angle) * inner}
            x2={300 + Math.cos(angle) * outer}
            y2={280 + Math.sin(angle) * outer}
            stroke={ORANGE}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity={rayProgress * 0.4}
          />
        );
      })}

      {/* Person silhouette */}
      <g
        transform={`translate(300, 270) scale(${personReveal * pulseSc})`}
        opacity={personReveal}
      >
        <circle cx="0" cy="-18" r="22" fill={ORANGE} />
        <path
          d="M -28 22 Q -28 2 0 2 Q 28 2 28 22 L 28 36 L -28 36 Z"
          fill={ORANGE}
        />
      </g>

      {/* Label */}
      <text
        x="300"
        y="430"
        textAnchor="middle"
        fontSize="24"
        fontWeight="800"
        fill={BLACK}
        fontFamily={FONT}
        letterSpacing="4"
        opacity={personReveal}
      >
        ZONE OF GENIUS
      </text>
      <text
        x="300"
        y="465"
        textAnchor="middle"
        fontSize="18"
        fontWeight="500"
        fill={GRAY}
        fontFamily={FONT}
        opacity={personReveal * 0.7}
      >
        Focus on what you do best
      </text>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. CampaignBrainIcon — Neural network with central brain
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CampaignBrainIcon: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central brain pulse
  const brainScale = spring({
    frame: Math.max(0, frame - 2),
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 10, stiffness: 80 },
  });

  const pulse = interpolate(frame, [0, 25, 50], [1, 1.05, 1], {
    extrapolateRight: "extend",
  });

  // Satellite nodes
  const nodes = [
    { x: 140, y: 180, label: "COPY", delay: 8 },
    { x: 460, y: 180, label: "LEADS", delay: 10 },
    { x: 140, y: 400, label: "DATA", delay: 12 },
    { x: 460, y: 400, label: "SEND", delay: 14 },
    { x: 300, y: 120, label: "BRAIN", delay: 6 },
    { x: 300, y: 460, label: "LEARN", delay: 16 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {/* Connection lines from center to nodes */}
      {nodes.map((node, i) => {
        const lineProgress = spring({
          frame: Math.max(0, frame - node.delay + 2),
          fps,
          from: 0,
          to: 1,
          config: { damping: 18, stiffness: 60 },
        });

        return (
          <line
            key={`line-${i}`}
            x1="300"
            y1="290"
            x2={300 + (node.x - 300) * lineProgress}
            y2={290 + (node.y - 290) * lineProgress}
            stroke={ORANGE}
            strokeWidth="2"
            strokeDasharray="6 3"
            opacity={lineProgress * 0.4}
          />
        );
      })}

      {/* Central brain */}
      <g
        transform={`translate(300, 290) scale(${brainScale * pulse})`}
        opacity={brainScale}
      >
        <circle cx="0" cy="0" r="60" fill={ORANGE} opacity={0.12} />
        <circle cx="0" cy="0" r="44" fill={ORANGE} />
        {/* Brain icon */}
        <g transform="scale(1.2)">
          <path
            d={ICON_PATHS.brain}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>

      {/* Satellite nodes */}
      {nodes.map((node, i) => {
        const nodeProgress = spring({
          frame: Math.max(0, frame - node.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 100 },
        });

        return (
          <g
            key={`node-${i}`}
            transform={`translate(${node.x}, ${node.y}) scale(${nodeProgress})`}
            opacity={nodeProgress}
          >
            <circle cx="0" cy="0" r="28" fill="white" stroke={ORANGE} strokeWidth="2.5" />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={ORANGE}
              fontFamily={FONT}
              letterSpacing="1"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
