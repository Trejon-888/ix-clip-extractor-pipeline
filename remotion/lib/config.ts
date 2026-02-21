export const VIDEO_FPS = 30;

export const RESOLUTIONS = {
  landscape: { width: 1920, height: 1080 },
  portrait: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
  linkedinCarousel: { width: 1080, height: 1350 },
} as const;

export type ResolutionKey = keyof typeof RESOLUTIONS;
