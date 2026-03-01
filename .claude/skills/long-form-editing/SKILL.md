---
name: long-form-editing
description: "Edit long-form videos (5+ minutes) using Remotion compositions. Tutorials, walkthroughs, case studies, demos. Triggers: long-form editing, edit tutorial, edit walkthrough, long video editing, 5 minute video, tutorial editing, case study editing"
metadata:
  category: video-production
  version: 1.0
---

# Long-Form Video Editing (5+ Minutes)

Edit long-form videos into polished Remotion compositions with 30-40+ concept pop-outs, illustration-first design, parallel agent development, and varied SFX. Every spoken concept gets visual reinforcement.

---

## Style Selection

**Two long-form editing styles exist. Choose based on video type:**

| Video Type | Style | Primary Component | Gold Standard |
|------------|-------|------------------|---------------|
| Tutorial / walkthrough (screen-share heavy) | **ConceptOverlay** | `ConceptOverlay` (solid-white bg, illustration-first) | `CraftingOutreachCampaign.tsx` |
| Talking-head / story-driven (face on camera) | **FloatingKeyword** | `FloatingKeyword` (bold text + visuals floating on video, speaker always visible) | `ClaudeCreatives.tsx` |

---

## Key Parameters — ConceptOverlay Style (Tutorials)

| Parameter | Value |
|-----------|-------|
| Pop-outs | 30-40+ (every spoken concept) |
| Primary component | ConceptOverlay (solid-white) |
| Default text | NONE (illustration-only, 800px) |
| Zoom | FLAT 1.0 (no keyframes — causes swimming) |
| SFX | 35-40 with variety per pop-out type |
| Illustration files | Split by section ({Project}Intro/Midroll/End.tsx) |
| Development mode | Parallel agents (3 agents x 10-15 illustrations) |
| Background music | First 35s only (1050 frames), 0.02 volume |
| Gold standard | `CraftingOutreachCampaign.tsx` (28min, 35+ overlays) |

## Key Parameters — FloatingKeyword Style (Talking-Head)

| Parameter | Value |
|-----------|-------|
| Keywords | 15-25 strategic moments (not every concept — only standout words) |
| Primary component | `FloatingKeyword` (bold text floating on video) |
| Speaker visibility | ALWAYS visible — no full-screen overlays |
| Custom illustrations | Separate `{Project}Illustrations.tsx` file with React components |
| Visual types | `customVisual` (React nodes), `visual` (hero images), `icon` (small logos), `visualOnly` (no text) |
| Mission tracker | `MissionTracker` component (video game HUD) for tutorial phases |
| SFX | Subtle pop per keyword (0.15 volume) |
| Background music | NONE — talking-head videos breathe better without |
| Zoom | FLAT 1.0 |
| Gold standard | `ClaudeCreatives.tsx` + `ClaudeCreativesIllustrations.tsx` |

### FloatingKeyword Rules
- **Bold text floats directly on video** — NO background panels, NO overlays
- **Left/right of speaker** at 5% from edges, positioned by `topPercent`
- **Only standout words** — not every concept. Quality over quantity.
- **Hero-sized reference images** for visual proof (screenshots, thumbnails, real content)
- **Custom illustration components** for abstract concepts (badges, browser windows, platform grids)
- **`visualOnly: true`** for pure visual pop-outs (no text needed)
- **`customVisual` prop** accepts any React node — enables illustration components
- **Rapid-fire CTA sequence** in outro matching exact spoken words (COMMENT, LIKE, SUBSCRIBE, etc.)
- **Icons 200-240px** for brand moments (Claude AI, platform logos), NOT 110px

---

## 7-Phase Editing Process

| Phase | Name | What Happens |
|-------|------|-------------|
| 0 | LOAD CONTEXT | Read skill files, study gold standard |
| 1 | TRANSCRIPT ANALYSIS | Read WORDS data, identify 30-40+ edit points |
| 2 | ASSET INVENTORY | Source real content, check existing assets |
| 3 | POP-OUT PLANNING | Map pop-outs with V4 illustration-first rules |
| 4 | CREATE ILLUSTRATIONS | Split files, parallel agents, SVG with motion |
| 5 | SFX STRATEGY | Assign varied SFX per pop-out type |
| 6 | CAPTION SYSTEM | Word-by-word captions, hide during pop-outs |
| 7 | ASSEMBLY & VERIFICATION | Layer stack, register, compile, validate |

---

### Phase 0: Load Context

Read these files before any editing work:

1. This SKILL.md
2. `.claude/skills/video-editing/SKILL.md` — shared component library + rules
3. `remotion/lib/config.ts` — FPS (30) and resolution presets
4. `remotion/lib/colors.ts` — brand palette (or style palette if style selected)
5. `remotion/compositions/CraftingOutreachCampaign.tsx` — gold standard
6. **If style selected:** read `remotion/playbook/styles/{slug}.md` for color palette, component preferences, animation springs
7. **Load catalogs:** read `remotion/playbook/animations/_index.md`, `remotion/playbook/components/_index.md`

Study the gold standard composition structure: how pop-outs are organized into section arrays, how SFX maps by type, how the layer stack is ordered.

---

### Phase 1: Transcript Analysis

Read the WORDS data file at `remotion/data/[script]-cut-words.ts`.

**RULE:** ALWAYS use WORDS data (.ts files with frame numbers). NEVER use transcript JSON (seconds are not frames). NEVER estimate frames from seconds — grep the WORDS file for exact frame numbers.

Identify ALL 30-40+ edit points upfront. Look for:

| Edit Point Type | Example |
|-----------------|---------|
| Brand mentions | "Anthropic", "Claude Code", "IX" |
| Concepts explained | "campaign brain", "progressive disclosure" |
| Metaphors | "Swiss army knife", "zone of genius" |
| Emotional beats | "that's wrong", "incredible", "the future" |
| Numbers/stats | "$90K", "297 contacts", "20 minutes" |
| CTAs | "subscribe", "link in description", "connect" |
| People introduced | "Dex", "Zach" |

Map the narrative arc:

| Arc Segment | Range | What Happens |
|-------------|-------|-------------|
| Hook | 0-20% | Attention-grabbing opener |
| Concept Intro | 20-40% | Introduce core ideas |
| Deep Dive | 40-70% | Detailed walkthrough, demos |
| Proof | 70-85% | Results, case studies, testimonials |
| CTA | 85-100% | Subscribe, connect, free offers |

**RULE:** Verify pop-out context. "Anthropic...that's wrong" means pop-out on "Anthropic", NOT "wrong". Grep surrounding words to confirm the concept being visualized.

---

### Phase 1.5: Scene Planning

**Before building anything**, create a structured Scene Plan. Read `remotion/playbook/scene-planning.md` for the full methodology.

1. Read the selected style's Component Preferences table (if style selected)
2. Read `remotion/playbook/components/_index.md` — use Decision Tree to match moments to components
3. Read `remotion/playbook/animations/_index.md` — use Style-Animation Mapping for entrance selection

For each of the 30-40+ edit points identified in Phase 1:
  a. Assign narrative role (hook / concept / proof / emotional / cta / breathing)
  b. Score impact (A / B / C) — long-form: most concepts are A-tier
  c. Select component using decision tree + style compatibility
  d. Select entrance animation from catalog (vary entrances across sections)
  e. Write unique illustration concept per pop-out
  f. Assign SFX (vary types per section, never repeat consecutively)

**Output:** Scene Plan comment block at top of composition file. For long-form, organize by section (Intro / Midroll / End).

---

### Phase 2: Asset Inventory & Source Content

Check existing assets BEFORE creating any visuals:

```bash
ls public/logos/              # Brand logos (SVG + PNG)
ls public/audio/              # SFX library
ls public/source-content/     # Downloaded content
ls public/headshots/          # People headshots
```

**Priority order (highest to lowest):**
1. Real video content (demos, announcements, walkthroughs)
2. Real screenshots/images (blog heroes, benchmark charts)
3. Real logos from `public/logos/`
4. SVG illustrations with motion (custom-built)
5. AI-generated images (nano-banana last resort)

Source new content with yt-dlp. Re-encode AV1 to H.264:
```bash
ffmpeg -i input -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -movflags +faststart output.mp4
```

Create manifest.json tracking every asset with source URL. Map each transcript moment: real content available? OR illustration needed?

**RULE:** Real content ALWAYS beats illustrations. Never ship placeholders.

---

### Phase 3: Pop-Out Planning (V4 Illustration-First)

#### V4 Rules

1. Default = NO caption, NO subtitle — illustration fills screen at 800px
2. Only add text for: character intros ("MEET DEX"), CTAs ("SUBSCRIBE"), free offers
3. Every illustration UNIQUE — never parameterized templates like `ConceptBadge(icon, label)`
4. ConceptOverlay primary component — `backgroundStyle="solid-white"` default, `"frosted"` for analytical moments
5. Mix entrance modes: `clip-circle` (default), `wipe-right`, `fade-blur`
6. NO zoom keyframes — long videos with continuous zoom cause shaking/swimming. Flat 1.0 throughout
7. Background music: first 35s only — `<Sequence from={0} durationInFrames={1050}>`

#### Duration Tiers

| Type | Frames | Use Case |
|------|--------|----------|
| Quick concept | 60-70 | Simple keyword reinforcement |
| Hero moment | 80-120 | Key narrative moments, case studies |
| B-roll/diagram | 120-210 | Complex explanations, system diagrams |
| CTA | 80-90 | Subscribe, connect, get started |

#### Illustration Size

| Pop-Out Type | illustrationSize | When |
|-------------|-----------------|------|
| Standard (no text) | **800** | Default for most pop-outs |
| With caption/subtitle | **700** | Character intros, named concepts |
| CTA | **620** | Subscribe, connect, free offer |

#### Timing Rules

- Pop-out at the EXACT frame the keyword is spoken
- Minimum gap between pop-outs: 30 frames (preferred 50+)
- Maximum gap: 500 frames (keeps energy up)

**RULE:** Pop-out at the EXACT frame the keyword is spoken. Grep the WORDS data file for the frame number. Never estimate.

---

### Phase 4: Create Illustrations (Parallel Agents)

Split illustrations into separate files per section:

```
remotion/lib/illustrations/
  {Project}Intro.tsx      <- First third (10-15 illustrations)
  {Project}Midroll.tsx    <- Middle third (10-12 illustrations)
  {Project}End.tsx        <- Final third (10-12 illustrations)
```

Launch 3 parallel agents via Task tool (one per file):

```
Agent 1: Write {Project}Intro.tsx    (illustrations 1-12)
Agent 2: Write {Project}Midroll.tsx  (illustrations 13-24)
Agent 3: Write {Project}End.tsx      (illustrations 25-35)
```

Each agent gets: illustration names, visual descriptions, brand colors, the COLORS import path.

#### SVG Template

```tsx
export const ConceptNameV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const scale = spring({ frame, fps: 30, from: 0, to: 1,
    config: { damping: 14, stiffness: 100 } });
  const animatedValue = interpolate(frame, [0, 60], [0, 100],
    { extrapolateRight: "clamp" });
  return (
    <svg viewBox="0 0 600 600" width={size} height={size}>
      {/* Dark strokes, colored fills, designed for white bg */}
    </svg>
  );
};
```

#### Illustration Rules

- viewBox `0 0 600 600`, use `COLORS` from `remotion/lib/colors.ts`
- Add motion: `useCurrentFrame()` + `interpolate()` for count-ups, stroke draws, staggered reveals
- Design for white backgrounds (dark strokes, colored fills)
- ALWAYS use real images (`Img` + `staticFile()`) for brand logos — NEVER recreate logos as SVG
- Use real headshots for people: `Img` + `staticFile("headshots/{name}.png")` via `<foreignObject>` in SVG
- Verify names: grep WORDS data for exact spelling

---

### Phase 5: SFX Strategy

Assign SFX by pop-out type. NEVER use the same SFX for every pop-out:

| Pop-Out Type | SFX File | Volume |
|-------------|----------|--------|
| Quick concept | `pop-402324.mp3` | 0.22 |
| Hero moment | `whoosh-large-sub-384631.mp3` | 0.16 |
| B-roll/diagram | `whoosh-bamboo-389752.mp3` | 0.14 |
| Section break | `whoosh-large-sub-384631.mp3` | 0.18 |
| CTA | `mouse-click-290204.mp3` | 0.18 |

#### SFX Rules

- J-cut: SFX hits 3-5 frames BEFORE the visual appears
- Collision fix: if two SFX land on same frame, offset by 3 frames
- Never stack more than 2 sounds on same frame

#### Volume Hierarchy

| Layer | Volume | Notes |
|-------|--------|-------|
| Speaker | 1.0 | Untouched (OffthreadVideo) |
| SFX pop | 0.20-0.25 | Pop-out entrances |
| SFX whoosh | 0.14-0.20 | Content transitions |
| Background music | 0.02 | Barely audible lofi |
| Content videos | 0.0 | MUTED always |

---

### Phase 6: Caption System

Build word-by-word captions from WORDS data:

- Single-word, 72px Extra Bold, uppercase
- Position: 25-30% from bottom
- Emphasis detection: numbers, power words, emotional triggers get `emphasis: true`
- Minimum 4 frames per word

**RULE:** Hide captions during ConceptOverlay display — NO visual clutter.

Calculate overlay ranges from all pop-out events and section breaks. Filter captions:

```tsx
const isFrameInOverlay = (frame: number, ranges: Array<{start: number; end: number}>) =>
  ranges.some(r => frame >= r.start && frame < r.end);

const visibleCaptions = WORDS.filter(word => !isFrameInOverlay(word.frame, overlayRanges));
```

---

### Phase 7: Assembly & Verification

Build the composition with this layer stack:

```
LAYER 1:          Full-screen OffthreadVideo (NO zoom, NO color grading)
LAYER 2 (z:100):  Section breaks (white bg, typography)
LAYER 3 (z:100):  Pop-outs (ConceptOverlay + AppleStylePopup)
LAYER 4:          Captions (filtered for overlays)
LAYER 5:          SFX Audio (varied per pop-out type)
LAYER 6:          Background music (lofi, 0.02, first 35s only)
```

Register in Root.tsx:

```tsx
<Composition
  id="ProjectName"
  component={ProjectName}
  durationInFrames={TOTAL_DURATION_FRAMES}
  fps={VIDEO_FPS}
  width={1920}
  height={1080}
  defaultProps={{ videoSrc: "videos/YYYY-MM-DD-project-name/source.mp4" }}
/>
```

#### Validation Checklist

1. TypeScript compile: `npx tsc --noEmit`
2. Timing validation: verify `popup[n].frame + popup[n].duration < popup[n+1].frame`
3. No SFX collisions on same frame
4. All illustration imports resolve
5. `premountFor={fps}` on every `<Sequence>`
6. Use `<Img>` from remotion, never HTML `<img>`
7. `staticFile()` resolves from ROOT `public/` only

See `references/composition-template.md` for full code patterns.

---

## Iterative Review Loop (Expect 2-3 Passes)

### Pass 1: Foundation
Build full composition with 30-40+ edit points, all illustrations via parallel agents. TypeScript compile + timing validation.

### Pass 2+: User Review
User scrubs in Remotion Studio, gives feedback on specific timestamps. Typical: "this illustration is ugly", "need more at timestamp X", "wrong visual for this concept".

### Parallel Fix Agents
When 3+ fixes come in, self-trigger parallel agents (one per fix, concurrent). Autonomously decide when to parallelize — any time 3+ independent tasks exist.

### Re-Validate
TypeScript + timing validation after every round.

**Key insight:** The first composition is a draft. Budget for 2-3 review rounds. Parallel agents make feedback loops fast (~5 minutes vs 30+ sequential).

---

## Editorial Philosophy

### "Noun vs Verb" Rule — Visualize CONCEPTS Not WORDS

| | Example |
|---|---------|
| BAD (literal) | "market crashing" -> red arrow down |
| GOOD (metaphorical) | dam breaking, house of cards falling |

### Quality Tests

| Test | Question | Fix If Fail |
|------|----------|-------------|
| Mute Test | Can you understand the concept without sound? | Illustration not descriptive enough |
| Squint Test | Can you see captions while squinting? | Too small or low contrast |
| Vibe Check | Did I use a visual just because it matched a keyword? | Replace with metaphor |

### Dynamic Pacing
Fast cuts for excitement/confusion, slow pushes for serious/"aha!" moments. Never cut at the same interval — that feels robotic.

---

## Anti-Patterns (NEVER DO)

| Anti-Pattern | Why It Fails |
|-------------|-------------|
| KineticText as concept substitute | Feels lazy/cheap — not a visual concept |
| Parameterized template illustrations | Generic — `ConceptBadge(icon, label)` is soulless |
| Scattered AnnotationBadges | Chaotic — use unified checklist panel |
| Multiple elements in one section | Pick ONE strong treatment |
| Continuous zoom keyframes | Visible shaking/swimming in long videos |
| Same SFX for every pop-out | Repetitive — vary by type |
| Pixel art with colored boxes | Ugly on white backgrounds |
| Dark overlays `rgba(10,10,10,0.88)` | Kills the premium Apple feel |
| Caption + subtitle on every pop-out | Repetitive at 30+ scale — V4 = illustration-only |
| Looping background music | Distracting at 28 minutes — first 35s only |

---

## TypeScript Interfaces

```tsx
interface PopOutEvent {
  frame: number;
  duration: number;
  component: "apple" | "concept";
  illustration: React.ReactNode;
  caption?: string;           // OPTIONAL — most pop-outs omit
  subtitle?: string;          // OPTIONAL — most pop-outs omit
  illustrationSize?: number;  // Default 800
  backgroundStyle?: "solid-white" | "frosted" | "dark-blur";
  entrance?: "clip-circle" | "wipe-right" | "fade-blur";
}

interface SfxEvent {
  frame: number;
  sfx: string;
  volume: number;
}
```

---

## People in Long-Form Videos

- Use real headshots: `Img` + `staticFile("headshots/{name}.png")` via `<foreignObject>` in SVG
- Character intros get text: "MEET DEX" with role subtitle, illustrationSize 700
- Verify names: grep WORDS data for exact spelling (e.g., "Zach" not "Sac")

---

## Non-Negotiable Rules

1. ALWAYS use WORDS data (.ts) for frame timing, NEVER transcript JSON
2. Pop-out at the EXACT frame the keyword is spoken
3. Every illustration UNIQUE — never templates
4. ConceptOverlay solid-white as default
5. NO zoom keyframes (flat 1.0)
6. Background music first 35s only at 0.02
7. Content videos MUTED (`volume={0}`)
8. `premountFor={fps}` on every Sequence
9. SFX variety per pop-out type
10. Split illustrations by section for parallel agent development

---

## Evolution Check (End of Every Invocation)

1. Did this edit reveal a new pattern? Update this skill
2. Did a new illustration type get created? Add to library reference
3. Was the process confusing? Improve this skill
4. Did the user manually adjust something? Flag as expansion opportunity

---

## References

| File | Purpose |
|------|---------|
| `remotion/compositions/CraftingOutreachCampaign.tsx` | Gold standard (28min, 35+ overlays) |
| `.claude/skills/video-editing/SKILL.md` | Shared component library, rules |
| `remotion/lib/config.ts` | FPS (30), resolution presets |
| `remotion/lib/colors.ts` | Brand color palette |
| `remotion/components/ConceptOverlay.tsx` | Primary pop-out component |
| `remotion/components/AppleStylePopup.tsx` | Quick concept pop-outs |
| `remotion/lib/illustrations/` | SVG illustration library |
| `remotion/data/` | Word-level transcript data |
| `references/composition-template.md` | Full code patterns |
| `references/evolution-history.md` | Session learnings |

---

*Version: 1.0 | Long-form video editing skill for Remotion compositions (5+ minutes). V4 illustration-first, parallel agent development, 30-40+ pop-outs per video.*
