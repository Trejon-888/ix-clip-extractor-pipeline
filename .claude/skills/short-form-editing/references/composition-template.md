# Composition Template & Code Patterns

Complete code patterns for short-form Remotion compositions. Copy and adapt these patterns; do not write from scratch.

---

## Why Standalone Compositions

Remotion serializes `defaultProps` as JSON when communicating between the studio UI and the render process. JSX elements (`<Component />`) become `{key, ref, props, _owner, _store}` objects, causing:

```
Error: Objects are not valid as a React child
```

**Fix:** ALWAYS create standalone composition files with all editing logic baked in. Never pass JSX through defaultProps.

```
CORRECT:  remotion/compositions/Clip6VoiceControlDemoV3.tsx  (standalone)
WRONG:    remotion/compositions/ShortFormTemplate.tsx         (JSX in defaultProps)
```

---

## Standalone Composition File Structure

```typescript
/**
 * Clip N: Title — VN Composition
 * SOURCE: [Pipeline clip | Standalone demo | Announcement]
 * CTA: "WATCH THE FULL VIDEO" | "FOLLOW FOR MORE"
 * Duration: Xs (TOTAL frames @ 30fps)
 */

// ══════════════ IMPORTS ══════════════════════════════════════
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
import { WORDS } from "../data/clip-name-words";

const { fontFamily } = loadFont();

// ══════════════ CONSTANTS ════════════════════════════════════
const TOTAL_FRAMES = 2100; // Duration in frames

// ══════════════ ZOOM ═════════════════════════════════════════
// Pipeline clips: flat 1.0
// Standalone: hook punch + subtle keyframes
function getZoom(_frame: number): number {
  return 1.0;
}

// ══════════════ CONCEPT RANGES ═══════════════════════════════
const CONCEPT_RANGES = [
  { start: 100, end: 175 },
  { start: 300, end: 370 },
  // One entry per ConceptOverlay/AppleStylePopup
];

// ══════════════ SFX EVENTS ═══════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  { frame: 98, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // J-cut: 2-3 frames before the visual Sequence starts
];

// ══════════════ INLINE ILLUSTRATIONS ═════════════════════════
const ConceptNameIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;
  // ... illustration with spring/interpolate motion
  return <svg viewBox="0 0 600 600" width={size} height={size}>...</svg>;
};

// ══════════════ INLINE COMPONENTS ════════════════════════════
// IndividualPlatformPopups, CTACard, MetadataChecklist, etc.

// ══════════════ MAIN COMPOSITION ═════════════════════════════
export const ClipNameComposition: React.FC<{
  videoSrc?: string;
}> = ({ videoSrc = "clip-name.mp4" }) => {
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
      {/* BASE: Speaker video */}
      {/* HOOK FLASH */}
      {/* ConceptOverlay / AppleStylePopup SEQUENCES */}
      {/* CAPTIONS */}
      {/* SFX */}
      {/* BACKGROUND MUSIC */}
    </AbsoluteFill>
  );
};
```

---

## renderIllustration Switch Pattern

When pop-outs reference illustrations by string identifier (e.g., in a POPUP_EVENTS array), use a switch function to avoid JSX serialization:

```typescript
const renderIllustration = (type: string) => {
  switch (type) {
    case "big-problem":
      return <BigProblemIllustration />;
    case "ai-powered":
      return <AISpeedScaleIllustration />;
    case "ix-system":
      return <IXSystemIllustration />;
    case "youtube-logo":
      return <PlatformLogoDisplay logoSrc="logos/youtube.svg" />;
    case "claude-code":
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img
            src={staticFile("logos/claude-code-terminal.webp")}
            style={{ width: 400, height: "auto" }}
          />
        </div>
      );
    default:
      return null;
  }
};

// Usage in Sequence:
<ConceptOverlay
  illustration={renderIllustration(event.illustrationType)}
  ...
/>
```

---

## v2 Tier System (Standalone Demos)

Standalone demos use a two-tier pop-out system where the speaker remains visible during Tier 2 moments.

### Tier 1: AppleStylePopup (z:100, full-screen takeover)

Max 2 per clip. Reserved for WOW moments and core concept reveals.

```typescript
const T1_EVENTS = [
  {
    frame: 257,
    duration: 55,
    illustrationType: "short-form-video",
    caption: "SHORT-FORM VIDEO",
    subtitle: undefined,
    illustrationSize: 550,
  },
  {
    frame: 810,
    duration: 68,
    illustrationType: "voice-prompt",
    caption: "ONE VOICE PROMPT",
    subtitle: "Talk -> Post -> Done",
    illustrationSize: 550,
  },
];

// Rendered as ConceptOverlay (solid-white, clip-circle entrance):
{T1_EVENTS.map((event, i) => (
  <Sequence key={`t1-${i}`} from={event.frame}
    durationInFrames={event.duration} premountFor={fps}>
    <ConceptOverlay
      durationInFrames={event.duration}
      illustration={renderIllustration(event.illustrationType)}
      caption={event.caption}
      subtitle={event.subtitle}
      entrance="clip-circle"
      backgroundStyle="solid-white"
      illustrationSize={event.illustrationSize}
    />
  </Sequence>
))}
```

### Tier 2: FloatingCard (z:20, speaker visible)

3-5 per clip. Brands, results, supporting details. Speaker stays visible.

```typescript
// FloatingCard slides in from edge, does not take over full screen
<Sequence from={314} durationInFrames={220} premountFor={fps}>
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
```

---

## PhraseCaption Integration (Standalone Demos)

For standalone demos without burned-in captions, use PhraseCaption for sentence-level display:

```typescript
import { PhraseCaption } from "../components/PhraseCaption";

const SENTENCES: SentenceEntry[] = [
  { text: "First sentence here.", start: 0.5, end: 3.2 },
  { text: "Second sentence here.", start: 3.8, end: 6.1 },
  // Times in SECONDS -- PhraseCaption converts to frames
];

const EMPHASIS_WORDS = ["Claude", "incredible", "automated"];

const HIDE_FRAMES: Array<[number, number]> = [
  [257, 312],  // During T1 pop-out 1
  [810, 878],  // During T1 pop-out 2
];

// In composition:
<PhraseCaption
  sentences={SENTENCES}
  emphasisWords={EMPHASIS_WORDS}
  maxWordsPerPhrase={4}
  hideFrames={HIDE_FRAMES}
  accentColor={COLORS.primary}
  fontSize={54}
/>
```

---

## Hook Burst Code Pattern

Triple hook burst for the first 3 frames:

```typescript
// In main composition:
const hookFlash = interpolate(frame, [0, 3], [1, 0], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

// Orange brand flash
{hookFlash > 0 && (
  <AbsoluteFill
    style={{
      backgroundColor: "#FF6B00",
      opacity: hookFlash,
      zIndex: 90,
    }}
  />
)}

// Zoom punch (in ZOOM_KEYFRAMES):
const ZOOM_KEYFRAMES = [
  { frame: 0, zoom: 1.06 },  // Punched in
  { frame: 5, zoom: 1.0 },   // Return to normal
];

// SFX (in SFX_EVENTS):
{ frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 }

// Optional: HookOverlay text (frame 8+)
<Sequence from={8} durationInFrames={97} premountFor={fps}>
  <HookOverlay durationInFrames={97} />
</Sequence>
```

**HookOverlay component** (white frosted card with text):

```typescript
const HookOverlay: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame, fps,
    from: 0, to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{
      position: "absolute",
      top: "8%",
      left: "50%",
      transform: `translateX(-50%) scale(${interpolate(enter, [0, 1], [0.8, 1])})`,
      opacity: enter * fadeOut,
      zIndex: 30,
    }}>
      <div style={{
        padding: "20px 36px",
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: 32,
          color: "#1A1A1A",
          textAlign: "center",
        }}>
          HOOK TEXT HERE
        </div>
      </div>
    </div>
  );
};
```

---

## SFX Events Array Template

```typescript
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  // Hook burst (frame 0)
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },

  // Pop-out entrances (J-cut: 2-3f before visual)
  { frame: 98, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  { frame: 197, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  { frame: 428, src: "audio/pop-402324.mp3", volume: 0.20 },

  // Platform pops (one per platform)
  { frame: 487, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 544, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 577, src: "audio/pop-402324.mp3", volume: 0.18 },

  // Concept overlays (varied whoosh)
  { frame: 923, src: "audio/whoosh-effect-382717.mp3", volume: 0.20 },
  { frame: 1284, src: "audio/pop-402324.mp3", volume: 0.20 },
  { frame: 1514, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },

  // CTA
  { frame: 2288, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
];

// Rendered:
{SFX_EVENTS.map((sfx, i) => (
  <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={15}>
    <Audio src={staticFile(sfx.src)} volume={sfx.volume} startFrom={0} />
  </Sequence>
))}
```

**SFX library paths:**
- `audio/whoosh-effect-382717.mp3` -- standard whoosh
- `audio/whoosh-bamboo-389752.mp3` -- soft organic whoosh
- `audio/whoosh-large-sub-384631.mp3` -- impactful bass whoosh
- `audio/pop-402324.mp3` -- clean pop
- `audio/mouse-click-290204.mp3` -- click

---

## Zoom Keyframes Template

### Pipeline Clips: FLAT

```typescript
function getZoom(_frame: number): number {
  return 1.0;
}
```

### Standalone Demos: Hook Punch + Subtle

```typescript
const ZOOM_KEYFRAMES: Array<{ frame: number; zoom: number }> = [
  { frame: 0, zoom: 1.06 },    // Hook punch
  { frame: 5, zoom: 1.0 },     // Return
  // Optional: subtle energy every 150-450 frames
  // { frame: 300, zoom: 1.04 },
  // { frame: 450, zoom: 1.0 },
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
```

---

## Registration in Root.tsx

```typescript
import { Clip6VoiceControlDemoV3 } from "./compositions/Clip6VoiceControlDemoV3";

<Composition
  id="Clip6VoiceControlDemoV3"
  component={Clip6VoiceControlDemoV3}
  durationInFrames={2096}
  fps={30}
  width={1080}
  height={1920}
  defaultProps={{
    videoSrc: "clip-6-voice-control-demo.mp4"
  }}
/>
```

**Checklist:**
- `id` matches the export name
- `durationInFrames` matches TOTAL_FRAMES constant in composition
- `fps: 30` always
- `width: 1080, height: 1920` for portrait/short-form
- `defaultProps` only contains primitive values (strings, numbers) -- NEVER JSX

---

## Full POPUP_EVENTS Example (Standalone Demo, T1 + T2)

This shows the complete pop-out plan for a standalone demo clip:

```typescript
// ═══ TIER 1: Full-screen concept takeovers (max 2) ═══

// T1-1: "short-form video" — WOW moment
<Sequence from={257} durationInFrames={55} premountFor={fps}>
  <ConceptOverlay
    durationInFrames={55}
    illustration={<ShortFormVideoIllustration />}
    caption="SHORT-FORM VIDEO"
    entrance="clip-circle"
    backgroundStyle="solid-white"
    illustrationSize={550}
  />
</Sequence>

// T1-2: "one voice prompt" — Core concept
<Sequence from={810} durationInFrames={68} premountFor={fps}>
  <ConceptOverlay
    durationInFrames={68}
    illustration={<VoicePromptClean />}
    caption="ONE VOICE PROMPT"
    subtitle="Talk -> Post -> Done"
    entrance="clip-circle"
    backgroundStyle="solid-white"
    illustrationSize={550}
  />
</Sequence>

// ═══ TIER 2: Speaker-visible floating elements ═══

// T2-1: Claude Code logo (speaker visible)
<Sequence from={16} durationInFrames={50} premountFor={fps}>
  <ClaudeCodeLogoReveal durationInFrames={50} />
</Sequence>

// T2-2: Platform cascade (speaker visible)
<Sequence from={89} durationInFrames={58} premountFor={fps}>
  <PlatformCascade platforms={ALL_PLATFORMS} ... />
</Sequence>

// T2-3: Voice waveform visual (speaker visible)
<Sequence from={157} durationInFrames={33} premountFor={fps}>
  <VoiceWaveVisual durationInFrames={33} />
</Sequence>

// T2-4: "INCREDIBLE" kinetic text (speaker visible)
<Sequence from={906} durationInFrames={42} premountFor={fps}>
  <KineticText text="INCREDIBLE" fontSize={80} ... />
</Sequence>

// T2-5: Metadata checklist (speaker visible)
<Sequence from={1444} durationInFrames={268} premountFor={fps}>
  <MetadataChecklist durationInFrames={268} startFrame={1444} />
</Sequence>
```

---

## FloatingSourceFrame for Announcements

When announcing news/products, show the source content as a PIP:

```typescript
import { FloatingSourceFrame } from "../components/FloatingSourceFrame";

// Source video PIP (top-right, orange border)
<Sequence from={137} durationInFrames={700} premountFor={fps}>
  <FloatingSourceFrame
    label="ANTHROPIC"
    type="video"
    src="source-content/anthropic-intro.mp4"
    startFrom={0}
    durationInFrames={700}
  />
</Sequence>
```

**Rules:**
- Source videos: `volume={0}` (always muted)
- Use `<OffthreadVideo>` for video, `<Img>` for images
- Slide-in entrance from right (12 frames), fade-out exit (10 frames)
- Orange border with glow: `rgba(255, 118, 20, 0.4-0.8)`

---

## Flash Transition Pattern

For mid-video emphasis moments (e.g., "BOOM" reveal):

```typescript
const boomFrame = frame - 1190; // Relative to boom moment
const boomFlash =
  boomFrame >= 0 && boomFrame <= 3
    ? interpolate(boomFrame, [0, 3], [0.8, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

{boomFlash > 0 && (
  <AbsoluteFill
    style={{ backgroundColor: "#FFFFFF", opacity: boomFlash, zIndex: 90 }}
  />
)}
```
