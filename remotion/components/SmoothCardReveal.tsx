import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface CardItem {
  text: string;
  icon?: string; // emoji or icon
  imageSrc?: string; // optional image
  color?: string;
  delay: number;
}

export interface SmoothCardRevealProps {
  durationInFrames: number;
  cards: CardItem[];
  title?: string;
  layout?: "stack" | "cascade" | "grid";
  backgroundColor?: string;
}

/**
 * Smooth card reveal with 3D-like stacking animation
 * Style: Modern motion graphics, cards slide in with depth
 */
export const SmoothCardReveal: React.FC<SmoothCardRevealProps> = ({
  durationInFrames,
  cards,
  title,
  layout = "cascade",
  backgroundColor = "#0D0D0D",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in/out
  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
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

  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 50px",
      }}
    >
      {/* Title */}
      {title && (
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 40,
            color: "#FFFFFF",
            opacity: titleProgress,
            transform: `translateY(${titleY}px)`,
            marginBottom: 50,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          {title}
        </div>
      )}

      {/* Cards container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: layout === "grid" ? "auto" : 500,
          display: layout === "grid" ? "grid" : "flex",
          gridTemplateColumns: layout === "grid" ? "repeat(2, 1fr)" : undefined,
          gap: layout === "grid" ? 20 : undefined,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cards.map((card, index) => (
          <SmoothCard
            key={index}
            card={card}
            index={index}
            total={cards.length}
            frame={frame}
            fps={fps}
            layout={layout}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

interface SmoothCardProps {
  card: CardItem;
  index: number;
  total: number;
  frame: number;
  fps: number;
  layout: "stack" | "cascade" | "grid";
}

const SmoothCard: React.FC<SmoothCardProps> = ({
  card,
  index,
  total,
  frame,
  fps,
  layout,
}) => {
  const adjustedFrame = Math.max(0, frame - card.delay);

  // Smooth spring animations
  const progress = spring({
    frame: adjustedFrame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 120 },
  });

  const scale = spring({
    frame: adjustedFrame,
    fps,
    from: 0.7,
    to: 1,
    config: { damping: 15, stiffness: 150 },
  });

  // Different positioning based on layout
  let translateY = 0;
  let translateX = 0;
  let rotation = 0;
  let zIndex = total - index;

  if (layout === "cascade") {
    // Cascade from bottom
    translateY = interpolate(progress, [0, 1], [150, index * -60]);
    rotation = interpolate(progress, [0, 1], [15, (index - total / 2) * 3]);
  } else if (layout === "stack") {
    // Stack in place
    translateY = interpolate(progress, [0, 1], [200, index * -15]);
    translateX = (index - total / 2) * 8;
  }

  const cardColor = card.color || "#FFFFFF";

  const cardStyle: React.CSSProperties = layout === "grid"
    ? {
        backgroundColor: cardColor,
        borderRadius: 20,
        padding: "30px 25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.3)",
        opacity: progress,
        transform: `scale(${scale})`,
      }
    : {
        position: "absolute" as const,
        backgroundColor: cardColor,
        borderRadius: 24,
        padding: "35px 45px",
        minWidth: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.4)",
        opacity: progress,
        transform: `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotation}deg) scale(${scale})`,
        zIndex,
      };

  return (
    <div style={cardStyle}>
      {card.icon && (
        <span style={{ fontSize: 42 }}>{card.icon}</span>
      )}
      {card.imageSrc && (
        <Img
          src={staticFile(card.imageSrc)}
          style={{ width: 60, height: 60, borderRadius: 12 }}
        />
      )}
      <span
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: layout === "grid" ? 22 : 28,
          color: card.color === "#FF6B00" ? "#FFFFFF" : "#1A1A1A",
          textAlign: "center",
        }}
      >
        {card.text}
      </span>
    </div>
  );
};

// Pre-defined card sets
export const CONSEQUENCES_CARDS: CardItem[] = [
  { text: "Emails → Spam", icon: "📧", delay: 0, color: "#FFE5E5" },
  { text: "Leads Going Cold", icon: "❄️", delay: 12, color: "#E5F0FF" },
  { text: "Follow-ups Missed", icon: "⏰", delay: 24, color: "#FFF5E5" },
  { text: "Can't Track Failures", icon: "❓", delay: 36, color: "#FFE5E5" },
];

export const SOLUTION_CARDS: CardItem[] = [
  { text: "Lead Discovery", icon: "🎯", delay: 0, color: "#FFFFFF" },
  { text: "Multi-Channel", icon: "📱", delay: 10, color: "#FFFFFF" },
  { text: "AI Agents", icon: "🤖", delay: 20, color: "#FFFFFF" },
  { text: "One Platform", icon: "✨", delay: 30, color: "#FF6B00" },
];
