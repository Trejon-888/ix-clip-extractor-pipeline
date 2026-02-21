import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
  Audio,
  Img,
} from "remotion";
import { COLORS } from "../lib/colors";
import { WORDS, TOTAL_DURATION_FRAMES } from "../data/opus46-announcement-words";
import { AppleStylePopup } from "../components/AppleStylePopup";
import {
  Opus46BadgeV2,
  MassiveUpgradeV2,
  IntelligentBrainV2,
  PlanCarefullyV2,
  CatchMistakesV2,
  ClaudeCodeTerminalV2,
  OneMillionTokensV2,
  EntireCodebasesV2,
  FinancialAnalysisV2,
  PresentationSlidesV2,
  GoogleWorkspaceCrossedV2,
  MultitaskingV2,
  AgentTeamsNetworkV2,
  OrchestratorHubV2,
  SevenXTokensV2,
  SubagentsComparisonV2,
  AnthropicLogoV2,
  FavoriteModelV2,
} from "../lib/illustrations/Opus46IllustrationsV2";

/**
 * CLAUDE OPUS 4.6 ANNOUNCEMENT
 *
 * LAYOUT: Full-screen talking head (NOT split zones)
 * - Base: Speaker fills entire 1080x1920 frame
 * - Floating frame: Source content overlay (top-right PIP)
 * - Captions: Bottom area, word-by-word
 * - Popups: WhitePopupReveal at z-index 100
 * - SFX: Strategic pop/whoosh sounds
 * - Background music: 0.02 volume
 *
 * Duration: ~130s (3904 frames @ 30fps)
 */

interface FloatingFrameEvent {
  frame: number;
  duration: number;
  label: string;
  type: "video" | "image";
  src: string;
  startFrom?: number; // frame offset for video sources
}

interface Props {
  videoSrc: string;
}

export const ClaudeOpus46Announcement: React.FC<Props> = ({ videoSrc }) => {
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // ===== INTRO FLASH =====
  const INTRO_FLASH_DURATION = 5;
  const flashOpacity = interpolate(
    frame,
    [0, INTRO_FLASH_DURATION - 2, INTRO_FLASH_DURATION],
    [1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ===== POPUP EVENTS (18 moments) =====
  // V2: Apple-style illustrations with motion, white backgrounds
  // Durations increased for key reveals, animations need time to breathe
  const POPUP_EVENTS = [
    // ACT 1: Hook (frames 0-400)
    { frame: 18, duration: 60, illustration: <Opus46BadgeV2 />, caption: "OPUS 4.6", subtitle: "Claude's smartest model" },
    { frame: 209, duration: 55, illustration: <MassiveUpgradeV2 />, caption: "MASSIVE UPGRADE" },

    // ACT 2: Number One — Smarter (frames 428-1060)
    { frame: 498, duration: 65, illustration: <IntelligentBrainV2 />, caption: "MORE INTELLIGENT", subtitle: "Neural connections, better reasoning" },
    { frame: 600, duration: 55, illustration: <PlanCarefullyV2 />, caption: "PLANS CAREFULLY" },
    { frame: 732, duration: 60, illustration: <CatchMistakesV2 />, caption: "CATCHES MISTAKES" },
    { frame: 842, duration: 55, illustration: <ClaudeCodeTerminalV2 />, caption: "CLAUDE CODE", subtitle: "For developers" },

    // ACT 3: Number Two — 1M Context (frames 1074-1370)
    { frame: 1155, duration: 90, illustration: <OneMillionTokensV2 />, caption: "1,000,000 TOKENS", subtitle: "The biggest context window" },
    { frame: 1276, duration: 60, illustration: <EntireCodebasesV2 />, caption: "ENTIRE CODEBASES" },

    // ACT 4: Number Three — Capabilities (frames 1371-2160)
    { frame: 1487, duration: 60, illustration: <FinancialAnalysisV2 />, caption: "FINANCIAL ANALYSIS" },
    { frame: 1694, duration: 55, illustration: <PresentationSlidesV2 />, caption: "CREATES SLIDES", subtitle: "In real time" },
    { frame: 1782, duration: 55, illustration: <GoogleWorkspaceCrossedV2 />, caption: "USE CLAUDE INSTEAD" },
    { frame: 2044, duration: 70, illustration: <MultitaskingV2 />, caption: "MULTITASKS FOR YOU", subtitle: "Co-work autonomy" },

    // ACT 5: Number Four — Agent Teams (frames 2169-3400)
    { frame: 2221, duration: 80, illustration: <AgentTeamsNetworkV2 />, caption: "AGENT TEAMS", subtitle: "Independent Claude instances" },
    { frame: 2511, duration: 110, illustration: <OrchestratorHubV2 />, caption: "ORCHESTRATOR", subtitle: "Delegates, coordinates, completes" },
    { frame: 3018, duration: 60, illustration: <SevenXTokensV2 />, caption: "THE TRADEOFF" },
    { frame: 3242, duration: 65, illustration: <SubagentsComparisonV2 />, caption: "NEXT VIDEO" },

    // ACT 6: Close (frames 3400-3904)
    { frame: 3445, duration: 55, illustration: <AnthropicLogoV2 />, caption: "CLAUDE", subtitle: "You did a great job" },
    { frame: 3683, duration: 55, illustration: <FavoriteModelV2 />, caption: "MY FAVORITE MODEL" },
  ];

  // ===== SOUND EFFECTS =====
  const SFX_EVENTS = [
    // Popup entrance SFX
    { frame: 18, sfx: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },    // Opus 4.6
    { frame: 209, sfx: "audio/whoosh-effect-382717.mp3", volume: 0.20 },       // Massive upgrade
    { frame: 498, sfx: "audio/pop-402324.mp3", volume: 0.22 },                 // Intelligent
    { frame: 587, sfx: "audio/pop-402324.mp3", volume: 0.20 },                 // Plan
    { frame: 732, sfx: "audio/pop-402324.mp3", volume: 0.20 },                 // Catch mistakes
    { frame: 842, sfx: "audio/pop-402324.mp3", volume: 0.22 },                 // Claude Code
    { frame: 1155, sfx: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },   // 1 MILLION (big moment)
    { frame: 1276, sfx: "audio/pop-402324.mp3", volume: 0.20 },                // Codebases
    { frame: 1487, sfx: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },      // Financial
    { frame: 1694, sfx: "audio/pop-402324.mp3", volume: 0.20 },                // Slides
    { frame: 1782, sfx: "audio/whoosh-effect-382717.mp3", volume: 0.20 },      // Google Workspace
    { frame: 2044, sfx: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },      // Multitasking
    { frame: 2221, sfx: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },   // Agent teams (big)
    { frame: 2511, sfx: "audio/whoosh-bamboo-389752.mp3", volume: 0.20 },      // Orchestrator
    { frame: 3018, sfx: "audio/whoosh-effect-382717.mp3", volume: 0.20 },      // 7X tokens
    { frame: 3242, sfx: "audio/pop-402324.mp3", volume: 0.20 },                // Subagents comparison
    { frame: 3445, sfx: "audio/pop-402324.mp3", volume: 0.22 },                // Claude
    { frame: 3683, sfx: "audio/pop-402324.mp3", volume: 0.20 },                // Favorite
  ];

  // ===== ZOOM KEYFRAMES for dynamic energy =====
  const ZOOM_KEYFRAMES = [
    { frame: 0, zoom: 1.0 },
    { frame: 18, zoom: 1.04 },      // Hook energy
    { frame: 209, zoom: 1.06 },     // "massive upgrade"
    { frame: 400, zoom: 1.02 },     // Settle
    { frame: 498, zoom: 1.05 },     // "intelligent"
    { frame: 700, zoom: 1.02 },     // Breathe
    { frame: 842, zoom: 1.04 },     // "Claude Code"
    { frame: 1074, zoom: 1.06 },    // "Number two" build
    { frame: 1155, zoom: 1.08 },    // "ONE MILLION" peak
    { frame: 1340, zoom: 1.03 },    // "Massive" settle
    { frame: 1487, zoom: 1.05 },    // Financial
    { frame: 1700, zoom: 1.02 },    // Breathe
    { frame: 2044, zoom: 1.04 },    // Multitasking
    { frame: 2221, zoom: 1.07 },    // Agent teams energy
    { frame: 2511, zoom: 1.05 },    // Orchestrator
    { frame: 2800, zoom: 1.02 },    // Settle
    { frame: 3018, zoom: 1.06 },    // 7x tokens
    { frame: 3400, zoom: 1.0 },     // Wind down
    { frame: 3588, zoom: 1.04 },    // "Let's go!" energy
    { frame: 3700, zoom: 1.0 },     // Final settle
  ];

  // Calculate current zoom
  const getCurrentZoom = () => {
    for (let i = ZOOM_KEYFRAMES.length - 1; i >= 0; i--) {
      if (frame >= ZOOM_KEYFRAMES[i].frame) {
        if (i === ZOOM_KEYFRAMES.length - 1) return ZOOM_KEYFRAMES[i].zoom;
        const next = ZOOM_KEYFRAMES[i + 1];
        const current = ZOOM_KEYFRAMES[i];
        return interpolate(
          frame,
          [current.frame, next.frame],
          [current.zoom, next.zoom],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
      }
    }
    return 1.0;
  };

  const currentZoom = getCurrentZoom();

  // ===== FLOATING FRAME EVENTS (source content PIP) =====
  // Shows real Anthropic announcement content as a floating overlay
  // Source: https://www.anthropic.com/news/claude-opus-4-6
  const FLOATING_FRAME_EVENTS: FloatingFrameEvent[] = [
    // During opening section — show intro video (expanded: visible from hook through smarter section)
    { frame: 137, duration: 700, label: "ANTHROPIC ANNOUNCEMENT", type: "video", src: "source-content/opus46-intro.mp4", startFrom: 0 },
    // During "Number two — 1M context" — show product updates (context section ~20s in)
    { frame: 1074, duration: 266, label: "1M CONTEXT WINDOW", type: "video", src: "source-content/opus46-product-updates.mp4", startFrom: 600 },
    // During "Number three — capabilities" — show product updates (capabilities ~45s in)
    { frame: 1371, duration: 500, label: "NEW CAPABILITIES", type: "video", src: "source-content/opus46-product-updates.mp4", startFrom: 1350 },
    // During "Agent teams" section — show product updates (agent teams ~65s in)
    { frame: 2169, duration: 400, label: "AGENT TEAMS IN CLAUDE CODE", type: "video", src: "source-content/opus46-product-updates.mp4", startFrom: 1950 },
  ];

  // Caption visibility — hide during popups
  const isFrameInPopup = (wordFrame: number) => {
    return POPUP_EVENTS.some(
      (evt) => wordFrame >= evt.frame && wordFrame < evt.frame + evt.duration
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>

      {/* INTRO FLASH */}
      <Sequence from={0} durationInFrames={INTRO_FLASH_DURATION}>
        <AbsoluteFill style={{ backgroundColor: COLORS.primary, opacity: flashOpacity, zIndex: 50 }} />
      </Sequence>

      {/* ===== LAYER 1: FULL-SCREEN SPEAKER VIDEO with zoom ===== */}
      <AbsoluteFill>
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `scale(${currentZoom})`,
            transformOrigin: "center center",
            filter: "brightness(1.03) contrast(1.08) saturate(1.05)",
          }}
        >
          <OffthreadVideo
            src={staticFile(videoSrc)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </AbsoluteFill>

      {/* ===== LAYER 2: FLOATING FRAME OVERLAY (source content PIP) ===== */}
      {/* Shows a rounded-corner window with Anthropic announcement content */}
      {FLOATING_FRAME_EVENTS.map((evt, idx) => (
        <Sequence
          key={`float-${idx}`}
          from={evt.frame}
          durationInFrames={evt.duration}
          premountFor={fps}
        >
          <FloatingSourceFrame
            label={evt.label}
            type={evt.type}
            src={evt.src}
            startFrom={evt.startFrom}
            durationInFrames={evt.duration}
          />
        </Sequence>
      ))}

      {/* ===== LAYER 3: BOTTOM CAPTION BAR ===== */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "12%",
          background: "linear-gradient(transparent, rgba(0,0,0,0.85) 30%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        {WORDS.filter((w) => !isFrameInPopup(w.frame)).map((wordEntry) => (
          <Sequence
            key={`cap-${wordEntry.id}`}
            from={wordEntry.frame}
            durationInFrames={Math.max(wordEntry.duration, 4)}
            premountFor={fps}
          >
            <div
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
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: "72px",
                  fontWeight: 800,
                  color: wordEntry.emphasis ? "#FF7614" : COLORS.white,
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  textShadow: wordEntry.emphasis
                    ? "0 0 20px rgba(255, 118, 20, 0.6), 0 4px 12px rgba(0,0,0,0.8)"
                    : "0 4px 12px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)",
                  padding: "0 60px",
                }}
              >
                {wordEntry.word}
              </div>
            </div>
          </Sequence>
        ))}
      </div>

      {/* ===== LAYER 4: POPUP LAYER (z-index 100) ===== */}
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {POPUP_EVENTS.map((evt, idx) => (
          <Sequence
            key={`popup-${idx}`}
            from={evt.frame}
            durationInFrames={evt.duration}
            premountFor={15}
          >
            <AppleStylePopup
              durationInFrames={evt.duration}
              illustration={evt.illustration}
              caption={evt.caption}
              subtitle={evt.subtitle}
              illustrationSize={900}
            />
          </Sequence>
        ))}
      </div>

      {/* ===== LAYER 5: BACKGROUND MUSIC ===== */}
      <Audio
        src={staticFile("audio/background-music.mp3")}
        volume={0.02}
        startFrom={0}
        endAt={TOTAL_DURATION_FRAMES}
      />

      {/* ===== LAYER 6: SOUND EFFECTS ===== */}
      {SFX_EVENTS.map((sfx, idx) => (
        <Sequence key={`sfx-${idx}`} from={sfx.frame} durationInFrames={30}>
          <Audio src={staticFile(sfx.sfx)} volume={sfx.volume} />
        </Sequence>
      ))}

    </AbsoluteFill>
  );
};

/**
 * FloatingSourceFrame — PIP overlay showing REAL source content
 * Appears as a rounded-corner window in the top-right area
 * Uses actual Anthropic announcement videos/images downloaded from YouTube
 */
const FloatingSourceFrame: React.FC<{
  label: string;
  type: "video" | "image";
  src: string;
  startFrom?: number;
  durationInFrames: number;
}> = ({ label, type, src, startFrom = 0, durationInFrames }) => {
  const frame = useCurrentFrame();

  // Entrance: slide in from right + fade
  const enterProgress = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slideX = interpolate(enterProgress, [0, 1], [60, 0]);
  const opacity = enterProgress;

  // Exit: fade out in last 10 frames
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const overallOpacity = Math.min(opacity, exitOpacity);

  // Subtle shadow pulse
  const shadowIntensity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "4%",
        right: "3%",
        width: "62%",
        height: "20%",
        transform: `translateX(${slideX}px)`,
        opacity: overallOpacity,
        zIndex: 20,
      }}
    >
      {/* 16:9 rounded container with brand border */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "20px",
          overflow: "hidden",
          border: `3px solid rgba(255, 118, 20, ${0.4 + shadowIntensity * 0.4})`,
          boxShadow: `0 10px 40px rgba(0,0,0,0.5), 0 0 ${24 * shadowIntensity}px rgba(255, 118, 20, 0.25)`,
          position: "relative",
        }}
      >
        {/* Real source content — 16:9 video/image */}
        {type === "video" ? (
          <OffthreadVideo
            src={staticFile(src)}
            volume={0}
            startFrom={startFrom}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Img
            src={staticFile(src)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* Bottom label bar with Claude logo */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "10px 14px",
            background: "linear-gradient(transparent, rgba(0,0,0,0.88))",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Img
            src={staticFile("logos/claude-ai-icon.svg")}
            style={{ width: 28, height: 28 }}
          />
          <div
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: "14px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "0.8px",
            }}
          >
            CLAUDE
          </div>
          <div
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: "11px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};
