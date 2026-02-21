import React from "react";
import { COLORS } from "../colors";

/**
 * Opus 4.6 Announcement — All popup illustrations
 * ViewBox: 0 0 600 600 | Props: { size?: number }
 */

// 1. Opus 4.6 Badge
export const Opus46Badge: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    <defs>
      <linearGradient id="opus46grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={COLORS.primary} />
        <stop offset="100%" stopColor={COLORS.secondary} />
      </linearGradient>
      <filter id="opus46glow">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <circle cx="300" cy="260" r="180" fill={COLORS.darkGray} stroke="url(#opus46grad)" strokeWidth="4" />
    <text x="300" y="230" textAnchor="middle" fill={COLORS.white} fontSize="52" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="6">OPUS</text>
    <text x="300" y="310" textAnchor="middle" fill="url(#opus46grad)" fontSize="96" fontWeight="900" fontFamily="system-ui, sans-serif" filter="url(#opus46glow)">4.6</text>
    <text x="300" y="500" textAnchor="middle" fill={COLORS.lightGray} fontSize="36" fontWeight="600" fontFamily="system-ui, sans-serif" letterSpacing="4">IS HERE</text>
  </svg>
);

// 2. Massive Upgrade (rocket)
export const MassiveUpgrade: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    <defs>
      <linearGradient id="rocketGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor={COLORS.primary} />
        <stop offset="100%" stopColor={COLORS.secondary} />
      </linearGradient>
    </defs>
    {/* Rocket body */}
    <path d="M300 100 C300 100 240 200 240 320 L240 380 L360 380 L360 320 C360 200 300 100 300 100Z" fill={COLORS.white} />
    <path d="M300 120 C300 120 250 210 250 320 L250 370 L350 370 L350 320 C350 210 300 120 300 120Z" fill="url(#rocketGrad)" />
    {/* Nose cone */}
    <circle cx="300" cy="180" r="20" fill={COLORS.white} opacity="0.9" />
    {/* Fins */}
    <path d="M240 340 L200 400 L240 380Z" fill={COLORS.primary} />
    <path d="M360 340 L400 400 L360 380Z" fill={COLORS.primary} />
    {/* Flames */}
    <path d="M270 380 L300 500 L330 380Z" fill={COLORS.secondary} opacity="0.8" />
    <path d="M280 380 L300 460 L320 380Z" fill={COLORS.primary} />
    {/* Stars */}
    <circle cx="150" cy="150" r="4" fill={COLORS.white} opacity="0.6" />
    <circle cx="450" cy="200" r="3" fill={COLORS.white} opacity="0.5" />
    <circle cx="180" cy="350" r="3" fill={COLORS.white} opacity="0.4" />
    <circle cx="420" cy="120" r="5" fill={COLORS.white} opacity="0.7" />
    <text x="300" y="560" textAnchor="middle" fill={COLORS.primary} fontSize="40" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="4">MASSIVE UPGRADE</text>
  </svg>
);

// 3. Intelligent Brain
export const IntelligentBrain: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    <defs>
      <radialGradient id="brainGlow" cx="50%" cy="50%">
        <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.4" />
        <stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="300" cy="280" r="200" fill="url(#brainGlow)" />
    {/* Brain outline */}
    <path d="M300 120 C220 120 160 180 160 260 C160 300 175 340 200 360 C190 380 185 410 200 430 C215 450 240 460 260 455 C275 480 300 490 325 485 C350 490 375 475 390 455 C410 460 435 445 445 420 C460 400 455 370 440 350 C460 330 470 295 460 260 C450 200 390 120 300 120Z" fill="none" stroke={COLORS.primary} strokeWidth="4" />
    {/* Brain center line */}
    <path d="M300 140 C300 200 310 280 300 360 C290 400 300 450 300 470" fill="none" stroke={COLORS.primaryLight} strokeWidth="2" opacity="0.6" />
    {/* Neural connections */}
    <circle cx="250" cy="220" r="6" fill={COLORS.primary} />
    <circle cx="350" cy="240" r="6" fill={COLORS.primary} />
    <circle cx="280" cy="310" r="5" fill={COLORS.secondary} />
    <circle cx="340" cy="350" r="5" fill={COLORS.secondary} />
    <circle cx="230" cy="370" r="4" fill={COLORS.primary} opacity="0.7" />
    <line x1="250" y1="220" x2="350" y2="240" stroke={COLORS.primaryLight} strokeWidth="1.5" opacity="0.5" />
    <line x1="350" y1="240" x2="340" y2="350" stroke={COLORS.primaryLight} strokeWidth="1.5" opacity="0.5" />
    <line x1="280" y1="310" x2="230" y2="370" stroke={COLORS.primaryLight} strokeWidth="1.5" opacity="0.5" />
    <text x="300" y="540" textAnchor="middle" fill={COLORS.primary} fontSize="38" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="3">MORE INTELLIGENT</text>
  </svg>
);

// 4. Plan Carefully (strategy board)
export const PlanCarefully: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Board */}
    <rect x="120" y="100" width="360" height="340" rx="16" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="3" />
    {/* Steps */}
    <rect x="160" y="150" width="120" height="40" rx="8" fill={COLORS.primary} opacity="0.9" />
    <text x="220" y="177" textAnchor="middle" fill={COLORS.white} fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">STEP 1</text>
    <rect x="160" y="210" width="180" height="40" rx="8" fill={COLORS.primary} opacity="0.7" />
    <text x="250" y="237" textAnchor="middle" fill={COLORS.white} fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">STEP 2</text>
    <rect x="160" y="270" width="240" height="40" rx="8" fill={COLORS.primary} opacity="0.5" />
    <text x="280" y="297" textAnchor="middle" fill={COLORS.white} fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">STEP 3</text>
    <rect x="160" y="330" width="280" height="40" rx="8" fill={COLORS.primary} opacity="0.3" />
    <text x="300" y="357" textAnchor="middle" fill={COLORS.white} fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">STEP 4</text>
    {/* Checkmarks */}
    <path d="M140 160 L148 172 L168 148" stroke={COLORS.success} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M140 220 L148 232 L168 208" stroke={COLORS.success} strokeWidth="3" fill="none" strokeLinecap="round" />
    <text x="300" y="510" textAnchor="middle" fill={COLORS.primary} fontSize="38" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="3">PLANS CAREFULLY</text>
  </svg>
);

// 5. Catch Mistakes (shield + check)
export const CatchMistakes: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={COLORS.primary} />
        <stop offset="100%" stopColor={COLORS.primaryDark} />
      </linearGradient>
    </defs>
    {/* Shield */}
    <path d="M300 80 L160 160 L160 320 C160 400 220 460 300 500 C380 460 440 400 440 320 L440 160Z" fill="url(#shieldGrad)" />
    <path d="M300 100 L180 170 L180 320 C180 390 230 440 300 480 C370 440 420 390 420 320 L420 170Z" fill={COLORS.darkGray} />
    {/* Checkmark */}
    <path d="M240 290 L280 340 L370 230" stroke={COLORS.success} strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Bug icon crossed */}
    <circle cx="430" cy="160" r="30" fill={COLORS.error} opacity="0.8" />
    <text x="430" y="170" textAnchor="middle" fill={COLORS.white} fontSize="28" fontFamily="system-ui, sans-serif">🐛</text>
    <line x1="410" y1="140" x2="450" y2="180" stroke={COLORS.white} strokeWidth="3" />
    <text x="300" y="560" textAnchor="middle" fill={COLORS.primary} fontSize="36" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="3">CATCHES MISTAKES</text>
  </svg>
);

// 6. Claude Code Terminal
export const ClaudeCodeTerminal: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Terminal window */}
    <rect x="80" y="100" width="440" height="340" rx="12" fill="#1E1E1E" stroke={COLORS.primary} strokeWidth="2" />
    {/* Title bar */}
    <rect x="80" y="100" width="440" height="40" rx="12" fill="#2D2D2D" />
    <circle cx="110" cy="120" r="7" fill="#FF5F56" />
    <circle cx="135" cy="120" r="7" fill="#FFBD2E" />
    <circle cx="160" cy="120" r="7" fill="#27CA40" />
    <text x="300" y="126" textAnchor="middle" fill={COLORS.lightGray} fontSize="16" fontFamily="monospace">Claude Code</text>
    {/* Terminal content */}
    <text x="110" y="180" fill={COLORS.primary} fontSize="18" fontFamily="monospace" fontWeight="700">$</text>
    <text x="130" y="180" fill={COLORS.lightGray} fontSize="18" fontFamily="monospace"> claude --model opus-4.6</text>
    <text x="110" y="215" fill={COLORS.success} fontSize="16" fontFamily="monospace">✓ Connected to Opus 4.6</text>
    <text x="110" y="250" fill={COLORS.primary} fontSize="18" fontFamily="monospace" fontWeight="700">$</text>
    <text x="130" y="250" fill={COLORS.lightGray} fontSize="18" fontFamily="monospace"> analyze codebase</text>
    <text x="110" y="285" fill={COLORS.success} fontSize="16" fontFamily="monospace">✓ Processing 1M tokens...</text>
    <text x="110" y="320" fill={COLORS.secondary} fontSize="16" fontFamily="monospace">→ 847 files analyzed</text>
    {/* Cursor blink */}
    <rect x="110" y="350" width="10" height="20" fill={COLORS.primary} opacity="0.8" />
    <text x="300" y="510" textAnchor="middle" fill={COLORS.primary} fontSize="38" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="3">CLAUDE CODE</text>
  </svg>
);

// 7. One Million Tokens (big number)
export const OneMillionTokens: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    <defs>
      <linearGradient id="millionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={COLORS.primary} />
        <stop offset="50%" stopColor={COLORS.secondary} />
        <stop offset="100%" stopColor={COLORS.accent} />
      </linearGradient>
      <filter id="millionGlow">
        <feGaussianBlur stdDeviation="12" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <text x="300" y="220" textAnchor="middle" fill={COLORS.lightGray} fontSize="36" fontWeight="600" fontFamily="system-ui, sans-serif" letterSpacing="6">CONTEXT WINDOW</text>
    <text x="300" y="340" textAnchor="middle" fill="url(#millionGrad)" fontSize="100" fontWeight="900" fontFamily="system-ui, sans-serif" filter="url(#millionGlow)">1,000,000</text>
    <text x="300" y="420" textAnchor="middle" fill={COLORS.primary} fontSize="48" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="10">TOKENS</text>
    {/* Decorative line */}
    <line x1="150" y1="460" x2="450" y2="460" stroke={COLORS.primary} strokeWidth="2" opacity="0.5" />
  </svg>
);

// 8. Entire Codebases
export const EntireCodebases: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* File stack */}
    {[0, 1, 2, 3, 4].map((i) => (
      <React.Fragment key={i}>
        <rect x={140 + i * 8} y={100 + i * 15} width="300" height="50" rx="6" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="1.5" opacity={1 - i * 0.15} />
        <text x={160 + i * 8} y={130 + i * 15} fill={COLORS.primaryLight} fontSize="14" fontFamily="monospace" opacity={1 - i * 0.15}>
          {["index.ts", "api.ts", "auth.ts", "utils.ts", "config.ts"][i]}
        </text>
      </React.Fragment>
    ))}
    {/* Big bracket */}
    <path d="M100 100 L80 100 L80 380 L100 380" stroke={COLORS.primary} strokeWidth="3" fill="none" />
    <text x="60" y="245" textAnchor="middle" fill={COLORS.primary} fontSize="24" fontWeight="700" fontFamily="monospace" transform="rotate(-90 60 245)">847 FILES</text>
    {/* Arrow pointing to brain */}
    <path d="M300 380 L300 420" stroke={COLORS.primary} strokeWidth="3" markerEnd="url(#arrowhead)" />
    <circle cx="300" cy="460" r="40" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="2" />
    <text x="300" y="468" textAnchor="middle" fill={COLORS.primary} fontSize="28">🧠</text>
    <text x="300" y="550" textAnchor="middle" fill={COLORS.primary} fontSize="36" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="3">ENTIRE CODEBASES</text>
  </svg>
);

// 9. Financial Analysis
export const FinancialAnalysis: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Chart background */}
    <rect x="100" y="100" width="400" height="300" rx="12" fill={COLORS.darkGray} />
    {/* Grid lines */}
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1="140" y1={160 + i * 60} x2="460" y2={160 + i * 60} stroke={COLORS.mediumGray} strokeWidth="1" />
    ))}
    {/* Bar chart */}
    <rect x="170" y="260" width="40" height="100" rx="4" fill={COLORS.primary} opacity="0.6" />
    <rect x="230" y="220" width="40" height="140" rx="4" fill={COLORS.primary} opacity="0.7" />
    <rect x="290" y="180" width="40" height="180" rx="4" fill={COLORS.primary} opacity="0.8" />
    <rect x="350" y="160" width="40" height="200" rx="4" fill={COLORS.primary} />
    <rect x="410" y="140" width="40" height="220" rx="4" fill={COLORS.secondary} />
    {/* Trend line */}
    <polyline points="190,250 250,210 310,175 370,155 430,130" fill="none" stroke={COLORS.accent} strokeWidth="3" strokeLinecap="round" />
    {/* Labels */}
    <text x="300" y="440" textAnchor="middle" fill={COLORS.lightGray} fontSize="20" fontFamily="system-ui, sans-serif">Q1 → Q2 → Q3 → Q4 → Q5</text>
    <text x="300" y="530" textAnchor="middle" fill={COLORS.primary} fontSize="36" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="3">FINANCIAL ANALYSIS</text>
  </svg>
);

// 10. Presentation Slides
export const PresentationSlides: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Slide deck - stacked */}
    <rect x="160" y="160" width="320" height="200" rx="8" fill={COLORS.mediumGray} opacity="0.5" transform="rotate(-3 320 260)" />
    <rect x="150" y="150" width="320" height="200" rx="8" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="2" />
    {/* Slide content */}
    <rect x="180" y="180" width="150" height="12" rx="4" fill={COLORS.primary} />
    <rect x="180" y="210" width="260" height="8" rx="3" fill={COLORS.gray} />
    <rect x="180" y="230" width="220" height="8" rx="3" fill={COLORS.gray} opacity="0.7" />
    <rect x="180" y="250" width="180" height="8" rx="3" fill={COLORS.gray} opacity="0.5" />
    {/* Chart on slide */}
    <rect x="360" y="270" width="80" height="50" rx="4" fill={COLORS.primary} opacity="0.3" />
    <rect x="370" y="290" width="15" height="25" rx="2" fill={COLORS.primary} />
    <rect x="390" y="280" width="15" height="35" rx="2" fill={COLORS.secondary} />
    <rect x="410" y="275" width="15" height="40" rx="2" fill={COLORS.accent} />
    {/* Play button */}
    <circle cx="300" cy="400" r="30" fill={COLORS.primary} opacity="0.9" />
    <polygon points="290,385 290,415 315,400" fill={COLORS.white} />
    <text x="300" y="500" textAnchor="middle" fill={COLORS.primary} fontSize="36" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="3">CREATES SLIDES</text>
  </svg>
);

// 11. Google Workspace Crossed
export const GoogleWorkspaceCrossed: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Google colors */}
    <circle cx="220" cy="240" r="50" fill="#4285F4" opacity="0.6" />
    <circle cx="340" cy="200" r="40" fill="#EA4335" opacity="0.6" />
    <circle cx="380" cy="280" r="45" fill="#FBBC05" opacity="0.6" />
    <circle cx="280" cy="310" r="35" fill="#34A853" opacity="0.6" />
    <text x="300" y="220" textAnchor="middle" fill={COLORS.white} fontSize="28" fontWeight="600" fontFamily="system-ui, sans-serif">Google</text>
    <text x="300" y="260" textAnchor="middle" fill={COLORS.white} fontSize="28" fontWeight="600" fontFamily="system-ui, sans-serif">Workspace</text>
    {/* Big X */}
    <line x1="150" y1="140" x2="450" y2="380" stroke={COLORS.error} strokeWidth="10" strokeLinecap="round" />
    <line x1="450" y1="140" x2="150" y2="380" stroke={COLORS.error} strokeWidth="10" strokeLinecap="round" />
    <text x="300" y="480" textAnchor="middle" fill={COLORS.primary} fontSize="32" fontWeight="800" fontFamily="system-ui, sans-serif">USE CLAUDE INSTEAD</text>
  </svg>
);

// 12. Multitasking Visual
export const MultitaskingVisual: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Central hub */}
    <circle cx="300" cy="260" r="60" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="3" />
    <text x="300" y="255" textAnchor="middle" fill={COLORS.primary} fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">CO-WORK</text>
    <text x="300" y="275" textAnchor="middle" fill={COLORS.lightGray} fontSize="14" fontFamily="system-ui, sans-serif">ENGINE</text>
    {/* Task nodes */}
    {[
      { x: 160, y: 140, label: "RESEARCH", color: COLORS.primary },
      { x: 440, y: 140, label: "ANALYZE", color: COLORS.secondary },
      { x: 160, y: 380, label: "WRITE", color: COLORS.accent },
      { x: 440, y: 380, label: "CREATE", color: COLORS.primary },
    ].map((node, i) => (
      <React.Fragment key={i}>
        <line x1="300" y1="260" x2={node.x} y2={node.y} stroke={node.color} strokeWidth="2" opacity="0.5" strokeDasharray="6 4" />
        <circle cx={node.x} cy={node.y} r="40" fill={COLORS.darkGray} stroke={node.color} strokeWidth="2" />
        <text x={node.x} y={node.y + 5} textAnchor="middle" fill={node.color} fontSize="12" fontWeight="700" fontFamily="system-ui, sans-serif">{node.label}</text>
      </React.Fragment>
    ))}
    <text x="300" y="510" textAnchor="middle" fill={COLORS.primary} fontSize="36" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="3">MULTITASKS FOR YOU</text>
  </svg>
);

// 13. Agent Teams Network
export const AgentTeamsNetwork: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    <defs>
      <filter id="agentGlow">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    {/* Connections (mesh) */}
    {[
      [300, 160, 180, 300], [300, 160, 420, 300], [300, 160, 300, 400],
      [180, 300, 420, 300], [180, 300, 300, 400], [420, 300, 300, 400],
    ].map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.primary} strokeWidth="2" opacity="0.4" />
    ))}
    {/* Agent nodes */}
    {[
      { x: 300, y: 160, label: "AGENT 1" },
      { x: 180, y: 300, label: "AGENT 2" },
      { x: 420, y: 300, label: "AGENT 3" },
      { x: 300, y: 400, label: "AGENT 4" },
    ].map((node, i) => (
      <React.Fragment key={i}>
        <circle cx={node.x} cy={node.y} r="45" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="3" filter="url(#agentGlow)" />
        <text x={node.x} y={node.y + 5} textAnchor="middle" fill={COLORS.primary} fontSize="14" fontWeight="700" fontFamily="system-ui, sans-serif">{node.label}</text>
      </React.Fragment>
    ))}
    {/* Bidirectional arrows */}
    <text x="250" y="225" textAnchor="middle" fill={COLORS.secondary} fontSize="16">↔</text>
    <text x="360" y="225" textAnchor="middle" fill={COLORS.secondary} fontSize="16">↔</text>
    <text x="300" y="290" textAnchor="middle" fill={COLORS.secondary} fontSize="16">↔</text>
    <text x="300" y="530" textAnchor="middle" fill={COLORS.primary} fontSize="40" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="3">AGENT TEAMS</text>
  </svg>
);

// 14. Orchestrator Hub
export const OrchestratorHub: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Central orchestrator */}
    <circle cx="300" cy="240" r="70" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="4" />
    <text x="300" y="235" textAnchor="middle" fill={COLORS.primary} fontSize="14" fontWeight="800" fontFamily="system-ui, sans-serif">ORCHESTRATOR</text>
    <text x="300" y="255" textAnchor="middle" fill={COLORS.lightGray} fontSize="12" fontFamily="system-ui, sans-serif">MAIN AGENT</text>
    {/* Team members */}
    {[
      { x: 140, y: 400, label: "MEMBER 1" },
      { x: 300, y: 430, label: "MEMBER 2" },
      { x: 460, y: 400, label: "MEMBER 3" },
    ].map((node, i) => (
      <React.Fragment key={i}>
        {/* Arrow from orchestrator */}
        <line x1="300" y1="310" x2={node.x} y2={node.y - 35} stroke={COLORS.primary} strokeWidth="2" />
        <polygon points={`${node.x - 5},${node.y - 40} ${node.x + 5},${node.y - 40} ${node.x},${node.y - 30}`} fill={COLORS.primary} />
        {/* Arrow back */}
        <line x1={node.x + 15} y1={node.y - 35} x2={315} y2={310} stroke={COLORS.secondary} strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx={node.x} cy={node.y} r="35" fill={COLORS.darkGray} stroke={COLORS.secondary} strokeWidth="2" />
        <text x={node.x} y={node.y + 5} textAnchor="middle" fill={COLORS.secondary} fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">{node.label}</text>
      </React.Fragment>
    ))}
    {/* Member-to-member arrows */}
    <path d="M175 400 Q300 450 425 400" fill="none" stroke={COLORS.accent} strokeWidth="1.5" strokeDasharray="4 3" />
    <text x="300" y="540" textAnchor="middle" fill={COLORS.primary} fontSize="36" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="3">ORCHESTRATOR</text>
  </svg>
);

// 15. Seven X Tokens
export const SevenXTokens: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    <defs>
      <linearGradient id="sevenxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={COLORS.secondary} />
        <stop offset="100%" stopColor={COLORS.primary} />
      </linearGradient>
    </defs>
    <text x="300" y="200" textAnchor="middle" fill={COLORS.lightGray} fontSize="32" fontWeight="600" fontFamily="system-ui, sans-serif" letterSpacing="4">THE ONLY DOWNSIDE</text>
    <text x="300" y="340" textAnchor="middle" fill="url(#sevenxGrad)" fontSize="140" fontWeight="900" fontFamily="system-ui, sans-serif">7×</text>
    <text x="300" y="420" textAnchor="middle" fill={COLORS.primary} fontSize="44" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="6">MORE TOKENS</text>
    <line x1="180" y1="460" x2="420" y2="460" stroke={COLORS.primary} strokeWidth="2" opacity="0.4" />
    <text x="300" y="510" textAnchor="middle" fill={COLORS.lightGray} fontSize="24" fontFamily="system-ui, sans-serif">Each teammate is a full instance</text>
  </svg>
);

// 16. Subagents vs Agent Teams
export const SubagentsComparison: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    {/* Left: Subagents */}
    <rect x="50" y="120" width="220" height="280" rx="12" fill={COLORS.darkGray} />
    <text x="160" y="160" textAnchor="middle" fill={COLORS.lightGray} fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">SUB-AGENTS</text>
    <circle cx="160" cy="220" r="25" fill={COLORS.mediumGray} stroke={COLORS.gray} strokeWidth="2" />
    <text x="160" y="225" textAnchor="middle" fill={COLORS.lightGray} fontSize="10">YOU</text>
    <line x1="160" y1="245" x2="160" y2="300" stroke={COLORS.gray} strokeWidth="2" />
    <circle cx="160" cy="320" r="20" fill={COLORS.mediumGray} stroke={COLORS.gray} strokeWidth="1.5" />
    <text x="160" y="325" textAnchor="middle" fill={COLORS.gray} fontSize="9">TASK</text>
    <path d="M160 300 L160 280" stroke={COLORS.gray} strokeWidth="1.5" markerEnd="url(#arrow)" />
    {/* VS */}
    <text x="300" y="270" textAnchor="middle" fill={COLORS.primary} fontSize="36" fontWeight="900" fontFamily="system-ui, sans-serif">VS</text>
    {/* Right: Agent Teams */}
    <rect x="330" y="120" width="220" height="280" rx="12" fill={COLORS.darkGray} />
    <text x="440" y="160" textAnchor="middle" fill={COLORS.primary} fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">AGENT TEAMS</text>
    {/* Mesh network */}
    {[
      { x: 400, y: 220 }, { x: 480, y: 220 },
      { x: 400, y: 310 }, { x: 480, y: 310 },
    ].map((node, i) => (
      <circle key={i} cx={node.x} cy={node.y} r="18" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="2" />
    ))}
    <line x1="400" y1="220" x2="480" y2="220" stroke={COLORS.primary} strokeWidth="1.5" opacity="0.6" />
    <line x1="400" y1="220" x2="400" y2="310" stroke={COLORS.primary} strokeWidth="1.5" opacity="0.6" />
    <line x1="480" y1="220" x2="480" y2="310" stroke={COLORS.primary} strokeWidth="1.5" opacity="0.6" />
    <line x1="400" y1="310" x2="480" y2="310" stroke={COLORS.primary} strokeWidth="1.5" opacity="0.6" />
    <line x1="400" y1="220" x2="480" y2="310" stroke={COLORS.primary} strokeWidth="1" opacity="0.3" />
    <line x1="480" y1="220" x2="400" y2="310" stroke={COLORS.primary} strokeWidth="1" opacity="0.3" />
    <text x="300" y="470" textAnchor="middle" fill={COLORS.primary} fontSize="28" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="2">NEXT VIDEO →</text>
    <text x="300" y="520" textAnchor="middle" fill={COLORS.lightGray} fontSize="20" fontFamily="system-ui, sans-serif">THE DIFFERENCE EXPLAINED</text>
  </svg>
);

// 17. Favorite Model Heart
export const FavoriteModelHeart: React.FC<{ size?: number }> = ({ size = 600 }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
    <defs>
      <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={COLORS.error} />
        <stop offset="100%" stopColor={COLORS.primary} />
      </linearGradient>
    </defs>
    {/* Heart */}
    <path d="M300 450 C200 350 100 280 100 200 C100 140 150 100 200 100 C240 100 275 125 300 160 C325 125 360 100 400 100 C450 100 500 140 500 200 C500 280 400 350 300 450Z" fill="url(#heartGrad)" />
    <text x="300" y="290" textAnchor="middle" fill={COLORS.white} fontSize="56" fontWeight="900" fontFamily="system-ui, sans-serif">CLAUDE</text>
    <text x="300" y="540" textAnchor="middle" fill={COLORS.primary} fontSize="36" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="3">MY FAVORITE MODEL</text>
  </svg>
);
