# Quick Reference: Video Editing System (V2)

**Use this:** When starting a new video editing session
**Read first:** EVOLUTION-PROCESS.md for full context
**Reference:** ASSET-MANAGEMENT.md for detailed specifications
**Version:** 3.0 (Updated 2026-02-10 with v2 tier system, PhraseCaption, CTA decision flow)

---

## The Core Process (8 Steps)

```
1. TRANSCRIPT ANALYSIS (30 min)
   Read WORDS data (.ts file) → Identify visual moments → Mark sections
   ⚠️ Use WORDS data frames, NOT transcript JSON timestamps

2. CONTENT SOURCING (1-2 hours)
   Official videos → Social proof → Logos → Diagrams → All in public/

3. EDITORIAL MAPPING (1 hour)
   For each moment: What should viewer SEE when speaker says X?

4. POPUP ILLUSTRATION DESIGN (1-2 hours) ← NEW IN V2
   Identify 10-20 popup moments → Create SVG illustrations
   Categories: logos, concepts, metaphors, data viz, achievements

5. POPUP EVENTS MAPPING (30 min) ← NEW IN V2
   Build POPUP_EVENTS array → Exact frames from WORDS data
   Verify NO overlaps (endFrame < next startFrame)

6. SOUND DESIGN (30 min)
   Content transitions = whoosh, Popup reveals = pop/whoosh
   Background music = lofi at 0.02 volume
   Max 10-20 content SFX + 1 per popup

7. COMPONENT INTEGRATION (1 hour)
   Build CONTENT_EVENTS + POPUP_EVENTS + SFX_EVENTS arrays
   Map to FullFrameContent + WhitePopupReveal sequences

8. PREVIEW & ITERATE (30 min)
   Register in Root.tsx → Restart studio → Check quality
```

---

## Critical Rules

### Content Display
- Fill 90%+ of available space (not tiny)
- Blur background when showing concepts (backdropFilter: blur(20px))
- Map to transcript (appears when mentioned, not randomly)
- Use real scraped content (official videos > mockups)

### Popup System (NEW)
- **ALWAYS use WORDS data** for frame timing (grep the .ts file)
- 10-20 popups per video (1 every 5-8 seconds)
- Verify no overlaps before rendering
- Duration: 45 frames (logo) / 60-75 frames (concept) / 90 frames (CTA)
- Each popup gets a SFX (pop or whoosh)

### Audio Mixing (NEW)
- Speaker voiceover: 1.0 (untouched)
- Sound effects: 0.14-0.25
- Background music: 0.02-0.04 (barely noticeable)
- Content videos: volume={0} (muted)

### Technical
- Web-optimize videos (`-movflags +faststart`)
- Use staticFile() for all asset references
- Restart Remotion Studio after adding assets
- Sound effects: 10-20 content SFX max (strategic, not spammy)
- Create public/audio/ directory before starting

### Mindset
- Think like editor ("tell story") not developer ("place asset")
- Content serves transcript (not the other way around)
- Quality > speed (find real content, don't settle for placeholders)
- Every popup reinforces what's being said at that exact moment

---

## Asset Organization

```
public/
├── official-content/          # Official videos/docs from source
│   ├── [product]-full.mp4    # Raw download
│   └── [product]-10s.mp4     # Extracted clip (web-optimized)
├── social-proof/x/            # Viral tweets (engagement in filename)
├── social-proof/reddit/       # High-upvote posts
├── logos/                     # Transparent PNGs (512px+)
├── audio/                     # Sound effects + background music
│   ├── whoosh-*.mp3          # Transition sounds
│   ├── pop-*.mp3             # Popup sounds
│   └── background-music.mp3  # Lofi chill background
├── section-N/                 # Project-specific diagrams
└── [source-video].mp4         # Cut video from video-cutting skill

remotion/lib/illustrations/    # Custom SVG illustration components
├── AnthropicLogo.tsx          # Brand logos
├── SwissArmyKnife.tsx         # Metaphor illustrations
├── ProgressiveDisclosureConcept.tsx  # Concept diagrams
└── FutureOfAI.tsx             # Achievement/CTA visuals
```

---

## Popup Decision Matrix (NEW)

| What Speaker Says | Popup Type | Duration | SFX |
|------------------|------------|----------|-----|
| Brand name (Anthropic, etc.) | Logo SVG | 45-50 frames | pop |
| "That's wrong/bad" | Red X / negative visual | 45 frames | whoosh-large |
| Core concept explained | Concept diagram SVG | 60-75 frames | pop |
| Metaphor (Swiss Army knife) | Metaphor illustration | 70 frames | whoosh-bamboo |
| Number/statistic (30%) | Data visualization | 55 frames | pop |
| Achievement/empowerment | Achievement visual | 75-90 frames | whoosh-large |
| Final CTA | Inspiring graphic | 90 frames | whoosh-large |

### v2 Tier Decision Matrix (Short-Form Clips)

| Moment Type | Tier | Component | Duration | Why |
|-------------|------|-----------|----------|-----|
| WOW moment (core magic) | Tier 1 | `AppleStylePopup` | 65-75 frames | Full-screen takeover, maximum impact |
| Core concept (main idea) | Tier 1 | `AppleStylePopup` | 70-80 frames | Full-screen, drive home the point |
| Platform/tool mention | Tier 2 | `FloatingCard` | 50-55 frames | Speaker visible, quick brand flash |
| Result/proof | Tier 2 | `FloatingCard` | 50-55 frames | Supporting evidence, don't interrupt |
| Detail/metadata | Tier 2 | `FloatingCard` | 45-50 frames | Quick info, speaker stays visible |
| Brand mention | Tier 2 | `FloatingCard` | 45-50 frames | Logo icon, caption, not full-screen |

**RULE:** Max 2 Tier 1 per clip. Everything else is Tier 2.

### v2 CTA Decision Matrix

| Video Source | CTA Text | Why |
|-------------|----------|-----|
| Long-form YouTube extract | "WATCH THE FULL VIDEO" + tutorial title | Drive viewers to the full content |
| Standalone demo | "FOLLOW FOR MORE" | Build following |
| Trending reaction | "FOLLOW FOR AI UPDATES" | Capitalize on trend interest |
| Educational tip | "SAVE & SHARE" | Maximize virality |
| Behind-the-scenes | "FOLLOW THE JOURNEY" | Personal connection |

### v2 Caption Style Decision

| Video Type | Component | Chunk Size | Why |
|-----------|-----------|-----------|-----|
| Short-form clip (<90s) | `PhraseCaption` | 3-5 words | Fast reads, punchy rhythm |
| Full composition (2+ min) | `FullWidthCaption` | Word-by-word | Educational pacing |
| Announcement/news | Word-by-word with overlay hiding | 1 word | Dramatic emphasis |

---

## Content Type Decision Matrix

| What Speaker Says | Show This (Top Zone) | Blur? | Scale |
|------------------|-----------|-------|-------|
| Announcement/intro | Official video | No | 1.0 |
| Abstract concept | Diagram/comparison | Yes | 0.9 |
| Specific brand | Logo | Yes | 0.7 |
| Proof/validation | Social proof (tweet) | Yes | 0.85 |
| Feature demo | Screen recording | No | 1.0 |

---

## Code Patterns

### CONTENT_EVENTS Array (Top Zone)
```typescript
const CONTENT_EVENTS = [
  {
    frame: 5,                    // When to show (frame number)
    duration: 300,               // How long (frames, match speech duration)
    type: 'video' as const,      // 'video' or 'image'
    src: 'official-content/clip.mp4',  // Path relative to public/
    caption: 'TEXT',             // Reference text
    blur: false,                 // Blur background?
    scale: 1.0,                  // 0.7-1.0 (1.0 = full-screen)
  },
];
```

### POPUP_EVENTS Array (Full Screen) ← NEW
```typescript
import { WhitePopupReveal } from "../components/WhitePopupReveal";
import { MyIllustration } from "../lib/illustrations/MyIllustration";

const POPUP_EVENTS = [
  {
    frame: 347,                           // EXACT frame from WORDS data
    duration: 60,                         // 45-90 frames
    illustration: <MyIllustration />,     // SVG component
    caption: 'KEYWORD',                   // ALL CAPS, 1-3 words
  },
];

// Render in composition:
<div style={{ position: 'absolute', zIndex: 100, top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
  {POPUP_EVENTS.map((evt, idx) => (
    <Sequence key={`popup-${idx}`} from={evt.frame} durationInFrames={evt.duration} premountFor={15}>
      <WhitePopupReveal
        durationInFrames={evt.duration}
        illustration={evt.illustration}
        caption={evt.caption}
        blurIntensity={16}
        illustrationSize={600}
      />
    </Sequence>
  ))}
</div>
```

### Sound Effects
```typescript
const SFX_EVENTS = [
  // Content transition SFX
  { frame: 5, sfx: 'audio/whoosh-effect-382717.mp3', volume: 0.18 },
  // Popup entrance SFX
  { frame: 347, sfx: 'audio/pop-402324.mp3', volume: 0.22 },
  // Max 10-20 content + 1 per popup, volume 0.14-0.25
];
```

### Background Music ← NEW
```tsx
<Audio
  src={staticFile('audio/background-music.mp3')}
  volume={0.02}
  startFrom={0}
  endAt={TOTAL_DURATION_FRAMES}
/>
```

### SVG Illustration Template ← NEW
```typescript
// remotion/lib/illustrations/MyIllustration.tsx
import React from "react";
import { COLORS } from "../colors";

export const MyIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Use COLORS.primary (#FF6B00) for brand orange */}
      {/* Use COLORS.darkGray (#1A1A1A) for backgrounds */}
      {/* Use COLORS.white for text on dark */}
      {/* Use COLORS.error (#FF4444) for negative concepts */}
    </svg>
  );
};
```

### v2 PhraseCaption (Short-Form)
```tsx
<PhraseCaption
  sentences={SENTENCES}
  emphasisWords={EMPHASIS_WORDS}
  maxWordsPerPhrase={4}
  hideFrames={HIDE_FRAMES}
  accentColor={COLORS.primary}
  fontSize={54}
/>
```

### v2 Tier System
```tsx
// TIER 1: Full-screen (max 2)
<div style={{ position: "absolute", zIndex: 100, ... }}>
  {TIER1_EVENTS.map((evt, idx) => (
    <Sequence key={`t1-${idx}`} from={evt.frame} durationInFrames={evt.duration} premountFor={15}>
      <AppleStylePopup
        durationInFrames={evt.duration}
        illustration={evt.illustration}
        caption={evt.caption}
        subtitle={evt.subtitle}
        illustrationSize={900}
      />
    </Sequence>
  ))}
</div>

// TIER 2: Floating cards (3-5)
{TIER2_EVENTS.map((evt, idx) => (
  <Sequence key={`t2-${idx}`} from={evt.frame} durationInFrames={evt.duration} premountFor={15}>
    <FloatingCard
      durationInFrames={evt.duration}
      icon={evt.icon}
      caption={evt.caption}
      subtitle={evt.subtitle}
      position={evt.position}
    />
  </Sequence>
))}
```

### v2 Hook Burst
```tsx
// Frame 0-3: Orange flash
const INTRO_FLASH_DURATION = 3;
const flashOpacity = interpolate(frame, [0, 3], [1, 0], { extrapolateRight: "clamp" });

// Frame 0-3: Zoom PUNCH
{ frame: 0, zoom: 1.0 },
{ frame: 3, zoom: 1.08 },  // FAST zoom in
{ frame: 30, zoom: 1.02 }, // Settle

// Frame 2: Impact SFX
{ frame: 2, sfx: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
```

---

## Download & Optimize Commands

### Official Video
```bash
# Download
yt-dlp "URL" -f "best[height<=1080]" -o "public/official-content/[name]-full.mp4"

# Extract clip (WEB-OPTIMIZED)
ffmpeg -ss START -t DURATION -i "full.mp4" \
  -c:v libx264 -preset medium -crf 23 \
  -pix_fmt yuv420p -movflags +faststart \
  "public/official-content/[name]-10s.mp4"
```

**Critical:** `-movflags +faststart` = required for browser playback

---

## Quality Checklist

Before calling it done:

**Visual**
- [ ] Content fills 90%+ of frame
- [ ] Blur effects visible on overlays
- [ ] No black frames (web-optimized videos)
- [ ] Timing matches transcript

**Popups (NEW)**
- [ ] 10-20 popups placed at key moments
- [ ] Every popup aligned to exact WORDS frame
- [ ] No popup overlaps (verified end frames)
- [ ] Each popup has matching SFX
- [ ] Illustrations are brand-consistent (use COLORS)

**v2 Tier System**
- [ ] Max 2 Tier 1 (full-screen) popups
- [ ] 3-5 Tier 2 (floating card) popups
- [ ] CTA matches video source type
- [ ] Hook burst: flash + zoom punch + SFX in first 3 frames
- [ ] PhraseCaption shows 3-5 word chunks (not full sentences)
- [ ] Caption hides during BOTH tier events

**Audio (NEW)**
- [ ] Background music at 0.02-0.04 volume
- [ ] Content videos muted (volume={0})
- [ ] SFX volume 0.14-0.25 (not competing with speaker)
- [ ] Strategic placement (not spammy)

**Editorial**
- [ ] Real content used (not placeholders)
- [ ] Content appears when mentioned
- [ ] Story flows naturally
- [ ] Popups reinforce spoken concepts

---

## When Things Go Wrong

### Common Errors

**Error: `durationInFrames must be positive, but got -N`**
- **Cause:** Content event frame + duration > TOTAL_DURATION_FRAMES
- **Fix:** Verify ALL events: `frame + duration <= TOTAL_DURATION_FRAMES`

**Error: Popup shows at wrong time**
- **Cause:** Used transcript JSON timestamps instead of WORDS data frames
- **Fix:** `grep -n "keyword" remotion/data/[script]-cut-words.ts` to find exact frame

**Error: Audio conflicts (multiple sounds)**
- **Cause:** Content videos have audio playing over speaker
- **Fix:** Add `volume={0}` to all `<Video>` components in content zones

**Error: Remotion Studio crash**
- **Cause:** Missing public/audio/ directory
- **Fix:** `mkdir -p public/audio` before starting

### 20/100 Warning Signs
- Content occupies <70% of space
- No blur effects (everything flat)
- Using placeholders instead of real content
- Arbitrary timing (not matching transcript)
- Developer mindset ("place X at Y")
- No popup illustrations (flat editing)

### 95/100 Success Signs
- Content fills 90%+ of space
- Clear visual hierarchy (blur used strategically)
- Real scraped content (official videos, viral social proof)
- Editorial timing (appears when mentioned)
- 10-20 popups reinforcing key moments
- Background music creating atmosphere
- Editor mindset ("tell story")

---

**Remember:** Think like an editor, not a developer. The transcript dictates what to show and when. Your job is to find the BEST content to illustrate each moment, create impactful popup illustrations for key concepts, and layer sound design that supports the narrative without overwhelming it.
