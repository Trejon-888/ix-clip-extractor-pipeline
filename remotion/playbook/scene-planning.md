# Scene-Based Planning Methodology

Before writing ANY composition code, create a structured Scene Plan. This separates planning from building — the single most important technique for producing high-quality video compositions.

**Why:** Vague instructions ("animate this", "make it look good") produce chaotic, uncoordinated results. Structured scene-based plans with timing, state, effects, and technical details produce professional output.

---

## When to Create a Scene Plan

- **ALWAYS** for new compositions
- Phase 1.5 — after transcript analysis (Phase 1), before pop-out planning (Phase 3)
- Simple pipeline clips (5 pop-outs): lightweight plan
- Complex compositions (12+ pop-outs): detailed plan with full scene breakdowns

---

## Scene Plan Format

Write as a structured comment block at the top of the composition file:

```
/*
 * SCENE PLAN — [CompositionName]
 * Style: [style-id from playbook/styles/_index.md]
 * Format: [short-form pipeline | standalone | announcement | long-form]
 * Duration: [N] frames ([M] seconds)
 * Pop-outs: [count] (target: [range])
 *
 * Scene 1: [LABEL] ([startFrame]-[endFrame])
 *   Role: [hook | concept | proof | emotional | cta | breathing]
 *   Impact: [A | B | C]
 *   Weight: [heavy | medium | light | none]
 *   Component: [name] | Entrance: [pattern]
 *   Background: [solid-white | frosted | dark-blur]
 *   Illustration: [unique visual metaphor description]
 *   Size: [800 | 700 | 620]
 *   SFX: [filename] @ f[frame] ([volume])
 *   Caption: [show | hide]
 *
 * Scene 2: [LABEL] ([startFrame]-[endFrame])
 *   Role: breathing
 *   Caption: show (speaker carries it)
 *
 * ...
 *
 * VALIDATION:
 *   Pop-outs: [count] (target: [range] ✓/✗)
 *   Min spacing: [frames]f (min: 210 ✓/✗)
 *   Weight mix: [N]% light/medium, [M]% heavy ✓/✗
 *   Style compat: all components [PRIMARY/HIGH] ✓/✗
 *   SFX collisions: none ✓/✗
 *   Unique illustrations: all unique ✓/✗
 */
```

---

## How to Build a Scene Plan

### Step 1: Load Context

Read these catalogs before planning:
1. `remotion/playbook/styles/_index.md` → identify selected style
2. `remotion/playbook/styles/{selected-style}.md` → load palette, component preferences
3. `remotion/playbook/animations/_index.md` → available entrance patterns, springs
4. `remotion/playbook/components/_index.md` → decision tree, semantic cards

### Step 2: Identify Scenes

From the transcript analysis (Phase 1), identify narrative segments:

| Role | What It Is | Pop-Out? |
|------|-----------|----------|
| **hook** | First 3-5 seconds, grab attention | Light (FloatingKeyword) or none |
| **concept** | Core idea being explained | A-tier heavy (ConceptOverlay) |
| **proof** | Evidence, stats, examples | A-tier medium or B-tier light |
| **emotional** | Emotional beat, personal story | B-tier light or none |
| **cta** | Call to action | A-tier with CTA illustration |
| **breathing** | Space between moments — speaker carries it | None (captions only) |

### Step 3: Score Each Scene

For each scene with a potential pop-out, assign Impact Score:

| Score | Criteria | Action |
|-------|----------|--------|
| **A** | Core thesis, hero stat, brand reveal, transformation, CTA | ALWAYS gets pop-out |
| **B** | Supporting evidence, named tools, secondary stats | Pop-out ONLY if 7+ seconds from nearest A-tier |
| **C** | Filler, repeated ideas, transitions, adjectives | NO pop-out — captions + speaker carry it |

### Step 4: Select Components (Style-Aware)

For each A/B-tier scene:
1. Use the Decision Tree from `components/_index.md`
2. Check the selected style's Component Preferences table
3. Only select components with **PRIMARY** or **HIGH** compatibility
4. Assign visual weight:
   - A-tier hero → heavy (ConceptOverlay / AppleStylePopup)
   - A-tier brand → medium (FloatingKeyword + crystal box)
   - B-tier → light (FloatingKeyword text-only)

### Step 5: Select Animations (Style-Aware)

For each component, check `animations/_index.md`:
1. Look up Style-Animation Mapping table for preferred entrances
2. Vary entrances — don't use the same one for every pop-out
3. Match spring preset to style energy level

### Step 6: Assign SFX

- J-cut: SFX hits 2-3 frames BEFORE visual appears
- Vary types: whoosh-effect, whoosh-bamboo, whoosh-large-sub, pop
- Never repeat same SFX consecutively
- Platform pops use pop-402324.mp3

### Step 7: Validate

Before writing code, check:

| Check | Rule | Fix |
|-------|------|-----|
| Pop-out count | Within format target (5-8 pipeline, 8-12 announcement, 30+ long-form) | Remove weakest B-tier |
| Spacing | ≥ 210 frames (7s) between pop-out centers | Remove or relocate closer pop-outs |
| Weight mix | 60-70% light/medium, 30-40% heavy | Downgrade some heavy → medium |
| Style compat | All components PRIMARY or HIGH | Swap to compatible component |
| SFX collisions | No two SFX within 3 frames | Offset by 3 frames |
| Illustrations | All concepts unique | Redesign duplicates |

---

## Standardized Motion Vocabulary

Use precise terminology in scene plans to avoid ambiguity:

### Camera / View
| Term | Implementation | Use |
|------|---------------|-----|
| Zoom In | `scale()` transform increasing | Focus attention on detail |
| Zoom Out | `scale()` decreasing | Reveal wider context |
| Pan | `translateX` / `translateY` | Follow movement or scan content |
| Perspective Shift | `rotateX` / `rotateY` | 3D depth effect |

### Transitions
| Term | Implementation | Use |
|------|---------------|-----|
| Crossfade | Opacity swap between elements | Smooth scene change |
| Morph | Border-radius or path shift | Shape transformation |
| Staggered Reveal | Delayed list items with spring | Sequential introduction |
| Wipe | clip-path inset animation | Directional reveal |
| Flash | TransitionFlash (8 frames white) | Energy burst between scenes |

### Physics / Easing
| Term | Implementation | Feel |
|------|---------------|------|
| Spring | `spring()` with damping/stiffness | Natural, physical motion |
| Ease-in-out | `Easing.inOut(Easing.ease)` | Smooth acceleration/deceleration |
| Linear | Constant interpolation | Mechanical, steady |
| Bounce | `spring({ damping: 8 })` | Playful, energetic |
| Snap | `spring({ damping: 20, stiffness: 200 })` | Precise, intentional |

### Effects
| Term | Implementation | Use |
|------|---------------|-----|
| Shimmer | Background-position animation | Loading states, premium feel |
| Pulse | Continuous subtle scaling | Attention draw on CTA |
| Float | `Math.sin(frame/N) * amp` | Idle illustration state |
| Glow | Box-shadow opacity oscillation | Emphasis, active state |
| Count-up | Number interpolation | Stats, metrics |

---

## Example Scene Plan

```
/*
 * SCENE PLAN — ClipContentWithoutClients
 * Style: default (INFINITX orange)
 * Format: short-form pipeline
 * Duration: 1977 frames (65.9s)
 * Pop-outs: 7 (target: 5-8)
 *
 * Scene 1: HOOK (0-90f)
 *   Role: hook | Impact: — | Weight: none
 *   Caption: show | SFX: whoosh-large-sub @ f0 (0.24)
 *
 * Scene 2: PAIN POINT (150-250f)
 *   Role: concept | Impact: A | Weight: heavy
 *   Component: ConceptOverlay (solid-white) | Entrance: clip-circle
 *   Illustration: Warning triangle with stacked content blocks falling | Size: 800
 *   SFX: whoosh-effect @ f148 (0.18) | Caption: hide
 *
 * Scene 3: BREATHING (250-480f)
 *   Role: breathing | Caption: show
 *
 * Scene 4: SOLUTION INTRO (480-580f)
 *   Role: concept | Impact: A | Weight: heavy
 *   Component: ConceptOverlay (solid-white) | Entrance: wipe-right
 *   Illustration: Robot arm assembling content pipeline | Size: 800
 *   SFX: whoosh-bamboo @ f478 (0.18) | Caption: hide
 *
 * ... (remaining scenes)
 *
 * VALIDATION:
 *   Pop-outs: 7 (target: 5-8 ✓)
 *   Min spacing: 230f (min: 210 ✓)
 *   Weight mix: 57% light/medium, 43% heavy ✓
 *   Style compat: all ConceptOverlay solid-white = PRIMARY ✓
 *   SFX collisions: none ✓
 *   Unique illustrations: all unique ✓
 */
```
