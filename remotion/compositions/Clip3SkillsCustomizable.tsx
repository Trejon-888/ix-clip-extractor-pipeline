/**
 * Clip 3: Skills Are Fully Customizable — Pipeline Composition
 *
 * STORY: Skills are fully customizable to your needs — pixel art carousels,
 * 10-page documents, upside-down thumbnails with Claude logo. The initial
 * phases gather context about you, then AI takes action on your behalf.
 *
 * SOURCE: Pipeline clip from "Claude Creatives" series
 * CTA: "WATCH THE FULL VIDEO" — Claude Creatives
 * Duration: 89s (2670 frames @ 30fps)
 *
 * POP-OUTS (6 ConceptOverlay + 1 CTA):
 *   1. "CUSTOMIZABLE SKILLS"  (frame  448, 60f) — skills as customizable
 *   2. "PIXEL ART CAROUSEL"   (frame  641, 60f) — carousel generator with pixel art style
 *   3. "10-PAGE DOCUMENT"     (frame 1005, 60f) — organized educational document
 *   4. "CREATIVE FREEDOM"     (frame 1440, 60f) — thumbnail upside down with Claude logo
 *   5. "GATHERING CONTEXT"    (frame 2081, 60f) — phases gather info about you
 *   6. "AI TAKES ACTION"      (frame 2412, 60f) — AI takes action on your behalf
 *   CTA: WATCH THE FULL VIDEO (frame 2610, 60f)
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
import { WORDS } from "../data/clip3-skills-customizable-words";

const { fontFamily } = loadFont();

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════
const TOTAL_FRAMES = 2670; // 89s x 30fps

// Flat zoom — no shake/swim
function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 448, end: 508 },   // Customizable Skills
  { start: 641, end: 701 },   // Pixel Art Carousel
  { start: 1005, end: 1065 }, // 10-Page Document
  { start: 1440, end: 1500 }, // Creative Freedom
  { start: 2081, end: 2141 }, // Gathering Context
  { start: 2412, end: 2472 }, // AI Takes Action
  { start: 2610, end: 2670 }, // CTA
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS — J-cut: audio 2-3 frames BEFORE visual
// Cycle through 4 types, never repeat consecutive
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  // Hook burst
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  // Customizable Skills
  { frame: 446, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // Pixel Art Carousel
  { frame: 639, src: "audio/pop-402324.mp3", volume: 0.20 },
  // 10-Page Document
  { frame: 1003, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  // Creative Freedom
  { frame: 1438, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  // Gathering Context
  { frame: 2079, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // AI Takes Action
  { frame: 2410, src: "audio/pop-402324.mp3", volume: 0.20 },
  // CTA
  { frame: 2608, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.16 },
];

// ═══════════════════════════════════════════════════════════════
// 1. CUSTOMIZABLE SKILLS — Sliders + toggles showing flexibility
// ═══════════════════════════════════════════════════════════════
const CustomizableSkillsIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const sliders = [
    { label: "STYLE", value: 0.85, delay: 3 },
    { label: "FORMAT", value: 0.6, delay: 7 },
    { label: "TONE", value: 0.75, delay: 11 },
  ];

  const gearRotate = frame * 1.2;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28 * s,
      }}
    >
      {/* Gear icon */}
      <svg
        width={120 * s}
        height={120 * s}
        viewBox="0 0 120 120"
        fill="none"
        style={{ transform: `rotate(${gearRotate}deg)` }}
      >
        <circle cx={60} cy={60} r={28} fill="#FF7614" />
        <circle cx={60} cy={60} r={15} fill="#FFFFFF" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 60 + Math.cos(rad) * 32;
          const y1 = 60 + Math.sin(rad) * 32;
          const x2 = 60 + Math.cos(rad) * 48;
          const y2 = 60 + Math.sin(rad) * 48;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FF7614"
              strokeWidth={10}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Sliders */}
      <div
        style={{
          width: 400 * s,
          display: "flex",
          flexDirection: "column",
          gap: 20 * s,
        }}
      >
        {sliders.map((sl, i) => {
          const progress = spring({
            frame: Math.max(0, frame - sl.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 14, stiffness: 80 },
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14 * s,
                opacity: progress,
              }}
            >
              <div
                style={{
                  width: 90 * s,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 14 * s,
                  color: "#888",
                  letterSpacing: 1.5,
                  textAlign: "right",
                }}
              >
                {sl.label}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 12 * s,
                  borderRadius: 6 * s,
                  backgroundColor: "#F0F0F0",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progress * sl.value * 100}%`,
                    height: "100%",
                    borderRadius: 6 * s,
                    backgroundColor: "#FF7614",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -4 * s,
                    left: `${progress * sl.value * 100}%`,
                    width: 20 * s,
                    height: 20 * s,
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    border: `3px solid #FF7614`,
                    transform: "translateX(-50%)",
                    boxShadow: `0 2px ${6 * s}px rgba(0,0,0,0.15)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. PIXEL ART CAROUSEL — Stacked pixel-art slide cards
// ═══════════════════════════════════════════════════════════════
const PixelArtCarouselIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const slides = [
    { x: -120, delay: 0, color: "#FFE4CC" },
    { x: -60, delay: 4, color: "#FFD1A3" },
    { x: 0, delay: 8, color: "#FFC080" },
    { x: 60, delay: 12, color: "#FFAD5C" },
    { x: 120, delay: 16, color: "#FF9A33" },
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
      {slides.map((slide, i) => {
        const enter = spring({
          frame: Math.max(0, frame - slide.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 140 },
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 140 * s,
              height: 180 * s,
              borderRadius: 16 * s,
              backgroundColor: slide.color,
              border: `3px solid rgba(0,0,0,0.06)`,
              transform: `translateX(${slide.x * s * enter}px) scale(${enter})`,
              opacity: enter,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10 * s,
              boxShadow: `0 4px ${12 * s}px rgba(0,0,0,0.08)`,
            }}
          >
            {/* Pixel art grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(4, ${14 * s}px)`,
                gap: 3 * s,
              }}
            >
              {Array.from({ length: 16 }).map((_, j) => (
                <div
                  key={j}
                  style={{
                    width: 14 * s,
                    height: 14 * s,
                    borderRadius: 2 * s,
                    backgroundColor:
                      j % 3 === 0
                        ? "#FF7614"
                        : j % 5 === 0
                          ? "#1A1A1A"
                          : "#FFFFFF",
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 13 * s,
                color: "#1A1A1A",
                letterSpacing: 1,
              }}
            >
              SLIDE {i + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. 10-PAGE DOCUMENT — Stacked document pages with text lines
// ═══════════════════════════════════════════════════════════════
const TenPageDocumentIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const pageEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const countUp = Math.min(10, Math.floor(frame * 0.6));

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20 * s,
      }}
    >
      {/* Stacked pages */}
      <div style={{ position: "relative", width: 280 * s, height: 340 * s }}>
        {[2, 1, 0].map((offset) => {
          const layerEnter = spring({
            frame: Math.max(0, frame - offset * 4),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 14, stiffness: 120 },
          });

          return (
            <div
              key={offset}
              style={{
                position: "absolute",
                top: offset * 6 * s,
                left: offset * 6 * s,
                width: 260 * s,
                height: 320 * s,
                borderRadius: 12 * s,
                backgroundColor: offset === 0 ? "#FFFFFF" : "#F5F5F5",
                border: "2px solid #E5E5E5",
                boxShadow: `0 ${4 * s}px ${16 * s}px rgba(0,0,0,0.06)`,
                transform: `scale(${layerEnter})`,
                opacity: layerEnter,
                display: "flex",
                flexDirection: "column",
                padding: 24 * s,
                gap: 12 * s,
              }}
            >
              {offset === 0 && (
                <>
                  {/* Title line */}
                  <div
                    style={{
                      width: "70%",
                      height: 14 * s,
                      borderRadius: 4 * s,
                      backgroundColor: "#FF7614",
                      opacity: pageEnter,
                    }}
                  />
                  {/* Body lines */}
                  {[0.9, 0.75, 0.85, 0.6, 0.8, 0.7].map((w, li) => (
                    <div
                      key={li}
                      style={{
                        width: `${w * 100}%`,
                        height: 8 * s,
                        borderRadius: 3 * s,
                        backgroundColor: "#E8E8E8",
                        opacity: pageEnter,
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Page counter badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8 * s,
          opacity: pageEnter,
        }}
      >
        <div
          style={{
            width: 48 * s,
            height: 48 * s,
            borderRadius: "50%",
            backgroundColor: "#FF7614",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 22 * s,
            color: "#FFFFFF",
            transform: `scale(${pageEnter})`,
          }}
        >
          {countUp}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 18 * s,
            color: "#666",
            letterSpacing: 1.5,
          }}
        >
          PAGES
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. CREATIVE FREEDOM — Upside-down person + Claude logo
// ═══════════════════════════════════════════════════════════════
const CreativeFreedomIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const enter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 130 },
  });

  const flipAngle = interpolate(enter, [0, 1], [0, 180]);

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
      {/* Thumbnail frame with upside-down silhouette */}
      <div
        style={{
          width: 340 * s,
          height: 220 * s,
          borderRadius: 18 * s,
          backgroundColor: "#F8F8F8",
          border: "3px solid #E5E5E5",
          boxShadow: `0 ${8 * s}px ${28 * s}px rgba(0,0,0,0.08)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          transform: `scale(${enter})`,
        }}
      >
        {/* Person silhouette — flipped upside down */}
        <svg
          width={120 * s}
          height={160 * s}
          viewBox="0 0 120 160"
          fill="none"
          style={{ transform: `rotate(${flipAngle}deg)` }}
        >
          <circle cx={60} cy={35} r={25} fill="#333" />
          <path
            d="M30 155 Q60 80 90 155"
            fill="#333"
            stroke="none"
          />
        </svg>

        {/* Claude logo overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 12 * s,
            right: 12 * s,
            opacity: enter,
            transform: `scale(${enter})`,
          }}
        >
          <Img
            src={staticFile("logos/claude-ai-icon.svg")}
            style={{
              width: 52 * s,
              height: 52 * s,
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))",
            }}
          />
        </div>
      </div>

      {/* Fun badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10 * s,
          padding: `${8 * s}px ${22 * s}px`,
          borderRadius: 20 * s,
          backgroundColor: "#FFF3E6",
          border: "2px solid #FFD9B3",
          opacity: enter,
          transform: `translateY(${interpolate(enter, [0, 1], [12, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: 16 * s,
            color: "#FF7614",
            letterSpacing: 1.5,
          }}
        >
          YOUR THUMBNAIL, YOUR WAY
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. GATHERING CONTEXT — Funnel collecting data points
// ═══════════════════════════════════════════════════════════════
const GatheringContextIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const dataPoints = [
    { label: "Brand", x: -100, y: -80, delay: 0 },
    { label: "Style", x: 100, y: -80, delay: 3 },
    { label: "Goals", x: -80, y: -20, delay: 6 },
    { label: "Audience", x: 80, y: -20, delay: 9 },
    { label: "Format", x: 0, y: -110, delay: 12 },
  ];

  const funnelEnter = spring({
    frame: Math.max(0, frame - 2),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
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
        width={size}
        height={size}
        viewBox="0 0 600 600"
        fill="none"
      >
        {/* Funnel shape */}
        <g opacity={funnelEnter}>
          <path
            d="M160 220 L440 220 L340 420 L260 420 Z"
            fill="#FFF3E6"
            stroke="#FF7614"
            strokeWidth={3}
          />
          <rect
            x={260}
            y={420}
            width={80}
            height={40}
            rx={8}
            fill="#FF7614"
          />
          <text
            x={300}
            y={447}
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight={800}
            fontSize={16}
            fill="#FFFFFF"
          >
            CONTEXT
          </text>
        </g>

        {/* Data points floating into funnel */}
        {dataPoints.map((dp, i) => {
          const enter = spring({
            frame: Math.max(0, frame - dp.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 160 },
          });

          const floatDown = interpolate(
            Math.max(0, frame - dp.delay - 10),
            [0, 20],
            [0, 40],
            { extrapolateRight: "clamp" }
          );

          return (
            <g
              key={i}
              opacity={enter}
              transform={`translate(${300 + dp.x * enter}, ${260 + dp.y * enter + floatDown})`}
            >
              <rect
                x={-40}
                y={-14}
                width={80}
                height={28}
                rx={14}
                fill="#FFFFFF"
                stroke="#E5E5E5"
                strokeWidth={2}
              />
              <text
                x={0}
                y={5}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontWeight={700}
                fontSize={12}
                fill="#666"
              >
                {dp.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. AI TAKES ACTION — Robot hand pressing "Execute" button
// ═══════════════════════════════════════════════════════════════
const AITakesActionIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const enter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 130 },
  });

  const pressDown = spring({
    frame: Math.max(0, frame - 12),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 16, stiffness: 200 },
  });

  const rippleScale = spring({
    frame: Math.max(0, frame - 16),
    fps: 30,
    from: 0,
    to: 2.5,
    config: { damping: 20, stiffness: 60 },
  });

  const rippleOpacity = interpolate(rippleScale, [0, 2.5], [0.5, 0]);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20 * s,
      }}
    >
      {/* AI Badge */}
      <div
        style={{
          width: 90 * s,
          height: 90 * s,
          borderRadius: "50%",
          backgroundColor: "#FF7614",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${enter})`,
          boxShadow: `0 ${6 * s}px ${20 * s}px rgba(255,118,20,0.3)`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 32 * s,
            color: "#FFFFFF",
            letterSpacing: 2,
          }}
        >
          AI
        </div>
      </div>

      {/* Execute button */}
      <div style={{ position: "relative" }}>
        {/* Ripple effect */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 200 * s,
            height: 60 * s,
            borderRadius: 30 * s,
            border: `3px solid #FF7614`,
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />

        <div
          style={{
            padding: `${18 * s}px ${48 * s}px`,
            borderRadius: 16 * s,
            backgroundColor: pressDown > 0.5 ? "#E06610" : "#FF7614",
            transform: `scale(${enter}) translateY(${pressDown * 4 * s}px)`,
            boxShadow: pressDown > 0.5
              ? `0 ${2 * s}px ${8 * s}px rgba(0,0,0,0.2)`
              : `0 ${6 * s}px ${20 * s}px rgba(255,118,20,0.35)`,
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: 26 * s,
              color: "#FFFFFF",
              letterSpacing: 3,
            }}
          >
            EXECUTE
          </div>
        </div>
      </div>

      {/* Result items */}
      <div
        style={{
          display: "flex",
          gap: 16 * s,
          marginTop: 10 * s,
        }}
      >
        {["Carousel", "Document", "Thumbnail"].map((item, i) => {
          const itemEnter = spring({
            frame: Math.max(0, frame - 18 - i * 4),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 140 },
          });

          return (
            <div
              key={i}
              style={{
                padding: `${8 * s}px ${16 * s}px`,
                borderRadius: 10 * s,
                backgroundColor: "#F0FFF0",
                border: "2px solid #BBF7D0",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 14 * s,
                color: "#15803D",
                letterSpacing: 1,
                opacity: itemEnter,
                transform: `translateY(${interpolate(itemEnter, [0, 1], [10, 0])}px)`,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// CTA CARD — "WATCH THE FULL VIDEO" + Claude Creatives
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
export const Clip3SkillsCustomizable: React.FC<{
  videoSrc?: string;
}> = ({
  videoSrc = "videos/2026-03-02-claude-creatives/clip-03-ai-skills-fully-customizable-to-your-needs.mp4",
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

      {/* ═════ 1. CUSTOMIZABLE SKILLS — frame 448, 60f ═══════════ */}
      <Sequence from={448} durationInFrames={60} premountFor={15}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<CustomizableSkillsIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ═════ 2. PIXEL ART CAROUSEL — frame 641, 60f ════════════ */}
      <Sequence from={641} durationInFrames={60} premountFor={15}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<PixelArtCarouselIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ═════ 3. 10-PAGE DOCUMENT — frame 1005, 60f ═════════════ */}
      <Sequence from={1005} durationInFrames={60} premountFor={15}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<TenPageDocumentIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ═════ 4. CREATIVE FREEDOM — frame 1440, 60f ═════════════ */}
      <Sequence from={1440} durationInFrames={60} premountFor={15}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<CreativeFreedomIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ═════ 5. GATHERING CONTEXT — frame 2081, 60f ════════════ */}
      <Sequence from={2081} durationInFrames={60} premountFor={15}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<GatheringContextIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ═════ 6. AI TAKES ACTION — frame 2412, 60f ══════════════ */}
      <Sequence from={2412} durationInFrames={60} premountFor={15}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<AITakesActionIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ═════ CTA — frame 2610, 60f ═════════════════════════════ */}
      <Sequence from={2610} durationInFrames={60} premountFor={15}>
        <CTACard />
      </Sequence>

      {/* ═════ WORD-BY-WORD CAPTIONS (bottom 28%) ═════════════════ */}
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

      {/* ═════ SFX LAYER ════════════════════════════════════════════ */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={15}>
          <Audio
            src={staticFile(sfx.src)}
            volume={sfx.volume}
            startFrom={0}
          />
        </Sequence>
      ))}

      {/* ═════ BACKGROUND MUSIC ═════════════════════════════════════ */}
      <Audio
        src={staticFile("audio/background-music.mp3")}
        volume={0.02}
        startFrom={0}
        endAt={TOTAL_FRAMES}
      />
    </AbsoluteFill>
  );
};
