/**
 * Unique Per Platform — 4 platform cards with unique content indicators
 *
 * Shows YouTube, TikTok, Threads, Instagram each with different content type.
 * Each card springs in with staggered delay, green checkmarks appear after.
 * V2 pattern with spring animations.
 * Designed for white backgrounds (ConceptOverlay solid-white).
 */

import React from "react";
import { useCurrentFrame, spring, interpolate, Img, staticFile } from "remotion";

const PLATFORMS = [
  { name: "YouTube", logo: "logos/youtube.svg", content: "Title + Tags", accent: "#FF0000" },
  { name: "TikTok", logo: "logos/tiktok.svg", content: "Caption + Cover", accent: "#000000" },
  { name: "Threads", logo: "logos/threads.svg", content: "Thread + Image", accent: "#000000" },
  { name: "Instagram", logo: "logos/instagram.svg", content: "Reel + Caption", accent: "#E1306C" },
];

interface UniquePerPlatformIllustrationProps {
  size?: number;
}

export const UniquePerPlatformIllustration: React.FC<UniquePerPlatformIllustrationProps> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const s = size / 600;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 14 * s,
        padding: 24 * s,
      }}
    >
      {PLATFORMS.map((platform, i) => {
        const delay = i * 5;
        const enter = spring({
          frame: Math.max(0, frame - delay),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 160 },
        });
        const y = interpolate(enter, [0, 1], [30, 0]);

        // Checkmark appears after card
        const checkProgress = spring({
          frame: Math.max(0, frame - delay - 10),
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 14, stiffness: 200 },
        });

        return (
          <div
            key={platform.name}
            style={{
              width: 250 * s,
              height: 250 * s,
              backgroundColor: "#F8F8F8",
              borderRadius: 20 * s,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10 * s,
              opacity: enter,
              transform: `translateY(${y}px) scale(${interpolate(enter, [0, 1], [0.8, 1])})`,
              boxShadow: `0 ${4 * s}px ${20 * s}px rgba(0,0,0,0.08)`,
              border: `2px solid rgba(0,0,0,0.06)`,
              position: "relative",
            }}
          >
            <Img
              src={staticFile(platform.logo)}
              style={{ width: 44 * s, height: 44 * s }}
            />
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 20 * s,
                color: "#1A1A1A",
              }}
            >
              {platform.name}
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: 14 * s,
                color: "#888",
                padding: `${4 * s}px ${10 * s}px`,
                backgroundColor: "rgba(0,0,0,0.04)",
                borderRadius: 8 * s,
              }}
            >
              {platform.content}
            </div>

            {/* Green checkmark badge */}
            <div
              style={{
                position: "absolute",
                top: 10 * s,
                right: 10 * s,
                width: 26 * s,
                height: 26 * s,
                borderRadius: "50%",
                backgroundColor: "#22C55E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: checkProgress,
                transform: `scale(${checkProgress})`,
              }}
            >
              <svg
                width={14 * s}
                height={14 * s}
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8L7 12L13 4"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};
