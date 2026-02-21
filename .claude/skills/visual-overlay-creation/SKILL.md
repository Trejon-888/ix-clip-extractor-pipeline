---
name: visual-overlay-creation
description: "Create visual overlays for video compositions — illustrations, logo displays, platform grids, motion graphics, and new component types. Use when user says: create overlay, new visual, build illustration, create illustration, design visual, new component, new motion graphic."
metadata:
  category: video-production
  version: 1.0
---

# Visual Overlay Creation

**Purpose:** Create individual visual elements (illustrations, logo displays, platform grids, motion graphics) for Remotion video compositions, and build new component types when existing ones don't fit.

**When to use:** The editing skills (`/edit` → `long-form-editing` / `short-form-editing`) orchestrate full video editing. This skill focuses on creating a SINGLE visual overlay or component — the building block that goes inside those compositions.

---

## Phase 0: CONTEXT — Load References

1. Read `remotion/lib/colors.ts` — the COLORS palette (primary orange #FF6B00, neutrals)
2. Read `remotion/lib/config.ts` — FPS (30) and resolution presets
3. Check `public/logos/` — existing brand assets
4. Check `remotion/lib/illustrations/` — existing illustration components
5. Check `remotion/components/` — existing overlay components

---

## Phase 1: IDENTIFY — What Type of Visual?

| Type | When to Use | Creation Process |
|------|------------|-----------------|
| **SVG Illustration** | Abstract concept (architecture, metric, process) | Animated SVG, viewBox 600x600, COLORS palette |
| **Logo Display** | Real brand/product is named | `Img` + `staticFile()`, frosted glass card |
| **Video Source** | Real footage exists for concept | yt-dlp download, ffmpeg re-encode, `OffthreadVideo volume={0}` |
| **Platform Grid** | Multiple platforms named in sequence | Real SVGs from `public/logos/`, spring per platform |
| **Motion Graphic** | Data visualization, counter, emphasis | Custom inline, `useCurrentFrame()` + `interpolate()` |
| **New Component** | No existing component fits | New `.tsx` in `remotion/components/` |

### Decision Tree

```
What concept needs visualization?
├── Real brand/product?
│   ├── Logo in public/logos/? → Logo Display (Img + staticFile)
│   └── Not available? → Source via brand-asset-sourcing skill, then Logo Display
├── Multiple platforms named?
│   ├── Named in sequence (one by one)? → IndividualPlatformPopups
│   └── Named as a group? → PlatformCascade
├── Abstract concept (architecture, process, metric)?
│   └── SVG Illustration (animated vector)
├── Real footage available?
│   └── Video Source (OffthreadVideo, muted)
├── Data/numbers/counting?
│   └── Motion Graphic (counter, chart, progress bar)
└── Nothing existing fits?
    └── New Component (design and build from scratch)
```

---

## Phase 2: CHECK EXISTING — Don't Recreate

Before creating anything new:

1. **Logos:** `ls public/logos/` — 13 platform SVGs + Claude + Anthropic + INFINITX + GitHub
2. **Illustrations:** `ls remotion/lib/illustrations/` — 60+ existing illustrations
3. **Components:** Check `remotion/components/` for:
   - `ConceptOverlay` — Full-screen concept (solid-white / frosted / dark-blur)
   - `AppleStylePopup` — White bg popup with spring animation
   - `FloatingCard` — Floating info card
   - `PlatformCascade` — Progressive logo grid reveal
   - `KineticText` — Character-level spring text (hype words ONLY)
   - `AnnotationBadge` — Small glassmorphic label pill (metadata ONLY)

**RULE:** If an existing illustration or component can be reused or adapted, USE IT. Only create new when nothing fits.

---

## Phase 3: DESIGN — Plan the Visual

### Style Requirements (Apple Aesthetic)

- **Background:** Design for white backgrounds (ConceptOverlay solid-white)
- **Colors:** Use `COLORS` from `remotion/lib/colors.ts` — primary orange, dark strokes, neutral fills
- **Typography:** Inter font, weight 500-800, letter-spacing 2-4
- **Motion:** Every visual must animate — never static. Use `useCurrentFrame()` + `interpolate()` / `spring()`
- **Clean vectors:** No pixel art, no colored boxes, no cartoonish characters
- **Dark strokes + colored fills:** Strokes #1A1A1A or COLORS.dark, fills from COLORS palette

### Concept Metaphor (For Illustrations)

**RULE: Visualize CONCEPTS, not WORDS.**

- BAD: Speaker says "market crashing" → show red arrow down (literal)
- GOOD: Show dam breaking, house of cards falling (metaphorical/emotional)

Every illustration must pass the **Mute Test**: if a viewer sees it for 1 second without audio, do they understand the concept?

### Size Rules

| Context | illustrationSize | Notes |
|---------|-----------------|-------|
| Standard overlay | 580-620 | Most concepts |
| Hero/key moment | 620-650 | Important concepts |
| CTA | 640 | End card readability |
| Illustration-only (no caption) | 700-800 | V4 long-form standard |

---

## Phase 4: BUILD — Create the Visual

### SVG Illustration Pattern

**Location:** `remotion/lib/illustrations/` (reusable) or inline in composition (one-off)

**Template:**
```typescript
import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS } from "../colors";

export const ConceptNameIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  // Spring entrance for main element
  const mainScale = spring({
    frame, fps: 30,
    from: 0.4, to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  // Staggered secondary elements
  const secondaryOpacity = spring({
    frame: Math.max(0, frame - 8), fps: 30,
    from: 0, to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Main visual element */}
      <g transform={`translate(300, 280) scale(${mainScale})`} style={{ transformOrigin: "0 0" }}>
        {/* ... concept-specific shapes ... */}
      </g>

      {/* Secondary elements (staggered entrance) */}
      <g opacity={secondaryOpacity}>
        {/* ... supporting visuals ... */}
      </g>

      {/* Label text */}
      <text x={300} y={520} textAnchor="middle" fill="#1A1A1A"
        fontSize={36} fontWeight={800} fontFamily="Inter, sans-serif" letterSpacing="3">
        CONCEPT NAME
      </text>
    </svg>
  );
};
```

**Animation patterns:** See `references/patterns.md` for complete code patterns.

### Logo Display Pattern

```typescript
import { Img, staticFile } from "remotion";

// ALWAYS use real images — NEVER recreate logos as SVG
<Img
  src={staticFile("logos/brand-name.svg")}
  style={{ width: 200, height: 200, objectFit: "contain" }}
/>
```

### Platform Grid Pattern

Use `PlatformCascade` component with real SVG logos from `public/logos/`:
- 13 available: x.svg, instagram.svg, linkedin.svg, tiktok.svg, bluesky.svg, facebook.svg, youtube.svg, pinterest.svg, threads.svg, googlebusiness.svg, telegram.svg, snapchat.svg, reddit.svg
- `logoSize` >= 100 (never smaller)
- Spring entrance per platform

For individual platform pop-outs (when platforms are named one-by-one), use the `IndividualPlatformPopups` pattern from pipeline clips.

### New Component Pattern

When no existing component fits:

1. Create `.tsx` in `remotion/components/`
2. Follow existing patterns (AbsoluteFill, spring, interpolate)
3. Accept `durationInFrames` prop for exit animation
4. Include entrance animation (spring scale or clip-path)
5. Include exit fade (last 12 frames)
6. Set `zIndex: 100` for overlay layer

---

## Phase 5: INTEGRATE — Wire Into Composition

### ConceptOverlay Integration

```typescript
<Sequence from={KEYWORD_FRAME} durationInFrames={DURATION} premountFor={fps}>
  <ConceptOverlay
    durationInFrames={DURATION}
    illustration={<ConceptNameIllustration />}
    caption="CONCEPT NAME"        // Optional: 1-3 words, ALL CAPS
    subtitle="Brief explanation"   // Optional
    illustrationSize={600}         // 580-650 standard
    entrance="clip-circle"         // or "wipe-right", "fade-blur"
    backgroundStyle="solid-white"  // or "frosted", "dark-blur"
  />
</Sequence>
```

### SFX Pairing

Every visual overlay gets a sound effect:

| Overlay Type | SFX | Volume | Timing |
|-------------|-----|--------|--------|
| Quick concept | pop | 0.22 | Same frame as visual |
| Hero/ConceptOverlay | whoosh | 0.16 | 3-5 frames BEFORE visual (J-cut) |
| B-roll montage | whoosh-bamboo | 0.14 | 3 frames before |
| Section break | whoosh-large | 0.18 | 3 frames before |
| CTA | mouse-click | 0.18 | Same frame |

### Duration Guide

| Overlay Type | Duration (frames) |
|-------------|-------------------|
| Quick concept (logo, single word) | 60-70 |
| Standard concept | 70-90 |
| Hero concept | 80-120 |
| B-roll montage | 120-210 |
| CTA | 80-100 |

---

## Non-Negotiable Rules

1. **NEVER recreate brand logos as SVG** — Always `Img` + `staticFile()` with real image files
2. **Every illustration must be DISTINCT** — No templates, no parameterized generic components
3. **Design for white backgrounds** — Dark strokes, colored fills (ConceptOverlay solid-white)
4. **Add motion** — `useCurrentFrame()` for count-ups, draws, pulses. Never static SVGs
5. **Use COLORS palette** — From `remotion/lib/colors.ts`, not hardcoded colors
6. **Real images for people** — `Img` + `staticFile("headshots/{name}.png")` via `<foreignObject>`
7. **Illustrations must be BIG** — illustrationSize 580-650 minimum in ConceptOverlay
8. **Clean vectors** — No pixel art, no colored boxes, no cartoonish characters
9. **Mute Test** — Every illustration must be understandable without audio
10. **Check existing first** — Search `public/logos/`, `remotion/lib/illustrations/`, `remotion/components/` before creating

---

## Code Patterns Reference

For complete code patterns (animation recipes, spring configs, platform grid layouts, motion graphic counters, etc.), see: `references/patterns.md`

---

## Evolution Check (End of Every Invocation)

1. Did this create a reusable illustration? → Move to `remotion/lib/illustrations/` if inline
2. Did this reveal a missing brand asset? → Add to `public/logos/` and update brand-asset-sourcing
3. Did the user reject a visual style? → Update the design requirements above
4. Was a new component type needed? → Document in references/patterns.md
5. Did the editing skill reference this during Phase 4? → Verify the handoff is smooth

---

*Version: 1.0 | Created: 2026-02-12 | Replaces svg-illustration-design (deleted — wrong aesthetic).*
