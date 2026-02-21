import React from "react";

export const PipelineCharacter: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* White background */}
    <rect width="600" height="600" fill="#FFFFFF" />

    {/* Pipeline stages - game level progression */}
    <g id="pipeline-stages">
      {/* Stage 1 - LEAD (left, lower) */}
      <g transform="translate(70, 380)">
        <rect x="0" y="0" width="130" height="120" rx="15" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
        {/* Stage number badge */}
        <circle cx="25" cy="25" r="18" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <text x="25" y="33" textAnchor="middle" fill="#000000" fontSize="22" fontWeight="900" fontFamily="Inter, sans-serif">1</text>
        {/* Stage label */}
        <text x="65" y="65" textAnchor="middle" fill="#000000" fontSize="28" fontWeight="900" fontFamily="Inter, sans-serif">LEAD</text>
        {/* Person icon */}
        <circle cx="65" cy="90" r="8" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
        <path d="M55 100 L65 105 L75 100" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Checkmark */}
        <path d="M100 25 L108 33 L123 18" stroke="#9AFF00" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Arrow 1 - connecting to stage 2 */}
      <g>
        <path d="M200 440 L270 370" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
        <path d="M250 375 L270 370 L265 390" fill="#000000" />
        {/* Motion dashes along arrow */}
        <circle cx="220" cy="420" r="5" fill="#9AFF00" />
        <circle cx="240" cy="400" r="5" fill="#9AFF00" />
      </g>

      {/* Stage 2 - QUALIFY (center) */}
      <g transform="translate(270, 280)">
        <rect x="0" y="0" width="140" height="120" rx="15" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
        {/* Stage number badge */}
        <circle cx="25" cy="25" r="18" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <text x="25" y="33" textAnchor="middle" fill="#000000" fontSize="22" fontWeight="900" fontFamily="Inter, sans-serif">2</text>
        {/* Stage label */}
        <text x="70" y="65" textAnchor="middle" fill="#000000" fontSize="25" fontWeight="900" fontFamily="Inter, sans-serif">QUALIFY</text>
        {/* Magnifying glass icon */}
        <circle cx="55" cy="90" r="12" fill="none" stroke="#9AFF00" strokeWidth="3" />
        <line x1="64" y1="99" x2="75" y2="110" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" />
        {/* Stars showing validation */}
        <path d="M100 85 L102 90 L107 91 L102 92 L100 97 L98 92 L93 91 L98 90 Z" fill="#9AFF00" stroke="#000000" strokeWidth="1" />
        <path d="M115 90 L117 95 L122 96 L117 97 L115 102 L113 97 L108 96 L113 95 Z" fill="#9AFF00" stroke="#000000" strokeWidth="1" />
      </g>

      {/* Arrow 2 - connecting to stage 3 */}
      <g>
        <path d="M410 340 L465 250" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
        <path d="M450 260 L465 250 L455 270" fill="#000000" />
        {/* Motion dashes along arrow */}
        <circle cx="430" cy="310" r="5" fill="#9AFF00" />
        <circle cx="445" cy="280" r="5" fill="#9AFF00" />
      </g>

      {/* Stage 3 - CLOSE (right, higher - victory!) */}
      <g transform="translate(400, 150)">
        <rect x="0" y="0" width="135" height="120" rx="15" fill="#9AFF00" stroke="#000000" strokeWidth="5" />
        {/* Stage number badge */}
        <circle cx="25" cy="25" r="18" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
        <text x="25" y="33" textAnchor="middle" fill="#000000" fontSize="22" fontWeight="900" fontFamily="Inter, sans-serif">3</text>
        {/* Stage label */}
        <text x="67" y="65" textAnchor="middle" fill="#000000" fontSize="28" fontWeight="900" fontFamily="Inter, sans-serif">CLOSE</text>
        {/* Trophy icon */}
        <path d="M55 85 L55 95 L50 95 L50 105 L70 105 L70 95 L65 95 L65 85" fill="#000000" stroke="#000000" strokeWidth="2" />
        <path d="M50 85 Q50 75 60 75 Q70 75 70 85" fill="#000000" stroke="#000000" strokeWidth="2" />
        <rect x="55" y="103" width="10" height="4" fill="#000000" />
        {/* Big checkmark */}
        <path d="M95 85 L105 95 L125 75" stroke="#000000" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Confetti at final stage */}
      <circle cx="520" cy="180" r="6" fill="#9AFF00" />
      <circle cx="545" cy="200" r="5" fill="#9AFF00" />
      <circle cx="525" cy="240" r="7" fill="#9AFF00" />
      <rect x="538" y="215" width="8" height="8" fill="#9AFF00" transform="rotate(45 542 219)" />
    </g>

    {/* Professional character - moving forward with determination */}
    <g id="character">
      {/* Head */}
      <circle cx="260" cy="200" r="46" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Hair */}
      <path
        d="M214 190 Q214 155 234 145 Q254 138 269 148 Q284 138 304 153 Q310 175 304 190"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3"
      />

      {/* Neck */}
      <path d="M245 241 L245 263 L275 263 L275 241" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Torso - leaning forward in motion */}
      <path
        d="M235 263 L220 358 Q220 373 235 373 L285 373 Q300 373 300 358 L285 263 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Left arm - swinging back */}
      <path
        d="M240 273 Q210 283 195 313 L185 338"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Left hand */}
      <ellipse cx="183" cy="345" rx="14" ry="18" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(20 183 345)" />

      {/* Right arm - pumping forward */}
      <path
        d="M280 273 Q305 268 320 280 L335 295"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Right hand - fist forward */}
      <ellipse cx="338" cy="300" rx="16" ry="18" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(-25 338 300)" />

      {/* Legs - mid-stride running pose */}
      <path d="M245 373 L230 458 L225 478" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <path d="M275 373 L285 458 L290 478" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="225" cy="483" rx="22" ry="12" fill="#000000" transform="rotate(-10 225 483)" />
      <ellipse cx="290" cy="483" rx="22" ry="12" fill="#000000" transform="rotate(10 290 483)" />

      {/* Face - determined expression */}
      <circle cx="247" cy="195" r="5" fill="#000000" />
      <circle cx="273" cy="195" r="5" fill="#000000" />
      {/* Determined smile */}
      <path d="M247 215 Q260 222 273 215" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Focused eyebrows */}
      <path d="M240 183 L252 180" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M268 180 L280 183" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Progress bar - showing advancement */}
    <g id="progress-bar">
      <rect x="60" y="520" width="480" height="40" rx="20" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
      {/* Progress fill - 66% */}
      <rect x="60" y="520" width="320" height="40" rx="20" fill="#9AFF00" stroke="#000000" strokeWidth="5" />
      {/* Percentage text */}
      <text x="300" y="547" textAnchor="middle" fill="#000000" fontSize="22" fontWeight="900" fontFamily="Inter, sans-serif">66%</text>
      {/* Progress markers */}
      <line x1="220" y1="520" x2="220" y2="560" stroke="#000000" strokeWidth="3" />
      <line x1="380" y1="520" x2="380" y2="560" stroke="#000000" strokeWidth="3" />
    </g>

    {/* Motion lines - showing forward movement */}
    <g id="motion-lines">
      <line x1="185" y1="210" x2="165" y2="210" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      <line x1="195" y1="225" x2="175" y2="225" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      <line x1="190" y1="240" x2="170" y2="240" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      <line x1="180" y1="255" x2="160" y2="255" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
    </g>

    {/* Level up stars */}
    <g id="level-stars">
      <path d="M350 120 L354 132 L366 135 L354 138 L350 150 L346 138 L334 135 L346 132 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M560 310 L563 320 L573 322 L563 324 L560 334 L557 324 L547 322 L557 320 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M40 240 L43 250 L53 252 L43 254 L40 264 L37 254 L27 252 L37 250 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
    </g>

    {/* Speed particles */}
    <g id="speed-particles">
      <circle cx="150" cy="280" r="4" fill="#9AFF00" opacity="0.8" />
      <circle cx="140" cy="300" r="5" fill="#9AFF00" opacity="0.6" />
      <circle cx="155" cy="320" r="3" fill="#9AFF00" opacity="0.9" />
    </g>

    {/* Stage labels at top */}
    <g id="header">
      <text
        x="300"
        y="60"
        textAnchor="middle"
        fill="#000000"
        fontSize="42"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
      >
        PIPELINE PROGRESS
      </text>
    </g>

    {/* Black border frame */}
    <rect width="600" height="600" fill="none" stroke="#000000" strokeWidth="8" />
  </svg>
);
