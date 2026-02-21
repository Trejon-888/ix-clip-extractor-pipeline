import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

const LIME_GREEN = "#BFFF00";
const GRAY_BG = "#F0F0F0";

export interface ConceptIconRevealProps {
  durationInFrames: number;
  icon?: string; // emoji
  iconSrc?: string; // image file
  label?: string;
  sublabel?: string;
  backgroundColor?: string;
  accentColor?: string;
  zoomIn?: boolean; // whether to zoom into the icon
}

/**
 * Clean concept icon reveal - single icon with lime green accent
 * Style: Minimal, professional, smooth animation
 * Like the ChatGPT logo reveal in the reference
 */
export const ConceptIconReveal: React.FC<ConceptIconRevealProps> = ({
  durationInFrames,
  icon,
  iconSrc,
  label,
  sublabel,
  backgroundColor = GRAY_BG,
  accentColor = LIME_GREEN,
  zoomIn = false,
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

  // Icon circle animation
  const circleScale = spring({
    frame,
    fps,
    from: 0.4,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  // Zoom effect (optional)
  const zoomScale = zoomIn
    ? interpolate(frame, [0, durationInFrames], [1, 1.5], {
        extrapolateRight: "clamp",
      })
    : 1;

  // Label animation
  const labelProgress = spring({
    frame: Math.max(0, frame - 15),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const labelY = interpolate(labelProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${zoomScale})`,
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          backgroundColor: accentColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${circleScale})`,
          boxShadow: `0px 8px 40px ${accentColor}66`,
        }}
      >
        {icon && (
          <span style={{ fontSize: 90 }}>{icon}</span>
        )}
        {iconSrc && (
          <Img
            src={staticFile(iconSrc)}
            style={{ width: 100, height: 100 }}
          />
        )}
      </div>

      {/* Label */}
      {label && (
        <div
          style={{
            fontFamily,
            fontWeight: 300,
            fontSize: 32,
            color: "#999999",
            marginTop: 30,
            opacity: labelProgress,
            transform: `translateY(${labelY}px)`,
            letterSpacing: 2,
          }}
        >
          {label}
        </div>
      )}

      {/* Sublabel */}
      {sublabel && (
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: 48,
            color: "#1A1A1A",
            marginTop: 10,
            opacity: labelProgress,
            transform: `translateY(${labelY}px)`,
            letterSpacing: -1,
          }}
        >
          {sublabel}
        </div>
      )}
    </AbsoluteFill>
  );
};

/**
 * Stacked icons that reveal one by one vertically
 * For showing a list of tools/concepts
 */
export interface StackedIconItem {
  icon: string;
  text: string;
  delay: number;
}

export interface StackedIconsRevealProps {
  durationInFrames: number;
  items: StackedIconItem[];
  title?: string;
  backgroundColor?: string;
}

export const StackedIconsReveal: React.FC<StackedIconsRevealProps> = ({
  durationInFrames,
  items,
  title,
  backgroundColor = GRAY_BG,
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

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: "60px 50px",
      }}
    >
      {title && (
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: 36,
            color: "#666666",
            opacity: titleProgress,
            marginBottom: 20,
            letterSpacing: 2,
          }}
        >
          {title}
        </div>
      )}

      {items.map((item, i) => {
        const itemProgress = spring({
          frame: Math.max(0, frame - item.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 15, stiffness: 150 },
        });

        const slideX = interpolate(itemProgress, [0, 1], [-40, 0]);

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: itemProgress,
              transform: `translateX(${slideX}px)`,
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: LIME_GREEN,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0px 4px 15px ${LIME_GREEN}44`,
              }}
            >
              <span style={{ fontSize: 36 }}>{item.icon}</span>
            </div>
            <span
              style={{
                fontFamily,
                fontWeight: 700,
                fontSize: 32,
                color: "#1A1A1A",
              }}
            >
              {item.text}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Pre-defined stacks
export const TOOL_STACK_ITEMS: StackedIconItem[] = [
  { icon: "📊", text: "One tool for leads", delay: 0 },
  { icon: "📧", text: "One tool for email", delay: 10 },
  { icon: "🔄", text: "One for follow-ups", delay: 20 },
  { icon: "🤖", text: "Separate AI chatbot", delay: 30 },
  { icon: "😵", text: "5 logins, 5 dashboards", delay: 40 },
];

export const SOLUTION_STACK_ITEMS: StackedIconItem[] = [
  { icon: "🎯", text: "Lead discovery", delay: 0 },
  { icon: "📱", text: "Multi-channel outreach", delay: 12 },
  { icon: "🤖", text: "AI agents", delay: 24 },
  { icon: "📅", text: "Appointment booking", delay: 36 },
];
