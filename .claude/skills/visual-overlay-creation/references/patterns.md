# Visual Overlay Creation — Code Patterns Reference

Complete code patterns for each visual overlay type. Referenced by the main SKILL.md.

---

## 1. SVG Illustration Patterns

### Standard Structure

Every illustration: `React.FC<{ size?: number }>`, default 600, viewBox `0 0 600 600`.

```typescript
import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS } from "../colors";

export const ExampleIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Visual elements here */}
    </svg>
  );
};
```

### Animation Recipes

**Spring entrance (main element):**
```typescript
const mainScale = spring({
  frame, fps: 30,
  from: 0.4, to: 1,
  config: { damping: 12, stiffness: 140 },
});
// Apply: transform={`scale(${mainScale})`}
```

**Staggered reveals (secondary elements):**
```typescript
const items = [0, 8, 14, 20]; // frame offsets
items.map((delay, i) => {
  const opacity = spring({
    frame: Math.max(0, frame - delay), fps: 30,
    from: 0, to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  // Apply: opacity={opacity}
});
```

**Pulsing glow:**
```typescript
const pulse = interpolate(frame % 30, [0, 15, 30], [0.15, 0.35, 0.15], {
  extrapolateRight: "clamp",
});
// Apply: opacity={pulse} on a colored circle behind the main element
```

**Counter (count-up animation):**
```typescript
const count = Math.floor(interpolate(frame, [0, 40], [0, targetNumber], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
}));
// Display: <text>{count.toLocaleString()}</text>
```

**Stroke draw (path reveal):**
```typescript
const pathLength = 400; // measure your path
const drawProgress = interpolate(frame, [0, 30], [pathLength, 0], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
// Apply: strokeDasharray={pathLength} strokeDashoffset={drawProgress}
```

**Width/bar grow:**
```typescript
const barWidth = interpolate(frame, [5, 25], [0, targetWidth], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
// Apply: width={barWidth}
```

**Label fade-in (delayed):**
```typescript
const labelOpacity = spring({
  frame: Math.max(0, frame - 12), fps: 30,
  from: 0, to: 1,
  config: { damping: 16, stiffness: 100 },
});
```

### Color Usage

Always import COLORS:
```typescript
import { COLORS } from "../colors";

// Primary shapes: fill={COLORS.primary} (#FF6B00)
// Secondary: fill={COLORS.secondary} (#FF9500)
// Accent: fill={COLORS.accent} (#FFB800)
// Strokes: stroke={COLORS.dark} (#0D0D0D) or "#1A1A1A"
// Background fills: COLORS.offWhite (#F5F5F5), COLORS.white
// Text: fill="#1A1A1A" (dark), fill="#888" (secondary)
// Success: fill={COLORS.success} (#00CC66)
// Error: fill={COLORS.error} (#FF4444)
```

---

## 2. Logo Display Patterns

### Simple Logo (in ConceptOverlay illustration slot)

```typescript
const BrandLogo: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const logoScale = spring({
    frame, fps: 30, from: 0.7, to: 1,
    config: { damping: 12, stiffness: 80 },
  });
  return (
    <div style={{
      width: size, height: size,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ transform: `scale(${logoScale})` }}>
        <Img src={staticFile("logos/brand.svg")}
          style={{ height: size * 0.4, objectFit: "contain" }} />
      </div>
    </div>
  );
};
```

### Logo in Frosted Glass Card

```typescript
const LogoCard: React.FC<{ logoSrc: string; size?: number }> = ({ logoSrc, size = 600 }) => (
  <div style={{
    width: 340, height: 340, borderRadius: 40,
    backgroundColor: "#F5F5F5",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  }}>
    <Img src={staticFile(logoSrc)} style={{ width: 200, height: 200, objectFit: "contain" }} />
  </div>
);
```

### Real Image in SVG (foreignObject)

For mixing real images with SVG graphics:
```typescript
<svg width={size} height={size} viewBox="0 0 600 600" fill="none">
  {/* SVG graphics */}
  <circle cx="300" cy="200" r="80" fill={COLORS.offWhite} stroke={COLORS.dark} strokeWidth={3} />

  {/* Real image via foreignObject */}
  <foreignObject x="220" y="120" width="160" height="160">
    <div style={{ width: 160, height: 160, borderRadius: "50%", overflow: "hidden" }}>
      <Img src={staticFile("headshots/person.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  </foreignObject>
</svg>
```

### Brand Asset Library (Quick Reference)

```
public/logos/
├── claude-code-terminal.webp    # Claude Code (dark terminal, ASCII)
├── claude-ai-icon.svg           # Claude AI (starburst)
├── claude-ai-wordmark.png       # Claude AI (starburst + serif text)
├── github-mark.svg              # GitHub octocat
├── infinitx-logo.png            # INFINITX (root public/)
├── x.svg                        # X/Twitter
├── instagram.svg                # Instagram
├── linkedin.svg                 # LinkedIn
├── tiktok.svg                   # TikTok
├── bluesky.svg                  # Bluesky
├── facebook.svg                 # Facebook
├── youtube.svg                  # YouTube
├── pinterest.svg                # Pinterest
├── threads.svg                  # Threads
├── googlebusiness.svg           # Google Business
├── telegram.svg                 # Telegram
├── snapchat.svg                 # Snapchat
└── reddit.svg                   # Reddit
```

---

## 3. Platform Grid Patterns

### PlatformCascade (Group Reveal)

When platforms are named as a group:
```typescript
<PlatformCascade
  platforms={["youtube", "instagram", "tiktok", "threads", "linkedin",
    "bluesky", "facebook", "pinterest", "googlebusiness",
    "telegram", "snapchat", "reddit", "x"]}
  logoSize={100}                  // Never below 100
  position="center"
  staggerFrames={3}
/>
```

### IndividualPlatformPopups (Sequential Pop)

When platforms are named one-by-one in speech:
```typescript
const IndividualPlatformPopups: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const PLATFORMS = [
    { name: "YouTube",   logo: "logos/youtube.svg",   internalFrame: 0 },
    { name: "Instagram", logo: "logos/instagram.svg", internalFrame: 22 },
    { name: "TikTok",    logo: "logos/tiktok.svg",    internalFrame: 41 },
    // ... match internalFrame to WORDS data offsets from startFrame
  ];

  return (
    <div style={{
      position: "absolute", top: "35%",
      width: "100%", display: "flex", justifyContent: "center", gap: 16,
      zIndex: 22,
    }}>
      {PLATFORMS.map((p, i) => {
        const localFrame = frame - startFrame;
        const show = localFrame >= p.internalFrame;
        const scale = show ? spring({
          frame: localFrame - p.internalFrame, fps: 30,
          from: 0.3, to: 1,
          config: { damping: 12, stiffness: 180 },
        }) : 0;

        return (
          <div key={p.name} style={{
            width: 150, height: 150, borderRadius: 20,
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: `scale(${scale})`, opacity: scale,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}>
            <Img src={staticFile(p.logo)} style={{ width: 72, height: 72 }} />
          </div>
        );
      })}
    </div>
  );
};
```

---

## 4. Motion Graphic Patterns

### Animated Counter

```typescript
const AnimatedCounter: React.FC<{ target: number; prefix?: string; suffix?: string }> = ({
  target, prefix = "", suffix = "",
}) => {
  const frame = useCurrentFrame();
  const count = Math.floor(interpolate(frame, [0, 40], [0, target], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  }));

  return (
    <div style={{
      fontSize: 96, fontWeight: 900, fontFamily: "Inter, sans-serif",
      color: COLORS.primary, textAlign: "center",
    }}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
};
```

### Progress Bar

```typescript
const ProgressBar: React.FC<{ percentage: number; label: string }> = ({ percentage, label }) => {
  const frame = useCurrentFrame();
  const width = interpolate(frame, [5, 30], [0, percentage], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: 400 }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>
        {label}
      </div>
      <div style={{
        width: "100%", height: 24, borderRadius: 12,
        backgroundColor: COLORS.offWhite, overflow: "hidden",
      }}>
        <div style={{
          width: `${width}%`, height: "100%", borderRadius: 12,
          backgroundColor: COLORS.primary,
        }} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.primary, marginTop: 4 }}>
        {Math.round(width)}%
      </div>
    </div>
  );
};
```

---

## 5. ConceptOverlay Integration

### Standard Usage

```typescript
// In CONCEPT_OVERLAYS array:
{
  frame: 175,             // From WORDS data — exact frame keyword is spoken
  duration: 100,          // See duration guide in SKILL.md
  illustration: <ConceptNameIllustration />,
  caption: "CONCEPT",     // 1-3 words, ALL CAPS (optional for V4)
  subtitle: "Brief explanation", // Optional
  illustrationSize: 600,  // 580-650 standard
  entrance: "clip-circle", // or "wipe-right", "fade-blur"
  backgroundStyle: "solid-white", // default for concepts
}

// Rendered as:
<Sequence from={overlay.frame} durationInFrames={overlay.duration} premountFor={fps}>
  <ConceptOverlay
    durationInFrames={overlay.duration}
    illustration={overlay.illustration}
    caption={overlay.caption}
    subtitle={overlay.subtitle}
    illustrationSize={overlay.illustrationSize}
    entrance={overlay.entrance || "clip-circle"}
    backgroundStyle={overlay.backgroundStyle || "solid-white"}
  />
</Sequence>
```

### SFX Pairing (J-Cut)

```typescript
// SFX hits 3-5 frames BEFORE visual:
{
  frame: overlay.frame - 3,  // J-cut: audio before visual
  src: "audio/whoosh-effect-382717.mp3",
  volume: 0.16,
}
```

### CONCEPT_RANGES (Hide Captions)

```typescript
const CONCEPT_RANGES = CONCEPT_OVERLAYS.map(o => ({
  start: o.frame,
  end: o.frame + o.duration,
}));
// Use to hide word captions during overlay display
```

---

## 6. Gold Standard Examples

Study these compositions for reference:

| Composition | Type | Key Patterns |
|-------------|------|-------------|
| `CraftingOutreachCampaign.tsx` | Long-form (28min) | 35+ overlays, mixed placements, split illustration files |
| `Clip6VoiceControlDemoV3.tsx` | Short-form standalone | V3.2 template, ConceptOverlay + PlatformCascade |
| `Clip1FromZeroTo90K.tsx` | Pipeline clip | Success story, 9 overlays, ConceptOverlay-first |
| `Clip2StopManuallyPosting.tsx` | Pipeline clip | 15 overlays + IndividualPlatformPopups |
| `ClaudeOpus46Announcement.tsx` | Announcement | AppleStylePopup, word-by-word captions |

### Key Illustration Files

| File | Pattern |
|------|---------|
| `VoicePromptClean.tsx` | Clean vector with spring + staggered waves + pulse glow |
| `ShortFormVideoIllustration.tsx` | Phone mockup with content |
| `SkillsIllustration.tsx` | Gear/document concept |
| `ThirteenPlatformsV2.tsx` | Platform grid with real logos |
| `CraftingOutreachIntro.tsx` | Section-split illustrations for parallel dev |
