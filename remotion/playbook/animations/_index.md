# Animation Catalog

Searchable catalog of all animation patterns. Each entry uses a semantic card format so the AI can match animations to editing moments by description, not by code search.

During editing (Phase 1.5 — Scene Planning), scan this catalog to find the right animation for each scene based on GOOD FOR + ENERGY + STYLE COMPAT.

---

## 1. Spring Presets

Base physics configurations. These drive the feel of all motion.

```
---
NAME: useSmooth
CONFIG: damping: 200
ENERGY: low
DOES: Smooth entrance with no bounce, gradual deceleration into final position
GOOD FOR: Text reveals, subtitle fades, background element transitions, gentle introductions
STYLE COMPAT: freehand-illustrated (preferred), all styles
REMOTION CODE:
  const smooth = spring({ frame, fps: 30, delay, config: { damping: 200 } });
---

---
NAME: useSnappy
CONFIG: damping: 20, stiffness: 200
ENERGY: medium
DOES: Quick snap into place with minimal overshoot, feels precise and intentional
GOOD FOR: Cards, list items, UI elements, step indicators, badges, data reveals
STYLE COMPAT: all styles
REMOTION CODE:
  const snappy = spring({ frame, fps: 30, delay, config: { damping: 20, stiffness: 200 } });
---

---
NAME: useBouncy
CONFIG: damping: 8
ENERGY: high
DOES: Playful bounce with visible overshoot and settle, energetic and attention-grabbing
GOOD FOR: Hero illustrations, CTA buttons, emphasis moments, celebration reveals
STYLE COMPAT: stippled-editorial (preferred), high-contrast-editorial
REMOTION CODE:
  const bouncy = spring({ frame, fps: 30, delay, config: { damping: 8 } });
---

---
NAME: standard-spring
CONFIG: damping: 12-14, stiffness: 100-140
ENERGY: medium
DOES: Balanced spring with subtle bounce, the default Remotion feel
GOOD FOR: General purpose — illustrations, overlays, most pop-outs
STYLE COMPAT: default INFINITX orange (preferred), all styles
REMOTION CODE:
  const s = spring({ frame, fps: 30, config: { damping: 14, stiffness: 120 } });
---
```

---

## 2. Entrance Patterns

How elements appear on screen. Each card includes the Remotion implementation.

```
---
NAME: clip-circle
DOES: Expanding circle clip-path reveal from center, content appears to grow outward from a point
GOOD FOR: Full-screen overlay reveals, concept introductions, dramatic moments
ENERGY: medium
COMPONENT: ConceptOverlay (entrance="clip-circle")
STYLE COMPAT: default (preferred), stippled-editorial, all styles
REMOTION CODE:
  // Built into ConceptOverlay — just set entrance="clip-circle"
  clipPath: `circle(${interpolate(frame, [0, 12], [0, 150], { extrapolateRight: "clamp" })}% at 50% 50%)`
---

---
NAME: wipe-right
DOES: Horizontal wipe from left to right, content sweeps in like turning a page
GOOD FOR: Section transitions, editorial reveals, narrative progression
ENERGY: medium
COMPONENT: ConceptOverlay (entrance="wipe-right")
STYLE COMPAT: freehand-illustrated (preferred), all styles
REMOTION CODE:
  // Built into ConceptOverlay — just set entrance="wipe-right"
  clipPath: `inset(0 ${100 - interpolate(frame, [0, 15], [0, 100], { extrapolateRight: "clamp" })}% 0 0)`
---

---
NAME: fade-blur
DOES: Fade in with increasing sharpness, starts blurred and resolves into clarity
GOOD FOR: Subtle reveals, background transitions, calm introductions, soft moments
ENERGY: low
COMPONENT: ConceptOverlay (entrance="fade-blur")
STYLE COMPAT: freehand-illustrated (preferred)
REMOTION CODE:
  // Built into ConceptOverlay — just set entrance="fade-blur"
  opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" })
  filter: `blur(${interpolate(frame, [0, 15], [20, 0], { extrapolateRight: "clamp" })}px)`
---

---
NAME: spring-scale
DOES: Element scales up from 60% to 100% with spring physics, premium pop-in feel
GOOD FOR: Premium popup reveals, illustration entrances, Apple-style moments
ENERGY: medium
COMPONENT: AppleStylePopup
STYLE COMPAT: default (preferred), freehand-illustrated
REMOTION CODE:
  const scale = spring({ frame, fps: 30, from: 0.6, to: 1, config: { damping: 14, stiffness: 120 } });
  transform: `scale(${scale})`
---

---
NAME: slide-in-edge
DOES: Element slides in from screen edge (left/right) with spring deceleration
GOOD FOR: Supporting cards, floating info panels, side reveals
ENERGY: medium
COMPONENT: FloatingCard
STYLE COMPAT: all styles
REMOTION CODE:
  const slide = spring({ frame, fps: 30, config: { damping: 20, stiffness: 200 } });
  const x = interpolate(slide, [0, 1], [80, 0]);
  transform: `translateX(${position.includes("right") ? x : -x}px)`
---

---
NAME: pop-scale
DOES: Quick scale from 70% to 100% with spring physics, punchy and immediate
GOOD FOR: Keywords, brand names, floating text, emphasis words
ENERGY: high
COMPONENT: FloatingKeyword
STYLE COMPAT: all styles, stippled-editorial (preferred for high energy)
REMOTION CODE:
  const pop = spring({ frame, fps: 30, from: 0.7, to: 1, config: { damping: 12, stiffness: 160 } });
  transform: `scale(${pop})`
---

---
NAME: slide-spring-30
DOES: Content slides horizontally with tight spring (stiffness 300, damping 30), fading in over 6 frames
GOOD FOR: Step transitions, card sequences, content swaps, wizard-style reveals
ENERGY: medium
STYLE COMPAT: all styles
SOURCE: SuperDesign AnimatedStepper
REMOTION CODE:
  const slide = spring({ frame, fps: 30, config: { damping: 30, stiffness: 300 } });
  const x = interpolate(slide, [0, 1], [direction * 20, 0]);
  const opacity = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });
---

---
NAME: clip-path-inset
DOES: Content reveals via shrinking CSS clip-path inset, like a curtain opening from all edges
GOOD FOR: Image reveals, showcase moments, dramatic unveils, product shots
ENERGY: high
STYLE COMPAT: high-contrast-editorial (preferred), stippled-editorial
SOURCE: SuperDesign High-Contrast Editorial
REMOTION CODE:
  const reveal = spring({ frame, fps: 30, config: { damping: 20, stiffness: 120 } });
  const inset = interpolate(reveal, [0, 1], [100, 0]);
  clipPath: `inset(${inset}%)`
  // Use with 700ms equivalent: ~21 frames at 30fps
---

---
NAME: echo-stack-reveal
DOES: Hero text with 4-5 background layers, each offset and fading from gray to lighter gray, layers stagger in
GOOD FOR: Hero headlines, section openers, brand statements, dramatic text reveals
ENERGY: high
STYLE COMPAT: high-contrast-editorial (primary)
SOURCE: SuperDesign High-Contrast Editorial
REMOTION CODE:
  // Layer 1 (foreground): color #111111, position baseline
  // Layer 2: color #bfbfbf, offset translateX(-0.04em) translateY(-0.04em), delay 3f
  // Layer 3: color #c9c9c9, offset -0.08em, delay 6f
  // Layer 4: color #d1d1d1, offset -0.12em, delay 9f
  // Layer 5: color #d9d9d9, offset -0.16em, delay 12f
  // Each layer: opacity springs from 0→1 with stagger
  const layerOpacity = (delay: number) =>
    spring({ frame: Math.max(0, frame - delay), fps: 30, config: { damping: 20, stiffness: 200 } });
---

---
NAME: slide-up-cubic
DOES: Smooth upward slide with deceleration, element rises from 60px below with opacity fade. Equivalent to cubic-bezier(0.16, 1, 0.3, 1) at 0.8s
GOOD FOR: Premium dark-theme reveals, glass panel entrances, editorial text introductions, obsidian-style hero moments
ENERGY: low-medium
STYLE COMPAT: minimalist-beta-capture (preferred), high-contrast-editorial
SOURCE: SuperDesign Minimalist Beta Capture
REMOTION CODE:
  const slideUp = spring({ frame, fps: 30, config: { damping: 25, stiffness: 100 } });
  const y = interpolate(slideUp, [0, 1], [60, 0]);
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  // Apply: transform: `translateY(${y}px)`, opacity
  // Duration: ~24 frames (0.8s at 30fps)
---

---
NAME: push-press
DOES: Element translates diagonally toward its shadow to simulate physical button press, shadow shrinks simultaneously. Snappy cubic-bezier bounce
GOOD FOR: CTA button reveals, interactive element emphasis, neo-brutalist button animations, purchase moments
ENERGY: high
STYLE COMPAT: lumina-neo-brutalist (preferred), kinetic-orange
SOURCE: SuperDesign Lumina Neo-Brutalist
REMOTION CODE:
  // Rest state: boxShadow 8px 8px 0px 0px #000, transform: translate(0, 0)
  // Pressed state: boxShadow 0px 0px 0px 0px #000, transform: translate(8px, 8px)
  const press = spring({ frame, fps: 30, config: { damping: 14, stiffness: 180 } });
  const shift = interpolate(press, [0, 0.5, 1], [0, 8, 0]); // Press then release
  const shadow = interpolate(press, [0, 0.5, 1], [8, 0, 8]);
  // Apply: transform: `translate(${shift}px, ${shift}px)`, boxShadow: `${shadow}px ${shadow}px 0px 0px #000`
---

---
NAME: infinite-marquee
DOES: Continuous horizontal text scroll at constant linear speed, seamless loop with repeated text. No spring physics — pure linear motion
GOOD FOR: Social proof bars, brand name scrolls, section dividers, hype text, service marquees
ENERGY: medium
STYLE COMPAT: kinetic-orange (preferred), lumina-neo-brutalist
SOURCE: SuperDesign Kinetic Orange
REMOTION CODE:
  // Linear continuous scroll — NOT spring-based
  const speed = 2; // pixels per frame
  const offset = (frame * speed) % totalTextWidth;
  // Apply: transform: `translateX(-${offset}px)`
  // Text must repeat 3-4x for seamless loop
  // Wrap in overflow:hidden container
  // Reverse direction: use positive offset for Row 2
---

---
NAME: skew-section
DOES: Full-width container with -2deg skew transform, creates dynamic angular energy between vertical sections
GOOD FOR: Section dividers, marquee containers, full-width accent bars, editorial transitions
ENERGY: medium
STYLE COMPAT: kinetic-orange (preferred), lumina-neo-brutalist
SOURCE: SuperDesign Kinetic Orange
REMOTION CODE:
  // Static transform — applied to container, not animated per-frame
  const skewStyle = {
    transform: "skewY(-2deg)",
    transformOrigin: "center",
  };
  // Content inside should counter-skew if text needs to be straight:
  // transform: "skewY(2deg)"
---

---
NAME: spin-indicator
DOES: Continuous clockwise rotation of circular SVG text element, 360 degrees over 12 seconds. Arrow icon stays centered and static
GOOD FOR: Scroll indicators, decorative hero elements, loading states, ambient circular motion
ENERGY: low
STYLE COMPAT: kinetic-orange (preferred), high-contrast-editorial
SOURCE: SuperDesign Kinetic Orange
REMOTION CODE:
  // Continuous rotation: 30 degrees per second at 30fps = 1 degree per frame
  const rotation = frame; // 1 degree per frame
  // Apply to SVG container: transform: `rotate(${rotation}deg)`
  // SVG: 144px circle, textPath with "Scroll Down • " repeated 3-4x
  // Font: Space Mono 9px bold uppercase
  // Center: static arrow-down icon (Lucide)
---
```

---

## 3. Exit Patterns

How elements disappear. Keep exits simpler than entrances.

```
---
NAME: fade-12f
DOES: Simple opacity fade to 0 over 12 frames (0.4 seconds)
GOOD FOR: All pop-out exits — the default, clean and non-distracting
ENERGY: low
REMOTION CODE:
  const opacity = interpolate(frame, [duration - 12, duration], [1, 0], { extrapolateLeft: "clamp" });
---

---
NAME: scale-down-fade
DOES: Scale shrinks to 80% while fading out over 10 frames
GOOD FOR: Illustration exits, when you want the exit to feel like the element is receding
ENERGY: medium
REMOTION CODE:
  const exit = interpolate(frame, [duration - 10, duration], [0, 1], { extrapolateLeft: "clamp" });
  transform: `scale(${1 - exit * 0.2})`
  opacity: 1 - exit
---
```

---

## 4. Continuous Effects

Ongoing animations that play during the element's display duration.

```
---
NAME: float
DOES: Subtle vertical bobbing motion using sine wave, element gently hovers
GOOD FOR: Hero illustrations, background decorative elements, idle state
ENERGY: low
STYLE COMPAT: freehand-illustrated (gentle: N=16, amp=4), all styles
REMOTION CODE:
  const float = Math.sin(frame / N) * amplitude;
  // N = 12-20 (lower = faster), amplitude = 4-8px
  transform: `translateY(${float}px)`
---

---
NAME: pulse-glow
DOES: Continuous subtle scaling/opacity pulse, draws attention without being distracting
GOOD FOR: CTA buttons, active state indicators, emphasis highlights
ENERGY: medium
STYLE COMPAT: stippled-editorial (preferred), high-contrast-editorial
REMOTION CODE:
  const glow = 0.3 + Math.sin(frame / 8) * 0.15;
  boxShadow: `0 8px 40px rgba(accent, ${glow})`
---

---
NAME: count-up
DOES: Number counts from 0 to target value over ~60 frames, great for statistics
GOOD FOR: Stats, metrics, numbers, KPIs, financial figures, growth percentages
ENERGY: medium
REMOTION CODE:
  const value = interpolate(frame, [0, 60], [0, targetValue], { extrapolateRight: "clamp" });
  // Display: Math.round(value).toLocaleString()
---

---
NAME: stroke-draw
DOES: SVG path draws itself progressively using strokeDashoffset animation
GOOD FOR: Line illustrations, checkmarks, diagram connections, reveal paths
ENERGY: low
REMOTION CODE:
  const totalLength = pathRef.getTotalLength();
  const draw = interpolate(frame, [0, 45], [totalLength, 0], { extrapolateRight: "clamp" });
  strokeDasharray: totalLength
  strokeDashoffset: draw
---

---
NAME: stagger-reveal
DOES: Multiple elements appear one after another with incremental delays
GOOD FOR: List items, grid reveals, platform logos, step-by-step sequences
ENERGY: medium
REMOTION CODE:
  // For element at index i:
  const delay = baseDelay + i * stepDelay;
  const opacity = spring({ frame: Math.max(0, frame - delay), fps: 30, config: { damping: 20, stiffness: 200 } });
  // stepDelay: 3-5 frames for fast, 8-12 for dramatic
---

---
NAME: squares-grid-bg
DOES: Animated canvas grid of moving squares with directional flow (diagonal/up/right/down/left). Continuous subtle background motion with hover-reactive cells
GOOD FOR: Dark ambient backgrounds, technical/matrix themes, behind hero text on dark sections, loading screens, obsidian-style depth
ENERGY: low
STYLE COMPAT: minimalist-beta-capture (preferred), kinetic-orange, stippled-editorial
SOURCE: SuperDesign SquaresBackground
REMOTION CODE:
  // Canvas-based — implement as AbsoluteFill background layer
  // Grid: squareSize (40px default), borderColor (#333 for dark themes)
  // Direction: offset grid position per frame
  // Diagonal: gridOffset.x -= speed; gridOffset.y -= speed; (each frame)
  // Right: gridOffset.x -= speed; (each frame)
  // Redraw grid each frame with ctx.strokeRect
  // Add radial gradient vignette: center transparent → edge rgba(6,0,16,0.8)
  // Speed: 0.5-1.0 for subtle, 2.0+ for energetic
  // No spring — pure linear motion per frame
---

---
NAME: card-swap-cycle
DOES: Automated perspective card cycling using GSAP-style spring. Front card drops down, remaining cards shift forward, front card re-enters at back position. Skew + depth via z-translation
GOOD FOR: Feature showcases, testimonial rotations, portfolio item cycling, before/after reveals, product card sequences
ENERGY: medium-high
STYLE COMPAT: lumina-neo-brutalist (preferred), minimalist-beta-capture, high-contrast-editorial
SOURCE: SuperDesign CardSwapShowcase
REMOTION CODE:
  // Card stack: N cards at staggered positions
  // Slot calculation per card at index i:
  //   x: i * cardDistance, y: -i * verticalDistance, z: -i * cardDistance * 1.5
  //   zIndex: total - i (front card = highest)
  // Swap animation (every ~120 frames / 4 seconds):
  //   Phase 1 (DROPS): front card translateY += 500, duration ~36 frames
  //   Phase 2 (PROMOTE): remaining cards spring to new positions (damping 14, stiffness 120)
  //   Phase 3 (RETURN): dropped card moves to back slot from below
  // Skew: skewY(4-6deg) on all cards for depth perspective
  // Use Sequence blocks: each swap cycle = ~120 frames
  const swapSpring = spring({ frame, fps: 30, config: { damping: 14, stiffness: 120 } });
---
```

---

## 5. Style-Animation Mapping

Quick lookup: which animations pair best with which styles.

| Style | Preferred Entrances | Preferred Springs | Default Effects | Avoid |
|-------|--------------------|--------------------|----------------|-------|
| Default (INFINITX orange) | clip-circle, spring-scale | standard-spring | float | — |
| Freehand Illustrated | fade-blur, wipe-right | useSmooth, useSnappy | float (gentle, N=16) | pop-scale (too aggressive) |
| Stippled Editorial | clip-circle, pop-scale | useSnappy, useBouncy | pulse-glow | fade-blur (too soft) |
| High-Contrast Editorial | clip-path-inset, echo-stack-reveal | useSnappy | stagger-reveal | fade-blur (too soft) |
| Minimalist Beta Capture | slide-up-cubic, fade-blur | useSmooth | squares-grid-bg, float | pop-scale (too aggressive), push-press (too playful) |
| Lumina Neo-Brutalist | push-press, slide-in-edge | useSnappy, useBouncy | card-swap-cycle | fade-blur (too soft), echo-stack (wrong aesthetic) |
| Kinetic Orange | infinite-marquee, pop-scale, skew-section | useSnappy, useBouncy | spin-indicator, infinite-marquee | fade-blur (too soft), slide-up-cubic (too gentle) |
