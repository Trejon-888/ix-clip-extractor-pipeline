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
