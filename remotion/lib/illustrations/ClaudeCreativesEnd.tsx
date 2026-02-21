import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";
import { COLORS } from "../colors";

/**
 * ClaudeCreativesEnd — 10 UNIQUE illustration components
 * End/CTA section of a Claude Creatives YouTube tutorial video.
 * Each component is a completely different visual scene with multi-stage animation.
 * Design: Clean vectors on white bg, Apple aesthetic, animated with spring/interpolate.
 */

const ORANGE = COLORS.primary;
const BLACK = COLORS.darkGray;
const GRAY = COLORS.gray;
const LIGHT_GRAY = "#E5E7EB";
const GREEN = COLORS.success;
const BLUE = "#0A66C2";
const RED = "#FF0000";
const GOLD = "#F5A623";
const FONT = "system-ui, -apple-system, sans-serif";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. LateAPIPlatformConnect — API plug/socket with orbiting platform logos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const LateAPIPlatformConnect: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Plug connection spring
  const plugConnect = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });

  // Socket appears
  const socketScale = spring({
    frame: Math.max(0, frame - 4),
    fps,
    from: 0.3,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // Orbit radius and speed
  const orbitRadius = 170;
  const orbitSpeed = 0.04;

  // Platform logo data with orbit angles
  const platforms = [
    { logo: "logos/youtube.svg", baseAngle: 0 },
    { logo: "logos/instagram.svg", baseAngle: 60 },
    { logo: "logos/tiktok.svg", baseAngle: 120 },
    { logo: "logos/linkedin.svg", baseAngle: 180 },
    { logo: "logos/x.svg", baseAngle: 240 },
    { logo: "logos/facebook.svg", baseAngle: 300 },
  ];

  // Electric spark animation (after plug connects)
  const sparkOpacity = frame > 16
    ? interpolate((frame - 16) % 20, [0, 5, 10], [0, 0.8, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Glow ring pulse
  const glowPulse = frame > 12
    ? 0.15 + Math.sin((frame - 12) * 0.15) * 0.1
    : 0;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* SVG base layer for plug/socket */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 600 600"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <filter id="late-shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Glow ring behind center */}
        <circle cx="300" cy="300" r="80" fill={ORANGE} opacity={glowPulse} />

        {/* Socket body */}
        <g
          transform={`translate(300, 300) scale(${socketScale})`}
          style={{ transformOrigin: "0 0" }}
        >
          <rect
            x="-55"
            y="-55"
            width="110"
            height="110"
            rx="20"
            fill="white"
            stroke={BLACK}
            strokeWidth="3"
            filter="url(#late-shadow)"
          />
          {/* Socket holes */}
          <circle cx="-18" cy="-10" r="8" fill="none" stroke={GRAY} strokeWidth="3" />
          <circle cx="18" cy="-10" r="8" fill="none" stroke={GRAY} strokeWidth="3" />
          {/* Ground slot */}
          <rect x="-5" y="12" width="10" height="18" rx="3" fill="none" stroke={GRAY} strokeWidth="3" />
          {/* "API" label */}
          <text
            x="0"
            y="-30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill={ORANGE}
            fontFamily={FONT}
            letterSpacing="2"
          >
            API
          </text>
        </g>

        {/* Plug prongs (animate from left to connect) */}
        <g opacity={plugConnect}>
          {/* Left prong */}
          <rect
            x={interpolate(plugConnect, [0, 1], [200, 272])}
            y="282"
            width="8"
            height="24"
            rx="2"
            fill={BLACK}
          />
          {/* Right prong */}
          <rect
            x={interpolate(plugConnect, [0, 1], [200, 308])}
            y="282"
            width="8"
            height="24"
            rx="2"
            fill={BLACK}
          />
          {/* Cable coming from plug */}
          <line
            x1={interpolate(plugConnect, [0, 1], [160, 240])}
            y1="300"
            x2={interpolate(plugConnect, [0, 1], [200, 272])}
            y2="300"
            stroke={BLACK}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        {/* Electric sparks at connection point */}
        {sparkOpacity > 0 && (
          <g opacity={sparkOpacity}>
            <line x1="270" y1="280" x2="258" y2="268" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="330" y1="280" x2="342" y2="268" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="300" y1="260" x2="300" y2="245" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* Orbit track ring */}
        <circle
          cx="300"
          cy="300"
          r={orbitRadius}
          fill="none"
          stroke={LIGHT_GRAY}
          strokeWidth="1.5"
          strokeDasharray="8 6"
          opacity={interpolate(frame, [6, 14], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </svg>

      {/* Orbiting platform logos (HTML layer) */}
      {platforms.map((p, i) => {
        const delay = 8 + i * 3;
        const logoOpacity = spring({
          frame: Math.max(0, frame - delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 100 },
        });

        const angle =
          ((p.baseAngle + frame * orbitSpeed * (180 / Math.PI)) * Math.PI) /
          180;
        const x = 300 + orbitRadius * Math.cos(angle) - 24;
        const y = 300 + orbitRadius * Math.sin(angle) - 24;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x * (size / 600),
              top: y * (size / 600),
              width: 48 * (size / 600),
              height: 48 * (size / 600),
              borderRadius: 12 * (size / 600),
              backgroundColor: "white",
              border: "2px solid #E5E5E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
              opacity: logoOpacity,
            }}
          >
            <Img
              src={staticFile(p.logo)}
              style={{
                width: 30 * (size / 600),
                height: 30 * (size / 600),
                objectFit: "contain",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. MCPProtocolDiagram — Hub with extension cables to nodes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const MCPProtocolDiagram: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central hub spring
  const hubScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 90 },
  });

  // Node positions (hexagonal arrangement)
  const nodes = [
    { x: 300, y: 110, label: "AI", color: ORANGE },
    { x: 460, y: 200, label: "API", color: BLUE },
    { x: 460, y: 400, label: "DB", color: GREEN },
    { x: 300, y: 490, label: "FS", color: "#8B5CF6" },
    { x: 140, y: 400, label: "WEB", color: "#EC4899" },
    { x: 140, y: 200, label: "SH", color: "#F59E0B" },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <defs>
        <filter id="mcp-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Connection cables from hub to each node */}
      {nodes.map((node, i) => {
        const cableDelay = 6 + i * 3;
        const cableLength = Math.sqrt(
          (node.x - 300) ** 2 + (node.y - 300) ** 2
        );
        const cableProgress = interpolate(
          frame,
          [cableDelay, cableDelay + 12],
          [cableLength, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <line
            key={`cable-${i}`}
            x1="300"
            y1="300"
            x2={node.x}
            y2={node.y}
            stroke={node.color}
            strokeWidth="3"
            strokeDasharray={cableLength}
            strokeDashoffset={cableProgress}
            strokeLinecap="round"
            opacity={0.6}
          />
        );
      })}

      {/* Central hub */}
      <g
        opacity={hubScale}
        transform={`translate(300, 300) scale(${hubScale})`}
        style={{ transformOrigin: "0 0" }}
      >
        <circle
          cx="0"
          cy="0"
          r="48"
          fill="white"
          stroke={ORANGE}
          strokeWidth="3.5"
          filter="url(#mcp-shadow)"
        />
        {/* Hub icon -- nested squares for "protocol" */}
        <rect x="-18" y="-18" width="36" height="36" rx="4" fill="none" stroke={BLACK} strokeWidth="2.5" />
        <rect x="-10" y="-10" width="20" height="20" rx="2" fill={ORANGE} opacity={0.3} />
        <circle cx="0" cy="0" r="5" fill={ORANGE} />
        {/* MCP label */}
        <text
          x="0"
          y="34"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill={ORANGE}
          fontFamily={FONT}
          letterSpacing="1.5"
        >
          MCP
        </text>
      </g>

      {/* Outer nodes */}
      {nodes.map((node, i) => {
        const nodeDelay = 12 + i * 3;
        const nodeScale = spring({
          frame: Math.max(0, frame - nodeDelay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 120 },
        });

        // Light-up glow
        const glowOpacity = frame > nodeDelay + 8
          ? interpolate(frame, [nodeDelay + 8, nodeDelay + 14], [0, 0.25], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          : 0;

        return (
          <g
            key={`node-${i}`}
            opacity={nodeScale}
            transform={`translate(${node.x}, ${node.y}) scale(${nodeScale})`}
            style={{ transformOrigin: "0 0" }}
          >
            {/* Glow */}
            <circle cx="0" cy="0" r="36" fill={node.color} opacity={glowOpacity} />
            {/* Node circle */}
            <circle
              cx="0"
              cy="0"
              r="28"
              fill="white"
              stroke={node.color}
              strokeWidth="2.5"
              filter="url(#mcp-shadow)"
            />
            {/* Label */}
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fill={node.color}
              fontFamily={FONT}
              letterSpacing="1"
            >
              {node.label}
            </text>
          </g>
        );
      })}

      {/* Data pulse traveling along cables */}
      {nodes.map((node, i) => {
        const pulseStart = 24 + i * 3;
        if (frame < pulseStart) return null;
        const t = ((frame - pulseStart) % 40) / 40;
        const px = 300 + (node.x - 300) * t;
        const py = 300 + (node.y - 300) * t;

        return (
          <circle
            key={`pulse-${i}`}
            cx={px}
            cy={py}
            r="5"
            fill={node.color}
            opacity={1 - t}
          />
        );
      })}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. GitHubRepoClone — GitHub logo with terminal typing animation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const GitHubRepoClone: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo appears with spring
  const logoScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 90 },
  });

  // Terminal window slides up
  const terminalY = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 60,
    to: 0,
    config: { damping: 14, stiffness: 80 },
  });

  const terminalOpacity = interpolate(frame, [8, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typing animation for command text
  const commandText = "git clone repo.git";
  const typedLength = Math.min(
    commandText.length,
    Math.max(0, Math.floor((frame - 14) * 0.8))
  );
  const displayedText = commandText.slice(0, typedLength);

  // Cursor blink
  const cursorVisible = Math.floor(frame * 0.15) % 2 === 0;

  // Success message
  const successDelay = 14 + commandText.length / 0.8 + 8;
  const successOpacity = interpolate(
    frame,
    [successDelay, successDelay + 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {/* GitHub logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoScale,
          marginBottom: 10,
        }}
      >
        <Img
          src={staticFile("logos/github-mark.svg")}
          style={{ width: 100, height: 100, objectFit: "contain" }}
        />
      </div>

      {/* Terminal window */}
      <div
        style={{
          width: 420,
          opacity: terminalOpacity,
          transform: `translateY(${terminalY}px)`,
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: 36,
            backgroundColor: "#2D2D2D",
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingLeft: 14,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#FF5F56" }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#27C93F" }} />
        </div>
        {/* Terminal body */}
        <div
          style={{
            backgroundColor: "#1E1E1E",
            padding: "16px 18px",
            fontFamily: "monospace",
            fontSize: 17,
            lineHeight: "28px",
          }}
        >
          <span style={{ color: "#10B981" }}>$</span>{" "}
          <span style={{ color: "#E5E5E5" }}>{displayedText}</span>
          {cursorVisible && typedLength < commandText.length && (
            <span style={{ color: ORANGE }}>|</span>
          )}
          {successOpacity > 0 && (
            <div style={{ opacity: successOpacity, marginTop: 6 }}>
              <span style={{ color: "#10B981" }}>Cloning into &apos;repo&apos;...</span>
              <br />
              <span style={{ color: "#10B981" }}>done.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. AcquisitionSchoolCommunity — Connected people network with grad cap
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const AcquisitionSchoolCommunity: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 300;
  const cy = 300;
  const ringRadius = 160;
  const personCount = 10;

  // People positions in a circle
  const people = Array.from({ length: personCount }, (_, i) => {
    const angle = (i / personCount) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + ringRadius * Math.cos(angle),
      y: cy + ringRadius * Math.sin(angle),
      delay: i * 2,
    };
  });

  // Grad cap
  const capScale = spring({
    frame: Math.max(0, frame - 22),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <defs>
        <filter id="asc-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Connection lines between adjacent people */}
      {people.map((person, i) => {
        const next = people[(i + 1) % personCount];
        const lineDelay = 10 + i * 1.5;
        const lineOpacity = interpolate(
          frame,
          [lineDelay, lineDelay + 6],
          [0, 0.35],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <line
            key={`conn-${i}`}
            x1={person.x}
            y1={person.y}
            x2={next.x}
            y2={next.y}
            stroke={ORANGE}
            strokeWidth="2"
            opacity={lineOpacity}
            strokeDasharray="6 4"
          />
        );
      })}

      {/* Cross connections (every other) for network feel */}
      {people.map((person, i) => {
        if (i % 3 !== 0) return null;
        const across = people[(i + 5) % personCount];
        const crossDelay = 16 + i;
        const crossOpacity = interpolate(
          frame,
          [crossDelay, crossDelay + 8],
          [0, 0.15],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <line
            key={`cross-${i}`}
            x1={person.x}
            y1={person.y}
            x2={across.x}
            y2={across.y}
            stroke={GRAY}
            strokeWidth="1"
            opacity={crossOpacity}
          />
        );
      })}

      {/* Person icons */}
      {people.map((person, i) => {
        const pScale = spring({
          frame: Math.max(0, frame - person.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 120 },
        });

        const isHighlighted = i % 3 === 0;

        return (
          <g
            key={`person-${i}`}
            opacity={pScale}
            transform={`translate(${person.x}, ${person.y}) scale(${pScale})`}
            style={{ transformOrigin: "0 0" }}
          >
            {/* Body circle */}
            <circle
              cx="0"
              cy="0"
              r="22"
              fill={isHighlighted ? ORANGE : "#F3F4F6"}
              stroke={isHighlighted ? ORANGE : GRAY}
              strokeWidth="2"
              filter="url(#asc-shadow)"
              opacity={isHighlighted ? 0.2 : 1}
            />
            {/* Head */}
            <circle
              cx="0"
              cy="-6"
              r="7"
              fill={isHighlighted ? ORANGE : BLACK}
            />
            {/* Shoulders */}
            <path
              d="M -10 8 Q 0 2 10 8"
              fill="none"
              stroke={isHighlighted ? ORANGE : BLACK}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {/* Graduation cap at center */}
      <g
        opacity={capScale}
        transform={`translate(${cx}, ${cy}) scale(${capScale})`}
        style={{ transformOrigin: "0 0" }}
      >
        {/* Cap base */}
        <polygon
          points="-36,4 0,-14 36,4 0,22"
          fill={BLACK}
        />
        {/* Cap top */}
        <rect x="-6" y="-20" width="12" height="10" rx="2" fill={BLACK} />
        {/* Tassel */}
        <line x1="0" y1="-20" x2="24" y2="-10" stroke={ORANGE} strokeWidth="2.5" />
        <circle cx="24" cy="-10" r="4" fill={ORANGE} />
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. FreeCampaignCTABadge — "FREE" golden badge with confetti
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const FreeCampaignCTABadge: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge scale up
  const badgeScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });

  // Ribbon flaps
  const ribbonScale = spring({
    frame: Math.max(0, frame - 6),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  // Confetti particles
  const confettiColors = [ORANGE, GOLD, GREEN, "#E040FB", BLUE, RED];
  const confetti = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * 2 * Math.PI;
    const speed = 2.5 + (i % 5) * 0.8;
    const rotSpeed = (i % 2 === 0 ? 1 : -1) * (3 + (i % 4));
    return {
      angle,
      speed,
      rotSpeed,
      color: confettiColors[i % confettiColors.length],
      w: 6 + (i % 3) * 3,
      h: 4 + (i % 2) * 4,
    };
  });

  const confettiBurst = Math.max(0, frame - 10);

  // Star shimmer
  const shimmer = 0.5 + Math.sin(frame * 0.2) * 0.5;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <defs>
        <filter id="badge-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="12" floodOpacity="0.15" />
        </filter>
        <linearGradient id="gold-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#F5A623" />
        </linearGradient>
      </defs>

      {/* Confetti particles */}
      {confettiBurst > 0 &&
        confetti.map((c, i) => {
          const dist = confettiBurst * c.speed;
          const gravity = confettiBurst * confettiBurst * 0.02;
          const x = 300 + Math.cos(c.angle) * dist;
          const y = 300 + Math.sin(c.angle) * dist + gravity;
          const rot = confettiBurst * c.rotSpeed;
          const opacity = interpolate(confettiBurst, [0, 30, 50], [1, 0.8, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          if (opacity <= 0) return null;

          return (
            <rect
              key={`conf-${i}`}
              x={x - c.w / 2}
              y={y - c.h / 2}
              width={c.w}
              height={c.h}
              rx="1.5"
              fill={c.color}
              opacity={opacity}
              transform={`rotate(${rot}, ${x}, ${y})`}
            />
          );
        })}

      {/* Badge body */}
      <g
        opacity={badgeScale}
        transform={`translate(300, 280) scale(${badgeScale})`}
        style={{ transformOrigin: "0 0" }}
      >
        {/* Outer starburst ring */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * 2 * Math.PI;
          const innerR = 85;
          const outerR = 105;
          return (
            <line
              key={`burst-${i}`}
              x1={Math.cos(a) * innerR}
              y1={Math.sin(a) * innerR}
              x2={Math.cos(a) * outerR}
              y2={Math.sin(a) * outerR}
              stroke={GOLD}
              strokeWidth="3"
              strokeLinecap="round"
              opacity={0.4 + shimmer * 0.4}
            />
          );
        })}

        {/* Badge circle */}
        <circle
          cx="0"
          cy="0"
          r="80"
          fill="url(#gold-grad)"
          stroke="#D4941C"
          strokeWidth="4"
          filter="url(#badge-shadow)"
        />

        {/* Inner ring */}
        <circle
          cx="0"
          cy="0"
          r="64"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity={0.5}
        />

        {/* "FREE" text */}
        <text
          x="0"
          y="12"
          textAnchor="middle"
          fontSize="48"
          fontWeight="900"
          fill="white"
          fontFamily={FONT}
          letterSpacing="6"
        >
          FREE
        </text>
      </g>

      {/* Ribbon tails */}
      <g opacity={ribbonScale}>
        {/* Left ribbon */}
        <path
          d="M 230 360 L 250 380 L 230 430 L 260 400 L 270 380"
          fill={GOLD}
          opacity={0.9}
        />
        {/* Right ribbon */}
        <path
          d="M 370 360 L 350 380 L 370 430 L 340 400 L 330 380"
          fill={GOLD}
          opacity={0.9}
        />
      </g>

      {/* Star accents — four-pointed star shapes */}
      {[
        { x: 170, y: 180 },
        { x: 440, y: 200 },
        { x: 180, y: 420 },
        { x: 430, y: 400 },
      ].map((s, i) => {
        const starOpacity = interpolate(
          (frame + i * 8) % 30,
          [0, 15, 30],
          [0.2, 0.8, 0.2]
        );
        return (
          <g key={`star-${i}`} opacity={starOpacity}>
            <path
              d={`M ${s.x} ${s.y - 8} L ${s.x + 3} ${s.y - 3} L ${s.x + 8} ${s.y} L ${s.x + 3} ${s.y + 3} L ${s.x} ${s.y + 8} L ${s.x - 3} ${s.y + 3} L ${s.x - 8} ${s.y} L ${s.x - 3} ${s.y - 3} Z`}
              fill={GOLD}
            />
          </g>
        );
      })}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. RenovationBusinessDouble — House icon with doubling arrow
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const RenovationBusinessDouble: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // House appears
  const houseScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 90 },
  });

  // Arrow draws upward
  const arrowHeight = interpolate(frame, [10, 22], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Counter from 1.0 to 2.0
  const counterValue = interpolate(frame, [14, 34], [1, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge pop
  const badgeScale = spring({
    frame: Math.max(0, frame - 30),
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 140 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <defs>
        <filter id="rbd-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* House */}
      <g
        opacity={houseScale}
        transform={`translate(220, 320) scale(${houseScale})`}
        style={{ transformOrigin: "0 0" }}
      >
        {/* House body */}
        <rect
          x="-70"
          y="-20"
          width="140"
          height="120"
          rx="6"
          fill="#F3F4F6"
          stroke={BLACK}
          strokeWidth="3"
          filter="url(#rbd-shadow)"
        />
        {/* Roof */}
        <path
          d="M -80 -20 L 0 -80 L 80 -20"
          fill={ORANGE}
          stroke={BLACK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Door */}
        <rect x="-18" y="30" width="36" height="70" rx="4" fill={BLACK} opacity={0.7} />
        {/* Window left */}
        <rect x="-55" y="10" width="28" height="28" rx="3" fill="white" stroke={GRAY} strokeWidth="2" />
        <line x1="-55" y1="24" x2="-27" y2="24" stroke={GRAY} strokeWidth="1" />
        <line x1="-41" y1="10" x2="-41" y2="38" stroke={GRAY} strokeWidth="1" />
        {/* Window right */}
        <rect x="27" y="10" width="28" height="28" rx="3" fill="white" stroke={GRAY} strokeWidth="2" />
        <line x1="27" y1="24" x2="55" y2="24" stroke={GRAY} strokeWidth="1" />
        <line x1="41" y1="10" x2="41" y2="38" stroke={GRAY} strokeWidth="1" />
        {/* Chimney */}
        <rect x="34" y="-65" width="20" height="35" rx="2" fill={BLACK} opacity={0.5} />
      </g>

      {/* Upward arrow */}
      {arrowHeight > 0 && (
        <g>
          {/* Arrow shaft */}
          <line
            x1="400"
            y1="420"
            x2="400"
            y2={420 - arrowHeight}
            stroke={GREEN}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Arrow head */}
          {arrowHeight > 20 && (
            <polygon
              points={`400,${420 - arrowHeight - 12} 388,${420 - arrowHeight + 4} 412,${420 - arrowHeight + 4}`}
              fill={GREEN}
            />
          )}
        </g>
      )}

      {/* "2x" counter badge */}
      <g
        opacity={badgeScale}
        transform={`translate(400, 180) scale(${badgeScale})`}
        style={{ transformOrigin: "0 0" }}
      >
        <rect
          x="-50"
          y="-30"
          width="100"
          height="60"
          rx="14"
          fill={GREEN}
          filter="url(#rbd-shadow)"
        />
        <text
          x="0"
          y="10"
          textAnchor="middle"
          fontSize="36"
          fontWeight="900"
          fill="white"
          fontFamily={FONT}
        >
          {counterValue.toFixed(1)}x
        </text>
      </g>

      {/* Small trend dots along arrow */}
      {[0, 1, 2, 3].map((i) => {
        const dotProgress = interpolate(frame, [14 + i * 4, 18 + i * 4], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <circle
            key={`dot-${i}`}
            cx={396 - i * 2}
            cy={380 - i * 40}
            r="4"
            fill={GREEN}
            opacity={dotProgress * 0.5}
          />
        );
      })}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. ZeroToNinetyKCounter — Animated $0 to $90,000 counter
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ZeroToNinetyKCounter: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Count from 0 to 90000 over 60 frames
  const count = Math.round(
    interpolate(frame, [0, 60], [0, 90000], {
      extrapolateRight: "clamp",
    })
  );

  // Format with commas
  const formatted = `$${count.toLocaleString()}`;

  // Green trend line behind
  const trendProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Build trend line points
  const trendPoints: string[] = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    if (t > trendProgress) break;
    const px = 100 + t * 400;
    // Exponential growth curve
    const py = 420 - t * t * 200 + Math.sin(t * 6) * 10;
    trendPoints.push(`${px},${py}`);
  }

  // Dollar signs float up
  const dollarSigns = [
    { x: 140, delay: 10 },
    { x: 250, delay: 24 },
    { x: 380, delay: 38 },
    { x: 460, delay: 50 },
  ];

  // Card container
  const cardScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <defs>
        <filter id="z90-shadow" x="-5%" y="-5%" width="115%" height="115%">
          <feDropShadow dx="0" dy="4" stdDeviation="10" floodOpacity="0.1" />
        </filter>
        <linearGradient id="trend-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={GREEN} stopOpacity="0.1" />
          <stop offset="100%" stopColor={GREEN} stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Card background */}
      <g transform={`translate(300, 300) scale(${cardScale})`} style={{ transformOrigin: "0 0" }}>
        <rect
          x="-230"
          y="-180"
          width="460"
          height="360"
          rx="24"
          fill="white"
          stroke={LIGHT_GRAY}
          strokeWidth="2"
          filter="url(#z90-shadow)"
        />
      </g>

      {/* Green trend area fill */}
      {trendPoints.length > 1 && (
        <polygon
          points={`100,420 ${trendPoints.join(" ")} ${trendPoints.length > 0 ? trendPoints[trendPoints.length - 1].split(",")[0] : "100"},420`}
          fill="url(#trend-grad)"
        />
      )}

      {/* Green trend line */}
      {trendPoints.length > 1 && (
        <polyline
          points={trendPoints.join(" ")}
          fill="none"
          stroke={GREEN}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Animated counter */}
      <text
        x="300"
        y="280"
        textAnchor="middle"
        fontSize="72"
        fontWeight="900"
        fill={BLACK}
        fontFamily={FONT}
        letterSpacing="-1"
      >
        {formatted}
      </text>

      {/* Floating dollar signs */}
      {dollarSigns.map((ds, i) => {
        if (frame < ds.delay) return null;
        const floatY = interpolate(frame - ds.delay, [0, 30], [0, -60], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const floatOpacity = interpolate(frame - ds.delay, [0, 10, 25, 30], [0, 0.5, 0.3, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <text
            key={`ds-${i}`}
            x={ds.x}
            y={380 + floatY}
            fontSize="28"
            fontWeight="700"
            fill={GREEN}
            opacity={floatOpacity}
            fontFamily={FONT}
          >
            $
          </text>
        );
      })}
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. TwentyPlusPartners — Grid of user avatars filling in
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const TwentyPlusPartners: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cols = 5;
  const rows = 5;
  const avatarSize = 54;
  const gap = 14;
  const totalAvatars = cols * rows; // 5x5 grid, first 20 are "real", last 5 faded

  // Generate avatar color palette
  const avatarColors = [
    "#6366F1", "#EC4899", ORANGE, GREEN, BLUE,
    "#8B5CF6", "#F43F5E", "#F59E0B", "#14B8A6", "#3B82F6",
    "#A855F7", "#EF4444", GOLD, "#22C55E", "#0EA5E9",
    "#D946EF", "#FB923C", "#84CC16", "#06B6D4", "#6366F1",
    "#E5E7EB", "#E5E7EB", "#E5E7EB", "#E5E7EB", "#E5E7EB",
  ];

  // Count badge
  const badgeScale = spring({
    frame: Math.max(0, frame - 36),
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 120 },
  });

  const gridStartX = 300 - ((cols * avatarSize + (cols - 1) * gap) / 2);
  const gridStartY = 160;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <defs>
        <filter id="tpp-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Avatar grid */}
      {Array.from({ length: totalAvatars }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = gridStartX + col * (avatarSize + gap) + avatarSize / 2;
        const y = gridStartY + row * (avatarSize + gap) + avatarSize / 2;

        // Wave pattern delay: top-left to bottom-right
        const waveDelay = (row + col) * 1.5;
        const avatarScale = spring({
          frame: Math.max(0, frame - waveDelay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 140 },
        });

        const isPlaceholder = i >= 20;
        const color = avatarColors[i];

        return (
          <g
            key={`avatar-${i}`}
            opacity={avatarScale * (isPlaceholder ? 0.35 : 1)}
            transform={`translate(${x}, ${y}) scale(${avatarScale})`}
            style={{ transformOrigin: "0 0" }}
          >
            {/* Avatar circle */}
            <circle
              cx="0"
              cy="0"
              r={avatarSize / 2}
              fill={color}
              opacity={isPlaceholder ? 0.3 : 0.2}
              filter="url(#tpp-shadow)"
            />
            <circle
              cx="0"
              cy="0"
              r={avatarSize / 2}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              opacity={isPlaceholder ? 0.3 : 0.8}
            />
            {/* Head */}
            <circle cx="0" cy="-6" r="8" fill={color} opacity={isPlaceholder ? 0.3 : 0.7} />
            {/* Shoulders */}
            <path
              d="M -12 10 Q 0 4 12 10"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={isPlaceholder ? 0.3 : 0.7}
            />
          </g>
        );
      })}

      {/* "20+" count badge */}
      <g
        opacity={badgeScale}
        transform={`translate(300, 510) scale(${badgeScale})`}
        style={{ transformOrigin: "0 0" }}
      >
        <rect
          x="-50"
          y="-22"
          width="100"
          height="44"
          rx="22"
          fill={ORANGE}
          filter="url(#tpp-shadow)"
        />
        <text
          x="0"
          y="8"
          textAnchor="middle"
          fontSize="26"
          fontWeight="900"
          fill="white"
          fontFamily={FONT}
          letterSpacing="1"
        >
          20+
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. PrivateEquityFirms — Briefcase with buildings and $4B badge
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const PrivateEquityFirms: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Buildings rise
  const buildings = [
    { x: 120, w: 60, h: 160, delay: 0 },
    { x: 200, w: 50, h: 200, delay: 3 },
    { x: 270, w: 70, h: 240, delay: 5 },
    { x: 360, w: 55, h: 190, delay: 7 },
    { x: 430, w: 65, h: 170, delay: 9 },
  ];

  // Briefcase spring
  const briefcaseScale = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });

  // $4B badge pulse
  const badgePulse = frame > 24
    ? 1 + Math.sin((frame - 24) * 0.2) * 0.06
    : 0;

  const badgeOpacity = spring({
    frame: Math.max(0, frame - 24),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  const groundY = 420;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600">
      <defs>
        <filter id="pef-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Ground line */}
      <line x1="80" y1={groundY} x2="520" y2={groundY} stroke={LIGHT_GRAY} strokeWidth="2" />

      {/* Buildings */}
      {buildings.map((b, i) => {
        const riseProgress = interpolate(frame, [b.delay, b.delay + 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const currentH = b.h * riseProgress;

        return (
          <g key={`bldg-${i}`}>
            {/* Building body */}
            <rect
              x={b.x}
              y={groundY - currentH}
              width={b.w}
              height={currentH}
              rx="4"
              fill="#F3F4F6"
              stroke={BLACK}
              strokeWidth="2"
            />
            {/* Windows */}
            {riseProgress > 0.5 &&
              Array.from({ length: Math.floor(currentH / 30) }).map((_, wi) => {
                const wx = b.x + 8;
                const wy = groundY - currentH + 12 + wi * 28;
                if (wy > groundY - 10) return null;
                return (
                  <g key={`win-${i}-${wi}`}>
                    <rect x={wx} y={wy} width="10" height="14" rx="1" fill={BLUE} opacity={0.3} />
                    <rect x={wx + 16} y={wy} width="10" height="14" rx="1" fill={BLUE} opacity={0.2} />
                    {b.w > 55 && (
                      <rect x={wx + 32} y={wy} width="10" height="14" rx="1" fill={BLUE} opacity={0.25} />
                    )}
                  </g>
                );
              })}
          </g>
        );
      })}

      {/* Briefcase */}
      <g
        opacity={briefcaseScale}
        transform={`translate(300, 490) scale(${briefcaseScale})`}
        style={{ transformOrigin: "0 0" }}
      >
        {/* Briefcase body */}
        <rect
          x="-55"
          y="-30"
          width="110"
          height="65"
          rx="8"
          fill={BLACK}
          filter="url(#pef-shadow)"
        />
        {/* Handle */}
        <path
          d="M -20 -30 L -20 -42 Q -20 -50 -12 -50 L 12 -50 Q 20 -50 20 -42 L 20 -30"
          fill="none"
          stroke={BLACK}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Clasp */}
        <rect x="-8" y="-6" width="16" height="8" rx="2" fill={GOLD} />
        {/* Belt line */}
        <line x1="-55" y1="0" x2="55" y2="0" stroke={GRAY} strokeWidth="2" />
      </g>

      {/* $4B badge */}
      <g
        opacity={badgeOpacity}
        transform={`translate(440, 140) scale(${badgePulse || badgeOpacity})`}
        style={{ transformOrigin: "0 0" }}
      >
        <circle cx="0" cy="0" r="40" fill={GREEN} filter="url(#pef-shadow)" />
        <text
          x="0"
          y="10"
          textAnchor="middle"
          fontSize="24"
          fontWeight="900"
          fill="white"
          fontFamily={FONT}
        >
          $4B
        </text>
      </g>
    </svg>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. YouTubeSubscribeButtonCTA — YouTube play button with subscribe bell
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const YouTubeSubscribeButtonCTA: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Play button scales up
  const buttonScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 90 },
  });

  // Subscribe bar width
  const barWidth = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 70 },
  });

  // Bell ring oscillation
  const bellRing = frame > 18
    ? Math.sin((frame - 18) * 0.8) * interpolate(frame, [18, 40], [14, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Bell scale
  const bellScale = spring({
    frame: Math.max(0, frame - 16),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  // Glow pulse behind play button
  const glowPulse = 0.1 + Math.sin(frame * 0.1) * 0.05;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
      }}
    >
      {/* YouTube logo -- real Img */}
      <div
        style={{
          transform: `scale(${buttonScale})`,
          opacity: buttonScale,
          filter: `drop-shadow(0 6px 20px rgba(255, 0, 0, ${glowPulse + 0.1}))`,
        }}
      >
        <Img
          src={staticFile("logos/youtube.svg")}
          style={{ width: 140, height: 140, objectFit: "contain" }}
        />
      </div>

      {/* Subscribe button bar */}
      <div
        style={{
          width: interpolate(barWidth, [0, 1], [0, 260]),
          height: 56,
          backgroundColor: RED,
          borderRadius: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: `0 4px 20px rgba(255, 0, 0, 0.25)`,
          opacity: barWidth > 0.1 ? 1 : 0,
        }}
      >
        {barWidth > 0.5 && (
          <span
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 3,
              fontFamily: FONT,
              opacity: interpolate(barWidth, [0.5, 0.8], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            SUBSCRIBE
          </span>
        )}
      </div>

      {/* Bell icon (SVG overlay) */}
      <svg
        width={80}
        height={80}
        viewBox="0 0 80 80"
        style={{
          position: "absolute",
          right: size * 0.18,
          top: size * 0.18,
          opacity: bellScale,
          transform: `scale(${bellScale}) rotate(${bellRing}deg)`,
          transformOrigin: "50% 10%",
        }}
      >
        {/* Bell body */}
        <path
          d="M 40 12 C 28 12 18 24 18 36 L 18 48 L 12 56 L 68 56 L 62 48 L 62 36 C 62 24 52 12 40 12 Z"
          fill={GOLD}
          stroke={BLACK}
          strokeWidth="2.5"
        />
        {/* Bell clapper */}
        <circle cx="40" cy="62" r="7" fill={GOLD} stroke={BLACK} strokeWidth="2" />
        {/* Bell top knob */}
        <circle cx="40" cy="10" r="4" fill={GOLD} stroke={BLACK} strokeWidth="2" />

        {/* Sound waves */}
        {frame > 18 && (
          <g opacity={interpolate(frame, [18, 30], [0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
            <path d="M 68 30 Q 76 40 68 50" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 12 30 Q 4 40 12 50" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}
      </svg>

      {/* Notification dot on bell */}
      {bellScale > 0.9 && (
        <div
          style={{
            position: "absolute",
            right: size * 0.18 - 4,
            top: size * 0.18 - 4,
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: RED,
            border: "2px solid white",
            opacity: interpolate(frame, [22, 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      )}
    </div>
  );
};
