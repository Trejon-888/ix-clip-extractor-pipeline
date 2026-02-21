# Video Editing Troubleshooting Guide

**Last Updated:** 2026-02-04
**Status:** Living document - update when new issues discovered

---

## Critical Errors

### Error: `durationInFrames must be positive, but got -N`

**When it happens:** Remotion composition fails to load with negative duration error

**Root cause:** Content event starts at or past the total video duration

**Example:**
```typescript
// TOTAL_DURATION_FRAMES = 3343

const CONTENT_EVENTS = [
  {
    frame: 3345,  // ❌ Already past the end (3343)
    duration: TOTAL_DURATION_FRAMES - 3345,  // 3343 - 3345 = -2
    type: 'image',
    src: 'cta.png',
  },
];
```

**How to fix:**
1. **Calculate total frames used BEFORE creating events:**
   ```typescript
   // Add up all durations first
   const totalUsed = 300 + 300 + 450 + ... = 3220
   const remaining = TOTAL_DURATION_FRAMES - totalUsed // 3343 - 3220 = 123
   ```

2. **Adjust last event to fit:**
   ```typescript
   {
     frame: 3220,  // ✅ Starts before end
     duration: 123,  // ✅ Ends exactly at 3343
     type: 'image',
     src: 'cta.png',
   }
   ```

3. **Or shorten earlier events to make room**

**Prevention:**
```typescript
// Add validation function
const validateEvents = (events, totalFrames) => {
  events.forEach((evt, idx) => {
    const endFrame = evt.frame + evt.duration;
    if (endFrame > totalFrames) {
      throw new Error(
        `Event ${idx} ends at ${endFrame} but total is ${totalFrames}`
      );
    }
    if (evt.duration <= 0) {
      throw new Error(`Event ${idx} has negative duration: ${evt.duration}`);
    }
  });
};

// Call after defining CONTENT_EVENTS
validateEvents(CONTENT_EVENTS, TOTAL_DURATION_FRAMES);
```

**Documented in:** V6 composition (2026-02-04)

---

### Error: Videos have no audio (silent gaps)

**When it happens:** Video clips play but there's no sound

**Root cause:** FFmpeg extraction didn't include audio stream

**Example of WRONG command:**
```bash
# ❌ No audio flags
ffmpeg -ss 0 -t 10 -i input.mp4 \
  -c:v libx264 -crf 23 \
  output.mp4
```

**How to fix:**
```bash
# ✅ Include audio stream with proper encoding
ffmpeg -ss 0 -t 10 -i input.mp4 \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 192k \
  -pix_fmt yuv420p -movflags +faststart \
  output.mp4
```

**Key flags:**
- `-c:a aac` — Use AAC audio codec (universal browser support)
- `-b:a 192k` — Audio bitrate (192kbps minimum for voice)
- `-movflags +faststart` — Web optimization (CRITICAL)

**Verification:**
```bash
# Check if audio stream exists
ffprobe output.mp4 2>&1 | grep "Audio"
# Should show: "Stream #0:1: Audio: aac, 48000 Hz, stereo, fltp, 192 kb/s"
```

**Documented in:** V5 → V6 rebuild (2026-02-04)

---

### Error: `Asset not found` or 404 errors

**When it happens:** Remotion preview shows missing asset errors

**Root cause:** Files not in `public/` directory OR Remotion Studio not restarted

**How to fix:**

1. **Verify file exists:**
   ```bash
   ls public/official-content/skills-opening-10s.mp4
   ```

2. **Check path in composition:**
   ```typescript
   // ❌ Wrong (includes public/)
   src: 'public/official-content/video.mp4'

   // ✅ Correct (relative to public/)
   src: 'official-content/video.mp4'
   ```

3. **Restart Remotion Studio:**
   ```bash
   # Windows
   taskkill //F //IM node.exe
   npx remotion studio remotion/index.ts

   # Mac/Linux
   pkill -f node
   npx remotion studio remotion/index.ts
   ```

**Prevention:**
- ALWAYS restart Remotion Studio after adding new files
- Use `staticFile('path')` for all asset references
- Never hardcode URLs

**Documented in:** ASSET-MANAGEMENT.md

---

### Error: Videos show black frames at cuts

**When it happens:** Brief black flashes appear at video transitions

**Root cause:** Video not web-optimized (moov atom at end of file)

**How to fix:**

Re-encode with `-movflags +faststart`:
```bash
ffmpeg -i input.mp4 \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 192k \
  -pix_fmt yuv420p \
  -movflags +faststart \
  output.mp4
```

**Why this works:**
- Default MP4 structure: video data → moov atom (metadata)
- Browser must download entire file to find moov atom
- `+faststart` moves moov atom to beginning
- Browser can start playback immediately

**Verification:**
```bash
# Check moov atom position
ffprobe -show_format input.mp4 2>&1 | grep "moov"
```

**Documented in:** EXECUTION-ROADMAP.md

---

### Error: Content not centered / offset to one side

**When it happens:** Content appears shifted left, right, or top/bottom

**Root cause:** Missing or incorrect flexbox centering

**How to fix:**

```typescript
// ❌ Wrong (no centering)
<div style={{
  position: 'absolute',
  width: '100%',
  height: '100%',
}}>
  <Img src={...} />
</div>

// ✅ Correct (centered)
<div style={{
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',      // Vertical center
  justifyContent: 'center',  // Horizontal center
}}>
  <Img src={...} />
</div>
```

**Prevention:**
- ALWAYS use `display: 'flex'` with `alignItems` and `justifyContent`
- Test at different resolutions (1080x1920, 720x1280)

**Documented in:** V5 → V6 rebuild (2026-02-04)

---

### Error: Content too small (doesn't fill frame)

**When it happens:** Content occupies <70% of available space

**Root cause:** Conservative default sizing or missing scale

**How to fix:**

```typescript
// ❌ Wrong (tiny content)
<div style={{
  width: '50%',  // Only half the space
  height: '50%',
}}>

// ✅ Correct (fills space)
<div style={{
  width: '98%',   // Almost full width
  height: '95%',  // Almost full height
}}>
```

**For FullFrameContent component:**
```typescript
<FullFrameContent
  scaleContent={0.9}  // 90% of available space
  // NOT 0.5 or 0.6 (too small)
/>
```

**Documented in:** V5 → V6 rebuild (2026-02-04)

---

### Error: Blur effect not working

**When it happens:** `backdropFilter: blur(20px)` has no effect

**Root cause:** No semi-transparent background layer

**How to fix:**

```typescript
// ❌ Wrong (no background, blur won't show)
<div style={{
  backdropFilter: 'blur(20px)',
}}>

// ✅ Correct (background + blur)
<div style={{
  backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Semi-transparent background
  backdropFilter: 'blur(20px)',           // Blur shows through
}}>
```

**Why:** `backdropFilter` blurs content BEHIND the element. Without a semi-transparent background, there's nothing to show the blur through.

**Documented in:** EVOLUTION-PROCESS.md

---

### Error: Sound effects too loud / annoying

**When it happens:** Audio punctuation feels spammy or overwhelming

**Root cause:** Too many SFX or volume too high

**How to fix:**

1. **Limit total count:**
   ```typescript
   // ❌ Wrong (50+ SFX)
   const SFX_EVENTS = [
     { frame: 5, sfx: 'pop.mp3' },
     { frame: 15, sfx: 'pop.mp3' },  // Every 10 frames
     { frame: 25, sfx: 'pop.mp3' },
     // ...50 more
   ];

   // ✅ Correct (10-20 max)
   const SFX_EVENTS = [
     { frame: 5, sfx: 'whoosh.mp3', volume: 0.18 },    // Section transitions only
     { frame: 305, sfx: 'whoosh.mp3', volume: 0.16 },
     // ...max 20 total
   ];
   ```

2. **Lower volume:**
   ```typescript
   // ❌ Too loud
   volume: 0.5  // or higher

   // ✅ Strategic levels
   volume: 0.14-0.25  // Range for all SFX
   ```

3. **Rotate variants:**
   ```typescript
   // Prevent repetition fatigue
   const WHOOSH_FILES = [
     'whoosh-effect-382717.mp3',
     'whoosh-bamboo-389752.mp3',
     'whoosh-large-sub-384631.mp3',
   ];

   // Cycle through them
   { sfx: WHOOSH_FILES[0] }
   { sfx: WHOOSH_FILES[1] }
   { sfx: WHOOSH_FILES[2] }
   ```

**Documented in:** backlog-01.md Rule #7

---

## Common Warnings

### Warning: Remotion Studio not reloading changes

**Symptom:** Code changes don't appear in preview

**Causes:**
1. Browser cache
2. Remotion cache
3. Stale node process

**How to fix:**
```bash
# 1. Kill all node processes
taskkill //F //IM node.exe  # Windows
pkill -f node               # Mac/Linux

# 2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

# 3. Restart studio
npx remotion studio remotion/index.ts
```

---

### Warning: `premountFor={fps}` missing

**Symptom:** Flash of empty content before asset loads

**How to fix:**
```typescript
// ❌ Wrong (no premount)
<Sequence from={100} durationInFrames={300}>
  <Img src={...} />
</Sequence>

// ✅ Correct (premount before display)
<Sequence from={100} durationInFrames={300} premountFor={fps}>
  <Img src={...} />
</Sequence>
```

**Documented in:** backlog-01.md Rule #5

---

### Warning: Using `<img>` instead of `<Img>`

**Symptom:** Blank frames or delayed image load

**How to fix:**
```typescript
// ❌ Wrong (HTML img tag)
<img src={staticFile('logo.png')} />

// ✅ Correct (Remotion Img component)
import { Img } from 'remotion';
<Img src={staticFile('logo.png')} />
```

**Why:** Remotion's `<Img>` ensures image loads before render. HTML `<img>` doesn't.

**Documented in:** backlog-01.md Rule #4

---

## Performance Issues

### Issue: Large file sizes (>10MB per clip)

**Cause:** Poor encoding settings or too high resolution

**How to fix:**

```bash
# Reduce file size while maintaining quality
ffmpeg -i input.mp4 \
  -c:v libx264 -preset medium \
  -crf 23 \           # Quality (18=high, 28=low, 23=balanced)
  -vf scale=1280:720 \ # Downscale if needed
  -c:a aac -b:a 128k \ # Lower audio bitrate if acceptable
  -pix_fmt yuv420p \
  -movflags +faststart \
  output.mp4
```

**Target sizes:**
- 10s clip: 500KB-1.5MB
- 15s clip: 1-2MB
- 30s clip: 2-4MB

---

### Issue: Slow preview rendering

**Cause:** Too many concurrent video sequences

**How to fix:**

1. **Use lower resolution during preview:**
   ```bash
   # Encode preview versions at 720p
   ffmpeg -i input.mp4 -vf scale=1280:720 preview.mp4
   ```

2. **Reduce premount frames:**
   ```typescript
   // During preview only
   premountFor={Math.round(fps / 2)}  // Half the premount
   ```

3. **Use static placeholder during development:**
   ```typescript
   // Replace video with static frame during editing
   <Img src="frame-001.jpg" />
   ```

---

## Debugging Workflow

When something breaks:

1. **Check browser console** (F12) — Look for 404s, errors
2. **Check Remotion Studio output** — Terminal shows build errors
3. **Verify file paths** — `ls public/path/to/file.mp4`
4. **Restart everything** — Kill node, restart studio, clear browser cache
5. **Test in isolation** — Comment out other CONTENT_EVENTS to isolate issue
6. **Check this guide** — See if error is documented above

---

## Prevention Checklist

Before creating new composition:

- [ ] Validate CONTENT_EVENTS (no negative durations)
- [ ] All videos extracted WITH AUDIO (`-c:a aac -b:a 192k`)
- [ ] All videos web-optimized (`-movflags +faststart`)
- [ ] All assets in `public/` (not `remotion/public/`)
- [ ] All content centered (`display: flex`, `alignItems`, `justifyContent`)
- [ ] All content fills 85%+ of space
- [ ] Sound effects: 10-20 max, volume 0.14-0.25
- [ ] `premountFor={fps}` on ALL Sequences
- [ ] Using `<Img>` from remotion (not HTML `<img>`)

---

## When to Update This Document

Add new section when:
- New error discovered (not documented here)
- Existing fix doesn't work (needs update)
- New pattern emerges (prevention strategy)

**Format:**
```markdown
### Error: [Error message or symptom]

**When it happens:** [Scenario]
**Root cause:** [Why it happens]
**How to fix:** [Step-by-step solution]
**Prevention:** [How to avoid]
**Documented in:** [Session/file where discovered]
```

---

**Last errors added:**
- Negative duration error (V6, 2026-02-04)
- Silent video clips (V5→V6, 2026-02-04)
- Content not centered (V5→V6, 2026-02-04)
