import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export interface SentenceEntry {
  text: string;
  start: number;
  end: number;
}

export const TypingCaptions: React.FC<{
  sentences: SentenceEntry[];
  maxVisible?: number;
}> = ({ sentences, maxVisible = 3 }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const currentTime = frame / fps;
  const isPortrait = height > width;

  // Find all sentences that have started
  const activeSentences = sentences.filter((s) => s.start <= currentTime);
  if (activeSentences.length === 0) return null;

  // Show last N sentences (including current)
  const visibleSentences = activeSentences.slice(-maxVisible);

  return (
    <div
      style={{
        position: "absolute",
        bottom: isPortrait ? 100 : 50,
        left: isPortrait ? 48 : 40,
        right: isPortrait ? 48 : 40,
        display: "flex",
        flexDirection: "column",
        gap: isPortrait ? 14 : 10,
      }}
    >
      {visibleSentences.map((sentence, i) => {
        const isCurrent = i === visibleSentences.length - 1;

        if (isCurrent) {
          // Typing animation for current sentence
          const duration = sentence.end - sentence.start;
          const elapsed = currentTime - sentence.start;
          const progress = Math.min(1, elapsed / duration);
          const visibleChars = Math.ceil(progress * sentence.text.length);
          const displayText = sentence.text.substring(0, visibleChars);

          return (
            <div
              key={sentence.start}
              style={{
                fontFamily,
                fontSize: isPortrait ? 38 : 30,
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.4,
                textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                ...(!isPortrait && {
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  padding: "10px 18px",
                  borderRadius: 8,
                }),
              }}
            >
              {displayText}
              {progress < 1 && (
                <span
                  style={{
                    display: "inline-block",
                    width: 3,
                    height: "0.85em",
                    backgroundColor: "#FFFFFF",
                    marginLeft: 3,
                    verticalAlign: "baseline",
                  }}
                />
              )}
            </div>
          );
        }

        // Completed sentence — dimmed
        return (
          <div
            key={sentence.start}
            style={{
              fontFamily,
              fontSize: isPortrait ? 34 : 26,
              fontWeight: 600,
              color: "#FFFFFF",
              opacity: 0.45,
              lineHeight: 1.4,
              textShadow: "0 2px 10px rgba(0,0,0,0.9)",
              ...(!isPortrait && {
                backgroundColor: "rgba(0, 0, 0, 0.55)",
                padding: "8px 16px",
                borderRadius: 8,
              }),
            }}
          >
            {sentence.text}
          </div>
        );
      })}
    </div>
  );
};
