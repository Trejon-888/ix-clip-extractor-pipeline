# Video Editing System Documentation

**Version:** 1.0
**Last Updated:** 2026-02-04
**Status:** Production system evolved from Progressive Disclosure Skills V5

---

## 🎯 Purpose

This documentation system preserves the knowledge gained from taking a video composition from **20/100 to 95/100 quality**. It captures not just what to do, but WHY, so future iterations can build on these learnings.

---

## 📖 Document Index

### For Quick Start
👉 **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)** — Read this first
- 6-step core process
- Critical rules (what MUST happen)
- Decision matrices (when to use what)
- Code patterns and commands
- Quality checklist

**When to use:** Starting any new video editing session

---

### For Understanding
📘 **[EVOLUTION-PROCESS.md](EVOLUTION-PROCESS.md)** — The journey from 20/100 to 95/100
- What was wrong (20/100 diagnosis)
- What we fixed (process redesign)
- Decision frameworks (blur, scale, sound)
- Learnings archive (what worked, what failed)
- Evolution signals (how to spot regression)

**When to use:** Understanding WHY we do things this way, or when something isn't working

---

### For Asset Management
🗂️ **[ASSET-MANAGEMENT.md](ASSET-MANAGEMENT.md)** — Complete file organization system
- Directory structure
- Asset categories (official content, social proof, logos, audio, diagrams)
- Naming conventions
- Download and extraction workflows
- Composition asset referencing
- Troubleshooting

**When to use:** Looking up where to save files, how to name them, or how to download content

---

### For Step-by-Step Execution
🛠️ **[EXECUTION-ROADMAP.md](EXECUTION-ROADMAP.md)** — Original guide from 20/100 to 95/100
- Phase-by-phase execution plan
- Download commands for official content
- Component creation patterns
- Quality checklist
- Immediate next steps

**When to use:** Following a proven path from raw content to polished result

---

### For Editorial Reference
✍️ **[EDITORIAL-PLAN.md](EDITORIAL-PLAN.md)** — Example transcript-driven content strategy
- 111-second timeline breakdown
- Content scraping checklist
- Visual effects mapping
- Execution steps

**When to use:** Example of how to map content to transcript moments

---

### For Process Integration
🎬 **[SKILL.md](SKILL.md)** — The main skill definition
- 10-phase editing process
- Component library reference
- Illustration types
- Workflow summary

**When to use:** Formal reference for the video-editing skill structure

---

### For Troubleshooting
🔧 **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** — Common errors and fixes
- Negative duration errors
- Silent video clips
- Content not centered
- Asset not found errors
- Blur effects not working
- Prevention checklists

**When to use:** Something broke, error message, unexpected behavior

---

## 🚀 Getting Started

### If you're new to this system:

```
1. Read QUICK-REFERENCE.md (10 minutes)
   → Understand the 6-step process and critical rules

2. Scan EVOLUTION-PROCESS.md (20 minutes)
   → Learn why we do things this way

3. Follow QUICK-REFERENCE.md 6-step process for your video
   → Transcript analysis → Content sourcing → Editorial mapping →
     Sound design → Component integration → Preview

4. Reference ASSET-MANAGEMENT.md when organizing files
   → Know where everything goes

5. Update EVOLUTION-PROCESS.md with new learnings
   → Capture what worked/failed for next iteration
```

---

## 🎨 The Core Philosophy

### Think Like an Editor, Not a Developer

**Developer mindset (20/100):**
> "Let me place this asset at timestamp 5 seconds"

**Editor mindset (95/100):**
> "When the speaker says 'not just Claude,' the viewer should SEE the Claude logo with an X mark, then other framework logos, to UNDERSTAND the claim visually"

### Content Serves the Transcript

The transcript dictates:
- **What** to show (concept, brand, demo, proof)
- **When** to show it (when mentioned, not arbitrarily)
- **How long** to show it (match spoken duration)

Your job: Find the BEST real content to illustrate each moment.

### Quality > Speed

- Real content > mockups
- Official videos > screenshots
- Viral social proof > made-up tweets
- Proper sizing (90%+ of frame) > quick placement

---

## 📊 Quality Benchmarks

### 20/100 (What to Avoid)
❌ Content occupies <70% of space
❌ No blur effects (everything flat)
❌ Using placeholders instead of real content
❌ Arbitrary timing (not matching transcript)
❌ Developer mindset ("place asset X")

### 95/100 (What to Achieve)
✅ Content fills 90%+ of space
✅ Clear visual hierarchy (blur used strategically)
✅ Real scraped content (official videos, viral social proof)
✅ Editorial timing (appears when mentioned)
✅ Editor mindset ("tell story")

---

## 🔄 Evolution Process

After each project:

1. **What was faster?**
   (Template reuse? Asset library already populated?)

2. **What was still hard?**
   (Asset sourcing? Timing precision? Component integration?)

3. **What new pattern emerged?**
   (Better blur technique? New content type? Improved workflow?)

4. **What broke?**
   (Composition structure changed? Remotion API update?)

5. **Update EVOLUTION-PROCESS.md**
   (Document learnings for next iteration)

**Goal:** By iteration 10, the 95/100 result should take 2 hours, not 6.

---

## 🛠️ Tools & Commands Reference

### Download Official Content
```bash
yt-dlp "URL" -f "best[height<=1080]" -o "public/official-content/[name]-full.mp4"
```

### Extract Web-Optimized Clip
```bash
ffmpeg -ss START -t DURATION -i "full.mp4" \
  -c:v libx264 -preset medium -crf 23 \
  -pix_fmt yuv420p -movflags +faststart \
  "public/official-content/[name]-10s.mp4"
```

### Scrape Social Proof
```bash
node remotion/scripts/content-creation/x-scraper.cjs "search term"
node remotion/scripts/content-creation/reddit-scraper.cjs --query "term"
node remotion/scripts/content-creation/mock-social-proof.cjs  # Fallback
```

---

## 📁 Asset Organization Quick Map

```
public/
├── official-content/      # Real scraped official videos & docs
├── social-proof/x/        # Viral tweets with engagement metrics
├── social-proof/reddit/   # High-upvote posts
├── logos/                 # Framework/platform logos (transparent PNG)
├── audio/                 # Sound effects (whoosh, pop, click)
└── section-N/             # Project-specific diagrams
```

**Naming conventions:**
- Videos: `[name]-[duration]s.mp4`
- Social proof: `tweet-[N]-[likes]-likes.png`
- Logos: `[framework-name]-logo.png`

---

## 🎓 Lessons Learned (Progressive Disclosure V5)

### What Worked
✅ Autonomous execution (download → extract → optimize → integrate)
✅ FullFrameContent component (fills 90%+, blur support)
✅ Editorial-first approach (transcript → visuals → build)
✅ Real content prioritization (official videos > mockups)
✅ Strategic sound (10-20 max, rotated variants)

### What Failed
❌ Initial scraping (X/Twitter, Reddit structure changed)
❌ First composition (20/100, tiny content, no blur)
❌ Audio in root (needed audio/ subdirectory)

### What to Avoid
Never give up on real content
Never use arbitrary timing
Never skip blur strategy
Never think like developer

---

## 📝 Version History

| Version | Date | Project | Changes |
|---------|------|---------|---------|
| 1.0 | 2026-02-04 | Progressive Disclosure Skills V5 | Initial documentation system |

---

**Start here:** [QUICK-REFERENCE.md](QUICK-REFERENCE.md)

**Questions?** Check [EVOLUTION-PROCESS.md](EVOLUTION-PROCESS.md) for the "why"

**Need details?** Reference [ASSET-MANAGEMENT.md](ASSET-MANAGEMENT.md)
