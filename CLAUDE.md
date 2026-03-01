# IX Clip Pipeline

## What This Is

Automated clip extraction + face-tracking reframe + Remotion video editing pipeline. Turns long-form videos into polished short-form clips.

## Pipeline Flow

```
/clip-selection → /clip-extractor → /transcribe → /edit → /post-short
```

1. **Clip Selection** — Analyze transcript, score clips (5 categories, 0-100), select best moments
2. **Clip Extraction** — Face-tracking reframe (16:9 → 9:16) via Python tool at `tools/clip_extractor/`
3. **Transcription** — WhisperX GPU (`device='cuda'`, `compute_type='float16'`) → word-level timestamps
4. **Editing** — `/edit` routes to `video-editing` (router) → `short-form-editing` or `long-form-editing`
5. **Publishing** — `/short-form-posting` or `/youtube-content-package`

### Podcast/Interview Pipeline

```
source video → /clip-extractor --format split → dynamic layout detection
→ split-screen + close-up segments → /transcribe (reframed video) → /edit
```

- `--format split` auto-detects layout switches (gallery ↔ close-up)
- Layout-aware captions: middle (46%) for split-screen, lower third (62%) for close-up
- `crop_path.json` contains `layout_segments` array — copy into Remotion composition

## Skills

13 skills in `.claude/skills/`:

| Skill | Triggers |
|-------|----------|
| `clip-extractor` | "extract clips", "reframe video", "face tracking" |
| `clip-selection` | "select clips", "find best clips", "analyze transcript" |
| `edit` | "edit video", "edit clip", "make it polished" |
| `video-editing` | (invoked by /edit — router) |
| `short-form-editing` | (invoked by router — <90s) |
| `long-form-editing` | (invoked by router — 5+ min) |
| `visual-overlay-creation` | "create illustration", "new visual" |
| `extracting-transcripts` | "transcribe", "extract transcript" |
| `short-form-posting` | "post short", "post reel" |
| `youtube-content-package` | "youtube package", "publish video" |
| `video-upload-helper` | "compress video", "upload video" |
| `late-social-media` | "post to", "schedule post" |
| `content-analytics` | "check analytics" |

## Essential Commands

```bash
# Remotion
npm run studio                    # Preview in browser
npm run render -- <Id> out/x.mp4  # Render composition

# Clip Extractor
cd tools
python -m clip_extractor reframe --video input.mp4 --output clips/ --format 9x16
python -m clip_extractor reframe --video podcast.mp4 --output clips/ --format split  # podcast/interview
python -m clip_extractor batch --video source.mp4 --clips defs.json --output clips/
python -m clip_extractor analyze --video clip.mp4
```

## Editing Architecture (3-Skill System)

```
/edit → video-editing (ROUTER v7.0) → short-form-editing (<90s)
                                     → long-form-editing (5+ min)
```

### Format Detection

| Duration | Format | Primary Component | Pop-Outs |
|----------|--------|------------------|----------|
| <90s (pipeline) | Short-form | ConceptOverlay | 8-15 |
| <90s (standalone) | Short-form | AppleStylePopup + FloatingCard | 5-7 |
| <90s (announcement) | Short-form | AppleStylePopup | 10-18 |
| <120s (podcast) | Short-form | ConceptOverlay + layout-aware captions | 8-12 |
| 5+ min | Long-form | ConceptOverlay | 30-40+ |

### Gold Standards

Study these compositions for patterns:

- `Clip1FromZeroTo90K.tsx` — Pipeline clip (ConceptOverlay, word captions, 9 pop-outs)
- `Clip2StopManuallyPosting.tsx` — Pipeline clip with individual platform pops
- `Clip6VoiceControlDemoV3.tsx` — Standalone demo (tier system, PhraseCaption)
- `ClaudeOpus46Announcement.tsx` — Announcement (AppleStylePopup, word-by-word captions)
- `PodcastStressExpert.tsx` — Podcast clip (layout-aware captions, 6 layout segments, 9 pop-outs)
- `CraftingOutreachCampaign.tsx` — Long-form (28 min, 35+ overlays)

## Critical Rules

1. **ALWAYS use WORDS data** (`.ts` files) for frame timing — NEVER transcript JSON
2. **Pop-out at EXACT frame** the keyword is spoken
3. **ILLUSTRATION-FIRST** — NO caption on most pop-outs (only CTAs + character intros)
4. **illustrationSize:** 800 (no text), 700 (with text), 620 (CTA)
5. **NEVER use template illustrations** — every pop-out needs UNIQUE visual metaphor
6. **ALWAYS use real images** for logos (`Img` + `staticFile()`) — NEVER recreate as SVG
7. **Long-form: NO zoom keyframes** (flat 1.0)
8. **Background music** 0.02 volume, first 35s only
9. **SFX J-cut:** sound 2-3 frames BEFORE visual
10. **SFX variety** — never repeat same sound consecutively

## Brand Assets

### Platform Logos (`public/logos/`)
`x.svg`, `instagram.svg`, `linkedin.svg`, `tiktok.svg`, `bluesky.svg`, `facebook.svg`, `youtube.svg`, `pinterest.svg`, `threads.svg`, `googlebusiness.svg`, `telegram.svg`, `snapchat.svg`, `reddit.svg`

### Brand Logos
- Claude Code: `logos/claude-code-terminal.webp`
- Claude AI: `logos/claude-ai-icon.svg`
- INFINITX: `infinitx-logo.png`

### SFX Library (`public/audio/`)
- Pop: `pop-402324.mp3`
- Whoosh variants: `whoosh-effect-382717.mp3`, `whoosh-bamboo-389752.mp3`, `whoosh-large-sub-384631.mp3`
- Background: `background-music.mp3` (volume 0.02)

## Remotion Components

| Component | Use Case | z-index |
|-----------|----------|---------|
| ConceptOverlay | Full-screen concept reveal | 100 |
| AppleStylePopup | Premium white popup | 100 |
| FloatingCard | Card overlay (speaker visible) | 20 |
| PlatformCascade | Logo grid reveal | 30 |
| KineticText | Animated text | 25 |
| AnnotationBadge | Label pill | 15 |

## File Conventions

- **Compositions:** `remotion/compositions/YourCompositionName.tsx`
- **Word data:** `remotion/data/your-composition-words.ts`
- **Illustrations:** `remotion/lib/illustrations/YourIllustrations.tsx`
- **Source videos:** `public/videos/YYYY-MM-DD-project-name/`
- **FPS:** Always 30
- **Portrait:** 1080x1920
- **Landscape:** 1920x1080

## Configuration

- Clip extractor: `tools/clip_extractor/config.yaml`
- Remotion: `remotion/lib/config.ts`
- Colors: `remotion/lib/colors.ts`
- Playbook rules: `remotion/playbook/rules/`
