/**
 * Clip 4: Carousel for 54 Cents
 *
 * STORY: AI triggered the carousel generator skill, went through all phases,
 * broke down prompts for each slide, used key.ai nano banana pro model,
 * cost was just 54 cents, created 6 slides with a call to action,
 * stored everything in the right folder.
 *
 * SOURCE: Pipeline clip from "Claude Creatives"
 * CTA: "WATCH THE FULL VIDEO" — Claude Creatives
 * Duration: 79s (2370 frames @ 30fps)
 *
 * POP-OUTS (6 ConceptOverlay + 1 CTA):
 *   1. "CAROUSEL GENERATOR"  (frame  170, 55f) — Triggered the skill
 *   2. "SLIDE PROMPTS"       (frame  432, 55f) — Broke down prompts per slide
 *   3. "AI IMAGE MODEL"      (frame  623, 55f) — key.ai nano banana pro
 *   4. "54 CENTS"            (frame 1192, 65f) — Hero stat: cost was 54 cents
 *   5. "STORED PROPERLY"     (frame 1650, 55f) — Output in the right folder
 *   6. "SIX SLIDES"          (frame 2339, 55f) — Six slides with a CTA
 *   CTA: WATCH THE FULL VIDEO (frame 2400, 60f)
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
import { WORDS } from "../data/clip4-carousel-54-cents-words";

const { fontFamily } = loadFont();

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════
const TOTAL_FRAMES = 2370; // 79s x 30fps

// Flat zoom — no shake/swimming
function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 170, end: 225 },   // Carousel Generator
  { start: 432, end: 487 },   // Slide Prompts
  { start: 623, end: 678 },   // AI Image Model
  { start: 1192, end: 1257 }, // 54 Cents (hero — 65f)
  { start: 1650, end: 1705 }, // Stored Properly
  { start: 2339, end: 2394 }, // Six Slides
  { start: 2400, end: 2460 }, // CTA
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS (J-cut: audio 2-3 frames before visual)
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  // Hook burst
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  // Carousel Generator
  { frame: 168, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // Slide Prompts
  { frame: 430, src: "audio/pop-402324.mp3", volume: 0.20 },
  // AI Image Model
  { frame: 621, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  // 54 Cents (hero)
  { frame: 1190, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  // Stored Properly
  { frame: 1648, src: "audio/pop-402324.mp3", volume: 0.20 },
  // Six Slides
  { frame: 2337, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // CTA
  { frame: 2398, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.16 },
];

// ═══════════════════════════════════════════════════════════════
// 1. CAROUSEL GENERATOR — Carousel icon with rotating slides
// ═══════════════════════════════════════════════════════════════
const CarouselGeneratorIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const enter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const slides = [
    { x: 120, delay: 0, color: "#FF7614" },
    { x: 230, delay: 4, color: "#FF9F5A" },
    { x: 340, delay: 8, color: "#FFB87A" },
    { x: 450, delay: 12, color: "#FFC99A" },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Skill badge */}
      <g
        opacity={enter}
        transform={`translate(300,140) scale(${enter})`}
      >
        <rect x={-90} y={-32} width={180} height={64} rx={32} fill="#1A1A1A" />
        <text
          x={0}
          y={8}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight={800}
          fontSize={20}
          fill="#FF7614"
          letterSpacing={2}
        >
          SKILL
        </text>
      </g>

      {/* Carousel slides fanning out */}
      {slides.map((sl, i) => {
        const slideEnter = spring({
          frame: Math.max(0, frame - sl.delay - 5),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 120 },
        });

        return (
          <g
            key={i}
            opacity={slideEnter}
            transform={`translate(${sl.x * s}, ${280 * s}) scale(${slideEnter * s})`}
          >
            <rect
              x={-45}
              y={-60}
              width={90}
              height={120}
              rx={10}
              fill="white"
              stroke={sl.color}
              strokeWidth={3}
            />
            <rect x={-30} y={-42} width={60} height={40} rx={6} fill={sl.color} opacity={0.2} />
            <rect x={-30} y={8} width={50} height={8} rx={4} fill="#DDD" />
            <rect x={-30} y={22} width={35} height={8} rx={4} fill="#EEE" />
            <text
              x={0}
              y={-16}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={800}
              fontSize={18}
              fill={sl.color}
            >
              {i + 1}
            </text>
          </g>
        );
      })}

      {/* Arrow indicating generation */}
      {(() => {
        const arrowEnter = spring({
          frame: Math.max(0, frame - 18),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 100 },
        });
        return (
          <g opacity={arrowEnter}>
            <line
              x1={200 * s}
              y1={430 * s}
              x2={400 * s}
              y2={430 * s}
              stroke="#FF7614"
              strokeWidth={3}
              strokeDasharray="8 4"
            />
            <polygon
              points={`${400 * s},${420 * s} ${420 * s},${430 * s} ${400 * s},${440 * s}`}
              fill="#FF7614"
            />
            <text
              x={300 * s}
              y={468 * s}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={700}
              fontSize={16 * s}
              fill="#888"
              letterSpacing={1}
            >
              GENERATING...
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. SLIDE PROMPTS — Prompt document breaking into individual cards
// ═══════════════════════════════════════════════════════════════
const SlidePromptsIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const prompts = [
    { label: "Slide 1 Prompt", y: 160, delay: 3 },
    { label: "Slide 2 Prompt", y: 240, delay: 7 },
    { label: "Slide 3 Prompt", y: 320, delay: 11 },
    { label: "Slide 4 Prompt", y: 400, delay: 15 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Document icon at top */}
      {(() => {
        const docEnter = spring({
          frame,
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 140 },
        });
        return (
          <g opacity={docEnter} transform={`translate(300,80) scale(${docEnter})`}>
            <rect x={-35} y={-30} width={70} height={60} rx={8} fill="#F5F5F5" stroke="#DDD" strokeWidth={2} />
            <rect x={-22} y={-18} width={44} height={6} rx={3} fill="#FF7614" />
            <rect x={-22} y={-6} width={30} height={6} rx={3} fill="#CCC" />
            <rect x={-22} y={6} width={36} height={6} rx={3} fill="#CCC" />
          </g>
        );
      })()}

      {/* Individual prompt cards */}
      {prompts.map((p, i) => {
        const cardEnter = spring({
          frame: Math.max(0, frame - p.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 120 },
        });

        return (
          <g
            key={i}
            opacity={cardEnter}
            transform={`translate(${interpolate(cardEnter, [0, 1], [-40, 0])}, 0)`}
          >
            <rect
              x={120 * s}
              y={(p.y - 24) * s}
              width={360 * s}
              height={48 * s}
              rx={12 * s}
              fill="white"
              stroke="#FF7614"
              strokeWidth={2}
              opacity={0.9}
            />
            <circle
              cx={160 * s}
              cy={p.y * s}
              r={14 * s}
              fill="#FF7614"
              opacity={0.15}
            />
            <text
              x={160 * s}
              y={(p.y + 5) * s}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={800}
              fontSize={14 * s}
              fill="#FF7614"
            >
              {i + 1}
            </text>
            <text
              x={200 * s}
              y={(p.y + 5) * s}
              fontFamily="Inter, sans-serif"
              fontWeight={600}
              fontSize={16 * s}
              fill="#555"
            >
              {p.label}
            </text>
            {/* Checkmark appearing */}
            {(() => {
              const checkEnter = spring({
                frame: Math.max(0, frame - p.delay - 6),
                fps: 30,
                from: 0,
                to: 1,
                config: { damping: 10, stiffness: 160 },
              });
              return (
                <g opacity={checkEnter} transform={`translate(${440 * s},${p.y * s}) scale(${checkEnter})`}>
                  <circle r={12 * s} fill="#22C55E" />
                  <path
                    d={`M${-5 * s} ${0 * s} L${-1 * s} ${4 * s} L${6 * s} ${-4 * s}`}
                    stroke="white"
                    strokeWidth={2.5}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              );
            })()}
          </g>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. AI IMAGE MODEL — Neural network / model badge
// ═══════════════════════════════════════════════════════════════
const AIImageModelIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const badgeEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const shimmer = interpolate(frame % 40, [0, 20, 40], [0.6, 1, 0.6]);

  // Neural network nodes
  const layers = [
    [200, 180, 260, 340, 420],
    [240, 300, 360],
    [300],
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Model name badge */}
      <g opacity={badgeEnter} transform={`translate(300,100) scale(${badgeEnter})`}>
        <rect x={-130} y={-28} width={260} height={56} rx={28} fill="#1A1A1A" />
        <text
          x={0}
          y={7}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight={800}
          fontSize={18}
          fill="#FF7614"
          letterSpacing={1.5}
        >
          NANO BANANA PRO
        </text>
      </g>

      {/* Neural network visualization */}
      {(() => {
        const nodePositions: Array<{ x: number; y: number; layer: number }> = [];
        layers.forEach((layer, li) => {
          layer.forEach((y) => {
            nodePositions.push({ x: 180 + li * 120, y, layer: li });
          });
        });

        // Draw connections first
        const connections: React.ReactNode[] = [];
        let connIdx = 0;
        for (let li = 0; li < layers.length - 1; li++) {
          const currLayer = nodePositions.filter((n) => n.layer === li);
          const nextLayer = nodePositions.filter((n) => n.layer === li + 1);
          for (const curr of currLayer) {
            for (const next of nextLayer) {
              const lineEnter = spring({
                frame: Math.max(0, frame - 8 - li * 4),
                fps: 30,
                from: 0,
                to: 1,
                config: { damping: 16, stiffness: 80 },
              });
              connections.push(
                <line
                  key={`conn-${connIdx++}`}
                  x1={curr.x * s}
                  y1={curr.y * s}
                  x2={curr.x * s + (next.x - curr.x) * s * lineEnter}
                  y2={curr.y * s + (next.y - curr.y) * s * lineEnter}
                  stroke="#FF7614"
                  strokeWidth={1.5}
                  opacity={0.25 * shimmer}
                />
              );
            }
          }
        }

        // Draw nodes
        const nodes = nodePositions.map((n, i) => {
          const nodeEnter = spring({
            frame: Math.max(0, frame - 4 - n.layer * 4),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 160 },
          });
          return (
            <g key={`node-${i}`} opacity={nodeEnter}>
              <circle
                cx={n.x * s}
                cy={n.y * s}
                r={12 * s}
                fill={n.layer === layers.length - 1 ? "#FF7614" : "#F0F0F0"}
                stroke={n.layer === layers.length - 1 ? "#E06610" : "#DDD"}
                strokeWidth={2}
              />
            </g>
          );
        });

        return (
          <>
            {connections}
            {nodes}
          </>
        );
      })()}

      {/* Output: image icon */}
      {(() => {
        const imgEnter = spring({
          frame: Math.max(0, frame - 20),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 120 },
        });
        return (
          <g opacity={imgEnter} transform={`translate(${460 * s},${300 * s}) scale(${imgEnter * s})`}>
            <rect x={-40} y={-40} width={80} height={80} rx={12} fill="white" stroke="#FF7614" strokeWidth={2.5} />
            <circle cx={-14} cy={-14} r={8} fill="#FFD166" />
            <path d="M-30 20 L-10 0 L0 10 L15 -5 L30 20Z" fill="#22C55E" opacity={0.5} />
          </g>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. 54 CENTS — Hero stat with count-up cent display
// ═══════════════════════════════════════════════════════════════
const FiftyCentsIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const enter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  // Count up from 0 to 54
  const countProgress = spring({
    frame: Math.max(0, frame - 5),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 60 },
  });
  const displayCents = Math.round(countProgress * 54);

  const pulse = interpolate(frame % 40, [0, 20, 40], [1.0, 1.04, 1.0]);

  // Comparison items
  const comparisons = [
    { label: "6 Carousel Slides", icon: "6", delay: 10 },
    { label: "Custom Prompts", icon: "AI", delay: 14 },
    { label: "Brand Styled", icon: "BRD", delay: 18 },
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
        gap: 24 * s,
      }}
    >
      {/* Hero number */}
      <div
        style={{
          transform: `scale(${enter * pulse})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4 * s,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 120 * s,
            color: "#FF7614",
            lineHeight: 1,
            textShadow: `0 ${4 * s}px ${16 * s}px rgba(255,118,20,0.25)`,
          }}
        >
          {displayCents}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: 36 * s,
            color: "#FF9F5A",
            letterSpacing: 6,
            marginTop: -10 * s,
          }}
        >
          CENTS
        </div>
      </div>

      {/* Divider */}
      {(() => {
        const lineW = spring({
          frame: Math.max(0, frame - 8),
          fps: 30,
          from: 0,
          to: 200 * s,
          config: { damping: 14, stiffness: 100 },
        });
        return (
          <div
            style={{
              width: lineW,
              height: 3 * s,
              backgroundColor: "#FF7614",
              borderRadius: 2,
              opacity: enter * 0.6,
            }}
          />
        );
      })()}

      {/* What you get for 54 cents */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12 * s,
          width: 340 * s,
        }}
      >
        {comparisons.map((c, i) => {
          const itemEnter = spring({
            frame: Math.max(0, frame - c.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 14, stiffness: 120 },
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14 * s,
                opacity: itemEnter,
                transform: `translateX(${interpolate(itemEnter, [0, 1], [20, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 40 * s,
                  height: 40 * s,
                  borderRadius: 10 * s,
                  backgroundColor: "#FFF5EB",
                  border: `2px solid #FFD4A8`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 800,
                  fontSize: 13 * s,
                  color: "#FF7614",
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 18 * s,
                  color: "#555",
                }}
              >
                {c.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. STORED PROPERLY — Folder with organized files
// ═══════════════════════════════════════════════════════════════
const StoredProperlyIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const folderEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const files = [
    { label: "slide-1.png", delay: 6 },
    { label: "slide-2.png", delay: 9 },
    { label: "slide-3.png", delay: 12 },
    { label: "slide-4.png", delay: 15 },
    { label: "slide-5.png", delay: 18 },
    { label: "slide-6.png", delay: 21 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Folder */}
      <g opacity={folderEnter} transform={`translate(300,160) scale(${folderEnter})`}>
        {/* Folder tab */}
        <path d="M-90 -20 L-50 -50 L10 -50 L30 -20Z" fill="#FFB87A" />
        {/* Folder body */}
        <rect x={-100} y={-20} width={200} height={80} rx={8} fill="#FF9F5A" />
        <rect x={-85} y={-8} width={170} height={56} rx={6} fill="#FFF5EB" />
      </g>

      {/* File list dropping in */}
      {files.map((f, i) => {
        const fileEnter = spring({
          frame: Math.max(0, frame - f.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 120 },
        });

        const yPos = 280 + i * 42;

        return (
          <g
            key={i}
            opacity={fileEnter}
            transform={`translate(0,${interpolate(fileEnter, [0, 1], [-15, 0])})`}
          >
            <rect
              x={150 * s}
              y={(yPos - 14) * s}
              width={300 * s}
              height={32 * s}
              rx={8 * s}
              fill="white"
              stroke="#E0E0E0"
              strokeWidth={1.5}
            />
            {/* File icon */}
            <rect
              x={166 * s}
              y={(yPos - 8) * s}
              width={16 * s}
              height={20 * s}
              rx={3 * s}
              fill="#FF7614"
              opacity={0.2}
            />
            <text
              x={200 * s}
              y={(yPos + 4) * s}
              fontFamily="Inter, sans-serif"
              fontWeight={600}
              fontSize={13 * s}
              fill="#666"
            >
              {f.label}
            </text>
            {/* Checkmark */}
            {(() => {
              const checkIn = spring({
                frame: Math.max(0, frame - f.delay - 4),
                fps: 30,
                from: 0,
                to: 1,
                config: { damping: 10, stiffness: 160 },
              });
              return (
                <g opacity={checkIn} transform={`translate(${420 * s},${yPos * s}) scale(${checkIn * s})`}>
                  <circle r={10} fill="#22C55E" />
                  <path
                    d="M-4 0 L-1 3 L5 -3"
                    stroke="white"
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              );
            })()}
          </g>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. SIX SLIDES — Grid of 6 completed slides with CTA highlight
// ═══════════════════════════════════════════════════════════════
const SixSlidesIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const slideData = [
    { row: 0, col: 0, delay: 0, label: "1" },
    { row: 0, col: 1, delay: 3, label: "2" },
    { row: 0, col: 2, delay: 6, label: "3" },
    { row: 1, col: 0, delay: 9, label: "4" },
    { row: 1, col: 1, delay: 12, label: "5" },
    { row: 1, col: 2, delay: 15, label: "CTA", isCta: true },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* 6 count badge */}
      {(() => {
        const badgeEnter = spring({
          frame: Math.max(0, frame - 2),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 140 },
        });
        return (
          <g opacity={badgeEnter} transform={`translate(300,80) scale(${badgeEnter})`}>
            <circle r={36} fill="#FF7614" />
            <text
              x={0}
              y={10}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={900}
              fontSize={32}
              fill="white"
            >
              6
            </text>
          </g>
        );
      })()}

      {/* Slide grid: 3x2 */}
      {slideData.map((sl, i) => {
        const cardEnter = spring({
          frame: Math.max(0, frame - sl.delay - 5),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 120 },
        });

        const cx = 160 + sl.col * 140;
        const cy = 220 + sl.row * 180;
        const isCta = "isCta" in sl && sl.isCta;

        return (
          <g
            key={i}
            opacity={cardEnter}
            transform={`translate(${cx * s},${cy * s}) scale(${cardEnter * s})`}
          >
            <rect
              x={-55}
              y={-70}
              width={110}
              height={140}
              rx={12}
              fill={isCta ? "#FF7614" : "white"}
              stroke={isCta ? "#E06610" : "#E0E0E0"}
              strokeWidth={2.5}
            />
            {!isCta && (
              <>
                <rect x={-38} y={-52} width={76} height={50} rx={6} fill="#F5F5F5" />
                <rect x={-38} y={8} width={55} height={8} rx={4} fill="#E0E0E0" />
                <rect x={-38} y={22} width={40} height={8} rx={4} fill="#EEE" />
              </>
            )}
            <text
              x={0}
              y={isCta ? 8 : -20}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={800}
              fontSize={isCta ? 20 : 24}
              fill={isCta ? "white" : "#CCC"}
            >
              {sl.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// CTA CARD — "WATCH THE FULL VIDEO" + "Claude Creatives"
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

  const fadeOut = interpolate(frame, [48, 60], [1, 0], {
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
          gap: 14,
          padding: "28px 40px",
          borderRadius: 28,
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          width: 680,
        }}
      >
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
            fontSize: 22,
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

// ═══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════════
export const Clip4Carousel54Cents: React.FC<{
  videoSrc?: string;
}> = ({
  videoSrc = "videos/2026-03-02-claude-creatives/clip-04-ai-generated-six-slide-carousel-54-cents.mp4",
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
      {/* ── BASE: Speaker video with zoom ─────────────────────── */}
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
          volume={1}
        />
      </div>

      {/* ── HOOK FLASH (orange burst, frames 0-3) ─────────────── */}
      {hookFlash > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#FF6B00",
            opacity: hookFlash,
            zIndex: 50,
          }}
        />
      )}

      {/* ═════ ALL ConceptOverlay B-ROLL MOMENTS ═══════════════ */}

      {/* 1. "triggered the carousel generator skill" — frame 170, 55f */}
      <Sequence from={170} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<CarouselGeneratorIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 2. "broke down... all of the prompts" — frame 432, 55f */}
      <Sequence from={432} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<SlidePromptsIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 3. "key.ai nano banana pro" — frame 623, 55f */}
      <Sequence from={623} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<AIImageModelIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 4. "54 cents of a dollar" — frame 1192, 65f (HERO STAT) */}
      <Sequence from={1192} durationInFrames={65} premountFor={15}>
        <ConceptOverlay
          durationInFrames={65}
          illustration={<FiftyCentsIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 5. "store... output inside the right folder" — frame 1650, 55f */}
      <Sequence from={1650} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<StoredProperlyIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 6. "six with a call to action" — frame 2339, 55f */}
      <Sequence from={2339} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<SixSlidesIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ═════ CTA CARD ════════════════════════════════════════ */}
      <Sequence from={2400} durationInFrames={60} premountFor={15}>
        <CTACard />
      </Sequence>

      {/* ═════ WORD-BY-WORD CAPTIONS (bottom 28%) ═════════════ */}
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

      {/* ═════ SFX LAYER ════════════════════════════════════════ */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={15}>
          <Audio
            src={staticFile(sfx.src)}
            volume={sfx.volume}
            startFrom={0}
          />
        </Sequence>
      ))}

      {/* ═════ BACKGROUND MUSIC (first 35s only, 0.02 volume) ═ */}
      <Audio
        src={staticFile("audio/background-music.mp3")}
        volume={0.02}
        startFrom={0}
        endAt={1050}
      />
    </AbsoluteFill>
  );
};
