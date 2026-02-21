/**
 * Claude Creatives YouTube Tutorial -- Mid-Roll Illustrations
 *
 * 10 UNIQUE illustration components for the MIDROLL section covering
 * INFINITX brand, client acquisition, social media management,
 * creative pain points, Claude training, skill system, and phased approach.
 *
 * Designed for solid-white ConceptOverlay/AppleStylePopup backgrounds.
 * Pattern: useCurrentFrame() + spring() + interpolate() for motion.
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
import { COLORS } from "../colors";

const FONT = "system-ui, -apple-system, sans-serif";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. InfinitxLogoReveal — INFINITX logo with orange glow
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const InfinitxLogoReveal: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scales in with spring
  const logoPop = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Glow pulse behind logo
  const glowPulse =
    frame >= 10
      ? interpolate((frame - 10) % 40, [0, 20, 40], [0.15, 0.35, 0.15], {
          extrapolateRight: "clamp",
        })
      : interpolate(frame, [0, 10], [0, 0.15], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  // Outer ring draws in
  const ringDraw = interpolate(frame, [4, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringPerimeter = 2 * Math.PI * 140;

  // Sparkle dots at cardinal points
  const sparkles = [
    { angle: 0, delay: 12 },
    { angle: 90, delay: 14 },
    { angle: 180, delay: 16 },
    { angle: 270, delay: 18 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <filter id="ix-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Orange glow behind */}
      <circle
        cx="300"
        cy="280"
        r="130"
        fill={COLORS.primary}
        opacity={glowPulse}
        filter="url(#ix-glow)"
      />

      {/* Outer ring */}
      <circle
        cx="300"
        cy="280"
        r="140"
        fill="none"
        stroke={COLORS.primary}
        strokeWidth="3"
        strokeDasharray={ringPerimeter}
        strokeDashoffset={ringPerimeter * (1 - ringDraw)}
        opacity={0.4}
      />

      {/* Logo image */}
      <g
        transform={`translate(300, 280) scale(${logoPop})`}
        opacity={logoPop}
      >
        <foreignObject x="-90" y="-90" width="180" height="180">
          <Img
            src={staticFile("infinitx-logo.png")}
            style={{
              width: 180,
              height: 180,
              objectFit: "contain",
            }}
          />
        </foreignObject>
      </g>

      {/* Sparkle dots */}
      {sparkles.map((sp, i) => {
        const sPop = spring({
          frame: Math.max(0, frame - sp.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 8, stiffness: 200 },
        });
        const rad = (sp.angle * Math.PI) / 180;
        const sx = 300 + Math.cos(rad) * 170;
        const sy = 280 + Math.sin(rad) * 170;
        const pulse = interpolate(
          (frame + i * 8) % 24,
          [0, 12, 24],
          [0.5, 1, 0.5],
          { extrapolateRight: "clamp" }
        );
        return (
          <circle
            key={`sp-${i}`}
            cx={sx}
            cy={sy}
            r={6 * sPop}
            fill={COLORS.primary}
            opacity={sPop * pulse}
          />
        );
      })}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. ClientAcquisitionFunnel — Funnel: leads -> enrichment -> conversations -> appointments
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ClientAcquisitionFunnel: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Funnel shape draws in
  const funnelDraw = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stage data
  const stages = [
    { label: "LEADS", y: 120, width: 360, delay: 6 },
    { label: "ENRICHMENT", y: 210, width: 270, delay: 10 },
    { label: "CONVERSATIONS", y: 300, width: 180, delay: 14 },
    { label: "APPOINTMENTS", y: 390, width: 110, delay: 18 },
  ];

  // Flowing dots top to bottom
  const dots = Array.from({ length: 10 }).map((_, i) => {
    const startDelay = 8 + i * 3;
    const progress = interpolate(
      frame,
      [startDelay, startDelay + 24],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const topX = 300 + (i % 2 === 0 ? -1 : 1) * (20 + ((i * 19) % 70));
    const x = interpolate(progress, [0, 1], [topX, 300]);
    const y = interpolate(progress, [0, 1], [100, 440]);
    return {
      x,
      y,
      progress,
      opacity: progress > 0 && progress < 1 ? 0.8 : 0,
    };
  });

  // Bottom badge pops
  const badgePop = spring({
    frame: Math.max(0, frame - 24),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <filter
          id="funnel-shadow"
          x="-10%"
          y="-5%"
          width="120%"
          height="115%"
        >
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="8"
            floodColor="#000"
            floodOpacity="0.08"
          />
        </filter>
      </defs>

      {/* Funnel trapezoid sections */}
      <g opacity={funnelDraw} filter="url(#funnel-shadow)">
        {stages.map((stage, i) => {
          const nextWidth = stages[i + 1]?.width ?? stage.width * 0.6;
          const nextY = stages[i + 1]?.y ?? stage.y + 80;
          const topLeft = 300 - stage.width / 2;
          const topRight = 300 + stage.width / 2;
          const botLeft = 300 - nextWidth / 2;
          const botRight = 300 + nextWidth / 2;
          const opacityVal = 0.12 + i * 0.12;

          return (
            <path
              key={`funnel-${i}`}
              d={`M ${topLeft} ${stage.y} L ${topRight} ${stage.y} L ${botRight} ${nextY} L ${botLeft} ${nextY} Z`}
              fill={COLORS.primary}
              opacity={opacityVal}
              stroke={COLORS.primary}
              strokeWidth="1.5"
            />
          );
        })}
      </g>

      {/* Stage labels */}
      {stages.map((stage, i) => {
        const labelOp = interpolate(
          frame,
          [stage.delay, stage.delay + 4],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const nextY = stages[i + 1]?.y ?? stage.y + 80;
        const midY = (stage.y + nextY) / 2 + 5;

        return (
          <text
            key={`label-${i}`}
            x="300"
            y={midY}
            textAnchor="middle"
            fill={i >= 2 ? "white" : COLORS.darkGray}
            fontSize={i === 0 ? "15" : "13"}
            fontWeight="700"
            fontFamily={FONT}
            letterSpacing="2"
            opacity={labelOp}
          >
            {stage.label}
          </text>
        );
      })}

      {/* Flowing dots */}
      {dots.map((dot, i) => (
        <circle
          key={`dot-${i}`}
          cx={dot.x}
          cy={dot.y}
          r="4"
          fill={COLORS.primary}
          opacity={dot.opacity}
        />
      ))}

      {/* Bottom result badge */}
      <g
        transform={`translate(300, 510) scale(${badgePop})`}
        opacity={badgePop}
      >
        <rect
          x="-60"
          y="-18"
          width="120"
          height="36"
          rx="18"
          fill={COLORS.success}
        />
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fill="white"
          fontSize="13"
          fontWeight="800"
          fontFamily={FONT}
          letterSpacing="1"
        >
          BOOKED
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. SocialMediaDashboard — Dashboard with metrics, graphs, platform icons
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SocialMediaDashboard: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tiles = [
    { label: "IG", metric: 12400, color: "#E4405F", x: 95, y: 140 },
    { label: "TT", metric: 8900, color: "#1A1A1A", x: 235, y: 140 },
    { label: "LI", metric: 5200, color: "#0A66C2", x: 375, y: 140 },
    { label: "YT", metric: 24600, color: "#FF0000", x: 95, y: 310 },
    { label: "X", metric: 3100, color: "#1A1A1A", x: 235, y: 310 },
    { label: "FB", metric: 6700, color: "#1877F2", x: 375, y: 310 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <filter
          id="dash-tile-shadow"
          x="-10%"
          y="-10%"
          width="120%"
          height="130%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="6"
            floodColor="#000"
            floodOpacity="0.06"
          />
        </filter>
      </defs>

      {/* Dashboard frame */}
      {tiles.map((tile, i) => {
        const tilePop = spring({
          frame: Math.max(0, frame - i * 3),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 120 },
        });

        // Count up number
        const countProgress = interpolate(
          frame,
          [i * 3 + 6, i * 3 + 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const displayCount = Math.round(tile.metric * countProgress);
        const formatted =
          displayCount >= 1000
            ? (displayCount / 1000).toFixed(1) + "K"
            : String(displayCount);

        return (
          <g
            key={`tile-${i}`}
            transform={`translate(${tile.x}, ${tile.y}) scale(${tilePop})`}
            opacity={tilePop}
            filter="url(#dash-tile-shadow)"
          >
            {/* Tile card */}
            <rect
              x="0"
              y="0"
              width="130"
              height="140"
              rx="14"
              fill="white"
              stroke="#E5E7EB"
              strokeWidth="1.5"
            />

            {/* Platform indicator dot */}
            <circle cx="25" cy="30" r="12" fill={tile.color} opacity={0.15} />
            <text
              x="25"
              y="36"
              textAnchor="middle"
              fill={tile.color}
              fontSize="12"
              fontWeight="800"
              fontFamily={FONT}
            >
              {tile.label}
            </text>

            {/* Metric number */}
            <text
              x="65"
              y="90"
              textAnchor="middle"
              fill={COLORS.darkGray}
              fontSize="28"
              fontWeight="900"
              fontFamily={FONT}
            >
              {formatted}
            </text>

            {/* Mini trend arrow */}
            <g opacity={countProgress}>
              <path
                d="M 90 108 L 95 100 L 100 108"
                fill="none"
                stroke={COLORS.success}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Mini sparkline */}
            <polyline
              points="20,125 40,118 60,122 80,114 100,110 115,106"
              fill="none"
              stroke={tile.color}
              strokeWidth="2"
              strokeLinecap="round"
              opacity={countProgress * 0.5}
            />
          </g>
        );
      })}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. ManualCreativesPainpoint — Hourglass + exhausted figure
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ManualCreativesPainpoint: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hourglass entrance
  const hgPop = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // Sand flow animation
  const sandFlow = interpolate(frame, [6, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Upper sand decreases, lower sand increases
  const topSandH = interpolate(sandFlow, [0, 1], [70, 10]);
  const bottomSandH = interpolate(sandFlow, [0, 1], [10, 70]);

  // Desk + person entrance
  const deskPop = spring({
    frame: Math.max(0, frame - 4),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Person slumps forward over time
  const slumpAngle = interpolate(frame, [10, 30], [0, 15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stress lines appear
  const stressOp = interpolate(frame, [18, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exclamation marks pop
  const exclPop = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 160 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* HOURGLASS (left side) */}
      <g
        transform={`translate(180, 280) scale(${hgPop})`}
        opacity={hgPop}
      >
        {/* Top glass */}
        <path
          d="M -50 -120 L 50 -120 L 15 -10 L -15 -10 Z"
          fill="none"
          stroke={COLORS.darkGray}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Bottom glass */}
        <path
          d="M -50 120 L 50 120 L 15 10 L -15 10 Z"
          fill="none"
          stroke={COLORS.darkGray}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Top sand */}
        <path
          d={`M -${30 - sandFlow * 15} -${topSandH + 20} L ${30 - sandFlow * 15} -${topSandH + 20} L 10 -14 L -10 -14 Z`}
          fill={COLORS.primary}
          opacity={0.4}
        />
        {/* Bottom sand pile */}
        <path
          d={`M -${10 + sandFlow * 22} ${120 - bottomSandH} L ${10 + sandFlow * 22} ${120 - bottomSandH} L 40 120 L -40 120 Z`}
          fill={COLORS.primary}
          opacity={0.5}
        />
        {/* Falling sand stream */}
        {sandFlow < 0.95 && (
          <line
            x1="0"
            y1="-10"
            x2="0"
            y2="10"
            stroke={COLORS.primary}
            strokeWidth="2"
            opacity={0.6}
          />
        )}
        {/* Top and bottom caps */}
        <rect
          x="-55"
          y="-124"
          width="110"
          height="8"
          rx="4"
          fill={COLORS.darkGray}
        />
        <rect
          x="-55"
          y="117"
          width="110"
          height="8"
          rx="4"
          fill={COLORS.darkGray}
        />
      </g>

      {/* EXHAUSTED PERSON AT DESK (right side) */}
      <g
        transform={`translate(420, 340) scale(${deskPop})`}
        opacity={deskPop}
      >
        {/* Desk surface */}
        <rect
          x="-100"
          y="20"
          width="200"
          height="12"
          rx="3"
          fill={COLORS.mediumGray}
        />
        {/* Desk legs */}
        <rect
          x="-90"
          y="32"
          width="8"
          height="60"
          rx="2"
          fill={COLORS.mediumGray}
        />
        <rect
          x="82"
          y="32"
          width="8"
          height="60"
          rx="2"
          fill={COLORS.mediumGray}
        />

        {/* Person (slumping) */}
        <g transform={`rotate(${slumpAngle}, 0, 0)`}>
          {/* Head */}
          <circle
            cx="0"
            cy="-55"
            r="22"
            fill={COLORS.darkGray}
            opacity={0.85}
          />
          {/* Body */}
          <rect
            x="-16"
            y="-33"
            width="32"
            height="50"
            rx="6"
            fill={COLORS.darkGray}
            opacity={0.85}
          />
          {/* Arms drooping */}
          <rect
            x="-30"
            y="-25"
            width="10"
            height="40"
            rx="5"
            fill={COLORS.darkGray}
            opacity={0.8}
            transform="rotate(10, -25, -25)"
          />
          <rect
            x="20"
            y="-25"
            width="10"
            height="40"
            rx="5"
            fill={COLORS.darkGray}
            opacity={0.8}
            transform="rotate(-10, 25, -25)"
          />
        </g>

        {/* Stress lines */}
        <g opacity={stressOp}>
          <line
            x1="-40"
            y1="-80"
            x2="-50"
            y2="-90"
            stroke={COLORS.error}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="-30"
            y1="-85"
            x2="-30"
            y2="-98"
            stroke={COLORS.error}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="-18"
            y1="-80"
            x2="-10"
            y2="-92"
            stroke={COLORS.error}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Exclamation marks */}
      <g
        transform={`translate(480, 220) scale(${exclPop})`}
        opacity={exclPop}
      >
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fill={COLORS.error}
          fontSize="36"
          fontWeight="900"
          fontFamily={FONT}
        >
          !!
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. ManualThumbnailStruggle — Magnifying glass over messy manual thumbnail process
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ManualThumbnailStruggle: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scattered tools (paintbrush, pen, eraser, frame, color swatch)
  const tools = [
    { x: 160, y: 200, rot: -25, delay: 0 },
    { x: 380, y: 180, rot: 30, delay: 2 },
    { x: 140, y: 360, rot: -15, delay: 4 },
    { x: 420, y: 340, rot: 20, delay: 6 },
    { x: 280, y: 160, rot: 10, delay: 3 },
    { x: 320, y: 400, rot: -30, delay: 5 },
  ];

  // Tools scatter outward from center
  const scatterProgress = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Magnifying glass zooms in after scatter
  const magPop = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });

  // Magnifying glass subtle hover
  const magFloat = interpolate(frame % 40, [0, 20, 40], [0, -6, 0], {
    extrapolateRight: "clamp",
  });

  // Red X marks pop on the scattered items
  const xMarkOp = interpolate(frame, [16, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <filter
          id="thumb-shadow"
          x="-10%"
          y="-10%"
          width="120%"
          height="130%"
        >
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="4"
            floodColor="#000"
            floodOpacity="0.06"
          />
        </filter>
      </defs>

      {/* Scattered tool items */}
      {tools.map((tool, i) => {
        const dx = (tool.x - 300) * scatterProgress;
        const dy = (tool.y - 300) * scatterProgress;
        const toolX = 300 + dx;
        const toolY = 300 + dy;
        const toolOp = interpolate(
          frame,
          [tool.delay, tool.delay + 4],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        return (
          <g
            key={`tool-${i}`}
            transform={`translate(${toolX}, ${toolY}) rotate(${tool.rot * scatterProgress})`}
            opacity={toolOp}
          >
            {/* Generic rectangular tool card */}
            <rect
              x="-25"
              y="-18"
              width="50"
              height="36"
              rx="6"
              fill="#F3F4F6"
              stroke="#D1D5DB"
              strokeWidth="1.5"
            />
            {/* Tool-specific interior shapes */}
            {i === 0 && (
              <>
                <rect
                  x="-8"
                  y="-10"
                  width="16"
                  height="20"
                  rx="2"
                  fill="#D1D5DB"
                />
                <rect
                  x="-4"
                  y="-6"
                  width="8"
                  height="8"
                  rx="1"
                  fill={COLORS.gray}
                />
              </>
            )}
            {i === 1 && (
              <path
                d="M -10 8 L 0 -10 L 10 8"
                fill="none"
                stroke={COLORS.gray}
                strokeWidth="2"
              />
            )}
            {i === 2 && (
              <circle cx="0" cy="0" r="8" fill={COLORS.gray} opacity={0.4} />
            )}
            {i === 3 && (
              <rect
                x="-12"
                y="-8"
                width="24"
                height="16"
                rx="2"
                fill="none"
                stroke={COLORS.gray}
                strokeWidth="2"
              />
            )}
            {i === 4 && (
              <>
                <rect
                  x="-10"
                  y="-6"
                  width="8"
                  height="8"
                  rx="1"
                  fill={COLORS.primary}
                  opacity={0.5}
                />
                <rect
                  x="2"
                  y="-6"
                  width="8"
                  height="8"
                  rx="1"
                  fill={COLORS.secondary}
                  opacity={0.5}
                />
              </>
            )}
            {i === 5 && (
              <line
                x1="-10"
                y1="0"
                x2="10"
                y2="0"
                stroke={COLORS.gray}
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}

            {/* Red X mark */}
            <g opacity={xMarkOp}>
              <circle cx="18" cy="-12" r="8" fill={COLORS.error} />
              <path
                d="M 14 -16 L 22 -8 M 22 -16 L 14 -8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </g>
        );
      })}

      {/* Magnifying glass */}
      <g
        transform={`translate(300, ${290 + magFloat}) scale(${magPop})`}
        opacity={magPop}
        filter="url(#thumb-shadow)"
      >
        {/* Glass circle */}
        <circle
          cx="0"
          cy="-20"
          r="70"
          fill="white"
          stroke={COLORS.darkGray}
          strokeWidth="4"
          opacity={0.9}
        />
        {/* Lens shine */}
        <path
          d="M -30 -50 Q -20 -60 -10 -52"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          opacity={0.6}
        />
        {/* Handle */}
        <line
          x1="48"
          y1="28"
          x2="85"
          y2="65"
          stroke={COLORS.darkGray}
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Question mark inside lens */}
        <text
          x="0"
          y="-8"
          textAnchor="middle"
          fill={COLORS.gray}
          fontSize="48"
          fontWeight="700"
          fontFamily={FONT}
          opacity={0.4}
        >
          ?
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. TrainedClaudeBadge — Claude AI logo with graduation cap
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const TrainedClaudeBadge: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoPop = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // Graduation cap lands from above
  const capY = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: -120,
    to: 0,
    config: { damping: 8, stiffness: 100 },
  });
  const capOp = interpolate(frame, [8, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "TRAINED" badge pops
  const badgePop = spring({
    frame: Math.max(0, frame - 16),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 140 },
  });

  // Sparkles around the completed badge
  const sparkleAngles = [45, 135, 225, 315];

  // Subtle glow pulse
  const glowPulse =
    frame >= 20
      ? interpolate((frame - 20) % 36, [0, 18, 36], [0.1, 0.25, 0.1], {
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <filter
          id="claude-glow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Orange glow behind */}
      <circle
        cx="300"
        cy="265"
        r="100"
        fill={COLORS.primary}
        opacity={glowPulse}
      />

      {/* Claude AI logo */}
      <g
        transform={`translate(300, 270) scale(${logoPop})`}
        opacity={logoPop}
      >
        <defs>
          <clipPath id="claude-badge-clip">
            <circle cx="0" cy="0" r="72" />
          </clipPath>
        </defs>
        <circle
          cx="0"
          cy="0"
          r="75"
          fill="none"
          stroke={COLORS.primary}
          strokeWidth="3"
          opacity={0.3}
        />
        <foreignObject
          x="-72"
          y="-72"
          width="144"
          height="144"
          clipPath="url(#claude-badge-clip)"
        >
          <Img
            src={staticFile("logos/claude-ai-icon.svg")}
            style={{
              width: 144,
              height: 144,
              objectFit: "contain",
            }}
          />
        </foreignObject>
      </g>

      {/* Graduation cap */}
      <g transform={`translate(300, ${170 + capY})`} opacity={capOp}>
        {/* Cap board (diamond shape from top) */}
        <path
          d="M 0 -18 L 55 0 L 0 18 L -55 0 Z"
          fill={COLORS.darkGray}
          stroke={COLORS.mediumGray}
          strokeWidth="1"
        />
        {/* Cap base */}
        <rect
          x="-20"
          y="0"
          width="40"
          height="12"
          rx="2"
          fill={COLORS.darkGray}
        />
        {/* Tassel */}
        <line
          x1="50"
          y1="0"
          x2="55"
          y2="30"
          stroke={COLORS.primary}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="55" cy="32" r="4" fill={COLORS.primary} />
      </g>

      {/* "TRAINED" badge */}
      <g
        transform={`translate(300, 395) scale(${badgePop})`}
        opacity={badgePop}
      >
        <rect
          x="-65"
          y="-18"
          width="130"
          height="36"
          rx="18"
          fill={COLORS.primary}
        />
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="900"
          fontFamily={FONT}
          letterSpacing="4"
        >
          TRAINED
        </text>
      </g>

      {/* Sparkles */}
      {sparkleAngles.map((angle, i) => {
        const sPop = spring({
          frame: Math.max(0, frame - 20 - i * 2),
          fps,
          from: 0,
          to: 1,
          config: { damping: 8, stiffness: 200 },
        });
        const rad = (angle * Math.PI) / 180;
        const sx = 300 + Math.cos(rad) * 130;
        const sy = 270 + Math.sin(rad) * 130;
        return (
          <g
            key={`spk-${i}`}
            transform={`translate(${sx}, ${sy}) scale(${sPop})`}
            opacity={sPop * 0.7}
          >
            <path
              d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
              fill={COLORS.primary}
            />
          </g>
        );
      })}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. ThreeSkillsPillars — Three vertical pillars: Thumbnails, Carousels, Documents
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ThreeSkillsPillars: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillars = [
    { x: 140, label: "THUMBNAILS", delay: 0 },
    { x: 300, label: "CAROUSELS", delay: 4 },
    { x: 460, label: "DOCUMENTS", delay: 8 },
  ];

  // Base line draws
  const baseDraw = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <filter
          id="pillar-shadow"
          x="-10%"
          y="-5%"
          width="120%"
          height="115%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="5"
            floodColor="#000"
            floodOpacity="0.06"
          />
        </filter>
      </defs>

      {/* Base line */}
      <rect
        x={80}
        y="460"
        width={440 * baseDraw}
        height="4"
        rx="2"
        fill="#E5E7EB"
      />

      {/* Three pillars */}
      {pillars.map((pillar, i) => {
        const pillarH = spring({
          frame: Math.max(0, frame - pillar.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 80 },
        });
        const pillarHeight = 280 * pillarH;

        // Icon pop at top
        const iconPop = spring({
          frame: Math.max(0, frame - pillar.delay - 6),
          fps,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 140 },
        });

        // Label below base
        const labelOp = interpolate(
          frame,
          [pillar.delay + 8, pillar.delay + 14],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <g key={`pil-${i}`}>
            {/* Pillar body */}
            <rect
              x={pillar.x - 30}
              y={460 - pillarHeight}
              width="60"
              height={pillarHeight}
              rx="8"
              fill={i === 1 ? COLORS.primary : "#F3F4F6"}
              stroke={i === 1 ? COLORS.primary : "#E5E7EB"}
              strokeWidth="2"
              filter="url(#pillar-shadow)"
            />

            {/* Icon at top of pillar */}
            <g
              transform={`translate(${pillar.x}, ${460 - pillarHeight - 30}) scale(${iconPop})`}
              opacity={iconPop}
            >
              <circle
                cx="0"
                cy="0"
                r="24"
                fill={i === 1 ? COLORS.primary : "white"}
                stroke={i === 1 ? COLORS.primaryDark : COLORS.primary}
                strokeWidth="2.5"
              />
              {/* Camera icon for thumbnails */}
              {i === 0 && (
                <g>
                  <rect
                    x="-10"
                    y="-6"
                    width="20"
                    height="14"
                    rx="3"
                    fill="none"
                    stroke={COLORS.primary}
                    strokeWidth="2"
                  />
                  <circle
                    cx="0"
                    cy="1"
                    r="4"
                    fill="none"
                    stroke={COLORS.primary}
                    strokeWidth="1.5"
                  />
                  <rect
                    x="-4"
                    y="-10"
                    width="8"
                    height="5"
                    rx="1"
                    fill="none"
                    stroke={COLORS.primary}
                    strokeWidth="1.5"
                  />
                </g>
              )}
              {/* Grid icon for carousels */}
              {i === 1 && (
                <g>
                  <rect
                    x="-9"
                    y="-9"
                    width="7"
                    height="7"
                    rx="1"
                    fill="white"
                  />
                  <rect
                    x="2"
                    y="-9"
                    width="7"
                    height="7"
                    rx="1"
                    fill="white"
                  />
                  <rect
                    x="-9"
                    y="2"
                    width="7"
                    height="7"
                    rx="1"
                    fill="white"
                  />
                  <rect
                    x="2"
                    y="2"
                    width="7"
                    height="7"
                    rx="1"
                    fill="white"
                  />
                </g>
              )}
              {/* Document icon */}
              {i === 2 && (
                <g>
                  <rect
                    x="-7"
                    y="-10"
                    width="14"
                    height="20"
                    rx="2"
                    fill="none"
                    stroke={COLORS.primary}
                    strokeWidth="2"
                  />
                  <line
                    x1="-3"
                    y1="-4"
                    x2="3"
                    y2="-4"
                    stroke={COLORS.primary}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="-3"
                    y1="0"
                    x2="3"
                    y2="0"
                    stroke={COLORS.primary}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="-3"
                    y1="4"
                    x2="1"
                    y2="4"
                    stroke={COLORS.primary}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </g>

            {/* Label below */}
            <text
              x={pillar.x}
              y="500"
              textAnchor="middle"
              fill={COLORS.darkGray}
              fontSize="11"
              fontWeight="700"
              fontFamily={FONT}
              letterSpacing="1.5"
              opacity={labelOp}
            >
              {pillar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. ClaudeCodeTerminal — Terminal window with Claude Code branding
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ClaudeCodeTerminal: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Terminal scales in
  const termPop = spring({
    frame,
    fps,
    from: 0.85,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const termOp = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor blink
  const cursorVisible = frame % 20 < 12;

  // Terminal content lines appear
  const line1Op = interpolate(frame, [6, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Op = interpolate(frame, [10, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line3Op = interpolate(frame, [14, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <filter
          id="term-shadow"
          x="-5%"
          y="-5%"
          width="110%"
          height="120%"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="12"
            floodColor="#000"
            floodOpacity="0.12"
          />
        </filter>
      </defs>

      <g
        transform={`translate(300, 260) scale(${termPop})`}
        opacity={termOp}
        filter="url(#term-shadow)"
      >
        {/* Terminal window */}
        <rect
          x="-220"
          y="-130"
          width="440"
          height="300"
          rx="12"
          fill="#1E1E1E"
          stroke={COLORS.mediumGray}
          strokeWidth="1"
        />

        {/* Title bar */}
        <rect
          x="-220"
          y="-130"
          width="440"
          height="36"
          rx="12"
          fill="#2D2D2D"
        />
        {/* Clip bottom corners of title bar */}
        <rect x="-220" y="-106" width="440" height="12" fill="#2D2D2D" />

        {/* Traffic lights */}
        <circle cx="-192" cy="-112" r="6" fill="#FF5F56" />
        <circle cx="-172" cy="-112" r="6" fill="#FFBD2E" />
        <circle cx="-152" cy="-112" r="6" fill="#27CA40" />

        {/* Claude Code logo in title bar */}
        <foreignObject x="-30" y="-126" width="28" height="28">
          <Img
            src={staticFile("logos/claude-code-terminal.webp")}
            style={{ width: 28, height: 28, objectFit: "contain" }}
          />
        </foreignObject>
        <text
          x="10"
          y="-106"
          textAnchor="start"
          fill={COLORS.lightGray}
          fontSize="13"
          fontFamily="monospace"
          fontWeight="600"
        >
          Claude Code
        </text>

        {/* Terminal content */}
        <g opacity={line1Op}>
          <text
            x="-195"
            y="-68"
            fill={COLORS.primary}
            fontSize="15"
            fontFamily="monospace"
            fontWeight="700"
          >
            $
          </text>
          <text
            x="-178"
            y="-68"
            fill={COLORS.lightGray}
            fontSize="15"
            fontFamily="monospace"
          >
            claude create-skill thumbnail
          </text>
        </g>

        <g opacity={line2Op}>
          <text
            x="-195"
            y="-38"
            fill={COLORS.success}
            fontSize="14"
            fontFamily="monospace"
          >
            {"\u2713"} Skill created successfully
          </text>
        </g>

        <g opacity={line3Op}>
          <text
            x="-195"
            y="-8"
            fill={COLORS.primary}
            fontSize="15"
            fontFamily="monospace"
            fontWeight="700"
          >
            $
          </text>
          <text
            x="-178"
            y="-8"
            fill={COLORS.lightGray}
            fontSize="15"
            fontFamily="monospace"
          >
            claude train --skill carousel
          </text>
        </g>

        {/* Blinking cursor */}
        <rect
          x="-195"
          y="20"
          width="9"
          height="16"
          fill={COLORS.primary}
          opacity={cursorVisible ? 0.8 : 0}
        />

        {/* Progress bar at bottom */}
        <rect
          x="-200"
          y="120"
          width="400"
          height="6"
          rx="3"
          fill={COLORS.mediumGray}
        />
        {(() => {
          const progressW = interpolate(frame, [16, 30], [0, 400], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <rect
              x="-200"
              y="120"
              width={progressW}
              height="6"
              rx="3"
              fill={COLORS.primary}
            />
          );
        })()}
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. SkillTrainingGraduation — Brain with graduation cap, neural pathways evolving
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SkillTrainingGraduation: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Brain outline draws
  const brainDraw = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brainPathLen = 800;

  // Neural pathway nodes
  const nodes = [
    { x: 250, y: 230, delay: 6 },
    { x: 340, y: 210, delay: 8 },
    { x: 280, y: 290, delay: 10 },
    { x: 360, y: 310, delay: 12 },
    { x: 230, y: 350, delay: 14 },
    { x: 320, y: 370, delay: 16 },
    { x: 290, y: 250, delay: 9 },
  ];

  // Connections between nodes
  const connections = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [2, 6],
    [3, 5],
    [4, 5],
    [6, 1],
    [6, 3],
  ];

  // Graduation cap settles on top
  const capPop = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });
  const capY = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: -80,
    to: 0,
    config: { damping: 12, stiffness: 80 },
  });

  // Training data documents float in from the sides
  const doc1Pop = spring({
    frame: Math.max(0, frame - 22),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });
  const doc2Pop = spring({
    frame: Math.max(0, frame - 26),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Brain outline */}
      <path
        d="M 300 160 C 230 160 170 210 170 280 C 170 310 185 340 205 360 C 195 375 190 400 200 420 C 215 440 235 450 255 445 C 270 465 295 475 315 470 C 340 475 360 465 375 445 C 395 450 415 438 425 415 C 440 395 435 370 425 355 C 445 335 455 305 450 280 C 440 210 385 160 300 160Z"
        fill="none"
        stroke={COLORS.darkGray}
        strokeWidth="3"
        strokeDasharray={brainPathLen}
        strokeDashoffset={brainPathLen * (1 - brainDraw)}
      />

      {/* Brain center line */}
      <path
        d="M 300 175 C 300 220 308 290 300 360 C 294 400 300 440 300 460"
        fill="none"
        stroke={COLORS.gray}
        strokeWidth="1.5"
        opacity={brainDraw * 0.4}
      />

      {/* Neural pathway connections */}
      {connections.map(([a, b], i) => {
        const nodeA = nodes[a];
        const nodeB = nodes[b];
        const maxDelay = Math.max(nodeA.delay, nodeB.delay);
        const connOp = interpolate(
          frame,
          [maxDelay, maxDelay + 6],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <line
            key={`conn-${i}`}
            x1={nodeA.x}
            y1={nodeA.y}
            x2={nodeB.x}
            y2={nodeB.y}
            stroke={COLORS.primary}
            strokeWidth="2"
            opacity={connOp * 0.6}
          />
        );
      })}

      {/* Neural pathway nodes */}
      {nodes.map((node, i) => {
        const nodePop = spring({
          frame: Math.max(0, frame - node.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 140 },
        });
        const pulse =
          frame >= node.delay + 10
            ? interpolate(
                (frame - node.delay) % 24,
                [0, 12, 24],
                [1, 1.3, 1],
                { extrapolateRight: "clamp" }
              )
            : 1;
        return (
          <circle
            key={`node-${i}`}
            cx={node.x}
            cy={node.y}
            r={7 * nodePop * pulse}
            fill={COLORS.primary}
            opacity={nodePop * 0.9}
          />
        );
      })}

      {/* Graduation cap on top of brain */}
      <g transform={`translate(300, ${145 + capY})`} opacity={capPop}>
        {/* Cap board */}
        <path
          d="M 0 -14 L 50 0 L 0 14 L -50 0 Z"
          fill={COLORS.darkGray}
          stroke={COLORS.mediumGray}
          strokeWidth="1"
        />
        {/* Cap base */}
        <rect
          x="-16"
          y="2"
          width="32"
          height="10"
          rx="2"
          fill={COLORS.darkGray}
        />
        {/* Tassel */}
        <line
          x1="46"
          y1="0"
          x2="52"
          y2="26"
          stroke={COLORS.primary}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="52" cy="28" r="4" fill={COLORS.primary} />
      </g>

      {/* Training data document (left side) */}
      <g
        transform={`translate(120, 460) scale(${doc1Pop})`}
        opacity={doc1Pop * 0.8}
      >
        <rect
          x="-30"
          y="-22"
          width="60"
          height="44"
          rx="6"
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="1.5"
        />
        <rect x="-20" y="-14" width="30" height="4" rx="2" fill="#E5E7EB" />
        <rect x="-20" y="-4" width="40" height="4" rx="2" fill="#E5E7EB" />
        <rect x="-20" y="6" width="25" height="4" rx="2" fill={COLORS.primary} opacity={0.3} />
        {/* Arrow pointing to brain */}
        <line
          x1="35"
          y1="-10"
          x2="65"
          y2="-40"
          stroke={COLORS.primary}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity={0.5}
        />
      </g>

      {/* Training data document (right side) */}
      <g
        transform={`translate(480, 460) scale(${doc2Pop})`}
        opacity={doc2Pop * 0.8}
      >
        <rect
          x="-30"
          y="-22"
          width="60"
          height="44"
          rx="6"
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="1.5"
        />
        <rect x="-20" y="-14" width="35" height="4" rx="2" fill="#E5E7EB" />
        <rect x="-20" y="-4" width="40" height="4" rx="2" fill="#E5E7EB" />
        <rect x="-20" y="6" width="20" height="4" rx="2" fill={COLORS.primary} opacity={0.3} />
        {/* Arrow pointing to brain */}
        <line
          x1="-35"
          y1="-10"
          x2="-65"
          y2="-40"
          stroke={COLORS.primary}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity={0.5}
        />
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. ThreePhasesTimeline — Horizontal 3-phase timeline: Setup -> Train -> Deploy
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ThreePhasesTimeline: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phases = [
    { x: 140, label: "SETUP", sublabel: "Install + Config", delay: 0 },
    { x: 300, label: "TRAIN", sublabel: "Skills + Data", delay: 8 },
    { x: 460, label: "DEPLOY", sublabel: "Launch + Scale", delay: 16 },
  ];

  // Connecting line draws left to right
  const line1Draw = interpolate(frame, [4, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Draw = interpolate(frame, [12, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Detail cards pop below each checkpoint
  const detail1Pop = spring({
    frame: Math.max(0, frame - 6),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });
  const detail2Pop = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });
  const detail3Pop = spring({
    frame: Math.max(0, frame - 22),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });
  const detailPops = [detail1Pop, detail2Pop, detail3Pop];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <defs>
        <filter
          id="phase-shadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="4"
            floodColor={COLORS.primary}
            floodOpacity="0.15"
          />
        </filter>
      </defs>

      {/* Background track line */}
      <rect x="120" y="273" width="360" height="4" rx="2" fill="#E5E7EB" />

      {/* Connecting line segment 1 (Setup -> Train) */}
      <rect
        x="140"
        y="272"
        width={160 * line1Draw}
        height="6"
        rx="3"
        fill={COLORS.primary}
      />

      {/* Connecting line segment 2 (Train -> Deploy) */}
      <rect
        x="300"
        y="272"
        width={160 * line2Draw}
        height="6"
        rx="3"
        fill={COLORS.primary}
      />

      {/* Checkpoints */}
      {phases.map((phase, i) => {
        const pointPop = spring({
          frame: Math.max(0, frame - phase.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 120 },
        });

        // Checkmark appears after checkpoint
        const checkOp = interpolate(
          frame,
          [phase.delay + 4, phase.delay + 8],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <g key={`phase-${i}`}>
            {/* Outer glow ring */}
            <circle
              cx={phase.x}
              cy="275"
              r={32 * pointPop}
              fill={COLORS.primary}
              opacity={pointPop * 0.1}
            />

            {/* Checkpoint circle */}
            <g
              transform={`translate(${phase.x}, 275) scale(${pointPop})`}
              opacity={pointPop}
              filter="url(#phase-shadow)"
            >
              <circle
                cx="0"
                cy="0"
                r="24"
                fill="white"
                stroke={COLORS.primary}
                strokeWidth="3"
              />

              {/* Number or checkmark */}
              {checkOp > 0.5 ? (
                <path
                  d="M -8 0 L -3 6 L 9 -6"
                  fill="none"
                  stroke={COLORS.primary}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={checkOp}
                />
              ) : (
                <text
                  x="0"
                  y="7"
                  textAnchor="middle"
                  fill={COLORS.primary}
                  fontSize="20"
                  fontWeight="900"
                  fontFamily={FONT}
                >
                  {i + 1}
                </text>
              )}
            </g>

            {/* Phase label above */}
            <text
              x={phase.x}
              y="225"
              textAnchor="middle"
              fill={COLORS.darkGray}
              fontSize="16"
              fontWeight="800"
              fontFamily={FONT}
              letterSpacing="2"
              opacity={pointPop}
            >
              {phase.label}
            </text>

            {/* Detail card below */}
            <g
              transform={`translate(${phase.x}, 345) scale(${detailPops[i]})`}
              opacity={detailPops[i]}
            >
              <rect
                x="-58"
                y="-22"
                width="116"
                height="74"
                rx="10"
                fill="white"
                stroke="#E5E7EB"
                strokeWidth="1.5"
              />
              {/* Sub-label text */}
              <text
                x="0"
                y="2"
                textAnchor="middle"
                fill={COLORS.gray}
                fontSize="11"
                fontWeight="600"
                fontFamily={FONT}
              >
                {phase.sublabel}
              </text>
              {/* Phase-specific icon */}
              {i === 0 && (
                <g>
                  {/* Gear icon for Setup */}
                  <circle
                    cx="0"
                    cy="28"
                    r="10"
                    fill="none"
                    stroke={COLORS.primary}
                    strokeWidth="2"
                    opacity={0.5}
                  />
                  <circle cx="0" cy="28" r="3" fill={COLORS.primary} opacity={0.5} />
                </g>
              )}
              {i === 1 && (
                <g>
                  {/* Brain icon for Train */}
                  <path
                    d="M -8 24 C -8 20 -4 18 0 18 C 4 18 8 20 8 24 C 8 28 4 32 0 36 C -4 32 -8 28 -8 24"
                    fill="none"
                    stroke={COLORS.primary}
                    strokeWidth="1.5"
                    opacity={0.5}
                  />
                </g>
              )}
              {i === 2 && (
                <g>
                  {/* Rocket icon for Deploy */}
                  <path
                    d="M 0 20 L -5 30 L 0 28 L 5 30 Z"
                    fill={COLORS.primary}
                    opacity={0.5}
                  />
                  <path
                    d="M -3 30 L 0 36 L 3 30"
                    fill={COLORS.secondary}
                    opacity={0.4}
                  />
                </g>
              )}
              {/* Connector from checkpoint to card */}
              <path d="M 0 -30 L 0 -22" stroke="#E5E7EB" strokeWidth="2" />
            </g>
          </g>
        );
      })}

      {/* Completion badge at far right when all phases done */}
      {(() => {
        const donePop = spring({
          frame: Math.max(0, frame - 24),
          fps,
          from: 0,
          to: 1,
          config: { damping: 8, stiffness: 140 },
        });
        return (
          <g
            transform={`translate(530, 275) scale(${donePop})`}
            opacity={donePop}
          >
            <circle cx="0" cy="0" r="16" fill={COLORS.success} />
            <path
              d="M -6 0 L -2 5 L 7 -5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        );
      })()}
    </svg>
  );
};
