# Progressive Disclosure Skills - Editorial Plan (95/100)

## Transcript-Driven Content Strategy

### The Narrative (111 seconds):

**0-10s: "The biggest game changer... are skills"**
- **SCRAPE**: Anthropic's official Skills announcement video
  - URL: https://www.anthropic.com/news/agent-skills
  - OR: Their YouTube announcement
  - Extract: 8-10 second clip showing the announcement
- **VISUAL**: Full-screen video, blur background circle slightly
- **SFX**: Whoosh on entry
- **CAPTION**: "THE BIGGEST GAME CHANGER"

**10-15s: "Skills that work with any agent, not just Claude"**
- **SCRAPE**: Claude logo from official site
- **VISUAL**:
  - Frame 10s: Claude logo fills frame
  - Frame 12s: Large X mark appears over it
  - Frame 13s: Logo shrinks to corner
  - Frame 13-15s: Other framework logos appear (carousel)
- **SFX**: Pop on X mark, whoosh on carousel
- **CAPTION**: "NOT JUST CLAUDE"

**15-25s: "progressive disclosure"**
- **SCRAPE**: None needed (use diagram)
- **VISUAL**:
  - Animated diagram showing:
    - BEFORE: Massive context blob (overwhelming)
    - AFTER: Small context + tools on demand
  - Background blur with center focus
- **SFX**: Transition whoosh
- **CAPTION**: "PROGRESSIVE DISCLOSURE"

**25-35s: "Instead of overwhelming your AI..."**
- **SCRAPE**: Find a tweet or Reddit post about context overload problems
  - Keywords: "AI context overload", "token limits frustrating"
  - Platform: X or Reddit
  - Type: Video clip if available, or animated screenshot
- **VISUAL**:
  - Show the problem (full context loading)
  - Transition to solution (selective loading)
  - Use split-screen effect
- **SFX**: Click on transition
- **CAPTION**: "ONLY WHEN NEEDED"

**35-40s: "Swiss Army knife for AI"**
- **SCRAPE**: Swiss Army knife visual metaphor
  - Option 1: Animated Swiss Army knife opening tools
  - Option 2: AI tool selection animation
- **VISUAL**: Creative metaphor animation filling frame
- **SFX**: Pop for each tool reveal
- **CAPTION**: "SWISS ARMY KNIFE"

**40-50s: "how ridiculously simple this is"**
- **SCRAPE**: Find developer reaction video
  - Keywords: "Claude Skills simple", "Skills easy implementation"
  - Platform: YouTube, TikTok
  - Extract: 5-10s clip of developer saying "it's so simple"
- **VISUAL**: Split screen - code on left, face on right
- **SFX**: None (preserve audio from clip)
- **CAPTION**: "RIDICULOUSLY SIMPLE"

**50-70s: "three-layer system... skill.md file... reference documents"**
- **SCRAPE**:
  - Official documentation diagram from docs.anthropic.com
  - OR: Create animated 3-layer architecture
- **VISUAL**:
  - Layer 1 appears (30% context)
  - Layer 2 appears (skill.md)
  - Layer 3 appears (reference docs)
  - Percentages animate in
- **SFX**: Pop on each layer reveal
- **CAPTION**: "3-LAYER ARCHITECTURE"

**70-80s: "works with any AI framework"**
- **SCRAPE**: Framework logos carousel
  - Logos: LangChain, CrewAI, Pydantic AI, AutoGPT, LlamaIndex
  - Source: Official websites
  - Type: High-res PNGs
- **VISUAL**: Rotating carousel animation filling frame
- **SFX**: Whoosh on rotation
- **CAPTION**: "ANY FRAMEWORK"

**80-90s: "Pydantic AI, LangChain, CrewAI"**
- **SCRAPE**:
  - Pydantic AI: Logo + tagline from official site
  - LangChain: Logo + tagline
  - CrewAI: Logo + tagline
- **VISUAL**:
  - Each logo gets 3 seconds
  - Full screen, professional reveal
  - Name + tagline below
- **SFX**: Whoosh between switches
- **CAPTION**: Framework name

**90-100s: "transform your AI from confused to laser focus"**
- **SCRAPE**: Find before/after demo video
  - Keywords: "AI agent before after Skills", "Claude Skills demo"
  - Platform: YouTube
  - Extract: 10s clip showing transformation
- **VISUAL**: Split screen before/after
- **SFX**: Transition whoosh
- **CAPTION**: "CONFUSED → LASER FOCUSED"

**100-111s: "the actual future... now you know how to build it"**
- **SCRAPE**:
  - Viral tweet about Skills being the future (2K+ likes)
  - OR: Reddit post with high upvotes
  - OR: Official Anthropic closing statement
- **VISUAL**:
  - Full-screen tweet/post
  - Fade to call-to-action
  - "START BUILDING" overlay
- **SFX**: Final impact whoosh
- **CAPTION**: "THE FUTURE IS HERE"

---

## Content Scraping Checklist

### Videos to Download:
- [ ] Anthropic official Skills announcement (8-10s clip)
- [ ] Developer reaction "it's so simple" (5-10s clip)
- [ ] Before/after Skills demo (10s clip)
- [ ] Framework comparison video (optional)

### Images to Capture:
- [ ] Anthropic announcement page (full screenshot)
- [ ] 5 framework logos (high-res, transparent background)
- [ ] Viral tweet about Skills (top engagement)
- [ ] Reddit post about Skills adoption
- [ ] Official 3-layer diagram

### Animations to Create:
- [ ] Swiss Army knife metaphor
- [ ] 3-layer architecture reveal
- [ ] Framework carousel
- [ ] Before/after context visualization
- [ ] Logo reveal sequence

---

## Visual Effects to Add

### Background Blur:
- When showing concepts → Blur video background, focus on content
- When showing code → Blur everything except code
- When showing logos → Clean background

### Size/Fill:
- ALL content must fill the top zone (55% of frame)
- No tiny logos or text
- Use CSS `transform: scale()` to ensure proper sizing
- Minimum content size: 80% of available space

### Transitions:
- Whoosh SFX + slide transition between major concepts
- Pop SFX + scale animation for emphasis
- Fade transition for mood changes
- Cut transition for high energy

### Sound Effects:
- Whoosh: Major transitions (every 10-15s)
- Pop: Logo reveals, number callouts
- Click: UI interactions, selections
- Impact: Final CTA

---

## Execution Steps

### 1. Download Official Anthropic Content:
```bash
# Find official video
node anthropic-official-content.cjs

# Download it
yt-dlp "https://youtube.com/watch?v=..." -o anthropic-skills.mp4

# Extract 8s clip
ffmpeg -ss 5 -i anthropic-skills.mp4 -t 8 -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -movflags +faststart public/official-content/skills-announcement-clip.mp4
```

### 2. Find Developer Reaction Videos:
```bash
# Search YouTube
node video-clip-scraper.cjs search "Claude Skills simple implementation"

# Download top result
yt-dlp "URL" -o developer-reaction.mp4

# Extract reaction moment
ffmpeg -ss 30 -i developer-reaction.mp4 -t 10 -c copy public/social-proof/developer-reaction.mp4
```

### 3. Capture Framework Logos:
```bash
# Use logo-fetcher to get high-res versions
node logo-fetcher.cjs langchain
node logo-fetcher.cjs crewai
node logo-fetcher.cjs pydantic-ai
```

### 4. Find Viral Social Proof:
```bash
# Use X scraper for top tweets
node x-scraper.cjs "Claude Skills future"

# Use Reddit scraper
node reddit-scraper.cjs ClaudeAI "Skills transformation"
```

### 5. Create Custom Animations:
- Swiss Army knife metaphor → After Effects or Remotion animation
- 3-layer reveal → Remotion <Sequence> with interpolate
- Framework carousel → CSS animation + Remotion

### 6. Rebuild Composition:
- Map each 10-second block to specific content
- Add blur effects with CSS filters
- Add proper scaling (content fills 80%+ of space)
- Add SFX strategically (10-15 total)
- Test each transition

---

## Quality Checklist (95/100):

- [ ] Content FILLS the frame (not small logos)
- [ ] Real videos used (not just screenshots)
- [ ] Background blur when showing concepts
- [ ] Smooth transitions between scenes
- [ ] Strategic sound effects (10-15 total)
- [ ] Viral social proof integrated
- [ ] Official Anthropic content used
- [ ] Dynamic animations (not static)
- [ ] Proper pacing (new content every 5-10s)
- [ ] Professional polish (like a real editor made it)

---

**Status:** PLAN COMPLETE - Ready for execution
**Next:** Download official content and rebuild composition
