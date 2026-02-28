/**
 * Clip: Claude Code for Visual Content Creation
 *
 * SOURCE: Pipeline clip from "Claude Creatives — AI Content Factory Setup"
 * CTA: "WATCH THE FULL VIDEO" + source title
 * Duration: ~73.4s (2250 frames @ 30fps)
 * Score: 78/100 (Rank #4)
 *
 * STORY: Claude Code isn't just for devs — trained it to make thumbnails,
 * carousels, and educational docs posted to every social platform from
 * one conversation with a social media agent manager.
 *
 * POP-OUTS (14 ConceptOverlay + 1 CTA):
 *   1.  #1 CODING AGENT       (frame  90,  65f) — trophy + terminal
 *   2.  RANKED #1             (frame 238,  55f) — medal stars ranking
 *   3.  VISUAL CONTENT        (frame 478,  65f) — palette + image frames
 *   4.  THUMBNAILS + FACE     (frame 580,  65f) — YT thumbnail frame
 *   5.  EVERY SOCIAL PLATFORM (frame 793,  55f) — 6 platform logos
 *   6.  SOCIAL MEDIA AGENT    (frame 911,  65f) — AI brain + connections
 *   7.  AI MADE THIS          (frame 1010, 60f) — sparkle + 3 designs
 *   8.  BEAUTIFUL CAROUSEL    (frame 1166, 60f) — stacked card deck
 *   9.  STEP BY STEP          (frame 1338, 65f) — numbered staircase
 *  10.  YOUR OWN AI AGENT     (frame 1479, 65f) — personalised agent
 *  11.  FOR YOUR BUSINESS     (frame 1600, 55f) — growing bar chart
 *  12.  ENRIQUE               (frame 1770, 60f) — character intro
 *  13.  AGENTIC SYSTEMS       (frame 1960, 55f) — connected node network
 *  14.  INFINITE X            (frame 2060, 65f) — INFINITX logo
 *  CTA: WATCH THE FULL VIDEO  (frame 2150, 65f)
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
import { WORDS } from "../data/clip-claude-code-visual-content-words";

const { fontFamily } = loadFont();

const TOTAL_FRAMES = 2250;

function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 88,   end: 155  }, // #1 Coding Agent
  { start: 236,  end: 293  }, // Ranked #1
  { start: 476,  end: 543  }, // Visual Content
  { start: 578,  end: 645  }, // Thumbnails + Face
  { start: 791,  end: 848  }, // Every Social Platform
  { start: 909,  end: 976  }, // Social Media Agent
  { start: 1008, end: 1070 }, // AI Made This
  { start: 1164, end: 1226 }, // Beautiful Carousel
  { start: 1336, end: 1403 }, // Step by Step
  { start: 1477, end: 1544 }, // Your Own AI Agent
  { start: 1598, end: 1655 }, // For Your Business
  { start: 1768, end: 1830 }, // Enrique
  { start: 1958, end: 2015 }, // Agentic Systems
  { start: 2058, end: 2125 }, // Infinite X
  { start: 2148, end: 2215 }, // CTA
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS (J-cut: 2 frames before visual)
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  { frame: 0,    src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  { frame: 88,   src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 236,  src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 476,  src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 578,  src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 791,  src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 909,  src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 1008, src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 1164, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1336, src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 1477, src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 1598, src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 1768, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1958, src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 2058, src: "audio/pop-402324.mp3",              volume: 0.18 },
  { frame: 2148, src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
];

// ═══════════════════════════════════════════════════════════════
// 1. #1 CODING AGENT — Trophy podium with terminal code lines
// ═══════════════════════════════════════════════════════════════
const CodingAgentIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const trophyEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const badgeEnter  = spring({ frame: Math.max(0, frame - 12), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });

  const lines = [
    { text: "claude code --do-magic", delay: 18 },
    { text: "> Creating visual content...", delay: 26 },
    { text: "> ✓ thumbnails, carousels, docs", delay: 34 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Trophy cup */}
      <g opacity={trophyEnter} transform={`translate(300,200) scale(${trophyEnter})`}>
        {/* Cup body */}
        <path d="M-60 -80 Q-80 20 -40 60 L40 60 Q80 20 60 -80 Z" fill="#FFB800" />
        {/* Cup handles */}
        <path d="M-60 -50 Q-100 -50 -100 0 Q-100 40 -60 40" stroke="#E0A000" strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d="M60 -50 Q100 -50 100 0 Q100 40 60 40" stroke="#E0A000" strokeWidth={14} fill="none" strokeLinecap="round" />
        {/* Cup base */}
        <rect x={-24} y={60} width={48} height={20} rx={4} fill="#FFB800" />
        <rect x={-40} y={80} width={80} height={10} rx={4} fill="#E0A000" />
      </g>

      {/* #1 badge */}
      <g opacity={badgeEnter} transform={`translate(300,130) scale(${badgeEnter})`}>
        <circle cx={0} cy={0} r={38} fill="#FF7614" />
        <text x={0} y={12} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={36} fill="white">#1</text>
      </g>

      {/* Terminal box */}
      {lines.map((ln, i) => {
        const enter = spring({ frame: Math.max(0, frame - ln.delay), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 130 } });
        return (
          <g key={i} opacity={enter} transform={`translate(${interpolate(enter, [0, 1], [-20, 0])}, 0)`}>
            <text x={80} y={330 + i * 36} fontFamily="'Courier New', monospace" fontWeight={600} fontSize={15 * s} fill={i === 0 ? "#FF7614" : "#22C55E"}>
              {ln.text}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. RANKED #1 — Podium with medal and stars
// ═══════════════════════════════════════════════════════════════
const RankedOneIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const podiumEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const textEnter   = spring({ frame: Math.max(0, frame - 14), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const stars = [0, 1, 2, 3, 4];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Podium blocks */}
      <g opacity={podiumEnter}>
        {/* 2nd place */}
        <rect x={100} y={310} width={130} height={120} rx={10} fill="#E5E7EB" />
        <text x={165} y={298} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22} fill="#9CA3AF">2</text>
        {/* 1st place */}
        <rect x={235} y={250} width={130} height={180} rx={10} fill="#FF7614" />
        <text x={300} y={238} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22} fill="#FF7614">1</text>
        {/* 3rd place */}
        <rect x={370} y={340} width={130} height={90} rx={10} fill="#E5E7EB" />
        <text x={435} y={328} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22} fill="#9CA3AF">3</text>

        {/* Labels */}
        <text x={165} y={376} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={18} fill="#555">2nd</text>
        <text x={300} y={320} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={28} fill="white">#1</text>
        <text x={435} y={400} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={18} fill="#555">3rd</text>
      </g>

      {/* Medal circle on top */}
      <g opacity={textEnter}>
        <circle cx={300} cy={180} r={50} fill="#FFB800" />
        <text x={300} y={192} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={36} fill="white">★</text>
        {/* Stars row */}
        {stars.map((i) => (
          <text key={i} x={175 + i * 65} y={480} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={28} fill="#FFB800">★</text>
        ))}
        <text x={300} y={540} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={20 * s} fill="#1A1A1A" letterSpacing={3}>
          CLAUDE CODE
        </text>
      </g>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. VISUAL CONTENT — Palette with floating image frames
// ═══════════════════════════════════════════════════════════════
const VisualContentIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const paletteEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const cards = [
    { label: "Thumbnail", x: 100, y: 160, delay: 8,  color: "#FF7614" },
    { label: "Carousel",  x: 350, y: 140, delay: 14, color: "#3B82F6" },
    { label: "Document",  x: 220, y: 360, delay: 20, color: "#22C55E" },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Central palette */}
      <g opacity={paletteEnter} transform={`translate(300, 310) scale(${paletteEnter})`}>
        <ellipse cx={0} cy={0} rx={90} ry={70} fill="#F9F9F9" stroke="#E5E5E5" strokeWidth={3} />
        <circle cx={-45} cy={-20} r={12} fill="#FF7614" />
        <circle cx={-20} cy={-45} r={12} fill="#3B82F6" />
        <circle cx={15}  cy={-50} r={12} fill="#22C55E" />
        <circle cx={45}  cy={-30} r={12} fill="#FFB800" />
        <circle cx={55}  cy={10}  r={12} fill="#A855F7" />
        {/* Paint brush handle */}
        <rect x={40} y={30} width={10} height={55} rx={5} fill="#8B4513" transform="rotate(-30, 45, 55)" />
        <rect x={36} y={24} width={18} height={14} rx={3} fill="#FF7614" transform="rotate(-30, 45, 31)" />
      </g>

      {/* Floating image cards */}
      {cards.map((c, i) => {
        const enter = spring({ frame: Math.max(0, frame - c.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
        const float = Math.sin((frame + i * 20) * 0.08) * 6;
        return (
          <g key={i} opacity={enter} transform={`translate(${c.x}, ${c.y + float}) scale(${enter})`}>
            <rect x={0} y={0} width={130} height={90} rx={12} fill="white" stroke={c.color} strokeWidth={2.5}
              style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }} />
            <rect x={10} y={10} width={110} height={50} rx={6} fill={c.color} opacity={0.15} />
            <text x={65} y={75} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={12} fill="#555">
              {c.label}
            </text>
          </g>
        );
      })}

      {/* Sparkles */}
      {[{x:190,y:100},{x:420,y:280},{x:140,y:320}].map((sp, i) => {
        const twinkle = Math.abs(Math.sin((frame + i * 15) * 0.12));
        return (
          <text key={i} x={sp.x} y={sp.y} textAnchor="middle" fontSize={22} fill="#FFB800" opacity={twinkle}>✦</text>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. THUMBNAILS + FACE — YouTube thumbnail frame with silhouette
// ═══════════════════════════════════════════════════════════════
const ThumbnailsFaceIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  const frameEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const faceEnter  = spring({ frame: Math.max(0, frame - 10), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
  const textEnter  = spring({ frame: Math.max(0, frame - 20), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Thumbnail frame */}
      <g opacity={frameEnter} transform={`translate(300,270) scale(${interpolate(frameEnter, [0, 1], [0.8, 1])})`}>
        <rect x={-220} y={-140} width={440} height={280} rx={18} fill="#1A1A1A" />
        {/* Orange background strip */}
        <rect x={-220} y={-140} width={220} height={280} rx={18} fill="#FF7614" />
        <rect x={0} y={-140} width={220} height={280} fill="#FF7614" opacity={0.2} />
        {/* PLAY button overlay */}
        <circle cx={0} cy={0} r={36} fill="white" opacity={0.9} />
        <polygon points="12,-20 12,20 44,0" fill="#FF0000" />
      </g>

      {/* Face silhouette */}
      <g opacity={faceEnter}>
        {/* Head */}
        <circle cx={175} cy={240} r={55} fill="white" stroke="#FF7614" strokeWidth={3} />
        {/* Body suggestion */}
        <path d="M120 295 Q175 330 230 295 L240 370 L110 370 Z" fill="white" stroke="#FF7614" strokeWidth={2} />
        {/* Orange highlight */}
        <circle cx={175} cy={240} r={55} fill="#FF7614" opacity={0.15} />
      </g>

      {/* Title block */}
      <g opacity={textEnter}>
        <rect x={270} y={200} width={230} height={60} rx={8} fill="white" />
        <rect x={270} y={272} width={180} height={16} rx={4} fill="#E5E5E5" />
        <rect x={270} y={298} width={140} height={12} rx={4} fill="#E5E5E5" />
        <text x={385} y={238} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={15} fill="#1A1A1A">
          WITH MY FACE
        </text>
        {/* Badge */}
        <rect x={340} y={360} width={120} height={36} rx={8} fill="#FF7614" />
        <text x={400} y={383} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={15} fill="white">
          AI-GENERATED
        </text>
      </g>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. EVERY SOCIAL PLATFORM — Real logo grid (6 platforms)
// ═══════════════════════════════════════════════════════════════
const SocialPlatformGridIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const logos = [
    { src: "logos/instagram.svg", delay: 0  },
    { src: "logos/tiktok.svg",    delay: 5  },
    { src: "logos/youtube.svg",   delay: 10 },
    { src: "logos/linkedin.svg",  delay: 15 },
    { src: "logos/x.svg",         delay: 20 },
    { src: "logos/facebook.svg",  delay: 25 },
  ];

  const positions = [
    { x: 110, y: 160 }, { x: 300, y: 160 }, { x: 490, y: 160 },
    { x: 110, y: 360 }, { x: 300, y: 360 }, { x: 490, y: 360 },
  ];

  const labelEnter = spring({ frame: Math.max(0, frame - 30), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      {logos.map((logo, i) => {
        const enter = Math.min(1, Math.max(0, (frame - logo.delay) / 12));
        const pos = positions[i];
        return (
          <div key={i} style={{
            position: "absolute",
            left: pos.x * s - 44 * s,
            top:  pos.y * s - 44 * s,
            width: 88 * s, height: 88 * s,
            opacity: enter,
            transform: `scale(${interpolate(enter, [0, 1], [0.6, 1])})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 20 * s,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}>
            <Img src={staticFile(logo.src)} style={{ width: 56 * s, height: 56 * s, objectFit: "contain" }} />
          </div>
        );
      })}
      <div style={{
        position: "absolute", bottom: 40 * s, left: 0, width: "100%",
        textAlign: "center", fontFamily, fontWeight: 900,
        fontSize: 28 * s, color: "#1A1A1A", letterSpacing: 3,
        opacity: labelEnter,
      }}>
        ALL PLATFORMS
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. SOCIAL MEDIA AGENT — AI brain hub with platform spokes
// ═══════════════════════════════════════════════════════════════
const SocialMediaAgentIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const hubEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const spokes = [
    { angle: -90,  label: "Post" },
    { angle: -30,  label: "Schedule" },
    { angle:  30,  label: "Caption" },
    { angle:  90,  label: "Hashtag" },
    { angle: 150,  label: "Analyze" },
    { angle: -150, label: "Reply" },
  ];

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 180;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Spoke lines */}
      {spokes.map((sp, i) => {
        const enter = spring({ frame: Math.max(0, frame - i * 4), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 130 } });
        const cx = 300 + R * Math.cos(toRad(sp.angle));
        const cy = 300 + R * Math.sin(toRad(sp.angle));
        return (
          <g key={i} opacity={enter}>
            <line x1={300} y1={300} x2={cx} y2={cy} stroke="#FF7614" strokeWidth={2} strokeDasharray="5 4" />
            <circle cx={cx} cy={cy} r={34} fill="white" stroke="#FF7614" strokeWidth={2} />
            <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={12} fill="#444">
              {sp.label}
            </text>
          </g>
        );
      })}

      {/* Central AI hub */}
      <g opacity={hubEnter}>
        <circle cx={300} cy={300} r={65} fill="#FF7614" />
        <text x={300} y={292} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={16} fill="white">AI</text>
        <text x={300} y={314} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={13} fill="rgba(255,255,255,0.85)">AGENT</text>
      </g>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 7. AI MADE THIS — Sparkle wand + 3 floating outputs
// ═══════════════════════════════════════════════════════════════
const AIMadeThisIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const wandEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 140 } });

  const outputs = [
    { label: "THUMBNAIL", color: "#FF7614", delay: 8 },
    { label: "DOCUMENT",  color: "#3B82F6", delay: 15 },
    { label: "CAROUSEL",  color: "#22C55E", delay: 22 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Wand */}
      <g opacity={wandEnter} transform={`translate(300, 230) rotate(-35) scale(${wandEnter})`}>
        <rect x={-8} y={-110} width={16} height={120} rx={8} fill="#1A1A1A" />
        <circle cx={0} cy={-120} r={20} fill="#FFB800" />
        <circle cx={0} cy={-120} r={10} fill="white" />
      </g>

      {/* Sparkle rays */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const twinkle = Math.abs(Math.sin((frame + i * 8) * 0.15));
        const r1 = 28, r2 = 48;
        const rad = (angle * Math.PI) / 180;
        return (
          <line key={i} x1={300 + r1 * Math.cos(rad)} y1={120 + r1 * Math.sin(rad)}
            x2={300 + r2 * Math.cos(rad)} y2={120 + r2 * Math.sin(rad)}
            stroke="#FFB800" strokeWidth={2.5} opacity={twinkle * wandEnter} />
        );
      })}

      {/* Output cards */}
      {outputs.map((out, i) => {
        const enter = spring({ frame: Math.max(0, frame - out.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 130 } });
        const float = Math.sin((frame + i * 20) * 0.09) * 5;
        const x = 90 + i * 175;
        return (
          <g key={i} opacity={enter} transform={`translate(${x}, ${360 + float}) scale(${enter})`}>
            <rect x={-60} y={-45} width={120} height={90} rx={12} fill={out.color} />
            <text x={0} y={-8} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={11} fill="white">
              {out.label}
            </text>
            <rect x={-40} y={5} width={80} height={8} rx={4} fill="white" opacity={0.4} />
            <rect x={-30} y={20} width={60} height={6} rx={3} fill="white" opacity={0.3} />
          </g>
        );
      })}

      <text x={300} y={510} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={20 * s} fill="#1A1A1A" letterSpacing={2}
        opacity={spring({ frame: Math.max(0, frame - 28), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })}>
        AI MADE THIS
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 8. BEAUTIFUL CAROUSEL — Stacked image cards fanning out
// ═══════════════════════════════════════════════════════════════
const BeautifulCarouselIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const cards = [
    { dx: -110, rotation: -15, color: "#F5F5F5", delay: 0  },
    { dx: -55,  rotation: -8,  color: "#EFEFEF", delay: 5  },
    { dx:   0,  rotation:  0,  color: "#FF7614", delay: 10 },
    { dx:  55,  rotation:  8,  color: "#EFEFEF", delay: 15 },
    { dx: 110,  rotation:  15, color: "#F5F5F5", delay: 20 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {cards.map((c, i) => {
        const enter = spring({ frame: Math.max(0, frame - c.delay), fps: 30, from: 0, to: 1, config: { damping: 11, stiffness: 130 } });
        const isCenter = i === 2;
        const cx = 300 + c.dx;
        const cy = 280;
        const w = isCenter ? 180 : 140;
        const h = isCenter ? 240 : 200;

        return (
          <g key={i} opacity={enter} transform={`translate(${cx}, ${cy}) rotate(${c.rotation}) scale(${enter})`}>
            <rect x={-w/2} y={-h/2} width={w} height={h} rx={16}
              fill={c.color} stroke={isCenter ? "#E06610" : "#DEDEDE"} strokeWidth={isCenter ? 3 : 1.5} />
            {isCenter && (
              <>
                <rect x={-70} y={-90} width={140} height={80} rx={8} fill="white" opacity={0.3} />
                <rect x={-60} y={10}  width={120} height={10} rx={5} fill="white" opacity={0.5} />
                <rect x={-60} y={30}  width={90}  height={8}  rx={4} fill="white" opacity={0.35} />
                <text x={0} y={90} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={13} fill="white">
                  BEAUTIFUL
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 9. STEP BY STEP — Numbered staircase going up
// ═══════════════════════════════════════════════════════════════
const StepByStepIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const steps = [
    { n: 1, label: "Prompt Agent", delay: 0  },
    { n: 2, label: "AI Creates",  delay: 8  },
    { n: 3, label: "You Review",  delay: 16 },
    { n: 4, label: "Auto Posts",  delay: 24 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {steps.map((step, i) => {
        const enter = spring({ frame: Math.max(0, frame - step.delay), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 140 } });
        const x = 80 + i * 120;
        const y = 430 - i * 80;
        const blockH = 80 + i * 80;

        return (
          <g key={i} opacity={enter} transform={`translate(0, ${interpolate(enter, [0, 1], [20, 0])})`}>
            {/* Stair block */}
            <rect x={x} y={y} width={110} height={blockH} rx={8}
              fill={i === 3 ? "#FF7614" : "#F0F0F0"} stroke={i === 3 ? "#E06610" : "#DEDEDE"} strokeWidth={2} />
            {/* Step number */}
            <circle cx={x + 55} cy={y + 30} r={22} fill={i === 3 ? "white" : "#FF7614"} />
            <text x={x + 55} y={y + 37} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={18}
              fill={i === 3 ? "#FF7614" : "white"}>
              {step.n}
            </text>
            {/* Label */}
            <text x={x + 55} y={y + blockH - 16} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={13}
              fill={i === 3 ? "rgba(255,255,255,0.9)" : "#555"}>
              {step.label}
            </text>
          </g>
        );
      })}

      {/* Arrow at top */}
      {(() => {
        const arrowEnter = spring({ frame: Math.max(0, frame - 30), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
        return (
          <g opacity={arrowEnter}>
            <polygon points="440,120 480,80 520,120" fill="#FF7614" />
            <text x={480} y={160} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={16 * s} fill="#FF7614">SIMPLE</text>
          </g>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 10. YOUR OWN AI AGENT — User + AI = personalized agent
// ═══════════════════════════════════════════════════════════════
const YourOwnAgentIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const userEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const aiEnter   = spring({ frame: Math.max(0, frame - 12), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
  const arrowEnter= spring({ frame: Math.max(0, frame - 22), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });

  const pulse = 1 + Math.sin(frame * 0.15) * 0.04;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* YOU circle */}
      <g opacity={userEnter} transform={`translate(130, 280) scale(${userEnter})`}>
        <circle cx={0} cy={0} r={70} fill="#F0F0F0" stroke="#DEDEDE" strokeWidth={2} />
        <circle cx={0} cy={-20} r={28} fill="#ABABAB" />
        <path d="M-50 50 Q0 20 50 50" fill="#ABABAB" />
        <text x={0} y={100} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={18} fill="#555">YOU</text>
      </g>

      {/* Plus */}
      <g opacity={arrowEnter}>
        <text x={275} y={295} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={48} fill="#FF7614">+</text>
      </g>

      {/* AI circle */}
      <g opacity={aiEnter} transform={`translate(430, 280) scale(${aiEnter * pulse})`}>
        <circle cx={0} cy={0} r={70} fill="#FF7614" />
        <text x={0} y={10} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={30} fill="white">AI</text>
        <text x={0} y={100} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={18} fill="#FF7614">AGENT</text>
      </g>

      {/* Result */}
      {(() => {
        const resultEnter = spring({ frame: Math.max(0, frame - 32), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 110 } });
        return (
          <g opacity={resultEnter}>
            <rect x={150} y={400} width={300} height={60} rx={16} fill="#1A1A1A" />
            <text x={300} y={437} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={20} fill="white" letterSpacing={2}>
              YOUR OWN AGENT
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 11. FOR YOUR BUSINESS — Growing bar chart + briefcase
// ═══════════════════════════════════════════════════════════════
const ForYourBusinessIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const bars = [
    { h: 0.40, delay: 0,  color: "#E5E7EB" },
    { h: 0.55, delay: 6,  color: "#E5E7EB" },
    { h: 0.65, delay: 12, color: "#E5E7EB" },
    { h: 0.80, delay: 18, color: "#FF7614" },
  ];

  const bwEnter = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const labelEnter = spring({ frame: Math.max(0, frame - 28), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const baseY = 420;
  const maxBarH = 220;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Briefcase */}
      <g opacity={bwEnter} transform={`translate(300, 130)`}>
        <rect x={-55} y={-40} width={110} height={80} rx={12} fill="#1A1A1A" />
        <rect x={-30} y={-52} width={60} height={18} rx={6} fill="#1A1A1A" stroke="white" strokeWidth={2} />
        <rect x={-40} y={-8} width={80} height={6} rx={3} fill="white" opacity={0.3} />
      </g>

      {/* Bars */}
      {bars.map((bar, i) => {
        const grow = interpolate(Math.max(0, frame - bar.delay), [0, 25], [0, bar.h], { extrapolateRight: "clamp" });
        const barH = grow * maxBarH;
        const x = 110 + i * 110;
        return (
          <g key={i}>
            <rect x={x} y={baseY - barH} width={80} height={barH} rx={8} fill={bar.color} />
            {i === 3 && barH > 20 && (
              <text x={x + 40} y={baseY - barH - 12} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={20} fill="#FF7614">↑</text>
            )}
          </g>
        );
      })}

      {/* Baseline */}
      <line x1={90} y1={baseY} x2={510} y2={baseY} stroke="#E5E5E5" strokeWidth={2} />

      <text x={300} y={490} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22 * s} fill="#1A1A1A"
        opacity={labelEnter} letterSpacing={2}>
        YOUR BUSINESS
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 12. ENRIQUE — Character intro name badge
// ═══════════════════════════════════════════════════════════════
const EnriqueIntroIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const cardEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 110 } });
  const nameEnter = spring({ frame: Math.max(0, frame - 14), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 130 } });
  const logoEnter = spring({ frame: Math.max(0, frame - 25), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Name badge card */}
      <g opacity={cardEnter} transform={`translate(300, 280) scale(${interpolate(cardEnter, [0, 1], [0.85, 1])})`}>
        <rect x={-200} y={-180} width={400} height={360} rx={24} fill="white"
          style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))" }} />
        {/* Orange top strip */}
        <rect x={-200} y={-180} width={400} height={90} rx={24} fill="#FF7614" />
        <rect x={-200} y={-110} width={400} height={30} fill="#FF7614" />
        <text x={0} y={-118} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={16} fill="white" letterSpacing={4}>
          HI, I'M
        </text>

        {/* Face circle */}
        <circle cx={0} cy={-80} r={48} fill="white" stroke="#FF7614" strokeWidth={3} />
        <circle cx={0} cy={-90} r={20} fill="#ABABAB" />
        <path d="M-35 -45 Q0 -60 35 -45" fill="#ABABAB" />
      </g>

      {/* Name */}
      <g opacity={nameEnter}>
        <text x={300} y={305} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={46 * s} fill="#1A1A1A" letterSpacing={2}>
          ENRIQUE
        </text>
        <text x={300} y={345} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={600} fontSize={17 * s} fill="#888">
          AI Systems Builder
        </text>
      </g>

      {/* iX logo */}
      <g opacity={logoEnter}>
        <foreignObject x={230} y={390} width={140} height={60}>
          <div style={{ width: 140, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("infinitx-logo.png")} style={{ width: 120, height: 50, objectFit: "contain" }} />
          </div>
        </foreignObject>
      </g>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 13. AGENTIC SYSTEMS — Connected node network
// ═══════════════════════════════════════════════════════════════
const AgenticSystemsIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const nodes = [
    { x: 300, y: 230, label: "CLAUDE",   delay: 0,  r: 50, color: "#FF7614" },
    { x: 150, y: 160, label: "Clip",     delay: 6,  r: 34, color: "#3B82F6" },
    { x: 450, y: 160, label: "Post",     delay: 8,  r: 34, color: "#22C55E" },
    { x: 120, y: 340, label: "Caption",  delay: 12, r: 30, color: "#A855F7" },
    { x: 480, y: 340, label: "Schedule", delay: 14, r: 30, color: "#F59E0B" },
    { x: 300, y: 400, label: "Analyze",  delay: 18, r: 30, color: "#EF4444" },
  ];

  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 3], [2, 4],
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Edges */}
      {edges.map(([a, b], i) => {
        const nodeA = nodes[a], nodeB = nodes[b];
        const enter = spring({ frame: Math.max(0, frame - Math.max(nodeA.delay, nodeB.delay)), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 120 } });
        return (
          <line key={i} x1={nodeA.x} y1={nodeA.y} x2={nodeB.x} y2={nodeB.y}
            stroke={nodeA.color} strokeWidth={2} strokeDasharray="6 4" opacity={0.35 * enter} />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const enter = spring({ frame: Math.max(0, frame - node.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 150 } });
        return (
          <g key={i} opacity={enter} transform={`translate(${node.x}, ${node.y}) scale(${enter})`}>
            <circle cx={0} cy={0} r={node.r} fill={node.color} />
            <text x={0} y={5} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800}
              fontSize={i === 0 ? 14 : 11} fill="white">
              {node.label}
            </text>
          </g>
        );
      })}

      <text x={300} y={510} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22 * s} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 24), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })}
        letterSpacing={2}>
        AGENTIC SYSTEMS
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 14. INFINITE X — Company logo reveal
// ═══════════════════════════════════════════════════════════════
const InfiniteXIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const logoEnter  = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });
  const textEnter  = spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });
  const pulse = 1 + Math.sin(frame * 0.12) * 0.025;

  return (
    <div style={{ width: size, height: size, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 * s }}>
      <div style={{ opacity: logoEnter, transform: `scale(${interpolate(logoEnter, [0, 1], [0.7, 1]) * pulse})` }}>
        <Img src={staticFile("infinitx-logo.png")} style={{ width: 320 * s, height: 120 * s, objectFit: "contain" }} />
      </div>
      <div style={{
        fontFamily, fontWeight: 700, fontSize: 18 * s, color: "#888",
        letterSpacing: 3, opacity: textEnter, textTransform: "uppercase",
      }}>
        Building agentic systems
      </div>
      <div style={{
        width: 100 * s, height: 3, backgroundColor: "#FF7614", borderRadius: 2,
        opacity: textEnter,
      }} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// CTA CARD
// ═══════════════════════════════════════════════════════════════
const CTACard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter   = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const fadeOut = interpolate(frame, [53, 65], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, opacity: enter * fadeOut,
      transform: `scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
      pointerEvents: "none",
    }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
        padding: "28px 40px", borderRadius: 28,
        backgroundColor: "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
        border: "1px solid rgba(255, 255, 255, 0.5)", width: 680,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Img src={staticFile("logos/youtube.svg")} style={{ width: 44, height: 44 }} />
          <div style={{ fontFamily, fontWeight: 800, fontSize: 34, color: "#1A1A1A", letterSpacing: 2 }}>
            WATCH THE FULL VIDEO
          </div>
        </div>
        <div style={{ fontFamily, fontWeight: 600, fontSize: 22, color: "#888", letterSpacing: 1 }}>
          Claude Creatives — AI Content Factory Setup
        </div>
        <div style={{ width: 100, height: 3, backgroundColor: "#FF7614", borderRadius: 2 }} />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════════
export const ClipClaudeCodeVisualContent: React.FC<{ videoSrc?: string }> = ({
  videoSrc = "videos/2026-02-22-claude-creatives/clip-claude-code-visual-content.mp4",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = getZoom(frame);

  const hookFlash    = interpolate(frame, [0, 3], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const conceptActive = CONCEPT_RANGES.some((r) => frame >= r.start && frame < r.end);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* ── BASE VIDEO ───────────────────────────────────────── */}
      <div style={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden" }}>
        <OffthreadVideo
          src={staticFile(videoSrc)}
          volume={1}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`, transformOrigin: "center center" }}
        />
      </div>

      {/* ── HOOK FLASH ───────────────────────────────────────── */}
      {hookFlash > 0 && (
        <AbsoluteFill style={{ backgroundColor: "#FF6B00", opacity: hookFlash, zIndex: 50 }} />
      )}

      {/* ════ 1. #1 CODING AGENT — frame 90, 65f ════════════════ */}
      <Sequence from={90} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<CodingAgentIllustration />}
          caption="#1 CODING AGENT" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 2. RANKED #1 — frame 238, 55f ═════════════════════ */}
      <Sequence from={238} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<RankedOneIllustration />}
          caption="RANKED #1" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 3. VISUAL CONTENT — frame 478, 65f ════════════════ */}
      <Sequence from={478} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<VisualContentIllustration />}
          caption="VISUAL CONTENT" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 4. THUMBNAILS + FACE — frame 580, 65f ═════════════ */}
      <Sequence from={580} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<ThumbnailsFaceIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 5. EVERY SOCIAL PLATFORM — frame 793, 55f ═════════ */}
      <Sequence from={793} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<SocialPlatformGridIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 6. SOCIAL MEDIA AGENT — frame 911, 65f ════════════ */}
      <Sequence from={911} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<SocialMediaAgentIllustration />}
          caption="SOCIAL MEDIA AGENT" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={620} />
      </Sequence>

      {/* ════ 7. AI MADE THIS — frame 1010, 60f ═════════════════ */}
      <Sequence from={1010} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<AIMadeThisIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 8. BEAUTIFUL CAROUSEL — frame 1166, 60f ═══════════ */}
      <Sequence from={1166} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<BeautifulCarouselIllustration />}
          caption="BEAUTIFUL CAROUSEL" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 9. STEP BY STEP — frame 1338, 65f ═════════════════ */}
      <Sequence from={1338} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<StepByStepIllustration />}
          caption="STEP BY STEP" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 10. YOUR OWN AI AGENT — frame 1479, 65f ═══════════ */}
      <Sequence from={1479} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<YourOwnAgentIllustration />}
          caption="YOUR OWN AI AGENT" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 11. FOR YOUR BUSINESS — frame 1600, 55f ═══════════ */}
      <Sequence from={1600} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ForYourBusinessIllustration />}
          caption="FOR YOUR BUSINESS" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 12. ENRIQUE — frame 1770, 60f ═════════════════════ */}
      <Sequence from={1770} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<EnriqueIntroIllustration />}
          subtitle="AI Systems Builder @ iX" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={580} />
      </Sequence>

      {/* ════ 13. AGENTIC SYSTEMS — frame 1960, 55f ═════════════ */}
      <Sequence from={1960} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<AgenticSystemsIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 14. INFINITE X — frame 2060, 65f ══════════════════ */}
      <Sequence from={2060} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<InfiniteXIllustration />}
          subtitle="Infinite X" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={580} />
      </Sequence>

      {/* ════ CTA — frame 2150, 65f ══════════════════════════════ */}
      <Sequence from={2150} durationInFrames={65} premountFor={fps}>
        <CTACard />
      </Sequence>

      {/* ════ WORD-BY-WORD CAPTIONS ══════════════════════════════ */}
      <div style={{
        position: "absolute", bottom: "12%", left: 0, width: "100%", height: "10%",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 10, pointerEvents: "none",
      }}>
        {!conceptActive && WORDS.map((w) => {
          if (frame < w.frame || frame >= w.frame + w.duration) return null;
          return (
            <div key={w.id} style={{ position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{
                fontFamily, fontWeight: 800, fontSize: 72,
                color: w.emphasis ? "#FF7614" : "#FFFFFF",
                textAlign: "center", textTransform: "uppercase", letterSpacing: "0.03em",
                textShadow: w.emphasis
                  ? "0 0 20px rgba(255, 118, 20, 0.6), 0 4px 12px rgba(0,0,0,0.8)"
                  : "0 4px 12px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)",
                padding: "0 60px",
              }}>
                {w.word}
              </div>
            </div>
          );
        })}
      </div>

      {/* ════ SFX LAYER ══════════════════════════════════════════ */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={fps}>
          <Audio src={staticFile(sfx.src)} volume={sfx.volume} startFrom={0} />
        </Sequence>
      ))}

      {/* ════ BACKGROUND MUSIC ═══════════════════════════════════ */}
      <Audio src={staticFile("audio/lofi-background.mp3")} volume={0.02} startFrom={0} endAt={TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};
