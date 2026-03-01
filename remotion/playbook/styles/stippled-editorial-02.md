# Style Guide: Stippled Editorial

Bold, textured, risograph-inspired visual identity. High contrast dark backgrounds with geometric shapes and stippled grain textures.

---

## Color Palette

```ts
const C = {
  bg: "#0A0F2E",                           // Deep navy — primary background
  bgAlt: "#2B4FFF",                        // Electric blue — alternate bold background
  white: "#FFFFFF",
  ink: "#FFFFFF",                           // Primary text (light on dark)
  inkLight: "#C8CFF0",                     // Secondary text
  inkMuted: "#7B82A8",                     // Tertiary / label text
  accent: "#2B4FFF",                       // Electric blue — primary accent
  accentLight: "#5B7AFF",                  // Lighter blue for glow / hover
  accentBg: "rgba(43, 79, 255, 0.12)",     // Subtle blue tint
  secondary: "#9B8FFF",                    // Lavender — secondary accent blocks / tags
  secondaryBg: "rgba(155, 143, 255, 0.15)", // Lavender tint background
  red: "#FF4D4D",                          // Pain / negative / error
  redBg: "rgba(255, 77, 77, 0.12)",
  stroke: "rgba(255, 255, 255, 0.15)",     // Subtle white borders
  strokeDark: "#FFFFFF",                   // Illustration outlines (white on dark)
  grain: "rgba(255, 255, 255, 0.04)",      // Grain overlay base tint
};
```

### Color Rules
- Backgrounds alternate between `bg` (navy) and `bgAlt` (electric blue) per scene
- Text is ALWAYS white or light on dark backgrounds — never dark text
- `secondary` (lavender) for accent blocks, tags, step indicators, secondary panels
- `red` only for pain points, X icons, negative states
- Never use off-white or light backgrounds in this style

---

## Typography

Load via `@remotion/google-fonts` — same fonts as freehand style, bumped sizes for bold editorial feel.

| Role | Font | Weight | Size | Color |
|------|------|--------|------|-------|
| Hero headline | Inter | 800 | 52-60px | `ink` (#FFFFFF) |
| Section headline | Inter | 800 | 40-46px | `ink` |
| Subtitle | Inter | 500 | 24-26px | `inkLight` |
| Body text | Inter | 500-600 | 22-26px | `inkLight` |
| Label / tag | Space Grotesk | 700 | 14-16px | `secondary` or `inkMuted` |
| Stat value | Space Grotesk | 800 | 48-56px | `accent` or `secondary` |
| Stat label | Inter | 600 | 16-18px | `inkMuted` |

### Typography Rules
- All text uppercase for labels/tags: `textTransform: "uppercase"`, `letterSpacing: 4`
- Headlines always centered: `textAlign: "center"`
- Line height: 1.15-1.25 for headlines, 1.4-1.5 for body
- Never use system fonts

---

## Illustrations

All illustrations are **inline SVG React components** with `scale` prop.

### Style Characteristics
- **White strokes** on transparent/dark backgrounds (strokeWidth: 3-4.5, color: `#FFFFFF`)
- **Clean geometric forms** — circles, rectangles, cubes, straight lines. NO freehand wobble
- **Stippled / halftone texture** applied via SVG `<filter>` on fill areas
- **Accent color fills**: `accent` (blue) or `secondary` (lavender) for highlighted areas
- **strokeLinecap**: `"round"` for softer endpoints
- **No emojis** — always SVG

### Stipple Filter (Include in Each Illustration SVG)
```xml
<defs>
  <filter id="stipple" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="turbulence" baseFrequency="0.8" numOctaves="4" seed="2" result="noise" />
    <feComponentTransfer in="noise" result="spots">
      <feFuncA type="discrete" tableValues="0 1" />
    </feComponentTransfer>
    <feComposite operator="in" in="SourceGraphic" in2="spots" />
  </filter>
</defs>
```

Apply to fill areas: `filter="url(#stipple)"` on shapes that should have grain texture.

### Illustration Sizing
- Large (scene hero): scale 1.0-1.4 (200-320px)
- Medium (step icons): scale 0.5-0.7 (80-120px)
- Small (inline icons): 32-40px fixed

### Component Pattern
```tsx
const StippledExample: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <svg width={240 * scale} height={200 * scale} viewBox="0 0 240 200" fill="none">
    <defs>
      <filter id="stipple-example" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="turbulence" baseFrequency="0.8" numOctaves="4" seed="2" result="noise" />
        <feComponentTransfer in="noise" result="spots">
          <feFuncA type="discrete" tableValues="0 1" />
        </feComponentTransfer>
        <feComposite operator="in" in="SourceGraphic" in2="spots" />
      </filter>
    </defs>
    {/* Geometric shapes with stipple fill */}
    <rect x="40" y="30" width="160" height="100" rx="8"
      fill={C.accent} filter="url(#stipple-example)" />
    {/* Clean white outlines */}
    <rect x="40" y="30" width="160" height="100" rx="8"
      stroke="#FFFFFF" strokeWidth="3.5" fill="none" />
  </svg>
);
```

---

## Background Treatment

### Base
- Solid `C.bg` (navy) or `C.bgAlt` (electric blue) — alternate per scene for visual rhythm
- **Never** flat single-color — always add decorative geometric elements

### Geometric Decorative Elements
- Rectangles and squares with `C.secondary` fill at 15-25% opacity, positioned in corners/edges
- Circles with `C.accent` fill at 8-12% opacity, large and partially off-screen
- Grid/crosshatch: thin white lines at 4-6% opacity

### Grid Overlay Pattern
```tsx
<div style={{
  position: "absolute", inset: 0,
  backgroundImage: `
    repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 40px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 40px)
  `,
  pointerEvents: "none",
}} />
```

### Grain Overlay (Full Composition)
Apply across the entire composition for consistent texture:
```tsx
<div style={{
  position: "absolute", inset: 0,
  zIndex: 999,
  pointerEvents: "none",
  opacity: 0.15,
  mixBlendMode: "overlay",
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  backgroundSize: "128px 128px",
}} />
```

---

## Animation Springs

Same helper hooks as freehand style — no changes needed:

- `useSmooth(delay)` — damping: 200 (text reveals, fades)
- `useSnappy(delay)` — damping: 20, stiffness: 200 (cards, list items)
- `useBouncy(delay)` — damping: 8 (hero illustrations, playful entrances)
- `useReveal(delay)` — opacity + translateY(30→0)
- `useTypewriter(text, delay, speed)` — character-by-character text reveal

### Floating Motion
Same pattern: `Math.sin(frame / N) * amplitude` where N=12-20, amplitude=4-8px

---

## Scene Transitions

- Use `TransitionSeries` with `linearTiming` (never `springTiming`)
- Default overlap: 15 frames (0.5s at 30fps)
- Primary: `fade()` for most transitions
- Emphasis: `slide({ direction: "from-right" })` for key moments (editorial magazine-flip feel)

---

## Cards & Containers

```tsx
{
  backgroundColor: "rgba(255, 255, 255, 0.06)",
  borderRadius: 16,
  border: "1.5px solid rgba(255, 255, 255, 0.12)",
  padding: "24px 20px",
  backdropFilter: "blur(8px)",  // Optional glass effect
}
```

- Semi-transparent white on dark backgrounds (NOT solid white)
- Subtle white border for definition
- Rounded corners: 12-16px
- Optional backdrop blur for glass-morphism effect

---

## Layout (Portrait 1080x1920)

- **Always center vertically**: `justifyContent: "center"` on scene `<AbsoluteFill>`
- Padding: `0 52-60px` (horizontal only)
- Content stacks vertically: illustration → text → cards
- Elements must be large and bold — fill the vertical space
- Single-column layout only

---

## Warm Accent Color

Added in v2 for visual variety and CTA emphasis:

```ts
warm: "#FFD600",        // Bright yellow — CTAs, step indicators, emphasis
warmBg: "rgba(255, 214, 0, 0.12)",  // Subtle yellow tint
```

Use yellow for: CTA buttons, step number badges, emphasis highlights.
Use with `boxShadow: "0 8px 40px rgba(255, 214, 0, 0.35)"` for glow effect on buttons.

---

## Reusable Decorative Components

Layer these absolutely-positioned behind scene content for editorial richness:

- **CircleCluster** — 3 overlapping circles with accent fills at 10-20% opacity. Place in corners.
- **StripedBanner** — Diagonal-striped rectangle (`repeating-linear-gradient`). Place at edges, rotated.
- **GridBlock** — Small grid of squares (4×3). Place as background texture element.

Each scene should have 2-3 decorative elements to avoid flat backgrounds.

---

## Animated Effects

- **Pulsing glow**: `const glow = 0.3 + Math.sin(frame / 8) * 0.15` on CTA `boxShadow` opacity
- **Floating motion**: `Math.sin(frame / N) * amplitude` (N=12-20, amplitude=4-8px) on illustrations

---

## Component Preferences

| Component | Compat | Config Override |
|-----------|--------|----------------|
| ConceptOverlay (dark-blur) | PRIMARY | bg: C.bg (#0A0F2E), accent: C.accent (#2B4FFF) |
| ConceptOverlay (solid-white) | LOW | white bg clashes with dark aesthetic |
| ConceptOverlay (frosted) | MEDIUM | use dark frosted: rgba(10,15,46,0.82) + blur(40px) |
| AppleStylePopup | LOW | white bg clashes with dark style |
| FloatingKeyword | HIGH | white text (#FFFFFF) on dark video, accent: C.accent |
| FloatingCard | MEDIUM | use dark glass: rgba(255,255,255,0.06), border: C.stroke |
| KineticText | HIGH | bold white text pops on dark backgrounds |
| PlatformCascade | HIGH | white stroke logos on dark bg |
