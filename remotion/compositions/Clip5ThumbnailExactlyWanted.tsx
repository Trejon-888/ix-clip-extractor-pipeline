/**
 * Clip 5: Thumbnail — AI Created Exactly What I Wanted
 *
 * STORY: Submitted one prompt, AI triggered thumbnail creator skill,
 * Claude caught an image storage issue, solved it with IMGBB,
 * and delivered the exact thumbnail wanted. "My guy is the goat."
 *
 * SOURCE: Pipeline clip with burned-in auto-captions
 * CTA: "WATCH THE FULL VIDEO" — Claude Creatives
 * Duration: 96s (2880 frames @ 30fps, word data extends to 3007)
 *
 * POP-OUTS (7 ConceptOverlay + 1 CTA):
 *   1. "SUBMIT & MAGIC" (frame 162, 75f) — Submit prompt, see the magic
 *   2. "THUMBNAIL CREATOR" (frame 347, 65f) — Triggered thumbnail creator skill
 *   3. "CLAUDE CAUGHT IT" (frame 485, 70f) — Claude stopped me about image refs
 *   4. "IMAGES NOT STORED" (frame 837, 65f) — Images not stored anywhere
 *   5. "IMAGE HOSTING FIX" (frame 1489, 75f) — Solution with IMGBB temporary hosting
 *   6. "THUMBNAIL READY" (frame 2008, 70f) — Thumbnail is ready
 *   7. "THE GOAT" (frame 2447, 75f) — Created exactly what I wanted (emotional peak)
 *   8. CTA (frame 2930, 65f) — "WATCH THE FULL VIDEO" — Claude Creatives
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

import { WORDS } from "../data/clip5-thumbnail-exactly-wanted-words";

const { fontFamily } = loadFont();

// ===================================================================
// CONSTANTS
// ===================================================================
const TOTAL_FRAMES = 3007; // from word data (99.2s)

// Flat zoom -- no shaking/swimming
function getZoom(_frame: number): number {
  return 1.0;
}

// ===================================================================
// Concept overlay frame ranges (captions hidden during these)
// ===================================================================
const CONCEPT_RANGES = [
  { start: 162, end: 237 },   // Submit & Magic
  { start: 347, end: 412 },   // Thumbnail Creator
  { start: 485, end: 555 },   // Claude Caught It
  { start: 837, end: 902 },   // Images Not Stored
  { start: 1489, end: 1564 }, // Image Hosting Fix
  { start: 2008, end: 2078 }, // Thumbnail Ready
  { start: 2447, end: 2522 }, // The GOAT
  { start: 2930, end: 2995 }, // CTA
];

// ===================================================================
// SFX EVENTS (J-cut: audio 2-3 frames BEFORE visual)
// No consecutive repeats of the same SFX
// ===================================================================
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  // Hook burst
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  // Submit & Magic
  { frame: 160, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // Thumbnail Creator
  { frame: 345, src: "audio/pop-402324.mp3", volume: 0.20 },
  // Claude Caught It
  { frame: 483, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  // Images Not Stored
  { frame: 835, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // Image Hosting Fix
  { frame: 1487, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.20 },
  // Thumbnail Ready
  { frame: 2006, src: "audio/pop-402324.mp3", volume: 0.22 },
  // The GOAT
  { frame: 2445, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  // CTA
  { frame: 2928, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
];

// ===================================================================
// 1. SUBMIT & MAGIC ILLUSTRATION — Wand with sparkle burst
// ===================================================================
const SubmitMagicIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const wandEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 160 },
  });

  const sparkles = [
    { cx: 320, cy: 140, r: 8, delay: 5 },
    { cx: 380, cy: 180, r: 6, delay: 8 },
    { cx: 260, cy: 200, r: 7, delay: 11 },
    { cx: 400, cy: 260, r: 5, delay: 14 },
    { cx: 220, cy: 160, r: 6, delay: 7 },
    { cx: 340, cy: 100, r: 5, delay: 10 },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      style={{ transform: `scale(${s})` }}
    >
      {/* Wand body */}
      <g
        opacity={wandEnter}
        transform={`rotate(-30, 300, 300) scale(${wandEnter})`}
        style={{ transformOrigin: "300px 300px" }}
      >
        <rect
          x={270}
          y={200}
          width={16}
          height={220}
          rx={8}
          fill="#1A1A1A"
        />
        <rect
          x={270}
          y={200}
          width={16}
          height={40}
          rx={4}
          fill="#FF7614"
        />
        {/* Glow at tip */}
        <circle cx={278} cy={200} r={20} fill="#FF7614" opacity={0.3} />
        <circle cx={278} cy={200} r={12} fill="#FF7614" opacity={0.6} />
      </g>

      {/* Sparkles */}
      {sparkles.map((sp, i) => {
        const sparkleScale = spring({
          frame: Math.max(0, frame - sp.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 8, stiffness: 200 },
        });

        const pulse = interpolate(
          (frame + sp.delay * 3) % 24,
          [0, 12, 24],
          [0.7, 1.0, 0.7]
        );

        return (
          <g key={i} opacity={sparkleScale * pulse}>
            {/* Four-point star */}
            <path
              d={`M${sp.cx} ${sp.cy - sp.r * 2} L${sp.cx + sp.r * 0.4} ${sp.cy} L${sp.cx} ${sp.cy + sp.r * 2} L${sp.cx - sp.r * 0.4} ${sp.cy} Z`}
              fill="#FF7614"
            />
            <path
              d={`M${sp.cx - sp.r * 2} ${sp.cy} L${sp.cx} ${sp.cy - sp.r * 0.4} L${sp.cx + sp.r * 2} ${sp.cy} L${sp.cx} ${sp.cy + sp.r * 0.4} Z`}
              fill="#FF7614"
            />
          </g>
        );
      })}

      {/* "SUBMIT" button shape */}
      <g opacity={wandEnter}>
        <rect
          x={180}
          y={420}
          width={240}
          height={60}
          rx={30}
          fill="#FF7614"
          stroke="#E06610"
          strokeWidth={2}
        />
        <text
          x={300}
          y={458}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight={800}
          fontSize={24}
          fill="white"
          letterSpacing={3}
        >
          SUBMIT
        </text>
      </g>
    </svg>
  );
};

// ===================================================================
// 2. THUMBNAIL CREATOR ILLUSTRATION — Skill badge with trigger arrow
// ===================================================================
const ThumbnailCreatorIllustration: React.FC<{ size?: number }> = ({
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

  const arrowSlide = spring({
    frame: Math.max(0, frame - 6),
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24 * s,
      }}
    >
      {/* Skill badge */}
      <div
        style={{
          width: 300 * s,
          height: 300 * s,
          borderRadius: 40 * s,
          backgroundColor: "#F8F8F8",
          border: "3px solid #FF7614",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16 * s,
          transform: `scale(${badgeEnter})`,
          boxShadow: `0 ${8 * s}px ${32 * s}px rgba(255,118,20,0.15)`,
        }}
      >
        {/* Image icon */}
        <svg
          width={80 * s}
          height={80 * s}
          viewBox="0 0 80 80"
          fill="none"
        >
          <rect
            x={8}
            y={12}
            width={64}
            height={56}
            rx={8}
            stroke="#FF7614"
            strokeWidth={4}
            fill="none"
          />
          <circle cx={28} cy={32} r={8} fill="#FF7614" opacity={0.6} />
          <path
            d="M8 56L28 38L44 52L56 42L72 56"
            stroke="#FF7614"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: 18 * s,
            color: "#1A1A1A",
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          THUMBNAIL
          <br />
          CREATOR
        </div>
      </div>

      {/* Trigger arrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10 * s,
          opacity: arrowSlide,
          transform: `translateX(${interpolate(arrowSlide, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 16 * s,
            color: "#888",
            letterSpacing: 2,
          }}
        >
          SKILL TRIGGERED
        </div>
        <svg width={24 * s} height={24 * s} viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            stroke="#FF7614"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

// ===================================================================
// 3. CLAUDE CAUGHT IT ILLUSTRATION — Shield with alert/eye
// ===================================================================
const ClaudeCaughtItIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const shieldEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 160 },
  });

  const alertPulse = interpolate(frame % 30, [0, 15, 30], [1.0, 1.08, 1.0]);

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
      {/* Shield */}
      <div style={{ transform: `scale(${shieldEnter * alertPulse})` }}>
        <svg
          width={200 * s}
          height={240 * s}
          viewBox="0 0 200 240"
          fill="none"
        >
          {/* Shield shape */}
          <path
            d="M100 12L24 52V120C24 172 60 216 100 232C140 216 176 172 176 120V52L100 12Z"
            fill="#FF7614"
            stroke="#E06610"
            strokeWidth={3}
          />
          {/* Eye icon inside */}
          <ellipse
            cx={100}
            cy={120}
            rx={40}
            ry={28}
            stroke="white"
            strokeWidth={4}
            fill="none"
          />
          <circle cx={100} cy={120} r={14} fill="white" />
          <circle cx={100} cy={120} r={7} fill="#E06610" />
        </svg>
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 18 * s,
          color: "#991B1B",
          letterSpacing: 2,
          backgroundColor: "#FEF2F2",
          padding: `${10 * s}px ${24 * s}px`,
          borderRadius: 12 * s,
          border: "2px solid #FECACA",
          opacity: shieldEnter,
        }}
      >
        ISSUE DETECTED
      </div>
    </div>
  );
};

// ===================================================================
// 4. IMAGES NOT STORED ILLUSTRATION — Broken cloud / missing files
// ===================================================================
const ImagesNotStoredIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const cloudEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const items = [
    { label: "face.jpg", delay: 5 },
    { label: "logo.png", delay: 10 },
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
        gap: 28 * s,
      }}
    >
      {/* Cloud with X */}
      <div style={{ transform: `scale(${cloudEnter})`, position: "relative" }}>
        <svg
          width={200 * s}
          height={140 * s}
          viewBox="0 0 200 140"
          fill="none"
        >
          <path
            d="M160 130H50C28 130 10 112 10 90C10 72 22 56 40 50C40 26 60 6 84 6C104 6 122 18 128 36C134 32 142 30 150 30C174 30 194 50 194 74C194 96 178 114 158 118"
            stroke="#CCCCCC"
            strokeWidth={4}
            strokeDasharray="8 6"
            fill="none"
          />
          {/* Red X over cloud */}
          <circle cx={100} cy={70} r={28} fill="#EF4444" opacity={0.9} />
          <path
            d="M88 58L112 82M112 58L88 82"
            stroke="white"
            strokeWidth={4}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Missing file items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12 * s,
          width: 320 * s,
        }}
      >
        {items.map((item, i) => {
          const itemEnter = spring({
            frame: Math.max(0, frame - item.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 160 },
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12 * s,
                padding: `${12 * s}px ${18 * s}px`,
                borderRadius: 12 * s,
                backgroundColor: "#FEF2F2",
                border: "2px solid #FECACA",
                opacity: itemEnter,
                transform: `translateX(${interpolate(itemEnter, [0, 1], [15, 0])}px)`,
              }}
            >
              <svg
                width={20 * s}
                height={20 * s}
                viewBox="0 0 20 20"
                fill="none"
              >
                <rect
                  x={2}
                  y={2}
                  width={16}
                  height={16}
                  rx={3}
                  stroke="#EF4444"
                  strokeWidth={2}
                  fill="none"
                />
                <path
                  d="M7 7L13 13M13 7L7 13"
                  stroke="#EF4444"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              </svg>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 18 * s,
                  color: "#991B1B",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 14 * s,
                  color: "#DC2626",
                  marginLeft: "auto",
                }}
              >
                NOT FOUND
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ===================================================================
// 5. IMAGE HOSTING FIX ILLUSTRATION — Cloud upload with IMGBB
// ===================================================================
const ImageHostingFixIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const cloudEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const arrowProgress = spring({
    frame: Math.max(0, frame - 8),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  const checkEnter = spring({
    frame: Math.max(0, frame - 14),
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24 * s,
      }}
    >
      {/* Cloud with upload arrow */}
      <div style={{ transform: `scale(${cloudEnter})` }}>
        <svg
          width={220 * s}
          height={160 * s}
          viewBox="0 0 220 160"
          fill="none"
        >
          <path
            d="M170 140H55C30 140 10 120 10 95C10 74 24 56 44 50C44 24 66 4 92 4C114 4 134 18 140 38C146 34 154 32 162 32C188 32 210 54 210 80C210 104 192 124 170 128"
            fill="#F0F0F0"
            stroke="#FF7614"
            strokeWidth={3}
          />
          {/* Upload arrow */}
          <g
            opacity={arrowProgress}
            transform={`translate(0, ${interpolate(arrowProgress, [0, 1], [10, 0])})`}
          >
            <path
              d="M110 110V60"
              stroke="#FF7614"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <path
              d="M90 80L110 60L130 80"
              stroke="#FF7614"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      {/* IMGBB label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12 * s,
          padding: `${14 * s}px ${28 * s}px`,
          borderRadius: 16 * s,
          backgroundColor: "#FFF7ED",
          border: "2px solid #FDBA74",
          opacity: arrowProgress,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: 22 * s,
            color: "#1A1A1A",
            letterSpacing: 1,
          }}
        >
          IMGBB
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 16 * s,
            color: "#888",
          }}
        >
          Temporary Hosting
        </div>
      </div>

      {/* Green checkmark */}
      <div
        style={{
          transform: `scale(${checkEnter})`,
          opacity: checkEnter,
        }}
      >
        <svg
          width={48 * s}
          height={48 * s}
          viewBox="0 0 48 48"
          fill="none"
        >
          <circle cx={24} cy={24} r={22} fill="#10B981" />
          <path
            d="M14 24L21 31L34 18"
            stroke="white"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

// ===================================================================
// 6. THUMBNAIL READY ILLUSTRATION — Framed image with checkmark
// ===================================================================
const ThumbnailReadyIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const frameEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const checkBounce = spring({
    frame: Math.max(0, frame - 10),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 200 },
  });

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
      {/* Thumbnail frame preview */}
      <div
        style={{
          width: 360 * s,
          height: 200 * s,
          borderRadius: 20 * s,
          backgroundColor: "#F0F0F0",
          border: "4px solid #FF7614",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          transform: `scale(${frameEnter})`,
          boxShadow: `0 ${8 * s}px ${32 * s}px rgba(0,0,0,0.12)`,
          overflow: "hidden",
        }}
      >
        {/* Simulated thumbnail content */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, #FF7614 0%, #FF9500 40%, #FFB800 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Face circle placeholder */}
          <div
            style={{
              width: 80 * s,
              height: 80 * s,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.3)",
              border: "3px solid rgba(255,255,255,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={36 * s}
              height={36 * s}
              viewBox="0 0 36 36"
              fill="none"
            >
              <circle cx={18} cy={14} r={8} fill="rgba(255,255,255,0.7)" />
              <path
                d="M4 34C4 26 10 20 18 20C26 20 32 26 32 34"
                fill="rgba(255,255,255,0.7)"
              />
            </svg>
          </div>
        </div>

        {/* Checkmark badge */}
        <div
          style={{
            position: "absolute",
            bottom: -8 * s,
            right: -8 * s,
            width: 56 * s,
            height: 56 * s,
            borderRadius: "50%",
            backgroundColor: "#10B981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${checkBounce})`,
            boxShadow: `0 ${4 * s}px ${16 * s}px rgba(16,185,129,0.4)`,
            border: "3px solid white",
          }}
        >
          <svg
            width={28 * s}
            height={28 * s}
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M7 14L12 19L21 10"
              stroke="white"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* "READY" badge */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: 20 * s,
          color: "#10B981",
          letterSpacing: 3,
          opacity: checkBounce,
        }}
      >
        OUTPUT READY
      </div>
    </div>
  );
};

// ===================================================================
// 7. THE GOAT ILLUSTRATION — Trophy with crown + stars
// ===================================================================
const TheGoatIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const trophyEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 160 },
  });

  const crownBounce = spring({
    frame: Math.max(0, frame - 6),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 200 },
  });

  const shimmer = interpolate(frame % 40, [0, 20, 40], [0.6, 1.0, 0.6]);

  const stars = [
    { cx: 160, cy: 120, delay: 8 },
    { cx: 440, cy: 140, delay: 12 },
    { cx: 200, cy: 380, delay: 16 },
    { cx: 400, cy: 400, delay: 10 },
    { cx: 130, cy: 260, delay: 14 },
    { cx: 470, cy: 280, delay: 18 },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
    >
      {/* Trophy */}
      <g
        opacity={trophyEnter}
        transform={`translate(300, 320) scale(${trophyEnter}) translate(-300, -320)`}
      >
        {/* Cup body */}
        <path
          d="M220 220H380V340C380 388 344 420 300 420C256 420 220 388 220 340V220Z"
          fill="#FF7614"
          stroke="#E06610"
          strokeWidth={3}
        />
        {/* Cup handles */}
        <path
          d="M220 260C200 260 180 280 180 300C180 320 200 340 220 340"
          stroke="#E06610"
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M380 260C400 260 420 280 420 300C420 320 400 340 380 340"
          stroke="#E06610"
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
        />
        {/* Stem */}
        <rect x={285} y={420} width={30} height={40} fill="#E06610" />
        {/* Base */}
        <rect
          x={240}
          y={460}
          width={120}
          height={20}
          rx={6}
          fill="#E06610"
        />
        {/* GOAT text on trophy */}
        <text
          x={300}
          y={335}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight={900}
          fontSize={48}
          fill="white"
          letterSpacing={6}
        >
          G.O.A.T
        </text>
      </g>

      {/* Crown above trophy */}
      <g
        opacity={crownBounce}
        transform={`translate(300, 170) scale(${crownBounce}) translate(-300, -170)`}
      >
        <path
          d="M240 200L260 160L300 190L340 160L360 200Z"
          fill="#FFB800"
          stroke="#E09900"
          strokeWidth={2.5}
        />
        <circle cx={260} cy={155} r={6} fill="#FFB800" />
        <circle cx={300} cy={185} r={6} fill="#FFB800" />
        <circle cx={340} cy={155} r={6} fill="#FFB800" />
      </g>

      {/* Sparkle stars */}
      {stars.map((star, i) => {
        const starScale = spring({
          frame: Math.max(0, frame - star.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 8, stiffness: 200 },
        });

        return (
          <g
            key={i}
            opacity={starScale * shimmer}
            transform={`translate(${star.cx}, ${star.cy}) scale(${starScale}) translate(${-star.cx}, ${-star.cy})`}
          >
            <path
              d={`M${star.cx} ${star.cy - 12} L${star.cx + 3} ${star.cy} L${star.cx} ${star.cy + 12} L${star.cx - 3} ${star.cy} Z`}
              fill="#FFB800"
            />
            <path
              d={`M${star.cx - 12} ${star.cy} L${star.cx} ${star.cy - 3} L${star.cx + 12} ${star.cy} L${star.cx} ${star.cy + 3} Z`}
              fill="#FFB800"
            />
          </g>
        );
      })}
    </svg>
  );
};

// ===================================================================
// CTA CARD — "WATCH THE FULL VIDEO" — Claude Creatives
// ===================================================================
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

  const fadeOut = interpolate(frame, [50, 62], [1, 0], {
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
        {/* Claude Code logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Img
            src={staticFile("logos/claude-code-terminal.webp")}
            style={{ width: 56, height: 56, borderRadius: 12 }}
          />
          <div
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 30,
              color: "#1A1A1A",
              letterSpacing: 1,
            }}
          >
            CLAUDE CREATIVES
          </div>
        </div>

        <div
          style={{
            width: 80,
            height: 3,
            backgroundColor: "#FF7614",
            borderRadius: 2,
          }}
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

        <div
          style={{
            fontFamily,
            fontWeight: 600,
            fontSize: 22,
            color: "#888",
            letterSpacing: 1,
          }}
        >
          AI Thumbnail Creation in Action
        </div>
      </div>
    </div>
  );
};

// ===================================================================
// MAIN COMPOSITION
// ===================================================================
export const Clip5ThumbnailExactlyWanted: React.FC<{
  videoSrc?: string;
}> = ({
  videoSrc = "videos/2026-03-02-claude-creatives/clip-05-thumbnail-ai-created-exactly-what-i-wanted.mp4",
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
      {/* -- BASE: Speaker video with zoom ----------------------- */}
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

      {/* -- HOOK FLASH (orange burst, frames 0-3) --------------- */}
      {hookFlash > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#FF6B00",
            opacity: hookFlash,
            zIndex: 50,
          }}
        />
      )}

      {/* ===== ALL ConceptOverlay B-ROLL MOMENTS ================ */}

      {/* 1. "submit the prompt and see the magic" -- frame 162, 75f */}
      <Sequence from={162} durationInFrames={75} premountFor={15}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<SubmitMagicIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 2. "trigger the skill... thumbnail creator" -- frame 347, 65f */}
      <Sequence from={347} durationInFrames={65} premountFor={15}>
        <ConceptOverlay
          durationInFrames={65}
          illustration={<ThumbnailCreatorIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 3. "Claude just stopped me" -- frame 485, 70f */}
      <Sequence from={485} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<ClaudeCaughtItIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 4. "not being stored anywhere" -- frame 837, 65f */}
      <Sequence from={837} durationInFrames={65} premountFor={15}>
        <ConceptOverlay
          durationInFrames={65}
          illustration={<ImagesNotStoredIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 5. "uploading those images into temporary hosting... IMGBB" -- frame 1489, 75f */}
      <Sequence from={1489} durationInFrames={75} premountFor={15}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<ImageHostingFixIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 6. "thumbnail is ready" -- frame 2008, 70f */}
      <Sequence from={2008} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<ThumbnailReadyIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 7. "my guy is the goat... created exactly what I wanted" -- frame 2447, 75f */}
      <Sequence from={2447} durationInFrames={75} premountFor={15}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<TheGoatIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ===== CTA ============================================== */}
      <Sequence from={2930} durationInFrames={65} premountFor={15}>
        <CTACard />
      </Sequence>

      {/* ===== WORD-BY-WORD CAPTIONS (bottom 28%) =============== */}
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

      {/* ===== SFX LAYER ======================================== */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={15}>
          <Audio
            src={staticFile(sfx.src)}
            volume={sfx.volume}
            startFrom={0}
          />
        </Sequence>
      ))}

      {/* ===== BACKGROUND MUSIC ================================= */}
      <Audio
        src={staticFile("audio/background-music.mp3")}
        volume={0.02}
        startFrom={0}
        endAt={1050}
      />
    </AbsoluteFill>
  );
};
