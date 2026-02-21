import React from "react";

export const OptimizationCharacter: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* White background */}
    <rect width="600" height="600" fill="#FFFFFF" />

    {/* Performance meter/gauge - central element */}
    <g id="performance-gauge">
      {/* Gauge background */}
      <path
        d="M150 350 Q150 200 300 200 Q450 200 450 350"
        fill="none"
        stroke="#000000"
        strokeWidth="20"
        strokeLinecap="round"
      />

      {/* Gauge fill - showing optimization */}
      <path
        d="M150 350 Q150 200 300 200 Q450 200 450 350"
        fill="none"
        stroke="#9AFF00"
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray="0 150 450 0"
      />

      {/* Gauge markers */}
      {[0, 30, 60, 90, 120, 150, 180].map((angle) => {
        const rad = (angle * Math.PI) / 180 + Math.PI;
        const x1 = 300 + Math.cos(rad) * 140;
        const y1 = 350 + Math.sin(rad) * 140;
        const x2 = 300 + Math.cos(rad) * 160;
        const y2 = 350 + Math.sin(rad) * 160;
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
          />
        );
      })}

      {/* Needle pointing high */}
      <g transform="translate(300, 350)">
        <path
          d="M0 0 L-4 -130 L0 -140 L4 -130 Z"
          fill="#9AFF00"
          stroke="#000000"
          strokeWidth="4"
          transform="rotate(45)"
        />
        <circle cx="0" cy="0" r="18" fill="#9AFF00" stroke="#000000" strokeWidth="5" />
      </g>

      {/* Labels */}
      <text x="170" y="370" fill="#000000" fontSize="20" fontWeight="700" fontFamily="Inter, sans-serif">LOW</text>
      <text x="410" y="370" fill="#000000" fontSize="20" fontWeight="700" fontFamily="Inter, sans-serif">HIGH</text>
      <text x="300" y="250" textAnchor="middle" fill="#9AFF00" fontSize="36" fontWeight="900" fontFamily="Inter, sans-serif">OPTIMAL</text>
    </g>

    {/* Character - celebrating optimization */}
    <g id="character">
      {/* Head */}
      <circle cx="300" cy="420" r="45" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

      {/* Hair */}
      <path
        d="M255 410 Q255 375 275 365 Q295 358 310 368 Q325 358 345 373 Q345 393 338 410"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3"
      />

      {/* Happy expression */}
      <circle cx="285" cy="415" r="5" fill="#000000" />
      <circle cx="315" cy="415" r="5" fill="#000000" />
      <path d="M280 435 Q300 445 320 435" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Raised eyebrows */}
      <path d="M275 403 L290 400" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M310 400 L325 403" stroke="#000000" strokeWidth="3" strokeLinecap="round" />

      {/* Neck */}
      <path d="M285 460 L285 482 L315 482 L315 460" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Torso */}
      <path
        d="M275 482 L265 555 Q265 570 280 570 L320 570 Q335 570 335 555 L325 482 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Both arms raised in success */}
      <path
        d="M280 492 Q260 480 250 455 L245 435"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="243" cy="425" rx="14" ry="18" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(-25 243 425)" />

      <path
        d="M320 492 Q340 480 350 455 L355 435"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="357" cy="425" rx="14" ry="18" fill="#FFFFFF" stroke="#000000" strokeWidth="4" transform="rotate(25 357 425)" />
    </g>

    {/* Optimization stats */}
    <g id="stats">
      {/* Stat box 1 */}
      <g transform="translate(60, 440)">
        <rect x="0" y="0" width="100" height="70" rx="10" fill="#9AFF00" stroke="#000000" strokeWidth="4" />
        <text x="50" y="30" textAnchor="middle" fill="#000000" fontSize="28" fontWeight="900" fontFamily="Inter, sans-serif">+85%</text>
        <text x="50" y="55" textAnchor="middle" fill="#000000" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">SPEED</text>
      </g>

      {/* Stat box 2 */}
      <g transform="translate(440, 440)">
        <rect x="0" y="0" width="100" height="70" rx="10" fill="#9AFF00" stroke="#000000" strokeWidth="4" />
        <text x="50" y="30" textAnchor="middle" fill="#000000" fontSize="28" fontWeight="900" fontFamily="Inter, sans-serif">-60%</text>
        <text x="50" y="55" textAnchor="middle" fill="#000000" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">TIME</text>
      </g>

      {/* Stat box 3 */}
      <g transform="translate(250, 520)">
        <rect x="0" y="0" width="100" height="70" rx="10" fill="#9AFF00" stroke="#000000" strokeWidth="4" />
        <text x="50" y="30" textAnchor="middle" fill="#000000" fontSize="28" fontWeight="900" fontFamily="Inter, sans-serif">99%</text>
        <text x="50" y="55" textAnchor="middle" fill="#000000" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">SUCCESS</text>
      </g>
    </g>

    {/* Upward trending arrows */}
    <g id="trend-arrows">
      <path d="M100 280 L130 240 L160 260 L190 220" stroke="#9AFF00" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M180 230 L190 220 L185 240" fill="#9AFF00" />

      <path d="M410 280 L440 240 L470 260 L500 220" stroke="#9AFF00" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M490 230 L500 220 L495 240" fill="#9AFF00" />
    </g>

    {/* Sparkles - optimization magic */}
    <g id="sparkles">
      <path d="M220 180 L223 192 L235 195 L223 198 L220 210 L217 198 L205 195 L217 192 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M380 170 L383 182 L395 185 L383 188 L380 200 L377 188 L365 185 L377 182 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M540 300 L542 310 L552 312 L542 314 L540 324 L538 314 L528 312 L538 310 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
      <path d="M60 310 L62 320 L72 322 L62 324 L60 334 L58 324 L48 322 L58 320 Z" fill="#9AFF00" stroke="#000000" strokeWidth="2" />
    </g>

    {/* Caption */}
    <g id="caption">
      <text
        x="300"
        y="120"
        textAnchor="middle"
        fill="#000000"
        fontSize="42"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
      >
        OPTIMIZATION
      </text>
    </g>

    {/* Black border frame */}
    <rect width="600" height="600" fill="none" stroke="#000000" strokeWidth="8" />
  </svg>
);
