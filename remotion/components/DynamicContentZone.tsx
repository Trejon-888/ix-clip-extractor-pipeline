import React from "react";
import { useCurrentFrame, interpolate, Img, staticFile } from "remotion";
import { COLORS } from "../lib/colors";

/**
 * Dynamic Content Zone for Educational Explainer Style
 *
 * Top 60% of portrait frame - displays platform logos, code snippets,
 * diagrams, and technical content synchronized to speech
 */

export type ContentType =
  | "logo"
  | "code"
  | "diagram"
  | "illustration"
  | "comparison"
  | "text-overlay";

interface DynamicContentZoneProps {
  type: ContentType;
  content: string | string[]; // Can be single item or array for multi-logo display
  caption?: string; // Optional descriptive text below content
  durationInFrames: number;
}

export const DynamicContentZone: React.FC<DynamicContentZoneProps> = ({
  type,
  content,
  caption,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  // Entrance animation (first 12 frames)
  const entrance = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, 12], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit animation (last 10 frames)
  const exit = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const opacity = entrance * exit;

  // Render different content types
  const renderContent = () => {
    switch (type) {
      case "logo":
        if (Array.isArray(content)) {
          // Multi-logo grid layout
          return (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "32px",
                width: "100%",
                maxWidth: "800px",
              }}
            >
              {content.map((logo, i) => (
                <LogoDisplay key={i} name={logo} delay={i * 3} />
              ))}
            </div>
          );
        }
        return <LogoDisplay name={content as string} />;

      case "code":
        return <CodeDisplay code={content as string} />;

      case "diagram":
        return <DiagramDisplay type={content as string} />;

      case "text-overlay":
        return <TextOverlay text={content as string} />;

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "8%",
        left: "50%",
        transform: `translate(-50%, 0) scale(${scale})`,
        opacity,
        width: "90%",
        maxWidth: "900px",
        height: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
      }}
    >
      {/* Content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {renderContent()}
      </div>

      {/* Caption */}
      {caption && (
        <div
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: "32px",
            fontWeight: 700,
            color: COLORS.white,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            textShadow: "0 2px 12px rgba(0, 0, 0, 0.8)",
            backgroundColor: "rgba(255, 118, 20, 0.15)",
            padding: "12px 32px",
            borderRadius: "12px",
            border: `2px solid ${COLORS.primary}40`,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
};

// Sub-component: Logo Display
const LogoDisplay: React.FC<{ name: string; delay?: number }> = ({
  name,
  delay = 0,
}) => {
  const frame = useCurrentFrame();

  const logoEntrance = interpolate(frame, [delay, delay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // SVG logos for common platforms
  const renderLogo = () => {
    switch (name.toLowerCase()) {
      case "claude":
        return <ClaudeLogo />;
      case "pydantic ai":
      case "pydantic":
        return <PydanticAILogo />;
      case "langchain":
        return <LangChainLogo />;
      case "crewai":
        return <CrewAILogo />;
      case "anthropic":
        return <AnthropicLogo />;
      default:
        return <GenericFrameworkLogo name={name} />;
    }
  };

  return (
    <div
      style={{
        opacity: logoEntrance,
        transform: `scale(${interpolate(frame, [delay, delay + 8], [0.8, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })})`,
      }}
    >
      {renderLogo()}
    </div>
  );
};

// SVG Logo Components
const ClaudeLogo = () => (
  <svg width="240" height="80" viewBox="0 0 240 80" fill="none">
    <rect width="240" height="80" rx="12" fill={COLORS.darkGray} />
    {/* Claude brand color gradient */}
    <defs>
      <linearGradient id="claudeGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    {/* Simplified Claude logo shape */}
    <circle cx="50" cy="40" r="18" fill="url(#claudeGrad)" />
    <path
      d="M50 28 L58 40 L50 52 L42 40 Z"
      fill={COLORS.dark}
    />
    {/* Text */}
    <text
      x="80"
      y="48"
      fontFamily="Inter, sans-serif"
      fontSize="28"
      fontWeight="700"
      fill={COLORS.white}
    >
      Claude
    </text>
  </svg>
);

const PydanticAILogo = () => (
  <svg width="260" height="80" viewBox="0 0 260 80" fill="none">
    <rect width="260" height="80" rx="12" fill={COLORS.darkGray} />
    {/* Pydantic pink accent */}
    <circle cx="45" cy="40" r="16" fill="#E92D7C" />
    <path d="M38 40 L45 30 L52 40 L45 50 Z" fill={COLORS.white} />
    <text
      x="75"
      y="48"
      fontFamily="Inter, sans-serif"
      fontSize="26"
      fontWeight="700"
      fill={COLORS.white}
    >
      Pydantic AI
    </text>
  </svg>
);

const LangChainLogo = () => (
  <svg width="260" height="80" viewBox="0 0 260 80" fill="none">
    <rect width="260" height="80" rx="12" fill={COLORS.darkGray} />
    {/* Chain link icon */}
    <rect x="30" y="28" width="12" height="24" rx="6" fill="#10B981" />
    <rect x="46" y="28" width="12" height="24" rx="6" fill="#10B981" />
    <rect x="38" y="20" width="12" height="40" rx="6" fill={COLORS.silver} opacity="0.5" />
    <text
      x="75"
      y="48"
      fontFamily="Inter, sans-serif"
      fontSize="26"
      fontWeight="700"
      fill={COLORS.white}
    >
      LangChain
    </text>
  </svg>
);

const CrewAILogo = () => (
  <svg width="240" height="80" viewBox="0 0 240 80" fill="none">
    <rect width="240" height="80" rx="12" fill={COLORS.darkGray} />
    {/* Crew icon - multiple agents */}
    <circle cx="35" cy="35" r="8" fill="#3B82F6" />
    <circle cx="50" cy="35" r="8" fill="#3B82F6" />
    <circle cx="35" cy="48" r="8" fill="#3B82F6" />
    <circle cx="50" cy="48" r="8" fill="#3B82F6" />
    <text
      x="75"
      y="48"
      fontFamily="Inter, sans-serif"
      fontSize="26"
      fontWeight="700"
      fill={COLORS.white}
    >
      CrewAI
    </text>
  </svg>
);

const AnthropicLogo = () => (
  <svg width="260" height="80" viewBox="0 0 260 80" fill="none">
    <rect width="260" height="80" rx="12" fill={COLORS.darkGray} />
    {/* Anthropic A-shaped icon */}
    <path
      d="M40 52 L50 28 L60 52 M44 44 H56"
      stroke={COLORS.primary}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <text
      x="75"
      y="48"
      fontFamily="Inter, sans-serif"
      fontSize="25"
      fontWeight="700"
      fill={COLORS.white}
    >
      Anthropic
    </text>
  </svg>
);

const GenericFrameworkLogo: React.FC<{ name: string }> = ({ name }) => (
  <svg width="240" height="80" viewBox="0 0 240 80" fill="none">
    <rect width="240" height="80" rx="12" fill={COLORS.darkGray} />
    <rect x="20" y="20" width="40" height="40" rx="8" fill={COLORS.primary} opacity="0.8" />
    <text
      x="75"
      y="48"
      fontFamily="Inter, sans-serif"
      fontSize="24"
      fontWeight="700"
      fill={COLORS.white}
    >
      {name}
    </text>
  </svg>
);

// Code Display Component
const CodeDisplay: React.FC<{ code: string }> = ({ code }) => {
  const frame = useCurrentFrame();
  const chars = code.length;
  const visibleChars = Math.floor(
    interpolate(frame, [0, 30], [0, chars], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <div
      style={{
        backgroundColor: "#1E1E1E",
        padding: "32px",
        borderRadius: "16px",
        border: `2px solid ${COLORS.primary}40`,
        fontFamily: '"Fira Code", "Courier New", monospace',
        fontSize: "24px",
        color: "#D4D4D4",
        lineHeight: 1.6,
        textAlign: "left",
        maxWidth: "700px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div style={{ color: "#9CDCFE" }}>
        {code.substring(0, visibleChars)}
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "28px",
            backgroundColor: COLORS.primary,
            marginLeft: "2px",
            animation: "blink 1s infinite",
          }}
        />
      </div>
    </div>
  );
};

// Diagram Display Component
const DiagramDisplay: React.FC<{ type: string }> = ({ type }) => {
  // Simple placeholder - would be replaced with actual diagram SVGs
  return (
    <div
      style={{
        width: "600px",
        height: "400px",
        backgroundColor: COLORS.darkGray,
        borderRadius: "16px",
        border: `2px solid ${COLORS.primary}40`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        color: COLORS.silver,
      }}
    >
      Diagram: {type}
    </div>
  );
};

// Text Overlay Component
const TextOverlay: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      fontSize: "64px",
      fontWeight: 900,
      color: COLORS.white,
      textAlign: "center",
      textShadow: `0 0 40px ${COLORS.primary}60, 0 4px 16px rgba(0, 0, 0, 0.9)`,
      textTransform: "uppercase",
      letterSpacing: "0.02em",
      lineHeight: 1.2,
      maxWidth: "800px",
    }}
  >
    {text}
  </div>
);
