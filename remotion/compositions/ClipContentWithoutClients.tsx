/**
 * Clip: Content Without Clients Is Pointless — IX System Reveal
 *
 * SOURCE: Pipeline clip extracted from "Claude Creatives — AI Content Factory Setup"
 * CTA: "WATCH THE FULL VIDEO" + source title
 * Duration: 65.9s (1977 frames @ 30fps)
 * Score: 87/100 (Rank #1)
 *
 * STORY: "What's the point of creating all this content if you don't have
 * an actual pipeline bringing you clients?" — reveals the iX system:
 * AI client acquisition, $4B PE firms, 20+ partners worldwide.
 *
 * ALL POP-OUTS (13 ConceptOverlay + 1 CTA):
 *   1.  "CONTENT WITHOUT CLIENTS" (frame 85, 75f) — Content pile, no pipeline
 *   2.  "IX SYSTEM" (frame 318, 50f) — INFINITX logo
 *   3.  "AI CLIENT ACQUISITION" (frame 394, 75f) — Acquisition funnel
 *   4.  "FIND TARGET BUYER" (frame 496, 50f) — Target crosshair
 *   5.  "WRITES YOUR OUTREACH" (frame 570, 50f) — Outreach messages
 *   6.  "HANDLES CONVERSATIONS" (frame 689, 50f) — Chat bubbles
 *   7.  "BOOKS APPOINTMENTS" (frame 742, 70f) — Calendar booking
 *   8.  "PROVEN SYSTEM" (frame 916, 50f) — Shield trust badge
 *   9.  "$4 BILLION" (frame 1060, 75f) — Count-up metric
 *  10.  "20+ PARTNERS" (frame 1215, 60f) — Globe with nodes
 *  11.  "FREE SETUP GUIDE" (frame 1432, 65f) — Download guide
 *  12.  "PARTNER CASE STUDY" (frame 1636, 50f) — Case study card
 *  13.  "IX OUTREACH CAMPAIGN" (frame 1746, 50f) — Campaign launch
 *  CTA: "WATCH THE FULL VIDEO" (frame 1900, 65f)
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
import { WORDS } from "../data/clip-content-without-clients-words";

const { fontFamily } = loadFont();

const TOTAL_FRAMES = 1977;

function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 85, end: 160 },    // Content Without Clients
  { start: 318, end: 368 },   // IX System
  { start: 394, end: 469 },   // AI Client Acquisition
  { start: 496, end: 546 },   // Find Target Buyer
  { start: 570, end: 620 },   // Writes Your Outreach
  { start: 689, end: 739 },   // Handles Conversations
  { start: 742, end: 812 },   // Books Appointments
  { start: 916, end: 966 },   // Proven System
  { start: 1060, end: 1135 }, // $4 Billion
  { start: 1215, end: 1275 }, // 20+ Partners
  { start: 1432, end: 1497 }, // Free Setup Guide
  { start: 1636, end: 1686 }, // Partner Case Study
  { start: 1746, end: 1796 }, // IX Outreach Campaign
  { start: 1900, end: 1965 }, // CTA
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS (J-cut: audio 2-3 frames before visual)
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  { frame: 83, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  { frame: 316, src: "audio/pop-402324.mp3", volume: 0.20 },
  { frame: 392, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  { frame: 494, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
  { frame: 568, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.18 },
  { frame: 687, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 740, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  { frame: 914, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 1058, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  { frame: 1213, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  { frame: 1430, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.16 },
  { frame: 1634, src: "audio/pop-402324.mp3", volume: 0.18 },
  { frame: 1744, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
  { frame: 1898, src: "audio/whoosh-effect-382717.mp3", volume: 0.16 },
];

// ═══════════════════════════════════════════════════════════════
// 1. CONTENT WITHOUT CLIENTS — Content pile disconnected from pipeline
// ═══════════════════════════════════════════════════════════════
const ContentWithoutClientsIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const items = [
    { label: "Posts", icon: "📄", delay: 0, x: 140, y: 150 },
    { label: "Reels", icon: "🎬", delay: 4, x: 300, y: 120 },
    { label: "Carousels", icon: "📊", delay: 8, x: 460, y: 150 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Content pile */}
      {items.map((item, i) => {
        const enter = spring({
          frame: Math.max(0, frame - item.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 160 },
        });
        return (
          <g
            key={i}
            opacity={enter}
            transform={`translate(${item.x}, ${item.y}) scale(${enter})`}
          >
            <rect
              x={-55 * s}
              y={-40 * s}
              width={110 * s}
              height={80 * s}
              rx={12 * s}
              fill="#F5F5F5"
              stroke="#DDD"
              strokeWidth={2}
            />
            <text
              x={0}
              y={5 * s}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={700}
              fontSize={14 * s}
              fill="#888"
            >
              {item.label}
            </text>
          </g>
        );
      })}

      {/* Broken arrow (disconnect) */}
      {(() => {
        const arrowEnter = spring({
          frame: Math.max(0, frame - 14),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 100 },
        });
        return (
          <g opacity={arrowEnter}>
            <line
              x1={200}
              y1={270}
              x2={280}
              y2={310}
              stroke="#EF4444"
              strokeWidth={3}
              strokeDasharray="8 6"
            />
            <line
              x1={320}
              y1={310}
              x2={400}
              y2={270}
              stroke="#EF4444"
              strokeWidth={3}
              strokeDasharray="8 6"
            />
            {/* X mark in the middle */}
            <circle cx={300} cy={310} r={22} fill="#FEE2E2" stroke="#EF4444" strokeWidth={2} />
            <path d="M290 300L310 320M310 300L290 320" stroke="#EF4444" strokeWidth={3} strokeLinecap="round" />
          </g>
        );
      })()}

      {/* Empty pipeline */}
      {(() => {
        const pipeEnter = spring({
          frame: Math.max(0, frame - 20),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 100 },
        });
        return (
          <g opacity={pipeEnter}>
            <rect
              x={180}
              y={370}
              width={240}
              height={100}
              rx={16}
              fill="#FAFAFA"
              stroke="#E5E5E5"
              strokeWidth={2}
              strokeDasharray="10 5"
            />
            <text
              x={300}
              y={415}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={700}
              fontSize={16}
              fill="#CCC"
            >
              NO CLIENTS
            </text>
            <text
              x={300}
              y={445}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={500}
              fontSize={13}
              fill="#DDD"
            >
              Pipeline empty
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. IX SYSTEM — INFINITX logo
// ═══════════════════════════════════════════════════════════════
const IXSystemIllustration: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const enter = spring({
    frame: Math.max(0, frame - 3),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });
  const s = size / 600;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${enter})`,
        opacity: enter,
      }}
    >
      <div
        style={{
          padding: 40 * s,
          borderRadius: 32 * s,
          backgroundColor: "#F8F8F8",
          boxShadow: `0 ${6 * s}px ${30 * s}px rgba(0,0,0,0.08)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile("infinitx-logo.png")}
          style={{ width: 280 * s, height: 280 * s, objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. AI CLIENT ACQUISITION — Funnel with AI badge
// ═══════════════════════════════════════════════════════════════
const AcquisitionFunnelIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const stages = [
    { label: "PROSPECTS", width: 380, y: 140, delay: 3, color: "#FFE4CC" },
    { label: "QUALIFIED", width: 280, y: 230, delay: 7, color: "#FFD0A3" },
    { label: "MEETINGS", width: 180, y: 320, delay: 11, color: "#FFBC7A" },
    { label: "CLIENTS", width: 120, y: 410, delay: 15, color: "#FF7614" },
  ];

  const badgeScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* AI Badge */}
      <g
        transform={`translate(300, 70) scale(${badgeScale})`}
        opacity={badgeScale}
      >
        <circle cx={0} cy={0} r={35} fill="#FF7614" />
        <text
          x={0}
          y={7}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight={900}
          fontSize={22}
          fill="white"
        >
          AI
        </text>
      </g>

      {/* Funnel stages */}
      {stages.map((stage, i) => {
        const enter = spring({
          frame: Math.max(0, frame - stage.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 120 },
        });
        const x = 300 - stage.width / 2;
        const isLast = i === stages.length - 1;
        return (
          <g key={i} opacity={enter}>
            <rect
              x={x}
              y={stage.y}
              width={stage.width * enter}
              height={60}
              rx={12}
              fill={stage.color}
              stroke={isLast ? "#E06610" : "none"}
              strokeWidth={isLast ? 2 : 0}
            />
            <text
              x={300}
              y={stage.y + 37}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={700}
              fontSize={isLast ? 18 : 15}
              fill={isLast ? "#FFFFFF" : "#995200"}
              opacity={enter}
            >
              {stage.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. FIND TARGET BUYER — Crosshair target
// ═══════════════════════════════════════════════════════════════
const TargetBuyerIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const ringScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });

  const crosshairProgress = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Outer ring */}
      <circle
        cx={300}
        cy={280}
        r={180 * ringScale}
        stroke="#FF7614"
        strokeWidth={3}
        fill="none"
        opacity={0.3}
      />
      {/* Middle ring */}
      <circle
        cx={300}
        cy={280}
        r={120 * ringScale}
        stroke="#FF7614"
        strokeWidth={3}
        fill="none"
        opacity={0.5}
      />
      {/* Inner ring */}
      <circle
        cx={300}
        cy={280}
        r={60 * ringScale}
        stroke="#FF7614"
        strokeWidth={4}
        fill="rgba(255,118,20,0.08)"
      />
      {/* Center dot */}
      <circle cx={300} cy={280} r={12 * ringScale} fill="#FF7614" />

      {/* Crosshairs */}
      <line
        x1={300}
        y1={280 - 200 * crosshairProgress}
        x2={300}
        y2={280 + 200 * crosshairProgress}
        stroke="#1A1A1A"
        strokeWidth={2}
        opacity={0.4}
      />
      <line
        x1={300 - 200 * crosshairProgress}
        y1={280}
        x2={300 + 200 * crosshairProgress}
        y2={280}
        stroke="#1A1A1A"
        strokeWidth={2}
        opacity={0.4}
      />

      {/* Label */}
      <text
        x={300}
        y={510}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight={700}
        fontSize={18}
        fill="#888"
        opacity={ringScale}
      >
        TARGET IDENTIFIED
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. WRITES YOUR OUTREACH — Email/message cards
// ═══════════════════════════════════════════════════════════════
const OutreachCopyIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const messages = [
    { x: 120, y: 160, delay: 0, w: 360 },
    { x: 150, y: 270, delay: 5, w: 320 },
    { x: 170, y: 380, delay: 10, w: 280 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {messages.map((msg, i) => {
        const enter = spring({
          frame: Math.max(0, frame - msg.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 150 },
        });
        return (
          <g
            key={i}
            opacity={enter}
            transform={`translate(${interpolate(enter, [0, 1], [30, 0])}, 0)`}
          >
            <rect
              x={msg.x}
              y={msg.y}
              width={msg.w}
              height={75}
              rx={14}
              fill="#F8F8F8"
              stroke="#E5E5E5"
              strokeWidth={1.5}
            />
            {/* Envelope icon */}
            <rect
              x={msg.x + 18}
              y={msg.y + 22}
              width={32}
              height={24}
              rx={4}
              fill="none"
              stroke="#FF7614"
              strokeWidth={2}
            />
            <path
              d={`M${msg.x + 18} ${msg.y + 22}L${msg.x + 34} ${msg.y + 36}L${msg.x + 50} ${msg.y + 22}`}
              stroke="#FF7614"
              strokeWidth={2}
              fill="none"
            />
            {/* Text lines */}
            <rect
              x={msg.x + 66}
              y={msg.y + 26}
              width={msg.w - 100}
              height={8}
              rx={4}
              fill="#DDD"
            />
            <rect
              x={msg.x + 66}
              y={msg.y + 42}
              width={(msg.w - 100) * 0.7}
              height={8}
              rx={4}
              fill="#E8E8E8"
            />
          </g>
        );
      })}

      {/* AI writing indicator */}
      {(() => {
        const cursorBlink = interpolate(frame % 20, [0, 10, 20], [1, 0, 1]);
        const aiEnter = spring({
          frame: Math.max(0, frame - 15),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 140 },
        });
        return (
          <g opacity={aiEnter}>
            <circle cx={480} cy={470} r={28} fill="#FF7614" />
            <text
              x={480}
              y={477}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={800}
              fontSize={18}
              fill="white"
            >
              AI
            </text>
            <rect
              x={440}
              y={425}
              width={3}
              height={18}
              fill="#FF7614"
              opacity={cursorBlink}
            />
          </g>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. HANDLES CONVERSATIONS — Chat bubbles
// ═══════════════════════════════════════════════════════════════
const ConversationsIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const bubbles = [
    { x: 160, y: 180, w: 220, align: "left", delay: 0, text: "Hey, I saw your..." },
    { x: 250, y: 290, w: 240, align: "right", delay: 6, text: "Great to hear! Let me..." },
    { x: 140, y: 400, w: 200, align: "left", delay: 12, text: "When can we meet?" },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {bubbles.map((b, i) => {
        const enter = spring({
          frame: Math.max(0, frame - b.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 160 },
        });
        const isRight = b.align === "right";
        return (
          <g
            key={i}
            opacity={enter}
            transform={`translate(0, ${interpolate(enter, [0, 1], [15, 0])})`}
          >
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={60}
              rx={20}
              fill={isRight ? "#FF7614" : "#F0F0F0"}
            />
            <text
              x={b.x + b.w / 2}
              y={b.y + 36}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={600}
              fontSize={15}
              fill={isRight ? "#FFFFFF" : "#555"}
            >
              {b.text}
            </text>
          </g>
        );
      })}

      {/* AI handling badge */}
      {(() => {
        const badgeEnter = spring({
          frame: Math.max(0, frame - 18),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 140 },
        });
        return (
          <g opacity={badgeEnter} transform={`scale(${badgeEnter})`}>
            <rect x={370} y={410} width={140} height={44} rx={22} fill="#FF7614" />
            <text
              x={440}
              y={438}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight={700}
              fontSize={16}
              fill="white"
            >
              AI HANDLED
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 7. BOOKS APPOINTMENTS — Calendar with slots filling
// ═══════════════════════════════════════════════════════════════
const BookAppointmentsIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const calScale = spring({
    frame,
    fps: 30,
    from: 0.6,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  const slots = [
    { label: "10:00 AM", delay: 5 },
    { label: "2:00 PM", delay: 10 },
    { label: "4:30 PM", delay: 15 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g transform={`translate(300, 300) scale(${calScale}) translate(-300, -300)`}>
        {/* Calendar frame */}
        <rect x={130} y={100} width={340} height={400} rx={20} fill="#FAFAFA" stroke="#E5E5E5" strokeWidth={2} />
        <rect x={130} y={100} width={340} height={70} rx={20} fill="#FF7614" />
        <rect x={130} y={150} width={340} height={20} fill="#FF7614" />
        <text
          x={300}
          y={148}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight={800}
          fontSize={24}
          fill="white"
        >
          CALENDAR
        </text>

        {/* Appointment slots */}
        {slots.map((slot, i) => {
          const slotEnter = spring({
            frame: Math.max(0, frame - slot.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 160 },
          });
          const y = 200 + i * 85;
          return (
            <g key={i} opacity={slotEnter}>
              <rect
                x={155}
                y={y}
                width={290}
                height={60}
                rx={12}
                fill={`rgba(255, 118, 20, ${0.08 + slotEnter * 0.12})`}
                stroke="#FF7614"
                strokeWidth={1.5}
              />
              <text
                x={185}
                y={y + 36}
                fontFamily="Inter, sans-serif"
                fontWeight={700}
                fontSize={17}
                fill="#FF7614"
              >
                {slot.label}
              </text>
              {/* Checkmark */}
              <circle cx={410} cy={y + 30} r={14} fill="#22C55E" opacity={slotEnter} />
              <path
                d={`M${402} ${y + 30}L${408} ${y + 36}L${418} ${y + 24}`}
                stroke="white"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 8. PROVEN SYSTEM — Shield with trust checkmark
// ═══════════════════════════════════════════════════════════════
const ProvenSystemIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const shieldScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  const checkDraw = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g
        transform={`translate(300, 280) scale(${shieldScale}) translate(-300, -280)`}
      >
        {/* Shield */}
        <path
          d="M300 100C300 100 180 150 180 280C180 410 300 500 300 500C300 500 420 410 420 280C420 150 300 100 300 100Z"
          fill="#FF7614"
          stroke="#E06610"
          strokeWidth={3}
        />
        {/* Inner shield */}
        <path
          d="M300 140C300 140 210 180 210 280C210 380 300 450 300 450C300 450 390 380 390 280C390 180 300 140 300 140Z"
          fill="white"
          opacity={0.2}
        />
        {/* Checkmark */}
        <path
          d={`M260 280L290 310L340 250`}
          stroke="white"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray={120}
          strokeDashoffset={120 * (1 - checkDraw)}
        />
      </g>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 9. $4 BILLION — Count-up metric
// ═══════════════════════════════════════════════════════════════
const FourBillionIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const countUp = interpolate(frame, [0, 50], [0, 4], {
    extrapolateRight: "clamp",
  });

  const labelEnter = spring({
    frame: Math.max(0, frame - 8),
    fps: 30,
    from: 0,
    to: 1,
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
        gap: 16,
      }}
    >
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 900,
          fontSize: 120 * (size / 600),
          color: "#FF7614",
          letterSpacing: -2,
          textShadow: "0 4px 20px rgba(255,118,20,0.3)",
        }}
      >
        ${countUp.toFixed(1)}B
      </div>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 22 * (size / 600),
          color: "#888",
          letterSpacing: 4,
          opacity: labelEnter,
          transform: `translateY(${interpolate(labelEnter, [0, 1], [10, 0])}px)`,
        }}
      >
        IN ASSETS MANAGED
      </div>
      <div
        style={{
          width: 80 * (size / 600),
          height: 3,
          backgroundColor: "#FF7614",
          borderRadius: 2,
          opacity: labelEnter,
        }}
      />
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 18 * (size / 600),
          color: "#AAA",
          letterSpacing: 2,
          opacity: labelEnter,
        }}
      >
        PRIVATE EQUITY FIRMS
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 10. 20+ PARTNERS — Globe with nodes
// ═══════════════════════════════════════════════════════════════
const PartnersGlobeIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const globeScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });

  const dots = [
    { cx: 220, cy: 220, delay: 4 },
    { cx: 370, cy: 190, delay: 6 },
    { cx: 300, cy: 320, delay: 8 },
    { cx: 180, cy: 340, delay: 10 },
    { cx: 420, cy: 310, delay: 12 },
    { cx: 350, cy: 400, delay: 14 },
  ];

  const countUp = Math.round(
    interpolate(frame, [0, 40], [0, 20], { extrapolateRight: "clamp" })
  );

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Globe circle */}
      <circle
        cx={300}
        cy={290}
        r={170 * globeScale}
        stroke="#E5E5E5"
        strokeWidth={2}
        fill="#FAFAFA"
      />
      {/* Globe grid lines */}
      <ellipse
        cx={300}
        cy={290}
        rx={170 * globeScale}
        ry={60 * globeScale}
        stroke="#E5E5E5"
        strokeWidth={1}
        fill="none"
      />
      <line
        x1={300}
        y1={120}
        x2={300}
        y2={460}
        stroke="#E5E5E5"
        strokeWidth={1}
        opacity={globeScale}
      />

      {/* Partner dots */}
      {dots.map((dot, i) => {
        const dotEnter = spring({
          frame: Math.max(0, frame - dot.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 160 },
        });
        return (
          <g key={i}>
            <circle
              cx={dot.cx}
              cy={dot.cy}
              r={18 * dotEnter}
              fill="#FF7614"
              opacity={0.15}
            />
            <circle
              cx={dot.cx}
              cy={dot.cy}
              r={8 * dotEnter}
              fill="#FF7614"
            />
          </g>
        );
      })}

      {/* Counter */}
      <text
        x={300}
        y={530}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight={900}
        fontSize={44}
        fill="#FF7614"
        opacity={globeScale}
      >
        {countUp}+ PARTNERS
      </text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// 11. FREE SETUP GUIDE — Download card
// ═══════════════════════════════════════════════════════════════
const FreeSetupGuideIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const cardEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  const arrowBounce = interpolate(frame % 30, [0, 15, 30], [0, 8, 0]);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20 * s,
        transform: `scale(${cardEnter})`,
        opacity: cardEnter,
      }}
    >
      {/* FREE badge */}
      <div
        style={{
          padding: `${10 * s}px ${32 * s}px`,
          borderRadius: 30 * s,
          backgroundColor: "#22C55E",
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: 28 * s,
          color: "white",
          letterSpacing: 3,
        }}
      >
        FREE
      </div>

      {/* Document icon */}
      <svg width={180 * s} height={200 * s} viewBox="0 0 180 200" fill="none">
        <rect x={20} y={10} width={140} height={180} rx={12} fill="#F5F5F5" stroke="#DDD" strokeWidth={2} />
        <rect x={40} y={40} width={100} height={8} rx={4} fill="#DDD" />
        <rect x={40} y={60} width={80} height={8} rx={4} fill="#E8E8E8" />
        <rect x={40} y={80} width={100} height={8} rx={4} fill="#DDD" />
        <rect x={40} y={100} width={60} height={8} rx={4} fill="#E8E8E8" />
        {/* Download arrow */}
        <g transform={`translate(90, ${135 + arrowBounce})`}>
          <path d="M0 -15L0 10" stroke="#FF7614" strokeWidth={3} strokeLinecap="round" />
          <path d="M-10 2L0 12L10 2" stroke="#FF7614" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </svg>

      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 18 * s,
          color: "#888",
          letterSpacing: 2,
        }}
      >
        AI SALES CAMPAIGN
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 12. PARTNER CASE STUDY — Case study card
// ═══════════════════════════════════════════════════════════════
const PartnerCaseStudyIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const cardEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  const metrics = [
    { label: "OUTREACH", value: "10×", delay: 5, color: "#FF7614" },
    { label: "MEETINGS", value: "2×", delay: 9, color: "#22C55E" },
    { label: "REVENUE", value: "↑↑", delay: 13, color: "#3B82F6" },
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
        gap: 24 * s,
        transform: `scale(${cardEnter})`,
        opacity: cardEnter,
      }}
    >
      {/* Person avatar */}
      <div
        style={{
          width: 90 * s,
          height: 90 * s,
          borderRadius: "50%",
          backgroundColor: "#F0F0F0",
          border: `3px solid #FF7614`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={40 * s} height={40 * s} viewBox="0 0 40 40" fill="none">
          <circle cx={20} cy={14} r={8} fill="#999" />
          <path d="M6 38Q20 22 34 38" fill="#999" />
        </svg>
      </div>

      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: 20 * s,
          color: "#1A1A1A",
          letterSpacing: 2,
        }}
      >
        PARTNER RESULTS
      </div>

      {/* Metrics row */}
      <div style={{ display: "flex", gap: 18 * s }}>
        {metrics.map((m, i) => {
          const mEnter = spring({
            frame: Math.max(0, frame - m.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 12, stiffness: 160 },
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6 * s,
                opacity: mEnter,
                transform: `scale(${mEnter})`,
              }}
            >
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 900,
                  fontSize: 36 * s,
                  color: m.color,
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 12 * s,
                  color: "#999",
                  letterSpacing: 1,
                }}
              >
                {m.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 13. IX OUTREACH CAMPAIGN — Campaign launch
// ═══════════════════════════════════════════════════════════════
const CampaignLaunchIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const rocketY = interpolate(frame, [0, 30], [80, -20], {
    extrapolateRight: "clamp",
  });

  const trailOpacity = interpolate(frame, [5, 30], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Launch pad */}
      <rect x={220} y={420} width={160} height={12} rx={6} fill="#E5E5E5" />

      {/* Trail */}
      <path
        d={`M290 420L300 ${320 + rocketY}L310 420`}
        fill="#FF7614"
        opacity={trailOpacity}
      />
      <path
        d={`M295 420L300 ${350 + rocketY}L305 420`}
        fill="#FFB800"
        opacity={trailOpacity * 0.7}
      />

      {/* Rocket */}
      <g transform={`translate(300, ${280 + rocketY})`}>
        <path
          d="M0 -60L25 20L15 30L-15 30L-25 20Z"
          fill="#FF7614"
          stroke="#E06610"
          strokeWidth={2}
        />
        <circle cx={0} cy={-10} r={10} fill="white" />
        <rect x={-18} y={20} width={8} height={18} rx={3} fill="#FFB800" />
        <rect x={10} y={20} width={8} height={18} rx={3} fill="#FFB800" />
      </g>

      {/* Label */}
      {(() => {
        const labelEnter = spring({
          frame: Math.max(0, frame - 15),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 100 },
        });
        return (
          <text
            x={300}
            y={530}
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight={700}
            fontSize={18}
            fill="#888"
            opacity={labelEnter}
          >
            CAMPAIGN LAUNCHED
          </text>
        );
      })()}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// CTA CARD — "WATCH THE FULL VIDEO"
// ═══════════════════════════════════════════════════════════════
const CTACard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  const fadeOut = interpolate(frame, [53, 65], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        opacity: enter * fadeOut,
        transform: `scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          padding: "28px 40px",
          borderRadius: 28,
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          width: 680,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Img
            src={staticFile("logos/youtube.svg")}
            style={{ width: 44, height: 44 }}
          />
          <div
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 34,
              color: "#1A1A1A",
              letterSpacing: 2,
            }}
          >
            WATCH THE FULL VIDEO
          </div>
        </div>

        <div
          style={{
            fontFamily,
            fontWeight: 600,
            fontSize: 22,
            color: "#888",
            letterSpacing: 1,
          }}
        >
          Claude Creatives — AI Content Factory Setup
        </div>

        <div
          style={{
            width: 100,
            height: 3,
            backgroundColor: "#FF7614",
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════════
export const ClipContentWithoutClients: React.FC<{
  videoSrc?: string;
}> = ({
  videoSrc = "videos/2026-02-22-claude-creatives/clip-content-without-clients.mp4",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = getZoom(frame);

  const hookFlash = interpolate(frame, [0, 3], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const conceptActive = CONCEPT_RANGES.some(
    (r) => frame >= r.start && frame < r.end
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* ── BASE: Speaker video ─────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <OffthreadVideo
          src={staticFile(videoSrc)}
          volume={1}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* ── HOOK FLASH (orange burst, frames 0-3) ─────────────── */}
      {hookFlash > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#FF6B00",
            opacity: hookFlash,
            zIndex: 50,
          }}
        />
      )}

      {/* ═════ 1. CONTENT WITHOUT CLIENTS — frame 85, 75f ══════ */}
      <Sequence from={85} durationInFrames={75} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<ContentWithoutClientsIllustration />}
          caption="CONTENT WITHOUT CLIENTS"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* ═════ 2. IX SYSTEM — frame 318, 50f ═══════════════════ */}
      <Sequence from={318} durationInFrames={50} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={50}
          illustration={<IXSystemIllustration />}
          caption="IX SYSTEM"
          subtitle="The other half"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={580}
        />
      </Sequence>

      {/* ═════ 3. AI CLIENT ACQUISITION — frame 394, 75f ═══════ */}
      <Sequence from={394} durationInFrames={75} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<AcquisitionFunnelIllustration />}
          caption="AI CLIENT ACQUISITION"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* ═════ 4. FIND TARGET BUYER — frame 496, 50f ═══════════ */}
      <Sequence from={496} durationInFrames={50} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={50}
          illustration={<TargetBuyerIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* ═════ 5. WRITES YOUR OUTREACH — frame 570, 50f ════════ */}
      <Sequence from={570} durationInFrames={50} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={50}
          illustration={<OutreachCopyIllustration />}
          caption="WRITES YOUR OUTREACH"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* ═════ 6. HANDLES CONVERSATIONS — frame 689, 50f ═══════ */}
      <Sequence from={689} durationInFrames={50} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={50}
          illustration={<ConversationsIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* ═════ 7. BOOKS APPOINTMENTS — frame 742, 70f ══════════ */}
      <Sequence from={742} durationInFrames={70} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<BookAppointmentsIllustration />}
          caption="BOOKS APPOINTMENTS"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* ═════ 8. PROVEN SYSTEM — frame 916, 50f ═══════════════ */}
      <Sequence from={916} durationInFrames={50} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={50}
          illustration={<ProvenSystemIllustration />}
          caption="PROVEN SYSTEM"
          subtitle="Exact same system"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* ═════ 9. $4 BILLION — frame 1060, 75f ═════════════════ */}
      <Sequence from={1060} durationInFrames={75} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<FourBillionIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={620}
        />
      </Sequence>

      {/* ═════ 10. 20+ PARTNERS — frame 1215, 60f ══════════════ */}
      <Sequence from={1215} durationInFrames={60} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<PartnersGlobeIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={620}
        />
      </Sequence>

      {/* ═════ 11. FREE SETUP GUIDE — frame 1432, 65f ══════════ */}
      <Sequence from={1432} durationInFrames={65} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={65}
          illustration={<FreeSetupGuideIllustration />}
          caption="FREE SETUP GUIDE"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* ═════ 12. PARTNER CASE STUDY — frame 1636, 50f ════════ */}
      <Sequence from={1636} durationInFrames={50} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={50}
          illustration={<PartnerCaseStudyIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* ═════ 13. IX OUTREACH CAMPAIGN — frame 1746, 50f ══════ */}
      <Sequence from={1746} durationInFrames={50} premountFor={fps}>
        <ConceptOverlay
          durationInFrames={50}
          illustration={<CampaignLaunchIllustration />}
          caption="IX OUTREACH CAMPAIGN"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={600}
        />
      </Sequence>

      {/* ═════ CTA — frame 1900, 65f ═══════════════════════════ */}
      <Sequence from={1900} durationInFrames={65} premountFor={fps}>
        <CTACard />
      </Sequence>

      {/* ═════ WORD-BY-WORD CAPTIONS (bottom 12%) ══════════════ */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          width: "100%",
          height: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {!conceptActive &&
          WORDS.map((w) => {
            if (frame < w.frame || frame >= w.frame + w.duration) return null;
            return (
              <div
                key={w.id}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily,
                    fontWeight: 800,
                    fontSize: 72,
                    color: w.emphasis ? "#FF7614" : "#FFFFFF",
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    textShadow: w.emphasis
                      ? "0 0 20px rgba(255, 118, 20, 0.6), 0 4px 12px rgba(0,0,0,0.8)"
                      : "0 4px 12px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)",
                    padding: "0 60px",
                  }}
                >
                  {w.word}
                </div>
              </div>
            );
          })}
      </div>

      {/* ═════ SFX LAYER ════════════════════════════════════════ */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={fps}>
          <Audio src={staticFile(sfx.src)} volume={sfx.volume} startFrom={0} />
        </Sequence>
      ))}

      {/* ═════ BACKGROUND MUSIC ═════════════════════════════════ */}
      <Audio
        src={staticFile("audio/lofi-background.mp3")}
        volume={0.02}
        startFrom={0}
        endAt={TOTAL_FRAMES}
      />
    </AbsoluteFill>
  );
};
