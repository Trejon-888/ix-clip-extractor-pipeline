import React from "react";

export const BoomCharacter: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* White background */}
    <rect width="600" height="600" fill="#FFFFFF" />

    {/* Massive explosion burst - layered */}
    <g id="explosion-burst">
      {/* Outer glow */}
      <circle cx="300" cy="240" r="180" fill="#9AFF00" opacity="0.15" />
      <circle cx="300" cy="240" r="140" fill="#9AFF00" opacity="0.25" />

      {/* Main starburst rays - 16 rays */}
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 300 + Math.cos(rad) * 90;
        const y1 = 240 + Math.sin(rad) * 90;
        const x2 = 300 + Math.cos(rad) * 200;
        const y2 = 240 + Math.sin(rad) * 200;
        const isMainRay = angle % 45 === 0;
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#9AFF00"
            strokeWidth={isMainRay ? 12 : 8}
            strokeLinecap="round"
          />
        );
      })}

      {/* Inner burst circles */}
      <circle cx="300" cy="240" r="110" fill="none" stroke="#9AFF00" strokeWidth="8" />
      <circle cx="300" cy="240" r="85" fill="none" stroke="#9AFF00" strokeWidth="6" opacity="0.7" />
      <circle cx="300" cy="240" r="60" fill="none" stroke="#9AFF00" strokeWidth="5" opacity="0.5" />

      {/* Sharp points at ray ends */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 300 + Math.cos(rad) * 200;
        const y = 240 + Math.sin(rad) * 200;
        return (
          <g key={`point-${angle}`}>
            <circle cx={x} cy={y} r="15" fill="#9AFF00" stroke="#000000" strokeWidth="4" />
            <circle cx={x} cy={y} r="7" fill="#FFFFFF" />
          </g>
        );
      })}
    </g>

    {/* Professional character - extreme celebration pose */}
    <g id="character">
      {/* Head - tilted back in joy */}
      <circle cx="300" cy="210" r="48" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Hair - flying from energy */}
      <path
        d="M252 200 Q250 165 270 155 Q290 148 305 160 Q320 148 340 160 Q360 170 355 195"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3"
      />
      {/* Hair strands flying */}
      <path d="M255 170 Q245 155 240 145" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M350 180 Q360 165 368 155" stroke="#000000" strokeWidth="3" strokeLinecap="round" />

      {/* Neck */}
      <path d="M285 253 L285 275 L315 275 L315 253" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Torso - leaning back */}
      <path
        d="M275 275 L260 370 Q260 385 275 385 L325 385 Q340 385 340 370 L325 275 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Both arms raised HIGH in celebration */}
      {/* Left arm */}
      <path
        d="M280 285 Q250 270 230 240 L220 215"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Left hand - fist pump */}
      <ellipse cx="218" cy="205" rx="16" ry="20" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(-30 218 205)" />
      <line x1="210" y1="200" x2="205" y2="190" stroke="#000000" strokeWidth="4" strokeLinecap="round" />

      {/* Right arm */}
      <path
        d="M320 285 Q350 270 370 240 L380 215"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Right hand - fist pump */}
      <ellipse cx="382" cy="205" rx="16" ry="20" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(30 382 205)" />
      <line x1="390" y1="200" x2="395" y2="190" stroke="#000000" strokeWidth="4" strokeLinecap="round" />

      {/* Legs - jumping/floating off ground */}
      <path d="M285 385 L270 460 L265 475" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <path d="M315 385 L330 460 L335 475" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="265" cy="480" rx="22" ry="12" fill="#000000" transform="rotate(-15 265 480)" />
      <ellipse cx="335" cy="480" rx="22" ry="12" fill="#000000" transform="rotate(15 335 480)" />

      {/* Face - ECSTATIC expression */}
      {/* Eyes - squeezed shut with joy */}
      <path d="M280 202 Q285 208 290 202" stroke="#000000" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M310 202 Q315 208 320 202" stroke="#000000" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Huge smile */}
      <path d="M275 225 Q300 250 325 225" stroke="#000000" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Open mouth showing excitement */}
      <ellipse cx="300" cy="235" rx="18" ry="12" fill="#000000" />
      {/* Eyebrows - raised super high */}
      <path d="M275 188 L290 183" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
      <path d="M310 183 L325 188" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
    </g>

    {/* BOOM text - huge and bold */}
    <g id="boom-text">
      <text
        x="300"
        y="520"
        textAnchor="middle"
        fill="#9AFF00"
        fontSize="95"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
        stroke="#000000"
        strokeWidth="5"
        paintOrder="stroke"
      >
        BOOM!
      </text>
    </g>

    {/* Energy waves radiating from character */}
    <g id="energy-waves">
      <circle cx="300" cy="240" r="240" fill="none" stroke="#9AFF00" strokeWidth="4" opacity="0.4" strokeDasharray="15 10" />
      <circle cx="300" cy="240" r="260" fill="none" stroke="#9AFF00" strokeWidth="3" opacity="0.3" strokeDasharray="15 10" />
    </g>

    {/* Star sparkles - explosion particles */}
    <g id="stars">
      {/* Large stars */}
      <path d="M120 120 L127 140 L147 145 L127 150 L120 170 L113 150 L93 145 L113 140 Z" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
      <path d="M480 140 L487 160 L507 165 L487 170 L480 190 L473 170 L453 165 L473 160 Z" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
      <path d="M90 360 L97 380 L117 385 L97 390 L90 410 L83 390 L63 385 L83 380 Z" fill="#9AFF00" stroke="#000000" strokeWidth="3" />
      <path d="M510 380 L517 400 L537 405 L517 410 L510 430 L503 410 L483 405 L503 400 Z" fill="#9AFF00" stroke="#000000" strokeWidth="3" />

      {/* Medium stars */}
      <path d="M180 80 L185 95 L200 98 L185 101 L180 116 L175 101 L160 98 L175 95 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M420 90 L425 105 L440 108 L425 111 L420 126 L415 111 L400 108 L415 105 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M150 420 L155 435 L170 438 L155 441 L150 456 L145 441 L130 438 L145 435 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M450 440 L455 455 L470 458 L455 461 L450 476 L445 461 L430 458 L445 455 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />

      {/* Small stars */}
      <path d="M60 240 L63 250 L73 252 L63 254 L60 264 L57 254 L47 252 L57 250 Z" fill="#9AFF00" stroke="#000000" strokeWidth="1.5" />
      <path d="M540 260 L543 270 L553 272 L543 274 L540 284 L537 274 L527 272 L537 270 Z" fill="#9AFF00" stroke="#000000" strokeWidth="1.5" />
    </g>

    {/* Impact lines - showing force */}
    <g id="impact-lines">
      <line x1="200" y1="180" x2="170" y2="150" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      <line x1="400" y1="180" x2="430" y2="150" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      <line x1="210" y1="300" x2="180" y2="330" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      <line x1="390" y1="300" x2="420" y2="330" stroke="#9AFF00" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
    </g>

    {/* Comic-style action bubbles */}
    <g id="action-bubbles">
      {/* POW bubble */}
      <g transform="translate(440, 240)">
        <ellipse cx="0" cy="0" rx="45" ry="35" fill="#9AFF00" stroke="#000000" strokeWidth="4" />
        <text x="0" y="8" textAnchor="middle" fill="#000000" fontSize="22" fontWeight="900" fontFamily="Inter, sans-serif">POW</text>
      </g>

      {/* BAM bubble */}
      <g transform="translate(160, 250)">
        <ellipse cx="0" cy="0" rx="42" ry="33" fill="#9AFF00" stroke="#000000" strokeWidth="4" />
        <text x="0" y="8" textAnchor="middle" fill="#000000" fontSize="20" fontWeight="900" fontFamily="Inter, sans-serif">BAM</text>
      </g>
    </g>

    {/* Black border frame */}
    <rect width="600" height="600" fill="none" stroke="#000000" strokeWidth="8" />
  </svg>
);
