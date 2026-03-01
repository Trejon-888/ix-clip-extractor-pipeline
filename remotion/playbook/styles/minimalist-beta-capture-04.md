# Style Guide: Minimalist Beta Capture

Modern Obsidian aesthetic. Dark-themed, editorial typography pairing high-impact serif italics with technical monospace. Frosted-glass UI elements, silver gradients, SVG noise textures. Strictly monochromatic (#080808 to #FFFFFF) — no brand colors.

---

## Color Palette

```ts
const C = {
  bg: "#080808",                          // Obsidian background — deep black
  white: "#FFFFFF",                       // Pure white — high-contrast accents
  ink: "#FFFFFF",                         // Primary text on dark bg
  inkLight: "#E2E8F0",                    // Silver text — body copy, subtitles
  inkMuted: "rgba(255, 255, 255, 0.40)",  // Muted labels, metadata
  accent: "#E2E8F0",                      // Silver accent (no brand color)
  accentGradient: "linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)", // Silver gradient for buttons/highlights
  stroke: "rgba(255, 255, 255, 0.08)",    // Border color — very subtle
  strokeLight: "rgba(255, 255, 255, 0.04)", // Card backgrounds, glass panels
  // Glass effect
  glassBg: "rgba(255, 255, 255, 0.02)",   // Frosted glass background
  glassBlur: "blur(24px)",                // Backdrop blur for glass elements
  // Noise overlay
  noiseOpacity: 0.05,                     // SVG fractal noise at 5%
  // Button
  btnBg: "linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)", // Silver gradient
  btnText: "#000000",                     // Black text on silver buttons
  btnGlow: "0 0 20px rgba(255, 255, 255, 0.15)", // Hover glow
};
```

### Color Rules
- Background is ALWAYS `#080808` (obsidian) — never gray, never light
- Text is ALWAYS white or silver (#E2E8F0) for readability
- NO brand colors (no orange, no blue, no green) — strictly monochromatic silver
- Borders at 8% opacity maximum — ghostly, not visible
- Glass panels: `rgba(255, 255, 255, 0.02)` + `backdrop-filter: blur(24px)`
- Buttons use silver gradient background with black text
- Noise texture overlay at 5% opacity adds depth without color

---

## Typography

**Fonts:**
- **DM Serif Display** — Headlines, hero text. Weight: 400 (Regular). ALWAYS italicized.
- **Geist Mono** — Labels, buttons, metadata, UI elements. Weight: 100-900 variable.
- **Inter** — Body text, descriptions. Weight: 300 (Light) to 600 (Semi-Bold).

**Hierarchy:**

| Role | Font | Weight | Size | Tracking | Leading | Color | Notes |
|------|------|--------|------|----------|---------|-------|-------|
| Hero headline | DM Serif Display | 400 | clamp(42px, 10vw, 140px) | tighter | 0.85 | `white` | MUST be italic |
| Section headline | DM Serif Display | 400 | 4xl-6xl (48-72px) | tighter | 0.85 | `white` | MUST be italic |
| Subtitle | Inter | 300 | 18-22px | normal | 1.5 | `inkLight` (#E2E8F0) | |
| Body text | Inter | 400 | 14-18px | normal | 1.6 | `inkLight` | |
| Label / tag | Geist Mono | 500 | 10-14px | 0.2em-0.5em | normal | `inkMuted` | MUST be uppercase |
| Metadata | Geist Mono | 400 | 10-12px | 0.2em | normal | `inkMuted` | |
| Button | Geist Mono | 700 | 12-14px | 0.15em | normal | `btnText` (#000) | uppercase, on silver bg |

### Typography Rules
- Headlines: ALWAYS `DM Serif Display` italic — never non-italic serif
- Labels: ALWAYS `Geist Mono` uppercase with wide tracking (0.2em+)
- Body: `Inter` light/regular for readability on dark background
- NEVER use system fonts
- Monospace creates the "engineered" technical feel — use it for ALL UI elements

---

## Illustrations

All illustrations for this style are **minimal and typographic** — the text IS the visual.

### Style Characteristics
- **NO traditional illustrations** — use typography and geometric glass panels as visuals
- **Glass containers** as illustration frames — `rgba(255, 255, 255, 0.02)` + blur(24px)
- **Silver gradient accents** on key elements (buttons, highlight bars)
- **Monochromatic** — only white, silver, and deep black
- **Noise texture** as background depth — SVG fractal noise at 5% opacity
- **Scalable** via `scale` prop

### Illustration Sizing
- Large (hero): Typography IS the illustration — massive italic serif at clamp(42px, 10vw, 140px)
- Medium (feature cards): Glass-panel containers with monospace labels
- Small (inline): Silver gradient bars, minimal line separators

### Component Pattern
```tsx
// Glass panel container for illustration frames
const GlassPanel: React.FC<{ scale?: number; children: React.ReactNode }> = ({ scale = 1, children }) => (
  <div style={{
    width: 400 * scale,
    padding: 32 * scale,
    background: "rgba(255, 255, 255, 0.02)",
    backdropFilter: "blur(24px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
  }}>
    {children}
  </div>
);
```

---

## Special Effects

### SVG Noise Overlay (Signature Effect)

The defining texture of this style — subtle fractal noise over the entire composition.

```tsx
// Noise overlay for Remotion
const NoiseOverlay: React.FC = () => (
  <svg style={{
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    opacity: 0.05,
    pointerEvents: "none",
    zIndex: 999,
  }}>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);
```

### Silver Gradient Sweep

Button/accent highlight with animated gradient position:

```tsx
// For CTAs and emphasis bars
const silverGradient = "linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)";
// Hover: add box-shadow: 0 0 20px rgba(255, 255, 255, 0.15)
// Scale: transform: translateY(-1px) on hover
```

### Slide-Up Entry (Cubic-Bezier)

The default entrance for this style — smooth upward slide with deceleration:

```tsx
// Remotion equivalent of cubic-bezier(0.16, 1, 0.3, 1) over 0.8s (~24 frames)
const slideUp = spring({
  frame,
  fps: 30,
  config: { damping: 25, stiffness: 100 },
});
const y = interpolate(slideUp, [0, 1], [60, 0]);
const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
// Apply: transform: `translateY(${y}px)`, opacity
```

---

## Background Treatment

### Base
- Solid `C.bg` (#080808) — deep obsidian black
- SVG fractal noise overlay at 5% opacity (ALWAYS present)
- Glass panels create depth without color

### Decorative Elements
- Frosted glass containers: `rgba(255, 255, 255, 0.02)` + blur(24px) with 4rem radius
- Silver gradient accents as thin highlight bars
- Borders at 8% opacity for ghost-line separators
- NO background images, NO background patterns beyond noise

### Noise is REQUIRED
This style ALWAYS has the noise overlay — without it, the solid black feels flat.

---

## Animation Springs

Tuned for smooth, premium motion — no bounce, no playfulness:

- `useSmooth(delay)` — damping: 200 (text fades, metadata reveals)
- **Preferred for hero:** Custom slide-up via `spring({ damping: 25, stiffness: 100 })` — equivalent to `cubic-bezier(0.16, 1, 0.3, 1)`
- `useSnappy(delay)` — damping: 20, stiffness: 200 (glass panel reveals, card entrances)

### Entry Animation (Default)
- 0.8s equivalent = ~24 frames at 30fps
- Use `spring({ damping: 25, stiffness: 100 })` for slide-up reveals
- Pair with opacity fade over first 12 frames

### Micro-Interactions
- Buttons: translateY(-1px) + glow shadow on hover
- Glass panels: fade in with blur(24px) backdrop
- Labels: stagger-reveal with Geist Mono uppercase tracking

---

## Scene Transitions

- Use `TransitionSeries` with `linearTiming`
- Default overlap: 12 frames (0.4s)
- Primary: `fade()` for most transitions — smooth, premium
- AVOID: `slide()` — too energetic for this minimal style

---

## Cards & Containers

```tsx
{
  backgroundColor: "rgba(255, 255, 255, 0.02)",  // Near-invisible glass
  backdropFilter: "blur(24px)",
  borderRadius: 16,                               // 1rem — soft but not bubbly
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "32px 28px",
  // Large hero containers: borderRadius: 64 (4rem)
}
```

- Cards are glass panels — transparent bg, heavy blur
- Rounded corners: 16px standard, 64px for hero containers
- Borders: ghost-line at 8% white opacity
- NO hard shadows — depth comes from glass blur and noise texture

---

## Layout (Portrait 1080x1920)

- **Extreme whitespace** — let the obsidian breathe
- Padding: `0 48-64px` (fluid, roughly 92vw equivalent)
- Content stacks vertically: headline → metadata bar → glass container
- Center-aligned for hero moments, left-aligned for body content
- Metadata bars: 3-column flex with monospace labels

---

## Component Preferences

| Component | Compat | Config Override |
|-----------|--------|----------------|
| ConceptOverlay (dark-blur) | PRIMARY | bg: rgba(8,8,8,0.90) + blur(24px), noise overlay on top |
| ConceptOverlay (frosted) | HIGH | glass effect matches style, reduce to 2% white bg |
| ConceptOverlay (solid-white) | LOW | white bg destroys obsidian aesthetic |
| AppleStylePopup | LOW | white popup clashes with dark theme |
| FloatingKeyword | HIGH | text: C.white, Geist Mono for labels, DM Serif Display italic for keywords |
| FloatingCard | MEDIUM | use glass-panel variant, border: rgba(255,255,255,0.08) |
| KineticText | MEDIUM | DM Serif Display italic, silver gradient fill |
| PlatformCascade | HIGH | white/silver logos on dark bg, monochromatic |
| StepReveal | HIGH | glass-panel steps, silver gradient indicators |
| PillShowcase | HIGH | glass-frame showcase, silver gradient accents |
| MasonryGallery | PRIMARY | blur-to-focus entrance on obsidian bg, glass overlays |
