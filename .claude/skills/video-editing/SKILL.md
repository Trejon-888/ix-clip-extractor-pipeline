---
name: video-editing
description: "Video editing orchestrator and router. Detects video format (long-form vs short-form) and routes to the correct editing skill. Also provides shared component library, brand assets, and rules used by all editing processes. Use when user wants to edit video, create composition, add effects, make it polished, or finish the video."
metadata:
  category: video-production
  version: 7.0
---

# Video Editing Orchestrator (Router)

Detect the video format, route to the correct editing skill, and provide shared knowledge (component library, brand assets, rules). This skill does NOT contain the editing process — the sub-skills do.

---

## Phase 0: Detect Format & Route

### Step 1: Determine Video Duration

| Duration | Format | Route To |
|----------|--------|----------|
| **< 90 seconds** | Short-form | Read `.claude/skills/short-form-editing/SKILL.md` |
| **90s – 5 min** | Medium | Read `.claude/skills/short-form-editing/SKILL.md` (use higher pop-out density) |
| **5+ minutes** | Long-form | Read `.claude/skills/long-form-editing/SKILL.md` |

### Step 2: Load the Sub-Skill

Read the FULL SKILL.md for the detected format. Follow its phased process exactly.

**RULE:** Do NOT edit a video without first loading the correct sub-skill. The sub-skill contains the full process, duration tiers, component choices, and density rules.

### Step 3: Load Shared Knowledge

Both sub-skills reference the shared knowledge below. Read this section for component library, brand assets, and rules.

---

## Shared Knowledge

### Pop-Out Component Library (Current Production)

#### Pop-Out Components

| Component | Use Case | Key Props |
|-----------|----------|-----------|
| `ConceptOverlay` | **Long-form primary (tutorial style)** — solid-white/frosted/dark-blur bg, multiple entrances | `durationInFrames`, `illustration`, `caption?`, `subtitle?`, `illustrationSize`, `accentColor`, `entrance`, `backgroundStyle` |
| `FloatingKeyword` | **Long-form primary (talking-head style)** — bold text + visuals floating on video, speaker always visible. Matt Gray / Founder OS aesthetic. | `durationInFrames`, `text`, `side`, `icon?`, `visual?`, `customVisual?`, `color?`, `fontSize?`, `topPercent?`, `subtext?`, `visualOnly?` |
| `AppleStylePopup` | **Short-form primary** — premium white bg, spring animation | `durationInFrames`, `illustration`, `caption?`, `subtitle?`, `illustrationSize`, `accentColor` |
| `FloatingCard` | Tier 2 supporting details — speaker remains visible | `durationInFrames`, `icon?`, `caption`, `subtitle?`, `position?`, `accentColor?` |
| `PlatformCascade` | Progressive logo grid reveal (platforms accumulate) | Platform logo array |
| `AnnotationBadge` | Metadata pills — small labels ONLY, never for key moments | Label text |
| `KineticText` | Per-character spring animation — hype words ONLY, not concepts | Text content |

#### Long-Form Style Selection Guide

| Video Type | Primary Component | When to Use |
|------------|------------------|-------------|
| Tutorial / walkthrough (screen share heavy) | `ConceptOverlay` | Speaker explains concepts, then shows screen. Pop-outs appear during explanation. |
| Talking-head / story-driven (face on camera) | `FloatingKeyword` | Speaker talks to camera most of the time. Keywords float beside speaker. No full-screen overlays — speaker always visible. |

**FloatingKeyword Style Details:**
- Bold text floats directly on video — NO background panels
- Placed left/right of speaker at 5% from edges
- Supports: `customVisual` (React components), `visual` (images), `icon` (small logos), `visualOnly` (no text)
- Custom illustration components live in a separate `*Illustrations.tsx` file per composition
- Pair with `MissionTracker` (video game HUD) for tutorial phases
- Reference: `ClaudeCreatives.tsx` + `ClaudeCreativesIllustrations.tsx`

**RULE:** Legacy components (BigIllustrationReveal, OrangeIllustrationReveal, CleanIllustrationReveal, IllustrationReveal, ConceptIconReveal, StackedIconsReveal, SmoothCardReveal, BRollIllustration, WhitePopupReveal) are **deprecated**. Do NOT use in new compositions.

#### Caption Components

| Component | Use Case |
|-----------|----------|
| `FullWidthCaption` | Long-form word-by-word captions |
| `PhraseCaption` | Short-form auto-chunking 3-5 word phrases |

#### Structure & Effects Components

| Component | Use Case |
|-----------|----------|
| `FloatingSourceFrame` | PIP overlay showing real source video (top-right) |
| `DynamicZoomWrapper` | Keyframe-based zoom (short-form only — long-form = flat 1.0) |
| `CornerSectionBadge` | Top-left section markers |
| `TransitionFlash` | White flash transitions (8 frames) |

---

### Brand Asset Library (`public/logos/`)

| Asset | File |
|-------|------|
| Claude Code | `claude-code-terminal.webp` (dark terminal, ASCII block font) |
| Claude AI | `claude-ai-icon.svg` (starburst), `claude-ai-wordmark.png` |
| INFINITX | `infinitx-logo.png` (root public/) |
| GitHub | `github-mark.svg` |
| 13 Platform SVGs | `x.svg`, `instagram.svg`, `linkedin.svg`, `tiktok.svg`, `bluesky.svg`, `facebook.svg`, `youtube.svg`, `pinterest.svg`, `threads.svg`, `googlebusiness.svg`, `telegram.svg`, `snapchat.svg`, `reddit.svg` |

**RULE:** ALWAYS use real images (`Img` + `staticFile()`) for brand logos. NEVER recreate logos as SVG.

---

### Volume Hierarchy

| Layer | Volume | Notes |
|-------|--------|-------|
| Speaker voiceover | 1.0 | Untouched (OffthreadVideo) |
| SFX pop | 0.20-0.25 | Pop-out entrances |
| SFX whoosh | 0.14-0.20 | Transitions, hero moments |
| Background music | 0.02 | Barely audible lofi (long-form: first 35s only) |
| Content videos | 0.0 | MUTED always (`volume={0}`) |

---

### The 10 Hard-Won Rules (Never Break These)

1. **staticFile() = ROOT public/ only.** Never put assets in `remotion/public/`. Copy to root `public/` and restart studio.
2. **Restart studio after adding static files.** Remotion caches at startup. New files 404 until restart.
3. **Kill all node processes before port changes.** `taskkill //F //IM node.exe` on Windows.
4. **Always use `<Img>` from remotion, never HTML `<img>`.** Remotion's Img ensures load-before-render.
5. **`premountFor={fps}` on every Sequence.** Prevents flash-of-empty-content.
6. **Pop-out elements must fade out before next pop-out starts.** Use `durationInFrames` + `interpolate` for fade-out.
7. **SFX density per format.** Short-form: 5-20. Long-form: 35-40 with variety per type. Never per-word.
8. **Full-screen overlays need opaque backgrounds.** Transparent overlays won't cover captions beneath.
9. **Intro overlay vs separate scene — always clarify.** "On top of me speaking" = overlay. "White screen first" = separate scene.
10. **Every video needs an outro CTA.** Logo + CTA text in final 2-3 seconds.
11. **Pipeline clips: video `volume={1}`.** For pipeline clips (extracted from long-form), the speaker's voice is baked into the video file. Use `volume={1}` on OffthreadVideo, not `volume={0}`.
12. **Word data MUST be transcribed from the actual video.** Transcribe from the video being rendered, not derived from a parent/master transcript. Extraction padding causes timestamp drift.
13. **Caption positioning must be verified visually.** Take a screenshot of the video to determine layout type (talking-head vs split-screen) before setting the caption bottom position.

---

### V2 Illustration Pattern (Motion)

**Location:** `remotion/lib/illustrations/`

Add motion using `useCurrentFrame()` + `interpolate()`:

**Motion Types:**
- Count-up animations (numbers animate to target)
- Stroke draw (`strokeDashoffset` animation)
- Staggered reveals (elements appear with delays)
- Pulse animations (heartbeat via `frame % period`)
- Spring entrances (`spring()` from remotion)

**Design for White Backgrounds:**
- Dark strokes (#1A1A1A, #333333) for contrast
- Colored fills from `COLORS` palette (`remotion/lib/colors.ts`)
- Drop shadows for depth. No white-on-white elements.

```tsx
export const ConceptNameV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const scale = spring({ frame, fps: 30, from: 0, to: 1,
    config: { damping: 14, stiffness: 100 } });
  const animatedValue = interpolate(frame, [0, 60], [0, 100],
    { extrapolateRight: "clamp" });
  return (
    <svg viewBox="0 0 600 600" width={size} height={size}>
      {/* Dark strokes, colored fills, designed for white bg */}
    </svg>
  );
};
```

---

## References

| File | Purpose |
|------|---------|
| `.claude/skills/long-form-editing/SKILL.md` | **Long-form editing process** (5+ min) |
| `.claude/skills/short-form-editing/SKILL.md` | **Short-form editing process** (< 90s) |
| `remotion/compositions/CraftingOutreachCampaign.tsx` | Long-form gold standard (28min, 35+ overlays) |
| `remotion/compositions/Clip6VoiceControlDemoV3.tsx` | Short-form standalone gold standard |
| `remotion/compositions/Clip1FromZeroTo90K.tsx` | Pipeline clip gold standard |
| `remotion/compositions/ClaudeOpus46Announcement.tsx` | Announcement gold standard |
| `remotion/lib/config.ts` | FPS (30), resolution presets |
| `remotion/lib/colors.ts` | Brand color palette |
| `remotion/components/` | Reusable components |
| `remotion/lib/illustrations/` | SVG illustration library |
| `remotion/data/` | Word-level transcript data |

---

## Supporting Documentation

These files provide additional reference (legacy from V6):

| File | Content |
|------|---------|
| `QUICK-REFERENCE.md` | Decision matrices, code patterns |
| `ASSET-MANAGEMENT.md` | Asset sourcing, file organization |
| `EXECUTION-ROADMAP.md` | Step-by-step execution guide |
| `EVOLUTION-PROCESS.md` | How the editing system evolved |

---

## Evolution Check (End of Every Invocation)

1. Did the format detection fail or feel wrong? → Improve routing logic
2. Is a new video format emerging (medium-form, series)? → Create new sub-skill
3. Did the sub-skill miss something shared? → Add to this router's shared knowledge
4. Was a deprecated component used? → Flag and update

---

*Version: 7.0 | Updated: 2026-02-12 | Separated from 1459-line monolith into router + long-form-editing + short-form-editing sub-skills. Legacy components deprecated. Terminology: "pop-outs" (not "popups").*
