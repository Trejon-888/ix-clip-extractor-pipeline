"""Convert WhisperX SRT to Remotion words .ts data file."""
import re, sys, math

def parse_srt(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    entries = re.split(r'\n\n+', text.strip())
    words = []
    for entry in entries:
        lines = entry.strip().split('\n')
        if len(lines) < 3:
            continue
        ts = lines[1]
        word = ' '.join(lines[2:]).strip()
        m = re.match(r'(\d+):(\d+):(\d+)[,.](\d+)\s*-->\s*(\d+):(\d+):(\d+)[,.](\d+)', ts)
        if not m:
            continue
        start = int(m[1])*3600 + int(m[2])*60 + int(m[3]) + int(m[4])/1000
        end   = int(m[5])*3600 + int(m[6])*60 + int(m[7]) + int(m[8])/1000
        words.append((word, start, end))
    return words

def words_to_ts(words, fps=30, emphasis_words=None, corrections=None):
    if emphasis_words is None:
        emphasis_words = set()
    if corrections is None:
        corrections = {}
    lines = []
    for i, (word, start, end) in enumerate(words):
        frame = max(1, round(start * fps))
        dur   = max(1, round((end - start) * fps))
        display = corrections.get(word.lower().rstrip('.,!?'), word)
        # Keep original punctuation
        if word[-1:] in '.,!?' and not display.endswith(word[-1:]):
            display += word[-1:]
        emp = word.lower().rstrip('.,!?') in emphasis_words
        emp_str = ', emphasis: true' if emp else ''
        lines.append(f'  {{ id: {i+1:>3}, word: {repr(display):>20s}, frame: {frame:>4}, duration: {dur:>2}{emp_str} }},')
    return lines

def main():
    if len(sys.argv) < 2:
        print("Usage: python srt_to_words.py <srt_file> [--emphasis word1,word2,...] [--correct old=new,old2=new2]")
        sys.exit(1)
    srt_path = sys.argv[1]
    emphasis = set()
    corrections = {}
    i = 2
    while i < len(sys.argv):
        if sys.argv[i] == '--emphasis' and i+1 < len(sys.argv):
            emphasis = set(w.strip().lower() for w in sys.argv[i+1].split(','))
            i += 2
        elif sys.argv[i] == '--correct' and i+1 < len(sys.argv):
            for pair in sys.argv[i+1].split(','):
                if '=' in pair:
                    old, new = pair.split('=', 1)
                    corrections[old.strip().lower()] = new.strip()
            i += 2
        else:
            i += 1

    words = parse_srt(srt_path)
    if not words:
        print("No words found!")
        sys.exit(1)

    last_end = words[-1][2]
    total_frames = round(last_end * 30) + 30  # 1s buffer
    print(f"// Words: {len(words)}, Duration: {last_end:.1f}s, Total frames: {total_frames}")
    print(f"export const TOTAL_DURATION_FRAMES = {total_frames};\n")
    print("export const WORDS: Array<{")
    print("  id: number;")
    print("  word: string;")
    print("  frame: number;")
    print("  duration: number;")
    print("  emphasis?: boolean;")
    print("}> = [")
    for line in words_to_ts(words, 30, emphasis, corrections):
        print(line)
    print("];")

if __name__ == "__main__":
    main()
