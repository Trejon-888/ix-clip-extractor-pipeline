---
name: short-form-editing
description: Edit short-form videos (under 90 seconds) using Remotion compositions. Handles pipeline clips, standalone demos, and announcements with pop-outs, captions, SFX, and CTAs. Use for "short-form editing", "edit clip", "edit short", "pipeline clip editing", "edit demo", "short video editing", "edit announcement", "reels editing", "shorts editing", "tiktok editing".
metadata:
  category: video-production
  version: 1.0
---

# Short-Form Video Editing

Edit short-form videos (under 90 seconds) into polished Remotion compositions with strategic pop-outs, captions, sound effects, and CTAs optimized for social media platforms.

---

## Sub-Type Classification (Determines Everything)

Identify the sub-type FIRST. Every decision flows from this.

| Sub-Type | Description | Pop-Out Density | Primary Component | Gold Standard |
|----------|-------------|----------------|-------------------|---------------|
| Pipeline clip | Extracted from long-form tutorial | **5-8** (A+B tier only) | ConceptOverlay (solid-white) + FloatingKeyword | Clip1FromZeroTo90K (8 pops, ~8s spacing — the comfortable benchmark) |
| Standalone demo | Recorded as short-form | **4-6** (1-2 T1 + 2-4 T2) | AppleStylePopup (T1) + FloatingCard (T2) | Clip6VoiceControlDemoV3 |
| Announcement | News/reaction | **8-12** (A+B tier only) | AppleStylePopup + FloatingKeyword | ClaudeOpus46Announcement |

### Key Parameters by Sub-Type

| Parameter | Pipeline Clip | Standalone Demo | Announcement |
|-----------|--------------|-----------------|--------------|
| Pop-outs | **5-8** (A+B tier scored) | **4-6** | **8-12** (A+B tier scored) |
| Primary component | ConceptOverlay + FloatingKeyword | AppleStylePopup + FloatingCard | AppleStylePopup + FloatingKeyword |
| Visual weight mix | 60-70% light/medium, 30-40% heavy | Per tier system | 60-70% light/medium, 30-40% heavy |
| Caption system | Word captions at `bottom: "28%"` | PhraseCaption (3-5 word chunks) | Word-by-word FullWidthCaption |
| Zoom | FLAT 1.0 (hook punch only) | Hook punch + subtle 1.0-1.08 | Subtle 1.0-1.08 |
| SFX events | 8-12 | 5-8 | 10-15 |
| Min spacing | **210 frames (7s)** between pop-out centers | **210 frames (7s)** | **180 frames (6s)** |
| illustrationSize | 580-640 | 500 (T1), default (T2) | 500 |
| CTA | "WATCH THE FULL VIDEO" | "FOLLOW FOR MORE" | Per source type |

---

## 8-Phase Editing Process

### Phase 0: LOAD CONTEXT

1. Read this SKILL.md
2. Read `.claude/skills/video-editing/SKILL.md` for shared component library and rules
3. Read `remotion/lib/config.ts` for FPS (30)
4. Read `remotion/lib/colors.ts` for brand palette (or style palette if style selected)
5. Identify sub-type from user context (pipeline / standalone / announcement)
6. Study the correct gold standard composition for the sub-type
7. **If style selected:** read `remotion/playbook/styles/{slug}.md` for color palette, component preferences, animation springs
8. **Load catalogs:** read `remotion/playbook/animations/_index.md`, `remotion/playbook/components/_index.md`

### Phase 1: Transcript Analysis

**Pipeline clips:** Use WORDS data (`.ts` files) for frame-based timing.
**Standalone clips:** Use SRT timestamps multiplied by 30fps for frame calculation.

**RULE:** Always grep the SRT/WORDS file for exact timestamps. Never estimate.

**Actions:**
1. Read the word-level data file
2. Identify: hook (first 3-5 seconds), core message, supporting points, CTA moment
3. Flag emphasis words (numbers, power words, emotional triggers)
4. Map sentence boundaries and natural pauses

**Frame calculation from SRT:**
```typescript
// Find "voice" at 27.073s in SRT
// frame = Math.round(27.073 * 30) = 812
```

### Phase 1.5: Scene Planning

**Before building anything**, create a structured Scene Plan. Read `remotion/playbook/scene-planning.md` for the full methodology.

1. Read the selected style's Component Preferences table
2. Read `remotion/playbook/components/_index.md` — use Decision Tree to match moments to components
3. Read `remotion/playbook/animations/_index.md` — use Style-Animation Mapping for entrance selection

For each edit point identified in Phase 1:
  a. Assign narrative role (hook / concept / proof / emotional / cta / breathing)
  b. Score impact (A / B / C) using Impact Score system
  c. Select component using decision tree + style compatibility (only PRIMARY/HIGH)
  d. Select entrance animation from catalog matching style energy
  e. Write unique illustration concept (visual metaphor, not literal)
  f. Assign SFX (J-cut timing, variety)

**Output:** Scene Plan comment block at top of composition file. Validate before proceeding:
- Pop-out count within sub-type target
- Spacing ≥ 210 frames between pop-out centers
- Weight mix: 60-70% light/medium, 30-40% heavy
- All components style-compatible (PRIMARY or HIGH)

### Phase 2: Asset Inventory

1. Check `public/logos/` for brand logos (13 platform SVGs + brand logos)
2. Check `public/audio/` for SFX library
3. Check `public/thumbnails/` for CTA thumbnails
4. Check `public/headshots/` for person headshots

**Priority:** Real logos > real content > SVG illustrations > AI-generated.

**RULE:** ALWAYS use real images (`Img` + `staticFile()`) for logos. NEVER recreate as SVG.

**Brand Asset Library:**
- Claude Code: `logos/claude-code-terminal.webp`
- Claude AI: `logos/claude-ai-icon.svg`, `logos/claude-ai-wordmark.png`
- INFINITX: `infinitx-logo.png` (root public/)
- 13 Platforms: `youtube.svg`, `instagram.svg`, `linkedin.svg`, `tiktok.svg`, `x.svg`, `facebook.svg`, `pinterest.svg`, `threads.svg`, `bluesky.svg`, `googlebusiness.svg`, `telegram.svg`, `snapchat.svg`, `reddit.svg`

### Phase 3: Pop-Out Planning

**FIRST:** Before choosing components, score every potential edit point using the **Impact Score system** from the router SKILL.md. List all moments, assign A/B/C, then plan pop-outs for A-tier and qualifying B-tier only. Assign visual weight: A-tier hero moments → heavy (ConceptOverlay), A-tier brand reveals → medium (FloatingKeyword + crystal box), B-tier → light (FloatingKeyword text-only). Target: 60-70% light/medium, 30-40% heavy.

#### Pipeline Clips (ConceptOverlay + FloatingKeyword)

- A-tier hero moments = full-screen ConceptOverlay (solid-white, clip-circle entrance)
- A-tier brand/tool reveals = FloatingKeyword with crystal box visual or logo icon
- B-tier supporting moments = FloatingKeyword text-only in brand orange (#FF7614)
- illustrationSize: 580-640 (bigger for mobile readability)
- Platforms pop INDIVIDUALLY with own SFX (not grouped cascade)
- **RULE:** Score each pop-out A/B/C using Impact Score. Only A+B get pop-outs.
- **RULE:** Minimum 210 frames (7 seconds) between pop-out centers. The speaker carrying a point with just captions is NOT a gap — it is good pacing.
- **RULE:** Target 5-8 pop-outs for a 60-90s pipeline clip. If you have more than 8, you are probably including C-tier moments. Cut them.
- **RULE:** Gaps of 300+ frames (10s) are acceptable if the speaker is delivering a compelling point. Only fill if a genuine A-tier moment falls in it.

| Duration Type | Frames | Use Case |
|--------------|--------|----------|
| Quick | 30 | Rapid-fire platform reveals |
| Standard | 50-75 | Core concepts |
| Key moment | 100 | Hero reveals, extended B-roll |
| CTA | 50-65 | End card |

#### Standalone Demos (v2 Tier System)

| Tier | Component | Max Per Clip | Purpose | z-index |
|------|-----------|-------------|---------|---------|
| Tier 1 | AppleStylePopup | 2 | WOW moment + core concept (full-screen takeover) | 100 |
| Tier 2 | FloatingCard | 3-5 | Brands, results, supporting details (speaker visible) | 20 |

#### Announcements (AppleStylePopup + FloatingSourceFrame)

- AppleStylePopup for concept moments (white bg, spring animation)
- FloatingSourceFrame PIP for source video (top-right, orange border)
- **RULE:** Source videos always `volume={0}` (muted)

### Phase 4: Create Illustrations

Inline in the composition file (short-form = single file, not split).

**Design requirements:**
- SVG with viewBox `0 0 600 600`, use COLORS from `remotion/lib/colors.ts`
- Clean vector with motion (`useCurrentFrame()` + `interpolate()` / `spring()`)
- Design for white backgrounds (dark strokes, colored fills)
- **RULE:** Every illustration DISTINCT. Recognition test: viewer sees it for 1 second, knows it is different from the others.
- **RULE:** NEVER reuse same illustration for two concepts.
- **RULE:** NEVER use template/parameterized illustrations. Each pop-out needs a UNIQUE visual metaphor.

### Phase 5: SFX Strategy

J-cut: SFX hits 2-3 frames BEFORE the visual appears.

#### Pipeline Clip SFX

| Event | SFX File | Volume |
|-------|----------|--------|
| ConceptOverlay entrance | whoosh (varied) | 0.14-0.18 |
| Individual platform pop | pop-402324.mp3 | 0.18-0.22 |
| CTA entrance | whoosh | 0.16 |
| Hook burst | whoosh-large-sub-384631.mp3 | 0.24 |

#### Standalone Demo SFX

| Event | SFX File | Volume |
|-------|----------|--------|
| Tier 1 (AppleStylePopup) | pop-402324.mp3 | 0.22 |
| Tier 2 (FloatingCard) | whoosh-bamboo-389752.mp3 | 0.16 |
| Hook burst | whoosh-large-sub-384631.mp3 | 0.24 |

**Collision fix:** Offset by 3 frames if two SFX land on the same frame.
**Background music:** `lofi-background.mp3` at 0.02 volume, continuous.

### Phase 6: Caption System

#### Pipeline Clips
Custom single-word captions at `bottom: "28%"` (above burned-in auto-captions at bottom 15-20%).
- 72px, Extra Bold, uppercase, heavy text-shadow
- Hide during CONCEPT_RANGES (when ConceptOverlay is displayed)

#### Standalone Demos
`PhraseCaption` component with auto-chunking into 3-5 word phrases.
- `hideFrames` for pop-out moments
- `accentColor: COLORS.primary`

#### Announcements
Word-by-word FullWidthCaption with overlay hiding for AppleStylePopup moments.

### Phase 7: Assembly & Verification

**RULE:** ALWAYS create a standalone composition file. Never use template compositions with JSX in defaultProps.

```
remotion/compositions/ClipNameComposition.tsx
```

**Checklist:**
1. Register in `Root.tsx` with correct `durationInFrames`, `fps: 30`, `width: 1080`, `height: 1920`
2. TypeScript compile: `npx tsc --noEmit`
3. `premountFor={fps}` on every `<Sequence>`
4. Use `<Img>` from remotion, never HTML `<img>`
5. Verify no pop-out overlaps (endFrame of N < startFrame of N+1)
6. Verify no SFX collisions (offset by 3 frames)
7. Verify CONCEPT_RANGES match actual Sequence from/duration
8. Verify spacing between pop-outs (minimum 210 frames / 7 seconds between centers)
9. Verify total pop-out count is within format target (pipeline: 5-8, standalone: 4-6, announcement: 8-12)
10. Verify visual weight mix: 60-70% light/medium (FloatingKeyword), 30-40% heavy (ConceptOverlay/AppleStylePopup)

---

## Hook Treatment (Triple Hook Burst)

| Frame | Event |
|-------|-------|
| 0-3 | Orange brand flash (`#FF6B00`, opacity 1 to 0) |
| 0-3 | Zoom PUNCH (1.06 to 1.0 in 3 frames) |
| 2 | Impact SFX (whoosh-large-sub, 0.24 volume) |
| 8+ | HookOverlay text springs in (optional, white frosted card) |
| 30-105 | Speaker delivers hook, text fades out |

---

## CTA Decision Flow

| Source Type | CTA Text | CTA Subtitle | Icon |
|-------------|----------|-------------|------|
| Long-form YouTube extract | "WATCH THE FULL VIDEO" | Tutorial title | YouTube SVG |
| Standalone demo | "FOLLOW FOR MORE" | @handle | Platform icon |
| Trending reaction | "FOLLOW FOR AI UPDATES" | -- | -- |
| Educational tip | "SAVE & SHARE" | -- | -- |

---

## Individual Platform Pop-Outs (Pipeline Clips)

When the speaker names platforms in sequence, each gets its own floating pop-out:
- Horizontal row, centered, z-index: 22
- Each card: 150x150, frosted glass, rounded corners (28px)
- Logo: 72x72 via `Img` + `staticFile("logos/{platform}.svg")`
- Spring entrance: damping 12, stiffness 160
- One pop SFX per platform, offset by 3 frames from visual
- Creates rhythm: name -> pop -> name -> pop -> name -> pop

See `references/pipeline-clips.md` for full pattern code.

---

## Spacing & Breathing Room (Replaces Gap-Filling)

Pop-outs need breathing room. The speaker's face and voice are the primary content.

| Spacing | Assessment | Action |
|---------|-----------|--------|
| < 210 frames (7s) | **Too dense** | Remove the lower-impact pop-out |
| 210-450 frames (7-15s) | **Ideal range** | No action needed |
| 450-600 frames (15-20s) | **Check** | Is there an A-tier moment hiding in this stretch? If yes, add it. If no, leave it. |
| > 600 frames (20s+) | **Long stretch** | Look for ONE strong B-tier moment to add. If nothing qualifies, accept the gap. |

**NEVER force a pop-out to fill time.** A mediocre illustration interrupting a good speaking moment is worse than no illustration at all.

**Platform name sequences** are the ONE exception where rapid-fire is acceptable: when the speaker names 3+ platforms in quick succession, individual logo pops (30f each) count as a single visual event for spacing purposes.

---

## Editorial Philosophy

- **"Less is More" Rule** — A video with 6 impactful pop-outs and generous breathing room outperforms one with 12 crammed together. When choosing between "add another illustration" and "let the speaker breathe," choose breathing room.
- **The 7-Second Rule:** After each pop-out exits, the viewer needs at least 7 seconds of just the speaker (with captions) before the next pop-out. This is the minimum for cognitive processing.
- **Visual Weight Variety** — Mix heavy (ConceptOverlay), medium (crystal box), and light (branded keyword) pop-outs. Uniform full illustrations feel metronomic; varied weights feel dynamic.
- **"Noun vs Verb" Rule** — Visualize CONCEPTS not WORDS (metaphorical > literal)
- **Mute Test:** Can the viewer understand the concept without audio?
- **Squint Test:** Can you see captions while squinting?
- **Dynamic Pacing:** Vary cut rhythm. Do not make every cut at the same interval.

---

## Anti-Patterns (NEVER DO)

1. Template/parameterized illustrations -- generic, cheap-looking
2. Grouped platform cascade when speaker names them individually -- loses rhythm
3. Continuous zoom keyframes -- swimming motion (flat 1.0 except hook punch)
4. Per-word pop SFX on captions -- annoying "peep peep peep"
5. White text on light bg without text-shadow -- invisible
6. Dark overlays (`rgba(10,10,10,0.88)`) -- kills premium feel
7. Passing JSX through defaultProps -- serialization error
8. Same illustration for two concepts -- lazy
9. KineticText for major moments -- use ConceptOverlay with illustration instead
10. Scattered badges for metadata -- use unified checklist panel

---

## Non-Negotiable Rules

1. **ALWAYS** use WORDS/SRT data for frame timing. NEVER estimate.
2. Pop-out at the **EXACT** frame the keyword is spoken.
3. Every illustration **DISTINCT** -- no reuse, no templates.
4. **Standalone** composition files (never template with JSX defaultProps).
5. `premountFor={fps}` on **every** Sequence.
6. SFX J-cut: **2-3 frames before** visual.
7. Content videos **MUTED** (`volume={0}`).
8. Background music at **0.02** volume.
9. **Minimum 210 frames (7s) spacing** between pop-out centers. Never gap-fill for its own sake.
10. Real logos always (`Img` + `staticFile()`). NEVER recreate as SVG.
11. **Impact Score every edit point** (A/B/C) before adding pop-outs. C-tier = no pop-out. B-tier only if spacing allows.
12. **Visual weight mix:** 60-70% light/medium (FloatingKeyword), 30-40% heavy (ConceptOverlay). See router SKILL.md for hierarchy.

---

## Pipeline Clip Rules (Lessons Learned)

1. **Audio: `volume={1}` on OffthreadVideo.** When the reframed video has baked-in audio (extracted from long-form), use `volume={1}` on OffthreadVideo, NOT `volume={0}`. Pipeline clips already have the speaker's voice in the video file.
2. **Caption positioning adapts to layout.** `bottom: '12%'` for talking-head clips (face fills most of frame), `bottom: '3%'` for split-screen clips (screen share top, face bottom). Take a screenshot of the video to determine layout before setting caption position.
3. **Transcribe directly from the reframed video.** ALWAYS transcribe directly from the reframed video for word data -- NEVER slice from master transcript. Clip extraction adds pre-roll padding (0.5-4s) that causes offset drift between transcript timestamps and actual video audio.
4. **Word emphasis on power words.** Add `emphasis: true` to important/power words in the word data. Brand names, numbers, action verbs, and key concept words should be marked. Render with brand color #FF7614 + orange glow text shadow.

---

## Evolution Check (End of Every Invocation)

1. Did this edit reveal a new pattern? Update this skill.
2. Was the tier system insufficient? Consider a new component.
3. Did the user manually adjust something? Flag as expansion opportunity.
4. New sub-type emerging? Document it.

---

## References

| File | Purpose |
|------|---------|
| `references/pipeline-clips.md` | Full pipeline clip editing patterns |
| `references/composition-template.md` | Code patterns, tier system, hook burst |
| `references/evolution-history.md` | Session learnings and editing system evolution |
| `.claude/skills/video-editing/SKILL.md` | Router -- shared component library, rules |
| `remotion/compositions/Clip6VoiceControlDemoV3.tsx` | Standalone demo gold standard |
| `remotion/compositions/Clip1FromZeroTo90K.tsx` | Pipeline success story gold standard |
| `remotion/compositions/Clip2StopManuallyPosting.tsx` | Pipeline pain-to-solution gold standard |
| `remotion/compositions/ClaudeOpus46Announcement.tsx` | Announcement gold standard |
| `remotion/components/ConceptOverlay.tsx` | Pipeline primary component |
| `remotion/components/AppleStylePopup.tsx` | Standalone/announcement primary |
| `remotion/components/FloatingCard.tsx` | Tier 2 supporting component |
| `remotion/components/PlatformCascade.tsx` | Platform grid display |
| `remotion/components/KineticText.tsx` | Hype word emphasis |
| `remotion/lib/colors.ts` | Brand color palette |
| `remotion/lib/config.ts` | FPS and resolution presets |

---

*Version: 1.1 | Updated: 2026-02-23 | Visual Restraint: Impact Score (A/B/C), Visual Treatment Hierarchy (heavy/medium/light), 7-second spacing. Density: pipeline 5-8, standalone 4-6, announcement 8-12. Gap-fill replaced with Spacing & Breathing Room.*
