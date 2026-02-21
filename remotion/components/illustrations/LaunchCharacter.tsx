import React from "react";

export const LaunchCharacter: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* White background */}
    <rect width="600" height="600" fill="#FFFFFF" />

    {/* Rocket ship - detailed and dynamic */}
    <g id="rocket">
      {/* Rocket glow/thrust effect */}
      <ellipse cx="300" cy="300" rx="90" ry="140" fill="#9AFF00" opacity="0.15" />

      {/* Main rocket body */}
      <path
        d="M250 500 L250 420 Q250 380 260 350 L260 180 Q260 160 280 150 Q300 145 320 150 Q340 160 340 180 L340 350 Q350 380 350 420 L350 500 L300 540 Z"
        fill="#9AFF00"
        stroke="#000000"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Nose cone */}
      <path
        d="M260 180 Q260 140 280 120 Q300 110 320 120 Q340 140 340 180"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Window - character visible inside */}
      <circle cx="300" cy="230" r="48" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
      <circle cx="300" cy="230" r="43" fill="#FFFFFF" stroke="#000000" strokeWidth="2" opacity="0.3" />

      {/* Left wing */}
      <path
        d="M250 420 L190 520 Q185 530 195 535 L220 510 L250 450"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Left wing detail */}
      <path d="M210 490 L230 480" stroke="#000000" strokeWidth="3" strokeLinecap="round" />

      {/* Right wing */}
      <path
        d="M350 420 L410 520 Q415 530 405 535 L380 510 L350 450"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Right wing detail */}
      <path d="M390 490 L370 480" stroke="#000000" strokeWidth="3" strokeLinecap="round" />

      {/* Rocket body details */}
      <rect x="270" y="300" width="60" height="20" rx="10" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
      <rect x="270" y="340" width="60" height="20" rx="10" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
      <rect x="270" y="380" width="60" height="20" rx="10" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />

      {/* Rivets */}
      <circle cx="265" cy="280" r="3" fill="#000000" />
      <circle cx="335" cy="280" r="3" fill="#000000" />
      <circle cx="265" cy="320" r="3" fill="#000000" />
      <circle cx="335" cy="320" r="3" fill="#000000" />
    </g>

    {/* Character in window - excited astronaut */}
    <g id="character-in-window">
      {/* Head - visible through window */}
      <circle cx="300" cy="230" r="38" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Helmet visor edge */}
      <path d="M262 220 Q300 210 338 220" stroke="#000000" strokeWidth="3" fill="none" />

      {/* Face - SUPER EXCITED */}
      {/* Eyes - wide open with excitement */}
      <circle cx="285" cy="225" r="6" fill="#000000" />
      <circle cx="315" cy="225" r="6" fill="#000000" />
      {/* Huge smile */}
      <path d="M275 240 Q300 260 325 240" stroke="#000000" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Open mouth showing excitement */}
      <ellipse cx="300" cy="248" rx="15" ry="10" fill="#000000" />
      {/* Eyebrows - raised high */}
      <path d="M275 212 L290 208" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M310 208 L325 212" stroke="#000000" strokeWidth="3" strokeLinecap="round" />

      {/* Gloved hands visible - waving */}
      <ellipse cx="265" cy="260" rx="12" ry="14" fill="#FFFFFF" stroke="#000000" strokeWidth="3" transform="rotate(-20 265 260)" />
      <ellipse cx="335" cy="260" rx="12" ry="14" fill="#FFFFFF" stroke="#000000" strokeWidth="3" transform="rotate(20 335 260)" />
    </g>

    {/* Massive rocket flames - most dynamic element */}
    <g id="flames">
      {/* Main central flame - huge */}
      <path
        d="M280 540 Q270 555 275 570 Q280 580 285 575 L290 560 Q295 580 300 590 Q305 580 310 560 L315 575 Q320 580 325 570 Q330 555 320 540"
        fill="#9AFF00"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Secondary flames - layered */}
      <ellipse cx="270" cy="550" rx="25" ry="45" fill="#9AFF00" opacity="0.7" stroke="#000000" strokeWidth="4" />
      <ellipse cx="330" cy="550" rx="25" ry="45" fill="#9AFF00" opacity="0.7" stroke="#000000" strokeWidth="4" />

      {/* Inner flame highlights */}
      <path d="M285 545 Q290 560 295 545 Q300 575 305 545 Q310 560 315 545" fill="#FFFFFF" opacity="0.5" />

      {/* Flame wisps */}
      <path d="M265 570 Q260 585 265 595" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      <path d="M335 570 Q340 585 335 595" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
    </g>

    {/* Stars and space environment */}
    <g id="stars">
      {/* Large stars */}
      <path d="M100 80 L107 100 L127 105 L107 110 L100 130 L93 110 L73 105 L93 100 Z" fill="#000000" />
      <path d="M500 100 L507 120 L527 125 L507 130 L500 150 L493 130 L473 125 L493 120 Z" fill="#000000" />
      <path d="M520 450 L527 470 L547 475 L527 480 L520 500 L513 480 L493 475 L513 470 Z" fill="#000000" />
      <path d="M80 480 L87 500 L107 505 L87 510 L80 530 L73 510 L53 505 L73 500 Z" fill="#000000" />

      {/* Medium stars */}
      <path d="M150 180 L155 195 L170 198 L155 201 L150 216 L145 201 L130 198 L145 195 Z" fill="#000000" />
      <path d="M460 180 L465 195 L480 198 L465 201 L460 216 L455 201 L440 198 L455 195 Z" fill="#000000" />
      <path d="M140 420 L145 435 L160 438 L145 441 L140 456 L135 441 L120 438 L135 435 Z" fill="#000000" />
      <path d="M470 400 L475 415 L490 418 L475 421 L470 436 L465 421 L450 418 L465 415 Z" fill="#000000" />

      {/* Small stars - scattered */}
      <circle cx="80" cy="200" r="4" fill="#000000" />
      <circle cx="120" cy="300" r="5" fill="#000000" />
      <circle cx="170" cy="350" r="4" fill="#000000" />
      <circle cx="520" cy="220" r="5" fill="#000000" />
      <circle cx="480" cy="300" r="4" fill="#000000" />
      <circle cx="430" cy="360" r="5" fill="#000000" />
    </g>

    {/* Speed lines - showing massive velocity */}
    <g id="speed-lines">
      {/* Left side speed lines */}
      <line x1="180" y1="150" x2="120" y2="150" stroke="#9AFF00" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <line x1="160" y1="200" x2="90" y2="200" stroke="#9AFF00" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <line x1="170" y1="250" x2="100" y2="250" stroke="#9AFF00" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <line x1="180" y1="300" x2="110" y2="300" stroke="#9AFF00" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
      <line x1="170" y1="350" x2="100" y2="350" stroke="#9AFF00" strokeWidth="6" strokeLinecap="round" opacity="0.7" />

      {/* Right side speed lines */}
      <line x1="420" y1="150" x2="480" y2="150" stroke="#9AFF00" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <line x1="440" y1="200" x2="510" y2="200" stroke="#9AFF00" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <line x1="430" y1="250" x2="500" y2="250" stroke="#9AFF00" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <line x1="420" y1="300" x2="490" y2="300" stroke="#9AFF00" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
      <line x1="430" y1="350" x2="500" y2="350" stroke="#9AFF00" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
    </g>

    {/* Motion blur particles */}
    <g id="motion-particles">
      <circle cx="200" cy="180" r="6" fill="#9AFF00" opacity="0.6" />
      <circle cx="210" cy="220" r="5" fill="#9AFF00" opacity="0.7" />
      <circle cx="195" cy="270" r="7" fill="#9AFF00" opacity="0.5" />
      <circle cx="400" cy="180" r="6" fill="#9AFF00" opacity="0.6" />
      <circle cx="390" cy="220" r="5" fill="#9AFF00" opacity="0.7" />
      <circle cx="405" cy="270" r="7" fill="#9AFF00" opacity="0.5" />
    </g>

    {/* Explosion sparkles at launch */}
    <g id="launch-sparkles">
      <path d="M230 520 L233 532 L245 535 L233 538 L230 550 L227 538 L215 535 L227 532 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M370 520 L373 532 L385 535 L373 538 L370 550 L367 538 L355 535 L367 532 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M250 560 L252 570 L262 572 L252 574 L250 584 L248 574 L238 572 L248 570 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M350 560 L352 570 L362 572 L352 574 L350 584 L348 574 L338 572 L348 570 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
    </g>

    {/* Smoke/exhaust clouds */}
    <g id="smoke-clouds">
      <ellipse cx="220" cy="560" rx="35" ry="25" fill="#000000" opacity="0.15" />
      <ellipse cx="380" cy="560" rx="35" ry="25" fill="#000000" opacity="0.15" />
      <ellipse cx="260" cy="575" rx="40" ry="28" fill="#000000" opacity="0.12" />
      <ellipse cx="340" cy="575" rx="40" ry="28" fill="#000000" opacity="0.12" />
    </g>

    {/* LAUNCH text */}
    <g id="launch-text">
      <text
        x="300"
        y="50"
        textAnchor="middle"
        fill="#000000"
        fontSize="55"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
      >
        LAUNCH!
      </text>
    </g>

    {/* Black border frame */}
    <rect width="600" height="600" fill="none" stroke="#000000" strokeWidth="8" />
  </svg>
);
