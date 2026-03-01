"""CLI entry point for the Clip Extractor.

Usage:
    python -m clip_extractor reframe --video FILE [--start SEC] [--end SEC] --output DIR [--format 9x16|1x1] [--config FILE]
    python -m clip_extractor analyze --video FILE [--output FILE] [--format 9x16|1x1] [--config FILE]
    python -m clip_extractor render --video FILE --crop-path FILE --output FILE [--config FILE]
    python -m clip_extractor batch --video FILE --clips FILE --output DIR [--format 9x16|1x1] [--config FILE]
    python -m clip_extractor select parse --transcript FILE [--output FILE]
    python -m clip_extractor select resolve --transcript FILE --selections FILE [--output DIR] [--config FILE]
"""

import argparse
import json
import sys
from pathlib import Path

# Add parent of tools/ to path so we can import as package
_tools_dir = str(Path(__file__).parent.parent)
if _tools_dir not in sys.path:
    sys.path.insert(0, _tools_dir)

from clip_extractor.core.pipeline import analyze, reframe, render_from_crop_path, extract_clip
from clip_extractor.core.config_loader import load_config


def cmd_reframe(args: argparse.Namespace) -> None:
    """Full reframe pipeline: detect -> smooth -> crop -> render."""
    result = reframe(
        video_path=args.video,
        output_path=args.output,
        config_path=args.config,
        output_format=args.format,
        start_sec=args.start,
        end_sec=args.end,
    )
    print(f"\nDone! Reframed video: {result}")


def cmd_analyze(args: argparse.Namespace) -> None:
    """Detection + smoothing only — output crop_path.json for inspection."""
    output = args.output or str(Path(args.video).parent / "crop_path.json")
    crop_path = analyze(
        video_path=args.video,
        config_path=args.config,
        output_format=args.format,
        crop_path_output=output,
    )
    print(f"\nDone! Crop path: {output}")
    print(f"  Face detected: {crop_path.detection_stats.face_detected_pct}%")
    print(f"  Keyframes: {len(crop_path.keyframes)}")
    print(f"\nReview the crop_path.json, then render with:")
    print(f'  python -m clip_extractor render --video "{args.video}" --crop-path "{output}" --output "reframed.mp4"')


def cmd_render(args: argparse.Namespace) -> None:
    """Render from an existing crop_path.json (after manual adjustments)."""
    fmt = getattr(args, "format", "9x16")
    if fmt == "split":
        from .core.config_loader import load_config
        from .crop.crop_path_io import load_crop_path
        from .crop.split_renderer import render_split_screen, render_dynamic_podcast
        from .detection.layout_detector import LayoutSegment, LayoutType

        config = load_config(getattr(args, "config", None))
        crop_path = load_crop_path(args.crop_path)
        print(f"\n[clip-extractor] Rendering split-screen from crop path: {args.crop_path}")

        # Check for dynamic layout segments in the crop path
        if crop_path.layout_segments:
            segments = [
                LayoutSegment(
                    layout=LayoutType(seg["layout"]),
                    start_frame=seg["start_frame"],
                    end_frame=seg["end_frame"],
                    start_sec=seg.get("start_sec", seg["start_frame"] / crop_path.source_fps),
                    end_sec=seg.get("end_sec", seg["end_frame"] / crop_path.source_fps),
                )
                for seg in crop_path.layout_segments
            ]
            layout_types = {seg.layout for seg in segments}
            if len(layout_types) > 1:
                print(f"  Dynamic layout: {len(segments)} segments detected")
                render_dynamic_podcast(
                    video_path=args.video,
                    crop_path=crop_path,
                    output_path=args.output,
                    config=config,
                    layout_segments=segments,
                )
            else:
                render_split_screen(
                    video_path=args.video,
                    crop_path=crop_path,
                    output_path=args.output,
                    config=config,
                )
        else:
            render_split_screen(
                video_path=args.video,
                crop_path=crop_path,
                output_path=args.output,
                config=config,
            )
        result = args.output
    else:
        result = render_from_crop_path(
            video_path=args.video,
            crop_path_file=args.crop_path,
            output_path=args.output,
            config_path=args.config,
        )
    print(f"\nDone! Rendered: {result}")


def cmd_batch(args: argparse.Namespace) -> None:
    """Process multiple clips from a definitions file."""
    with open(args.clips, "r") as f:
        clips = json.load(f)

    if isinstance(clips, dict) and "clips" in clips:
        clips = clips["clips"]

    out_dir = Path(args.output)
    out_dir.mkdir(parents=True, exist_ok=True)

    results = []
    for i, clip in enumerate(clips):
        clip_id = clip.get("id", i + 1)
        title = clip.get("title", f"clip-{clip_id:02d}")
        start = clip["start"]
        end = clip["end"]

        print(f"\n{'='*60}")
        print(f"Clip {clip_id}: {title} ({start:.1f}s - {end:.1f}s)")
        print(f"{'='*60}")

        clip_dir = str(out_dir / f"clip-{clip_id:02d}-{title}")

        result = reframe(
            video_path=args.video,
            output_path=clip_dir,
            config_path=args.config,
            output_format=args.format,
            start_sec=start,
            end_sec=end,
        )
        results.append({"id": clip_id, "title": title, "output": result})

    print(f"\n{'='*60}")
    print(f"Batch complete! {len(results)} clips reframed:")
    for r in results:
        print(f"  [{r['id']}] {r['title']}: {r['output']}")


def cmd_select_parse(args: argparse.Namespace) -> None:
    """Parse a transcript and output formatted text for Claude analysis."""
    from clip_extractor.selection.srt_parser import load_transcript, format_for_analysis

    transcript = load_transcript(args.transcript, fps=args.fps)
    formatted = format_for_analysis(transcript)

    print(f"\n[clip-extractor] Parsed transcript: {args.transcript}")
    print(f"  Words: {transcript.word_count()}")
    print(f"  Sentences: {len(transcript.blocks)}")
    print(f"  Duration: {transcript.duration_sec:.1f}s")
    print()

    if args.output:
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)
        Path(args.output).write_text(formatted, encoding="utf-8")
        print(f"  Formatted transcript saved to: {args.output}")
    else:
        print(formatted)


def cmd_select_resolve(args: argparse.Namespace) -> None:
    """Resolve Claude's selections to exact timestamps and generate output files."""
    from clip_extractor.selection.srt_parser import load_transcript
    from clip_extractor.selection.timestamp_resolver import resolve_all_clips
    from clip_extractor.selection.clip_formatter import (
        merge_selections_with_scores,
        generate_clip_definitions,
        generate_clips_metadata,
        generate_selection_report,
    )

    config = load_config(args.config)
    sel_cfg = config["selection"]
    anchor_cfg = sel_cfg["anchor"]

    # Load transcript
    transcript = load_transcript(args.transcript, fps=args.fps)

    # Load Claude's selections + scores
    with open(args.selections, "r") as f:
        data = json.load(f)

    selections = data.get("selections", data.get("clips", []))
    scores = data.get("scores", selections)

    # Resolve timestamps
    resolved = resolve_all_clips(
        transcript=transcript,
        clips_data=selections,
        search_window=anchor_cfg["search_window_sec"],
        fuzzy_threshold=anchor_cfg["fuzzy_threshold"],
        padding=sel_cfg["padding"],
        min_duration=sel_cfg["min_duration"],
        max_duration=sel_cfg["max_duration"],
    )

    # Merge with scores
    scored = merge_selections_with_scores(resolved, scores)

    # Generate outputs
    out_dir = Path(args.output)
    out_dir.mkdir(parents=True, exist_ok=True)

    defs_path = generate_clip_definitions(scored, str(out_dir / "clip_definitions.json"))
    meta_path = generate_clips_metadata(
        scored,
        source_video=args.source_title or args.transcript,
        output_path=str(out_dir / "clips-metadata.json"),
    )

    # Print report
    report = generate_selection_report(scored)
    print(report)

    report_path = str(out_dir / "selection-report.md")
    Path(report_path).write_text(report, encoding="utf-8")

    print(f"\n[clip-extractor] Selection resolved!")
    print(f"  Clip definitions: {defs_path}")
    print(f"  Clips metadata:   {meta_path}")
    print(f"  Selection report:  {report_path}")
    print(f"\nTo batch reframe, run:")
    print(f'  python -m clip_extractor batch --video SOURCE.mp4 --clips "{defs_path}" --output OUTPUT_DIR')


def main() -> None:
    parser = argparse.ArgumentParser(
        prog="clip_extractor",
        description="Intelligent auto-reframe pipeline for short-form video production",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    # --- reframe ---
    p_reframe = subparsers.add_parser("reframe", help="Full pipeline: detect -> smooth -> crop -> render")
    p_reframe.add_argument("--video", required=True, help="Input video file")
    p_reframe.add_argument("--output", required=True, help="Output directory")
    p_reframe.add_argument("--start", type=float, default=None, help="Clip start time (seconds)")
    p_reframe.add_argument("--end", type=float, default=None, help="Clip end time (seconds)")
    p_reframe.add_argument("--format", default="9x16", choices=["9x16", "1x1", "split"], help="Output format")
    p_reframe.add_argument("--config", default=None, help="Config YAML file")
    p_reframe.set_defaults(func=cmd_reframe)

    # --- analyze ---
    p_analyze = subparsers.add_parser("analyze", help="Detection only — output crop_path.json")
    p_analyze.add_argument("--video", required=True, help="Input video file")
    p_analyze.add_argument("--output", default=None, help="Output crop_path.json path")
    p_analyze.add_argument("--format", default="9x16", choices=["9x16", "1x1", "split"], help="Output format")
    p_analyze.add_argument("--config", default=None, help="Config YAML file")
    p_analyze.set_defaults(func=cmd_analyze)

    # --- render ---
    p_render = subparsers.add_parser("render", help="Render from existing crop_path.json")
    p_render.add_argument("--video", required=True, help="Input video file")
    p_render.add_argument("--crop-path", required=True, help="Path to crop_path.json")
    p_render.add_argument("--output", required=True, help="Output video path")
    p_render.add_argument("--format", default="9x16", choices=["9x16", "1x1", "split"], help="Output format")
    p_render.add_argument("--config", default=None, help="Config YAML file")
    p_render.set_defaults(func=cmd_render)

    # --- batch ---
    p_batch = subparsers.add_parser("batch", help="Process multiple clips from definitions file")
    p_batch.add_argument("--video", required=True, help="Source video file")
    p_batch.add_argument("--clips", required=True, help="Clip definitions JSON file")
    p_batch.add_argument("--output", required=True, help="Output directory")
    p_batch.add_argument("--format", default="9x16", choices=["9x16", "1x1", "split"], help="Output format")
    p_batch.add_argument("--config", default=None, help="Config YAML file")
    p_batch.set_defaults(func=cmd_batch)

    # --- select (Phase 3: Clip Selection) ---
    p_select = subparsers.add_parser("select", help="Transcript-based clip selection")
    select_subs = p_select.add_subparsers(dest="select_command", required=True)

    # select parse
    p_parse = select_subs.add_parser("parse", help="Parse transcript -> formatted text for Claude")
    p_parse.add_argument("--transcript", required=True, help="SRT, WhisperX JSON, or Remotion .ts file")
    p_parse.add_argument("--fps", type=float, default=30.0, help="Video FPS for .ts frame conversion (default: 30)")
    p_parse.add_argument("--output", default=None, help="Save formatted text to file (default: stdout)")
    p_parse.set_defaults(func=cmd_select_parse)

    # select resolve
    p_resolve = select_subs.add_parser("resolve", help="Resolve selections -> clip_definitions.json")
    p_resolve.add_argument("--transcript", required=True, help="SRT, WhisperX JSON, or Remotion .ts file")
    p_resolve.add_argument("--fps", type=float, default=30.0, help="Video FPS for .ts frame conversion (default: 30)")
    p_resolve.add_argument("--selections", required=True, help="JSON with Claude's selections + scores")
    p_resolve.add_argument("--output", required=True, help="Output directory")
    p_resolve.add_argument("--source-title", default=None, help="Source video title for metadata")
    p_resolve.add_argument("--config", default=None, help="Config YAML file")
    p_resolve.set_defaults(func=cmd_select_resolve)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
