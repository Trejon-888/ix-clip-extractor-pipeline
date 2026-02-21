import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface ChatMessage {
  text: string;
  emoji?: string;
  isRight?: boolean;
  delay: number; // frames delay before appearing
  color?: string;
}

export interface ChatBubbleConversationProps {
  durationInFrames: number;
  messages: ChatMessage[];
  title?: string;
  backgroundColor?: string;
}

/**
 * Chat bubble conversation UI - shows messages appearing one by one
 * Style: Clean iOS-style chat bubbles, smooth animations
 * Used for displaying fragmented tools or concepts in conversation format
 */
export const ChatBubbleConversation: React.FC<ChatBubbleConversationProps> = ({
  durationInFrames,
  messages,
  title,
  backgroundColor = "#F5F5F5",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in/out
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
        gap: 20,
      }}
    >
      {/* Optional title */}
      {title && (
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: 32,
            color: "#333333",
            opacity: titleProgress,
            marginBottom: 20,
            letterSpacing: 1,
          }}
        >
          {title}
        </div>
      )}

      {/* Chat bubbles container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
          maxWidth: 700,
        }}
      >
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

interface ChatBubbleProps {
  message: ChatMessage;
  frame: number;
  fps: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, frame, fps }) => {
  const adjustedFrame = Math.max(0, frame - message.delay);

  const slideIn = spring({
    frame: adjustedFrame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 15, stiffness: 150 },
  });

  const scale = spring({
    frame: adjustedFrame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 180 },
  });

  const translateX = message.isRight
    ? interpolate(slideIn, [0, 1], [50, 0])
    : interpolate(slideIn, [0, 1], [-50, 0]);

  const bubbleColor = message.color || (message.isRight ? "#FF6B00" : "#FFFFFF");
  const textColor = message.isRight ? "#FFFFFF" : "#1A1A1A";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: message.isRight ? "flex-end" : "flex-start",
        opacity: slideIn,
        transform: `translateX(${translateX}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          backgroundColor: bubbleColor,
          borderRadius: 24,
          padding: "18px 28px",
          maxWidth: "85%",
          boxShadow: message.isRight
            ? "0px 4px 20px rgba(255, 107, 0, 0.3)"
            : "0px 4px 15px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {message.emoji && (
          <span style={{ fontSize: 32 }}>{message.emoji}</span>
        )}
        <span
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 28,
            color: textColor,
            lineHeight: 1.3,
          }}
        >
          {message.text}
        </span>
      </div>
    </div>
  );
};

// Pre-defined conversation sets for common use cases
export const TOOL_FRAGMENTATION_MESSAGES: ChatMessage[] = [
  { text: "One tool for leads", emoji: "📊", delay: 0, isRight: false },
  { text: "One tool for email", emoji: "📧", delay: 8, isRight: true },
  { text: "One for follow-ups", emoji: "🔄", delay: 16, isRight: false },
  { text: "Separate AI chatbot", emoji: "🤖", delay: 24, isRight: true },
  { text: "5 logins, 5 dashboards", emoji: "😵", delay: 32, isRight: false, color: "#FF4444" },
];

export const ONE_SYSTEM_MESSAGES: ChatMessage[] = [
  { text: "Lead discovery", emoji: "🎯", delay: 0, isRight: false },
  { text: "Multi-channel outreach", emoji: "📱", delay: 10, isRight: false },
  { text: "AI agents", emoji: "🤖", delay: 20, isRight: false },
  { text: "Appointment booking", emoji: "📅", delay: 30, isRight: false },
  { text: "ONE PLATFORM", emoji: "✨", delay: 42, isRight: true, color: "#FF6B00" },
];
