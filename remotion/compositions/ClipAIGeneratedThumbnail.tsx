/**
 * Clip: AI Generated Thumbnail with My Face
 *
 * SOURCE: Pipeline clip from "Claude Creatives — AI Content Factory Setup"
 * CTA: "WATCH THE FULL VIDEO" + source title
 * Duration: ~61.7s (1882 frames @ 30fps)
 * Score: 85/100 (Rank #2)
 *
 * STORY: Using Late API for image storage, Claude smartly uses IMGBB as temp
 * hosting. Claude generates the exact thumbnail requested with face + brand.
 * "My God is the goat — created exactly what I want."
 *
 * POP-OUTS (11 ConceptOverlay + 1 CTA):
 *   1.  LATE API          (frame    1, 55f) — Late logo / storage
 *   2.  OWN STORAGE       (frame  290, 55f) — storage options
 *   3.  CLAUDE IS SMART   (frame  388, 55f) — AI brain icon
 *   4.  IMAGE HOSTING     (frame  488, 55f) — IMGBB upload
 *   5.  THUMBNAIL OUTPUT  (frame  828, 55f) — thumbnail frame
 *   6.  THUMBNAIL READY   (frame  960, 55f) — ready checkmark
 *   7.  NEW FOLDER        (frame 1158, 55f) — folder created
 *   8.  THE GOAT          (frame 1354, 65f) — trophy moment
 *   9.  EXACTLY WHAT I WANT (frame 1450, 55f) — bullseye
 *  10.  MY FACE SMILING   (frame 1744, 60f) — face + smile
 *  11.  SLASH COMMANDS     (frame 1608, 55f) — command line
 *  CTA: WATCH THE FULL VIDEO (frame 1820, 55f)
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
import { WORDS } from "../data/clip-ai-generated-thumbnail-words";

const { fontFamily } = loadFont();

const TOTAL_FRAMES = 1882;

function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 1,    end: 56   }, // Late API
  { start: 288,  end: 345  }, // Own Storage
  { start: 386,  end: 443  }, // Claude Is Smart
  { start: 486,  end: 543  }, // Image Hosting
  { start: 826,  end: 883  }, // Thumbnail Output
  { start: 958,  end: 1015 }, // Thumbnail Ready
  { start: 1156, end: 1213 }, // New Folder
  { start: 1352, end: 1419 }, // The Goat
  { start: 1448, end: 1505 }, // Exactly What I Want
  { start: 1606, end: 1663 }, // Slash Commands
  { start: 1742, end: 1804 }, // My Face Smiling
  { start: 1818, end: 1875 }, // CTA
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  { frame: 0,    src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  { frame: 288,  src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 386,  src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 486,  src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 826,  src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 958,  src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 1156, src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 1352, src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 1448, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1606, src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 1742, src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 1818, src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
];

// ═══════════════════════════════════════════════════════════════
// 1. LATE API — Storage service icon
// ═══════════════════════════════════════════════════════════════
const LateAPIIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const textEnter = spring({ frame: Math.max(0, frame - 14), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300,240) scale(${enter})`}>
        <rect x={-80} y={-80} width={160} height={120} rx={16} fill="#1A1A1A" />
        <rect x={-60} y={-60} width={120} height={20} rx={4} fill="#FF7614" opacity={0.5} />
        <rect x={-60} y={-30} width={90} height={14} rx={4} fill="#444" />
        <rect x={-60} y={-8} width={70} height={14} rx={4} fill="#444" />
        <circle cx={50} cy={-10} r={20} fill="#22C55E" />
        <text x={50} y={-4} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={14} fill="white">✓</text>
      </g>
      <text x={300} y={400} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={34 * s} fill="#1A1A1A" opacity={textEnter} letterSpacing={3}>
        LATE API
      </text>
      <text x={300} y={440} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={600} fontSize={16 * s} fill="#888" opacity={textEnter}>
        Image Storage Service
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. OWN STORAGE — Storage server
// ═══════════════════════════════════════════════════════════════
const OwnStorageIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 260) scale(${enter})`}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={-120} y={-100 + i * 70} width={240} height={55} rx={10} fill={i === 0 ? "#FF7614" : "#F0F0F0"} stroke="#E5E5E5" strokeWidth={1.5} />
            <circle cx={-80} cy={-72 + i * 70} r={8} fill={i === 0 ? "white" : "#22C55E"} />
            <rect x={-55} y={-80 + i * 70} width={100} height={10} rx={5} fill={i === 0 ? "rgba(255,255,255,0.4)" : "#E5E5E5"} />
            <rect x={-55} y={-64 + i * 70} width={70} height={8} rx={4} fill={i === 0 ? "rgba(255,255,255,0.3)" : "#E5E5E5"} />
          </g>
        ))}
      </g>
      <text x={300} y={470} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={20} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 18), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        YOUR OWN STORAGE
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. CLAUDE IS SMART — AI brain with lightbulb
// ═══════════════════════════════════════════════════════════════
const ClaudeSmartIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 120 } });
  const bulbPulse = 1 + Math.sin(frame * 0.18) * 0.06;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 250) scale(${enter})`}>
        <circle cx={0} cy={0} r={80} fill="#FF7614" />
        <text x={0} y={-5} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={24} fill="white">AI</text>
        <text x={0} y={22} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={14} fill="rgba(255,255,255,0.8)">CLAUDE</text>
      </g>
      {/* Lightbulb */}
      <g opacity={enter} transform={`translate(410, 170) scale(${enter * bulbPulse})`}>
        <circle cx={0} cy={0} r={30} fill="#FFB800" opacity={0.3} />
        <circle cx={0} cy={0} r={18} fill="#FFB800" />
        <text x={0} y={7} textAnchor="middle" fontSize={18} fill="white">💡</text>
      </g>
      <text x={300} y={400} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={24 * s} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        CLAUDE IS SMART
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. IMAGE HOSTING — Upload to IMGBB
// ═══════════════════════════════════════════════════════════════
const ImageHostingIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 130 } });
  const arrowY = interpolate(frame, [0, 30], [0, -40], { extrapolateRight: "clamp" });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter}>
        {/* Image icon */}
        <rect x={200} y={200} width={200} height={150} rx={16} fill="#F0F0F0" stroke="#E5E5E5" strokeWidth={2} />
        <circle cx={260} cy={260} r={20} fill="#FF7614" opacity={0.3} />
        <polygon points="220,330 300,270 380,330" fill="#FF7614" opacity={0.2} />
        {/* Upload arrow */}
        <g transform={`translate(300, ${350 + arrowY})`}>
          <polygon points="-15,10 0,-15 15,10" fill="#22C55E" />
          <rect x={-5} y={10} width={10} height={25} fill="#22C55E" />
        </g>
        {/* Cloud */}
        <g transform="translate(300, 420)">
          <ellipse cx={0} cy={0} rx={80} ry={40} fill="#3B82F6" opacity={0.15} />
          <text x={0} y={8} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={16} fill="#3B82F6">IMGBB</text>
        </g>
      </g>
      <text x={300} y={520} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={18 * s} fill="#888"
        opacity={spring({ frame: Math.max(0, frame - 20), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })}>
        Temporary Hosting
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. THUMBNAIL OUTPUT — Thumbnail preview frame
// ═══════════════════════════════════════════════════════════════
const ThumbnailOutputIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 270) scale(${interpolate(enter, [0, 1], [0.8, 1])})`}>
        <rect x={-200} y={-120} width={400} height={240} rx={18} fill="#1A1A1A" />
        <rect x={-180} y={-100} width={360} height={200} rx={12} fill="#FF7614" opacity={0.15} />
        {/* Face placeholder */}
        <circle cx={-60} cy={-20} r={50} fill="white" opacity={0.9} />
        <circle cx={-60} cy={-30} r={20} fill="#ABABAB" />
        <path d="M-100,20 Q-60,0 -20,20" fill="#ABABAB" />
        {/* Text area */}
        <rect x={30} y={-50} width={140} height={16} rx={8} fill="white" opacity={0.4} />
        <rect x={30} y={-24} width={100} height={12} rx={6} fill="white" opacity={0.3} />
        <rect x={30} y={-4} width={120} height={12} rx={6} fill="white" opacity={0.3} />
      </g>
      <text x={300} y={460} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22 * s} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        THUMBNAIL OUTPUT
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. THUMBNAIL READY — Ready checkmark
// ═══════════════════════════════════════════════════════════════
const ThumbnailReadyIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 100 } });
  const checkEnter = spring({ frame: Math.max(0, frame - 12), fps: 30, from: 0, to: 1, config: { damping: 8, stiffness: 160 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <circle cx={300} cy={260} r={100 * enter} fill="#22C55E" />
      <g opacity={checkEnter}>
        <polyline points="250,260 285,300 360,220" fill="none" stroke="white" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x={300} y={420} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={28} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 20), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={3}>
        THUMBNAIL READY
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 7. NEW FOLDER — Folder creation
// ═══════════════════════════════════════════════════════════════
const NewFolderIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 260) scale(${enter})`}>
        {/* Folder back */}
        <rect x={-120} y={-60} width={240} height={150} rx={12} fill="#FFB800" />
        {/* Folder tab */}
        <rect x={-120} y={-80} width={90} height={30} rx={8} fill="#FFB800" />
        {/* Plus icon */}
        <rect x={-20} y={-10} width={40} height={6} rx={3} fill="white" />
        <rect x={-3} y={-27} width={6} height={40} rx={3} fill="white" />
        {/* Sparkle */}
        <circle cx={90} cy={-60} r={12} fill="#FF7614" opacity={Math.abs(Math.sin(frame * 0.15))} />
      </g>
      <text x={300} y={460} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 18), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        NEW FOLDER CREATED
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 8. THE GOAT — Trophy + GOAT label
// ═══════════════════════════════════════════════════════════════
const TheGoatIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 100 } });
  const bounce = spring({ frame: Math.max(0, frame - 10), fps: 30, from: 1.2, to: 1, config: { damping: 8, stiffness: 200 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 240) scale(${enter * bounce})`}>
        <circle cx={0} cy={0} r={90} fill="#FFB800" />
        <text x={0} y={20} textAnchor="middle" fontSize={60}>🐐</text>
      </g>
      <text x={300} y={400} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={36 * s} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 18), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={4}>
        THE GOAT
      </text>
      <text x={300} y={445} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={16 * s} fill="#888"
        opacity={spring({ frame: Math.max(0, frame - 24), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })}>
        Greatest of All Time
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 9. EXACTLY WHAT I WANT — Bullseye target
// ═══════════════════════════════════════════════════════════════
const ExactlyWhatIWantIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const rings = [
    { r: 100, color: "#F0F0F0" },
    { r: 70,  color: "#FFD4A8" },
    { r: 40,  color: "#FF7614" },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {rings.map((ring, i) => {
        const ringEnter = spring({ frame: Math.max(0, frame - i * 6), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
        return (
          <circle key={i} cx={300} cy={260} r={ring.r * ringEnter} fill={ring.color} opacity={enter} />
        );
      })}
      {/* Center bullseye */}
      <g opacity={spring({ frame: Math.max(0, frame - 20), fps: 30, from: 0, to: 1, config: { damping: 8, stiffness: 160 } })}>
        <circle cx={300} cy={260} r={14} fill="white" />
        <text x={300} y={267} textAnchor="middle" fontSize={16} fill="#FF7614">●</text>
      </g>
      <text x={300} y={420} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22 * s} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 24), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        EXACTLY WHAT I WANT
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 10. SLASH COMMANDS — Terminal command line
// ═══════════════════════════════════════════════════════════════
const SlashCommandsIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const cmds = [
    { text: "/create-thumbnail", delay: 0,  color: "#FF7614" },
    { text: "/generate-carousel", delay: 8, color: "#3B82F6" },
    { text: "/post-to-socials",  delay: 16, color: "#22C55E" },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <rect x={80} y={120} width={440} height={340} rx={16} fill="#1E1E2E" opacity={enter} />
      <g opacity={enter}>
        <circle cx={112} cy={146} r={7} fill="#FF5F56" />
        <circle cx={134} cy={146} r={7} fill="#FFBD2E" />
        <circle cx={156} cy={146} r={7} fill="#27C93F" />
      </g>
      {cmds.map((cmd, i) => {
        const cmdEnter = spring({ frame: Math.max(0, frame - cmd.delay), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 140 } });
        return (
          <g key={i} opacity={cmdEnter}>
            <text x={120} y={210 + i * 55} fontFamily="'Courier New', monospace" fontWeight={600} fontSize={18 * s} fill="#888">$</text>
            <text x={145} y={210 + i * 55} fontFamily="'Courier New', monospace" fontWeight={700} fontSize={18 * s} fill={cmd.color}>
              {cmd.text}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 11. MY FACE SMILING — Face with smile icon
// ═══════════════════════════════════════════════════════════════
const MyFaceSmilingIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 110 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Thumbnail frame */}
      <g opacity={enter} transform={`translate(300, 240) scale(${enter})`}>
        <rect x={-180} y={-110} width={360} height={220} rx={18} fill="#1A1A1A" />
        {/* Face */}
        <circle cx={-60} cy={0} r={65} fill="white" />
        <circle cx={-80} cy={-15} r={6} fill="#1A1A1A" />
        <circle cx={-40} cy={-15} r={6} fill="#1A1A1A" />
        <path d="M-85,15 Q-60,40 -35,15" fill="none" stroke="#FF7614" strokeWidth={4} strokeLinecap="round" />
        {/* Brand text side */}
        <rect x={30} y={-40} width={130} height={18} rx={4} fill="#FF7614" opacity={0.5} />
        <rect x={30} y={-10} width={100} height={12} rx={4} fill="white" opacity={0.3} />
        <rect x={30} y={14} width={80} height={12} rx={4} fill="white" opacity={0.3} />
      </g>
      <text x={300} y={430} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={24 * s} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        MY FACE ON IT 😊
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
  const fadeOut = interpolate(frame, [43, 55], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
export const ClipAIGeneratedThumbnail: React.FC<{ videoSrc?: string }> = ({
  videoSrc = "videos/2026-02-22-claude-creatives/clip-ai-generated-thumbnail.mp4",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = getZoom(frame);

  const hookFlash    = interpolate(frame, [0, 3], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const conceptActive = CONCEPT_RANGES.some((r) => frame >= r.start && frame < r.end);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <div style={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden" }}>
        <OffthreadVideo src={staticFile(videoSrc)} volume={1}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`, transformOrigin: "center center" }} />
      </div>

      {hookFlash > 0 && <AbsoluteFill style={{ backgroundColor: "#FF6B00", opacity: hookFlash, zIndex: 50 }} />}

      <Sequence from={1} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<LateAPIIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={580} />
      </Sequence>

      <Sequence from={290} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<OwnStorageIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      <Sequence from={388} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ClaudeSmartIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      <Sequence from={488} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ImageHostingIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      <Sequence from={828} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ThumbnailOutputIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      <Sequence from={960} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ThumbnailReadyIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      <Sequence from={1158} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<NewFolderIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      <Sequence from={1354} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<TheGoatIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      <Sequence from={1450} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ExactlyWhatIWantIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      <Sequence from={1608} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<SlashCommandsIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      <Sequence from={1744} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<MyFaceSmilingIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      <Sequence from={1820} durationInFrames={55} premountFor={fps}>
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

      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={fps}>
          <Audio src={staticFile(sfx.src)} volume={sfx.volume} startFrom={0} />
        </Sequence>
      ))}

      <Audio src={staticFile("audio/lofi-background.mp3")} volume={0.02} startFrom={0} endAt={TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};
