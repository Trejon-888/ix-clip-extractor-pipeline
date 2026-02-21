/**
 * Massive Outreach Problem — Visualization of overwhelming contact volume.
 *
 * Shows a towering stack of contact rows with red "overwhelm" indicator.
 * Represents the pain point: huge list, no efficient way to reach them.
 * Designed for white backgrounds (ConceptOverlay solid-white).
 */

import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface MassiveOutreachIllustrationProps {
  size?: number;
}

const CONTACT_ROWS = [
  { name: "John M.", status: "Not contacted", delay: 0 },
  { name: "Sarah K.", status: "Not contacted", delay: 2 },
  { name: "Mike R.", status: "Not contacted", delay: 3 },
  { name: "Lisa W.", status: "Pending...", delay: 4 },
  { name: "David T.", status: "Not contacted", delay: 5 },
  { name: "Amy C.", status: "Not contacted", delay: 6 },
  { name: "Chris B.", status: "Not contacted", delay: 7 },
  { name: "Rachel P.", status: "Pending...", delay: 8 },
];

export const MassiveOutreachIllustration: React.FC<MassiveOutreachIllustrationProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  // Counter animation
  const countProgress = spring({
    frame: Math.max(0, frame - 5),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 20, stiffness: 60 },
  });
  const contactCount = Math.round(interpolate(countProgress, [0, 1], [0, 12847]));

  // Red pulse
  const redPulse = interpolate(frame % 30, [0, 15, 30], [0.6, 1, 0.6]);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 30 * s,
        gap: 10 * s,
      }}
    >
      {/* Counter badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12 * s,
          marginBottom: 8 * s,
        }}
      >
        <div
          style={{
            width: 14 * s,
            height: 14 * s,
            borderRadius: "50%",
            backgroundColor: "#EF4444",
            opacity: redPulse,
            boxShadow: `0 0 ${12 * s}px rgba(239,68,68,0.5)`,
          }}
        />
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: 42 * s,
            color: "#1A1A1A",
            letterSpacing: -1,
          }}
        >
          {contactCount.toLocaleString()}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 20 * s,
            color: "#888",
          }}
        >
          contacts
        </div>
      </div>

      {/* Contact list card */}
      <div
        style={{
          width: 480 * s,
          borderRadius: 18 * s,
          backgroundColor: "#FAFAFA",
          border: `2px solid rgba(0,0,0,0.06)`,
          overflow: "hidden",
          boxShadow: `0 ${4 * s}px ${20 * s}px rgba(0,0,0,0.06)`,
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: `${10 * s}px ${18 * s}px`,
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            backgroundColor: "#F5F5F5",
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 13 * s,
              color: "#888",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Contact
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 13 * s,
              color: "#888",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Status
          </div>
        </div>

        {/* Contact rows */}
        {CONTACT_ROWS.map((row, i) => {
          const enter = spring({
            frame: Math.max(0, frame - row.delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 14, stiffness: 180 },
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: `${9 * s}px ${18 * s}px`,
                borderBottom: i < CONTACT_ROWS.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
                opacity: enter,
                transform: `translateX(${interpolate(enter, [0, 1], [20, 0])}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 * s }}>
                {/* Avatar circle */}
                <div
                  style={{
                    width: 28 * s,
                    height: 28 * s,
                    borderRadius: "50%",
                    backgroundColor: "#E5E5E5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width={14 * s} height={14 * s} viewBox="0 0 16 16" fill="#999">
                    <circle cx="8" cy="5" r="3" />
                    <path d="M2 14C2 11 5 9 8 9C11 9 14 11 14 14" />
                  </svg>
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 15 * s,
                    color: "#1A1A1A",
                  }}
                >
                  {row.name}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 13 * s,
                  color: row.status === "Pending..." ? "#F59E0B" : "#EF4444",
                  padding: `${3 * s}px ${10 * s}px`,
                  borderRadius: 6 * s,
                  backgroundColor:
                    row.status === "Pending..."
                      ? "rgba(245,158,11,0.1)"
                      : "rgba(239,68,68,0.08)",
                }}
              >
                {row.status}
              </div>
            </div>
          );
        })}

        {/* Overflow indicator */}
        <div
          style={{
            padding: `${10 * s}px ${18 * s}px`,
            textAlign: "center",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 14 * s,
            color: "#999",
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          + 12,839 more contacts...
        </div>
      </div>
    </div>
  );
};
