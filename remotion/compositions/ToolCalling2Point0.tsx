/**
 * STANDALONE MOTION GRAPHICS — "Tool Calling 2.0"
 *
 * First standalone composition (no source video). Pure kinetic typography
 * + code animation + geometry on dark background with noise grain.
 *
 * Duration: 30s (900 frames @ 30fps)
 * Format: 1080x1920 portrait
 *
 * Scene 1: HOOK (f0–90)      — "ANTHROPIC JUST CHANGED AGENTS FOREVER"
 * Scene 2: OLD WAY (f90–300) — Flow diagram + token waste counter
 * Scene 3: NEW WAY (f300–600)— Code block reveal + "ALL IN ONE SHOT"
 * Scene 4: RESULT (f600–810) — "30-50% FEWER TOKENS"
 * Scene 5: CLOSER (f810–900) — "TOOL CALLING 2.0"
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { noise2D } from "@remotion/noise";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: interFont } = loadInter();
const { fontFamily: monoFont } = loadJetBrains();

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════
const T = {
  bg: "#0A0A0A",
  bgSubtle: "#111111",
  orange: "#FF6B00",
  orangeGlow: "rgba(255, 107, 0, 0.15)",
  white: "#FFFFFF",
  offWhite: "#E0E0E0",
  dimGray: "#666666",
  codeGreen: "#4ADE80",
  codeBlue: "#60A5FA",
  codePurple: "#C084FC",
  codeYellow: "#FBBF24",
  red: "#EF4444",
};

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  { frame: 88, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  { frame: 170, src: "audio/pop-402324.mp3", volume: 0.16 },
  { frame: 298, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  { frame: 340, src: "audio/pop-402324.mp3", volume: 0.14 },
  { frame: 470, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.2 },
  { frame: 598, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  { frame: 690, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 720, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  { frame: 808, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  { frame: 825, src: "audio/pop-402324.mp3", volume: 0.22 },
];

// ═══════════════════════════════════════════════════════════════
// HELPER: Character-by-character spring animation (multi-line)
// ═══════════════════════════════════════════════════════════════
const AnimatedLine: React.FC<{
  text: string;
  fontSize: number;
  color: string;
  delay: number;
  stagger?: number;
  entrance?: "spring-up" | "spring-scale";
  damping?: number;
  stiffness?: number;
  letterSpacing?: number;
  fontWeight?: number;
  textShadow?: string;
}> = ({
  text,
  fontSize,
  color,
  delay,
  stagger = 1.5,
  entrance = "spring-up",
  damping = 10,
  stiffness = 180,
  letterSpacing = 6,
  fontWeight = 900,
  textShadow = "0 4px 20px rgba(0,0,0,0.5)",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chars = text.split("");

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {chars.map((char, i) => {
        const charFrame = Math.max(0, frame - delay - i * stagger);
        const progress = spring({
          frame: charFrame,
          fps,
          from: 0,
          to: 1,
          config: { damping, stiffness },
        });

        const style: React.CSSProperties =
          entrance === "spring-scale"
            ? {
                transform: `scale(${interpolate(progress, [0, 1], [0.3, 1])})`,
                opacity: progress,
              }
            : {
                transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
                opacity: progress,
              };

        return (
          <span
            key={`${i}-${char}`}
            style={{
              fontFamily: interFont,
              fontWeight,
              fontSize,
              color,
              letterSpacing,
              textShadow,
              display: "inline-block",
              whiteSpace: "pre",
              ...style,
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// NOISE BACKGROUND — animated grain + glow + vignette
// ═══════════════════════════════════════════════════════════════
const NoiseBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: 18 }, (_, i) => {
    const x = noise2D("px" + i, i * 0.3, frame * 0.004) * 0.5 + 0.5;
    const y = noise2D("py" + i, i * 0.7, frame * 0.003) * 0.5 + 0.5;
    const opacity = noise2D("po" + i, i * 0.5, frame * 0.006) * 0.02 + 0.03;
    const size = 2 + noise2D("ps" + i, i * 0.2, frame * 0.002) * 2;
    return { x: x * 1080, y: y * 1920, opacity: Math.max(0.01, opacity), size };
  });

  const glowOpacity = interpolate(
    frame % 120,
    [0, 60, 120],
    [0.08, 0.15, 0.08]
  );

  return (
    <AbsoluteFill>
      {/* Base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: T.bg,
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 45%, ${T.orange}${Math.round(glowOpacity * 255)
            .toString(16)
            .padStart(2, "0")} 0%, transparent 60%)`,
        }}
      />

      {/* Dust particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: T.white,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 1: HOOK — "ANTHROPIC JUST CHANGED AGENTS FOREVER"
// ═══════════════════════════════════════════════════════════════
const HookTitle: React.FC = () => {
  const frame = useCurrentFrame();

  // Orange flash intro
  const flash = interpolate(frame, [0, 5], [0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit
  const exit = interpolate(frame, [75, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [75, 90], [1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line
  const { fps } = useVideoConfig();
  const lineWidth = spring({
    frame: Math.max(0, frame - 30),
    fps,
    from: 0,
    to: 200,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <AbsoluteFill>
      {/* Orange flash */}
      {flash > 0 && (
        <AbsoluteFill
          style={{ backgroundColor: T.orange, opacity: flash, zIndex: 50 }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${exitScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: exit,
        }}
      >
        <AnimatedLine
          text="ANTHROPIC"
          fontSize={88}
          color={T.white}
          delay={0}
          textShadow="0 4px 30px rgba(0,0,0,0.8)"
        />
        <AnimatedLine
          text="JUST CHANGED"
          fontSize={82}
          color={T.white}
          delay={8}
          textShadow="0 4px 30px rgba(0,0,0,0.8)"
        />
        <AnimatedLine
          text="AGENTS FOREVER"
          fontSize={88}
          color={T.orange}
          delay={16}
          entrance="spring-scale"
          damping={8}
          stiffness={200}
          textShadow={`0 0 40px rgba(255, 107, 0, 0.4), 0 4px 20px rgba(0,0,0,0.8)`}
        />

        {/* Accent line */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            backgroundColor: T.orange,
            marginTop: 12,
            boxShadow: `0 0 20px rgba(255, 107, 0, 0.5)`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2: THE OLD WAY — Flow diagram + token waste
// ═══════════════════════════════════════════════════════════════
const OldWayDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "BEFORE" label entrance
  const labelEnter = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 200 },
  });

  // Flow nodes
  const nodes = [
    { label: "AGENT", delay: 15, y: 420 },
    { label: "TOOL", delay: 30, y: 560 },
    { label: "WAIT...", delay: 45, y: 700 },
    { label: "RESPONSE", delay: 60, y: 840 },
  ];

  // Loop arrow timing
  const loopFrame = Math.max(0, frame - 80);
  const loopProgress = spring({
    frame: loopFrame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  // Loop pulse (3 pulses at f100, f120, f140)
  const pulseOpacity =
    frame >= 100 && frame < 160
      ? interpolate(
          (frame - 100) % 20,
          [0, 10, 20],
          [0.3, 1, 0.3]
        )
      : 0;

  // Round counter
  const round =
    frame < 100 ? 0 : frame < 120 ? 1 : frame < 140 ? 2 : frame < 160 ? 3 : 3;

  // Token waste counter (f110-f180)
  const tokenCount =
    frame < 110
      ? 0
      : Math.round(
          interpolate(frame, [110, 180], [0, 2847], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        );

  // Exit wipe
  const wipeProgress = interpolate(frame, [180, 210], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        clipPath: wipeProgress > 0 ? `inset(0 0 0 ${wipeProgress}%)` : undefined,
        opacity: wipeProgress >= 100 ? 0 : 1,
      }}
    >
      {/* "BEFORE" label */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: labelEnter,
        }}
      >
        <div
          style={{
            width: 80 * labelEnter,
            height: 1,
            backgroundColor: T.dimGray,
          }}
        />
        <span
          style={{
            fontFamily: interFont,
            fontWeight: 700,
            fontSize: 32,
            color: T.dimGray,
            letterSpacing: 8,
          }}
        >
          BEFORE
        </span>
        <div
          style={{
            width: 80 * labelEnter,
            height: 1,
            backgroundColor: T.dimGray,
          }}
        />
      </div>

      {/* Flow nodes */}
      {nodes.map((node, i) => {
        const nodeEnter = spring({
          frame: Math.max(0, frame - node.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 20, stiffness: 200 },
        });

        return (
          <React.Fragment key={i}>
            {/* Node */}
            <div
              style={{
                position: "absolute",
                top: node.y,
                left: "50%",
                transform: `translateX(-50%) scale(${nodeEnter})`,
                opacity: nodeEnter,
                width: 280,
                height: 56,
                borderRadius: 12,
                border: `2px solid rgba(255,255,255,0.15)`,
                backgroundColor: "rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: interFont,
                  fontWeight: 700,
                  fontSize: 24,
                  color: T.white,
                  letterSpacing: 3,
                }}
              >
                {node.label === "WAIT..."
                  ? `WAIT${".".repeat(1 + ((frame - node.delay) % 12 < 4 ? 1 : (frame - node.delay) % 12 < 8 ? 2 : 3))}`
                  : node.label}
              </span>
            </div>

            {/* Arrow between nodes */}
            {i < nodes.length - 1 && (
              <svg
                style={{
                  position: "absolute",
                  top: node.y + 56,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                width={2}
                height={nodes[i + 1].y - node.y - 56}
                viewBox={`0 0 2 ${nodes[i + 1].y - node.y - 56}`}
              >
                <line
                  x1={1}
                  y1={0}
                  x2={1}
                  y2={(nodes[i + 1].y - node.y - 56) * nodeEnter}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth={2}
                />
              </svg>
            )}
          </React.Fragment>
        );
      })}

      {/* Loop arrow (Response → Agent) */}
      <svg
        style={{
          position: "absolute",
          top: 420,
          left: "calc(50% + 160px)",
        }}
        width={80}
        height={476}
        viewBox="0 0 80 476"
        fill="none"
      >
        <path
          d={`M0 476 Q80 476 80 238 Q80 0 0 0`}
          stroke={pulseOpacity > 0 ? T.orange : "rgba(255,255,255,0.2)"}
          strokeWidth={2}
          fill="none"
          strokeDasharray={`${1200 * loopProgress} 1200`}
          opacity={loopProgress}
        />
        {/* Arrow head */}
        {loopProgress > 0.9 && (
          <polygon
            points="0,0 10,8 0,16"
            fill={pulseOpacity > 0 ? T.orange : "rgba(255,255,255,0.3)"}
            transform="translate(-5, -8)"
          />
        )}
      </svg>

      {/* Loop pulse overlay on arrow */}
      {pulseOpacity > 0 && (
        <svg
          style={{
            position: "absolute",
            top: 420,
            left: "calc(50% + 160px)",
          }}
          width={80}
          height={476}
          viewBox="0 0 80 476"
          fill="none"
        >
          <path
            d={`M0 476 Q80 476 80 238 Q80 0 0 0`}
            stroke={T.orange}
            strokeWidth={3}
            fill="none"
            opacity={pulseOpacity * 0.6}
          />
        </svg>
      )}

      {/* Round counter */}
      {round > 0 && (
        <div
          style={{
            position: "absolute",
            top: 620,
            left: "calc(50% + 200px)",
            opacity: loopProgress,
          }}
        >
          <span
            style={{
              fontFamily: monoFont,
              fontWeight: 700,
              fontSize: 28,
              color: T.orange,
            }}
          >
            Round {round}
          </span>
        </div>
      )}

      {/* Token waste counter */}
      {tokenCount > 0 && (
        <div
          style={{
            position: "absolute",
            top: 1020,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: interFont,
              fontWeight: 600,
              fontSize: 20,
              color: T.dimGray,
              letterSpacing: 4,
            }}
          >
            TOKENS BURNED
          </span>
          <span
            style={{
              fontFamily: monoFont,
              fontWeight: 700,
              fontSize: 48,
              color: T.red,
              textShadow: `0 0 20px rgba(239, 68, 68, 0.4)`,
            }}
          >
            {tokenCount.toLocaleString()}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3: THE NEW WAY — Code block reveal
// ═══════════════════════════════════════════════════════════════

// Syntax-highlighted code line segments
type CodeSegment = { text: string; color: string };
const CODE_LINES: Array<{ segments: CodeSegment[]; delay: number }> = [
  {
    delay: 40,
    segments: [
      { text: "tools", color: T.codeBlue },
      { text: " = ", color: T.white },
      { text: "[", color: T.codeYellow },
      { text: "search", color: T.codeGreen },
      { text: ", ", color: T.white },
      { text: "analyze", color: T.codeGreen },
      { text: ", ", color: T.white },
      { text: "summarize", color: T.codeGreen },
      { text: "]", color: T.codeYellow },
    ],
  },
  { delay: 55, segments: [] }, // empty line
  {
    delay: 60,
    segments: [
      { text: "results", color: T.codeBlue },
      { text: " = ", color: T.white },
      { text: "agent", color: T.white },
      { text: ".", color: T.white },
      { text: "run", color: T.codeGreen },
      { text: "(", color: T.codeYellow },
    ],
  },
  {
    delay: 75,
    segments: [
      { text: '    code=', color: T.codePurple },
      { text: '"""', color: T.codeYellow },
    ],
  },
  {
    delay: 90,
    segments: [
      { text: "    data", color: T.codeBlue },
      { text: " = ", color: T.white },
      { text: "search", color: T.codeGreen },
      { text: "(", color: T.codeYellow },
      { text: "query", color: T.codePurple },
      { text: ")", color: T.codeYellow },
    ],
  },
  {
    delay: 105,
    segments: [
      { text: "    filtered", color: T.codeBlue },
      { text: " = ", color: T.white },
      { text: "[", color: T.codeYellow },
      { text: "x ", color: T.white },
      { text: "for ", color: T.codePurple },
      { text: "x ", color: T.white },
      { text: "in ", color: T.codePurple },
      { text: "data ", color: T.codeBlue },
      { text: "if ", color: T.codePurple },
      { text: "x.score > ", color: T.white },
      { text: "0.8", color: T.codePurple },
      { text: "]", color: T.codeYellow },
    ],
  },
  {
    delay: 120,
    segments: [
      { text: "    summary", color: T.codeBlue },
      { text: " = ", color: T.white },
      { text: "summarize", color: T.codeGreen },
      { text: "(", color: T.codeYellow },
      { text: "filtered", color: T.codeBlue },
      { text: ")", color: T.codeYellow },
    ],
  },
  {
    delay: 135,
    segments: [
      { text: "    return ", color: T.codePurple },
      { text: "summary", color: T.codeBlue },
    ],
  },
  {
    delay: 150,
    segments: [{ text: '    """', color: T.codeYellow }],
  },
  {
    delay: 160,
    segments: [{ text: ")", color: T.codeYellow }],
  },
];

const CodeBlockReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hero title entrance
  const titleEnter = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  // Accent line
  const lineWidth = spring({
    frame: Math.max(0, frame - 25),
    fps,
    from: 0,
    to: 160,
    config: { damping: 14, stiffness: 100 },
  });

  // Code panel entrance
  const panelEnter = spring({
    frame: Math.max(0, frame - 30),
    fps,
    from: 0,
    to: 1,
    config: { damping: 16, stiffness: 120 },
  });

  // "ALL IN ONE SHOT" badge
  const badgeEnter = spring({
    frame: Math.max(0, frame - 170),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 200 },
  });
  const badgeGlow = interpolate(frame % 30, [0, 15, 30], [15, 30, 15]);

  // Floating labels
  const labels = [
    { text: "LOOPS", color: T.codeGreen, x: 120, y: 580, delay: 180 },
    { text: "CONDITIONS", color: T.codePurple, x: 780, y: 600, delay: 195 },
    { text: "FILTERING", color: T.codeBlue, x: 140, y: 1340, delay: 210 },
  ];

  // Exit
  const exit = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [270, 300], [1, 0.92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: exit,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Hero title */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          opacity: titleEnter,
        }}
      >
        <AnimatedLine
          text="PROGRAMMATIC"
          fontSize={62}
          color={T.white}
          delay={5}
          stagger={2}
          entrance="spring-scale"
          textShadow="0 4px 30px rgba(0,0,0,0.8)"
        />
        <AnimatedLine
          text="TOOL CALLING"
          fontSize={72}
          color={T.orange}
          delay={14}
          stagger={2}
          entrance="spring-scale"
          damping={8}
          stiffness={200}
          textShadow={`0 0 40px rgba(255, 107, 0, 0.4), 0 4px 20px rgba(0,0,0,0.8)`}
        />
        <div
          style={{
            width: lineWidth,
            height: 3,
            backgroundColor: T.orange,
            marginTop: 8,
            boxShadow: `0 0 15px rgba(255, 107, 0, 0.4)`,
          }}
        />
      </div>

      {/* Code editor panel */}
      <div
        style={{
          position: "absolute",
          top: 500,
          left: "50%",
          transform: `translateX(-50%) scale(${panelEnter})`,
          opacity: panelEnter,
          width: 920,
          borderRadius: 16,
          backgroundColor: "#1A1A1A",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(255, 107, 0, 0.08)`,
          overflow: "hidden",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: T.red,
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: T.codeYellow,
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: T.codeGreen,
            }}
          />
          <span
            style={{
              fontFamily: monoFont,
              fontSize: 13,
              color: T.dimGray,
              marginLeft: 12,
            }}
          >
            agent.py
          </span>
        </div>

        {/* Code lines */}
        <div style={{ padding: "16px 24px" }}>
          {CODE_LINES.map((line, lineIdx) => {
            const lineProgress = spring({
              frame: Math.max(0, frame - line.delay),
              fps,
              from: 0,
              to: 1,
              config: { damping: 16, stiffness: 120 },
            });

            if (line.segments.length === 0) {
              return (
                <div
                  key={lineIdx}
                  style={{ height: 22 * 1.6, opacity: lineProgress }}
                />
              );
            }

            return (
              <div
                key={lineIdx}
                style={{
                  opacity: lineProgress,
                  transform: `translateX(${interpolate(lineProgress, [0, 1], [-20, 0])}px)`,
                  height: 22 * 1.6,
                  display: "flex",
                  alignItems: "center",
                  whiteSpace: "pre",
                }}
              >
                {line.segments.map((seg, segIdx) => (
                  <span
                    key={segIdx}
                    style={{
                      fontFamily: monoFont,
                      fontSize: 21,
                      color: seg.color,
                      lineHeight: 1.6,
                    }}
                  >
                    {seg.text}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* "ALL IN ONE SHOT" badge */}
      <div
        style={{
          position: "absolute",
          top: 1200,
          left: "50%",
          transform: `translateX(-50%) scale(${interpolate(badgeEnter, [0, 1], [0.5, 1])})`,
          opacity: badgeEnter,
          padding: "16px 40px",
          borderRadius: 30,
          backgroundColor: T.orange,
          boxShadow: `0 0 ${badgeGlow}px rgba(255, 107, 0, 0.5)`,
        }}
      >
        <span
          style={{
            fontFamily: interFont,
            fontWeight: 800,
            fontSize: 28,
            color: T.white,
            letterSpacing: 4,
          }}
        >
          ALL IN ONE SHOT
        </span>
      </div>

      {/* Floating labels */}
      {labels.map((label, i) => {
        const lEnter = spring({
          frame: Math.max(0, frame - label.delay),
          fps,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 140 },
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: label.y,
              left: label.x,
              opacity: lEnter,
              transform: `translateY(${interpolate(lEnter, [0, 1], [10, 0])}px)`,
            }}
          >
            <span
              style={{
                fontFamily: interFont,
                fontWeight: 700,
                fontSize: 20,
                color: label.color,
                letterSpacing: 2,
                textShadow: `0 0 12px ${label.color}66`,
              }}
            >
              {label.text}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4: THE RESULT — Big number reveal
// ═══════════════════════════════════════════════════════════════
const BigStatReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main number entrance
  const numScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 10, stiffness: 180 },
  });
  const numOpacity = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 200 },
  });

  // "FEWER TOKENS" label
  const labelEnter = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  // Supporting stats
  const stats = [
    { text: "FASTER EXECUTION", delay: 90, icon: "\u26A1" },
    { text: "MORE RELIABLE", delay: 120, icon: "\u2714" },
  ];

  // Glow pulse on number
  const glowSize = interpolate(frame % 40, [0, 20, 40], [40, 70, 40]);

  // Exit
  const exitRadius = interpolate(frame, [180, 210], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitClip =
    frame >= 180 ? `circle(${exitRadius}% at 50% 50%)` : undefined;

  return (
    <AbsoluteFill
      style={{
        clipPath: exitClip,
      }}
    >
      {/* Main number */}
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${numScale})`,
          opacity: numOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: interFont,
            fontWeight: 900,
            fontSize: 160,
            color: T.orange,
            letterSpacing: -4,
            textShadow: `0 0 ${glowSize}px rgba(255, 107, 0, 0.5), 0 4px 20px rgba(0,0,0,0.8)`,
            lineHeight: 1,
          }}
        >
          30-50%
        </span>

        <span
          style={{
            fontFamily: interFont,
            fontWeight: 800,
            fontSize: 48,
            color: T.white,
            letterSpacing: 6,
            opacity: labelEnter,
            transform: `translateY(${interpolate(labelEnter, [0, 1], [15, 0])}px)`,
          }}
        >
          FEWER TOKENS
        </span>
      </div>

      {/* Supporting stats */}
      <div
        style={{
          position: "absolute",
          top: "58%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {stats.map((stat, i) => {
          const sEnter = spring({
            frame: Math.max(0, frame - stat.delay),
            fps,
            from: 0,
            to: 1,
            config: { damping: 14, stiffness: 120 },
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: sEnter,
                transform: `translateY(${interpolate(sEnter, [0, 1], [20, 0])}px)`,
              }}
            >
              <span style={{ fontSize: 32 }}>{stat.icon}</span>
              <span
                style={{
                  fontFamily: interFont,
                  fontWeight: 700,
                  fontSize: 36,
                  color: T.white,
                  letterSpacing: 3,
                }}
              >
                {stat.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 5: CLOSER — "TOOL CALLING 2.0"
// ═══════════════════════════════════════════════════════════════
const CloserTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Orange flash
  const flash = interpolate(frame, [0, 5], [0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "2.0" entrance — extra bouncy
  const twoScale = spring({
    frame: Math.max(0, frame - 15),
    fps,
    from: 0.3,
    to: 1,
    config: { damping: 8, stiffness: 220 },
  });
  const twoOpacity = spring({
    frame: Math.max(0, frame - 15),
    fps,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 200 },
  });

  // Accent line
  const lineWidth = spring({
    frame: Math.max(0, frame - 25),
    fps,
    from: 0,
    to: 300,
    config: { damping: 14, stiffness: 100 },
  });

  // Glow pulse
  const glowSize = interpolate(frame % 30, [0, 15, 30], [30, 60, 30]);

  // Fade to black
  const fadeOut = interpolate(frame, [60, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Orange flash */}
      {flash > 0 && (
        <AbsoluteFill
          style={{ backgroundColor: T.orange, opacity: flash, zIndex: 50 }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        <AnimatedLine
          text="TOOL CALLING"
          fontSize={72}
          color={T.white}
          delay={5}
          stagger={2}
          letterSpacing={4}
          textShadow="0 4px 20px rgba(0,0,0,0.6)"
        />

        <span
          style={{
            fontFamily: interFont,
            fontWeight: 900,
            fontSize: 200,
            color: T.orange,
            letterSpacing: -4,
            lineHeight: 1,
            textShadow: `0 0 ${glowSize}px rgba(255, 107, 0, 0.5), 0 4px 20px rgba(0,0,0,0.8)`,
            transform: `scale(${twoScale})`,
            opacity: twoOpacity,
            display: "inline-block",
          }}
        >
          2.0
        </span>

        {/* Accent line */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            backgroundColor: T.orange,
            marginTop: 16,
            boxShadow: `0 0 20px rgba(255, 107, 0, 0.5)`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════════
export const ToolCalling2Point0: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: T.bg }}>
      {/* Layer 0: Animated noise background */}
      <NoiseBackground />

      {/* Scene 1: HOOK (f0–90) */}
      <Sequence from={0} durationInFrames={90}>
        <HookTitle />
      </Sequence>

      {/* Scene 2: THE OLD WAY (f90–300) */}
      <Sequence from={90} durationInFrames={210}>
        <OldWayDiagram />
      </Sequence>

      {/* Scene 3: THE NEW WAY (f300–600) */}
      <Sequence from={300} durationInFrames={300}>
        <CodeBlockReveal />
      </Sequence>

      {/* Scene 4: THE RESULT (f600–810) */}
      <Sequence from={600} durationInFrames={210}>
        <BigStatReveal />
      </Sequence>

      {/* Scene 5: CLOSER (f810–900) */}
      <Sequence from={810} durationInFrames={90}>
        <CloserTitle />
      </Sequence>

      {/* Background Music */}
      <Audio
        src={staticFile("audio/lofi-background.mp3")}
        volume={0.02}
        startFrom={0}
        endAt={900}
      />

      {/* SFX Layer */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={15}>
          <Audio src={staticFile(sfx.src)} volume={sfx.volume} startFrom={0} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
