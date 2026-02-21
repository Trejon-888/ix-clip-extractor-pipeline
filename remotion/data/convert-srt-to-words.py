"""Convert WhisperX SRT to Remotion word data TypeScript file."""
import re
import sys

SRT_PATH = r"C:\Users\enriq\Videos\Short-Videos-Here\claude-opus-46-announcement\Claude opus 4.6 is hereee!_whisperx.srt"
OUTPUT_PATH = r"c:\Users\enriq\Downloads\ix_content_factory-main\ix_content_factory-main\remotion\data\opus46-announcement-words.ts"

FPS = 30

# Emphasis words (shown in orange)
EMPHASIS_WORDS = {
    "opus", "4.6", "here.", "everything", "cloud", "intelligent", "model",
    "massive", "upgrade", "upgrade.", "number", "one", "two,", "three.", "four,",
    "plan", "carefully", "sustain", "tasks", "longer", "catch", "mistakes",
    "developer", "code", "code.", "million", "token", "context", "window.",
    "process", "entire", "bases", "massive.", "financial", "analysis,",
    "research,", "documents,", "spreadsheets,", "slides.", "google", "workspace.",
    "claude.", "multitasking", "co-work.", "agent", "teams", "teams.", "deploy",
    "multiple", "agents", "coordinate", "orchestrator", "orchestrator,",
    "communicate", "7x", "tokens", "sub-agents", "anthropic,", "anthropic",
    "favorite", "honestly,", "great",
}

def parse_time(ts):
    """Convert SRT timestamp to seconds."""
    h, m, rest = ts.split(":")
    s, ms = rest.split(",")
    return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000

def main():
    with open(SRT_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Parse SRT blocks
    blocks = re.split(r"\n\n+", content.strip())
    words = []

    for block in blocks:
        lines = block.strip().split("\n")
        if len(lines) < 3:
            continue
        # Line 1: index, Line 2: timestamps, Line 3: word
        time_line = lines[1]
        word_text = lines[2].strip()

        match = re.match(r"(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})", time_line)
        if not match:
            continue

        start_sec = parse_time(match.group(1))
        end_sec = parse_time(match.group(2))

        frame = round(start_sec * FPS)
        duration = max(round((end_sec - start_sec) * FPS), 4)  # min 4 frames

        emphasis = word_text.lower().rstrip(".,!?") in EMPHASIS_WORDS or word_text.lower() in EMPHASIS_WORDS

        words.append({
            "id": len(words),
            "word": word_text,
            "frame": frame,
            "duration": duration,
            "emphasis": emphasis,
        })

    # Calculate total duration
    if words:
        last = words[-1]
        total_frames = last["frame"] + last["duration"]
    else:
        total_frames = 0

    # Generate TypeScript
    lines = []
    lines.append("// Claude Opus 4.6 Announcement - Word-Level Data")
    lines.append("// Generated from WhisperX SRT transcript")
    lines.append(f"// Duration: {total_frames / FPS:.2f}s ({total_frames} frames @ {FPS}fps)")
    lines.append("")
    lines.append("export interface WordEntry {")
    lines.append("  id: number;")
    lines.append("  word: string;")
    lines.append("  frame: number;")
    lines.append("  duration: number;")
    lines.append("  emphasis?: boolean;")
    lines.append("}")
    lines.append("")
    lines.append("export const WORDS: WordEntry[] = [")

    for w in words:
        emphasis_str = ", emphasis: true" if w["emphasis"] else ""
        lines.append(f'  {{ id: {w["id"]}, word: "{w["word"]}", frame: {w["frame"]}, duration: {w["duration"]}{emphasis_str} }},')

    lines.append("];")
    lines.append("")
    lines.append(f"export const TOTAL_DURATION_FRAMES = {total_frames};")
    lines.append("")

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"Generated {len(words)} words, {total_frames} total frames ({total_frames/FPS:.1f}s)")
    print(f"Output: {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
