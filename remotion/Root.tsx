import React from "react";
import { Composition } from "remotion";

// Gold Standard Compositions
import { Clip1FromZeroTo90K } from "./compositions/Clip1FromZeroTo90K";
import { Clip2StopManuallyPosting } from "./compositions/Clip2StopManuallyPosting";
import { Clip6VoiceControlDemoV3 } from "./compositions/Clip6VoiceControlDemoV3";
import { ClaudeOpus46Announcement } from "./compositions/ClaudeOpus46Announcement";
import { CraftingOutreachCampaign } from "./compositions/CraftingOutreachCampaign";

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
    </>
  );
};
