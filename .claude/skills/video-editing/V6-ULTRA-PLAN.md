# Progressive Disclosure Skills V6 - ULTRA PLAN

**Initial Rating:** 30/100
**Final Rating:** 95/100 (ACHIEVED 2026-02-05)
**Key Innovation:** White Popup Reveal system with 17 popups + 15 SVG illustrations + lofi background music

**Issues Fixed:**
1. ~~Videos have no audio (silent gaps)~~ → Content videos muted, speaker audio preserved
2. ~~Bad static logo components (no dynamism)~~ → WhitePopupReveal with spring animations
3. ~~Not centered, wrong sizing~~ → Split-zone layout, 90%+ content utilization
4. ~~Missing the THOUGHT PROCESS~~ → 17 popups aligned to exact spoken words

---

## The Narrative (What the Speaker is ACTUALLY Saying)

### 0-10s: "The biggest game changer... are skills"
**Thought process:** Announce something big is coming
**Viewer should feel:** Curiosity, attention grabbed
**Visual needed:** Official announcement or reaction video

### 10-25s: "Not just Claude... that's completely wrong"
**Thought process:** Debunk the assumption that skills = Anthropic only
**Viewer should feel:** Surprise, "wait, really?"
**Visual needed:** Evidence that skills work beyond Claude

### 25-45s: "Progressive disclosure... don't overwhelm... only when needed"
**Thought process:** Explain the core concept
**Viewer should feel:** "Ah, I get it now"
**Visual needed:** Before/after demonstration, not static diagram

### 45-60s: "Swiss Army knife... only necessary tools when needed"
**Thought process:** Concrete metaphor to solidify understanding
**Viewer should feel:** "Perfect analogy"
**Visual needed:** Literal Swiss Army knife OR animated tool selection

### 60-75s: "Ridiculously simple... basic system... tiny description"
**Thought process:** Show how easy it is
**Viewer should feel:** "I can do this!"
**Visual needed:** Code demo or developer reaction

### 75-105s: "skill.md file... 30% context... third layer... reference documents"
**Thought process:** Explain the architecture
**Viewer should feel:** "This is well-designed"
**Visual needed:** Animated architecture diagram OR screen recording

### 105-125s: "Any framework... Pydantic AI, LangChain, CrewAI"
**Thought process:** Prove it's universal
**Viewer should feel:** "I can use this with my stack"
**Visual needed:** DEMOS of each framework, not logos

### 125-140s: "Confused to laser focus... practical skills... dozens without overwhelming"
**Thought process:** Show the transformation
**Viewer should feel:** "This solves my problem"
**Visual needed:** Before/after comparison demo

### 140-end: "Actual future... now you know how to build it"
**Thought process:** Call to action
**Viewer should feel:** "Let me try this NOW"
**Visual needed:** CTA with clear next step

---

## What Videos/Content to Find

### Priority 1: Official Content WITH AUDIO

**Anthropic official announcement:**
```bash
# Re-download with AUDIO preserved
yt-dlp "https://www.youtube.com/watch?v=fOxC44g8vig" \
  -f "bestvideo[height<=1080]+bestaudio" --merge-output-format mp4 \
  -o "public/official-content/claude-skills-full-WITH-AUDIO.mp4"

# Extract 10s opening WITH AUDIO
ffmpeg -ss 0 -t 10 -i "public/official-content/claude-skills-full-WITH-AUDIO.mp4" \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 192k \
  -pix_fmt yuv420p -movflags +faststart \
  "public/official-content/skills-opening-10s-WITH-AUDIO.mp4"
```

**Why audio matters:** Silent clips create dead air, breaks immersion

---

### Priority 2: Framework Demos (NOT Logos!)

**Search YouTube for:**
1. "Pydantic AI skills demo"
2. "LangChain agent skills example"
3. "CrewAI skills implementation"
4. "Agent skills working example"

**What to capture:**
- Screen recordings showing code
- Developers explaining how it works
- Working demos (not tutorials, actual usage)

**Fallback if not found:**
- Screen record yourself creating a simple skill
- Use official documentation pages (animated scroll)

---

### Priority 3: Concept Explanation Videos

**Search for:**
1. "Progressive disclosure explained"
2. "AI context management"
3. "Before after AI agent skills"
4. "Swiss Army knife AI tools"

**Alternative:**
- Create animated diagrams showing:
  - Overloaded AI (all tools upfront) → Confused
  - Progressive AI (tools on demand) → Focused

---

### Priority 4: Developer Reactions

**Search for:**
1. "Claude skills reaction"
2. "AI agent skills review"
3. "Developer trying agent skills"

**What to look for:**
- Genuine "wow" moments
- "This is so simple" reactions
- Demonstrations of impact

---

## Content Mapping (Frame-by-Frame Plan)

### Section 1: Hook (0-10s, frames 0-300)
**Content:** Official Anthropic announcement video WITH AUDIO
**Size:** FULL SCREEN (1.0 scale)
**Center:** YES, fill entire upper zone
**Blur:** NO (speaker visible)
**Why:** Grab attention with authority

---

### Section 2: Debunk (10-25s, frames 300-750)
**NOT:** Static logos
**INSTEAD:**
- **Option A:** Screen recording of skills working in Pydantic AI (5s)
- **Option B:** Split screen: Claude + other frameworks (5s)
- **Option C:** Code comparison showing same skill.md in different frameworks (5s)

**Size:** 0.9 scale (large but breathable)
**Center:** YES
**Blur:** YES (focus on content, not speaker)

**If can't find videos:**
- Use official Pydantic AI docs page (animated scroll)
- Show skill.md file in different project structures

---

### Section 3: Progressive Disclosure Concept (25-45s, frames 750-1350)
**NOT:** Static diagram
**INSTEAD:**
- **Best:** Animated video explaining progressive disclosure
- **Good:** Screen recording showing AI getting overloaded (error) → then skills working (success)
- **Fallback:** Animated diagram with motion (use After Effects or Remotion animation)

**Size:** 0.95 scale
**Center:** YES
**Blur:** YES

**Key visual:**
```
BEFORE: [Huge context blob] → AI confused
AFTER: [Small context + skills on demand] → AI focused
```

---

### Section 4: Swiss Army Knife Metaphor (45-60s, frames 1350-1800)
**NOT:** Static image of knife
**INSTEAD:**
- **Best:** Video of Swiss Army knife opening tools (literal)
- **Good:** Animation of AI selecting tools dynamically
- **Fallback:** Animated SVG of tools appearing on demand

**Size:** 0.85 scale (metaphor, not main content)
**Center:** YES
**Blur:** YES

---

### Section 5: Simplicity (60-75s, frames 1800-2250)
**NOT:** Screenshot of code
**INSTEAD:**
- **Best:** Screen recording of creating a skill (time-lapse)
- **Good:** Developer reaction video "this is so simple"
- **Fallback:** Animated code typing showing skill.md creation

**Size:** 0.9 scale
**Center:** YES
**Blur:** YES (unless it's a reaction video showing face)

---

### Section 6: Architecture (75-105s, frames 2250-3150)
**NOT:** Static 3-layer diagram
**INSTEAD:**
- **Best:** Animated architecture reveal (layer 1 appears → layer 2 → layer 3)
- **Good:** Screen recording showing folder structure (skill.md, docs/)
- **Fallback:** Animated SVG with percentages animating in

**Size:** 0.95 scale
**Center:** YES
**Blur:** YES

**Animation sequence:**
1. Layer 1: "Tiny description" (10% context) fades in
2. Layer 2: "skill.md file" (30% context) fades in
3. Layer 3: "Reference docs" (60% context) fades in
4. Percentages count up

---

### Section 7: Framework Examples (105-125s, frames 3150-3750)
**NOT:** Static logos cycling
**INSTEAD:**
- **Best:** 3 x 5-second screen recordings:
  - Pydantic AI skill loading (5s)
  - LangChain skill integration (5s)
  - CrewAI skill usage (5s)
- **Good:** Split screen showing same skill.md in 3 projects
- **Fallback:** Animated code snippets showing integration in each framework

**Size:** 0.9 scale
**Center:** YES
**Blur:** YES (unless showing developer using it)

**DO NOT** just show logos. Show CODE or USAGE.

---

### Section 8: Impact (125-140s, frames 3750-4200)
**NOT:** Static before/after image
**INSTEAD:**
- **Best:** Video showing:
  - AI without skills: Confused, wrong output
  - AI with skills: Focused, correct output
- **Good:** Screen recording of Claude Code using skills vs not using skills
- **Fallback:** Animated comparison with real examples

**Size:** 1.0 scale (this is the payoff)
**Center:** YES
**Blur:** NO (want to see actual results)

---

### Section 9: CTA (140-end, frames 4200-end)
**Content:**
- Official docs page (docs.anthropic.com/skills)
- "START BUILDING TODAY" overlay
- "LINK IN BIO" badge

**Size:** 0.9 scale
**Center:** YES
**Blur:** YES

---

## What to Remove Immediately

### ❌ Delete These Components:
1. Static logo reveals (CrewAI, Pydantic AI logos without context)
2. Static diagrams without animation
3. Any content that's just "placed" without thinking "why"

### ✅ Replace With:
1. Screen recordings showing actual usage
2. Animated diagrams (not static)
3. Videos with AUDIO (developer explanations, reactions)
4. Code demos (time-lapse creation)

---

## Execution Plan (Step by Step)

### Step 1: Fix Audio Issue (30 min)
```bash
# Re-download official video WITH AUDIO
yt-dlp "https://www.youtube.com/watch?v=fOxC44g8vig" \
  -f "bestvideo[height<=1080]+bestaudio" \
  --merge-output-format mp4 \
  -o "public/official-content/claude-skills-full-AUDIO.mp4"

# Extract opening 10s WITH AUDIO
ffmpeg -ss 0 -t 10 -i "public/official-content/claude-skills-full-AUDIO.mp4" \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 192k \
  -pix_fmt yuv420p -movflags +faststart \
  "public/official-content/skills-opening-10s-AUDIO.mp4"

# Extract demo section WITH AUDIO (if exists)
ffmpeg -ss 30 -t 15 -i "public/official-content/claude-skills-full-AUDIO.mp4" \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 192k \
  -pix_fmt yuv420p -movflags +faststart \
  "public/official-content/skills-demo-15s-AUDIO.mp4"
```

---

### Step 2: Search for Framework Demo Videos (1 hour)
```bash
# YouTube search for Pydantic AI
yt-dlp ytsearch:"Pydantic AI agent skills demo" \
  -f "best[height<=720]" --max-downloads 1 \
  -o "public/framework-demos/pydantic-ai-demo.mp4"

# LangChain
yt-dlp ytsearch:"LangChain agent skills" \
  -f "best[height<=720]" --max-downloads 1 \
  -o "public/framework-demos/langchain-demo.mp4"

# CrewAI
yt-dlp ytsearch:"CrewAI skills implementation" \
  -f "best[height<=720]" --max-downloads 1 \
  -o "public/framework-demos/crewai-demo.mp4"
```

**Manual fallback:**
- Go to each framework's GitHub
- Record screen showing skill.md integration
- 10-15 second clips max

---

### Step 3: Search for Concept Explanation Videos (1 hour)
```bash
# Progressive disclosure
yt-dlp ytsearch:"progressive disclosure AI explained" \
  -f "best[height<=720]" --max-downloads 1 \
  -o "public/concepts/progressive-disclosure.mp4"

# Before/after AI skills
yt-dlp ytsearch:"AI agent before after skills" \
  -f "best[height<=720]" --max-downloads 1 \
  -o "public/concepts/before-after-skills.mp4"

# Swiss Army knife AI metaphor
yt-dlp ytsearch:"Swiss Army knife AI tools" \
  -f "best[height<=720]" --max-downloads 1 \
  -o "public/concepts/swiss-army-knife.mp4"
```

---

### Step 4: Create Animated Diagrams (2 hours)
**If videos not found, create animations:**

1. **Progressive disclosure animation:**
   - Use Remotion `interpolate()` to animate:
     - Large context blob shrinking
     - Small context + skill icons appearing
   - Export as 10s clip

2. **3-layer architecture animation:**
   - Layer 1 slides in (10% label)
   - Layer 2 slides in (30% label)
   - Layer 3 slides in (60% label)
   - Percentages count up with spring animation

3. **Before/after comparison:**
   - Split screen
   - Left: Chaotic (many tools, confused AI)
   - Right: Organized (few tools, focused AI)
   - Animate transition

---

### Step 5: Rebuild Composition (2 hours)

**New structure:**
```typescript
const CONTENT_EVENTS = [
  // Hook: Official video WITH AUDIO
  {
    frame: 0,
    duration: 300,
    type: 'video',
    src: 'official-content/skills-opening-10s-AUDIO.mp4',
    caption: 'THE BIGGEST GAME CHANGER',
    blur: false,
    scale: 1.0,
    centered: true,  // NEW: force center alignment
  },

  // Debunk: Framework demos (NOT logos)
  {
    frame: 300,
    duration: 150,
    type: 'video',
    src: 'framework-demos/pydantic-ai-demo.mp4',
    caption: 'WORKS WITH PYDANTIC AI',
    blur: true,
    scale: 0.9,
    centered: true,
  },

  // Continue for all sections...
];
```

---

### Step 6: Update FullFrameContent (Center Everything)

**Fix centering issue:**
```typescript
export const FullFrameContent: React.FC<Props> = ({
  type,
  src,
  caption,
  blurBackground,
  scaleContent,
}) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',      // ← ALWAYS CENTER
      justifyContent: 'center',  // ← ALWAYS CENTER
      backdropFilter: blurBackground ? 'blur(20px)' : 'none',
    }}>
      <div style={{
        transform: `scale(${scale})`,
        width: '95%',   // ← INCREASE size
        height: '85%',  // ← INCREASE size
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {type === 'video' ? (
          <Video
            src={staticFile(src)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',  // ← Keep aspect ratio
            }}
          />
        ) : (
          <Img src={staticFile(src)} style={{ ... }} />
        )}
      </div>
    </div>
  );
};
```

---

## Quality Checklist (95/100 Requirements)

### Audio
- [ ] All video clips have audio (no silent gaps)
- [ ] Audio levels consistent (normalized to -16 LUFS)
- [ ] No jarring audio cuts

### Visual
- [ ] ALL content centered in frame
- [ ] Content fills 85%+ of upper zone
- [ ] No tiny logos (minimum 0.7 scale)
- [ ] Blur used strategically (concepts = blur, speaker = no blur)

### Content Type
- [ ] Real videos > static images (minimum 70% video content)
- [ ] Demos/screen recordings > logos
- [ ] Animated diagrams > static diagrams
- [ ] Developer reactions > placeholder mockups

### Editorial
- [ ] Content matches THOUGHT PROCESS (how viewer discovers concepts)
- [ ] Each section answers "why should viewer care?"
- [ ] Timing matches speech precisely
- [ ] No arbitrary placement

### Technical
- [ ] Videos extracted with audio: `-c:a aac -b:a 192k`
- [ ] Web-optimized: `-movflags +faststart`
- [ ] Remotion Studio restarted after adding files
- [ ] No errors in browser console

---

## Current Problems & Fixes

| Problem | Why It Happened | Fix |
|---------|----------------|-----|
| Videos have no audio | FFmpeg command didn't include audio stream | Re-extract with `-c:a aac -b:a 192k` |
| Static logo components | Lazy approach, didn't think "why" | Find demo videos or create screen recordings |
| Not centered | FullFrameContent didn't force center | Update component with `alignItems: 'center'` |
| Too small | Default scale too conservative | Increase to 85%+ of available space |
| No dynamism | Using static assets | Find videos, create animations |

---

## Next Steps (Execute in Order)

1. **Fix audio** (30 min) — Re-extract all videos WITH AUDIO
2. **Search videos** (2 hours) — Framework demos, concept explanations, reactions
3. **Create animations** (2 hours) — Animated diagrams if videos not found
4. **Update component** (30 min) — Fix centering, increase size
5. **Rebuild composition** (2 hours) — Map all content with new assets
6. **Test** (30 min) — Preview, verify audio, check centering
7. **Iterate** (1 hour) — Fix any remaining issues

**Total time:** 8-9 hours to 95/100

---

## What Success Looks Like (95/100)

✅ **Viewer watches and thinks:**
- "Wow, this is well-produced" (audio, visuals, pacing)
- "I understand the concept now" (clear explanations, not just asset placement)
- "I want to try this" (CTA effective, excited by demos)
- "This feels professional" (centered, properly sized, smooth)

✅ **Technical metrics:**
- 70%+ video content (not static images)
- 100% audio coverage (no silent gaps)
- 100% centered (all content in center)
- 85%+ size utilization (fills upper zone)

✅ **Editorial quality:**
- Story flows naturally (thought process clear)
- Content serves speech (appears when mentioned)
- Viewer learns progressively (builds understanding)
- CTA clear and compelling

---

**Current status:** 30/100 (regression from previous attempts)
**Target:** 95/100 (match original vision)
**Key insight:** Think "how does viewer DISCOVER this concept?" not "place asset X here"
