import React from "react";
import { OffthreadVideo, staticFile } from "remotion";

export interface FaceCenteredVideoProps {
  videoSrc: string;
  startFrom: number;
  transform: {
    scale: number;
    translateX: number;
    translateY: number;
  };
  containerSize: { width: number; height: number };
  originalSize: { width: number; height: number };
}

/**
 * Video component with intelligent face-centered positioning for portrait videos
 * Uses CSS transform to scale and position video so speaker's mouth
 * appears at target position in portrait frame
 *
 * Transform calculation:
 * 1. Scale to fill portrait height from landscape
 * 2. Translate to position mouth at target (horizontal center, upper-middle vertical)
 */
export const FaceCenteredVideo: React.FC<FaceCenteredVideoProps> = ({
  videoSrc,
  startFrom,
  transform,
  containerSize,
  originalSize,
}) => {
  const videoStyle: React.CSSProperties = {
    position: "absolute",
    width: originalSize.width,
    height: originalSize.height,
    transform: `scale(${transform.scale}) translate(${transform.translateX}px, ${transform.translateY}px)`,
    transformOrigin: "top left",
  };

  return (
    <div
      style={{
        width: containerSize.width,
        height: containerSize.height,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#0D0D0D",
      }}
    >
      <OffthreadVideo
        src={staticFile(videoSrc)}
        startFrom={startFrom}
        style={videoStyle}
      />
    </div>
  );
};
