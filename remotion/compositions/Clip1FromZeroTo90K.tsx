/**
 * Clip 1: From Zero to $90K — V4 Composition (extended B-roll + better AI illustration)
 *
 * STORY: Partner Zach used the IX system, doubled his business,
 * made $90K in 90 days reselling the system.
 *
 * SOURCE: Pipeline clip with burned-in auto-captions
 * CTA: "WATCH THE FULL VIDEO" + "Build Your AI Social Media Manager"
 * Duration: 76s (2280 frames @ 30fps)
 *
 * SPECIAL: Zach headshot popup at frame 21 ("This is Zach")
 *
 * V4 CHANGES:
 *   - BIG PROBLEM extended to 100f (175-275) — covers "massive list of contacts"
 *   - MASSIVE OUTREACH added at 353 (75f) — "massive, massive volume of outreach"
 *   - AI-POWERED: replaced AIBrain robot with clean dashboard illustration, extended to 100f
 *   - Zoom keyframes for energy variation throughout
 *   - Better CTA with subtitle
 *
 * ALL VISUALS (ConceptOverlay, full-screen B-roll, white background):
 *   1. "BIG PROBLEM" (frame 175, 100f) — Warning triangle + problem items
 *   2. "MASSIVE OUTREACH" (frame 353, 75f) — MassiveOutreach (volume emphasis)
 *   3. "AI-POWERED" (frame 539, 100f) — Speed/Scale dashboard
 *   4. "IX SYSTEM" (frame 773, 50f) — INFINITX logo
 *   5. "DOUBLED EVERYTHING" (frame 961, 70f) — 3 metrics going 2×
 *   6. "NETWORK EFFECT" (frame 1277, 50f) — Network illustration
 *   7. "$90K IN 90 DAYS" (frame 1670, 75f) — MetricCard90K count-up
 *   8. "ZONE OF GENIUS" (frame 2150, 65f) — Radiant focus
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

import { MassiveOutreachIllustration } from "../lib/illustrations/MassiveOutreachIllustration";
import { DoubledEverythingIllustration } from "../lib/illustrations/DoubledEverythingIllustration";
import { MetricCard90K } from "../lib/illustrations/MetricCard90K";
import { ZoneOfGeniusIllustration } from "../lib/illustrations/ZoneOfGeniusIllustration";
import { WORDS } from "../data/clip1-from-zero-to-90k-words";

const { fontFamily } = loadFont();

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════
const TOTAL_FRAMES = 2280; // 76s × 30fps

// No zoom keyframes — flat 1.0 scale to avoid shaking/swimming
function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 175, end: 275 },   // Big Problem (extended)
  { start: 353, end: 428 },   // Massive Outreach (NEW)
  { start: 539, end: 639 },   // AI-Powered (extended)
  { start: 773, end: 823 },   // IX System
  { start: 961, end: 1031 },  // Doubled Everything
  { start: 1277, end: 1327 }, // Network Effect
  { start: 1670, end: 1745 }, // $90K
  { start: 2150, end: 2215 }, // Zone of Genius
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS (J-cut: audio 2-3 frames before visual)
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  // Hook burst
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  // Zach headshot
  { frame: 19, src: "audio/pop-402324.mp3", volume: 0.20 },
  // Big Problem
  { frame: 173, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // Massive Outreach (NEW)
  { frame: 351, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  // AI-Powered
  { frame: 537, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  // IX System
  { frame: 771, src: "audio/pop-402324.mp3", volume: 0.20 },
  // Doubled Everything
  { frame: 959, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  // Network Effect
  { frame: 1275, src: "audio/pop-402324.mp3", volume: 0.20 },
  // $90K
  { frame: 1668, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  // Zone of Genius
  { frame: 2148, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  // CTA
  { frame: 2213, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
];

// ═══════════════════════════════════════════════════════════════
// AI SPEED & SCALE ILLUSTRATION (replaces AIBrain cartoon robot)
// Clean dashboard showing AI advantages: Speed, Capability, Scale
// ═══════════════════════════════════════════════════════════════
const AISpeedScaleIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const bars = [
    { label: "SPEED", value: "10×", delay: 3 },
    { label: "CAPABILITY", value: "∞", delay: 8 },
    { label: "SCALE", value: "24/7", delay: 13 },
  ];

  const badgeScale = spring({
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28 * s,
      }}
    >
      {/* AI Badge */}
      <div
        style={{
          width: 110 * s,
          height: 110 * s,
          borderRadius: "50%",
          backgroundColor: "#FF7614",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${badgeScale})`,
          boxShadow: `0 ${6 * s}px ${24 * s}px rgba(255,118,20,0.3)`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 40 * s,
            color: "#FFFFFF",
            letterSpacing: 2,
          }}
        >
          AI
        </div>
      </div>

      {/* Metric bars */}
      <div
        style={{
          width: 440 * s,
          display: "flex",
          flexDirection: "column",
          gap: 20 * s,
        }}
      >
        {bars.map((bar, i) => {
          const fillProgress = spring({
            frame: Math.max(0, frame - bar.delay),
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
                opacity: fillProgress,
              }}
            >
              <div
                style={{
                  width: 120 * s,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 15 * s,
                  color: "#888",
                  letterSpacing: 1.5,
                  textAlign: "right",
                }}
              >
                {bar.label}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 28 * s,
                  borderRadius: 14 * s,
                  backgroundColor: "#F0F0F0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${fillProgress * 100}%`,
                    height: "100%",
                    borderRadius: 14 * s,
                    backgroundColor: "#FF7614",
                    boxShadow: `0 2px ${8 * s}px rgba(255,118,20,0.3)`,
                  }}
                />
              </div>
              <div
                style={{
                  width: 55 * s,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 800,
                  fontSize: 20 * s,
                  color: "#1A1A1A",
                  textAlign: "center",
                  transform: `scale(${fillProgress})`,
                }}
              >
                {bar.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// BIG PROBLEM ILLUSTRATION (warning + problem items — distinct from MassiveOutreach)
// ═══════════════════════════════════════════════════════════════
const BigProblemIllustration: React.FC<{ size?: number }> = ({
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
    { label: "Manual Process", delay: 6 },
    { label: "No Automation", delay: 12 },
    { label: "Can't Scale", delay: 18 },
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

// ═══════════════════════════════════════════════════════════════
// NETWORK EFFECT ILLUSTRATION
// ═══════════════════════════════════════════════════════════════
const NetworkEffectIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const nodes = [
    { cx: 300, cy: 160, r: 50, label: "YOU", delay: 0, primary: true },
    { cx: 150, cy: 320, r: 38, label: "", delay: 4, primary: false },
    { cx: 450, cy: 320, r: 38, label: "", delay: 6, primary: false },
    { cx: 100, cy: 480, r: 32, label: "", delay: 8, primary: false },
    { cx: 300, cy: 460, r: 32, label: "", delay: 10, primary: false },
    { cx: 500, cy: 480, r: 32, label: "", delay: 12, primary: false },
  ];

  const connections = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 4],
    [2, 5],
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {connections.map(([a, b], i) => {
        const lineProgress = spring({
          frame: Math.max(
            0,
            frame - Math.max(nodes[a].delay, nodes[b].delay)
          ),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 16, stiffness: 100 },
        });
        return (
          <line
            key={`c-${i}`}
            x1={nodes[a].cx}
            y1={nodes[a].cy}
            x2={
              nodes[a].cx + (nodes[b].cx - nodes[a].cx) * lineProgress
            }
            y2={
              nodes[a].cy + (nodes[b].cy - nodes[a].cy) * lineProgress
            }
            stroke="#FF7614"
            strokeWidth={2.5}
            opacity={0.4}
            strokeDasharray="8 4"
          />
        );
      })}

      {nodes.map((node, i) => {
        const enter = spring({
          frame: Math.max(0, frame - node.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 160 },
        });

        return (
          <g
            key={`n-${i}`}
            opacity={enter}
            transform={`translate(${node.cx}, ${node.cy}) scale(${enter}) translate(${-node.cx}, ${-node.cy})`}
          >
            {node.primary && (
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r + 10}
                stroke="#FF7614"
                strokeWidth={2}
                fill="none"
                opacity={0.3}
              />
            )}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.primary ? "#FF7614" : "#F0F0F0"}
              stroke={node.primary ? "#E06610" : "#DDDDDD"}
              strokeWidth={2.5}
            />
            <circle
              cx={node.cx}
              cy={node.cy - 8}
              r={10}
              fill={node.primary ? "#FFFFFF" : "#999"}
            />
            <path
              d={`M${node.cx - 14} ${node.cy + 14} Q${node.cx} ${node.cy - 2} ${node.cx + 14} ${node.cy + 14}`}
              fill={node.primary ? "#FFFFFF" : "#999"}
            />
            {node.label && (
              <text
                x={node.cx}
                y={node.cy + 32}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontWeight={700}
                fontSize={14}
                fill={node.primary ? "#FF7614" : "#888"}
              >
                {node.label}
              </text>
            )}
          </g>
        );
      })}

      {(() => {
        const bubbleProgress = spring({
          frame: Math.max(0, frame - 16),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 140 },
        });
        return (
          <g
            opacity={bubbleProgress}
            transform={`translate(370, 260) scale(${bubbleProgress}) translate(-370, -260)`}
          >
            <rect
              x={300}
              y={240}
              width={140}
              height={40}
              rx={12}
              fill="#F5F5F5"
              stroke="#DDD"
              strokeWidth={1.5}
            />
            <text
              x={370}
              y={265}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={600}
              fontSize={13}
              fill="#666"
            >
              What are you using?
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// IX SYSTEM LOGO ILLUSTRATION
// ═══════════════════════════════════════════════════════════════
const IXSystemIllustration: React.FC<{ size?: number }> = ({
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

// ═══════════════════════════════════════════════════════════════
// ZACH HEADSHOT POPUP
// ═══════════════════════════════════════════════════════════════
const ZachHeadshot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const fadeOut = interpolate(frame, [45, 55], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "8%",
        right: "6%",
        zIndex: 25,
        opacity: enter * fadeOut,
        transform: `scale(${interpolate(enter, [0, 1], [0.5, 1])})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "5px solid #FF6B00",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
        }}
      >
        <Img
          src={staticFile("headshots/zach-headshot.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 28,
          color: "#FFFFFF",
          textShadow: "0 3px 12px rgba(0,0,0,0.8)",
          letterSpacing: 3,
        }}
      >
        ZACH
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
export const Clip1FromZeroTo90K: React.FC<{
  videoSrc?: string;
}> = ({ videoSrc = "clip-1-from-zero-to-90k.mp4" }) => {
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

      {/* ═════ ZACH HEADSHOT POPUP ═════════════════════════════ */}
      <Sequence from={21} durationInFrames={55} premountFor={15}>
        <ZachHeadshot />
      </Sequence>

      {/* ═════ ALL ConceptOverlay B-ROLL MOMENTS ═══════════════ */}

      {/* 1. "big, big problem... massive list of contacts" — frame 175, 100f */}
      <Sequence from={175} durationInFrames={100} premountFor={15}>
        <ConceptOverlay
          durationInFrames={100}
          illustration={<BigProblemIllustration />}
          caption="BIG PROBLEM"
          subtitle="Massive list, no efficient outreach"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={520}
        />
      </Sequence>

      {/* 2. "massive, massive volume of outreach" — frame 353, 75f (NEW) */}
      <Sequence from={353} durationInFrames={75} premountFor={15}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<MassiveOutreachIllustration />}
          caption="MASSIVE OUTREACH"
          subtitle="Volume that no team can handle"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={520}
        />
      </Sequence>

      {/* 3. "AI was faster, more capable, better at scale" — frame 539, 100f */}
      <Sequence from={539} durationInFrames={100} premountFor={15}>
        <ConceptOverlay
          durationInFrames={100}
          illustration={<AISpeedScaleIllustration />}
          caption="AI-POWERED"
          subtitle="Faster • Capable • Scale"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={520}
        />
      </Sequence>

      {/* 4. "implement the AIX system" — frame 773, 50f */}
      <Sequence from={773} durationInFrames={50} premountFor={15}>
        <ConceptOverlay
          durationInFrames={50}
          illustration={<IXSystemIllustration />}
          caption="IX SYSTEM"
          subtitle="AI Outreach Engine"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={480}
        />
      </Sequence>

      {/* 5. "doubled his booking rate, revenue, business" — frame 961, 70f */}
      <Sequence from={961} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<DoubledEverythingIllustration />}
          caption="DOUBLED EVERYTHING"
          subtitle="Bookings • Revenue • Business"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={550}
        />
      </Sequence>

      {/* 6. "people in his network started asking" — frame 1277, 50f */}
      <Sequence from={1277} durationInFrames={50} premountFor={15}>
        <ConceptOverlay
          durationInFrames={50}
          illustration={<NetworkEffectIllustration />}
          caption="NETWORK EFFECT"
          subtitle="People started asking"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={480}
        />
      </Sequence>

      {/* 7. "$90,000 in 90 days reselling the system" — frame 1670, 75f */}
      <Sequence from={1670} durationInFrames={75} premountFor={15}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<MetricCard90K />}
          caption="$90K IN 90 DAYS"
          subtitle="Reselling the IX System"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={550}
        />
      </Sequence>

      {/* 8. "focus on your zone of genius" — frame 2150, 65f */}
      <Sequence from={2150} durationInFrames={65} premountFor={15}>
        <ConceptOverlay
          durationInFrames={65}
          illustration={<ZoneOfGeniusIllustration />}
          caption="ZONE OF GENIUS"
          subtitle="Let AI handle the rest"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={550}
        />
      </Sequence>

      {/* ═════ CTA CARD with YouTube thumbnail ═════════════════ */}
      <Sequence from={2215} durationInFrames={65} premountFor={15}>
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
