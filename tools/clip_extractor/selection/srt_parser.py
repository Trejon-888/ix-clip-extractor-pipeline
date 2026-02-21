"""Parse SRT, WhisperX JSON, and Remotion .ts transcripts into structured word-level data.

Supports three formats:
1. Word-per-block SRT (WhisperX output): one word per subtitle block
2. WhisperX JSON: {"words": [{"word": "...", "start": 0.1, "end": 0.5}, ...]}
3. Remotion words .ts: export const WORDS = [{ start: 12, end: 33, word: "All" }, ...]

The parser produces a Transcript object that can be queried by time range
and formatted for Claude analysis.
"""

import json
import re
from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class TranscriptWord:
    """A single word with precise timestamps."""

    index: int
    word: str
    start_sec: float
    end_sec: float


@dataclass
class TranscriptBlock:
    """A group of words forming a sentence or phrase."""

    block_number: int
    start_sec: float
    end_sec: float
    text: str


@dataclass
class Transcript:
    """Parsed transcript with word-level and block-level access."""

    words: list[TranscriptWord]
    blocks: list[TranscriptBlock]
    duration_sec: float

    def full_text(self) -> str:
        """Return the full transcript as a single string."""
        return " ".join(w.word for w in self.words)

    def text_between(self, start_sec: float, end_sec: float) -> str:
        """Return transcript text within a time range."""
        return " ".join(
            w.word for w in self.words
            if w.start_sec >= start_sec and w.end_sec <= end_sec
        )

    def words_between(self, start_sec: float, end_sec: float) -> list[TranscriptWord]:
        """Return words within a time range."""
        return [
            w for w in self.words
            if w.start_sec >= start_sec and w.end_sec <= end_sec
        ]

    def word_count(self) -> int:
        """Total number of words."""
        return len(self.words)


# --- SRT parsing ---

_SRT_TIME_RE = re.compile(
    r"(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})"
)


def _srt_time_to_sec(h: str, m: str, s: str, ms: str) -> float:
    """Convert SRT timestamp components to seconds."""
    return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000


def parse_srt(file_path: str) -> Transcript:
    """Parse a word-per-block SRT file (WhisperX format).

    Each SRT block contains exactly one word with precise timestamps:
        1
        00:00:00,031 --> 00:00:00,472
        This

    Args:
        file_path: Path to the .srt file.

    Returns:
        Transcript with word-level timing data.
    """
    text = Path(file_path).read_text(encoding="utf-8")
    # Split on blank lines to get blocks
    raw_blocks = re.split(r"\n\s*\n", text.strip())

    words: list[TranscriptWord] = []

    for i, block in enumerate(raw_blocks):
        lines = block.strip().split("\n")
        if len(lines) < 3:
            continue

        # Line 1: block number (ignored, we use sequential index)
        # Line 2: timestamps
        # Line 3+: word(s)
        time_match = _SRT_TIME_RE.search(lines[1])
        if not time_match:
            continue

        g = time_match.groups()
        start_sec = _srt_time_to_sec(g[0], g[1], g[2], g[3])
        end_sec = _srt_time_to_sec(g[4], g[5], g[6], g[7])

        # Word is everything from line 3 onward (usually just one word)
        word_text = " ".join(lines[2:]).strip()
        if not word_text:
            continue

        words.append(TranscriptWord(
            index=len(words),
            word=word_text,
            start_sec=round(start_sec, 3),
            end_sec=round(end_sec, 3),
        ))

    duration = words[-1].end_sec if words else 0.0
    blocks = _group_into_sentences(words)

    return Transcript(words=words, blocks=blocks, duration_sec=duration)


# --- WhisperX JSON parsing ---

def parse_whisperx_json(file_path: str) -> Transcript:
    """Parse a WhisperX JSON transcript.

    Expected format:
        {"words": [{"word": "This", "start": 0.031, "end": 0.472}, ...]}

    or with segments:
        {"segments": [{"words": [...], "text": "..."}]}

    Args:
        file_path: Path to the .json file.

    Returns:
        Transcript with word-level timing data.
    """
    data = json.loads(Path(file_path).read_text(encoding="utf-8"))

    words: list[TranscriptWord] = []

    # Format 1: flat word list
    if "words" in data and isinstance(data["words"], list):
        raw_words = data["words"]
    # Format 2: segmented
    elif "segments" in data:
        raw_words = []
        for seg in data["segments"]:
            raw_words.extend(seg.get("words", []))
    else:
        raise ValueError(f"Unrecognized WhisperX JSON format in {file_path}")

    for i, w in enumerate(raw_words):
        word_text = w.get("word", "").strip()
        if not word_text:
            continue
        words.append(TranscriptWord(
            index=i,
            word=word_text,
            start_sec=round(w.get("start", 0.0), 3),
            end_sec=round(w.get("end", 0.0), 3),
        ))

    duration = words[-1].end_sec if words else 0.0
    blocks = _group_into_sentences(words)

    return Transcript(words=words, blocks=blocks, duration_sec=duration)


# --- Remotion .ts word data parsing ---

_TS_WORD_RE = re.compile(
    r'\{\s*start:\s*(\d+)\s*,\s*end:\s*(\d+)\s*,\s*word:\s*"([^"]*?)"\s*\}'
)


def parse_remotion_words_ts(file_path: str, fps: float = 30.0) -> Transcript:
    """Parse a Remotion words .ts file with frame-based word timing.

    Expected format:
        export const WORDS: WordData[] = [
          { start: 12, end: 33, word: "All" },
          { start: 33, end: 36, word: "right" },
          ...
        ];

    Frame numbers are converted to seconds using the provided fps.

    Args:
        file_path: Path to the .ts file.
        fps: Frames per second of the source video (default: 30).

    Returns:
        Transcript with word-level timing data.
    """
    text = Path(file_path).read_text(encoding="utf-8")
    matches = _TS_WORD_RE.findall(text)

    if not matches:
        raise ValueError(f"No word entries found in {file_path}")

    words: list[TranscriptWord] = []
    for i, (start_frame, end_frame, word_text) in enumerate(matches):
        word_text = word_text.strip()
        if not word_text:
            continue
        words.append(TranscriptWord(
            index=i,
            word=word_text,
            start_sec=round(int(start_frame) / fps, 3),
            end_sec=round(int(end_frame) / fps, 3),
        ))

    duration = words[-1].end_sec if words else 0.0
    blocks = _group_into_sentences(words)

    return Transcript(words=words, blocks=blocks, duration_sec=duration)


# --- Auto-detect format ---

def load_transcript(file_path: str, fps: float = 30.0) -> Transcript:
    """Load a transcript, auto-detecting format by file extension.

    Supports: .srt (word-per-block), .json (WhisperX JSON), .ts (Remotion words).

    Args:
        file_path: Path to transcript file.
        fps: Frames per second (only used for .ts format).

    Returns:
        Parsed Transcript.
    """
    ext = Path(file_path).suffix.lower()
    if ext == ".srt":
        return parse_srt(file_path)
    elif ext == ".json":
        return parse_whisperx_json(file_path)
    elif ext == ".ts":
        return parse_remotion_words_ts(file_path, fps=fps)
    else:
        raise ValueError(f"Unsupported transcript format: {ext} (expected .srt, .json, or .ts)")


# --- Sentence grouping ---

_SENTENCE_ENDINGS = re.compile(r"[.!?]$")


def _group_into_sentences(words: list[TranscriptWord]) -> list[TranscriptBlock]:
    """Group words into sentence-level blocks for readability.

    Splits on sentence-ending punctuation (. ! ?) or when a pause > 1.5s
    occurs between consecutive words.
    """
    if not words:
        return []

    blocks: list[TranscriptBlock] = []
    current_words: list[TranscriptWord] = [words[0]]

    for i in range(1, len(words)):
        prev = words[i - 1]
        curr = words[i]

        # Check for sentence boundary
        pause = curr.start_sec - prev.end_sec
        ends_sentence = _SENTENCE_ENDINGS.search(prev.word)

        if ends_sentence or pause > 1.5:
            # Flush current sentence
            blocks.append(TranscriptBlock(
                block_number=len(blocks) + 1,
                start_sec=current_words[0].start_sec,
                end_sec=current_words[-1].end_sec,
                text=" ".join(w.word for w in current_words),
            ))
            current_words = [curr]
        else:
            current_words.append(curr)

    # Flush remaining words
    if current_words:
        blocks.append(TranscriptBlock(
            block_number=len(blocks) + 1,
            start_sec=current_words[0].start_sec,
            end_sec=current_words[-1].end_sec,
            text=" ".join(w.word for w in current_words),
        ))

    return blocks


# --- Formatting for Claude analysis ---

def _format_time(seconds: float) -> str:
    """Format seconds as HH:MM:SS."""
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    return f"{h:02d}:{m:02d}:{s:02d}"


def format_for_analysis(transcript: Transcript) -> str:
    """Format transcript for Claude analysis — sentence-grouped with timestamps.

    Output format:
        [00:00:00 - 00:00:06] This is Zach. This is one of our partners who came to us a year ago with a big, big problem.
        [00:00:06 - 00:00:12] He had a massive list of contacts and didn't know how to reach out to them.
        ...

    Args:
        transcript: Parsed Transcript object.

    Returns:
        Formatted string ready for Claude analysis.
    """
    lines: list[str] = []
    for block in transcript.blocks:
        start = _format_time(block.start_sec)
        end = _format_time(block.end_sec)
        lines.append(f"[{start} - {end}] {block.text}")
    return "\n".join(lines)
