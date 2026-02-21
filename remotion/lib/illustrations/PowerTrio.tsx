import React from "react";

interface Props {
  size?: number;
}

/**
 * Three interconnected pillars representing Infrastructure + Personalization + Reply Speed,
 * with a rocket/growth arrow showing the combined effect.
 */
export const PowerTrio: React.FC<Props> = ({ size = 500 }) => {
  const s = size / 500;
  return (
    <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
      {/* Background circle */}
      <circle cx="250" cy="250" r="230" fill="#FFF3E6" stroke="#FF6B00" strokeWidth={3 * s} />

      {/* Three pillars */}
      {/* Pillar 1: Infrastructure (left) */}
      <rect x="80" y="220" width="90" height="160" rx="12" fill="#FF6B00" stroke="#0D0D0D" strokeWidth={3} />
      <text x="125" y="270" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="14" fill="#FFF">INFRA</text>
      {/* Server icon */}
      <rect x="105" y="290" width="40" height="12" rx="3" fill="#FFF" />
      <rect x="105" y="308" width="40" height="12" rx="3" fill="#FFF" />
      <rect x="105" y="326" width="40" height="12" rx="3" fill="#FFF" />
      <circle cx="135" cy="296" r="3" fill="#FF6B00" />
      <circle cx="135" cy="314" r="3" fill="#FF6B00" />
      <circle cx="135" cy="332" r="3" fill="#FF6B00" />
      {/* Happy face */}
      <circle cx="110" cy="358" r="2.5" fill="#FFF" />
      <circle cx="140" cy="358" r="2.5" fill="#FFF" />
      <path d="M112 365 Q125 374 138 365" stroke="#FFF" strokeWidth={2} fill="none" strokeLinecap="round" />

      {/* Pillar 2: Personalization (center, taller) */}
      <rect x="205" y="180" width="90" height="200" rx="12" fill="#FF6B00" stroke="#0D0D0D" strokeWidth={3} />
      <text x="250" y="225" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="12" fill="#FFF">PERSON-</text>
      <text x="250" y="240" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="12" fill="#FFF">ALIZE</text>
      {/* AI chat bubbles */}
      <rect x="220" y="258" width="50" height="20" rx="8" fill="#FFF" />
      <rect x="230" y="286" width="50" height="20" rx="8" fill="#FFF" />
      <text x="245" y="272" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="#FF6B00">AI ✓</text>
      <text x="255" y="300" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="#FF6B00">Hi Sam!</text>
      {/* Happy face */}
      <circle cx="235" cy="340" r="2.5" fill="#FFF" />
      <circle cx="265" cy="340" r="2.5" fill="#FFF" />
      <path d="M237 347 Q250 356 263 347" stroke="#FFF" strokeWidth={2} fill="none" strokeLinecap="round" />

      {/* Pillar 3: Reply Speed (right) */}
      <rect x="330" y="240" width="90" height="140" rx="12" fill="#FF6B00" stroke="#0D0D0D" strokeWidth={3} />
      <text x="375" y="280" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="14" fill="#FFF">SPEED</text>
      {/* Clock icon */}
      <circle cx="375" cy="320" r="22" fill="#FFF" stroke="#0D0D0D" strokeWidth={2} />
      <line x1="375" y1="320" x2="375" y2="305" stroke="#0D0D0D" strokeWidth={2.5} strokeLinecap="round" />
      <line x1="375" y1="320" x2="385" y2="325" stroke="#FF6B00" strokeWidth={2.5} strokeLinecap="round" />
      {/* Speed lines */}
      <line x1="350" y1="308" x2="340" y2="303" stroke="#0D0D0D" strokeWidth={2} strokeLinecap="round" />
      <line x1="350" y1="320" x2="338" y2="320" stroke="#0D0D0D" strokeWidth={2} strokeLinecap="round" />
      <line x1="350" y1="332" x2="340" y2="337" stroke="#0D0D0D" strokeWidth={2} strokeLinecap="round" />
      {/* Happy face */}
      <circle cx="360" cy="358" r="2.5" fill="#FFF" />
      <circle cx="390" cy="358" r="2.5" fill="#FFF" />
      <path d="M362 365 Q375 374 388 365" stroke="#FFF" strokeWidth={2} fill="none" strokeLinecap="round" />

      {/* Connection lines between pillars */}
      <line x1="170" y1="300" x2="205" y2="280" stroke="#0D0D0D" strokeWidth={3} strokeDasharray="6 4" />
      <line x1="295" y1="280" x2="330" y2="310" stroke="#0D0D0D" strokeWidth={3} strokeDasharray="6 4" />

      {/* Rising arrow on top */}
      <path d="M160 170 Q250 80 340 170" stroke="#FF6B00" strokeWidth={4} fill="none" strokeLinecap="round" />
      <polygon points="340,160 340,180 355,170" fill="#FF6B00" />

      {/* Sparkles */}
      <text x="230" y="110" fontSize="28">🚀</text>
      <circle cx="140" cy="140" r="5" fill="#FF6B00" opacity="0.6" />
      <circle cx="370" cy="140" r="4" fill="#FF6B00" opacity="0.5" />
      <circle cx="250" cy="420" r="6" fill="#FF6B00" opacity="0.4" />

      {/* "= RESULTS" text at bottom */}
      <text x="250" y="460" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="24" fill="#0D0D0D">
        ALL THREE = RESULTS
      </text>
    </svg>
  );
};
