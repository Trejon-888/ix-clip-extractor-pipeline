/**
 * Crafting Outreach -- Mid-Roll Illustrations (Sack Case Study)
 *
 * 10 UNIQUE illustration components for the Sack renovation business
 * case study section. Each is a completely different visual scene
 * with distinct motion design. Designed for white ConceptOverlay backgrounds.
 *
 * V2 pattern: useCurrentFrame() + spring() + interpolate() for motion.
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";

const ORANGE = "#FF6B00";
const BLACK = "#1A1A1A";
const GRAY = "#666666";
const LIGHT_GRAY = "#E5E7EB";
const GREEN = "#10B981";
const BLUE = "#0A66C2";
const DARK_GREEN = "#059669";
const FONT = "system-ui, -apple-system, sans-serif";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. SackIntroCard -- Premium vertical introduction card
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SackIntroCard: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card rises from bottom
  const cardY = spring({
    frame,
    fps,
    from: 300,
    to: 0,
    config: { damping: 14, stiffness: 100 },
  });

  // Hardhat icon appears
  const hatPop = spring({
    frame: Math.max(0, frame - 4),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });

  // "SACK" text scale
  const namePop = spring({
    frame: Math.max(0, frame - 6),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });

  // Divider line draws from center outward
  const dividerWidth = interpolate(frame, [10, 16], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stat badges pop
  const badge1Pop = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 140 },
  });
  const badge2Pop = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 140 },
  });

  // Verified checkmark pop
  const checkPop = spring({
    frame: Math.max(0, frame - 16),
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 160 },
  });

  // Subtle card tilt oscillation after frame 20
  const tilt =
    frame >= 20
      ? interpolate(
          (frame - 20) % 60,
          [0, 15, 30, 45, 60],
          [0, 1, 0, -1, 0],
          { extrapolateRight: "clamp" }
        )
      : 0;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g transform={`translate(300, ${100 + cardY}) rotate(${tilt})`}>
        {/* Card background */}
        <rect
          x="-160"
          y="0"
          width="320"
          height="400"
          rx="20"
          fill="white"
        />
        {/* Card shadow */}
        <rect
          x="-155"
          y="8"
          width="310"
          height="400"
          rx="20"
          fill={BLACK}
          opacity={0.06}
        />
        {/* Card border */}
        <rect
          x="-160"
          y="0"
          width="320"
          height="400"
          rx="20"
          fill="white"
          stroke={LIGHT_GRAY}
          strokeWidth="1.5"
        />

        {/* Real headshot at top */}
        <g
          transform={`translate(0, 75) scale(${hatPop})`}
          opacity={hatPop}
        >
          <defs>
            <clipPath id="sac-headshot-clip">
              <circle cx="0" cy="0" r="50" />
            </clipPath>
          </defs>
          <circle cx="0" cy="0" r="53" fill={ORANGE} opacity={0.2} />
          <circle cx="0" cy="0" r="51" stroke={ORANGE} strokeWidth="3" fill="none" />
          <foreignObject x="-50" y="-50" width="100" height="100" clipPath="url(#sac-headshot-clip)">
            <Img
              src={staticFile("headshots/zach-headshot.png")}
              style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%" }}
            />
          </foreignObject>
        </g>

        {/* "SAC" text */}
        <g transform={`translate(0, 160) scale(${namePop})`}>
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill={BLACK}
            fontSize="56"
            fontWeight="900"
            fontFamily={FONT}
            letterSpacing="6"
          >
            ZACH
          </text>
        </g>

        {/* Divider line */}
        <rect
          x={-dividerWidth / 2}
          y="175"
          width={dividerWidth}
          height="3"
          rx="1.5"
          fill={LIGHT_GRAY}
        />

        {/* Stat badges */}
        <g transform={`translate(-55, 220) scale(${badge1Pop})`} opacity={badge1Pop}>
          <rect x="-55" y="-14" width="110" height="28" rx="14" fill="#F3F4F6" />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill={GRAY}
            fontSize="11"
            fontWeight="700"
            fontFamily={FONT}
            letterSpacing="2"
          >
            RENOVATION
          </text>
        </g>

        <g transform={`translate(55, 220) scale(${badge2Pop})`} opacity={badge2Pop}>
          <rect x="-45" y="-14" width="90" height="28" rx="14" fill={ORANGE} opacity={0.12} />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill={ORANGE}
            fontSize="11"
            fontWeight="700"
            fontFamily={FONT}
            letterSpacing="2"
          >
            PARTNER
          </text>
        </g>

        {/* Verified checkmark badge */}
        <g transform={`translate(130, 20) scale(${checkPop})`} opacity={checkPop}>
          <circle cx="0" cy="0" r="16" fill={GREEN} />
          <path
            d="M -6 0 L -2 5 L 7 -5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. DoubledRevenueGrowth -- HERO -- Split-screen before/after story
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DoubledRevenueGrowth: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Left house draw (before)
  const leftHouseDraw = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leftHousePerimeter = 400;

  // Left dollar sign
  const leftDollarOp = interpolate(frame, [4, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Left crew text
  const leftCrewOp = interpolate(frame, [8, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Center divider
  const dividerDraw = interpolate(frame, [6, 12], [0, 340], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right houses draw (after)
  const rightHouseDraw = interpolate(frame, [8, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right dollar signs
  const rightDollarPop = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 100 },
  });

  // Right crew text
  const rightCrewOp = interpolate(frame, [16, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2X badge pop
  const badgePop = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 100 },
  });

  // Curved arrow over top
  const arrowDraw = interpolate(frame, [20, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrowPathLen = 300;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* BEFORE label */}
      <text
        x="160"
        y="100"
        textAnchor="middle"
        fill="#9CA3AF"
        fontSize="14"
        fontWeight="700"
        fontFamily={FONT}
        letterSpacing="3"
        opacity={leftHouseDraw}
      >
        BEFORE
      </text>

      {/* AFTER label */}
      <text
        x="440"
        y="100"
        textAnchor="middle"
        fill={ORANGE}
        fontSize="14"
        fontWeight="700"
        fontFamily={FONT}
        letterSpacing="3"
        opacity={rightHouseDraw}
      >
        AFTER
      </text>

      {/* LEFT: Small house (grayscale) */}
      <g opacity={leftHouseDraw}>
        {/* House body */}
        <rect
          x="115"
          y="220"
          width="90"
          height="80"
          rx="4"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2.5"
          strokeDasharray={leftHousePerimeter}
          strokeDashoffset={leftHousePerimeter * (1 - leftHouseDraw)}
        />
        {/* Roof */}
        <path
          d="M 105 220 L 160 170 L 215 220"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Door */}
        <rect x="145" y="260" width="30" height="40" rx="3" fill="#D1D5DB" />
        {/* Window */}
        <rect x="125" y="235" width="20" height="18" rx="2" fill="#D1D5DB" />
      </g>

      {/* Dollar sign (before) */}
      <text
        x="160"
        y="340"
        textAnchor="middle"
        fill="#9CA3AF"
        fontSize="32"
        fontWeight="800"
        fontFamily={FONT}
        opacity={leftDollarOp}
      >
        $
      </text>

      {/* 1 CREW */}
      <text
        x="160"
        y="375"
        textAnchor="middle"
        fill="#9CA3AF"
        fontSize="13"
        fontWeight="600"
        fontFamily={FONT}
        letterSpacing="2"
        opacity={leftCrewOp}
      >
        1 CREW
      </text>

      {/* Center divider */}
      <line
        x1="300"
        y1={300 - dividerDraw / 2}
        x2="300"
        y2={300 + dividerDraw / 2}
        stroke={LIGHT_GRAY}
        strokeWidth="2"
        strokeDasharray="6 4"
      />

      {/* RIGHT: Two houses (vibrant orange) */}
      <g opacity={rightHouseDraw}>
        {/* House 1 */}
        <rect
          x="370"
          y="200"
          width="100"
          height="90"
          rx="4"
          fill="none"
          stroke={ORANGE}
          strokeWidth="2.5"
        />
        <path
          d="M 360 200 L 420 145 L 480 200"
          fill="none"
          stroke={ORANGE}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="400" y="245" width="30" height="45" rx="3" fill={ORANGE} opacity={0.3} />
        <rect x="380" y="215" width="20" height="18" rx="2" fill={ORANGE} opacity={0.3} />
        <rect x="440" y="215" width="20" height="18" rx="2" fill={ORANGE} opacity={0.3} />

        {/* House 2 (smaller, offset) */}
        <rect
          x="400"
          y="300"
          width="80"
          height="70"
          rx="4"
          fill="none"
          stroke={ORANGE}
          strokeWidth="2"
        />
        <path
          d="M 392 300 L 440 260 L 488 300"
          fill="none"
          stroke={ORANGE}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="425" y="330" width="24" height="40" rx="3" fill={ORANGE} opacity={0.25} />
      </g>

      {/* Dollar signs (after) - spring bounce */}
      <g transform={`translate(440, 410) scale(${rightDollarPop})`}>
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fill={ORANGE}
          fontSize="42"
          fontWeight="900"
          fontFamily={FONT}
        >
          $$
        </text>
      </g>

      {/* 3 CREWS */}
      <text
        x="440"
        y="450"
        textAnchor="middle"
        fill={ORANGE}
        fontSize="13"
        fontWeight="700"
        fontFamily={FONT}
        letterSpacing="2"
        opacity={rightCrewOp}
      >
        3 CREWS
      </text>

      {/* 2X badge at center divider intersection */}
      <g transform={`translate(300, 300) scale(${badgePop})`}>
        <circle cx="0" cy="0" r="34" fill={ORANGE} />
        <text
          x="0"
          y="11"
          textAnchor="middle"
          fill="white"
          fontSize="30"
          fontWeight="900"
          fontFamily={FONT}
        >
          2X
        </text>
      </g>

      {/* Curved arrow over the top (transformation arc) */}
      <path
        d="M 170 120 Q 300 50 430 120"
        fill="none"
        stroke={ORANGE}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={arrowPathLen}
        strokeDashoffset={arrowPathLen * (1 - arrowDraw)}
        opacity={arrowDraw}
      />
      {/* Arrowhead */}
      <g opacity={arrowDraw > 0.9 ? 1 : 0}>
        <path
          d="M 420 126 L 434 118 L 424 110"
          fill="none"
          stroke={ORANGE}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. AICircuitBoard -- Circuit board with AI brain at center
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const AICircuitBoard: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grid traces draw
  const gridDraw = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Small chip nodes pop at intersections
  const chipNodes = [
    { x: 150, y: 150, delay: 4 },
    { x: 450, y: 150, delay: 6 },
    { x: 150, y: 450, delay: 8 },
    { x: 450, y: 450, delay: 10 },
  ];

  // Central AI chip
  const centralPop = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Orange trace highlight radiating from center
  const traceHighlight = interpolate(frame, [10, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Data dot travel positions (traveling toward center)
  const dataDots = [
    { startX: 150, startY: 150, delay: 14 },
    { startX: 450, startY: 150, delay: 16 },
    { startX: 150, startY: 450, delay: 18 },
    { startX: 450, startY: 450, delay: 20 },
  ];

  // Central chip pulse
  const centralPulse =
    frame >= 20
      ? interpolate(frame % 30, [0, 15, 30], [1.0, 1.03, 1.0], {
          extrapolateRight: "clamp",
        })
      : 1.0;

  // Horizontal traces
  const hLines = [150, 225, 300, 375, 450];
  // Vertical traces
  const vLines = [150, 225, 300, 375, 450];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Grid of circuit traces */}
      {hLines.map((y, i) => (
        <line
          key={`h-${i}`}
          x1={100}
          y1={y}
          x2={100 + 400 * gridDraw}
          y2={y}
          stroke={LIGHT_GRAY}
          strokeWidth="1"
          opacity={0.6}
        />
      ))}
      {vLines.map((x, i) => (
        <line
          key={`v-${i}`}
          x1={x}
          y1={100}
          x2={x}
          y2={100 + 400 * gridDraw}
          stroke={LIGHT_GRAY}
          strokeWidth="1"
          opacity={0.6}
        />
      ))}

      {/* Orange highlighted traces from center to chip nodes */}
      {chipNodes.map((node, i) => {
        const pathD =
          i === 0
            ? "M 300 300 L 150 300 L 150 150"
            : i === 1
              ? "M 300 300 L 450 300 L 450 150"
              : i === 2
                ? "M 300 300 L 150 300 L 150 450"
                : "M 300 300 L 450 300 L 450 450";
        const pathLen = 300;
        return (
          <path
            key={`trace-${i}`}
            d={pathD}
            fill="none"
            stroke={ORANGE}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLen}
            strokeDashoffset={pathLen * (1 - traceHighlight)}
            opacity={traceHighlight * 0.8}
          />
        );
      })}

      {/* Small chip nodes at intersections */}
      {chipNodes.map((node, i) => {
        const nodePop = spring({
          frame: Math.max(0, frame - node.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 140 },
        });
        return (
          <g
            key={`node-${i}`}
            transform={`translate(${node.x}, ${node.y}) scale(${nodePop})`}
            opacity={nodePop}
          >
            <rect
              x="-16"
              y="-16"
              width="32"
              height="32"
              rx="4"
              fill="#F3F4F6"
              stroke={LIGHT_GRAY}
              strokeWidth="1.5"
            />
          </g>
        );
      })}

      {/* Data dots traveling toward center */}
      {dataDots.map((dot, i) => {
        const dotProgress = interpolate(
          frame,
          [dot.delay, dot.delay + 12],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const dotX = interpolate(dotProgress, [0, 1], [dot.startX, 300]);
        const dotY = interpolate(dotProgress, [0, 1], [dot.startY, 300]);
        return (
          <circle
            key={`dot-${i}`}
            cx={dotX}
            cy={dotY}
            r="5"
            fill={ORANGE}
            opacity={dotProgress > 0 && dotProgress < 1 ? 0.9 : 0}
          />
        );
      })}

      {/* Central AI chip */}
      <g
        transform={`translate(300, 300) scale(${centralPop * centralPulse})`}
      >
        <rect
          x="-44"
          y="-44"
          width="88"
          height="88"
          rx="12"
          fill={ORANGE}
        />
        {/* Chip pins */}
        {[-24, -8, 8, 24].map((offset) => (
          <React.Fragment key={`pins-${offset}`}>
            <rect
              x={offset - 3}
              y="-52"
              width="6"
              height="10"
              rx="2"
              fill={ORANGE}
              opacity={0.6}
            />
            <rect
              x={offset - 3}
              y="42"
              width="6"
              height="10"
              rx="2"
              fill={ORANGE}
              opacity={0.6}
            />
            <rect
              x="-52"
              y={offset - 3}
              width="10"
              height="6"
              rx="2"
              fill={ORANGE}
              opacity={0.6}
            />
            <rect
              x="42"
              y={offset - 3}
              width="10"
              height="6"
              rx="2"
              fill={ORANGE}
              opacity={0.6}
            />
          </React.Fragment>
        ))}
        <text
          x="0"
          y="12"
          textAnchor="middle"
          fill="white"
          fontSize="34"
          fontWeight="900"
          fontFamily={FONT}
        >
          AI
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. Revenue90KCounter -- HERO -- Premium animated revenue counter
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const Revenue90KCounter: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Display frame entrance
  const framePop = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // Dollar sign appears
  const dollarOp = interpolate(frame, [4, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Counter animation
  const count = Math.min(
    90000,
    Math.round(
      interpolate(frame, [8, 28], [0, 90000], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );
  const formatted = count.toLocaleString("en-US");

  // Timeline bar fill
  const timelineFill = interpolate(frame, [20, 28], [0, 280], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "3 MONTHS" label
  const monthsOp = interpolate(frame, [24, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Green arrow + badge pop
  const arrowPop = spring({
    frame: Math.max(0, frame - 24),
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 140 },
  });

  // Shimmer sweep after frame 28
  const shimmerX =
    frame >= 28
      ? interpolate(frame, [28, 40], [-200, 400], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : -200;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <clipPath id="counter-clip">
          <rect x="100" y="140" width="400" height="160" rx="16" />
        </clipPath>
        <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Display frame */}
      <g transform={`translate(300, 300) scale(${framePop})`}>
        {/* Frame background */}
        <rect
          x="-210"
          y="-160"
          width="420"
          height="160"
          rx="16"
          fill="white"
          stroke={LIGHT_GRAY}
          strokeWidth="2"
        />

        {/* Dollar sign */}
        <text
          x="-170"
          y="-50"
          textAnchor="start"
          fill={ORANGE}
          fontSize="80"
          fontWeight="900"
          fontFamily={FONT}
          opacity={dollarOp}
        >
          $
        </text>

        {/* Counter number */}
        <text
          x="-90"
          y="-50"
          textAnchor="start"
          fill={BLACK}
          fontSize="72"
          fontWeight="900"
          fontFamily={FONT}
          letterSpacing="4"
        >
          {formatted}
        </text>

        {/* Shimmer sweep */}
        <rect
          x={shimmerX - 210}
          y="-160"
          width="100"
          height="160"
          fill="url(#shimmer)"
          clipPath="url(#counter-clip)"
        />

        {/* Green UP arrow + badge */}
        <g
          transform={`translate(170, -140) scale(${arrowPop})`}
          opacity={arrowPop}
        >
          <rect x="-45" y="-14" width="90" height="28" rx="14" fill={GREEN} />
          <path
            d="M -24 4 L -24 -4 L -28 0 M -24 -4 L -20 0"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <text
            x="8"
            y="5"
            textAnchor="middle"
            fill="white"
            fontSize="13"
            fontWeight="800"
            fontFamily={FONT}
          >
            +$90K
          </text>
        </g>

        {/* Timeline bar below */}
        <rect
          x="-140"
          y="30"
          width="280"
          height="10"
          rx="5"
          fill="#F3F4F6"
        />
        <rect
          x="-140"
          y="30"
          width={timelineFill}
          height="10"
          rx="5"
          fill={ORANGE}
        />

        {/* "3 MONTHS" label */}
        <text
          x={-140 + timelineFill + 10}
          y="42"
          textAnchor="start"
          fill={GRAY}
          fontSize="12"
          fontWeight="700"
          fontFamily={FONT}
          letterSpacing="1"
          opacity={monthsOp}
        >
          3 MONTHS
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. ResellFlywheel -- Self-sustaining business cycle flywheel
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ResellFlywheel: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central circle draws
  const hubDraw = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hubPerimeter = 2 * Math.PI * 50;

  // Three curved arrows staggered draw
  const arrow1Draw = interpolate(frame, [4, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrow2Draw = interpolate(frame, [7, 13], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrow3Draw = interpolate(frame, [10, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arcLen = 180;

  // Labels spring in
  const label1Pop = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });
  const label2Pop = spring({
    frame: Math.max(0, frame - 13),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });
  const label3Pop = spring({
    frame: Math.max(0, frame - 16),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });

  // Slow continuous rotation after frame 14
  const rotation =
    frame >= 14
      ? interpolate(frame - 14, [0, 720], [0, 360], {
          extrapolateRight: "extend",
        })
      : 0;

  // Center hub text
  const hubTextPop = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 140 },
  });

  // Sparkle effects at arrow tips
  const sparkles = [
    { angle: 30, delay: 18 },
    { angle: 150, delay: 22 },
    { angle: 270, delay: 26 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g transform={`translate(300, 300) rotate(${rotation})`}>
        {/* Central hub circle */}
        <circle
          cx="0"
          cy="0"
          r="50"
          fill="white"
          stroke={LIGHT_GRAY}
          strokeWidth="2"
          strokeDasharray={hubPerimeter}
          strokeDashoffset={hubPerimeter * (1 - hubDraw)}
        />

        {/* Arrow 1: BUILD (top-right arc) */}
        <path
          d="M 50 -87 A 100 100 0 0 1 100 0"
          fill="none"
          stroke={ORANGE}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={arcLen}
          strokeDashoffset={arcLen * (1 - arrow1Draw)}
        />
        {/* Arrowhead 1 */}
        <g opacity={arrow1Draw > 0.8 ? 1 : 0}>
          <polygon points="98,-10 108,4 88,4" fill={ORANGE} />
        </g>

        {/* Arrow 2: SELL (bottom arc) */}
        <path
          d="M 87 50 A 100 100 0 0 1 -87 50"
          fill="none"
          stroke={ORANGE}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={arcLen}
          strokeDashoffset={arcLen * (1 - arrow2Draw)}
        />
        <g opacity={arrow2Draw > 0.8 ? 1 : 0}>
          <polygon points="-80,58 -94,42 -74,42" fill={ORANGE} />
        </g>

        {/* Arrow 3: SCALE (left arc) */}
        <path
          d="M -100 0 A 100 100 0 0 1 -50 -87"
          fill="none"
          stroke={ORANGE}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={arcLen}
          strokeDashoffset={arcLen * (1 - arrow3Draw)}
        />
        <g opacity={arrow3Draw > 0.8 ? 1 : 0}>
          <polygon points="-42,-84 -56,-98 -56,-78" fill={ORANGE} />
        </g>

        {/* Labels at arrow midpoints */}
        <g transform="rotate(0)" opacity={label1Pop}>
          <text
            x="115"
            y="-50"
            textAnchor="middle"
            fill={BLACK}
            fontSize="16"
            fontWeight="800"
            fontFamily={FONT}
            letterSpacing="2"
            transform={`rotate(${-rotation}, 115, -50)`}
          >
            BUILD
          </text>
        </g>
        <g opacity={label2Pop}>
          <text
            x="0"
            y="130"
            textAnchor="middle"
            fill={BLACK}
            fontSize="16"
            fontWeight="800"
            fontFamily={FONT}
            letterSpacing="2"
            transform={`rotate(${-rotation}, 0, 130)`}
          >
            SELL
          </text>
        </g>
        <g opacity={label3Pop}>
          <text
            x="-115"
            y="-50"
            textAnchor="middle"
            fill={BLACK}
            fontSize="16"
            fontWeight="800"
            fontFamily={FONT}
            letterSpacing="2"
            transform={`rotate(${-rotation}, -115, -50)`}
          >
            SCALE
          </text>
        </g>

        {/* Sparkles at arrow tips */}
        {sparkles.map((sp, i) => {
          const spPop = spring({
            frame: Math.max(0, frame - sp.delay),
            fps,
            from: 0,
            to: 1,
            config: { damping: 8, stiffness: 200 },
          });
          const spPulse = interpolate(
            (frame + i * 10) % 20,
            [0, 10, 20],
            [0.4, 1, 0.4],
            { extrapolateRight: "clamp" }
          );
          const rad = (sp.angle * Math.PI) / 180;
          const sx = Math.cos(rad) * 105;
          const sy = Math.sin(rad) * 105;
          return (
            <circle
              key={`sp-${i}`}
              cx={sx}
              cy={sy}
              r={5 * spPop}
              fill={ORANGE}
              opacity={spPop * spPulse * 0.7}
            />
          );
        })}
      </g>

      {/* Center hub text (counter-rotated to stay upright) */}
      <g
        transform={`translate(300, 300) scale(${hubTextPop})`}
        opacity={hubTextPop}
      >
        <text
          x="0"
          y="8"
          textAnchor="middle"
          fill={ORANGE}
          fontSize="20"
          fontWeight="900"
          fontFamily={FONT}
          letterSpacing="2"
        >
          RESELL
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. DoubleBookingsCalendar -- Before/After calendar comparison
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DoubleBookingsCalendar: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Layout constants for two side-by-side mini calendars
  const cols = 5;
  const rows = 4;
  const cellSize = 28;
  const cellGap = 4;
  const calW = cols * cellSize + (cols - 1) * cellGap;
  const calH = rows * cellSize + (rows - 1) * cellGap;

  // Positions for the two calendars (centered with gap between)
  const calSpacing = 52;
  const leftCalX = 300 - calW - calSpacing / 2;
  const rightCalX = 300 + calSpacing / 2;
  const calTopY = 220;

  // ─── Phase 1: Cards slide in ───
  const leftCardPop = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const rightCardPop = spring({
    frame: Math.max(0, frame - 3),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // ─── Phase 2: Labels appear ───
  const beforeLabelOp = interpolate(frame, [4, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const afterLabelOp = interpolate(frame, [6, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ─── Phase 3: Before calendar - sparse bookings (only 4 out of 20) ───
  const beforeBookedCells = [2, 7, 12, 18];

  // ─── Phase 4: After calendar - packed bookings (16 out of 20) ───
  const afterBookedCells = [0, 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18];

  // ─── Phase 5: 2X badge between calendars ───
  const badgePop = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 120 },
  });

  // ─── Phase 6: Arrow from left to right ───
  const arrowDraw = interpolate(frame, [22, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrowPathLen = 80;

  // ─── Phase 7: Subtle glow pulse on the right calendar after full ───
  const glowPulse =
    frame >= 28
      ? interpolate((frame - 28) % 40, [0, 20, 40], [0.04, 0.1, 0.04], {
          extrapolateRight: "clamp",
        })
      : 0;

  // Helper: render a mini calendar grid
  const renderCalendar = (
    originX: number,
    originY: number,
    bookedCells: number[],
    isAfterCal: boolean,
    parentPop: number,
  ) => {
    const cells = [];
    for (let idx = 0; idx < rows * cols; idx++) {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const cx = originX + col * (cellSize + cellGap);
      const cy = originY + row * (cellSize + cellGap);
      const isBooked = bookedCells.includes(idx);

      // Stagger booking fills
      let fillProgress = 0;
      if (isBooked) {
        const bookIdx = bookedCells.indexOf(idx);
        const baseDelay = isAfterCal ? 10 : 6;
        fillProgress = spring({
          frame: Math.max(0, frame - baseDelay - bookIdx * 1.2),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 140 },
        });
      }

      const bookedColor = isAfterCal ? ORANGE : "#9CA3AF";
      const bookedBg = isAfterCal
        ? `rgba(255, 107, 0, ${0.15 + fillProgress * 0.85})`
        : `rgba(156, 163, 175, ${0.1 + fillProgress * 0.35})`;

      cells.push(
        <g key={`cell-${isAfterCal ? "r" : "l"}-${idx}`} opacity={parentPop}>
          {/* Cell background */}
          <rect
            x={cx}
            y={cy}
            width={cellSize}
            height={cellSize}
            rx={6}
            fill={isBooked && fillProgress > 0.05 ? bookedBg : "#F9FAFB"}
            stroke={isBooked && fillProgress > 0.3 ? bookedColor : "#E5E7EB"}
            strokeWidth={isBooked && fillProgress > 0.3 ? 1.5 : 0.75}
          />
          {/* Checkmark inside booked cells */}
          {isBooked && fillProgress > 0.5 && (
            <g opacity={fillProgress}>
              <path
                d={`M ${cx + 8} ${cy + cellSize / 2} L ${cx + 12} ${cy + cellSize / 2 + 4} L ${cx + 20} ${cy + cellSize / 2 - 4}`}
                fill="none"
                stroke={isAfterCal ? ORANGE : "#9CA3AF"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}
        </g>,
      );
    }
    return cells;
  };

  // Day-of-week labels
  const dayLabels = ["M", "T", "W", "T", "F"];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000" floodOpacity="0.06" />
        </filter>
        <filter id="badge-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={ORANGE} floodOpacity="0.25" />
        </filter>
      </defs>

      {/* ─── LEFT CARD: "Before" ─── */}
      <g opacity={leftCardPop} transform={`translate(0, ${20 * (1 - leftCardPop)})`}>
        {/* Card container */}
        <rect
          x={leftCalX - 18}
          y={150}
          width={calW + 36}
          height={calH + 120}
          rx={16}
          fill="white"
          stroke="#E5E7EB"
          strokeWidth={1.5}
          filter="url(#card-shadow)"
        />

        {/* BEFORE label */}
        <text
          x={leftCalX + calW / 2}
          y={180}
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize={13}
          fontWeight={700}
          fontFamily={FONT}
          letterSpacing={2.5}
          opacity={beforeLabelOp}
        >
          BEFORE
        </text>

        {/* Day-of-week headers */}
        {dayLabels.map((d, i) => (
          <text
            key={`dl-${i}`}
            x={leftCalX + i * (cellSize + cellGap) + cellSize / 2}
            y={206}
            textAnchor="middle"
            fill="#9CA3AF"
            fontSize={9}
            fontWeight={600}
            fontFamily={FONT}
            opacity={beforeLabelOp}
          >
            {d}
          </text>
        ))}

        {/* Calendar grid */}
        {renderCalendar(leftCalX, calTopY, beforeBookedCells, false, leftCardPop)}

        {/* Booking count */}
        <text
          x={leftCalX + calW / 2}
          y={calTopY + calH + 30}
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize={22}
          fontWeight={800}
          fontFamily={FONT}
          opacity={beforeLabelOp}
        >
          4
        </text>
        <text
          x={leftCalX + calW / 2}
          y={calTopY + calH + 46}
          textAnchor="middle"
          fill="#C0C4CC"
          fontSize={9}
          fontWeight={600}
          fontFamily={FONT}
          letterSpacing={1.5}
          opacity={beforeLabelOp}
        >
          BOOKINGS
        </text>
      </g>

      {/* ─── RIGHT CARD: "After" ─── */}
      <g opacity={rightCardPop} transform={`translate(0, ${20 * (1 - rightCardPop)})`}>
        {/* Orange glow behind the right card */}
        <rect
          x={rightCalX - 22}
          y={146}
          width={calW + 44}
          height={calH + 128}
          rx={20}
          fill={ORANGE}
          opacity={glowPulse}
        />

        {/* Card container */}
        <rect
          x={rightCalX - 18}
          y={150}
          width={calW + 36}
          height={calH + 120}
          rx={16}
          fill="white"
          stroke={ORANGE}
          strokeWidth={1.5}
          filter="url(#card-shadow)"
        />

        {/* AFTER label */}
        <text
          x={rightCalX + calW / 2}
          y={180}
          textAnchor="middle"
          fill={ORANGE}
          fontSize={13}
          fontWeight={700}
          fontFamily={FONT}
          letterSpacing={2.5}
          opacity={afterLabelOp}
        >
          AFTER
        </text>

        {/* Day-of-week headers */}
        {dayLabels.map((d, i) => (
          <text
            key={`dr-${i}`}
            x={rightCalX + i * (cellSize + cellGap) + cellSize / 2}
            y={206}
            textAnchor="middle"
            fill={ORANGE}
            fontSize={9}
            fontWeight={600}
            fontFamily={FONT}
            opacity={afterLabelOp}
          >
            {d}
          </text>
        ))}

        {/* Calendar grid */}
        {renderCalendar(rightCalX, calTopY, afterBookedCells, true, rightCardPop)}

        {/* Booking count */}
        {(() => {
          const countVal = Math.min(
            16,
            Math.round(
              interpolate(frame, [10, 26], [0, 16], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            ),
          );
          return (
            <>
              <text
                x={rightCalX + calW / 2}
                y={calTopY + calH + 30}
                textAnchor="middle"
                fill={ORANGE}
                fontSize={22}
                fontWeight={800}
                fontFamily={FONT}
                opacity={afterLabelOp}
              >
                {countVal}
              </text>
              <text
                x={rightCalX + calW / 2}
                y={calTopY + calH + 46}
                textAnchor="middle"
                fill={ORANGE}
                fontSize={9}
                fontWeight={600}
                fontFamily={FONT}
                letterSpacing={1.5}
                opacity={afterLabelOp * 0.7}
              >
                BOOKINGS
              </text>
            </>
          );
        })()}
      </g>

      {/* ─── Arrow from left to right ─── */}
      <path
        d={`M ${leftCalX + calW + 22} ${150 + (calH + 120) / 2} L ${rightCalX - 22} ${150 + (calH + 120) / 2}`}
        fill="none"
        stroke={ORANGE}
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={arrowPathLen}
        strokeDashoffset={arrowPathLen * (1 - arrowDraw)}
        opacity={arrowDraw * 0.5}
      />
      {/* Arrowhead */}
      <g opacity={arrowDraw > 0.8 ? arrowDraw : 0}>
        <path
          d={`M ${rightCalX - 28} ${150 + (calH + 120) / 2 - 5} L ${rightCalX - 22} ${150 + (calH + 120) / 2} L ${rightCalX - 28} ${150 + (calH + 120) / 2 + 5}`}
          fill="none"
          stroke={ORANGE}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* ─── 2X Badge (centered between cards, below) ─── */}
      <g
        transform={`translate(300, ${calTopY + calH + 80}) scale(${badgePop})`}
        opacity={badgePop}
        filter="url(#badge-shadow)"
      >
        <rect
          x={-42}
          y={-22}
          width={84}
          height={44}
          rx={22}
          fill={ORANGE}
        />
        <text
          x={0}
          y={8}
          textAnchor="middle"
          fill="white"
          fontSize={24}
          fontWeight={900}
          fontFamily={FONT}
          letterSpacing={2}
        >
          2X
        </text>
      </g>

      {/* ─── Up-arrow above 2X badge ─── */}
      <g
        opacity={badgePop}
        transform={`translate(300, ${calTopY + calH + 48})`}
      >
        <path
          d="M 0 8 L 0 -2 M -5 3 L 0 -2 L 5 3"
          stroke={GREEN}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={badgePop * 0.8}
        />
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. ClientGrowthNetwork -- Expanding network visualization
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ClientGrowthNetwork: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 300;
  const cy = 280;

  // Center person
  const centerPop = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });

  // Inner ring: 3 people
  const innerNodes = Array.from({ length: 3 }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / 3 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * 100,
      y: cy + Math.sin(angle) * 100,
      delay: 4 + i * 3,
    };
  });

  // Outer ring: 5 people
  const outerNodes = Array.from({ length: 5 }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2 + 0.3;
    return {
      x: cx + Math.cos(angle) * 190,
      y: cy + Math.sin(angle) * 190,
      delay: 14 + i * 2,
    };
  });

  // Highlighted connections
  const highlightOp = interpolate(frame, [14, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // +NEW badge pop
  const newBadgePop = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 160 },
  });

  // Pulse from center
  const pulseRadius =
    frame >= 22
      ? interpolate((frame - 22) % 40, [0, 40], [30, 200], {
          extrapolateRight: "clamp",
        })
      : 0;
  const pulseOp =
    frame >= 22
      ? interpolate((frame - 22) % 40, [0, 40], [0.3, 0], {
          extrapolateRight: "clamp",
        })
      : 0;

  // Counter cycling
  const counterVal =
    frame < 10
      ? "12"
      : frame < 20
        ? "24"
        : "48+";
  const counterOp = interpolate(frame, [6, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Pulse ring */}
      {frame >= 22 && (
        <circle
          cx={cx}
          cy={cy}
          r={pulseRadius}
          fill="none"
          stroke={ORANGE}
          strokeWidth="1.5"
          opacity={pulseOp}
        />
      )}

      {/* Connection lines to inner ring */}
      {innerNodes.map((node, i) => {
        const linePop = spring({
          frame: Math.max(0, frame - node.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 100 },
        });
        const isHighlighted = i === 0 || i === 2;
        return (
          <line
            key={`il-${i}`}
            x1={cx}
            y1={cy}
            x2={cx + (node.x - cx) * linePop}
            y2={cy + (node.y - cy) * linePop}
            stroke={isHighlighted ? ORANGE : LIGHT_GRAY}
            strokeWidth={isHighlighted ? 2.5 : 1.5}
            opacity={linePop * (isHighlighted ? highlightOp : 0.5)}
          />
        );
      })}

      {/* Connection lines to outer ring */}
      {outerNodes.map((node, i) => {
        const nearestInner = innerNodes[Math.min(i, innerNodes.length - 1)];
        const linePop = spring({
          frame: Math.max(0, frame - node.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 100 },
        });
        return (
          <line
            key={`ol-${i}`}
            x1={nearestInner.x}
            y1={nearestInner.y}
            x2={
              nearestInner.x +
              (node.x - nearestInner.x) * linePop
            }
            y2={
              nearestInner.y +
              (node.y - nearestInner.y) * linePop
            }
            stroke={LIGHT_GRAY}
            strokeWidth="1"
            opacity={linePop * 0.4}
          />
        );
      })}

      {/* Center person (ORANGE) */}
      <g
        transform={`translate(${cx}, ${cy}) scale(${centerPop})`}
        opacity={centerPop}
      >
        <circle cx="0" cy="0" r="30" fill={ORANGE} />
        <circle cx="0" cy="-8" r="10" fill="white" />
        <path
          d="M -14 14 Q -14 4 0 4 Q 14 4 14 14"
          fill="white"
          opacity={0.9}
        />
      </g>

      {/* Inner ring people (gray) */}
      {innerNodes.map((node, i) => {
        const nodePop = spring({
          frame: Math.max(0, frame - node.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 120 },
        });
        return (
          <g
            key={`in-${i}`}
            transform={`translate(${node.x}, ${node.y}) scale(${nodePop})`}
            opacity={nodePop}
          >
            <circle cx="0" cy="0" r="22" fill="white" stroke={GRAY} strokeWidth="2" />
            <circle cx="0" cy="-5" r="6" fill={GRAY} opacity={0.6} />
            <path d="M -10 10 Q -10 3 0 3 Q 10 3 10 10" fill={GRAY} opacity={0.6} />
          </g>
        );
      })}

      {/* Outer ring people (lighter) */}
      {outerNodes.map((node, i) => {
        const nodePop = spring({
          frame: Math.max(0, frame - node.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 120 },
        });
        return (
          <g
            key={`on-${i}`}
            transform={`translate(${node.x}, ${node.y}) scale(${nodePop})`}
            opacity={nodePop}
          >
            <circle cx="0" cy="0" r="16" fill="white" stroke={LIGHT_GRAY} strokeWidth="1.5" />
            <circle cx="0" cy="-3" r="4" fill={LIGHT_GRAY} />
            <path d="M -7 7 Q -7 2 0 2 Q 7 2 7 7" fill={LIGHT_GRAY} />
          </g>
        );
      })}

      {/* +NEW badge at one outer position */}
      <g
        transform={`translate(${outerNodes[3].x + 25}, ${outerNodes[3].y - 20}) scale(${newBadgePop})`}
        opacity={newBadgePop}
      >
        <rect x="-24" y="-10" width="48" height="20" rx="10" fill={GREEN} />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="800"
          fontFamily={FONT}
        >
          +NEW
        </text>
      </g>

      {/* Counter in corner */}
      <g opacity={counterOp}>
        <text
          x="520"
          y="520"
          textAnchor="middle"
          fill={BLACK}
          fontSize="40"
          fontWeight="900"
          fontFamily={FONT}
        >
          {counterVal}
        </text>
        <text
          x="520"
          y="545"
          textAnchor="middle"
          fill={GRAY}
          fontSize="12"
          fontWeight="600"
          fontFamily={FONT}
          letterSpacing="1"
        >
          CLIENTS
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. FreeCampaignCTABadge -- Browser address bar + CTA button
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const FreeCampaignCTABadge: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Address bar draws in
  const barPop = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // URL types character by character
  const urlText = "infinitx.com/campaign";
  const charsVisible = Math.min(
    urlText.length,
    Math.floor(
      interpolate(frame, [4, 18], [0, urlText.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );

  // Big button appears
  const btnPop = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });

  // Click ripple
  const rippleActive = frame >= 12 && frame <= 20;
  const rippleRadius = rippleActive
    ? interpolate(frame, [12, 20], [0, 80], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const rippleOp = rippleActive
    ? interpolate(frame, [12, 20], [0.4, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Floating pill labels
  const pills = [
    { text: "FREE", x: -160, y: -40, delay: 14 },
    { text: "AI", x: 160, y: -30, delay: 16 },
    { text: "SETUP", x: -140, y: 50, delay: 18 },
  ];

  // Pulsing arrow
  const arrowBounce = interpolate(frame % 30, [0, 15, 30], [0, 8, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g transform="translate(300, 270)">
        {/* Browser address bar */}
        <g transform={`scale(${barPop})`} opacity={barPop}>
          <rect
            x="-220"
            y="-110"
            width="440"
            height="44"
            rx="22"
            fill="white"
            stroke={LIGHT_GRAY}
            strokeWidth="2"
          />
          {/* Globe icon */}
          <circle cx="-192" cy="-88" r="10" fill="none" stroke={GRAY} strokeWidth="1.5" />
          <line x1="-202" y1="-88" x2="-182" y2="-88" stroke={GRAY} strokeWidth="1" />
          <line x1="-192" y1="-98" x2="-192" y2="-78" stroke={GRAY} strokeWidth="1" />
          <ellipse cx="-192" cy="-88" rx="6" ry="10" fill="none" stroke={GRAY} strokeWidth="1" />

          {/* URL text */}
          <text
            x="-172"
            y="-82"
            textAnchor="start"
            fill={BLACK}
            fontSize="16"
            fontWeight="600"
            fontFamily={FONT}
          >
            {urlText.substring(0, charsVisible)}
          </text>
          {/* Typing cursor */}
          {charsVisible < urlText.length && (
            <rect
              x={-172 + charsVisible * 9}
              y="-97"
              width="2"
              height="18"
              fill={ORANGE}
              opacity={frame % 14 < 7 ? 1 : 0}
            />
          )}
        </g>

        {/* Big CTA button */}
        <g transform={`translate(0, 10) scale(${btnPop})`} opacity={btnPop}>
          <rect
            x="-170"
            y="-30"
            width="340"
            height="64"
            rx="32"
            fill={ORANGE}
          />
          {/* Button shadow */}
          <rect
            x="-165"
            y="-24"
            width="330"
            height="64"
            rx="32"
            fill={ORANGE}
            opacity={0.15}
            transform="translate(0, 6)"
          />
          <rect
            x="-170"
            y="-30"
            width="340"
            height="64"
            rx="32"
            fill={ORANGE}
          />
          <text
            x="0"
            y="12"
            textAnchor="middle"
            fill="white"
            fontSize="18"
            fontWeight="800"
            fontFamily={FONT}
            letterSpacing="1.5"
          >
            START FREE CAMPAIGN
          </text>

          {/* Click ripple */}
          {rippleActive && (
            <circle
              cx="0"
              cy="2"
              r={rippleRadius}
              fill="white"
              opacity={rippleOp}
            />
          )}
        </g>

        {/* Floating pill labels */}
        {pills.map((pill, i) => {
          const pillPop = spring({
            frame: Math.max(0, frame - pill.delay),
            fps,
            from: 0,
            to: 1,
            config: { damping: 10, stiffness: 140 },
          });
          const floatY = interpolate(
            (frame + i * 12) % 36,
            [0, 18, 36],
            [0, -4, 0],
            { extrapolateRight: "clamp" }
          );
          return (
            <g
              key={i}
              transform={`translate(${pill.x}, ${pill.y + floatY}) scale(${pillPop})`}
              opacity={pillPop * 0.8}
            >
              <rect
                x="-28"
                y="-12"
                width="56"
                height="24"
                rx="12"
                fill="#F3F4F6"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill={GRAY}
                fontSize="11"
                fontWeight="700"
                fontFamily={FONT}
              >
                {pill.text}
              </text>
            </g>
          );
        })}

        {/* Arrow pointing down to button */}
        <g transform={`translate(0, ${-55 + arrowBounce})`}>
          <path
            d="M 0 -20 L 0 0 M -6 -6 L 0 0 L 6 -6"
            stroke={ORANGE}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity={0.6}
          />
        </g>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. ZoneOfGeniusSpotlight -- HERO -- Theatrical spotlight scene
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ZoneOfGeniusSpotlight: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stage floor gradient
  const floorOp = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Spotlight cone draws from top
  const coneOp = interpolate(frame, [4, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Person walks in from left
  const personX = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: -150,
    to: 0,
    config: { damping: 14, stiffness: 80 },
  });
  const personOp = interpolate(frame, [8, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Skill badges appear in light cone
  const badges = [
    { text: "RENOVATIONS", x: -90, y: -70, delay: 12 },
    { text: "CLIENT WORK", x: 85, y: -55, delay: 16 },
    { text: "CRAFTSMANSHIP", x: -10, y: 80, delay: 20 },
  ];

  // Spotlight intensifies
  const spotlightIntensity =
    frame >= 20
      ? interpolate(frame, [20, 30], [0.08, 0.14], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0.08;

  // Dust motes drifting upward
  const particles = [
    { x: -30, y: 80, r: 2.5, speed: 1.2, delay: 24 },
    { x: 20, y: 100, r: 2, speed: 0.8, delay: 26 },
    { x: -10, y: 60, r: 1.5, speed: 1.0, delay: 28 },
    { x: 35, y: 90, r: 2, speed: 1.4, delay: 30 },
    { x: -45, y: 70, r: 1.8, speed: 0.9, delay: 32 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <linearGradient id="stage-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E5E7EB" stopOpacity="0" />
          <stop offset="100%" stopColor="#D1D5DB" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="spotlight-glow" cx="50%" cy="20%" r="60%">
          <stop offset="0%" stopColor={ORANGE} stopOpacity="0.15" />
          <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Stage floor */}
      <rect
        x="0"
        y="430"
        width="600"
        height="170"
        fill="url(#stage-floor)"
        opacity={floorOp}
      />

      {/* Spotlight cone from top */}
      <g opacity={coneOp}>
        <polygon
          points="260,30 340,30 440,480 160,480"
          fill={ORANGE}
          opacity={spotlightIntensity}
        />
        {/* Cone edge lines */}
        <line
          x1="260"
          y1="30"
          x2="160"
          y2="480"
          stroke={ORANGE}
          strokeWidth="1"
          opacity={0.15}
        />
        <line
          x1="340"
          y1="30"
          x2="440"
          y2="480"
          stroke={ORANGE}
          strokeWidth="1"
          opacity={0.15}
        />
      </g>

      {/* Warm floor glow */}
      <ellipse
        cx="300"
        cy="440"
        rx="120"
        ry="25"
        fill={ORANGE}
        opacity={coneOp * 0.12}
      />

      {/* Person silhouette */}
      <g
        transform={`translate(${300 + personX}, 320)`}
        opacity={personOp}
      >
        {/* Head */}
        <circle cx="0" cy="-80" r="26" fill={BLACK} opacity={0.9} />
        {/* Body */}
        <rect x="-20" y="-54" width="40" height="70" rx="8" fill={BLACK} opacity={0.9} />
        {/* Arms */}
        <rect
          x="-34"
          y="-48"
          width="12"
          height="48"
          rx="6"
          fill={BLACK}
          opacity={0.9}
          transform="rotate(-8, -28, -48)"
        />
        <rect
          x="22"
          y="-48"
          width="12"
          height="48"
          rx="6"
          fill={BLACK}
          opacity={0.9}
          transform="rotate(8, 28, -48)"
        />
        {/* Legs */}
        <rect x="-16" y="16" width="12" height="50" rx="5" fill={BLACK} opacity={0.9} />
        <rect x="4" y="16" width="12" height="50" rx="5" fill={BLACK} opacity={0.9} />
      </g>

      {/* Skill badges floating in the light cone */}
      {badges.map((badge, i) => {
        const bPop = spring({
          frame: Math.max(0, frame - badge.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 120 },
        });
        // Gentle float oscillation
        const floatY = interpolate(
          (frame + i * 13) % 40,
          [0, 20, 40],
          [0, -5, 0],
          { extrapolateRight: "clamp" }
        );
        return (
          <g
            key={i}
            transform={`translate(${300 + badge.x}, ${300 + badge.y + floatY}) scale(${bPop})`}
            opacity={bPop}
          >
            <rect
              x="-60"
              y="-14"
              width="120"
              height="28"
              rx="14"
              fill="white"
              stroke={ORANGE}
              strokeWidth="1.5"
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill={ORANGE}
              fontSize="11"
              fontWeight="800"
              fontFamily={FONT}
              letterSpacing="1.5"
            >
              {badge.text}
            </text>
          </g>
        );
      })}

      {/* Dust motes rising in the light beam */}
      {particles.map((p, i) => {
        if (frame < p.delay) return null;
        const elapsed = frame - p.delay;
        const driftY = -elapsed * p.speed * 2;
        const driftOp = interpolate(
          elapsed,
          [0, 10, 40],
          [0, 0.5, 0],
          { extrapolateRight: "clamp" }
        );
        return (
          <circle
            key={`mote-${i}`}
            cx={300 + p.x}
            cy={380 + p.y + driftY}
            r={p.r}
            fill={ORANGE}
            opacity={driftOp}
          />
        );
      })}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. GetStartedRocketButton -- Final CTA with rocket launch
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const GetStartedRocketButton: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Button entrance
  const btnPop = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });
  const btnOp = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  // "GET STARTED" text appears
  const textOp = interpolate(frame, [4, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rocket icon pop
  const rocketPop = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 140 },
  });

  // Dotted trail draws behind rocket
  const trailDraw = interpolate(frame, [10, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const trailLen = 150;

  // Hover shadow animation
  const shadowSize = interpolate(frame % 40, [0, 20, 40], [6, 12, 6], {
    extrapolateRight: "clamp",
  });

  // Star sparkles around trail
  const stars = [
    { x: 80, y: -65, delay: 18 },
    { x: 50, y: -90, delay: 20 },
    { x: 110, y: -80, delay: 22 },
    { x: 30, y: -50, delay: 24 },
  ];

  // FREE badge at top-right
  const freePop = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 160 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g transform="translate(300, 310)">
        {/* Button shadow */}
        <rect
          x={-170 * btnPop}
          y={-40 * btnPop + shadowSize}
          width={340 * btnPop}
          height={80 * btnPop}
          rx={40 * btnPop}
          fill={ORANGE}
          opacity={0.15 * btnOp}
        />

        {/* Main button */}
        <g transform={`scale(${btnPop})`} opacity={btnOp}>
          <rect
            x="-170"
            y="-40"
            width="340"
            height="80"
            rx="40"
            fill={ORANGE}
          />

          {/* "GET STARTED" text */}
          <text
            x="-20"
            y="10"
            textAnchor="middle"
            fill="white"
            fontSize="28"
            fontWeight="800"
            fontFamily={FONT}
            letterSpacing="2"
            opacity={textOp}
          >
            GET STARTED
          </text>

          {/* Rocket icon to the right of text */}
          <g
            transform={`translate(120, -5) scale(${rocketPop})`}
            opacity={rocketPop}
          >
            {/* Rocket body */}
            <path
              d="M 0 -16 C -4 -16 -8 -10 -8 -2 L -8 8 L -4 12 L 4 12 L 8 8 L 8 -2 C 8 -10 4 -16 0 -16"
              fill="white"
              opacity={0.95}
            />
            {/* Nose cone */}
            <path
              d="M -3 -16 L 0 -22 L 3 -16"
              fill="white"
              opacity={0.95}
            />
            {/* Flame */}
            <path
              d="M -5 12 L 0 20 L 5 12"
              fill="#FFD700"
              opacity={0.9}
            />
            {/* Small flame core */}
            <path
              d="M -2 12 L 0 16 L 2 12"
              fill="#FF4500"
              opacity={0.7}
            />
            {/* Window */}
            <circle cx="0" cy="-4" r="3" fill={ORANGE} opacity={0.6} />
          </g>
        </g>

        {/* Dotted trail curving upward from rocket */}
        <path
          d="M 120 -50 Q 90 -90 60 -110 Q 30 -130 -10 -120"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeDashoffset={trailLen * (1 - trailDraw)}
          opacity={trailDraw * 0.5}
          strokeLinecap="round"
        />

        {/* Star sparkles */}
        {stars.map((star, i) => {
          const sPop = spring({
            frame: Math.max(0, frame - star.delay),
            fps,
            from: 0,
            to: 1,
            config: { damping: 8, stiffness: 200 },
          });
          return (
            <g
              key={`star-${i}`}
              transform={`translate(${star.x}, ${star.y}) scale(${sPop})`}
              opacity={sPop * 0.7}
            >
              <path
                d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z"
                fill="white"
              />
            </g>
          );
        })}

        {/* FREE badge at top-right corner of button */}
        <g
          transform={`translate(155, -55) scale(${freePop})`}
          opacity={freePop}
        >
          <rect x="-26" y="-12" width="52" height="24" rx="12" fill={GREEN} />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="900"
            fontFamily={FONT}
          >
            FREE
          </text>
        </g>
      </g>
    </svg>
  );
};
