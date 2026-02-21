/**
 * Content Metadata V2 — YouTube publishing details checklist
 *
 * V2 pattern: useCurrentFrame + spring for staggered check reveals
 * Used for "thumbnail, description, tags" popup moments.
 * Designed for white backgrounds (AppleStylePopup).
 */

import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS } from "../colors";

interface ContentMetadataV2Props {
  size?: number;
}

export const ContentMetadataV2: React.FC<ContentMetadataV2Props> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  const items = [
    { label: "Title", icon: "T" },
    { label: "Description", icon: "D" },
    { label: "Tags", icon: "#" },
    { label: "Thumbnail", icon: "\u25A1" },
    { label: "Category", icon: "\u25C8" },
  ];

  // Title spring entrance
  const titleScale = spring({
    frame,
    fps: 30,
    from: 0.8,
    to: 1,
    config: { damping: 14, stiffness: 120 },
  });

  const titleOpacity = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Title */}
      <text
        x={300}
        y={65}
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize={36}
        fontWeight={800}
        fontFamily="Inter, sans-serif"
        opacity={titleOpacity}
        transform={`translate(0,0) scale(${titleScale})`}
        style={{ transformOrigin: "300px 50px" }}
      >
        PUBLISHED
      </text>

      {/* Subtitle */}
      <text
        x={300}
        y={100}
        textAnchor="middle"
        fill="#6B7280"
        fontSize={18}
        fontWeight={500}
        fontFamily="Inter, sans-serif"
        opacity={titleOpacity}
      >
        All metadata configured
      </text>

      {/* Checklist items with staggered reveals */}
      {items.map((item, index) => {
        const delay = 4 + index * 4;

        const itemOpacity = spring({
          frame: Math.max(0, frame - delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 100 },
        });

        const slideX = interpolate(
          spring({
            frame: Math.max(0, frame - delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 14, stiffness: 100 },
          }),
          [0, 1],
          [-20, 0]
        );

        // Checkmark appears with delay after item
        const checkDelay = delay + 6;
        const checkScale = spring({
          frame: Math.max(0, frame - checkDelay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 10, stiffness: 150 },
        });

        const y = 160 + index * 85;

        return (
          <g
            key={item.label}
            opacity={itemOpacity}
            transform={`translate(${slideX}, 0)`}
          >
            {/* Row background */}
            <rect
              x={100}
              y={y - 28}
              width={400}
              height={56}
              rx={12}
              fill="#F8F8F8"
              stroke="#E5E5E5"
              strokeWidth={1}
            />

            {/* Icon circle */}
            <circle cx={140} cy={y} r={18} fill={COLORS.primary} opacity={0.15} />
            <text
              x={140}
              y={y + 6}
              textAnchor="middle"
              fill={COLORS.primary}
              fontSize={16}
              fontWeight={700}
              fontFamily="Inter, sans-serif"
            >
              {item.icon}
            </text>

            {/* Label */}
            <text
              x={175}
              y={y + 6}
              fill="#1A1A1A"
              fontSize={22}
              fontWeight={600}
              fontFamily="Inter, sans-serif"
            >
              {item.label}
            </text>

            {/* Checkmark */}
            <circle
              cx={460}
              cy={y}
              r={interpolate(checkScale, [0, 1], [0, 14])}
              fill={COLORS.primary}
            />
            <text
              x={460}
              y={y + 5}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={16}
              fontWeight={700}
              opacity={checkScale}
            >
              {"\u2713"}
            </text>
          </g>
        );
      })}

      {/* Orange accent bar at bottom */}
      <rect
        x={200}
        y={560}
        width={interpolate(frame, [24, 34], [0, 200], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
        height={3}
        rx={2}
        fill={COLORS.primary}
      />
    </svg>
  );
};
