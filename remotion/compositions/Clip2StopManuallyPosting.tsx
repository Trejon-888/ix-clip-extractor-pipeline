/**
 * Clip 2: Stop Manually Posting — V5 Composition
 *
 * STORY: Live demo of posting a short-form video to YouTube, Instagram,
 * TikTok, and Threads using ONE voice prompt through Claude Code.
 *
 * SOURCE: Pipeline clip with burned-in auto-captions
 * CTA: "WATCH THE FULL VIDEO" + "Build Your AI Social Media Manager"
 * Duration: 78s (2340 frames @ 30fps)
 *
 * V5 CHANGES:
 *   - Individual platform popups (replacing grouped cluster) with per-platform SFX
 *   - 5 NEW ConceptOverlays in command section (seconds 14-31): SHORT FORM, YOUTUBE, TIKTOK, THREADS, INSTAGRAM
 *   - All illustrations BIGGER (illustrationSize 580-640)
 *   - Updated SFX: individual platform pops + 5 command section pops
 *   - Updated CONCEPT_RANGES and zoom keyframes
 *
 * ALL VISUALS:
 *   1. IndividualPlatformPopups (frame 66, 100f) — 4 platforms pop individually with SFX
 *   2. "ONE VOICE PROMPT" (frame 199, 65f) — microphone + platforms
 *   3. "HEY CLAUDE" (frame 430, 50f) — Claude wordmark
 *   4. "SHORT FORM VIDEO" (frame 489, 30f) — Phone with play button (NEW)
 *   5. "YOUTUBE SHORTS" (frame 546, 30f) — YouTube logo (NEW)
 *   6. "TIKTOK" (frame 579, 30f) — TikTok logo (NEW)
 *   7. "THREADS" (frame 626, 30f) — Threads logo (NEW)
 *   8. "INSTAGRAM" (frame 711, 30f) — Instagram logo (NEW)
 *   9. "SKILL TRIGGERED" (frame 925, 50f) — Gear illustration (BIGGER)
 *  10. "AUTO-GENERATED" (frame 1286, 160f) — Speech-synced metadata checklist
 *  11. "UNIQUE PER PLATFORM" (frame 1516, 70f) — 4 platform cards
 *  12. "CHECK & UPLOAD" (frame 1776, 170f) — File check + cloud upload
 *  13. "FULLY AUTOMATED" (frame 2075, 70f) — Pipeline illustration
 *  14. "VERIFIED" (frame 2240, 45f) — Green checkmark published
 *  CTA: frame 2290 with YouTube thumbnail + subtitle
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

import { OneVoicePromptIllustration } from "../lib/illustrations/OneVoicePromptIllustration";
import { UniquePerPlatformIllustration } from "../lib/illustrations/UniquePerPlatformIllustration";
import { FullyAutomatedIllustration } from "../lib/illustrations/FullyAutomatedIllustration";
import { WORDS } from "../data/clip2-stop-manually-posting-words";

const { fontFamily } = loadFont();

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════
const TOTAL_FRAMES = 2340; // 78s × 30fps

// No zoom keyframes — flat 1.0 scale to avoid shaking/swimming
function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 199, end: 264 },   // One Voice Prompt
  { start: 430, end: 480 },   // Hey Claude
  { start: 489, end: 519 },   // SHORT FORM VIDEO (NEW)
  { start: 546, end: 576 },   // YOUTUBE SHORTS (NEW)
  { start: 579, end: 609 },   // TIKTOK (NEW)
  { start: 626, end: 656 },   // THREADS (NEW)
  { start: 711, end: 741 },   // INSTAGRAM (NEW)
  { start: 925, end: 975 },   // Skill Triggered
  { start: 1286, end: 1446 }, // Auto-Generated (speech-synced)
  { start: 1516, end: 1586 }, // Unique Per Platform
  { start: 1776, end: 1946 }, // Check & Upload
  { start: 2075, end: 2145 }, // Fully Automated
  { start: 2240, end: 2285 }, // Verified
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS (J-cut: audio 2-3 frames before visual)
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  // Hook burst
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  // Individual platform pops (4 separate SFX)
  { frame: 64, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 86, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 105, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 126, src: "audio/pop-402324.mp3", volume: 0.18 },
  // One Voice Prompt
  { frame: 197, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  // Hey Claude
  { frame: 428, src: "audio/pop-402324.mp3", volume: 0.20 },
  // Command section platforms (5 NEW SFX)
  { frame: 487, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 544, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 577, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 624, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 709, src: "audio/pop-402324.mp3", volume: 0.18 },
  // Skill Triggered
  { frame: 923, src: "audio/whoosh-effect-382717.mp3", volume: 0.20 },
  // Auto-Generated
  { frame: 1284, src: "audio/pop-402324.mp3", volume: 0.20 },
  // Unique Per Platform
  { frame: 1514, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  // Check & Upload
  { frame: 1774, src: "audio/whoosh-effect-382717.mp3", volume: 0.20 },
  // Fully Automated
  { frame: 2073, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  // Verified
  { frame: 2238, src: "audio/pop-402324.mp3", volume: 0.22 },
  // CTA
  { frame: 2288, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
];

// ═══════════════════════════════════════════════════════════════
// INDIVIDUAL PLATFORM POPUPS (each springs in when named, with own SFX)
// ═══════════════════════════════════════════════════════════════
const INDIVIDUAL_PLATFORMS = [
  { logo: "logos/youtube.svg", name: "YOUTUBE", internalFrame: 0 },
  { logo: "logos/instagram.svg", name: "INSTAGRAM", internalFrame: 22 },
  { logo: "logos/tiktok.svg", name: "TIKTOK", internalFrame: 41 },
  { logo: "logos/threads.svg", name: "THREADS", internalFrame: 62 },
];

const IndividualPlatformPopups: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "4%",
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: 18,
        zIndex: 22,
        opacity: fadeOut,
        pointerEvents: "none",
      }}
    >
      {INDIVIDUAL_PLATFORMS.map((platform) => {
        const enter = spring({
          frame: Math.max(0, frame - platform.internalFrame),
          fps,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 160 },
        });

        return (
          <div
            key={platform.name}
            style={{
              width: 150,
              height: 150,
              borderRadius: 28,
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: enter,
              transform: `scale(${interpolate(
                enter,
                [0, 1],
                [0.3, 1]
              )}) translateY(${interpolate(enter, [0, 1], [20, 0])}px)`,
            }}
          >
            <Img
              src={staticFile(platform.logo)}
              style={{ width: 72, height: 72, objectFit: "contain" }}
            />
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: "#666",
                letterSpacing: 0.5,
              }}
            >
              {platform.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SHORT FORM VIDEO ILLUSTRATION — Phone with play button
// ═══════════════════════════════════════════════════════════════
const ShortFormVideoIllustration: React.FC<{ size?: number }> = ({
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
      <div
        style={{
          transform: `scale(${enter})`,
          opacity: enter,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16 * s,
        }}
      >
        <div
          style={{
            width: 220 * s,
            height: 400 * s,
            borderRadius: 32 * s,
            backgroundColor: "#1A1A1A",
            padding: 14 * s,
            boxShadow: `0 ${12 * s}px ${48 * s}px rgba(0,0,0,0.15)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 22 * s,
              backgroundColor: "#FF7614",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={80 * s}
              height={80 * s}
              viewBox="0 0 80 80"
              fill="none"
            >
              <circle cx={40} cy={40} r={36} fill="rgba(255,255,255,0.9)" />
              <path d="M33 24L58 40L33 56Z" fill="#FF7614" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// PLATFORM LOGO DISPLAY — Big logo in rounded card (reusable)
// ═══════════════════════════════════════════════════════════════
const PlatformLogoDisplay: React.FC<{ size?: number; logoSrc: string }> = ({
  size = 600,
  logoSrc,
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
      }}
    >
      <div
        style={{
          width: 340 * s,
          height: 340 * s,
          borderRadius: 60 * s,
          backgroundColor: "#F8F8F8",
          boxShadow: `0 ${8 * s}px ${36 * s}px rgba(0,0,0,0.08)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${enter})`,
          opacity: enter,
        }}
      >
        <Img
          src={staticFile(logoSrc)}
          style={{
            width: 200 * s,
            height: 200 * s,
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// INLINE ILLUSTRATIONS (kept from V4)
// ═══════════════════════════════════════════════════════════════

/** Claude AI brand presentation */
const ClaudeIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
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
          padding: 40 * s,
          borderRadius: 32 * s,
          backgroundColor: "#F8F8F8",
          boxShadow: `0 ${6 * s}px ${30 * s}px rgba(0,0,0,0.08)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile("logos/claude-ai-wordmark.png")}
          style={{
            width: 320 * s,
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

/** Gear/automation illustration — proper SVG transforms */
const SkillGearIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const rotate = interpolate(frame, [0, 60], [0, 360], {
    extrapolateRight: "extend",
  });

  const enter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  const badgeProgress = spring({
    frame: Math.max(0, frame - 12),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Central gear */}
      <g opacity={enter} transform={`rotate(${rotate}, 300, 250)`}>
        <circle
          cx={300}
          cy={250}
          r={80}
          stroke="#FF7614"
          strokeWidth={6}
          fill="none"
        />
        <circle cx={300} cy={250} r={40} fill="#FF7614" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 300 + Math.cos(rad) * 85;
          const y1 = 250 + Math.sin(rad) * 85;
          const x2 = 300 + Math.cos(rad) * 110;
          const y2 = 250 + Math.sin(rad) * 110;
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FF7614"
              strokeWidth={14}
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* Lightning bolt */}
      <g opacity={enter}>
        <path
          d="M290 225 L305 245 L295 245 L310 275"
          stroke="#FFFFFF"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* "ACTIVATED" badge */}
      <g
        opacity={badgeProgress}
        transform={`translate(300, 400) scale(${badgeProgress}) translate(-300, -400)`}
      >
        <rect
          x={200}
          y={380}
          width={200}
          height={44}
          rx={12}
          fill="#22C55E"
        />
        <text
          x={300}
          y={408}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight={700}
          fontSize={18}
          fill="#FFFFFF"
          letterSpacing={2}
        >
          ACTIVATED
        </text>
      </g>
    </svg>
  );
};

/** Auto-generated content checklist — SPEECH-SYNCED delays */
const AutoGeneratedIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const items = [
    { label: "Title", delay: 25 },
    { label: "Description", delay: 51 },
    { label: "Hashtags", delay: 88 },
    { label: "Tags", delay: 118 },
    { label: "First Comment", delay: 156 },
  ];

  const headerProgress = spring({
    frame: Math.max(0, frame - 3),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  let completedCount = 0;
  for (const item of items) {
    if (frame >= item.delay + 8) completedCount++;
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14 * s,
      }}
    >
      {/* Progress header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12 * s,
          opacity: headerProgress,
          marginBottom: 8 * s,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: 32 * s,
            color: "#1A1A1A",
            letterSpacing: 1,
          }}
        >
          {completedCount}/{items.length}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 18 * s,
            color: "#888",
            letterSpacing: 1,
          }}
        >
          GENERATED
        </div>
      </div>

      {/* Document card */}
      <div
        style={{
          width: 440 * s,
          borderRadius: 22 * s,
          backgroundColor: "#F8F8F8",
          border: "2px solid rgba(0,0,0,0.06)",
          padding: `${22 * s}px ${26 * s}px`,
          boxShadow: `0 ${4 * s}px ${20 * s}px rgba(0,0,0,0.06)`,
        }}
      >
        {items.map((item, i) => {
          const enter = spring({
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
                justifyContent: "space-between",
                padding: `${14 * s}px 0`,
                borderBottom:
                  i < items.length - 1
                    ? "1px solid rgba(0,0,0,0.06)"
                    : "none",
                opacity: enter,
                transform: `translateX(${interpolate(
                  enter,
                  [0, 1],
                  [15, 0]
                )}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 20 * s,
                  color: "#1A1A1A",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  width: 30 * s,
                  height: 30 * s,
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${enter})`,
                }}
              >
                <svg
                  width={15 * s}
                  height={15 * s}
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8L7 12L13 4"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Check & Upload — two-phase illustration (file check → cloud upload) */
const CheckAndUploadIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const fileEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const checkProgress = spring({
    frame: Math.max(0, frame - 10),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 60 },
  });

  const uploadEnter = spring({
    frame: Math.max(0, frame - 80),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  const uploadProgress = spring({
    frame: Math.max(0, frame - 90),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 40 },
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
      {/* Step indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12 * s,
          opacity: fileEnter,
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
            fontWeight: 800,
            fontSize: 22 * s,
            color: "#FFFFFF",
          }}
        >
          4
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 22 * s,
            color: "#888",
            letterSpacing: 2,
          }}
        >
          PROCESSING
        </div>
      </div>

      {/* File check card */}
      <div
        style={{
          width: 420 * s,
          borderRadius: 20 * s,
          backgroundColor: "#F8F8F8",
          border: "2px solid rgba(0,0,0,0.06)",
          padding: `${22 * s}px ${26 * s}px`,
          opacity: fileEnter,
          boxShadow: `0 ${4 * s}px ${20 * s}px rgba(0,0,0,0.06)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14 * s,
            marginBottom: 14 * s,
          }}
        >
          <svg
            width={38 * s}
            height={42 * s}
            viewBox="0 0 36 40"
            fill="none"
          >
            <path
              d="M4 4C4 2 5.5 0.5 8 0.5H22L32 10.5V36C32 38 30.5 39.5 28 39.5H8C5.5 39.5 4 38 4 36V4Z"
              fill="#E8E8E8"
              stroke="#CCC"
              strokeWidth="1.5"
            />
            <path
              d="M22 0.5V8C22 9.5 23 10.5 24.5 10.5H32"
              stroke="#CCC"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 18 * s,
                color: "#1A1A1A",
              }}
            >
              video.mp4
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: 14 * s,
                color: "#888",
              }}
            >
              148 MB
            </div>
          </div>
          {checkProgress > 0.9 && (
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
              }}
            >
              <svg
                width={15 * s}
                height={15 * s}
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8L7 12L13 4"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        <div
          style={{
            height: 10 * s,
            borderRadius: 5 * s,
            backgroundColor: "#E8E8E8",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${checkProgress * 100}%`,
              height: "100%",
              backgroundColor: checkProgress > 0.9 ? "#22C55E" : "#FF7614",
              borderRadius: 5 * s,
            }}
          />
        </div>
      </div>

      {/* Upload section — phase 2 */}
      {uploadEnter > 0.01 && (
        <div
          style={{
            width: 420 * s,
            borderRadius: 20 * s,
            backgroundColor: "#F8F8F8",
            border: "2px solid rgba(0,0,0,0.06)",
            padding: `${22 * s}px ${26 * s}px`,
            opacity: uploadEnter,
            transform: `translateY(${interpolate(
              uploadEnter,
              [0, 1],
              [15, 0]
            )}px)`,
            boxShadow: `0 ${4 * s}px ${20 * s}px rgba(0,0,0,0.06)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14 * s,
              marginBottom: 14 * s,
            }}
          >
            <svg
              width={42 * s}
              height={34 * s}
              viewBox="0 0 40 32"
              fill="none"
            >
              <path
                d="M10 26C5 26 1 22 1 17.5C1 13.5 4 10 8.5 9.5C9 4.5 13.5 1 19 1C25 1 29.5 5 30 10C34 10.5 37 14 37 18C37 22.5 33.5 26 29 26H10Z"
                fill="#E8E8E8"
                stroke="#CCC"
                strokeWidth="1.5"
              />
              <path
                d="M20 16V26M16 20L20 16L24 20"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 18 * s,
                  color: "#1A1A1A",
                }}
              >
                Late Storage
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 14 * s,
                  color: "#888",
                }}
              >
                Cloud CDN Upload
              </div>
            </div>
            {uploadProgress > 0.9 && (
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
                }}
              >
                <svg
                  width={15 * s}
                  height={15 * s}
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8L7 12L13 4"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>

          <div
            style={{
              height: 10 * s,
              borderRadius: 5 * s,
              backgroundColor: "#E8E8E8",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${uploadProgress * 100}%`,
                height: "100%",
                backgroundColor:
                  uploadProgress > 0.9 ? "#22C55E" : "#3B82F6",
                borderRadius: 5 * s,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

/** Verified/Published — green checkmark with PUBLISHED text */
const VerifiedIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const circleScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 160 },
  });

  const checkDraw = spring({
    frame: Math.max(0, frame - 5),
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
      <div
        style={{
          width: 180 * s,
          height: 180 * s,
          borderRadius: "50%",
          backgroundColor: "#22C55E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${circleScale})`,
          boxShadow: `0 ${8 * s}px ${32 * s}px rgba(34,197,94,0.3)`,
        }}
      >
        <svg
          width={90 * s}
          height={90 * s}
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="M20 40L35 55L60 25"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={100}
            strokeDashoffset={interpolate(checkDraw, [0, 1], [100, 0])}
          />
        </svg>
      </div>

      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: 36 * s,
          color: "#22C55E",
          letterSpacing: 3,
          opacity: checkDraw,
        }}
      >
        PUBLISHED
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// CTA CARD — "WATCH THE FULL VIDEO" + "Build Your AI Social Media Manager"
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

  const fadeOut = interpolate(frame, [38, 50], [1, 0], {
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
        <div
          style={{
            width: "100%",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          }}
        >
          <Img
            src={staticFile("thumbnails/youtube-ai-social-media-manager.jpg")}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

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
          Build Your AI Social Media Manager
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
export const Clip2StopManuallyPosting: React.FC<{
  videoSrc?: string;
}> = ({ videoSrc = "clip-2-stop-manually-posting.mp4" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
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

      {/* ═════ INDIVIDUAL PLATFORM POPUPS (each with own SFX) ═══ */}
      <Sequence from={66} durationInFrames={100} premountFor={15}>
        <IndividualPlatformPopups durationInFrames={100} />
      </Sequence>

      {/* ═════ ALL ConceptOverlay B-ROLL MOMENTS ═══════════════ */}

      {/* 1. "one voice prompt" — frame 199, 65f */}
      <Sequence from={199} durationInFrames={65} premountFor={15}>
        <ConceptOverlay
          durationInFrames={65}
          illustration={<OneVoicePromptIllustration />}
          caption="ONE VOICE PROMPT"
          subtitle="Post to all platforms instantly"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={620}
        />
      </Sequence>

      {/* 2. "hey claude" — frame 430, 50f */}
      <Sequence from={430} durationInFrames={50} premountFor={15}>
        <ConceptOverlay
          durationInFrames={50}
          illustration={<ClaudeIllustration />}
          caption="HEY CLAUDE"
          subtitle="Voice command initiated"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={580}
        />
      </Sequence>

      {/* === COMMAND SECTION — 5 rapid-fire platform reveals === */}

      {/* 3. "short form video" — frame 489, 30f (NEW) */}
      <Sequence from={489} durationInFrames={30} premountFor={15}>
        <ConceptOverlay
          durationInFrames={30}
          illustration={<ShortFormVideoIllustration />}
          caption="SHORT FORM VIDEO"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={580}
        />
      </Sequence>

      {/* 4. "youtube shorts" — frame 546, 30f (NEW) */}
      <Sequence from={546} durationInFrames={30} premountFor={15}>
        <ConceptOverlay
          durationInFrames={30}
          illustration={
            <PlatformLogoDisplay logoSrc="logos/youtube.svg" />
          }
          caption="YOUTUBE SHORTS"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={580}
        />
      </Sequence>

      {/* 5. "tiktok" — frame 579, 30f (NEW) */}
      <Sequence from={579} durationInFrames={30} premountFor={15}>
        <ConceptOverlay
          durationInFrames={30}
          illustration={
            <PlatformLogoDisplay logoSrc="logos/tiktok.svg" />
          }
          caption="TIKTOK"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={580}
        />
      </Sequence>

      {/* 6. "threads" — frame 626, 30f (NEW) */}
      <Sequence from={626} durationInFrames={30} premountFor={15}>
        <ConceptOverlay
          durationInFrames={30}
          illustration={
            <PlatformLogoDisplay logoSrc="logos/threads.svg" />
          }
          caption="THREADS"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={580}
        />
      </Sequence>

      {/* 7. "instagram" — frame 711, 30f (NEW) */}
      <Sequence from={711} durationInFrames={30} premountFor={15}>
        <ConceptOverlay
          durationInFrames={30}
          illustration={
            <PlatformLogoDisplay logoSrc="logos/instagram.svg" />
          }
          caption="INSTAGRAM"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={580}
        />
      </Sequence>

      {/* === END COMMAND SECTION === */}

      {/* 8. "triggered his skill" — frame 925, 50f (BIGGER) */}
      <Sequence from={925} durationInFrames={50} premountFor={15}>
        <ConceptOverlay
          durationInFrames={50}
          illustration={<SkillGearIllustration />}
          caption="SKILL TRIGGERED"
          subtitle="Automated workflow activated"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* 9. "broke down the entire video" — frame 1286, 160f (EXTENDED) */}
      <Sequence from={1286} durationInFrames={160} premountFor={15}>
        <ConceptOverlay
          durationInFrames={160}
          illustration={<AutoGeneratedIllustration />}
          caption="AUTO-GENERATED"
          subtitle="Title • Tags • Description • Comment"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* 10. "made that different for every social media platform" — frame 1516, 70f */}
      <Sequence from={1516} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<UniquePerPlatformIllustration />}
          caption="UNIQUE PER PLATFORM"
          subtitle="Different content for every channel"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={640}
        />
      </Sequence>

      {/* 11. "step number four... checks video size... uploads" — frame 1776, 170f */}
      <Sequence from={1776} durationInFrames={170} premountFor={15}>
        <ConceptOverlay
          durationInFrames={170}
          illustration={<CheckAndUploadIllustration />}
          caption="CHECK & UPLOAD"
          subtitle="Verify size → Upload to cloud"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={620}
        />
      </Sequence>

      {/* 12. "triggering the API endpoints to post" — frame 2075, 70f */}
      <Sequence from={2075} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<FullyAutomatedIllustration />}
          caption="FULLY AUTOMATED"
          subtitle="Voice → Process → Post → Verify"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={640}
        />
      </Sequence>

      {/* 13. "verifies that the video was published" — frame 2240, 45f */}
      <Sequence from={2240} durationInFrames={45} premountFor={15}>
        <ConceptOverlay
          durationInFrames={45}
          illustration={<VerifiedIllustration />}
          caption="VERIFIED"
          subtitle="All platforms confirmed"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={560}
        />
      </Sequence>

      {/* ═════ CTA CARD with YouTube thumbnail ═════════════════ */}
      <Sequence from={2290} durationInFrames={50} premountFor={15}>
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

      {/* ═════ BACKGROUND MUSIC ═════════════════════════════════ */}
      <Audio
        src={staticFile("audio/lofi-background.mp3")}
        volume={0.02}
        startFrom={0}
        endAt={TOTAL_FRAMES}
      />
    </AbsoluteFill>
  );
};
