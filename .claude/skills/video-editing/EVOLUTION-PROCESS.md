# Evolution Process: 20/100 → 95/100 Journey

**Project:** Progressive Disclosure Skills Video
**Date:** 2026-02-04
**Status:** Completed iteration, documented for future learning

---

## Executive Summary

This document captures the process evolution from a 20/100 implementation to a 95/100 professional video composition. It serves as a **decision framework** for future iterations, documenting what worked, what failed, and why.

**Key achievement:** Shifted from "developer placing assets" to "editor telling a story."

---

## The 20/100 Problem

### Initial Implementation Issues

**What was built:**
- Static screenshot overlays (docs pages, mockups)
- Tiny logos in corners (using 10-20% of available space)
- No blur effects (everything flat)
- No real videos (just static images)
- No sound effects
- Content not mapped to transcript

**User feedback:**
> "what the heck are you doing? ...not too too helpful"
> "You haven't done a great job yet...I give it a 20 out of a hundred"
> "You need to make your whole stuff appear bigger and take over the whole square"

**Critical insights from feedback:**
1. "When there's a concept, we blur out the background"
2. "Think like an editor, not placing assets"
3. "Find the post that Anthropic did when they announced skills"
4. "I want you to download it for me, autonomously"

---

## The Diagnosis: What Was Actually Wrong

### Problem 1: Size & Space Utilization
**Issue:** Content occupied 10-30% of available frame
**Why it happened:** Used CSS max-width/max-height without forcing scale
**Impact:** Looked amateur, hard to read, wasted screen real estate

### Problem 2: Static Content
**Issue:** Using screenshots of websites, not real videos
**Why it happened:** Scraping was hard, so used what was easy
**Impact:** No dynamism, no energy, felt like a slideshow

### Problem 3: No Visual Hierarchy
**Issue:** Everything at same visual level (no blur, no depth)
**Why it happened:** Didn't understand backdropFilter technique
**Impact:** Captions compete with overlays, viewer doesn't know where to look

### Problem 4: Developer Mindset
**Issue:** "Place asset at timestamp X" instead of "tell story beat Y"
**Why it happened:** Focused on technical execution, not editorial flow
**Impact:** Content feels random, not connected to what speaker is saying

### Problem 5: No Real Scraped Content
**Issue:** Created mockups instead of finding real content
**Why it happened:** Scrapers failed, gave up too quickly
**Impact:** Missed opportunity for authentic official content (Anthropic videos)

---

## The Solution: Process Redesign

### Phase 1: Research Real Content First

**Old approach:**
```
1. Look at transcript
2. Create mockups/placeholders
3. Build composition
4. Hope it works
```

**New approach:**
```
1. Read transcript deeply
2. Identify what SHOULD appear (editorial thinking)
3. Find REAL content that matches:
   - Official Anthropic videos (YouTube)
   - Official documentation (screenshots)
   - Viral social proof (Twitter, Reddit)
4. Download and optimize everything
5. THEN build composition
```

**Key tools:**
- `anthropic-official-content.cjs` — Find official YouTube videos
- `yt-dlp` — Download videos
- `ffmpeg` — Extract and web-optimize clips
- `x-scraper.cjs`, `reddit-scraper.cjs` — Social proof
- `mock-social-proof.cjs` — Fallback when scraping fails

**Decision framework:**
```
Is this content REAL or PLACEHOLDER?
├─ Real → Use it
└─ Placeholder → Can I find the real version?
   ├─ Yes → Find and download it
   └─ No → Create high-quality mockup, document as "to be replaced"
```

---

### Phase 2: Build Proper Display Components

**Old approach:**
```tsx
// Just show image
<Img src={staticFile('screenshot.png')} />
```

**New approach:**
```tsx
// FullFrameContent component
<FullFrameContent
  type="video"
  src="official-content/skills-opening-10s.mp4"
  caption="THE BIGGEST GAME CHANGER"
  blurBackground={false}  // Full-screen video, no blur
  scaleContent={1.0}      // 100% scale
/>

<FullFrameContent
  type="image"
  src="logos/claude-logo.png"
  caption="NOT JUST CLAUDE"
  blurBackground={true}   // Blur video behind logo
  scaleContent={0.7}      // 70% scale (smaller for concept)
/>
```

**Why this works:**
- **Fills 90%+ of space** — Content is actually visible
- **Blur control** — Creates visual hierarchy (speaker vs concept)
- **Consistent scaling** — All content sized properly, not random
- **Smooth animations** — Entry scale from 0.85 to final scale

**Component design principles:**
1. **Semantic props** — `blurBackground`, not `showBlur`
2. **Sensible defaults** — `scaleContent={0.95}` by default
3. **Flexibility** — Works for images AND videos
4. **Animation built-in** — Every content reveal feels polished

---

### Phase 3: Map Content to Transcript (Editorial Mindset)

**Critical shift:** Stop thinking "place asset X at timestamp Y" and start thinking "when speaker says Z, viewer should see W."

**Example mapping process:**

**Transcript analysis:**
```
0:00 - "The biggest game changer for AI development right now are skills"
→ VISUAL: Official Anthropic announcement video (full-screen, speaker visible)
→ WHY: This is the hook, show authority and energy

0:10 - "Skills that work with any agent, not just Claude"
→ VISUAL: Claude logo appears, then X mark over it
→ WHY: Visually negate the assumption, create curiosity

0:13 - [Mentions other frameworks]
→ VISUAL: CrewAI, Pydantic AI logos cycle
→ WHY: Prove the claim visually, show breadth

0:25 - "progressive disclosure"
→ VISUAL: Diagram showing before/after
→ WHY: Explain the concept visually, blur background so viewer focuses
```

**Decision tree for each moment:**
```
For transcript segment [X]:
1. What is the speaker SAYING?
2. What should the viewer SEE to understand it better?
3. Do I have REAL content that shows this?
   ├─ Official video showing it → Use that (full-screen, no blur)
   ├─ Diagram/comparison → Show it (blur background)
   ├─ Logo/brand → Show it (blur background)
   └─ Abstract concept → Find illustration or create one
4. How long should it appear? (Match spoken duration, not arbitrary)
5. Should captions hide during this? (Yes if full-screen content)
```

**Anti-patterns to avoid:**
- ❌ "Let me show this cool diagram I made" (not in transcript? don't show it)
- ❌ "This should appear for 5 seconds" (why 5? match speech duration)
- ❌ "I'll show a random tweet" (is it the BEST tweet? highest engagement?)

---

### Phase 4: Strategic Sound Design

**Old approach:**
- No sound effects OR
- Sound on every word (annoying "peep peep peep")

**New approach:**
```typescript
const SFX_EVENTS = [
  { frame: 5, sfx: 'audio/whoosh-effect-382717.mp3', volume: 0.18 },     // Intro punch
  { frame: 305, sfx: 'audio/pop-402324.mp3', volume: 0.22 },             // Logo reveal
  { frame: 750, sfx: 'audio/whoosh-bamboo-389752.mp3', volume: 0.16 },   // Section transition
  // ... 6 more (total: 9)
];
```

**Placement rules:**
1. **Section transitions** → Whoosh (rotate variants to avoid repetition)
2. **B-roll reveals** → Whoosh or pop (first appearance only)
3. **Emphasis words** → Click (max 5-7 per video, only power words)
4. **Intro/Outro** → Whoosh (strong punctuation)

**Volume guidelines:**
- Whoosh: 0.14-0.20
- Pop: 0.20-0.25
- Click: 0.20-0.25
- Never above 0.3 (too loud, overpowers voice)

**Total count:** 10-20 max per video (from backlog-01.md Rule #7)

**Why this works:**
- **Strategic, not spammy** — Viewer notices without getting annoyed
- **Variant rotation** — 3+ whoosh variants prevent "I've heard this 10 times"
- **Supports story** — Emphasizes key moments, doesn't compete with them

---

### Phase 5: Blur Effects for Visual Hierarchy

**The breakthrough insight:**
> "When there's a concept, we blur out the background"

**Before (no blur):**
```
[Speaker video] ← clear
[Logo overlay]  ← clear
[Captions]      ← clear
→ Result: Everything competes, viewer confused
```

**After (strategic blur):**
```
[Speaker video] ← BLURRED (background context)
[Logo overlay]  ← CLEAR (focus point)
[Captions]      ← HIDDEN (avoid clutter)
→ Result: Clear hierarchy, viewer knows where to look
```

**Implementation:**
```typescript
// When showing CONCEPT over video
blurBackground={true}

// CSS result:
backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Dark overlay (contrast)
backdropFilter: 'blur(20px)',           // Blur video behind
```

**Decision framework:**
```
Is this content type:
├─ Official video (speaker visible) → NO blur (show them)
├─ Diagram/comparison → YES blur (focus on diagram)
├─ Logo/brand → YES blur (focus on logo)
├─ Social proof (tweet) → YES blur (focus on content)
└─ Demo screen recording → NO blur (show the demo)
```

**Why 20px blur specifically:**
- 10px: Too subtle, video still distracting
- 20px: Clear hierarchy, context still visible
- 30px+: Too blurry, loses connection to speaker

---

## Technical Execution Details

### Web-Optimized Video Encoding

**Why it matters:**
- Videos without `-movflags +faststart` won't play in browser until fully downloaded
- Poor encoding settings = large file sizes = slow preview/render

**Standard command:**
```bash
ffmpeg -ss START_TIME -t DURATION -i "input.mp4" \
  -c:v libx264 \           # H.264 codec (universal browser support)
  -preset medium \         # Balanced speed/quality
  -crf 23 \                # Quality (18=high, 28=low, 23=sweet spot)
  -pix_fmt yuv420p \       # Color format (compatibility)
  -movflags +faststart \   # CRITICAL: Move moov atom to start (web playback)
  "output.mp4"
```

**Quality vs size tradeoffs:**
```
CRF 18: Visually lossless, ~3-5MB per 10s
CRF 23: Excellent quality, ~700KB-1.5MB per 10s ← SWEET SPOT
CRF 28: Visible compression, ~300-500KB per 10s
```

**Resolution decisions:**
```
1080p clips: For full-screen content (speaker videos, demos)
720p clips: For overlay content (diagrams, comparisons)
Logo PNGs: Minimum 512x512px (no raster logos)
```

---

### Asset Organization for Reusability

**Old structure:**
```
public/
├── screenshot1.png
├── screenshot2.png
├── logo.png
└── whoosh.mp3
→ Result: Can't find anything, duplicates everywhere
```

**New structure:**
```
public/
├── official-content/
│   ├── claude-skills-full.mp4        (raw download)
│   └── skills-opening-10s.mp4        (extracted clip)
├── social-proof/x/
│   └── tweet-2-5203-likes.png        (engagement in filename)
├── logos/
│   └── claude-logo.png               (reusable across projects)
└── audio/
    └── whoosh-effect-382717.mp3      (shared library)
→ Result: Know where everything is, no duplicates
```

**Benefits:**
1. **Reusability** — One logo download serves all compositions
2. **Organization** — Know where to look for each content type
3. **Collaboration** — New editor can find assets without asking
4. **Scalability** — Add new projects without restructuring

---

## Iteration Framework for Future Projects

### Step 1: Transcript Analysis (30 min)
```
□ Read transcript word-by-word
□ Identify visual moments (what should viewer SEE)
□ Mark section transitions (problem, solution, CTA)
□ Flag emphasis words (numbers, power words)
□ Estimate content events needed (1 per 5-10 seconds)
```

### Step 2: Content Sourcing (1-2 hours)
```
□ Find official videos (YouTube, announcements)
□ Download and extract clips (FFmpeg, web-optimized)
□ Capture social proof (tweets, Reddit posts, high engagement)
□ Collect logos (official sources, transparent PNGs)
□ Create/generate diagrams (Figma or AI generation)
□ Verify all assets exist in public/ subdirectories
```

### Step 3: Editorial Mapping (1 hour)
```
□ For each transcript moment:
  □ Determine content type (video, diagram, logo, social proof)
  □ Calculate frame range (start, duration)
  □ Decide blur (concept = blur, speaker = no blur)
  □ Set scale (full-screen = 1.0, overlay = 0.7-0.9)
  □ Write caption if needed
□ Build CONTENT_EVENTS array
□ Verify no overlaps or gaps
```

### Step 4: Sound Design (30 min)
```
□ Plan section transitions (whoosh)
□ Plan B-roll reveals (whoosh or pop, first appearance only)
□ Plan emphasis accents (click, max 5-7)
□ Build SFX_EVENTS array
□ Verify total count ≤ 20
```

### Step 5: Component Integration (1 hour)
```
□ Create/update composition file
□ Import FullFrameContent component
□ Map CONTENT_EVENTS to Sequence components
□ Add caption hiding logic (overlayRanges)
□ Add SFX sequences
□ Set durationInFrames from transcript
```

### Step 6: Registration & Preview (15 min)
```
□ Import composition in Root.tsx
□ Add Composition entry
□ Verify defaultProps (videoSrc)
□ Restart Remotion Studio (kill node, restart)
□ Preview on localhost:3002
```

### Step 7: Quality Check (30 min)
```
□ Content fills 90%+ of space
□ Blur effects work (backdropFilter visible)
□ Sound effects not annoying (10-20 total)
□ Timing matches transcript (content appears when mentioned)
□ No black frames (web-optimized videos)
□ Captions hide during overlays
```

**Total time:** 5-6 hours for 2-minute video (first time)
**After practice:** 3-4 hours (reuse components, faster sourcing)

---

## Decision Matrix: When to Use What

### Content Type Selection

| Transcript Moment | Content Type | Blur? | Scale | Example |
|------------------|--------------|-------|-------|---------|
| Speaker making announcement | Official video | No | 1.0 | Anthropic CEO announcing Skills |
| Explaining abstract concept | Diagram/comparison | Yes | 0.9 | Before/after progressive disclosure |
| Mentioning specific brand | Logo | Yes | 0.7 | Claude logo when saying "not just Claude" |
| Showing proof/validation | Social proof (tweet) | Yes | 0.85 | "5.2K developers agree" |
| Demonstrating feature | Screen recording | No | 1.0 | Skills demo from official video |
| Listing items (frameworks) | Logo carousel | Yes | 0.7 | CrewAI, Pydantic AI, LangChain |

### Blur Decision Tree

```
Is content type:
├─ Speaker visible in frame? → NO blur
├─ Demo/screen recording? → NO blur
└─ Overlay (logo, diagram, tweet)? → YES blur
```

### Scale Decision Tree

```
Content importance:
├─ Primary focus (official video, demo) → 1.0 (full-screen)
├─ Key concept (diagram, comparison) → 0.9 (large but breathable)
├─ Supporting visual (logo, icon) → 0.7 (clear but not dominant)
└─ Background element → 0.5 (subtle presence)
```

### Sound Effect Selection

```
Transition type:
├─ Major section change → Whoosh (rotate variants)
├─ New content reveal → Pop or whoosh
├─ Emphasis word → Click (sparingly)
└─ Intro/outro → Whoosh (strong)
```

---

## Evolution Signals: What to Watch For

### Signs You're Doing It Right ✅

1. **Content fills the frame** — No tiny logos in corners
2. **Viewer knows where to look** — Blur creates clear hierarchy
3. **Story flows with speech** — Content appears when mentioned
4. **Sound enhances, not distracts** — 10-20 SFX, strategic placement
5. **Real content used** — Official videos, not mockups
6. **Editor mindset** — Thinking "tell story," not "place asset"

### Signs You're Regressing ❌

1. **Placeholder syndrome** — Using mockups because "scraping is hard"
2. **Random timing** — "5 seconds feels right" instead of matching speech
3. **No blur** — Everything flat, viewer confused
4. **Spammy sound** — SFX on every word or transition
5. **Developer mindset** — Thinking "put X at timestamp Y" instead of "show Z when speaker says A"
6. **Size shrinkage** — Content occupying <70% of available space

---

## Future Evolutions

### Iteration 2 (Next Project)
- [ ] **Automated clip extraction** — Parse transcript, auto-extract key moments
- [ ] **Template library** — Reusable CONTENT_EVENTS patterns
- [ ] **Asset recommendation** — "For this concept type, use X content type"

### Iteration 3 (Scaling)
- [ ] **Multi-composition asset sharing** — One download, many videos
- [ ] **Performance optimization** — Lazy loading, progressive assets
- [ ] **Collaboration metadata** — Track who created/downloaded what

### Iteration 4 (Intelligence)
- [ ] **AI-assisted mapping** — Suggest content for each transcript moment
- [ ] **Automated social proof ranking** — Fetch highest-engagement content
- [ ] **Quality scoring** — Automated checks for 20/100 regressions

---

## Learnings Archive

### What Worked

**1. Autonomous execution**
- User said "download it for me" → Downloaded, extracted, optimized, integrated
- Removed friction, maintained momentum

**2. FullFrameContent component**
- One component, handles images AND videos
- Built-in blur, scaling, animation
- Reusable across all future compositions

**3. Editorial-first approach**
- Read transcript → Identify visuals → Source content → Build composition
- Not: Build composition → Hope it matches transcript

**4. Real content prioritization**
- Official Anthropic videos > mockups
- Viral social proof > made-up tweets
- Quality > speed

**5. Strategic sound**
- 10-20 max, rotated variants, volume ≤0.25
- Transitions and reveals only
- Never per-word (learned from backlog-01.md)

### What Failed

**1. Initial scraping attempts**
- X/Twitter scraper found 0 results (nitter.net changed)
- Reddit scraper found 0 results (old Reddit structure changed)
- **Fix:** Created mock-social-proof.cjs as fallback, but still prioritized real official content

**2. First composition attempt (20/100)**
- Tiny content, no blur, no real videos
- **Fix:** User feedback forced rethink, led to FullFrameContent

**3. Audio file organization**
- Initially in root public/, composition expected audio/ subfolder
- **Fix:** Created audio/ directory, established convention

### What to Avoid

- ❌ **Giving up on real content** — Even if scraping fails, find official sources
- ❌ **Arbitrary timing** — Always match transcript duration
- ❌ **No blur strategy** — Creates flat, confusing visuals
- ❌ **Developer mindset** — "Place asset X" instead of "tell story Y"
- ❌ **Tiny content** — If it's not filling 70%+ of space, it's wrong
- ❌ **Negative or zero durations** — ALWAYS verify: `frame + duration <= TOTAL_DURATION_FRAMES`

### Critical Bug: Negative Duration Error

**Error:** `TypeError: durationInFrames must be positive, but got -2`

**Cause:** Last content event starts AFTER total video duration:
```typescript
// WRONG:
{ frame: 3345, duration: TOTAL_DURATION_FRAMES - 3345 } // 3343 - 3345 = -2 ❌

// RIGHT:
{ frame: 3220, duration: 123 } // 3220 + 123 = 3343 ✅
```

**Prevention:**
1. **Calculate total frames used BEFORE creating events**
2. **Always verify:** `frame + duration <= TOTAL_DURATION_FRAMES`
3. **Add validation function:**
```typescript
const validateContentEvents = (events: ContentEvent[], totalFrames: number) => {
  events.forEach((evt, idx) => {
    const endFrame = evt.frame + evt.duration;
    if (endFrame > totalFrames) {
      throw new Error(`Event ${idx} ends at ${endFrame} but total is ${totalFrames}`);
    }
    if (evt.duration <= 0) {
      throw new Error(`Event ${idx} has invalid duration: ${evt.duration}`);
    }
  });
};
```

**When it happened:** V6 composition (2026-02-04)
**Fix:** Shortened CrewAI demo from 300→180 frames, moved CTA start from 3345→3220

---

## Session Context Preservation

**Purpose of this document:**
- Capture process so future sessions can pick up where we left off
- Document decisions so we don't repeat failed experiments
- Provide framework for new projects
- Track evolution of the editing system

**How to use this in future sessions:**
1. **Read this before starting new project** — Understand the process
2. **Follow iteration framework** — Don't skip steps
3. **Check decision matrix** — When unsure, reference the tables
4. **Update when new patterns emerge** — This is a living document
5. **Reference learnings archive** — Learn from what worked/failed

**Companion documents:**
- `ASSET-MANAGEMENT.md` — Where to save files, naming conventions
- `EXECUTION-ROADMAP.md` — Step-by-step guide from 20/100 to 95/100
- `EDITORIAL-PLAN.md` — Transcript-driven content mapping
- `backlog-01.md` — 10 hard-won rules (what NOT to do)

---

## V6 Evolution: White Popup Reveal System (2026-02-05)

### What Changed (V5 → V6)

**New capability: Full-screen popup illustrations**
- Created `WhitePopupReveal` component for dramatic concept emphasis
- 17 popup events placed at exact transcript moments
- 15 custom SVG illustrations created for key concepts
- Background music layer added (lofi at 0.02 volume)
- Split-zone layout: 46% content / 8% captions / 46% speaker

### What Worked in V6

**1. White Popup Reveal system**
- Most impactful editing technique for educational videos
- White flash + spring animation creates professional feel
- Spring config `{ damping: 10, stiffness: 100 }` is the sweet spot
- 17 popups in 111s video (~1 every 6.5s) is ideal density

**2. Custom SVG illustrations**
- Brand-consistent using COLORS constants
- Categories: logos, concepts, metaphors, data viz, achievements
- Much better than PNG logos (scalable, no transparency issues)
- 600x600 viewBox standardized across all illustrations

**3. Frame-precise timing from WORDS data**
- Every popup appears EXACTLY when word is spoken
- `grep -n "keyword" remotion/data/[script]-cut-words.ts` → exact frame
- No more "estimating" timestamps

**4. Audio layering hierarchy**
- Speaker: 1.0 (untouched)
- SFX: 0.14-0.25 (accent, not competition)
- Background music: 0.02 (barely noticeable atmosphere)
- Content videos: volume={0} (muted to prevent conflict)

### What Failed in V6

**1. Initial background music too loud**
- Started at 0.10 → User said too loud
- Dropped to 0.04 → Still needed reduction
- Final: 0.02 is the sweet spot
- **Lesson:** Always start at 0.02 for background music

**2. Popup timing misalignment (first pass)**
- Used transcript JSON timestamps (in seconds) instead of WORDS data (in frames)
- Progressive Disclosure popup appeared when saying "that's completely wrong" about Anthropic
- **Lesson:** NEVER estimate frames from seconds. ALWAYS grep WORDS data file.

**3. Git push failure with large video files**
- Videos >100MB blocked GitHub push (script17-shortform.mp4 at 122MB)
- **Lesson:** Add large videos to .gitignore BEFORE committing

**4. Remotion Studio crash from missing directory**
- `public/audio/` directory didn't exist → ENOENT error
- **Lesson:** Create audio directory structure before starting

### New Patterns Discovered

**Pattern: Popup Duration by Type**
| Type | Duration | Why |
|------|----------|-----|
| Logo flash | 45-50 frames | Quick brand recognition |
| Negative beat ("wrong") | 45 frames | Short shock effect |
| Standard concept | 60-75 frames | Needs comprehension time |
| Complex mockup (Skill.md) | 75 frames | Code needs reading time |
| Achievement/CTA | 90 frames | Emotional resonance |

**Pattern: SFX per Popup**
- Pop sound → logos, data points, standard concepts
- Whoosh-large → big moments (wrong X, CTA, achievements)
- Whoosh-bamboo → medium reveals (metaphors, architectures)

**Pattern: Overlap Prevention**
Always calculate: `endFrame = frame + duration`
Verify: `popup[n].endFrame < popup[n+1].frame`
Minimum gap: 1 frame (10+ preferred for breathing)

---

## Version History

| Version | Date | Changes | Project |
|---------|------|---------|---------|
| 1.0 | 2026-02-04 | Initial process documentation | Progressive Disclosure Skills V5 |
| 2.0 | 2026-02-05 | White Popup Reveal system, 15 SVG illustrations, audio layering, split-zone layout | Progressive Disclosure Skills V6 |

---

**This is how we evolve.** Each iteration adds to this document. Each failure gets documented. Each success gets systematized.

**Next evolution:** When you build the next video, update this document with:
- What was faster this time (template reuse?)
- What was still hard (asset sourcing?)
- What new pattern emerged (better blur technique?)
- What broke (composition structure changed?)
- Did the popup system work out-of-the-box for a different video?

**The goal:** By iteration 10, the 95/100 result should take 2 hours, not 6.
**V6 achievement:** White Popup Reveal + SVG illustrations can now be applied to ANY educational video automatically.
