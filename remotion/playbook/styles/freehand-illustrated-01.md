# Style Guide

The visual identity for IX Content Factory videos. This is the source of truth for all compositions.

---

## Color Palette

```ts
const C = {
  bg: "#FAFAF8",              // Off-white background (clean, editorial)
  white: "#FFFFFF",            // Card backgrounds
  ink: "#1A1A1A",              // Primary text
  inkLight: "#3D3D3D",         // Secondary text
  inkMuted: "#8A8A8A",         // Tertiary text, labels
  accent: "#7BFF00",           // Lime green — primary accent
  accentDark: "#5CC800",       // Darker lime — text-safe accent
  accentBg: "rgba(123, 255, 0, 0.08)",       // Subtle accent background
  accentBgStrong: "rgba(123, 255, 0, 0.15)", // Stronger accent background
  red: "#E54545",              // Pain/negative emphasis
  redBg: "rgba(229, 69, 69, 0.06)",          // Red background tint
  stroke: "#E0E0E0",          // Light borders
  strokeDark: "#2A2A2A",      // Illustration outlines
};
```

**Rules:**
- Background is always `#FAFAF8` (off-white), never dark/black
- `accent` (`#7BFF00`) is for fills, highlights, and decorative elements
- `accentDark` (`#5CC800`) is for text on white backgrounds (better contrast)
- `red` is reserved for pain points, negatives, strike-throughs
- Cards use `white` background with `stroke` border

---

## Typography

**Fonts** (loaded via `@remotion/google-fonts`):
- **Inter** — Headlines, body text, buttons. Weights: 400-800.
- **Space Grotesk** — Labels, tags, accents, monospaced-feel elements. Weights: 400-700.

**Hierarchy:**
| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Hero headline | Inter | 42-52px | 800 | `ink` |
| Section headline | Inter | 34-36px | 800 | `ink` |
| Subtitle | Inter | 22px | 500 | `inkMuted` |
| Body text | Inter | 17-22px | 500-600 | `inkLight` |
| Label / tag | Space Grotesk | 13-14px | 700 | varies |
| Button text | Inter | 22px | 700 | `accent` on `ink` bg |
| URL / small | Space Grotesk | 15px | 400 | `inkMuted` |

**Label style:**
```ts
{
  fontSize: 14,
  fontFamily: spaceGrotesk,
  fontWeight: 700,
  letterSpacing: 4,
  textTransform: "uppercase",
}
```

---

## Illustrations

All illustrations are **inline SVG React components**. No external images, no emojis.

**Style characteristics:**
- Thick black outlines: `strokeWidth="3"` to `"4.5"` for large illustrations, `"2"` for small icons
- Stroke color: `C.strokeDark` (`#2A2A2A`)
- Fill color: `C.accent` (`#7BFF00`) for highlighted elements, `C.white` for bodies
- Accent background fill: `C.accentBgStrong` for subtle colored areas
- Round caps: `strokeLinecap="round"`, `strokeLinejoin="round"`
- Freehand feel: slightly imprecise coordinates (not pixel-perfect grid alignment)
- Scalable via `scale` prop: `width={W * scale}`, `height={H * scale}`

**Sizing:**
- Large scene illustrations: 180-280px, use `scale={1.0-1.3}`
- Step/card illustrations: 80-100px, use `scale={0.55-0.6}`
- Inline icons (replacing emojis): 28px fixed, no scale prop

**Existing illustration library:**
- `IllustrationStress` — Person with scribble cloud (overwhelm/frustration)
- `IllustrationRobot` — Friendly robot with antenna and lime eyes (AI/automation)
- `IllustrationChat` — Chat bubble with reply (messaging/communication)
- `IllustrationCalendar` — Calendar with highlighted day (scheduling)
- `IllustrationRocket` — Rocket with accent window (growth/launch)
- `IllustrationMoney` — Bills and coins (value/results)
- `IconChat` — Small chat bubble (28px)
- `IconPhone` — Handset (28px)
- `IconBrain` — Brain with nodes (28px)
- `IconCalendarCheck` — Calendar with checkmark (28px)

When a new concept needs illustration, create a new inline SVG following the same style.

### Component Preferences

| Component | Compat | Config Override |
|-----------|--------|----------------|
| ConceptOverlay (solid-white) | PRIMARY | bg matches C.bg (#FAFAF8), accent: C.accent |
| ConceptOverlay (frosted) | HIGH | — |
| ConceptOverlay (dark-blur) | LOW | clashes with light warm aesthetic |
| AppleStylePopup | HIGH | accentColor: C.accent (#7BFF00) |
| FloatingKeyword | HIGH | text: C.ink (#1A1A1A), accent: C.accentDark (#5CC800) |
| FloatingCard | HIGH | bg: C.white, border: C.stroke (#E0E0E0) |
| KineticText | MEDIUM | needs dark text on light bg |
| PlatformCascade | HIGH | dark stroke logos on off-white bg |

---

## Animation Springs

Three reusable spring configs, implemented as hooks:

```ts
const useSmooth = (delay = 0) => spring({ frame, fps, delay, config: { damping: 200 } });
// Smooth, no bounce. Use for text reveals, subtle entrances.

const useSnappy = (delay = 0) => spring({ frame, fps, delay, config: { damping: 20, stiffness: 200 } });
// Quick, minimal bounce. Use for cards, list items, UI elements.

const useBouncy = (delay = 0) => spring({ frame, fps, delay, config: { damping: 8 } });
// Playful bounce. Use for hero illustrations, CTA buttons.
```

**Helper hooks:**
- `useReveal(delay)` — Combines opacity + translateY(30 -> 0). Standard text entrance.
- `useTypewriter(text, delay, speed)` — String slicing for typewriter effect. Never per-character opacity.

**Floating motion** for illustrations:
```ts
const float = Math.sin(frame / N) * amplitude;
// N = 12-20 (speed), amplitude = 4-6px
```

---

## Background Treatment

- Base: `backgroundColor: C.bg` (`#FAFAF8`)
- Accent blobs: `radial-gradient` or positioned `<div>` with:
  ```ts
  {
    background: C.accentBg, // or "rgba(123, 255, 0, 0.06)"
    borderRadius: "50%",
    filter: "blur(60-100px)",
    width: 300-500,
    height: 300-500,
  }
  ```
- Cards: `backgroundColor: C.white`, `border: 1.5px solid ${C.stroke}`, `borderRadius: 12-16`, subtle `boxShadow`

---

## Scene Transitions

Use `TransitionSeries` with `linearTiming` (not `springTiming`):

```tsx
<TransitionSeries.Transition
  presentation={fade()}
  timing={linearTiming({ durationInFrames: 15 })}
/>
```

- Default overlap: 15 frames (0.5s)
- Use `fade()` for most transitions
- Use `slide({ direction: "from-bottom" })` for emphasis moments (shift, CTA)
- Total duration = sum of scene frames - (number of transitions * overlap frames)
