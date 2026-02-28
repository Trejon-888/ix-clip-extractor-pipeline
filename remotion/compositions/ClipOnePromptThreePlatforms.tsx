/**
 * Clip: One Prompt → Claude Posted to Three Platforms
 *
 * SOURCE: Pipeline clip from "Claude Creatives — AI Content Factory Setup"
 * CTA: "WATCH THE FULL VIDEO" + source title
 * Duration: ~82s (2490 frames @ 30fps)
 * Score: 81/100 (Rank #7)
 *
 * STORY: Claude Code had trouble with the codebase, so Enrique gives it context
 * about the outputs folder. Claude then writes the whole post with captions for
 * Instagram, TikTok and Threads — approved with one prompt, auto-posted.
 *
 * POP-OUTS (13 ConceptOverlay + 1 CTA):
 *   1.  CLAUDE AI         (frame   25, 55f) — Claude logo reveal
 *   2.  OUTPUTS FOLDER    (frame  450, 55f) — folder structure
 *   3.  CONTEXT GIVEN     (frame  701, 55f) — AI gaining context
 *   4.  WHOLE POST        (frame 1057, 60f) — document written by AI
 *   5.  3 PLATFORMS       (frame 1194, 60f) — Instagram+TikTok+Threads
 *   6.  TWO CAROUSELS     (frame 1298, 55f) — dual card stacks
 *   7.  APPROVED          (frame 1406, 55f) — checkmark approve
 *   8.  SHORT FORM FORMAT (frame 1638, 55f) — vertical phone reel
 *   9.  CLAUDE POSTED     (frame 1730, 65f) — auto-post moment
 *  10.  DOC + IMAGE       (frame 1826, 60f) — two carousel types
 *  11.  CLEARLY BEAUTIFUL (frame 1942, 60f) — sparkle reveal
 *  12.  FULL PACKAGE      (frame 2055, 55f) — hashtags + CTA bundle
 *  13.  DAILY WORKFLOW    (frame 2341, 55f) — workflow loop
 *  CTA: WATCH THE FULL VIDEO (frame 2430, 60f)
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
import { WORDS } from "../data/clip-one-prompt-three-platforms-words";

const { fontFamily } = loadFont();

const TOTAL_FRAMES = 2490;

function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 23,   end: 80   }, // Claude AI
  { start: 448,  end: 505  }, // Outputs Folder
  { start: 699,  end: 756  }, // Context Given
  { start: 1055, end: 1117 }, // Whole Post
  { start: 1192, end: 1254 }, // 3 Platforms
  { start: 1296, end: 1353 }, // Two Carousels
  { start: 1404, end: 1461 }, // Approved
  { start: 1636, end: 1693 }, // Short Form Format
  { start: 1728, end: 1795 }, // Claude Posted
  { start: 1824, end: 1886 }, // Doc + Image
  { start: 1940, end: 2002 }, // Clearly Beautiful
  { start: 2053, end: 2110 }, // Full Package
  { start: 2339, end: 2396 }, // Daily Workflow
  { start: 2428, end: 2490 }, // CTA
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS (J-cut: 2 frames before visual)
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  { frame: 0,    src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  { frame: 23,   src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 448,  src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 699,  src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 1055, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1192, src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 1296, src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 1404, src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 1636, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1728, src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 1824, src: "audio/pop-402324.mp3",              volume: 0.20 },
  { frame: 1940, src: "audio/whoosh-bamboo-389752.mp3",    volume: 0.18 },
  { frame: 2053, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.18 },
  { frame: 2339, src: "audio/whoosh-effect-382717.mp3",    volume: 0.18 },
  { frame: 2428, src: "audio/pop-402324.mp3",              volume: 0.18 },
];

// ═══════════════════════════════════════════════════════════════
// 1. CLAUDE AI — Logo reveal with Img
// ═══════════════════════════════════════════════════════════════
const ClaudeAIIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const logoEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });
  const textEnter = spring({ frame: Math.max(0, frame - 14), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 120 } });
  const pulse = 1 + Math.sin(frame * 0.12) * 0.03;

  return (
    <div style={{ width: size, height: size, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 * s }}>
      <div style={{ opacity: logoEnter, transform: `scale(${interpolate(logoEnter, [0, 1], [0.6, 1]) * pulse})` }}>
        <Img src={staticFile("logos/claude-ai-icon.svg")} style={{ width: 180 * s, height: 180 * s, objectFit: "contain" }} />
      </div>
      <div style={{ fontFamily, fontWeight: 900, fontSize: 38 * s, color: "#1A1A1A", letterSpacing: 3, opacity: textEnter }}>
        CLAUDE CODE
      </div>
      <div style={{ fontFamily, fontWeight: 600, fontSize: 18 * s, color: "#888", letterSpacing: 2, opacity: textEnter }}>
        #1 Coding Agent of 2026
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. OUTPUTS FOLDER — Folder tree structure
// ═══════════════════════════════════════════════════════════════
const OutputsFolderIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  const items = [
    { label: "📁 outputs/",           indent: 0, delay: 0 },
    { label: "📁 carousels/",         indent: 1, delay: 6 },
    { label: "📄 image-carousel.png", indent: 2, delay: 12 },
    { label: "📄 doc-carousel.pdf",   indent: 2, delay: 16 },
    { label: "📁 thumbnails/",        indent: 1, delay: 20 },
    { label: "📄 thumbnail-v1.png",   indent: 2, delay: 24 },
    { label: "📁 posts/",             indent: 1, delay: 28 },
    { label: "📄 captions.json",      indent: 2, delay: 32 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Terminal bg */}
      <rect x={60} y={80} width={480} height={440} rx={16} fill="#1E1E2E" />
      <circle cx={96} cy={106} r={8} fill="#FF5F56" />
      <circle cx={120} cy={106} r={8} fill="#FFBD2E" />
      <circle cx={144} cy={106} r={8} fill="#27C93F" />

      {items.map((item, i) => {
        const enter = spring({ frame: Math.max(0, frame - item.delay), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 140 } });
        return (
          <text key={i} x={100 + item.indent * 30} y={170 + i * 42}
            fontFamily="'Courier New', monospace" fontSize={16} fill={item.indent === 0 ? "#FF7614" : item.label.includes("📁") ? "#3B82F6" : "#A5A5A5"}
            opacity={enter}>
            {item.label}
          </text>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. CONTEXT GIVEN — AI brain absorbing info
// ═══════════════════════════════════════════════════════════════
const ContextGivenIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  const brainEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const infoBits = [
    { label: "📁 Folder", angle: -120, delay: 6 },
    { label: "📝 Files",  angle: -60,  delay: 10 },
    { label: "🔗 Paths",  angle: 0,    delay: 14 },
    { label: "⚙️ Config", angle: 60,   delay: 18 },
    { label: "📄 Docs",   angle: 120,  delay: 22 },
  ];

  const R = 170;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Info bits flowing in */}
      {infoBits.map((bit, i) => {
        const enter = spring({ frame: Math.max(0, frame - bit.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 130 } });
        const cx = 300 + R * Math.cos(toRad(bit.angle));
        const cy = 280 + R * Math.sin(toRad(bit.angle)) * 0.6;
        return (
          <g key={i} opacity={enter}>
            <line x1={300} y1={280} x2={cx} y2={cy} stroke="#22C55E" strokeWidth={2} strokeDasharray="4 4" opacity={0.5} />
            <rect x={cx - 45} y={cy - 18} width={90} height={36} rx={10} fill="white" stroke="#E5E5E5" strokeWidth={1.5} />
            <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={12} fill="#444">
              {bit.label}
            </text>
          </g>
        );
      })}

      {/* Central AI brain */}
      <g opacity={brainEnter} transform={`translate(300, 280) scale(${brainEnter})`}>
        <circle cx={0} cy={0} r={58} fill="#FF7614" />
        <text x={0} y={-6} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={18} fill="white">AI</text>
        <text x={0} y={16} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={13} fill="rgba(255,255,255,0.85)">CONTEXT</text>
      </g>

      <text x={300} y={500} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={20} fill="#1A1A1A" letterSpacing={2}
        opacity={spring({ frame: Math.max(0, frame - 28), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })}>
        CONTEXT ACQUIRED
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. WHOLE POST WRITTEN — Document filled by AI
// ═══════════════════════════════════════════════════════════════
const WholePostIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  const docEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  const lines = [
    { w: 280, delay: 8  },
    { w: 220, delay: 12 },
    { w: 260, delay: 16 },
    { w: 190, delay: 20 },
    { w: 240, delay: 24 },
    { w: 160, delay: 28 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Document card */}
      <g opacity={docEnter} transform={`translate(300, 260) scale(${interpolate(docEnter, [0, 1], [0.85, 1])})`}>
        <rect x={-180} y={-180} width={360} height={400} rx={16} fill="white"
          style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.1))" }} />
        {/* Header stripe */}
        <rect x={-180} y={-180} width={360} height={60} rx={16} fill="#FF7614" />
        <rect x={-180} y={-140} width={360} height={20} fill="#FF7614" />
        <text x={0} y={-142} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={18} fill="white" letterSpacing={2}>
          POST CONTENT
        </text>

        {/* Text lines filling in */}
        {lines.map((ln, i) => {
          const fillProgress = interpolate(Math.max(0, frame - ln.delay), [0, 12], [0, 1], { extrapolateRight: "clamp" });
          return (
            <g key={i}>
              <rect x={-140} y={-90 + i * 50} width={ln.w} height={14} rx={7} fill="#F0F0F0" />
              <rect x={-140} y={-90 + i * 50} width={ln.w * fillProgress} height={14} rx={7} fill="#FF7614" opacity={0.25} />
            </g>
          );
        })}

        {/* AI badge */}
        <g opacity={spring({ frame: Math.max(0, frame - 34), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } })}>
          <rect x={70} y={160} width={90} height={32} rx={8} fill="#22C55E" />
          <text x={115} y={181} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={13} fill="white">✓ AI</text>
        </g>
      </g>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. 3 PLATFORMS — Instagram + TikTok + Threads logos
// ═══════════════════════════════════════════════════════════════
const ThreePlatformsIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const logos = [
    { src: "logos/instagram.svg", label: "Instagram", delay: 0  },
    { src: "logos/tiktok.svg",    label: "TikTok",    delay: 8  },
    { src: "logos/threads.svg",   label: "Threads",   delay: 16 },
  ];

  const labelEnter = spring({ frame: Math.max(0, frame - 26), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      {logos.map((logo, i) => {
        const enter = spring({ frame: Math.max(0, frame - logo.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 130 } });
        const x = [110, 300, 490][i];
        return (
          <div key={i} style={{
            position: "absolute",
            left: x * s - 55 * s,
            top: 200 * s,
            width: 110 * s, height: 110 * s,
            opacity: enter,
            transform: `scale(${enter})`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 8 * s,
            backgroundColor: "white",
            borderRadius: 22 * s,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}>
            <Img src={staticFile(logo.src)} style={{ width: 60 * s, height: 60 * s, objectFit: "contain" }} />
          </div>
        );
      })}
      {logos.map((logo, i) => {
        const enter = spring({ frame: Math.max(0, frame - logo.delay - 4), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 130 } });
        const x = [110, 300, 490][i];
        return (
          <div key={`label-${i}`} style={{
            position: "absolute", left: (x - 50) * s, top: 330 * s,
            width: 100 * s, textAlign: "center",
            fontFamily, fontWeight: 700, fontSize: 14 * s, color: "#555",
            opacity: enter,
          }}>
            {logo.label}
          </div>
        );
      })}
      <div style={{
        position: "absolute", bottom: 90 * s, left: 0, width: "100%",
        textAlign: "center", fontFamily, fontWeight: 900,
        fontSize: 26 * s, color: "#1A1A1A", letterSpacing: 3, opacity: labelEnter,
      }}>
        3 PLATFORMS
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. TWO CAROUSELS — Dual card stacks
// ═══════════════════════════════════════════════════════════════
const TwoCarouselsIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  const leftEnter  = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const rightEnter = spring({ frame: Math.max(0, frame - 10), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Left stack: Doc carousel */}
      <g opacity={leftEnter} transform={`translate(180, 250) scale(${leftEnter})`}>
        <rect x={-80} y={-100} width={160} height={200} rx={12} fill="#E5E7EB" transform="rotate(-5)" />
        <rect x={-80} y={-100} width={160} height={200} rx={12} fill="#F5F5F5" transform="rotate(-2)" />
        <rect x={-80} y={-100} width={160} height={200} rx={12} fill="white" stroke="#3B82F6" strokeWidth={2} />
        <rect x={-55} y={-70} width={110} height={10} rx={5} fill="#3B82F6" opacity={0.3} />
        <rect x={-55} y={-50} width={80}  height={8}  rx={4} fill="#E5E5E5" />
        <rect x={-55} y={-34} width={95}  height={8}  rx={4} fill="#E5E5E5" />
        <rect x={-55} y={-18} width={70}  height={8}  rx={4} fill="#E5E5E5" />
        <text x={0} y={130} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={14} fill="#3B82F6">DOCUMENT</text>
      </g>

      {/* Right stack: Image carousel */}
      <g opacity={rightEnter} transform={`translate(420, 250) scale(${rightEnter})`}>
        <rect x={-80} y={-100} width={160} height={200} rx={12} fill="#E5E7EB" transform="rotate(5)" />
        <rect x={-80} y={-100} width={160} height={200} rx={12} fill="#F5F5F5" transform="rotate(2)" />
        <rect x={-80} y={-100} width={160} height={200} rx={12} fill="white" stroke="#FF7614" strokeWidth={2} />
        <rect x={-55} y={-70} width={110} height={80} rx={8} fill="#FF7614" opacity={0.15} />
        <circle cx={-20} cy={-20} r={15} fill="#FF7614" opacity={0.3} />
        <polygon points="-40,10 40,10 0,-30" fill="#FF7614" opacity={0.2} />
        <text x={0} y={130} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={14} fill="#FF7614">IMAGE</text>
      </g>

      {/* Plus sign */}
      <text x={300} y={260} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={36} fill="#ABABAB"
        opacity={spring({ frame: Math.max(0, frame - 6), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 120 } })}>
        +
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 7. APPROVED — Big checkmark with approve button
// ═══════════════════════════════════════════════════════════════
const ApprovedIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const circleEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 100 } });
  const checkEnter  = spring({ frame: Math.max(0, frame - 12), fps: 30, from: 0, to: 1, config: { damping: 8, stiffness: 160 } });
  const btnEnter    = spring({ frame: Math.max(0, frame - 24), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Green circle */}
      <circle cx={300} cy={260} r={120 * circleEnter} fill="#22C55E" />

      {/* Checkmark */}
      <g opacity={checkEnter}>
        <polyline points="240,260 280,305 370,210" fill="none"
          stroke="white" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Approve button */}
      <g opacity={btnEnter} transform={`translate(300, 440) scale(${btnEnter})`}>
        <rect x={-110} y={-24} width={220} height={48} rx={24} fill="#1A1A1A" />
        <text x={0} y={6} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={18} fill="white" letterSpacing={2}>
          APPROVED ✓
        </text>
      </g>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 8. SHORT FORM FORMAT — Vertical phone with reel
// ═══════════════════════════════════════════════════════════════
const ShortFormFormatIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const phoneEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const contentEnter = spring({ frame: Math.max(0, frame - 10), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Phone frame */}
      <g opacity={phoneEnter} transform={`translate(300, 300) scale(${interpolate(phoneEnter, [0, 1], [0.8, 1])})`}>
        <rect x={-100} y={-200} width={200} height={400} rx={24} fill="#1A1A1A" stroke="#333" strokeWidth={3} />
        {/* Screen */}
        <rect x={-85} y={-180} width={170} height={360} rx={12} fill="#FF7614" opacity={0.1} />
        {/* Play icon */}
        <g opacity={contentEnter}>
          <circle cx={0} cy={-30} r={30} fill="white" opacity={0.9} />
          <polygon points="10,-50 10,-10 35,-30" fill="#FF7614" />
          {/* Caption lines */}
          <rect x={-60} y={90} width={120} height={10} rx={5} fill="white" opacity={0.6} />
          <rect x={-45} y={110} width={90} height={8} rx={4} fill="white" opacity={0.4} />
          {/* Format label */}
          <rect x={-50} y={130} width={100} height={26} rx={6} fill="#FF7614" />
          <text x={0} y={148} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={12} fill="white">
            9:16 SHORT
          </text>
        </g>
      </g>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 9. CLAUDE POSTED — Key moment: auto-post
// ═══════════════════════════════════════════════════════════════
const ClaudePostedIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const centerEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 110 } });

  const platforms = [
    { src: "logos/instagram.svg", angle: -60, delay: 10 },
    { src: "logos/tiktok.svg",    angle: 0,   delay: 16 },
    { src: "logos/threads.svg",   angle: 60,  delay: 22 },
  ];

  const R = 160;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      {/* Central Claude logo */}
      <div style={{
        position: "absolute",
        left: 300 * s - 55 * s, top: 260 * s - 55 * s,
        width: 110 * s, height: 110 * s,
        opacity: centerEnter, transform: `scale(${centerEnter})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: "50%", backgroundColor: "#FF7614",
      }}>
        <Img src={staticFile("logos/claude-ai-icon.svg")} style={{ width: 70 * s, height: 70 * s, objectFit: "contain" }} />
      </div>

      {/* Arrow + platform logos */}
      {platforms.map((p, i) => {
        const enter = spring({ frame: Math.max(0, frame - p.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 130 } });
        const cx = 300 + R * Math.cos(toRad(p.angle));
        const cy = 260 + R * Math.sin(toRad(p.angle)) * 0.7;
        return (
          <div key={i} style={{
            position: "absolute",
            left: cx * s - 35 * s, top: cy * s - 35 * s,
            width: 70 * s, height: 70 * s,
            opacity: enter, transform: `scale(${enter})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "white", borderRadius: 16 * s,
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          }}>
            <Img src={staticFile(p.src)} style={{ width: 44 * s, height: 44 * s, objectFit: "contain" }} />
          </div>
        );
      })}

      {/* "POSTED" label */}
      <div style={{
        position: "absolute", bottom: 80 * s, left: 0, width: "100%",
        textAlign: "center", fontFamily, fontWeight: 900,
        fontSize: 28 * s, color: "#22C55E", letterSpacing: 3,
        opacity: spring({ frame: Math.max(0, frame - 28), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } }),
      }}>
        ✓ AUTO-POSTED
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 10. DOC + IMAGE — Two carousel types side by side
// ═══════════════════════════════════════════════════════════════
const DocImageIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const leftEnter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 130 } });
  const rightEnter = spring({ frame: Math.max(0, frame - 8), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 130 } });

  return (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 * s }}>
      {/* Document carousel card */}
      <div style={{
        width: 200 * s, height: 260 * s, borderRadius: 18 * s,
        backgroundColor: "white", border: `2.5px solid #3B82F6`,
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 12 * s,
        opacity: leftEnter, transform: `scale(${leftEnter})`,
      }}>
        <div style={{ fontSize: 48 * s }}>📄</div>
        <div style={{ fontFamily, fontWeight: 800, fontSize: 16 * s, color: "#3B82F6" }}>DOCUMENT</div>
        <div style={{ fontFamily, fontWeight: 600, fontSize: 12 * s, color: "#999" }}>Carousel</div>
      </div>

      {/* Image carousel card */}
      <div style={{
        width: 200 * s, height: 260 * s, borderRadius: 18 * s,
        backgroundColor: "white", border: `2.5px solid #FF7614`,
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 12 * s,
        opacity: rightEnter, transform: `scale(${rightEnter})`,
      }}>
        <div style={{ fontSize: 48 * s }}>🖼️</div>
        <div style={{ fontFamily, fontWeight: 800, fontSize: 16 * s, color: "#FF7614" }}>IMAGE</div>
        <div style={{ fontFamily, fontWeight: 600, fontSize: 12 * s, color: "#999" }}>Carousel</div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 11. CLEARLY BEAUTIFUL — Sparkle burst
// ═══════════════════════════════════════════════════════════════
const ClearlyBeautifulIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const enter = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 100 } });
  const pulse = 1 + Math.sin(frame * 0.18) * 0.04;

  const rays = Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30,
    r1: 60, r2: 90 + (i % 2) * 30,
  }));

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Sparkle rays */}
      {rays.map((ray, i) => {
        const twinkle = Math.abs(Math.sin((frame + i * 7) * 0.14));
        const rad = (ray.angle * Math.PI) / 180;
        return (
          <line key={i}
            x1={300 + ray.r1 * Math.cos(rad)} y1={280 + ray.r1 * Math.sin(rad)}
            x2={300 + ray.r2 * Math.cos(rad)} y2={280 + ray.r2 * Math.sin(rad)}
            stroke="#FFB800" strokeWidth={3} opacity={twinkle * enter} strokeLinecap="round" />
        );
      })}

      {/* Central circle */}
      <g opacity={enter} transform={`translate(300, 280) scale(${enter * pulse})`}>
        <circle cx={0} cy={0} r={52} fill="#FFB800" />
        <text x={0} y={12} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={28} fill="white">✨</text>
      </g>

      <text x={300} y={420} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={28 * s} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 16), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })}
        letterSpacing={3}>
        BEAUTIFUL
      </text>
      <text x={300} y={460} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={16 * s} fill="#888"
        opacity={spring({ frame: Math.max(0, frame - 22), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })}
        letterSpacing={2}>
        TITLE · DESCRIPTION · HASHTAGS · CTA
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 12. FULL PACKAGE — Bundled output: title+desc+hashtags+CTA
// ═══════════════════════════════════════════════════════════════
const FullPackageIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  const items = [
    { label: "Title",       icon: "📝", delay: 0,  color: "#FF7614" },
    { label: "Description", icon: "📋", delay: 6,  color: "#3B82F6" },
    { label: "Hashtags",    icon: "#️⃣",  delay: 12, color: "#22C55E" },
    { label: "Call to Action", icon: "🎯", delay: 18, color: "#A855F7" },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {items.map((item, i) => {
        const enter = spring({ frame: Math.max(0, frame - item.delay), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 140 } });
        const y = 120 + i * 105;
        return (
          <g key={i} opacity={enter} transform={`translate(${interpolate(enter, [0, 1], [-30, 0])}, 0)`}>
            <rect x={100} y={y} width={400} height={80} rx={16} fill="white" stroke={item.color} strokeWidth={2}
              style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }} />
            <text x={140} y={y + 48} fontFamily="Inter, sans-serif" fontSize={24}>{item.icon}</text>
            <text x={180} y={y + 48} fontFamily="Inter, sans-serif" fontWeight={700} fontSize={18} fill="#1A1A1A">
              {item.label}
            </text>
            <circle cx={460} cy={y + 40} r={16} fill={item.color} />
            <text x={460} y={y + 46} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={14} fill="white">✓</text>
          </g>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 13. DAILY WORKFLOW — Circular loop
// ═══════════════════════════════════════════════════════════════
const DailyWorkflowIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const steps = [
    { label: "Prompt", angle: -90,  delay: 0  },
    { label: "Create", angle: -18,  delay: 6  },
    { label: "Review", angle: 54,   delay: 12 },
    { label: "Approve",angle: 126,  delay: 18 },
    { label: "Post",   angle: 198,  delay: 24 },
  ];

  const R = 150;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Circular path */}
      <circle cx={300} cy={290} r={R} fill="none" stroke="#F0F0F0" strokeWidth={4} />

      {/* Rotating indicator */}
      {(() => {
        const angle = ((frame * 1.5) % 360) - 90;
        const rad = toRad(angle);
        const x = 300 + R * Math.cos(rad);
        const y = 290 + R * Math.sin(rad);
        return <circle cx={x} cy={y} r={8} fill="#FF7614" />;
      })()}

      {/* Step nodes */}
      {steps.map((step, i) => {
        const enter = spring({ frame: Math.max(0, frame - step.delay), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 140 } });
        const rad = toRad(step.angle);
        const cx = 300 + R * Math.cos(rad);
        const cy = 290 + R * Math.sin(rad);
        return (
          <g key={i} opacity={enter}>
            <circle cx={cx} cy={cy} r={32} fill={i === 4 ? "#FF7614" : "white"} stroke={i === 4 ? "#E06610" : "#E5E5E5"} strokeWidth={2} />
            <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize={11}
              fill={i === 4 ? "white" : "#555"}>
              {step.label}
            </text>
          </g>
        );
      })}

      <text x={300} y={500} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={22 * s} fill="#1A1A1A"
        opacity={spring({ frame: Math.max(0, frame - 30), fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } })}
        letterSpacing={2}>
        DAILY WORKFLOW
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
  const fadeOut = interpolate(frame, [48, 60], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
export const ClipOnePromptThreePlatforms: React.FC<{ videoSrc?: string }> = ({
  videoSrc = "videos/2026-02-22-claude-creatives/clip-one-prompt-three-platforms.mp4",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = getZoom(frame);

  const hookFlash    = interpolate(frame, [0, 3], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const conceptActive = CONCEPT_RANGES.some((r) => frame >= r.start && frame < r.end);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* ── BASE VIDEO ───────────────────────────────────────── */}
      <div style={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden" }}>
        <OffthreadVideo
          src={staticFile(videoSrc)}
          volume={1}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`, transformOrigin: "center center" }}
        />
      </div>

      {/* ── HOOK FLASH ───────────────────────────────────────── */}
      {hookFlash > 0 && (
        <AbsoluteFill style={{ backgroundColor: "#FF6B00", opacity: hookFlash, zIndex: 50 }} />
      )}

      {/* ════ 1. CLAUDE AI — frame 25, 55f ══════════════════════ */}
      <Sequence from={25} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ClaudeAIIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={580} />
      </Sequence>

      {/* ════ 2. OUTPUTS FOLDER — frame 450, 55f ════════════════ */}
      <Sequence from={450} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<OutputsFolderIllustration />}
          caption="OUTPUTS FOLDER" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 3. CONTEXT GIVEN — frame 701, 55f ═════════════════ */}
      <Sequence from={701} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ContextGivenIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 4. WHOLE POST — frame 1057, 60f ═══════════════════ */}
      <Sequence from={1057} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<WholePostIllustration />}
          caption="WHOLE POST WRITTEN" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 5. 3 PLATFORMS — frame 1194, 60f ══════════════════ */}
      <Sequence from={1194} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<ThreePlatformsIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 6. TWO CAROUSELS — frame 1298, 55f ════════════════ */}
      <Sequence from={1298} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<TwoCarouselsIllustration />}
          caption="TWO CAROUSELS" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 7. APPROVED — frame 1406, 55f ═════════════════════ */}
      <Sequence from={1406} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ApprovedIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 8. SHORT FORM FORMAT — frame 1638, 55f ════════════ */}
      <Sequence from={1638} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<ShortFormFormatIllustration />}
          caption="SHORT FORM FORMAT" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 9. CLAUDE POSTED — frame 1730, 65f ════════════════ */}
      <Sequence from={1730} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay durationInFrames={65} illustration={<ClaudePostedIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 10. DOC + IMAGE — frame 1826, 60f ═════════════════ */}
      <Sequence from={1826} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<DocImageIllustration />}
          caption="DOC + IMAGE CAROUSEL" entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={580} />
      </Sequence>

      {/* ════ 11. CLEARLY BEAUTIFUL — frame 1942, 60f ═══════════ */}
      <Sequence from={1942} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay durationInFrames={60} illustration={<ClearlyBeautifulIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ 12. FULL PACKAGE — frame 2055, 55f ════════════════ */}
      <Sequence from={2055} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<FullPackageIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={620} />
      </Sequence>

      {/* ════ 13. DAILY WORKFLOW — frame 2341, 55f ══════════════ */}
      <Sequence from={2341} durationInFrames={55} premountFor={fps}>
        <ConceptOverlay durationInFrames={55} illustration={<DailyWorkflowIllustration />}
          entrance="clip-circle" backgroundStyle="solid-white" illustrationSize={600} />
      </Sequence>

      {/* ════ CTA — frame 2430, 60f ══════════════════════════════ */}
      <Sequence from={2430} durationInFrames={60} premountFor={fps}>
        <CTACard />
      </Sequence>

      {/* ════ WORD-BY-WORD CAPTIONS ══════════════════════════════ */}
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

      {/* ════ SFX LAYER ══════════════════════════════════════════ */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={fps}>
          <Audio src={staticFile(sfx.src)} volume={sfx.volume} startFrom={0} />
        </Sequence>
      ))}

      {/* ════ BACKGROUND MUSIC ═══════════════════════════════════ */}
      <Audio src={staticFile("audio/lofi-background.mp3")} volume={0.02} startFrom={0} endAt={TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};
