/**
 * SCENE PLAN — PodcastStressExpertV2
 * Style: lumina-neo-brutalist (INFINITX Orange #FF6B00 override)
 * Format: short-form pipeline clip
 * Total: 3600 frames (120s), 8 pop-outs + 1 CTA
 *
 * Scene 1: MANY HATS (f120–175, 55f) — FloatingKeyword customVisual, right
 * Scene 2: BATTERY AT 30% (f493–558, 65f) — ConceptOverlay solid-white, wipe-right
 * Scene 3: BE PRESENT (f832–887, 55f) — FloatingKeyword text-only, left
 * Scene 4: MAKE THE SPACE (f1096–1151, 55f) — ConceptOverlay solid-white, clip-circle
 * Scene 5: SHOW VULNERABILITY (f1310–1375, 65f) — FloatingKeyword customVisual, right
 * Scene 6: RADICAL HONESTY (f1919–1974, 55f) — FloatingKeyword text-only, left
 * Scene 7: LEAD BY EXAMPLE (f2255–2310, 55f) — FloatingKeyword customVisual, right
 * Scene 8: PSYCH SAFETY (f2588–2648, 60f) — ConceptOverlay solid-white, wipe-right
 * CTA: (f3530–3600, 70f) — ConceptOverlay solid-white, clip-circle
 *
 * VALIDATION:
 *   Pop-outs: 8 (target 5–8 ✓)
 *   Spacings: 373f, 339f, 264f, 214f, 609f, 336f, 333f (min 214 ≥ 210 ✓)
 *   Weight: 62.5% light/medium, 37.5% heavy ✓
 *   Entrances: varied (wipe-right, clip-circle, pop-scale) ✓
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
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
import { FloatingKeyword } from "../components/FloatingKeyword";
import { WORDS } from "../data/podcast-stress-expert-words";

const { fontFamily } = loadFont();

const TOTAL_FRAMES = 3600;

// ═══════════════════════════════════════════════════════════════
// NEO-BRUTALIST STYLE TOKENS (INFINITX Orange override)
// ═══════════════════════════════════════════════════════════════
const C = {
  orange: "#FF6B00",
  black: "#000000",
  white: "#FFFFFF",
  charcoal: "#171e19",
  shadow4: "4px 4px 0px 0px #000000",
  shadow8: "8px 8px 0px 0px #000000",
};

function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Layout segments (detected from dynamic reframe analysis)
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

const CAPTION_TOP_SPLIT = 46;
const CAPTION_TOP_CLOSEUP = 62;
const CROSSFADE_FRAMES = 5;

function getCaptionTopPct(frame: number): number {
  const layout = getLayoutType(frame);
  const target =
    layout === "split_screen" ? CAPTION_TOP_SPLIT : CAPTION_TOP_CLOSEUP;

  for (let i = 0; i < LAYOUT_SEGMENTS.length - 1; i++) {
    const curr = LAYOUT_SEGMENTS[i];
    const next = LAYOUT_SEGMENTS[i + 1];
    const transitionStart = next.startFrame - CROSSFADE_FRAMES;
    const transitionEnd = next.startFrame + CROSSFADE_FRAMES;

    if (frame >= transitionStart && frame <= transitionEnd) {
      const fromTop =
        curr.type === "split_screen" ? CAPTION_TOP_SPLIT : CAPTION_TOP_CLOSEUP;
      const toTop =
        next.type === "split_screen" ? CAPTION_TOP_SPLIT : CAPTION_TOP_CLOSEUP;
      const t = (frame - transitionStart) / (transitionEnd - transitionStart);
      return fromTop + (toTop - fromTop) * t;
    }
  }

  return target;
}

// ═══════════════════════════════════════════════════════════════
// Pop-out ranges (captions hidden during these)
// Removed: THE BOOK (f1599–1654) — weakest B-tier
// ═══════════════════════════════════════════════════════════════
const POPOUT_RANGES = [
  { start: 120, end: 175 }, // Many Hats (FloatingKeyword)
  { start: 493, end: 558 }, // Battery at 30% (ConceptOverlay)
  { start: 832, end: 887 }, // Be Present (FloatingKeyword — keep captions)
  { start: 1096, end: 1151 }, // Make the Space (ConceptOverlay)
  { start: 1310, end: 1375 }, // Show Vulnerability (FloatingKeyword)
  { start: 1919, end: 1974 }, // Radical Honesty (FloatingKeyword — keep captions)
  { start: 2255, end: 2310 }, // Lead by Example (FloatingKeyword)
  { start: 2588, end: 2648 }, // Psychological Safety (ConceptOverlay)
  { start: 3530, end: 3611 }, // CTA
];

// Only hide captions during full-screen ConceptOverlay takeovers
const CAPTION_HIDE_RANGES = [
  { start: 493, end: 558 }, // Battery at 30%
  { start: 1096, end: 1151 }, // Make the Space
  { start: 2588, end: 2648 }, // Psychological Safety
  { start: 3530, end: 3611 }, // CTA
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS (J-cut: audio 2-3 frames before visual)
// Removed THE BOOK SFX (f1597)
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  { frame: 118, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  { frame: 491, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.2 },
  { frame: 830, src: "audio/pop-402324.mp3", volume: 0.2 },
  { frame: 1094, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  { frame: 1308, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.2 },
  { frame: 1917, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  { frame: 2253, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  { frame: 2586, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.2 },
  { frame: 3528, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
];

// ═══════════════════════════════════════════════════════════════
// BRUTALIST ILLUSTRATIONS — Neo-Brutalist style
// Rules: 2px black strokes, flat fills (orange/black/white),
//        hard offset shadows, no gradients/blur/glow
// ═══════════════════════════════════════════════════════════════

// 1. MANY HATS — Stacked pill badges (FloatingKeyword customVisual)
const ManyHatsVisual: React.FC = () => {
  const frame = useCurrentFrame();

  const roles = [
    { label: "HR", delay: 0 },
    { label: "STRATEGY", delay: 4 },
    { label: "FINANCE", delay: 8 },
    { label: "OPS", delay: 12 },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "flex-end",
      }}
    >
      {roles.map((role, i) => {
        const enter = spring({
          frame: Math.max(0, frame - role.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 20, stiffness: 200 },
        });

        return (
          <div
            key={i}
            style={{
              position: "relative",
              transform: `scale(${enter})`,
              opacity: enter,
            }}
          >
            {/* Hard shadow */}
            <div
              style={{
                position: "absolute",
                top: 4,
                left: 4,
                padding: "10px 24px",
                borderRadius: 9999,
                backgroundColor: C.black,
                border: `2px solid ${C.black}`,
              }}
            >
              <span style={{ opacity: 0, fontFamily, fontWeight: 800, fontSize: 20 }}>
                {role.label}
              </span>
            </div>
            {/* Main pill */}
            <div
              style={{
                position: "relative",
                padding: "10px 24px",
                borderRadius: 9999,
                backgroundColor: C.white,
                border: `2px solid ${C.black}`,
              }}
            >
              <span
                style={{
                  fontFamily,
                  fontWeight: 800,
                  fontSize: 20,
                  color: C.black,
                  letterSpacing: 1,
                }}
              >
                {role.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 2. BATTERY AT 30% — Brutalist battery (ConceptOverlay)
const BatteryIllustrationV2: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const s = size / 800;

  const enter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 200 },
  });

  const drainProgress = interpolate(frame, [8, 35], [0.65, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse =
    frame > 30 ? interpolate(frame % 20, [0, 10, 20], [1, 0.7, 1]) : 1;

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
      <svg
        width={200 * s}
        height={340 * s}
        viewBox="0 0 200 340"
        fill="none"
      >
        {/* Hard shadow (offset 6px) */}
        <rect x={36} y={26} width={140} height={300} rx={4} fill={C.black} />
        <rect x={71} y={6} width={70} height={20} rx={4} fill={C.black} />

        {/* Battery cap */}
        <rect
          x={65}
          y={0}
          width={70}
          height={20}
          rx={4}
          fill={C.white}
          stroke={C.black}
          strokeWidth={2}
        />

        {/* Battery body */}
        <rect
          x={30}
          y={20}
          width={140}
          height={300}
          rx={4}
          fill={C.white}
          stroke={C.black}
          strokeWidth={2}
        />

        {/* Fill level — orange */}
        <rect
          x={38}
          y={28 + 284 * (1 - drainProgress)}
          width={124}
          height={284 * drainProgress}
          rx={2}
          fill={C.orange}
          opacity={pulse}
        />
      </svg>

      {/* Percentage text */}
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 72 * s,
          color: C.black,
          letterSpacing: -2,
        }}
      >
        {Math.round(drainProgress * 100)}%
      </div>
    </div>
  );
};

// 4. MAKE THE SPACE — Two figures with space between (ConceptOverlay)
const MakeSpaceIllustrationV2: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const s = size / 800;

  const expand = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 200 },
  });

  const gap = interpolate(expand, [0, 1], [20, 100]);

  const ringPulse = interpolate(frame % 40, [0, 20, 40], [0.85, 1.0, 0.85]);

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
        {/* Orange circle radiating from center */}
        <circle
          cx={200}
          cy={200}
          r={80 * expand * ringPulse}
          fill={C.orange}
          opacity={0.15}
        />
        <circle
          cx={200}
          cy={200}
          r={80 * expand * ringPulse}
          stroke={C.orange}
          strokeWidth={2}
          fill="none"
          opacity={0.5}
        />

        {/* Left figure — hard shadow */}
        <rect
          x={200 - gap - 54}
          y={154}
          width={50}
          height={100}
          rx={4}
          fill={C.black}
          opacity={expand}
        />
        <circle
          cx={200 - gap - 29}
          cy={144}
          r={24}
          fill={C.black}
          opacity={expand}
        />

        {/* Left figure — main */}
        <rect
          x={200 - gap - 58}
          y={150}
          width={50}
          height={100}
          rx={4}
          fill={C.white}
          stroke={C.black}
          strokeWidth={2}
          opacity={expand}
        />
        <circle
          cx={200 - gap - 33}
          cy={140}
          r={24}
          fill={C.white}
          stroke={C.black}
          strokeWidth={2}
          opacity={expand}
        />

        {/* Right figure — hard shadow */}
        <rect
          x={200 + gap + 8}
          y={154}
          width={50}
          height={100}
          rx={4}
          fill={C.black}
          opacity={expand}
        />
        <circle
          cx={200 + gap + 33}
          cy={144}
          r={24}
          fill={C.black}
          opacity={expand}
        />

        {/* Right figure — main */}
        <rect
          x={200 + gap + 4}
          y={150}
          width={50}
          height={100}
          rx={4}
          fill={C.white}
          stroke={C.black}
          strokeWidth={2}
          opacity={expand}
        />
        <circle
          cx={200 + gap + 29}
          cy={140}
          r={24}
          fill={C.white}
          stroke={C.black}
          strokeWidth={2}
          opacity={expand}
        />

        {/* Arrows pointing outward */}
        <line
          x1={200 - 10}
          y1={200}
          x2={200 - gap + 10}
          y2={200}
          stroke={C.orange}
          strokeWidth={3}
          opacity={expand}
        />
        <line
          x1={200 + 10}
          y1={200}
          x2={200 + gap - 10}
          y2={200}
          stroke={C.orange}
          strokeWidth={3}
          opacity={expand}
        />
      </svg>
    </div>
  );
};

// 5. SHOW VULNERABILITY — Cracked shield (FloatingKeyword customVisual)
const VulnerabilityVisual: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 200 },
  });

  const crackReveal = spring({
    frame: Math.max(0, frame - 8),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 160 },
  });

  return (
    <div
      style={{
        position: "relative",
        transform: `scale(${enter})`,
        opacity: enter,
      }}
    >
      {/* Hard shadow */}
      <svg
        width={140}
        height={170}
        viewBox="0 0 140 170"
        fill="none"
        style={{ position: "absolute", top: 4, left: 4 }}
      >
        <path
          d="M70 10 L130 40 L120 130 L70 160 L20 130 L10 40 Z"
          fill={C.black}
        />
      </svg>

      {/* Main shield */}
      <svg width={140} height={170} viewBox="0 0 140 170" fill="none">
        <path
          d="M70 10 L130 40 L120 130 L70 160 L20 130 L10 40 Z"
          fill={C.orange}
          stroke={C.black}
          strokeWidth={2}
        />

        {/* Crack */}
        <path
          d="M70 30 L65 60 L75 80 L60 110 L72 140"
          stroke={C.white}
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
          opacity={crackReveal}
        />
      </svg>
    </div>
  );
};

// 7. LEAD BY EXAMPLE — Hierarchy diagram (FloatingKeyword customVisual)
const LeadByExampleVisual: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 200 },
  });

  const arrowGrow = spring({
    frame: Math.max(0, frame - 6),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  const followersEnter = [
    spring({
      frame: Math.max(0, frame - 12),
      fps: 30,
      from: 0,
      to: 1,
      config: { damping: 20, stiffness: 200 },
    }),
    spring({
      frame: Math.max(0, frame - 16),
      fps: 30,
      from: 0,
      to: 1,
      config: { damping: 20, stiffness: 200 },
    }),
    spring({
      frame: Math.max(0, frame - 20),
      fps: 30,
      from: 0,
      to: 1,
      config: { damping: 20, stiffness: 200 },
    }),
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
        transform: `scale(${enter})`,
        opacity: enter,
      }}
    >
      {/* Leader label — brutalist pill */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 4,
            padding: "8px 20px",
            borderRadius: 9999,
            backgroundColor: C.black,
            border: `2px solid ${C.black}`,
          }}
        >
          <span style={{ opacity: 0, fontFamily, fontWeight: 800, fontSize: 16 }}>
            LEADER
          </span>
        </div>
        <div
          style={{
            position: "relative",
            padding: "8px 20px",
            borderRadius: 9999,
            backgroundColor: C.orange,
            border: `2px solid ${C.black}`,
          }}
        >
          <span
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 16,
              color: C.white,
              letterSpacing: 2,
            }}
          >
            LEADER
          </span>
        </div>
      </div>

      {/* Orange arrow down */}
      <svg
        width={40}
        height={50}
        viewBox="0 0 40 50"
        fill="none"
        style={{ alignSelf: "center", opacity: arrowGrow }}
      >
        <line
          x1={20}
          y1={0}
          x2={20}
          y2={35 * arrowGrow}
          stroke={C.orange}
          strokeWidth={3}
        />
        <path
          d="M10 28 L20 42 L30 28"
          stroke={C.orange}
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Follower circles */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        {followersEnter.map((fEnter, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              transform: `scale(${fEnter})`,
              opacity: fEnter,
            }}
          >
            {/* Shadow */}
            <div
              style={{
                position: "absolute",
                top: 3,
                left: 3,
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: C.black,
              }}
            />
            {/* Circle */}
            <div
              style={{
                position: "relative",
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: C.white,
                border: `2px solid ${C.black}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// 8. PSYCHOLOGICAL SAFETY — Circle of figures (ConceptOverlay)
const PsychSafetyIllustrationV2: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const s = size / 800;

  const ringGrow = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 200 },
  });

  const people = [
    { angle: 0, delay: 6 },
    { angle: 72, delay: 9 },
    { angle: 144, delay: 12 },
    { angle: 216, delay: 15 },
    { angle: 288, delay: 18 },
  ];

  const textEnter = spring({
    frame: Math.max(0, frame - 22),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 200 },
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
        width={380 * s}
        height={380 * s}
        viewBox="0 0 380 380"
        fill="none"
      >
        {/* Hard shadow ring */}
        <circle
          cx={194}
          cy={194}
          r={140 * ringGrow}
          stroke={C.black}
          strokeWidth={6}
          fill="none"
          opacity={0.3}
        />

        {/* Orange protective border */}
        <circle
          cx={190}
          cy={190}
          r={140 * ringGrow}
          stroke={C.orange}
          strokeWidth={4}
          fill="none"
        />
        <circle
          cx={190}
          cy={190}
          r={140 * ringGrow}
          fill={C.orange}
          opacity={0.08}
        />

        {/* "SAFE" text at center */}
        <text
          x={190}
          y={198}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight={900}
          fontSize={36}
          fill={C.black}
          opacity={textEnter}
          letterSpacing={4}
        >
          SAFE
        </text>

        {/* People around the circle */}
        {people.map((p, i) => {
          const pEnter = spring({
            frame: Math.max(0, frame - p.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 20, stiffness: 200 },
          });
          const rad = (p.angle * Math.PI) / 180;
          const cx = 190 + Math.cos(rad) * 120;
          const cy = 190 + Math.sin(rad) * 120;

          return (
            <g key={i} opacity={pEnter}>
              {/* Person shadow */}
              <circle cx={cx + 3} cy={cy - 5} r={14} fill={C.black} />
              {/* Person body shadow */}
              <rect
                x={cx - 10 + 3}
                y={cy + 6 + 3}
                width={20}
                height={24}
                rx={4}
                fill={C.black}
              />

              {/* Person head */}
              <circle
                cx={cx}
                cy={cy - 8}
                r={14}
                fill={C.white}
                stroke={C.black}
                strokeWidth={2}
              />
              {/* Person body */}
              <rect
                x={cx - 10}
                y={cy + 6}
                width={20}
                height={24}
                rx={4}
                fill={C.white}
                stroke={C.black}
                strokeWidth={2}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// CTA CARD — Brutalist style
const CTACardV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 200 },
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
      {/* Card wrapper with hard shadow */}
      <div style={{ position: "relative" }}>
        {/* Hard shadow */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            width: 680,
            padding: "36px 48px",
            borderRadius: 12,
            backgroundColor: C.black,
            border: `2px solid ${C.black}`,
          }}
        >
          <div style={{ height: 140 }} />
        </div>

        {/* Main card */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            padding: "36px 48px",
            borderRadius: 12,
            backgroundColor: C.white,
            border: `2px solid ${C.black}`,
            width: 680,
          }}
        >
          <div
            style={{
              fontFamily,
              fontWeight: 900,
              fontSize: 38,
              color: C.black,
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

          {/* Orange accent line */}
          <div
            style={{
              width: 100,
              height: 4,
              backgroundColor: C.orange,
              borderRadius: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════════
export const PodcastStressExpertV2: React.FC<{
  videoSrc?: string;
}> = ({
  videoSrc = "videos/2026-02-23-podcast-test/reframed-split.mp4",
}) => {
  const frame = useCurrentFrame();
  const zoom = getZoom(frame);

  // Orange hook flash (brutalist — instant punch)
  const hookFlash = interpolate(frame, [0, 3], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captionHidden = CAPTION_HIDE_RANGES.some(
    (r) => frame >= r.start && frame < r.end
  );

  return (
    <AbsoluteFill style={{ backgroundColor: C.black }}>
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

      {/* ── HOOK FLASH (orange) ──────────────────────────────── */}
      {hookFlash > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: C.orange,
            opacity: hookFlash,
            zIndex: 50,
          }}
        />
      )}

      {/* ═════ SCENE 1: MANY HATS — FloatingKeyword customVisual ═══ */}
      <Sequence from={120} durationInFrames={55} premountFor={15}>
        <FloatingKeyword
          durationInFrames={55}
          text="MANY HATS"
          side="right"
          visual={<ManyHatsVisual />}
          color={C.white}
          fontSize={70}
          topPercent={35}
        />
      </Sequence>

      {/* ═════ SCENE 2: BATTERY AT 30% — ConceptOverlay wipe-right ═══ */}
      <Sequence from={493} durationInFrames={65} premountFor={15}>
        <ConceptOverlay
          durationInFrames={65}
          illustration={<BatteryIllustrationV2 />}
          entrance="wipe-right"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ═════ SCENE 3: BE PRESENT — FloatingKeyword text-only ═══ */}
      <Sequence from={832} durationInFrames={55} premountFor={15}>
        <FloatingKeyword
          durationInFrames={55}
          text="BE PRESENT"
          side="left"
          color={C.orange}
          fontSize={100}
          topPercent={38}
        />
      </Sequence>

      {/* ═════ SCENE 4: MAKE THE SPACE — ConceptOverlay clip-circle ═══ */}
      <Sequence from={1096} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<MakeSpaceIllustrationV2 />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ═════ SCENE 5: VULNERABILITY — FloatingKeyword customVisual ═══ */}
      <Sequence from={1310} durationInFrames={65} premountFor={15}>
        <FloatingKeyword
          durationInFrames={65}
          text="VULNERABILITY"
          side="right"
          visual={<VulnerabilityVisual />}
          color={C.white}
          fontSize={60}
          topPercent={35}
        />
      </Sequence>

      {/* ═════ SCENE 6: RADICAL HONESTY — FloatingKeyword text-only ═══ */}
      <Sequence from={1919} durationInFrames={55} premountFor={15}>
        <FloatingKeyword
          durationInFrames={55}
          text="RADICAL HONESTY"
          side="left"
          color={C.orange}
          fontSize={80}
          topPercent={38}
        />
      </Sequence>

      {/* ═════ SCENE 7: LEAD BY EXAMPLE — FloatingKeyword customVisual ═══ */}
      <Sequence from={2255} durationInFrames={55} premountFor={15}>
        <FloatingKeyword
          durationInFrames={55}
          text="LEAD BY EXAMPLE"
          side="right"
          visual={<LeadByExampleVisual />}
          color={C.white}
          fontSize={58}
          topPercent={32}
        />
      </Sequence>

      {/* ═════ SCENE 8: PSYCHOLOGICAL SAFETY — ConceptOverlay wipe-right ═══ */}
      <Sequence from={2588} durationInFrames={60} premountFor={15}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<PsychSafetyIllustrationV2 />}
          entrance="wipe-right"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ═════ CTA — Brutalist card ═══════════════════════════════ */}
      <Sequence from={3530} durationInFrames={70} premountFor={15}>
        <CTACardV2 />
      </Sequence>

      {/* ═════ WORD-BY-WORD CAPTIONS (layout-aware) ════════════════ */}
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
        {!captionHidden &&
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
                    fontSize:
                      getLayoutType(frame) === "split_screen" ? 56 : 72,
                    color: w.emphasis ? C.orange : C.white,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    textShadow: w.emphasis
                      ? `0 0 20px rgba(255, 107, 0, 0.6), 0 4px 12px rgba(0,0,0,0.8)`
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
