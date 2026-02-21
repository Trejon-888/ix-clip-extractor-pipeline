import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";

/**
 * Custom illustrations for ClaudeCreatives composition.
 * Clean vector SVGs with brand orange (#FF7614) and Apple aesthetic.
 */

// ===== CLAUDE CODE HERO =====
// Logo in a wide crystal glass box — horizontal, premium
export const ClaudeCodeHero: React.FC<{ width?: number }> = ({
  width = 500,
}) => {
  const height = width * 0.52;
  const iconSize = height * 0.92;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 32,
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)",
        border: "2px solid rgba(255,255,255,0.2)",
        boxShadow:
          "0 20px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(16px)",
      }}
    >
      <Img
        src={staticFile("logos/claude-code-terminal.webp")}
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: 20,
        }}
      />
    </div>
  );
};

// ===== TRENDING CHART =====
// Upward trend line with glow — "going crazy right now"
export const TrendingChart: React.FC<{ size?: number }> = ({
  size = 280,
}) => {
  const frame = useCurrentFrame();
  // Animate the line drawing in
  const progress = Math.min(1, frame / 20);

  return (
    <div
      style={{
        width: size,
        height: size * 0.7,
      }}
    >
      <svg
        viewBox="0 0 280 196"
        width={size}
        height={size * 0.7}
        style={{ filter: "drop-shadow(0 4px 20px rgba(255,118,20,0.4))" }}
      >
        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="30"
            y1={40 + i * 42}
            x2="265"
            y2={40 + i * 42}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}
        {/* Trend line — animated draw-in */}
        <polyline
          points="40,160 80,148 120,135 150,115 180,80 210,55 250,28"
          fill="none"
          stroke="#FF7614"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="300"
          strokeDashoffset={300 * (1 - progress)}
        />
        {/* Glow dot at tip */}
        <circle
          cx={40 + 210 * progress}
          cy={160 - 132 * progress}
          r="6"
          fill="#FF7614"
          opacity={progress}
        >
          <animate
            attributeName="r"
            values="6;9;6"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Arrow tip */}
        {progress > 0.9 && (
          <polygon
            points="250,28 242,18 256,22"
            fill="#FF7614"
            opacity={Math.min(1, (progress - 0.9) * 10)}
          />
        )}
      </svg>
    </div>
  );
};

// ===== CODING AGENT TERMINAL =====
// Terminal window showing Claude Code in action — for "coding agent of 2026"
export const CodingAgentTerminal: React.FC<{ size?: number }> = ({
  size = 380,
}) => {
  const frame = useCurrentFrame();
  // Blinking cursor
  const cursorOpacity = Math.sin(frame * 0.3) > 0 ? 1 : 0;

  return (
    <div
      style={{
        width: size,
        height: size * 0.65,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 16px 50px rgba(0,0,0,0.6)",
        border: "2px solid rgba(255,255,255,0.15)",
      }}
    >
      <svg viewBox="0 0 380 247" width={size} height={size * 0.65}>
        {/* Window bg */}
        <rect width="380" height="247" rx="14" fill="#1A1A1A" />
        {/* Title bar */}
        <rect width="380" height="32" rx="14" fill="#252525" />
        <rect y="14" width="380" height="18" fill="#252525" />
        <circle cx="18" cy="16" r="5" fill="#FF5F56" />
        <circle cx="34" cy="16" r="5" fill="#FFBD2E" />
        <circle cx="50" cy="16" r="5" fill="#27CA40" />
        <text
          x="190"
          y="20"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="11"
          fill="rgba(255,255,255,0.5)"
        >
          claude — ~/project
        </text>
        {/* Terminal lines */}
        <text x="16" y="56" fontFamily="monospace" fontSize="12" fill="#27CA40">
          $
        </text>
        <text
          x="28"
          y="56"
          fontFamily="monospace"
          fontSize="12"
          fill="rgba(255,255,255,0.85)"
        >
          claude &quot;create thumbnails for my video&quot;
        </text>
        <text
          x="16"
          y="80"
          fontFamily="monospace"
          fontSize="11"
          fill="#FF7614"
        >
          ● Analyzing video content...
        </text>
        <text
          x="16"
          y="100"
          fontFamily="monospace"
          fontSize="11"
          fill="#FF7614"
        >
          ● Generating 3 thumbnail concepts...
        </text>
        <text
          x="16"
          y="120"
          fontFamily="monospace"
          fontSize="11"
          fill="#27CA40"
        >
          ✓ Thumbnail 1 saved → output/thumbnails/
        </text>
        <text
          x="16"
          y="140"
          fontFamily="monospace"
          fontSize="11"
          fill="#27CA40"
        >
          ✓ Thumbnail 2 saved → output/thumbnails/
        </text>
        <text
          x="16"
          y="160"
          fontFamily="monospace"
          fontSize="11"
          fill="#27CA40"
        >
          ✓ Face composite applied (4K)
        </text>
        <text
          x="16"
          y="188"
          fontFamily="monospace"
          fontSize="11"
          fill="rgba(255,255,255,0.5)"
        >
          Done in 12.4s — 3 thumbnails generated
        </text>
        {/* New prompt line with blinking cursor */}
        <text
          x="16"
          y="216"
          fontFamily="monospace"
          fontSize="12"
          fill="#27CA40"
        >
          $
        </text>
        <rect
          x="28"
          y="206"
          width="8"
          height="14"
          fill="rgba(255,255,255,0.7)"
          opacity={cursorOpacity}
        />
      </svg>
    </div>
  );
};

// ===== LIGHTNING BOLT =====
// "Something different" — disruption / pivot visual
export const LightningBolt: React.FC<{ size?: number }> = ({
  size = 200,
}) => {
  const frame = useCurrentFrame();
  const glow = 0.6 + Math.sin(frame * 0.2) * 0.4;

  return (
    <div style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        style={{
          filter: `drop-shadow(0 0 ${20 + glow * 15}px rgba(255,118,20,${0.4 + glow * 0.3}))`,
        }}
      >
        <polygon
          points="110,10 60,95 95,95 80,190 145,100 108,100"
          fill="url(#bolt-grad)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="bolt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB347" />
            <stop offset="50%" stopColor="#FF7614" />
            <stop offset="100%" stopColor="#FF5500" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// ===== #1 BADGE + CODING AGENT SCREENSHOT =====
// Hexagonal badge with a real Claude Code terminal screenshot beside it
export const NumberOneAgent: React.FC<{
  badgeSize?: number;
}> = ({ badgeSize = 230 }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.15) * 0.05;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}
    >
      {/* #1 Badge */}
      <div
        style={{
          width: badgeSize,
          height: badgeSize,
          position: "relative",
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 300 320"
          width={badgeSize}
          height={badgeSize}
          style={{
            filter: "drop-shadow(0 8px 30px rgba(255,118,20,0.5))",
          }}
        >
          <defs>
            <linearGradient
              id="badge-grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FF7614" />
              <stop offset="100%" stopColor="#FF9E1A" />
            </linearGradient>
            <linearGradient
              id="badge-inner"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FF8A3D" />
              <stop offset="100%" stopColor="#FF6800" />
            </linearGradient>
          </defs>
          <polygon
            points="150,15 270,85 270,225 150,295 30,225 30,85"
            fill="url(#badge-grad)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          <polygon
            points="150,40 248,100 248,210 150,270 52,210 52,100"
            fill="url(#badge-inner)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          <text
            x="150"
            y="178"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight="900"
            fontSize="120"
            fill="#FFFFFF"
          >
            #1
          </text>
        </svg>
        {/* Animated glow ring */}
        <div
          style={{
            position: "absolute",
            inset: -12,
            borderRadius: "50%",
            border: "2px solid rgba(255,118,20,0.2)",
            transform: `scale(${pulse})`,
            opacity: 0.5,
          }}
        />
      </div>

      {/* Claude Code terminal screenshot — proper 16:10 aspect ratio */}
      <div
        style={{
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          border: "2px solid rgba(255,255,255,0.15)",
          transform: "rotate(2deg)",
          flexShrink: 0,
        }}
      >
        <Img
          src={staticFile(
            "videos/2026-02-14-claude-creatives/claude-code-screenshot.png"
          )}
          style={{
            width: 340,
            height: 218,
            objectFit: "cover",
            borderRadius: 12,
          }}
        />
      </div>
    </div>
  );
};

// ===== WEB APPS ILLUSTRATION =====
// Overlapping browser windows representing real web applications
export const WebAppsIllustration: React.FC<{ size?: number }> = ({
  size = 360,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size * 0.85,
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 360 306"
        width={size}
        height={size * 0.85}
        style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.4))" }}
      >
        {/* Back window — dimmed */}
        <g transform="translate(0, 0)" opacity="0.6">
          <rect
            x="10"
            y="10"
            width="240"
            height="180"
            rx="10"
            fill="#1A1A1A"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          <rect x="10" y="10" width="240" height="28" rx="10" fill="#252525" />
          <rect x="10" y="28" width="240" height="10" fill="#252525" />
          <circle cx="28" cy="24" r="5" fill="#FF5F56" />
          <circle cx="44" cy="24" r="5" fill="#FFBD2E" />
          <circle cx="60" cy="24" r="5" fill="#27CA40" />
          <rect
            x="80"
            y="18"
            width="120"
            height="12"
            rx="6"
            fill="rgba(255,255,255,0.08)"
          />
          <rect
            x="24"
            y="52"
            width="100"
            height="8"
            rx="4"
            fill="rgba(255,255,255,0.12)"
          />
          <rect
            x="24"
            y="68"
            width="160"
            height="6"
            rx="3"
            fill="rgba(255,255,255,0.07)"
          />
          <rect
            x="24"
            y="82"
            width="140"
            height="6"
            rx="3"
            fill="rgba(255,255,255,0.07)"
          />
          <rect
            x="24"
            y="100"
            width="90"
            height="60"
            rx="6"
            fill="rgba(255,118,20,0.15)"
            stroke="rgba(255,118,20,0.3)"
            strokeWidth="1"
          />
        </g>

        {/* Middle window */}
        <g transform="translate(50, 50)" opacity="0.85">
          <rect
            x="10"
            y="10"
            width="250"
            height="190"
            rx="10"
            fill="#222222"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          <rect x="10" y="10" width="250" height="28" rx="10" fill="#2A2A2A" />
          <rect x="10" y="28" width="250" height="10" fill="#2A2A2A" />
          <circle cx="28" cy="24" r="5" fill="#FF5F56" />
          <circle cx="44" cy="24" r="5" fill="#FFBD2E" />
          <circle cx="60" cy="24" r="5" fill="#27CA40" />
          <rect
            x="85"
            y="18"
            width="130"
            height="12"
            rx="6"
            fill="rgba(255,255,255,0.08)"
          />
          <rect
            x="10"
            y="38"
            width="55"
            height="162"
            fill="rgba(255,255,255,0.03)"
          />
          <rect
            x="18"
            y="52"
            width="38"
            height="6"
            rx="3"
            fill="rgba(255,118,20,0.6)"
          />
          <rect
            x="18"
            y="66"
            width="38"
            height="6"
            rx="3"
            fill="rgba(255,255,255,0.1)"
          />
          <rect
            x="18"
            y="80"
            width="38"
            height="6"
            rx="3"
            fill="rgba(255,255,255,0.1)"
          />
          <rect
            x="75"
            y="52"
            width="140"
            height="10"
            rx="5"
            fill="rgba(255,255,255,0.14)"
          />
          <rect
            x="75"
            y="70"
            width="170"
            height="6"
            rx="3"
            fill="rgba(255,255,255,0.08)"
          />
          <rect
            x="75"
            y="84"
            width="150"
            height="6"
            rx="3"
            fill="rgba(255,255,255,0.08)"
          />
          <rect
            x="75"
            y="106"
            width="70"
            height="24"
            rx="6"
            fill="#FF7614"
          />
          <rect
            x="87"
            y="114"
            width="46"
            height="6"
            rx="3"
            fill="rgba(255,255,255,0.9)"
          />
        </g>

        {/* Front window — most prominent */}
        <g transform="translate(95, 95)">
          <rect
            x="10"
            y="10"
            width="250"
            height="200"
            rx="10"
            fill="#2D2D2D"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
          />
          <rect x="10" y="10" width="250" height="28" rx="10" fill="#333333" />
          <rect x="10" y="28" width="250" height="10" fill="#333333" />
          <circle cx="28" cy="24" r="5" fill="#FF5F56" />
          <circle cx="44" cy="24" r="5" fill="#FFBD2E" />
          <circle cx="60" cy="24" r="5" fill="#27CA40" />
          <rect
            x="88"
            y="18"
            width="130"
            height="12"
            rx="6"
            fill="rgba(255,255,255,0.1)"
          />
          <rect
            x="22"
            y="52"
            width="110"
            height="10"
            rx="5"
            fill="rgba(255,255,255,0.16)"
          />
          <rect
            x="22"
            y="72"
            width="68"
            height="48"
            rx="6"
            fill="rgba(255,118,20,0.2)"
            stroke="rgba(255,118,20,0.35)"
            strokeWidth="1"
          />
          <text
            x="56"
            y="102"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight="800"
            fontSize="16"
            fill="#FF7614"
          >
            90K
          </text>
          <rect
            x="98"
            y="72"
            width="68"
            height="48"
            rx="6"
            fill="rgba(255,255,255,0.06)"
          />
          <rect
            x="174"
            y="72"
            width="68"
            height="48"
            rx="6"
            fill="rgba(255,255,255,0.06)"
          />
          <rect
            x="22"
            y="132"
            width="220"
            height="60"
            rx="6"
            fill="rgba(255,255,255,0.04)"
          />
          <polyline
            points="32,172 72,158 112,165 152,148 192,140 232,135"
            fill="none"
            stroke="#FF7614"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

// ===== PLATFORM GRID =====
// 6 social platform icons in a 3×2 grid — for "every social platform"
export const PlatformGrid: React.FC<{ size?: number }> = ({ size = 300 }) => {
  const iconSize = size * 0.26;
  const gap = size * 0.06;
  const platforms = [
    "instagram.svg",
    "tiktok.svg",
    "linkedin.svg",
    "x.svg",
    "youtube.svg",
    "facebook.svg",
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(3, ${iconSize}px)`,
        gap,
        padding: size * 0.06,
        borderRadius: 18,
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
        border: "2px solid rgba(255,255,255,0.12)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
        backdropFilter: "blur(12px)",
      }}
    >
      {platforms.map((p) => (
        <div
          key={p}
          style={{
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize * 0.22,
            background: "rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img
            src={staticFile(`logos/${p}`)}
            style={{
              width: iconSize * 0.6,
              height: iconSize * 0.6,
            }}
          />
        </div>
      ))}
    </div>
  );
};

// ===== LINKEDIN ICON =====
export const LinkedInIcon: React.FC<{ size?: number }> = ({ size = 110 }) => {
  return (
    <Img
      src={staticFile("logos/linkedin.svg")}
      style={{ width: size, height: size }}
    />
  );
};
