import React from "react";
import { OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

/**
 * Circular Face Video Component for Educational Explainer Style
 *
 * Bottom zone of portrait video - displays talking head in circular crop
 * Positioned at bottom center with subtle glow effect
 */

interface CircularFaceVideoProps {
  videoSrc: string;
  startFrom: number;
  // Face transform from portrait conversion
  transform: {
    scale: number;
    translateX: number;
    translateY: number;
  };
  originalSize: { width: number; height: number };
  // Circular crop settings
  circleRadius?: number; // Default: 320px (large enough for face clarity)
  bottomOffset?: number; // Distance from bottom, default: 100px
}

export const CircularFaceVideo: React.FC<CircularFaceVideoProps> = ({
  videoSrc,
  startFrom,
  transform,
  originalSize,
  circleRadius = 320,
  bottomOffset = 100,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Subtle entrance animation (first 15 frames)
  const entrance = interpolate(frame, [0, 15], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Video transform to match portrait positioning
  const videoStyle: React.CSSProperties = {
    position: "absolute",
    width: originalSize.width,
    height: originalSize.height,
    transform: `scale(${transform.scale}) translate(${transform.translateX}px, ${transform.translateY}px)`,
    transformOrigin: "top left",
  };

  // Circle position - bottom center
  const circleX = width / 2;
  const circleY = height - bottomOffset - circleRadius;

  return (
    <div
      style={{
        position: "absolute",
        left: circleX,
        top: circleY,
        width: circleRadius * 2,
        height: circleRadius * 2,
        transform: `translate(-50%, 0) scale(${entrance})`,
        opacity,
        overflow: "hidden",
        borderRadius: "50%",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 4px rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Video layer */}
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
          startFrom={startFrom}
          style={videoStyle}
        />
      </div>

      {/* Subtle ring highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid rgba(255, 118, 20, 0.3)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
