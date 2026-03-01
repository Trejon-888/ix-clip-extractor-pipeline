# Component Catalog

Searchable catalog of all visual components available for video editing. Each entry uses a semantic card format so the AI can match components to editing moments by description.

During editing (Phase 1.5 — Scene Planning), use the Decision Tree to narrow options, then scan semantic cards to find the best match for each scene based on GOOD FOR + STYLE COMPAT.

---

## Decision Tree

```
What type of editing moment is this?

A-TIER HERO MOMENT (full-screen takeover, viewer's full attention)?
  ├─ Tutorial / walkthrough / explainer → ConceptOverlay (solid-white)
  ├─ Premium / Apple feel / announcement → AppleStylePopup
  ├─ Dark / editorial / dramatic → ConceptOverlay (dark-blur)
  └─ Multi-step process / "here's how" → StepReveal (SuperDesign)

B-TIER SUPPORTING (speaker stays visible, punctuation not paragraph)?
  ├─ Talking-head, keyword emphasis → FloatingKeyword (text-only = light)
  ├─ Brand reveal with logo → FloatingKeyword (icon prop = medium)
  ├─ Crystal box visual → FloatingKeyword (customVisual = medium)
  ├─ Card with icon + label → FloatingCard
  ├─ Product showcase / image reveal → PillShowcase (SuperDesign)
  ├─ Portfolio / gallery grid reveal → MasonryGallery (SuperDesign)
  └─ Feature/testimonial card cycling → CardSwapShowcase (SuperDesign)

STRUCTURAL (captions, badges, transitions)?
  ├─ Word-by-word captions (pipeline) → CleanWordCaption
  ├─ Word-by-word captions (long-form) → FullWidthCaption
  ├─ Phrase captions (standalone) → PhraseCaption
  ├─ Section markers → CornerSectionBadge
  ├─ Scene transitions → TransitionFlash
  └─ Platform logo grid → PlatformCascade
```

---

## Existing Remotion Components

```
---
NAME: ConceptOverlay
DOES: Full-screen takeover with background (frosted/solid/dark), centered illustration with spring entrance, optional caption below. Circle-clip or wipe reveal.
GOOD FOR: A-tier hero moments — core thesis, transformation reveal, main CTA, architecture diagrams, process breakdowns
ENERGY: medium-high
VARIANTS: solid-white (tutorials, light styles), frosted (analysis, versatile), dark-blur (editorial, dark styles)
ENTRANCES: clip-circle (default), wipe-right, fade-blur
STYLE COMPAT: Default=PRIMARY, Freehand=HIGH(solid-white), Stippled=PRIMARY(dark-blur), High-Contrast=HIGH(dark-blur)
PROPS: durationInFrames, illustration (ReactNode), caption?, illustrationSize (800 no-text, 700 with-text, 620 CTA), entrance, backgroundStyle
FILE: remotion/components/ConceptOverlay.tsx
---

---
NAME: AppleStylePopup
DOES: Premium white popup with spring scale-up (0.6→1.0), accent line grows from center, caption slides up from below. Clean, Apple-keynote feel.
GOOD FOR: A-tier premium moments — product reveals, key announcements, hero features, polished brand moments
ENERGY: medium
STYLE COMPAT: Default=PRIMARY, Freehand=HIGH, Stippled=LOW, High-Contrast=LOW
PROPS: durationInFrames, illustration (ReactNode), caption?, subtitle?, illustrationSize, accentColor
FILE: remotion/components/AppleStylePopup.tsx
---

---
NAME: FloatingKeyword
DOES: Bold text + optional visual floating directly on video. Speaker stays fully visible. Positioned left/right at 5% from edges. Spring pop-in (0.7→1.0).
GOOD FOR: B-tier supporting — brand names, tool mentions, emotional beats, keyword emphasis, concept labels
ENERGY: medium-high
VARIANTS: text-only (light weight), crystal-box with customVisual (medium), icon+text, visualOnly (icon-only)
STYLE COMPAT: all styles HIGH
PROPS: text, side ("left"/"right"), icon?, visual?, customVisual?, fontSize?, topPercent?, visualOnly?
FILE: remotion/components/FloatingKeyword.tsx
---

---
NAME: FloatingCard
DOES: Corner-anchored card with icon, caption, optional subtitle. Slides in from edge (80px). Speaker stays visible.
GOOD FOR: B-tier supporting details — stats with labels, feature callouts, quick info cards, secondary data points
ENERGY: medium
STYLE COMPAT: Default=HIGH, Freehand=HIGH, Stippled=MEDIUM(needs dark variant), High-Contrast=MEDIUM
PROPS: durationInFrames, icon?, caption, subtitle?, position ("top-left"/"top-right"/"bottom-left"/"bottom-right")
FILE: remotion/components/FloatingCard.tsx
---

---
NAME: PlatformCascade
DOES: Progressive grid reveal of platform logos, each logo springs in with staggered timing
GOOD FOR: "Post to all platforms" moments, multi-platform reveals, social media distribution
ENERGY: medium
STYLE COMPAT: all styles HIGH
PROPS: platforms (array of logo paths), staggerDelay
FILE: remotion/components/PlatformCascade.tsx
---

---
NAME: KineticText
DOES: Per-character spring animation, each letter springs up individually with stagger delay
GOOD FOR: Hype words ONLY — "SUBSCRIBE", "FREE", power words that need maximum emphasis
ENERGY: high
STYLE COMPAT: Default=MEDIUM, Freehand=LOW(too aggressive), Stippled=HIGH, High-Contrast=HIGH
PROPS: text, entranceMode ("spring-up"/"spring-scale"/"fade-blur"), staggerDelay (default 2f)
FILE: remotion/components/KineticText.tsx
---

---
NAME: AnnotationBadge
DOES: Glassmorphic label pill with slide-in from edge, small and non-intrusive
GOOD FOR: Metadata labels, category tags, "PRO TIP" markers, small contextual info
ENERGY: low
STYLE COMPAT: all styles
PROPS: label, slideDirection
FILE: remotion/components/AnnotationBadge.tsx
---

---
NAME: CornerSectionBadge
DOES: Top-left section marker with label and optional subtitle, persistent during section
GOOD FOR: Section markers in long-form videos — "INTRO", "STEP 2", "RESULTS"
ENERGY: low
STYLE COMPAT: all styles
PROPS: label, subtitle?
FILE: remotion/components/CornerSectionBadge.tsx
---

---
NAME: TransitionFlash
DOES: Quick white flash transition (8 frames), marks scene boundaries
GOOD FOR: Hook bursts, scene transitions, energy spikes between segments
ENERGY: high
STYLE COMPAT: Default=HIGH, Freehand=MEDIUM, Stippled=HIGH, High-Contrast=HIGH
FILE: remotion/components/TransitionFlash.tsx
---
```

### Caption Components

```
---
NAME: CleanWordCaption
DOES: Single word displayed per frame, bold white text with shadow, positioned at bottom
GOOD FOR: Pipeline clip word-by-word captions at bottom: "28%"
ENERGY: low
FILE: remotion/components/CleanWordCaption.tsx
---

---
NAME: FullWidthCaption
DOES: Full-width word-by-word captions, 72px Extra Bold uppercase, centered at bottom
GOOD FOR: Long-form and announcement word-by-word captions, emphasis-aware styling
ENERGY: low
FILE: remotion/components/FullWidthCaption.tsx
---

---
NAME: PhraseCaption
DOES: Auto-chunks transcript into 3-5 word phrases, displays phrase at a time
GOOD FOR: Standalone short-form clips, natural reading rhythm
ENERGY: low
FILE: remotion/components/PhraseCaption.tsx
---
```

---

## SuperDesign Components

Components adapted from SuperDesign.dev intake. These are implemented as patterns using existing Remotion components, not separate TSX files.

```
---
NAME: StepReveal
DOES: Animated multi-step sequence with numbered circle indicators, progress connector lines that fill on completion, and spring-animated slide transitions between step content
GOOD FOR: Explaining multi-step processes, setup guides, "here's how it works" moments, onboarding flows, tutorial walkthroughs, methodology breakdowns
ENERGY: medium
STYLE COMPAT: all styles (adapts indicator colors to style palette)
INTEGRATES AS: Sequence of ConceptOverlay or FloatingCard frames. Each step gets its own Sequence with:
  - Step indicator SVG (numbered circles connected by lines, filled circles for completed steps)
  - Content area with slide-spring-30 entrance animation
  - Progress connector animates fill using interpolate on scaleX
  - Total duration: ~90-120 frames per step (3-4 seconds per step)
ENTRANCE: slide-spring-30 (damping 30, stiffness 300)
SOURCE: SuperDesign AnimatedStepper
---

---
NAME: PillShowcase
DOES: High-aspect-ratio rounded container (border-radius: 9999px) with image that scales on hover/reveal. Circular overlay appears with secondary text. Grayscale-to-color transition.
GOOD FOR: Product showcases, portfolio pieces, image reveals, editorial photography moments, premium visual displays
ENERGY: high
STYLE COMPAT: high-contrast-editorial (primary), stippled-editorial (high)
INTEGRATES AS: ConceptOverlay with custom illustration containing:
  - Pill-shaped clip container (height: 500px equivalent, full border-radius)
  - Image with grayscale filter that transitions to color via interpolate
  - Scale transform 1.0→1.05 during display
  - Circular overlay fades in mid-display with secondary text
ENTRANCE: clip-path-inset or spring-scale
SOURCE: SuperDesign High-Contrast Editorial
---

---
NAME: MasonryGallery
DOES: Responsive masonry grid layout with GSAP-powered directional entrance animations (bottom/top/left/right/center/random). Blur-to-focus cinematic reveal, staggered item entry, hover scale interactions. Automatic column calculation based on container width.
GOOD FOR: Portfolio showcases, image gallery reveals, multi-project displays, visual proof grids, before/after collections, screenshot galleries, client work showcases
ENERGY: medium-high
STYLE COMPAT: minimalist-beta-capture (primary — blur-to-focus on obsidian), high-contrast-editorial (high), stippled-editorial (high), lumina-neo-brutalist (medium — needs 2px borders)
INTEGRATES AS: ConceptOverlay with custom illustration containing:
  - Masonry grid using absolute positioning (calculated column heights)
  - Column count: 2-3 columns in portrait 1080px (responsive breakpoints)
  - Gap: 24px between items
  - Each item: rounded-xl container with background-image
  - Entrance: items animate from specified direction to final position
  - Blur-to-focus: filter blur(20px)→blur(0px) over ~36 frames (1.2s)
  - Stagger: 0.05-0.1s delay between consecutive items
  - Spring config: power3.out equivalent (damping: 14, stiffness: 80)
  - Title overlay: gradient from-black/60 at bottom with white text
ENTRANCE: directional-spring (configurable from any edge) + blur-to-focus
SOURCE: SuperDesign MasonryGallery
---

---
NAME: CardSwapShowcase
DOES: Automated perspective card cycling with depth perception. Cards stack with horizontal/vertical offset and z-depth. Front card drops away, remaining cards shift forward with elastic spring, dropped card re-enters at back. Skew transform for 3D feel.
GOOD FOR: Feature showcases, testimonial rotations, product comparisons, service highlights, portfolio item cycling, before/after sequences
ENERGY: medium-high
STYLE COMPAT: lumina-neo-brutalist (high — hard shadow cards), minimalist-beta-capture (high — glass panel cards), high-contrast-editorial (medium), freehand-illustrated (medium)
INTEGRATES AS: ConceptOverlay with custom illustration containing:
  - N cards (3-5) stacked with offset: x += cardDistance, y -= verticalDistance per slot
  - z-depth: z -= cardDistance * 1.5 per slot (perspective effect)
  - Skew: skewY(4-6deg) on all cards
  - Swap cycle every ~120 frames (4s):
    Phase 1: front card drops (translateY += 500, ~36 frames)
    Phase 2: remaining cards spring to new slots (overlapping start)
    Phase 3: dropped card returns to back position
  - Spring: elastic.out(0.6, 0.9) for playful, power1.inOut for premium
  - Card content: image with gradient overlay + text at bottom
  - Easing variants: elastic (bouncy, energetic) or linear (smooth, premium)
ENTRANCE: cards appear with initial skew + stagger-reveal
SOURCE: SuperDesign CardSwapShowcase
---
```

---

## Style Compatibility Matrix

Quick reference: which components work with which styles.

| Component | Default (Orange) | Freehand | Stippled Editorial | High-Contrast Editorial | Minimalist Beta Capture | Lumina Neo-Brutalist | Kinetic Orange |
|-----------|-----------------|----------|-------------------|------------------------|------------------------|---------------------|---------------|
| ConceptOverlay (solid-white) | PRIMARY | HIGH | LOW | LOW | LOW | PRIMARY | LOW |
| ConceptOverlay (frosted) | MEDIUM | HIGH | MEDIUM | MEDIUM | HIGH | LOW | LOW |
| ConceptOverlay (dark-blur) | MEDIUM | LOW | PRIMARY | PRIMARY | PRIMARY | MEDIUM | PRIMARY |
| AppleStylePopup | PRIMARY | HIGH | LOW | LOW | LOW | MEDIUM | LOW |
| FloatingKeyword | HIGH | HIGH | HIGH | HIGH | HIGH | HIGH | HIGH |
| FloatingCard | HIGH | HIGH | MEDIUM | MEDIUM | MEDIUM | HIGH | LOW |
| KineticText | MEDIUM | LOW | HIGH | HIGH | MEDIUM | HIGH | PRIMARY |
| PlatformCascade | HIGH | HIGH | HIGH | HIGH | HIGH | HIGH | HIGH |
| StepReveal | HIGH | HIGH | HIGH | HIGH | HIGH | HIGH | MEDIUM |
| PillShowcase | MEDIUM | LOW | HIGH | PRIMARY | HIGH | LOW | LOW |
| MasonryGallery | MEDIUM | MEDIUM | HIGH | HIGH | PRIMARY | MEDIUM | LOW |
| CardSwapShowcase | MEDIUM | MEDIUM | MEDIUM | MEDIUM | HIGH | HIGH | MEDIUM |
