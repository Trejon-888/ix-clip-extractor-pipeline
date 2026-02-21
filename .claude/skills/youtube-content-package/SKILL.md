---
name: youtube-content-package
description: Creates complete YouTube video packages including title, description, keywords, timestamps, thumbnail concepts, and posting via Late MCP. Use when user wants to publish a video, create YouTube content, or needs help with video SEO.
---

# YouTube Content Package

Create complete YouTube video packages with optimized titles, descriptions, keywords, timestamps, and thumbnail concepts.

## Full Workflow Overview

1. **Check video size** - Must be under 500MB
2. **Compress if needed** - Local HandBrake with GPU
3. **Upload to Late storage** - Get video URL
4. **Extract transcript** - Local faster-whisper with GPU
5. **Create content package** - Title, description, tags, etc.
6. **ASK USER FOR THUMBNAIL** - REQUIRED before posting
7. **Get user approval** - Confirm content package
8. **Post via Late API** - Publish to YouTube with all fields
9. **Log to database** - Track for analytics

---

## CRITICAL: Pre-Post Requirements

**NEVER post without:**
1. Asking user for thumbnail image
2. Confirming the title with user
3. Showing complete content package for review
4. Getting explicit approval to post

---

## Step 0: Check & Compress Video

### Check Size
```powershell
(Get-Item "VIDEO_PATH").Length / 1MB
```

**If over 500MB, compress locally:**

```bash
"C:\Users\enriq\AppData\Local\Microsoft\WinGet\Packages\HandBrake.HandBrake.CLI_Microsoft.Winget.Source_8wekyb3d8bbwe\HandBrakeCLI.exe" \
  -i "INPUT_PATH" \
  -o "OUTPUT_PATH" \
  -e nvenc_h264 \
  -q 28 \
  -B 128 \
  --encoder-preset medium \
  -O
```

Use higher -q values (24-28) to get under 500MB. Monitor progress:
```powershell
Get-Content "OUTPUT_PATH" -Tail 1
```

### Upload to Late Storage

Get presigned URL:
```bash
curl -s -X POST "https://getlate.dev/api/v1/media/presign" \
  -H "Authorization: Bearer sk_7e0b73779f132c45094e7c87841bf8582ad3fd0b6204c92b977ffc6303a7d724" \
  -H "Content-Type: application/json" \
  -d '{"filename": "video-name.mp4", "contentType": "video/mp4"}'
```

Upload file:
```bash
curl -X PUT "$UPLOAD_URL" \
  -H "Content-Type: video/mp4" \
  --upload-file "COMPRESSED_VIDEO_PATH" \
  --progress-bar
```

---

## Step 1: Extract Transcript with Timestamps

Use local faster-whisper with GPU (~10x faster than cloud):

```bash
py -3.11 "C:\Users\enriq\Downloads\transcribe.py" "VIDEO_PATH"
```

**Output:** Creates `.txt` (full transcript) and `.srt` (timestamps) in same directory.

**Processing time:** ~2 minutes for 30-minute video with GPU.

See `extracting-transcripts` skill for details and troubleshooting

---

## Step 2: Analyze Content & Create Title

Based on transcript, create 5 title options following these patterns:
- How-to: "How to [Outcome] in [Timeframe] ([Qualifier])"
- Curiosity: "I [Did Something Unexpected] and [Result]"
- Direct benefit: "[Outcome] with [Method/Tool]"
- Question: "Can [Tool/Method] Really [Achieve Outcome]?"
- Statement: "The [Adjective] Way to [Outcome]"

**Title rules:**
- 60 characters max (ideal for display)
- Front-load keywords
- Include power words: Free, New, Proven, Easy, Fast, Simple
- Add parenthetical qualifiers: (Full Demo), (Step-by-Step), (2026)

---

## Step 3: Research Tags

Tags should be **simple, short, and psychologically aligned** with how real people search and how AI agents categorize content.

### Tag Philosophy

1. **Think like the searcher.** What would someone literally type into YouTube? Not full sentences. Short, simple words and phrases. "AI sales" not "AI powered sales campaign automation system."
2. **SEO layer.** Cover the core topic, the tools/methods, and the outcome. YouTube matches tags to search queries. Simple tags cast a wider net.
3. **AI agent layer.** AI systems (Google Discover, YouTube recommendations, ChatGPT search, Perplexity) categorize content semantically. Use clean, unambiguous terms that make it easy for agents to understand what the video is about and who it is for.

### Tag Structure

**Core topic tags (3-5):** The simplest words describing what the video IS about.
- One or two words max. The obvious stuff.
- Example: "AI sales", "sales campaign", "AI marketing"

**Outcome tags (2-3):** What the viewer GETS from watching.
- Example: "get clients", "book appointments", "client acquisition"

**Identity tags (2-3):** WHO is this for. How the target audience describes themselves.
- Example: "agency owner", "lead generation", "marketing agency"

**Tool/method tags (2-3):** Specific tools, systems, or methods shown.
- Example: "AI agent", "sales automation", "outreach system"

**Discovery tags (2-3):** Adjacent topics that bring in related audiences.
- Example: "AI tools", "business growth", "sales system"

### Tag Rules
- **HARD LIMIT: Each tag must be under 28 characters** — YouTube API rejects tags at or near 30 chars. Stay safely under.
- Keep tags simple: 1-3 words each (4 words ONLY if total stays under 28 chars)
- No filler words ("how to use", "best way to")
- No duplicating the title verbatim as a tag
- Prioritize words people actually type, not marketing jargon
- Total of all tags combined must be under 500 characters
- **Before posting, validate every tag:** `tag.length < 28` — if ANY tag fails, shorten it

### Late API Format
Tags are a **string array** in the Late API:
```json
["AI sales", "sales campaign", "AI agent", "get clients", "agency owner", "sales automation"]
```

**Pre-flight check before posting:** Loop through all tags and verify each is under 28 characters. YouTube API will reject the entire post with `invalidTags` error if any single tag is too long.

---

## Step 4: Create Description

**Structure (in order):**

1. **Lead Magnet CTA** (first 2 lines - visible before "Show more")
   ```
   [Hook sentence with value proposition]
   [LEAD_MAGNET_URL]
   ```

2. **Quick Overview** (100-150 words)
   - Simple, digestible language
   - What they'll learn/see
   - Why it matters to them
   - No em-dashes, keep punctuation simple

3. **Social Links**
   ```
   My Links:
   Subscribe: https://www.youtube.com/@enriquemarq-0
   LinkedIn: https://www.linkedin.com/in/enrique-marq-756191319/
   Instagram: https://www.instagram.com/kikefuturo_/
   ```

4. **Timestamps** (consolidated into 10-15 key sections)
   ```
   Timestamps:
   0:00 Section Name
   1:23 Next Section
   ```

5. **Hashtags** (3-5 at the end)
   ```
   #Keyword1 #Keyword2 #Keyword3
   ```

---

## Step 5: Create First Comment CTA

Same CTA as description intro, formatted for engagement:
```
[Question or hook]

[LEAD_MAGNET_URL]

[Brief value statement + call to action]
```

---

## Step 6: ASK USER FOR THUMBNAIL (REQUIRED)

**This step is MANDATORY before posting.**

**Use the `thumbnail-creator` skill** for generating thumbnails. It handles:
- Two-pass face alignment via KIE API (text_to_image → image_to_image face swap)
- 16:9 4K output, one at a time
- See `.claude/skills/thumbnail-creator/SKILL.md` for full process

Use AskUserQuestion tool to ask user:
1. Do you have a thumbnail ready to upload?
2. Should I generate one using the `thumbnail-creator` skill?
3. Or post UNLISTED now and add thumbnail later (two-phase publishing)?

If user provides thumbnail:
- Upload to Late storage and get URL
- Include in post

If user wants generation:
- Invoke the `thumbnail-creator` skill with the concept
- Upload result to Late storage

If user wants to post unlisted first:
- Post without thumbnail (unlisted)
- Generate thumbnail using `thumbnail-creator` skill
- Upload to YouTube Studio manually
- Switch to public

---

## Step 7: Get User Approval

**Before posting, show user:**
1. Title (confirm it's correct)
2. Description preview
3. Tags list
4. First comment CTA
5. Thumbnail status

Use AskUserQuestion to confirm: "Ready to post this to YouTube?"

---

## Step 8: Post via Late API

**Use REST API for full YouTube features (title, tags, firstComment):**

```bash
curl -s -X POST "https://getlate.dev/api/v1/posts" \
  -H "Authorization: Bearer sk_7e0b73779f132c45094e7c87841bf8582ad3fd0b6204c92b977ffc6303a7d724" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "[DESCRIPTION]",
    "mediaItems": [{"url": "[VIDEO_URL]", "type": "video"}],
    "platforms": [{
      "platform": "youtube",
      "accountId": "6978050f77637c5c857c82e9",
      "platformSpecificData": {
        "title": "[VIDEO_TITLE]",
        "visibility": "public",
        "tags": ["tag1", "tag2", "tag3"],
        "firstComment": "[FIRST_COMMENT_CTA]"
      }
    }],
    "publishNow": true
  }'
```

---

## Step 9: Log Post to Content Database

After successful posting, log the post in **two places**: Supabase (for analytics queries) and a local JSON file (for quick reference and backup).

### 9A. Insert into Supabase

Use the Supabase REST API with the service role key to bypass RLS:

```bash
curl -s -X POST "https://odauskdyxyojmskuaqfu.supabase.co/rest/v1/cf_content_posts_log" \
  -H "apikey: [ANON_KEY]" \
  -H "Authorization: Bearer [SERVICE_ROLE_KEY]" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "late_post_id": "LATE_POST_ID",
    "external_post_id": "YOUTUBE_VIDEO_ID",
    "platform": "youtube",
    "title": "VIDEO_TITLE",
    "content": "FULL_DESCRIPTION",
    "media_url": "VIDEO_URL",
    "post_url": "https://www.youtube.com/watch?v=VIDEO_ID",
    "status": "published",
    "published_at": "ISO_DATETIME",
    "tags": ["tag1", "tag2", "tag3"],
    "hashtags": ["Hashtag1", "Hashtag2"],
    "thumbnail_url": "THUMBNAIL_URL",
    "lead_magnet_url": "https://infinitxai.com/free/dfy-campaign-builder"
  }'
```

**Keys** (from `backend/.env`):
- `ANON_KEY`: Value of `VITE_SUPABASE_PUBLISHABLE_KEY` from root `.env`
- `SERVICE_ROLE_KEY`: Value of `SUPABASE_SERVICE_ROLE_KEY` from `backend/.env`

### 9B. Save local JSON log file

Save a JSON file to the `post-logs/` folder inside this skill directory:

**Folder:** `.claude/skills/content-analytics/post-logs/`

**Filename format:** `YYYY-MM-DD_yt_short-slug.json`
- Date: publish date
- `yt`: platform abbreviation
- `short-slug`: 2-4 word kebab-case summary of the video topic

**Example:** `2026-01-27_yt_ai-sales-campaign.json`

**Required fields in the JSON file:**
```json
{
  "supabase_record_id": "UUID from Supabase insert response",
  "late_post_id": "Late API post ID",
  "external_post_id": "YouTube video ID",
  "platform": "youtube",
  "post_url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "published_at": "ISO_DATETIME",
  "title": "Full video title",
  "description": "Full YouTube description",
  "tags": ["tag1", "tag2"],
  "hashtags": ["Hashtag1", "Hashtag2"],
  "first_comment": "First comment CTA text",
  "thumbnail_url": "URL to uploaded thumbnail",
  "media_url": "URL to uploaded video",
  "lead_magnet_url": "Current lead magnet URL",
  "source_video": "Local file path to original video"
}
```

### Why both?
- **Supabase:** Enables analytics queries, joins with other tables, used by the `content-analytics` skill
- **Local JSON:** Lives in `content-analytics/post-logs/` for quick reference without database access, easy to grep/search across all posts, stores the full content package in one place

This enables analytics tracking via the `content-analytics` skill.

---

## Configuration

### Late API
```
API Key: sk_7e0b73779f132c45094e7c87841bf8582ad3fd0b6204c92b977ffc6303a7d724
YouTube Account ID: 6978050f77637c5c857c82e9
```

### Social Links
```
Subscribe: https://www.youtube.com/@enriquemarq-0
LinkedIn: https://www.linkedin.com/in/enrique-marq-756191319/
Instagram: https://www.instagram.com/kikefuturo_/
```

### Branding Colors
- **Personal brand (thumbnails):** Orange `#F97316`
- **IX System logo:** Mint green `#4ADE80` on black `#000000`
- **Text:** Black `#000000` on white, or white `#FFFFFF` on dark

### Lead Magnet (current)
```
https://infinitxai.com/free/dfy-campaign-builder
```

### Description Style Rules
- No em-dashes (use colons or periods instead)
- No emojis unless specifically requested
- Simple, conversational language
- Short paragraphs (2-3 sentences max)
- Blank lines between sections

---

## Timestamp Creation Guidelines

From SRT file, consolidate into 10-15 meaningful sections:

1. **Group related content** - Don't list every topic change
2. **Use clear labels** - "Setting Up X" not "X Setup Process Begins"
3. **Round timestamps** - Use :00, :30 increments when possible
4. **Start with context** - First timestamp explains what video covers
5. **End with value** - Last timestamps should highlight key outcomes

---

## Thumbnail Text-to-Image Template

```
Clean minimalist YouTube thumbnail, [BACKGROUND_COLOR] background, bold [TEXT_COLOR] sans-serif text on the left side reading "[LINE_1]" with the word "[HIGHLIGHT_WORD]" in [ACCENT_COLOR] with subtle underline, modern tech aesthetic, professional typography, high contrast, clean layout with empty space on right side for logo placement, 1280x720 aspect ratio, no gradients, flat design, editorial style
```

**Phrase guidelines:**
- 4-6 words maximum
- Benefit-focused (what they GET)
- Power words: Free, New, Easy, Fast, Automated, AI
- Avoid: "How to", "Tutorial", generic terms

---

## Example Output Package

**TITLE:**
```
How to Create an AI Sales Campaign in Minutes (Full Demo)
```

**DESCRIPTION:**
```
Build your first AI sales campaign for FREE
https://infinitxai.com/free/dfy-campaign-builder

In this video, I show you exactly how to create a fully automated AI sales campaign from scratch. No complex tools. No coding. Just talk to the AI, and it builds everything for you.


My Links:
Subscribe: https://www.youtube.com/@enriquemarq-0
LinkedIn: https://www.linkedin.com/in/enrique-marq-756191319/
Instagram: https://www.instagram.com/kikefuturo_/


Timestamps:
0:00 What We're Building
0:37 The IX System Overview
1:37 Campaign Dashboard Tour
3:11 Setting Up with AI Brain
10:10 Campaign Generated
17:08 Uploading Contacts & Launch
18:43 Live Demo
22:18 Voice Agent Booking Call
27:13 Your Free Gift


#AIMarketing #SalesCampaign #ClientAcquisition
```

**TAGS:**
```json
["AI sales", "sales campaign", "AI marketing", "get clients", "book appointments", "client acquisition", "agency owner", "marketing agency", "lead generation", "AI agent", "sales automation", "outreach system", "AI tools", "business growth"]
```

**FIRST COMMENT:**
```
Want to build your own AI sales campaign?

https://infinitxai.com/free/dfy-campaign-builder

Set up your campaign in minutes. Let the AI handle outreach, replies, and appointment booking.
```
