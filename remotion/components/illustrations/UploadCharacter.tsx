import React from "react";

export const UploadCharacter: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* White background */}
    <rect width="600" height="600" fill="#FFFFFF" />

    {/* Giant upload arrow - lime green focal point */}
    <g id="upload-arrow">
      {/* Arrow glow effect */}
      <path d="M220 250 L300 130 L380 250 L350 250 L350 420 L250 420 L250 250 Z" fill="#9AFF00" opacity="0.2" />

      {/* Main arrow shaft */}
      <rect x="260" y="250" width="80" height="170" rx="12" fill="#9AFF00" stroke="#000000" strokeWidth="6" />

      {/* Arrow head - bold and clear */}
      <path
        d="M210 250 L300 120 L390 250 L360 250 L360 260 L240 260 L240 250 Z"
        fill="#9AFF00"
        stroke="#000000"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Arrow highlights - showing direction */}
      <rect x="275" y="265" width="50" height="140" rx="8" fill="#FFFFFF" opacity="0.25" />
      <path d="M260 180 L300 140 L340 180" fill="#FFFFFF" opacity="0.25" />
    </g>

    {/* Professional character - pushing/lifting pose */}
    <g id="character">
      {/* Head */}
      <circle cx="200" cy="350" r="44" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Hair */}
      <path
        d="M156 340 Q156 305 176 295 Q196 288 211 298 Q226 288 246 303 Q252 325 246 340"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3"
      />

      {/* Neck */}
      <path d="M185 389 L185 411 L215 411 L215 389" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Torso - leaning into push */}
      <path
        d="M175 411 L160 500 Q160 515 175 515 L225 515 Q240 515 240 500 L225 411 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Both arms - pushing arrow upward */}
      {/* Left arm */}
      <path
        d="M180 421 Q165 405 175 380 L190 355"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Left hand - palm pushing */}
      <ellipse cx="200" cy="345" rx="18" ry="22" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(-35 200 345)" />
      <line x1="210" y1="340" x2="220" y2="335" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
      <line x1="213" y1="347" x2="223" y2="342" stroke="#000000" strokeWidth="4" strokeLinecap="round" />

      {/* Right arm */}
      <path
        d="M220 421 Q235 405 245 380 L255 355"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Right hand - palm pushing */}
      <ellipse cx="258" cy="345" rx="18" ry="22" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(35 258 345)" />
      <line x1="248" y1="340" x2="238" y2="335" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
      <line x1="245" y1="347" x2="235" y2="342" stroke="#000000" strokeWidth="4" strokeLinecap="round" />

      {/* Legs - power stance */}
      <path d="M185 515 L175 565" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <path d="M215 515 L225 565" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="175" cy="570" rx="22" ry="12" fill="#000000" />
      <ellipse cx="225" cy="570" rx="22" ry="12" fill="#000000" />

      {/* Face - effort expression */}
      <circle cx="187" cy="345" r="5" fill="#000000" />
      <circle cx="213" cy="345" r="5" fill="#000000" />
      {/* Determined line mouth */}
      <line x1="187" y1="365" x2="213" y2="365" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
      {/* Focused eyebrows */}
      <path d="M180 333 L192 330" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M208 330 L220 333" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Contact files flying upward - detailed */}
    <g id="contact-files">
      {/* File 1 - closer to character */}
      <g transform="translate(380, 390)">
        <path d="M0 0 L70 0 L90 20 L90 105 L0 105 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
        <path d="M70 0 L70 20 L90 20" fill="none" stroke="#000000" strokeWidth="4" />
        {/* Contact avatar */}
        <circle cx="28" cy="45" r="14" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
        <circle cx="23" cy="42" r="2" fill="#000000" />
        <circle cx="33" cy="42" r="2" fill="#000000" />
        <path d="M21 50 Q28 54 35 50" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Name lines */}
        <rect x="50" y="35" width="30" height="5" rx="2.5" fill="#000000" />
        <rect x="50" y="50" width="25" height="4" rx="2" fill="#000000" opacity="0.6" />
        {/* Email icon */}
        <rect x="15" y="70" width="30" height="20" rx="3" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
        <path d="M15 73 L30 83 L45 73" stroke="#9AFF00" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Verified badge */}
        <circle cx="70" cy="45" r="10" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
        <path d="M65 45 L69 49 L76 42" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* File 2 - mid-flight */}
      <g transform="translate(400, 290)">
        <path d="M0 0 L60 0 L78 18 L78 90 L0 90 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
        <path d="M60 0 L60 18 L78 18" fill="none" stroke="#000000" strokeWidth="4" />
        {/* Contact avatar */}
        <circle cx="24" cy="38" r="12" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
        <circle cx="20" cy="36" r="1.5" fill="#000000" />
        <circle cx="28" cy="36" r="1.5" fill="#000000" />
        <path d="M19 43 Q24 46 29 43" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Name lines */}
        <rect x="43" y="30" width="26" height="4" rx="2" fill="#000000" />
        <rect x="43" y="42" width="22" height="3" rx="1.5" fill="#000000" opacity="0.6" />
        {/* Phone icon */}
        <rect x="13" y="58" width="16" height="22" rx="3" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
        <rect x="16" y="62" width="10" height="14" rx="1" fill="#FFFFFF" />
      </g>

      {/* File 3 - approaching cloud */}
      <g transform="translate(390, 190)">
        <path d="M0 0 L50 0 L65 15 L65 75 L0 75 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
        <path d="M50 0 L50 15 L65 15" fill="none" stroke="#000000" strokeWidth="3" />
        {/* Contact avatar */}
        <circle cx="20" cy="32" r="10" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
        <circle cx="17" cy="30" r="1" fill="#000000" />
        <circle cx="23" cy="30" r="1" fill="#000000" />
        <path d="M16 36 Q20 38 24 36" stroke="#000000" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Name lines */}
        <rect x="36" y="26" width="22" height="3" rx="1.5" fill="#000000" />
        <rect x="36" y="35" width="18" height="2" rx="1" fill="#000000" opacity="0.6" />
      </g>
    </g>

    {/* Cloud at top - detailed */}
    <g id="cloud">
      {/* Cloud body */}
      <ellipse cx="300" cy="90" rx="90" ry="45" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
      <ellipse cx="250" cy="100" rx="70" ry="40" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
      <ellipse cx="350" cy="100" rx="70" ry="40" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
      <ellipse cx="300" cy="70" rx="60" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Success checkmark in cloud */}
      <circle cx="300" cy="85" r="28" fill="#9AFF00" stroke="#000000" strokeWidth="4" />
      <path d="M282 85 L295 98 L318 75" stroke="#000000" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Motion lines - upward movement */}
    <g id="motion-lines">
      <line x1="320" y1="240" x2="320" y2="200" stroke="#9AFF00" strokeWidth="4" strokeDasharray="12 6" strokeLinecap="round" opacity="0.7" />
      <line x1="280" y1="220" x2="280" y2="180" stroke="#9AFF00" strokeWidth="4" strokeDasharray="12 6" strokeLinecap="round" opacity="0.7" />
      <line x1="340" y1="260" x2="340" y2="220" stroke="#9AFF00" strokeWidth="4" strokeDasharray="12 6" strokeLinecap="round" opacity="0.6" />
      <line x1="260" y1="280" x2="260" y2="240" stroke="#9AFF00" strokeWidth="4" strokeDasharray="12 6" strokeLinecap="round" opacity="0.6" />
    </g>

    {/* Sparkles - upload magic */}
    <g id="sparkles">
      <path d="M440 160 L443 172 L455 175 L443 178 L440 190 L437 178 L425 175 L437 172 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M160 180 L163 192 L175 195 L163 198 L160 210 L157 198 L145 195 L157 192 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M520 360 L522 370 L532 372 L522 374 L520 384 L518 374 L508 372 L518 370 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M80 420 L82 430 L92 432 L82 434 L80 444 L78 434 L68 432 L78 430 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
    </g>

    {/* Speed particles flowing up */}
    <g id="speed-particles">
      <circle cx="350" cy="330" r="5" fill="#9AFF00" opacity="0.8" />
      <circle cx="365" cy="280" r="4" fill="#9AFF00" opacity="0.7" />
      <circle cx="375" cy="230" r="6" fill="#9AFF00" opacity="0.6" />
      <circle cx="420" cy="310" r="5" fill="#9AFF00" opacity="0.8" />
      <circle cx="430" cy="260" r="4" fill="#9AFF00" opacity="0.7" />
      <circle cx="445" cy="210" r="5" fill="#9AFF00" opacity="0.6" />
    </g>

    {/* Plus signs - adding to cloud */}
    <g id="plus-signs">
      <g transform="translate(240, 140)">
        <line x1="0" y1="12" x2="0" y2="-12" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" />
        <line x1="-12" y1="0" x2="12" y2="0" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g transform="translate(360, 150)">
        <line x1="0" y1="10" x2="0" y2="-10" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" />
      </g>
    </g>

    {/* UPLOAD text label */}
    <g id="upload-label">
      <text
        x="300"
        y="550"
        textAnchor="middle"
        fill="#000000"
        fontSize="48"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
      >
        UPLOAD
      </text>
    </g>

    {/* Black border frame */}
    <rect width="600" height="600" fill="none" stroke="#000000" strokeWidth="8" />
  </svg>
);
