/**
 * PhraseCaption — Short-Phrase Caption System v2
 *
 * Automatically chunks sentences into 3-5 word phrases.
 * Shows one phrase at a time with bold keyword emphasis.
 * Quick fade transitions. Hides during popup frames.
 *
 * Part of the Short-Form Editing System v2:
 *   - Replaces TypingCaptions for short-form clips
 *   - 3-5 words per display, NEVER full sentences
 *   - Keyword emphasis in bold + brand orange
 */

import React from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export interface SentenceEntry {
  text: string;
  start: number; // seconds
  end: number;   // seconds
}

interface Phrase {
  words: string[];
  startFrame: number;
  endFrame: number;
}

export interface PhraseCaptionProps {
  sentences: SentenceEntry[];
  emphasisWords?: string[];
  maxWordsPerPhrase?: number;
  accentColor?: string;
  fontSize?: number;
  hideFrames?: Array<{ start: number; end: number }>;
}

/**
 * Chunk a sentence into phrases of maxWords length.
 * Distributes timing evenly across phrases within the sentence.
 */
function chunkSentence(
  sentence: SentenceEntry,
  maxWords: number,
  fps: number
): Phrase[] {
  const words = sentence.text.split(/\s+/).filter((w) => w.length > 0);
  if (words.length === 0) return [];

  const phrases: Phrase[] = [];
  const totalFrames =
    Math.round(sentence.end * fps) - Math.round(sentence.start * fps);
  const startFrame = Math.round(sentence.start * fps);

  // Create chunks of maxWords
  const chunks: string[][] = [];
  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords));
  }

  // If last chunk is only 1 word and there's a previous chunk, merge
  if (chunks.length > 1 && chunks[chunks.length - 1].length === 1) {
    const lastWord = chunks.pop()![0];
    chunks[chunks.length - 1].push(lastWord);
  }

  // Distribute timing proportionally by word count
  const totalWords = words.length;
  let frameOffset = 0;

  for (const chunk of chunks) {
    const proportion = chunk.length / totalWords;
    const chunkFrames = Math.round(totalFrames * proportion);

    phrases.push({
      words: chunk,
      startFrame: startFrame + frameOffset,
      endFrame: startFrame + frameOffset + chunkFrames,
    });

    frameOffset += chunkFrames;
  }

  return phrases;
}

export const PhraseCaption: React.FC<PhraseCaptionProps> = ({
  sentences,
  emphasisWords = [],
  maxWordsPerPhrase = 4,
  accentColor = "#FF6B00",
  fontSize = 56,
  hideFrames = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Generate all phrases from sentences
  const allPhrases = sentences.flatMap((s) =>
    chunkSentence(s, maxWordsPerPhrase, fps)
  );

  // Find current phrase
  const currentPhrase = allPhrases.find(
    (p) => frame >= p.startFrame && frame < p.endFrame
  );

  if (!currentPhrase) return null;

  // Check if we should hide (during popups)
  const isHidden = hideFrames.some(
    (h) => frame >= h.start && frame < h.end
  );
  if (isHidden) return null;

  // Fade in/out
  const FADE_IN = 6;
  const FADE_OUT = 4;
  const phraseFrame = frame - currentPhrase.startFrame;
  const phraseDuration = currentPhrase.endFrame - currentPhrase.startFrame;

  const fadeIn = interpolate(phraseFrame, [0, FADE_IN], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    phraseFrame,
    [phraseDuration - FADE_OUT, phraseDuration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Slight upward motion on entrance
  const slideY = interpolate(phraseFrame, [0, FADE_IN], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Normalize emphasis words to lowercase for matching
  const emphasisLower = emphasisWords.map((w) => w.toLowerCase());

  // Check if a word should be emphasized
  const isEmphasis = (word: string) => {
    const clean = word.replace(/[.,!?;:'"]/g, "").toLowerCase();
    return emphasisLower.some(
      (ew) => clean === ew || clean.includes(ew) || ew.includes(clean)
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "8%",
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: 10,
        opacity,
        transform: `translateY(${slideY}px)`,
        pointerEvents: "none",
      }}
    >
      {/* Gradient background */}
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          left: 0,
          width: "100%",
          height: "200px",
          background:
            "linear-gradient(transparent, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.7))",
          zIndex: -1,
        }}
      />

      {/* Phrase text */}
      <div
        style={{
          display: "flex",
          gap: "0.3em",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 40px",
          maxWidth: "90%",
        }}
      >
        {currentPhrase.words.map((word, i) => {
          const emphasized = isEmphasis(word);
          return (
            <span
              key={`${currentPhrase.startFrame}-${i}`}
              style={{
                fontFamily,
                fontWeight: emphasized ? 900 : 800,
                fontSize,
                color: emphasized ? accentColor : "#FFFFFF",
                textShadow: emphasized
                  ? `0 0 20px rgba(255, 107, 0, 0.5), 0 4px 12px rgba(0,0,0,0.8)`
                  : "0 4px 12px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.6)",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                lineHeight: 1.15,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
