/**
 * Clip 2: One Problem with My AI Social Media Manager
 *
 * STORY: Built an AI social media manager that posts to 6 platforms,
 * but all creatives were still manual. Trained Claude Code to handle
 * thumbnails, carousels, and documents autonomously.
 *
 * SOURCE: Pipeline clip (9:16 portrait, face-tracking reframe)
 * CTA: "WATCH THE FULL VIDEO" — Claude Creatives
 * Duration: 75s (2250 frames @ 30fps)
 *
 * ALL VISUALS (ConceptOverlay, full-screen B-roll, white background):
 *   1. "AI AGENT" (frame 246, 75f) — Robot agent managing social feeds
 *   2. "SIX PLATFORMS" (frame 460, 70f) — 6 platform logos in a grid
 *   3. "ONE MAIN PROBLEM" (frame 734, 75f) — Warning: creatives still manual
 *   4. "NO THUMBNAIL" (frame 1121, 70f) — Missing thumbnail visual
 *   5. "MANUAL CAROUSELS" (frame 1497, 70f) — Carousel slides stacked
 *   6. "TRAINED CLAUDE CODE" (frame 1815, 80f) — Claude Code terminal logo
 *   7. "EVERYTHING HANDLED" (frame 2124, 65f) — Checklist of deliverables
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

import { WORDS } from "../data/clip2-one-problem-ai-manager-words";

const { fontFamily } = loadFont();

// ===================================================================
// CONSTANTS
// ===================================================================
const TOTAL_FRAMES = 2250; // 75s x 30fps

// Flat zoom — no shake/swimming
function getZoom(_frame: number): number {
  return 1.0;
}

// ===================================================================
// Concept overlay frame ranges (captions hidden during these)
// ===================================================================
const CONCEPT_RANGES = [
  { start: 246, end: 321 },   // AI Agent
  { start: 460, end: 530 },   // Six Platforms
  { start: 734, end: 809 },   // One Main Problem
  { start: 1121, end: 1191 }, // No Thumbnail
  { start: 1497, end: 1567 }, // Manual Carousels
  { start: 1815, end: 1895 }, // Trained Claude Code
  { start: 2124, end: 2189 }, // Everything Handled
];

// ===================================================================
// SFX EVENTS (J-cut: audio 2-3 frames before visual)
// ===================================================================
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  // Hook burst
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  // AI Agent
  { frame: 244, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // Six Platforms
  { frame: 458, src: "audio/pop-402324.mp3", volume: 0.20 },
  // One Main Problem
  { frame: 732, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  // No Thumbnail
  { frame: 1119, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  // Manual Carousels
  { frame: 1495, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // Trained Claude Code
  { frame: 1813, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  // Everything Handled
  { frame: 2122, src: "audio/pop-402324.mp3", volume: 0.20 },
  // CTA
  { frame: 2198, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.16 },
];

// ===================================================================
// 1. AI AGENT ILLUSTRATION
// Robot-style agent icon managing social media feeds
// ===================================================================
const AIAgentIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const agentScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const pulse = interpolate(frame % 40, [0, 20, 40], [1.0, 1.04, 1.0]);

  const feedItems = [
    { label: "Schedule", icon: "S", delay: 5, color: "#4CAF50" },
    { label: "Create", icon: "C", delay: 9, color: "#2196F3" },
    { label: "Publish", icon: "P", delay: 13, color: "#FF7614" },
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
      {/* Agent badge */}
      <div
        style={{
          width: 130 * s,
          height: 130 * s,
          borderRadius: 30 * s,
          backgroundColor: "#FF7614",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${agentScale * pulse})`,
          boxShadow: `0 ${8 * s}px ${28 * s}px rgba(255,118,20,0.35)`,
        }}
      >
        <svg
          width={70 * s}
          height={70 * s}
          viewBox="0 0 70 70"
          fill="none"
        >
          {/* Robot head */}
          <rect x={15} y={18} width={40} height={32} rx={8} fill="white" />
          {/* Eyes */}
          <circle cx={28} cy={32} r={4} fill="#FF7614" />
          <circle cx={42} cy={32} r={4} fill="#FF7614" />
          {/* Antenna */}
          <line x1={35} y1={18} x2={35} y2={8} stroke="white" strokeWidth={3} strokeLinecap="round" />
          <circle cx={35} cy={6} r={3} fill="white" />
          {/* Mouth */}
          <rect x={26} y={40} width={18} height={3} rx={1.5} fill="#FF7614" />
        </svg>
      </div>

      {/* Feed action items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14 * s,
          width: 380 * s,
        }}
      >
        {feedItems.map((item, i) => {
          const enter = spring({
            frame: Math.max(0, frame - item.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 140 },
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14 * s,
                padding: `${14 * s}px ${20 * s}px`,
                borderRadius: 14 * s,
                backgroundColor: "#F5F5F5",
                border: `2px solid ${item.color}22`,
                opacity: enter,
                transform: `translateX(${interpolate(enter, [0, 1], [30, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 40 * s,
                  height: 40 * s,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${enter})`,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: 18 * s,
                    color: "#FFFFFF",
                  }}
                >
                  {item.icon}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 22 * s,
                  color: "#1A1A1A",
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ===================================================================
// 2. SIX PLATFORMS ILLUSTRATION
// 6 real platform logos in a 3x2 grid
// ===================================================================
const SixPlatformsIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const platforms = [
    { src: "logos/instagram.svg", label: "Instagram", delay: 0 },
    { src: "logos/x.svg", label: "X", delay: 3 },
    { src: "logos/linkedin.svg", label: "LinkedIn", delay: 5 },
    { src: "logos/tiktok.svg", label: "TikTok", delay: 7 },
    { src: "logos/facebook.svg", label: "Facebook", delay: 9 },
    { src: "logos/youtube.svg", label: "YouTube", delay: 11 },
  ];

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
          display: "flex",
          flexWrap: "wrap",
          gap: 28 * s,
          width: 460 * s,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {platforms.map((p, i) => {
          const enter = spring({
            frame: Math.max(0, frame - p.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 160 },
          });

          return (
            <div
              key={i}
              style={{
                width: 120 * s,
                height: 120 * s,
                borderRadius: 22 * s,
                backgroundColor: "#F8F8F8",
                border: "2px solid #EEEEEE",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8 * s,
                opacity: enter,
                transform: `scale(${enter})`,
                boxShadow: `0 ${4 * s}px ${14 * s}px rgba(0,0,0,0.06)`,
              }}
            >
              <Img
                src={staticFile(p.src)}
                style={{
                  width: 48 * s,
                  height: 48 * s,
                  objectFit: "contain",
                }}
              />
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 11 * s,
                  color: "#888",
                  letterSpacing: 0.5,
                }}
              >
                {p.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ===================================================================
// 3. ONE MAIN PROBLEM ILLUSTRATION
// Warning triangle with "CREATIVES = MANUAL" problem statement
// ===================================================================
const OneMainProblemIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const triangleScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 160 },
  });

  const pulse = interpolate(frame % 30, [0, 15, 30], [1.0, 1.06, 1.0]);

  const problems = [
    { label: "Creatives = Manual", delay: 6 },
    { label: "Every Post Needs Art", delay: 12 },
    { label: "Time Sink", delay: 18 },
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
      {/* Warning triangle */}
      <div style={{ transform: `scale(${triangleScale * pulse})` }}>
        <svg
          width={140 * s}
          height={130 * s}
          viewBox="0 0 140 130"
          fill="none"
        >
          <path
            d="M70 8L132 118H8Z"
            fill="#FF7614"
            stroke="#E06610"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <text
            x={70}
            y={92}
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight={800}
            fontSize={52}
            fill="white"
          >
            !
          </text>
        </svg>
      </div>

      {/* Problem items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14 * s,
          width: 380 * s,
        }}
      >
        {problems.map((p, i) => {
          const enter = spring({
            frame: Math.max(0, frame - p.delay),
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
                gap: 14 * s,
                padding: `${14 * s}px ${20 * s}px`,
                borderRadius: 14 * s,
                backgroundColor: "#FEF2F2",
                border: "2px solid #FECACA",
                opacity: enter,
                transform: `translateX(${interpolate(enter, [0, 1], [20, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 34 * s,
                  height: 34 * s,
                  borderRadius: "50%",
                  backgroundColor: "#EF4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${enter})`,
                  flexShrink: 0,
                }}
              >
                <svg
                  width={14 * s}
                  height={14 * s}
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 20 * s,
                  color: "#991B1B",
                }}
              >
                {p.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ===================================================================
// 4. NO THUMBNAIL ILLUSTRATION
// Empty image frame with question mark — nothing prepared
// ===================================================================
const NoThumbnailIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const cardEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });

  const questionBounce = spring({
    frame: Math.max(0, frame - 8),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 180 },
  });

  const shake = interpolate(frame % 24, [0, 6, 12, 18, 24], [0, -3, 0, 3, 0]);

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
      {/* Empty thumbnail frame */}
      <div
        style={{
          width: 340 * s,
          height: 200 * s,
          borderRadius: 20 * s,
          border: `3px dashed #CCCCCC`,
          backgroundColor: "#F5F5F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: cardEnter,
          transform: `scale(${cardEnter}) translateX(${shake}px)`,
          position: "relative",
        }}
      >
        {/* Image icon placeholder */}
        <svg
          width={80 * s}
          height={80 * s}
          viewBox="0 0 80 80"
          fill="none"
          style={{ opacity: 0.3 }}
        >
          <rect x={10} y={15} width={60} height={50} rx={6} stroke="#999" strokeWidth={3} />
          <circle cx={30} cy={35} r={6} stroke="#999" strokeWidth={2.5} />
          <path d="M15 55 L32 40 L45 50 L55 38 L65 48 L65 60 L15 60 Z" fill="#DDD" />
        </svg>

        {/* Question mark overlay */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${questionBounce})`,
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 90 * s,
            color: "#EF4444",
            opacity: questionBounce * 0.9,
            textShadow: "0 4px 12px rgba(239,68,68,0.3)",
          }}
        >
          ?
        </div>
      </div>

      {/* YouTube badge (no thumbnail for YouTube) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10 * s,
          opacity: spring({
            frame: Math.max(0, frame - 12),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 14, stiffness: 100 },
          }),
        }}
      >
        <Img
          src={staticFile("logos/youtube.svg")}
          style={{ width: 36 * s, height: 36 * s }}
        />
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 18 * s,
            color: "#999",
            letterSpacing: 1,
          }}
        >
          No thumbnail ready
        </div>
      </div>
    </div>
  );
};

// ===================================================================
// 5. MANUAL CAROUSELS ILLUSTRATION
// Stacked carousel slides with a hand/manual icon
// ===================================================================
const ManualCarouselsIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const slides = [
    { offset: 0, delay: 0, color: "#F8F8F8" },
    { offset: 1, delay: 4, color: "#F0F0F0" },
    { offset: 2, delay: 8, color: "#E8E8E8" },
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
        gap: 20 * s,
      }}
    >
      {/* Stacked slides */}
      <div
        style={{
          position: "relative",
          width: 320 * s,
          height: 280 * s,
        }}
      >
        {slides.map((slide, i) => {
          const enter = spring({
            frame: Math.max(0, frame - slide.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 14, stiffness: 120 },
          });

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: slide.offset * 20 * s,
                top: slide.offset * 16 * s,
                width: 260 * s,
                height: 220 * s,
                borderRadius: 16 * s,
                backgroundColor: slide.color,
                border: "2px solid #DDDDDD",
                boxShadow: `0 ${4 * s}px ${16 * s}px rgba(0,0,0,0.06)`,
                opacity: enter,
                transform: `scale(${interpolate(enter, [0, 1], [0.9, 1])})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12 * s,
              }}
            >
              {/* Placeholder content lines */}
              <div
                style={{
                  width: 160 * s,
                  height: 8 * s,
                  borderRadius: 4 * s,
                  backgroundColor: "#CCCCCC",
                }}
              />
              <div
                style={{
                  width: 120 * s,
                  height: 8 * s,
                  borderRadius: 4 * s,
                  backgroundColor: "#DDDDDD",
                }}
              />
              <div
                style={{
                  width: 80 * s,
                  height: 60 * s,
                  borderRadius: 8 * s,
                  backgroundColor: "#D5D5D5",
                }}
              />
            </div>
          );
        })}

        {/* Manual labor clock icon */}
        {(() => {
          const clockEnter = spring({
            frame: Math.max(0, frame - 14),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 10, stiffness: 160 },
          });
          return (
            <div
              style={{
                position: "absolute",
                right: -10 * s,
                bottom: -10 * s,
                width: 64 * s,
                height: 64 * s,
                borderRadius: "50%",
                backgroundColor: "#EF4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${clockEnter})`,
                boxShadow: `0 ${4 * s}px ${14 * s}px rgba(239,68,68,0.35)`,
              }}
            >
              <svg
                width={30 * s}
                height={30 * s}
                viewBox="0 0 30 30"
                fill="none"
              >
                <circle cx={15} cy={15} r={11} stroke="white" strokeWidth={2.5} />
                <line
                  x1={15} y1={15} x2={15} y2={8}
                  stroke="white"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
                <line
                  x1={15} y1={15} x2={21} y2={15}
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

// ===================================================================
// 6. TRAINED CLAUDE CODE ILLUSTRATION
// Claude Code terminal logo with training sparkles
// ===================================================================
const TrainedClaudeCodeIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const logoEnter = spring({
    frame: Math.max(0, frame - 3),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const sparklePositions = [
    { x: -90, y: -80, delay: 8 },
    { x: 95, y: -70, delay: 11 },
    { x: -70, y: 80, delay: 14 },
    { x: 85, y: 75, delay: 17 },
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
      {/* Claude Code logo */}
      <div
        style={{
          transform: `scale(${logoEnter})`,
          opacity: logoEnter,
          padding: 36 * s,
          borderRadius: 32 * s,
          backgroundColor: "#F8F8F8",
          boxShadow: `0 ${6 * s}px ${30 * s}px rgba(0,0,0,0.08)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile("logos/claude-code-terminal.webp")}
          style={{
            width: 240 * s,
            height: 240 * s,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Training sparkles */}
      {sparklePositions.map((sp, i) => {
        const sparkle = spring({
          frame: Math.max(0, frame - sp.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 200 },
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50% + ${sp.x * s}px)`,
              top: `calc(50% + ${sp.y * s}px)`,
              transform: `scale(${sparkle}) rotate(${sparkle * 45}deg)`,
              opacity: sparkle,
            }}
          >
            <svg
              width={28 * s}
              height={28 * s}
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M14 0L16.5 11.5L28 14L16.5 16.5L14 28L11.5 16.5L0 14L11.5 11.5Z"
                fill="#FF7614"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

// ===================================================================
// 7. EVERYTHING HANDLED ILLUSTRATION
// Checklist: thumbnail, carousels, documents — all checked off
// ===================================================================
const EverythingHandledIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const items = [
    { label: "Thumbnails", delay: 3 },
    { label: "Carousels", delay: 7 },
    { label: "Documents", delay: 11 },
  ];

  const badgeEnter = spring({
    frame: Math.max(0, frame - 16),
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
      {/* Checklist items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18 * s,
          width: 400 * s,
        }}
      >
        {items.map((item, i) => {
          const enter = spring({
            frame: Math.max(0, frame - item.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 140 },
          });

          const checkScale = spring({
            frame: Math.max(0, frame - item.delay - 4),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 8, stiffness: 200 },
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16 * s,
                padding: `${18 * s}px ${24 * s}px`,
                borderRadius: 16 * s,
                backgroundColor: "#F0FDF4",
                border: "2px solid #BBF7D0",
                opacity: enter,
                transform: `translateX(${interpolate(enter, [0, 1], [25, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 38 * s,
                  height: 38 * s,
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${checkScale})`,
                  flexShrink: 0,
                }}
              >
                <svg
                  width={18 * s}
                  height={18 * s}
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M3 9L7 13L15 5"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 24 * s,
                  color: "#166534",
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* "Handled" badge */}
      <div
        style={{
          padding: `${10 * s}px ${28 * s}px`,
          borderRadius: 24 * s,
          backgroundColor: "#FF7614",
          opacity: badgeEnter,
          transform: `scale(${badgeEnter})`,
          boxShadow: `0 ${4 * s}px ${16 * s}px rgba(255,118,20,0.3)`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: 18 * s,
            color: "#FFFFFF",
            letterSpacing: 3,
          }}
        >
          ALL AUTOMATED
        </div>
      </div>
    </div>
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
        {/* YouTube icon + title */}
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

        {/* Subtitle */}
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

        {/* Accent line */}
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

// ===================================================================
// MAIN COMPOSITION
// ===================================================================
export const Clip2OneProblemAiManager: React.FC<{
  videoSrc?: string;
}> = ({
  videoSrc = "videos/2026-03-02-claude-creatives/clip-02-one-problem-with-my-ai-social-media-manager.mp4",
}) => {
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
      {/* -- BASE: Speaker video with zoom ----------------------------- */}
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

      {/* -- HOOK FLASH (orange burst, frames 0-3) --------------------- */}
      {hookFlash > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#FF6B00",
            opacity: hookFlash,
            zIndex: 50,
          }}
        />
      )}

      {/* ===== ALL ConceptOverlay B-ROLL MOMENTS ===================== */}

      {/* 1. "developed my own AI agent social media manager" — frame 246, 75f */}
      <Sequence from={246} durationInFrames={75} premountFor={15}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<AIAgentIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 2. "six of my most used social platforms" — frame 460, 70f */}
      <Sequence from={460} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<SixPlatformsIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 3. "one main problem" — frame 734, 75f */}
      <Sequence from={734} durationInFrames={75} premountFor={15}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<OneMainProblemIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 4. "didn't have a thumbnail prepared" — frame 1121, 70f */}
      <Sequence from={1121} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<NoThumbnailIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 5. "had to create the image carousels" — frame 1497, 70f */}
      <Sequence from={1497} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<ManualCarouselsIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 6. "trained Claude Code to handle my entire content creatives" — frame 1815, 80f */}
      <Sequence from={1815} durationInFrames={80} premountFor={15}>
        <ConceptOverlay
          durationInFrames={80}
          illustration={<TrainedClaudeCodeIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 7. "handle everything — thumbnail, carousels, documents" — frame 2124, 65f */}
      <Sequence from={2124} durationInFrames={65} premountFor={15}>
        <ConceptOverlay
          durationInFrames={65}
          illustration={<EverythingHandledIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ===== CTA CARD ============================================== */}
      <Sequence from={2200} durationInFrames={50} premountFor={15}>
        <CTACard />
      </Sequence>

      {/* ===== WORD-BY-WORD CAPTIONS (bottom 28%) ==================== */}
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

      {/* ===== SFX LAYER ============================================= */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={15}>
          <Audio
            src={staticFile(sfx.src)}
            volume={sfx.volume}
            startFrom={0}
          />
        </Sequence>
      ))}

      {/* ===== BACKGROUND MUSIC ====================================== */}
      <Audio
        src={staticFile("audio/background-music.mp3")}
        volume={0.02}
        startFrom={0}
        endAt={TOTAL_FRAMES}
      />
    </AbsoluteFill>
  );
};
