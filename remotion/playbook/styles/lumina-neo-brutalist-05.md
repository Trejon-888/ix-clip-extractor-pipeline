# Style Guide: Lumina Neo-Brutalist

Vibrant Neo-Brutalist SaaS aesthetic. Dominant `#ffe17c` yellow, deep `#171e19` charcoal, and `#b7c6c2` sage accents. High-contrast black borders, hard offset shadows (no blur), bold geometric typography. Professional confidence with a playful edge.

---

## Color Palette

```ts
const C = {
  bg: "#ffe17c",                          // Primary yellow background
  bgDark: "#171e19",                      // Charcoal — dark sections, footer
  white: "#FFFFFF",                       // Card backgrounds, UI surfaces
  ink: "#000000",                         // Primary text — solid black
  inkLight: "#171e19",                    // Secondary text on light backgrounds
  inkOnDark: "#FFFFFF",                   // Text on dark charcoal backgrounds
  accent: "#ffe17c",                      // Yellow accent (same as bg)
  accentAlt: "#b7c6c2",                   // Sage green — secondary accent
  stroke: "#000000",                      // 2px solid black borders — signature
  // Hard shadows (no blur!)
  shadowSmall: "4px 4px 0px 0px #000000",  // Standard elements
  shadowLarge: "8px 8px 0px 0px #000000",  // Large containers, featured cards
  shadowHero: "12px 12px 0px 0px #000000", // Browser mockups, hero elements
  // Dot pattern
  dotColor: "rgba(0, 0, 0, 0.10)",        // 10% black dots on yellow bg
  dotSize: 32,                            // 32px radial dot pattern
  // Star rating
  starColor: "#ffbc2e",                   // Yellow-orange for star ratings
};
```

### Color Rules
- Primary sections use `#ffe17c` yellow background
- Dark sections use `#171e19` charcoal
- Text is ALWAYS `#000000` on light, `#FFFFFF` on dark
- ALL interactive elements have 2px solid black borders
- Shadows are ALWAYS hard offset (NO blur radius — 0px blur)
- Sage `#b7c6c2` for secondary accents, icon containers, testimonial backgrounds
- NO gradients (except dotted background patterns) — NO soft shadows

---

## Typography

**Fonts:**
- **Cabinet Grotesk** — Headlines, hero text. Weight: 800 (Extrabold).
- **Satoshi** — Body text, buttons, navigation. Weight: 500 (Medium), 700 (Bold for CTAs).

**Hierarchy:**

| Role | Font | Weight | Size | Tracking | Leading | Color |
|------|------|--------|------|----------|---------|-------|
| Hero headline | Cabinet Grotesk | 800 | 8xl (96px+) | tighter | 0.9 | `ink` (#000) |
| Section headline | Cabinet Grotesk | 800 | 4xl-6xl (48-72px) | tighter | 0.95 | `ink` |
| Subtitle | Satoshi | 500 | 18-22px | normal | 1.5 | `inkLight` |
| Body text | Satoshi | 500 | 16-18px | normal | 1.6 | `inkLight` |
| Label / tag | Satoshi | 700 | 12-14px | 0.05em | normal | `ink` |
| Button | Satoshi | 700 | 14-16px | normal | normal | varies |
| Index number | Cabinet Grotesk | 800 | 10px | 0.2em | normal | `ink` or `accent` |

### Typography Rules
- Headlines: ALWAYS `Cabinet Grotesk` Extrabold, uppercase optional
- One keyword per headline can use `-webkit-text-stroke: 2px black` with transparent fill for outline effect
- Index numbers (01, 02, 03): small monospace-style numbering above features
- NEVER use system fonts or serif fonts
- Keep it bold and geometric — no thin weights

---

## Illustrations

All illustrations for this style are **bold, geometric, and flat** — no gradients, no 3D.

### Style Characteristics
- **Flat geometric shapes** — rectangles, circles, bold outlines
- **2px black strokes** on all illustration elements
- **3-color maximum** per illustration: black, yellow, sage (or white)
- **Hard offset shadows** on illustration containers (4px 4px 0px 0px #000)
- **Pill badges** — rounded-full white containers with black text for labels
- **Scalable** via `scale` prop

### Illustration Sizing
- Large (hero): Browser mockup containers with internal card layouts
- Medium (feature cards): Bold icon in sage-colored 16x16 container
- Small (inline): Pill badges, tag labels, small check/x icons

### Component Pattern
```tsx
// Neo-Brutalist card container
const BrutalistCard: React.FC<{ scale?: number; featured?: boolean; children: React.ReactNode }> =
  ({ scale = 1, featured, children }) => (
  <div style={{
    width: 320 * scale,
    padding: 24 * scale,
    background: featured ? "#ffe17c" : "#FFFFFF",
    border: "2px solid #000000",
    borderRadius: 12,
    boxShadow: featured ? "8px 8px 0px 0px #000000" : "4px 4px 0px 0px #000000",
  }}>
    {children}
  </div>
);
```

---

## Special Effects

### Push Button (Signature Interaction)

The defining micro-interaction — buttons visually "depress" on hover:

```tsx
// Remotion implementation for push button effect
const PushButton: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  // For animated press effect in video, simulate hover at key frames
  return (
    <div style={{
      background: "#000000",
      color: "#FFFFFF",
      padding: "16px 32px",
      border: "2px solid #000000",
      borderRadius: 12,
      boxShadow: "8px 8px 0px 0px #000000",
      fontFamily: "Satoshi",
      fontWeight: 700,
      fontSize: 14,
      // On "press": transform: translate(4px, 4px), boxShadow: "4px 4px 0px 0px #000"
      // On "full press": transform: translate(8px, 8px), boxShadow: "0px 0px 0px 0px #000"
    }}>
      {text}
    </div>
  );
};
```

### Radial Dot Pattern Background

Subtle dot grid on yellow sections:

```tsx
// Background dot pattern
const dotBg = {
  backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.10) 1px, transparent 1px)",
  backgroundSize: "32px 32px",
};
```

### Outline Text Keyword

One word in headline uses stroke instead of fill:

```tsx
// Outline text effect for hero keywords
const outlineStyle = {
  WebkitTextStroke: "2px #000000",
  color: "transparent",
  fontFamily: "Cabinet Grotesk",
  fontWeight: 800,
};
```

---

## Background Treatment

### Base
- Primary sections: `C.bg` (#ffe17c) yellow with radial dot pattern at 10%
- Dark sections: `C.bgDark` (#171e19) charcoal
- Card sections: `C.white` (#FFFFFF)

### Section Transitions
- Alternate between yellow/dark/white sections
- 2px solid black `border-y` between sections
- Skewed sections at -2deg for editorial energy

### NO soft effects
This style is SHARP — no blur, no glass, no gradients, no noise. All depth comes from hard shadows.

---

## Animation Springs

Tuned for snappy, physical feel — buttons press, cards snap:

- `useSnappy(delay)` — damping: 20, stiffness: 200 (card entrances, button reveals)
- **Push button:** Custom `cubic-bezier(0.175, 0.885, 0.32, 1.275)` — bouncy press feel
- Standard spring for most elements: damping: 14, stiffness: 120

### Entry Animation (Default)
- Cards: slide-in with hard shadow appearing staggered
- Push buttons: scale from 0.9→1.0 with shadow growing
- Text: immediate reveal (no fade) with translate(4px) settle

### Micro-Interactions
- Push buttons: translate(4px, 4px) + shadow reduction on press
- Feature icons: sage → yellow color shift on reveal
- Cards: shadow grows 4px→8px on emphasis

---

## Scene Transitions

- Use `TransitionSeries` with `linearTiming`
- Default overlap: 10 frames (0.33s) — snappy, not lingering
- Primary: `slide({ direction: "from-right" })` for section changes
- Energy bursts: `TransitionFlash` between major sections

---

## Cards & Containers

```tsx
{
  backgroundColor: "#FFFFFF",             // Solid white cards
  borderRadius: 12,                       // 12px — geometric, not bubbly
  border: "2px solid #000000",           // SIGNATURE: 2px solid black
  boxShadow: "4px 4px 0px 0px #000000", // Hard offset shadow
  padding: "24px 20px",
  // Featured card:
  // backgroundColor: "#ffe17c"
  // boxShadow: "8px 8px 0px 0px #000000"
}
```

- Cards: white bg, 2px black border, hard shadow — NO exceptions
- Rounded corners: 12px MAX — keep it geometric
- Featured cards: yellow bg with larger 8px shadow
- Asymmetric corners (testimonials): top-right/bottom-left 3xl, others 2px

---

## Layout (Portrait 1080x1920)

- **Bold, dense layout** — less whitespace than editorial styles
- Padding: `0 40-56px`
- Content stacks: hero → social proof marquee → features → CTA
- 3-column grids with thick black border separators
- Bento-style mixed-size cards for feature sections
- Full-width marquee bars for social proof (charcoal bg, sage text)

---

## Component Preferences

| Component | Compat | Config Override |
|-----------|--------|----------------|
| ConceptOverlay (solid-white) | PRIMARY | bg: #FFFFFF, 2px black border around panel, hard shadow |
| ConceptOverlay (frosted) | LOW | glass/blur clashes with flat hard-shadow aesthetic |
| ConceptOverlay (dark-blur) | MEDIUM | bg: #171e19 solid (no blur), 2px border |
| AppleStylePopup | MEDIUM | needs 2px border + hard shadow override to fit style |
| FloatingKeyword | HIGH | Cabinet Grotesk bold, black text, pill badge style |
| FloatingCard | HIGH | 2px border, 4px hard shadow, white bg |
| KineticText | HIGH | Cabinet Grotesk Extrabold, outline-text variant possible |
| PlatformCascade | HIGH | black logos on yellow, 2px bordered containers |
| StepReveal | HIGH | numbered steps in yellow circles, black connectors |
| PillShowcase | LOW | pill-radius conflicts with 12px geometric corners |
| MasonryGallery | MEDIUM | 2px bordered image cards with hard shadows |
| CardSwapShowcase | HIGH | hard shadow cards with push-button feel, yellow accents |
