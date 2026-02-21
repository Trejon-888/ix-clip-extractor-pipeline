import React from "react";

export const BuildContactsCharacter: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* White background */}
    <rect width="600" height="600" fill="#FFFFFF" />

    {/* Stack of contact cards - detailed */}
    <g id="contact-cards">
      {/* Card 3 (bottom) - tilted slightly */}
      <g transform="translate(320, 380) rotate(3)">
        <rect x="0" y="0" width="180" height="110" rx="12" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
        {/* Card shadow */}
        <rect x="2" y="2" width="180" height="110" rx="12" fill="#000000" opacity="0.1" />
        {/* Avatar */}
        <circle cx="35" cy="40" r="22" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        {/* Avatar face */}
        <circle cx="30" cy="36" r="2" fill="#000000" />
        <circle cx="40" cy="36" r="2" fill="#000000" />
        <path d="M28 45 Q35 48 42 45" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Name line */}
        <rect x="65" y="25" width="90" height="10" rx="5" fill="#000000" />
        {/* Email line */}
        <rect x="65" y="45" width="70" height="7" rx="3.5" fill="#000000" opacity="0.6" />
        {/* Verified badge */}
        <circle cx="155" cy="30" r="15" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <path d="M147 30 L153 36 L163 26" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Email icon */}
        <g transform="translate(15, 70)">
          <rect x="0" y="0" width="40" height="28" rx="4" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
          <path d="M0 5 L20 18 L40 5" stroke="#9AFF00" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* Card 2 (middle) */}
      <g transform="translate(300, 310)">
        <rect x="0" y="0" width="180" height="110" rx="12" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
        {/* Card shadow */}
        <rect x="2" y="2" width="180" height="110" rx="12" fill="#000000" opacity="0.1" />
        {/* Avatar */}
        <circle cx="35" cy="40" r="22" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        {/* Avatar face */}
        <circle cx="30" cy="36" r="2" fill="#000000" />
        <circle cx="40" cy="36" r="2" fill="#000000" />
        <path d="M28 45 Q35 48 42 45" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Name line */}
        <rect x="65" y="25" width="90" height="10" rx="5" fill="#000000" />
        {/* Email line */}
        <rect x="65" y="45" width="70" height="7" rx="3.5" fill="#000000" opacity="0.6" />
        {/* Verified badge */}
        <circle cx="155" cy="30" r="15" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <path d="M147 30 L153 36 L163 26" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Phone icon */}
        <g transform="translate(15, 70)">
          <rect x="0" y="0" width="25" height="28" rx="4" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
          <rect x="5" y="5" width="15" height="18" rx="2" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
        </g>
      </g>

      {/* Card 1 (top) - being placed by character */}
      <g transform="translate(280, 220)">
        <rect x="0" y="0" width="180" height="110" rx="12" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
        {/* Card shadow */}
        <rect x="2" y="2" width="180" height="110" rx="12" fill="#000000" opacity="0.1" />
        {/* Avatar */}
        <circle cx="35" cy="40" r="22" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        {/* Avatar face - happy */}
        <circle cx="30" cy="36" r="2" fill="#000000" />
        <circle cx="40" cy="36" r="2" fill="#000000" />
        <path d="M28 45 Q35 50 42 45" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Name line */}
        <rect x="65" y="25" width="90" height="10" rx="5" fill="#000000" />
        {/* Email line */}
        <rect x="65" y="45" width="70" height="7" rx="3.5" fill="#000000" opacity="0.6" />
        {/* Verified badge - glowing */}
        <circle cx="155" cy="30" r="18" fill="#9AFF00" opacity="0.3" />
        <circle cx="155" cy="30" r="15" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <path d="M147 30 L153 36 L163 26" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Badge icon */}
        <g transform="translate(15, 70)">
          <path d="M15 0 L20 10 L30 12 L20 14 L15 24 L10 14 L0 12 L10 10 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
        </g>
      </g>
    </g>

    {/* Professional character - building/organizing pose */}
    <g id="character">
      {/* Head */}
      <circle cx="180" cy="280" r="45" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Hair - professional style */}
      <path
        d="M135 270 Q135 240 155 230 Q175 225 190 235 Q205 225 225 240 Q225 260 218 275"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3"
      />

      {/* Neck */}
      <path d="M165 320 L165 340 L195 340 L195 320" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Torso - professional shirt */}
      <path
        d="M155 340 L145 430 Q145 445 160 445 L200 445 Q215 445 215 430 L205 340 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Collar detail */}
      <path d="M165 340 L175 355 L180 340 L185 355 L195 340" stroke="#000000" strokeWidth="3" fill="none" />

      {/* Right arm - carefully placing card on stack */}
      <path
        d="M200 350 Q230 340 255 345 L280 350"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Right hand - placing card */}
      <ellipse cx="285" cy="250" rx="18" ry="22" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(-30 285 250)" />
      {/* Fingers on card */}
      <line x1="295" y1="245" x2="305" y2="240" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
      <line x1="298" y1="252" x2="308" y2="247" stroke="#000000" strokeWidth="4" strokeLinecap="round" />

      {/* Left arm - holding stack steady */}
      <path
        d="M160 350 Q140 360 130 385 L125 405"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="125" cy="410" rx="14" ry="18" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Legs */}
      <path d="M170 445 L165 520" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <path d="M190 445 L195 520" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="165" cy="525" rx="20" ry="11" fill="#000000" />
      <ellipse cx="195" cy="525" rx="20" ry="11" fill="#000000" />

      {/* Face - focused expression */}
      <circle cx="167" cy="275" r="5" fill="#000000" />
      <circle cx="193" cy="275" r="5" fill="#000000" />
      {/* Concentrated smile */}
      <path d="M167 295 Q180 302 193 295" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Eyebrows - focused */}
      <path d="M160 263 L173 261" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M187 261 L200 263" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Large verified badge icon - top right */}
    <g id="verified-badge">
      <circle cx="500" cy="140" r="55" fill="#9AFF00" opacity="0.2" />
      <circle cx="500" cy="140" r="50" fill="#9AFF00" stroke="#000000" strokeWidth="5" />
      <path d="M470 140 L488 158 L530 116" stroke="#000000" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Email envelope icon - detailed */}
    <g id="email-icon">
      <rect x="90" cy="140" width="120" height="85" rx="10" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
      <path d="M90 155 L150 195 L210 155" stroke="#9AFF00" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M95 215 L125 190" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" />
      <path d="M205 215 L175 190" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" />
      {/* Envelope seal */}
      <circle cx="150" cy="195" r="8" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
    </g>

    {/* Contact card icon floating - top left */}
    <g id="floating-card">
      <g transform="translate(70, 380)">
        <rect x="0" y="0" width="100" height="65" rx="8" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
        <circle cx="25" cy="25" r="12" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
        <rect x="45" y="18" width="45" height="6" rx="3" fill="#000000" />
        <rect x="45" y="30" width="35" height="4" rx="2" fill="#000000" opacity="0.6" />
        <circle cx="85" cy="20" r="8" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
        <path d="M80 20 L84 24 L91 17" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>

    {/* Sparkles - organization magic */}
    <g id="sparkles">
      <path d="M240 180 L243 192 L255 195 L243 198 L240 210 L237 198 L225 195 L237 192 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M460 240 L462 250 L472 252 L462 254 L460 264 L458 254 L448 252 L458 250 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M520 320 L522 328 L530 330 L522 332 L520 340 L518 332 L510 330 L518 328 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M90 480 L92 488 L100 490 L92 492 L90 500 L88 492 L80 490 L88 488 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
    </g>

    {/* Motion lines - cards being organized */}
    <line x1="250" y1="200" x2="235" y2="195" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    <line x1="255" y1="210" x2="240" y2="205" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    <line x1="260" y1="220" x2="245" y2="215" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" opacity="0.6" />

    {/* Plus signs - adding contacts */}
    <g id="plus-signs">
      <g transform="translate(520, 420)">
        <line x1="0" y1="15" x2="0" y2="-15" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" />
        <line x1="-15" y1="0" x2="15" y2="0" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" />
        <circle cx="0" cy="0" r="20" fill="none" stroke="#9AFF00" strokeWidth="3" />
      </g>
    </g>

    {/* Black border frame */}
    <rect width="600" height="600" fill="none" stroke="#000000" strokeWidth="8" />
  </svg>
);
