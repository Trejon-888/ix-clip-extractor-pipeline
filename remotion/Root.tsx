import React from "react";
import { Composition } from "remotion";

// Gold Standard Compositions
import { Clip1FromZeroTo90K } from "./compositions/Clip1FromZeroTo90K";
import { Clip2StopManuallyPosting } from "./compositions/Clip2StopManuallyPosting";
import { Clip6VoiceControlDemoV3 } from "./compositions/Clip6VoiceControlDemoV3";
import { ClaudeOpus46Announcement } from "./compositions/ClaudeOpus46Announcement";
import { CraftingOutreachCampaign } from "./compositions/CraftingOutreachCampaign";

// Pipeline Clips
import { ClipContentWithoutClients } from "./compositions/ClipContentWithoutClients";
import { ClipAISkillsDoExactly } from "./compositions/ClipAISkillsDoExactly";
import { ClipClaudeCodeVisualContent } from "./compositions/ClipClaudeCodeVisualContent";
import { ClipOnePromptThreePlatforms } from "./compositions/ClipOnePromptThreePlatforms";
import { ClipAIGeneratedThumbnail } from "./compositions/ClipAIGeneratedThumbnail";
import { ClipNextVideosAgenticPipeline } from "./compositions/ClipNextVideosAgenticPipeline";
import { ClipAIHandlesAllContent } from "./compositions/ClipAIHandlesAllContent";
import { PodcastStressExpert } from "./compositions/PodcastStressExpert";
import { PodcastStressExpertV2 } from "./compositions/PodcastStressExpertV2";
import { ToolCalling2Point0 } from "./compositions/ToolCalling2Point0";
import { Clip1CloudCreativesHook } from "./compositions/Clip1CloudCreativesHook";
import { Clip2OneProblemAiManager } from "./compositions/Clip2OneProblemAiManager";
import { Clip3SkillsCustomizable } from "./compositions/Clip3SkillsCustomizable";
import { Clip4Carousel54Cents } from "./compositions/Clip4Carousel54Cents";
import { Clip5ThumbnailExactlyWanted } from "./compositions/Clip5ThumbnailExactlyWanted";
import { Clip6ContentOnlyHalf } from "./compositions/Clip6ContentOnlyHalf";
import { Clip7PostedThreePlatforms } from "./compositions/Clip7PostedThreePlatforms";

// Word-level timing data
import { TOTAL_DURATION_FRAMES as CLIP6_V3_DURATION } from "./data/clip6-voice-control-words";
import { TOTAL_DURATION_FRAMES as CRAFTING_OUTREACH_DURATION } from "./data/crafting-outreach-campaign-words";
import { TOTAL_DURATION_FRAMES as OPUS46_DURATION } from "./data/opus46-announcement-words";

import { VIDEO_FPS, RESOLUTIONS } from "./lib/config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── GOLD STANDARDS ────────────────────────────────────── */}
      {/* Study these compositions to understand the editing patterns */}

      {/* Pipeline Clip: Partner success story (76s, 9 ConceptOverlay pop-outs) */}
      <Composition
        id="Clip1FromZeroTo90K"
        component={Clip1FromZeroTo90K}
        durationInFrames={2280}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/examples/clip-1-from-zero-to-90k.mp4",
        }}
      />

      {/* Pipeline Clip: Voice prompt demo with individual platform pops (78s, 14+ pop-outs) */}
      <Composition
        id="Clip2StopManuallyPosting"
        component={Clip2StopManuallyPosting}
        durationInFrames={2340}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/examples/clip-2-stop-manually-posting.mp4",
        }}
      />

      {/* Standalone Demo: Tier system with AppleStylePopup + FloatingCard (70s) */}
      <Composition
        id="Clip6VoiceControlDemoV3"
        component={Clip6VoiceControlDemoV3}
        durationInFrames={CLIP6_V3_DURATION}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/examples/clip-6-voice-control-demo.mp4",
        }}
      />

      {/* Announcement: Full-screen talking head + AppleStylePopup (130s, 18 pop-outs) */}
      <Composition
        id="ClaudeOpus46Announcement"
        component={ClaudeOpus46Announcement as any}
        durationInFrames={OPUS46_DURATION || 3904}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/examples/claude-opus-46-announcement.mp4",
        }}
      />

      {/* Long-Form: Screen-share tutorial (28 min, 35+ ConceptOverlay pop-outs) */}
      <Composition
        id="CraftingOutreachCampaign"
        component={CraftingOutreachCampaign as any}
        durationInFrames={CRAFTING_OUTREACH_DURATION}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
        defaultProps={{
          videoSrc: "videos/examples/crafting-outreach-campaign.mp4",
        }}
      />

      {/* ── YOUR COMPOSITIONS GO HERE ──────────────────────────── */}
      {/* Register new compositions below. Use gold standards above as templates. */}

      {/* Pipeline Clip: AI Generated Thumbnail with My Face (62s, 11 pop-outs) */}
      <Composition
        id="ClipAIGeneratedThumbnail"
        component={ClipAIGeneratedThumbnail}
        durationInFrames={1882}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-02-22-claude-creatives/clip-ai-generated-thumbnail.mp4",
        }}
      />

      {/* Pipeline Clip: One Prompt → Claude Posted to Three Platforms (82s, 13 pop-outs) */}
      <Composition
        id="ClipOnePromptThreePlatforms"
        component={ClipOnePromptThreePlatforms}
        durationInFrames={2490}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-02-22-claude-creatives/clip-one-prompt-three-platforms.mp4",
        }}
      />

      {/* Pipeline Clip: Claude Code for Visual Content Creation (73s, 14 pop-outs) */}
      <Composition
        id="ClipClaudeCodeVisualContent"
        component={ClipClaudeCodeVisualContent}
        durationInFrames={2250}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-02-22-claude-creatives/clip-claude-code-visual-content.mp4",
        }}
      />

      {/* Pipeline Clip: AI Skills Do Exactly What You Imagine (80s, 13 pop-outs) */}
      <Composition
        id="ClipAISkillsDoExactly"
        component={ClipAISkillsDoExactly}
        durationInFrames={2410}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-02-22-claude-creatives/clip-ai-skills-do-exactly.mp4",
        }}
      />

      {/* Pipeline Clip: Next Videos — Agentic Clip Extractor + Remotion Pipeline (62.5s, 15 pop-outs) */}
      <Composition
        id="ClipNextVideosAgenticPipeline"
        component={ClipNextVideosAgenticPipeline}
        durationInFrames={1905}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-02-22-claude-creatives/clip-next-videos-agentic-pipeline.mp4",
        }}
      />

      {/* Pipeline Clip: AI Handles All My Content Creatives Now (69.4s, 16 pop-outs) */}
      <Composition
        id="ClipAIHandlesAllContent"
        component={ClipAIHandlesAllContent}
        durationInFrames={2112}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-02-22-claude-creatives/clip-ai-handles-all-content.mp4",
        }}
      />

      {/* Pipeline Clip: "Content without clients is pointless" — iX System reveal (65.9s, 13 pop-outs) */}
      <Composition
        id="ClipContentWithoutClients"
        component={ClipContentWithoutClients}
        durationInFrames={1977}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-02-22-claude-creatives/clip-content-without-clients.mp4",
        }}
      />

      {/* ── CLAUDE CREATIVES BATCH 2 (2026-03-02) ─────────── */}

      {/* Pipeline Clip 1: Cloud Code Creates All My Visual Content (74s, 6 pop-outs) */}
      <Composition
        id="Clip1CloudCreativesHook"
        component={Clip1CloudCreativesHook}
        durationInFrames={2246}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-03-02-claude-creatives/clip-01-cloud-code-creates-all-my-visual-content.mp4",
        }}
      />

      {/* Pipeline Clip 2: One Problem with My AI Social Media Manager (75s, 7 pop-outs) */}
      <Composition
        id="Clip2OneProblemAiManager"
        component={Clip2OneProblemAiManager}
        durationInFrames={2250}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-03-02-claude-creatives/clip-02-one-problem-with-my-ai-social-media-manager.mp4",
        }}
      />

      {/* Pipeline Clip 3: AI Skills Fully Customizable to Your Needs (89s, 6 pop-outs) */}
      <Composition
        id="Clip3SkillsCustomizable"
        component={Clip3SkillsCustomizable}
        durationInFrames={2847}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-03-02-claude-creatives/clip-03-ai-skills-fully-customizable-to-your-needs.mp4",
        }}
      />

      {/* Pipeline Clip 4: AI Generated Six-Slide Carousel for 54 Cents (79s, 6 pop-outs) */}
      <Composition
        id="Clip4Carousel54Cents"
        component={Clip4Carousel54Cents}
        durationInFrames={2515}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-03-02-claude-creatives/clip-04-ai-generated-six-slide-carousel-54-cents.mp4",
        }}
      />

      {/* Pipeline Clip 5: Thumbnail — AI Created Exactly What I Wanted (96s, 7 pop-outs) */}
      <Composition
        id="Clip5ThumbnailExactlyWanted"
        component={Clip5ThumbnailExactlyWanted}
        durationInFrames={3007}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-03-02-claude-creatives/clip-05-thumbnail-ai-created-exactly-what-i-wanted.mp4",
        }}
      />

      {/* Pipeline Clip 6: Content is Only Half Without Client Pipeline (56s, 6 pop-outs) */}
      <Composition
        id="Clip6ContentOnlyHalf"
        component={Clip6ContentOnlyHalf}
        durationInFrames={1680}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-03-02-claude-creatives/clip-06-content-is-only-half-without-client-pipeline.mp4",
        }}
      />

      {/* Pipeline Clip 7: AI Agent Posted Carousels to Three Platforms (51s, 4 pop-outs) */}
      <Composition
        id="Clip7PostedThreePlatforms"
        component={Clip7PostedThreePlatforms}
        durationInFrames={1693}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-03-02-claude-creatives/clip-07-ai-agent-posted-carousels-to-three-platforms.mp4",
        }}
      />

      {/* ── PODCAST TEST ──────────────────────────────────────── */}

      {/* Podcast Test: "The Stress Expert" — Leadership & Vulnerability (120s, 9 pop-outs) */}
      <Composition
        id="PodcastStressExpert"
        component={PodcastStressExpert}
        durationInFrames={3600}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-02-23-podcast-test/reframed-split.mp4",
        }}
      />

      {/* Podcast V2: Neo-Brutalist + INFINITX Orange (120s, 8 pop-outs + mixed components) */}
      <Composition
        id="PodcastStressExpertV2"
        component={PodcastStressExpertV2}
        durationInFrames={3600}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
        defaultProps={{
          videoSrc: "videos/2026-02-23-podcast-test/reframed-split.mp4",
        }}
      />

      {/* ── STANDALONE MOTION GRAPHICS ───────────────────────── */}

      {/* Standalone: "Tool Calling 2.0" — Anthropic programmatic tool calling (30s, no source video) */}
      <Composition
        id="ToolCalling2Point0"
        component={ToolCalling2Point0}
        durationInFrames={900}
        fps={VIDEO_FPS}
        width={RESOLUTIONS.portrait.width}
        height={RESOLUTIONS.portrait.height}
      />
    </>
  );
};
