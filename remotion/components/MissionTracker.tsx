import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

// ===== VIDEO STRUCTURE DATA =====
export interface MissionStep {
  name: string;
  startFrame: number;
}

export interface MissionPhase {
  id: string;
  title: string;
  startFrame: number;
  endFrame: number;
  steps: MissionStep[];
}

interface MissionTrackerProps {
  phases: MissionPhase[];
}

/**
 * MissionTracker — Video Game-style HUD
 *
 * Top-left corner: Shows current phase + steps with completion state
 * Persistent during demo sections, hides during hook/outro
 *
 * Design:
 * - Dark semi-transparent background
 * - Orange accent for current phase
 * - Checkmarks for completed steps
 * - Arrow for current step
 * - Dimmed upcoming steps
 * - Smooth transitions when phase/step changes
 */
export const MissionTracker: React.FC<MissionTrackerProps> = ({ phases }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Find current phase based on frame
  const currentPhase = phases.find(
    (p) => frame >= p.startFrame && frame < p.endFrame
  );

  if (!currentPhase) return null;

  // How far into this phase are we?
  const phaseProgress = interpolate(
    frame,
    [currentPhase.startFrame, currentPhase.startFrame + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Fade out at phase end
  const phaseExit = interpolate(
    frame,
    [currentPhase.endFrame - 15, currentPhase.endFrame],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(phaseProgress, phaseExit);

  // Slide in from left
  const slideX = interpolate(phaseProgress, [0, 1], [-20, 0]);

  // Find current step index
  let currentStepIndex = 0;
  for (let i = currentPhase.steps.length - 1; i >= 0; i--) {
    if (frame >= currentPhase.steps[i].startFrame) {
      currentStepIndex = i;
      break;
    }
  }

  // Phase number from id
  const phaseNum = currentPhase.id.replace("phase-", "");

  return (
    <div
      style={{
        position: "absolute",
        bottom: 32,
        left: 32,
        opacity,
        transform: `translateX(${slideX}px)`,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      {/* Background card */}
      <div
        style={{
          backgroundColor: "rgba(10, 10, 10, 0.75)",
          backdropFilter: "blur(8px)",
          borderRadius: 12,
          padding: "14px 20px",
          border: "1px solid rgba(255, 118, 20, 0.3)",
          minWidth: 220,
        }}
      >
        {/* Phase title */}
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: 14,
            color: "#FF7614",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              backgroundColor: "#FF7614",
              color: "#000",
              borderRadius: 4,
              padding: "2px 6px",
              fontSize: 11,
              fontWeight: 900,
            }}
          >
            {phaseNum}
          </span>
          {currentPhase.title}
        </div>

        {/* Steps list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {currentPhase.steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isUpcoming = idx > currentStepIndex;

            // Step transition animation
            const stepOpacity = isCurrent
              ? interpolate(
                  frame,
                  [step.startFrame, step.startFrame + 10],
                  [0.5, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )
              : isCompleted
              ? 0.6
              : 0.35;

            return (
              <div
                key={idx}
                style={{
                  fontFamily,
                  fontWeight: isCurrent ? 700 : 500,
                  fontSize: 13,
                  color: isCurrent
                    ? "#FFFFFF"
                    : isCompleted
                    ? "#888888"
                    : "#555555",
                  opacity: stepOpacity,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "opacity 0.3s",
                }}
              >
                {/* Status icon */}
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 900,
                    backgroundColor: isCompleted
                      ? "rgba(0, 204, 102, 0.2)"
                      : isCurrent
                      ? "rgba(255, 118, 20, 0.25)"
                      : "rgba(255, 255, 255, 0.05)",
                    color: isCompleted
                      ? "#00CC66"
                      : isCurrent
                      ? "#FF7614"
                      : "#444",
                    border: isCurrent
                      ? "1px solid rgba(255, 118, 20, 0.5)"
                      : "1px solid transparent",
                  }}
                >
                  {isCompleted ? "✓" : isCurrent ? "→" : "·"}
                </span>

                {/* Step name */}
                <span
                  style={{
                    textDecoration: isCompleted ? "line-through" : "none",
                  }}
                >
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar below */}
      <div
        style={{
          marginTop: 6,
          height: 3,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#FF7614",
            borderRadius: 2,
            width: `${
              ((currentStepIndex + 1) / currentPhase.steps.length) * 100
            }%`,
            transition: "width 0.5s ease",
          }}
        />
      </div>
    </div>
  );
};
