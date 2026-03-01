# Style Guide: Kinetic Orange

Digital-first brutalist aesthetic. Heavy typography and motion create urgency and technical sophistication. Three-color system (Orange #FF4D00, Black, White) with thick borders, skewed sections, and continuous marquee animations.

---

## Color Palette

```ts
const C = {
  bg: "#FF4D00",                          // Electric orange — primary background
  bgDark: "#000000",                      // Solid black — dark sections
  white: "#FFFFFF",                       // White — accents on dark backgrounds
  ink: "#000000",                         // Primary text on orange/white
  inkOnDark: "#FFFFFF",                   // Text on black backgrounds
  inkOnDarkMuted: "rgba(255, 255, 255, 0.80)", // Muted text on dark
  accent: "#FF4D00",                      // Orange accent on dark sections
  stroke: "#000000",                      // 2px+ solid black borders
  // Selection highlight
  selectionBg: "#000000",                 // Selected text bg
  selectionText: "#FF4D00",              // Selected text color (orange on black)
  // Navigation pill
  navBg: "#000000",                       // Black pill nav container
  navText: "#FFFFFF",                     // White nav text
  navHoverBg: "#FFFFFF",                 // White bg on hover
  navHoverText: "#000000",              // Black text on hover
};
```

### Color Rules
- ONLY three colors: `#FF4D00`, `#000000`, `#FFFFFF` — no other hues
- Primary sections alternate orange bg and black bg
- Text: black on orange, white on black — maximum contrast always
- Borders: 2px+ solid black — thick and visible
- Orange numbers/accents on dark sections for hierarchy
- Selection state: black bg + orange text
- NO gradients, NO pastels, NO grays — pure 3-color brutalism

---

## Typography

**Fonts:**
- **Archivo Black** — Display text, headlines. Weight: 400 (the only weight — it's already black).
- **Space Mono** — Labels, buttons, metadata, UI. Weight: 400 (Regular), 700 (Bold).
- **Inter** — Body text, descriptions. Weight: 400-500.

**Hierarchy:**

| Role | Font | Weight | Size | Tracking | Leading | Color | Notes |
|------|------|--------|------|----------|---------|-------|-------|
| Hero headline | Archivo Black | 400 | 16vw (massive) | -0.04em | 0.85-0.9 | `ink` (#000) | MUST be uppercase |
| Section headline | Archivo Black | 400 | 7-10vw | -0.04em | 0.85 | `ink` or `white` | MUST be uppercase |
| Marquee text | Archivo Black | 400 | 10vw | -0.02em | 1.0 | `accent` or `white` | Infinite scroll |
| Body text | Inter | 400 | 14-18px | normal | 1.6 | `ink` or `inkOnDark` | |
| Label / tag | Space Mono | 700 | 12px | -0.02em | normal | `ink` | Pill-shaped containers |
| Metadata | Space Mono | 400 | 9-12px | -0.02em | normal | `ink` or `accent` | |
| Navigation | Space Mono | 400 | 12px | normal | normal | `navText` (#FFF) | Inside black pill |
| Index number | Space Mono | 700 | 14-16px | normal | normal | `accent` (#FF4D00) | Leading numbers |

### Typography Rules
- Headlines: ALWAYS `Archivo Black` uppercase — never lowercase, never other weights
- Labels: ALWAYS `Space Mono` for the technical/engineered feel
- Body: `Inter` regular — the only readable font at small sizes
- NEVER use standard sans-serifs (Helvetica, Arial) for headlines
- ALL borders on text containers are sharp — no rounded corners except pill buttons

---

## Illustrations

All illustrations are **typographic and structural** — text, borders, and layout ARE the visual.

### Style Characteristics
- **NO traditional illustrations** — massive typography IS the illustration
- **2px+ black borders** everywhere — dividers, containers, separators
- **Pill-shaped tags** for category labels (rounded-full, black border)
- **Arrow icons** — 45deg rotated, orange on dark backgrounds
- **Skewed sections** at -2deg for dynamic energy
- **Scalable** via `scale` prop

### Illustration Sizing
- Large (hero): Giant Archivo Black text at 16vw
- Medium (service cards): Full-width list items with orange index numbers
- Small (inline): Pill tags, arrow icons, metadata rows

### Component Pattern
```tsx
// Brutalist service card list item
const ServiceItem: React.FC<{ index: number; title: string; tags: string[] }> =
  ({ index, title, tags }) => (
  <div style={{
    width: "100%",
    borderTop: "1px solid rgba(255, 255, 255, 0.20)",
    padding: "24px 0",
    display: "flex",
    alignItems: "center",
    gap: 24,
  }}>
    <span style={{
      fontFamily: "Space Mono",
      fontWeight: 700,
      fontSize: 16,
      color: "#FF4D00",
    }}>
      {String(index).padStart(2, "0")}
    </span>
    <span style={{
      fontFamily: "Archivo Black",
      fontSize: "7vw",
      color: "#FFFFFF",
      textTransform: "uppercase",
      letterSpacing: "-0.04em",
      lineHeight: 0.85,
    }}>
      {title}
    </span>
  </div>
);
```

---

## Special Effects

### Infinite Marquee (Signature Effect)

The defining motion of this style — continuous horizontal text scrolling:

```tsx
// Marquee for Remotion — linear scroll
const Marquee: React.FC<{ text: string; speed?: number; color?: string }> =
  ({ text, speed = 2, color = "#FF4D00" }) => {
  const frame = useCurrentFrame();
  const offset = (frame * speed) % 1000; // Loop position

  return (
    <div style={{
      overflow: "hidden",
      whiteSpace: "nowrap",
      background: "#000000",
      padding: "16px 0",
      borderBottom: "2px solid #000000",
    }}>
      <div style={{
        display: "inline-block",
        transform: `translateX(-${offset}px)`,
        fontFamily: "Archivo Black",
        fontSize: "10vw",
        color,
        textTransform: "uppercase",
        letterSpacing: "-0.02em",
      }}>
        {/* Repeat text 4x for seamless loop */}
        {`${text} • `.repeat(4)}
      </div>
    </div>
  );
};
```

### Rotating Scroll Indicator

Circular SVG with spinning text — decorative hero element:

```tsx
// Rotating circle text indicator
// 144px diameter, Space Mono 9px bold uppercase
// Text on circular SVG path: "Scroll Down • " repeated 3-4x
// Arrow-down icon centered
// Rotation: 360deg / 12s = 1deg per frame at 30fps
const rotation = (frame / 30) * (360 / 12); // 30 degrees per second
// Apply: transform: `rotate(${rotation}deg)`
```

### Skewed Section Divider

Full-width skewed bar between sections:

```tsx
// Skewed divider
const skewedStyle = {
  transform: "skewY(-2deg)",
  transformOrigin: "center",
  background: "#000000",
  padding: "24px 0",
  borderTop: "2px solid #000000",
  borderBottom: "2px solid #000000",
};
```

---

## Background Treatment

### Base
- Orange sections: `C.bg` (#FF4D00) solid
- Dark sections: `C.bgDark` (#000000) solid
- NO textures, NO noise, NO gradients on backgrounds

### Section Transitions
- Hard cut between orange → black → orange
- Skewed (-2deg) divider bars with marquee text
- 2px solid black borders at section boundaries

### NO soft effects
This style is RAW — no blur, no glass, no noise, no grain. Pure flat color + borders.

---

## Animation Springs

Tuned for aggressive, high-energy motion — everything snaps:

- `useSnappy(delay)` — damping: 20, stiffness: 200 (primary for everything)
- `useBouncy(delay)` — damping: 8 (CTA buttons, emphasis reveals)
- Linear motion for marquee text (no spring — constant velocity)

### Entry Animation (Default)
- Text: immediate reveal + translateX(16px) settle on hover
- Cards: slide from edge with snap spring
- Icons: scale(1.1) + rotate(45deg) on reveal (arrows)

### Micro-Interactions
- Service items: translateX(16px) + reveal arrow icon on hover
- Buttons: scale(1.1) on hover, snap back
- Index numbers: color shift to orange on reveal
- Marquee: continuous linear scroll (no spring)

---

## Scene Transitions

- Use `TransitionSeries` with `linearTiming`
- Default overlap: 8 frames (0.27s) — fast, aggressive
- Primary: `slide({ direction: "from-right" })` — aggressive swipe
- Energy bursts: `TransitionFlash` with orange tint between sections
- AVOID: `fade()` — too soft for this brutal style

---

## Cards & Containers

```tsx
{
  backgroundColor: "transparent",           // Cards are transparent list items
  borderTop: "1px solid rgba(255, 255, 255, 0.20)", // Thin top border separator
  padding: "24px 0",
  // No border-radius — sharp edges
  // No box-shadow — flat
  // Featured state: background shifts to rgba(255, 255, 255, 0.05)
}
```

- Service items: full-width list with thin border separators
- Pill tags: rounded-full, small, black border
- CTA buttons: rounded-full, black bg, white text, scale on hover
- NO card containers with shadows — this isn't a card-based layout

---

## Layout (Portrait 1080x1920)

- **Maximum impact** — fill the screen with massive type
- Padding: `0 40-48px`
- Content stacks: hero text → metadata row → marquee → service list → CTA
- Full-width sections with skewed (-2deg) dividers
- Single column for maximum text size
- Metadata rows: 2-3 column flex with Space Mono labels

---

## Component Preferences

| Component | Compat | Config Override |
|-----------|--------|----------------|
| ConceptOverlay (dark-blur) | PRIMARY | bg: #000000 solid (no blur), orange accent elements |
| ConceptOverlay (solid-white) | LOW | white bg too passive for this aggressive style |
| ConceptOverlay (frosted) | LOW | glass/blur effects conflict with raw brutalist aesthetic |
| AppleStylePopup | LOW | premium/Apple feel is wrong for brutalist energy |
| FloatingKeyword | HIGH | Archivo Black uppercase, orange on dark or black on orange |
| FloatingCard | LOW | card-based layout conflicts — use full-width list items instead |
| KineticText | PRIMARY | Archivo Black per-character spring, maximum energy |
| PlatformCascade | HIGH | orange/white logos on black bg |
| StepReveal | MEDIUM | needs brutalist treatment — black borders, orange indicators |
| PillShowcase | LOW | pill-shape too soft — use full-width reveals instead |
| MasonryGallery | LOW | grid layout too refined — use full-width marquee/list instead |
| CardSwapShowcase | MEDIUM | skewed cards with black borders could work |
