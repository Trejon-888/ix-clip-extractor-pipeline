import React from "react";

export const MultiChannelCharacter: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* White background */}
    <rect width="600" height="600" fill="#FFFFFF" />

    {/* Professional character - multi-tasking juggling pose */}
    <g id="character">
      {/* Head - looking up at channels */}
      <circle cx="300" cy="300" r="48" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Hair */}
      <path
        d="M252 290 Q252 255 272 245 Q292 238 307 248 Q322 238 342 253 Q348 275 342 290"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3"
      />

      {/* Neck */}
      <path d="M285 343 L285 365 L315 365 L315 343" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Torso */}
      <path
        d="M275 365 L260 460 Q260 475 275 475 L325 475 Q340 475 340 460 L325 365 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Left arm - reaching up to SMS icon */}
      <path
        d="M280 375 Q250 360 230 330 L220 305"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Left hand */}
      <ellipse cx="218" cy="295" rx="16" ry="20" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(-20 218 295)" />

      {/* Right arm - reaching to email icon */}
      <path
        d="M320 375 Q350 360 370 330 L380 305"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Right hand */}
      <ellipse cx="382" cy="295" rx="16" ry="20" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(20 382 295)" />

      {/* Legs - stable stance */}
      <path d="M285 475 L275 545" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <path d="M315 475 L325 545" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="275" cy="550" rx="22" ry="12" fill="#000000" />
      <ellipse cx="325" cy="550" rx="22" ry="12" fill="#000000" />

      {/* Face - focused multi-tasking expression */}
      <circle cx="285" cy="295" r="5" fill="#000000" />
      <circle cx="315" cy="295" r="5" fill="#000000" />
      {/* Concentrated expression */}
      <path d="M285 315 Q300 320 315 315" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Focused eyebrows */}
      <path d="M278 283 L290 280" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M310 280 L322 283" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* SMS Phone icon - top left with detail */}
    <g id="sms-phone">
      <g transform="translate(140, 150)">
        {/* Phone body */}
        <rect x="0" y="0" width="85" height="135" rx="15" fill="#9AFF00" stroke="#000000" strokeWidth="5" />
        {/* Screen */}
        <rect x="10" y="15" width="65" height="95" rx="8" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
        {/* Message bubbles on screen */}
        <rect x="18" y="25" width="40" height="12" rx="6" fill="#9AFF00" />
        <rect x="25" y="42" width="42" height="12" rx="6" fill="#000000" opacity="0.2" />
        <rect x="18" y="59" width="38" height="12" rx="6" fill="#9AFF00" />
        {/* Home button */}
        <circle cx="42.5" cy="120" r="8" fill="#000000" opacity="0.3" />
        {/* SMS label */}
        <text x="42.5" y="160" textAnchor="middle" fill="#000000" fontSize="18" fontWeight="900" fontFamily="Inter, sans-serif">SMS</text>
      </g>
    </g>

    {/* Email envelope icon - top right detailed */}
    <g id="email">
      <g transform="translate(385, 155)">
        {/* Envelope */}
        <rect x="0" y="0" width="135" height="95" rx="12" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
        {/* Envelope flap */}
        <path d="M0 10 L67.5 55 L135 10" stroke="#9AFF00" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Side details */}
        <path d="M10 85 L45 55" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" />
        <path d="M125 85 L90 55" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" />
        {/* Seal */}
        <circle cx="67.5" cy="55" r="10" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
        {/* EMAIL label */}
        <text x="67.5" y="120" textAnchor="middle" fill="#000000" fontSize="17" fontWeight="900" fontFamily="Inter, sans-serif">EMAIL</text>
      </g>
    </g>

    {/* Calendar icon - bottom left detailed */}
    <g id="calendar">
      <g transform="translate(90, 420)">
        {/* Calendar body */}
        <rect x="0" y="0" width="115" height="115" rx="12" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
        {/* Header bar */}
        <rect x="0" y="0" width="115" height="35" rx="12" fill="#9AFF00" stroke="#000000" strokeWidth="5" />
        {/* Binding rings */}
        <circle cx="25" cy="0" r="10" fill="#000000" />
        <circle cx="90" cy="0" r="10" fill="#000000" />
        {/* Grid lines */}
        <line x1="0" y1="55" x2="115" y2="55" stroke="#000000" strokeWidth="3" />
        <line x1="0" y1="75" x2="115" y2="75" stroke="#000000" strokeWidth="3" />
        <line x1="0" y1="95" x2="115" y2="95" stroke="#000000" strokeWidth="3" />
        <line x1="30" y1="35" x2="30" y2="115" stroke="#000000" strokeWidth="3" />
        <line x1="60" y1="35" x2="60" y2="115" stroke="#000000" strokeWidth="3" />
        <line x1="85" y1="35" x2="85" y2="115" stroke="#000000" strokeWidth="3" />
        {/* Important date marked */}
        <circle cx="45" cy="65" r="8" fill="#9AFF00" />
      </g>
    </g>

    {/* Voicemail icon - bottom right detailed */}
    <g id="voicemail">
      <g transform="translate(405, 430)">
        {/* Voicemail device */}
        <rect x="0" y="0" width="115" height="95" rx="48" fill="#9AFF00" stroke="#000000" strokeWidth="5" />
        {/* Speaker grille */}
        <circle cx="35" cy="47" r="25" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
        <circle cx="80" cy="47" r="25" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
        {/* Sound waves */}
        <path d="M22 25 Q22 15 22 10" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M35 20 Q35 12 35 8" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M48 25 Q48 15 48 10" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Inner speaker details */}
        <circle cx="35" cy="47" r="12" fill="#9AFF00" />
        <circle cx="80" cy="47" r="12" fill="#9AFF00" />
      </g>
    </g>

    {/* Social media icon - center bottom */}
    <g id="social">
      <g transform="translate(260, 510)">
        {/* Social hub circle */}
        <circle cx="40" cy="40" r="35" fill="#9AFF00" stroke="#000000" strokeWidth="5" />
        {/* Connected nodes */}
        <circle cx="10" cy="15" r="12" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
        <circle cx="70" cy="15" r="12" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
        <circle cx="15" cy="65" r="12" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
        <circle cx="65" cy="65" r="12" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
        {/* Connection lines */}
        <line x1="20" y1="22" x2="30" y2="30" stroke="#000000" strokeWidth="3" />
        <line x1="60" y1="22" x2="50" y2="30" stroke="#000000" strokeWidth="3" />
        <line x1="24" y1="58" x2="32" y2="50" stroke="#000000" strokeWidth="3" />
        <line x1="56" y1="58" x2="48" y2="50" stroke="#000000" strokeWidth="3" />
      </g>
    </g>

    {/* Connection lines - showing juggling motion */}
    <g id="connection-lines">
      {/* Curved paths between character and icons */}
      <path d="M220 305 Q180 240 180 200" stroke="#9AFF00" strokeWidth="4" strokeDasharray="10 5" fill="none" opacity="0.6" />
      <path d="M380 305 Q440 240 440 210" stroke="#9AFF00" strokeWidth="4" strokeDasharray="10 5" fill="none" opacity="0.6" />
      <path d="M270 475 Q180 480 160 470" stroke="#9AFF00" strokeWidth="4" strokeDasharray="10 5" fill="none" opacity="0.6" />
      <path d="M330 475 Q420 480 450 470" stroke="#9AFF00" strokeWidth="4" strokeDasharray="10 5" fill="none" opacity="0.6" />
    </g>

    {/* Sparkles - multi-channel magic */}
    <g id="sparkles">
      <path d="M340 120 L343 132 L355 135 L343 138 L340 150 L337 138 L325 135 L337 132 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M260 110 L263 122 L275 125 L263 128 L260 140 L257 128 L245 125 L257 122 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M540 300 L543 312 L555 315 L543 318 L540 330 L537 318 L525 315 L537 312 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M60 320 L63 332 L75 335 L63 338 L60 350 L57 338 L45 335 L57 332 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
    </g>

    {/* Motion lines - showing activity */}
    <g id="motion-lines">
      <line x1="250" y1="200" x2="235" y2="190" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <line x1="350" y1="200" x2="365" y2="190" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <line x1="130" y1="380" x2="120" y2="365" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <line x1="470" y1="390" x2="485" y2="375" stroke="#9AFF00" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    </g>

    {/* MULTI text label at top */}
    <g id="multi-label">
      <text
        x="300"
        y="65"
        textAnchor="middle"
        fill="#000000"
        fontSize="45"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
      >
        MULTI-CHANNEL
      </text>
    </g>

    {/* Black border frame */}
    <rect width="600" height="600" fill="none" stroke="#000000" strokeWidth="8" />
  </svg>
);
