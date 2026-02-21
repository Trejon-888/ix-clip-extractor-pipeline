import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";

/**
 * Opus 4.6 Illustrations V2 — Apple-Quality Aesthetic
 *
 * Design principles:
 * - Designed for WHITE backgrounds (dark strokes, not light)
 * - Clean, minimal, premium feel
 * - Motion: elements animate using useCurrentFrame()
 * - Brand orange (#FF7614) as accent only
 * - Black/charcoal for primary elements
 * - Subtle shadows and depth
 */

const ORANGE = "#FF7614";
const BLACK = "#1A1A1A";
const GRAY = "#666666";
const LIGHT_GRAY = "#E5E5E5";
const GREEN = "#34C759";
const RED = "#FF3B30";

// ─────────────────────────────────────────
// 1. Opus 4.6 Badge (with Claude wordmark)
// ─────────────────────────────────────────
export const Opus46BadgeV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numberScale = spring({ frame, fps, from: 0.5, to: 1, config: { damping: 12, stiffness: 100 } });
  const logoOpacity = spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } });
  const ringRotate = interpolate(frame, [0, 90], [0, 360], { extrapolateRight: "clamp" });
  const ringOpacity = interpolate(frame, [0, 15], [0, 0.15], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      {/* SVG rings + number */}
      <svg width={size} height={size} viewBox="0 0 600 600" fill="none" style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Spinning accent ring */}
        <circle cx="300" cy="300" r="220" fill="none" stroke={ORANGE} strokeWidth="2" opacity={ringOpacity} strokeDasharray="20 15" transform={`rotate(${ringRotate} 300 300)`} />
        {/* Solid ring */}
        <circle cx="300" cy="300" r="180" fill="none" stroke={BLACK} strokeWidth="3" opacity="0.1" />
        {/* "4.6" big number — pushed down to make room for logo */}
        <g transform={`translate(300, 360) scale(${numberScale}) translate(-300, -360)`}>
          <text x="300" y="380" textAnchor="middle" fill={BLACK} fontSize="120" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif">4.6</text>
        </g>
        {/* Orange dot accent */}
        <circle cx="300" cy="470" r="6" fill={ORANGE} />
      </svg>
      {/* Claude wordmark PNG — centered above the number */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: logoOpacity,
        }}
      >
        <Img
          src={staticFile("logos/claude-ai-wordmark.png")}
          style={{
            height: size * 0.14,
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// 2. Massive Upgrade
// ─────────────────────────────────────────
export const MassiveUpgradeV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arrowY = spring({ frame, fps, from: 40, to: 0, config: { damping: 10, stiffness: 80 } });
  const arrowOpacity = spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Up arrow — animated */}
      <g transform={`translate(0, ${arrowY})`} opacity={arrowOpacity}>
        <path d="M300 120 L220 240 L270 240 L270 400 L330 400 L330 240 L380 240Z" fill={BLACK} />
      </g>
      {/* Progress bars */}
      {[0, 1, 2].map((i) => {
        const barWidth = spring({ frame: Math.max(0, frame - 8 - i * 4), fps, from: 0, to: [180, 260, 340][i], config: { damping: 14, stiffness: 80 } });
        return (
          <rect key={i} x="130" y={440 + i * 40} width={barWidth} height="24" rx="12" fill={i === 2 ? ORANGE : LIGHT_GRAY} />
        );
      })}
    </svg>
  );
};

// ─────────────────────────────────────────
// 3. Intelligent Brain
// ─────────────────────────────────────────
export const IntelligentBrainV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  // Pulsing neural dots
  const pulse = interpolate(frame % 30, [0, 15, 30], [0.4, 1, 0.4]);

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Brain outline */}
      <path d="M300 100 C200 100 130 170 130 260 C130 310 150 350 180 375 C170 400 165 430 180 450 C200 475 230 480 255 475 C270 505 300 515 330 510 C360 515 390 500 405 475 C430 480 460 465 470 440 C485 415 480 385 465 365 C490 340 500 300 490 260 C480 170 400 100 300 100Z" fill="none" stroke={BLACK} strokeWidth="3" />
      {/* Neural network dots - pulsing */}
      {[
        { cx: 230, cy: 220 }, { cx: 350, cy: 200 }, { cx: 280, cy: 300 },
        { cx: 370, cy: 320 }, { cx: 220, cy: 370 }, { cx: 340, cy: 400 },
      ].map((dot, i) => (
        <React.Fragment key={i}>
          <circle cx={dot.cx} cy={dot.cy} r={5 + (i % 2) * 2} fill={i % 3 === 0 ? ORANGE : BLACK} opacity={i % 2 === 0 ? pulse : 1 - pulse + 0.4} />
          {i < 5 && (
            <line x1={dot.cx} y1={dot.cy} x2={[350, 280, 370, 220, 340][i]} y2={[200, 300, 320, 370, 400][i]} stroke={BLACK} strokeWidth="1" opacity="0.15" />
          )}
        </React.Fragment>
      ))}
    </svg>
  );
};

// ─────────────────────────────────────────
// 4. Plans Carefully
// ─────────────────────────────────────────
export const PlanCarefullyV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Steps — staggered entrance */}
      {[0, 1, 2, 3].map((i) => {
        const stepScale = spring({ frame: Math.max(0, frame - i * 5), fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
        const w = [200, 260, 320, 380][i];
        return (
          <g key={i} transform={`scale(${stepScale})`} style={{ transformOrigin: `160px ${160 + i * 70}px` }}>
            <rect x="160" y={140 + i * 70} width={w} height="48" rx="24" fill={i === 3 ? ORANGE : "#F5F5F5"} stroke={i === 3 ? ORANGE : LIGHT_GRAY} strokeWidth="1.5" />
            <text x="190" y={170 + i * 70} fill={i === 3 ? "#FFFFFF" : BLACK} fontSize="20" fontWeight="600" fontFamily="system-ui, sans-serif">{["Analyze", "Plan", "Execute", "Verify"][i]}</text>
            {i < 3 && <circle cx={140} cy={164 + i * 70} r="10" fill={GREEN} opacity="0.8" />}
            {i < 3 && <path d={`M136 ${164 + i * 70} L139 ${168 + i * 70} L145 ${160 + i * 70}`} stroke="#FFF" strokeWidth="2" fill="none" />}
          </g>
        );
      })}
    </svg>
  );
};

// ─────────────────────────────────────────
// 5. Catches Mistakes
// ─────────────────────────────────────────
export const CatchMistakesV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldScale = spring({ frame, fps, from: 0.6, to: 1, config: { damping: 12, stiffness: 80 } });
  const checkDraw = interpolate(frame, [10, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g transform={`translate(300, 280) scale(${shieldScale}) translate(-300, -280)`}>
        {/* Shield */}
        <path d="M300 80 L160 160 L160 310 C160 400 220 460 300 500 C380 460 440 400 440 310 L440 160Z" fill="#F8F8F8" stroke={BLACK} strokeWidth="3" />
        {/* Checkmark — animated draw */}
        <path d="M230 280 L275 330 L375 220" stroke={GREEN} strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" strokeDashoffset={200 * (1 - checkDraw)} />
      </g>
    </svg>
  );
};

// ─────────────────────────────────────────
// 6. Claude Code Terminal
// ─────────────────────────────────────────
export const ClaudeCodeTerminalV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineReveal = (delay: number) => spring({ frame: Math.max(0, frame - delay), fps, from: 0, to: 1, config: { damping: 200 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Window */}
      <rect x="80" y="100" width="440" height="360" rx="16" fill="#FAFAFA" stroke={LIGHT_GRAY} strokeWidth="2" />
      {/* Title bar */}
      <rect x="80" y="100" width="440" height="44" rx="16" fill="#F5F5F5" />
      <rect x="80" y="128" width="440" height="16" fill="#F5F5F5" />
      <circle cx="108" cy="122" r="6" fill="#FF5F56" />
      <circle cx="128" cy="122" r="6" fill="#FFBD2E" />
      <circle cx="148" cy="122" r="6" fill="#27CA40" />
      {/* Lines — staggered reveal */}
      <g opacity={lineReveal(5)}>
        <text x="110" y="185" fill={ORANGE} fontSize="16" fontFamily="monospace" fontWeight="700">$</text>
        <text x="130" y="185" fill={BLACK} fontSize="16" fontFamily="monospace"> claude --model opus-4.6</text>
      </g>
      <g opacity={lineReveal(12)}>
        <text x="110" y="220" fill={GREEN} fontSize="15" fontFamily="monospace">✓ Connected to Opus 4.6</text>
      </g>
      <g opacity={lineReveal(18)}>
        <text x="110" y="255" fill={ORANGE} fontSize="16" fontFamily="monospace" fontWeight="700">$</text>
        <text x="130" y="255" fill={BLACK} fontSize="16" fontFamily="monospace"> analyze entire codebase</text>
      </g>
      <g opacity={lineReveal(24)}>
        <text x="110" y="290" fill={GREEN} fontSize="15" fontFamily="monospace">✓ 1,000,000 tokens processed</text>
      </g>
      <g opacity={lineReveal(30)}>
        <text x="110" y="325" fill={GRAY} fontSize="15" fontFamily="monospace">→ 847 files · 12 issues found</text>
      </g>
      {/* Cursor */}
      <rect x="110" y="355" width="9" height="18" fill={ORANGE} opacity={frame % 30 < 15 ? 1 : 0} />
    </svg>
  );
};

// ─────────────────────────────────────────
// 7. One Million Tokens (big reveal)
// ─────────────────────────────────────────
export const OneMillionTokensV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Count-up animation from 0 to 1,000,000
  const count = Math.min(
    1000000,
    Math.round(interpolate(frame, [0, 30], [0, 1000000], { extrapolateRight: "clamp" }))
  );
  const formatted = count.toLocaleString();

  const numberScale = spring({ frame, fps, from: 0.8, to: 1, config: { damping: 10, stiffness: 60 } });
  const accentOpacity = interpolate(frame, [25, 35], [0, 1], { extrapolateRight: "clamp" });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Big number — count up */}
      <g transform={`translate(300, 280) scale(${numberScale}) translate(-300, -280)`}>
        <text x="300" y="300" textAnchor="middle" fill={BLACK} fontSize="88" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif">{formatted}</text>
      </g>
      {/* "tokens" label */}
      <text x="300" y="370" textAnchor="middle" fill={GRAY} fontSize="28" fontWeight="500" fontFamily="system-ui, sans-serif" letterSpacing="6" opacity={accentOpacity}>TOKENS</text>
      {/* Orange underline accent */}
      <rect x="220" y="390" width="160" height="3" rx="2" fill={ORANGE} opacity={accentOpacity} />
      {/* "context window" subtitle */}
      <text x="300" y="200" textAnchor="middle" fill={LIGHT_GRAY} fontSize="24" fontWeight="600" fontFamily="system-ui, sans-serif" letterSpacing="8">CONTEXT WINDOW</text>
    </svg>
  );
};

// ─────────────────────────────────────────
// 8. Entire Codebases
// ─────────────────────────────────────────
export const EntireCodebasesV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* File cards — staggered */}
      {[0, 1, 2, 3, 4].map((i) => {
        const slideIn = spring({ frame: Math.max(0, frame - i * 3), fps, from: 30, to: 0, config: { damping: 14, stiffness: 100 } });
        const fadeIn = spring({ frame: Math.max(0, frame - i * 3), fps, from: 0, to: 1, config: { damping: 200 } });
        return (
          <g key={i} transform={`translate(${slideIn}, 0)`} opacity={fadeIn}>
            <rect x={120 + i * 6} y={120 + i * 55} width="360" height="42" rx="8" fill="#FAFAFA" stroke={LIGHT_GRAY} strokeWidth="1.5" />
            <circle cx={145 + i * 6} cy={141 + i * 55} r="4" fill={[ORANGE, BLACK, ORANGE, BLACK, ORANGE][i]} />
            <text x={160 + i * 6} y={146 + i * 55} fill={BLACK} fontSize="15" fontWeight="500" fontFamily="monospace">
              {["src/index.ts", "src/api/routes.ts", "src/auth/handler.ts", "src/utils/config.ts", "tests/api.test.ts"][i]}
            </text>
          </g>
        );
      })}
      {/* Count badge */}
      <rect x="350" y="420" width="120" height="36" rx="18" fill={ORANGE} />
      <text x="410" y="444" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">847 FILES</text>
    </svg>
  );
};

// ─────────────────────────────────────────
// 9. Financial Analysis
// ─────────────────────────────────────────
export const FinancialAnalysisV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Chart area */}
      <rect x="100" y="120" width="400" height="300" rx="12" fill="#FAFAFA" stroke={LIGHT_GRAY} strokeWidth="1" />
      {/* Bars — grow up */}
      {[0, 1, 2, 3, 4].map((i) => {
        const barH = spring({ frame: Math.max(0, frame - i * 3), fps, from: 0, to: [100, 140, 120, 180, 220][i], config: { damping: 12, stiffness: 60 } });
        return (
          <rect key={i} x={150 + i * 65} y={380 - barH} width="40" height={barH} rx="4" fill={i === 4 ? ORANGE : BLACK} opacity={i === 4 ? 1 : 0.15 + i * 0.1} />
        );
      })}
      {/* Trend line */}
      <polyline points="170,330 235,290 300,300 365,250 430,200" fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" opacity={interpolate(frame, [15, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {/* Label */}
      <text x="300" y="470" textAnchor="middle" fill={GRAY} fontSize="20" fontWeight="500" fontFamily="system-ui, sans-serif" letterSpacing="3">PERFORMANCE METRICS</text>
    </svg>
  );
};

// ─────────────────────────────────────────
// 10. Presentation Slides
// ─────────────────────────────────────────
export const PresentationSlidesV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({ frame, fps, from: 0.85, to: 1, config: { damping: 14, stiffness: 100 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Background slide */}
      <rect x="160" y="155" width="310" height="195" rx="8" fill="#F0F0F0" transform="rotate(-2 315 252)" />
      {/* Foreground slide */}
      <g transform={`translate(300, 250) scale(${slideIn}) translate(-300, -250)`}>
        <rect x="140" y="130" width="320" height="200" rx="8" fill="#FAFAFA" stroke={LIGHT_GRAY} strokeWidth="2" />
        {/* Slide content */}
        <rect x="170" y="160" width="140" height="10" rx="5" fill={BLACK} />
        <rect x="170" y="185" width="260" height="6" rx="3" fill={LIGHT_GRAY} />
        <rect x="170" y="200" width="220" height="6" rx="3" fill={LIGHT_GRAY} />
        <rect x="170" y="215" width="180" height="6" rx="3" fill={LIGHT_GRAY} />
        {/* Mini chart */}
        <rect x="370" y="260" width="60" height="40" rx="4" fill="#F5F5F5" />
        <rect x="378" y="280" width="10" height="15" rx="2" fill={ORANGE} opacity="0.6" />
        <rect x="392" y="272" width="10" height="23" rx="2" fill={ORANGE} opacity="0.8" />
        <rect x="406" y="265" width="10" height="30" rx="2" fill={ORANGE} />
      </g>
      {/* PowerPoint icon */}
      <rect x="250" y="380" width="100" height="36" rx="18" fill={ORANGE} opacity="0.1" />
      <text x="300" y="404" textAnchor="middle" fill={ORANGE} fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">IN REAL TIME</text>
    </svg>
  );
};

// ─────────────────────────────────────────
// 11. Google Workspace Crossed
// ─────────────────────────────────────────
export const GoogleWorkspaceCrossedV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();

  const xDraw = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Google-style dots */}
      <circle cx="230" cy="260" r="40" fill="#4285F4" opacity="0.25" />
      <circle cx="340" cy="220" r="35" fill="#EA4335" opacity="0.25" />
      <circle cx="370" cy="310" r="38" fill="#FBBC05" opacity="0.25" />
      <circle cx="260" cy="330" r="32" fill="#34A853" opacity="0.25" />
      {/* "Google Workspace" text — faded */}
      <text x="300" y="270" textAnchor="middle" fill={GRAY} fontSize="32" fontWeight="600" fontFamily="system-ui, sans-serif" opacity="0.5">Google</text>
      <text x="300" y="310" textAnchor="middle" fill={GRAY} fontSize="24" fontWeight="400" fontFamily="system-ui, sans-serif" opacity="0.4">Workspace</text>
      {/* X — animated draw */}
      <line x1="160" y1="180" x2={160 + 280 * xDraw} y2={180 + 200 * xDraw} stroke={RED} strokeWidth="6" strokeLinecap="round" />
      <line x1="440" y1="180" x2={440 - 280 * xDraw} y2={180 + 200 * xDraw} stroke={RED} strokeWidth="6" strokeLinecap="round" />
      {/* "Use Claude" */}
      <text x="300" y="460" textAnchor="middle" fill={BLACK} fontSize="28" fontWeight="700" fontFamily="system-ui, sans-serif" opacity={xDraw}>Use Claude.</text>
    </svg>
  );
};

// ─────────────────────────────────────────
// 12. Multitasking Co-work
// ─────────────────────────────────────────
export const MultitaskingV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tasks = [
    { x: 160, y: 160, label: "Research", delay: 0 },
    { x: 440, y: 160, label: "Analyze", delay: 4 },
    { x: 160, y: 380, label: "Write", delay: 8 },
    { x: 440, y: 380, label: "Create", delay: 12 },
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Central hub */}
      <circle cx="300" cy="270" r="50" fill="#FAFAFA" stroke={BLACK} strokeWidth="2.5" />
      <text x="300" y="265" textAnchor="middle" fill={BLACK} fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif">CO-WORK</text>
      <text x="300" y="282" textAnchor="middle" fill={ORANGE} fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">ENGINE</text>
      {/* Task nodes — staggered */}
      {tasks.map((task, i) => {
        const nodeScale = spring({ frame: Math.max(0, frame - task.delay), fps, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });
        return (
          <React.Fragment key={i}>
            <line x1="300" y1="270" x2={task.x} y2={task.y} stroke={LIGHT_GRAY} strokeWidth="1.5" />
            <g transform={`translate(${task.x}, ${task.y}) scale(${nodeScale}) translate(-${task.x}, -${task.y})`}>
              <circle cx={task.x} cy={task.y} r="35" fill="#FAFAFA" stroke={i % 2 === 0 ? ORANGE : BLACK} strokeWidth="2" />
              <text x={task.x} y={task.y + 5} textAnchor="middle" fill={BLACK} fontSize="12" fontWeight="600" fontFamily="system-ui, sans-serif">{task.label}</text>
            </g>
          </React.Fragment>
        );
      })}
    </svg>
  );
};

// ─────────────────────────────────────────
// 13. Agent Teams Network
// ─────────────────────────────────────────
export const AgentTeamsNetworkV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodes = [
    { x: 300, y: 140, label: "Agent 1" },
    { x: 160, y: 300, label: "Agent 2" },
    { x: 440, y: 300, label: "Agent 3" },
    { x: 300, y: 420, label: "Agent 4" },
  ];

  // Connection lines animate in
  const lineOpacity = interpolate(frame, [5, 15], [0, 0.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Mesh connections */}
      {[[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]].map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={ORANGE} strokeWidth="1.5" opacity={lineOpacity} />
      ))}
      {/* Nodes — staggered pop */}
      {nodes.map((node, i) => {
        const nodeScale = spring({ frame: Math.max(0, frame - i * 4), fps, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });
        return (
          <g key={i} transform={`translate(${node.x}, ${node.y}) scale(${nodeScale}) translate(-${node.x}, -${node.y})`}>
            <circle cx={node.x} cy={node.y} r="42" fill="#FAFAFA" stroke={BLACK} strokeWidth="2.5" />
            <text x={node.x} y={node.y + 5} textAnchor="middle" fill={BLACK} fontSize="13" fontWeight="600" fontFamily="system-ui, sans-serif">{node.label}</text>
          </g>
        );
      })}
      {/* Bidirectional arrows */}
      {[[230, 215], [370, 215], [300, 285]].map(([x, y], i) => (
        <text key={i} x={x} y={y} textAnchor="middle" fill={ORANGE} fontSize="14" fontWeight="700" opacity={lineOpacity * 5}>↔</text>
      ))}
    </svg>
  );
};

// ─────────────────────────────────────────
// 14. Orchestrator Hub
// ─────────────────────────────────────────
export const OrchestratorHubV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === PHASE 1: Hub appears (frames 0-10) ===
  const hubScale = spring({ frame, fps, from: 0.4, to: 1, config: { damping: 12, stiffness: 100 } });
  const hubOpacity = spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } });

  // Hub pulse (continuous breathing)
  const hubPulse = interpolate(frame % 40, [0, 20, 40], [0, 0.15, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // === PHASE 2: Connection lines draw out (frames 6-22) ===
  const lineDrawProgress = interpolate(frame, [6, 22], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // === PHASE 3: Members cascade in (frames 10-22) ===
  const members = [
    { x: 130, y: 420, label: "Frontend", icon: "{ }", color: "#3B82F6" },
    { x: 300, y: 470, label: "Backend", icon: "< >", color: "#8B5CF6" },
    { x: 470, y: 420, label: "Tests", icon: "✓", color: "#10B981" },
  ];

  // === PHASE 4: Task delegation — orange pulses travel FROM hub TO members (frames 20-45) ===
  const delegatePulseProgress = (memberIdx: number) => {
    const start = 20 + memberIdx * 5;
    return interpolate(frame, [start, start + 18], [0, 1], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });
  };

  // === PHASE 5: Members "working" — progress rings fill (frames 35-65) ===
  const workProgress = (memberIdx: number) => {
    const start = 35 + memberIdx * 6;
    return interpolate(frame, [start, start + 25], [0, 1], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });
  };

  // === PHASE 6: Results flow BACK — green pulses from members to hub (frames 55-80) ===
  const returnPulseProgress = (memberIdx: number) => {
    const start = 55 + memberIdx * 5;
    return interpolate(frame, [start, start + 16], [0, 1], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });
  };

  // === PHASE 7: Hub "complete" glow (frames 75+) ===
  const completeGlow = interpolate(frame, [75, 85], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // "TASK" label fades in at top
  const taskLabelOpacity = interpolate(frame, [2, 8], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Hub center coords
  const HUB_X = 300;
  const HUB_Y = 195;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Incoming task arrow at top */}
      <g opacity={taskLabelOpacity}>
        <line x1="300" y1="52" x2="300" y2="105" stroke={ORANGE} strokeWidth="2.5" markerEnd="url(#arrowDown)" />
        <rect x="232" y="28" width="136" height="28" rx="14" fill={ORANGE} opacity="0.12" />
        <text x="300" y="47" textAnchor="middle" fill={ORANGE} fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="1">INCOMING TASK</text>
      </g>
      <defs>
        <marker id="arrowDown" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={ORANGE} />
        </marker>
      </defs>

      {/* Hub glow (phase 7 — completion) */}
      <circle cx={HUB_X} cy={HUB_Y} r={78 + completeGlow * 8} fill="none" stroke="#10B981" strokeWidth="2" opacity={completeGlow * 0.4} />

      {/* Hub breathing pulse ring */}
      <circle cx={HUB_X} cy={HUB_Y} r={68 + hubPulse * 12} fill="none" stroke={ORANGE} strokeWidth="1.5" opacity={hubPulse * 0.6} />

      {/* Connection lines (animated stroke draw) */}
      {members.map((m, i) => {
        const dashLen = 200;
        const drawn = lineDrawProgress * dashLen;
        return (
          <line
            key={`line-${i}`}
            x1={HUB_X}
            y1={HUB_Y + 65}
            x2={m.x}
            y2={m.y - 38}
            stroke={BLACK}
            strokeWidth="2"
            strokeDasharray={`${dashLen}`}
            strokeDashoffset={dashLen - drawn}
            opacity="0.15"
          />
        );
      })}

      {/* Delegation pulses — orange dots traveling FROM hub TO members */}
      {members.map((m, i) => {
        const p = delegatePulseProgress(i);
        if (p <= 0 || p >= 1) return null;
        const px = interpolate(p, [0, 1], [HUB_X, m.x]);
        const py = interpolate(p, [0, 1], [HUB_Y + 65, m.y - 38]);
        return (
          <circle
            key={`dpulse-${i}`}
            cx={px}
            cy={py}
            r="6"
            fill={ORANGE}
            opacity={interpolate(p, [0, 0.5, 1], [0.3, 1, 0.3])}
          >
            <animate attributeName="r" values="4;7;4" dur="0.3s" repeatCount="indefinite" />
          </circle>
        );
      })}

      {/* Return pulses — green dots traveling FROM members BACK to hub */}
      {members.map((m, i) => {
        const p = returnPulseProgress(i);
        if (p <= 0 || p >= 1) return null;
        const px = interpolate(p, [0, 1], [m.x, HUB_X]);
        const py = interpolate(p, [0, 1], [m.y - 38, HUB_Y + 65]);
        return (
          <circle
            key={`rpulse-${i}`}
            cx={px}
            cy={py}
            r="5"
            fill="#10B981"
            opacity={interpolate(p, [0, 0.5, 1], [0.3, 1, 0.3])}
          />
        );
      })}

      {/* Hub node */}
      <g transform={`translate(${HUB_X}, ${HUB_Y}) scale(${hubScale}) translate(-${HUB_X}, -${HUB_Y})`} opacity={hubOpacity}>
        {/* Hub shadow */}
        <circle cx={HUB_X} cy={HUB_Y + 4} r="60" fill="rgba(0,0,0,0.06)" />
        {/* Hub circle */}
        <circle cx={HUB_X} cy={HUB_Y} r="60" fill="#FAFAFA" stroke={ORANGE} strokeWidth="3" />
        {/* Crown/director icon */}
        <text x={HUB_X} y={HUB_Y - 10} textAnchor="middle" fontSize="26">👑</text>
        <text x={HUB_X} y={HUB_Y + 16} textAnchor="middle" fill={BLACK} fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.8">ORCHESTRATOR</text>
        {/* Completion checkmark */}
        {completeGlow > 0.5 && (
          <circle cx={HUB_X + 42} cy={HUB_Y - 42} r="14" fill="#10B981" opacity={completeGlow}>
            <animate attributeName="r" values="12;16;14" dur="0.4s" fill="freeze" />
          </circle>
        )}
        {completeGlow > 0.5 && (
          <text x={HUB_X + 42} y={HUB_Y - 37} textAnchor="middle" fill="white" fontSize="14" fontWeight="800" opacity={completeGlow}>✓</text>
        )}
      </g>

      {/* Team member nodes */}
      {members.map((m, i) => {
        const mScale = spring({ frame: Math.max(0, frame - 10 - i * 4), fps, from: 0, to: 1, config: { damping: 12, stiffness: 90 } });
        const wp = workProgress(i);
        const circumference = 2 * Math.PI * 36;
        const progressOffset = circumference * (1 - wp);

        return (
          <React.Fragment key={i}>
            <g transform={`translate(${m.x}, ${m.y}) scale(${mScale}) translate(-${m.x}, -${m.y})`}>
              {/* Shadow */}
              <circle cx={m.x} cy={m.y + 3} r="36" fill="rgba(0,0,0,0.05)" />
              {/* Background circle */}
              <circle cx={m.x} cy={m.y} r="36" fill="#FAFAFA" stroke={BLACK} strokeWidth="2" />
              {/* Progress ring (fills during "working" phase) */}
              <circle
                cx={m.x}
                cy={m.y}
                r="36"
                fill="none"
                stroke={m.color}
                strokeWidth="3"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
                transform={`rotate(-90, ${m.x}, ${m.y})`}
                opacity={wp > 0 ? 0.7 : 0}
              />
              {/* Icon */}
              <text x={m.x} y={m.y - 4} textAnchor="middle" fill={m.color} fontSize="16" fontWeight="800" fontFamily="monospace">{m.icon}</text>
              {/* Label */}
              <text x={m.x} y={m.y + 16} textAnchor="middle" fill={BLACK} fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">{m.label}</text>
              {/* Done indicator */}
              {wp >= 1 && (
                <circle cx={m.x + 26} cy={m.y - 26} r="10" fill={m.color} opacity={interpolate(frame, [55 + i * 6, 60 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
                </circle>
              )}
              {wp >= 1 && (
                <text x={m.x + 26} y={m.y - 22} textAnchor="middle" fill="white" fontSize="10" fontWeight="800" opacity={interpolate(frame, [55 + i * 6, 60 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>✓</text>
              )}
            </g>
          </React.Fragment>
        );
      })}

      {/* Bottom status text */}
      {frame >= 25 && frame < 55 && (
        <text x="300" y="545" textAnchor="middle" fill={ORANGE} fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="1"
          opacity={interpolate(frame, [25, 30, 50, 55], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          DELEGATING TASKS...
        </text>
      )}
      {frame >= 55 && frame < 80 && (
        <text x="300" y="545" textAnchor="middle" fill="#8B5CF6" fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="1"
          opacity={interpolate(frame, [55, 60, 75, 80], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          AGENTS WORKING...
        </text>
      )}
      {frame >= 80 && (
        <text x="300" y="545" textAnchor="middle" fill="#10B981" fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="1"
          opacity={interpolate(frame, [80, 88], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          ALL TASKS COMPLETE ✓
        </text>
      )}
    </svg>
  );
};

// ─────────────────────────────────────────
// 15. 7× Tokens
// ─────────────────────────────────────────
export const SevenXTokensV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numScale = spring({ frame, fps, from: 0.5, to: 1, config: { damping: 8, stiffness: 60 } });
  const subOpacity = interpolate(frame, [15, 25], [0, 1], { extrapolateRight: "clamp" });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g transform={`translate(300, 270) scale(${numScale}) translate(-300, -270)`}>
        <text x="300" y="310" textAnchor="middle" fill={BLACK} fontSize="160" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif">7×</text>
      </g>
      <text x="300" y="400" textAnchor="middle" fill={GRAY} fontSize="28" fontWeight="500" fontFamily="system-ui, sans-serif" letterSpacing="4" opacity={subOpacity}>more tokens</text>
      {/* Orange accent dot */}
      <circle cx="300" cy="440" r="4" fill={ORANGE} opacity={subOpacity} />
    </svg>
  );
};

// ─────────────────────────────────────────
// 16. Subagents Comparison (Next Video teaser)
// ─────────────────────────────────────────
export const SubagentsComparisonV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftSlide = spring({ frame, fps, from: -40, to: 0, config: { damping: 14, stiffness: 80 } });
  const rightSlide = spring({ frame, fps, from: 40, to: 0, config: { damping: 14, stiffness: 80 } });
  const fadeIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      {/* Left card */}
      <g transform={`translate(${leftSlide}, 0)`} opacity={fadeIn}>
        <rect x="60" y="140" width="220" height="260" rx="16" fill="#FAFAFA" stroke={LIGHT_GRAY} strokeWidth="1.5" />
        <text x="170" y="190" textAnchor="middle" fill={GRAY} fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">Sub-agents</text>
        {/* Simple arrow down */}
        <circle cx="170" cy="260" r="20" fill="#F5F5F5" stroke={BLACK} strokeWidth="1.5" />
        <line x1="170" y1="280" x2="170" y2="340" stroke={BLACK} strokeWidth="1.5" />
        <circle cx="170" cy="355" r="15" fill="#F5F5F5" stroke={BLACK} strokeWidth="1" />
        <text x="170" y="260" textAnchor="middle" fill={GRAY} fontSize="9">YOU</text>
      </g>
      {/* VS */}
      <text x="300" y="280" textAnchor="middle" fill={ORANGE} fontSize="32" fontWeight="900" fontFamily="system-ui, sans-serif" opacity={fadeIn}>VS</text>
      {/* Right card */}
      <g transform={`translate(${rightSlide}, 0)`} opacity={fadeIn}>
        <rect x="320" y="140" width="220" height="260" rx="16" fill="#FAFAFA" stroke={ORANGE} strokeWidth="1.5" />
        <text x="430" y="190" textAnchor="middle" fill={BLACK} fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">Agent Teams</text>
        {/* Mesh */}
        {[[400, 250], [460, 250], [400, 330], [460, 330]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="14" fill="#FAFAFA" stroke={ORANGE} strokeWidth="1.5" />
        ))}
        <line x1="400" y1="250" x2="460" y2="250" stroke={ORANGE} strokeWidth="1" opacity="0.4" />
        <line x1="400" y1="250" x2="400" y2="330" stroke={ORANGE} strokeWidth="1" opacity="0.4" />
        <line x1="460" y1="250" x2="460" y2="330" stroke={ORANGE} strokeWidth="1" opacity="0.4" />
        <line x1="400" y1="330" x2="460" y2="330" stroke={ORANGE} strokeWidth="1" opacity="0.4" />
      </g>
      {/* CTA */}
      <text x="300" y="460" textAnchor="middle" fill={BLACK} fontSize="22" fontWeight="700" fontFamily="system-ui, sans-serif" opacity={fadeIn}>Next video →</text>
    </svg>
  );
};

// ─────────────────────────────────────────
// 17. Claude Logo (actual wordmark PNG)
// ─────────────────────────────────────────
export const AnthropicLogoV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, from: 0.7, to: 1, config: { damping: 12, stiffness: 80 } });
  const logoOpacity = spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${logoScale})`,
        opacity: logoOpacity,
      }}
    >
      <Img
        src={staticFile("logos/claude-ai-wordmark.png")}
        style={{
          maxWidth: size * 0.75,
          maxHeight: size * 0.5,
          objectFit: "contain",
        }}
      />
    </div>
  );
};

// ─────────────────────────────────────────
// 18. Favorite Model
// ─────────────────────────────────────────
export const FavoriteModelV2: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heart beat animation
  const beatScale = interpolate(frame % 20, [0, 5, 10, 15, 20], [1, 1.08, 1, 1.04, 1]);
  const heartScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 8, stiffness: 60 } });

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
      <g transform={`translate(300, 260) scale(${heartScale * beatScale}) translate(-300, -260)`}>
        {/* Heart — clean, minimal */}
        <path d="M300 400 C220 330 120 270 120 200 C120 150 160 110 210 110 C250 110 280 135 300 165 C320 135 350 110 390 110 C440 110 480 150 480 200 C480 270 380 330 300 400Z" fill="none" stroke={ORANGE} strokeWidth="4" />
        {/* Filled inner heart */}
        <path d="M300 380 C230 320 150 270 150 210 C150 170 180 140 215 140 C248 140 275 160 300 185 C325 160 352 140 385 140 C420 140 450 170 450 210 C450 270 370 320 300 380Z" fill={ORANGE} opacity="0.15" />
      </g>
      {/* Text below */}
      <text x="300" y="480" textAnchor="middle" fill={BLACK} fontSize="28" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">My favorite model</text>
      <circle cx="300" cy="510" r="4" fill={ORANGE} />
    </svg>
  );
};
