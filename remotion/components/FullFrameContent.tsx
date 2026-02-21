import { Img, Video, staticFile, useCurrentFrame, interpolate } from 'remotion';
import React from 'react';

interface FullFrameContentProps {
  type: 'image' | 'video';
  src: string;
  caption?: string;
  blurBackground?: boolean;
  scaleContent?: number;
}

/**
 * Full-Frame Content Component
 *
 * FIXES:
 * - Content actually FILLS the available space (90%+)
 * - Blur background when needed
 * - Smooth entry animation
 * - Professional scaling
 */
export const FullFrameContent: React.FC<FullFrameContentProps> = ({
  type,
  src,
  caption,
  blurBackground = false,
  scaleContent = 0.95,
}) => {
  const frame = useCurrentFrame();

  // Entry animation
  const scale = interpolate(frame, [0, 15], [0.85, scaleContent], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: blurBackground ? 'rgba(0, 0, 0, 0.4)' : 'transparent',
      backdropFilter: blurBackground ? 'blur(20px)' : 'none',
      padding: '0',
    }}>
      {/* Content - FILLS ENTIRE ZONE, no empty space */}
      <div style={{
        transform: `scale(${scale})`,
        opacity,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {type === 'video' ? (
          <Video
            src={staticFile(src)}
            volume={0}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Img
            src={staticFile(src)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </div>
    </div>
  );
};
