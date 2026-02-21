"""Generate output files from scored clip selections.

Produces two output formats:
1. clip_definitions.json — batch-compatible for `python -m clip_extractor batch`
2. clips-metadata.json — matches existing metadata format for tracking/posting
3. Selection report — markdown for user review before proceeding
"""

import json
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional


@dataclass
class ClipScore:
    """5-category scoring from Claude's analysis."""

    hook_strength: int
    value_delivery: int
    clarity: int
    shareability: int
    completeness: int
    total: int


@dataclass
class ScoredClip:
    """A clip with resolved timestamps and scoring."""

    id: int
    rank: int
    title: str
    start_sec: float
    end_sec: float
    duration_sec: float
    score: ClipScore
    category: str
    caption: str
    transcript_text: str
    resolution_confidence: float
    start_method: str
    end_method: str
    warning: str = ""


def merge_selections_with_scores(
    resolved_clips: list,
    scoring_data: list[dict],
) -> list[ScoredClip]:
    """Merge resolved timestamps with Claude's scoring data.

    Args:
        resolved_clips: List of ResolvedClip from timestamp_resolver.
        scoring_data: List of scoring dicts from Claude, each containing:
            - id, rank, title, category, caption
            - hook_strength, value_delivery, clarity, shareability, completeness, total_score

    Returns:
        List of ScoredClip, sorted by rank.
    """
    # Index scoring data by clip id
    scores_by_id = {s["id"]: s for s in scoring_data}

    scored: list[ScoredClip] = []
    for clip in resolved_clips:
        score_data = scores_by_id.get(clip.id, {})

        scored.append(ScoredClip(
            id=clip.id,
            rank=score_data.get("rank", clip.id),
            title=score_data.get("title", clip.title),
            start_sec=clip.start_sec,
            end_sec=clip.end_sec,
            duration_sec=clip.duration_sec,
            score=ClipScore(
                hook_strength=score_data.get("hook_strength", 0),
                value_delivery=score_data.get("value_delivery", 0),
                clarity=score_data.get("clarity", 0),
                shareability=score_data.get("shareability", 0),
                completeness=score_data.get("completeness", 0),
                total=score_data.get("total_score", 0),
            ),
            category=score_data.get("category", "educational"),
            caption=score_data.get("caption", ""),
            transcript_text=clip.transcript_text,
            resolution_confidence=clip.resolution_confidence,
            start_method=clip.start_anchor.match_method,
            end_method=clip.end_anchor.match_method,
            warning=clip.warning,
        ))

    scored.sort(key=lambda c: c.rank)
    return scored


def generate_clip_definitions(
    scored_clips: list[ScoredClip],
    output_path: str,
    padding: float = 0.0,
) -> str:
    """Generate clip_definitions.json compatible with batch reframe command.

    Output format:
        [{"id": 1, "title": "from-zero-to-90k", "start": 45.2, "end": 121.1}]

    Args:
        scored_clips: Ranked and scored clips.
        output_path: Where to write the JSON file.
        padding: Additional padding in seconds (usually already applied by resolver).

    Returns:
        Path to the written file.
    """
    definitions = []
    for clip in scored_clips:
        definitions.append({
            "id": clip.id,
            "title": clip.title,
            "start": round(clip.start_sec - padding, 1),
            "end": round(clip.end_sec + padding, 1),
        })

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(definitions, f, indent=2)

    return output_path


def generate_clips_metadata(
    scored_clips: list[ScoredClip],
    source_video: str,
    output_path: str,
    youtube_video_id: str = "",
) -> str:
    """Generate clips-metadata.json matching the existing tracking format.

    Args:
        scored_clips: Ranked and scored clips.
        source_video: Title or path of the source video.
        output_path: Where to write the JSON file.
        youtube_video_id: Optional YouTube video ID.

    Returns:
        Path to the written file.
    """
    clips_list = []
    for clip in scored_clips:
        clips_list.append({
            "rank": clip.rank,
            "title": clip.title,
            "virality_score": clip.score.total,
            "duration_seconds": round(clip.duration_sec),
            "has_captions": False,
            "source": "pipeline",
            "file": f"clip-{clip.rank}-{clip.score.total}pts-{clip.title}.mp4",
            "posted_to": [],
            "status": "extracted",
            "category": clip.category,
            "caption": clip.caption,
            "score_breakdown": {
                "hook_strength": clip.score.hook_strength,
                "value_delivery": clip.score.value_delivery,
                "clarity": clip.score.clarity,
                "shareability": clip.score.shareability,
                "completeness": clip.score.completeness,
            },
            "timestamps": {
                "start": clip.start_sec,
                "end": clip.end_sec,
            },
            "resolution": {
                "confidence": clip.resolution_confidence,
                "start_method": clip.start_method,
                "end_method": clip.end_method,
                "warning": clip.warning,
            },
        })

    metadata = {
        "source_video": source_video,
        "extracted_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "total_clips": len(clips_list),
        "clips": clips_list,
    }

    if youtube_video_id:
        metadata["youtube_video_id"] = youtube_video_id

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(metadata, f, indent=2)

    return output_path


def generate_selection_report(scored_clips: list[ScoredClip]) -> str:
    """Generate a markdown report for user review.

    Returns:
        Formatted markdown string.
    """
    lines = ["# Clip Selection Report", ""]

    total = len(scored_clips)
    avg_score = sum(c.score.total for c in scored_clips) / total if total else 0

    lines.append(f"**Clips selected:** {total}")
    lines.append(f"**Average score:** {avg_score:.0f}/100")
    lines.append("")

    for clip in scored_clips:
        status = ""
        if clip.warning:
            status = f" [!] {clip.warning}"

        lines.append(f"## #{clip.rank} — {clip.title} ({clip.score.total}/100){status}")
        lines.append("")
        lines.append(f"- **Time:** {_fmt_time(clip.start_sec)} - {_fmt_time(clip.end_sec)} ({clip.duration_sec:.0f}s)")
        lines.append(f"- **Category:** {clip.category}")
        lines.append(f"- **Score:** H:{clip.score.hook_strength} V:{clip.score.value_delivery} C:{clip.score.clarity} S:{clip.score.shareability} Co:{clip.score.completeness}")
        lines.append(f"- **Resolution:** start={clip.start_method} ({clip.resolution_confidence:.0%}), end={clip.end_method}")

        if clip.caption:
            lines.append(f"- **Caption:** {clip.caption[:120]}{'...' if len(clip.caption) > 120 else ''}")

        # Show transcript preview (first 150 chars)
        preview = clip.transcript_text[:150]
        if len(clip.transcript_text) > 150:
            preview += "..."
        lines.append(f"- **Preview:** \"{preview}\"")
        lines.append("")

    return "\n".join(lines)


def _fmt_time(seconds: float) -> str:
    """Format seconds as MM:SS."""
    m = int(seconds // 60)
    s = int(seconds % 60)
    return f"{m:02d}:{s:02d}"
