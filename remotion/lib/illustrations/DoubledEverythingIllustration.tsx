/**
 * Doubled Everything — 2× Growth Visualization
 *
 * Shows 3 metrics (Bookings, Revenue, Business) with animated 2× indicators.
 * Used in Clip 1 "From Zero to $90K" — the proof moment.
 * V2 pattern: useCurrentFrame + interpolate for motion.
 */

import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";

export const DoubledEverythingIllustration: React.FC<{ size?: number }> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const metrics = [
    { label: "Bookings", delay: 0 },
    { label: "Revenue", delay: 6 },
    { label: "Business", delay: 12 },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {metrics.map((metric, i) => {
        const entryProgress = spring({
          frame: Math.max(0, frame - metric.delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 120 },
        });

        const countUp = interpolate(
          Math.max(0, frame - metric.delay - 5),
          [0, 25],
          [1, 2],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const barWidth = interpolate(
          Math.max(0, frame - metric.delay - 5),
          [0, 25],
          [80, 160],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const y = 155 + i * 140;

        return (
          <g
            key={metric.label}
            opacity={entryProgress}
            transform={`translate(${interpolate(entryProgress, [0, 1], [40, 0])}, 0)`}
          >
            {/* Metric label */}
            <text
              x="120"
              y={y}
              textAnchor="start"
              fill="#1A1A1A"
              fontSize="28"
              fontWeight="700"
              fontFamily="Inter, system-ui, sans-serif"
            >
              {metric.label}
            </text>

            {/* Bar background */}
            <rect
              x="120"
              y={y + 16}
              width="300"
              height="32"
              rx="16"
              fill="#F3F4F6"
            />

            {/* Animated bar */}
            <rect
              x="120"
              y={y + 16}
              width={barWidth}
              height="32"
              rx="16"
              fill="#22C55E"
              opacity="0.9"
            />

            {/* 2× badge */}
            <g
              transform={`translate(${120 + barWidth + 16}, ${y + 32}) scale(${entryProgress})`}
            >
              <rect
                x="-30"
                y="-18"
                width="60"
                height="36"
                rx="18"
                fill="#FF6B00"
              />
              <text
                x="0"
                y="6"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="20"
                fontWeight="900"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {countUp.toFixed(1)}×
              </text>
            </g>

            {/* Arrow up */}
            <path
              d={`M${120 + barWidth + 60},${y + 40} L${120 + barWidth + 60},${y + 12} L${120 + barWidth + 52},${y + 22} M${120 + barWidth + 60},${y + 12} L${120 + barWidth + 68},${y + 22}`}
              stroke="#22C55E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={entryProgress}
            />
          </g>
        );
      })}

      {/* Title */}
      <text
        x="300"
        y="80"
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize="22"
        fontWeight="600"
        fontFamily="Inter, system-ui, sans-serif"
        opacity={interpolate(frame, [0, 8], [0, 0.6], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      >
        AFTER IMPLEMENTING IX
      </text>
    </svg>
  );
};
