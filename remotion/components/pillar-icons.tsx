/**
 * Pillar Transition Icons
 *
 * Simple, clean icons for the 3 pillar transitions.
 * Designed for white backgrounds with orange primary color.
 */

import { COLORS } from '../lib/colors';

interface IconProps {
  size?: number;
}

/**
 * Setup Icon - Wrench/Tools
 * For Pillar 1: Setup
 */
export const SetupIcon: React.FC<IconProps> = ({ size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wrench shape */}
      <path
        d="M95 30L90 25C85 20 75 20 70 25L45 50L55 60L80 35C85 30 85 25 85 20L95 30Z"
        fill={COLORS.primary}
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M25 95L30 90C35 85 35 75 30 70L55 45L45 35L20 60C15 65 15 75 20 80L25 95Z"
        fill={COLORS.primary}
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Connection bolt */}
      <circle
        cx="60"
        cy="60"
        r="12"
        fill="#1A1A1A"
        stroke={COLORS.primary}
        strokeWidth="2"
      />
    </svg>
  );
};

/**
 * Skills Icon - Document/Instruction
 * For Pillar 2: Skills
 */
export const SkillsIcon: React.FC<IconProps> = ({ size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Document shape */}
      <rect
        x="25"
        y="15"
        width="70"
        height="90"
        rx="6"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="3"
      />
      {/* Folded corner */}
      <path
        d="M95 15V30L80 15H95Z"
        fill={COLORS.primary}
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Code lines */}
      <line
        x1="35"
        y1="40"
        x2="70"
        y2="40"
        stroke={COLORS.primary}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="35"
        y1="55"
        x2="85"
        y2="55"
        stroke="#6B7280"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="35"
        y1="70"
        x2="65"
        y2="70"
        stroke="#6B7280"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="35"
        y1="85"
        x2="80"
        y2="85"
        stroke="#6B7280"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Live Demo Icon - Play/Rocket
 * For Pillar 3: Live Demo
 */
export const LiveDemoIcon: React.FC<IconProps> = ({ size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rocket body */}
      <path
        d="M60 20L75 60L60 85L45 60L60 20Z"
        fill={COLORS.primary}
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Rocket window */}
      <circle
        cx="60"
        cy="45"
        r="10"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="2"
      />
      {/* Left fin */}
      <path
        d="M45 60L35 80L45 75L45 60Z"
        fill="#1A1A1A"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Right fin */}
      <path
        d="M75 60L85 80L75 75L75 60Z"
        fill="#1A1A1A"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Flames */}
      <path
        d="M55 90L60 105L65 90"
        fill="#FF6B00"
        stroke="#FF6B00"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M50 85L55 100L60 85"
        fill="#FFB800"
        stroke="#FFB800"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M60 85L65 100L70 85"
        fill="#FFB800"
        stroke="#FFB800"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};
