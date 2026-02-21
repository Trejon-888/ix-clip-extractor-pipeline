# Asset Management & Organization System

**Version:** 2.0
**Last Updated:** 2026-02-06
**Status:** Production-ready — evolved from V5/V7 sessions with manifest system + content-sourcing skill integration

---

## Overview

This document establishes the canonical system for organizing video editing assets in the IX Content Factory. Every video project needs real source content — and this system ensures assets are properly sourced, organized, tracked, and reusable.

### The Golden Rule

> **Real content ALWAYS beats illustrations.**
> Check what exists → Source what's missing → Create illustrations ONLY for abstract concepts.
> **NEVER ship placeholders.**

### Content Priority Chain

| Priority | Type | Example | When to Use |
|----------|------|---------|-------------|
| 1 (best) | Real video content | Announcement video, product demo | Always when available |
| 2 | Real screenshots/images | Blog hero image, benchmark chart | When video isn't available |
| 3 | Real logos | Brand logos from official sources | For brand mentions |
| 4 | SVG illustrations (V2 motion) | Animated concept diagrams | Abstract concepts only |
| 5 | Static SVG illustrations | Simple diagrams | When motion isn't needed |
| 6 (last) | AI-generated images | nano-banana API output | Last resort |

---

## Directory Structure

```
public/
│
├── logos/                           # SHARED — Reusable across ALL projects
│   ├── claude-ai-icon.svg          # Claude starburst mark (SVG, scalable)
│   ├── anthropic-a-mark.svg        # Anthropic "A" symbol (SVG)
│   ├── anthropic-logo.svg          # Anthropic full wordmark (SVG)
│   ├── anthropic-logo.png          # Anthropic wordmark (PNG, 1200x135)
│   ├── anthropic-icon.png          # Anthropic "A" mark (PNG, 180x180)
│   ├── crewai-logo.png             # CrewAI framework logo
│   ├── pydantic-ai-logo.png        # Pydantic AI framework logo
│   ├── cursor-logo.png             # Cursor IDE logo
│   └── windsurf-logo.png           # Windsurf IDE logo
│
├── audio/                           # SHARED — SFX library
│   ├── whoosh-effect-382717.mp3    # Transition whoosh (18KB)
│   ├── whoosh-bamboo-389752.mp3    # Transition whoosh variant (189KB)
│   ├── whoosh-large-sub-384631.mp3 # Heavy transition (252KB)
│   ├── pop-402324.mp3              # Popup entrance (23KB)
│   ├── mouse-click-290204.mp3      # Click accent (12KB)
│   ├── background-music.mp3        # Lofi background (4.5MB)
│   └── dragon-studio-clock-*.mp3   # Clock ticking SFX
│
├── source-content/                  # PROJECT: Opus 4.6 Announcement
│   ├── manifest.json               # Asset inventory (REQUIRED)
│   ├── opus46-intro.mp4            # Intro video (6.8MB, H.264)
│   ├── opus46-product-updates.mp4  # Product updates (12.7MB, H.264)
│   ├── opus46-hero.png             # Blog hero image (3MB)
│   ├── benchmark-gdpval.png        # Benchmark chart (89KB)
│   └── benchmark-terminal-bench.png # Benchmark chart (112KB)
│
├── official-content/                # PROJECT: Progressive Disclosure Skills
│   ├── manifest.json               # Asset inventory (REQUIRED)
│   ├── claude-skills-full.mp4      # Full announcement (15MB)
│   ├── skills-opening-10s.mp4      # 10s clip (700KB)
│   ├── skills-demo-15s.mp4         # 15s clip (1.1MB)
│   └── docs/                       # Documentation screenshots
│       └── docs-skills-overview.png
│
├── framework-demos/                 # PROJECT: Progressive Disclosure (B-roll)
│   ├── crewai-demo.mp4             # Full demo (144MB)
│   ├── pydantic-ai-demo.mp4        # Full demo (40MB)
│   ├── langchain-demo.mp4          # Full demo (28MB)
│   ├── crewai-10s.mp4              # Short clip (344KB)
│   ├── pydantic-ai-10s.mp4         # Short clip (600KB)
│   └── langchain-10s.mp4           # Short clip (277KB)
│
├── social-proof/                    # PROJECT: Progressive Disclosure (engagement)
│   ├── x/                          # Twitter screenshots
│   ├── reddit/                     # Reddit screenshots
│   └── video-clips/                # YouTube screenshots
│
├── section-1/                       # PROJECT: Progressive Disclosure (graphics)
│   └── piece-*.png/svg             # Custom section graphics
│
├── claude-opus-46-announcement.mp4  # Talking head recording (Opus 4.6)
├── progressive-disclosure-skills-cut-final.mp4  # Talking head (Prog. Disclosure)
└── ...other root files
```

---

## Asset Categories

### Shared Assets (reusable across projects)

These live in dedicated top-level folders and are NEVER duplicated per-project:

| Folder | Contents | Notes |
|--------|----------|-------|
| `logos/` | Brand logos (SVG preferred, PNG fallback) | Add new logos here, never per-project |
| `audio/` | Sound effects + background music | Shared SFX library |

**Adding new shared assets:**
1. Download to the shared folder (e.g., `public/logos/new-brand-logo.svg`)
2. Use naming convention: `[brand-name]-logo.[ext]` or `[brand-name]-icon.[ext]`
3. SVG preferred for logos (scales perfectly in video)
4. PNG minimum 200x200 with transparency
5. Restart Remotion studio after adding

### Per-Project Assets (specific to one video)

Each video project has its own source content folder with a **manifest.json**:

| Folder | Project | Contents |
|--------|---------|----------|
| `source-content/` | Opus 4.6 Announcement | Downloaded announcement videos, blog images |
| `official-content/` | Progressive Disclosure | Anthropic skills videos, clips |
| `framework-demos/` | Progressive Disclosure | Framework demo videos |
| `social-proof/` | Progressive Disclosure | Engagement screenshots |
| `section-1/` | Progressive Disclosure | Custom educational graphics |

**For new projects:** Create a new folder under `public/` with project-specific content and a manifest.json. Name it descriptively (e.g., `public/mcp-deep-dive/`).

---

## The Manifest System

Every project's source content MUST have a `manifest.json` file. This is the single source of truth for what assets a video uses and where they came from.

### Manifest Schema

```json
{
  "project": "project-slug",
  "created": "YYYY-MM-DD",
  "topic": "Human-readable topic description",
  "composition": "remotion/compositions/CompositionName.tsx",
  "wordData": "remotion/data/project-words.ts",
  "sources": [
    {
      "url": "https://source-url.com",
      "type": "blog|youtube|twitter|reddit|documentation",
      "description": "What this source provides"
    }
  ],
  "assets": {
    "videos": [
      {
        "file": "relative/path/from/public.mp4",
        "source": "https://original-url",
        "codec": "h264",
        "resolution": "1920x1080",
        "duration_seconds": 39,
        "size_mb": 6.8,
        "notes": "Any processing notes"
      }
    ],
    "images": [
      {
        "file": "relative/path/from/public.png",
        "source": "https://original-url",
        "description": "What this image shows",
        "size_kb": 200
      }
    ],
    "logos": [
      {
        "file": "logos/brand-logo.svg",
        "shared": true,
        "description": "Brand logo description"
      }
    ]
  },
  "illustrations": [
    {
      "component": "ComponentName",
      "file": "remotion/lib/illustrations/FileName.tsx",
      "reason": "Why illustration was needed (no real content available)"
    }
  ],
  "talkingHead": {
    "file": "recording-name.mp4",
    "resolution": "1080x1920",
    "duration_seconds": 130
  }
}
```

### Why Manifests Matter

1. **Inventory** — Instantly see what assets a video uses
2. **Provenance** — Track where every asset came from (source URLs)
3. **Decision log** — Document WHY illustrations were created (because no real content existed)
4. **Reusability** — Identify shared assets that can serve future projects
5. **Quality check** — Verify nothing is a placeholder

---

## Workflow: New Project Setup

### Step 1: Source Content (invoke content-sourcing skill)

Before editing, invoke the **content-sourcing** skill to:
1. Find official source URLs (blogs, announcements, YouTube)
2. Download videos with yt-dlp
3. Download images and screenshots
4. Re-encode if needed (AV1 → H.264)
5. Organize into project folder
6. Create manifest.json

Or manually:
```bash
# Create project folder
mkdir -p public/[project-name]/

# Download source video
yt-dlp -f "bestvideo[height<=1080]+bestaudio" --merge-output-format mp4 \
  -o "public/[project-name]/[description].mp4" "YOUTUBE_URL"

# Re-encode if AV1
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium \
  -pix_fmt yuv420p -movflags +faststart output.mp4

# Download images
curl -L -o "public/[project-name]/hero.png" "IMAGE_URL"
```

### Step 2: Check Shared Assets

```bash
# What logos do we already have?
ls public/logos/

# What SFX are available?
ls public/audio/

# Need a new logo? Download to shared folder
curl -L -o "public/logos/new-brand-logo.svg" "LOGO_URL"
```

### Step 3: Create Manifest

Create `public/[project-name]/manifest.json` documenting all assets. See schema above.

### Step 4: Restart Remotion Studio

New static files require a studio restart:
```bash
# Windows
powershell -Command "Stop-Process -Name 'node' -Force -ErrorAction SilentlyContinue"
npx remotion studio remotion/index.ts
```

### Step 5: Continue to Video Editing

With assets sourced and cataloged, proceed to the **video-editing** skill:
- Phase 2 checks the manifest to know what real content is available
- Phase 3 maps visual moments (real content first, illustrations only for gaps)
- Phase 4 creates illustrations ONLY for abstract concepts without real content

---

## Naming Conventions

### Videos
- Project-specific: `[project-slug]-[description].mp4`
  - `opus46-intro.mp4`, `opus46-product-updates.mp4`
  - `skills-opening-10s.mp4`, `skills-demo-15s.mp4`
- Clips: Add duration suffix: `-10s.mp4`, `-15s.mp4`
- Audio variants: Add `-AUDIO` suffix: `skills-opening-10s-AUDIO.mp4`

### Images
- `[project-slug]-[description].png`
  - `opus46-hero.png`, `benchmark-gdpval.png`
- Screenshots: `[page-name].png`
  - `docs-skills-overview.png`

### Logos (shared)
- `[brand-name]-logo.[ext]` — Full logo/wordmark
- `[brand-name]-icon.[ext]` — Icon/symbol only
- Always lowercase, hyphens for spaces
- SVG preferred, PNG fallback (min 200x200 with transparency)

### Audio (shared)
- `[effect-type]-[source-id].mp3`
  - `whoosh-effect-382717.mp3`, `pop-402324.mp3`

---

## Technical Requirements

### Video Encoding
| Setting | Value | Why |
|---------|-------|-----|
| Codec | H.264 (`-c:v libx264`) | Universal browser support |
| CRF | 23 | Balanced quality/size |
| Pixel format | yuv420p | Maximum compatibility |
| Faststart | `-movflags +faststart` | **MANDATORY** — prevents black frames |
| Preset | medium | Good speed/quality balance |

### Image Quality
| Type | Min Resolution | Format | Max Size |
|------|---------------|--------|----------|
| Hero images | 1920x1080 | PNG | 500KB |
| Screenshots | 1080p equivalent | PNG | 200KB |
| Logos (PNG) | 200x200 | PNG with transparency | 100KB |
| Logos (SVG) | Scalable | SVG | 50KB |
| Benchmark charts | 800x600 | PNG | 200KB |

### File References in Code
```typescript
// Always use staticFile() — never hardcode URLs
import { staticFile } from 'remotion';

// Paths are relative to public/, forward slashes only
<OffthreadVideo src={staticFile('source-content/opus46-intro.mp4')} volume={0} />
<Img src={staticFile('logos/claude-ai-icon.svg')} />
<Audio src={staticFile('audio/pop-402324.mp3')} volume={0.22} />
```

---

## Quality Checklist

Before calling a video project "done":

### Content Quality
- [ ] Using **real source content** where available (not placeholders)
- [ ] Content **mapped to transcript** (appears when the speaker mentions it)
- [ ] All videos are **H.264 encoded** with faststart flag
- [ ] All images are **high resolution** (minimum 1080p equivalent)
- [ ] Source videos are **volume={0}** (muted) in composition

### Organization
- [ ] **manifest.json** exists and is complete
- [ ] All assets in correct directories
- [ ] Shared assets (logos, audio) in shared folders
- [ ] Filenames follow naming conventions
- [ ] No duplicate assets across projects

### Technical
- [ ] `staticFile()` used for all asset references
- [ ] Forward slashes in all paths
- [ ] Remotion Studio restarted after adding new files
- [ ] No files > 100MB in git tracking

### Decision Documentation
- [ ] Every illustration has a `reason` in manifest (why real content wasn't used)
- [ ] Source URLs documented for all downloaded assets
- [ ] Processing notes (re-encoding, compression) recorded

---

## Integration Map

This asset management system connects to:

| System | Connection |
|--------|-----------|
| **content-sourcing skill** | Downloads and organizes source content (Phase 0-4) |
| **video-editing skill** | Phase 2 reads manifest to determine what real content exists |
| **video-cutting skill** | Produces the talking head recording (stored at root level) |
| **IX Content Vault** | Content plans reference asset requirements |
| **Remotion compositions** | `staticFile()` references assets by path |

---

## Troubleshooting

### "Asset not found" errors
**Cause:** Remotion caches assets at startup.
**Fix:** Restart Remotion Studio. Verify file exists at `public/[path]`.

### Videos show black frames
**Cause:** Missing `-movflags +faststart` in FFmpeg encoding.
**Fix:** Re-encode: `ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -movflags +faststart output.mp4`

### AV1 codec not playing
**Cause:** YouTube delivers AV1 which some browsers can't decode.
**Fix:** Re-encode to H.264 (see above).

### Logo looks blurry in video
**Cause:** Using small PNG at large display size.
**Fix:** Use SVG version (`claude-ai-icon.svg`) which scales perfectly.

---

## Evolution History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-04 | Initial system from Progressive Disclosure V5 |
| 2.0 | 2026-02-06 | Manifest system, content priority chain, content-sourcing skill integration, shared vs per-project structure, naming conventions, quality checklist overhaul |

---

**This system is alive.** Update this document when new patterns emerge. The manifest system ensures every asset decision is tracked and explainable.
