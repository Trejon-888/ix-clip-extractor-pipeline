"""Clip Selection Engine — transcript-based clip extraction and scoring.

Phase 3 of Clip Extractor: automatically identify, score, and validate
the best short-form clips from long-form video transcripts.

Workflow:
    1. Parse SRT/JSON transcript → structured word-level data
    2. Claude analyzes transcript → selects best moments (selection-framework.md)
    3. Claude scores selections → ranked clips (scoring-framework.md)
    4. Fuzzy-match anchor words → exact SRT timestamps
    5. Format output → clip_definitions.json + clips-metadata.json
"""

from .srt_parser import (
    TranscriptWord,
    TranscriptBlock,
    Transcript,
    parse_srt,
    parse_whisperx_json,
    parse_remotion_words_ts,
    load_transcript,
    format_for_analysis,
)
from .timestamp_resolver import (
    AnchorMatch,
    ResolvedClip,
    resolve_anchor,
    resolve_all_clips,
)
from .clip_formatter import (
    ClipScore,
    ScoredClip,
    merge_selections_with_scores,
    generate_clip_definitions,
    generate_clips_metadata,
    generate_selection_report,
)

__all__ = [
    "TranscriptWord",
    "TranscriptBlock",
    "Transcript",
    "parse_srt",
    "parse_whisperx_json",
    "load_transcript",
    "format_for_analysis",
    "AnchorMatch",
    "ResolvedClip",
    "resolve_anchor",
    "resolve_all_clips",
    "ClipScore",
    "ScoredClip",
    "merge_selections_with_scores",
    "generate_clip_definitions",
    "generate_clips_metadata",
    "generate_selection_report",
]
