---
name: video-upload-helper
description: Upload and compress videos for YouTube publishing. Handles local compression via HandBrake and upload to Late storage.
allowed-tools:
  - Bash(*)
  - Read
  - Write
---

# Video Upload Helper

Compress and upload videos for YouTube publishing via Late.

## Quick Start

User provides: Local video file path
Output: Video URL ready for Late publishing (under 500MB)

## API Key
```
sk_7e0b73779f132c45094e7c87841bf8582ad3fd0b6204c92b977ffc6303a7d724
```

## Size Limit

**IMPORTANT:** Late has a 500MB upload limit. All videos must be compressed to under 500MB before uploading.

---

## Workflow

### Step 1: Check Video Size

```powershell
(Get-Item "PATH_TO_VIDEO").Length / 1MB
```

- If **under 500MB**: Skip to Step 3 (upload directly)
- If **over 500MB**: Proceed to Step 2 (compress)

### Step 2: Compress with HandBrake (Local)

Use HandBrake CLI with NVENC GPU acceleration for fast compression:

```bash
"C:\Users\enriq\AppData\Local\Microsoft\WinGet\Packages\HandBrake.HandBrake.CLI_Microsoft.Winget.Source_8wekyb3d8bbwe\HandBrakeCLI.exe" \
  -i "INPUT_VIDEO_PATH" \
  -o "OUTPUT_VIDEO_PATH" \
  -e nvenc_h264 \
  -q 26 \
  -B 128 \
  --encoder-preset medium \
  -O
```

**Quality Settings (CRF-like):**
| Target Size | Quality (-q) | Use Case |
|-------------|--------------|----------|
| < 200MB | 26-28 | Short videos (<10 min) |
| 200-400MB | 22-24 | Medium videos (10-30 min) |
| 400-500MB | 20-22 | Long videos (high quality) |

**Monitor Progress:**
```powershell
Get-Content "OUTPUT_PATH" -Tail 1
```

**Verify Output Size:**
```powershell
(Get-Item "OUTPUT_PATH").Length / 1MB
```

If still over 500MB, increase quality value (higher = smaller file) and re-compress.

### Step 3: Get Late Presigned Upload URL

```bash
curl -s -X POST "https://getlate.dev/api/v1/media/presign" \
  -H "Authorization: Bearer sk_7e0b73779f132c45094e7c87841bf8582ad3fd0b6204c92b977ffc6303a7d724" \
  -H "Content-Type: application/json" \
  -d '{"filename": "video-name.mp4", "contentType": "video/mp4"}'
```

**Response:**
```json
{
  "uploadUrl": "https://late-media.../presigned-url",
  "publicUrl": "https://media.getlate.dev/temp/video-name.mp4"
}
```

### Step 4: Upload to Late Storage

```bash
curl -X PUT "$UPLOAD_URL" \
  -H "Content-Type: video/mp4" \
  --upload-file "COMPRESSED_VIDEO_PATH" \
  --progress-bar
```

The `publicUrl` from Step 3 is now ready to use with youtube-content-package.

---

## Local Tool Paths

**HandBrake CLI:**
```
C:\Users\enriq\AppData\Local\Microsoft\WinGet\Packages\HandBrake.HandBrake.CLI_Microsoft.Winget.Source_8wekyb3d8bbwe\HandBrakeCLI.exe
```

**FFmpeg (alternative):**
```
C:\Users\enriq\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe
```

---

## FFmpeg Alternative

If HandBrake is unavailable:

```bash
"PATH_TO_FFMPEG" -i "INPUT" -c:v libx264 -crf 26 -preset medium -c:a aac -b:a 128k "OUTPUT"
```

Note: FFmpeg without GPU is slower than HandBrake with NVENC.

---

## Compression Time Estimates (NVENC)

| Original Size | Compressed Size | Time |
|---------------|-----------------|------|
| 500MB | ~200MB | 1-2 min |
| 1GB | ~350MB | 3-4 min |
| 1.5GB+ | ~400MB | 4-6 min |

---

## Integration with YouTube Content Package

After upload completes, the public URL is ready for the full workflow:

```
/youtube-content-package https://media.getlate.dev/temp/your-video.mp4
```

---

## Troubleshooting

**HandBrake not found:**
```powershell
winget install HandBrake.HandBrake.CLI
```

**NVENC not available:**
- Requires NVIDIA GPU
- Fall back to `-e x264` (slower but works on any system)

**Upload fails:**
- Check file size is under 500MB
- Presigned URLs expire in 1 hour
- Verify API key is correct
