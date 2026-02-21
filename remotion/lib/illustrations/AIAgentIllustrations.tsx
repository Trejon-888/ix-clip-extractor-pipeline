import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";

/**
 * AI Agent Social Media Manager — Premium Illustrations
 *
 * Design principles (matching Opus46 V2 quality):
 * - Use REAL logos via Img + staticFile where available
 * - Clean, minimal, Apple-keynote aesthetic
 * - Motion: spring() + interpolate() for premium animations
 * - Multi-phase reveals (staggered cascade)
 * - Brand orange (#FF6B00) as accent only
 * - Black/charcoal for primary elements on white bg
 * - Subtle shadows and depth
 * - system-ui font family for consistency
 * - NO emojis, NO text-in-circle hacks
 */

const ORANGE = "#FF6B00";
const BLACK = "#1A1A1A";
const GRAY = "#666666";
const LIGHT_GRAY = "#E5E7EB";
const MUTED = "#9CA3AF";
const GREEN = "#10B981";
const INDIGO = "#6366F1";

// ─────────────────────────────────────────
// 1. Claude Code — Real terminal screenshot
// ─────────────────────────────────────────
export const ClaudeCodeLogo: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = spring({
    frame,
    fps,
    from: 0.85,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });
  const imgOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${imgScale})`,
        opacity: imgOpacity,
      }}
    >
      <Img
        src={staticFile("logos/claude-code-terminal.webp")}
        style={{
          width: size * 0.9,
          height: "auto",
          objectFit: "contain",
          borderRadius: 12,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      />
    </div>
  );
};

// ─────────────────────────────────────────
// 2. Thirteen Platforms — Real logos grid
// ─────────────────────────────────────────
export const ThirteenPlatformsV2: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const platforms = [
    { name: "YouTube", icon: "logos/youtube.svg", bg: "#FF0000" },
    { name: "Instagram", icon: "logos/instagram.svg", bg: "#E4405F" },
    { name: "LinkedIn", icon: "logos/linkedin.svg", bg: "#0A66C2" },
    { name: "X", icon: "logos/x.svg", bg: "#000000" },
    { name: "TikTok", icon: "logos/tiktok.svg", bg: "#000000" },
    { name: "Facebook", icon: "logos/facebook.svg", bg: "#1877F2" },
    { name: "Pinterest", icon: "logos/pinterest.svg", bg: "#E60023" },
    { name: "Threads", icon: "logos/threads.svg", bg: "#000000" },
    { name: "Bluesky", icon: "logos/bluesky.svg", bg: "#0085FF" },
    { name: "Google Biz", icon: "logos/googlebusiness.svg", bg: "#4285F4" },
    { name: "Telegram", icon: "logos/telegram.svg", bg: "#26A5E4" },
    { name: "Snapchat", icon: "logos/snapchat.svg", bg: "#FFFC00" },
    { name: "Reddit", icon: "logos/reddit.svg", bg: "#FF4500" },
  ];

  const badgeScale = spring({
    frame: Math.max(0, frame - 28),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 80 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: size * 0.02,
      }}
    >
      {/* Platform grid — 3 columns */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: size * 0.018,
          justifyContent: "center",
          maxWidth: size * 0.9,
        }}
      >
        {platforms.map((p, i) => {
          const pillScale = spring({
            frame: Math.max(0, frame - i * 1.5),
            fps,
            from: 0,
            to: 1,
            config: { damping: 14, stiffness: 100 },
          });

          return (
            <div
              key={p.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: size * 0.015,
                background: "#FAFAFA",
                border: `1.5px solid ${LIGHT_GRAY}`,
                borderRadius: 100,
                padding: `${size * 0.012}px ${size * 0.025}px`,
                transform: `scale(${pillScale})`,
                width: size * 0.27,
              }}
            >
              {/* Real platform logo (white icon on brand color circle) */}
              <div
                style={{
                  width: size * 0.042,
                  height: size * 0.042,
                  borderRadius: "50%",
                  background: p.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Img
                  src={staticFile(p.icon)}
                  style={{
                    width: size * 0.024,
                    height: size * 0.024,
                    objectFit: "contain",
                    filter: p.bg === "#FFFC00" ? "none" : "brightness(0) invert(1)",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 600,
                  fontSize: size * 0.025,
                  color: BLACK,
                  whiteSpace: "nowrap",
                }}
              >
                {p.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* ALL CONNECTED badge */}
      <div
        style={{
          background: ORANGE,
          borderRadius: 100,
          padding: `${size * 0.015}px ${size * 0.05}px`,
          transform: `scale(${badgeScale})`,
          marginTop: size * 0.015,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 700,
            fontSize: size * 0.028,
            color: "#FFFFFF",
            letterSpacing: 2,
          }}
        >
          ALL CONNECTED
        </span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// 3. MCP Bridge — Premium flow diagram
// ─────────────────────────────────────────
export const MCPBridgeV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Left node appears
  const node1Scale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Phase 2: Line draws
  const lineProgress = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Center node
  const node2Scale = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Phase 4: Right node
  const node3Scale = spring({
    frame: Math.max(0, frame - 22),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Flowing data dots
  const dotPhase = (frame % 50) / 50;

  // MCP pulse
  const mcpPulse = interpolate(frame % 40, [0, 20, 40], [1, 1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Connection lines */}
      <line
        x1="160"
        y1="260"
        x2={160 + 120 * lineProgress}
        y2="260"
        stroke={LIGHT_GRAY}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="340"
        y1="260"
        x2={340 + 120 * lineProgress}
        y2="260"
        stroke={LIGHT_GRAY}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Data flow dots */}
      {lineProgress > 0.5 && (
        <>
          <circle
            cx={160 + 120 * dotPhase}
            cy="260"
            r="4"
            fill={ORANGE}
            opacity={0.7}
          />
          <circle
            cx={340 + 120 * ((dotPhase + 0.3) % 1)}
            cy="260"
            r="4"
            fill={ORANGE}
            opacity={0.7}
          />
        </>
      )}

      {/* Node 1: Claude */}
      <g
        transform={`translate(100, 260) scale(${node1Scale}) translate(-100, -260)`}
      >
        <circle
          cx="100"
          cy="260"
          r="56"
          fill="#FAFAFA"
          stroke={BLACK}
          strokeWidth="2.5"
        />
        <text
          x="100"
          y="255"
          textAnchor="middle"
          fill={BLACK}
          fontSize="16"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          Claude
        </text>
        <text
          x="100"
          y="275"
          textAnchor="middle"
          fill={GRAY}
          fontSize="12"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          Code
        </text>
      </g>

      {/* Node 2: MCP (bridge) — orange accent */}
      <g
        transform={`translate(300, 260) scale(${node2Scale * mcpPulse}) translate(-300, -260)`}
      >
        <circle cx="300" cy="264" r="58" fill="rgba(0,0,0,0.04)" />
        <circle
          cx="300"
          cy="260"
          r="56"
          fill="#FAFAFA"
          stroke={ORANGE}
          strokeWidth="3"
        />
        <text
          x="300"
          y="255"
          textAnchor="middle"
          fill={ORANGE}
          fontSize="18"
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
          letterSpacing="2"
        >
          MCP
        </text>
        <text
          x="300"
          y="275"
          textAnchor="middle"
          fill={GRAY}
          fontSize="11"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          SERVER
        </text>
      </g>

      {/* Node 3: Platforms (grid of dots) */}
      <g
        transform={`translate(500, 260) scale(${node3Scale}) translate(-500, -260)`}
      >
        <circle
          cx="500"
          cy="260"
          r="56"
          fill="#FAFAFA"
          stroke={BLACK}
          strokeWidth="2.5"
        />
        {/* Mini platform dots (3x3) */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={482 + col * 18}
              cy={244 + row * 18}
              r="4"
              fill={
                [
                  "#FF0000",
                  "#E4405F",
                  "#0A66C2",
                  "#1877F2",
                  "#000000",
                  "#E60023",
                  "#0085FF",
                  "#26A5E4",
                  "#FF4500",
                ][row * 3 + col]
              }
            />
          ))
        )}
        <text
          x="500"
          y="290"
          textAnchor="middle"
          fill={GRAY}
          fontSize="10"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          13 PLATFORMS
        </text>
      </g>

      {/* Labels below */}
      <text
        x="100"
        y="345"
        textAnchor="middle"
        fill={MUTED}
        fontSize="13"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
        opacity={node1Scale}
      >
        You talk
      </text>
      <text
        x="300"
        y="345"
        textAnchor="middle"
        fill={MUTED}
        fontSize="13"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
        opacity={node2Scale}
      >
        MCP bridges
      </text>
      <text
        x="500"
        y="345"
        textAnchor="middle"
        fill={MUTED}
        fontSize="13"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
        opacity={node3Scale}
      >
        Posts go live
      </text>
    </svg>
  );
};

// ─────────────────────────────────────────
// 4. INFINITX Brand — Real logo
// ─────────────────────────────────────────
export const INFINITXLogo: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    from: 0.7,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });
  const logoOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const subtitleOpacity = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });
  const subtitleY = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 15,
    to: 0,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        transform: `scale(${logoScale})`,
        opacity: logoOpacity,
      }}
    >
      {/* Real INFINITX logo */}
      <Img
        src={staticFile("infinitx-logo.png")}
        style={{
          height: size * 0.25,
          objectFit: "contain",
        }}
      />

      {/* Brand name */}
      <div
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 900,
          fontSize: size * 0.08,
          color: BLACK,
          letterSpacing: -1,
        }}
      >
        INFINITX
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 500,
          fontSize: size * 0.032,
          color: MUTED,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
        }}
      >
        AI Client Acquisition Systems
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// 5. Architecture — Premium horizontal flow
// ─────────────────────────────────────────
export const ArchitectureFlowV2: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered card reveals
  const card1 = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const arrow1 = interpolate(frame, [8, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const card2 = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });
  const arrow2 = interpolate(frame, [20, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const card3 = spring({
    frame: Math.max(0, frame - 24),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // Data flow animation
  const flowDot = (frame % 40) / 40;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Card 1: You (Claude Code) */}
      <g opacity={card1}>
        <rect
          x="20"
          y="190"
          width="150"
          height="160"
          rx="16"
          fill="#FAFAFA"
          stroke={BLACK}
          strokeWidth="2"
        />
        {/* Terminal icon */}
        <rect
          x="55"
          y="215"
          width="80"
          height="50"
          rx="6"
          fill="#F5F5F5"
          stroke={LIGHT_GRAY}
          strokeWidth="1"
        />
        <text
          x="68"
          y="245"
          fill={ORANGE}
          fontSize="14"
          fontWeight="700"
          fontFamily="monospace"
        >
          $ _
        </text>
        <text
          x="95"
          y="300"
          textAnchor="middle"
          fill={BLACK}
          fontSize="16"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          Claude Code
        </text>
        <text
          x="95"
          y="318"
          textAnchor="middle"
          fill={MUTED}
          fontSize="11"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          Your AI Brain
        </text>
      </g>

      {/* Arrow 1 */}
      <g opacity={arrow1}>
        <line
          x1="170"
          y1="270"
          x2={170 + 55 * arrow1}
          y2="270"
          stroke={ORANGE}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <polygon
          points={`${225},270 ${215},265 ${215},275`}
          fill={ORANGE}
          opacity={arrow1}
        />
        {/* Flow dot */}
        <circle
          cx={170 + 55 * flowDot}
          cy="270"
          r="3"
          fill={ORANGE}
          opacity={0.6}
        />
      </g>

      {/* Card 2: Late MCP (the bridge) */}
      <g opacity={card2}>
        <rect
          x="225"
          y="190"
          width="150"
          height="160"
          rx="16"
          fill="#FAFAFA"
          stroke={ORANGE}
          strokeWidth="2.5"
        />
        {/* Bridge icon */}
        <rect
          x="265"
          y="218"
          width="70"
          height="8"
          rx="4"
          fill={ORANGE}
        />
        <rect x="280" y="226" width="8" height="25" rx="2" fill={ORANGE} opacity="0.5" />
        <rect x="312" y="226" width="8" height="25" rx="2" fill={ORANGE} opacity="0.5" />
        <text
          x="300"
          y="290"
          textAnchor="middle"
          fill={BLACK}
          fontSize="16"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          Late MCP
        </text>
        <text
          x="300"
          y="308"
          textAnchor="middle"
          fill={MUTED}
          fontSize="11"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          The Bridge
        </text>
      </g>

      {/* Arrow 2 */}
      <g opacity={arrow2}>
        <line
          x1="375"
          y1="270"
          x2={375 + 55 * arrow2}
          y2="270"
          stroke={ORANGE}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <polygon
          points={`${430},270 ${420},265 ${420},275`}
          fill={ORANGE}
          opacity={arrow2}
        />
        <circle
          cx={375 + 55 * flowDot}
          cy="270"
          r="3"
          fill={ORANGE}
          opacity={0.6}
        />
      </g>

      {/* Card 3: 13 Platforms */}
      <g opacity={card3}>
        <rect
          x="430"
          y="190"
          width="150"
          height="160"
          rx="16"
          fill="#FAFAFA"
          stroke={BLACK}
          strokeWidth="2"
        />
        {/* Mini platform grid */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <circle
              key={`g-${row}-${col}`}
              cx={472 + col * 22}
              cy={218 + row * 22}
              r="6"
              fill={
                [
                  "#FF0000",
                  "#E4405F",
                  "#0A66C2",
                  "#1877F2",
                  "#000000",
                  "#E60023",
                  "#0085FF",
                  "#26A5E4",
                  "#FF4500",
                ][row * 3 + col]
              }
              opacity="0.8"
            />
          ))
        )}
        <text
          x="505"
          y="300"
          textAnchor="middle"
          fill={BLACK}
          fontSize="16"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          13 Platforms
        </text>
        <text
          x="505"
          y="318"
          textAnchor="middle"
          fill={MUTED}
          fontSize="11"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          Posts Go Live
        </text>
      </g>

      {/* Bottom label */}
      <text
        x="300"
        y="420"
        textAnchor="middle"
        fill={MUTED}
        fontSize="14"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
        letterSpacing="4"
        opacity={card3}
      >
        ONE CONVERSATION → EVERY PLATFORM
      </text>
    </svg>
  );
};

// ─────────────────────────────────────────
// 6. Free GitHub Repo — Premium card with real GitHub mark
// ─────────────────────────────────────────
export const FreeRepoCard: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });
  const cardOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const badgeScale = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 80 },
  });

  const statsOpacity = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${cardScale})`,
        opacity: cardOpacity,
      }}
    >
      <div
        style={{
          width: size * 0.7,
          background: "#FAFAFA",
          border: `2px solid ${LIGHT_GRAY}`,
          borderRadius: size * 0.035,
          padding: `${size * 0.05}px ${size * 0.06}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: size * 0.025,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* Real GitHub mark */}
        <Img
          src={staticFile("logos/github-mark.svg")}
          style={{
            width: size * 0.14,
            height: size * 0.14,
            objectFit: "contain",
          }}
        />

        {/* FREE badge */}
        <div
          style={{
            background: GREEN,
            borderRadius: 100,
            padding: `${size * 0.012}px ${size * 0.05}px`,
            transform: `scale(${badgeScale})`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 800,
              fontSize: size * 0.035,
              color: "#FFFFFF",
              letterSpacing: 3,
            }}
          >
            FREE
          </span>
        </div>

        {/* Repo name */}
        <div
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 700,
            fontSize: size * 0.032,
            color: BLACK,
          }}
        >
          ai-social-media-manager
        </div>

        {/* Description */}
        <div
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 500,
            fontSize: size * 0.024,
            color: MUTED,
          }}
        >
          Clone it. Follow the README. Post in 10 min.
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: size * 0.06,
            opacity: statsOpacity,
            marginTop: size * 0.01,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: ORANGE,
              }}
            />
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 500,
                fontSize: size * 0.022,
                color: GRAY,
              }}
            >
              3 Skills
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: ORANGE,
              }}
            />
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 500,
                fontSize: size * 0.022,
                color: GRAY,
              }}
            >
              13 Platforms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// 7. Late API — Premium branded card
// ─────────────────────────────────────────
export const LateAPICard: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });

  // Accent line grows
  const accentWidth = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0,
    to: 180,
    config: { damping: 14, stiffness: 80 },
  });

  // Stats fade in
  const statsOpacity = spring({
    frame: Math.max(0, frame - 15),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `scale(${cardScale})` }}
    >
      {/* Indigo accent line */}
      <rect
        x={300 - accentWidth / 2}
        y="180"
        width={accentWidth}
        height="4"
        rx="2"
        fill={INDIGO}
      />

      {/* Late wordmark */}
      <text
        x="300"
        y="270"
        textAnchor="middle"
        fill={BLACK}
        fontSize="88"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-3"
      >
        Late
      </text>

      {/* Subtitle */}
      <text
        x="300"
        y="310"
        textAnchor="middle"
        fill={GRAY}
        fontSize="22"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
        letterSpacing="4"
      >
        UNIFIED SOCIAL MEDIA API
      </text>

      {/* Feature pills */}
      <g opacity={statsOpacity}>
        {["One API", "13 Platforms", "Free Tier"].map((label, i) => (
          <g key={label}>
            <rect
              x={110 + i * 140}
              y="360"
              width="120"
              height="36"
              rx="18"
              fill="#F5F5FF"
              stroke={INDIGO}
              strokeWidth="1.5"
              opacity="0.8"
            />
            <text
              x={170 + i * 140}
              y="383"
              textAnchor="middle"
              fill={INDIGO}
              fontSize="13"
              fontWeight="600"
              fontFamily="system-ui, sans-serif"
            >
              {label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

// ─────────────────────────────────────────
// 8. Three Skills — Stacked premium cards
// ─────────────────────────────────────────
export const ThreeSkillsCard: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const skills = [
    { name: "Social Media Posting", desc: "Multi-platform distribution" },
    { name: "Short-Form Creator", desc: "Shorts, Reels & TikTok" },
    { name: "YouTube Packages", desc: "Full video workflow" },
  ];

  // Title fades in first
  const titleOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });
  const titleY = spring({
    frame,
    fps,
    from: -20,
    to: 0,
    config: { damping: 14, stiffness: 100 },
  });

  // Cards appear one by one (staggered)
  const card1 = spring({ frame: Math.max(0, frame - 8), fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const card2 = spring({ frame: Math.max(0, frame - 16), fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const card3 = spring({ frame: Math.max(0, frame - 24), fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const cardScales = [card1, card2, card3];

  // Connecting lines draw progressively AFTER cards appear
  const line1 = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2 = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Card positions (flowing layout like "4 Mechanisms")
  const positions = [
    { x: 70, y: 180 },   // Left
    { x: 220, y: 300 },   // Center-right, lower
    { x: 370, y: 180 },   // Right
  ];

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: size * 0.06,
          left: 0,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 300,
            fontSize: size * 0.07,
            color: GRAY,
            fontStyle: "italic",
          }}
        >
          3
        </span>
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 800,
            fontSize: size * 0.07,
            color: BLACK,
            marginLeft: size * 0.02,
          }}
        >
          Skills
        </span>
      </div>

      {/* Connecting lines (SVG overlay) */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {/* Line from card 1 to card 2 */}
        <path
          d={`M ${positions[0].x + size * 0.22} ${positions[0].y + size * 0.08} C ${positions[0].x + size * 0.3} ${positions[0].y + size * 0.16}, ${positions[1].x} ${positions[1].y}, ${positions[1].x + size * 0.03} ${positions[1].y + size * 0.04}`}
          stroke={BLACK}
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={`${line1 * 300} 300`}
          opacity={0.3}
        />
        {/* Line from card 2 to card 3 */}
        <path
          d={`M ${positions[1].x + size * 0.22} ${positions[1].y + size * 0.04} C ${positions[1].x + size * 0.3} ${positions[1].y - size * 0.04}, ${positions[2].x} ${positions[2].y + size * 0.12}, ${positions[2].x + size * 0.03} ${positions[2].y + size * 0.06}`}
          stroke={BLACK}
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={`${line2 * 300} 300`}
          opacity={0.3}
        />
      </svg>

      {/* Skill cards */}
      {skills.map((skill, i) => (
        <div
          key={skill.name}
          style={{
            position: "absolute",
            left: positions[i].x,
            top: positions[i].y,
            width: size * 0.26,
            background: "#FFFFFF",
            borderRadius: size * 0.025,
            padding: `${size * 0.025}px ${size * 0.03}px`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            border: `1.5px solid ${LIGHT_GRAY}`,
            transform: `scale(${cardScales[i]})`,
            transformOrigin: "center center",
          }}
        >
          {/* Number badge */}
          <div
            style={{
              position: "absolute",
              top: -size * 0.025,
              left: -size * 0.015,
              width: size * 0.05,
              height: size * 0.05,
              borderRadius: size * 0.012,
              background: "#FFFFFF",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 800,
              fontSize: size * 0.028,
              color: BLACK,
            }}
          >
            {i + 1}.
          </div>
          {/* Skill name */}
          <div
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 700,
              fontSize: size * 0.028,
              color: BLACK,
              marginTop: size * 0.015,
            }}
          >
            {skill.name}
          </div>
          {/* Description */}
          <div
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 500,
              fontSize: size * 0.02,
              color: MUTED,
              marginTop: size * 0.008,
            }}
          >
            {skill.desc}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────
// 9. Zach Testimonial — Premium quote card
// ─────────────────────────────────────────
export const ZachTestimonialCard: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });

  const quoteOpacity = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `scale(${cardScale})` }}
    >
      {/* Card */}
      <rect
        x="80"
        y="140"
        width="440"
        height="320"
        rx="20"
        fill="#FAFAFA"
        stroke={LIGHT_GRAY}
        strokeWidth="2"
      />

      {/* Large quote mark */}
      <text
        x="130"
        y="220"
        fill={ORANGE}
        fontSize="72"
        fontWeight="900"
        fontFamily="Georgia, serif"
        opacity="0.3"
      >
        &ldquo;
      </text>

      {/* Avatar circle */}
      <circle cx="300" cy="225" r="45" fill="#F3F4F6" stroke={ORANGE} strokeWidth="2.5" />
      <text
        x="300"
        y="235"
        textAnchor="middle"
        fill={BLACK}
        fontSize="28"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        Z
      </text>

      {/* Name */}
      <text
        x="300"
        y="310"
        textAnchor="middle"
        fill={BLACK}
        fontSize="32"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        Zach
      </text>

      {/* Role */}
      <text
        x="300"
        y="340"
        textAnchor="middle"
        fill={GRAY}
        fontSize="16"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        Renovation Business Owner
      </text>

      {/* IX Partner badge */}
      <g opacity={quoteOpacity}>
        <rect
          x="225"
          y="365"
          width="150"
          height="36"
          rx="18"
          fill={ORANGE}
          opacity="0.1"
        />
        <text
          x="300"
          y="389"
          textAnchor="middle"
          fill={ORANGE}
          fontSize="14"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          IX System Partner
        </text>
      </g>
    </svg>
  );
};

// ─────────────────────────────────────────
// 10. $90K Metric — Premium count-up
// ─────────────────────────────────────────
export const MetricCard90KV2: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Count-up from 0 to 90
  const count = Math.min(
    90,
    Math.round(
      interpolate(frame, [0, 35], [0, 90], { extrapolateRight: "clamp" })
    )
  );

  const numberScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 10, stiffness: 60 },
  });

  // Green accent line
  const accentWidth = spring({
    frame,
    fps,
    from: 0,
    to: 300,
    config: { damping: 14, stiffness: 60 },
  });

  const subtitleOpacity = interpolate(frame, [25, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soft glow */}
      <circle cx="300" cy="260" r="160" fill={GREEN} opacity="0.06" />

      {/* Green accent line */}
      <rect
        x={300 - accentWidth / 2}
        y="160"
        width={accentWidth}
        height="4"
        rx="2"
        fill={GREEN}
      />

      {/* Dollar + Number */}
      <g
        transform={`translate(300, 280) scale(${numberScale}) translate(-300, -280)`}
      >
        <text
          x="140"
          y="300"
          fill={GREEN}
          fontSize="64"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          $
        </text>
        <text
          x="380"
          y="300"
          textAnchor="middle"
          fill={BLACK}
          fontSize="120"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-3"
        >
          {count}K
        </text>
      </g>

      {/* Timeframe */}
      <text
        x="300"
        y="370"
        textAnchor="middle"
        fill={GRAY}
        fontSize="28"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
        opacity={subtitleOpacity}
      >
        in 90 Days
      </text>

      {/* Context */}
      <text
        x="300"
        y="410"
        textAnchor="middle"
        fill={MUTED}
        fontSize="16"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
        letterSpacing="3"
        opacity={subtitleOpacity}
      >
        RESELLING THE IX SYSTEM
      </text>
    </svg>
  );
};

// ─────────────────────────────────────────
// 11. Zone of Genius — Target visualization
// ─────────────────────────────────────────
export const ZoneOfGeniusV2: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rings expand in
  const ring1 = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 60 },
  });
  const ring2 = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 60 },
  });
  const ring3 = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 60 },
  });

  // Subtle pulse on center
  const pulse = interpolate(frame % 40, [0, 20, 40], [1, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = spring({
    frame: Math.max(0, frame - 15),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle
        cx="300"
        cy="260"
        r={140 * ring1}
        fill="none"
        stroke={LIGHT_GRAY}
        strokeWidth="1.5"
        strokeDasharray="8 6"
      />
      <text
        x="300"
        y="110"
        textAnchor="middle"
        fill={MUTED}
        fontSize="12"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
        letterSpacing="2"
        opacity={ring1}
      >
        EVERYTHING ELSE
      </text>

      {/* Middle ring */}
      <circle
        cx="300"
        cy="260"
        r={95 * ring2}
        fill={ORANGE}
        opacity="0.06"
        stroke={ORANGE}
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      <text
        x="300"
        y="155"
        textAnchor="middle"
        fill={ORANGE}
        fontSize="12"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
        letterSpacing="2"
        opacity={ring2 * 0.7}
      >
        AI HANDLES THIS
      </text>

      {/* Center (the zone) */}
      <g transform={`translate(300, 260) scale(${ring3 * pulse}) translate(-300, -260)`}>
        <circle cx="300" cy="260" r="55" fill={ORANGE} opacity="0.15" />
        <circle cx="300" cy="260" r="40" fill={ORANGE} opacity="0.3" />
        <circle cx="300" cy="260" r="8" fill={ORANGE} />
      </g>

      {/* Text below */}
      <g opacity={textOpacity}>
        <text
          x="300"
          y="440"
          textAnchor="middle"
          fill={BLACK}
          fontSize="24"
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
          letterSpacing="2"
        >
          YOUR ZONE OF GENIUS
        </text>
        <text
          x="300"
          y="475"
          textAnchor="middle"
          fill={MUTED}
          fontSize="16"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          Focus on what only you can do
        </text>
      </g>
    </svg>
  );
};

// ─────────────────────────────────────────
// 12. CTA — Premium "Get Access" card
// ─────────────────────────────────────────
export const CTADescriptionV2: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 10, stiffness: 80 },
  });

  // Bouncing arrow
  const arrowY = interpolate(frame % 40, [0, 20, 40], [0, 10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "extend",
  });

  const arrowOpacity = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `scale(${cardScale})` }}
    >
      {/* Main text */}
      <text
        x="300"
        y="180"
        textAnchor="middle"
        fill={BLACK}
        fontSize="28"
        fontWeight="500"
        fontFamily="system-ui, sans-serif"
      >
        Link in the
      </text>

      <text
        x="300"
        y="250"
        textAnchor="middle"
        fill={ORANGE}
        fontSize="52"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="3"
      >
        DESCRIPTION
      </text>

      {/* Animated arrow */}
      <g
        opacity={arrowOpacity}
        transform={`translate(0, ${arrowY})`}
      >
        {/* Arrow shaft */}
        <rect
          x="289"
          y="300"
          width="22"
          height="80"
          rx="11"
          fill={ORANGE}
        />
        {/* Arrow head */}
        <path d="M300 410 L340 370 L260 370 Z" fill={ORANGE} />
      </g>

      {/* Get access button */}
      <g opacity={arrowOpacity}>
        <rect
          x="190"
          y="440"
          width="220"
          height="56"
          rx="28"
          fill={ORANGE}
        />
        <text
          x="300"
          y="475"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="20"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
          letterSpacing="3"
        >
          GET ACCESS
        </text>
      </g>
    </svg>
  );
};

// ─────────────────────────────────────────
// 13. AI Campaign — "15 Minutes" metric card
// ─────────────────────────────────────────
export const AICampaignMetric: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });

  // Number count-up from 0 to 15
  const countUp = Math.min(
    15,
    Math.round(interpolate(frame, [5, 25], [0, 15], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }))
  );

  const subtitleOpacity = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  // Lightning bolt pulse
  const boltScale = interpolate(frame % 30, [0, 15, 30], [1, 1.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: size * 0.02,
        transform: `scale(${cardScale})`,
      }}
    >
      {/* Lightning bolt */}
      <svg
        width={size * 0.12}
        height={size * 0.15}
        viewBox="0 0 24 30"
        style={{ transform: `scale(${boltScale})` }}
      >
        <path
          d="M13 2L4 14h6l-3 14 12-16h-7l5-10z"
          fill={ORANGE}
          stroke={ORANGE}
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Big number */}
      <div
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 900,
          fontSize: size * 0.18,
          color: BLACK,
          lineHeight: 1,
        }}
      >
        {countUp}
      </div>

      {/* "MINUTES" label */}
      <div
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 600,
          fontSize: size * 0.05,
          color: ORANGE,
          letterSpacing: 6,
          marginTop: -size * 0.02,
        }}
      >
        MINUTES
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 500,
          fontSize: size * 0.03,
          color: MUTED,
          opacity: subtitleOpacity,
          marginTop: size * 0.015,
        }}
      >
        AI-Powered Sales Campaign
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// 14. Done For You — Service offering card
// ─────────────────────────────────────────
export const DoneForYouCard: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });

  // Checkmark draws in
  const checkProgress = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = spring({
    frame: Math.max(0, frame - 12),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: size * 0.03,
        transform: `scale(${cardScale})`,
      }}
    >
      {/* Checkmark circle */}
      <svg width={size * 0.18} height={size * 0.18} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={GREEN}
          strokeWidth="4"
          strokeDasharray={`${checkProgress * 283} 283`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        {checkProgress > 0.5 && (
          <path
            d="M30 52 L45 67 L72 35"
            fill="none"
            stroke={GREEN}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${(checkProgress - 0.5) * 2 * 80} 80`}
          />
        )}
      </svg>

      {/* Title */}
      <div
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 800,
          fontSize: size * 0.065,
          color: BLACK,
          opacity: textOpacity,
        }}
      >
        Done For You
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 500,
          fontSize: size * 0.03,
          color: MUTED,
          opacity: textOpacity,
          textAlign: "center",
        }}
      >
        AI Sales Campaign System
      </div>

      {/* Free trial badge */}
      <div
        style={{
          background: ORANGE,
          borderRadius: 100,
          padding: `${size * 0.012}px ${size * 0.04}px`,
          opacity: textOpacity,
          marginTop: size * 0.01,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 700,
            fontSize: size * 0.028,
            color: "#FFFFFF",
            letterSpacing: 2,
          }}
        >
          FREE TRIAL
        </span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// 15. Engagement CTA — Like/Subscribe/Comment
// ─────────────────────────────────────────
export const EngagementCTA: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const actions = [
    { label: "LIKE", icon: "\u2764", delay: 0 },
    { label: "SUBSCRIBE", icon: "\uD83D\uDD14", delay: 6 },
    { label: "COMMENT", icon: "\uD83D\uDCAC", delay: 12 },
  ];

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: size * 0.04,
      }}
    >
      {actions.map((action) => {
        const actionScale = spring({
          frame: Math.max(0, frame - action.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 100 },
        });

        return (
          <div
            key={action.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: size * 0.025,
              background: "#FAFAFA",
              border: `2px solid ${LIGHT_GRAY}`,
              borderRadius: size * 0.02,
              padding: `${size * 0.02}px ${size * 0.05}px`,
              transform: `scale(${actionScale})`,
              minWidth: size * 0.45,
            }}
          >
            <span style={{ fontSize: size * 0.055 }}>{action.icon}</span>
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 700,
                fontSize: size * 0.04,
                color: BLACK,
                letterSpacing: 2,
              }}
            >
              {action.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
