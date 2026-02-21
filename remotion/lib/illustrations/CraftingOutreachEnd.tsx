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
 * CraftingOutreachEnd — 14 UNIQUE illustration components
 * End/outro section of Crafting Outreach Campaign video.
 * Each component is a completely different visual scene with multi-stage animation.
 * Design: Clean vectors on white bg, Apple aesthetic, animated with spring/interpolate.
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
// 1. FinalTipsChecklist — Animated checklist with clipboard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const FinalTipsChecklist: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stage 1: Clipboard frame draws in (0-6)
  const clipboardScale = spring({
    frame,
    fps,
    from: 0.4,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });
  const clipboardOpacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stage 2: Title "FINAL TIPS" (4-8)
  const titleOpacity = interpolate(frame, [4, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const items = [
    { text: "Test the AI back and forth", drawStart: 6, checkStart: 10 },
    { text: "Refine your campaign brain", drawStart: 12, checkStart: 16 },
    { text: "Review copy quality", drawStart: 18, checkStart: 22 },
  ];

  // Stage 6: "READY!" stamp (26+)
  const stampScale = spring({
    frame: Math.max(0, frame - 26),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <defs>
        <filter id="ftcShadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="4" stdDeviation="10" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Clipboard body */}
      <g opacity={clipboardOpacity} transform={`scale(${clipboardScale})`} style={{ transformOrigin: "300px 300px" }}>
        <rect
          x="140"
          y="100"
          width="320"
          height="400"
          rx="16"
          fill="white"
          filter="url(#ftcShadow)"
          stroke={LIGHT_GRAY}
          strokeWidth="2"
        />
        {/* Clip at top */}
        <rect x="240" y="82" width="120" height="36" rx="8" fill={LIGHT_GRAY} />
        <rect x="260" y="88" width="80" height="24" rx="6" fill="white" stroke={GRAY} strokeWidth="1.5" />
      </g>

      {/* Title: FINAL TIPS */}
      <text
        x="300"
        y="168"
        textAnchor="middle"
        fontSize="18"
        fontWeight="800"
        fill={BLACK}
        fontFamily={FONT}
        letterSpacing="4"
        opacity={titleOpacity}
      >
        FINAL TIPS
      </text>
      <rect
        x={300 - 40 * titleOpacity}
        y="178"
        width={80 * titleOpacity}
        height="3"
        rx="1.5"
        fill={ORANGE}
      />

      {/* Checklist items */}
      {items.map((item, i) => {
        const lineProgress = interpolate(frame, [item.drawStart, item.drawStart + 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const checkFill = spring({
          frame: Math.max(0, frame - item.checkStart),
          fps,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 120 },
        });

        const y = 230 + i * 70;

        return (
          <g key={i} opacity={lineProgress}>
            {/* Checkbox */}
            <rect
              x="180"
              y={y - 14}
              width="28"
              height="28"
              rx="6"
              fill={checkFill > 0.5 ? GREEN : "white"}
              stroke={checkFill > 0.5 ? GREEN : LIGHT_GRAY}
              strokeWidth="2.5"
            />
            {/* Checkmark */}
            {checkFill > 0.5 && (
              <path
                d={`M ${187} ${y + 2} L ${192} ${y + 7} L ${202} ${y - 5}`}
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={checkFill}
              />
            )}
            {/* Text */}
            <text
              x="222"
              y={y + 5}
              fontSize="17"
              fontWeight="600"
              fill={checkFill > 0.5 ? BLACK : GRAY}
              fontFamily={FONT}
              opacity={lineProgress}
            >
              {item.text}
            </text>
          </g>
        );
      })}

      {/* "READY!" stamp */}
      <g
        opacity={stampScale}
        transform={`translate(380, 440) rotate(-12) scale(${stampScale})`}
      >
        <rect x="-55" y="-20" width="110" height="40" rx="6" fill="none" stroke={ORANGE} strokeWidth="4" />
        <text
          x="0"
          y="8"
          textAnchor="middle"
          fontSize="24"
          fontWeight="900"
          fill={ORANGE}
          fontFamily={FONT}
          letterSpacing="4"
        >
          READY!
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. TestAIBackAndForth — Ping-pong exchange visualization
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const TestAIBackAndForth: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Panels appear (0-6)
  const panelReveal = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  // Ball bounces
  const bounces = [
    { start: 4, end: 10, fromX: 175, toX: 425 },   // YOU -> AI
    { start: 8, end: 14, fromX: 425, toX: 175 },    // AI -> YOU
    { start: 12, end: 18, fromX: 175, toX: 425 },   // YOU -> AI (faster)
    { start: 16, end: 22, fromX: 425, toX: 175 },   // AI -> YOU (faster)
  ];

  const currentBounce = bounces.findIndex(
    (b) => frame >= b.start && frame < b.end + 4
  );
  const completedBounces = bounces.filter((b) => frame >= b.end).length;

  // Speed lines (20+)
  const speedLineOpacity = interpolate(frame, [20, 22], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Counter (22+)
  const counterReveal = spring({
    frame: Math.max(0, frame - 22),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {/* Left panel: YOU */}
      <g opacity={panelReveal}>
        <rect x="80" y="120" width="190" height="300" rx="16" fill="white" stroke={GRAY} strokeWidth="2.5" />
        <text
          x="175"
          y="160"
          textAnchor="middle"
          fontSize="20"
          fontWeight="800"
          fill={BLACK}
          fontFamily={FONT}
          letterSpacing="3"
        >
          YOU
        </text>
      </g>

      {/* Right panel: AI */}
      <g opacity={panelReveal}>
        <rect x="330" y="120" width="190" height="300" rx="16" fill="white" stroke={ORANGE} strokeWidth="2.5" />
        <text
          x="425"
          y="160"
          textAnchor="middle"
          fontSize="20"
          fontWeight="800"
          fill={ORANGE}
          fontFamily={FONT}
          letterSpacing="3"
        >
          AI
        </text>
      </g>

      {/* Bouncing ball/message dot */}
      {bounces.map((b, i) => {
        if (frame < b.start) return null;
        const progress = interpolate(frame, [b.start, b.end], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const ballX = interpolate(progress, [0, 1], [b.fromX, b.toX]);
        const arcY = 280 + Math.sin(progress * Math.PI) * -60;
        const ballOpacity = frame < b.end + 6 ? 1 : 0;

        // Ripple at impact point
        const impactProgress = frame >= b.end ? interpolate(frame, [b.end, b.end + 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }) : 0;

        return (
          <g key={i}>
            {ballOpacity > 0 && progress <= 1 && (
              <circle cx={ballX} cy={arcY} r="14" fill={ORANGE} opacity={0.9} />
            )}
            {/* Ripple at landing */}
            {impactProgress > 0 && impactProgress < 1 && (
              <circle
                cx={b.toX}
                cy={280}
                r={14 + impactProgress * 30}
                fill="none"
                stroke={ORANGE}
                strokeWidth="2"
                opacity={(1 - impactProgress) * 0.5}
              />
            )}
          </g>
        );
      })}

      {/* Speed lines between panels */}
      {speedLineOpacity > 0 && [0, 1, 2, 3, 4].map((i) => (
        <line
          key={`speed-${i}`}
          x1="280"
          y1={220 + i * 30}
          x2="320"
          y2={220 + i * 30}
          stroke={ORANGE}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 4"
          opacity={speedLineOpacity}
        />
      ))}

      {/* Iteration counter */}
      <g opacity={counterReveal} transform={`translate(300, 480) scale(${counterReveal})`}>
        <rect x="-60" y="-18" width="120" height="36" rx="18" fill={ORANGE} opacity={0.1} />
        <text
          x="-10"
          y="7"
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          fill={GRAY}
          fontFamily={FONT}
          letterSpacing="2"
        >
          ITERATION
        </text>
        <text
          x="48"
          y="8"
          textAnchor="middle"
          fontSize="18"
          fontWeight="900"
          fill={ORANGE}
          fontFamily={FONT}
        >
          x{completedBounces}
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. CampaignBrainEndV2 — HERO — Top-down mind map brain
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CampaignBrainEndV2: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 300;
  const cy = 290;
  const mapRadius = 210;

  // Stage 1: Dotted circle boundary (0-6)
  const boundaryCircumference = 2 * Math.PI * mapRadius;
  const boundaryDraw = interpolate(frame, [0, 6], [boundaryCircumference, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stage 2: Central "BRAIN" node (4-10)
  const brainScale = spring({
    frame: Math.max(0, frame - 4),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });

  // Stage 3: Branch lines (8-18, staggered)
  const branches = [
    { angle: -90, label: "STRATEGY", icon: "chess" },
    { angle: -30, label: "AUDIENCE", icon: "people" },
    { angle: 30, label: "COPY", icon: "pen" },
    { angle: 150, label: "METRICS", icon: "chart" },
    { angle: 210, label: "TIMING", icon: "clock" },
  ];

  const branchLen = 140;

  // Stage 5: Interconnections (20+)
  const connectOpacity = interpolate(frame, [20, 24], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stage 6: Pulse dot traveling (24+)
  const pulseTravel = frame >= 24 ? interpolate((frame - 24) % 30, [0, 30], [0, 1]) : 0;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {/* Dotted circle boundary */}
      <circle
        cx={cx}
        cy={cy}
        r={mapRadius}
        fill="none"
        stroke={LIGHT_GRAY}
        strokeWidth="2"
        strokeDasharray="8 6"
        strokeDashoffset={boundaryDraw}
      />

      {/* Branch lines with stroke-dashoffset animation */}
      {branches.map((b, i) => {
        const rad = (b.angle * Math.PI) / 180;
        const ex = cx + branchLen * Math.cos(rad);
        const ey = cy + branchLen * Math.sin(rad);
        const lineLen = Math.sqrt((ex - cx) ** 2 + (ey - cy) ** 2);
        const lineProgress = interpolate(frame, [8 + i * 2, 18 + i * 2], [lineLen, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // Endpoint icon/badge (14-24, spring pop)
        const iconScale = spring({
          frame: Math.max(0, frame - 14 - i * 2),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 120 },
        });

        return (
          <g key={i}>
            <line
              x1={cx}
              y1={cy}
              x2={ex}
              y2={ey}
              stroke={ORANGE}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={lineLen}
              strokeDashoffset={lineProgress}
              opacity={0.6}
            />
            {/* Endpoint badge */}
            <g transform={`translate(${ex}, ${ey}) scale(${iconScale})`} opacity={iconScale}>
              <circle cx="0" cy="0" r="30" fill="white" stroke={ORANGE} strokeWidth="2" />
              {/* Simple icon per type */}
              {b.icon === "chess" && (
                <path d="M 0 -12 L -6 -4 L -10 -4 L -10 8 L 10 8 L 10 -4 L 6 -4 Z" fill={ORANGE} opacity={0.8} />
              )}
              {b.icon === "people" && (
                <g>
                  <circle cx="-6" cy="-6" r="5" fill={ORANGE} opacity={0.8} />
                  <circle cx="6" cy="-6" r="5" fill={ORANGE} opacity={0.8} />
                  <path d="M -14 8 Q -14 0 -6 0 Q 0 0 0 8" fill={ORANGE} opacity={0.6} />
                  <path d="M 0 8 Q 0 0 6 0 Q 14 0 14 8" fill={ORANGE} opacity={0.6} />
                </g>
              )}
              {b.icon === "pen" && (
                <path d="M -4 10 L -8 14 L 8 -10 L 4 -14 Z M -8 14 L -12 12 L -4 10 Z" fill={ORANGE} opacity={0.8} transform="translate(2, -2)" />
              )}
              {b.icon === "chart" && (
                <g>
                  <rect x="-10" y="0" width="6" height="10" rx="1" fill={ORANGE} opacity={0.7} />
                  <rect x="-3" y="-6" width="6" height="16" rx="1" fill={ORANGE} opacity={0.85} />
                  <rect x="4" y="-3" width="6" height="13" rx="1" fill={ORANGE} opacity={0.7} />
                </g>
              )}
              {b.icon === "clock" && (
                <g>
                  <circle cx="0" cy="0" r="12" fill="none" stroke={ORANGE} strokeWidth="2" />
                  <line x1="0" y1="0" x2="0" y2="-8" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="6" y2="2" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" />
                </g>
              )}
              {/* Label below circle */}
              <text
                x="0"
                y="46"
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill={GRAY}
                fontFamily={FONT}
                letterSpacing="1.5"
              >
                {b.label}
              </text>
            </g>
          </g>
        );
      })}

      {/* Interconnecting lines between adjacent endpoints */}
      {connectOpacity > 0 && branches.map((b, i) => {
        const next = branches[(i + 1) % branches.length];
        const rad1 = (b.angle * Math.PI) / 180;
        const rad2 = (next.angle * Math.PI) / 180;
        const x1 = cx + branchLen * Math.cos(rad1);
        const y1 = cy + branchLen * Math.sin(rad1);
        const x2 = cx + branchLen * Math.cos(rad2);
        const y2 = cy + branchLen * Math.sin(rad2);
        return (
          <line
            key={`conn-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={ORANGE}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity={connectOpacity}
          />
        );
      })}

      {/* Central BRAIN node */}
      <g transform={`translate(${cx}, ${cy}) scale(${brainScale})`} opacity={brainScale}>
        <circle cx="0" cy="0" r="42" fill={ORANGE} />
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fontSize="16"
          fontWeight="900"
          fill="white"
          fontFamily={FONT}
          letterSpacing="3"
        >
          BRAIN
        </text>
      </g>

      {/* Pulse of light traveling along first branch */}
      {frame >= 24 && (() => {
        const rad = (branches[0].angle * Math.PI) / 180;
        const px = cx + branchLen * pulseTravel * Math.cos(rad);
        const py = cy + branchLen * pulseTravel * Math.sin(rad);
        return (
          <circle
            cx={px}
            cy={py}
            r="6"
            fill={ORANGE}
            opacity={0.8 * (1 - pulseTravel * 0.5)}
          />
        );
      })()}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. LiveRepliesChat — HERO — Phone mockup with live conversation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const LiveRepliesChat: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone outline (0-6)
  const phoneReveal = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  // Chat header (4-10)
  const headerOpacity = interpolate(frame, [4, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Message bubbles
  const bubbles = [
    { side: "right" as const, text: "Hi! I saw your work on...", y: 200, delay: 8 },
    { side: "left" as const, text: "Yes! I'm interested...", y: 264, delay: 12 },
    { side: "right" as const, text: "Great! Let me send details", y: 328, delay: 16 },
    { side: "left" as const, text: "When can we meet?", y: 392, delay: 20 },
  ];

  // Typing indicator (22+)
  const typingReveal = spring({
    frame: Math.max(0, frame - 22),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  const dotBounce = (dotIndex: number) =>
    interpolate((frame + dotIndex * 5) % 20, [0, 10, 20], [0, -5, 0]);

  // Notification badge (24+)
  const badgeScale = spring({
    frame: Math.max(0, frame - 24),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {/* Phone body */}
      <g opacity={phoneReveal}>
        <rect x="150" y="60" width="300" height="480" rx="28" fill="white" stroke={GRAY} strokeWidth="2" />
        {/* Status bar */}
        <g opacity={interpolate(frame, [2, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          <circle cx="180" cy="82" r="2.5" fill={BLACK} />
          <circle cx="188" cy="82" r="2.5" fill={BLACK} />
          <circle cx="196" cy="82" r="2.5" fill={BLACK} opacity={0.5} />
          <text x="410" y="87" textAnchor="end" fontSize="12" fontWeight="600" fill={BLACK} fontFamily={FONT}>
            9:41
          </text>
        </g>

        {/* Chat header */}
        <g opacity={headerOpacity}>
          <rect x="150" y="96" width="300" height="48" fill="#FAFAFA" />
          <line x1="150" y1="144" x2="450" y2="144" stroke={LIGHT_GRAY} strokeWidth="1" />
          {/* Back arrow */}
          <path d="M 174 120 L 166 120 L 172 114 M 166 120 L 172 126" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
          <text x="300" y="125" textAnchor="middle" fontSize="13" fontWeight="700" fill={BLACK} fontFamily={FONT} letterSpacing="1">
            CAMPAIGN RESPONSES
          </text>
        </g>
      </g>

      {/* Message bubbles */}
      {bubbles.map((b, i) => {
        const slideProgress = spring({
          frame: Math.max(0, frame - b.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 100 },
        });

        const isRight = b.side === "right";
        const bw = 180;
        const bx = isRight ? 440 - bw : 168;
        const slideFrom = isRight ? 30 : -30;

        return (
          <g key={i} opacity={slideProgress} transform={`translate(${slideFrom * (1 - slideProgress)}, 0)`}>
            <rect
              x={bx}
              y={b.y}
              width={bw}
              height="46"
              rx="18"
              fill={isRight ? ORANGE : "#F0F0F0"}
            />
            {/* Tail */}
            {isRight ? (
              <circle cx={bx + bw - 6} cy={b.y + 38} r="6" fill={ORANGE} />
            ) : (
              <circle cx={bx + 6} cy={b.y + 38} r="6" fill="#F0F0F0" />
            )}
            {/* Text placeholder lines */}
            <rect
              x={bx + 16}
              y={b.y + 14}
              width={bw * 0.6}
              height="4"
              rx="2"
              fill={isRight ? "white" : GRAY}
              opacity={0.4}
            />
            <rect
              x={bx + 16}
              y={b.y + 24}
              width={bw * 0.35}
              height="4"
              rx="2"
              fill={isRight ? "white" : GRAY}
              opacity={0.25}
            />
          </g>
        );
      })}

      {/* Typing indicator */}
      <g opacity={typingReveal} transform={`translate(176, 446)`}>
        <rect x="0" y="0" width="60" height="30" rx="15" fill="#F0F0F0" />
        {[0, 1, 2].map((d) => (
          <circle
            key={d}
            cx={16 + d * 14}
            cy={15 + dotBounce(d)}
            r="4"
            fill={GRAY}
            opacity={0.6}
          />
        ))}
      </g>

      {/* Notification badge "4 NEW" */}
      <g
        opacity={badgeScale}
        transform={`translate(430, 72) scale(${badgeScale})`}
      >
        <rect x="-26" y="-10" width="52" height="20" rx="10" fill={RED} />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="white"
          fontFamily={FONT}
          letterSpacing="1"
        >
          4 NEW
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. SetupTimerTwentyMin — Clock showing "just 20 minutes"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SetupTimerTwentyMin: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 300;
  const cy = 250;
  const clockR = 140;

  // Clock face draws (0-6)
  const faceReveal = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  // Numbers appear (4-10)
  const numsOpacity = interpolate(frame, [4, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Minute hand sweeps from 12 to 4 (0 to 120 degrees) (6-18)
  const minuteAngle = interpolate(frame, [6, 18], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Orange pie slice fills (10-16)
  const pieOpacity = interpolate(frame, [10, 16], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "20 MINUTES" counter (14-20)
  const textPunch = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  // DONE badge at 4-position (18+)
  const doneScale = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  // Subtle glow (20+)
  const glowOpacity = interpolate(frame, [20, 24], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Build pie slice path from 12 to current minute hand position
  const pieEndAngle = (-90 + minuteAngle) * (Math.PI / 180);
  const pieStartAngle = -90 * (Math.PI / 180);
  const largeArc = minuteAngle > 180 ? 1 : 0;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {/* Glow */}
      <circle cx={cx} cy={cy} r={clockR + 20} fill={ORANGE} opacity={glowOpacity} />

      {/* Clock face */}
      <circle cx={cx} cy={cy} r={clockR} fill="white" stroke={LIGHT_GRAY} strokeWidth="3" opacity={faceReveal} />

      {/* 12 tick marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * 360 - 90;
        const rad = (a * Math.PI) / 180;
        const isMajor = i % 3 === 0;
        return (
          <line
            key={`tick-${i}`}
            x1={cx + (clockR - (isMajor ? 18 : 10)) * Math.cos(rad)}
            y1={cy + (clockR - (isMajor ? 18 : 10)) * Math.sin(rad)}
            x2={cx + (clockR - 4) * Math.cos(rad)}
            y2={cy + (clockR - 4) * Math.sin(rad)}
            stroke={isMajor ? BLACK : LIGHT_GRAY}
            strokeWidth={isMajor ? 3 : 1.5}
            strokeLinecap="round"
            opacity={faceReveal}
          />
        );
      })}

      {/* Cardinal numbers */}
      {[
        { label: "12", a: -90 },
        { label: "3", a: 0 },
        { label: "6", a: 90 },
        { label: "9", a: 180 },
      ].map((n) => {
        const rad = (n.a * Math.PI) / 180;
        return (
          <text
            key={n.label}
            x={cx + (clockR - 32) * Math.cos(rad)}
            y={cy + (clockR - 32) * Math.sin(rad) + 5}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={GRAY}
            fontFamily={FONT}
            opacity={numsOpacity}
          >
            {n.label}
          </text>
        );
      })}

      {/* Orange pie slice from 12 to 4 */}
      {minuteAngle > 0 && (
        <path
          d={`M ${cx} ${cy} L ${cx + clockR * 0.85 * Math.cos(pieStartAngle)} ${cy + clockR * 0.85 * Math.sin(pieStartAngle)} A ${clockR * 0.85} ${clockR * 0.85} 0 ${largeArc} 1 ${cx + clockR * 0.85 * Math.cos(pieEndAngle)} ${cy + clockR * 0.85 * Math.sin(pieEndAngle)} Z`}
          fill={ORANGE}
          opacity={pieOpacity}
        />
      )}

      {/* Minute hand sweeping */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + (clockR - 30) * Math.cos((-90 + minuteAngle) * Math.PI / 180)}
        y2={cy + (clockR - 30) * Math.sin((-90 + minuteAngle) * Math.PI / 180)}
        stroke={ORANGE}
        strokeWidth="4"
        strokeLinecap="round"
        opacity={faceReveal}
      />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="6" fill={ORANGE} opacity={faceReveal} />

      {/* "20 MINUTES" text below */}
      <text
        x={cx}
        y="440"
        textAnchor="middle"
        fontSize={38 * textPunch}
        fontWeight="900"
        fill={BLACK}
        fontFamily={FONT}
        letterSpacing="2"
        opacity={textPunch}
      >
        20 MINUTES
      </text>

      {/* "DONE!" badge at 4-position */}
      {(() => {
        const doneAngle = 30 * (Math.PI / 180); // 4 o'clock = 120deg from 12 = 30deg from 3
        const doneX = cx + (clockR + 30) * Math.cos(doneAngle);
        const doneY = cy + (clockR + 30) * Math.sin(doneAngle);
        return (
          <g opacity={doneScale} transform={`translate(${doneX}, ${doneY}) scale(${doneScale})`}>
            <rect x="-28" y="-12" width="56" height="24" rx="12" fill={GREEN} />
            <text x="0" y="5" textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily={FONT} letterSpacing="1">
              DONE!
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. StrategyWhiteboardScene — HERO — Whiteboard strategy session
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const StrategyWhiteboardScene: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Whiteboard appears (0-6)
  const boardReveal = spring({
    frame,
    fps,
    from: 0.85,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  // Markers at bottom (2-6)
  const markersOpacity = interpolate(frame, [2, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Center "GOAL" circle (4-12)
  const goalCirc = 2 * Math.PI * 50;
  const goalDraw = interpolate(frame, [4, 12], [goalCirc, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const goalTextOp = interpolate(frame, [8, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow lines to boxes (8-16)
  const boxes = [
    { label: "WHO", x: 300, y: 150, color: BLUE, icon: "people" },
    { label: "WHAT", x: 460, y: 300, color: GREEN, icon: "envelope" },
    { label: "HOW", x: 300, y: 450, color: ORANGE, icon: "gear" },
  ];

  // Details inside boxes (12-20)
  // Annotations (16-24)
  // Star highlight on HOW (20+)
  const starScale = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  // Sticky note (24+)
  const stickyScale = spring({
    frame: Math.max(0, frame - 24),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <defs>
        <filter id="swbShadow" x="-3%" y="-3%" width="106%" height="110%">
          <feDropShadow dx="0" dy="3" stdDeviation="8" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* Whiteboard */}
      <g opacity={boardReveal}>
        <rect x="80" y="80" width="440" height="440" rx="12" fill="white" stroke={LIGHT_GRAY} strokeWidth="2" filter="url(#swbShadow)" />
      </g>

      {/* Markers at bottom edge */}
      <g opacity={markersOpacity}>
        <rect x="220" y="510" width="30" height="8" rx="2" fill={ORANGE} />
        <rect x="260" y="510" width="30" height="8" rx="2" fill={BLUE} />
        <rect x="300" y="510" width="30" height="8" rx="2" fill={GREEN} />
      </g>

      {/* Center "GOAL" circle */}
      <circle
        cx="300"
        cy="300"
        r="50"
        fill="none"
        stroke={BLACK}
        strokeWidth="3"
        strokeDasharray={goalCirc}
        strokeDashoffset={goalDraw}
        strokeLinecap="round"
      />
      <text
        x="300"
        y="307"
        textAnchor="middle"
        fontSize="20"
        fontWeight="800"
        fill={BLACK}
        fontFamily={FONT}
        letterSpacing="3"
        opacity={goalTextOp}
      >
        GOAL
      </text>

      {/* Arrow lines + boxes */}
      {boxes.map((box, i) => {
        const lineProgress = interpolate(frame, [8 + i * 2, 16 + i * 2], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const boxScale = spring({
          frame: Math.max(0, frame - 12 - i * 2),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 100 },
        });

        // Icon detail (12-20)
        const iconReveal = interpolate(frame, [12 + i * 3, 20 + i * 3], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const dx = box.x - 300;
        const dy = box.y - 300;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const normX = dx / dist;
        const normY = dy / dist;
        const startX = 300 + normX * 54;
        const startY = 300 + normY * 54;

        return (
          <g key={i}>
            {/* Arrow line */}
            <line
              x1={startX}
              y1={startY}
              x2={startX + (box.x - startX) * lineProgress}
              y2={startY + (box.y - startY) * lineProgress}
              stroke={box.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={0.7}
            />

            {/* Box */}
            <g transform={`translate(${box.x}, ${box.y}) scale(${boxScale})`} opacity={boxScale}>
              <rect x="-45" y="-28" width="90" height="56" rx="10" fill="white" stroke={box.color} strokeWidth="2.5" />
              <text
                x="0"
                y="-6"
                textAnchor="middle"
                fontSize="16"
                fontWeight="800"
                fill={BLACK}
                fontFamily={FONT}
                letterSpacing="2"
              >
                {box.label}
              </text>
              {/* Icons inside box */}
              <g opacity={iconReveal}>
                {box.icon === "people" && (
                  <g transform="translate(0, 14)">
                    <circle cx="-8" cy="0" r="4" fill={box.color} opacity={0.6} />
                    <circle cx="8" cy="0" r="4" fill={box.color} opacity={0.6} />
                  </g>
                )}
                {box.icon === "envelope" && (
                  <rect x="-10" y="8" width="20" height="14" rx="3" fill="none" stroke={box.color} strokeWidth="1.5" opacity={0.6} />
                )}
                {box.icon === "gear" && (
                  <circle cx="0" cy="14" r="7" fill="none" stroke={box.color} strokeWidth="1.5" opacity={0.6} />
                )}
              </g>
            </g>
          </g>
        );
      })}

      {/* Annotation arrows (16-24) — small hand-drawn-style notes */}
      {frame >= 16 && (
        <g opacity={interpolate(frame, [16, 24], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          <text x="170" y="170" fontSize="11" fontWeight="500" fill={GRAY} fontFamily={FONT} transform="rotate(-5, 170, 170)">
            target audience
          </text>
          <text x="440" y="230" fontSize="11" fontWeight="500" fill={GRAY} fontFamily={FONT} transform="rotate(3, 440, 230)">
            messaging
          </text>
        </g>
      )}

      {/* Star highlight on HOW */}
      <g opacity={starScale} transform={`translate(350, 430) scale(${starScale})`}>
        <polygon
          points="0,-12 3,-4 12,-4 5,2 7,10 0,5 -7,10 -5,2 -12,-4 -3,-4"
          fill={ORANGE}
        />
      </g>

      {/* Sticky note at edge */}
      <g opacity={stickyScale} transform={`translate(480, 140) rotate(5) scale(${stickyScale})`}>
        <rect x="-30" y="-18" width="60" height="36" rx="2" fill="#FEF3C7" />
        <text x="0" y="4" textAnchor="middle" fontSize="12" fontWeight="800" fill={ORANGE} fontFamily={FONT}>
          KEY!
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. HourglassTimerSession — Hourglass for strategy time
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const HourglassTimerSession: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 300;
  const topY = 130;
  const midY = 290;
  const botY = 450;

  // Hourglass outline draws (0-6)
  const glassReveal = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });

  // Top chamber fills with sand particles (4-10)
  const topSandOpacity = interpolate(frame, [4, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sand streaming through neck (8-30)
  const sandParticles = Array.from({ length: 10 }).map((_, i) => {
    const cycle = 40;
    const offset = i * (cycle / 10);
    const fallProgress = interpolate(
      (frame - 8 + offset + cycle) % cycle,
      [0, cycle],
      [0, 1],
    );
    const startY = midY - 4;
    const endY = botY - 30 + (i % 3) * 10;
    const y = startY + (endY - startY) * fallProgress;
    const visible = frame >= 8 && fallProgress < 0.95;
    return { x: cx + Math.sin(i * 1.7) * 4, y, visible };
  });

  // Fill progress: bottom accumulates
  const fillProgress = interpolate(frame, [8, 60], [0, 0.65], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "1-2 HRS" label (20+)
  const labelReveal = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // Sparkle at neck (24+)
  const sparkleOpacity = frame >= 24 ? interpolate(frame % 16, [0, 8, 16], [0.8, 0.2, 0.8]) : 0;

  // Progress bar (28+)
  const barReveal = spring({
    frame: Math.max(0, frame - 28),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <g opacity={glassReveal}>
        {/* Top/bottom caps */}
        <rect x={cx - 80} y={topY - 10} width="160" height="10" rx="5" fill={BLACK} />
        <rect x={cx - 80} y={botY} width="160" height="10" rx="5" fill={BLACK} />

        {/* Top triangle (funnel) */}
        <path
          d={`M ${cx - 70} ${topY} L ${cx + 70} ${topY} L ${cx + 8} ${midY - 8} L ${cx - 8} ${midY - 8} Z`}
          fill="white"
          stroke={BLACK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Bottom triangle (inverted) */}
        <path
          d={`M ${cx - 8} ${midY + 8} L ${cx + 8} ${midY + 8} L ${cx + 70} ${botY} L ${cx - 70} ${botY} Z`}
          fill="white"
          stroke={BLACK}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Top sand (depleting) */}
        <path
          d={`M ${cx - 60 * (1 - fillProgress)} ${topY + 8 + 110 * fillProgress}
              L ${cx + 60 * (1 - fillProgress)} ${topY + 8 + 110 * fillProgress}
              L ${cx + 6} ${midY - 10}
              L ${cx - 6} ${midY - 10} Z`}
          fill={ORANGE}
          opacity={topSandOpacity * 0.3}
        />

        {/* Bottom sand (accumulating) */}
        <path
          d={`M ${cx - 6 - 54 * fillProgress} ${botY - 8 - 100 * fillProgress}
              L ${cx + 6 + 54 * fillProgress} ${botY - 8 - 100 * fillProgress}
              L ${cx + 66} ${botY - 2}
              L ${cx - 66} ${botY - 2} Z`}
          fill={ORANGE}
          opacity={0.35}
        />

        {/* Narrow neck stream */}
        <rect x={cx - 3} y={midY - 8} width="6" height="16" fill={ORANGE} opacity={0.25} />
      </g>

      {/* Falling sand particles */}
      {sandParticles.map((p, i) =>
        p.visible ? (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={ORANGE} opacity={0.7 * glassReveal} />
        ) : null
      )}

      {/* Sparkle at neck */}
      {sparkleOpacity > 0 && (
        <g>
          <line x1={cx - 8} y1={midY} x2={cx + 8} y2={midY} stroke={ORANGE} strokeWidth="1.5" opacity={sparkleOpacity} />
          <line x1={cx} y1={midY - 8} x2={cx} y2={midY + 8} stroke={ORANGE} strokeWidth="1.5" opacity={sparkleOpacity} />
        </g>
      )}

      {/* "1-2 HRS" label */}
      <text
        x={cx}
        y={botY + 46}
        textAnchor="middle"
        fontSize="28"
        fontWeight="900"
        fill={BLACK}
        fontFamily={FONT}
        letterSpacing="2"
        opacity={labelReveal}
      >
        1-2 HRS
      </text>

      {/* STRATEGY TIME progress bar */}
      <g opacity={barReveal}>
        <text
          x={cx}
          y={botY + 76}
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={GRAY}
          fontFamily={FONT}
          letterSpacing="3"
        >
          STRATEGY TIME
        </text>
        <rect x={cx - 60} y={botY + 84} width="120" height="6" rx="3" fill={LIGHT_GRAY} />
        <rect x={cx - 60} y={botY + 84} width={120 * fillProgress} height="6" rx="3" fill={ORANGE} />
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. CopyEditorTypewriter — Quality copy being crafted
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CopyEditorTypewriter: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Document appears (0-6)
  const docReveal = spring({
    frame,
    fps,
    from: 0.85,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  // Title line (4-10)
  const titleWidth = interpolate(frame, [4, 10], [0, 220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Body lines draw (6-14)
  const bodyLines = [
    { width: 280, delay: 6 },
    { width: 240, delay: 8 },
    { width: 200, delay: 10 },
    { width: 260, delay: 12 },
  ];

  // Red strike-through on line 2 (10-16)
  const strikeProgress = interpolate(frame, [10, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // New orange replacement line (14-20)
  const replaceWidth = interpolate(frame, [14, 20], [0, 220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pencil icon (16-22)
  const pencilScale = spring({
    frame: Math.max(0, frame - 16),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Quality seal (20-26)
  const sealScale = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  // Doc elevates (24+)
  const elevate = interpolate(frame, [24, 30], [0, -5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const docX = 130;
  const docY = 100;
  const docW = 340;
  const docH = 360;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <defs>
        <filter id="cetShadow" x="-5%" y="-3%" width="110%" height="112%">
          <feDropShadow dx="0" dy={4 + Math.abs(elevate)} stdDeviation={8 + Math.abs(elevate)} floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Document with dog-ear corner */}
      <g opacity={docReveal} transform={`translate(0, ${elevate})`}>
        <path
          d={`M ${docX} ${docY + 16} L ${docX} ${docY + docH} Q ${docX} ${docY + docH + 8} ${docX + 8} ${docY + docH + 8} L ${docX + docW - 8} ${docY + docH + 8} Q ${docX + docW} ${docY + docH + 8} ${docX + docW} ${docY + docH} L ${docX + docW} ${docY} L ${docX + docW - 36} ${docY} L ${docX} ${docY + 16} Z`}
          fill="white"
          filter="url(#cetShadow)"
          stroke={LIGHT_GRAY}
          strokeWidth="1.5"
        />
        {/* Dog-ear */}
        <path
          d={`M ${docX + docW - 36} ${docY} L ${docX + docW - 36} ${docY + 16} Q ${docX + docW - 36} ${docY + 20} ${docX + docW - 32} ${docY + 20} L ${docX + docW} ${docY + 20}`}
          fill="#F5F5F5"
          stroke={LIGHT_GRAY}
          strokeWidth="1"
        />

        {/* Title bar */}
        <rect x={docX + 30} y={docY + 40} width={titleWidth} height="8" rx="4" fill={BLACK} opacity={0.7} />

        {/* Body text lines */}
        {bodyLines.map((line, i) => {
          const lineWidth = interpolate(frame, [line.delay, line.delay + 4], [0, line.width], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const y = docY + 80 + i * 36;
          const isStrikeTarget = i === 1;

          return (
            <g key={i}>
              <rect
                x={docX + 30}
                y={y}
                width={lineWidth}
                height="5"
                rx="2.5"
                fill={isStrikeTarget && replaceWidth > 0 ? LIGHT_GRAY : GRAY}
                opacity={isStrikeTarget && strikeProgress > 0 ? 0.3 : 0.4}
              />
              {/* Strike-through on line 2 */}
              {isStrikeTarget && strikeProgress > 0 && (
                <line
                  x1={docX + 30}
                  y1={y + 2.5}
                  x2={docX + 30 + line.width * strikeProgress}
                  y2={y + 2.5}
                  stroke={RED}
                  strokeWidth="2"
                  opacity={0.6}
                />
              )}
              {/* Orange replacement line below line 2 */}
              {isStrikeTarget && replaceWidth > 0 && (
                <rect
                  x={docX + 30}
                  y={y + 14}
                  width={replaceWidth}
                  height="5"
                  rx="2.5"
                  fill={ORANGE}
                  opacity={0.7}
                />
              )}
            </g>
          );
        })}

        {/* Pencil/pen icon at edit position */}
        <g opacity={pencilScale} transform={`translate(${docX + 260}, ${docY + 100}) scale(${pencilScale})`}>
          <path d="M -4 8 L -8 12 L 6 -8 L 2 -12 Z" fill={ORANGE} />
          <path d="M -8 12 L -10 10 L -4 8 Z" fill={GRAY} />
        </g>
      </g>

      {/* Quality seal at bottom of document */}
      <g opacity={sealScale} transform={`translate(300, ${docY + docH + 50 + elevate}) scale(${sealScale})`}>
        <circle cx="0" cy="0" r="28" fill="none" stroke={ORANGE} strokeWidth="3" />
        <path d="M -10 0 L -4 6 L 10 -6" fill="none" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="0" y="48" textAnchor="middle" fontSize="11" fontWeight="700" fill={GRAY} fontFamily={FONT} letterSpacing="2">
          QUALITY APPROVED
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. InfinitePossibilitiesExpansion — Expanding universe of dots
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const InfinitePossibilitiesExpansion: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 300;
  const cy = 290;

  // Central dot (0-6)
  const centerScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });
  const centerGlow = interpolate(frame % 30, [0, 15, 30], [0.6, 1, 0.6]);

  // Ring 1: 4 dots (4-10)
  const ring1Scale = spring({
    frame: Math.max(0, frame - 4),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Ring 2: 8 dots (8-14)
  const ring2Scale = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Ring 3: 12 dots (12-18)
  const ring3Scale = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Cross-ring connections (16-22)
  const crossOpacity = interpolate(frame, [16, 22], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow expansion (20+)
  const expansion = frame >= 20 ? 1 + (frame - 20) * 0.003 : 1;

  // Infinity symbol replacing center (22+)
  const infinityDraw = interpolate(frame, [22, 28], [200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const infinityOpacity = interpolate(frame, [22, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Particle sparkles at edges (24+)
  const sparkleOpacity = frame >= 24 ? interpolate(frame % 20, [0, 10, 20], [0.4, 0.8, 0.4]) : 0;

  const ring1R = 60;
  const ring2R = 120;
  const ring3R = 180;

  const generateRing = (count: number, radius: number, dotR: number) =>
    Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      return {
        x: cx + radius * expansion * Math.cos(angle),
        y: cy + radius * expansion * Math.sin(angle),
        r: dotR,
      };
    });

  const ring1 = generateRing(4, ring1R, 5);
  const ring2 = generateRing(8, ring2R, 4);
  const ring3 = generateRing(12, ring3R, 3);

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {/* Ring 3 connecting lines */}
      {ring3Scale > 0.1 && ring3.map((dot, i) => {
        const next = ring3[(i + 1) % ring3.length];
        return (
          <line
            key={`r3l-${i}`}
            x1={dot.x}
            y1={dot.y}
            x2={next.x}
            y2={next.y}
            stroke={ORANGE}
            strokeWidth="1"
            opacity={ring3Scale * 0.2}
          />
        );
      })}

      {/* Ring 2 connecting lines */}
      {ring2Scale > 0.1 && ring2.map((dot, i) => {
        const next = ring2[(i + 1) % ring2.length];
        return (
          <line
            key={`r2l-${i}`}
            x1={dot.x}
            y1={dot.y}
            x2={next.x}
            y2={next.y}
            stroke={ORANGE}
            strokeWidth="1.2"
            opacity={ring2Scale * 0.25}
          />
        );
      })}

      {/* Ring 1 connecting lines */}
      {ring1Scale > 0.1 && ring1.map((dot, i) => {
        const next = ring1[(i + 1) % ring1.length];
        return (
          <line
            key={`r1l-${i}`}
            x1={dot.x}
            y1={dot.y}
            x2={next.x}
            y2={next.y}
            stroke={ORANGE}
            strokeWidth="1.5"
            opacity={ring1Scale * 0.3}
          />
        );
      })}

      {/* Cross-ring connections (some outer to inner) */}
      {crossOpacity > 0 && ring2.filter((_, i) => i % 2 === 0).map((dot, i) => (
        <line
          key={`cross-${i}`}
          x1={dot.x}
          y1={dot.y}
          x2={ring1[i % ring1.length].x}
          y2={ring1[i % ring1.length].y}
          stroke={ORANGE}
          strokeWidth="1.2"
          opacity={crossOpacity}
        />
      ))}

      {/* Ring 3 dots */}
      {ring3.map((dot, i) => (
        <circle
          key={`r3-${i}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.r}
          fill={ORANGE}
          opacity={ring3Scale * 0.6}
        />
      ))}

      {/* Ring 2 dots */}
      {ring2.map((dot, i) => (
        <circle
          key={`r2-${i}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.r}
          fill={ORANGE}
          opacity={ring2Scale * 0.7}
        />
      ))}

      {/* Ring 1 dots */}
      {ring1.map((dot, i) => (
        <circle
          key={`r1-${i}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.r}
          fill={ORANGE}
          opacity={ring1Scale * 0.85}
        />
      ))}

      {/* Central dot / infinity symbol */}
      {infinityOpacity < 0.5 && (
        <circle cx={cx} cy={cy} r={8} fill={ORANGE} opacity={centerScale * centerGlow} />
      )}
      {infinityOpacity > 0 && (
        <path
          d={`M ${cx} ${cy} C ${cx - 6} ${cy - 20} ${cx - 30} ${cy - 20} ${cx - 30} ${cy} C ${cx - 30} ${cy + 20} ${cx - 6} ${cy + 20} ${cx} ${cy} C ${cx + 6} ${cy - 20} ${cx + 30} ${cy - 20} ${cx + 30} ${cy} C ${cx + 30} ${cy + 20} ${cx + 6} ${cy + 20} ${cx} ${cy}`}
          fill="none"
          stroke={ORANGE}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={200}
          strokeDashoffset={infinityDraw}
          opacity={infinityOpacity}
        />
      )}

      {/* Faint sparkle particles at edges */}
      {sparkleOpacity > 0 && [30, 120, 210, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const dist = ring3R * expansion + 20;
        return (
          <circle
            key={`sparkle-${i}`}
            cx={cx + dist * Math.cos(rad)}
            cy={cy + dist * Math.sin(rad)}
            r="2"
            fill={ORANGE}
            opacity={sparkleOpacity * (i % 2 === 0 ? 1 : 0.6)}
          />
        );
      })}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. PerformanceGaugeDashboard — Three gauge arcs with metrics
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const PerformanceGaugeDashboard: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gauges = [
    { label: "REACH", pct: 85, color: ORANGE, delay: 6 },
    { label: "REPLIES", pct: 62, color: GREEN, delay: 10 },
    { label: "CLOSE", pct: 45, color: BLUE, delay: 14 },
  ];

  const gaugeR = 60;
  const semiCircumference = Math.PI * gaugeR;

  // Gauge arcs appear (0-6)
  const arcReveal = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  // Labels (4-8)
  const labelOpacity = interpolate(frame, [4, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CAMPAIGN LIVE indicator (20+)
  const livePulse = interpolate(frame % 30, [0, 15, 30], [1, 0.3, 1]);
  const liveOpacity = interpolate(frame, [20, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Overall score badge (24+)
  const scoreScale = spring({
    frame: Math.max(0, frame - 24),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {/* CAMPAIGN LIVE status */}
      <g opacity={liveOpacity}>
        <circle cx="245" cy="100" r="5" fill={GREEN} opacity={livePulse} />
        <text x="260" y="105" fontSize="14" fontWeight="700" fill={GREEN} fontFamily={FONT} letterSpacing="2">
          CAMPAIGN LIVE
        </text>
      </g>

      {/* Three gauges side by side */}
      {gauges.map((g, i) => {
        const gx = 130 + i * 170;
        const gy = 260;

        const fillProgress = interpolate(frame, [g.delay, g.delay + 8], [0, g.pct / 100], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // Animated count-up percentage (16-24)
        const countValue = Math.round(
          interpolate(frame, [16, 24], [0, g.pct], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        );

        return (
          <g key={i}>
            {/* Gray arc background */}
            <path
              d={`M ${gx - gaugeR} ${gy} A ${gaugeR} ${gaugeR} 0 0 1 ${gx + gaugeR} ${gy}`}
              fill="none"
              stroke={LIGHT_GRAY}
              strokeWidth="10"
              strokeLinecap="round"
              opacity={arcReveal}
            />
            {/* Colored fill arc */}
            <path
              d={`M ${gx - gaugeR} ${gy} A ${gaugeR} ${gaugeR} 0 0 1 ${gx + gaugeR} ${gy}`}
              fill="none"
              stroke={g.color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={semiCircumference}
              strokeDashoffset={semiCircumference * (1 - fillProgress)}
            />
            {/* Label */}
            <text
              x={gx}
              y={gy + 30}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={GRAY}
              fontFamily={FONT}
              letterSpacing="2"
              opacity={labelOpacity}
            >
              {g.label}
            </text>
            {/* Percentage */}
            <text
              x={gx}
              y={gy - 8}
              textAnchor="middle"
              fontSize="24"
              fontWeight="900"
              fill={g.color}
              fontFamily={FONT}
            >
              {countValue}%
            </text>
          </g>
        );
      })}

      {/* Overall score badge */}
      <g opacity={scoreScale} transform={`translate(300, 400) scale(${scoreScale})`}>
        <rect x="-45" y="-18" width="90" height="36" rx="18" fill={GREEN} opacity={0.12} />
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fontSize="20"
          fontWeight="900"
          fill={GREEN}
          fontFamily={FONT}
        >
          GREAT
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. ConceptPuzzleCompletion — 4 puzzle pieces coming together
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ConceptPuzzleCompletion: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 300;
  const cy = 270;
  const ps = 72; // piece size

  // Dashed outline guides (0-6)
  const guideOpacity = interpolate(frame, [0, 6], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pieces slide in from different directions
  const pieces = [
    { label: "BRAIN", from: { x: -120, y: -80 }, pos: { x: cx - ps, y: cy - ps }, delay: 4, color: ORANGE },
    { label: "COPY", from: { x: 120, y: -80 }, pos: { x: cx, y: cy - ps }, delay: 8, color: ORANGE },
    { label: "LEADS", from: { x: -120, y: 80 }, pos: { x: cx - ps, y: cy }, delay: 12, color: ORANGE },
    { label: "LAUNCH", from: { x: 120, y: 80 }, pos: { x: cx, y: cy }, delay: 16, color: ORANGE },
  ];

  // Puzzle piece paths with interlocking connectors
  const piecePaths = [
    // Top-left: right tab, bottom tab
    "M 0 0 L 30 0 L 30 10 C 30 16 42 16 42 10 L 42 0 L 72 0 L 72 30 L 82 30 C 88 30 88 42 82 42 L 72 42 L 72 72 L 0 72 Z",
    // Top-right: left slot, bottom tab
    "M 0 0 L 72 0 L 72 30 L 82 30 C 88 30 88 42 82 42 L 72 42 L 72 72 L 42 72 L 42 82 C 42 88 30 88 30 82 L 30 72 L 0 72 L 0 42 L -10 42 C -16 42 -16 30 -10 30 L 0 30 Z",
    // Bottom-left: right tab, top slot
    "M 0 0 L 30 0 L 30 -10 C 30 -16 42 -16 42 -10 L 42 0 L 72 0 L 72 72 L 0 72 L 0 42 L -10 42 C -16 42 -16 30 -10 30 L 0 30 Z",
    // Bottom-right: left slot, top slot
    "M 0 0 L 72 0 L 72 72 L 0 72 L 0 42 L -10 42 C -16 42 -16 30 -10 30 L 0 30 L 0 0 Z",
  ];

  // Flash/glow when all assembled (20-26)
  const flashOpacity = interpolate(frame, [20, 22, 26], [0, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // COMPLETE text (24+)
  const completeScale = spring({
    frame: Math.max(0, frame - 24),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  // Subtle glow (26+)
  const glowOpacity = interpolate(frame, [26, 30], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      {/* Dashed outline guides for 2x2 grid */}
      <rect
        x={cx - ps}
        y={cy - ps}
        width={ps * 2}
        height={ps * 2}
        fill="none"
        stroke={LIGHT_GRAY}
        strokeWidth="2"
        strokeDasharray="6 4"
        opacity={guideOpacity}
      />
      <line x1={cx} y1={cy - ps} x2={cx} y2={cy + ps} stroke={LIGHT_GRAY} strokeWidth="1.5" strokeDasharray="6 4" opacity={guideOpacity} />
      <line x1={cx - ps} y1={cy} x2={cx + ps} y2={cy} stroke={LIGHT_GRAY} strokeWidth="1.5" strokeDasharray="6 4" opacity={guideOpacity} />

      {/* Puzzle pieces */}
      {pieces.map((piece, i) => {
        const slideProgress = spring({
          frame: Math.max(0, frame - piece.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 80 },
        });

        const dx = piece.from.x * (1 - slideProgress);
        const dy = piece.from.y * (1 - slideProgress);

        return (
          <g
            key={i}
            transform={`translate(${piece.pos.x + dx}, ${piece.pos.y + dy})`}
            opacity={slideProgress}
          >
            <path
              d={piecePaths[i]}
              fill={piece.color}
              stroke={BLACK}
              strokeWidth="2"
              strokeLinejoin="round"
              opacity={0.85}
            />
            {/* Label centered in piece */}
            <text
              x="36"
              y="40"
              textAnchor="middle"
              fontSize="11"
              fontWeight="800"
              fill="white"
              fontFamily={FONT}
              letterSpacing="1"
            >
              {piece.label}
            </text>
          </g>
        );
      })}

      {/* Flash overlay when complete */}
      {flashOpacity > 0 && (
        <rect x="0" y="0" width="600" height="600" fill="white" opacity={flashOpacity} />
      )}

      {/* Glow from completed puzzle */}
      {glowOpacity > 0 && (
        <circle cx={cx} cy={cy} r="80" fill={ORANGE} opacity={glowOpacity} />
      )}

      {/* "COMPLETE" text above puzzle */}
      <g opacity={completeScale} transform={`translate(${cx}, ${cy - ps - 40}) scale(${completeScale})`}>
        <rect x="-58" y="-18" width="116" height="36" rx="18" fill={GREEN} />
        <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill="white" fontFamily={FONT} letterSpacing="3">
          COMPLETE
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12. YouTubeSubscribeButton — HERO — Real YouTube subscribe CTA
// DIV-BASED (uses Img from remotion)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const YouTubeSubscribeButton: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // YouTube logo (0-6)
  const logoScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Subscribe button bar (6-12)
  const btnWidth = interpolate(frame, [6, 12], [0, 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // SUBSCRIBE text (10-16)
  const textOpacity = interpolate(frame, [10, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bell icon (14-20)
  const bellScale = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Bell ring oscillation (16-22)
  const bellRing = interpolate(
    frame,
    [16, 18, 20, 22],
    [0, 10, -10, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Like/thumbs-up (20+)
  const thumbScale = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  // +1 counter (22+)
  const plusOneScale = spring({
    frame: Math.max(0, frame - 22),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  // Shadow pulse (24+)
  const shadowPulse = frame >= 24 ? interpolate(frame % 40, [0, 20, 40], [0.06, 0.12, 0.06]) : 0.06;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
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
          width: btnWidth,
          height: 56,
          backgroundColor: RED,
          borderRadius: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: `0 4px 20px rgba(255, 0, 0, ${shadowPulse})`,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: 4,
            fontFamily: FONT,
            opacity: textOpacity,
          }}
        >
          SUBSCRIBE
        </span>
      </div>

      {/* Bell + Like row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Like/thumbs-up */}
        <div
          style={{
            transform: `scale(${thumbScale})`,
            opacity: thumbScale,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3m7-2V5a3 3 0 0 0-3-3l-4 9v11h10.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14"
              stroke={BLACK}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* +1 counter */}
          <span
            style={{
              transform: `scale(${plusOneScale})`,
              opacity: plusOneScale,
              fontSize: 16,
              fontWeight: 800,
              color: GREEN,
              fontFamily: FONT,
            }}
          >
            +1
          </span>
        </div>

        {/* Bell icon */}
        <div
          style={{
            transform: `scale(${bellScale}) rotate(${bellRing}deg)`,
            opacity: bellScale,
            transformOrigin: "top center",
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
              stroke={BLACK}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Gentle shadow pulse text */}
      <div
        style={{
          opacity: frame >= 24 ? 0.5 : 0,
          fontSize: 14,
          fontWeight: 600,
          color: GRAY,
          fontFamily: FONT,
          letterSpacing: 2,
        }}
      >
        TAP TO SUBSCRIBE
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 13. LinkedInConnectButton — HERO — Real LinkedIn connect CTA
// DIV-BASED (uses Img from remotion)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const LinkedInConnectButton: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // LinkedIn logo (0-6)
  const logoScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Connect button (6-12)
  const btnWidth = interpolate(frame, [6, 12], [0, 240], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CONNECT text + person-plus icon (10-16)
  const textOpacity = interpolate(frame, [10, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Message icon (14-20)
  const msgScale = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Profile card preview (16-22)
  const cardSlide = spring({
    frame: Math.max(0, frame - 16),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  // "500+" badge (20+)
  const badgeScale = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  // Blue glow (22+)
  const glowOpacity = frame >= 22 ? interpolate(frame % 40, [0, 20, 40], [0.04, 0.1, 0.04]) : 0;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
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
          width: btnWidth,
          height: 52,
          backgroundColor: BLUE,
          borderRadius: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          overflow: "hidden",
          boxShadow: `0 4px 20px rgba(10, 102, 194, ${glowOpacity})`,
        }}
      >
        {/* Person-plus icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ opacity: textOpacity }}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="8.5" cy="7" r="4" stroke="white" strokeWidth="2" />
          <line x1="20" y1="8" x2="20" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="23" y1="11" x2="17" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 3,
            fontFamily: FONT,
            opacity: textOpacity,
          }}
        >
          CONNECT
        </span>
      </div>

      {/* Message icon + Profile card row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Message speech bubble */}
        <div
          style={{
            transform: `scale(${msgScale})`,
            opacity: msgScale,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              stroke={BLUE}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Profile card preview */}
        <div
          style={{
            transform: `translateY(${(1 - cardSlide) * 20}px)`,
            opacity: cardSlide,
            width: 200,
            height: 56,
            borderRadius: 12,
            border: `1.5px solid ${LIGHT_GRAY}`,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 12,
          }}
        >
          {/* Avatar placeholder */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: BLUE,
              opacity: 0.2,
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Name placeholder */}
            <div style={{ width: 80, height: 8, borderRadius: 4, backgroundColor: BLACK, opacity: 0.15 }} />
            {/* Role placeholder */}
            <div style={{ width: 60, height: 6, borderRadius: 3, backgroundColor: GRAY, opacity: 0.1 }} />
          </div>
        </div>
      </div>

      {/* 500+ connections badge */}
      <div
        style={{
          transform: `scale(${badgeScale})`,
          opacity: badgeScale,
          backgroundColor: BLUE,
          borderRadius: 14,
          padding: "6px 16px",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: 800,
            fontFamily: FONT,
            letterSpacing: 1,
          }}
        >
          500+ connections
        </span>
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 14. DexLinkedInProfileCard — Dex's LinkedIn profile card
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DexLinkedInProfileCard: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 300;

  // Card draws in (0-6)
  const cardScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });
  const cardOpacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Avatar (4-10)
  const avatarScale = spring({
    frame: Math.max(0, frame - 4),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Name "DEX" (6-14)
  const nameOpacity = spring({
    frame: Math.max(0, frame - 6),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  // Tagline (10-16)
  const taglineOpacity = interpolate(frame, [10, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Divider line (12-18)
  const dividerWidth = interpolate(frame, [12, 18], [0, 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stats (14-20, staggered)
  const stats = [
    { label: "Connections", value: "500+" },
    { label: "Posts", value: "12" },
    { label: "Reactions", value: "48" },
  ];

  // Connect button (18-24)
  const btnScale = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  // Verified badge (22+)
  const verifiedScale = spring({
    frame: Math.max(0, frame - 22),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  const cardTop = 120;
  const cardW = 320;
  const cardH = 360;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <defs>
        <filter id="dlcShadow" x="-5%" y="-3%" width="110%" height="112%">
          <feDropShadow dx="0" dy="4" stdDeviation="12" floodOpacity="0.08" />
        </filter>
      </defs>

      <g opacity={cardOpacity} transform={`scale(${cardScale})`} style={{ transformOrigin: "300px 300px" }}>
        {/* Card background */}
        <rect
          x={cx - cardW / 2}
          y={cardTop}
          width={cardW}
          height={cardH}
          rx="20"
          fill="white"
          filter="url(#dlcShadow)"
          stroke={LIGHT_GRAY}
          strokeWidth="1.5"
        />

        {/* Blue top banner stripe */}
        <rect
          x={cx - cardW / 2}
          y={cardTop}
          width={cardW}
          height="70"
          rx="20"
          fill={BLUE}
          opacity={0.12}
        />
        <rect
          x={cx - cardW / 2}
          y={cardTop + 50}
          width={cardW}
          height="20"
          fill={BLUE}
          opacity={0.12}
        />
      </g>

      {/* Avatar — real headshot with circle crop */}
      <g opacity={avatarScale} transform={`translate(${cx}, ${cardTop + 60}) scale(${avatarScale})`}>
        <defs>
          <clipPath id="dex-li-headshot-clip">
            <circle cx="0" cy="0" r="34" />
          </clipPath>
        </defs>
        <circle cx="0" cy="0" r="38" fill={ORANGE} opacity={0.15} />
        <circle cx="0" cy="0" r="35" stroke={ORANGE} strokeWidth="2" fill="none" />
        <foreignObject x="-34" y="-34" width="68" height="68" clipPath="url(#dex-li-headshot-clip)">
          <Img
            src={staticFile("headshots/dex-headshot.png")}
            style={{ width: 68, height: 68, objectFit: "cover", borderRadius: "50%" }}
          />
        </foreignObject>
      </g>

      {/* Name: DEX */}
      <text
        x={cx}
        y={cardTop + 136}
        textAnchor="middle"
        fontSize="36"
        fontWeight="900"
        fill={BLACK}
        fontFamily={FONT}
        letterSpacing="4"
        opacity={nameOpacity}
      >
        DEX
      </text>

      {/* Verified badge next to name */}
      <g opacity={verifiedScale} transform={`translate(${cx + 46}, ${cardTop + 125}) scale(${verifiedScale})`}>
        <circle cx="0" cy="0" r="10" fill={BLUE} />
        <path d="M -4 0 L -1 3 L 5 -3" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Tagline */}
      <text
        x={cx}
        y={cardTop + 162}
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill={GRAY}
        fontFamily={FONT}
        letterSpacing="2"
        opacity={taglineOpacity}
      >
        AI OUTREACH PARTNER
      </text>

      {/* Divider line */}
      <line
        x1={cx - dividerWidth / 2}
        y1={cardTop + 185}
        x2={cx + dividerWidth / 2}
        y2={cardTop + 185}
        stroke={LIGHT_GRAY}
        strokeWidth="1.5"
      />

      {/* Stats row */}
      {stats.map((stat, i) => {
        const statScale = spring({
          frame: Math.max(0, frame - 14 - i * 2),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 100 },
        });

        const sx = cx - 100 + i * 100;
        const sy = cardTop + 220;

        return (
          <g key={i} opacity={statScale} transform={`translate(0, ${(1 - statScale) * 8})`}>
            <text
              x={sx}
              y={sy}
              textAnchor="middle"
              fontSize="20"
              fontWeight="900"
              fill={BLACK}
              fontFamily={FONT}
            >
              {stat.value}
            </text>
            <text
              x={sx}
              y={sy + 18}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill={GRAY}
              fontFamily={FONT}
              letterSpacing="1"
            >
              {stat.label}
            </text>
          </g>
        );
      })}

      {/* Blue CONNECT button */}
      <g opacity={btnScale} transform={`translate(${cx}, ${cardTop + 300}) scale(${btnScale})`}>
        <rect x="-65" y="-20" width="130" height="40" rx="20" fill={BLUE} />
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fontSize="16"
          fontWeight="800"
          fill="white"
          fontFamily={FONT}
          letterSpacing="3"
        >
          CONNECT
        </text>
      </g>
    </svg>
  );
};
