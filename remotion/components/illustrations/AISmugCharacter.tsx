import React from "react";

export const AISmugCharacter: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* White background */}
    <rect width="600" height="600" fill="#FFFFFF" />

    {/* AI robot character - smug/clever expression */}
    <g id="ai-robot">
      {/* Robot head - large and prominent */}
      <rect x="200" y="180" width="200" height="220" rx="30" fill="#9AFF00" stroke="#000000" strokeWidth="6" />

      {/* Head shadow for depth */}
      <rect x="205" y="185" width="190" height="210" rx="28" fill="#000000" opacity="0.1" />

      {/* Screen face display */}
      <rect x="220" y="210" width="160" height="150" rx="15" fill="#000000" stroke="#000000" strokeWidth="4" />

      {/* Eyes - smug expression */}
      <g id="smug-eyes">
        {/* Left eye - half-closed, smug look */}
        <ellipse cx="260" cy="260" rx="22" ry="12" fill="#9AFF00" />
        <ellipse cx="260" cy="265" rx="22" ry="8" fill="#000000" />

        {/* Right eye - half-closed, smug look */}
        <ellipse cx="340" cy="260" rx="22" ry="12" fill="#9AFF00" />
        <ellipse cx="340" cy="265" rx="22" ry="8" fill="#000000" />

        {/* Eyebrow lines - raised smugly */}
        <path d="M240 245 L280 240" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" />
        <path d="M320 240 L360 245" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* Smug smile - confident grin */}
      <path d="M250 310 Q300 330 350 310" stroke="#9AFF00" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Teeth showing in grin */}
      <rect x="280" y="315" width="40" height="8" rx="4" fill="#9AFF00" />

      {/* AI circuit pattern on head */}
      <g id="circuit-pattern" opacity="0.4">
        <circle cx="230" cy="200" r="4" fill="#000000" />
        <circle cx="250" cy="195" r="3" fill="#000000" />
        <circle cx="270" cy="200" r="4" fill="#000000" />
        <line x1="230" y1="200" x2="250" y2="195" stroke="#000000" strokeWidth="2" />
        <line x1="250" y1="195" x2="270" y2="200" stroke="#000000" strokeWidth="2" />

        <circle cx="370" cy="200" r="4" fill="#000000" />
        <circle cx="350" cy="195" r="3" fill="#000000" />
        <circle cx="330" cy="200" r="4" fill="#000000" />
        <line x1="370" y1="200" x2="350" y2="195" stroke="#000000" strokeWidth="2" />
        <line x1="350" y1="195" x2="330" y2="200" stroke="#000000" strokeWidth="2" />
      </g>

      {/* Antenna with signal */}
      <rect x="295" y="150" width="10" height="35" rx="5" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
      <circle cx="300" cy="145" r="12" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
      {/* Signal waves */}
      <path d="M285 135 Q275 125 270 115" stroke="#9AFF00" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M315 135 Q325 125 330 115" stroke="#9AFF00" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M290 140 Q282 132 278 125" stroke="#9AFF00" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M310 140 Q318 132 322 125" stroke="#9AFF00" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />

      {/* Neck/body connector */}
      <rect x="270" y="395" width="60" height="25" rx="10" fill="#9AFF00" stroke="#000000" strokeWidth="4" />

      {/* Body/torso */}
      <rect x="210" y="415" width="180" height="130" rx="20" fill="#FFFFFF" stroke="#000000" strokeWidth="6" />

      {/* Body panel details */}
      <rect x="230" y="435" width="140" height="35" rx="8" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
      <rect x="230" y="485" width="140" height="35" rx="8" fill="#9AFF00" stroke="#000000" strokeWidth="3" />

      {/* Control buttons */}
      <circle cx="250" cy="452" r="8" fill="#000000" />
      <circle cx="280" cy="452" r="8" fill="#000000" />
      <circle cx="310" cy="452" r="8" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
    </g>

    {/* Robot arm - hand on chin pose (like reference image) */}
    <g id="chin-hand">
      {/* Right arm reaching to chin */}
      <path
        d="M380 450 Q420 420 430 380 L440 340"
        stroke="#000000"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Robotic hand segments */}
      <g transform="translate(400, 310)">
        {/* Palm */}
        <rect x="0" y="0" width="50" height="60" rx="10" fill="#9AFF00" stroke="#000000" strokeWidth="5" />

        {/* Fingers - positioned under chin */}
        <rect x="5" y="-20" width="10" height="25" rx="5" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <rect x="18" y="-25" width="10" height="30" rx="5" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        <rect x="31" y="-20" width="10" height="25" rx="5" fill="#9AFF00" stroke="#000000" strokeWidth="3" />

        {/* Knuckle details */}
        <circle cx="15" cy="20" r="3" fill="#000000" />
        <circle cx="25" cy="20" r="3" fill="#000000" />
        <circle cx="35" cy="20" r="3" fill="#000000" />
      </g>
    </g>

    {/* Left arm at side */}
    <g id="left-arm">
      <path
        d="M220 450 Q180 440 160 460 L150 490"
        stroke="#000000"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x="135" y="485" width="35" height="45" rx="10" fill="#9AFF00" stroke="#000000" strokeWidth="5" />
    </g>

    {/* Thought bubbles - "AI doing the work" */}
    <g id="thought-bubbles">
      {/* Main thought bubble */}
      <ellipse cx="480" cy="220" rx="75" ry="60" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Icons inside thought bubble showing automation */}
      {/* Contact cards being moved */}
      <g transform="translate(430, 195)">
        <rect x="0" y="0" width="35" height="25" rx="4" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
        <circle cx="10" cy="10" r="4" fill="#000000" />
        <rect x="18" y="8" width="14" height="2" rx="1" fill="#000000" />
        <rect x="18" y="14" width="10" height="2" rx="1" fill="#000000" opacity="0.6" />
      </g>

      {/* Arrow showing movement */}
      <path d="M470 210 L500 210" stroke="#9AFF00" strokeWidth="4" strokeLinecap="round" />
      <path d="M493 205 L500 210 L493 215" fill="#9AFF00" stroke="#000000" strokeWidth="2" />

      {/* Pipeline stage */}
      <g transform="translate(505, 195)">
        <rect x="0" y="0" width="35" height="25" rx="4" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
        <path d="M10 12 L15 17 L25 7" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Small connecting bubbles */}
      <circle cx="435" cy="250" r="8" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
      <circle cx="415" cy="265" r="5" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
    </g>

    {/* Text bubble - "EZ" or smugness indicator */}
    <g id="text-bubble">
      <ellipse cx="140" cy="280" rx="45" ry="35" fill="#9AFF00" stroke="#000000" strokeWidth="4" />
      <text
        x="140"
        y="295"
        textAnchor="middle"
        fill="#000000"
        fontSize="32"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
      >
        EZ
      </text>
    </g>

    {/* Sparkles - AI magic */}
    <g id="sparkles">
      <path d="M520 180 L523 192 L535 195 L523 198 L520 210 L517 198 L505 195 L517 192 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M560 240 L562 250 L572 252 L562 254 L560 264 L558 254 L548 252 L558 250 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M120 200 L122 208 L130 210 L122 212 L120 220 L118 212 L110 210 L118 208 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
    </g>

    {/* Confidence particles */}
    <g id="confidence-aura">
      <circle cx="180" cy="350" r="4" fill="#9AFF00" opacity="0.6" />
      <circle cx="165" cy="380" r="5" fill="#9AFF00" opacity="0.7" />
      <circle cx="420" cy="360" r="6" fill="#9AFF00" opacity="0.5" />
      <circle cx="440" cy="390" r="4" fill="#9AFF00" opacity="0.8" />
    </g>

    {/* Caption label */}
    <g id="caption">
      <text
        x="300"
        y="570"
        textAnchor="middle"
        fill="#000000"
        fontSize="42"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
      >
        AI AUTOMATION
      </text>
    </g>

    {/* Black border frame */}
    <rect width="600" height="600" fill="none" stroke="#000000" strokeWidth="8" />
  </svg>
);
