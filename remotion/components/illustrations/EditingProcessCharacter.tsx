import React from "react";

export const EditingProcessCharacter: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* White background */}
    <rect width="600" height="600" fill="#FFFFFF" />

    {/* Content document being edited - central focus */}
    <g id="document">
      {/* Large document/screen */}
      <rect x="180" y="120" width="240" height="340" rx="15" fill="#FFFFFF" stroke="#000000" strokeWidth="6" />

      {/* Document header */}
      <rect x="180" y="120" width="240" height="60" rx="15" fill="#9AFF00" stroke="#000000" strokeWidth="6" />
      <text x="300" y="160" textAnchor="middle" fill="#000000" fontSize="28" fontWeight="900" fontFamily="Inter, sans-serif">CONTENT</text>

      {/* Text lines being edited */}
      <rect x="200" y="200" width="180" height="12" rx="6" fill="#000000" />
      <rect x="200" y="225" width="200" height="12" rx="6" fill="#000000" />
      <rect x="200" y="250" width="160" height="12" rx="6" fill="#000000" />

      {/* Highlighted/edited section */}
      <rect x="200" y="285" width="190" height="50" rx="8" fill="#9AFF00" opacity="0.3" />
      <rect x="210" y="295" width="150" height="12" rx="6" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <rect x="210" y="315" width="170" height="12" rx="6" fill="#9AFF00" stroke="#000000" strokeWidth="2" />

      {/* More text lines */}
      <rect x="200" y="360" width="175" height="12" rx="6" fill="#000000" />
      <rect x="200" y="385" width="165" height="12" rx="6" fill="#000000" />
      <rect x="200" y="410" width="190" height="12" rx="6" fill="#000000" />
    </g>

    {/* Character actively editing */}
    <g id="character">
      {/* Head */}
      <circle cx="130" cy="300" r="42" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Hair */}
      <path
        d="M88 290 Q88 258 108 248 Q128 241 143 251 Q158 241 178 256 Q178 276 171 291"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3"
      />

      {/* Focused expression */}
      <circle cx="117" cy="295" r="5" fill="#000000" />
      <circle cx="143" cy="295" r="5" fill="#000000" />
      <path d="M117 315 Q130 320 143 315" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Concentrated eyebrows */}
      <path d="M110 283 L123 281" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M137 281 L150 283" stroke="#000000" strokeWidth="3" strokeLinecap="round" />

      {/* Neck */}
      <path d="M115 337 L115 359 L145 359 L145 337" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Torso */}
      <path
        d="M105 359 L95 445 Q95 460 110 460 L150 460 Q165 460 165 445 L155 359 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Right arm - pointing/editing document */}
      <path
        d="M150 369 Q175 365 195 375 L220 390"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Hand with pencil/editing tool */}
      <ellipse cx="228" cy="295" rx="16" ry="20" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(-20 228 295)" />

      {/* Pencil/editing tool */}
      <rect x="235" y="280" width="12" height="55" rx="6" fill="#9AFF00" stroke="#000000" strokeWidth="3" transform="rotate(45 241 307)" />
      <path d="M255 320 L260 325 L265 320" fill="#000000" />

      {/* Left arm */}
      <path
        d="M110 369 Q85 375 75 395 L70 420"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="70" cy="425" rx="13" ry="16" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Legs */}
      <path d="M115 460 L110 520" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <path d="M145 460 L150 520" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="110" cy="525" rx="20" ry="11" fill="#000000" />
      <ellipse cx="150" cy="525" rx="20" ry="11" fill="#000000" />
    </g>

    {/* Editing tools/icons around the document */}
    <g id="editing-tools">
      {/* Checkmark - approval */}
      <g transform="translate(450, 200)">
        <circle cx="0" cy="0" r="32" fill="#9AFF00" stroke="#000000" strokeWidth="5" />
        <path d="M-12 0 L-4 12 L12 -12" stroke="#000000" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* X mark - delete/remove */}
      <g transform="translate(470, 300)">
        <circle cx="0" cy="0" r="28" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
        <path d="M-10 -10 L10 10 M10 -10 L-10 10" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* Plus - add content */}
      <g transform="translate(465, 390)">
        <circle cx="0" cy="0" r="30" fill="#9AFF00" stroke="#000000" strokeWidth="5" />
        <line x1="-15" y1="0" x2="15" y2="0" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
        <line x1="0" y1="-15" x2="0" y2="15" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      </g>
    </g>

    {/* Process flow arrows */}
    <g id="process-arrows">
      {/* Arrow 1: Input */}
      <g transform="translate(80, 180)">
        <path d="M0 0 L40 0" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" />
        <path d="M33 -7 L40 0 L33 7" fill="#9AFF00" />
        <text x="20" y="-15" textAnchor="middle" fill="#000000" fontSize="18" fontWeight="700" fontFamily="Inter, sans-serif">IN</text>
      </g>

      {/* Arrow 2: Process */}
      <path d="M300 480 L300 520" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" />
      <path d="M293 513 L300 520 L307 513" fill="#9AFF00" />
      <text x="340" y="505" textAnchor="start" fill="#000000" fontSize="18" fontWeight="700" fontFamily="Inter, sans-serif">PROCESS</text>

      {/* Arrow 3: Output */}
      <g transform="translate(480, 180)">
        <path d="M0 0 L40 0" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" />
        <path d="M33 -7 L40 0 L33 7" fill="#9AFF00" />
        <text x="20" y="-15" textAnchor="middle" fill="#000000" fontSize="18" fontWeight="700" fontFamily="Inter, sans-serif">OUT</text>
      </g>
    </g>

    {/* Editing marks/annotations */}
    <g id="annotations">
      {/* Correction marks */}
      <path d="M365 225 L385 205" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" />
      <path d="M385 225 L365 205" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" />

      {/* Insertion caret */}
      <path d="M370 360 L375 370 L380 360" fill="none" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Highlight marker */}
      <rect x="195" y="245" width="50" height="20" fill="#9AFF00" opacity="0.4" />
    </g>

    {/* Progress indicator */}
    <g id="progress">
      <rect x="150" y="540" width="300" height="20" rx="10" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
      <rect x="150" y="540" width="210" height="20" rx="10" fill="#9AFF00" stroke="#000000" strokeWidth="4" />
      <text x="300" y="535" textAnchor="middle" fill="#000000" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">70% EDITED</text>
    </g>

    {/* Sparkles - refinement magic */}
    <g id="sparkles">
      <path d="M440 130 L443 142 L455 145 L443 148 L440 160 L437 148 L425 145 L437 142 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M520 360 L522 370 L532 372 L522 374 L520 384 L518 374 L508 372 L518 370 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M140 140 L142 150 L152 152 L142 154 L140 164 L138 154 L128 152 L138 150 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M90 420 L92 430 L102 432 L92 434 L90 444 L88 434 L78 432 L88 430 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
    </g>

    {/* Caption */}
    <g id="caption">
      <text
        x="300"
        y="85"
        textAnchor="middle"
        fill="#000000"
        fontSize="38"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
      >
        EDITING PROCESS
      </text>
    </g>

    {/* Black border frame */}
    <rect width="600" height="600" fill="none" stroke="#000000" strokeWidth="8" />
  </svg>
);
