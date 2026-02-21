import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { noise2D } from "@remotion/noise";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLORS } from "../lib/colors";

const { fontFamily } = loadFont();

export interface Script17Intro3DProps {
  durationInFrames: number;
}

// Particle configuration
const PARTICLE_COUNT = 40;
const generateParticles = (seed: number) =>
  Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    baseX: Math.random() * 1080,
    baseY: Math.random() * 1920,
    size: 4 + Math.random() * 12,
    speed: 0.5 + Math.random() * 1.5,
    opacity: 0.3 + Math.random() * 0.5,
    layer: Math.floor(Math.random() * 3), // 0 = back, 1 = mid, 2 = front
  }));

const PARTICLES = generateParticles(42);

/**
 * Sophisticated 3D-like intro for Script17
 * Features:
 * - Depth layers with parallax
 * - Noise-based floating particles
 * - Animated "50+" with 3D depth effect
 * - Orange glow and accent colors
 * - Smooth morphing animations
 */
export const Script17Intro3D: React.FC<Script17Intro3DProps> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === FADE IN/OUT ===
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // === "50+" NUMBER ANIMATION ===
  const numberScale = spring({
    frame,
    fps,
    from: 0.3,
    to: 1,
    config: { damping: 8, stiffness: 80 },
  });

  const numberRotateX = interpolate(
    spring({
      frame,
      fps,
      from: 0,
      to: 1,
      config: { damping: 12, stiffness: 100 },
    }),
    [0, 1],
    [-20, 0]
  );

  const numberY = spring({
    frame,
    fps,
    from: 100,
    to: 0,
    config: { damping: 15, stiffness: 120 },
  });

  // Subtle floating animation after initial entrance
  const floatOffset = Math.sin(frame * 0.05) * 8;

  // === "AGENCIES" TEXT ===
  const agenciesProgress = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  const agenciesY = interpolate(agenciesProgress, [0, 1], [60, 0]);
  const agenciesScale = interpolate(agenciesProgress, [0, 1], [0.8, 1]);

  // === "SAME MISTAKE" TEXT ===
  const mistakeProgress = spring({
    frame: Math.max(0, frame - 35),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });

  const mistakeScale = spring({
    frame: Math.max(0, frame - 35),
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 10, stiffness: 150 },
  });

  // === GLOW PULSE ===
  const glowPulse = 0.7 + Math.sin(frame * 0.1) * 0.3;

  // === BACKGROUND RINGS ===
  const ring1Scale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    from: 0.3,
    to: 1,
    config: { damping: 20, stiffness: 80 },
  });

  const ring2Scale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0.3,
    to: 1.2,
    config: { damping: 25, stiffness: 60 },
  });

  const ring3Scale = spring({
    frame: Math.max(0, frame - 15),
    fps,
    from: 0.3,
    to: 1.4,
    config: { damping: 30, stiffness: 50 },
  });

  // Ring rotation
  const ringRotation = frame * 0.3;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        opacity,
        overflow: "hidden",
      }}
    >
      {/* === LAYER 0: Background gradient === */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at center, ${COLORS.darkGray} 0%, ${COLORS.dark} 70%)`,
        }}
      />

      {/* === LAYER 1: Back particles (slow, large, blurred) === */}
      {PARTICLES.filter((p) => p.layer === 0).map((particle) => {
        const noiseX = noise2D("x" + particle.id, frame * 0.005 * particle.speed, 0) * 100;
        const noiseY = noise2D("y" + particle.id, 0, frame * 0.005 * particle.speed) * 100;
        return (
          <div
            key={`back-${particle.id}`}
            style={{
              position: "absolute",
              left: particle.baseX + noiseX,
              top: particle.baseY + noiseY,
              width: particle.size * 2,
              height: particle.size * 2,
              borderRadius: "50%",
              backgroundColor: COLORS.primary,
              opacity: particle.opacity * 0.3 * fadeIn,
              filter: "blur(8px)",
              transform: `scale(${0.8 + Math.sin(frame * 0.02 + particle.id) * 0.2})`,
            }}
          />
        );
      })}

      {/* === LAYER 2: Animated rings === */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Ring 3 (outermost) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 800,
            height: 800,
            marginLeft: -400,
            marginTop: -400,
            borderRadius: "50%",
            border: `2px solid ${COLORS.primary}`,
            opacity: 0.15 * ring3Scale,
            transform: `scale(${ring3Scale}) rotate(${ringRotation}deg)`,
          }}
        />

        {/* Ring 2 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 600,
            height: 600,
            marginLeft: -300,
            marginTop: -300,
            borderRadius: "50%",
            border: `3px solid ${COLORS.primary}`,
            opacity: 0.25 * ring2Scale,
            transform: `scale(${ring2Scale}) rotate(${-ringRotation * 0.7}deg)`,
          }}
        />

        {/* Ring 1 (innermost) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 400,
            height: 400,
            marginLeft: -200,
            marginTop: -200,
            borderRadius: "50%",
            border: `4px solid ${COLORS.primary}`,
            opacity: 0.4 * ring1Scale,
            transform: `scale(${ring1Scale}) rotate(${ringRotation * 0.5}deg)`,
          }}
        />
      </div>

      {/* === LAYER 3: Mid particles === */}
      {PARTICLES.filter((p) => p.layer === 1).map((particle) => {
        const noiseX = noise2D("x" + particle.id, frame * 0.008 * particle.speed, 0) * 80;
        const noiseY = noise2D("y" + particle.id, 0, frame * 0.008 * particle.speed) * 80;
        return (
          <div
            key={`mid-${particle.id}`}
            style={{
              position: "absolute",
              left: particle.baseX + noiseX,
              top: particle.baseY + noiseY,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              backgroundColor: COLORS.primaryLight,
              opacity: particle.opacity * 0.5 * fadeIn,
              filter: "blur(3px)",
            }}
          />
        );
      })}

      {/* === LAYER 4: Center glow === */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 500,
          height: 500,
          marginLeft: -250,
          marginTop: -250,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primaryGlow} 0%, transparent 70%)`,
          opacity: glowPulse * numberScale,
          filter: "blur(40px)",
        }}
      />

      {/* === LAYER 5: Main content === */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* "50+" with 3D depth effect */}
        <div
          style={{
            position: "relative",
            transform: `
              scale(${numberScale})
              translateY(${numberY + floatOffset}px)
              perspective(1000px)
              rotateX(${numberRotateX}deg)
            `,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Shadow/depth layers */}
          {[5, 4, 3, 2, 1].map((depth) => (
            <div
              key={depth}
              style={{
                position: "absolute",
                fontFamily,
                fontWeight: 900,
                fontSize: 320,
                color: COLORS.dark,
                lineHeight: 0.85,
                letterSpacing: -15,
                transform: `translateZ(${-depth * 4}px) translateY(${depth * 2}px)`,
                opacity: 0.15,
              }}
            >
              50+
            </div>
          ))}

          {/* Main number */}
          <div
            style={{
              fontFamily,
              fontWeight: 900,
              fontSize: 320,
              color: COLORS.white,
              lineHeight: 0.85,
              letterSpacing: -15,
              textShadow: `
                0 0 60px ${COLORS.primaryGlow},
                0 0 120px ${COLORS.primaryGlow},
                0 4px 8px rgba(0,0,0,0.5)
              `,
            }}
          >
            50+
          </div>
        </div>

        {/* "AGENCIES" */}
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: 80,
            color: COLORS.primary,
            letterSpacing: 12,
            marginTop: -20,
            opacity: agenciesProgress,
            transform: `translateY(${agenciesY}px) scale(${agenciesScale})`,
            textShadow: `0 0 40px ${COLORS.primaryGlow}`,
          }}
        >
          AGENCIES
        </div>

        {/* Divider line */}
        <div
          style={{
            width: interpolate(mistakeProgress, [0, 1], [0, 350]),
            height: 4,
            backgroundColor: COLORS.white,
            marginTop: 40,
            marginBottom: 40,
            borderRadius: 2,
            opacity: 0.8,
          }}
        />

        {/* "SAME MISTAKE" */}
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 52,
            color: COLORS.lightGray,
            letterSpacing: 8,
            opacity: mistakeProgress,
            transform: `scale(${mistakeScale})`,
          }}
        >
          SAME MISTAKE
        </div>
      </AbsoluteFill>

      {/* === LAYER 6: Front particles (fast, small, sharp) === */}
      {PARTICLES.filter((p) => p.layer === 2).map((particle) => {
        const noiseX = noise2D("x" + particle.id, frame * 0.012 * particle.speed, 0) * 60;
        const noiseY = noise2D("y" + particle.id, 0, frame * 0.012 * particle.speed) * 60;
        return (
          <div
            key={`front-${particle.id}`}
            style={{
              position: "absolute",
              left: particle.baseX + noiseX,
              top: particle.baseY + noiseY,
              width: particle.size * 0.6,
              height: particle.size * 0.6,
              borderRadius: "50%",
              backgroundColor: COLORS.white,
              opacity: particle.opacity * 0.7 * fadeIn,
            }}
          />
        );
      })}

      {/* === LAYER 7: Vignette === */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
