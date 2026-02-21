/**
 * Zone of Genius — Radiant Focus Illustration
 *
 * Concept: A radiant spotlight illuminating the viewer's unique strength.
 * Center: Glowing orange orb with sparkle icons.
 * Ring: Concentric circles expanding outward (spring animation).
 * Bottom: "YOUR ZONE" text.
 * Surrounding: Faded task icons (delegated to AI) drifting away.
 * V2 pattern with spring + interpolate animations.
 * Designed for white backgrounds (ConceptOverlay solid-white).
 */

import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface ZoneOfGeniusIllustrationProps {
  size?: number;
}

export const ZoneOfGeniusIllustration: React.FC<ZoneOfGeniusIllustrationProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  // Core orb entrance
  const orbScale = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });

  // Concentric rings (staggered)
  const rings = [
    { radius: 100, delay: 3, color: "rgba(255, 118, 20, 0.25)" },
    { radius: 160, delay: 6, color: "rgba(255, 118, 20, 0.15)" },
    { radius: 220, delay: 9, color: "rgba(255, 118, 20, 0.08)" },
  ];

  // Sparkle stars (4 positions)
  const sparkles = [
    { x: -55, y: -60, delay: 8 },
    { x: 60, y: -40, delay: 11 },
    { x: -40, y: 50, delay: 14 },
    { x: 55, y: 55, delay: 17 },
  ];

  // Delegated task icons (fade away from center)
  const tasks = [
    { x: -200, y: -180, icon: "📧", delay: 12 },
    { x: 210, y: -160, icon: "📊", delay: 15 },
    { x: -220, y: 140, icon: "📅", delay: 18 },
    { x: 200, y: 170, icon: "📱", delay: 21 },
  ];

  // Pulsing glow
  const glowPulse = interpolate(frame % 30, [0, 15, 30], [0.6, 1, 0.6], {
    extrapolateRight: "clamp",
  });

  // "YOUR ZONE" text entrance
  const textProgress = spring({
    frame: Math.max(0, frame - 12),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 160 },
  });
  const textY = interpolate(textProgress, [0, 1], [20, 0]);

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
      {/* Concentric rings */}
      {rings.map((ring, i) => {
        const ringScale = spring({
          frame: Math.max(0, frame - ring.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 100 },
        });
        return (
          <div
            key={`ring-${i}`}
            style={{
              position: "absolute",
              width: ring.radius * 2 * s,
              height: ring.radius * 2 * s,
              borderRadius: "50%",
              border: `2px solid ${ring.color}`,
              backgroundColor: i === 0 ? "rgba(255, 118, 20, 0.04)" : "transparent",
              transform: `scale(${ringScale})`,
              opacity: ringScale,
            }}
          />
        );
      })}

      {/* Glow behind orb */}
      <div
        style={{
          position: "absolute",
          width: 180 * s,
          height: 180 * s,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 118, 20, 0.4) 0%, transparent 70%)",
          opacity: orbScale * glowPulse,
          filter: `blur(${20 * s}px)`,
        }}
      />

      {/* Core orb */}
      <div
        style={{
          position: "absolute",
          width: 120 * s,
          height: 120 * s,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #FF8C42 0%, #FF6B00 50%, #E85D00 100%)",
          transform: `scale(${orbScale})`,
          boxShadow: `0 ${8 * s}px ${40 * s}px rgba(255, 107, 0, 0.4)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Star icon inside orb */}
        <svg
          width={48 * s}
          height={48 * s}
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M24 4L28.9 17.6L43.6 18.4L32.2 27.8L35.8 42L24 34.4L12.2 42L15.8 27.8L4.4 18.4L19.1 17.6L24 4Z"
            fill="white"
            opacity="0.95"
          />
        </svg>
      </div>

      {/* Sparkle stars */}
      {sparkles.map((sp, i) => {
        const spProgress = spring({
          frame: Math.max(0, frame - sp.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 200 },
        });
        const spPulse = interpolate(
          (frame + i * 7) % 20,
          [0, 10, 20],
          [0.6, 1, 0.6],
          { extrapolateRight: "clamp" }
        );
        return (
          <div
            key={`sparkle-${i}`}
            style={{
              position: "absolute",
              left: `calc(50% + ${sp.x * s}px)`,
              top: `calc(50% + ${sp.y * s}px)`,
              transform: `scale(${spProgress * spPulse})`,
              opacity: spProgress,
            }}
          >
            <svg width={22 * s} height={22 * s} viewBox="0 0 22 22" fill="none">
              <path
                d="M11 0L13 8.5L22 11L13 13.5L11 22L9 13.5L0 11L9 8.5L11 0Z"
                fill="#FF7614"
                opacity="0.8"
              />
            </svg>
          </div>
        );
      })}

      {/* Delegated task icons (fading away) */}
      {tasks.map((task, i) => {
        const taskProgress = spring({
          frame: Math.max(0, frame - task.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 16, stiffness: 80 },
        });
        // Tasks drift outward as they appear
        const driftX = interpolate(taskProgress, [0, 1], [0, task.x > 0 ? 15 : -15]);
        const driftY = interpolate(taskProgress, [0, 1], [0, task.y > 0 ? 10 : -10]);
        return (
          <div
            key={`task-${i}`}
            style={{
              position: "absolute",
              left: `calc(50% + ${(task.x + driftX) * s}px)`,
              top: `calc(50% + ${(task.y + driftY) * s}px)`,
              fontSize: 36 * s,
              opacity: taskProgress * 0.35,
              transform: `scale(${taskProgress * 0.9})`,
              filter: `blur(${2 * s}px)`,
            }}
          >
            {task.icon}
          </div>
        );
      })}

      {/* "YOUR ZONE" text */}
      <div
        style={{
          position: "absolute",
          bottom: 50 * s,
          width: "100%",
          textAlign: "center",
          opacity: textProgress,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 42 * s,
            color: "#1A1A1A",
            letterSpacing: 6 * s,
            textTransform: "uppercase",
          }}
        >
          YOUR ZONE
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 18 * s,
            color: "#888",
            marginTop: 4 * s,
            letterSpacing: 3 * s,
          }}
        >
          LET AI HANDLE THE REST
        </div>
      </div>
    </div>
  );
};
