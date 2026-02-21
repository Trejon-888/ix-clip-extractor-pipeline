import React from "react";
import {
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	spring,
	Img,
	staticFile,
} from "remotion";
import { COLORS } from "../colors";

/**
 * Claude Creatives — Intro Section Illustrations
 *
 * 11 unique motion-graphic components for ConceptOverlay/AppleStylePopup on white backgrounds.
 * Each component: viewBox="0 0 600 600", size prop (default 600), animated with spring/interpolate.
 * Illustration-first: NO caption text. Clean SVG vectors, dark strokes, orange accent fills.
 */

const FONT = "system-ui, -apple-system, sans-serif";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. EnergyBurstExplosion — Orange lightning/energy burst radiating outward
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const EnergyBurstExplosion: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const burstScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
	const glowPulse = 0.6 + 0.4 * Math.sin(frame * 0.15);

	// 8 lightning bolts radiating from center
	const bolts = [
		{ angle: 0, length: 140 },
		{ angle: 45, length: 120 },
		{ angle: 90, length: 150 },
		{ angle: 135, length: 110 },
		{ angle: 180, length: 135 },
		{ angle: 225, length: 125 },
		{ angle: 270, length: 145 },
		{ angle: 315, length: 115 },
	];

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<radialGradient id="energyGlow">
					<stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.5 * glowPulse} />
					<stop offset="50%" stopColor={COLORS.secondary} stopOpacity={0.2 * glowPulse} />
					<stop offset="100%" stopColor={COLORS.primary} stopOpacity={0} />
				</radialGradient>
				<filter id="energyDropShadow">
					<feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={COLORS.primary} floodOpacity="0.4" />
				</filter>
			</defs>

			{/* Central glow */}
			<circle cx="300" cy="300" r={200 * burstScale} fill="url(#energyGlow)" />

			{/* Energy core */}
			<circle
				cx="300"
				cy="300"
				r={40 * burstScale}
				fill={COLORS.primary}
				opacity={0.9}
				filter="url(#energyDropShadow)"
			/>
			<circle
				cx="300"
				cy="300"
				r={24 * burstScale}
				fill={COLORS.secondary}
			/>

			{/* Lightning bolts radiating outward */}
			{bolts.map((bolt, i) => {
				const delay = i * 3;
				const boltGrow = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 100 } });
				const rad = (bolt.angle * Math.PI) / 180;
				const cx = 300;
				const cy = 300;
				const endX = cx + Math.cos(rad) * bolt.length * boltGrow;
				const endY = cy + Math.sin(rad) * bolt.length * boltGrow;
				// Zigzag midpoints
				const mid1X = cx + Math.cos(rad) * bolt.length * 0.3 + Math.cos(rad + Math.PI / 2) * 15;
				const mid1Y = cy + Math.sin(rad) * bolt.length * 0.3 + Math.sin(rad + Math.PI / 2) * 15;
				const mid2X = cx + Math.cos(rad) * bolt.length * 0.6 + Math.cos(rad - Math.PI / 2) * 12;
				const mid2Y = cy + Math.sin(rad) * bolt.length * 0.6 + Math.sin(rad - Math.PI / 2) * 12;

				return (
					<path
						key={`bolt-${i}`}
						d={`M ${cx + Math.cos(rad) * 44} ${cy + Math.sin(rad) * 44} L ${mid1X * boltGrow + cx * (1 - boltGrow)} ${mid1Y * boltGrow + cy * (1 - boltGrow)} L ${mid2X * boltGrow + cx * (1 - boltGrow)} ${mid2Y * boltGrow + cy * (1 - boltGrow)} L ${endX} ${endY}`}
						stroke={i % 2 === 0 ? COLORS.primary : COLORS.secondary}
						strokeWidth={4}
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						opacity={boltGrow}
						filter="url(#energyDropShadow)"
					/>
				);
			})}

			{/* Outer spark particles */}
			{[0, 60, 120, 180, 240, 300].map((angle, i) => {
				const sparkDelay = 8 + i * 4;
				const sparkProgress = interpolate(frame, [sparkDelay, sparkDelay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
				const rad = (angle * Math.PI) / 180;
				const dist = 160 + sparkProgress * 40;
				const sparkOp = interpolate(frame, [sparkDelay, sparkDelay + 5, sparkDelay + 12, sparkDelay + 15], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
				return (
					<circle
						key={`spark-${i}`}
						cx={300 + Math.cos(rad) * dist}
						cy={300 + Math.sin(rad) * dist}
						r={5}
						fill={COLORS.accent}
						opacity={sparkOp}
					/>
				);
			})}
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. NumberOneRanking — #1 trophy/podium with metallic sheen
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const NumberOneRanking: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const trophyScale = spring({ frame, fps, config: { damping: 10, stiffness: 60 } });
	const shineX = interpolate(frame, [10, 40], [-100, 500], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
	const badgeGlow = 0.5 + 0.5 * Math.sin(frame * 0.12);

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#FFD700" />
					<stop offset="40%" stopColor="#FFC107" />
					<stop offset="70%" stopColor="#FFB300" />
					<stop offset="100%" stopColor="#FF8F00" />
				</linearGradient>
				<linearGradient id="trophyShine" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor="rgba(255,255,255,0)" />
					<stop offset="45%" stopColor="rgba(255,255,255,0.6)" />
					<stop offset="55%" stopColor="rgba(255,255,255,0.6)" />
					<stop offset="100%" stopColor="rgba(255,255,255,0)" />
				</linearGradient>
				<clipPath id="trophyClip">
					<path d="M220 140 Q200 140 200 170 L200 260 Q200 340 300 380 Q400 340 400 260 L400 170 Q400 140 380 140Z" />
				</clipPath>
				<filter id="trophyShadow">
					<feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.15" />
				</filter>
			</defs>

			<g transform={`translate(300, 280) scale(${trophyScale}) translate(-300, -280)`} filter="url(#trophyShadow)">
				{/* Podium base */}
				<rect x="200" y="400" width="200" height="60" rx="6" fill={COLORS.darkGray} />
				<rect x="230" y="390" width="140" height="20" rx="4" fill={COLORS.mediumGray} />

				{/* Trophy stem */}
				<rect x="275" y="340" width="50" height="55" rx="4" fill="url(#trophyGold)" />

				{/* Trophy cup */}
				<path d="M220 140 Q200 140 200 170 L200 260 Q200 340 300 380 Q400 340 400 260 L400 170 Q400 140 380 140Z" fill="url(#trophyGold)" />

				{/* Handles */}
				<path d="M200 180 Q150 180 150 230 Q150 280 200 280" fill="none" stroke="url(#trophyGold)" strokeWidth="14" strokeLinecap="round" />
				<path d="M400 180 Q450 180 450 230 Q450 280 400 280" fill="none" stroke="url(#trophyGold)" strokeWidth="14" strokeLinecap="round" />

				{/* Metallic shine sweep */}
				<rect x={shineX} y="140" width="40" height="260" fill="url(#trophyShine)" clipPath="url(#trophyClip)" />

				{/* #1 Badge */}
				<circle cx="300" cy="250" r="50" fill={COLORS.primary} opacity={0.7 + 0.3 * badgeGlow} />
				<circle cx="300" cy="250" r="40" fill={COLORS.darkGray} />
				<text
					x="300"
					y="262"
					textAnchor="middle"
					dominantBaseline="central"
					fill={COLORS.primary}
					fontSize="42"
					fontWeight="900"
					fontFamily={FONT}
				>
					#1
				</text>
			</g>

			{/* Star sparkles */}
			{[
				{ x: 140, y: 120, d: 5 },
				{ x: 460, y: 140, d: 10 },
				{ x: 120, y: 300, d: 15 },
				{ x: 480, y: 280, d: 20 },
			].map((s, i) => {
				const sparkle = interpolate(frame, [s.d, s.d + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
				const pulse = 0.5 + 0.5 * Math.sin(frame * 0.2 + i);
				return (
					<g key={`star-${i}`} opacity={sparkle * pulse}>
						<line x1={s.x - 8} y1={s.y} x2={s.x + 8} y2={s.y} stroke={COLORS.accent} strokeWidth="2" />
						<line x1={s.x} y1={s.y - 8} x2={s.x} y2={s.y + 8} stroke={COLORS.accent} strokeWidth="2" />
					</g>
				);
			})}
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. AppDevelopmentStack — Stack of app windows/phone screens
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const AppDevelopmentStack: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const windows = [
		{ x: 120, y: 80, w: 260, h: 180, label: "App.tsx", color: COLORS.primary, delay: 0 },
		{ x: 200, y: 140, w: 240, h: 170, label: "api.ts", color: COLORS.secondary, delay: 5 },
		{ x: 280, y: 200, w: 220, h: 160, label: "index.ts", color: COLORS.accent, delay: 10 },
	];

	// Phone screen on the side
	const phoneReveal = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<filter id="appStackShadow">
					<feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.12" />
				</filter>
			</defs>

			{/* Staggered windows */}
			{windows.map((win, i) => {
				const progress = spring({ frame: Math.max(0, frame - win.delay), fps, config: { damping: 14, stiffness: 90 } });
				const yOffset = (1 - progress) * 60;

				return (
					<g key={`win-${i}`} opacity={progress} transform={`translate(0, ${yOffset})`} filter="url(#appStackShadow)">
						{/* Window frame */}
						<rect x={win.x} y={win.y} width={win.w} height={win.h} rx="8" fill={COLORS.white} stroke={COLORS.darkGray} strokeWidth="2" />
						{/* Title bar */}
						<rect x={win.x} y={win.y} width={win.w} height="28" rx="8" fill={COLORS.darkGray} />
						<rect x={win.x} y={win.y + 14} width={win.w} height="14" fill={COLORS.darkGray} />
						{/* Traffic lights */}
						<circle cx={win.x + 16} cy={win.y + 14} r="4" fill="#FF5F56" />
						<circle cx={win.x + 30} cy={win.y + 14} r="4" fill="#FFBD2E" />
						<circle cx={win.x + 44} cy={win.y + 14} r="4" fill="#27CA40" />
						{/* Filename */}
						<text x={win.x + win.w / 2} y={win.y + 18} textAnchor="middle" fill={COLORS.lightGray} fontSize="11" fontFamily="monospace">{win.label}</text>

						{/* Fake code lines */}
						{[0, 1, 2, 3, 4].map((line) => (
							<rect
								key={`line-${i}-${line}`}
								x={win.x + 16}
								y={win.y + 40 + line * 22}
								width={win.w * (0.3 + ((line * 17 + i * 23) % 50) / 100)}
								height={10}
								rx="3"
								fill={line % 3 === 0 ? win.color : COLORS.silver}
								opacity={0.6}
							/>
						))}
					</g>
				);
			})}

			{/* Phone mockup */}
			<g opacity={phoneReveal} transform={`translate(${(1 - phoneReveal) * 40}, 0)`} filter="url(#appStackShadow)">
				<rect x="400" y="280" width="130" height="230" rx="16" fill={COLORS.white} stroke={COLORS.darkGray} strokeWidth="2.5" />
				<rect x="410" y="300" width="110" height="180" rx="4" fill={COLORS.offWhite} />
				{/* App UI elements */}
				<rect x="420" y="310" width="90" height="14" rx="3" fill={COLORS.primary} opacity="0.7" />
				<rect x="420" y="334" width="60" height="10" rx="3" fill={COLORS.silver} />
				<rect x="420" y="354" width="90" height="50" rx="6" fill={COLORS.primary} opacity="0.15" />
				<rect x="420" y="414" width="70" height="10" rx="3" fill={COLORS.silver} />
				<rect x="420" y="434" width="50" height="10" rx="3" fill={COLORS.silver} opacity="0.6" />
				{/* Home indicator */}
				<rect x="445" y="492" width="40" height="4" rx="2" fill={COLORS.mediumGray} />
			</g>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. TrainedAIBrain — Neural network brain with training arrows
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const TrainedAIBrain: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Neurons that light up progressively
	const neurons = [
		{ cx: 220, cy: 200, r: 10, delay: 0 },
		{ cx: 180, cy: 280, r: 8, delay: 4 },
		{ cx: 260, cy: 320, r: 9, delay: 8 },
		{ cx: 340, cy: 200, r: 10, delay: 12 },
		{ cx: 380, cy: 300, r: 9, delay: 16 },
		{ cx: 300, cy: 260, r: 12, delay: 20 },
		{ cx: 240, cy: 380, r: 8, delay: 24 },
		{ cx: 360, cy: 370, r: 9, delay: 28 },
		{ cx: 300, cy: 160, r: 10, delay: 6 },
		{ cx: 420, cy: 240, r: 7, delay: 22 },
	];

	// Connections between neurons
	const connections = [
		[0, 1], [0, 3], [1, 2], [2, 5], [3, 4], [4, 5], [5, 6], [5, 7], [0, 8], [3, 9], [4, 9], [8, 5], [6, 7],
	];

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<radialGradient id="brainTrainGlow" cx="50%" cy="50%">
					<stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.25" />
					<stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
				</radialGradient>
				<filter id="brainShadow">
					<feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000" floodOpacity="0.12" />
				</filter>
				<marker id="trainArrowHead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
					<path d="M0,0 L8,3 L0,6" fill={COLORS.primary} />
				</marker>
			</defs>

			{/* Brain glow background */}
			<circle cx="300" cy="280" r="180" fill="url(#brainTrainGlow)" />

			{/* Brain outline */}
			<path
				d="M300 100 C220 100 150 170 150 260 C150 310 170 350 200 370 C190 395 190 420 210 440 C230 460 260 460 280 450 C290 475 320 480 340 470 C360 480 390 470 405 445 C425 455 450 440 460 415 C475 395 470 365 455 345 C475 320 480 280 470 250 C455 170 385 100 300 100Z"
				fill="none"
				stroke={COLORS.darkGray}
				strokeWidth="3"
				filter="url(#brainShadow)"
			/>

			{/* Neural connections */}
			{connections.map(([from, to], i) => {
				const n1 = neurons[from];
				const n2 = neurons[to];
				const maxDelay = Math.max(n1.delay, n2.delay);
				const pathGlow = interpolate(frame, [maxDelay, maxDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
				return (
					<line
						key={`conn-${i}`}
						x1={n1.cx}
						y1={n1.cy}
						x2={n2.cx}
						y2={n2.cy}
						stroke={COLORS.primary}
						strokeWidth="1.5"
						opacity={pathGlow * 0.5}
					/>
				);
			})}

			{/* Neurons lighting up */}
			{neurons.map((n, i) => {
				const lit = interpolate(frame, [n.delay, n.delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
				return (
					<React.Fragment key={`neuron-${i}`}>
						<circle cx={n.cx} cy={n.cy} r={n.r + 4} fill={COLORS.primary} opacity={lit * 0.3} />
						<circle cx={n.cx} cy={n.cy} r={n.r} fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="2" opacity={0.3 + lit * 0.7} />
						<circle cx={n.cx} cy={n.cy} r={n.r * 0.5} fill={COLORS.primary} opacity={lit * 0.9} />
					</React.Fragment>
				);
			})}

			{/* Training arrows flowing in from left */}
			{[0, 1, 2].map((i) => {
				const arrowDelay = i * 6;
				const arrowOp = interpolate(frame, [arrowDelay, arrowDelay + 8, arrowDelay + 18, arrowDelay + 22], [0, 0.8, 0.8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
				const arrowX = interpolate(frame, [arrowDelay, arrowDelay + 18], [30, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
				const yPos = 220 + i * 60;
				return (
					<g key={`arrow-${i}`} opacity={arrowOp}>
						<line x1={arrowX} y1={yPos} x2={arrowX + 70} y2={yPos} stroke={COLORS.primary} strokeWidth="3" markerEnd="url(#trainArrowHead)" />
						<rect x={arrowX - 20} y={yPos - 10} width="24" height="20" rx="3" fill={COLORS.offWhite} stroke={COLORS.primary} strokeWidth="1.5" />
					</g>
				);
			})}
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. ThumbnailMockup — YouTube thumbnail frame with face silhouette
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ThumbnailMockup: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const frameScale = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
	const faceFill = interpolate(frame, [12, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<filter id="thumbShadow">
					<feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.18" />
				</filter>
				<linearGradient id="thumbBg" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor={COLORS.darkGray} />
					<stop offset="100%" stopColor={COLORS.mediumGray} />
				</linearGradient>
				<clipPath id="thumbFrameClip">
					<rect x="115" y="145" width="370" height="210" rx="8" />
				</clipPath>
			</defs>

			<g transform={`translate(300, 280) scale(${frameScale}) translate(-300, -280)`}>
				{/* Thumbnail frame (16:9-ish) */}
				<rect x="110" y="140" width="380" height="220" rx="12" fill="url(#thumbBg)" filter="url(#thumbShadow)" />

				{/* YouTube play button hint */}
				<rect x="115" y="145" width="370" height="210" rx="8" fill={COLORS.darkGray} />

				{/* Text placeholder bars */}
				<rect x="300" y="200" width="150" height="18" rx="4" fill={COLORS.primary} opacity="0.8" />
				<rect x="310" y="228" width="120" height="12" rx="3" fill={COLORS.silver} opacity="0.5" />
				<rect x="310" y="248" width="100" height="12" rx="3" fill={COLORS.silver} opacity="0.3" />

				{/* Face silhouette area */}
				<g opacity={faceFill}>
					{/* Head */}
					<circle cx="210" cy="220" r="35" fill={COLORS.mediumGray} stroke={COLORS.primary} strokeWidth="2" />
					{/* Shoulders */}
					<path d="M160 290 Q160 260 210 260 Q260 260 260 290 L260 320 L160 320Z" fill={COLORS.mediumGray} stroke={COLORS.primary} strokeWidth="2" />
					{/* Face features hint */}
					<circle cx="200" cy="214" r="4" fill={COLORS.gray} />
					<circle cx="220" cy="214" r="4" fill={COLORS.gray} />
					<path d="M203 230 Q210 238 217 230" fill="none" stroke={COLORS.gray} strokeWidth="2" strokeLinecap="round" />
				</g>

				{/* Duration badge */}
				<rect x="420" y="320" width="50" height="22" rx="4" fill="rgba(0,0,0,0.75)" />
				<text x="445" y="335" textAnchor="middle" fill={COLORS.white} fontSize="12" fontWeight="700" fontFamily="monospace">12:34</text>

				{/* YouTube-style red play button in center */}
				<circle cx="300" cy="250" r="24" fill="rgba(255,0,0,0.85)" opacity={0.6 + 0.2 * Math.sin(frame * 0.1)} />
				<polygon points="292,238 292,262 314,250" fill={COLORS.white} />
			</g>

			{/* Decorative corners */}
			{[
				{ x: 100, y: 130 },
				{ x: 500, y: 130 },
				{ x: 100, y: 370 },
				{ x: 500, y: 370 },
			].map((c, i) => (
				<circle key={`corner-${i}`} cx={c.x} cy={c.y} r="4" fill={COLORS.primary} opacity={frameScale * 0.6} />
			))}
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. DocumentPageDesign — Professional educational document with sections/charts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DocumentPageDesign: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();

	// Content fills in top-to-bottom
	const headerReveal = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
	const section1Reveal = interpolate(frame, [8, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
	const chartReveal = interpolate(frame, [16, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
	const section2Reveal = interpolate(frame, [24, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<filter id="docShadow">
					<feDropShadow dx="2" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.12" />
				</filter>
			</defs>

			{/* Document page */}
			<rect x="130" y="50" width="340" height="500" rx="6" fill={COLORS.white} stroke={COLORS.darkGray} strokeWidth="2" filter="url(#docShadow)" />

			{/* Header bar */}
			<g opacity={headerReveal}>
				<rect x="150" y="70" width="300" height="40" rx="4" fill={COLORS.primary} />
				<rect x="165" y="80" width="140" height="8" rx="2" fill={COLORS.white} opacity="0.9" />
				<rect x="165" y="95" width="90" height="6" rx="2" fill={COLORS.white} opacity="0.5" />
			</g>

			{/* Section 1 — text block */}
			<g opacity={section1Reveal}>
				<rect x="150" y="130" width="120" height="10" rx="2" fill={COLORS.darkGray} />
				<rect x="150" y="150" width="300" height="6" rx="2" fill={COLORS.silver} />
				<rect x="150" y="164" width="280" height="6" rx="2" fill={COLORS.silver} />
				<rect x="150" y="178" width="260" height="6" rx="2" fill={COLORS.silver} />
				<rect x="150" y="192" width="200" height="6" rx="2" fill={COLORS.silver} opacity="0.6" />
			</g>

			{/* Mini bar chart */}
			<g opacity={chartReveal}>
				<rect x="150" y="220" width="80" height="10" rx="2" fill={COLORS.darkGray} />
				{[0, 1, 2, 3, 4].map((i) => {
					const barHeight = [60, 90, 45, 75, 100][i] * chartReveal;
					return (
						<rect
							key={`bar-${i}`}
							x={170 + i * 50}
							y={350 - barHeight}
							width="30"
							height={barHeight}
							rx="3"
							fill={i === 4 ? COLORS.primary : COLORS.silver}
							opacity={i === 4 ? 0.9 : 0.5}
						/>
					);
				})}
				{/* Axis line */}
				<line x1="160" y1="350" x2="440" y2="350" stroke={COLORS.silver} strokeWidth="1" />
			</g>

			{/* Section 2 — bullet points */}
			<g opacity={section2Reveal}>
				<rect x="150" y="370" width="100" height="10" rx="2" fill={COLORS.darkGray} />
				{[0, 1, 2].map((i) => (
					<React.Fragment key={`bullet-${i}`}>
						<circle cx="162" cy={400 + i * 24} r="4" fill={COLORS.primary} />
						<rect x="175" y={395 + i * 24} width={200 - i * 30} height="6" rx="2" fill={COLORS.silver} />
					</React.Fragment>
				))}
			</g>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. PlatformLogoGrid — 6 platform logos in a circle (real images via foreignObject)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const PlatformLogoGrid: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const platforms = [
		{ file: "logos/youtube.svg", angle: -90 },
		{ file: "logos/instagram.svg", angle: -30 },
		{ file: "logos/tiktok.svg", angle: 30 },
		{ file: "logos/linkedin.svg", angle: 90 },
		{ file: "logos/threads.svg", angle: 150 },
		{ file: "logos/x.svg", angle: 210 },
	];

	const radius = 160;

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<filter id="logoShadow">
					<feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
				</filter>
			</defs>

			{/* Central connecting circle */}
			<circle cx="300" cy="300" r="60" fill={COLORS.offWhite} stroke={COLORS.primary} strokeWidth="2" opacity={interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
			<circle cx="300" cy="300" r="8" fill={COLORS.primary} opacity={interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />

			{/* Connector lines */}
			{platforms.map((p, i) => {
				const lineOp = interpolate(frame, [4 + i * 3, 10 + i * 3], [0, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
				const rad = (p.angle * Math.PI) / 180;
				return (
					<line
						key={`line-${i}`}
						x1="300"
						y1="300"
						x2={300 + Math.cos(rad) * radius}
						y2={300 + Math.sin(rad) * radius}
						stroke={COLORS.primary}
						strokeWidth="1.5"
						opacity={lineOp}
						strokeDasharray="4 4"
					/>
				);
			})}

			{/* Platform logos */}
			{platforms.map((p, i) => {
				const logoSpring = spring({ frame: Math.max(0, frame - i * 4), fps, config: { damping: 12, stiffness: 80 } });
				const rad = (p.angle * Math.PI) / 180;
				const cx = 300 + Math.cos(rad) * radius;
				const cy = 300 + Math.sin(rad) * radius;
				const logoSize = 48;

				return (
					<g key={`logo-${i}`} opacity={logoSpring}>
						{/* Background circle */}
						<circle cx={cx} cy={cy} r={32} fill={COLORS.white} stroke={COLORS.silver} strokeWidth="1.5" filter="url(#logoShadow)" />
						{/* Logo via foreignObject + Img */}
						<foreignObject
							x={cx - logoSize * 0.3}
							y={cy - logoSize * 0.3}
							width={logoSize * 0.6}
							height={logoSize * 0.6}
						>
							<Img
								src={staticFile(p.file)}
								style={{
									width: logoSize * 0.6,
									height: logoSize * 0.6,
									objectFit: "contain",
								}}
							/>
						</foreignObject>
					</g>
				);
			})}
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. AIAgentAvatar — Stylized robot/agent figure managing multiple screens
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const AIAgentAvatar: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const agentPulse = 0.95 + 0.05 * Math.sin(frame * 0.12);
	const agentReveal = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });

	// Orbiting screens
	const screens = [
		{ angle: 0, dist: 150, w: 60, h: 42, delay: 8 },
		{ angle: 72, dist: 140, w: 55, h: 38, delay: 12 },
		{ angle: 144, dist: 155, w: 58, h: 40, delay: 16 },
		{ angle: 216, dist: 145, w: 52, h: 36, delay: 20 },
		{ angle: 288, dist: 150, w: 56, h: 40, delay: 24 },
	];

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<radialGradient id="agentGlow" cx="50%" cy="45%">
					<stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.2" />
					<stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
				</radialGradient>
				<filter id="agentShadow">
					<feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000" floodOpacity="0.15" />
				</filter>
			</defs>

			{/* Glow background */}
			<circle cx="300" cy="280" r="200" fill="url(#agentGlow)" />

			{/* Agent body */}
			<g opacity={agentReveal} transform={`translate(300, 280) scale(${agentPulse}) translate(-300, -280)`} filter="url(#agentShadow)">
				{/* Body */}
				<rect x="260" y="260" width="80" height="100" rx="12" fill={COLORS.darkGray} />
				<rect x="268" y="268" width="64" height="30" rx="6" fill={COLORS.mediumGray} />

				{/* Head */}
				<rect x="250" y="190" width="100" height="80" rx="16" fill={COLORS.darkGray} stroke={COLORS.primary} strokeWidth="2" />

				{/* Eyes */}
				<circle cx="280" cy="225" r="10" fill={COLORS.primary} opacity={0.7 + 0.3 * Math.sin(frame * 0.15)} />
				<circle cx="320" cy="225" r="10" fill={COLORS.primary} opacity={0.7 + 0.3 * Math.sin(frame * 0.15 + 1)} />
				<circle cx="280" cy="225" r="4" fill={COLORS.white} />
				<circle cx="320" cy="225" r="4" fill={COLORS.white} />

				{/* Antenna */}
				<line x1="300" y1="190" x2="300" y2="170" stroke={COLORS.mediumGray} strokeWidth="3" />
				<circle cx="300" cy="165" r="6" fill={COLORS.primary} opacity={0.5 + 0.5 * Math.sin(frame * 0.2)} />

				{/* Arms */}
				<rect x="230" y="275" width="30" height="8" rx="4" fill={COLORS.mediumGray} />
				<rect x="340" y="275" width="30" height="8" rx="4" fill={COLORS.mediumGray} />
			</g>

			{/* Orbiting screens */}
			{screens.map((scr, i) => {
				const screenSpring = spring({ frame: Math.max(0, frame - scr.delay), fps, config: { damping: 14, stiffness: 80 } });
				const orbitAngle = scr.angle + frame * 0.5;
				const rad = (orbitAngle * Math.PI) / 180;
				const cx = 300 + Math.cos(rad) * scr.dist;
				const cy = 280 + Math.sin(rad) * scr.dist * 0.55;

				return (
					<g key={`screen-${i}`} opacity={screenSpring}>
						<rect
							x={cx - scr.w / 2}
							y={cy - scr.h / 2}
							width={scr.w}
							height={scr.h}
							rx="4"
							fill={COLORS.white}
							stroke={COLORS.darkGray}
							strokeWidth="1.5"
						/>
						{/* Screen content lines */}
						<rect x={cx - scr.w / 2 + 6} y={cy - scr.h / 2 + 6} width={scr.w * 0.6} height="4" rx="1" fill={COLORS.primary} opacity="0.5" />
						<rect x={cx - scr.w / 2 + 6} y={cy - scr.h / 2 + 14} width={scr.w * 0.4} height="3" rx="1" fill={COLORS.silver} />
						<rect x={cx - scr.w / 2 + 6} y={cy - scr.h / 2 + 21} width={scr.w * 0.5} height="3" rx="1" fill={COLORS.silver} opacity="0.6" />
					</g>
				);
			})}
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. BeautifulThumbnailShowcase — Premium thumbnail preview on an easel
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const BeautifulThumbnailShowcase: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();

	// Canvas wipe reveal left to right
	const wipeProgress = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<filter id="easelShadow">
					<feDropShadow dx="2" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.15" />
				</filter>
				<clipPath id="canvasClip">
					<rect x="155" y="105" width={290 * wipeProgress} height="200" />
				</clipPath>
				<linearGradient id="canvasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor={COLORS.darkGray} />
					<stop offset="100%" stopColor={COLORS.mediumGray} />
				</linearGradient>
			</defs>

			{/* Easel legs */}
			<line x1="200" y1="310" x2="160" y2="500" stroke={COLORS.mediumGray} strokeWidth="6" strokeLinecap="round" />
			<line x1="400" y1="310" x2="440" y2="500" stroke={COLORS.mediumGray} strokeWidth="6" strokeLinecap="round" />
			<line x1="300" y1="310" x2="300" y2="520" stroke={COLORS.mediumGray} strokeWidth="6" strokeLinecap="round" />

			{/* Easel shelf */}
			<rect x="170" y="300" width="260" height="12" rx="3" fill={COLORS.darkGray} />

			{/* Canvas frame */}
			<rect x="150" y="100" width="300" height="210" rx="4" fill={COLORS.offWhite} stroke={COLORS.darkGray} strokeWidth="3" filter="url(#easelShadow)" />

			{/* Canvas content (revealed with wipe) */}
			<g clipPath="url(#canvasClip)">
				{/* Background */}
				<rect x="155" y="105" width="290" height="200" fill="url(#canvasGrad)" />

				{/* Thumbnail content — face + text layout */}
				<circle cx="230" cy="190" r="40" fill={COLORS.mediumGray} />
				<circle cx="230" cy="178" r="16" fill={COLORS.gray} />
				<path d="M205 215 Q205 195 230 195 Q255 195 255 215" fill={COLORS.gray} />

				{/* Text area */}
				<rect x="290" y="150" width="130" height="14" rx="3" fill={COLORS.primary} opacity="0.9" />
				<rect x="290" y="175" width="100" height="10" rx="2" fill={COLORS.silver} opacity="0.7" />
				<rect x="290" y="195" width="80" height="10" rx="2" fill={COLORS.silver} opacity="0.5" />

				{/* Sparkle overlay */}
				<circle cx="410" cy="130" r="4" fill={COLORS.accent} opacity={0.5 + 0.5 * Math.sin(frame * 0.15)} />
				<circle cx="180" cy="130" r="3" fill={COLORS.accent} opacity={0.5 + 0.5 * Math.sin(frame * 0.15 + 2)} />
			</g>

			{/* Premium sparkle indicators */}
			{[
				{ x: 130, y: 90, d: 20 },
				{ x: 470, y: 110, d: 25 },
				{ x: 140, y: 320, d: 30 },
			].map((sp, i) => {
				const sparkOp = interpolate(frame, [sp.d, sp.d + 6, sp.d + 14, sp.d + 18], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
				return (
					<g key={`sparkle-${i}`} opacity={sparkOp}>
						<line x1={sp.x - 6} y1={sp.y} x2={sp.x + 6} y2={sp.y} stroke={COLORS.accent} strokeWidth="2" />
						<line x1={sp.x} y1={sp.y - 6} x2={sp.x} y2={sp.y + 6} stroke={COLORS.accent} strokeWidth="2" />
					</g>
				);
			})}
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. IncredibleCarouselStack — Instagram-style carousel with slide dots and sparkles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const IncredibleCarouselStack: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const stackReveal = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });

	// 3 stacked cards
	const cards = [
		{ offsetX: 16, offsetY: 16, opacity: 0.5 },
		{ offsetX: 8, offsetY: 8, opacity: 0.75 },
		{ offsetX: 0, offsetY: 0, opacity: 1 },
	];

	// Sparkle positions
	const sparkles = [
		{ x: 140, y: 120, delay: 10 },
		{ x: 460, y: 150, delay: 14 },
		{ x: 130, y: 380, delay: 18 },
		{ x: 470, y: 350, delay: 22 },
		{ x: 180, y: 90, delay: 26 },
		{ x: 430, y: 420, delay: 30 },
		{ x: 300, y: 80, delay: 16 },
		{ x: 500, y: 250, delay: 20 },
	];

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<filter id="carouselShadow">
					<feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.15" />
				</filter>
			</defs>

			{/* Stacked cards */}
			{cards.map((card, i) => (
				<g key={`card-${i}`} opacity={card.opacity * stackReveal} filter={i === 2 ? "url(#carouselShadow)" : undefined}>
					<rect
						x={175 + card.offsetX}
						y={100 + card.offsetY}
						width="250"
						height="320"
						rx="16"
						fill={COLORS.white}
						stroke={COLORS.darkGray}
						strokeWidth={i === 2 ? 2.5 : 1.5}
					/>
					{i === 2 && (
						<>
							{/* Front card content */}
							<rect x="195" y="125" width="210" height="140" rx="8" fill={COLORS.offWhite} />
							{/* Image placeholder */}
							<path d="M220 230 L270 190 L310 220 L340 180 L390 240 L200 240Z" fill={COLORS.primary} opacity="0.3" />
							<circle cx="240" cy="170" r="15" fill={COLORS.primary} opacity="0.25" />

							{/* Title */}
							<rect x="195" y="280" width="170" height="12" rx="3" fill={COLORS.darkGray} />
							{/* Subtitle lines */}
							<rect x="195" y="302" width="200" height="8" rx="2" fill={COLORS.silver} />
							<rect x="195" y="318" width="160" height="8" rx="2" fill={COLORS.silver} opacity="0.6" />

							{/* Brand accent bar */}
							<rect x="195" y="340" width="40" height="4" rx="2" fill={COLORS.primary} />
						</>
					)}
				</g>
			))}

			{/* Instagram-style dots */}
			<g>
				{[0, 1, 2, 3, 4].map((i) => (
					<circle
						key={`dot-${i}`}
						cx={270 + i * 16}
						cy="445"
						r={i === 0 ? 5 : 3.5}
						fill={i === 0 ? COLORS.primary : COLORS.silver}
						opacity={stackReveal}
					/>
				))}
			</g>

			{/* Sparkle effects */}
			{sparkles.map((sp, i) => {
				const sparkleSpring = spring({ frame: Math.max(0, frame - sp.delay), fps, config: { damping: 16, stiffness: 120 } });
				const pulse = 0.4 + 0.6 * Math.sin(frame * 0.18 + i * 1.3);
				return (
					<g key={`sparkle-${i}`} opacity={sparkleSpring * pulse}>
						{/* 4-point star */}
						<path
							d={`M${sp.x} ${sp.y - 8} L${sp.x + 2.5} ${sp.y - 2.5} L${sp.x + 8} ${sp.y} L${sp.x + 2.5} ${sp.y + 2.5} L${sp.x} ${sp.y + 8} L${sp.x - 2.5} ${sp.y + 2.5} L${sp.x - 8} ${sp.y} L${sp.x - 2.5} ${sp.y - 2.5}Z`}
							fill={COLORS.accent}
						/>
					</g>
				);
			})}
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. SystemSetupFlowchart — Vertical 3-step flow: Setup -> Train -> Deploy
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SystemSetupFlowchart: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const steps = [
		{ label: "SETUP", icon: "gear", y: 100, delay: 0 },
		{ label: "TRAIN", icon: "brain", y: 260, delay: 8 },
		{ label: "DEPLOY", icon: "rocket", y: 420, delay: 16 },
	];

	// Arrow draw progress between steps
	const arrow1Draw = interpolate(frame, [6, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
	const arrow2Draw = interpolate(frame, [14, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<filter id="flowShadow">
					<feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000" floodOpacity="0.12" />
				</filter>
				<marker id="flowArrowHead" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto">
					<path d="M0,0 L10,4 L0,8" fill={COLORS.primary} />
				</marker>
			</defs>

			{/* Steps */}
			{steps.map((step, i) => {
				const stepSpring = spring({ frame: Math.max(0, frame - step.delay), fps, config: { damping: 12, stiffness: 80 } });

				return (
					<g key={`step-${i}`} opacity={stepSpring} transform={`translate(300, ${step.y + 50}) scale(${stepSpring}) translate(-300, ${-(step.y + 50)})`}>
						{/* Step box */}
						<rect
							x="180"
							y={step.y}
							width="240"
							height="100"
							rx="14"
							fill={COLORS.white}
							stroke={COLORS.darkGray}
							strokeWidth="2.5"
							filter="url(#flowShadow)"
						/>

						{/* Step number badge */}
						<circle cx="195" cy={step.y + 15} r="14" fill={COLORS.primary} />
						<text x="195" y={step.y + 20} textAnchor="middle" fill={COLORS.white} fontSize="14" fontWeight="800" fontFamily={FONT}>{i + 1}</text>

						{/* Step label */}
						<text x="300" y={step.y + 42} textAnchor="middle" fill={COLORS.darkGray} fontSize="22" fontWeight="800" fontFamily={FONT} letterSpacing="3">{step.label}</text>

						{/* Icon area */}
						{step.icon === "gear" && (
							<g transform={`translate(300, ${step.y + 72})`}>
								<circle cx="0" cy="0" r="14" fill="none" stroke={COLORS.primary} strokeWidth="2.5" />
								<circle cx="0" cy="0" r="5" fill={COLORS.primary} />
								{[0, 60, 120, 180, 240, 300].map((a, gi) => {
									const rr = (a * Math.PI) / 180;
									return <rect key={gi} x={Math.cos(rr) * 14 - 3} y={Math.sin(rr) * 14 - 3} width="6" height="6" rx="1" fill={COLORS.primary} />;
								})}
							</g>
						)}
						{step.icon === "brain" && (
							<g transform={`translate(300, ${step.y + 72})`}>
								<path d="M0 -14 C-10 -14 -16 -8 -16 0 C-16 6 -12 12 -6 14 C-2 16 2 16 6 14 C12 12 16 6 16 0 C16 -8 10 -14 0 -14Z" fill="none" stroke={COLORS.primary} strokeWidth="2.5" />
								<path d="M0 -12 C0 -4 1 4 0 12" fill="none" stroke={COLORS.primaryLight} strokeWidth="1.5" />
								<circle cx="-6" cy="-2" r="2" fill={COLORS.primary} />
								<circle cx="6" cy="2" r="2" fill={COLORS.primary} />
							</g>
						)}
						{step.icon === "rocket" && (
							<g transform={`translate(300, ${step.y + 72})`}>
								<path d="M0 -14 C-4 -10 -8 -2 -8 6 L8 6 C8 -2 4 -10 0 -14Z" fill={COLORS.primary} />
								<path d="M-8 6 L-14 14 L-8 10Z" fill={COLORS.secondary} />
								<path d="M8 6 L14 14 L8 10Z" fill={COLORS.secondary} />
								<path d="M-4 6 L0 16 L4 6Z" fill={COLORS.accent} />
							</g>
						)}
					</g>
				);
			})}

			{/* Connecting arrows */}
			{/* Arrow 1: Setup -> Train */}
			<line
				x1="300"
				y1="200"
				x2="300"
				y2={200 + 60 * arrow1Draw}
				stroke={COLORS.primary}
				strokeWidth="3"
				strokeDasharray="6 4"
				markerEnd={arrow1Draw > 0.9 ? "url(#flowArrowHead)" : undefined}
				opacity={arrow1Draw}
			/>

			{/* Arrow 2: Train -> Deploy */}
			<line
				x1="300"
				y1="360"
				x2="300"
				y2={360 + 60 * arrow2Draw}
				stroke={COLORS.primary}
				strokeWidth="3"
				strokeDasharray="6 4"
				markerEnd={arrow2Draw > 0.9 ? "url(#flowArrowHead)" : undefined}
				opacity={arrow2Draw}
			/>
		</svg>
	);
};
