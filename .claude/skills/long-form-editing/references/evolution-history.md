# Long-Form Editing Evolution History

Session learnings from the evolution of the long-form editing system. Each section documents what was learned and why it matters for future edits.

---

## V4 CraftingOutreachCampaign (2026-02-09) — Long-Form Gold Standard

The first full long-form production: 28-minute tutorial, 35+ overlays, 38 unique illustrations across 3 split files.

### What Was Built
- 37 pop-outs + 2 section breaks = 39 total edit points
- 31 illustration-only (no text), 7 with text (intros + CTAs)
- ConceptOverlay primary, AppleStylePopup for quick moments
- SFX variety: pop, whoosh, bamboo, click per pop-out type
- Flat 1.0 zoom throughout (no swimming)
- Background music first 35s only
- 3 parallel agents created all illustrations simultaneously

### Key Learnings
1. **Illustration-first emerged from user feedback** — Started with caption+subtitle on every pop-out. At 38 pop-outs, user saw it as repetitive and cheap. Stripping text and bumping to 800px was the fix. This became the V4 standard.
2. **Split files enable parallel development** — Sequential illustration creation took 30+ minutes. Split into Intro/Midroll/End files, 3 agents ran concurrently, done in ~5 minutes.
3. **SFX variety prevents repetition** — Same pop on 38 pop-outs was unbearable. Mapping SFX by type (quick=pop, hero=whoosh, B-roll=bamboo, CTA=click) solved it.
4. **No zoom on long-form** — Zoom keyframes that work on 70s videos cause visible shaking/swimming at 28 minutes. Flat 1.0 is the only safe option.
5. **Background music loops are distracting** — 28 minutes of lofi is annoying. First 35s covers the intro energy, then let the speaker carry.
6. **Started with 6 edit points, ended with 38** — User explicitly said "way more needed." Long-form density = every spoken concept gets visual reinforcement.

---

## V7 ClaudeOpus46Announcement (2026-02-06) — Apple Aesthetic + Motion

Full-screen talking head with AppleStylePopup, FloatingSourceFrame, V2 motion illustrations.

### Key Learnings
1. **Apple aesthetic > dark overlays** — White backgrounds with dark text feel premium. `rgba(10,10,10,0.88)` overlays kill the clean feel.
2. **Illustrations need motion** — Static SVGs feel flat. Add `useCurrentFrame()` for count-ups, stroke draws, pulse animations.
3. **Never ship placeholders** — FloatingSourceFrame had a placeholder icon. Either use real content or remove the element entirely.
4. **Source content capture process** — WebFetch announcement page, find YouTube embeds, download with yt-dlp, re-encode AV1 to H.264, store in `public/source-content/`.
5. **yt-dlp supports more than YouTube** — Works for Twitter/X, Reddit, and most platforms.
6. **AV1 codec needs re-encoding** — YouTube downloads may be AV1 which some browsers can't play. Always: `ffmpeg -i input -c:v libx264 -crf 23 -preset medium output.mp4`.
7. **Compress large videos** — Raw phone footage (245MB) compressed to 100MB via `ffmpeg -crf 23 -preset medium`.
8. **Windows bash: use `cp` not `copy`** — Windows `copy` command doesn't work in bash shell.
9. **Subtitle prop adds context** — AppleStylePopup's `subtitle` prop gives secondary info ("The biggest context window").
10. **Increased durations for key reveals** — Big moments need 80-90 frames to breathe, not 55-60.

---

## V7.1 Session (2026-02-06) — Asset Sourcing Must Be Phase 2

### What Went Wrong
The original 10-phase process had illustration mapping as Phase 2, skipping asset inventory entirely. This caused placeholders to ship in the announcement video.

### The Fix
Phase 2 became "Asset Inventory & Source Content" with mandatory real content sourcing before creating any SVG illustrations.

### Key Learnings
1. **Asset sourcing must be Phase 2, before any illustration work** — Check what exists, download what's available, only illustrate what has no real content.
2. **Priority: Real content > SVG illustrations > AI-generated** — Official videos, screenshots, and demos should always be used over custom illustrations when available.
3. **Self-evolution belongs in skills, not just auto-memory** — Process improvements must be documented in SKILL.md (the process agents follow), not just in memory files (personal notes). Skills = the system. Memory = personal notes.

---

## V6 ProgressiveDisclosureSkillsV6 (2026-02-05) — Timing + WORDS Data

White Popup Reveal system, split-zone layout, 17 pop-outs.

### Key Learnings
1. **Timing is everything** — Pop-outs MUST appear at the exact frame when word is spoken.
2. **Use WORDS data, not transcript** — The `.ts` word data has exact frame numbers. Transcript JSON has seconds, which are NOT frames.
3. **Background music volume** — 0.10 was too loud, 0.02 is perfect. Barely audible atmosphere.
4. **Mute content videos** — `volume={0}` prevents audio conflicts with speaker.
5. **SVG illustrations > PNG logos** — More flexible, brand-consistent, no transparency issues.
6. **17 pop-outs for 111s video** — About 1 pop-out every 6-7 seconds is ideal density for short-form.
7. **Spring animation feels premium** — `damping: 10, stiffness: 100` creates satisfying bounce.

---

## 13 Lessons from CraftingOutreachCampaign Production

Codified from the first full long-form production. These are the lessons that shaped the V4 standard.

### Lesson 1: Never Use Template Illustrations
Parameterized `ConceptBadge(icon, label)` with different props = generic. Every pop-out needs a UNIQUE visual metaphor (rocket launch, blueprint, phone mockup, revenue counter, etc.) with multi-stage animation.

### Lesson 2: Split Illustration Files by Section
Create `{Project}Intro.tsx`, `{Project}Midroll.tsx`, `{Project}End.tsx`. Enables parallel agent development: 3 agents x 10-15 components each = all illustrations in ~5 minutes.

### Lesson 3: Hero Pop-Out Durations: 80-120 Frames
Default 55-frame pop-outs feel rushed for important moments.

| Type | Duration |
|------|----------|
| Quick concept (AppleStylePopup) | 60-70 frames |
| Hero concept (ConceptOverlay) | 80-120 frames |
| B-roll montage (ConceptOverlay) | 120-210 frames |
| Section break | 60-70 frames |
| CTA (subscribe/connect) | 80-100 frames |

### Lesson 4: SFX Variety Per Pop-Out Type
Same pop for every pop-out sounds repetitive. Map by type:

| Pop-Out Type | SFX File | Volume |
|------------|----------|--------|
| Quick concept | `audio/pop-402324.mp3` | 0.22 |
| Hero/ConceptOverlay | `audio/whoosh-effect-382717.mp3` | 0.16 |
| B-roll/montage | `audio/whoosh-bamboo-389752.mp3` | 0.14 |
| Section break | `audio/whoosh-large-sub-384631.mp3` | 0.18 |
| CTA button | `audio/mouse-click-290204.mp3` | 0.18 |

### Lesson 5: Use Real Headshots for People
When introducing people, use `Img` + `staticFile("headshots/{name}-headshot.png")` via `<foreignObject>` in SVG. Never use generic silhouettes — instant credibility vs. cheap look.

### Lesson 6: Mix Placement Styles
Not all pop-outs need `backgroundStyle="solid-white"`. Use `"frosted"` for analytical moments (video shows through). Vary `entrance` modes too (`clip-circle`, `wipe-right`, `fade-blur`).

### Lesson 7: Background Music: First 35s Only
Don't loop lofi throughout a 28-min tutorial — it's distracting. Wrap in `<Sequence from={0} durationInFrames={1050}>`. Let the speaker carry after intro.

### Lesson 8: Long-Form = 30-40+ Edit Points
Not 4-8. Every spoken concept gets visual reinforcement during talking-head segments. Dense editing keeps energy up.

### Lesson 9: B-Roll Montage Sequences
Extended illustration montages (120-210 frames) work as B-roll during concept-heavy narration. CampaignPrepBRoll 4-panel layout is the gold standard pattern.

### Lesson 10: Timing Validation Script
Always run a Node.js script to verify no overlaps, no bounds violations before visual preview. Catches errors that are invisible in the event array.

### Lesson 11: Iterative Review Loop (Expect Multiple Passes)
Long-form videos are too complex to get right in one pass:

- **Pass 1 (Foundation):** Analyze transcript, identify ALL 30-40+ edit points upfront. Create illustrations via parallel agents (3 agents x 10-15 components). Build composition with all pop-outs, SFX, timing. TypeScript compile + timing validation.
- **Pass 2+ (User Review):** User scrubs in Remotion Studio, gives feedback. Typical: "this illustration is ugly", "need more at timestamp X", "wrong visual for this concept."
- **When user gives 3+ fixes:** Launch parallel agents — one per fix, all concurrent.
- **Re-validate** (TypeScript + timing) after every round.

**What CraftingOutreachCampaign taught us:**
- Started with 6 edit points, user said "way more needed", expanded to 38.
- User reviewed: "DoubleBookingsCalendar is ugly" + "LaunchCountdown too small" + "SalesCampaignBlueprint needs IX logo" — 3 parallel agents fixed all 3 simultaneously.
- User reviewed again: "kill all caption+subtitle text" — V4 illustration-first rewrite (31/38 pop-outs stripped of text).
- Each round took ~5 minutes with parallel agents vs. 30+ minutes sequential.

**Key insight:** The first composition is a draft. Budget for 2-3 review rounds. Parallel agents make feedback loops fast.

### Lesson 12: Self-Triggering Parallel Agents
Autonomously decide when to use parallel agents — the user doesn't need to request it. Triggers:
- 3+ independent illustration components to create: parallel agents per section file
- 3+ independent fixes from user review: parallel agents per fix
- Any task that splits naturally into independent sub-tasks

The user just gives feedback ("fix X, Y, Z") and the agent decides the execution strategy.

### Lesson 13: V4 Illustration-First Was Born from User Feedback
The caption+subtitle template pattern was NOT wrong initially — it was the default from short-form editing. But on long-form with 38 pop-outs, the user saw:
- Same "WORD" + "some description" on every pop-out = repetitive and cheap
- Illustrations at 500px with text looked cramped
- The text wasn't adding value when the illustration already conveyed the concept

**The fix:** Make caption/subtitle optional in both AppleStylePopup and ConceptOverlay. Default to illustration-only at 800px. Only add text for CTAs and character intros. This evolved into the V4 standard.

**Lesson:** Patterns that work at short-form scale (3-6 pop-outs) may not work at long-form scale (30-40+). Review density-dependent assumptions.

---

## Architecture Summary (Long-Form with Mixed Placements)

```
LAYER 1:          Full-screen OffthreadVideo (NO zoom, NO color grading)
LAYER 2 (z:100):  Section breaks (white bg, typography)
LAYER 3 (z:100):  Pop-outs — MIX of:
                   - AppleStylePopup (full white bg, quick concepts)
                   - ConceptOverlay solid-white (hero moments)
                   - ConceptOverlay frosted (video shows through, analytical)
LAYER 4:          SFX Audio (VARIED per pop-out type)
LAYER 5:          Background music (lofi, 0.02, first 35s only)
```

---

## Timeline of System Evolution

| Date | Version | Milestone |
|------|---------|-----------|
| 2026-02-05 | V6 | White Popup Reveal system, WORDS data timing, background music at 0.02 |
| 2026-02-06 | V7 | Apple aesthetic, AppleStylePopup, motion illustrations, source content capture |
| 2026-02-06 | V7.1 | Asset sourcing becomes Phase 2, never ship placeholders |
| 2026-02-09 | V4 Long-Form | Illustration-first, split files, parallel agents, SFX variety, 30-40+ pop-outs |
| 2026-02-12 | v1.0 Skill | Codified into standalone long-form-editing skill |

---

*This document captures the evolution of the long-form editing system. Update after every production session with new learnings.*
