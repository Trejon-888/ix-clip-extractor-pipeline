/**
 * Clip 6: Voice Control Demo — V3.1 (User Feedback Applied)
 *
 * PHILOSOPHY: Scene-layer editing, not popup-based.
 * Concept visualizations build and evolve over time.
 * Full-screen solid-white concept overlays with BIG illustrations.
 * Real logos and images, not text overlays or abbreviations.
 *
 * USER FEEDBACK APPLIED (V3.1):
 *  1. Claude Code real logo at beginning
 *  2. Voice interaction visual for "talking with it"
 *  3. Full-screen white illustration for "short-form video"
 *  4. Platform cascade bigger + repositioned (center)
 *  5. Skills = ConceptOverlay (not text)
 *  6. Posted = ConceptOverlay (not tiny badge)
 *  7. Voice prompt = solid white bg + clean illustration
 *  8. Metadata badges improved (bigger font)
 *  9. 13 Platforms with real SVG logos, bigger
 * 10. CTA with YouTube thumbnail
 *
 * Duration: ~70s (2096 frames @ 30fps)
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
import { WORDS, TOTAL_DURATION_FRAMES } from "../data/clip6-voice-control-words";
import { KineticText } from "../components/KineticText";
import { ConceptOverlay } from "../components/ConceptOverlay";
import { PlatformCascade } from "../components/PlatformCascade";

import { VoicePromptClean } from "../lib/illustrations/VoicePromptClean";
import { ShortFormVideoIllustration } from "../lib/illustrations/ShortFormVideoIllustration";
import { SkillsIllustration } from "../lib/illustrations/SkillsIllustration";
import { VideoPostedIllustration } from "../lib/illustrations/VideoPostedIllustration";
import { ThirteenPlatformsV2 } from "../lib/illustrations/ThirteenPlatformsV2";
import { OpusAnnouncementIllustration } from "../lib/illustrations/OpusAnnouncementIllustration";

const { fontFamily } = loadFont();

// ═══════════════════════════════════════════════════════════════
// ZOOM KEYFRAMES
// ═══════════════════════════════════════════════════════════════
// Only the initial hook punch — no continuous zoom swimming
const ZOOM_KEYFRAMES: Array<{ frame: number; zoom: number }> = [
  { frame: 0, zoom: 1.06 },
  { frame: 5, zoom: 1.0 },
];

function getZoom(frame: number): number {
  if (frame <= ZOOM_KEYFRAMES[0].frame) return ZOOM_KEYFRAMES[0].zoom;
  if (frame >= ZOOM_KEYFRAMES[ZOOM_KEYFRAMES.length - 1].frame) {
    return ZOOM_KEYFRAMES[ZOOM_KEYFRAMES.length - 1].zoom;
  }
  for (let i = 0; i < ZOOM_KEYFRAMES.length - 1; i++) {
    const a = ZOOM_KEYFRAMES[i];
    const b = ZOOM_KEYFRAMES[i + 1];
    if (frame >= a.frame && frame <= b.frame) {
      return interpolate(frame, [a.frame, b.frame], [a.zoom, b.zoom], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
  }
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  // Act 1: Hook
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  { frame: 14, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 87, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
  { frame: 155, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.16 },
  // Act 2
  { frame: 255, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 312, src: "audio/pop-402324.mp3", volume: 0.20 },
  { frame: 340, src: "audio/pop-402324.mp3", volume: 0.20 },
  { frame: 393, src: "audio/pop-402324.mp3", volume: 0.20 },
  { frame: 455, src: "audio/pop-402324.mp3", volume: 0.20 },
  { frame: 556, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // Act 3
  { frame: 694, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 808, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.18 },
  { frame: 904, src: "audio/pop-402324.mp3", volume: 0.22 },
  // Act 4
  { frame: 1123, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1188, src: "audio/pop-402324.mp3", volume: 0.22 },
  // Act 5
  { frame: 1371, src: "audio/pop-402324.mp3", volume: 0.22 },
  { frame: 1412, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.16 },
  { frame: 1442, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
  { frame: 1728, src: "audio/whoosh-effect-382717.mp3", volume: 0.22 },
  // Act 6
  { frame: 1797, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.18 },
  { frame: 2038, src: "audio/pop-402324.mp3", volume: 0.16 },
];

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
const COMMAND_PLATFORMS = [
  { name: "YouTube", logoSrc: "logos/youtube.svg", frame: 314, brandColor: "#FF0000" },
  { name: "TikTok", logoSrc: "logos/tiktok.svg", frame: 342, brandColor: "#000000" },
  { name: "Threads", logoSrc: "logos/threads.svg", frame: 395, brandColor: "#000000" },
  { name: "Instagram", logoSrc: "logos/instagram.svg", frame: 457, brandColor: "#E4405F" },
];

const ALL_PLATFORMS = [
  { name: "YouTube", logoSrc: "logos/youtube.svg", frame: 89, brandColor: "#FF0000" },
  { name: "Instagram", logoSrc: "logos/instagram.svg", frame: 91, brandColor: "#E4405F" },
  { name: "LinkedIn", logoSrc: "logos/linkedin.svg", frame: 93, brandColor: "#0A66C2" },
  { name: "X", logoSrc: "logos/x.svg", frame: 95, brandColor: "#000000" },
  { name: "TikTok", logoSrc: "logos/tiktok.svg", frame: 97, brandColor: "#000000" },
  { name: "Facebook", logoSrc: "logos/facebook.svg", frame: 99, brandColor: "#1877F2" },
  { name: "Pinterest", logoSrc: "logos/pinterest.svg", frame: 101, brandColor: "#E60023" },
  { name: "Threads", logoSrc: "logos/threads.svg", frame: 103, brandColor: "#000000" },
  { name: "Bluesky", logoSrc: "logos/bluesky.svg", frame: 105, brandColor: "#0085FF" },
];

// Metadata items with their reveal frames (relative to Act 5 start)
const METADATA_ITEMS: Array<{ label: string; frame: number }> = [
  { label: "Title", frame: 1444 },
  { label: "Status: Published", frame: 1482 },
  { label: "Post ID", frame: 1538 },
  { label: "Thumbnail", frame: 1605 },
  { label: "Description", frame: 1618 },
  { label: "Tags", frame: 1633 },
  { label: "First Comment", frame: 1655 },
  { label: "Category", frame: 1668 },
];

// ═══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════════
export const Clip6VoiceControlDemoV3: React.FC<{
  videoSrc?: string;
}> = ({ videoSrc = "clip-6-voice-control-demo.mp4" }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const zoom = getZoom(frame);

  const hookFlash = interpolate(frame, [0, 3], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const boomFrame = frame - 1190;
  const boomFlash =
    boomFrame >= 0 && boomFrame <= 3
      ? interpolate(boomFrame, [0, 3], [0.8, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // Captions hide during full-screen concept overlays
  const conceptActive =
    (frame >= 257 && frame <= 312) ||  // Short-form video
    (frame >= 558 && frame <= 618) ||  // Skills
    (frame >= 696 && frame <= 756) ||  // Posted
    (frame >= 810 && frame <= 878) ||  // Voice prompt
    (frame >= 1125 && frame <= 1190) || // Opus 4.6
    (frame >= 1799 && frame <= 1889);  // 13 platforms

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* ── BASE: Speaker video ──────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        <OffthreadVideo
          src={staticFile(videoSrc)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* ── FLASHES ──────────────────────────────────────────── */}
      {hookFlash > 0 && (
        <AbsoluteFill style={{ backgroundColor: "#FF7614", opacity: hookFlash, zIndex: 90 }} />
      )}
      {boomFlash > 0 && (
        <AbsoluteFill style={{ backgroundColor: "#FFFFFF", opacity: boomFlash, zIndex: 90 }} />
      )}

      {/* ═════ ACT 1: HOOK (0-190) ═════════════════════════════ */}

      {/* Point 1: Claude Code REAL LOGO */}
      <Sequence from={16} durationInFrames={50} premountFor={15}>
        <ClaudeCodeLogoReveal durationInFrames={50} />
      </Sequence>

      {/* Platform grid flash */}
      <Sequence from={89} durationInFrames={58} premountFor={15}>
        <PlatformCascade
          platforms={ALL_PLATFORMS}
          durationInFrames={58}
          startFrame={89}
          logoSize={56}
          position="center"
          exitFadeFrames={12}
        />
      </Sequence>

      {/* Point 2: Voice waveform visual for "talking with it" */}
      <Sequence from={157} durationInFrames={33} premountFor={15}>
        <VoiceWaveVisual durationInFrames={33} />
      </Sequence>

      {/* ═════ ACT 2: THE COMMAND (193-558) ════════════════════ */}

      {/* Point 3: Full-screen white — "short-form video" */}
      <Sequence from={257} durationInFrames={55} premountFor={15}>
        <ConceptOverlay
          durationInFrames={55}
          illustration={<ShortFormVideoIllustration />}
          caption="SHORT-FORM VIDEO"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={550}
        />
      </Sequence>

      {/* Point 4: Platform cascade — BIGGER, CENTER */}
      <Sequence from={314} durationInFrames={220} premountFor={15}>
        <PlatformCascade
          platforms={COMMAND_PLATFORMS}
          durationInFrames={220}
          startFrame={314}
          logoSize={100}
          position="center"
          exitFadeFrames={15}
          showLabels
        />
      </Sequence>

      {/* Point 5: Skills ConceptOverlay */}
      <Sequence from={558} durationInFrames={60} premountFor={15}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<SkillsIllustration />}
          caption="SKILLS ACTIVATED"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={500}
        />
      </Sequence>

      {/* ═════ ACT 3: THE PROOF (628-948) ══════════════════════ */}

      {/* Point 6: Posted ConceptOverlay (not tiny badge) */}
      <Sequence from={696} durationInFrames={60} premountFor={15}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<VideoPostedIllustration />}
          caption="VIDEO POSTED"
          subtitle="Across all platforms"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={500}
        />
      </Sequence>

      {/* Point 7: Voice prompt — solid white + clean illustration */}
      <Sequence from={810} durationInFrames={68} premountFor={15}>
        <ConceptOverlay
          durationInFrames={68}
          illustration={<VoicePromptClean />}
          caption="ONE VOICE PROMPT"
          subtitle="Talk → Post → Done"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={550}
        />
      </Sequence>

      {/* "INCREDIBLE" — user liked this one */}
      <Sequence from={906} durationInFrames={42} premountFor={15}>
        <KineticText
          text="INCREDIBLE"
          fontSize={80}
          fontWeight={900}
          color="#FFFFFF"
          entrance="spring-scale"
          staggerDelay={2}
          damping={10}
          stiffness={180}
          verticalPosition={0.5}
          durationInFrames={42}
          exitFadeFrames={8}
          textShadow="0 6px 30px rgba(0,0,0,0.6)"
        />
      </Sequence>

      {/* ═════ ACT 4: THREAD DEMO (959-1280) ══════════════════ */}

      {/* "Claude Opus 4.6 dropped today" — full-screen concept overlay */}
      <Sequence from={1125} durationInFrames={65} premountFor={15}>
        <ConceptOverlay
          durationInFrames={65}
          illustration={<OpusAnnouncementIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={550}
        />
      </Sequence>

      {/* ═════ ACT 5: YOUTUBE RESULTS (1295-1712) ═════════════ */}

      <Sequence from={1373} durationInFrames={35} premountFor={15}>
        <KineticText
          text="PUBLISHED"
          fontSize={56}
          fontWeight={800}
          color="#22C55E"
          entrance="spring-scale"
          staggerDelay={2}
          verticalPosition={0.15}
          durationInFrames={35}
          exitFadeFrames={8}
          textShadow="0 4px 20px rgba(0,0,0,0.6)"
        />
      </Sequence>

      <Sequence from={1414} durationInFrames={280} premountFor={15}>
        <PlatformCascade
          platforms={[{ name: "YouTube", logoSrc: "logos/youtube.svg", frame: 1414, brandColor: "#FF0000" }]}
          durationInFrames={280}
          startFrame={1414}
          logoSize={64}
          position="top-left"
          exitFadeFrames={10}
        />
      </Sequence>

      {/* Point 8: Unified metadata checklist panel */}
      <Sequence from={1444} durationInFrames={268} premountFor={15}>
        <MetadataChecklist durationInFrames={268} startFrame={1444} />
      </Sequence>

      <Sequence from={1730} durationInFrames={50} premountFor={15}>
        <KineticText
          text="LET'S GO"
          fontSize={88}
          fontWeight={900}
          color="#FF7614"
          entrance="spring-scale"
          staggerDelay={3}
          damping={8}
          stiffness={200}
          verticalPosition={0.5}
          durationInFrames={50}
          exitFadeFrames={8}
          textShadow="0 6px 30px rgba(0,0,0,0.7)"
        />
      </Sequence>

      {/* ═════ ACT 6: FINALE (1799-2096) ══════════════════════ */}

      {/* Point 9: 13 Platforms with REAL logos */}
      <Sequence from={1799} durationInFrames={90} premountFor={15}>
        <ConceptOverlay
          durationInFrames={90}
          illustration={<ThirteenPlatformsV2 />}
          caption="13 PLATFORMS"
          subtitle="All connected. All automated."
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={650}
        />
      </Sequence>

      {/* Point 10: CTA with YouTube thumbnail */}
      <Sequence from={1945} durationInFrames={151} premountFor={15}>
        <CTACard durationInFrames={151} />
      </Sequence>

      {/* ═════ CAPTIONS (25-30% from bottom) ══════════════════ */}
      <div
        style={{
          position: "absolute",
          bottom: "22%",
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

      {/* ═════ SFX ════════════════════════════════════════════ */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} durationInFrames={30} premountFor={15}>
          <Audio src={staticFile(sfx.src)} volume={sfx.volume} />
        </Sequence>
      ))}

      {/* ═════ BACKGROUND MUSIC ══════════════════════════════ */}
      <Audio src={staticFile("audio/lofi-background.mp3")} volume={0.02} startFrom={0} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// Point 1: Claude Code Real Logo Reveal
// ═══════════════════════════════════════════════════════════════
const ClaudeCodeLogoReveal: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    from: 0.4,
    to: 1,
    config: { damping: 12, stiffness: 160 },
  });

  const opacity = spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "12%",
        left: "50%",
        transform: `translateX(-50%) scale(${scale})`,
        opacity: opacity * exitOpacity,
        zIndex: 30,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(255, 118, 20, 0.2)",
          border: "2px solid rgba(255, 118, 20, 0.3)",
        }}
      >
        <Img
          src={staticFile("logos/claude-code-terminal.webp")}
          style={{ width: 400, height: "auto", display: "block" }}
        />
      </div>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: 36,
          color: "#FFFFFF",
          letterSpacing: 4,
          textShadow: "0 4px 16px rgba(0,0,0,0.7)",
        }}
      >
        CLAUDE CODE
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Point 2: Voice Waveform Visual
// ═══════════════════════════════════════════════════════════════
const VoiceWaveVisual: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 140 },
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const barHeights = [
    interpolate(frame % 12, [0, 6, 12], [20, 45, 20], { extrapolateRight: "clamp" }),
    interpolate((frame + 3) % 14, [0, 7, 14], [15, 55, 15], { extrapolateRight: "clamp" }),
    interpolate((frame + 1) % 10, [0, 5, 10], [25, 60, 25], { extrapolateRight: "clamp" }),
    interpolate((frame + 5) % 13, [0, 6, 13], [18, 50, 18], { extrapolateRight: "clamp" }),
    interpolate((frame + 2) % 11, [0, 5, 11], [22, 42, 22], { extrapolateRight: "clamp" }),
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: "15%",
        right: "8%",
        opacity: enterProgress * exitOpacity,
        zIndex: 25,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 6,
          padding: "16px 20px",
          borderRadius: 20,
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          height: 80,
        }}
      >
        {barHeights.map((h, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: h,
              borderRadius: 5,
              backgroundColor: "#FF7614",
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: "#FFFFFF",
          letterSpacing: 1.5,
          textShadow: "0 2px 8px rgba(0,0,0,0.7)",
        }}
      >
        LISTENING
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Point 10: CTA Card with YouTube Thumbnail
// ═══════════════════════════════════════════════════════════════
const CTACard: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const slideY = interpolate(enterProgress, [0, 1], [40, 0]);

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: `translateX(-50%) translateY(${slideY}px)`,
        opacity: enterProgress * exitOpacity,
        zIndex: 40,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: "28px 40px",
          borderRadius: 28,
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          width: 660,
        }}
      >
        {/* YouTube thumbnail — bigger */}
        <div style={{ width: "100%", borderRadius: 16, overflow: "hidden", boxShadow: "0 6px 20px rgba(0,0,0,0.12)" }}>
          <Img
            src={staticFile("thumbnails/youtube-ai-social-media-manager.png")}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Img src={staticFile("logos/youtube.svg")} style={{ width: 40, height: 40 }} />
          <div
            style={{
              fontFamily: "Inter, sans-serif",
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
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 22,
            color: "#666666",
            textAlign: "center",
          }}
        >
          AI Agent Social Media Manager Tutorial
        </div>

        <div style={{ width: 100, height: 3, backgroundColor: "#FF7614", borderRadius: 2 }} />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Point 8: Unified Metadata Checklist Panel
// ═══════════════════════════════════════════════════════════════
const MetadataChecklist: React.FC<{
  durationInFrames: number;
  startFrame: number;
}> = ({ durationInFrames, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const absoluteFrame = frame + startFrame;

  // Panel entrance (slides in from right)
  const panelEnter = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 16, stiffness: 100 },
  });
  const panelX = interpolate(panelEnter, [0, 1], [60, 0]);

  // Panel exit (last 15 frames)
  const panelExit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        right: "5%",
        top: "50%",
        transform: `translateY(-50%) translateX(${panelX}px)`,
        opacity: panelEnter * panelExit,
        zIndex: 35,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          padding: "20px 0",
          borderRadius: 24,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          width: 320,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "0 24px 14px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Img src={staticFile("logos/youtube.svg")} style={{ width: 24, height: 24 }} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: "#1A1A1A",
              letterSpacing: 1,
            }}
          >
            YOUTUBE PUBLISH
          </span>
        </div>

        {/* Checklist items */}
        {METADATA_ITEMS.map((item, i) => {
          const isVisible = absoluteFrame >= item.frame;
          const itemDelay = Math.max(0, absoluteFrame - item.frame);
          const itemProgress = isVisible
            ? spring({
                frame: itemDelay,
                fps,
                from: 0,
                to: 1,
                config: { damping: 14, stiffness: 160 },
              })
            : 0;

          return (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 24px",
                opacity: itemProgress,
                transform: `translateX(${interpolate(itemProgress, [0, 1], [20, 0])}px)`,
                borderBottom:
                  i < METADATA_ITEMS.length - 1
                    ? "1px solid rgba(0,0,0,0.04)"
                    : "none",
              }}
            >
              {/* Checkmark circle */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: "#22C55E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transform: `scale(${itemProgress})`,
                }}
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 12.5L10 16.5L18 8.5"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Label */}
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 17,
                  color: "#1A1A1A",
                  letterSpacing: 0.5,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
