# Style Guide: High-Contrast Editorial

Swiss minimalist, luxury-brutalist aesthetic. Heavy geometric sans-serifs, offset text layering (echo stack), clean high-contrast monochromatic palette. Typography-first design — no illustrative fluff, relying on geometric shapes, sharp borders, and high-impact font pairing.

---

## Color Palette

```ts
const C = {
  bg: "#F2F2F2",                          // Off-white background (clean, editorial)
  white: "#FFFFFF",                        // Card backgrounds
  ink: "#111111",                          // Primary text — deep black
  inkLight: "#838282",                     // Secondary text
  inkMuted: "#B6B5B5",                    // Tertiary text, labels, nav links
  accent: "#111111",                       // Primary accent = text color (monochromatic)
  accentHover: "#B6B5B5",                 // Hover state for interactive elements
  stroke: "rgba(30, 30, 30, 0.10)",       // Card borders, dividers (10% opacity)
  strokeDark: "#1E1E1E",                  // Strong borders, pill button borders
  // Echo stack layers (for typographic depth effect)
  echo1: "#BFBFBF",                       // First background text layer
  echo2: "#C9C9C9",                       // Second layer
  echo3: "#D1D1D1",                       // Third layer
  echo4: "#D9D9D9",                       // Fourth layer (lightest)
  // Footer
  footerBg: "#1E1E1E",                    // Deep dark footer
  footerText: "rgba(246, 246, 246, 0.60)", // 60% opacity off-white
};
```

### Color Rules
- Background is ALWAYS `#F2F2F2` (off-white) — never pure white, never dark
- Text is ALWAYS `#111111` (deep black) for maximum contrast
- NO brand colors (no orange, no blue) — strictly monochromatic
- Borders/dividers at 10% opacity for subtlety
- Footer sections use inverted dark theme (#1E1E1E bg, off-white text)
- The echo stack effect creates depth using only grayscale

---

## Typography

**Fonts:**
- **Clash Display** — Headlines, hero text, section titles. Weight: 700 (Bold).
- **Satoshi** — Body text, labels, buttons, navigation. Weight: 500 (Medium), 700 (Bold for CTAs).

**Hierarchy:**

| Role | Font | Weight | Size | Tracking | Leading | Color |
|------|------|--------|------|----------|---------|-------|
| Hero headline | Clash Display | 700 | 11vw / 180px | -0.05em | 0.9 | `ink` (#111111) |
| Section headline | Clash Display | 700 | 4xl-6xl (48-64px) | -0.03em | 1.0 | `ink` |
| Subtitle | Satoshi | 500 | 22-26px | normal | 1.4 | `inkLight` |
| Body text | Satoshi | 500 | 17-22px | normal | 1.5 | `inkLight` |
| Label / tag | Satoshi | 700 | 14px | 0.12em | normal | `inkMuted` |
| Navigation | Satoshi | 500 | 14px | uppercase | normal | `ink` → `inkMuted` on hover |
| Button (pill) | Satoshi | 700 | 14px | wide | normal | `ink` with 1px `strokeDark` border |

### Typography Rules
- Labels: `textTransform: "uppercase"`, `letterSpacing: "0.12em"`
- Headlines: tight tracking (-0.05em), tight leading (0.9)
- NEVER use system fonts
- Key moments: use a single keyword in contrasting serif italic for editorial flair

---

## Illustrations

All illustrations for this style are **geometric and typographic** — no freehand, no organic curves.

### Style Characteristics
- **NO traditional illustrations** — use geometric shapes, typography, and layout as the visual
- **White strokes** where needed (strokeWidth: 2-3, color: `#111111` or `#FFFFFF` depending on context)
- **Clean geometric forms** — rectangles, circles, hairlines. Strict grid alignment
- **Monochromatic** — only grayscale values, no color fills
- **High-contrast** — always ensure #111111 vs #F2F2F2 or inverse
- **Scalable** via `scale` prop

### Illustration Sizing
- Large (scene hero): The typography IS the illustration (Echo Stack effect at 11vw)
- Medium (step icons): Geometric icon containers, 64x64px, rotate 12deg on reveal
- Small (inline): Arrow icons, hairline dividers (1px)

### Component Pattern
```tsx
const GeometricIcon: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <svg width={64 * scale} height={64 * scale} viewBox="0 0 64 64" fill="none">
    <rect x="4" y="4" width="56" height="56" rx="4"
      stroke="#111111" strokeWidth="2" fill="none" />
    {/* Geometric content inside */}
  </svg>
);
```

---

## Special Effects

### Echo Stack (Signature Effect)

The defining visual of this style — hero text layered with offset background repetitions.

```tsx
// Echo Stack implementation for Remotion
const EchoStack: React.FC<{ text: string; size?: number }> = ({ text, size = 180 }) => {
  const frame = useCurrentFrame();
  const layers = [
    { color: C.echo4, offset: -0.16 },  // Deepest (lightest gray)
    { color: C.echo3, offset: -0.12 },
    { color: C.echo2, offset: -0.08 },
    { color: C.echo1, offset: -0.04 },  // Closest to foreground
  ];

  return (
    <div style={{ position: "relative" }}>
      {layers.map((layer, i) => {
        const delay = (layers.length - i) * 3; // Stagger from back to front
        const opacity = spring({
          frame: Math.max(0, frame - delay),
          fps: 30,
          config: { damping: 20, stiffness: 200 },
        });
        return (
          <div key={i} style={{
            position: "absolute",
            color: layer.color,
            fontSize: size,
            fontFamily: "Clash Display",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            transform: `translate(${layer.offset}em, ${layer.offset}em)`,
            opacity,
            pointerEvents: "none",
          }}>
            {text}
          </div>
        );
      })}
      {/* Foreground text */}
      <div style={{
        position: "relative",
        color: C.ink,
        fontSize: size,
        fontFamily: "Clash Display",
        fontWeight: 700,
        letterSpacing: "-0.05em",
        lineHeight: 0.9,
      }}>
        {text}
      </div>
    </div>
  );
};
```

### Clip-Path Inset Reveal

Image/content reveal using shrinking clip-path inset:

```tsx
const reveal = spring({ frame, fps: 30, config: { damping: 20, stiffness: 120 } });
const inset = interpolate(reveal, [0, 1], [100, 0]);
// Apply: clipPath: `inset(${inset}%)`
// Duration equivalent: ~21 frames (700ms at 30fps)
```

### Grayscale-to-Color Transition

For image showcases — start desaturated, reveal color:

```tsx
const colorReveal = interpolate(frame, [0, 15], [0.2, 1], { extrapolateRight: "clamp" });
// Apply: filter: `grayscale(${1 - colorReveal})`
// Scale: transform: `scale(${1 + colorReveal * 0.05})` // 1.0 → 1.05
```

---

## Background Treatment

### Base
- Solid `C.bg` (#F2F2F2) — clean off-white
- **Never** flat single-color — add geometric decorative elements

### Geometric Decorative Elements
- Vertical hairline dividers: 1px `C.strokeDark` at 10% opacity
- Large typographic elements in echo gray tones as background texture
- Grid structure implied but not drawn — whitespace creates the grid

### NO grain overlay (unlike Stippled Editorial)
This style is CLEAN — no noise, no texture, no grain. Precision over roughness.

---

## Animation Springs

Same helper hooks as other styles, but tuned for precision:

- `useSmooth(delay)` — damping: 200 (text reveals, subtitle fades)
- `useSnappy(delay)` — damping: 20, stiffness: 200 (cards, geometric reveals)
- **Preferred for hero moments:** Custom cubic-bezier equivalent via spring({ damping: 25, stiffness: 150 })

### Clip-Path Animations
- 700ms equivalent = ~21 frames at 30fps
- Use `spring({ damping: 20, stiffness: 120 })` for inset reveals
- Easing feel: Power3.inOut equivalent

### Micro-Interactions
- Geometric icon containers: rotate 12deg on reveal
- Arrow icons: translateX(4px) on entrance
- Scale transforms: 1.0 → 1.05 (subtle, precise)

---

## Scene Transitions

- Use `TransitionSeries` with `linearTiming`
- Default overlap: 15 frames (0.5s)
- Primary: `fade()` for most transitions
- Emphasis: `slide({ direction: "from-right" })` for editorial magazine-flip feel

---

## Cards & Containers

```tsx
{
  backgroundColor: "transparent",   // Cards are transparent by default
  borderRadius: 4,                  // Minimal rounding — NOT rounded-2xl
  border: `1px solid rgba(30, 30, 30, 0.10)`,
  padding: "24px 20px",
  // On hover/active state:
  // backgroundColor: C.white (#FFFFFF)
}
```

- Cards are minimal — thin borders, transparent background
- Rounded corners: 4px MAX (sharp, editorial)
- Active state: background fills to white
- Geometric icon containers: 64x64px, rotated 12deg on reveal
- Arrow-right icons for CTAs with tracking-wide bold Satoshi

---

## Layout (Portrait 1080x1920)

- **Massive whitespace** — let the typography breathe
- Padding: `0 60-80px` (generous horizontal)
- Content stacks vertically: echo text → body → cards
- Asymmetric when possible — content off-center for editorial tension
- 3-column grids with 32px gaps for information sections
- Single-column for hero moments

---

## Component Preferences

| Component | Compat | Config Override |
|-----------|--------|----------------|
| ConceptOverlay (dark-blur) | PRIMARY | bg: rgba(17,17,17,0.85) + blur(30px), accent: #111111 |
| ConceptOverlay (solid-white) | MEDIUM | bg: C.bg (#F2F2F2), use with Echo Stack illustration |
| ConceptOverlay (frosted) | LOW | frosted glass conflicts with clean precision aesthetic |
| AppleStylePopup | LOW | white popup + rounded corners too soft for this style |
| FloatingKeyword | HIGH | text: C.ink (#111111), bold Clash Display, no crystal box |
| FloatingCard | MEDIUM | use sharp corners (4px), thin borders, transparent bg |
| KineticText | HIGH | Clash Display, per-character spring, dramatic on high-contrast bg |
| PlatformCascade | HIGH | monochromatic logos (grayscale filter) |
