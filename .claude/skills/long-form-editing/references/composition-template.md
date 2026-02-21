# Long-Form Composition Template

Full code patterns for long-form Remotion compositions. Reference when building new compositions.

---

## Why Standalone Compositions (CRITICAL)

NEVER pass JSX through `defaultProps`. Remotion serializes `defaultProps` as JSON. JSX elements (`<Component />`) become `{key, ref, props, _owner, _store}` objects, causing "Objects are not valid as a React child" runtime errors.

ALWAYS create standalone composition files with all editing baked in:

```
remotion/compositions/ProjectName.tsx  <- standalone, all editing baked in
```

---

## TypeScript Interfaces

```tsx
interface PopOutEvent {
  frame: number;
  duration: number;
  component: "apple" | "concept";
  illustration: React.ReactNode;
  caption?: string;           // OPTIONAL — most pop-outs omit in V4
  subtitle?: string;          // OPTIONAL — most pop-outs omit in V4
  illustrationSize?: number;  // Default 800 (no text), 700 (with text), 620 (CTA)
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

interface SfxEvent {
  frame: number;
  sfx: string;
  volume: number;
}
```

---

## Full Composition Pattern

```tsx
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
import { TOTAL_DURATION_FRAMES } from "../data/project-name-words";
import { AppleStylePopup } from "../components/AppleStylePopup";
import { ConceptOverlay } from "../components/ConceptOverlay";
// ===== INTRO ILLUSTRATIONS =====
import {
  IllustrationOne,
  IllustrationTwo,
  // ... 10-15 per section file
} from "../lib/illustrations/ProjectNameIntro";
// ===== MIDROLL ILLUSTRATIONS =====
import {
  IllustrationEleven,
  IllustrationTwelve,
} from "../lib/illustrations/ProjectNameMidroll";
// ===== END ILLUSTRATIONS =====
import {
  IllustrationTwentyOne,
  IllustrationTwentyTwo,
} from "../lib/illustrations/ProjectNameEnd";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

// ===== SECTION BREAK COMPONENT (inline) =====
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
    frame, fps, from: 0.6, to: 1,
    config: { damping: 12, stiffness: 100 },
  });
  const numOpacity = spring({
    frame, fps, from: 0, to: 1,
    config: { damping: 200 },
  });

  const titleProgress = spring({
    frame: Math.max(0, frame - 8), fps, from: 0, to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  const lineWidth = spring({
    frame: Math.max(0, frame - 6), fps, from: 0, to: 160,
    config: { damping: 14, stiffness: 100 },
  });

  const subProgress = spring({
    frame: Math.max(0, frame - 16), fps, from: 0, to: 1,
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
      {/* Giant faded section number */}
      <div style={{
        position: "absolute",
        opacity: numOpacity * 0.08,
        transform: `scale(${numScale})`,
        fontFamily,
        fontWeight: 900,
        fontSize: 400,
        color: "#FF6B00",
        lineHeight: 1,
      }}>
        {numStr}
      </div>
      {/* Section label */}
      <div style={{
        fontFamily,
        fontWeight: 600,
        fontSize: 24,
        color: "#FF6B00",
        letterSpacing: 6,
        opacity: numOpacity,
        transform: `scale(${numScale})`,
        marginBottom: 20,
      }}>
        SECTION {numStr}
      </div>
      {/* Title */}
      <div style={{
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
      }}>
        {title}
      </div>
      {/* Orange accent line */}
      <div style={{
        width: lineWidth,
        height: 4,
        backgroundColor: "#FF6B00",
        borderRadius: 2,
        marginTop: 24,
        marginBottom: 24,
      }} />
      {/* Subtitle */}
      <div style={{
        fontFamily,
        fontWeight: 500,
        fontSize: 28,
        color: "#888888",
        letterSpacing: 2,
        opacity: subProgress,
        textAlign: "center",
        padding: "0 120px",
      }}>
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};

// ===== MAIN COMPOSITION =====
interface Props {
  videoSrc: string;
}

export const ProjectName: React.FC<Props> = ({ videoSrc }) => {
  const { fps } = useVideoConfig();

  // ... (pop-out arrays defined below)

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Layer stack goes here */}
    </AbsoluteFill>
  );
};
```

---

## POPUP_EVENTS Array Example (Varied Durations, Entrances, Background Styles)

```tsx
const INTRO_POPUPS: PopOutEvent[] = [
  {
    // f:124 — "launch" — Dramatic rocket (HERO opener)
    frame: 124,
    duration: 90,
    component: "concept",
    illustration: <LaunchCountdown />,
    illustrationSize: 800,
  },
  {
    // f:343 — "campaign" — Blueprint dashboard
    frame: 343,
    duration: 75,
    component: "concept",
    illustration: <SalesCampaignBlueprint />,
    illustrationSize: 800,
  },
  {
    // f:479 — "prepare" — HERO B-ROLL: 4-panel montage
    frame: 479,
    duration: 180,
    component: "concept",
    illustration: <CampaignPrepBRoll />,
    illustrationSize: 800,
  },
  {
    // f:705 — "outreach" — Messages flying outward (QUICK)
    frame: 705,
    duration: 65,
    component: "apple",
    illustration: <OutreachFlyout />,
    illustrationSize: 800,
  },
  {
    // f:1060 — "Dex" — Premium nameplate with headshot (KEEP TEXT)
    frame: 1060,
    duration: 70,
    component: "apple",
    illustration: <MeetDexNameplate />,
    caption: "MEET DEX",
    subtitle: "Building his first AI campaign",
    illustrationSize: 700,
  },
  {
    // f:1285 — "clarity" — Chaos-to-order lens (QUICK)
    frame: 1285,
    duration: 65,
    component: "apple",
    illustration: <ClarityMomentLens />,
    illustrationSize: 800,
  },
  {
    // f:1640 — "campaign" — Pipeline flow (FROSTED, wipe-right)
    frame: 1640,
    duration: 80,
    component: "concept",
    illustration: <CampaignFlowPipeline />,
    illustrationSize: 800,
    backgroundStyle: "frosted",
    entrance: "wipe-right",
  },
  {
    // f:3563 — "campaign brain" — HERO: Neural network
    frame: 3563,
    duration: 100,
    component: "concept",
    illustration: <CampaignBrainV2 />,
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
    // f:50640 — "connect" — CTA: LinkedIn (KEEP TEXT)
    frame: 50640,
    duration: 90,
    component: "concept",
    illustration: <LinkedInConnectButton />,
    caption: "CONNECT ON LINKEDIN",
    subtitle: "Drop questions below",
    illustrationSize: 620,
  },
];
```

**Pattern notes:**
- Most pop-outs omit caption/subtitle (illustration-only at 800px)
- Character intros and CTAs keep text (700px or 620px)
- Mix `"apple"` (quick concepts) and `"concept"` (hero moments)
- Use `backgroundStyle: "frosted"` for analytical/flow moments (speaker visible through)
- Vary entrance modes across sections for visual variety

---

## renderIllustration Switch Pattern

Use when illustrations are defined as string identifiers (e.g., from a data file):

```tsx
const renderIllustration = (type: string) => {
  switch (type) {
    case "launch-countdown":
      return <LaunchCountdown />;
    case "campaign-blueprint":
      return <SalesCampaignBlueprint />;
    case "dex-nameplate":
      return <MeetDexNameplate />;
    case "claude-code-logo":
      return <Img src={staticFile("logos/claude-code-terminal.webp")}
        style={{ width: 400, height: 400, objectFit: "contain" }} />;
    default:
      return null;
  }
};
```

NOTE: This pattern is useful when pop-out data comes from a separate config. For most long-form compositions, inline JSX in the PopOutEvent array (as shown above) is preferred since it avoids the indirection.

---

## Layer Stack (6 Layers)

```tsx
return (
  <AbsoluteFill style={{ backgroundColor: "#000000" }}>

    {/* ===== LAYER 1: FULL-SCREEN VIDEO (NO zoom, NO color grading) ===== */}
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(videoSrc)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>

    {/* ===== LAYER 2: SECTION BREAKS (z:100) ===== */}
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

    {/* ===== LAYER 3: POP-OUTS (z:100) ===== */}
    <div style={{
      position: "absolute", zIndex: 100,
      top: 0, left: 0, width: "100%", height: "100%",
      pointerEvents: "none",
    }}>
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

    {/* ===== LAYER 4: CAPTIONS (filtered — hidden during pop-outs) ===== */}
    {/* See Overlay Range Calculation below */}

    {/* ===== LAYER 5: SOUND EFFECTS ===== */}
    {ALL_SFX.map((sfx, idx) => (
      <Sequence key={`sfx-${idx}`} from={sfx.frame} durationInFrames={30}>
        <Audio src={staticFile(sfx.sfx)} volume={sfx.volume} />
      </Sequence>
    ))}

    {/* ===== LAYER 6: BACKGROUND MUSIC (first 35 seconds only) ===== */}
    <Sequence from={0} durationInFrames={1050}>
      <Audio
        src={staticFile("audio/lofi-background.mp3")}
        volume={0.02}
      />
    </Sequence>

  </AbsoluteFill>
);
```

---

## Overlay Range Calculation (Caption Hiding)

```tsx
const getOverlayRanges = () => {
  const ranges: Array<{ start: number; end: number }> = [];

  // Section breaks
  SECTION_EVENTS.forEach(s => {
    ranges.push({ start: s.frame, end: s.frame + s.duration });
  });

  // All pop-outs
  ALL_POPUPS.forEach(evt => {
    ranges.push({ start: evt.frame, end: evt.frame + evt.duration });
  });

  return ranges;
};

const isFrameInOverlay = (frame: number, ranges: Array<{start: number; end: number}>) => {
  return ranges.some(r => frame >= r.start && frame < r.end);
};

// Filter captions to hide during overlays
const overlayRanges = getOverlayRanges();
const visibleCaptions = WORDS.filter(word => !isFrameInOverlay(word.frame, overlayRanges));
```

---

## SFX Assignment Pattern (Automatic by Pop-Out Type)

```tsx
const CTA_FRAMES = new Set([50416, 50640, 33105, 34341]);
const BROLL_FRAMES = new Set([479]);

const POPUP_SFX: SfxEvent[] = ALL_POPUPS.map((p) => {
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

const SECTION_SFX: SfxEvent[] = SECTION_EVENTS.map((s) => ({
  frame: s.frame,
  sfx: "audio/whoosh-large-sub-384631.mp3",
  volume: 0.18,
}));

const ALL_SFX = [...POPUP_SFX, ...SECTION_SFX];
```

---

## Combining Pop-Out Sections

```tsx
const INTRO_POPUPS: PopOutEvent[] = [ /* ... */ ];
const MIDROLL_POPUPS: PopOutEvent[] = [ /* ... */ ];
const END_POPUPS: PopOutEvent[] = [ /* ... */ ];

const ALL_POPUPS = [...INTRO_POPUPS, ...MIDROLL_POPUPS, ...END_POPUPS];
```

---

## Split Illustration File Template

Each illustration file exports 10-15 unique components:

```tsx
// remotion/lib/illustrations/ProjectNameIntro.tsx
import React from "react";
import { useCurrentFrame, interpolate, spring, Img, staticFile } from "remotion";

// Import shared brand colors
import { COLORS } from "../colors";

// ===== 1. LaunchCountdown =====
export const LaunchCountdown: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  const rocketY = interpolate(frame, [0, 40], [100, -20], {
    extrapolateRight: "clamp",
  });

  const flameOpacity = 0.6 + 0.4 * Math.sin(frame * 0.3);

  return (
    <svg viewBox="0 0 600 600" width={size} height={size}>
      {/* Rocket body */}
      <g transform={`translate(300, ${300 + rocketY})`}>
        <rect x={-30} y={-80} width={60} height={120} rx={30}
          fill={COLORS.primary} stroke="#1A1A1A" strokeWidth={3} />
        {/* Exhaust flame */}
        <ellipse cx={0} cy={60} rx={20} ry={30}
          fill="#FF4444" opacity={flameOpacity} />
      </g>
      {/* Countdown numbers would go here with staggered reveals */}
    </svg>
  );
};

// ===== 2. SalesCampaignBlueprint =====
export const SalesCampaignBlueprint: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  // ... unique visual metaphor with motion
  return (
    <svg viewBox="0 0 600 600" width={size} height={size}>
      {/* Blueprint grid, campaign blocks, connectors */}
    </svg>
  );
};

// ... 10-15 total per file
```

**Rules for illustration files:**
- Every component gets `{ size?: number }` prop with default 600
- viewBox always `0 0 600 600`
- Import `COLORS` from `../colors`
- Add motion via `useCurrentFrame()` + `interpolate()` / `spring()`
- Design for white backgrounds (dark strokes, colored fills)
- Use `Img` + `staticFile()` for real logos/headshots, never recreate as SVG

---

## Background Music Sequence (First 35s Only)

```tsx
{/* Background music: first 35 seconds only, never loop */}
<Sequence from={0} durationInFrames={1050}>
  <Audio
    src={staticFile("audio/lofi-background.mp3")}
    volume={0.02}
  />
</Sequence>
```

At 30fps, 35 seconds = 1050 frames. This covers the intro energy and lets the speaker carry the rest of the video naturally.

---

## Registration in Root.tsx

```tsx
import { ProjectName } from "./compositions/ProjectName";
import { TOTAL_DURATION_FRAMES } from "./data/project-name-words";
import { VIDEO_FPS } from "./lib/config";

// Inside RemotionRoot:
<Composition
  id="ProjectName"
  component={ProjectName}
  durationInFrames={TOTAL_DURATION_FRAMES}
  fps={VIDEO_FPS}
  width={1920}
  height={1080}
  defaultProps={{
    videoSrc: "videos/YYYY-MM-DD-project-name/source.mp4",
  }}
/>
```

**Key points:**
- Import `TOTAL_DURATION_FRAMES` from the WORDS data file
- Use `VIDEO_FPS` (30) from config
- Long-form videos are typically landscape (1920x1080)
- `defaultProps` contains ONLY serializable values (strings, numbers) — NEVER JSX

---

## Timing Validation Script

Run this Node.js check before visual preview:

```typescript
// Validate no pop-out overlaps
const ALL_EVENTS = [...ALL_POPUPS, ...SECTION_EVENTS].sort((a, b) => a.frame - b.frame);

for (let i = 0; i < ALL_EVENTS.length - 1; i++) {
  const current = ALL_EVENTS[i];
  const next = ALL_EVENTS[i + 1];
  const endFrame = current.frame + current.duration;
  if (endFrame > next.frame) {
    console.error(
      `OVERLAP: Event at frame ${current.frame} ends at ${endFrame}, ` +
      `but next event starts at ${next.frame}`
    );
  }
}

// Validate no events exceed total duration
ALL_EVENTS.forEach(evt => {
  if (evt.frame + evt.duration > TOTAL_DURATION_FRAMES) {
    console.error(`OUT OF BOUNDS: Event at frame ${evt.frame} exceeds video duration`);
  }
});
```
