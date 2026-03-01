# Pipeline Clip Editing Patterns

Complete reference for editing pipeline clips -- short-form videos extracted from long-form tutorials via the n8n content pipeline.

---

## What Are Pipeline Clips?

Pipeline clips are 60-90 second extracts from long-form YouTube tutorials (15-30 minutes). They arrive with:

1. **Burned-in auto-captions** at the bottom 15-20% of the frame (from CapCut/pipeline)
2. **WORDS data** in `.ts` files with frame-precise timing
3. **Full-screen talking head** footage (webcam or screen recording)
4. **No existing B-roll or visual effects** -- that is what this skill adds

The goal: transform a raw talking-head clip into a visually rich, addictive short-form video using ConceptOverlay pop-outs, custom illustrations, and strategic SFX.

---

## Architecture (Layer Stack)

```
z:100  ConceptOverlay (solid-white, clip-circle entrance)
z:50   Hook flash (orange burst, frames 0-3)
z:40   CTA card (YouTube thumbnail, "WATCH THE FULL VIDEO")
z:35   MetadataChecklist panel (slides from right)
z:30   ClaudeCodeLogoReveal / PlatformCascade / KineticText
z:22   IndividualPlatformPopups (frosted glass row)
z:10   Word-by-word captions (bottom 28%)
z:0    OffthreadVideo (full-screen, flat 1.0 zoom)
       Background music (lofi, 0.02 volume)
       SFX layer (Audio sequences)
```

---

## Why Bottom 28% for Custom Captions

Pipeline clips have **burned-in auto-captions** occupying the bottom 15-20% of the frame. The custom word-by-word captions must sit ABOVE these to avoid overlap:

```
┌────────────────────────────┐
│                            │
│     Speaker (talking)      │
│                            │
│                            │
│  ► CUSTOM CAPTIONS (28%)   │  ← Our word-by-word captions
│                            │
│  ██ BURNED-IN CAPTIONS ██  │  ← Auto-captions from pipeline
│  ██████████████████████████│
└────────────────────────────┘
```

Position: `bottom: "28%"`, height `10%`, z-index: 10.

---

## Why No Continuous Zoom

Long-form and pipeline clips with continuous zoom keyframes (1.0 -> 1.04 -> 1.08 -> 1.02 cycling) cause a **swimming/shaking effect** that looks amateur on mobile. The video feels unstable.

**Correct approach:**
- Hook punch ONLY: frame 0 at 1.06, frame 3-5 back to 1.0
- Then FLAT 1.0 for the entire rest of the clip
- The energy comes from the pop-outs, not camera movement

```typescript
function getZoom(_frame: number): number {
  return 1.0; // Flat zoom -- energy from pop-outs, not camera
}
```

---

## ConceptOverlay-First Approach

Every spoken concept gets a full-screen ConceptOverlay with:
- `backgroundStyle="solid-white"` (white bg, dark text, orange accent)
- `entrance="clip-circle"` (default, circular wipe reveal)
- Custom SVG illustration with motion
- Caption in ALL CAPS (1-3 words)
- Optional subtitle for context

```typescript
<Sequence from={175} durationInFrames={100} premountFor={15}>
  <ConceptOverlay
    durationInFrames={100}
    illustration={<BigProblemIllustration />}
    caption="BIG PROBLEM"
    subtitle="Massive list, no efficient outreach"
    entrance="clip-circle"
    backgroundStyle="solid-white"
    illustrationSize={580}
  />
</Sequence>
```

### Duration Guidelines

| Type | Frames | Seconds | Use Case |
|------|--------|---------|----------|
| Quick | 30 | 1s | Rapid-fire platform reveals, single word concepts |
| Standard | 50-75 | 1.7-2.5s | Core concepts, feature explanations |
| Key moment | 100 | 3.3s | Hero reveals, B-roll with multi-phase animation |
| Extended | 160-170 | 5.3-5.7s | Speech-synced checklists, multi-step processes |
| CTA | 50-65 | 1.7-2.2s | End card with thumbnail |

### illustrationSize Rules

| Size | When |
|------|------|
| 580 | Minimum for pipeline clips (mobile readability) |
| 600 | Standard -- most concept illustrations |
| 620-640 | Feature illustrations with detail, platform grids |

**NEVER use the default 460 for pipeline clips. Always specify 580+.**

---

## Individual Platform Pop-Outs

When the speaker names platforms in sequence (e.g., "YouTube, Instagram, TikTok, and Threads"), each platform gets its own floating card with its own SFX. This creates rhythm.

### Why Individual > Grouped

A grouped cascade (all platforms appear at once) loses the rhythm of the speaker naming them one by one. Individual pop-outs sync to speech and create a satisfying name -> pop -> name -> pop cadence.

### Component Pattern

```typescript
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
              transform: `scale(${interpolate(enter, [0, 1], [0.3, 1])})
                translateY(${interpolate(enter, [0, 1], [20, 0])}px)`,
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
```

**Key details:**
- Each platform has an `internalFrame` offset (relative to the Sequence start)
- `internalFrame` values come from grepping the WORDS data for when each platform name is spoken
- One pop SFX per platform, J-cut 2-3 frames before visual

---

## Illustration Design

### Inline vs Imported

For pipeline clips, illustrations can be either:
1. **Inline** -- defined in the composition file itself (simpler for small counts)
2. **Imported** -- from `remotion/lib/illustrations/` (reusable across compositions)

Pipeline clips typically have 8-15 illustrations. If many are reusable concepts (platforms, AI, automation), import them. If they are clip-specific (person headshots, specific metrics), define inline.

### Design Principles

- SVG with `viewBox="0 0 600 600"`, accepting `size` prop (default 600)
- `useCurrentFrame()` for animation (springs, interpolations, count-ups)
- Dark strokes (#1A1A1A, #333) for contrast on white bg
- COLORS palette for fills (`#FF7614` primary, `#22C55E` success, etc.)
- Staggered reveals for multi-element illustrations (delay offsets)
- Drop shadows for depth
- Clean vector aesthetic, not pixel art (pixel art deprecated for pipeline clips)

### Motion Types

| Motion | Code | Use Case |
|--------|------|----------|
| Spring entrance | `spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 140 } })` | Element reveal |
| Count-up | `interpolate(frame, [0, 60], [0, target], { extrapolateRight: "clamp" })` | Numbers, metrics |
| Stroke draw | `strokeDashoffset: interpolate(progress, [0, 1], [pathLength, 0])` | Checkmarks, paths |
| Staggered | `Math.max(0, frame - delay)` | Multi-element scenes |
| Pulse | `interpolate(frame % 30, [0, 15, 30], [1.0, 1.06, 1.0])` | Attention draw |
| Fill progress | `spring({ frame: Math.max(0, frame - delay), ... })` | Progress bars |

---

## SFX Strategy

### Event Types

| Event | SFX | Volume | Notes |
|-------|-----|--------|-------|
| Hook burst | whoosh-large-sub-384631.mp3 | 0.24 | Frame 0 |
| ConceptOverlay entrance | whoosh (varied) | 0.14-0.20 | J-cut 2-3f before |
| Individual platform pop | pop-402324.mp3 | 0.18-0.22 | One per platform |
| CTA entrance | whoosh-effect-382717.mp3 | 0.16 | J-cut 2-3f before |
| Headshot/person reveal | pop-402324.mp3 | 0.20 | When person named |

### Density Target

15-20 SFX events per 75-second pipeline clip. This breaks down as:
- 1 hook burst
- 8-12 ConceptOverlay whooshes (one per overlay)
- 3-6 platform pops (one per platform named)
- 1 CTA whoosh

### Variety

Rotate whoosh variants to avoid repetition:
- `whoosh-effect-382717.mp3` (standard)
- `whoosh-bamboo-389752.mp3` (softer, organic)
- `whoosh-large-sub-384631.mp3` (impactful, bass)

---

## Caption System

### Auto-Captions (Burned-In)

Pipeline clips arrive with auto-generated captions burned into the video at the bottom 15-20%. These CANNOT be removed. The custom caption system works ABOVE them.

### Custom Word Captions

```typescript
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
        <div key={w.id} style={{ position: "absolute", width: "100%", ... }}>
          <div
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 72,
              color: w.emphasis ? "#FF7614" : "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              textShadow: w.emphasis
                ? "0 0 20px rgba(255,118,20,0.6), 0 4px 12px rgba(0,0,0,0.8)"
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
```

### CONCEPT_RANGES Hide Logic

Captions hide when a full-screen ConceptOverlay is displayed:

```typescript
const CONCEPT_RANGES = [
  { start: 175, end: 275 },   // Big Problem
  { start: 353, end: 428 },   // Massive Outreach
  { start: 539, end: 639 },   // AI-Powered
  // ... one entry per ConceptOverlay
];

const conceptActive = CONCEPT_RANGES.some(
  (r) => frame >= r.start && frame < r.end
);
```

Each entry: `start` = Sequence `from`, `end` = `from + durationInFrames`.

---

## Gap-Filling Strategy

### The Problem

Raw pipeline clips have long stretches of talking head with no visual reinforcement. Gaps longer than 200 frames (6.7 seconds) feel boring on social media.

### Example: Voice Command Section

When the speaker dictates a voice command naming platforms:
> "Post this as a short form video to YouTube Shorts, TikTok, Threads, and Instagram"

Rapid-fire ConceptOverlays (30 frames each) visualize every item mentioned:

```
Frame 489: SHORT FORM VIDEO (30f)   ← phone illustration
Frame 519: [gap 27f - speaker continues]
Frame 546: YOUTUBE SHORTS (30f)     ← YouTube logo
Frame 576: [gap 3f]
Frame 579: TIKTOK (30f)             ← TikTok logo
Frame 609: [gap 17f]
Frame 626: THREADS (30f)            ← Threads logo
Frame 656: [gap 55f - speaker continues]
Frame 711: INSTAGRAM (30f)          ← Instagram logo
```

Each gets its own pop SFX, J-cut 2 frames before visual.

---

## CTA Pattern

Pipeline clips extracted from long-form YouTube tutorials use "WATCH THE FULL VIDEO" CTA:

```typescript
const CTACard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame, fps,
    from: 0, to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%",
      height: "100%", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 100, opacity: enter }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 14, padding: "28px 40px", borderRadius: 28,
        backgroundColor: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(30px)", width: 680,
      }}>
        {/* YouTube thumbnail */}
        <div style={{ width: "100%", borderRadius: 16, overflow: "hidden" }}>
          <Img
            src={staticFile("thumbnails/youtube-tutorial-thumb.jpg")}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        {/* CTA text + YouTube logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Img src={staticFile("logos/youtube.svg")}
            style={{ width: 44, height: 44 }} />
          <div style={{ fontWeight: 800, fontSize: 34, color: "#1A1A1A",
            letterSpacing: 2 }}>
            WATCH THE FULL VIDEO
          </div>
        </div>
        {/* Subtitle */}
        <div style={{ fontWeight: 600, fontSize: 22, color: "#888" }}>
          Tutorial Title Here
        </div>
        {/* Orange accent line */}
        <div style={{ width: 100, height: 3, backgroundColor: "#FF7614",
          borderRadius: 2 }} />
      </div>
    </div>
  );
};
```

---

## Composition File Structure

```typescript
/**
 * Clip N: Title — VN Composition
 * SOURCE: Pipeline clip with burned-in auto-captions
 * CTA: "WATCH THE FULL VIDEO" + tutorial title
 * Duration: Xs (TOTAL frames @ 30fps)
 */

import React from "react";
import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence,
  interpolate, spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { ConceptOverlay } from "../components/ConceptOverlay";
import { WORDS } from "../data/clip-name-words";
// Import external illustrations OR define inline below

const { fontFamily } = loadFont();
const TOTAL_FRAMES = 2280;

function getZoom(_frame: number): number { return 1.0; }

const CONCEPT_RANGES = [ /* { start, end } entries */ ];

const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  /* J-cut entries */
];

// === INLINE ILLUSTRATIONS (or imports) ===

// === INLINE COMPONENTS (IndividualPlatformPopups, CTACard, etc.) ===

// === MAIN COMPOSITION ===
export const ClipNameComposition: React.FC<{
  videoSrc?: string;
}> = ({ videoSrc = "clip-name.mp4" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hookFlash = interpolate(frame, [0, 3], [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const conceptActive = CONCEPT_RANGES.some(
    (r) => frame >= r.start && frame < r.end
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* BASE: Speaker video */}
      <OffthreadVideo src={staticFile(videoSrc)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      {/* HOOK FLASH */}
      {hookFlash > 0 && (
        <AbsoluteFill style={{ backgroundColor: "#FF6B00",
          opacity: hookFlash, zIndex: 50 }} />
      )}

      {/* ConceptOverlay SEQUENCES */}
      {/* ... */}

      {/* CAPTIONS (bottom 28%, hidden during concepts) */}
      {/* ... */}

      {/* SFX */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={15}>
          <Audio src={staticFile(sfx.src)} volume={sfx.volume} startFrom={0} />
        </Sequence>
      ))}

      {/* BACKGROUND MUSIC */}
      <Audio src={staticFile("audio/lofi-background.mp3")} volume={0.02}
        startFrom={0} endAt={TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};
```

---

## Quality Checklist

Before marking a pipeline clip composition complete:

1. [ ] Every spoken concept has a visual event (ConceptOverlay, platform pop, or CTA)
2. [ ] No gap exceeds 200 frames between visual events
3. [ ] illustrationSize is 580+ for all ConceptOverlays
4. [ ] Every illustration is visually distinct (recognition test)
5. [ ] SFX J-cut: audio 2-3 frames before visual on every event
6. [ ] No SFX collisions (offset by 3 frames)
7. [ ] CONCEPT_RANGES matches all Sequence from/duration pairs exactly
8. [ ] Captions hide during all ConceptOverlay displays
9. [ ] Hook flash at frame 0-3 (orange burst)
10. [ ] CTA card with YouTube thumbnail and "WATCH THE FULL VIDEO"
11. [ ] `premountFor={fps}` on every Sequence
12. [ ] TypeScript compiles: `npx tsc --noEmit`

---

## Reference Compositions

| Composition | Type | Duration | Pop-Outs | Key Patterns |
|-------------|------|----------|----------|-------------|
| `Clip1FromZeroTo90K.tsx` | Success story | 76s | 8 + CTA | ConceptOverlay-first, headshot popup, count-up illustration |
| `Clip2StopManuallyPosting.tsx` | Pain-to-solution demo | 78s | 15 + CTA | Individual platform pops, rapid-fire command section, speech-synced checklist |

---

## Pipeline Clip Production Rules

Pipeline clips are short-form videos extracted from long-form YouTube content. These rules prevent common mistakes.

### Audio
- Pipeline clips have the speaker's voice baked into the video file
- Use `volume={1}` on OffthreadVideo (NOT `volume={0}`)
- Background music still at `volume={0.02}`, first 35s only

### Caption Positioning by Layout
| Layout | Detection | Caption `bottom` |
|--------|-----------|------------------|
| Talking head | Face fills >60% of frame width | `"12%"` |
| Split screen | Screen share top + face bottom | `"3%"` |
| Screen-heavy | Mostly screen, tiny face | `"3%"` |

Always take a screenshot of the video to determine layout before setting position.

### Word Data: Direct Transcription Required
- NEVER generate word data by slicing a master transcript
- ALWAYS transcribe directly from the actual reframed video using faster_whisper or WhisperX
- Clip extraction adds variable pre-roll padding (0.5-4s) that makes master transcript offsets unreliable
- Convert timestamps to frames: `frame = round(seconds * 30)`

### Word Emphasis
- Mark important words with `emphasis: true` in word data
- Categories: brand names, numbers/stats, action verbs, key concepts
- Render emphasized words in brand orange (#FF7614) with glow shadow
- Non-emphasized words render white (#FFFFFF)

---

## Podcast/Interview Clip Editing Patterns

Podcast clips reframed with `--format split` have **dynamic layouts** that switch between split-screen (two speakers) and close-up (single speaker). Captions and overlays must adapt.

### Layout-Aware Caption Positioning

Define layout segments in the composition, then dynamically position captions:

| Layout Segment | Caption `top` | Font Size | Rationale |
|---------------|--------------|-----------|-----------|
| `split_screen` | `46%` (middle between speaker halves) | 56px | Between top/bottom speakers, tight space |
| `close_up` | `62%` (lower third) | 72px | Standard lower-third, more vertical room |

```typescript
const LAYOUT_SEGMENTS: Array<{
  type: "split_screen" | "close_up";
  startFrame: number;
  endFrame: number;
}> = [
  { type: "split_screen", startFrame: 0, endFrame: 405 },
  { type: "close_up", startFrame: 408, endFrame: 1626 },
  // ... segments from crop_path.json layout_segments
];

function getLayoutType(frame: number): "split_screen" | "close_up" {
  for (const seg of LAYOUT_SEGMENTS) {
    if (frame >= seg.startFrame && frame <= seg.endFrame) return seg.type;
  }
  return "close_up";
}

// Smooth 5-frame crossfade at layout transition boundaries
function getCaptionTopPct(frame: number): number {
  const layout = getLayoutType(frame);
  const target = layout === "split_screen" ? 46 : 62;
  // ... interpolation at boundaries (see PodcastStressExpert.tsx)
  return target;
}
```

### Video Synchronization Rules (Critical)

1. **ALWAYS transcribe from the REFRAMED video** — not the source
2. **Use WhisperX** for word-level timestamps, convert: `frame = round(seconds * 30)`
3. **Set `durationInFrames`** to match actual video: `round(audio_duration_sec * 30)`
4. **Verify with ffprobe:** `ffprobe -v quiet -print_format json -show_streams VIDEO`
5. Video may be 29.97fps but composition runs at 30fps — Remotion handles the mapping

### Where Layout Segments Come From

The `crop_path.json` generated during reframe contains a `layout_segments` array. Copy these frame ranges into the composition's `LAYOUT_SEGMENTS` constant.

### Reference Composition

**`PodcastStressExpert.tsx`** — Gold standard for podcast clip editing:
- 6 layout segments alternating split_screen / close_up
- Dynamic caption positioning with smooth 5-frame transitions
- 9 ConceptOverlay pop-outs + 1 CTA
- Font size adapts: 56px (split) vs 72px (close-up)
