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
    </>
  );
};
