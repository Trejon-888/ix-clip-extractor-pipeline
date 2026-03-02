/**
 * Clip 7: AI Agent Posted Carousels to Three Platforms
 *
 * STORY: Claude developed captions for Instagram, TikTok, Threads,
 * posted both carousels with proper title, description, hashtags, CTA.
 * "This is the workflow I use daily."
 *
 * SOURCE: Pipeline clip with burned-in auto-captions
 * CTA: "WATCH THE FULL VIDEO" — Claude Creatives
 * Duration: 51s (1530 frames @ 30fps)
 *
 * ALL VISUALS (ConceptOverlay, illustration-first):
 *   1. "THREE PLATFORMS" (frame 218, 85f) — Individual platform logo pops: Instagram, TikTok, Threads
 *   2. "TWO CAROUSELS POSTED" (frame 770, 75f) — Carousel stack illustration
 *   3. "FULL PACKAGE" (frame 1050, 80f) — Checklist (title, description, hashtags, CTA)
 *   4. "DAILY WORKFLOW" (frame 1349, 70f) — Workflow cycle illustration
 *   CTA: frame 1470, 60f — "WATCH THE FULL VIDEO" card
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

import { WORDS } from "../data/clip7-posted-three-platforms-words";

const { fontFamily } = loadFont();

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════
const TOTAL_FRAMES = 1530; // 51s x 30fps

// Flat zoom — no keyframes
function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 218, end: 303 },  // Three Platforms (individual pops)
  { start: 770, end: 845 },  // Two Carousels Posted
  { start: 1050, end: 1130 }, // Full Package
  { start: 1349, end: 1419 }, // Daily Workflow
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS (J-cut: audio 2-3 frames before visual)
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  // Hook burst
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  // Three Platforms — individual platform pops
  { frame: 216, src: "audio/pop-402324.mp3", volume: 0.20 },        // Instagram
  { frame: 232, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 }, // TikTok
  { frame: 250, src: "audio/pop-402324.mp3", volume: 0.20 },        // Threads
  // Two Carousels Posted
  { frame: 768, src: "audio/whoosh-effect-382717.mp3", volume: 0.20 },
  // Full Package
  { frame: 1048, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  // Daily Workflow
  { frame: 1347, src: "audio/pop-402324.mp3", volume: 0.22 },
  // CTA
  { frame: 1468, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
];

// ═══════════════════════════════════════════════════════════════
// INDIVIDUAL PLATFORM POPS — Instagram, TikTok, Threads
// Each springs in when named, with own SFX
// ═══════════════════════════════════════════════════════════════
const PLATFORMS = [
  { logo: "logos/instagram.svg", name: "INSTAGRAM", internalFrame: 0 },
  { logo: "logos/tiktok.svg", name: "TIKTOK", internalFrame: 16 },
  { logo: "logos/threads.svg", name: "THREADS", internalFrame: 34 },
];

const ThreePlatformPops: React.FC<{ durationInFrames: number }> = ({
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
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        opacity: fadeOut,
        pointerEvents: "none",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {PLATFORMS.map((platform) => {
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                opacity: enter,
                transform: `scale(${interpolate(
                  enter,
                  [0, 1],
                  [0.3, 1]
                )}) translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 36,
                  backgroundColor: "#F8F8F8",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Img
                  src={staticFile(platform.logo)}
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                />
              </div>
              <div
                style={{
                  fontFamily,
                  fontWeight: 800,
                  fontSize: 22,
                  color: "#1A1A1A",
                  letterSpacing: 2,
                }}
              >
                {platform.name}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// CAROUSEL STACK ILLUSTRATION — Two stacked carousel cards
// ═══════════════════════════════════════════════════════════════
const CarouselStackIllustration: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = size / 800;

  const card1Enter = spring({
    frame: Math.max(0, frame - 3),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const card2Enter = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const checkEnter = spring({
    frame: Math.max(0, frame - 18),
    fps,
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
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Card 1 — Document carousel (back) */}
      <div
        style={{
          position: "absolute",
          width: 320 * s,
          height: 420 * s,
          borderRadius: 24 * s,
          backgroundColor: "#F0F0F0",
          border: `2px solid #E0E0E0`,
          transform: `rotate(-6deg) translateX(${-40 * s}px) scale(${card1Enter})`,
          opacity: card1Enter,
          boxShadow: `0 ${8 * s}px ${24 * s}px rgba(0,0,0,0.08)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16 * s,
        }}
      >
        {/* Document lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: (220 - i * 20) * s,
              height: 12 * s,
              borderRadius: 6 * s,
              backgroundColor: i === 0 ? "#FF7614" : "#DDDDDD",
            }}
          />
        ))}
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 16 * s,
            color: "#999",
            letterSpacing: 1,
            marginTop: 8 * s,
          }}
        >
          DOCUMENT
        </div>
      </div>

      {/* Card 2 — Image carousel (front) */}
      <div
        style={{
          position: "absolute",
          width: 320 * s,
          height: 420 * s,
          borderRadius: 24 * s,
          backgroundColor: "#FFFFFF",
          border: `2px solid #E8E8E8`,
          transform: `rotate(4deg) translateX(${40 * s}px) scale(${card2Enter})`,
          opacity: card2Enter,
          boxShadow: `0 ${12 * s}px ${36 * s}px rgba(0,0,0,0.12)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16 * s,
        }}
      >
        {/* Image placeholder */}
        <div
          style={{
            width: 240 * s,
            height: 240 * s,
            borderRadius: 16 * s,
            background: "linear-gradient(135deg, #FFE0B2 0%, #FF7614 100%)",
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
            <rect
              x="8"
              y="8"
              width="64"
              height="64"
              rx="8"
              fill="rgba(255,255,255,0.3)"
            />
            <circle cx="28" cy="28" r="8" fill="rgba(255,255,255,0.6)" />
            <path
              d="M12 56L28 40L40 52L52 36L68 56"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 16 * s,
            color: "#999",
            letterSpacing: 1,
          }}
        >
          IMAGE
        </div>
      </div>

      {/* Green check badge */}
      <div
        style={{
          position: "absolute",
          top: 60 * s,
          right: 120 * s,
          width: 72 * s,
          height: 72 * s,
          borderRadius: "50%",
          backgroundColor: "#22C55E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${checkEnter})`,
          opacity: checkEnter,
          boxShadow: `0 ${4 * s}px ${16 * s}px rgba(34,197,94,0.3)`,
        }}
      >
        <svg
          width={36 * s}
          height={36 * s}
          viewBox="0 0 36 36"
          fill="none"
        >
          <path
            d="M8 18L15 25L28 11"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// FULL PACKAGE ILLUSTRATION — Checklist: title, description, hashtags, CTA
// ═══════════════════════════════════════════════════════════════
const FullPackageIllustration: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = size / 800;

  const items = [
    { label: "Title", icon: "T", delay: 3 },
    { label: "Description", icon: "D", delay: 8 },
    { label: "Hashtags", icon: "#", delay: 13 },
    { label: "Call to Action", icon: "!", delay: 18 },
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
      {items.map((item, i) => {
        const enter = spring({
          frame: Math.max(0, frame - item.delay),
          fps,
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
              gap: 20 * s,
              width: 480 * s,
              padding: `${18 * s}px ${24 * s}px`,
              borderRadius: 18 * s,
              backgroundColor: "#F8F8F8",
              border: "2px solid #EEEEEE",
              opacity: enter,
              transform: `translateX(${interpolate(enter, [0, 1], [30, 0])}px)`,
            }}
          >
            {/* Icon badge */}
            <div
              style={{
                width: 52 * s,
                height: 52 * s,
                borderRadius: 14 * s,
                backgroundColor: "#FF7614",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${enter})`,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  fontFamily,
                  fontWeight: 900,
                  fontSize: 24 * s,
                  color: "#FFFFFF",
                }}
              >
                {item.icon}
              </div>
            </div>

            {/* Label */}
            <div
              style={{
                fontFamily,
                fontWeight: 700,
                fontSize: 26 * s,
                color: "#1A1A1A",
                letterSpacing: 1,
              }}
            >
              {item.label}
            </div>

            {/* Checkmark */}
            <div
              style={{
                marginLeft: "auto",
                opacity: enter,
                transform: `scale(${enter})`,
              }}
            >
              <svg
                width={28 * s}
                height={28 * s}
                viewBox="0 0 28 28"
                fill="none"
              >
                <circle cx="14" cy="14" r="14" fill="#22C55E" />
                <path
                  d="M8 14L12 18L20 10"
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
  );
};

// ═══════════════════════════════════════════════════════════════
// DAILY WORKFLOW ILLUSTRATION — Circular workflow cycle
// ═══════════════════════════════════════════════════════════════
const DailyWorkflowIllustration: React.FC<{ size?: number }> = ({
  size = 800,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = size / 800;

  const steps = [
    { label: "CREATE", angle: -90, delay: 0 },
    { label: "POST", angle: 0, delay: 6 },
    { label: "MANAGE", angle: 90, delay: 12 },
    { label: "REPEAT", angle: 180, delay: 18 },
  ];

  const centerEnter = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  // Rotating arrow progress
  const arrowRotation = interpolate(frame, [0, 60], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Center AI badge */}
      <div
        style={{
          position: "absolute",
          width: 120 * s,
          height: 120 * s,
          borderRadius: "50%",
          backgroundColor: "#FF7614",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${centerEnter})`,
          boxShadow: `0 ${6 * s}px ${24 * s}px rgba(255,118,20,0.3)`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 36 * s,
            color: "#FFFFFF",
            letterSpacing: 2,
          }}
        >
          AI
        </div>
      </div>

      {/* Circular track */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 800 800"
        style={{ position: "absolute" }}
      >
        <circle
          cx="400"
          cy="400"
          r="220"
          fill="none"
          stroke="#F0F0F0"
          strokeWidth="3"
          strokeDasharray="12 8"
          opacity={centerEnter}
        />
        {/* Animated arrow on track */}
        <g
          transform={`rotate(${arrowRotation} 400 400)`}
          opacity={centerEnter * 0.6}
        >
          <circle cx="400" cy="180" r="8" fill="#FF7614" />
        </g>
      </svg>

      {/* Step nodes */}
      {steps.map((step, i) => {
        const enter = spring({
          frame: Math.max(0, frame - step.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 160 },
        });

        const rad = (step.angle * Math.PI) / 180;
        const radius = 220 * s;
        const x = 400 * s + radius * Math.cos(rad);
        const y = 400 * s + radius * Math.sin(rad);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 60 * s,
              top: y - 60 * s,
              width: 120 * s,
              height: 120 * s,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              border: `3px solid ${i === 3 ? "#FF7614" : "#E8E8E8"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: enter,
              transform: `scale(${enter})`,
              boxShadow: `0 ${4 * s}px ${16 * s}px rgba(0,0,0,0.06)`,
            }}
          >
            <div
              style={{
                fontFamily,
                fontWeight: 800,
                fontSize: 16 * s,
                color: i === 3 ? "#FF7614" : "#1A1A1A",
                letterSpacing: 2,
              }}
            >
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
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
export const Clip7PostedThreePlatforms: React.FC<{
  videoSrc?: string;
}> = ({
  videoSrc = "videos/2026-03-02-claude-creatives/clip-07-ai-agent-posted-carousels-to-three-platforms.mp4",
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

      {/* 1. "THREE PLATFORMS" — Instagram, TikTok, Threads individual pops (frame 218, 85f) */}
      <Sequence from={218} durationInFrames={85} premountFor={15}>
        <ThreePlatformPops durationInFrames={85} />
      </Sequence>

      {/* 2. "TWO CAROUSELS POSTED" — Claude posted both carousels (frame 770, 75f) */}
      <Sequence from={770} durationInFrames={75} premountFor={15}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<CarouselStackIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 3. "FULL PACKAGE" — title, description, hashtags, CTA (frame 1050, 80f) */}
      <Sequence from={1050} durationInFrames={80} premountFor={15}>
        <ConceptOverlay
          durationInFrames={80}
          illustration={<FullPackageIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* 4. "DAILY WORKFLOW" — workflow I use daily (frame 1349, 70f) */}
      <Sequence from={1349} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<DailyWorkflowIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ===== CTA CARD ========================================= */}
      <Sequence from={1470} durationInFrames={60} premountFor={15}>
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
        endAt={Math.min(30 * 35, TOTAL_FRAMES)}
      />
    </AbsoluteFill>
  );
};
