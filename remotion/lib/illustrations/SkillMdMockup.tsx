import React from "react";
import { COLORS } from "../colors";

/**
 * Skill.md File Mockup (SVG)
 * Represents a markdown file in VS Code style
 */
export const SkillMdMockup: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Editor window frame */}
    <rect
      x="80"
      y="100"
      width="440"
      height="400"
      rx="8"
      fill={COLORS.darkGray}
    />

    {/* Title bar */}
    <rect
      x="80"
      y="100"
      width="440"
      height="35"
      rx="8"
      fill={COLORS.mediumGray}
    />

    {/* Window controls (dots) */}
    <circle cx="100" cy="118" r="6" fill={COLORS.error} />
    <circle cx="120" cy="118" r="6" fill={COLORS.warning} />
    <circle cx="140" cy="118" r="6" fill={COLORS.success} />

    {/* File name */}
    <text
      x="300"
      y="122"
      textAnchor="middle"
      fill={COLORS.silver}
      fontSize="14"
      fontWeight="600"
    >
      skill.md
    </text>

    {/* Editor content area */}
    <rect
      x="80"
      y="135"
      width="440"
      height="365"
      fill={COLORS.dark}
    />

    {/* Line numbers */}
    <g fill={COLORS.gray} fontSize="14" fontFamily="monospace">
      <text x="95" y="165">1</text>
      <text x="95" y="190">2</text>
      <text x="95" y="215">3</text>
      <text x="95" y="240">4</text>
      <text x="95" y="265">5</text>
      <text x="95" y="290">6</text>
      <text x="95" y="315">7</text>
      <text x="95" y="340">8</text>
      <text x="95" y="365">9</text>
    </g>

    {/* Markdown content */}
    <g fontSize="15" fontFamily="monospace">
      {/* Heading */}
      <text x="120" y="165" fill={COLORS.primary} fontWeight="700"># Skill Name</text>

      {/* Description */}
      <text x="120" y="190" fill={COLORS.silver}>Description of the skill...</text>

      {/* Another heading */}
      <text x="120" y="215" fill={COLORS.primary} fontWeight="700">## Usage</text>

      {/* Code block */}
      <text x="120" y="240" fill={COLORS.lightGray}>```typescript</text>
      <text x="120" y="265" fill={COLORS.primaryLight}>const skill = loadSkill();</text>
      <text x="120" y="290" fill={COLORS.lightGray}>```</text>

      {/* List items */}
      <text x="120" y="315" fill={COLORS.silver}>- Feature 1</text>
      <text x="120" y="340" fill={COLORS.silver}>- Feature 2</text>
      <text x="120" y="365" fill={COLORS.silver}>- Feature 3</text>
    </g>

    {/* Cursor */}
    <rect
      x="265"
      y="350"
      width="2"
      height="18"
      fill={COLORS.primary}
    >
      <animate
        attributeName="opacity"
        values="1;0;1"
        dur="1s"
        repeatCount="indefinite"
      />
    </rect>

    {/* Label below */}
    <text
      x="300"
      y="530"
      textAnchor="middle"
      fill={COLORS.white}
      fontSize="28"
      fontWeight="800"
      letterSpacing="2"
    >
      SKILL.MD FILE
    </text>

    {/* Glow effect */}
    <rect
      x="80"
      y="100"
      width="440"
      height="400"
      rx="8"
      fill="none"
      stroke={COLORS.primary}
      strokeWidth="2"
      opacity="0.3"
      filter="blur(6px)"
    />
  </svg>
);
