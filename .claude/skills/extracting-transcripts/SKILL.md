---
name: extracting-transcripts
description: Extracts transcripts from video files using local WhisperX (preferred) or faster-whisper with GPU acceleration. Use when the user needs to transcribe a video, get captions, extract audio text, or convert video/audio to text. Triggers on "transcript", "transcribe", "speech to text", "video to text", "extract captions".
argument-hint: [video-url]
allowed-tools:
  - Bash(curl:*)
  - Bash(python:*)
  - Read
  - Write
---

# Extracting Video Transcripts

Two methods available: **Local GPU** (preferred for local files) and **IX Toolkit API** (for URLs).

## Local GPU Transcription (PREFERRED for local files)

**CRITICAL: ALWAYS use GPU. NEVER use CPU.**

```python
from faster_whisper import WhisperModel

# ALWAYS device='cuda' + compute_type='float16' — NEVER device='cpu'
model = WhisperModel('small', device='cuda', compute_type='float16')
segments, info = model.transcribe('path/to/video.mp4', word_timestamps=True, language='en')

for seg in segments:
    print(f'[{seg.start:.2f}s - {seg.end:.2f}s] {seg.text}')
    if seg.words:
        for w in seg.words:
            print(f'  {w.start:.2f}s: "{w.word.strip()}"')
```

**GPU vs CPU performance:**
| Video Length | GPU (cuda) | CPU | Speedup |
|-------------|-----------|-----|---------|
| 5 min | ~15s | ~4 min | 16x |
| 28 min | ~2 min | ~22 min | 11x |

**Model selection:**
| Model | Speed | Accuracy | Use when |
|-------|-------|----------|----------|
| `tiny` | Fastest | Basic | Quick preview, short clips |
| `base` | Fast | Good | Short videos (<5 min) |
| `small` | Balanced | Very good | Standard videos (default) |
| `medium` | Slower | Excellent | Critical accuracy needed |

**Install:** `python -m pip install faster-whisper`

**Output to JSON for Remotion word data:**
```python
import json
all_words = []
for seg in segments:
    if seg.words:
        for w in seg.words:
            all_words.append({'start': w.start, 'end': w.end, 'word': w.word.strip()})
with open('transcript.json', 'w') as f:
    json.dump({'words': all_words, 'duration': info.duration}, f, indent=2)
```

---

## IX Toolkit API (for URLs / cloud videos)

Extract transcripts from video or audio URLs using the IX Toolkit transcription API (powered by Whisper).

## Get Transcript as URL (Recommended)

Use `response_type: "cloud"` to get URLs for text and SRT (for video timelines):

```bash
curl -s --max-time 600 -X POST "https://no-code-architects-toolkit-34937875766.us-central1.run.app/v1/media/transcribe" \
  -H "x-api-key: ixtoolkit2000" \
  -H "Content-Type: application/json" \
  -d '{
    "media_url": "$ARGUMENTS",
    "task": "transcribe",
    "include_text": true,
    "include_srt": true,
    "response_type": "cloud"
  }'
```

**Response:**
```json
{
  "response": {
    "text_url": "https://storage.googleapis.com/.../transcript.txt",
    "srt_url": "https://storage.googleapis.com/.../transcript.srt"
  }
}
```

The SRT file contains timestamps useful for video editing and chapter markers.

## Quick Extraction (Inline Text)

For shorter videos, get transcript as inline text:

```bash
curl -s --max-time 600 -X POST "https://no-code-architects-toolkit-34937875766.us-central1.run.app/v1/media/transcribe" \
  -H "x-api-key: ixtoolkit2000" \
  -H "Content-Type: application/json" \
  -d '{
    "media_url": "$ARGUMENTS",
    "task": "transcribe",
    "include_text": true
  }' | jq -r '.response.text // .message'
```

**Response with URL:**
```json
{
  "response": {
    "text_url": "https://storage.googleapis.com/.../transcript.txt"
  }
}
```

## Workflow

1. **Get the video URL** from the user (or use $ARGUMENTS if provided)
2. **Validate URL** - Must be publicly accessible (GCS, S3, direct HTTP URL)
3. **Choose output format**:
   - `include_text: true` - Plain text transcript (default, fastest)
   - `include_srt: true` - SRT subtitle format with timestamps
   - `include_segments: true` - JSON with word-level timing
4. **Execute the API call** and wait for response
5. **Present the transcript** to the user

## API Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `media_url` | string | required | Video or audio URL to transcribe |
| `task` | string | "transcribe" | "transcribe" or "translate" (to English) |
| `include_text` | boolean | true | Include plain text output |
| `include_srt` | boolean | false | Include SRT subtitle format |
| `include_segments` | boolean | false | Include timestamped word segments |
| `response_type` | string | "direct" | **"cloud"** to get URLs, "direct" for inline content |
| `language` | string | auto | Source language code (optional) |
| `word_timestamps` | boolean | false | Enable word-level timing |
| `words_per_line` | integer | - | Words per subtitle line (min: 1) |

## Supported Formats

- **Video**: MP4, MOV, WebM, MKV, AVI
- **Audio**: MP3, WAV, M4A, FLAC, OGG

## Example: Text Only (Default)

```bash
curl -s -X POST "https://no-code-architects-toolkit-34937875766.us-central1.run.app/v1/media/transcribe" \
  -H "x-api-key: ixtoolkit2000" \
  -H "Content-Type: application/json" \
  -d '{
    "media_url": "https://storage.googleapis.com/my-bucket/video.mp4",
    "task": "transcribe",
    "include_text": true
  }'
```

## Example: With SRT Subtitles

```bash
curl -s -X POST "https://no-code-architects-toolkit-34937875766.us-central1.run.app/v1/media/transcribe" \
  -H "x-api-key: ixtoolkit2000" \
  -H "Content-Type: application/json" \
  -d '{
    "media_url": "https://storage.googleapis.com/my-bucket/video.mp4",
    "task": "transcribe",
    "include_text": true,
    "include_srt": true
  }'
```

## Example: Translate to English

```bash
curl -s -X POST "https://no-code-architects-toolkit-34937875766.us-central1.run.app/v1/media/transcribe" \
  -H "x-api-key: ixtoolkit2000" \
  -H "Content-Type: application/json" \
  -d '{
    "media_url": "https://example.com/spanish-video.mp4",
    "task": "translate",
    "include_text": true
  }'
```

## Response Format

### Inline Response (response_type: "direct")
```json
{
  "code": 200,
  "response": {
    "text": "Full transcript text here...",
    "srt": "1\n00:00:00,000 --> 00:00:05,000\nFirst line...",
    "segments": [{"start": 0, "end": 5, "text": "..."}]
  },
  "message": "success"
}
```

### URL Response (response_type: "cloud")
```json
{
  "code": 200,
  "response": {
    "text_url": "https://storage.googleapis.com/.../transcript.txt",
    "srt_url": "https://storage.googleapis.com/.../transcript.srt",
    "segments_url": "https://storage.googleapis.com/.../segments.json"
  },
  "message": "success"
}
```

### Error Response
```json
{
  "code": 500,
  "message": "Error description"
}
```

## Error Handling

| Code | Meaning | Solution |
|------|---------|----------|
| 401 | Invalid API key | Check x-api-key header |
| 429 | Queue full | Wait and retry |
| 500 | Processing error | Check if video URL is accessible |

## For Long Videos (Async Job - RECOMMENDED)

If you get "upstream request timeout", use async processing. This triggers a **Cloud Run Job** that processes in the background.

### Step 1: Trigger Async Job

```bash
curl -s -X POST "https://no-code-architects-toolkit-34937875766.us-central1.run.app/v1/media/transcribe" \
  -H "x-api-key: ixtoolkit2000" \
  -H "Content-Type: application/json" \
  -d '{
    "media_url": "$ARGUMENTS",
    "task": "transcribe",
    "include_text": true,
    "include_srt": true,
    "response_type": "cloud",
    "webhook_url": "https://httpbin.org/post"
  }' --max-time 30
```

**Response (immediate):**
```json
{
  "job_id": "df399ce1-c06b-4041-99e5-2084087bc3a6",
  "queue_id": "no-code-architects-toolkit-vdttq",
  "message": {
    "job_submitted": true,
    "execution_name": "projects/.../executions/no-code-architects-toolkit-vdttq"
  }
}
```

The `queue_id` (e.g., `vdttq`) is the execution ID visible in Google Cloud Run Jobs.

### Step 2: Poll Job Status

Poll every 30-60 seconds until status changes from "submitted" to "completed":

```bash
curl -s -X POST "https://no-code-architects-toolkit-34937875766.us-central1.run.app/v1/toolkit/job/status" \
  -H "x-api-key: ixtoolkit2000" \
  -H "Content-Type: application/json" \
  -d '{"job_id": "YOUR_JOB_ID_HERE"}'
```

**Response (while processing):**
```json
{
  "response": {
    "job_id": "df399ce1-c06b-4041-99e5-2084087bc3a6",
    "job_status": "submitted",
    "queue_id": "no-code-architects-toolkit-vdttq"
  }
}
```

**Response (when complete):**
```json
{
  "response": {
    "job_id": "df399ce1-c06b-4041-99e5-2084087bc3a6",
    "job_status": "completed",
    "response": {
      "text_url": "https://storage.googleapis.com/.../transcript.txt",
      "srt_url": "https://storage.googleapis.com/.../transcript.srt"
    }
  }
}
```

### Polling Script Example

```bash
JOB_ID="YOUR_JOB_ID"
while true; do
  STATUS=$(curl -s -X POST "https://no-code-architects-toolkit-34937875766.us-central1.run.app/v1/toolkit/job/status" \
    -H "x-api-key: ixtoolkit2000" \
    -H "Content-Type: application/json" \
    -d "{\"job_id\": \"$JOB_ID\"}" | jq -r '.response.job_status')

  echo "Status: $STATUS"

  if [ "$STATUS" = "completed" ]; then
    echo "Job complete! Fetching results..."
    curl -s -X POST "https://no-code-architects-toolkit-34937875766.us-central1.run.app/v1/toolkit/job/status" \
      -H "x-api-key: ixtoolkit2000" \
      -H "Content-Type: application/json" \
      -d "{\"job_id\": \"$JOB_ID\"}" | jq '.response.response'
    break
  fi

  sleep 30
done
```

### Job Statuses

| Status | Meaning |
|--------|---------|
| `submitted` | Job is queued or running in Cloud Run |
| `completed` | Job finished - results available in response |
| `failed` | Job failed - check error message |

### View Jobs in Google Cloud Console

Jobs appear at: **Cloud Run > Jobs > no-code-architects-toolkit > History**

Each execution has a suffix like `vdttq` matching the `queue_id` returned by the API.

## Notes

- **Timeout**: Use `--max-time 600` (10 min) for long videos to avoid exit code 56
- **Long videos**: Use `webhook_url` for async processing if server times out
- **Recommended**: Use `response_type: "cloud"` - returns faster than inline text
- Transcription may take 1-5 minutes for longer videos
- Video must be publicly accessible (no authentication required)
- Response includes only requested formats (text/srt/segments)
- For best results, use high-quality audio sources
