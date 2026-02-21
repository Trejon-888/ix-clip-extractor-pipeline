import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

// Lime green accent from the reference
const LIME_GREEN = "#BFFF00";
const GRAY_BG = "#F0F0F0";

export interface OrbitItem {
  icon?: string; // emoji or text
  label?: string;
  angle: number; // starting angle in degrees
  orbitIndex: number; // which orbit ring (0 = closest to center)
  delay: number; // frames delay
  color?: string;
}

export interface OrbitalDiagramProps {
  durationInFrames: number;
  items: OrbitItem[];
  centerIcon?: string;
  centerLabel?: string;
  showConnections?: boolean;
  rotationSpeed?: number; // degrees per frame
  caption?: string;
}

/**
 * Orbital diagram with concentric circles and orbiting icons
 * Style: Clean, minimal, lime green accent - like the Google/Apple/Amazon reference
 */
export const OrbitalDiagram: React.FC<OrbitalDiagramProps> = ({
  durationInFrames,
  items,
  centerIcon = "👤",
  centerLabel,
  showConnections = true,
  rotationSpeed = 0.3,
  caption,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in/out
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Center icon animation
  const centerScale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  // Orbit radii
  const orbitRadii = [120, 200, 280, 360];

  // Caption animation
  const captionProgress = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: GRAY_BG,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Orbital container */}
      <div
        style={{
          position: "relative",
          width: 800,
          height: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Concentric orbit rings */}
        {orbitRadii.map((radius, i) => (
          <div
            key={`ring-${i}`}
            style={{
              position: "absolute",
              width: radius * 2,
              height: radius * 2,
              borderRadius: "50%",
              border: "1px solid #D0D0D0",
              opacity: 0.6,
            }}
          />
        ))}

        {/* Connection lines to items */}
        {showConnections && (
          <svg
            style={{
              position: "absolute",
              width: 800,
              height: 800,
              pointerEvents: "none",
            }}
            viewBox="0 0 800 800"
          >
            {items.map((item, i) => {
              const itemProgress = spring({
                frame: Math.max(0, frame - item.delay - 10),
                fps,
                from: 0,
                to: 1,
                config: { damping: 200 },
              });

              const radius = orbitRadii[item.orbitIndex] || orbitRadii[0];
              const angle = (item.angle + frame * rotationSpeed) * (Math.PI / 180);
              const x = 400 + Math.cos(angle) * radius;
              const y = 400 + Math.sin(angle) * radius;

              return (
                <line
                  key={`line-${i}`}
                  x1={400}
                  y1={400}
                  x2={x}
                  y2={y}
                  stroke={LIME_GREEN}
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  opacity={itemProgress * 0.8}
                />
              );
            })}
          </svg>
        )}

        {/* Center icon */}
        <div
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: LIME_GREEN,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${centerScale})`,
            boxShadow: "0px 4px 20px rgba(191, 255, 0, 0.4)",
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: 48 }}>{centerIcon}</span>
        </div>

        {/* Orbiting items */}
        {items.map((item, i) => (
          <OrbitingItem
            key={i}
            item={item}
            frame={frame}
            fps={fps}
            orbitRadii={orbitRadii}
            rotationSpeed={rotationSpeed}
          />
        ))}
      </div>

      {/* Caption below */}
      {caption && (
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: 48,
            color: "#1A1A1A",
            marginTop: 40,
            opacity: captionProgress,
            letterSpacing: -1,
          }}
        >
          {caption}
        </div>
      )}
    </AbsoluteFill>
  );
};

interface OrbitingItemProps {
  item: OrbitItem;
  frame: number;
  fps: number;
  orbitRadii: number[];
  rotationSpeed: number;
}

const OrbitingItem: React.FC<OrbitingItemProps> = ({
  item,
  frame,
  fps,
  orbitRadii,
  rotationSpeed,
}) => {
  const adjustedFrame = Math.max(0, frame - item.delay);

  const progress = spring({
    frame: adjustedFrame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 15, stiffness: 120 },
  });

  const scale = spring({
    frame: adjustedFrame,
    fps,
    from: 0.3,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  const radius = orbitRadii[item.orbitIndex] || orbitRadii[0];
  const angle = (item.angle + frame * rotationSpeed) * (Math.PI / 180);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
        opacity: progress,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: item.color || "#1A1A1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        {item.icon && (
          <span style={{ fontSize: 28, color: "#FFFFFF" }}>{item.icon}</span>
        )}
        {item.label && (
          <span
            style={{
              fontFamily: loadFont().fontFamily,
              fontWeight: 800,
              fontSize: 20,
              color: "#FFFFFF",
            }}
          >
            {item.label}
          </span>
        )}
      </div>
    </div>
  );
};

// Pre-defined orbital configurations
export const FRAGMENTED_TOOLS_ORBIT: OrbitItem[] = [
  { icon: "📧", angle: 0, orbitIndex: 1, delay: 0 },
  { icon: "📊", angle: 72, orbitIndex: 1, delay: 8 },
  { icon: "🤖", angle: 144, orbitIndex: 1, delay: 16 },
  { icon: "📅", angle: 216, orbitIndex: 1, delay: 24 },
  { icon: "💬", angle: 288, orbitIndex: 1, delay: 32 },
];

export const ONE_SYSTEM_ORBIT: OrbitItem[] = [
  { icon: "🎯", angle: 0, orbitIndex: 0, delay: 0, color: "#FF6B00" },
  { icon: "📱", angle: 90, orbitIndex: 0, delay: 10, color: "#FF6B00" },
  { icon: "🤖", angle: 180, orbitIndex: 0, delay: 20, color: "#FF6B00" },
  { icon: "📅", angle: 270, orbitIndex: 0, delay: 30, color: "#FF6B00" },
];
