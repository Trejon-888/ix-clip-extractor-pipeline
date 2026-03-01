/**
 * Podcast Test: "The Stress Expert" — Leadership & Vulnerability
 *
 * SOURCE: YouTube podcast clip (15:00–17:00), split-screen reframe (2 speakers)
 * Duration: 120s (3611 frames @ 30fps)
 * Pop-outs: 9 ConceptOverlay + 1 CTA
 *
 * STORY: Two speakers discuss decision fatigue, the phone-battery analogy
 * for mental energy, and how leaders must show vulnerability to create
 * psychological safety for their teams.
 *
 * ALL VISUALS:
 *   1. "MANY HATS" (frame 120, 55f) — Juggling multiple roles
 *   2. "BATTERY AT 30%" (frame 493, 65f) — Phone battery draining
 *   3. "BE PRESENT" (frame 832, 55f) — Mindful presence
 *   4. "MAKE THE SPACE" (frame 1096, 55f) — Open breathing room
 *   5. "SHOW VULNERABILITY" (frame 1310, 65f) — Lowering the shield
 *   6. "THE BOOK" (frame 1599, 55f) — Open book reflection
 *   7. "RADICAL HONESTY" (frame 1919, 55f) — People connecting openly
 *   8. "LEAD BY EXAMPLE" (frame 2255, 55f) — Vulnerability at work
 *   9. "PSYCHOLOGICAL SAFETY" (frame 2588, 60f) — Safe circle
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { ConceptOverlay } from "../components/ConceptOverlay";
import { WORDS } from "../data/podcast-stress-expert-words";

const { fontFamily } = loadFont();

const TOTAL_FRAMES = 3600;

function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Layout segments (detected from dynamic reframe analysis)
// split_screen = two speakers (top/bottom halves)
// close_up = single speaker (standard 9:16 crop)
// ═══════════════════════════════════════════════════════════════
const LAYOUT_SEGMENTS: Array<{
  type: "split_screen" | "close_up";
  startFrame: number;
  endFrame: number;
}> = [
  { type: "split_screen", startFrame: 0, endFrame: 405 },
  { type: "close_up", startFrame: 408, endFrame: 1626 },
  { type: "split_screen", startFrame: 1629, endFrame: 2013 },
  { type: "close_up", startFrame: 2016, endFrame: 3102 },
  { type: "split_screen", startFrame: 3105, endFrame: 3447 },
  { type: "close_up", startFrame: 3450, endFrame: 3600 },
];

function getLayoutType(frame: number): "split_screen" | "close_up" {
  for (const seg of LAYOUT_SEGMENTS) {
    if (frame >= seg.startFrame && frame <= seg.endFrame) {
      return seg.type;
    }
  }
  return "close_up";
}

/**
 * Returns the caption vertical position (as CSS top %).
 * split_screen: 46% (centered at the 50% border between speaker halves)
 * close_up: 62% (lower third, equivalent to bottom: 28% with 10% height)
 * Smooth 5-frame crossfade at layout transitions.
 */
const CAPTION_TOP_SPLIT = 46;
const CAPTION_TOP_CLOSEUP = 62;
const CROSSFADE_FRAMES = 5;

function getCaptionTopPct(frame: number): number {
  const layout = getLayoutType(frame);
  const target = layout === "split_screen" ? CAPTION_TOP_SPLIT : CAPTION_TOP_CLOSEUP;

  // Check if we're near a layout transition boundary for smooth interpolation
  for (let i = 0; i < LAYOUT_SEGMENTS.length - 1; i++) {
    const curr = LAYOUT_SEGMENTS[i];
    const next = LAYOUT_SEGMENTS[i + 1];
    const transitionStart = next.startFrame - CROSSFADE_FRAMES;
    const transitionEnd = next.startFrame + CROSSFADE_FRAMES;

    if (frame >= transitionStart && frame <= transitionEnd) {
      const fromTop = curr.type === "split_screen" ? CAPTION_TOP_SPLIT : CAPTION_TOP_CLOSEUP;
      const toTop = next.type === "split_screen" ? CAPTION_TOP_SPLIT : CAPTION_TOP_CLOSEUP;
      const t = (frame - transitionStart) / (transitionEnd - transitionStart);
      return fromTop + (toTop - fromTop) * t;
    }
  }

  return target;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 120, end: 175 },   // Many Hats
  { start: 493, end: 558 },   // Battery at 30%
  { start: 832, end: 887 },   // Be Present
  { start: 1096, end: 1151 }, // Make the Space
  { start: 1310, end: 1375 }, // Show Vulnerability
  { start: 1599, end: 1654 }, // The Book
  { start: 1919, end: 1974 }, // Radical Honesty
  { start: 2255, end: 2310 }, // Lead by Example
  { start: 2588, end: 2648 }, // Psychological Safety
  { start: 3530, end: 3611 }, // CTA
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS (J-cut: audio 2-3 frames before visual)
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  { frame: 118, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  { frame: 491, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 830, src: "audio/pop-402324.mp3", volume: 0.20 },
  { frame: 1094, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  { frame: 1308, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1597, src: "audio/pop-402324.mp3", volume: 0.20 },
  { frame: 1917, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  { frame: 2253, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  { frame: 2586, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 3528, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
];

// ═══════════════════════════════════════════════════════════════
// 1. MANY HATS — Juggling multiple leadership roles
// ═══════════════════════════════════════════════════════════════
const ManyHatsIllustration: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const s = size / 800;

  const hats = [
    { label: "HR", color: "#3B82F6", delay: 3, x: -120, y: -80 },
    { label: "STRATEGY", color: "#8B5CF6", delay: 6, x: 120, y: -80 },
    { label: "FINANCE", color: "#10B981", delay: 9, x: -120, y: 80 },
    { label: "OPS", color: "#F59E0B", delay: 12, x: 120, y: 80 },
  ];

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Center person icon */}
      <svg
        width={100 * s}
        height={100 * s}
        viewBox="0 0 100 100"
        fill="none"
        style={{ position: "absolute", zIndex: 2 }}
      >
        <circle cx={50} cy={35} r={18} fill="#1A1A1A" />
        <path
          d="M20 85 Q50 55 80 85"
          fill="#1A1A1A"
          stroke="none"
        />
      </svg>

      {/* Floating role badges */}
      {hats.map((hat, i) => {
        const enter = spring({
          frame: Math.max(0, frame - hat.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 140 },
        });
        const float = Math.sin((frame + i * 20) * 0.08) * 4;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50% + ${hat.x * s}px)`,
              top: `calc(50% + ${(hat.y + float) * s}px)`,
              transform: `translate(-50%, -50%) scale(${enter})`,
              opacity: enter,
              padding: `${14 * s}px ${24 * s}px`,
              borderRadius: 16 * s,
              backgroundColor: hat.color,
              boxShadow: `0 ${6 * s}px ${20 * s}px ${hat.color}44`,
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: 22 * s,
                color: "#FFFFFF",
                letterSpacing: 2,
              }}
            >
              {hat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. BATTERY AT 30% — Phone battery draining
// ═══════════════════════════════════════════════════════════════
const BatteryIllustration: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const s = size / 800;

  const enter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const drainProgress = interpolate(frame, [8, 35], [0.65, 0.30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = frame > 30 ? interpolate(frame % 20, [0, 10, 20], [1, 0.6, 1]) : 1;

  const fillColor =
    drainProgress > 0.5
      ? "#10B981"
      : drainProgress > 0.25
        ? "#F59E0B"
        : "#EF4444";

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30 * s,
        transform: `scale(${enter})`,
        opacity: enter,
      }}
    >
      {/* Battery shell */}
      <svg
        width={200 * s}
        height={340 * s}
        viewBox="0 0 200 340"
        fill="none"
      >
        {/* Battery cap */}
        <rect x={65} y={0} width={70} height={20} rx={6} fill="#999" />
        {/* Battery body */}
        <rect
          x={30}
          y={20}
          width={140}
          height={300}
          rx={18}
          stroke="#CCCCCC"
          strokeWidth={6}
          fill="#F5F5F5"
        />
        {/* Fill level */}
        <rect
          x={40}
          y={30 + 280 * (1 - drainProgress)}
          width={120}
          height={280 * drainProgress}
          rx={12}
          fill={fillColor}
          opacity={pulse}
        />
      </svg>

      {/* Percentage */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 900,
          fontSize: 64 * s,
          color: fillColor,
          letterSpacing: -2,
        }}
      >
        {Math.round(drainProgress * 100)}%
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. BE PRESENT — Mindful presence circle
// ═══════════════════════════════════════════════════════════════
const BePresentIllustration: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const s = size / 800;

  const breathe = interpolate(frame % 60, [0, 30, 60], [0.9, 1.1, 0.9]);

  const ringEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={400 * s}
        height={400 * s}
        viewBox="0 0 400 400"
        fill="none"
      >
        {/* Outer glow ring */}
        <circle
          cx={200}
          cy={200}
          r={180 * ringEnter * breathe}
          stroke="#3B82F6"
          strokeWidth={2}
          fill="none"
          opacity={0.2}
        />
        {/* Middle ring */}
        <circle
          cx={200}
          cy={200}
          r={140 * ringEnter * breathe}
          stroke="#3B82F6"
          strokeWidth={3}
          fill="none"
          opacity={0.4}
        />
        {/* Inner filled circle */}
        <circle
          cx={200}
          cy={200}
          r={90 * ringEnter}
          fill="#3B82F6"
          opacity={0.15}
        />
        {/* Person silhouette (seated meditation) */}
        <circle cx={200} cy={175} r={22 * ringEnter} fill="#3B82F6" />
        <path
          d={`M165 ${230} Q200 ${195} 235 ${230}`}
          fill="#3B82F6"
          opacity={ringEnter}
        />
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. MAKE THE SPACE — Opening room / expansion
// ═══════════════════════════════════════════════════════════════
const MakeSpaceIllustration: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const s = size / 800;

  const expand = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 80 },
  });

  const arrows = [
    { angle: 0 },
    { angle: 90 },
    { angle: 180 },
    { angle: 270 },
  ];

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={360 * s}
        height={360 * s}
        viewBox="0 0 360 360"
        fill="none"
      >
        {/* Center dot */}
        <circle
          cx={180}
          cy={180}
          r={20 * expand}
          fill="#10B981"
          opacity={0.3}
        />

        {/* Expanding arrows outward */}
        {arrows.map((a, i) => {
          const delay = i * 3;
          const arrowExpand = spring({
            frame: Math.max(0, frame - delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 120 },
          });
          const dist = 50 + 80 * arrowExpand;
          const rad = (a.angle * Math.PI) / 180;
          const x = 180 + Math.cos(rad) * dist;
          const y = 180 + Math.sin(rad) * dist;

          return (
            <g key={i} opacity={arrowExpand}>
              <circle cx={x} cy={y} r={12} fill="#10B981" />
              <line
                x1={180 + Math.cos(rad) * 30}
                y1={180 + Math.sin(rad) * 30}
                x2={x - Math.cos(rad) * 16}
                y2={y - Math.sin(rad) * 16}
                stroke="#10B981"
                strokeWidth={3}
                strokeDasharray="6 4"
              />
            </g>
          );
        })}

        {/* Expanding circle outline */}
        <circle
          cx={180}
          cy={180}
          r={130 * expand}
          stroke="#10B981"
          strokeWidth={2.5}
          fill="none"
          opacity={0.4}
          strokeDasharray="8 6"
        />
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. SHOW VULNERABILITY — Shield being lowered
// ═══════════════════════════════════════════════════════════════
const VulnerabilityIllustration: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const s = size / 800;

  const shieldDrop = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  const shieldY = interpolate(shieldDrop, [0, 1], [0, 60]);
  const shieldOpacity = interpolate(shieldDrop, [0, 1], [1, 0.25]);
  const heartScale = spring({
    frame: Math.max(0, frame - 12),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 160 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        width={340 * s}
        height={400 * s}
        viewBox="0 0 340 400"
        fill="none"
      >
        {/* Shield dropping down */}
        <g
          opacity={shieldOpacity}
          transform={`translate(0, ${shieldY})`}
        >
          <path
            d="M170 30 L300 90 L280 260 L170 340 L60 260 L40 90 Z"
            fill="#94A3B8"
            stroke="#64748B"
            strokeWidth={3}
          />
          <path
            d="M170 80 L240 110 L225 220 L170 270 L115 220 L100 110 Z"
            fill="#CBD5E1"
          />
        </g>

        {/* Heart revealed behind shield */}
        <g
          transform={`translate(170, 170) scale(${heartScale}) translate(-170, -170)`}
          opacity={heartScale}
        >
          <path
            d="M170 220 C140 190, 100 160, 100 130 C100 100, 130 80, 170 120 C210 80, 240 100, 240 130 C240 160, 200 190, 170 220Z"
            fill="#EF4444"
          />
        </g>
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. THE BOOK — Open book with personal stories
// ═══════════════════════════════════════════════════════════════
const BookIllustration: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const s = size / 800;

  const openProgress = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  const pageLines = [0, 1, 2, 3, 4];

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={380 * s}
        height={320 * s}
        viewBox="0 0 380 320"
        fill="none"
      >
        {/* Left page */}
        <g
          transform={`rotate(${interpolate(openProgress, [0, 1], [-5, -12])}, 190, 280)`}
        >
          <rect
            x={20}
            y={40}
            width={165}
            height={240}
            rx={4}
            fill="#FAFAFA"
            stroke="#DDD"
            strokeWidth={2}
          />
          {pageLines.map((_, i) => {
            const lineEnter = spring({
              frame: Math.max(0, frame - 8 - i * 3),
              fps: 30,
              from: 0,
              to: 1,
              config: { damping: 14, stiffness: 140 },
            });
            return (
              <rect
                key={`l-${i}`}
                x={40}
                y={70 + i * 36}
                width={120 * lineEnter}
                height={4}
                rx={2}
                fill="#D4D4D4"
              />
            );
          })}
        </g>

        {/* Right page */}
        <g
          transform={`rotate(${interpolate(openProgress, [0, 1], [5, 12])}, 190, 280)`}
        >
          <rect
            x={195}
            y={40}
            width={165}
            height={240}
            rx={4}
            fill="#FAFAFA"
            stroke="#DDD"
            strokeWidth={2}
          />
          {pageLines.map((_, i) => {
            const lineEnter = spring({
              frame: Math.max(0, frame - 12 - i * 3),
              fps: 30,
              from: 0,
              to: 1,
              config: { damping: 14, stiffness: 140 },
            });
            return (
              <rect
                key={`r-${i}`}
                x={215}
                y={70 + i * 36}
                width={120 * lineEnter}
                height={4}
                rx={2}
                fill="#D4D4D4"
              />
            );
          })}
        </g>

        {/* Spine */}
        <rect
          x={186}
          y={35}
          width={8}
          height={250}
          rx={4}
          fill="#8B5CF6"
          opacity={openProgress}
        />
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 7. RADICAL HONESTY — Two people connecting
// ═══════════════════════════════════════════════════════════════
const RadicalHonestyIllustration: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const s = size / 800;

  const enter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const bridgeGrow = spring({
    frame: Math.max(0, frame - 10),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={400 * s}
        height={300 * s}
        viewBox="0 0 400 300"
        fill="none"
      >
        {/* Person 1 */}
        <g opacity={enter}>
          <circle cx={80} cy={120} r={28} fill="#3B82F6" />
          <path d="M45 200 Q80 160 115 200" fill="#3B82F6" />
        </g>

        {/* Person 2 */}
        <g opacity={enter}>
          <circle cx={320} cy={120} r={28} fill="#8B5CF6" />
          <path d="M285 200 Q320 160 355 200" fill="#8B5CF6" />
        </g>

        {/* Connection bridge */}
        <line
          x1={120}
          y1={150}
          x2={120 + 160 * bridgeGrow}
          y2={150}
          stroke="#10B981"
          strokeWidth={4}
          strokeDasharray="8 6"
        />

        {/* Heart at connection point */}
        {bridgeGrow > 0.8 && (
          <g
            transform={`translate(200, 130) scale(${spring({
              frame: Math.max(0, frame - 20),
              fps: 30,
              from: 0,
              to: 1,
              config: { damping: 10, stiffness: 160 },
            })})`}
          >
            <path
              d="M0 12 C-5 5, -15 0, -15 -8 C-15 -14, -8 -18, 0 -10 C8 -18, 15 -14, 15 -8 C15 0, 5 5, 0 12Z"
              fill="#EF4444"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 8. LEAD BY EXAMPLE — Vulnerability at work
// ═══════════════════════════════════════════════════════════════
const LeadByExampleIllustration: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const s = size / 800;

  const enter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const followers = [
    { x: 140, y: 240, delay: 8, color: "#6366F1" },
    { x: 200, y: 260, delay: 12, color: "#8B5CF6" },
    { x: 260, y: 240, delay: 16, color: "#A78BFA" },
  ];

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={400 * s}
        height={360 * s}
        viewBox="0 0 400 360"
        fill="none"
      >
        {/* Leader at front */}
        <g opacity={enter} transform={`translate(200, 120) scale(${enter}) translate(-200, -120)`}>
          <circle cx={200} cy={90} r={32} fill="#FF7614" />
          <path d="M160 175 Q200 135 240 175" fill="#FF7614" />
          {/* Glow ring */}
          <circle
            cx={200}
            cy={120}
            r={65}
            stroke="#FF7614"
            strokeWidth={2}
            fill="none"
            opacity={0.3}
          />
        </g>

        {/* Followers */}
        {followers.map((f, i) => {
          const fEnter = spring({
            frame: Math.max(0, frame - f.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 140 },
          });
          return (
            <g key={i} opacity={fEnter}>
              <circle cx={f.x} cy={f.y} r={22} fill={f.color} />
              <path
                d={`M${f.x - 25} ${f.y + 55} Q${f.x} ${f.y + 25} ${f.x + 25} ${f.y + 55}`}
                fill={f.color}
              />
            </g>
          );
        })}

        {/* Arrow from leader to followers */}
        <line
          x1={200}
          y1={180}
          x2={200}
          y2={220}
          stroke="#FF7614"
          strokeWidth={3}
          opacity={enter * 0.5}
          strokeDasharray="6 4"
        />
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 9. PSYCHOLOGICAL SAFETY — Protective circle / safe zone
// ═══════════════════════════════════════════════════════════════
const PsychSafetyIllustration: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const s = size / 800;

  const ringGrow = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 80 },
  });

  const people = [
    { angle: 0, delay: 6 },
    { angle: 72, delay: 9 },
    { angle: 144, delay: 12 },
    { angle: 216, delay: 15 },
    { angle: 288, delay: 18 },
  ];

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={380 * s}
        height={380 * s}
        viewBox="0 0 380 380"
        fill="none"
      >
        {/* Safe zone ring */}
        <circle
          cx={190}
          cy={190}
          r={140 * ringGrow}
          fill="#10B981"
          opacity={0.08}
        />
        <circle
          cx={190}
          cy={190}
          r={140 * ringGrow}
          stroke="#10B981"
          strokeWidth={3}
          fill="none"
          opacity={0.4}
          strokeDasharray="10 6"
        />

        {/* Shield icon at center */}
        <g
          opacity={ringGrow}
          transform={`translate(190, 190) scale(${ringGrow * 0.8}) translate(-190, -190)`}
        >
          <path
            d="M190 145 L230 162 L225 215 L190 240 L155 215 L150 162 Z"
            fill="#10B981"
            opacity={0.3}
          />
          <path
            d="M180 195 L188 203 L205 180"
            stroke="#10B981"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* People around the circle */}
        {people.map((p, i) => {
          const pEnter = spring({
            frame: Math.max(0, frame - p.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 140 },
          });
          const rad = (p.angle * Math.PI) / 180;
          const cx = 190 + Math.cos(rad) * 120;
          const cy = 190 + Math.sin(rad) * 120;

          return (
            <g key={i} opacity={pEnter}>
              <circle cx={cx} cy={cy - 8} r={14} fill="#10B981" />
              <path
                d={`M${cx - 12} ${cy + 18} Q${cx} ${cy + 4} ${cx + 12} ${cy + 18}`}
                fill="#10B981"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// CTA CARD
// ═══════════════════════════════════════════════════════════════
const CTACard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  const fadeOut = interpolate(frame, [55, 69], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        opacity: enter * fadeOut,
        transform: `scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          padding: "36px 48px",
          borderRadius: 28,
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          width: 680,
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 38,
            color: "#1A1A1A",
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          THE STRESS EXPERT
        </div>

        <div
          style={{
            fontFamily,
            fontWeight: 600,
            fontSize: 24,
            color: "#666",
            textAlign: "center",
          }}
        >
          Full episode on YouTube
        </div>

        <div
          style={{
            width: 100,
            height: 3,
            backgroundColor: "#3B82F6",
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════════
export const PodcastStressExpert: React.FC<{
  videoSrc?: string;
}> = ({
  videoSrc = "videos/2026-02-23-podcast-test/reframed-split.mp4",
}) => {
  const frame = useCurrentFrame();
  const zoom = getZoom(frame);

  const hookFlash = interpolate(frame, [0, 3], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const conceptActive = CONCEPT_RANGES.some(
    (r) => frame >= r.start && frame < r.end
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* ── BASE: Split-screen podcast video ─────────────────── */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <OffthreadVideo
          src={staticFile(videoSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* ── HOOK FLASH ────────────────────────────────────────── */}
      {hookFlash > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#3B82F6",
            opacity: hookFlash,
            zIndex: 50,
          }}
        />
      )}

      {/* ═════ ConceptOverlay POP-OUTS ═══════════════════════════ */}

      {/* 1. "play roles in HR, company strategy" — frame 120 */}
      <Sequence from={120} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<ManyHatsIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 2. "at 30%" — frame 493, phone battery analogy */}
      <Sequence from={493} durationInFrames={65} premountFor={15}>
        <ConceptOverlay
          durationInFrames={65}
          illustration={<BatteryIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 3. "be present" — frame 832 */}
      <Sequence from={832} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<BePresentIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 4. "the space" — frame 1096 */}
      <Sequence from={1096} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<MakeSpaceIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 5. "vulnerable side" — frame 1310 */}
      <Sequence from={1310} durationInFrames={65} premountFor={15}>
        <ConceptOverlay
          durationInFrames={65}
          illustration={<VulnerabilityIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 6. "wrote the book" — frame 1599 */}
      <Sequence from={1599} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<BookIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 7. "honest and vulnerable" — frame 1919 */}
      <Sequence from={1919} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<RadicalHonestyIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 8. "vulnerability at work" — frame 2255 */}
      <Sequence from={2255} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<LeadByExampleIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 9. "safe" — frame 2588 */}
      <Sequence from={2588} durationInFrames={60} premountFor={15}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<PsychSafetyIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ═════ CTA ═══════════════════════════════════════════════ */}
      <Sequence from={3530} durationInFrames={70} premountFor={15}>
        <CTACard />
      </Sequence>

      {/* ═════ WORD-BY-WORD CAPTIONS (layout-aware positioning) ══ */}
      {/* split_screen: captions at 50% (between top/bottom speaker halves) */}
      {/* close_up: captions at lower portion (bottom 28%) */}
      <div
        style={{
          position: "absolute",
          top: `${getCaptionTopPct(frame)}%`,
          left: 0,
          width: "100%",
          height: "8%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {!conceptActive &&
          WORDS.map((w) => {
            if (frame < w.frame || frame >= w.frame + w.duration) return null;
            return (
              <div
                key={w.id}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily,
                    fontWeight: 800,
                    fontSize: getLayoutType(frame) === "split_screen" ? 56 : 72,
                    color: w.emphasis ? "#3B82F6" : "#FFFFFF",
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    textShadow: w.emphasis
                      ? "0 0 20px rgba(59, 130, 246, 0.6), 0 4px 12px rgba(0,0,0,0.8)"
                      : "0 4px 12px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)",
                    padding: "0 60px",
                  }}
                >
                  {w.word}
                </div>
              </div>
            );
          })}
      </div>

      {/* ═════ SFX LAYER ═══════════════════════════════════════════ */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={15}>
          <Audio
            src={staticFile(sfx.src)}
            volume={sfx.volume}
            startFrom={0}
          />
        </Sequence>
      ))}

      {/* ═════ BACKGROUND MUSIC (first 35s only) ══════════════════ */}
      <Audio
        src={staticFile("audio/lofi-background.mp3")}
        volume={0.02}
        startFrom={0}
        endAt={1050}
      />
    </AbsoluteFill>
  );
};
