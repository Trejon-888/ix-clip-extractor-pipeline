import React from "react";

const LIME_GREEN = "#BFFF00";
const DARK = "#1A1A1A";
const GRAY = "#666666";
const LIGHT_GRAY = "#E0E0E0";

/**
 * Large, full-screen SVG illustrations
 * No emojis - pure vector graphics
 * Designed to be prominent and attention-grabbing
 */

// Fragmented tools chaos - multiple disconnected pieces
export const FragmentedToolsLarge: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Scattered tool boxes */}
    <g transform="translate(50, 80) rotate(-12)">
      <rect width="100" height="80" rx="12" fill={DARK} />
      <rect x="15" y="20" width="70" height="8" rx="4" fill={LIGHT_GRAY} />
      <rect x="15" y="35" width="50" height="8" rx="4" fill={LIGHT_GRAY} />
      <rect x="15" y="50" width="60" height="8" rx="4" fill={LIGHT_GRAY} />
    </g>

    <g transform="translate(300, 60) rotate(8)">
      <rect width="110" height="85" rx="12" fill={DARK} />
      <circle cx="55" cy="42" r="25" fill={LIME_GREEN} />
      <path d="M45 42 L50 47 L65 32" stroke={DARK} strokeWidth="4" strokeLinecap="round" />
    </g>

    <g transform="translate(180, 200) rotate(-5)">
      <rect width="120" height="90" rx="12" fill={LIME_GREEN} />
      <rect x="15" y="15" width="90" height="60" rx="6" fill={DARK} />
      <circle cx="60" cy="45" r="15" fill={LIME_GREEN} />
    </g>

    <g transform="translate(40, 280) rotate(15)">
      <rect width="95" height="75" rx="12" fill={DARK} />
      <rect x="12" y="12" width="71" height="51" rx="6" fill="#4A90D9" />
    </g>

    <g transform="translate(320, 250) rotate(-10)">
      <rect width="105" height="80" rx="12" fill={DARK} />
      <circle cx="35" cy="40" r="12" fill={LIGHT_GRAY} />
      <circle cx="70" cy="40" r="12" fill={LIGHT_GRAY} />
      <rect x="25" y="58" width="55" height="6" rx="3" fill={LIGHT_GRAY} />
    </g>

    <g transform="translate(150, 380) rotate(5)">
      <rect width="100" height="75" rx="12" fill={DARK} />
      <path d="M30 25 L50 45 L70 25 M50 45 L50 60" stroke={LIME_GREEN} strokeWidth="4" strokeLinecap="round" />
    </g>

    {/* Broken connection lines */}
    <line x1="150" y1="130" x2="180" y2="200" stroke={GRAY} strokeWidth="2" strokeDasharray="8 6" />
    <line x1="350" y1="145" x2="300" y2="200" stroke={GRAY} strokeWidth="2" strokeDasharray="8 6" />
    <line x1="135" y1="355" x2="240" y2="290" stroke={GRAY} strokeWidth="2" strokeDasharray="8 6" />
    <line x1="320" y1="330" x2="250" y2="380" stroke={GRAY} strokeWidth="2" strokeDasharray="8 6" />

    {/* X marks showing disconnection */}
    <g transform="translate(225, 150)">
      <circle r="20" fill="#FF4444" />
      <path d="M-8 -8 L8 8 M8 -8 L-8 8" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </g>

    <g transform="translate(280, 340)">
      <circle r="18" fill="#FF4444" />
      <path d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

// Unified system - everything connected to center
export const UnifiedSystemLarge: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Outer ring */}
    <circle cx="250" cy="250" r="200" fill="none" stroke={LIGHT_GRAY} strokeWidth="2" />
    <circle cx="250" cy="250" r="150" fill="none" stroke={LIGHT_GRAY} strokeWidth="2" />
    <circle cx="250" cy="250" r="100" fill="none" stroke={LIGHT_GRAY} strokeWidth="2" />

    {/* Connection lines to center */}
    <line x1="250" y1="250" x2="250" y2="50" stroke={LIME_GREEN} strokeWidth="3" />
    <line x1="250" y1="250" x2="440" y2="180" stroke={LIME_GREEN} strokeWidth="3" />
    <line x1="250" y1="250" x2="400" y2="400" stroke={LIME_GREEN} strokeWidth="3" />
    <line x1="250" y1="250" x2="100" y2="400" stroke={LIME_GREEN} strokeWidth="3" />
    <line x1="250" y1="250" x2="60" y2="180" stroke={LIME_GREEN} strokeWidth="3" />

    {/* Outer nodes */}
    <g transform="translate(250, 50)">
      <circle r="35" fill={DARK} />
      <rect x="-15" y="-12" width="30" height="24" rx="4" fill={LIME_GREEN} />
    </g>

    <g transform="translate(440, 180)">
      <circle r="35" fill={DARK} />
      <path d="M-12 -8 L0 8 L12 -8" stroke={LIME_GREEN} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="0" cy="-12" r="4" fill={LIME_GREEN} />
    </g>

    <g transform="translate(400, 400)">
      <circle r="35" fill={DARK} />
      <circle cx="0" cy="0" r="12" fill="none" stroke={LIME_GREEN} strokeWidth="4" />
      <circle cx="0" cy="0" r="4" fill={LIME_GREEN} />
    </g>

    <g transform="translate(100, 400)">
      <circle r="35" fill={DARK} />
      <rect x="-12" y="-15" width="24" height="30" rx="4" fill={LIME_GREEN} />
      <rect x="-6" y="-9" width="12" height="18" rx="2" fill={DARK} />
    </g>

    <g transform="translate(60, 180)">
      <circle r="35" fill={DARK} />
      <path d="M-10 5 L0 -10 L10 5 L0 0 Z" fill={LIME_GREEN} />
    </g>

    {/* Center hub */}
    <circle cx="250" cy="250" r="55" fill={LIME_GREEN} />
    <circle cx="250" cy="250" r="35" fill={DARK} />
    <path d="M235 250 L250 235 L265 250 L250 265 Z" fill={LIME_GREEN} />
  </svg>
);

// Engine/machine - represents "the whole engine"
export const EngineLarge: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Main gear */}
    <circle cx="250" cy="250" r="120" fill="none" stroke={DARK} strokeWidth="8" />
    <circle cx="250" cy="250" r="80" fill={LIME_GREEN} />
    <circle cx="250" cy="250" r="40" fill={DARK} />
    <circle cx="250" cy="250" r="15" fill={LIME_GREEN} />

    {/* Gear teeth */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 250 + Math.cos(rad) * 120;
      const y1 = 250 + Math.sin(rad) * 120;
      const x2 = 250 + Math.cos(rad) * 155;
      const y2 = 250 + Math.sin(rad) * 155;
      return (
        <line
          key={angle}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={DARK}
          strokeWidth="20"
          strokeLinecap="round"
        />
      );
    })}

    {/* Small gears */}
    <g transform="translate(380, 150)">
      <circle r="40" fill="none" stroke={DARK} strokeWidth="5" />
      <circle r="25" fill={DARK} />
      <circle r="10" fill={LIME_GREEN} />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={Math.cos(rad) * 40}
            y1={Math.sin(rad) * 40}
            x2={Math.cos(rad) * 55}
            y2={Math.sin(rad) * 55}
            stroke={DARK}
            strokeWidth="12"
            strokeLinecap="round"
          />
        );
      })}
    </g>

    <g transform="translate(120, 380)">
      <circle r="35" fill="none" stroke={DARK} strokeWidth="4" />
      <circle r="20" fill={DARK} />
      <circle r="8" fill={LIME_GREEN} />
      {[0, 72, 144, 216, 288].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={Math.cos(rad) * 35}
            y1={Math.sin(rad) * 35}
            x2={Math.cos(rad) * 48}
            y2={Math.sin(rad) * 48}
            stroke={DARK}
            strokeWidth="10"
            strokeLinecap="round"
          />
        );
      })}
    </g>

    {/* Power lines */}
    <path d="M320 190 L340 170" stroke={LIME_GREEN} strokeWidth="4" strokeLinecap="round" />
    <path d="M180 320 L150 350" stroke={LIME_GREEN} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// Pipeline flow - represents "one pipeline view"
export const PipelineLarge: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Pipeline stages */}
    <g transform="translate(50, 200)">
      <rect width="100" height="100" rx="16" fill={DARK} />
      <circle cx="50" cy="50" r="25" fill={LIME_GREEN} />
      <text x="50" y="58" textAnchor="middle" fill={DARK} fontSize="24" fontWeight="bold">1</text>
    </g>

    <g transform="translate(200, 200)">
      <rect width="100" height="100" rx="16" fill={LIME_GREEN} />
      <circle cx="50" cy="50" r="25" fill={DARK} />
      <text x="50" y="58" textAnchor="middle" fill={LIME_GREEN} fontSize="24" fontWeight="bold">2</text>
    </g>

    <g transform="translate(350, 200)">
      <rect width="100" height="100" rx="16" fill={DARK} />
      <circle cx="50" cy="50" r="25" fill={LIME_GREEN} />
      <text x="50" y="58" textAnchor="middle" fill={DARK} fontSize="24" fontWeight="bold">3</text>
    </g>

    {/* Flow arrows */}
    <path d="M160 250 L190 250" stroke={LIME_GREEN} strokeWidth="6" strokeLinecap="round" />
    <path d="M180 240 L195 250 L180 260" fill={LIME_GREEN} />

    <path d="M310 250 L340 250" stroke={LIME_GREEN} strokeWidth="6" strokeLinecap="round" />
    <path d="M330 240 L345 250 L330 260" fill={LIME_GREEN} />

    {/* Progress indicator */}
    <rect x="50" y="350" width="400" height="12" rx="6" fill={LIGHT_GRAY} />
    <rect x="50" y="350" width="260" height="12" rx="6" fill={LIME_GREEN} />

    {/* Stage labels */}
    <text x="100" y="340" textAnchor="middle" fill={GRAY} fontSize="18" fontWeight="600">LEADS</text>
    <text x="250" y="340" textAnchor="middle" fill={GRAY} fontSize="18" fontWeight="600">OUTREACH</text>
    <text x="400" y="340" textAnchor="middle" fill={GRAY} fontSize="18" fontWeight="600">BOOKED</text>
  </svg>
);

// Broken connection - represents "nothing was connected"
export const BrokenConnectionLarge: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Left node */}
    <g transform="translate(120, 250)">
      <circle r="70" fill={DARK} />
      <circle r="45" fill={LIME_GREEN} />
      <rect x="-20" y="-25" width="40" height="50" rx="6" fill={DARK} />
    </g>

    {/* Right node */}
    <g transform="translate(380, 250)">
      <circle r="70" fill={DARK} />
      <circle r="45" fill={LIME_GREEN} />
      <circle r="20" fill={DARK} />
    </g>

    {/* Broken connection in middle */}
    <line x1="190" y1="230" x2="220" y2="220" stroke={GRAY} strokeWidth="6" strokeLinecap="round" strokeDasharray="1 1" />
    <line x1="280" y1="220" x2="310" y2="230" stroke={GRAY} strokeWidth="6" strokeLinecap="round" strokeDasharray="1 1" />

    <line x1="190" y1="270" x2="220" y2="280" stroke={GRAY} strokeWidth="6" strokeLinecap="round" strokeDasharray="1 1" />
    <line x1="280" y1="280" x2="310" y2="270" stroke={GRAY} strokeWidth="6" strokeLinecap="round" strokeDasharray="1 1" />

    {/* Big X in the middle */}
    <g transform="translate(250, 250)">
      <circle r="45" fill="#FF4444" />
      <path d="M-18 -18 L18 18 M18 -18 L-18 18" stroke="white" strokeWidth="8" strokeLinecap="round" />
    </g>

    {/* Lightning bolts showing error */}
    <path d="M230 180 L240 195 L235 195 L245 215" stroke="#FF4444" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M270 180 L260 195 L265 195 L255 215" stroke="#FF4444" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Success checkmark - represents solution/success
export const SuccessLarge: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Background circles */}
    <circle cx="250" cy="250" r="200" fill="none" stroke={LIGHT_GRAY} strokeWidth="2" />
    <circle cx="250" cy="250" r="160" fill="none" stroke={LIGHT_GRAY} strokeWidth="2" />

    {/* Main circle */}
    <circle cx="250" cy="250" r="120" fill={LIME_GREEN} />

    {/* Checkmark */}
    <path
      d="M180 250 L220 290 L320 190"
      stroke={DARK}
      strokeWidth="20"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Decorative rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 250 + Math.cos(rad) * 140;
      const y1 = 250 + Math.sin(rad) * 140;
      const x2 = 250 + Math.cos(rad) * 165;
      const y2 = 250 + Math.sin(rad) * 165;
      return (
        <line
          key={angle}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={LIME_GREEN}
          strokeWidth="6"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);
