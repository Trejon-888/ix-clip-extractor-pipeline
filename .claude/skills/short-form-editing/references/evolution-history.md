# Short-Form Editing Evolution History

Session learnings that shaped the short-form editing system. Each lesson was earned through production mistakes and user feedback.

---

## V3.2 Clip6VoiceControlDemo Learnings (2026-02-10 to 2026-02-12)

The V3.2 iteration of Clip6 established the current gold standard for standalone demos. Three major revisions with user feedback loops.

### V1 to V2: Tier System Discovery

**Problem:** V1 used 6 identical AppleStylePopup pop-outs. Every pop-out was the same visual weight, creating monotony.

**Solution:** Split into Tier 1 (full-screen takeover, max 2) and Tier 2 (floating cards, speaker visible). This created visual rhythm -- big moment, small moment, big moment.

### V2 to V3: Scene-Layer Philosophy

**Problem:** V2 still felt like "popup-based editing" where things appear and disappear in isolation.

**Solution:** V3 adopted scene-layer editing. Concept visualizations build and evolve over time. The command section (Act 2) stacks platform cards as the speaker names them, creating an accumulating visual. The metadata checklist (Act 5) reveals items one by one synchronized to speech.

### V3 to V3.2: User Feedback (10 Specific Fixes)

1. Claude Code = REAL logo (`claude-code-terminal.webp`), not text or icon
2. Voice interaction visual for "talking with it" (waveform bars)
3. Full-screen white illustration for "short-form video" (phone with play)
4. Platform cascade BIGGER and repositioned (center, logoSize 100+)
5. Skills = ConceptOverlay with illustration (not text overlay)
6. Posted = ConceptOverlay (not tiny AnnotationBadge)
7. Voice prompt = solid white bg with clean illustration
8. Metadata badges = unified checklist panel (not scattered badges)
9. 13 Platforms with REAL SVG logos, bigger
10. CTA with YouTube thumbnail image

---

## Short-Form Session Learnings (2026-02-10)

Key discoveries from the first dedicated short-form editing session:

### 1. Standalone Compositions > Template Compositions

Remotion serializes `defaultProps` as JSON. JSX elements become serialized objects, causing "Objects are not valid as a React child" errors. Every short-form clip must be its own standalone file with all editing logic baked in.

### 2. Sentence Captions for Short Clips

For clips under 90 seconds, `PhraseCaption` (auto-chunking sentences into 3-5 word phrases) reads faster and feels punchier than word-by-word `FullWidthCaption`. Word-by-word is better for educational content over 2 minutes.

### 3. 5-7 Pop-Outs for 70 Seconds

Originally targeted 4-6. Updated to 5-7 based on Clip6 having 2 Tier 1 + 5 Tier 2 = 7 total visual events. Roughly 1 pop-out every 10-14 seconds maintains energy without overwhelming.

### 4. Frame Calculation from SRT

WhisperX SRT timestamps are in seconds. Convert to frames: `Math.round(seconds * 30)`. Always grep the SRT file for exact word timestamps rather than estimating.

### 5. SFX Collision Offset

When two SFX events land on the same frame (e.g., a platform pop and a concept entrance), offset by 3 frames. Two simultaneous audio triggers create phase cancellation and sound muddy.

### 6. Full-Screen Video for Webcam Clips

Webcam-only clips should use `objectFit: "cover"` filling 100% of the frame. Early attempts clipped to 68% height (leftover from split-zone layout), wasting screen space.

### 7. Tier System > Flat Pop-Out List

Two full-screen takeovers (WOW moment + core concept) plus 3-5 floating cards gives better rhythm than 6 identical pop-outs at the same visual weight.

### 8. PhraseCaption > TypingCaptions

`PhraseCaption` auto-chunks sentences into 3-5 word groups displayed with spring animation. `TypingCaptions` (character-by-character reveal) felt too slow for short-form pacing.

### 9. Hook Burst = Flash + Zoom Punch + SFX + Text

Multi-sensory attention grab in the first 3 frames. Orange flash (visual), zoom punch (motion), whoosh-large-sub (audio), optional text overlay (information). All four channels fire simultaneously.

### 10. CTA Must Match Video Source

Long-form extracts say "WATCH THE FULL VIDEO" with a YouTube thumbnail. Standalone demos say "FOLLOW FOR MORE" with the platform icon. Trending reactions say "FOLLOW FOR AI UPDATES". Getting this wrong confuses the viewer about what to do next.

### 11. Pixel Art x Apple Illustration Style (Deprecated for Pipeline)

V2 introduced a pixel art style with grid-based blocks and Apple typography. This worked for the Clip6 standalone demo but was deprecated for pipeline clips, which use clean vector illustrations with motion instead. Pixel art with colored boxes looks busy on the white ConceptOverlay backgrounds used in pipeline clips.

---

## Pipeline Clip Learnings (2026-02-11 to 2026-02-12)

Discoveries from editing Clip1FromZeroTo90K and Clip2StopManuallyPosting:

### ConceptOverlay-First for Pipeline

Pipeline clips use ConceptOverlay as the primary tool, not AppleStylePopup. ConceptOverlay with `backgroundStyle="solid-white"` and `entrance="clip-circle"` provides a full-screen white reveal that pairs perfectly with custom SVG illustrations.

### Individual Platform Pop-Outs

When the speaker names platforms in sequence, each deserves its own floating card with its own SFX. A grouped PlatformCascade (all appearing at once) loses the rhythm of name -> pop -> name -> pop. Individual pop-outs at 150x150 frosted glass cards with 72x72 logos create a satisfying cadence.

### Gap-Filling (Max 200 Frames)

Pipeline clips initially had long stretches of talking head with no visual events. Gaps over 200 frames (6.7 seconds) feel boring on social media. The fix: add rapid-fire ConceptOverlays (30 frames each) for every item the speaker mentions, even brief ones. The voice command section in Clip2 uses 5 rapid-fire overlays to cover 250 frames of platform-naming speech.

### Every Illustration Distinct

V3 of the video-editing SKILL.md introduced the "recognition test": a viewer sees the illustration for 1 second and must immediately know it is different from every other illustration in the clip. Template-based illustrations (`ConceptBadge(icon, label)`) fail this test -- they all look the same with different icons.

### 8-15 Pop-Outs, Not 3-6

Early pipeline clip attempts used 3-6 ConceptOverlays, leaving most of the clip as raw talking head. Clip2StopManuallyPosting V5 has 15 visual events (14 ConceptOverlays + 1 IndividualPlatformPopups) for 78 seconds. This density keeps the viewer engaged.

### illustrationSize Minimum 580

The default ConceptOverlay illustrationSize of 460 is too small on mobile screens. Pipeline clips use 580-640 for all illustrations. Clip2 ranges from 580 (quick reveals) to 640 (feature illustrations with detail).

### Speech-Synced Checklists

For metadata/feature lists where the speaker describes items one by one, the checklist illustration syncs its item reveals to the speech timing. AutoGeneratedIllustration in Clip2 reveals "Title" at frame +25, "Description" at +51, "Hashtags" at +88, etc., matching when the speaker says each word.

---

## Layout Architectures

### Split-Zone Layout (V6, Educational Content)

Used for long-form educational videos. NOT used for short-form clips.

```
TOP ZONE (46%):    Content (B-roll, illustrations, diagrams)
MIDDLE (8%):       Captions (word-by-word, orange emphasis bar borders)
BOTTOM (46%):      Speaker (circular crop, orange ring border)
POP-OUT (z:100):   WhitePopupReveal (full screen, above all zones)
```

**When to use:** Long-form tutorials with extensive B-roll content that requires its own display zone.
**When NOT to use:** Short-form clips (wastes screen real estate, speaker too small).

### Full-Screen Talking Head (Announcements)

Used for announcement/reaction videos with source content.

```
BASE LAYER:        Full-screen OffthreadVideo (zoom keyframes 1.0-1.08)
PIP (z:20):        FloatingSourceFrame (top-right, orange border, source video/image)
CAPTIONS (z:10):   Bottom caption bar with gradient background
POP-OUT (z:100):   AppleStylePopup (full screen, white bg, dark text)
SFX LAYER:         Audio sequences (pop + whoosh)
BACKGROUND MUSIC:  Audio continuous (0.02 volume)
```

**FloatingSourceFrame process:**
1. Find the source (announcement blog post, tweet, video)
2. Extract media URLs (WebFetch on the page)
3. Download with yt-dlp (`yt-dlp -f "bestvideo[height<=1080]+bestaudio" --merge-output-format mp4`)
4. Re-encode AV1 to H.264 (`ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium output.mp4`)
5. Store in `public/source-content/`
6. Restart Remotion studio (static file cache)

**Key rules:**
- Source videos ALWAYS `volume={0}` (muted)
- Orange border with glow: `rgba(255, 118, 20, 0.4-0.8)`
- NEVER ship with placeholder content

### Full-Screen Pipeline Clip

Used for pipeline clips extracted from long-form (current primary pattern).

```
BASE LAYER:        Full-screen OffthreadVideo (FLAT 1.0 zoom, no color grading)
CONCEPT (z:100):   ConceptOverlay solid-white, illustrationSize 580-640
LOGOS (z:30):       Real logos via Img + staticFile() (ClaudeCodeLogoReveal)
CASCADE (z:22):    IndividualPlatformPopups (frosted glass cards, real SVG logos)
CHECKLIST (z:35):  MetadataChecklist panel (unified, slides from right)
EMPHASIS (z:30):   KineticText ONLY for hype words (INCREDIBLE, LET'S GO)
CTA (z:40):        Card with YouTube thumbnail, 660-680px wide
CAPTIONS (z:10):   Single-word 72px, 28% from bottom, hide during concepts
SFX:               J-cut (2-3 frames before visual), pop + whoosh
MUSIC:             Lofi 0.02 volume continuous
```

---

## Source Content Capture Process

When a composition needs real source content (announcement videos, screenshots, demos):

### Step 1: Find the Source
Search for the announcement blog post, tweet, or video. Use WebFetch to extract the page content and find embedded media URLs.

### Step 2: Download
```bash
# YouTube or any supported platform
yt-dlp -f "bestvideo[height<=1080]+bestaudio" --merge-output-format mp4 \
  -o "source-content/name.mp4" "URL"

# Twitter/X (also supported by yt-dlp)
yt-dlp -o "source-content/tweet-video.mp4" "https://x.com/..."
```

### Step 3: Re-encode if Needed
AV1 codec (common in YouTube downloads) causes playback issues:
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium \
  -pix_fmt yuv420p -movflags +faststart output.mp4
```

### Step 4: Store and Restart
Copy to `public/source-content/` or project-specific folder. Restart Remotion studio for the static file cache to pick up new files.

---

## Editing System Version Timeline

| Version | Date | Key Change |
|---------|------|-----------|
| V1 | 2026-02-05 | WhitePopupReveal system, split-zone layout, 17 pop-outs |
| V2 | 2026-02-06 | AppleStylePopup, FloatingSourceFrame, V2 illustrations with motion |
| V3 | 2026-02-10 | Scene-layer editing, KineticText, ConceptOverlay, tier system, PhraseCaption |
| V3.2 | 2026-02-12 | User feedback: real logos, unified panels, bigger illustrations |
| V4 (pipeline) | 2026-02-11 | ConceptOverlay-first, individual platform pops, gap-filling, 8-15 pop-outs |
| V5 (pipeline) | 2026-02-12 | Rapid-fire command sections, speech-synced checklists, illustrationSize 580+ |

---

## Key Principle Evolution

| Before | After | Why |
|--------|-------|-----|
| 3-6 pop-outs per clip | 8-15 (pipeline), 5-7 (standalone) | More density keeps mobile viewers engaged |
| Template illustrations | Every illustration distinct | Templates look generic and cheap |
| Grouped platform cascade | Individual platform pop-outs | Sync to speech rhythm creates satisfaction |
| Continuous zoom keyframes | Flat 1.0 (pipeline) or hook-only | Continuous zoom causes swimming/shaking |
| Dark overlay backgrounds | Solid white backgrounds | Apple aesthetic, premium feel |
| Word-by-word captions | PhraseCaption for standalone | Faster reading, punchier feel |
| AnnotationBadge for moments | ConceptOverlay for moments | Badges are for metadata, not narrative |
| TypingCaptions | PhraseCaption | Character-by-character too slow for short-form |
| Pixel art illustrations | Clean vector with motion | Pixel art looks busy on white backgrounds |
| Default illustrationSize 460 | Minimum 580 for pipeline | Mobile readability requires larger illustrations |
