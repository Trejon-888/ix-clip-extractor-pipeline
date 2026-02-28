/**
 * Clip: AI Handles All My Content Creatives Now
 *
 * SOURCE: Pipeline clip from "Claude Creatives — AI Content Factory Setup"
 * CTA: "WATCH THE FULL VIDEO" + source title
 * Duration: ~69.4s (2112 frames @ 30fps)
 * Score: 88/100 (Rank #1)
 *
 * STORY: "It's feeling like an addiction." Enrique had one main problem —
 * all creatives were still made manually. No thumbnail prepared, no carousels.
 * The core issue: spending too much time on manual creation. Solution: trained
 * Claude Code to handle entire content creatives. Now the manager agent handles
 * everything — thumbnails, carousels, documents — autonomously.
 *
 * POP-OUTS (16 ConceptOverlay + 1 CTA):
 *   1.  ADDICTION           (frame   31, 55f) — addiction / hook icon
 *   2.  ONE MAIN PROBLEM    (frame  139, 55f) — warning sign
 *   3.  CREATIVES MADE BY ME(frame  220, 55f) — manual labor
 *   4.  TIME WITH AI        (frame  366, 55f) — clock + AI
 *   5.  NO THUMBNAIL        (frame  520, 55f) — broken image
 *   6.  MANUAL WORK         (frame  635, 55f) — hand labor
 *   7.  IMAGE CAROUSELS     (frame  854, 60f) — carousel slides
 *   8.  CORE ISSUE          (frame  933, 55f) — target problem
 *   9.  MISSING PIECE       (frame 1098, 55f) — puzzle piece
 *  10.  TRAINED CLAUDE CODE (frame 1213, 55f) — Claude Code logo
 *  11.  HANDLE CREATIVES    (frame 1270, 60f) — hands-free automation
 *  12.  MANAGER AGENT       (frame 1465, 60f) — robot manager
 *  13.  ALL DELIVERABLES    (frame 1545, 60f) — thumbnail + carousels + docs
 *  14.  AUTONOMOUSLY        (frame 1756, 55f) — autonomous badge
 *  15.  CLAUDE CREATIVE SYS (frame 1884, 55f) — system diagram
 *  16.  THREE SKILLS        (frame 1980, 55f) — skill badges
 *  CTA: WATCH THE FULL VIDEO(frame 2050, 55f)
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
import { WORDS } from "../data/clip-ai-handles-all-content-words";

const { fontFamily } = loadFont();

const TOTAL_FRAMES = 2112;

function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 29,   end: 86   }, // Addiction
  { start: 137,  end: 194  }, // One Main Problem
  { start: 218,  end: 275  }, // Creatives Made By Me
  { start: 364,  end: 421  }, // Time With AI
  { start: 518,  end: 575  }, // No Thumbnail
  { start: 633,  end: 690  }, // Manual Work
  { start: 852,  end: 914  }, // Image Carousels
  { start: 931,  end: 988  }, // Core Issue
  { start: 1096, end: 1153 }, // Missing Piece
  { start: 1211, end: 1268 }, // Trained Claude Code
  { start: 1268, end: 1330 }, // Handle Creatives
  { start: 1463, end: 1525 }, // Manager Agent
  { start: 1543, end: 1605 }, // All Deliverables
  { start: 1754, end: 1811 }, // Autonomously
  { start: 1882, end: 1939 }, // Claude Creative System
  { start: 1978, end: 2035 }, // Three Skills
  { start: 2048, end: 2105 }, // CTA
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS — cycle through 4 types, never repeat consecutive
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  { frame: 0,    src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  { frame: 29,   src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 137,  src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 218,  src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 364,  src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 518,  src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 633,  src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 852,  src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 931,  src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1096, src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 1211, src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 1268, src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 1463, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1543, src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 1754, src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 1882, src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 1978, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 2048, src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
];

// ═══════════════════════════════════════════════════════════════
// 1. ADDICTION — Hook / addictive loop icon
// ═══════════════════════════════════════════════════════════════
const AddictionIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 130 } });
  const pulse = 1 + Math.sin(frame * 0.2) * 0.04;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 250) scale(${enter * pulse})`}>
        {/* Circular loop arrows */}
        <circle cx={0} cy={0} r={80} fill="none" stroke="#FF7614" strokeWidth={8} strokeDasharray="40,20" />
        <polygon points="60,-50 80,-30 50,-30" fill="#FF7614" />
        <polygon points="-60,50 -80,30 -50,30" fill="#FF7614" />
        {/* Center icon */}
        <circle cx={0} cy={0} r={40} fill="#FF3B5C" />
        <text x={0} y={12} textAnchor="middle" fontSize={32} fill="white">🔥</text>
      </g>
      <text x={300} y={410} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={28} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={3}>
        AN ADDICTION
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. ONE MAIN PROBLEM — Warning triangle
// ═══════════════════════════════════════════════════════════════
const OneMainProblemIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 250) scale(${enter})`}>
        <polygon points="0,-90 100,70 -100,70" fill="#FFB800" stroke="#FF7614" strokeWidth={4} />
        <rect x={-10} y={-45} width={20} height={60} rx={10} fill="#1A1A1A" />
        <circle cx={0} cy={40} r={10} fill="#1A1A1A" />
      </g>
      <text x={300} y={410} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={26} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={3}>
        ONE MAIN PROBLEM
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. CREATIVES MADE BY ME — Person at desk working
// ═══════════════════════════════════════════════════════════════
const CreativesMadeByMeIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 240) scale(${enter})`}>
        {/* Person silhouette */}
        <circle cx={0} cy={-50} r={35} fill="#888" />
        <rect x={-50} y={-10} width={100} height={80} rx={20} fill="#888" />
        {/* Desk */}
        <rect x={-120} y={70} width={240} height={12} rx={4} fill="#1A1A1A" />
        {/* Stack of creatives on desk */}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={-90 + i * 10} y={30 + i * 12} width={60} height={40} rx={4}
            fill={i === 0 ? "#FF7614" : i === 1 ? "#3B82F6" : "#22C55E"} opacity={0.6} />
        ))}
        {/* Red X overlay */}
        <line x1={-80} y1={-70} x2={80} y2={70} stroke="#FF3B5C" strokeWidth={6} strokeLinecap="round" />
        <line x1={80} y1={-70} x2={-80} y2={70} stroke="#FF3B5C" strokeWidth={6} strokeLinecap="round" />
      </g>
      <text x={300} y={430} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 18), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        STILL MADE BY ME
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. TIME WITH AI — Clock + AI label
// ═══════════════════════════════════════════════════════════════
const TimeWithAIIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const handAngle = frame * 3;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 250) scale(${enter})`}>
        <circle cx={0} cy={0} r={80} fill="white" stroke="#E5E5E5" strokeWidth={4} />
        {/* Hour marks */}
        {[...Array(12)].map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return <line key={i} x1={Math.cos(a) * 65} y1={Math.sin(a) * 65}
            x2={Math.cos(a) * 72} y2={Math.sin(a) * 72} stroke="#888" strokeWidth={3} />;
        })}
        {/* Spinning hand */}
        <line x1={0} y1={0} x2={Math.cos((handAngle * Math.PI) / 180) * 50}
          y2={Math.sin((handAngle * Math.PI) / 180) * 50} stroke="#FF3B5C" strokeWidth={4} strokeLinecap="round" />
        <circle cx={0} cy={0} r={6} fill="#FF3B5C" />
      </g>
      <text x={300} y={400} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={24} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        TOO MUCH TIME
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. NO THUMBNAIL — Broken image icon
// ═══════════════════════════════════════════════════════════════
const NoThumbnailIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 250) scale(${enter})`}>
        <rect x={-120} y={-80} width={240} height={160} rx={16} fill="#F0F0F0" stroke="#E5E5E5" strokeWidth={3} />
        {/* Broken image icon */}
        <circle cx={-40} cy={-20} r={22} fill="#E5E5E5" />
        <polygon points="-80,60 -20,0 20,30 80,60 -80,60" fill="#E5E5E5" />
        {/* Red X */}
        <circle cx={80} cy={-50} r={28} fill="#FF3B5C" />
        <line x1={68} y1={-62} x2={92} y2={-38} stroke="white" strokeWidth={5} strokeLinecap="round" />
        <line x1={92} y1={-62} x2={68} y2={-38} stroke="white" strokeWidth={5} strokeLinecap="round" />
      </g>
      <text x={300} y={420} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={24} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        NO THUMBNAIL
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. MANUAL WORK — Hand wrench icon
// ═══════════════════════════════════════════════════════════════
const ManualWorkIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 250) scale(${enter})`}>
        {/* Hand outline */}
        <rect x={-60} y={-20} width={120} height={100} rx={16} fill="#FFB800" />
        <rect x={-50} y={-60} width={22} height={50} rx={11} fill="#FFB800" />
        <rect x={-20} y={-75} width={22} height={65} rx={11} fill="#FFB800" />
        <rect x={10} y={-70} width={22} height={60} rx={11} fill="#FFB800" />
        <rect x={40} y={-55} width={22} height={45} rx={11} fill="#FFB800" />
        {/* Tired face */}
        <circle cx={0} cy={30} r={5} fill="#1A1A1A" opacity={0.4} />
        <text x={0} y={55} textAnchor="middle" fontSize={20} fill="#1A1A1A" opacity={0.4}>😮‍💨</text>
      </g>
      <text x={300} y={420} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={24} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        SOMETHING MANUAL
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 7. IMAGE CAROUSELS — Carousel slide stack
// ═══════════════════════════════════════════════════════════════
const ImageCarouselsIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const slides = [
    { x: -80, color: "#3B82F6", delay: 0 },
    { x: 0,   color: "#FF7614", delay: 6 },
    { x: 80,  color: "#22C55E", delay: 12 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {slides.map((s, i) => {
        const slideEnter = spring({ frame: Math.max(0, frame - s.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
        return (
          <g key={i} opacity={enter * slideEnter} transform={`translate(${300 + s.x}, 240)`}>
            <rect x={-55} y={-80} width={110} height={160} rx={12} fill={s.color} />
            <rect x={-40} y={-60} width={80} height={50} rx={6} fill="white" opacity={0.2} />
            <rect x={-40} y={0} width={60} height={8} rx={4} fill="white" opacity={0.3} />
            <rect x={-40} y={16} width={40} height={8} rx={4} fill="white" opacity={0.2} />
          </g>
        );
      })}
      <text x={300} y={430} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 18), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        IMAGE CAROUSELS
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 8. CORE ISSUE — Bullseye on problem
// ═══════════════════════════════════════════════════════════════
const CoreIssueIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {[100, 70, 40].map((r, i) => {
        const ringEnter = spring({ frame: Math.max(0, frame - i * 5), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
        return (
          <circle key={i} cx={300} cy={250} r={r * ringEnter}
            fill={i === 0 ? "#FFF0E0" : i === 1 ? "#FFD4A8" : "#FF7614"} opacity={enter} />
        );
      })}
      <g opacity={spring({ frame: Math.max(0, frame - 18), fps: 30, from: 0, to: 1, config: { damping: 8, stiffness: 160 } })}>
        <text x={300} y={258} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={18} fill="white">TIME</text>
      </g>
      <text x={300} y={410} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={26} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 20), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={3}>
        THE CORE ISSUE
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 9. MISSING PIECE — Puzzle piece
// ═══════════════════════════════════════════════════════════════
const MissingPieceIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 120 } });
  const float = Math.sin(frame * 0.12) * 6;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Puzzle grid background */}
      <g opacity={enter * 0.3}>
        <rect x={150} y={140} width={100} height={100} rx={8} fill="#E5E5E5" />
        <rect x={250} y={140} width={100} height={100} rx={8} fill="#E5E5E5" />
        <rect x={350} y={140} width={100} height={100} rx={8} fill="#E5E5E5" />
        <rect x={150} y={240} width={100} height={100} rx={8} fill="#E5E5E5" />
        <rect x={350} y={240} width={100} height={100} rx={8} fill="#E5E5E5" />
      </g>
      {/* Missing piece highlighted */}
      <g opacity={enter} transform={`translate(300, ${290 + float}) scale(${enter})`}>
        <rect x={-50} y={-50} width={100} height={100} rx={8} fill="#FF7614" />
        <circle cx={0} cy={-50} r={20} fill="#FF7614" />
        <text x={0} y={8} textAnchor="middle" fontSize={28} fill="white">?</text>
      </g>
      <text x={300} y={430} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={24} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        THE MISSING PIECE
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 10. TRAINED CLAUDE CODE — Claude Code terminal logo
// ═══════════════════════════════════════════════════════════════
const TrainedClaudeCodeIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <div style={{ width: size, height: size, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: enter, transform: `scale(${enter})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <Img src={staticFile("logos/claude-code-terminal.webp")} style={{ width: size * 0.3, height: size * 0.3, borderRadius: 20 }} />
        <div style={{ fontFamily, fontWeight: 900, fontSize: size * 0.055, color: "#1A1A1A", letterSpacing: 3 }}>
          TRAINED CLAUDE CODE
        </div>
        <div style={{ fontFamily, fontWeight: 600, fontSize: size * 0.028, color: "#888" }}>
          To handle all content creatives
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 11. HANDLE CREATIVES — Automation hands-free
// ═══════════════════════════════════════════════════════════════
const HandleCreativesIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 120 } });

  const items = [
    { label: "THUMBNAILS", color: "#FF7614", delay: 0 },
    { label: "CAROUSELS",  color: "#3B82F6", delay: 6 },
    { label: "DOCUMENTS",  color: "#22C55E", delay: 12 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Center AI node */}
      <circle cx={300} cy={200} r={50 * enter} fill="#FF7614" opacity={enter} />
      <text x={300} y={208} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={16} fill="white"
        opacity={enter}>AI</text>
      {/* Branching items */}
      {items.map((item, i) => {
        const itemEnter = spring({ frame: Math.max(0, frame - item.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
        const x = 160 + i * 140;
        return (
          <g key={i}>
            <line x1={300} y1={250} x2={300 + (x - 300) * itemEnter} y2={250 + 80 * itemEnter}
              stroke={item.color} strokeWidth={2.5} opacity={enter * itemEnter} />
            <rect x={x - 60} y={320} width={120} height={45} rx={10} fill={item.color}
              opacity={enter * itemEnter} />
            <text x={x} y={348} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700}
              fontSize={11} fill="white" opacity={itemEnter}>{item.label}</text>
          </g>
        );
      })}
      <text x={300} y={430} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 18), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        HANDLE ALL CREATIVES
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 12. MANAGER AGENT — Robot manager icon
// ═══════════════════════════════════════════════════════════════
const ManagerAgentIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 230) scale(${enter})`}>
        {/* Robot body */}
        <rect x={-70} y={-80} width={140} height={110} rx={20} fill="#FF7614" />
        {/* Eyes */}
        <circle cx={-25} cy={-40} r={16} fill="white" />
        <circle cx={25} cy={-40} r={16} fill="white" />
        <circle cx={-25} cy={-40} r={7} fill="#1A1A1A" />
        <circle cx={25} cy={-40} r={7} fill="#1A1A1A" />
        {/* Antenna */}
        <line x1={0} y1={-80} x2={0} y2={-110} stroke="#FF7614" strokeWidth={4} />
        <circle cx={0} cy={-115} r={8} fill="#FFB800" />
        {/* Badge */}
        <rect x={-30} y={-5} width={60} height={22} rx={4} fill="white" opacity={0.9} />
        <text x={0} y={12} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={10} fill="#FF7614">MANAGER</text>
        {/* Arms handling items */}
        <rect x={-110} y={-30} width={35} height={8} rx={4} fill="#FFB800" />
        <rect x={75} y={-30} width={35} height={8} rx={4} fill="#FFB800" />
      </g>
      <text x={300} y={410} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={24} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        MANAGER AGENT
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 13. ALL DELIVERABLES — Thumbnail + carousels + docs icons
// ═══════════════════════════════════════════════════════════════
const AllDeliverablesIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const deliverables = [
    { label: "THUMBNAIL", icon: "🖼️", color: "#FF7614", delay: 0 },
    { label: "CAROUSELS", icon: "📊", color: "#3B82F6", delay: 8 },
    { label: "DOCUMENTS", icon: "📄", color: "#22C55E", delay: 16 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {deliverables.map((d, i) => {
        const dEnter = spring({ frame: Math.max(0, frame - d.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
        const x = 160 + i * 140;
        return (
          <g key={i} opacity={enter * dEnter}>
            <rect x={x - 55} y={170} width={110} height={130} rx={16} fill={d.color} />
            <text x={x} y={245} textAnchor="middle" fontSize={36}>{d.icon}</text>
            <text x={x} y={340} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700}
              fontSize={12} fill="#444" opacity={dEnter}>{d.label}</text>
          </g>
        );
      })}
      <text x={300} y={420} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={24} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 22), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        ALL DELIVERABLES
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 14. AUTONOMOUSLY — Auto-pilot badge
// ═══════════════════════════════════════════════════════════════
const AutonomouslyIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 120 } });
  const orbit = frame * 2;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 250) scale(${enter})`}>
        <circle cx={0} cy={0} r={80} fill="#8B5CF6" />
        <text x={0} y={-10} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={16} fill="white">AUTO</text>
        <text x={0} y={15} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={12} fill="rgba(255,255,255,0.7)">PILOT</text>
        {/* Orbiting dot */}
        <circle cx={Math.cos((orbit * Math.PI) / 180) * 100} cy={Math.sin((orbit * Math.PI) / 180) * 100}
          r={8} fill="#FFB800" />
        <circle cx={0} cy={0} r={95} fill="none" stroke="#8B5CF6" strokeWidth={1.5} opacity={0.3} strokeDasharray="6,4" />
      </g>
      <text x={300} y={420} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={26} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={3}>
        AUTONOMOUSLY
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 15. CLAUDE CREATIVE SYSTEM — System diagram
// ═══════════════════════════════════════════════════════════════
const ClaudeCreativeSystemIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <div style={{ width: size, height: size, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: enter, transform: `scale(${enter})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <Img src={staticFile("logos/claude-ai-icon.svg")} style={{ width: size * 0.18, height: size * 0.18 }} />
        <div style={{ fontFamily, fontWeight: 900, fontSize: size * 0.048, color: "#1A1A1A", letterSpacing: 3 }}>
          CLAUDE CREATIVE
        </div>
        <div style={{
          fontFamily, fontWeight: 800, fontSize: size * 0.04, color: "#FF7614", letterSpacing: 4,
          padding: "6px 20px", border: "3px solid #FF7614", borderRadius: 12,
          opacity: spring({ frame: Math.max(0, frame - 14), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } }),
        }}>
          SYSTEM
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 16. THREE SKILLS — Skill badge icons
// ═══════════════════════════════════════════════════════════════
const ThreeSkillsIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const skills = [
    { label: "THUMBNAILS", color: "#FF7614", delay: 0 },
    { label: "CAROUSELS",  color: "#3B82F6", delay: 8 },
    { label: "EDUCATION",  color: "#22C55E", delay: 16 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {skills.map((skill, i) => {
        const skillEnter = spring({ frame: Math.max(0, frame - skill.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
        const x = 160 + i * 140;
        return (
          <g key={i} opacity={enter * skillEnter}>
            <circle cx={x} cy={230} r={45 * skillEnter} fill={skill.color} />
            <text x={x} y={236} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800}
              fontSize={12} fill="white" opacity={skillEnter}>{`SKILL ${i + 1}`}</text>
            <text x={x} y={310} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={600}
              fontSize={13} fill="#444" opacity={skillEnter}>{skill.label}</text>
          </g>
        );
      })}
      <text x={300} y={400} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={26} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 20), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={3}>
        THREE DIFFERENT SKILLS
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// CTA CARD
// ═══════════════════════════════════════════════════════════════
const CTACard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter   = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const fadeOut  = interpolate(frame, [43, 55], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
export const ClipAIHandlesAllContent: React.FC<{ videoSrc?: string }> = ({
  videoSrc = "videos/2026-02-22-claude-creatives/clip-ai-handles-all-content.mp4",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = getZoom(frame);

  const hookFlash     = interpolate(frame, [0, 3], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const conceptActive = CONCEPT_RANGES.some((r) => frame >= r.start && frame < r.end);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* ════ BASE VIDEO ════════════════════════════════════════ */}
      <div style={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden" }}>
        <OffthreadVideo src={staticFile(videoSrc)} volume={1}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`, transformOrigin: "center center" }} />
      </div>

      {/* ════ HOOK FLASH ════════════════════════════════════════ */}
      {hookFlash > 0 && <AbsoluteFill style={{ backgroundColor: "#FF6B00", opacity: hookFlash, zIndex: 50 }} />}

      {/* ════ 1. ADDICTION ══════════════════════════════════════ */}
      <Sequence from={31} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<AddictionIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 2. ONE MAIN PROBLEM ══════════════════════════════ */}
      <Sequence from={139} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<OneMainProblemIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 3. CREATIVES MADE BY ME ══════════════════════════ */}
      <Sequence from={220} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<CreativesMadeByMeIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 4. TIME WITH AI ══════════════════════════════════ */}
      <Sequence from={366} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<TimeWithAIIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 5. NO THUMBNAIL ══════════════════════════════════ */}
      <Sequence from={520} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<NoThumbnailIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 6. MANUAL WORK ═══════════════════════════════════ */}
      <Sequence from={635} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ManualWorkIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 7. IMAGE CAROUSELS ═══════════════════════════════ */}
      <Sequence from={854} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<ImageCarouselsIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 8. CORE ISSUE ════════════════════════════════════ */}
      <Sequence from={933} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<CoreIssueIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 9. MISSING PIECE ═════════════════════════════════ */}
      <Sequence from={1098} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<MissingPieceIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 10. TRAINED CLAUDE CODE ══════════════════════════ */}
      <Sequence from={1213} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<TrainedClaudeCodeIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 11. HANDLE ALL CREATIVES ═════════════════════════ */}
      <Sequence from={1270} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<HandleCreativesIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 12. MANAGER AGENT ════════════════════════════════ */}
      <Sequence from={1465} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<ManagerAgentIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 13. ALL DELIVERABLES ═════════════════════════════ */}
      <Sequence from={1545} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<AllDeliverablesIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 14. AUTONOMOUSLY ═════════════════════════════════ */}
      <Sequence from={1756} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<AutonomouslyIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 15. CLAUDE CREATIVE SYSTEM ═══════════════════════ */}
      <Sequence from={1884} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ClaudeCreativeSystemIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 16. THREE SKILLS ═════════════════════════════════ */}
      <Sequence from={1980} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ThreeSkillsIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ CTA ═══════════════════════════════════════════════ */}
      <Sequence from={2050} durationInFrames={55} premountFor={fps}>
        <CTACard />
      </Sequence>

      {/* ════ WORD-BY-WORD CAPTIONS ═════════════════════════════ */}
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

      {/* ════ SFX LAYER ═════════════════════════════════════════ */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={fps}>
          <Audio src={staticFile(sfx.src)} volume={sfx.volume} startFrom={0} />
        </Sequence>
      ))}

      {/* ════ BACKGROUND MUSIC ══════════════════════════════════ */}
      <Audio src={staticFile("audio/lofi-background.mp3")} volume={0.02} startFrom={0} endAt={TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};
