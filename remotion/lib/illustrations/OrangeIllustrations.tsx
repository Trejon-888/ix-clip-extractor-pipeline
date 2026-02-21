import React from "react";
import { COLORS } from "../colors";

/**
 * Large SVG illustrations with ORANGE color scheme
 * No emojis - pure vector graphics
 * Designed to be prominent and attention-grabbing
 */

// Fragmented tools chaos - multiple disconnected pieces
export const FragmentedToolsOrange: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Scattered tool boxes */}
    <g transform="translate(50, 80) rotate(-12)">
      <rect width="100" height="80" rx="12" fill={COLORS.darkGray} />
      <rect x="15" y="20" width="70" height="8" rx="4" fill={COLORS.silver} />
      <rect x="15" y="35" width="50" height="8" rx="4" fill={COLORS.silver} />
      <rect x="15" y="50" width="60" height="8" rx="4" fill={COLORS.silver} />
    </g>

    <g transform="translate(300, 60) rotate(8)">
      <rect width="110" height="85" rx="12" fill={COLORS.darkGray} />
      <circle cx="55" cy="42" r="25" fill={COLORS.primary} />
      <path d="M45 42 L50 47 L65 32" stroke={COLORS.dark} strokeWidth="4" strokeLinecap="round" />
    </g>

    <g transform="translate(180, 200) rotate(-5)">
      <rect width="120" height="90" rx="12" fill={COLORS.primary} />
      <rect x="15" y="15" width="90" height="60" rx="6" fill={COLORS.dark} />
      <circle cx="60" cy="45" r="15" fill={COLORS.primary} />
    </g>

    <g transform="translate(40, 280) rotate(15)">
      <rect width="95" height="75" rx="12" fill={COLORS.darkGray} />
      <rect x="12" y="12" width="71" height="51" rx="6" fill="#4A90D9" />
    </g>

    <g transform="translate(320, 250) rotate(-10)">
      <rect width="105" height="80" rx="12" fill={COLORS.darkGray} />
      <circle cx="35" cy="40" r="12" fill={COLORS.silver} />
      <circle cx="70" cy="40" r="12" fill={COLORS.silver} />
      <rect x="25" y="58" width="55" height="6" rx="3" fill={COLORS.silver} />
    </g>

    <g transform="translate(150, 380) rotate(5)">
      <rect width="100" height="75" rx="12" fill={COLORS.darkGray} />
      <path d="M30 25 L50 45 L70 25 M50 45 L50 60" stroke={COLORS.primary} strokeWidth="4" strokeLinecap="round" />
    </g>

    {/* Broken connection lines */}
    <line x1="150" y1="130" x2="180" y2="200" stroke={COLORS.gray} strokeWidth="2" strokeDasharray="8 6" />
    <line x1="350" y1="145" x2="300" y2="200" stroke={COLORS.gray} strokeWidth="2" strokeDasharray="8 6" />
    <line x1="135" y1="355" x2="240" y2="290" stroke={COLORS.gray} strokeWidth="2" strokeDasharray="8 6" />
    <line x1="320" y1="330" x2="250" y2="380" stroke={COLORS.gray} strokeWidth="2" strokeDasharray="8 6" />

    {/* X marks showing disconnection */}
    <g transform="translate(225, 150)">
      <circle r="20" fill={COLORS.error} />
      <path d="M-8 -8 L8 8 M8 -8 L-8 8" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </g>

    <g transform="translate(280, 340)">
      <circle r="18" fill={COLORS.error} />
      <path d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

// Unified system - everything connected to center
export const UnifiedSystemOrange: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Outer rings */}
    <circle cx="250" cy="250" r="200" fill="none" stroke={COLORS.silver} strokeWidth="2" />
    <circle cx="250" cy="250" r="150" fill="none" stroke={COLORS.silver} strokeWidth="2" />
    <circle cx="250" cy="250" r="100" fill="none" stroke={COLORS.silver} strokeWidth="2" />

    {/* Connection lines to center */}
    <line x1="250" y1="250" x2="250" y2="50" stroke={COLORS.primary} strokeWidth="3" />
    <line x1="250" y1="250" x2="440" y2="180" stroke={COLORS.primary} strokeWidth="3" />
    <line x1="250" y1="250" x2="400" y2="400" stroke={COLORS.primary} strokeWidth="3" />
    <line x1="250" y1="250" x2="100" y2="400" stroke={COLORS.primary} strokeWidth="3" />
    <line x1="250" y1="250" x2="60" y2="180" stroke={COLORS.primary} strokeWidth="3" />

    {/* Outer nodes */}
    <g transform="translate(250, 50)">
      <circle r="35" fill={COLORS.darkGray} />
      <rect x="-15" y="-12" width="30" height="24" rx="4" fill={COLORS.primary} />
    </g>

    <g transform="translate(440, 180)">
      <circle r="35" fill={COLORS.darkGray} />
      <path d="M-12 -8 L0 8 L12 -8" stroke={COLORS.primary} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="0" cy="-12" r="4" fill={COLORS.primary} />
    </g>

    <g transform="translate(400, 400)">
      <circle r="35" fill={COLORS.darkGray} />
      <circle cx="0" cy="0" r="12" fill="none" stroke={COLORS.primary} strokeWidth="4" />
      <circle cx="0" cy="0" r="4" fill={COLORS.primary} />
    </g>

    <g transform="translate(100, 400)">
      <circle r="35" fill={COLORS.darkGray} />
      <rect x="-12" y="-15" width="24" height="30" rx="4" fill={COLORS.primary} />
      <rect x="-6" y="-9" width="12" height="18" rx="2" fill={COLORS.darkGray} />
    </g>

    <g transform="translate(60, 180)">
      <circle r="35" fill={COLORS.darkGray} />
      <path d="M-10 5 L0 -10 L10 5 L0 0 Z" fill={COLORS.primary} />
    </g>

    {/* Center hub */}
    <circle cx="250" cy="250" r="55" fill={COLORS.primary} />
    <circle cx="250" cy="250" r="35" fill={COLORS.darkGray} />
    <path d="M235 250 L250 235 L265 250 L250 265 Z" fill={COLORS.primary} />
  </svg>
);

// Engine/machine - represents "the whole engine"
export const EngineOrange: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Main gear */}
    <circle cx="250" cy="250" r="120" fill="none" stroke={COLORS.darkGray} strokeWidth="8" />
    <circle cx="250" cy="250" r="80" fill={COLORS.primary} />
    <circle cx="250" cy="250" r="40" fill={COLORS.darkGray} />
    <circle cx="250" cy="250" r="15" fill={COLORS.primary} />

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
          stroke={COLORS.darkGray}
          strokeWidth="20"
          strokeLinecap="round"
        />
      );
    })}

    {/* Small gears */}
    <g transform="translate(380, 150)">
      <circle r="40" fill="none" stroke={COLORS.darkGray} strokeWidth="5" />
      <circle r="25" fill={COLORS.darkGray} />
      <circle r="10" fill={COLORS.primary} />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={Math.cos(rad) * 40}
            y1={Math.sin(rad) * 40}
            x2={Math.cos(rad) * 55}
            y2={Math.sin(rad) * 55}
            stroke={COLORS.darkGray}
            strokeWidth="12"
            strokeLinecap="round"
          />
        );
      })}
    </g>

    <g transform="translate(120, 380)">
      <circle r="35" fill="none" stroke={COLORS.darkGray} strokeWidth="4" />
      <circle r="20" fill={COLORS.darkGray} />
      <circle r="8" fill={COLORS.primary} />
      {[0, 72, 144, 216, 288].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={Math.cos(rad) * 35}
            y1={Math.sin(rad) * 35}
            x2={Math.cos(rad) * 48}
            y2={Math.sin(rad) * 48}
            stroke={COLORS.darkGray}
            strokeWidth="10"
            strokeLinecap="round"
          />
        );
      })}
    </g>

    {/* Power lines */}
    <path d="M320 190 L340 170" stroke={COLORS.primary} strokeWidth="4" strokeLinecap="round" />
    <path d="M180 320 L150 350" stroke={COLORS.primary} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// Pipeline flow - represents "one pipeline view"
export const PipelineOrange: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Pipeline stages */}
    <g transform="translate(50, 200)">
      <rect width="100" height="100" rx="16" fill={COLORS.darkGray} />
      <circle cx="50" cy="50" r="25" fill={COLORS.primary} />
      <text x="50" y="58" textAnchor="middle" fill={COLORS.dark} fontSize="24" fontWeight="bold">1</text>
    </g>

    <g transform="translate(200, 200)">
      <rect width="100" height="100" rx="16" fill={COLORS.primary} />
      <circle cx="50" cy="50" r="25" fill={COLORS.darkGray} />
      <text x="50" y="58" textAnchor="middle" fill={COLORS.primary} fontSize="24" fontWeight="bold">2</text>
    </g>

    <g transform="translate(350, 200)">
      <rect width="100" height="100" rx="16" fill={COLORS.darkGray} />
      <circle cx="50" cy="50" r="25" fill={COLORS.primary} />
      <text x="50" y="58" textAnchor="middle" fill={COLORS.dark} fontSize="24" fontWeight="bold">3</text>
    </g>

    {/* Flow arrows */}
    <path d="M160 250 L190 250" stroke={COLORS.primary} strokeWidth="6" strokeLinecap="round" />
    <path d="M180 240 L195 250 L180 260" fill={COLORS.primary} />

    <path d="M310 250 L340 250" stroke={COLORS.primary} strokeWidth="6" strokeLinecap="round" />
    <path d="M330 240 L345 250 L330 260" fill={COLORS.primary} />

    {/* Progress indicator */}
    <rect x="50" y="350" width="400" height="12" rx="6" fill={COLORS.mediumGray} />
    <rect x="50" y="350" width="260" height="12" rx="6" fill={COLORS.primary} />

    {/* Stage labels */}
    <text x="100" y="340" textAnchor="middle" fill={COLORS.gray} fontSize="18" fontWeight="600">LEADS</text>
    <text x="250" y="340" textAnchor="middle" fill={COLORS.gray} fontSize="18" fontWeight="600">OUTREACH</text>
    <text x="400" y="340" textAnchor="middle" fill={COLORS.gray} fontSize="18" fontWeight="600">BOOKED</text>
  </svg>
);

// Broken connection - represents "nothing was connected"
export const BrokenConnectionOrange: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Left node */}
    <g transform="translate(120, 250)">
      <circle r="70" fill={COLORS.darkGray} />
      <circle r="45" fill={COLORS.primary} />
      <rect x="-20" y="-25" width="40" height="50" rx="6" fill={COLORS.darkGray} />
    </g>

    {/* Right node */}
    <g transform="translate(380, 250)">
      <circle r="70" fill={COLORS.darkGray} />
      <circle r="45" fill={COLORS.primary} />
      <circle r="20" fill={COLORS.darkGray} />
    </g>

    {/* Broken connection in middle */}
    <line x1="190" y1="230" x2="220" y2="220" stroke={COLORS.gray} strokeWidth="6" strokeLinecap="round" strokeDasharray="1 1" />
    <line x1="280" y1="220" x2="310" y2="230" stroke={COLORS.gray} strokeWidth="6" strokeLinecap="round" strokeDasharray="1 1" />

    <line x1="190" y1="270" x2="220" y2="280" stroke={COLORS.gray} strokeWidth="6" strokeLinecap="round" strokeDasharray="1 1" />
    <line x1="280" y1="280" x2="310" y2="270" stroke={COLORS.gray} strokeWidth="6" strokeLinecap="round" strokeDasharray="1 1" />

    {/* Big X in the middle */}
    <g transform="translate(250, 250)">
      <circle r="45" fill={COLORS.error} />
      <path d="M-18 -18 L18 18 M18 -18 L-18 18" stroke="white" strokeWidth="8" strokeLinecap="round" />
    </g>

    {/* Lightning bolts showing error */}
    <path d="M230 180 L240 195 L235 195 L245 215" stroke={COLORS.error} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M270 180 L260 195 L265 195 L255 215" stroke={COLORS.error} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Success checkmark - represents solution/success
export const SuccessOrange: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Background circles */}
    <circle cx="250" cy="250" r="200" fill="none" stroke={COLORS.silver} strokeWidth="2" />
    <circle cx="250" cy="250" r="160" fill="none" stroke={COLORS.silver} strokeWidth="2" />

    {/* Main circle */}
    <circle cx="250" cy="250" r="120" fill={COLORS.primary} />

    {/* Checkmark */}
    <path
      d="M180 250 L220 290 L320 190"
      stroke={COLORS.dark}
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
          stroke={COLORS.primary}
          strokeWidth="6"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

// Email icon - represents email outreach
export const EmailOrange: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Envelope body */}
    <rect x="80" y="150" width="340" height="220" rx="20" fill={COLORS.darkGray} />
    {/* Envelope flap */}
    <path d="M80 170 L250 290 L420 170" stroke={COLORS.primary} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Inner lines */}
    <rect x="130" y="280" width="120" height="12" rx="6" fill={COLORS.gray} />
    <rect x="130" y="310" width="180" height="12" rx="6" fill={COLORS.gray} />
    {/* Notification badge */}
    <circle cx="380" cy="180" r="40" fill={COLORS.primary} />
    <text x="380" y="195" textAnchor="middle" fill={COLORS.dark} fontSize="36" fontWeight="bold">3</text>
  </svg>
);

// Spam warning - represents emails landing in spam
export const SpamOrange: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Warning triangle */}
    <path d="M250 80 L420 380 L80 380 Z" fill={COLORS.error} />
    {/* Exclamation mark */}
    <rect x="235" y="160" width="30" height="120" rx="15" fill={COLORS.white} />
    <circle cx="250" cy="320" r="20" fill={COLORS.white} />
    {/* Crossed out envelope behind */}
    <g opacity="0.3">
      <rect x="120" y="200" width="260" height="160" rx="15" fill={COLORS.darkGray} />
      <line x1="120" y1="200" x2="380" y2="360" stroke={COLORS.error} strokeWidth="8" />
      <line x1="380" y1="200" x2="120" y2="360" stroke={COLORS.error} strokeWidth="8" />
    </g>
  </svg>
);

// Calendar/Booking - represents appointment booking
export const CalendarOrange: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Calendar body */}
    <rect x="80" y="100" width="340" height="320" rx="20" fill={COLORS.darkGray} />
    {/* Header */}
    <rect x="80" y="100" width="340" height="80" rx="20" fill={COLORS.primary} />
    {/* Calendar rings */}
    <rect x="140" y="70" width="20" height="60" rx="10" fill={COLORS.gray} />
    <rect x="340" y="70" width="20" height="60" rx="10" fill={COLORS.gray} />
    {/* Grid lines */}
    <line x1="80" y1="240" x2="420" y2="240" stroke={COLORS.mediumGray} strokeWidth="2" />
    <line x1="80" y1="320" x2="420" y2="320" stroke={COLORS.mediumGray} strokeWidth="2" />
    <line x1="193" y1="180" x2="193" y2="420" stroke={COLORS.mediumGray} strokeWidth="2" />
    <line x1="307" y1="180" x2="307" y2="420" stroke={COLORS.mediumGray} strokeWidth="2" />
    {/* Checkmark on one date */}
    <circle cx="250" cy="280" r="35" fill={COLORS.primary} />
    <path d="M230 280 L245 295 L275 265" stroke={COLORS.dark} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Leads/Contacts - represents lead discovery
export const LeadsOrange: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Main person silhouette */}
    <circle cx="250" cy="150" r="60" fill={COLORS.primary} />
    <path d="M130 350 C130 270, 180 220, 250 220 C320 220, 370 270, 370 350" fill={COLORS.primary} />

    {/* Smaller people in background */}
    <g opacity="0.6">
      <circle cx="120" cy="180" r="35" fill={COLORS.darkGray} />
      <path d="M50 320 C50 260, 80 230, 120 230 C160 230, 190 260, 190 320" fill={COLORS.darkGray} />
    </g>

    <g opacity="0.6">
      <circle cx="380" cy="180" r="35" fill={COLORS.darkGray} />
      <path d="M310 320 C310 260, 340 230, 380 230 C420 230, 450 260, 450 320" fill={COLORS.darkGray} />
    </g>

    {/* Target crosshair on main person */}
    <circle cx="250" cy="150" r="90" fill="none" stroke={COLORS.primary} strokeWidth="4" strokeDasharray="15 10" />
    <line x1="250" y1="40" x2="250" y2="80" stroke={COLORS.primary} strokeWidth="4" />
    <line x1="250" y1="220" x2="250" y2="260" stroke={COLORS.primary} strokeWidth="4" />
    <line x1="140" y1="150" x2="180" y2="150" stroke={COLORS.primary} strokeWidth="4" />
    <line x1="320" y1="150" x2="360" y2="150" stroke={COLORS.primary} strokeWidth="4" />

    {/* Plus signs for adding leads */}
    <g transform="translate(400, 100)">
      <circle r="30" fill={COLORS.primary} />
      <line x1="-12" y1="0" x2="12" y2="0" stroke={COLORS.dark} strokeWidth="6" strokeLinecap="round" />
      <line x1="0" y1="-12" x2="0" y2="12" stroke={COLORS.dark} strokeWidth="6" strokeLinecap="round" />
    </g>

    {/* Count badge */}
    <g transform="translate(100, 380)">
      <rect x="-50" y="-25" width="100" height="50" rx="25" fill={COLORS.primary} />
      <text x="0" y="10" textAnchor="middle" fill={COLORS.dark} fontSize="28" fontWeight="bold">+247</text>
    </g>
  </svg>
);

// Multi-channel outreach - represents outreach across channels
export const OutreachOrange: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Center hub */}
    <circle cx="250" cy="250" r="60" fill={COLORS.primary} />
    <circle cx="250" cy="250" r="35" fill={COLORS.dark} />

    {/* Outgoing arrows/channels */}
    {/* Email channel - top */}
    <g transform="translate(250, 100)">
      <rect x="-40" y="-25" width="80" height="50" rx="8" fill={COLORS.darkGray} />
      <path d="M-25 -10 L0 10 L25 -10" stroke={COLORS.primary} strokeWidth="4" fill="none" />
    </g>
    <line x1="250" y1="190" x2="250" y2="130" stroke={COLORS.primary} strokeWidth="4" />
    <path d="M240 140 L250 125 L260 140" fill={COLORS.primary} />

    {/* Phone channel - right */}
    <g transform="translate(400, 250)">
      <rect x="-30" y="-40" width="60" height="80" rx="10" fill={COLORS.darkGray} />
      <rect x="-20" y="-30" width="40" height="50" rx="4" fill={COLORS.primary} />
    </g>
    <line x1="310" y1="250" x2="360" y2="250" stroke={COLORS.primary} strokeWidth="4" />
    <path d="M350 240 L365 250 L350 260" fill={COLORS.primary} />

    {/* LinkedIn channel - bottom right */}
    <g transform="translate(380, 380)">
      <rect x="-35" y="-35" width="70" height="70" rx="12" fill={COLORS.darkGray} />
      <text x="0" y="15" textAnchor="middle" fill={COLORS.primary} fontSize="40" fontWeight="bold">in</text>
    </g>
    <line x1="295" y1="295" x2="340" y2="340" stroke={COLORS.primary} strokeWidth="4" />
    <path d="M335 325 L350 345 L330 345" fill={COLORS.primary} />

    {/* SMS channel - bottom left */}
    <g transform="translate(120, 380)">
      <path d="M-30 -30 L30 -30 L30 20 L10 20 L0 35 L-10 20 L-30 20 Z" fill={COLORS.darkGray} />
      <rect x="-15" y="-15" width="30" height="6" rx="3" fill={COLORS.primary} />
      <rect x="-15" y="0" width="20" height="6" rx="3" fill={COLORS.primary} />
    </g>
    <line x1="205" y1="295" x2="155" y2="345" stroke={COLORS.primary} strokeWidth="4" />
    <path d="M165 325 L150 345 L170 345" fill={COLORS.primary} />

    {/* Twitter/X channel - left */}
    <g transform="translate(100, 250)">
      <circle r="35" fill={COLORS.darkGray} />
      <text x="0" y="12" textAnchor="middle" fill={COLORS.primary} fontSize="36" fontWeight="bold">X</text>
    </g>
    <line x1="190" y1="250" x2="140" y2="250" stroke={COLORS.primary} strokeWidth="4" />
    <path d="M150 240 L135 250 L150 260" fill={COLORS.primary} />

    {/* Signal waves from center */}
    <circle cx="250" cy="250" r="80" fill="none" stroke={COLORS.primary} strokeWidth="2" opacity="0.5" />
    <circle cx="250" cy="250" r="100" fill="none" stroke={COLORS.primary} strokeWidth="2" opacity="0.3" />
  </svg>
);

// AI Brain - represents AI agents
export const AIBrainOrange: React.FC<{ size?: number }> = ({ size = 500 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" fill="none">
    {/* Brain outline */}
    <path
      d="M250 80 C150 80, 80 160, 80 260 C80 360, 150 420, 250 420 C350 420, 420 360, 420 260 C420 160, 350 80, 250 80"
      fill="none"
      stroke={COLORS.darkGray}
      strokeWidth="8"
    />
    {/* Neural nodes */}
    <circle cx="180" cy="180" r="30" fill={COLORS.primary} />
    <circle cx="320" cy="180" r="30" fill={COLORS.primary} />
    <circle cx="250" cy="260" r="40" fill={COLORS.primary} />
    <circle cx="150" cy="320" r="25" fill={COLORS.primary} />
    <circle cx="350" cy="320" r="25" fill={COLORS.primary} />
    {/* Connection lines */}
    <line x1="180" y1="210" x2="220" y2="230" stroke={COLORS.darkGray} strokeWidth="4" />
    <line x1="320" y1="210" x2="280" y2="230" stroke={COLORS.darkGray} strokeWidth="4" />
    <line x1="220" y1="290" x2="175" y2="310" stroke={COLORS.darkGray} strokeWidth="4" />
    <line x1="280" y1="290" x2="325" y2="310" stroke={COLORS.darkGray} strokeWidth="4" />
    {/* Circuit patterns */}
    <circle cx="250" cy="260" r="15" fill={COLORS.dark} />
  </svg>
);

// Export all with type
export type OrangeIllustrationType =
  | "fragmented-tools"
  | "unified-system"
  | "engine"
  | "pipeline"
  | "broken-connection"
  | "success"
  | "email"
  | "spam"
  | "calendar"
  | "ai-brain"
  | "leads"
  | "outreach";

export const ORANGE_ILLUSTRATIONS: Record<OrangeIllustrationType, React.FC<{ size?: number }>> = {
  "fragmented-tools": FragmentedToolsOrange,
  "unified-system": UnifiedSystemOrange,
  "engine": EngineOrange,
  "pipeline": PipelineOrange,
  "broken-connection": BrokenConnectionOrange,
  "success": SuccessOrange,
  "email": EmailOrange,
  "spam": SpamOrange,
  "calendar": CalendarOrange,
  "ai-brain": AIBrainOrange,
  "leads": LeadsOrange,
  "outreach": OutreachOrange,
};
