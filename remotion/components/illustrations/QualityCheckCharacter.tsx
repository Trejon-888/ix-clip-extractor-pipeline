import React from "react";

export const QualityCheckCharacter: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* White background */}
    <rect width="600" height="600" fill="#FFFFFF" />

    {/* Large magnifying glass - central focus */}
    <g id="magnifying-glass">
      {/* Glass circle */}
      <circle cx="320" cy="260" r="120" fill="#FFFFFF" stroke="#000000" strokeWidth="8" />
      <circle cx="320" cy="260" r="110" fill="none" stroke="#9AFF00" strokeWidth="6" opacity="0.4" />

      {/* Content being reviewed inside glass */}
      <g id="content-under-review" transform="translate(260, 200)">
        {/* Document/content */}
        <rect x="0" y="0" width="120" height="120" rx="8" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />

        {/* Quality indicators */}
        <circle cx="30" cy="30" r="18" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <path d="M20 30 L28 38 L42 24" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Text lines */}
        <rect x="55" y="22" width="55" height="6" rx="3" fill="#000000" />
        <rect x="55" y="36" width="50" height="5" rx="2.5" fill="#000000" opacity="0.6" />

        {/* More checkmarks */}
        <circle cx="30" cy="70" r="15" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
        <path d="M22 70 L28 76 L40 64" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        <rect x="55" y="62" width="55" height="6" rx="3" fill="#000000" />
        <rect x="55" y="76" width="45" height="5" rx="2.5" fill="#000000" opacity="0.6" />

        {/* Rating stars */}
        <g transform="translate(40, 95)">
          <path d="M0 0 L3 8 L11 9 L5 14 L7 22 L0 17 L-7 22 L-5 14 L-11 9 L-3 8 Z" fill="#9AFF00" stroke="#000000" strokeWidth="1" />
          <path d="M20 0 L23 8 L31 9 L25 14 L27 22 L20 17 L13 22 L15 14 L9 9 L17 8 Z" fill="#9AFF00" stroke="#000000" strokeWidth="1" />
          <path d="M40 0 L43 8 L51 9 L45 14 L47 22 L40 17 L33 22 L35 14 L29 9 L37 8 Z" fill="#9AFF00" stroke="#000000" strokeWidth="1" />
        </g>
      </g>

      {/* Magnifying glass handle */}
      <path
        d="M410 350 Q460 400 480 440"
        stroke="#000000"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M415 355 Q465 405 485 445"
        stroke="#9AFF00"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.5"
      />
    </g>

    {/* Character holding magnifying glass */}
    <g id="character">
      {/* Head */}
      <circle cx="180" cy="340" r="48" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Hair */}
      <path
        d="M132 330 Q132 295 152 285 Q172 278 187 288 Q202 278 222 293 Q228 315 222 330"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3"
      />

      {/* Focused, examining expression */}
      <circle cx="165" cy="335" r="6" fill="#000000" />
      <circle cx="195" cy="335" r="6" fill="#000000" />
      {/* Serious concentrated mouth */}
      <line x1="165" y1="360" x2="195" y2="360" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
      {/* Furrowed brow */}
      <path d="M155 320 L170 318" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M190 318 L205 320" stroke="#000000" strokeWidth="3" strokeLinecap="round" />

      {/* Neck */}
      <path d="M165 383 L165 405 L195 405 L195 383" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Torso */}
      <path
        d="M155 405 L145 490 Q145 505 160 505 L200 505 Q215 505 215 490 L205 405 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Right arm - holding magnifying glass */}
      <path
        d="M200 415 Q240 400 290 385 L340 375"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Hand gripping handle */}
      <ellipse cx="445" cy="410" rx="20" ry="25" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(35 445 410)" />

      {/* Left arm pointing at checklist */}
      <path
        d="M160 415 Q130 420 110 435 L95 455"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="90" cy="460" rx="14" ry="18" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(-10 90 460)" />

      {/* Legs */}
      <path d="M165 505 L160 560" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <path d="M195 505 L200 560" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="160" cy="565" rx="22" ry="12" fill="#000000" />
      <ellipse cx="200" cy="565" rx="22" ry="12" fill="#000000" />
    </g>

    {/* Quality checklist on left */}
    <g id="checklist">
      <rect x="40" y="180" width="140" height="240" rx="12" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Checklist header */}
      <rect x="40" y="180" width="140" height="50" rx="12" fill="#9AFF00" stroke="#000000" strokeWidth="5" />
      <text x="110" y="212" textAnchor="middle" fill="#000000" fontSize="20" fontWeight="900" fontFamily="Inter, sans-serif">QUALITY</text>

      {/* Checklist items */}
      <g id="items">
        {/* Item 1 - checked */}
        <circle cx="60" cy="260" r="12" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <path d="M54 260 L58 264 L67 255" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="80" y="254" width="80" height="6" rx="3" fill="#000000" />

        {/* Item 2 - checked */}
        <circle cx="60" cy="295" r="12" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <path d="M54 295 L58 299 L67 290" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="80" y="289" width="85" height="6" rx="3" fill="#000000" />

        {/* Item 3 - checked */}
        <circle cx="60" cy="330" r="12" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <path d="M54 330 L58 334 L67 325" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="80" y="324" width="75" height="6" rx="3" fill="#000000" />

        {/* Item 4 - checked */}
        <circle cx="60" cy="365" r="12" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <path d="M54 365 L58 369 L67 360" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="80" y="359" width="80" height="6" rx="3" fill="#000000" />

        {/* Item 5 - checked */}
        <circle cx="60" cy="400" r="12" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <path d="M54 400 L58 404 L67 395" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="80" y="394" width="82" height="6" rx="3" fill="#000000" />
      </g>
    </g>

    {/* Quality badge - top right */}
    <g id="quality-badge">
      <g transform="translate(480, 140)">
        {/* Badge outline */}
        <path
          d="M0 -50 L15 -20 L45 -15 L25 5 L30 35 L0 20 L-30 35 L-25 5 L-45 -15 L-15 -20 Z"
          fill="#9AFF00"
          stroke="#000000"
          strokeWidth="5"
        />

        {/* 100% text */}
        <text x="0" y="-5" textAnchor="middle" fill="#000000" fontSize="24" fontWeight="900" fontFamily="Inter, sans-serif">100%</text>
        <text x="0" y="15" textAnchor="middle" fill="#000000" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">QA</text>
      </g>
    </g>

    {/* Approval stamps */}
    <g id="stamps">
      {/* APPROVED stamp */}
      <g transform="translate(470, 430)">
        <ellipse cx="0" cy="0" rx="55" ry="45" fill="none" stroke="#9AFF00" strokeWidth="6" />
        <text x="0" y="10" textAnchor="middle" fill="#9AFF00" fontSize="24" fontWeight="900" fontFamily="Inter, sans-serif">APPROVED</text>
      </g>
    </g>

    {/* Sparkles - quality assurance */}
    <g id="sparkles">
      <path d="M240 140 L243 152 L255 155 L243 158 L240 170 L237 158 L225 155 L237 152 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M400 130 L403 142 L415 145 L403 148 L400 160 L397 148 L385 145 L397 142 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M540 280 L542 290 L552 292 L542 294 L540 304 L538 294 L528 292 L538 290 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M30 360 L32 370 L42 372 L32 374 L30 384 L28 374 L18 372 L28 370 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
    </g>

    {/* Caption */}
    <g id="caption">
      <text
        x="300"
        y="75"
        textAnchor="middle"
        fill="#000000"
        fontSize="42"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
      >
        QUALITY CHECK
      </text>
    </g>

    {/* Black border frame */}
    <rect width="600" height="600" fill="none" stroke="#000000" strokeWidth="8" />
  </svg>
);
