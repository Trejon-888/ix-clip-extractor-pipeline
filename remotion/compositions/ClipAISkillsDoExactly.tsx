/**
 * Clip: AI Skills Do Exactly What You Imagine
 *
 * SOURCE: Pipeline clip from "Claude Creatives — AI Content Factory Setup"
 * CTA: "WATCH THE FULL VIDEO" + source title
 * Duration: ~80.2s (2410 frames @ 30fps)
 * Score: 84/100 (Rank #3)
 *
 * STORY: The skills are fully customizable — carousel generator, document
 * carousel, thumbnail creator. You imagine it, AI gathers context and does it.
 *
 * POP-OUTS (13 ConceptOverlay + 1 CTA):
 *   1.  CUSTOMIZABLE SKILLS (frame 165, 65f) — paint roller on sliders
 *   2.  CAROUSEL GENERATOR (frame 348, 65f) — slide cards stacking
 *   3.  PIXEL ART STYLE (frame 522, 55f) — pixel grid canvas
 *   4.  DOCUMENT CAROUSEL (frame 715, 65f) — document pages fanning
 *   5.  10-PAGE DOCUMENT (frame 868, 55f) — page count reveal
 *   6.  IX SYSTEM (frame 1035, 55f) — INFINITX logo
 *   7.  THUMBNAIL CREATOR (frame 1148, 65f) — image frame with face
 *   8.  UPSIDE DOWN (frame 1298, 55f) — flipped person thumbnail
 *   9.  CLAUDE AI LOGO (frame 1413, 65f) — Claude icon
 *  10.  YOUR VISION (frame 1588, 55f) — lightbulb to action
 *  11.  GATHERING CONTEXT (frame 1776, 65f) — context collector
 *  12.  COMMUNICATE IT ALL (frame 1952, 60f) — message to AI
 *  13.  LEVERAGING AI (frame 2138, 65f) — AI power bar
 *  CTA: WATCH THE FULL VIDEO (frame 2335, 65f)
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
import { WORDS } from "../data/clip-ai-skills-do-exactly-words";

const { fontFamily } = loadFont();

const TOTAL_FRAMES = 2410;

function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 165, end: 230 },   // Customizable Skills
  { start: 348, end: 413 },   // Carousel Generator
  { start: 522, end: 577 },   // Pixel Art Style
  { start: 715, end: 780 },   // Document Carousel
  { start: 868, end: 923 },   // 10-Page Document
  { start: 1035, end: 1090 }, // IX System
  { start: 1148, end: 1213 }, // Thumbnail Creator
  { start: 1298, end: 1353 }, // Upside Down
  { start: 1413, end: 1478 }, // Claude AI Logo
  { start: 1588, end: 1643 }, // Your Vision
  { start: 1776, end: 1841 }, // Gathering Context
  { start: 1952, end: 2012 }, // Communicate It All
  { start: 2138, end: 2203 }, // Leveraging AI
  { start: 2335, end: 2400 }, // CTA
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  { frame: 163, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  { frame: 346, src: "audio/pop-402324.mp3", volume: 0.20 },
  { frame: 520, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  { frame: 713, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
  { frame: 866, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 1033, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1146, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  { frame: 1296, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 1411, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  { frame: 1586, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.16 },
  { frame: 1774, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  { frame: 1950, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 2136, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  { frame: 2333, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.16 },
];

// ═══════════════════════════════════════════════════════════════
// 1. CUSTOMIZABLE SKILLS — Paint roller adjusting settings sliders
// ═══════════════════════════════════════════════════════════════
const CustomizableSkillsIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const sliders = [
    { label: "Style", value: 0.78, delay: 0, color: "#FF7614" },
    { label: "Format", value: 0.55, delay: 5, color: "#3B82F6" },
    { label: "Length", value: 0.90, delay: 10, color: "#22C55E" },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Title */}
      {(() => {
        const titleEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 120 } });
        return (
          <text x={300} y={120} textAnchor="middle" fontFamily="Inter, sans-serif"
            fontWeight={800} fontSize={22} fill="#1A1A1A" opacity={titleEnter}>
            YOUR SETTINGS
          </text>
        );
      })()}

      {sliders.map((sl, i) => {
        const enter = spring({ frame: Math.max(0, frame - sl.delay), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 140 } });
        const y = 180 + i * 120;
        const trackW = 340;
        const trackX = 130;
        const fillW = trackW * sl.value * enter;

        return (
          <g key={i} opacity={enter}>
            <text x={trackX} y={y - 14} fontFamily="Inter, sans-serif" fontWeight={700} fontSize={16} fill="#888">
              {sl.label}
            </text>
            {/* Track */}
            <rect x={trackX} y={y} width={trackW} height={16} rx={8} fill="#F0F0F0" />
            {/* Fill */}
            <rect x={trackX} y={y} width={fillW} height={16} rx={8} fill={sl.color} />
            {/* Thumb */}
            <circle cx={trackX + fillW} cy={y + 8} r={14} fill="white" stroke={sl.color} strokeWidth={3} />
          </g>
        );
      })}

      {/* Paint roller icon */}
      {(() => {
        const rollerEnter = spring({ frame: Math.max(0, frame - 18), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
        return (
          <g opacity={rollerEnter} transform={`translate(460, 500) scale(${rollerEnter})`}>
            <rect x={-30} y={-40} width={60} height={30} rx={6} fill="#FF7614" />
            <rect x={-3} y={-10} width={6} height={30} fill="#FF7614" />
            <rect x={-20} y={20} width={40} height={12} rx={4} fill="#1A1A1A" />
          </g>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. CAROUSEL GENERATOR — Slide cards stacking
// ═══════════════════════════════════════════════════════════════
const CarouselGeneratorIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const cards = [
    { delay: 0, dx: -80, color: "#F5F5F5" },
    { delay: 5, dx: -40, color: "#EFEFEF" },
    { delay: 10, dx: 0, color: "#FF7614" },
    { delay: 15, dx: 40, color: "#EFEFEF" },
    { delay: 20, dx: 80, color: "#F5F5F5" },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {cards.map((card, i) => {
        const enter = spring({ frame: Math.max(0, frame - card.delay), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 130 } });
        const isCenter = i === 2;
        const x = 300 + card.dx;
        const y = isCenter ? 200 : 220;
        const h = isCenter ? 220 : 180;
        const w = isCenter ? 160 : 130;

        return (
          <g key={i} opacity={enter} transform={`translate(${x}, ${y}) scale(${enter})`}>
            <rect x={-w / 2} y={0} width={w} height={h} rx={16}
              fill={card.color} stroke={isCenter ? "#E06610" : "#E5E5E5"} strokeWidth={isCenter ? 2.5 : 1.5} />
            {isCenter && (
              <>
                <rect x={-55} y={20} width={110} height={12} rx={6} fill="white" opacity={0.6} />
                <rect x={-55} y={44} width={80} height={8} rx={4} fill="white" opacity={0.4} />
                <rect x={-55} y={60} width={95} height={8} rx={4} fill="white" opacity={0.4} />
              </>
            )}
          </g>
        );
      })}

      {/* Label */}
      {(() => {
        const lEnter = spring({ frame: Math.max(0, frame - 22), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
        return (
          <text x={300} y={490} textAnchor="middle" fontFamily="Inter, sans-serif"
            fontWeight={700} fontSize={20} fill="#888" opacity={lEnter}>
            5 SLIDES GENERATED
          </text>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. PIXEL ART STYLE — Pixel grid canvas
// ═══════════════════════════════════════════════════════════════
const PixelArtIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  const pixels = [
    // A simple pixel art pattern
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [1,1,2,1,2,1,1],
    [1,1,1,1,1,1,1],
    [1,0,1,1,1,0,1],
    [0,1,1,0,1,1,0],
    [0,0,1,1,1,0,0],
  ];

  const colors = ["transparent", "#FF7614", "#1A1A1A"];
  const pixSize = 50;
  const gridX = 300 - (pixels[0].length * pixSize) / 2;
  const gridY = 200 - (pixels.length * pixSize) / 2;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {pixels.map((row, ri) =>
        row.map((val, ci) => {
          if (val === 0) return null;
          const delay = (ri + ci) * 2;
          const enter = spring({ frame: Math.max(0, frame - delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 160 } });
          const s = size / 600;
          return (
            <rect
              key={`${ri}-${ci}`}
              x={(gridX + ci * pixSize) * s}
              y={(gridY + ri * pixSize) * s}
              width={pixSize * s - 2}
              height={pixSize * s - 2}
              rx={4 * s}
              fill={colors[val]}
              opacity={enter}
            />
          );
        })
      )}
      {(() => {
        const lEnter = spring({ frame: Math.max(0, frame - 30), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
        return (
          <text x={300} y={490} textAnchor="middle" fontFamily="Inter, sans-serif"
            fontWeight={700} fontSize={20} fill="#888" opacity={lEnter}>
            PIXEL ART AESTHETIC
          </text>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. DOCUMENT CAROUSEL — Document pages fanning out
// ═══════════════════════════════════════════════════════════════
const DocumentCarouselIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const pages = [
    { delay: 0, rotate: -15, dx: -60 },
    { delay: 5, rotate: -7, dx: -30 },
    { delay: 10, rotate: 0, dx: 0 },
    { delay: 15, rotate: 7, dx: 30 },
    { delay: 20, rotate: 15, dx: 60 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {pages.map((p, i) => {
        const enter = spring({ frame: Math.max(0, frame - p.delay), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 130 } });
        const isMain = i === 2;
        return (
          <g key={i} opacity={enter}
            transform={`translate(${300 + p.dx}, 290) rotate(${p.rotate}) translate(-60, -90) scale(${enter})`}>
            <rect width={120} height={180} rx={10} fill={isMain ? "white" : "#F5F5F5"}
              stroke={isMain ? "#FF7614" : "#E5E5E5"} strokeWidth={isMain ? 2 : 1} />
            {isMain && (
              <>
                <rect x={12} y={16} width={96} height={8} rx={4} fill="#E5E5E5" />
                <rect x={12} y={32} width={70} height={6} rx={3} fill="#F0F0F0" />
                <rect x={12} y={46} width={90} height={6} rx={3} fill="#F0F0F0" />
                <rect x={12} y={60} width={60} height={6} rx={3} fill="#F0F0F0" />
              </>
            )}
          </g>
        );
      })}

      {(() => {
        const lEnter = spring({ frame: Math.max(0, frame - 24), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
        return (
          <text x={300} y={500} textAnchor="middle" fontFamily="Inter, sans-serif"
            fontWeight={700} fontSize={18} fill="#888" opacity={lEnter}>
            DOCUMENT CAROUSEL SKILL
          </text>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. 10-PAGE DOCUMENT — Page count reveal
// ═══════════════════════════════════════════════════════════════
const TenPageDocumentIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const countUp = Math.round(interpolate(frame, [0, 35], [0, 10], { extrapolateRight: "clamp" }));

  const docEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 120 } });

  return (
    <div style={{ width: size, height: size, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 * s }}>
      <div style={{ fontSize: 100 * s, fontWeight: 900, fontFamily: "Inter, sans-serif", color: "#FF7614", transform: `scale(${docEnter})`, lineHeight: 1 }}>
        {countUp}
      </div>
      <div style={{ fontSize: 28 * s, fontWeight: 700, fontFamily: "Inter, sans-serif", color: "#1A1A1A", letterSpacing: 2, opacity: docEnter }}>
        PAGES
      </div>
      <div style={{ fontSize: 18 * s, fontWeight: 600, fontFamily: "Inter, sans-serif", color: "#999", letterSpacing: 1, opacity: docEnter }}>
        WELL ORGANIZED
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. IX SYSTEM — INFINITX logo
// ═══════════════════════════════════════════════════════════════
const IXSystemIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame: Math.max(0, frame - 3), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 140 } });
  const s = size / 600;

  return (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${enter})`, opacity: enter }}>
      <div style={{ padding: 40 * s, borderRadius: 32 * s, backgroundColor: "#F8F8F8", boxShadow: `0 ${6 * s}px ${30 * s}px rgba(0,0,0,0.08)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("infinitx-logo.png")} style={{ width: 280 * s, height: 280 * s, objectFit: "contain" }} />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 7. THUMBNAIL CREATOR — Image frame with face placeholder
// ═══════════════════════════════════════════════════════════════
const ThumbnailCreatorIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const frameEnter = spring({ frame, fps: 30, from: 0.5, to: 1, config: { damping: 14, stiffness: 120 } });
  const badgeEnter = spring({ frame: Math.max(0, frame - 12), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 140 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Thumbnail frame */}
      <g transform={`translate(300, 280) scale(${frameEnter}) translate(-300, -280)`}>
        <rect x={120} y={130} width={360} height={200} rx={16} fill="#1A1A1A" />
        {/* 16:9 label */}
        <text x={300} y={115} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={600} fontSize={14} fill="#999">
          THUMBNAIL 16:9
        </text>
        {/* Face placeholder */}
        <circle cx={220} cy={220} r={50} fill="#333" />
        <circle cx={220} cy={195} r={22} fill="#555" />
        <path d="M185 255Q220 235 255 255" fill="#555" />
        {/* Text area */}
        <rect x={290} y={160} width={160} height={12} rx={6} fill="#444" />
        <rect x={290} y={182} width={120} height={10} rx={5} fill="#383838" />
        <rect x={290} y={202} width={140} height={10} rx={5} fill="#383838" />
      </g>

      {/* AI badge */}
      <g opacity={badgeEnter} transform={`translate(410, 150) scale(${badgeEnter})`}>
        <circle cx={0} cy={0} r={32} fill="#FF7614" />
        <text x={0} y={7} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={18} fill="white">AI</text>
      </g>

      <text x={300} y={490} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={18} fill="#888" opacity={frameEnter}>
        THUMBNAIL CREATOR SKILL
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 8. UPSIDE DOWN — Flipped person on thumbnail
// ═══════════════════════════════════════════════════════════════
const UpsideDownIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  const flipIn = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const rotate = interpolate(flipIn, [0, 1], [180, 0]);

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Thumbnail bg */}
      <rect x={120} y={150} width={360} height={210} rx={16} fill="#1A1A1A" opacity={flipIn} />

      {/* Upside-down person */}
      <g transform={`translate(300, 255) rotate(${rotate}) translate(-300, -255)`} opacity={flipIn}>
        <circle cx={300} cy={195} r={35} fill="#FF7614" />
        <path d="M255 280Q300 250 345 280" fill="#FF7614" />
      </g>

      {/* Upside down label */}
      <text x={300} y={420} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={22} fill="#FF7614" opacity={flipIn}>
        UPSIDE DOWN ↕
      </text>
      <text x={300} y={460} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={600} fontSize={16} fill="#888" opacity={flipIn}>
        AI places you exactly as imagined
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 9. CLAUDE AI LOGO — Claude icon
// ═══════════════════════════════════════════════════════════════
const ClaudeLogoIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame: Math.max(0, frame - 3), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 140 } });
  const s = size / 600;

  return (
    <div style={{ width: size, height: size, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 * s, transform: `scale(${enter})`, opacity: enter }}>
      <div style={{ padding: 32 * s, borderRadius: 28 * s, backgroundColor: "#F8F8F8", boxShadow: `0 ${6 * s}px ${30 * s}px rgba(0,0,0,0.08)` }}>
        <Img src={staticFile("logos/claude-ai-icon.svg")} style={{ width: 200 * s, height: 200 * s, objectFit: "contain" }} />
      </div>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 22 * s, color: "#888", letterSpacing: 2 }}>
        CLAUDE AI LOGO
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 10. YOUR VISION — Lightbulb to action
// ═══════════════════════════════════════════════════════════════
const YourVisionIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  const bulbEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 140 } });
  const arrowProgress = interpolate(frame, [12, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const actionEnter = spring({ frame: Math.max(0, frame - 28), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 130 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Lightbulb */}
      <g opacity={bulbEnter} transform={`translate(160, 280) scale(${bulbEnter})`}>
        <ellipse cx={0} cy={0} rx={50} ry={60} fill="#FFE566" stroke="#FFB800" strokeWidth={3} />
        <rect x={-22} y={52} width={44} height={12} rx={4} fill="#DDD" />
        <rect x={-18} y={66} width={36} height={10} rx={4} fill="#DDD" />
        {/* Rays */}
        {[0,60,120,180,240,300].map((deg, i) => (
          <line key={i} x1={0} y1={-65} x2={0} y2={-80}
            transform={`rotate(${deg})`} stroke="#FFB800" strokeWidth={3} strokeLinecap="round" />
        ))}
      </g>

      {/* Arrow */}
      <line
        x1={210 + arrowProgress * 30}
        y1={280}
        x2={210 + arrowProgress * 150}
        y2={280}
        stroke="#FF7614"
        strokeWidth={4}
        strokeLinecap="round"
      />
      {arrowProgress > 0.8 && (
        <path d={`M${350} ${265}L${380} ${280}L${350} ${295}`} fill="#FF7614" opacity={arrowProgress} />
      )}

      {/* Action box */}
      <g opacity={actionEnter}>
        <rect x={390} y={225} width={140} height={110} rx={16} fill="#FF7614" />
        <text x={460} y={268} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={18} fill="white">AI</text>
        <text x={460} y={292} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={14} fill="rgba(255,255,255,0.8)">TAKES</text>
        <text x={460} y={314} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={14} fill="rgba(255,255,255,0.8)">ACTION</text>
      </g>

      <text x={300} y={480} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={18} fill="#888" opacity={bulbEnter}>
        YOU IMAGINE IT → AI DOES IT
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 11. GATHERING CONTEXT — Context collector
// ═══════════════════════════════════════════════════════════════
const GatheringContextIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const items = [
    { label: "Your Style", icon: "🎨", delay: 0, angle: -90 },
    { label: "Your Brand", icon: "🏢", delay: 5, angle: -30 },
    { label: "Your Goals", icon: "🎯", delay: 10, angle: 30 },
    { label: "Your Tone", icon: "💬", delay: 15, angle: 90 },
  ];

  const centerEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Center AI circle */}
      <circle cx={300} cy={280} r={55 * centerEnter} fill="#FF7614" />
      <text x={300} y={275} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={20} fill="white" opacity={centerEnter}>
        AI
      </text>
      <text x={300} y={296} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={600} fontSize={13} fill="rgba(255,255,255,0.8)" opacity={centerEnter}>
        LEARNS
      </text>

      {items.map((item, i) => {
        const enter = spring({ frame: Math.max(0, frame - item.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 130 } });
        const rad = (item.angle * Math.PI) / 180;
        const r = 170;
        const cx = 300 + Math.cos(rad) * r;
        const cy = 280 + Math.sin(rad) * r;

        return (
          <g key={i} opacity={enter}>
            {/* Connection line */}
            <line x1={300} y1={280} x2={cx} y2={cy} stroke="#FF7614" strokeWidth={2} strokeDasharray="6 4" opacity={0.4} />
            {/* Node */}
            <circle cx={cx} cy={cy} r={38 * enter} fill="white" stroke="#FF7614" strokeWidth={2} />
            <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={12} fill="#555">
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 12. COMMUNICATE IT ALL — Message to AI
// ═══════════════════════════════════════════════════════════════
const CommunicateIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  const messages = [
    { text: "Create 5 pixel art slides", delay: 0, align: "left" },
    { text: "Make a 10-page IX doc", delay: 6, align: "left" },
    { text: "Put me upside down on thumbnail", delay: 12, align: "left" },
  ];

  const aiReply = spring({ frame: Math.max(0, frame - 22), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 130 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {messages.map((msg, i) => {
        const enter = spring({ frame: Math.max(0, frame - msg.delay), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 150 } });
        const y = 140 + i * 90;
        return (
          <g key={i} opacity={enter} transform={`translate(${interpolate(enter, [0, 1], [-30, 0])}, 0)`}>
            <rect x={60} y={y} width={360} height={60} rx={16} fill="#F0F0F0" />
            <text x={80} y={y + 36} fontFamily="Inter, sans-serif" fontWeight={600} fontSize={15} fill="#333">
              {msg.text}
            </text>
          </g>
        );
      })}

      {/* AI response */}
      <g opacity={aiReply}>
        <rect x={160} y={430} width={320} height={60} rx={16} fill="#FF7614" />
        <text x={320} y={466} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={16} fill="white">
          ✓ Done! All 3 created.
        </text>
      </g>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 13. LEVERAGING AI — AI power bar
// ═══════════════════════════════════════════════════════════════
const LeveragingAIIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const barProgress = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  const labelEnter = spring({ frame: Math.max(0, frame - 10), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });

  const multipliers = [
    { label: "Output", value: "10×", delay: 15 },
    { label: "Speed", value: "5×", delay: 22 },
    { label: "Quality", value: "↑↑", delay: 29 },
  ];

  return (
    <div style={{ width: size, height: size, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 * s }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 36 * s, color: "#1A1A1A", letterSpacing: 3, opacity: labelEnter }}>
        AI LEVERAGE
      </div>

      {/* Power bar */}
      <div style={{ width: 420 * s, height: 28 * s, backgroundColor: "#F0F0F0", borderRadius: 14 * s, overflow: "hidden" }}>
        <div style={{ width: `${barProgress * 100}%`, height: "100%", background: "linear-gradient(90deg, #FF7614, #FFB800)", borderRadius: 14 * s, transition: "none" }} />
      </div>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 18 * s, color: "#FF7614", opacity: labelEnter }}>
        {Math.round(barProgress * 100)}% CAPACITY
      </div>

      {/* Multipliers */}
      <div style={{ display: "flex", gap: 24 * s, marginTop: 8 * s }}>
        {multipliers.map((m, i) => {
          const mScale = Math.min(1, Math.max(0, (frame - m.delay) / 10));
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 * s, opacity: mScale, transform: `scale(${mScale})` }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 32 * s, color: "#FF7614" }}>{m.value}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13 * s, color: "#999" }}>{m.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// CTA CARD
// ═══════════════════════════════════════════════════════════════
const CTACard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
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
export const ClipAISkillsDoExactly: React.FC<{ videoSrc?: string }> = ({
  videoSrc = "videos/2026-02-22-claude-creatives/clip-ai-skills-do-exactly.mp4",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = getZoom(frame);

  const hookFlash = interpolate(frame, [0, 3], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
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

      {/* ════ 1. CUSTOMIZABLE SKILLS — frame 165, 65f ══════════ */}
      <Sequence from={165} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<CustomizableSkillsIllustration />}
          caption="CUSTOMIZABLE SKILLS" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 2. CAROUSEL GENERATOR — frame 348, 65f ══════════ */}
      <Sequence from={348} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<CarouselGeneratorIllustration />}
          caption="CAROUSEL GENERATOR" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 3. PIXEL ART STYLE — frame 522, 55f ══════════════ */}
      <Sequence from={522} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<PixelArtIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 4. DOCUMENT CAROUSEL — frame 715, 65f ════════════ */}
      <Sequence from={715} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<DocumentCarouselIllustration />}
          caption="DOCUMENT CAROUSEL" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 5. 10-PAGE DOCUMENT — frame 868, 55f ═════════════ */}
      <Sequence from={868} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<TenPageDocumentIllustration />}
          caption="10-PAGE DOCUMENT" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={620} />
      </Sequence>

      {/* ════ 6. IX SYSTEM — frame 1035, 55f ═══════════════════ */}
      <Sequence from={1035} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<IXSystemIllustration />}
          caption="IX SYSTEM" subtitle="Learn the iX system" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={580} />
      </Sequence>

      {/* ════ 7. THUMBNAIL CREATOR — frame 1148, 65f ═══════════ */}
      <Sequence from={1148} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<ThumbnailCreatorIllustration />}
          caption="THUMBNAIL CREATOR" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 8. UPSIDE DOWN — frame 1298, 55f ═════════════════ */}
      <Sequence from={1298} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<UpsideDownIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 9. CLAUDE AI LOGO — frame 1413, 65f ══════════════ */}
      <Sequence from={1413} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<ClaudeLogoIllustration />}
          caption="CLAUDE AI LOGO" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 10. YOUR VISION — frame 1588, 55f ════════════════ */}
      <Sequence from={1588} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<YourVisionIllustration />}
          caption="YOU IMAGINE IT" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 11. GATHERING CONTEXT — frame 1776, 65f ══════════ */}
      <Sequence from={1776} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<GatheringContextIllustration />}
          caption="GATHERING CONTEXT" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 12. COMMUNICATE IT ALL — frame 1952, 60f ══════════ */}
      <Sequence from={1952} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<CommunicateIllustration />}
          caption="COMMUNICATE EVERYTHING" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 13. LEVERAGING AI — frame 2138, 65f ══════════════ */}
      <Sequence from={2138} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<LeveragingAIIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={620} />
      </Sequence>

      {/* ════ CTA — frame 2335, 65f ══════════════════════════════ */}
      <Sequence from={2335} durationInFrames={65} premountFor={fps}>
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
