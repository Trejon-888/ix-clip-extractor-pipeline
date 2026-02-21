import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  Audio,
  interpolate,
  spring,
} from "remotion";
import { TOTAL_DURATION_FRAMES } from "../data/crafting-outreach-campaign-words";
import { AppleStylePopup } from "../components/AppleStylePopup";
import { ConceptOverlay } from "../components/ConceptOverlay";
// ===== INTRO ILLUSTRATIONS (14 unique components) =====
import {
  LaunchCountdown,
  SalesCampaignBlueprint,
  CampaignPrepBRoll,
  OutreachFlyout,
  MeetDexNameplate,
  ClarityMomentLens,
  CampaignFlowPipeline,
  TestIterationLoop,
  CampaignBrainV2,
  PowerBeastMetaphor,
  DeepDiveQuestion,
  PromptTerminalWindow,
  FlowStagesWaterfall,
  ResultsDashboardMini,
} from "../lib/illustrations/CraftingOutreachIntro";
// ===== MIDROLL ILLUSTRATIONS (10 unique components) =====
import {
  SackIntroCard,
  DoubledRevenueGrowth,
  AICircuitBoard,
  Revenue90KCounter,
  ResellFlywheel,
  DoubleBookingsCalendar,
  ClientGrowthNetwork,
  FreeCampaignCTABadge,
  ZoneOfGeniusSpotlight,
  GetStartedRocketButton,
} from "../lib/illustrations/CraftingOutreachMidroll";
// ===== END ILLUSTRATIONS (14 unique components) =====
import {
  FinalTipsChecklist,
  TestAIBackAndForth,
  CampaignBrainEndV2,
  LiveRepliesChat,
  SetupTimerTwentyMin,
  StrategyWhiteboardScene,
  HourglassTimerSession,
  CopyEditorTypewriter,
  InfinitePossibilitiesExpansion,
  PerformanceGaugeDashboard,
  ConceptPuzzleCompletion,
  YouTubeSubscribeButton,
  LinkedInConnectButton,
  DexLinkedInProfileCard,
} from "../lib/illustrations/CraftingOutreachEnd";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

/**
 * CRAFTING AI OUTREACH CAMPAIGN — YouTube Long-Form Tutorial V4
 *
 * LAYOUT: Full-screen landscape (1920x1080)
 * Duration: ~28.5 min (51430 frames @ 30fps)
 * Source: OBS intro (Enrique) + Dex screen-share demo
 *
 * V4 ILLUSTRATION-FIRST: 38 unique illustration components
 *   - Most popups are ILLUSTRATION ONLY (no text) at 800px
 *   - Text kept only for CTAs and character introductions
 *   - Illustrations speak for themselves — bigger, bolder, cleaner
 *   - Hero openers use ConceptOverlay with clip-circle entrance
 *   - Frosted backgrounds for analytical/flow moments
 *   - Varied SFX per popup type (pop, whoosh, bamboo, click)
 *
 * SECTIONS:
 *   - Intro (0:00-4:00): 14 popups + 1 section break
 *   - Mid-roll (17:39-19:07): 10 popups + 1 section break
 *   - End (25:25-28:35): 14 popups
 *   - Music: First 35 seconds only
 */

// ===== SECTION BREAK COMPONENT =====
const SectionBreak: React.FC<{
  sectionNumber: number;
  title: string;
  subtitle: string;
  durationInFrames: number;
}> = ({ sectionNumber, title, subtitle, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  const numScale = spring({
    frame,
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });
  const numOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const titleProgress = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  const lineWidth = spring({
    frame: Math.max(0, frame - 6),
    fps,
    from: 0,
    to: 160,
    config: { damping: 14, stiffness: 100 },
  });

  const subProgress = spring({
    frame: Math.max(0, frame - 16),
    fps,
    from: 0,
    to: 1,
    config: { damping: 18, stiffness: 80 },
  });

  const numStr = String(sectionNumber).padStart(2, "0");

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        opacity,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          opacity: numOpacity * 0.08,
          transform: `scale(${numScale})`,
          fontFamily,
          fontWeight: 900,
          fontSize: 400,
          color: "#FF6B00",
          lineHeight: 1,
        }}
      >
        {numStr}
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 600,
          fontSize: 24,
          color: "#FF6B00",
          letterSpacing: 6,
          opacity: numOpacity,
          transform: `scale(${numScale})`,
          marginBottom: 20,
        }}
      >
        SECTION {numStr}
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 80,
          color: "#1A1A1A",
          letterSpacing: -1,
          opacity: titleProgress,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          padding: "0 100px",
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
      <div
        style={{
          width: lineWidth,
          height: 4,
          backgroundColor: "#FF6B00",
          borderRadius: 2,
          marginTop: 24,
          marginBottom: 24,
        }}
      />
      <div
        style={{
          fontFamily,
          fontWeight: 500,
          fontSize: 28,
          color: "#888888",
          letterSpacing: 2,
          opacity: subProgress,
          textAlign: "center",
          padding: "0 120px",
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};

// ===== POPUP EVENT TYPES =====
interface PopupEvent {
  frame: number;
  duration: number;
  component: "apple" | "concept";
  illustration: React.ReactNode;
  caption?: string;
  subtitle?: string;
  illustrationSize?: number;
  backgroundStyle?: "solid-white" | "frosted" | "dark-blur";
  entrance?: "clip-circle" | "wipe-right" | "fade-blur";
}

interface SectionEvent {
  frame: number;
  duration: number;
  number: number;
  title: string;
  subtitle: string;
}

// ===== MAIN COMPOSITION =====
interface Props {
  videoSrc: string;
}

export const CraftingOutreachCampaign: React.FC<Props> = ({ videoSrc }) => {
  const { fps } = useVideoConfig();

  // ═══════════════════════════════════════════════
  // INTRO SECTION (0:00 - 4:00) — 14 Popups
  // ILLUSTRATION-FIRST: No text unless critical
  // ═══════════════════════════════════════════════

  const INTRO_POPUPS: PopupEvent[] = [
    {
      // f:124 — "launch" — Dramatic rocket launch (HERO opener)
      frame: 124,
      duration: 90,
      component: "concept",
      illustration: <LaunchCountdown />,
      illustrationSize: 800,
    },
    {
      // f:343 — "campaign" — IX system launching campaign dashboard
      frame: 343,
      duration: 75,
      component: "concept",
      illustration: <SalesCampaignBlueprint />,
      illustrationSize: 800,
    },
    {
      // f:479 — "prepare" — HERO B-ROLL: 4-panel campaign prep montage
      frame: 479,
      duration: 180,
      component: "concept",
      illustration: <CampaignPrepBRoll />,
      illustrationSize: 800,
    },
    {
      // f:705 — "outreach" — Messages flying outward from mailbox
      frame: 705,
      duration: 65,
      component: "apple",
      illustration: <OutreachFlyout />,
      illustrationSize: 800,
    },
    // Section break at 985 (handled separately)
    {
      // f:1060 — "Dex" — Premium nameplate with real headshot (KEEP TEXT)
      frame: 1060,
      duration: 70,
      component: "apple",
      illustration: <MeetDexNameplate />,
      caption: "MEET DEX",
      subtitle: "Building his first AI campaign",
      illustrationSize: 700,
    },
    {
      // f:1285 — "clarity" — Chaos-to-order lens
      frame: 1285,
      duration: 65,
      component: "apple",
      illustration: <ClarityMomentLens />,
      illustrationSize: 800,
    },
    {
      // f:1640 — "campaign" — Pipeline flow (FROSTED)
      frame: 1640,
      duration: 80,
      component: "concept",
      illustration: <CampaignFlowPipeline />,
      illustrationSize: 800,
      backgroundStyle: "frosted",
      entrance: "wipe-right",
    },
    {
      // f:2833 — "tested" — Test/learn/improve cycle
      frame: 2833,
      duration: 65,
      component: "apple",
      illustration: <TestIterationLoop />,
      illustrationSize: 800,
    },
    {
      // f:3563 — "campaign brain" — HERO: Neural network brain
      frame: 3563,
      duration: 100,
      component: "concept",
      illustration: <CampaignBrainV2 />,
      illustrationSize: 800,
    },
    {
      // f:3925 — "beast" — Power gauge + lightning
      frame: 3925,
      duration: 65,
      component: "apple",
      illustration: <PowerBeastMetaphor />,
      illustrationSize: 800,
    },
    {
      // f:4556 — "question" — Deep dive Q&A
      frame: 4556,
      duration: 65,
      component: "apple",
      illustration: <DeepDiveQuestion />,
      illustrationSize: 800,
    },
    {
      // f:5141 — "prompt" — Terminal window with typing code
      frame: 5141,
      duration: 80,
      component: "concept",
      illustration: <PromptTerminalWindow />,
      illustrationSize: 800,
    },
    {
      // f:5387 — "flow" — Vertical waterfall (FROSTED)
      frame: 5387,
      duration: 80,
      component: "concept",
      illustration: <FlowStagesWaterfall />,
      illustrationSize: 800,
      backgroundStyle: "frosted",
      entrance: "wipe-right",
    },
    {
      // f:5824 — "working" — Mini analytics dashboard
      frame: 5824,
      duration: 70,
      component: "apple",
      illustration: <ResultsDashboardMini />,
      illustrationSize: 800,
    },
  ];

  // ═══════════════════════════════════════════════
  // MID-ROLL SECTION (17:39 - 19:07) — 10 Popups
  // Zach case study: renovation business, $90K, AI
  // ═══════════════════════════════════════════════

  const MIDROLL_POPUPS: PopupEvent[] = [
    {
      // f:31980 — "Zach" — Premium intro card with real headshot (KEEP TEXT)
      frame: 31980,
      duration: 70,
      component: "apple",
      illustration: <SackIntroCard />,
      caption: "MEET ZACH",
      subtitle: "Partner success story",
      illustrationSize: 700,
    },
    {
      // f:32095 — "double" — HERO: Before/after revenue doubling
      frame: 32095,
      duration: 75,
      component: "concept",
      illustration: <DoubledRevenueGrowth />,
      illustrationSize: 800,
    },
    {
      // f:32172 — "AI" — Circuit board with AI at center
      frame: 32172,
      duration: 55,
      component: "apple",
      illustration: <AICircuitBoard />,
      illustrationSize: 800,
    },
    {
      // f:32411 — "90K" — HERO: Animated revenue counter $0 → $90,000
      frame: 32411,
      duration: 95,
      component: "concept",
      illustration: <Revenue90KCounter />,
      illustrationSize: 800,
    },
    {
      // f:32547 — "resell" — Build → sell → scale flywheel
      frame: 32547,
      duration: 60,
      component: "apple",
      illustration: <ResellFlywheel />,
      illustrationSize: 800,
    },
    {
      // f:32703 — "double" — Calendar filling with bookings (SOLID-WHITE, fixed)
      frame: 32703,
      duration: 70,
      component: "concept",
      illustration: <DoubleBookingsCalendar />,
      illustrationSize: 800,
    },
    {
      // f:32792 — "clients" — Expanding client network
      frame: 32792,
      duration: 55,
      component: "apple",
      illustration: <ClientGrowthNetwork />,
      illustrationSize: 800,
    },
    {
      // f:33105 — "link" — CTA: Link in description (KEEP TEXT)
      frame: 33105,
      duration: 70,
      component: "apple",
      illustration: <FreeCampaignCTABadge />,
      caption: "LINK IN DESCRIPTION",
      subtitle: "Set up your first campaign",
      illustrationSize: 700,
    },
    {
      // f:33526 — "zone" — HERO: Theatrical spotlight
      frame: 33526,
      duration: 95,
      component: "concept",
      illustration: <ZoneOfGeniusSpotlight />,
      illustrationSize: 800,
    },
    {
      // f:34341 — "link" (2nd) — CTA: Get started rocket (KEEP TEXT)
      frame: 34341,
      duration: 70,
      component: "apple",
      illustration: <GetStartedRocketButton />,
      caption: "FREE AI CAMPAIGN",
      subtitle: "Link in the description",
      illustrationSize: 700,
    },
  ];

  // ═══════════════════════════════════════════════
  // END SECTION (25:25 - 28:35) — 14 Popups
  // Wrap-up tips + outro CTAs
  // ═══════════════════════════════════════════════

  const END_POPUPS: PopupEvent[] = [
    {
      // f:45936 — "couple things" — Animated checklist
      frame: 45936,
      duration: 65,
      component: "apple",
      illustration: <FinalTipsChecklist />,
      illustrationSize: 800,
    },
    {
      // f:46354 — "test" — Ping-pong YOU ↔ AI exchange
      frame: 46354,
      duration: 65,
      component: "apple",
      illustration: <TestAIBackAndForth />,
      illustrationSize: 800,
    },
    {
      // f:47008 — "campaign brain" — HERO: Mind-map brain
      frame: 47008,
      duration: 100,
      component: "concept",
      illustration: <CampaignBrainEndV2 />,
      illustrationSize: 800,
    },
    {
      // f:47590 — "replying" — HERO: Phone with live chat
      frame: 47590,
      duration: 95,
      component: "concept",
      illustration: <LiveRepliesChat />,
      illustrationSize: 800,
    },
    {
      // f:47997 — "setup" — Clock with 20-min sweep
      frame: 47997,
      duration: 70,
      component: "apple",
      illustration: <SetupTimerTwentyMin />,
      illustrationSize: 800,
    },
    {
      // f:48257 — "strategy" — HERO: Whiteboard diagram
      frame: 48257,
      duration: 90,
      component: "concept",
      illustration: <StrategyWhiteboardScene />,
      illustrationSize: 800,
    },
    {
      // f:48434 — "hour" — Hourglass with flowing sand
      frame: 48434,
      duration: 65,
      component: "apple",
      illustration: <HourglassTimerSession />,
      illustrationSize: 800,
    },
    {
      // f:48648 — "copy" — Document editing typewriter
      frame: 48648,
      duration: 65,
      component: "apple",
      illustration: <CopyEditorTypewriter />,
      illustrationSize: 800,
    },
    {
      // f:49276 — "so much" — Expanding universe of connections
      frame: 49276,
      duration: 65,
      component: "apple",
      illustration: <InfinitePossibilitiesExpansion />,
      illustrationSize: 800,
    },
    {
      // f:49632 — "campaign" — Triple gauge dashboard (FROSTED)
      frame: 49632,
      duration: 80,
      component: "concept",
      illustration: <PerformanceGaugeDashboard />,
      illustrationSize: 800,
      backgroundStyle: "frosted",
      entrance: "clip-circle",
    },
    {
      // f:49986 — "concept" — Puzzle pieces coming together
      frame: 49986,
      duration: 65,
      component: "apple",
      illustration: <ConceptPuzzleCompletion />,
      illustrationSize: 800,
    },
    {
      // f:50416 — "Leave" — CTA: YouTube subscribe (KEEP TEXT)
      frame: 50416,
      duration: 90,
      component: "concept",
      illustration: <YouTubeSubscribeButton />,
      caption: "SUBSCRIBE",
      subtitle: "Leave a like and subscribe",
      illustrationSize: 620,
    },
    {
      // f:50640 — "connect" — CTA: LinkedIn connect (KEEP TEXT)
      frame: 50640,
      duration: 90,
      component: "concept",
      illustration: <LinkedInConnectButton />,
      caption: "CONNECT ON LINKEDIN",
      subtitle: "Drop questions below",
      illustrationSize: 620,
    },
    {
      // f:50986 — "LinkedIn" — Dex's LinkedIn profile (KEEP TEXT)
      frame: 50986,
      duration: 65,
      component: "apple",
      illustration: <DexLinkedInProfileCard />,
      caption: "DEX ON LINKEDIN",
      subtitle: "Connect with Dex too",
      illustrationSize: 700,
    },
  ];

  // ===== ALL POPUPS COMBINED =====
  const ALL_POPUPS = [...INTRO_POPUPS, ...MIDROLL_POPUPS, ...END_POPUPS];

  // ===== SECTION BREAKS =====
  const SECTION_EVENTS: SectionEvent[] = [
    {
      frame: 985,
      duration: 70,
      number: 1,
      title: "CAMPAIGN SETUP",
      subtitle: "Watch Dex Build His First AI Sales Campaign",
    },
    {
      frame: 34450,
      duration: 70,
      number: 2,
      title: "LAUNCH DAY",
      subtitle: "297 Contacts — Outreach Starts Now",
    },
  ];

  // ===== SOUND EFFECTS (VARIED per popup type) =====
  // - Quick concepts (AppleStylePopup): pop
  // - Hero moments (ConceptOverlay): whoosh-effect
  // - B-roll montage: whoosh-bamboo (softer)
  // - CTA buttons: mouse-click
  // - Section breaks: whoosh-large

  const CTA_FRAMES = new Set([50416, 50640, 33105, 34341]);
  const BROLL_FRAMES = new Set([479]);

  const POPUP_SFX = ALL_POPUPS.map((p) => {
    if (BROLL_FRAMES.has(p.frame)) {
      return { frame: p.frame, sfx: "audio/whoosh-bamboo-389752.mp3", volume: 0.14 };
    }
    if (CTA_FRAMES.has(p.frame)) {
      return { frame: p.frame, sfx: "audio/mouse-click-290204.mp3", volume: 0.18 };
    }
    if (p.component === "concept") {
      return { frame: p.frame, sfx: "audio/whoosh-effect-382717.mp3", volume: 0.16 };
    }
    return { frame: p.frame, sfx: "audio/pop-402324.mp3", volume: 0.22 };
  });

  const SECTION_SFX = SECTION_EVENTS.map((s) => ({
    frame: s.frame,
    sfx: "audio/whoosh-large-sub-384631.mp3",
    volume: 0.18,
  }));

  const ALL_SFX = [...POPUP_SFX, ...SECTION_SFX];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>

      {/* ===== LAYER 1: FULL-SCREEN VIDEO ===== */}
      <AbsoluteFill>
        <OffthreadVideo
          src={staticFile(videoSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* ===== LAYER 2: SECTION BREAKS ===== */}
      {SECTION_EVENTS.map((evt, idx) => (
        <Sequence
          key={`section-${idx}`}
          from={evt.frame}
          durationInFrames={evt.duration}
          premountFor={15}
        >
          <SectionBreak
            sectionNumber={evt.number}
            title={evt.title}
            subtitle={evt.subtitle}
            durationInFrames={evt.duration}
          />
        </Sequence>
      ))}

      {/* ===== LAYER 3: POPUPS (z-index 100) ===== */}
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
        {ALL_POPUPS.map((evt, idx) => (
          <Sequence
            key={`popup-${idx}`}
            from={evt.frame}
            durationInFrames={evt.duration}
            premountFor={15}
          >
            {evt.component === "apple" ? (
              <AppleStylePopup
                durationInFrames={evt.duration}
                illustration={evt.illustration}
                caption={evt.caption}
                subtitle={evt.subtitle}
                illustrationSize={evt.illustrationSize || 800}
              />
            ) : (
              <ConceptOverlay
                durationInFrames={evt.duration}
                illustration={evt.illustration}
                caption={evt.caption}
                subtitle={evt.subtitle}
                illustrationSize={evt.illustrationSize || 800}
                backgroundStyle={evt.backgroundStyle || "solid-white"}
                entrance={evt.entrance || "clip-circle"}
              />
            )}
          </Sequence>
        ))}
      </div>

      {/* ===== LAYER 4: SOUND EFFECTS ===== */}
      {ALL_SFX.map((sfx, idx) => (
        <Sequence key={`sfx-${idx}`} from={sfx.frame} durationInFrames={30}>
          <Audio src={staticFile(sfx.sfx)} volume={sfx.volume} />
        </Sequence>
      ))}

      {/* ===== LAYER 5: BACKGROUND MUSIC (first 35 seconds only) ===== */}
      <Sequence from={0} durationInFrames={1050}>
        <Audio
          src={staticFile("audio/lofi-background.mp3")}
          volume={0.02}
        />
      </Sequence>

    </AbsoluteFill>
  );
};

export default CraftingOutreachCampaign;
