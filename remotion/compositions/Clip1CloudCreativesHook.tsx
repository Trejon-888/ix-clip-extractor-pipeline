/**
 * Clip 1: Cloud Code Creates ALL My Visual Content — Hook Clip
 *
 * STORY: Claude Code is the #1 coding agent, but the speaker trained it
 * for visual content creation — thumbnails, carousels, documents — all
 * posted across every social platform from one conversation. Step-by-step
 * system to set up your own AI agent. Building agentic systems at INFINITX.
 *
 * SOURCE: Pipeline clip with baked-in audio (9:16 portrait)
 * CTA: "WATCH THE FULL VIDEO" — Claude Creatives
 * Duration: 74s (2220 frames @ 30fps, word data says 2246)
 *
 * POP-OUTS (6 content + 1 CTA):
 *   1. "VISUAL CONTENT" (frame 428, 80f) — Paintbrush + canvas with AI sparkle
 *   2. "THREE OUTPUTS" (frame 643, 85f) — Thumbnail/Carousel/Doc triple stack
 *   3. "ONE CONVERSATION" (frame 871, 70f) — Chat bubble with branching outputs
 *   4. "AI CREATIVES" (frame 1149, 70f) — Gallery grid with sparkle badges
 *   5. "YOUR AI AGENT" (frame 1481, 75f) — Robot arm + content factory
 *   6. "INFINITX" (frame 2032, 70f) — Real INFINITX logo
 *   7. CTA (frame 2150, 70f) — "WATCH THE FULL VIDEO"
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
import { WORDS } from "../data/clip1-claude-creatives-hook-words";

const { fontFamily } = loadFont();

// ================================================================
// CONSTANTS
// ================================================================
const TOTAL_FRAMES = 2246;

// Flat zoom — no shaking/swimming
function getZoom(_frame: number): number {
  return 1.0;
}

// ================================================================
// Concept overlay frame ranges (captions hidden during these)
// ================================================================
const CONCEPT_RANGES = [
  { start: 428, end: 508 },   // Visual Content
  { start: 643, end: 728 },   // Three Outputs
  { start: 871, end: 941 },   // One Conversation
  { start: 1149, end: 1219 }, // AI Creatives
  { start: 1481, end: 1556 }, // Your AI Agent
  { start: 2032, end: 2102 }, // INFINITX
  { start: 2150, end: 2220 }, // CTA
];

// ================================================================
// SFX EVENTS (J-cut: audio 2-3 frames BEFORE visual)
// No consecutive repeats of same sound
// ================================================================
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  // Hook burst
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  // Visual Content
  { frame: 426, src: "audio/whoosh-effect-382717.mp3", volume: 0.20 },
  // Three Outputs
  { frame: 641, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  // One Conversation
  { frame: 869, src: "audio/pop-402324.mp3", volume: 0.20 },
  // AI Creatives
  { frame: 1147, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  // Your AI Agent
  { frame: 1479, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  // INFINITX
  { frame: 2030, src: "audio/pop-402324.mp3", volume: 0.20 },
  // CTA
  { frame: 2148, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
];

// ================================================================
// ILLUSTRATION 1: VISUAL CONTENT
// Paintbrush drawing on a canvas with AI sparkle particles
// ================================================================
const VisualContentIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const canvasScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const brushSwing = interpolate(frame, [0, 20, 40], [15, -10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sparkleOpacity = spring({
    frame: Math.max(0, frame - 12),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  const sparkles = [
    { cx: 420, cy: 150, delay: 14, r: 6 },
    { cx: 180, cy: 200, delay: 18, r: 5 },
    { cx: 380, cy: 380, delay: 22, r: 7 },
    { cx: 220, cy: 440, delay: 16, r: 4 },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      style={{ transform: `scale(${canvasScale})` }}
    >
      {/* Canvas frame */}
      <rect
        x={120}
        y={100}
        width={360}
        height={320}
        rx={16}
        fill="#F8F8F8"
        stroke="#E0E0E0"
        strokeWidth={3}
      />
      {/* Gradient fill representing visual content */}
      <rect
        x={140}
        y={120}
        width={320}
        height={280}
        rx={10}
        fill="url(#canvasGrad)"
      />
      <defs>
        <linearGradient id="canvasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE4CC" />
          <stop offset="50%" stopColor="#FFD4A8" />
          <stop offset="100%" stopColor="#FFC080" />
        </linearGradient>
      </defs>
      {/* Image icon on canvas */}
      <rect x={200} y={180} width={200} height={140} rx={12} fill="#FF7614" opacity={0.15} />
      <circle cx={250} cy={220} r={18} fill="#FF7614" opacity={0.4} />
      <path
        d="M210 300 L280 240 L320 270 L360 220 L390 300Z"
        fill="#FF7614"
        opacity={0.35}
      />

      {/* Paintbrush */}
      <g
        transform={`translate(380, 440) rotate(${brushSwing})`}
        style={{ transformOrigin: "380px 440px" }}
      >
        <rect x={-8} y={-80} width={16} height={55} rx={4} fill="#8B5E3C" />
        <rect x={-12} y={-25} width={24} height={35} rx={3} fill="#C0C0C0" />
        <rect x={-10} y={10} width={20} height={30} rx={6} fill="#FF7614" />
      </g>

      {/* AI sparkle particles */}
      {sparkles.map((sp, i) => {
        const spScale = spring({
          frame: Math.max(0, frame - sp.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 200 },
        });
        const pulse = interpolate((frame + i * 7) % 24, [0, 12, 24], [0.7, 1.0, 0.7]);
        return (
          <g key={i} opacity={sparkleOpacity * pulse}>
            <circle
              cx={sp.cx}
              cy={sp.cy}
              r={sp.r * spScale}
              fill="#FF7614"
            />
            {/* 4-point star */}
            <path
              d={`M${sp.cx} ${sp.cy - sp.r * 2.2 * spScale}
                  L${sp.cx + sp.r * 0.5 * spScale} ${sp.cy}
                  L${sp.cx} ${sp.cy + sp.r * 2.2 * spScale}
                  L${sp.cx - sp.r * 0.5 * spScale} ${sp.cy}Z`}
              fill="#FF7614"
              opacity={0.6}
            />
          </g>
        );
      })}

      {/* "AI" badge bottom-right of canvas */}
      <g>
        <rect x={400} y={370} width={65} height={36} rx={10} fill="#FF7614" />
        <text
          x={432}
          y={395}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight={800}
          fontSize={18}
          fill="white"
        >
          AI
        </text>
      </g>
    </svg>
  );
};

// ================================================================
// ILLUSTRATION 2: THREE OUTPUTS
// Triple-stack showing Thumbnail, Carousel, Document
// ================================================================
const ThreeOutputsIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const cards = [
    { label: "THUMBNAIL", icon: "image", y: 100, delay: 0, color: "#FF7614" },
    { label: "CAROUSEL", icon: "slides", y: 240, delay: 6, color: "#FF9347" },
    { label: "DOCUMENT", icon: "doc", y: 380, delay: 12, color: "#FFB070" },
  ];

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22 * s,
      }}
    >
      {cards.map((card, i) => {
        const enter = spring({
          frame: Math.max(0, frame - card.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 150 },
        });

        const slideX = interpolate(enter, [0, 1], [i % 2 === 0 ? -40 : 40, 0]);

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18 * s,
              padding: `${18 * s}px ${28 * s}px`,
              borderRadius: 18 * s,
              backgroundColor: "#FFFFFF",
              border: `2.5px solid ${card.color}`,
              boxShadow: `0 ${4 * s}px ${16 * s}px rgba(255, 118, 20, 0.12)`,
              opacity: enter,
              transform: `translateX(${slideX}px)`,
              width: 380 * s,
            }}
          >
            {/* Icon circle */}
            <div
              style={{
                width: 54 * s,
                height: 54 * s,
                borderRadius: "50%",
                backgroundColor: card.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${enter})`,
                flexShrink: 0,
              }}
            >
              {card.icon === "image" && (
                <svg width={24 * s} height={24 * s} viewBox="0 0 24 24" fill="none">
                  <rect x={3} y={3} width={18} height={18} rx={3} stroke="white" strokeWidth={2} />
                  <circle cx={8.5} cy={8.5} r={2} fill="white" />
                  <path d="M3 16L8 11L13 14L17 10L21 16" stroke="white" strokeWidth={2} />
                </svg>
              )}
              {card.icon === "slides" && (
                <svg width={24 * s} height={24 * s} viewBox="0 0 24 24" fill="none">
                  <rect x={2} y={5} width={8} height={14} rx={2} stroke="white" strokeWidth={2} />
                  <rect x={8} y={5} width={8} height={14} rx={2} stroke="white" strokeWidth={2} opacity={0.6} />
                  <rect x={14} y={5} width={8} height={14} rx={2} stroke="white" strokeWidth={2} opacity={0.3} />
                </svg>
              )}
              {card.icon === "doc" && (
                <svg width={24 * s} height={24 * s} viewBox="0 0 24 24" fill="none">
                  <rect x={5} y={2} width={14} height={20} rx={2} stroke="white" strokeWidth={2} />
                  <line x1={8} y1={8} x2={16} y2={8} stroke="white" strokeWidth={1.5} />
                  <line x1={8} y1={12} x2={16} y2={12} stroke="white" strokeWidth={1.5} />
                  <line x1={8} y1={16} x2={13} y2={16} stroke="white" strokeWidth={1.5} />
                </svg>
              )}
            </div>
            {/* Label */}
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 22 * s,
                color: "#1A1A1A",
                letterSpacing: 2,
              }}
            >
              {card.label}
            </div>
            {/* Checkmark */}
            <div
              style={{
                marginLeft: "auto",
                width: 30 * s,
                height: 30 * s,
                borderRadius: "50%",
                backgroundColor: "#22C55E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${spring({
                  frame: Math.max(0, frame - card.delay - 8),
                  fps: 30,
                  from: 0,
                  to: 1,
                  config: { damping: 10, stiffness: 200 },
                })})`,
              }}
            >
              <svg width={14 * s} height={14 * s} viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ================================================================
// ILLUSTRATION 3: ONE CONVERSATION
// Single chat bubble branching into multiple content outputs
// ================================================================
const OneConversationIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const bubbleEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const branchProgress = spring({
    frame: Math.max(0, frame - 8),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  const outputs = [
    { label: "IMG", cx: 160, cy: 420, delay: 12, color: "#FF7614" },
    { label: "DOC", cx: 300, cy: 450, delay: 16, color: "#FF9347" },
    { label: "POST", cx: 440, cy: 420, delay: 20, color: "#FFB070" },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Main chat bubble */}
      <g
        opacity={bubbleEnter}
        transform={`translate(300, 180) scale(${bubbleEnter}) translate(-300, -180)`}
      >
        <rect x={170} y={110} width={260} height={120} rx={24} fill="#FF7614" />
        <polygon points="280,230 300,260 320,230" fill="#FF7614" />
        <text
          x={300}
          y={165}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight={700}
          fontSize={22}
          fill="white"
          letterSpacing={1}
        >
          1 PROMPT
        </text>
        <text
          x={300}
          y={195}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight={500}
          fontSize={14}
          fill="rgba(255,255,255,0.7)"
        >
          Create all my content
        </text>
      </g>

      {/* Branching lines */}
      {outputs.map((out, i) => {
        const lineLen = branchProgress;
        const startX = 300;
        const startY = 270;
        const endX = startX + (out.cx - startX) * lineLen;
        const endY = startY + (out.cy - 40 - startY) * lineLen;
        return (
          <line
            key={`line-${i}`}
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke="#FF7614"
            strokeWidth={2.5}
            strokeDasharray="6 4"
            opacity={branchProgress * 0.5}
          />
        );
      })}

      {/* Output nodes */}
      {outputs.map((out, i) => {
        const nodeEnter = spring({
          frame: Math.max(0, frame - out.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 160 },
        });

        return (
          <g
            key={i}
            opacity={nodeEnter}
            transform={`translate(${out.cx}, ${out.cy}) scale(${nodeEnter}) translate(${-out.cx}, ${-out.cy})`}
          >
            <circle cx={out.cx} cy={out.cy} r={44} fill={out.color} />
            <circle cx={out.cx} cy={out.cy} r={52} stroke={out.color} strokeWidth={2} fill="none" opacity={0.3} />
            <text
              x={out.cx}
              y={out.cy + 6}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={800}
              fontSize={16}
              fill="white"
              letterSpacing={1.5}
            >
              {out.label}
            </text>
          </g>
        );
      })}

      {/* Arrow down from bubble */}
      <g opacity={branchProgress}>
        <path
          d="M295 260 L300 275 L305 260"
          fill="#FF7614"
          opacity={0.6}
        />
      </g>
    </svg>
  );
};

// ================================================================
// ILLUSTRATION 4: AI CREATIVES
// Gallery grid with sparkle quality badges
// ================================================================
const AICreativesIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const gridItems = [
    { x: 0, y: 0, w: 170, h: 170, delay: 0, label: "" },
    { x: 190, y: 0, w: 170, h: 80, delay: 4, label: "" },
    { x: 190, y: 100, w: 170, h: 70, delay: 6, label: "" },
    { x: 0, y: 190, w: 80, h: 80, delay: 8, label: "" },
    { x: 100, y: 190, w: 260, h: 80, delay: 10, label: "" },
  ];

  const badgeScale = spring({
    frame: Math.max(0, frame - 16),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 180 },
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
      <div style={{ position: "relative", width: 360 * s, height: 270 * s }}>
        {gridItems.map((item, i) => {
          const enter = spring({
            frame: Math.max(0, frame - item.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 150 },
          });

          const colors = ["#FFE8D4", "#FFF0E0", "#FFD9B8", "#FFF4E8", "#FFEBD4"];

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: item.x * s,
                top: item.y * s,
                width: item.w * s,
                height: item.h * s,
                borderRadius: 14 * s,
                backgroundColor: colors[i],
                border: "2px solid rgba(255, 118, 20, 0.15)",
                transform: `scale(${enter})`,
                opacity: enter,
                overflow: "hidden",
              }}
            >
              {/* Faux content lines */}
              {i === 0 && (
                <div style={{ padding: 16 * s }}>
                  <div style={{ width: "60%", height: 8 * s, borderRadius: 4, backgroundColor: "#FF7614", opacity: 0.3, marginBottom: 8 * s }} />
                  <div style={{ width: "80%", height: 6 * s, borderRadius: 3, backgroundColor: "#FF7614", opacity: 0.15, marginBottom: 6 * s }} />
                  <div style={{ width: "45%", height: 6 * s, borderRadius: 3, backgroundColor: "#FF7614", opacity: 0.15 }} />
                  {/* Thumbnail icon */}
                  <div style={{ marginTop: 14 * s, width: "100%", height: 60 * s, borderRadius: 8, backgroundColor: "rgba(255,118,20,0.12)" }} />
                </div>
              )}
              {i > 0 && (
                <div style={{ padding: 12 * s }}>
                  <div style={{ width: "70%", height: 6 * s, borderRadius: 3, backgroundColor: "#FF7614", opacity: 0.2, marginBottom: 6 * s }} />
                  <div style={{ width: "50%", height: 6 * s, borderRadius: 3, backgroundColor: "#FF7614", opacity: 0.12 }} />
                </div>
              )}
            </div>
          );
        })}

        {/* Quality sparkle badge */}
        <div
          style={{
            position: "absolute",
            right: -20 * s,
            top: -20 * s,
            width: 64 * s,
            height: 64 * s,
            borderRadius: "50%",
            backgroundColor: "#FF7614",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${badgeScale})`,
            boxShadow: `0 4px 16px rgba(255,118,20,0.4)`,
          }}
        >
          <svg width={28 * s} height={28 * s} viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2L16.5 10.5L25 8L18 14L25 20L16.5 17.5L14 26L11.5 17.5L3 20L10 14L3 8L11.5 10.5Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

// ================================================================
// ILLUSTRATION 5: YOUR AI AGENT
// Robot arm assembling content pieces on a conveyor belt
// ================================================================
const YourAIAgentIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const armEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const armSwing = interpolate(frame, [0, 30, 60], [-8, 8, -8], {
    extrapolateRight: "extend",
  });

  const beltMove = interpolate(frame, [0, 60], [0, -60], {
    extrapolateRight: "extend",
  });

  const items = [
    { label: "IMG", delay: 6, offset: 0 },
    { label: "PDF", delay: 10, offset: 130 },
    { label: "POST", delay: 14, offset: 260 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Conveyor belt */}
      <rect x={60} y={380} width={480} height={50} rx={10} fill="#E8E8E8" stroke="#D0D0D0" strokeWidth={2} />
      {/* Belt lines */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const x = ((80 + i * 65 + beltMove) % 480) + 60;
        return (
          <line key={i} x1={x} y1={385} x2={x} y2={425} stroke="#C8C8C8" strokeWidth={2} />
        );
      })}

      {/* Content items on belt */}
      {items.map((item, i) => {
        const itemEnter = spring({
          frame: Math.max(0, frame - item.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 160 },
        });
        const x = 120 + item.offset;
        return (
          <g
            key={i}
            opacity={itemEnter}
            transform={`translate(${x}, 350) scale(${itemEnter}) translate(${-x}, -350)`}
          >
            <rect x={x - 40} y={320} width={80} height={60} rx={10} fill="#FF7614" opacity={0.85 - i * 0.15} />
            <text
              x={x}
              y={356}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={700}
              fontSize={16}
              fill="white"
              letterSpacing={1}
            >
              {item.label}
            </text>
          </g>
        );
      })}

      {/* Robot arm base */}
      <g opacity={armEnter}>
        {/* Base */}
        <rect x={260} y={140} width={80} height={40} rx={8} fill="#1A1A1A" />
        {/* Arm segment */}
        <g transform={`rotate(${armSwing}, 300, 180)`}>
          <rect x={290} y={180} width={20} height={100} rx={6} fill="#333333" />
          {/* Elbow joint */}
          <circle cx={300} cy={180} r={14} fill="#1A1A1A" />
          <circle cx={300} cy={180} r={8} fill="#FF7614" />
          {/* Gripper */}
          <g transform={`translate(300, 280)`}>
            <rect x={-16} y={0} width={10} height={28} rx={3} fill="#555" />
            <rect x={6} y={0} width={10} height={28} rx={3} fill="#555" />
            <rect x={-20} y={26} width={14} height={6} rx={3} fill="#777" />
            <rect x={6} y={26} width={14} height={6} rx={3} fill="#777" />
          </g>
        </g>
      </g>

      {/* "AI" glow badge on arm */}
      <g opacity={armEnter}>
        <circle cx={300} cy={155} r={18} fill="#FF7614" />
        <text
          x={300}
          y={161}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight={800}
          fontSize={14}
          fill="white"
        >
          AI
        </text>
      </g>

      {/* Output arrow */}
      <g opacity={spring({ frame: Math.max(0, frame - 20), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })}>
        <path d="M510 405 L550 405 L540 395 M550 405 L540 415" stroke="#FF7614" strokeWidth={3} strokeLinecap="round" />
      </g>
    </svg>
  );
};

// ================================================================
// ILLUSTRATION 6: INFINITX LOGO
// Real logo with frosted card backing
// ================================================================
const INFINITXLogoIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;
  const enter = spring({
    frame: Math.max(0, frame - 3),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${enter})`,
        opacity: enter,
      }}
    >
      <div
        style={{
          padding: 44 * s,
          borderRadius: 32 * s,
          backgroundColor: "#F8F8F8",
          boxShadow: `0 ${6 * s}px ${30 * s}px rgba(0,0,0,0.08)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile("infinitx-logo.png")}
          style={{
            width: 280 * s,
            height: 280 * s,
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

// ================================================================
// CTA CARD — "WATCH THE FULL VIDEO" + "Claude Creatives"
// ================================================================
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

  const fadeOut = interpolate(frame, [53, 65], [1, 0], {
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
        {/* Claude Code terminal icon */}
        <Img
          src={staticFile("logos/claude-code-terminal.webp")}
          style={{
            width: 80,
            height: 80,
            objectFit: "contain",
            borderRadius: 16,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Img
            src={staticFile("logos/youtube.svg")}
            style={{ width: 44, height: 44 }}
          />
          <div
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 34,
              color: "#1A1A1A",
              letterSpacing: 2,
            }}
          >
            WATCH THE FULL VIDEO
          </div>
        </div>

        <div
          style={{
            fontFamily,
            fontWeight: 600,
            fontSize: 24,
            color: "#888",
            letterSpacing: 1,
          }}
        >
          Claude Creatives
        </div>

        <div
          style={{
            width: 100,
            height: 3,
            backgroundColor: "#FF7614",
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};

// ================================================================
// MAIN COMPOSITION
// ================================================================
export const Clip1CloudCreativesHook: React.FC<{
  videoSrc?: string;
}> = ({
  videoSrc = "videos/2026-03-02-claude-creatives/clip-01-cloud-code-creates-all-my-visual-content.mp4",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = getZoom(frame);

  // Hook flash — orange burst on frame 0
  const hookFlash = interpolate(frame, [0, 3], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Are we inside a concept overlay?
  const conceptActive = CONCEPT_RANGES.some(
    (r) => frame >= r.start && frame < r.end
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* == BASE: Speaker video with zoom ========================= */}
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
          volume={1}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* == HOOK FLASH (orange burst, frames 0-3) ================= */}
      {hookFlash > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#FF6B00",
            opacity: hookFlash,
            zIndex: 50,
          }}
        />
      )}

      {/* ===== ConceptOverlay POP-OUT MOMENTS ===================== */}

      {/* 1. "trained Claude Code to create visual content" — frame 428 */}
      <Sequence from={428} durationInFrames={80} premountFor={15}>
        <ConceptOverlay
          durationInFrames={80}
          illustration={<VisualContentIllustration />}
          caption="VISUAL CONTENT"
          subtitle="Trained Claude Code to create visuals"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* 2. "Thumbnails... carousel... brand... documents" — frame 643 */}
      <Sequence from={643} durationInFrames={85} premountFor={15}>
        <ConceptOverlay
          durationInFrames={85}
          illustration={<ThreeOutputsIllustration />}
          caption="THREE OUTPUTS"
          subtitle="Thumbnails + Carousels + Documents"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={620}
        />
      </Sequence>

      {/* 3. "all from one conversation" — frame 871 */}
      <Sequence from={871} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<OneConversationIllustration />}
          caption="ONE CONVERSATION"
          subtitle="One prompt creates everything"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={580}
        />
      </Sequence>

      {/* 4. "this incredible carousel images" — frame 1149 */}
      <Sequence from={1149} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<AICreativesIllustration />}
          caption="AI CREATIVES"
          subtitle="Beautiful thumbnails, docs, carousels"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={620}
        />
      </Sequence>

      {/* 5. "set up your own AI agent" — frame 1481 */}
      <Sequence from={1481} durationInFrames={75} premountFor={15}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<YourAIAgentIllustration />}
          caption="YOUR AI AGENT"
          subtitle="Automated content creation system"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={620}
        />
      </Sequence>

      {/* 6. "building agentic systems at INFINITX" — frame 2032 */}
      <Sequence from={2032} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<INFINITXLogoIllustration />}
          caption="INFINITX"
          subtitle="Building Agentic Systems"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={480}
        />
      </Sequence>

      {/* ===== CTA CARD =========================================== */}
      <Sequence from={2150} durationInFrames={70} premountFor={15}>
        <CTACard />
      </Sequence>

      {/* ===== WORD-BY-WORD CAPTIONS (bottom 28%) ================= */}
      <div
        style={{
          position: "absolute",
          bottom: "28%",
          left: 0,
          width: "100%",
          height: "10%",
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
                    fontSize: 72,
                    color: w.emphasis ? "#FF7614" : "#FFFFFF",
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    textShadow: w.emphasis
                      ? "0 0 20px rgba(255, 118, 20, 0.6), 0 4px 12px rgba(0,0,0,0.8)"
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

      {/* ===== SFX LAYER ========================================== */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={15}>
          <Audio
            src={staticFile(sfx.src)}
            volume={sfx.volume}
            startFrom={0}
          />
        </Sequence>
      ))}

      {/* ===== BACKGROUND MUSIC (first 35s, 0.02 volume) ========= */}
      <Audio
        src={staticFile("audio/background-music.mp3")}
        volume={0.02}
        startFrom={0}
        endAt={1050}
      />
    </AbsoluteFill>
  );
};
