import React from "react";

export const CreateCampaignCharacter: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* White background */}
    <rect width="600" height="600" fill="#FFFFFF" />

    {/* Large CREATE button - focal point */}
    <g id="create-button">
      {/* Button shadow */}
      <rect x="162" y="272" width="276" height="136" rx="20" fill="#000000" opacity="0.15" />

      {/* Main button */}
      <rect x="160" y="265" width="276" height="136" rx="20" fill="#9AFF00" stroke="#000000" strokeWidth="6" />

      {/* Button highlight */}
      <rect x="175" y="280" width="246" height="40" rx="12" fill="#FFFFFF" opacity="0.4" />

      {/* CREATE text */}
      <text
        x="298"
        y="350"
        textAnchor="middle"
        fill="#000000"
        fontSize="56"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
        letterSpacing="2"
      >
        CREATE
      </text>
    </g>

    {/* Professional character - realistic proportions */}
    <g id="character">
      {/* Head - circular with proper size */}
      <circle cx="120" cy="340" r="38" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Hair */}
      <path
        d="M82 330 Q82 300 100 295 Q115 292 130 300 Q145 295 155 310 Q158 325 150 340"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3"
      />

      {/* Torso - rounded rectangle for body */}
      <path
        d="M120 378 L95 385 L90 450 Q90 460 100 460 L140 460 Q150 460 150 450 L145 385 L120 378 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Right arm - reaching toward button */}
      <path
        d="M140 390 Q165 380 185 385 L220 390 Q235 392 235 405 Q235 415 225 415 L185 410 Q170 408 155 420"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hand pointing at button */}
      <g id="pointing-hand">
        <ellipse cx="238" cy="405" rx="18" ry="22" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(-20 238 405)" />
        {/* Index finger extended */}
        <path d="M248 395 L270 380" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
        <circle cx="272" cy="378" r="6" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
      </g>

      {/* Left arm - at side */}
      <path
        d="M100 390 Q75 395 70 430 L65 450"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="65" cy="455" rx="12" ry="15" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Legs */}
      <path
        d="M105 460 L100 520 Q100 530 110 530"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M135 460 L140 520 Q140 530 130 530"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Feet */}
      <ellipse cx="110" cy="535" rx="18" ry="10" fill="#000000" />
      <ellipse cx="130" cy="535" rx="18" ry="10" fill="#000000" />

      {/* Face - detailed */}
      <circle cx="110" cy="335" r="4" fill="#000000" />
      <circle cx="130" cy="335" r="4" fill="#000000" />
      {/* Happy smile */}
      <path d="M105 350 Q120 360 135 350" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Eyebrows */}
      <path d="M105 325 L115 323" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M125 323 L135 325" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Click effect - radiating circles */}
    <g id="click-effect">
      <circle cx="275" cy="375" r="15" fill="none" stroke="#9AFF00" strokeWidth="4" opacity="0.8" />
      <circle cx="275" cy="375" r="25" fill="none" stroke="#9AFF00" strokeWidth="3" opacity="0.5" />
      <circle cx="275" cy="375" r="35" fill="none" stroke="#9AFF00" strokeWidth="2" opacity="0.3" />
    </g>

    {/* Campaign icons floating around */}
    <g id="campaign-icons">
      {/* Email icon */}
      <g transform="translate(460, 200)">
        <rect x="0" y="0" width="80" height="60" rx="8" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
        <path d="M0 10 L40 35 L80 10" stroke="#9AFF00" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 50 L30 35" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" />
        <path d="M70 50 L50 35" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Target icon */}
      <g transform="translate(470, 380)">
        <circle cx="35" cy="35" r="35" fill="none" stroke="#000000" strokeWidth="4" />
        <circle cx="35" cy="35" r="23" fill="none" stroke="#000000" strokeWidth="4" />
        <circle cx="35" cy="35" r="12" fill="#9AFF00" stroke="#000000" strokeWidth="4" />
      </g>

      {/* Sparkles */}
      <path d="M420 150 L425 165 L440 170 L425 175 L420 190 L415 175 L400 170 L415 165 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M80 200 L83 210 L93 213 L83 216 L80 226 L77 216 L67 213 L77 210 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M500 480 L502 488 L510 490 L502 492 L500 500 L498 492 L490 490 L498 488 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
    </g>

    {/* Motion lines - showing action */}
    <g id="motion-lines">
      <line x1="260" y1="395" x2="250" y2="405" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <line x1="255" y1="385" x2="245" y2="395" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <line x1="265" y1="400" x2="255" y2="410" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    </g>

    {/* Black border frame */}
    <rect width="600" height="600" fill="none" stroke="#000000" strokeWidth="8" />
  </svg>
);
