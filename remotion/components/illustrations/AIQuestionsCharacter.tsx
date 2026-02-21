import React from "react";

export const AIQuestionsCharacter: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* White background */}
    <rect width="600" height="600" fill="#FFFFFF" />

    {/* Large AI Brain - central focal point */}
    <g id="ai-brain">
      {/* Brain glow effect */}
      <circle cx="300" cy="200" r="95" fill="#9AFF00" opacity="0.2" />

      {/* Main brain shape */}
      <path
        d="M250 180 Q235 165 240 145 Q245 125 265 120 Q285 115 300 125 Q315 115 335 120 Q355 125 360 145 Q365 165 350 180 Q355 195 350 215 Q345 235 325 240 Q305 245 300 235 Q295 245 275 240 Q255 235 250 215 Q245 195 250 180 Z"
        fill="#9AFF00"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Brain details - neural pathways */}
      <path d="M265 150 Q275 145 285 150" stroke="#000000" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M315 150 Q325 145 335 150" stroke="#000000" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M270 180 Q280 175 290 180" stroke="#000000" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M310 180 Q320 175 330 180" stroke="#000000" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M275 210 Q285 205 295 210" stroke="#000000" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M305 210 Q315 205 325 210" stroke="#000000" strokeWidth="3" fill="none" opacity="0.6" />

      {/* AI "eyes" - circuit dots */}
      <circle cx="275" cy="170" r="6" fill="#000000" />
      <circle cx="325" cy="170" r="6" fill="#000000" />

      {/* Connecting lines to show AI processing */}
      <line x1="300" y1="240" x2="300" y2="280" stroke="#9AFF00" strokeWidth="4" strokeDasharray="8 4" />
    </g>

    {/* Professional character - thinking pose */}
    <g id="character">
      {/* Head */}
      <circle cx="300" cy="330" r="45" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Hair */}
      <path
        d="M255 320 Q255 285 275 275 Q295 270 310 280 Q325 270 345 285 Q345 305 340 320"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3"
      />

      {/* Neck */}
      <path d="M285 370 L285 390 L315 390 L315 370" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Torso */}
      <path
        d="M270 390 L260 460 Q260 475 275 475 L325 475 Q340 475 340 460 L330 390 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Right arm - hand on chin (thinking) */}
      <path
        d="M320 400 Q340 410 345 435"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Hand at chin */}
      <ellipse cx="335" cy="350" rx="15" ry="18" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(30 335 350)" />

      {/* Left arm */}
      <path
        d="M280 400 Q260 410 255 445"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="255" cy="450" rx="13" ry="16" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Legs */}
      <path d="M285 475 L280 535" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <path d="M315 475 L320 535" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="280" cy="540" rx="20" ry="11" fill="#000000" />
      <ellipse cx="320" cy="540" rx="20" ry="11" fill="#000000" />

      {/* Face - thoughtful expression */}
      <circle cx="285" cy="320" r="5" fill="#000000" />
      <circle cx="315" cy="320" r="5" fill="#000000" />
      {/* Slight smile */}
      <path d="M285 345 Q300 352 315 345" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Thoughtful eyebrows */}
      <path d="M275 310 L290 307" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M310 307 L325 310" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Question speech bubbles - three key questions */}
    <g id="question-bubbles">
      {/* Bubble 1: OFFER? */}
      <g transform="translate(80, 120)">
        <rect x="0" y="0" width="120" height="70" rx="12" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
        <circle cx="30" cy="35" r="18" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <text x="60" y="25" fill="#000000" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">OFFER</text>
        <text x="60" y="50" fill="#000000" fontSize="32" fontWeight="900" fontFamily="Inter, sans-serif">?</text>
        {/* Bubble tail */}
        <path d="M100 65 L110 80 L95 70" fill="#FFFFFF" stroke="#000000" strokeWidth="3" strokeLinejoin="round" />
      </g>

      {/* Bubble 2: TARGET? */}
      <g transform="translate(400, 100)">
        <rect x="0" y="0" width="130" height="70" rx="12" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
        <circle cx="30" cy="35" r="18" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <text x="60" y="25" fill="#000000" fontSize="15" fontWeight="700" fontFamily="Inter, sans-serif">TARGET</text>
        <text x="70" y="50" fill="#000000" fontSize="32" fontWeight="900" fontFamily="Inter, sans-serif">?</text>
        {/* Bubble tail */}
        <path d="M30 65 L20 80 L35 70" fill="#FFFFFF" stroke="#000000" strokeWidth="3" strokeLinejoin="round" />
      </g>

      {/* Bubble 3: TONE? */}
      <g transform="translate(90, 400)">
        <rect x="0" y="0" width="110" height="70" rx="12" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
        <circle cx="30" cy="35" r="18" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <text x="60" y="25" fill="#000000" fontSize="17" fontWeight="700" fontFamily="Inter, sans-serif">TONE</text>
        <text x="55" y="50" fill="#000000" fontSize="32" fontWeight="900" fontFamily="Inter, sans-serif">?</text>
        {/* Bubble tail */}
        <path d="M90 35 L120 30 L95 45" fill="#FFFFFF" stroke="#000000" strokeWidth="3" strokeLinejoin="round" />
      </g>

      {/* Bubble 4: GOALS? */}
      <g transform="translate(410, 410)">
        <rect x="0" y="0" width="115" height="70" rx="12" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
        <circle cx="30" cy="35" r="18" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <text x="60" y="25" fill="#000000" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">GOALS</text>
        <text x="57" y="50" fill="#000000" fontSize="32" fontWeight="900" fontFamily="Inter, sans-serif">?</text>
        {/* Bubble tail */}
        <path d="M25 35 L5 30 L20 45" fill="#FFFFFF" stroke="#000000" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </g>

    {/* Sparkles - thinking/processing effect */}
    <g id="sparkles">
      <path d="M220 260 L223 270 L233 273 L223 276 L220 286 L217 276 L207 273 L217 270 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M380 265 L382 273 L390 275 L382 277 L380 285 L378 277 L370 275 L378 273 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M355 215 L357 222 L364 224 L357 226 L355 233 L353 226 L346 224 L353 222 Z" fill="#9AFF00" stroke="#000000" strokeWidth="1.5" />
      <path d="M245 215 L247 222 L254 224 L247 226 L245 233 L243 226 L236 224 L243 222 Z" fill="#9AFF00" stroke="#000000" strokeWidth="1.5" />
    </g>

    {/* Black border frame */}
    <rect width="600" height="600" fill="none" stroke="#000000" strokeWidth="8" />
  </svg>
);
