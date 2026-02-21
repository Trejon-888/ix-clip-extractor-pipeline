/**
 * Thirteen Platforms V2 — Real Logos Grid
 *
 * Uses actual SVG logos from public/logos/ via Remotion's Img component.
 * NOT an SVG — a React div component rendered inside ConceptOverlay.
 * Designed for solid-white ConceptOverlay backgrounds.
 */

import React from "react";
import { Img, staticFile, useCurrentFrame, spring } from "remotion";

const PLATFORMS = [
  { name: "YouTube", logo: "logos/youtube.svg", color: "#FF0000" },
  { name: "Instagram", logo: "logos/instagram.svg", color: "#E4405F" },
  { name: "LinkedIn", logo: "logos/linkedin.svg", color: "#0A66C2" },
  { name: "X", logo: "logos/x.svg", color: "#000000" },
  { name: "TikTok", logo: "logos/tiktok.svg", color: "#000000" },
  { name: "Facebook", logo: "logos/facebook.svg", color: "#1877F2" },
  { name: "Pinterest", logo: "logos/pinterest.svg", color: "#E60023" },
  { name: "Threads", logo: "logos/threads.svg", color: "#000000" },
  { name: "Bluesky", logo: "logos/bluesky.svg", color: "#0085FF" },
  { name: "Google Biz", logo: "logos/googlebusiness.svg", color: "#4285F4" },
  { name: "Telegram", logo: "logos/telegram.svg", color: "#26A5E4" },
  { name: "Snapchat", logo: "logos/snapchat.svg", color: "#FFFC00" },
  { name: "Reddit", logo: "logos/reddit.svg", color: "#FF4500" },
];

interface ThirteenPlatformsV2Props {
  size?: number;
}

export const ThirteenPlatformsV2: React.FC<ThirteenPlatformsV2Props> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();

  // 4 columns x 4 rows (13 items + 3 empty)
  const cols = 4;
  const logoSize = 56;
  const gap = 16;
  const cardSize = logoSize + 28;
  const gridWidth = cols * cardSize + (cols - 1) * gap;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      {/* Logo grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cardSize}px)`,
          gap,
          justifyContent: "center",
        }}
      >
        {PLATFORMS.map((platform, index) => {
          const delay = index * 2;
          const scale = spring({
            frame: Math.max(0, frame - delay),
            fps: 30,
            from: 0.3,
            to: 1,
            config: { damping: 12, stiffness: 160 },
          });
          const opacity = spring({
            frame: Math.max(0, frame - delay),
            fps: 30,
            from: 0,
            to: 1,
            config: { damping: 200 },
          });

          return (
            <div
              key={platform.name}
              style={{
                width: cardSize,
                height: cardSize + 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                transform: `scale(${scale})`,
                opacity,
              }}
            >
              <div
                style={{
                  width: cardSize,
                  height: cardSize,
                  borderRadius: 16,
                  backgroundColor: "rgba(245, 245, 245, 0.9)",
                  border: "1px solid #E5E5E5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <Img
                  src={staticFile(platform.logo)}
                  style={{
                    width: logoSize,
                    height: logoSize,
                    objectFit: "contain",
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#666",
                  textAlign: "center",
                  letterSpacing: 0.5,
                }}
              >
                {platform.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
