/**
 * Clip: Next Videos — Agentic Clip Extractor + Remotion Pipeline
 *
 * SOURCE: Pipeline clip from "Claude Creatives — AI Content Factory Setup"
 * CTA: "WATCH THE FULL VIDEO" + source title
 * Duration: ~62.5s (1905 frames @ 30fps)
 * Score: 79/100 (Rank #5)
 *
 * STORY: Enrique asks viewers for feedback, shares excitement about upcoming
 * AI agent social media manager & Claude creatives development. Teases two
 * upcoming videos: (1) agentic clip extractor workflow, (2) full Remotion +
 * Claude Code editing pipeline. Everything shared for free on the channel.
 *
 * POP-OUTS (15 ConceptOverlay + 1 CTA):
 *   1.  COMMENTS WANTED     (frame   72, 55f) — speech bubble + comments
 *   2.  SUPER EXCITED        (frame  149, 55f) — energy burst
 *   3.  AI AGENT MANAGER     (frame  306, 60f) — robot + social icons
 *   4.  CLAUDE CREATIVES     (frame  389, 55f) — Claude logo + creative tools
 *   5.  AGENT SYSTEM         (frame  579, 55f) — connected nodes
 *   6.  FREE FOR YOU         (frame  677, 55f) — gift tag
 *   7.  YOUR SUPPORT         (frame  781, 55f) — heart / community
 *   8.  SUPER IMPORTANT      (frame  949, 55f) — exclamation emphasis
 *   9.  NEXT VIDEOS CRAZY    (frame 1020, 60f) — explosion / fire
 *  10.  VIDEO PLAN           (frame 1130, 55f) — roadmap checklist
 *  11.  AGENTIC EXTRACTOR    (frame 1227, 60f) — scissors + automation
 *  12.  WHOLE PIPELINE       (frame 1415, 55f) — flow diagram
 *  13.  CONTENT EDITING      (frame 1542, 55f) — long + short form icons
 *  14.  REMOTION + CLAUDE    (frame 1690, 60f) — dual logo lockup
 *  15.  SUPER VALUABLE       (frame 1801, 50f) — diamond / gem
 *  CTA: WATCH THE FULL VIDEO (frame 1855, 48f)
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { ConceptOverlay } from "../components/ConceptOverlay";
import { WORDS } from "../data/clip-next-videos-agentic-pipeline-words";

const { fontFamily } = loadFont();

const TOTAL_FRAMES = 1905;

function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 70,   end: 127  }, // Comments Wanted
  { start: 147,  end: 204  }, // Super Excited
  { start: 304,  end: 366  }, // AI Agent Manager
  { start: 387,  end: 444  }, // Claude Creatives
  { start: 577,  end: 634  }, // Agent System
  { start: 675,  end: 732  }, // Free For You
  { start: 779,  end: 836  }, // Your Support
  { start: 947,  end: 1004 }, // Super Important
  { start: 1018, end: 1080 }, // Next Videos Crazy
  { start: 1128, end: 1185 }, // Video Plan
  { start: 1225, end: 1287 }, // Agentic Extractor
  { start: 1413, end: 1470 }, // Whole Pipeline
  { start: 1540, end: 1597 }, // Content Editing
  { start: 1688, end: 1750 }, // Remotion + Claude
  { start: 1799, end: 1851 }, // Super Valuable
  { start: 1853, end: 1903 }, // CTA
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS — cycle through 4 SFX types, never repeat consecutive
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  { frame: 0,    src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 }, // opening hook
  { frame: 70,   src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 147,  src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 304,  src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 387,  src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 577,  src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 675,  src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 779,  src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 947,  src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1018, src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 1128, src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 1225, src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 1413, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1540, src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 1688, src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 1799, src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 1853, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.18 },
];

// ═══════════════════════════════════════════════════════════════
// 1. COMMENTS WANTED — Speech bubble with chat dots
// ═══════════════════════════════════════════════════════════════
const CommentsWantedIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const dot1 = Math.abs(Math.sin(frame * 0.18));
  const dot2 = Math.abs(Math.sin(frame * 0.18 + 1));
  const dot3 = Math.abs(Math.sin(frame * 0.18 + 2));

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 240) scale(${enter})`}>
        {/* Speech bubble */}
        <rect x={-130} y={-90} width={260} height={160} rx={30} fill="#FF7614" />
        <polygon points="-20,70 20,70 0,110" fill="#FF7614" />
        {/* Chat dots */}
        <circle cx={-40} cy={-10} r={14} fill="white" opacity={0.5 + dot1 * 0.5} />
        <circle cx={0} cy={-10} r={14} fill="white" opacity={0.5 + dot2 * 0.5} />
        <circle cx={40} cy={-10} r={14} fill="white" opacity={0.5 + dot3 * 0.5} />
      </g>
      <text x={300} y={430} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={24} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        LET ME KNOW!
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. SUPER EXCITED — Energy burst / starburst
// ═══════════════════════════════════════════════════════════════
const SuperExcitedIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 130 } });
  const pulse = 1 + Math.sin(frame * 0.2) * 0.05;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 250) scale(${enter * pulse})`}>
        {/* Starburst rays */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          return (
            <line key={i} x1={Math.cos(angle) * 50} y1={Math.sin(angle) * 50}
              x2={Math.cos(angle) * 110} y2={Math.sin(angle) * 110}
              stroke="#FFB800" strokeWidth={6} strokeLinecap="round" opacity={0.6} />
          );
        })}
        <circle cx={0} cy={0} r={60} fill="#FF7614" />
        <text x={0} y={8} textAnchor="middle" fontSize={40} fill="white">🔥</text>
      </g>
      <text x={300} y={420} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={28} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={3}>
        SUPER EXCITED
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. AI AGENT MANAGER — Robot head + social platform icons
// ═══════════════════════════════════════════════════════════════
const AIAgentManagerIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const platforms = [
    { src: "logos/instagram.svg", delay: 8 },
    { src: "logos/x.svg",         delay: 12 },
    { src: "logos/linkedin.svg",  delay: 16 },
    { src: "logos/tiktok.svg",    delay: 20 },
  ];

  return (
    <div style={{ width: size, height: size, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Robot head */}
      <svg width={size * 0.4} height={size * 0.35} viewBox="0 0 240 200" fill="none" style={{ opacity: enter, transform: `scale(${enter})` }}>
        <rect x={40} y={40} width={160} height={130} rx={24} fill="#FF7614" />
        <rect x={60} y={30} width={20} height={20} rx={4} fill="#FFB800" />
        <rect x={160} y={30} width={20} height={20} rx={4} fill="#FFB800" />
        <circle cx={100} cy={95} r={16} fill="white" />
        <circle cx={140} cy={95} r={16} fill="white" />
        <circle cx={100} cy={95} r={7} fill="#1A1A1A" />
        <circle cx={140} cy={95} r={7} fill="#1A1A1A" />
        <rect x={90} y={130} width={60} height={10} rx={5} fill="white" opacity={0.6} />
        <text x={120} y={195} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={14} fill="#1A1A1A" letterSpacing={1}>AI AGENT</text>
      </svg>
      {/* Platform logos */}
      <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
        {platforms.map((p, i) => {
          const logoEnter = spring({ frame: Math.max(0, frame - p.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
          return (
            <div key={i} style={{ opacity: logoEnter, transform: `scale(${logoEnter})` }}>
              <Img src={staticFile(p.src)} style={{ width: size * 0.1, height: size * 0.1 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. CLAUDE CREATIVES — Claude logo + creative tools
// ═══════════════════════════════════════════════════════════════
const ClaudeCreativesIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <div style={{ width: size, height: size, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: enter, transform: `scale(${enter})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <Img src={staticFile("logos/claude-ai-icon.svg")} style={{ width: size * 0.22, height: size * 0.22 }} />
        <div style={{ fontFamily, fontWeight: 900, fontSize: size * 0.06, color: "#1A1A1A", letterSpacing: 3 }}>
          CLAUDE CREATIVES
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["🎬", "📸", "✍️", "🎨"].map((emoji, i) => {
            const emojiEnter = spring({ frame: Math.max(0, frame - 12 - i * 4), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 160 } });
            return (
              <div key={i} style={{ fontSize: size * 0.06, opacity: emojiEnter, transform: `scale(${emojiEnter})` }}>
                {emoji}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. AGENT SYSTEM — Connected nodes graph
// ═══════════════════════════════════════════════════════════════
const AgentSystemIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const nodes = [
    { x: 300, y: 160, label: "AGENT", color: "#FF7614", r: 40 },
    { x: 160, y: 300, label: "POST",  color: "#3B82F6", r: 30 },
    { x: 440, y: 300, label: "EDIT",  color: "#22C55E", r: 30 },
    { x: 220, y: 420, label: "CLIPS", color: "#8B5CF6", r: 30 },
    { x: 380, y: 420, label: "MEDIA", color: "#EC4899", r: 30 },
  ];

  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [0, 3], [0, 4],
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {edges.map(([a, b], i) => {
        const lineEnter = spring({ frame: Math.max(0, frame - 8 - i * 3), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });
        return (
          <line key={`e${i}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[a].x + (nodes[b].x - nodes[a].x) * lineEnter}
            y2={nodes[a].y + (nodes[b].y - nodes[a].y) * lineEnter}
            stroke="#E5E5E5" strokeWidth={2.5} opacity={enter} />
        );
      })}
      {nodes.map((n, i) => {
        const nodeEnter = spring({ frame: Math.max(0, frame - i * 4), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
        return (
          <g key={`n${i}`} opacity={enter * nodeEnter}>
            <circle cx={n.x} cy={n.y} r={n.r * nodeEnter} fill={n.color} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800}
              fontSize={i === 0 ? 14 : 11} fill="white">{n.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. FREE FOR YOU — Gift tag / free label
// ═══════════════════════════════════════════════════════════════
const FreeForYouIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 120 } });
  const bounce = spring({ frame: Math.max(0, frame - 10), fps: 30, from: 1.15, to: 1, config: { damping: 8, stiffness: 200 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 250) scale(${enter * bounce})`}>
        {/* Tag shape */}
        <rect x={-100} y={-70} width={200} height={140} rx={20} fill="#22C55E" />
        <circle cx={-60} cy={-30} r={14} fill="white" opacity={0.3} />
        <text x={0} y={10} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={48} fill="white">
          FREE
        </text>
        <text x={0} y={50} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={16} fill="rgba(255,255,255,0.8)">
          100% Open Source
        </text>
      </g>
      <text x={300} y={430} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 18), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        SHARING EVERYTHING FREE
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 7. YOUR SUPPORT — Heart with community
// ═══════════════════════════════════════════════════════════════
const YourSupportIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 110 } });
  const heartPulse = 1 + Math.sin(frame * 0.15) * 0.05;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 240) scale(${enter * heartPulse})`}>
        <path d="M0,-40 C0,-80 60,-80 60,-40 C60,0 0,50 0,50 C0,50 -60,0 -60,-40 C-60,-80 0,-80 0,-40Z"
          fill="#FF3B5C" transform="scale(1.8)" />
      </g>
      {/* Notification dots */}
      {[
        { x: 200, y: 340, delay: 8 },
        { x: 400, y: 340, delay: 12 },
        { x: 250, y: 380, delay: 16 },
        { x: 350, y: 380, delay: 20 },
      ].map((d, i) => {
        const dotEnter = spring({ frame: Math.max(0, frame - d.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 160 } });
        return (
          <circle key={i} cx={d.x} cy={d.y} r={10 * dotEnter} fill="#FF7614" opacity={enter * 0.5} />
        );
      })}
      <text x={300} y={440} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={24} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 18), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        YOUR SUPPORT MATTERS
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 8. SUPER IMPORTANT — Giant exclamation emphasis
// ═══════════════════════════════════════════════════════════════
const SuperImportantIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 130 } });
  const shake = Math.sin(frame * 0.5) * 3 * Math.max(0, 1 - frame / 30);

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(${300 + shake}, 260) scale(${enter})`}>
        <circle cx={0} cy={0} r={90} fill="#FF3B5C" />
        <rect x={-12} y={-55} width={24} height={70} rx={12} fill="white" />
        <circle cx={0} cy={38} r={12} fill="white" />
      </g>
      <text x={300} y={420} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={28} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={3}>
        SUPER IMPORTANT
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 9. NEXT VIDEOS CRAZY — Explosion / fire energy
// ═══════════════════════════════════════════════════════════════
const NextVideosCrazyIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 8, stiffness: 140 } });
  const shake = Math.sin(frame * 0.6) * 4 * Math.max(0, 1 - frame / 25);

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(${300 + shake}, 250) scale(${enter})`}>
        {/* Explosion rings */}
        {[120, 90, 60].map((r, i) => (
          <circle key={i} cx={0} cy={0} r={r} fill="none" stroke={i === 0 ? "#FFB800" : i === 1 ? "#FF7614" : "#FF3B5C"}
            strokeWidth={4} opacity={0.4 + i * 0.2} />
        ))}
        <circle cx={0} cy={0} r={45} fill="#FF7614" />
        <text x={0} y={12} textAnchor="middle" fontSize={36} fill="white">🤯</text>
      </g>
      <text x={300} y={430} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={26} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={3}>
        FREAKING CRAZY
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 10. VIDEO PLAN — Roadmap checklist
// ═══════════════════════════════════════════════════════════════
const VideoPlanIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const items = [
    { text: "Agentic Clip Extractor", delay: 6 },
    { text: "Remotion + Claude Code", delay: 12 },
    { text: "Full Pipeline Demo",     delay: 18 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <rect x={130} y={120} width={340} height={350} rx={20} fill="#F8F8F8" stroke="#E5E5E5" strokeWidth={2} opacity={enter} />
      <text x={300} y={175} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22} fill="#1A1A1A" opacity={enter} letterSpacing={2}>
        VIDEO PLAN
      </text>
      <line x1={160} y1={195} x2={440} y2={195} stroke="#E5E5E5" strokeWidth={2} opacity={enter} />
      {items.map((item, i) => {
        const itemEnter = spring({ frame: Math.max(0, frame - item.delay), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 140 } });
        return (
          <g key={i} opacity={itemEnter}>
            <circle cx={185} cy={240 + i * 60} r={12} fill="#22C55E" opacity={itemEnter} />
            <text x={185} y={245 + i * 60} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={12} fill="white">✓</text>
            <text x={210} y={245 + i * 60} fontFamily="Inter, sans-serif" fontWeight={600} fontSize={17} fill="#444">
              {item.text}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 11. AGENTIC EXTRACTOR — Scissors + automation flow
// ═══════════════════════════════════════════════════════════════
const AgenticExtractorIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 230) scale(${enter})`}>
        {/* Film strip */}
        <rect x={-150} y={-50} width={300} height={80} rx={8} fill="#1A1A1A" />
        {[...Array(6)].map((_, i) => (
          <rect key={i} x={-140 + i * 52} y={-40} width={40} height={60} rx={4} fill="#FF7614" opacity={0.3 + (i % 3) * 0.15} />
        ))}
        {/* Scissors cutting line */}
        <line x1={0} y1={-60} x2={0} y2={50} stroke="#FF3B5C" strokeWidth={3} strokeDasharray="8,6" />
        <text x={0} y={75} textAnchor="middle" fontSize={32} fill="#FF3B5C">✂️</text>
      </g>
      {/* Arrow to output */}
      <g opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 100 } })}>
        <line x1={300} y1={340} x2={300} y2={380} stroke="#22C55E" strokeWidth={3} />
        <polygon points="290,380 300,398 310,380" fill="#22C55E" />
      </g>
      <text x={300} y={440} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 18), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        AGENTIC CLIP EXTRACTOR
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 12. WHOLE PIPELINE — Flow diagram boxes
// ═══════════════════════════════════════════════════════════════
const WholePipelineIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const steps = [
    { label: "SELECT", color: "#3B82F6", x: 120, delay: 0 },
    { label: "EXTRACT", color: "#8B5CF6", x: 230, delay: 6 },
    { label: "EDIT",    color: "#FF7614", x: 340, delay: 12 },
    { label: "POST",    color: "#22C55E", x: 450, delay: 18 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {steps.map((step, i) => {
        const stepEnter = spring({ frame: Math.max(0, frame - step.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
        return (
          <g key={i}>
            {i > 0 && (
              <line x1={steps[i - 1].x + 40} y1={260} x2={step.x - 40} y2={260}
                stroke="#E5E5E5" strokeWidth={3} opacity={stepEnter} markerEnd="url(#arrowhead)" />
            )}
            <rect x={step.x - 40} y={220} width={80} height={80} rx={14} fill={step.color} opacity={enter * stepEnter} />
            <text x={step.x} y={268} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={12} fill="white" opacity={stepEnter}>
              {step.label}
            </text>
          </g>
        );
      })}
      <text x={300} y={400} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={24} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 22), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={3}>
        THE WHOLE PIPELINE
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 13. CONTENT EDITING — Long form + short form icons
// ═══════════════════════════════════════════════════════════════
const ContentEditingIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const rightEnter = spring({ frame: Math.max(0, frame - 12), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Long form - landscape */}
      <g opacity={enter} transform={`translate(200, 220) scale(${enter})`}>
        <rect x={-100} y={-55} width={200} height={110} rx={12} fill="#3B82F6" />
        <rect x={-80} y={-35} width={160} height={70} rx={6} fill="white" opacity={0.2} />
        <text x={0} y={5} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={14} fill="white">LONG FORM</text>
        <text x={0} y={90} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={13} fill="#3B82F6">16:9</text>
      </g>
      {/* Short form - portrait */}
      <g opacity={rightEnter} transform={`translate(420, 220) scale(${rightEnter})`}>
        <rect x={-45} y={-80} width={90} height={160} rx={12} fill="#FF7614" />
        <rect x={-30} y={-60} width={60} height={120} rx={6} fill="white" opacity={0.2} />
        <text x={0} y={5} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={12} fill="white">SHORT</text>
        <text x={0} y={20} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={12} fill="white">FORM</text>
        <text x={0} y={115} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={13} fill="#FF7614">9:16</text>
      </g>
      {/* Arrow between */}
      <g opacity={rightEnter}>
        <line x1={310} y1={220} x2={355} y2={220} stroke="#888" strokeWidth={2} />
        <polygon points="355,215 370,220 355,225" fill="#888" />
      </g>
      <text x={300} y={430} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 20), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={2}>
        CONTENT EDITING
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 14. REMOTION + CLAUDE CODE — Dual logo lockup
// ═══════════════════════════════════════════════════════════════
const RemotionClaudeCodeIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const plusEnter = spring({ frame: Math.max(0, frame - 10), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 160 } });

  return (
    <div style={{ width: size, height: size, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, opacity: enter, transform: `scale(${enter})` }}>
        {/* Remotion logo (triangle) */}
        <svg width={size * 0.18} height={size * 0.18} viewBox="0 0 100 100">
          <polygon points="15,85 50,15 85,85" fill="#0B84F3" />
          <text x={50} y={105} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={12} fill="#0B84F3">Remotion</text>
        </svg>
        {/* Plus sign */}
        <div style={{ fontFamily, fontWeight: 300, fontSize: size * 0.08, color: "#888", opacity: plusEnter }}>+</div>
        {/* Claude Code logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Img src={staticFile("logos/claude-code-terminal.webp")} style={{ width: size * 0.18, height: size * 0.18, borderRadius: 12 }} />
        </div>
      </div>
      <div style={{
        fontFamily, fontWeight: 900, fontSize: size * 0.045, color: "#1A1A1A", letterSpacing: 3, marginTop: 20,
        opacity: spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } }),
      }}>
        REMOTION + CLAUDE CODE
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 15. SUPER VALUABLE — Diamond gem
// ═══════════════════════════════════════════════════════════════
const SuperValuableIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 120 } });
  const sparkle = Math.abs(Math.sin(frame * 0.2));

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g opacity={enter} transform={`translate(300, 240) scale(${enter})`}>
        {/* Diamond shape */}
        <polygon points="0,-80 70,-20 40,60 -40,60 -70,-20" fill="#8B5CF6" />
        <polygon points="0,-80 70,-20 0,10" fill="#A78BFA" opacity={0.6} />
        <polygon points="0,-80 -70,-20 0,10" fill="#6D28D9" opacity={0.4} />
        <polygon points="0,10 70,-20 40,60" fill="#7C3AED" opacity={0.5} />
        {/* Sparkles */}
        {[
          { x: 100, y: -50 },
          { x: -90, y: -40 },
          { x: 80, y: 40 },
        ].map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={5 + sparkle * 4} fill="#FFB800"
            opacity={0.4 + sparkle * 0.6} />
        ))}
      </g>
      <text x={300} y={410} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={28} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })} letterSpacing={3}>
        SUPER VALUABLE
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// CTA CARD
// ═══════════════════════════════════════════════════════════════
const CTACard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter   = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const fadeOut  = interpolate(frame, [36, 48], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, opacity: enter * fadeOut,
      transform: `scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
      pointerEvents: "none",
    }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
        padding: "28px 40px", borderRadius: 28,
        backgroundColor: "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
        border: "1px solid rgba(255, 255, 255, 0.5)", width: 680,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Img src={staticFile("logos/youtube.svg")} style={{ width: 44, height: 44 }} />
          <div style={{ fontFamily, fontWeight: 800, fontSize: 34, color: "#1A1A1A", letterSpacing: 2 }}>
            WATCH THE FULL VIDEO
          </div>
        </div>
        <div style={{ fontFamily, fontWeight: 600, fontSize: 22, color: "#888", letterSpacing: 1 }}>
          Claude Creatives — AI Content Factory Setup
        </div>
        <div style={{ width: 100, height: 3, backgroundColor: "#FF7614", borderRadius: 2 }} />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════════
export const ClipNextVideosAgenticPipeline: React.FC<{ videoSrc?: string }> = ({
  videoSrc = "videos/2026-02-22-claude-creatives/clip-next-videos-agentic-pipeline.mp4",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = getZoom(frame);

  const hookFlash     = interpolate(frame, [0, 3], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const conceptActive = CONCEPT_RANGES.some((r) => frame >= r.start && frame < r.end);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* ════ BASE VIDEO ════════════════════════════════════════ */}
      <div style={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden" }}>
        <OffthreadVideo src={staticFile(videoSrc)} volume={1}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`, transformOrigin: "center center" }} />
      </div>

      {/* ════ HOOK FLASH ════════════════════════════════════════ */}
      {hookFlash > 0 && <AbsoluteFill style={{ backgroundColor: "#FF6B00", opacity: hookFlash, zIndex: 50 }} />}

      {/* ════ 1. COMMENTS WANTED ════════════════════════════════ */}
      <Sequence from={72} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<CommentsWantedIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 2. SUPER EXCITED ══════════════════════════════════ */}
      <Sequence from={149} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<SuperExcitedIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 3. AI AGENT MANAGER ═══════════════════════════════ */}
      <Sequence from={306} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<AIAgentManagerIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 4. CLAUDE CREATIVES ═══════════════════════════════ */}
      <Sequence from={389} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ClaudeCreativesIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 5. AGENT SYSTEM ═══════════════════════════════════ */}
      <Sequence from={579} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<AgentSystemIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 6. FREE FOR YOU ═══════════════════════════════════ */}
      <Sequence from={677} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<FreeForYouIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 7. YOUR SUPPORT ═══════════════════════════════════ */}
      <Sequence from={781} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<YourSupportIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 8. SUPER IMPORTANT ════════════════════════════════ */}
      <Sequence from={949} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<SuperImportantIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 9. NEXT VIDEOS CRAZY ══════════════════════════════ */}
      <Sequence from={1020} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<NextVideosCrazyIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 10. VIDEO PLAN ════════════════════════════════════ */}
      <Sequence from={1130} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<VideoPlanIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 11. AGENTIC CLIP EXTRACTOR ════════════════════════ */}
      <Sequence from={1227} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<AgenticExtractorIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 12. WHOLE PIPELINE ════════════════════════════════ */}
      <Sequence from={1415} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<WholePipelineIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 13. CONTENT EDITING ═══════════════════════════════ */}
      <Sequence from={1542} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ContentEditingIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 14. REMOTION + CLAUDE CODE ════════════════════════ */}
      <Sequence from={1690} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<RemotionClaudeCodeIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ 15. SUPER VALUABLE ════════════════════════════════ */}
      <Sequence from={1801} durationInFrames={50} premountFor={fps}>
        <ConceptOverlay durationInFrames={50} illustration={<SuperValuableIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={800} />
      </Sequence>

      {/* ════ CTA ═══════════════════════════════════════════════ */}
      <Sequence from={1855} durationInFrames={48} premountFor={fps}>
        <CTACard />
      </Sequence>

      {/* ════ WORD-BY-WORD CAPTIONS ═════════════════════════════ */}
      <div style={{
        position: "absolute", bottom: "12%", left: 0, width: "100%", height: "10%",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 10, pointerEvents: "none",
      }}>
        {!conceptActive && WORDS.map((w) => {
          if (frame < w.frame || frame >= w.frame + w.duration) return null;
          return (
            <div key={w.id} style={{ position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{
                fontFamily, fontWeight: 800, fontSize: 72,
                color: w.emphasis ? "#FF7614" : "#FFFFFF",
                textAlign: "center", textTransform: "uppercase", letterSpacing: "0.03em",
                textShadow: w.emphasis
                  ? "0 0 20px rgba(255, 118, 20, 0.6), 0 4px 12px rgba(0,0,0,0.8)"
                  : "0 4px 12px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)",
                padding: "0 60px",
              }}>
                {w.word}
              </div>
            </div>
          );
        })}
      </div>

      {/* ════ SFX LAYER ═════════════════════════════════════════ */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={fps}>
          <Audio src={staticFile(sfx.src)} volume={sfx.volume} startFrom={0} />
        </Sequence>
      ))}

      {/* ════ BACKGROUND MUSIC ══════════════════════════════════ */}
      <Audio src={staticFile("audio/lofi-background.mp3")} volume={0.02} startFrom={0} endAt={TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};
