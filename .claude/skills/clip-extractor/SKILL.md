---
name: clip-extractor
description: "Extract and intelligently reframe clips from long-form 16:9 videos into 9:16 portrait or 1:1 square formats with face-tracking crop. Use for 'extract clips', 'reframe video', 'clip extractor', 'portrait crop', 'face tracking', '16:9 to 9:16', 'smart crop', 'make shorts from video', 'auto reframe'."
argument-hint: [video_file_path]
allowed-tools:
  - Bash(python:*)
  - Bash(ffmpeg:*)
  - Bash(ffprobe:*)
  - Bash(pip:*)
  - Read
  - Write
metadata:
  category: video-production
  version: 1.0
  phase: 1
---

# Clip Extractor

Local Python pipeline that takes 16:9 landscape videos and produces 9:16 portrait clips with intelligent layout detection and reframing. Supports 4 layout modes with automatic detection. CapCut-level auto-reframe quality, fully local, zero cost per clip.

## Layout Modes

The reframer auto-detects the appropriate layout based on video content:

| Mode | Trigger | Top Half | Bottom Half | Use Case |
|------|---------|----------|-------------|----------|
| **9x16 face-track** | Face detection ≥ 15% | — (single crop) | — (single crop) | Talking head, vlog, direct-to-camera |
| **1x1 face-track** | `--format 1x1` | — (square crop) | — (square crop) | Instagram feed, LinkedIn |
| **Split: multi-face** | `--format split` | Full 16:9 source | Side-by-side face close-ups | Zoom calls, interviews, podcasts |
| **Split: dynamic podcast** | `--format split` + mixed layouts | Layout-aware per-segment | Layout-aware per-segment | Podcasts, interviews with camera switching |
| **Split: screen-share** | Auto (face < 15%, webcam found) | Full screen share | Webcam face enlarged | Tutorials, demos, screen recordings |

### Auto-Detection Flow

```
reframe --format 9x16
  → analyze (face detection, pose, saliency)
  → face_detected_pct ≥ 15%? → standard 9x16 face-track render
  → face_detected_pct < 15%? → scan 4 corners for webcam overlay
      → webcam found? → split-screen render (screen-share mode)
      → no webcam?   → fallback to standard render (pose-guided)
```

### Screen-Share Split Layout (Auto-Detected)

For screen recordings with a small webcam overlay (OBS, Zoom share, etc.):

```
┌─────────────────┐
│                  │
│  Full screen     │  ← Top 50%: entire 16:9 frame (screen content)
│  share content   │
│                  │
├─────────────────┤
│                  │
│   Face enlarged  │  ← Bottom 50%: webcam face cropped and enlarged
│   from webcam    │
│                  │
└─────────────────┘
     1080x1920
```

**How it works:**
1. Standard analysis detects very low face % (webcam face is tiny in the full frame)
2. Corner scanner (`_find_webcam_overlay`) crops each corner region, upscales, runs DNN face detection
3. The corner with consistent face detections = webcam overlay position
4. Split renderer uses the detected position for the bottom-half face crop
5. MediaPipe face landmarker fine-tunes vertical centering

**Config:** `screenshare` section in `config.yaml`

### Dynamic Podcast Layout Detection (Phase 6)

For podcasts and interviews where the source camera **switches between gallery view and close-up**, the reframer auto-detects layout changes and renders each segment appropriately.

**How it works:**
1. During `analyze()`, face data (`all_faces`) is stored per keyframe via OpenCV DNN
2. `layout_detector.py` classifies each keyframe by **face size** (primary) + **spatial spread** (secondary):
   - `SPLIT_SCREEN`: 2+ faces, median face width < 0.06, horizontal spread > 0.15
   - `CLOSE_UP`: faces with median width > 0.04, horizontal spread < 0.12
3. Majority-vote smoothing (15-keyframe window) eliminates single-frame noise
4. Short segments (< 1.0s) are merged into neighbors
5. **Zero extra video scan** — reuses existing detection data

**Rendering per segment:**
- **Split-screen segments**: Per-frame DNN face detection, per-speaker Kalman smoothing, smart cropping (each speaker fills their half, no overlap), mouth-centered vertically
- **Close-up segments**: Standard 9:16 face-tracking crop from keyframes
- **Transitions**: 5-frame alpha crossfade between layout modes

**Anti-jitter measures:**
- Kalman filter: `process_noise=0.001`, `measurement_noise=0.15` (trusts predictions 150x more than raw detections)
- 1.2% deadzone: ignores face movements smaller than 1.2% of frame width
- Speaker identity tracking: nearest-neighbor matching prevents speaker swaps

**Config:** `split_screen.dynamic_layout` section in `config.yaml`

```yaml
dynamic_layout:
  enabled: true
  face_size_threshold: 0.06      # Faces below this = gallery/split
  spatial_spread_threshold: 0.15  # Min H-distance between faces for split
  min_segment_duration: 1.0      # Merge segments shorter than this (seconds)
  smoothing_window: 15           # Majority vote window (keyframes)
  crossfade_frames: 5            # Transition crossfade duration
  mouth_centering: true          # Use MediaPipe mouth landmarks
```

## Architecture

```
Input: 16:9 video (full source or pre-cut clip)
  → [Face Detection] MediaPipe BlazeFace per sampled frame
  → [Temporal Smoothing] EMA/Kalman to prevent jitter
  → [Deadzone] Suppress micro-movements
  → [Layout Detection] Auto-detect: face-track vs screen-share split
  → [crop_path.json] Inspectable intermediate (user can edit before render)
  → [Render] Face-track crop OR split-screen layout → 1080x1920 output
Output: 9:16 portrait clip with appropriate layout
```

**Python package:** `tools/clip_extractor/`
**Config:** `tools/clip_extractor/config.yaml` (all thresholds tunable)

## Prerequisites

```bash
# Install dependencies (one-time)
cd tools && pip install -r clip_extractor/requirements.txt

# Verify
python -c "import mediapipe; print('MediaPipe:', mediapipe.__version__)"
ffmpeg -version | head -1
```

**RULE:** If deps are not installed, install them before proceeding.

## Workflow

| Phase | Name | What Happens |
|-------|------|-------------|
| 0 | CONTEXT | Check deps, identify source video, read config |
| 1 | EXTRACTION | FFmpeg stream-copy cut (if timestamps provided) or use pre-cut clip |
| 2 | REFRAME | Python engine: detect → smooth → deadzone → crop_path.json → render |
| 3 | OUTPUT | Report stats, generate metadata, hand off to `/edit` or posting |
| 4 | EVOLVE | Check for patterns and evolution opportunities |

### Phase 0: CONTEXT

1. Confirm video file exists and get metadata:
```bash
ffprobe -v quiet -print_format json -show_format -show_streams -select_streams v:0 "VIDEO_PATH"
```

2. Check dependencies are installed:
```bash
python -c "import mediapipe, cv2, numpy, yaml; print('All deps OK')"
```

3. Read config if custom path provided, otherwise use defaults from `tools/clip_extractor/config.yaml`.

### Phase 1: EXTRACTION (Optional)

If user provides start/end timestamps, extract the clip first:
```bash
python -m clip_extractor reframe --video "SOURCE.mp4" --start 120.5 --end 196.5 --output "clips/clip-01/" --format 9x16
```

If user provides a pre-cut clip, skip extraction — pass directly to reframe:
```bash
python -m clip_extractor reframe --video "CLIP.mp4" --output "clips/clip-01/" --format 9x16
```

### Phase 2: REFRAME

The engine runs automatically within the CLI command. The pipeline:

1. **Detect faces** — MediaPipe BlazeFace on every Nth frame (adaptive: 3rd for <5min, 6th for 5-30min, 10th for 30min+)
2. **Smooth positions** — EMA (alpha=0.12) prevents jittery crop movement
3. **Apply deadzone** — Don't move crop unless face shifts >5% of frame width
4. **Compute crop** — Center 9:16 window on smoothed face position, clamp to frame boundaries
5. **Write crop_path.json** — Inspectable intermediate with per-keyframe coordinates
6. **Render** — Frame-by-frame OpenCV→FFmpeg pipe with NVENC auto-detect

**Review crop_path.json before rendering** (analyze-only mode):
```bash
python -m clip_extractor analyze --video "CLIP.mp4" --output "crop_path.json"
# Review, then render:
python -m clip_extractor render --video "CLIP.mp4" --crop-path "crop_path.json" --output "reframed-9x16.mp4"
```

### Phase 3: OUTPUT

After reframe completes, report to user:
- Face detection percentage (should be >90% for talking head videos)
- Average confidence score
- Output file location and size
- Suggest next step: `/edit` for Remotion overlays or direct posting

### Phase 4: EVOLVE

Standard evolution check.

## CLI Commands

```bash
# Full pipeline (most common)
python -m clip_extractor reframe --video FILE --output DIR [--start SEC --end SEC] [--format 9x16|1x1|split]

# Analyze only (inspect crop_path.json first)
python -m clip_extractor analyze --video FILE [--output FILE]

# Render from edited crop_path.json
python -m clip_extractor render --video FILE --crop-path FILE --output FILE

# Batch (multiple clips from definitions file)
python -m clip_extractor batch --video FILE --clips FILE --output DIR
```

**IMPORTANT:** Run from the `tools/` directory: `cd tools`
The CLI uses `python -m clip_extractor` which requires being in the parent of the `clip_extractor` package.

## Batch Mode

Create a `clip_definitions.json`:
```json
[
  {"id": 1, "title": "hook-moment", "start": 45.2, "end": 121.1},
  {"id": 2, "title": "key-insight", "start": 340.0, "end": 418.5}
]
```

```bash
python -m clip_extractor batch --video "source.mp4" --clips "clip_definitions.json" --output "clips/"
```

## Output Structure

```
output_dir/
  raw.mp4              # Landscape extract (if start/end provided)
  crop_path.json       # Inspectable crop coordinates
  reframed-9x16.mp4   # Final portrait output
```

## Config Tuning

Edit `tools/clip_extractor/config.yaml` to adjust behavior without code changes.

| Parameter | Default | Effect |
|-----------|---------|--------|
| `detection.face.min_confidence` | 0.5 | Lower = detect more faces (incl. side profiles) |
| `smoothing.ema.alpha` | 0.12 | Lower = smoother (more lag). Try 0.08 for slow speakers |
| `deadzone.threshold_pct` | 0.05 | Lower = more responsive. Try 0.03 for animated speakers |
| `output.crf` | 18 | Lower = higher quality, bigger file. 18-23 recommended |
| `output.use_nvenc` | auto | "force" for GPU, "disable" for CPU-only |
| `split_screen.dynamic_layout.face_size_threshold` | 0.06 | Lower = more frames classified as split-screen |
| `split_screen.dynamic_layout.smoothing_window` | 15 | Higher = more stable segment boundaries |
| `split_screen.dynamic_layout.crossfade_frames` | 5 | Frames for layout transition crossfade |

## Non-Negotiable Rules

1. **NEVER render without crop_path.json** — always generate and inspect first
2. **NEVER re-encode during extraction** — use `ffmpeg -c copy` for stream copy
3. **ALWAYS check face detection %** — below 80% means detection config needs tuning
4. **NEVER produce black bars** — boundary clamping is always on
5. **ALWAYS use NVENC when available** — 5-10x faster than libx264

## Integration

- **Upstream:** `extracting-transcripts` for word-level transcripts (clip selection)
- **Downstream:** `short-form-editing` for Remotion overlays, `short-form-posting` for publishing
- **Replaces:** Manual `PORTRAIT-CONVERSION.md` process, static `FaceCenteredVideo.tsx` transform

## Clip Selection (Optional, Deferred)

Clip selection from transcript analysis is planned but not yet built. When ready:
- User provides custom prompts for what makes a good clip moment
- Configurable: number of clips, duration range, selection criteria
- Claude analyzes transcript and outputs `clip_definitions.json` for batch mode

## References

- `tools/clip_extractor/config.yaml` — All tunable parameters
- `tools/clip_extractor/requirements.txt` — Python dependencies
- `.claude/skills/clip-extractor/references/reframe-engine-api.md` — Python module API
- `.claude/skills/clip-extractor/references/crop-path-schema.md` — crop_path.json schema
- `_config/SKILL.md` — Profile data for publishing

## Evolution Check (End of Every Invocation)

1. Did face detection fail on a video type not yet encountered? → Note the type and config adjustment
2. Was the default config inadequate? → Document recommended config per video type
3. Did the user manually edit crop_path.json? → Analyze what they changed as a pattern
4. Did rendering fail or produce artifacts? → Document the fix

**Version:** 2.0
**Status:** Phase 6 — Dynamic Podcast Layout Detection
