import React from "react";
import { Audio, staticFile, useCurrentFrame } from "remotion";

export interface AudioSFXTriggerProps {
  frame: number;       // Frame to trigger SFX
  volume?: number;     // Default 0.126 (-18dB)
  sfxFile?: string;    // Sound file name (default: "pop.wav")
}

export const AudioSFXTrigger: React.FC<AudioSFXTriggerProps> = ({
  frame: triggerFrame,
  volume = 0.126,
  sfxFile = "pop.wav",
}) => {
  const currentFrame = useCurrentFrame();

  if (currentFrame < triggerFrame) {
    return null;
  }

  return (
    <Audio
      src={staticFile(sfxFile)}
      volume={volume}
      startFrom={0}
    />
  );
};
