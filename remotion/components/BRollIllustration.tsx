import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { EmailIcon } from "../lib/illustrations/EmailIcon";
import { MultiChannelNetwork } from "../lib/illustrations/MultiChannelNetwork";
import { AIBrain } from "../lib/illustrations/AIBrain";
import { ClockSpeed } from "../lib/illustrations/ClockSpeed";
import { CalendarMeetings } from "../lib/illustrations/CalendarMeetings";
import { ThreeXReplies } from "../lib/illustrations/ThreeXReplies";
import { AIAgents } from "../lib/illustrations/AIAgents";
import { PowerTrio } from "../lib/illustrations/PowerTrio";
import { DuctTapeTools } from "../lib/illustrations/DuctTapeTools";

const { fontFamily } = loadFont();

export type IllustrationType = "email" | "multi-channel" | "ai-brain" | "clock" | "calendar" | "3x-replies" | "ai-agents" | "power-trio" | "duct-tape";

export interface BRollIllustrationProps {
  type: IllustrationType;
  durationInFrames: number;
  label?: string;
}

const ILLUSTRATIONS: Record<IllustrationType, React.FC<{ size?: number }>> = {
  "email": EmailIcon,
  "multi-channel": MultiChannelNetwork,
  "ai-brain": AIBrain,
  "clock": ClockSpeed,
  "calendar": CalendarMeetings,
  "3x-replies": ThreeXReplies,
  "ai-agents": AIAgents,
  "power-trio": PowerTrio,
  "duct-tape": DuctTapeTools,
};

const LABELS: Record<IllustrationType, string> = {
  "email": "ONE ACCOUNT = BROKEN",
  "multi-channel": "EMAIL · SMS · VOICEMAIL",
  "ai-brain": "AI WRITES YOUR MESSAGES",
  "clock": "RESPOND IN 5 MINUTES",
  "calendar": "20-30 MEETINGS / WEEK",
  "3x-replies": "3X MORE REPLIES",
  "ai-agents": "AI AGENTS RESPOND 24/7",
  "power-trio": "ALL THREE COMBINED",
  "duct-tape": "DUCT-TAPING TOOLS TOGETHER",
};

export const BRollIllustration: React.FC<BRollIllustrationProps> = ({
  type,
  durationInFrames,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const Illustration = ILLUSTRATIONS[type];
  const displayLabel = label || LABELS[type];

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  const scale = spring({
    frame,
    fps,
    from: 0.7,
    to: 1,
    config: { damping: 15, stiffness: 150 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      <div style={{ transform: `scale(${scale})` }}>
        <Illustration size={650} />
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 48,
          color: "#FF6B00",
          letterSpacing: 3,
          opacity: 1,
        }}
      >
        {displayLabel}
      </div>
    </AbsoluteFill>
  );
};
