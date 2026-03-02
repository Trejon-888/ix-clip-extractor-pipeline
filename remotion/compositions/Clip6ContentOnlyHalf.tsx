/**
 * Clip 6: Content Is Only Half — iX System Reveal
 *
 * SOURCE: Pipeline clip from "Claude Creatives" batch
 * CTA: "WATCH THE FULL VIDEO" — Claude Creatives
 * Duration: 56s (1680 frames @ 30fps)
 *
 * STORY: Content creation is only half the system. You need a client
 * pipeline. The iX system handles AI acquisition, outreach, appointments
 * — used by PE firms managing $4B+ in assets.
 *
 * ALL POP-OUTS (6 ConceptOverlay + 1 CTA):
 *   1.  "ONLY HALF" (frame 446, 75f) — Split visual: content vs pipeline
 *   2.  "CLIENT PIPELINE" (frame 642, 65f) — Pipeline funnel
 *   3.  "iX SYSTEM" (frame 768, 50f) — INFINITX logo
 *   4.  "AI ACQUISITION" (frame 960, 70f) — Acquisition steps
 *   5.  "BOOKS APPOINTMENTS" (frame 1192, 60f) — Calendar booking
 *   6.  "$4 BILLION" (frame 1511, 60f) — Count-up metric
 *   CTA: "WATCH THE FULL VIDEO" (frame 1620, 65f)
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
import { WORDS } from "../data/clip6-content-only-half-words";

const { fontFamily } = loadFont();

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════
const TOTAL_FRAMES = 1680; // 56s x 30fps

// Flat zoom — no keyframes
function getZoom(_frame: number): number {
  return 1.0;
}

// ═══════════════════════════════════════════════════════════════
// Concept overlay frame ranges (captions hidden during these)
// ═══════════════════════════════════════════════════════════════
const CONCEPT_RANGES = [
  { start: 446, end: 521 },   // Only Half
  { start: 642, end: 707 },   // Client Pipeline
  { start: 768, end: 818 },   // iX System
  { start: 960, end: 1030 },  // AI Acquisition
  { start: 1192, end: 1252 }, // Books Appointments
  { start: 1511, end: 1571 }, // $4 Billion
  { start: 1620, end: 1685 }, // CTA
];

// ═══════════════════════════════════════════════════════════════
// SFX EVENTS (J-cut: audio 2-3 frames before visual)
// ═══════════════════════════════════════════════════════════════
const SFX_EVENTS: Array<{ frame: number; src: string; volume: number }> = [
  // Hook burst
  { frame: 0, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.24 },
  // Only Half
  { frame: 444, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // Client Pipeline
  { frame: 640, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.20 },
  // iX System
  { frame: 766, src: "audio/pop-402324.mp3", volume: 0.20 },
  // AI Acquisition
  { frame: 958, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.18 },
  // Books Appointments
  { frame: 1190, src: "audio/whoosh-effect-382717.mp3", volume: 0.18 },
  // $4 Billion
  { frame: 1509, src: "audio/whoosh-large-sub-384631.mp3", volume: 0.22 },
  // CTA
  { frame: 1618, src: "audio/whoosh-bamboo-389752.mp3", volume: 0.16 },
];

// ═══════════════════════════════════════════════════════════════
// 1. ONLY HALF — Split visual: Content side vs Pipeline side
// ═══════════════════════════════════════════════════════════════
const OnlyHalfIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  // Left half slides in
  const leftEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  // Right half slides in with delay
  const rightEnter = spring({
    frame: Math.max(0, frame - 8),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

  // Question mark pulse
  const qPulse = interpolate(frame % 40, [0, 20, 40], [0.9, 1.1, 0.9]);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20 * s,
      }}
    >
      {/* Content side (filled) */}
      <div
        style={{
          width: 240 * s,
          height: 340 * s,
          borderRadius: 24 * s,
          backgroundColor: "#FF7614",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16 * s,
          opacity: leftEnter,
          transform: `translateX(${interpolate(leftEnter, [0, 1], [-30, 0])}px)`,
          boxShadow: `0 ${8 * s}px ${28 * s}px rgba(255,118,20,0.3)`,
        }}
      >
        {/* Content icons */}
        {[0, 1, 2].map((i) => {
          const iconEnter = spring({
            frame: Math.max(0, frame - 4 - i * 4),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 10, stiffness: 160 },
          });
          return (
            <div
              key={i}
              style={{
                width: 160 * s,
                height: 28 * s,
                borderRadius: 14 * s,
                backgroundColor: "rgba(255,255,255,0.3)",
                transform: `scale(${iconEnter})`,
              }}
            />
          );
        })}
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: 18 * s,
            color: "#FFFFFF",
            letterSpacing: 2,
            marginTop: 8 * s,
          }}
        >
          CONTENT
        </div>
        <svg
          width={32 * s}
          height={32 * s}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Pipeline side (empty / missing) */}
      <div
        style={{
          width: 240 * s,
          height: 340 * s,
          borderRadius: 24 * s,
          backgroundColor: "#F5F5F5",
          border: `3px dashed #DDD`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16 * s,
          opacity: rightEnter,
          transform: `translateX(${interpolate(rightEnter, [0, 1], [30, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 60 * s,
            color: "#CCC",
            transform: `scale(${qPulse})`,
          }}
        >
          ?
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: 18 * s,
            color: "#BBB",
            letterSpacing: 2,
          }}
        >
          PIPELINE
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. CLIENT PIPELINE — Funnel with stages
// ═══════════════════════════════════════════════════════════════
const ClientPipelineIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const stages = [
    { label: "PROSPECTS", width: 380, color: "#FFD6A8", delay: 0 },
    { label: "OUTREACH", width: 300, color: "#FFB86A", delay: 5 },
    { label: "CONVERSATIONS", width: 220, color: "#FF9B3D", delay: 10 },
    { label: "CLIENTS", width: 140, color: "#FF7614", delay: 15 },
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
        gap: 16 * s,
      }}
    >
      {stages.map((stage, i) => {
        const enter = spring({
          frame: Math.max(0, frame - stage.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 140 },
        });

        return (
          <div
            key={i}
            style={{
              width: stage.width * s * enter,
              height: 56 * s,
              borderRadius: 28 * s,
              backgroundColor: stage.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: enter,
              boxShadow:
                i === stages.length - 1
                  ? `0 ${6 * s}px ${20 * s}px rgba(255,118,20,0.3)`
                  : "none",
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 16 * s,
                color: i >= 2 ? "#FFFFFF" : "#8B4513",
                letterSpacing: 2,
                opacity: enter,
              }}
            >
              {stage.label}
            </div>
          </div>
        );
      })}

      {/* Arrow down */}
      {(() => {
        const arrowEnter = spring({
          frame: Math.max(0, frame - 20),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 100 },
        });
        return (
          <svg
            width={40 * s}
            height={40 * s}
            viewBox="0 0 40 40"
            fill="none"
            style={{ opacity: arrowEnter }}
          >
            <path
              d="M20 8V28M20 28L12 20M20 28L28 20"
              stroke="#FF7614"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      })()}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. iX SYSTEM — INFINITX Logo (real image)
// ═══════════════════════════════════════════════════════════════
const IXSystemIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;
  const enter = spring({
    frame: Math.max(0, frame - 3),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 140 },
  });

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
          style={{
            width: 280 * s,
            height: 280 * s,
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. AI ACQUISITION — Step cards (find, write, converse, book)
// ═══════════════════════════════════════════════════════════════
const AIAcquisitionIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const steps = [
    {
      icon: (
        <svg width={28 * s} height={28 * s} viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#FF7614" strokeWidth="2.5" />
          <path d="M16 16L21 21" stroke="#FF7614" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
      label: "FIND BUYER",
      delay: 0,
    },
    {
      icon: (
        <svg width={28 * s} height={28 * s} viewBox="0 0 24 24" fill="none">
          <path d="M4 4h16v12H5.17L4 17.17V4z" stroke="#FF7614" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M8 9h8M8 12h5" stroke="#FF7614" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      label: "WRITE OUTREACH",
      delay: 6,
    },
    {
      icon: (
        <svg width={28 * s} height={28 * s} viewBox="0 0 24 24" fill="none">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#FF7614" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      ),
      label: "HANDLE CONVOS",
      delay: 12,
    },
    {
      icon: (
        <svg width={28 * s} height={28 * s} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="#FF7614" strokeWidth="2.5" />
          <path d="M3 10h18" stroke="#FF7614" strokeWidth="2" />
          <path d="M9 16l2 2 4-4" stroke="#FF7614" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: "BOOK MEETING",
      delay: 18,
    },
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
        gap: 18 * s,
      }}
    >
      {/* AI Badge */}
      {(() => {
        const badgeScale = spring({
          frame,
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 140 },
        });
        return (
          <div
            style={{
              width: 80 * s,
              height: 80 * s,
              borderRadius: "50%",
              backgroundColor: "#FF7614",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${badgeScale})`,
              boxShadow: `0 ${4 * s}px ${16 * s}px rgba(255,118,20,0.3)`,
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 900,
                fontSize: 28 * s,
                color: "#FFFFFF",
                letterSpacing: 2,
              }}
            >
              AI
            </div>
          </div>
        );
      })()}

      {/* Step cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12 * s,
          width: 380 * s,
        }}
      >
        {steps.map((step, i) => {
          const enter = spring({
            frame: Math.max(0, frame - step.delay),
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
                alignItems: "center",
                gap: 14 * s,
                padding: `${12 * s}px ${18 * s}px`,
                borderRadius: 14 * s,
                backgroundColor: "#FFF7ED",
                border: "2px solid #FFEDD5",
                opacity: enter,
                transform: `translateX(${interpolate(enter, [0, 1], [20, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 44 * s,
                  height: 44 * s,
                  borderRadius: 12 * s,
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transform: `scale(${enter})`,
                  boxShadow: `0 2px ${6 * s}px rgba(0,0,0,0.06)`,
                }}
              >
                {step.icon}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 18 * s,
                  color: "#9A3412",
                  letterSpacing: 1.5,
                }}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. BOOKS APPOINTMENTS — Calendar with checkmark booking
// ═══════════════════════════════════════════════════════════════
const BooksAppointmentsIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const calEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });

  const slots = [
    { row: 0, col: 0, booked: false, delay: 6 },
    { row: 0, col: 1, booked: true, delay: 8 },
    { row: 0, col: 2, booked: false, delay: 10 },
    { row: 1, col: 0, booked: true, delay: 12 },
    { row: 1, col: 1, booked: false, delay: 14 },
    { row: 1, col: 2, booked: true, delay: 16 },
    { row: 2, col: 0, booked: false, delay: 18 },
    { row: 2, col: 1, booked: true, delay: 20 },
    { row: 2, col: 2, booked: false, delay: 22 },
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
        gap: 20 * s,
      }}
    >
      {/* Calendar header */}
      <div
        style={{
          width: 380 * s,
          height: 60 * s,
          borderRadius: `${16 * s}px ${16 * s}px 0 0`,
          backgroundColor: "#FF7614",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${calEnter})`,
          boxShadow: `0 ${4 * s}px ${16 * s}px rgba(255,118,20,0.2)`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: 22 * s,
            color: "#FFFFFF",
            letterSpacing: 3,
          }}
        >
          YOUR CALENDAR
        </div>
      </div>

      {/* Calendar grid */}
      <div
        style={{
          width: 380 * s,
          backgroundColor: "#FAFAFA",
          borderRadius: `0 0 ${16 * s}px ${16 * s}px`,
          padding: `${20 * s}px`,
          display: "flex",
          flexDirection: "column",
          gap: 12 * s,
          transform: `scale(${calEnter})`,
          border: "2px solid #F0F0F0",
        }}
      >
        {[0, 1, 2].map((row) => (
          <div
            key={row}
            style={{
              display: "flex",
              gap: 12 * s,
              justifyContent: "center",
            }}
          >
            {slots
              .filter((sl) => sl.row === row)
              .map((slot, ci) => {
                const slotEnter = spring({
                  frame: Math.max(0, frame - slot.delay),
                  fps: 30,
                  from: 0,
                  to: 1,
                  config: { damping: 10, stiffness: 160 },
                });

                return (
                  <div
                    key={ci}
                    style={{
                      width: 100 * s,
                      height: 60 * s,
                      borderRadius: 10 * s,
                      backgroundColor: slot.booked ? "#FFF7ED" : "#FFFFFF",
                      border: slot.booked
                        ? "2px solid #FF7614"
                        : "2px solid #E5E5E5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `scale(${slotEnter})`,
                    }}
                  >
                    {slot.booked && (
                      <svg
                        width={24 * s}
                        height={24 * s}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12l5 5L19 7"
                          stroke="#FF7614"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. $4 BILLION — Count-up metric card
// ═══════════════════════════════════════════════════════════════
const FourBillionIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  const countUp = interpolate(frame, [0, 35], [0, 4], {
    extrapolateRight: "clamp",
  });

  const mainEnter = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });

  const labelEnter = spring({
    frame: Math.max(0, frame - 12),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  const sublabelEnter = spring({
    frame: Math.max(0, frame - 18),
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
        gap: 20 * s,
      }}
    >
      {/* Main counter */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 900,
          fontSize: 120 * s,
          color: "#FF7614",
          letterSpacing: -2,
          transform: `scale(${mainEnter})`,
          lineHeight: 1,
          textShadow: `0 ${4 * s}px ${16 * s}px rgba(255,118,20,0.15)`,
        }}
      >
        ${countUp.toFixed(0)}B+
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 22 * s,
          color: "#888",
          letterSpacing: 4,
          opacity: labelEnter,
          transform: `translateY(${interpolate(labelEnter, [0, 1], [10, 0])}px)`,
        }}
      >
        IN ASSETS MANAGED
      </div>

      {/* Divider */}
      <div
        style={{
          width: 80 * s,
          height: 3,
          backgroundColor: "#FF7614",
          borderRadius: 2,
          opacity: labelEnter,
        }}
      />

      {/* Sublabel */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 18 * s,
          color: "#AAA",
          letterSpacing: 2,
          opacity: sublabelEnter,
        }}
      >
        PRIVATE EQUITY FIRMS
      </div>

      {/* 20+ partners counter */}
      {(() => {
        const partnerEnter = spring({
          frame: Math.max(0, frame - 25),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 100 },
        });
        const partnerCount = Math.round(
          interpolate(Math.max(0, frame - 25), [0, 25], [0, 20], {
            extrapolateRight: "clamp",
          })
        );
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10 * s,
              opacity: partnerEnter,
              transform: `translateY(${interpolate(partnerEnter, [0, 1], [8, 0])}px)`,
              marginTop: 10 * s,
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: 36 * s,
                color: "#FF7614",
              }}
            >
              {partnerCount}+
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 18 * s,
                color: "#888",
                letterSpacing: 2,
              }}
            >
              PARTNERS
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// CTA CARD — "WATCH THE FULL VIDEO" + Claude Creatives
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
          Claude Creatives
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
export const Clip6ContentOnlyHalf: React.FC<{
  videoSrc?: string;
}> = ({
  videoSrc = "videos/2026-03-02-claude-creatives/clip-06-content-is-only-half-without-client-pipeline.mp4",
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
      {/* -- BASE: Speaker video ---------------------------------------- */}
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

      {/* -- HOOK FLASH (orange burst, frames 0-3) ---------------------- */}
      {hookFlash > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#FF6B00",
            opacity: hookFlash,
            zIndex: 50,
          }}
        />
      )}

      {/* ===== 1. ONLY HALF -- frame 446, 75f ========================= */}
      <Sequence from={446} durationInFrames={75} premountFor={15}>
        <ConceptOverlay
          durationInFrames={75}
          illustration={<OnlyHalfIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ===== 2. CLIENT PIPELINE -- frame 642, 65f =================== */}
      <Sequence from={642} durationInFrames={65} premountFor={15}>
        <ConceptOverlay
          durationInFrames={65}
          illustration={<ClientPipelineIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ===== 3. iX SYSTEM -- frame 768, 50f ========================= */}
      <Sequence from={768} durationInFrames={50} premountFor={15}>
        <ConceptOverlay
          durationInFrames={50}
          illustration={<IXSystemIllustration />}
          caption="iX SYSTEM"
          subtitle="The other half"
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={700}
        />
      </Sequence>

      {/* ===== 4. AI ACQUISITION -- frame 960, 70f ==================== */}
      <Sequence from={960} durationInFrames={70} premountFor={15}>
        <ConceptOverlay
          durationInFrames={70}
          illustration={<AIAcquisitionIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ===== 5. BOOKS APPOINTMENTS -- frame 1192, 60f =============== */}
      <Sequence from={1192} durationInFrames={60} premountFor={15}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<BooksAppointmentsIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={800}
        />
      </Sequence>

      {/* ===== 6. $4 BILLION -- frame 1511, 60f ====================== */}
      <Sequence from={1511} durationInFrames={60} premountFor={15}>
        <ConceptOverlay
          durationInFrames={60}
          illustration={<FourBillionIllustration />}
          entrance="clip-circle"
          backgroundStyle="solid-white"
          illustrationSize={620}
        />
      </Sequence>

      {/* ===== CTA -- frame 1620, 65f ================================ */}
      <Sequence from={1620} durationInFrames={65} premountFor={15}>
        <CTACard />
      </Sequence>

      {/* ===== WORD-BY-WORD CAPTIONS (bottom 12%) ==================== */}
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

      {/* ===== SFX LAYER ============================================= */}
      {SFX_EVENTS.map((sfx, i) => (
        <Sequence key={`sfx-${i}`} from={sfx.frame} premountFor={15}>
          <Audio src={staticFile(sfx.src)} volume={sfx.volume} startFrom={0} />
        </Sequence>
      ))}

      {/* ===== BACKGROUND MUSIC ====================================== */}
      <Audio
        src={staticFile("audio/lofi-background.mp3")}
        volume={0.02}
        startFrom={0}
        endAt={TOTAL_FRAMES}
      />
    </AbsoluteFill>
  );
};
