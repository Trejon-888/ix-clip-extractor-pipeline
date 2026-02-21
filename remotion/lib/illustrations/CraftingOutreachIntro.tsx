import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";

/**
 * Crafting Outreach Campaign — Intro Section Illustrations (0:00–4:00)
 *
 * 14 unique motion-graphic components, each with a DISTINCT visual design.
 * Every component passes the "mute test" — concept is clear without caption.
 * Design: Clean SVG vectors, white bg, Apple aesthetic, animated with spring/interpolate.
 */

const ORANGE = "#FF6B00";
const BLACK = "#1A1A1A";
const GRAY = "#666666";
const LIGHT_GRAY = "#E5E7EB";
const GREEN = "#10B981";
const FONT = "system-ui, -apple-system, sans-serif";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. LaunchCountdown — Rocket on launch pad with countdown timer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const LaunchCountdown: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();

	// --- Timing phases ---
	// Countdown: 3 (f0-12), 2 (f12-24), 1 (f24-36), ignition (f36+), liftoff (f44+)
	const countdownNums = [
		{ label: "3", start: 0, end: 12 },
		{ label: "2", start: 12, end: 24 },
		{ label: "1", start: 24, end: 36 },
	];

	// Rocket vertical rise after liftoff (frame 44+)
	const rocketY = interpolate(frame, [0, 43, 44, 90], [0, 0, 0, -220], {
		extrapolateRight: "clamp",
	});

	// Flame intensity ramps up at ignition
	const flameIntensity = interpolate(frame, [34, 40, 50, 90], [0, 0.5, 1, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	// Rocket body entrance scale
	const rocketReveal = interpolate(frame, [0, 8], [0, 1], {
		extrapolateRight: "clamp",
	});

	// --- Smoke particles ---
	const smokeParticles = Array.from({ length: 14 }, (_, i) => ({
		x: 300 + (i % 2 === 0 ? -1 : 1) * ((i * 17 + 5) % 80),
		delay: 38 + i * 2,
		dx: (i % 2 === 0 ? -1 : 1) * (12 + (i * 7) % 30),
		size: 10 + (i * 3) % 18,
		phase: i * 0.9,
	}));

	// --- Stars / sparkles ---
	const stars = [
		{ cx: 80, cy: 60, r: 2.5, delay: 10 },
		{ cx: 520, cy: 90, r: 2, delay: 14 },
		{ cx: 140, cy: 140, r: 1.8, delay: 18 },
		{ cx: 460, cy: 50, r: 2.2, delay: 22 },
		{ cx: 50, cy: 200, r: 1.5, delay: 26 },
		{ cx: 540, cy: 220, r: 2, delay: 30 },
		{ cx: 180, cy: 30, r: 1.6, delay: 8 },
		{ cx: 420, cy: 160, r: 1.4, delay: 20 },
		{ cx: 300, cy: 20, r: 2.4, delay: 16 },
		{ cx: 560, cy: 300, r: 1.8, delay: 34 },
	];

	// --- Thrust flame shapes ---
	const thrustFlames = [
		{ dx: 0, length: 100, width: 28, color: "#FFFFFF", opacity: 0.95 },
		{ dx: 0, length: 130, width: 36, color: "#FFD700", opacity: 0.85 },
		{ dx: 0, length: 160, width: 44, color: ORANGE, opacity: 0.75 },
		{ dx: 0, length: 180, width: 52, color: "#FF4500", opacity: 0.5 },
	];

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				{/* Radial glow behind rocket thrust */}
				<radialGradient id="thrustGlow" cx="50%" cy="0%" r="70%">
					<stop offset="0%" stopColor={ORANGE} stopOpacity={0.6 * flameIntensity} />
					<stop offset="60%" stopColor={ORANGE} stopOpacity={0.15 * flameIntensity} />
					<stop offset="100%" stopColor={ORANGE} stopOpacity={0} />
				</radialGradient>
				{/* Rocket body gradient — sleek dark metallic */}
				<linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor="#3A3A3A" />
					<stop offset="35%" stopColor="#555555" />
					<stop offset="65%" stopColor="#4A4A4A" />
					<stop offset="100%" stopColor="#2E2E2E" />
				</linearGradient>
				{/* Nose cone gradient */}
				<linearGradient id="noseCone" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor={ORANGE} />
					<stop offset="100%" stopColor="#CC5500" />
				</linearGradient>
			</defs>

			{/* Background stars that twinkle in */}
			{stars.map((s, i) => {
				const twinkle = interpolate(frame, [s.delay, s.delay + 6], [0, 1], {
					extrapolateLeft: "clamp",
					extrapolateRight: "clamp",
				});
				const pulse = 0.6 + 0.4 * Math.sin(frame * 0.15 + i * 1.2);
				return (
					<circle
						key={`star-${i}`}
						cx={s.cx}
						cy={s.cy}
						r={s.r}
						fill="#FFFFFF"
						opacity={twinkle * pulse}
					/>
				);
			})}

			{/* Countdown numbers — large, bold, centered */}
			{countdownNums.map((c) => {
				if (frame < c.start || frame >= c.end) return null;
				const localF = frame - c.start;
				const scale = interpolate(localF, [0, 3, 8, 12], [2.5, 1, 1, 0.6], {
					extrapolateRight: "clamp",
				});
				const opacity = interpolate(localF, [0, 2, 8, 12], [0, 0.9, 0.9, 0], {
					extrapolateRight: "clamp",
				});
				return (
					<text
						key={c.label}
						x="300"
						y="200"
						textAnchor="middle"
						dominantBaseline="central"
						fontSize={160}
						fontWeight="900"
						fill={ORANGE}
						fontFamily={FONT}
						opacity={opacity}
						transform={`translate(0, 0) scale(${scale})`}
						style={{ transformOrigin: "300px 180px" }}
					>
						{c.label}
					</text>
				);
			})}

			{/* Thrust glow (large radial under rocket) */}
			<ellipse
				cx={300}
				cy={460 + rocketY + 80}
				rx={80 * flameIntensity}
				ry={120 * flameIntensity}
				fill="url(#thrustGlow)"
			/>

			{/* === ROCKET GROUP (translates upward on liftoff) === */}
			<g transform={`translate(300, ${340 + rocketY})`} opacity={rocketReveal}>
				{/* Thrust flames (behind rocket) */}
				{thrustFlames.map((fl, i) => {
					const flicker = 0.85 + 0.15 * Math.sin(frame * 0.8 + i * 2.1);
					const lenScale = flameIntensity * flicker;
					const wScale = flameIntensity * (0.9 + 0.1 * Math.sin(frame * 0.6 + i));
					return (
						<ellipse
							key={`flame-${i}`}
							cx={fl.dx}
							cy={95 + (fl.length * lenScale) / 2}
							rx={(fl.width / 2) * wScale}
							ry={(fl.length / 2) * lenScale}
							fill={fl.color}
							opacity={fl.opacity * flameIntensity}
						/>
					);
				})}

				{/* Rocket fins — swept-back, premium shape */}
				<path
					d="M -26 50 L -52 100 Q -50 90 -26 75 Z"
					fill={ORANGE}
					opacity={0.9}
				/>
				<path
					d="M 26 50 L 52 100 Q 50 90 26 75 Z"
					fill={ORANGE}
					opacity={0.9}
				/>

				{/* Rocket body — tall, sleek cylinder */}
				<rect
					x="-26"
					y="-60"
					width="52"
					height="150"
					rx="4"
					fill="url(#rocketBody)"
				/>

				{/* Body accent stripe */}
				<rect x="-26" y="30" width="52" height="6" fill={ORANGE} opacity={0.8} />
				<rect x="-26" y="60" width="52" height="4" fill={ORANGE} opacity={0.5} />

				{/* Nose cone — large, pointed */}
				<path
					d="M 0 -130 C -6 -115 -18 -85 -26 -60 L 26 -60 C 18 -85 6 -115 0 -130 Z"
					fill="url(#noseCone)"
				/>

				{/* Window porthole */}
				<circle cx="0" cy="-20" r="12" fill="#1A1A1A" />
				<circle cx="0" cy="-20" r="9" fill="#0D2A4A" />
				<circle cx="0" cy="-20" r="9" fill="rgba(100,180,255,0.15)" />
				<circle cx="-3" cy="-23" r="3" fill="rgba(255,255,255,0.5)" />

				{/* Nozzle bell */}
				<path
					d="M -16 90 Q -20 105 -22 110 L 22 110 Q 20 105 16 90 Z"
					fill="#2A2A2A"
				/>
				<path
					d="M -14 90 Q -16 100 -18 108 L 18 108 Q 16 100 14 90 Z"
					fill="#444444"
				/>
			</g>

			{/* Smoke cloud particles dispersing from base */}
			{smokeParticles.map((p, i) => {
				if (frame < p.delay) return null;
				const age = frame - p.delay;
				const driftX = interpolate(age, [0, 40], [0, p.dx * 2.5], {
					extrapolateRight: "clamp",
				});
				const driftY = interpolate(age, [0, 40], [0, 30 + (i % 3) * 10], {
					extrapolateRight: "clamp",
				});
				const expand = interpolate(age, [0, 30], [p.size * 0.5, p.size * 2.5], {
					extrapolateRight: "clamp",
				});
				const smokeOp = interpolate(age, [0, 5, 25, 40], [0, 0.35, 0.15, 0], {
					extrapolateRight: "clamp",
				});
				return (
					<ellipse
						key={`smoke-${i}`}
						cx={p.x + driftX}
						cy={460 + rocketY + driftY}
						rx={expand}
						ry={expand * 0.6}
						fill={i % 3 === 0 ? "#D4D4D4" : i % 3 === 1 ? "#E8E8E8" : "#C0C0C0"}
						opacity={smokeOp}
					/>
				);
			})}

			{/* Launch pad — solid base structure */}
			<rect
				x="200"
				y="480"
				width="200"
				height="16"
				rx="3"
				fill="#555555"
				opacity={rocketReveal}
			/>
			<rect
				x="220"
				y="496"
				width="160"
				height="8"
				rx="2"
				fill="#3A3A3A"
				opacity={rocketReveal}
			/>
			{/* Tower struts */}
			<line x1="218" y1="480" x2="218" y2="300" stroke="#999999" strokeWidth="3" opacity={rocketReveal * 0.5} />
			<line x1="382" y1="480" x2="382" y2="300" stroke="#999999" strokeWidth="3" opacity={rocketReveal * 0.5} />
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. SalesCampaignBlueprint — IX System Launch dashboard visualization
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SalesCampaignBlueprint: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const IX_ORANGE = "#FF7614";

	// Phase 1: Dashboard slides in (0-10)
	const dashSlide = spring({
		frame,
		fps,
		from: 30,
		to: 0,
		config: { damping: 14, stiffness: 80 },
	});
	const dashOp = interpolate(frame, [0, 8], [0, 1], {
		extrapolateRight: "clamp",
	});

	// Phase 2: Launch button press (12-18)
	const btnPress = spring({
		frame: Math.max(0, frame - 14),
		fps,
		from: 0,
		to: 1,
		config: { damping: 8, stiffness: 200 },
	});
	const btnScale = btnPress > 0.01
		? interpolate(btnPress, [0, 0.3, 0.6, 1], [1, 0.88, 0.88, 1], {
				extrapolateRight: "clamp",
			})
		: 1;
	const btnFilled = btnPress > 0.5;

	// Phase 3: Progress bar fills (16-30)
	const progressFill = interpolate(frame, [16, 32], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	// Phase 4: Connection lines extend to targets (20-35)
	const targets = [
		{ x: 480, y: 260, delay: 20, icon: "envelope" as const },
		{ x: 480, y: 340, delay: 23, icon: "linkedin" as const },
		{ x: 480, y: 420, delay: 26, icon: "phone" as const },
	];

	// IX logo pulse
	const logoPulse = interpolate(
		Math.sin(frame * 0.12),
		[-1, 1],
		[0.95, 1.05],
	);
	const logoPulseOp = interpolate(
		Math.sin(frame * 0.12),
		[-1, 1],
		[0.7, 1.0],
	);

	// Status dots that light up sequentially after progress completes
	const statusDots = [
		{ delay: 28, label: "Targets" },
		{ delay: 31, label: "Content" },
		{ delay: 34, label: "Schedule" },
	];

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<filter id="ixShadow">
					<feDropShadow
						dx="0"
						dy="2"
						stdDeviation="6"
						floodOpacity="0.08"
					/>
				</filter>
				<linearGradient id="ixOrangeGrad" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor={IX_ORANGE} />
					<stop offset="100%" stopColor="#FF9B47" />
				</linearGradient>
				<linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor={IX_ORANGE} />
					<stop offset="100%" stopColor="#FFB366" />
				</linearGradient>
				<clipPath id="progressClip">
					<rect
						x="115"
						y="228"
						width={290 * progressFill}
						height="18"
						rx="9"
					/>
				</clipPath>
			</defs>

			{/* Background — clean white */}
			<rect width="600" height="600" fill="#FAFAFA" rx="20" />

			{/* Dashboard container */}
			<g transform={`translate(0, ${dashSlide})`} opacity={dashOp}>
				{/* Main dashboard card */}
				<rect
					x="60"
					y="70"
					width="480"
					height="460"
					rx="16"
					fill="white"
					stroke="#E8E8E8"
					strokeWidth="1.5"
					filter="url(#ixShadow)"
				/>

				{/* Top bar */}
				<rect
					x="60"
					y="70"
					width="480"
					height="56"
					rx="16"
					fill={BLACK}
				/>
				{/* Square off bottom corners of top bar */}
				<rect x="60" y="110" width="480" height="16" fill={BLACK} />

				{/* IX logo in top bar via foreignObject */}
				<foreignObject
					x="78"
					y="78"
					width="40"
					height="40"
					transform={`scale(${logoPulse})`}
					style={{ transformOrigin: "98px 98px" }}
				>
					<Img
						src={staticFile("infinitx-logo.png")}
						style={{
							width: 40,
							height: 40,
							borderRadius: 6,
							opacity: logoPulseOp,
						}}
					/>
				</foreignObject>

				{/* Top bar title text */}
				<text
					x="130"
					y="104"
					fontSize="15"
					fontWeight="700"
					fill="white"
					fontFamily={FONT}
					letterSpacing="1.5"
				>
					INFINITX
				</text>

				{/* Three window dots on right */}
				<circle cx="484" cy="98" r="5" fill="#FF5F57" opacity="0.8" />
				<circle cx="504" cy="98" r="5" fill="#FEBC2E" opacity="0.8" />
				<circle cx="524" cy="98" r="5" fill="#28C840" opacity="0.8" />

				{/* Campaign section header */}
				<text
					x="90"
					y="160"
					fontSize="13"
					fontWeight="600"
					fill={GRAY}
					fontFamily={FONT}
					letterSpacing="2"
				>
					NEW CAMPAIGN
				</text>

				{/* Campaign name card */}
				<rect
					x="90"
					y="172"
					width="340"
					height="36"
					rx="8"
					fill="#F7F7F7"
					stroke={LIGHT_GRAY}
					strokeWidth="1"
				/>
				<text
					x="106"
					y="195"
					fontSize="14"
					fontWeight="600"
					fill={BLACK}
					fontFamily={FONT}
				>
					Q1 Outreach — Enterprise
				</text>

				{/* Launch button */}
				<g
					transform={`translate(452, 190) scale(${btnScale})`}
					style={{ transformOrigin: "452px 190px" }}
				>
					<rect
						x="-30"
						y="-18"
						width="60"
						height="36"
						rx="8"
						fill={btnFilled ? IX_ORANGE : "white"}
						stroke={IX_ORANGE}
						strokeWidth="2"
					/>
					{/* Play triangle icon */}
					<path
						d="M -8 -8 L 10 0 L -8 8 Z"
						fill={btnFilled ? "white" : IX_ORANGE}
					/>
				</g>

				{/* Progress bar track */}
				<rect
					x="115"
					y="228"
					width="290"
					height="18"
					rx="9"
					fill="#F0F0F0"
				/>
				{/* Progress bar fill */}
				<rect
					x="115"
					y="228"
					width="290"
					height="18"
					rx="9"
					fill="url(#progressGrad)"
					clipPath="url(#progressClip)"
				/>
				{/* Progress percentage text */}
				{progressFill > 0.05 && (
					<text
						x={115 + 290 * progressFill - 8}
						y="241"
						fontSize="10"
						fontWeight="700"
						fill={progressFill > 0.15 ? "white" : BLACK}
						fontFamily={FONT}
						textAnchor="end"
					>
						{Math.round(progressFill * 100)}%
					</text>
				)}
				{/* Progress label */}
				<text
					x="420"
					y="241"
					fontSize="11"
					fontWeight="600"
					fill={GRAY}
					fontFamily={FONT}
				>
					{progressFill >= 1 ? "LIVE" : "LAUNCHING..."}
				</text>

				{/* Status indicator dots */}
				<g>
					{statusDots.map((dot, i) => {
						const dotPop = spring({
							frame: Math.max(0, frame - dot.delay),
							fps,
							from: 0,
							to: 1,
							config: { damping: 10, stiffness: 120 },
						});
						return (
							<g key={`status-${i}`} opacity={dashOp}>
								<circle
									cx={150 + i * 110}
									cy="272"
									r={6 * dotPop}
									fill={dotPop > 0.5 ? GREEN : LIGHT_GRAY}
								/>
								<text
									x={150 + i * 110}
									y="290"
									textAnchor="middle"
									fontSize="10"
									fontWeight="600"
									fill={dotPop > 0.5 ? BLACK : GRAY}
									fontFamily={FONT}
									opacity={dotPop}
								>
									{dot.label}
								</text>
							</g>
						);
					})}
				</g>

				{/* Divider line */}
				<line
					x1="90"
					y1="305"
					x2="510"
					y2="305"
					stroke={LIGHT_GRAY}
					strokeWidth="1"
				/>

				{/* Connection lines from dashboard to target nodes */}
				{targets.map((t, i) => {
					const lineExtend = spring({
						frame: Math.max(0, frame - t.delay),
						fps,
						from: 0,
						to: 1,
						config: { damping: 12, stiffness: 70 },
					});

					const startX = 260;
					const startY = t.y;
					const endX = startX + (t.x - startX) * lineExtend;

					return (
						<g key={`target-${i}`}>
							{/* Connection line */}
							<line
								x1={startX}
								y1={startY}
								x2={endX}
								y2={t.y}
								stroke={IX_ORANGE}
								strokeWidth="2"
								strokeDasharray="6 4"
								opacity={lineExtend * 0.6}
							/>
							{/* Animated dot traveling along line */}
							{lineExtend > 0.1 && lineExtend < 0.95 && (
								<circle
									cx={startX + (t.x - startX) * lineExtend}
									cy={t.y}
									r="4"
									fill={IX_ORANGE}
									opacity={0.8}
								/>
							)}
						</g>
					);
				})}

				{/* Source panel (left side) — mini cards representing campaign assets */}
				{(
					[
						{ y: 330, label: "Sequences", icon: "list" },
						{ y: 370, label: "Templates", icon: "doc" },
						{ y: 410, label: "Contacts", icon: "people" },
					] as const
				).map((item, i) => {
					const cardPop = spring({
						frame: Math.max(0, frame - 10 - i * 2),
						fps,
						from: 0,
						to: 1,
						config: { damping: 12, stiffness: 100 },
					});
					return (
						<g
							key={`card-${i}`}
							opacity={cardPop}
							transform={`translate(0, ${(1 - cardPop) * 10})`}
						>
							<rect
								x="90"
								y={item.y}
								width="160"
								height="32"
								rx="6"
								fill="#F9F9F9"
								stroke={LIGHT_GRAY}
								strokeWidth="1"
							/>
							{/* Mini icon — list */}
							{item.icon === "list" && (
								<g transform={`translate(104, ${item.y + 10})`}>
									<line
										x1="0"
										y1="0"
										x2="12"
										y2="0"
										stroke={IX_ORANGE}
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<line
										x1="0"
										y1="5"
										x2="9"
										y2="5"
										stroke={IX_ORANGE}
										strokeWidth="2"
										strokeLinecap="round"
										opacity="0.6"
									/>
									<line
										x1="0"
										y1="10"
										x2="11"
										y2="10"
										stroke={IX_ORANGE}
										strokeWidth="2"
										strokeLinecap="round"
										opacity="0.4"
									/>
								</g>
							)}
							{/* Mini icon — document */}
							{item.icon === "doc" && (
								<g transform={`translate(104, ${item.y + 6})`}>
									<rect
										x="0"
										y="0"
										width="12"
										height="16"
										rx="2"
										fill="none"
										stroke={IX_ORANGE}
										strokeWidth="1.5"
									/>
									<line
										x1="3"
										y1="5"
										x2="9"
										y2="5"
										stroke={IX_ORANGE}
										strokeWidth="1"
										opacity="0.5"
									/>
									<line
										x1="3"
										y1="8"
										x2="8"
										y2="8"
										stroke={IX_ORANGE}
										strokeWidth="1"
										opacity="0.5"
									/>
									<line
										x1="3"
										y1="11"
										x2="7"
										y2="11"
										stroke={IX_ORANGE}
										strokeWidth="1"
										opacity="0.5"
									/>
								</g>
							)}
							{/* Mini icon — people */}
							{item.icon === "people" && (
								<g transform={`translate(104, ${item.y + 6})`}>
									<circle
										cx="4"
										cy="4"
										r="3.5"
										fill="none"
										stroke={IX_ORANGE}
										strokeWidth="1.5"
									/>
									<path
										d="M -1 14 Q 4 10 9 14"
										fill="none"
										stroke={IX_ORANGE}
										strokeWidth="1.5"
									/>
									<circle
										cx="12"
										cy="5"
										r="2.5"
										fill="none"
										stroke={IX_ORANGE}
										strokeWidth="1"
										opacity="0.5"
									/>
								</g>
							)}
							<text
								x="124"
								y={item.y + 21}
								fontSize="11"
								fontWeight="600"
								fill={BLACK}
								fontFamily={FONT}
							>
								{item.label}
							</text>
						</g>
					);
				})}

				{/* Target channel nodes (right side) */}
				{targets.map((t, i) => {
					const nodePop = spring({
						frame: Math.max(0, frame - t.delay - 4),
						fps,
						from: 0,
						to: 1,
						config: { damping: 10, stiffness: 120 },
					});

					return (
						<g
							key={`node-${i}`}
							transform={`translate(${t.x}, ${t.y}) scale(${nodePop})`}
							opacity={nodePop}
						>
							<circle
								cx="0"
								cy="0"
								r="28"
								fill="white"
								stroke={IX_ORANGE}
								strokeWidth="2"
							/>
							{/* Envelope icon for email */}
							{t.icon === "envelope" && (
								<g transform="translate(-10, -7)">
									<rect
										x="0"
										y="0"
										width="20"
										height="14"
										rx="2"
										fill="none"
										stroke={BLACK}
										strokeWidth="1.5"
									/>
									<path
										d="M 0 0 L 10 8 L 20 0"
										fill="none"
										stroke={BLACK}
										strokeWidth="1.5"
									/>
								</g>
							)}
							{/* LinkedIn icon */}
							{t.icon === "linkedin" && (
								<g transform="translate(-8, -8)">
									<rect
										x="0"
										y="0"
										width="16"
										height="16"
										rx="3"
										fill="none"
										stroke={BLACK}
										strokeWidth="1.5"
									/>
									<text
										x="8"
										y="13"
										textAnchor="middle"
										fontSize="11"
										fontWeight="800"
										fill={BLACK}
										fontFamily={FONT}
									>
										in
									</text>
								</g>
							)}
							{/* Phone icon */}
							{t.icon === "phone" && (
								<g transform="translate(-6, -8)">
									<rect
										x="0"
										y="0"
										width="12"
										height="16"
										rx="2"
										fill="none"
										stroke={BLACK}
										strokeWidth="1.5"
									/>
									<circle cx="6" cy="13" r="1.5" fill={BLACK} />
									<line
										x1="3"
										y1="3"
										x2="9"
										y2="3"
										stroke={BLACK}
										strokeWidth="1"
										opacity="0.4"
									/>
								</g>
							)}

							{/* Success checkmark after connection completes */}
							{nodePop > 0.8 && (
								<g transform="translate(18, -18)">
									<circle
										cx="0"
										cy="0"
										r="8"
										fill={GREEN}
										opacity={nodePop}
									/>
									<path
										d="M -3.5 0 L -1 2.5 L 3.5 -2.5"
										fill="none"
										stroke="white"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
								</g>
							)}
						</g>
					);
				})}

				{/* Bottom stats row */}
				{[
					{ x: 150, value: "847", label: "Contacts" },
					{ x: 300, value: "12", label: "Sequences" },
					{ x: 450, value: "3", label: "Channels" },
				].map((stat, i) => {
					const statPop = spring({
						frame: Math.max(0, frame - 32 - i * 2),
						fps,
						from: 0,
						to: 1,
						config: { damping: 12, stiffness: 100 },
					});
					return (
						<g key={`stat-${i}`} opacity={statPop}>
							<text
								x={stat.x}
								y="480"
								textAnchor="middle"
								fontSize="22"
								fontWeight="800"
								fill={BLACK}
								fontFamily={FONT}
							>
								{stat.value}
							</text>
							<text
								x={stat.x}
								y="498"
								textAnchor="middle"
								fontSize="10"
								fontWeight="600"
								fill={GRAY}
								fontFamily={FONT}
								letterSpacing="1"
							>
								{stat.label}
							</text>
						</g>
					);
				})}
			</g>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. CampaignPrepBRoll — HERO (120 frames) — 2x2 panel montage
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CampaignPrepBRoll: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Panel positions (2x2 grid, 260x240 each, 20px gap)
	const panelW = 260;
	const panelH = 240;
	const gap = 20;
	const startX = (600 - panelW * 2 - gap) / 2;
	const startY = (600 - panelH * 2 - gap) / 2;

	// Unified pulse glow at frame 60+
	const pulseGlow =
		frame >= 60
			? interpolate(frame, [60, 70, 80], [0, 0.06, 0.03], {
					extrapolateRight: "clamp",
				})
			: 0;

	// Panel 1: THE COPY (frame 0-20) — top-left
	const p1Reveal = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 80 },
	});

	// Panel 2: THE ANGLE (frame 15-35) — top-right
	const p2Reveal = spring({
		frame: Math.max(0, frame - 15),
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 80 },
	});

	// Panel 3: THE INDUSTRY (frame 30-50) — bottom-left
	const p3Reveal = spring({
		frame: Math.max(0, frame - 30),
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 80 },
	});

	// Panel 4: THE AUDIENCE (frame 45-65) — bottom-right
	const p4Reveal = spring({
		frame: Math.max(0, frame - 45),
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 80 },
	});

	// Doc lines for Panel 1 (draw left-to-right)
	const docLines = [
		{ w: 140, delay: 4 },
		{ w: 120, delay: 7 },
		{ w: 100, delay: 10 },
		{ w: 80, delay: 13 },
	];

	// Arrow for Panel 2 (slides in from left)
	const arrowSlide = spring({
		frame: Math.max(0, frame - 22),
		fps,
		from: 0,
		to: 1,
		config: { damping: 14, stiffness: 80 },
	});

	// Buildings for Panel 3
	const buildings = [
		{ x: -50, w: 40, h: 80, delay: 33 },
		{ x: 0, w: 50, h: 120, delay: 36 },
		{ x: 55, w: 35, h: 65, delay: 39 },
	];

	// Network for Panel 4
	const networkNodes = [
		{ x: 0, y: 0, r: 18, delay: 48, isCenter: true },
		{ x: -55, y: -35, r: 12, delay: 51, isCenter: false },
		{ x: 55, y: -35, r: 12, delay: 53, isCenter: false },
		{ x: -45, y: 40, r: 12, delay: 55, isCenter: false },
		{ x: 50, y: 40, r: 12, delay: 57, isCenter: false },
	];

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			{/* Unified pulse glow behind all panels */}
			{pulseGlow > 0 && (
				<rect
					x={startX - 10}
					y={startY - 10}
					width={panelW * 2 + gap + 20}
					height={panelH * 2 + gap + 20}
					rx="20"
					fill={ORANGE}
					opacity={pulseGlow}
				/>
			)}

			{/* Panel 1: THE COPY (top-left) */}
			<g
				transform={`translate(${startX}, ${startY}) scale(${p1Reveal})`}
				opacity={p1Reveal}
			>
				<rect
					x="0"
					y="0"
					width={panelW}
					height={panelH}
					rx="16"
					fill="white"
					stroke={LIGHT_GRAY}
					strokeWidth="1.5"
				/>
				{/* Label */}
				<text
					x="20"
					y="32"
					fontSize="12"
					fontWeight="700"
					fill={ORANGE}
					fontFamily={FONT}
					letterSpacing="2"
				>
					THE COPY
				</text>
				{/* Pen icon */}
				<g transform="translate(220, 18)">
					<path
						d="M 0 12 L 8 0 L 12 4 L 4 16 Z"
						fill="none"
						stroke={GRAY}
						strokeWidth="1.5"
					/>
					<line x1="0" y1="16" x2="6" y2="16" stroke={GRAY} strokeWidth="1.5" />
				</g>
				{/* Document with text lines */}
				<rect x="30" y="50" width="200" height="170" rx="8" fill="#FAFAFA" stroke={LIGHT_GRAY} strokeWidth="1" />
				{docLines.map((line, i) => {
					const lineW = frame >= line.delay
						? interpolate(frame - line.delay, [0, 8], [0, line.w], { extrapolateRight: "clamp" })
						: 0;
					return (
						<rect
							key={i}
							x="50"
							y={75 + i * 32}
							width={lineW}
							height="8"
							rx="4"
							fill={i === 0 ? ORANGE : LIGHT_GRAY}
							opacity={0.6}
						/>
					);
				})}
			</g>

			{/* Panel 2: THE ANGLE (top-right) */}
			<g
				transform={`translate(${startX + panelW + gap}, ${startY}) scale(${p2Reveal})`}
				opacity={p2Reveal}
			>
				<rect
					x="0"
					y="0"
					width={panelW}
					height={panelH}
					rx="16"
					fill="white"
					stroke={LIGHT_GRAY}
					strokeWidth="1.5"
				/>
				<text
					x="20"
					y="32"
					fontSize="12"
					fontWeight="700"
					fill={ORANGE}
					fontFamily={FONT}
					letterSpacing="2"
				>
					THE ANGLE
				</text>
				{/* Target/bullseye */}
				<g transform="translate(130, 140)">
					{/* Concentric circles expanding */}
					{[50, 35, 20].map((r, i) => {
						const ringScale = spring({
							frame: Math.max(0, frame - 18 - i * 3),
							fps,
							from: 0,
							to: 1,
							config: { damping: 12, stiffness: 80 },
						});
						return (
							<circle
								key={i}
								cx="0"
								cy="0"
								r={r * ringScale}
								fill="none"
								stroke={i === 2 ? ORANGE : LIGHT_GRAY}
								strokeWidth={i === 2 ? "3" : "2"}
								opacity={ringScale}
							/>
						);
					})}
					{/* Arrow sliding in from left */}
					<g
						transform={`translate(${interpolate(arrowSlide, [0, 1], [-80, 0])}, 0)`}
						opacity={arrowSlide}
					>
						<line x1="-60" y1="0" x2="-5" y2="0" stroke={BLACK} strokeWidth="2.5" />
						<path d="M -8 -5 L 0 0 L -8 5" fill="none" stroke={BLACK} strokeWidth="2.5" strokeLinecap="round" />
					</g>
					{/* Hit splash */}
					{arrowSlide > 0.9 && (
						<circle
							cx="0"
							cy="0"
							r={8}
							fill={ORANGE}
							opacity={interpolate(frame, [25, 28, 35], [0, 0.8, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
						/>
					)}
				</g>
			</g>

			{/* Panel 3: THE INDUSTRY (bottom-left) */}
			<g
				transform={`translate(${startX}, ${startY + panelH + gap}) scale(${p3Reveal})`}
				opacity={p3Reveal}
			>
				<rect
					x="0"
					y="0"
					width={panelW}
					height={panelH}
					rx="16"
					fill="white"
					stroke={LIGHT_GRAY}
					strokeWidth="1.5"
				/>
				<text
					x="20"
					y="32"
					fontSize="12"
					fontWeight="700"
					fill={ORANGE}
					fontFamily={FONT}
					letterSpacing="2"
				>
					THE INDUSTRY
				</text>
				{/* Building skyline */}
				<g transform="translate(130, 200)">
					{buildings.map((b, i) => {
						const rise = spring({
							frame: Math.max(0, frame - b.delay),
							fps,
							from: 0,
							to: 1,
							config: { damping: 12, stiffness: 100 },
						});
						return (
							<rect
								key={i}
								x={b.x - b.w / 2}
								y={-b.h * rise}
								width={b.w}
								height={b.h * rise}
								rx="3"
								fill={i === 1 ? ORANGE : BLACK}
								opacity={rise * (i === 1 ? 1 : 0.7)}
							/>
						);
					})}
					{/* Gear icon floating above */}
					{frame >= 42 && (
						<g
							transform={`translate(0, ${-135 + Math.sin(frame * 0.08) * 4})`}
							opacity={spring({
								frame: Math.max(0, frame - 42),
								fps,
								from: 0,
								to: 1,
								config: { damping: 14, stiffness: 80 },
							})}
						>
							<circle cx="0" cy="0" r="8" fill="none" stroke={GRAY} strokeWidth="2" />
							{[0, 60, 120, 180, 240, 300].map((angle, i) => {
								const rad = (angle * Math.PI) / 180;
								return (
									<line
										key={i}
										x1={Math.cos(rad) * 8}
										y1={Math.sin(rad) * 8}
										x2={Math.cos(rad) * 12}
										y2={Math.sin(rad) * 12}
										stroke={GRAY}
										strokeWidth="2"
										strokeLinecap="round"
									/>
								);
							})}
						</g>
					)}
				</g>
			</g>

			{/* Panel 4: THE AUDIENCE (bottom-right) */}
			<g
				transform={`translate(${startX + panelW + gap}, ${startY + panelH + gap}) scale(${p4Reveal})`}
				opacity={p4Reveal}
			>
				<rect
					x="0"
					y="0"
					width={panelW}
					height={panelH}
					rx="16"
					fill="white"
					stroke={LIGHT_GRAY}
					strokeWidth="1.5"
				/>
				<text
					x="20"
					y="32"
					fontSize="12"
					fontWeight="700"
					fill={ORANGE}
					fontFamily={FONT}
					letterSpacing="2"
				>
					THE AUDIENCE
				</text>
				{/* Person network */}
				<g transform="translate(130, 140)">
					{/* Connection lines drawn between nodes */}
					{networkNodes.slice(1).map((node, i) => {
						const lineProg = spring({
							frame: Math.max(0, frame - node.delay + 2),
							fps,
							from: 0,
							to: 1,
							config: { damping: 16, stiffness: 60 },
						});
						return (
							<line
								key={`line-${i}`}
								x1="0"
								y1="0"
								x2={node.x * lineProg}
								y2={node.y * lineProg}
								stroke={LIGHT_GRAY}
								strokeWidth="1.5"
								opacity={lineProg * 0.6}
							/>
						);
					})}
					{/* Nodes */}
					{networkNodes.map((node, i) => {
						const nodePop = spring({
							frame: Math.max(0, frame - node.delay),
							fps,
							from: 0,
							to: 1,
							config: { damping: 10, stiffness: 100 },
						});
						return (
							<g
								key={i}
								transform={`translate(${node.x}, ${node.y}) scale(${nodePop})`}
								opacity={nodePop}
							>
								<circle
									cx="0"
									cy="0"
									r={node.r}
									fill={node.isCenter ? ORANGE : "#F0F0F0"}
									stroke={node.isCenter ? ORANGE : LIGHT_GRAY}
									strokeWidth="2"
								/>
								{/* Person silhouette */}
								<circle cx="0" cy={-node.r * 0.25} r={node.r * 0.28} fill={node.isCenter ? "white" : GRAY} />
								<path
									d={`M ${-node.r * 0.35} ${node.r * 0.2} Q ${-node.r * 0.35} ${node.r * 0.05} 0 ${node.r * 0.05} Q ${node.r * 0.35} ${node.r * 0.05} ${node.r * 0.35} ${node.r * 0.2}`}
									fill={node.isCenter ? "white" : GRAY}
								/>
							</g>
						);
					})}
				</g>
			</g>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. OutreachFlyout — Central envelope with messages radiating outward
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const OutreachFlyout: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Central envelope (0-8)
	const envelopePop = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 100 },
	});

	// 6 flying envelopes radiating outward
	const flyingEnvelopes = [
		{ angle: -30, delay: 6 },
		{ angle: 30, delay: 8 },
		{ angle: -80, delay: 10 },
		{ angle: 80, delay: 12 },
		{ angle: -150, delay: 14 },
		{ angle: 150, delay: 16 },
	];

	const flightDistance = 180;

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			{/* Dotted trail lines behind each envelope */}
			{flyingEnvelopes.map((env, i) => {
				const flyProg = frame >= env.delay
					? spring({
							frame: frame - env.delay,
							fps,
							from: 0,
							to: 1,
							config: { damping: 16, stiffness: 50 },
						})
					: 0;

				if (flyProg <= 0) return null;
				const rad = (env.angle * Math.PI) / 180;
				const ex = 300 + Math.cos(rad) * flightDistance * flyProg;
				const ey = 280 + Math.sin(rad) * flightDistance * flyProg;

				return (
					<line
						key={`trail-${i}`}
						x1="300"
						y1="280"
						x2={ex}
						y2={ey}
						stroke={ORANGE}
						strokeWidth="1"
						strokeDasharray="4 3"
						opacity={0.2 * flyProg}
					/>
				);
			})}

			{/* Central large envelope */}
			<g
				transform={`translate(300, 280) scale(${envelopePop})`}
				opacity={envelopePop}
			>
				<rect x="-45" y="-30" width="90" height="60" rx="8" fill={ORANGE} />
				<path d="M -45 -30 L 0 8 L 45 -30" fill="none" stroke="white" strokeWidth="2.5" />
				<path d="M -45 30 L -10 5" fill="none" stroke="white" strokeWidth="1.5" opacity={0.5} />
				<path d="M 45 30 L 10 5" fill="none" stroke="white" strokeWidth="1.5" opacity={0.5} />
			</g>

			{/* Flying small envelopes */}
			{flyingEnvelopes.map((env, i) => {
				const flyProg = frame >= env.delay
					? spring({
							frame: frame - env.delay,
							fps,
							from: 0,
							to: 1,
							config: { damping: 16, stiffness: 50 },
						})
					: 0;

				if (flyProg <= 0.05) return null;
				const rad = (env.angle * Math.PI) / 180;
				const ex = 300 + Math.cos(rad) * flightDistance * flyProg;
				const ey = 280 + Math.sin(rad) * flightDistance * flyProg;
				const rotation = env.angle;

				return (
					<g key={`fly-${i}`}>
						{/* Small envelope */}
						{flyProg < 0.95 && (
							<g
								transform={`translate(${ex}, ${ey}) rotate(${rotation * 0.3})`}
								opacity={interpolate(flyProg, [0, 0.2, 0.85, 1], [0, 0.9, 0.9, 0])}
							>
								<rect x="-12" y="-8" width="24" height="16" rx="3" fill={ORANGE} opacity={0.85} />
								<path d="M -12 -8 L 0 2 L 12 -8" fill="none" stroke="white" strokeWidth="1.2" />
							</g>
						)}
						{/* Delivered checkmark at endpoint */}
						{flyProg > 0.85 && (
							<g
								transform={`translate(${300 + Math.cos(rad) * flightDistance}, ${280 + Math.sin(rad) * flightDistance})`}
								opacity={interpolate(flyProg, [0.85, 1], [0, 1], { extrapolateRight: "clamp" })}
							>
								<circle cx="0" cy="0" r="10" fill={GREEN} />
								<path d="M -4 0 L -1 3 L 4 -3" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
							</g>
						)}
					</g>
				);
			})}

			{/* OUTREACH label */}
			<text
				x="300"
				y="520"
				textAnchor="middle"
				fontSize="24"
				fontWeight="800"
				fill={BLACK}
				fontFamily={FONT}
				letterSpacing="5"
				opacity={envelopePop}
			>
				OUTREACH
			</text>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. MeetDexNameplate — Premium editorial nameplate reveal
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const MeetDexNameplate: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Horizontal orange line draws from center outward (0-4)
	const lineWidth = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		config: { damping: 14, stiffness: 80 },
	});
	const halfLineW = 200 * lineWidth;

	// "DEX" text scale (4-12)
	const nameScale = spring({
		frame: Math.max(0, frame - 4),
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 100 },
	});

	// Tag line (8-16)
	const tagReveal = spring({
		frame: Math.max(0, frame - 8),
		fps,
		from: 0,
		to: 1,
		config: { damping: 16, stiffness: 60 },
	});
	const tagLetterSpacing = interpolate(tagReveal, [0, 1], [20, 4]);

	// Diamond decorative elements (10-18)
	const diamondReveal = spring({
		frame: Math.max(0, frame - 10),
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 100 },
	});

	// Shimmer sweep (16+)
	const shimmerX =
		frame >= 16
			? interpolate(frame - 16, [0, 20], [-100, 500], {
					extrapolateRight: "clamp",
				})
			: -200;

	// Headshot pop-in (2-10)
	const headshotScale = spring({
		frame: Math.max(0, frame - 2),
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 100 },
	});

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<defs>
				<clipPath id="nameplate-clip">
					<rect x="100" y="140" width="400" height="320" />
				</clipPath>
				<clipPath id="dex-headshot-clip">
					<circle cx="300" cy="200" r="65" />
				</clipPath>
			</defs>

			{/* Real headshot with circle crop */}
			<g opacity={headshotScale} transform={`translate(0, ${(1 - headshotScale) * 10})`}>
				<circle cx="300" cy="200" r="68" fill={ORANGE} opacity={0.2} />
				<circle cx="300" cy="200" r="66" stroke={ORANGE} strokeWidth="3" fill="none" />
				<foreignObject x="235" y="135" width="130" height="130" clipPath="url(#dex-headshot-clip)">
					<Img
						src={staticFile("headshots/dex-headshot.png")}
						style={{ width: 130, height: 130, objectFit: "cover", borderRadius: "50%" }}
					/>
				</foreignObject>
			</g>

			{/* Horizontal orange line (draws from center) */}
			<line
				x1={300 - halfLineW}
				y1="310"
				x2={300 + halfLineW}
				y2="310"
				stroke={ORANGE}
				strokeWidth="3"
				strokeLinecap="round"
			/>

			{/* "DEX" text */}
			<text
				x="300"
				y="365"
				textAnchor="middle"
				fontSize="60"
				fontWeight="900"
				fill={BLACK}
				fontFamily={FONT}
				letterSpacing="12"
				opacity={nameScale}
				transform={`translate(0, ${(1 - nameScale) * 10})`}
			>
				DEX
			</text>

			{/* Tagline below */}
			<text
				x="300"
				y="400"
				textAnchor="middle"
				fontSize="13"
				fontWeight="600"
				fill={GRAY}
				fontFamily={FONT}
				letterSpacing={tagLetterSpacing}
				opacity={tagReveal}
			>
				{"PARTNER \u2022 FIRST AI CAMPAIGN"}
			</text>

			{/* Diamond decorations on both sides of the line */}
			{[-1, 1].map((side) => (
				<g
					key={side}
					transform={`translate(${300 + side * (halfLineW + 20)}, 310) scale(${diamondReveal}) rotate(45)`}
					opacity={diamondReveal}
				>
					<rect x="-5" y="-5" width="10" height="10" fill={ORANGE} />
				</g>
			))}

			{/* Shimmer highlight sweep */}
			<g clipPath="url(#nameplate-clip)">
				<rect
					x={shimmerX}
					y="145"
					width="60"
					height="280"
					fill="white"
					opacity={0.12}
					transform="skewX(-20)"
				/>
			</g>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. ClarityMomentLens — Magnifying glass transforms chaos to order
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ClarityMomentLens: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Scattered chaotic shapes
	const shapes = [
		{ type: "circle", x: 180, y: 200, r: 14 },
		{ type: "rect", x: 260, y: 170, w: 20, h: 20 },
		{ type: "triangle", x: 340, y: 210 },
		{ type: "circle", x: 220, y: 300, r: 10 },
		{ type: "rect", x: 310, y: 330, w: 16, h: 16 },
		{ type: "triangle", x: 380, y: 280 },
		{ type: "circle", x: 160, y: 350, r: 12 },
		{ type: "rect", x: 420, y: 230, w: 18, h: 18 },
		{ type: "circle", x: 270, y: 260, r: 16 },
	];

	// Target organized grid positions (inside lens area centered at 300, 270)
	const gridPositions = [
		{ x: 250, y: 230 },
		{ x: 300, y: 230 },
		{ x: 350, y: 230 },
		{ x: 250, y: 280 },
		{ x: 300, y: 280 },
		{ x: 350, y: 280 },
		{ x: 250, y: 330 },
		{ x: 300, y: 330 },
		{ x: 350, y: 330 },
	];

	// Magnifying glass sweeps from left (6-15)
	const lensX = spring({
		frame: Math.max(0, frame - 6),
		fps,
		from: 100,
		to: 300,
		config: { damping: 14, stiffness: 60 },
	});
	const lensReveal = spring({
		frame: Math.max(0, frame - 6),
		fps,
		from: 0,
		to: 1,
		config: { damping: 14, stiffness: 60 },
	});

	// Outside shapes fade (12-20)
	const outsideFade = interpolate(frame, [12, 20], [1, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	// Organize shapes inside lens (16-25)
	const organizeProg = spring({
		frame: Math.max(0, frame - 16),
		fps,
		from: 0,
		to: 1,
		config: { damping: 16, stiffness: 50 },
	});

	// Lens glow (20+)
	const lensGlow = spring({
		frame: Math.max(0, frame - 20),
		fps,
		from: 0,
		to: 1,
		config: { damping: 18, stiffness: 60 },
	});

	// CLARITY label
	const labelReveal = spring({
		frame: Math.max(0, frame - 22),
		fps,
		from: 0,
		to: 1,
		config: { damping: 14, stiffness: 80 },
	});

	const lensR = 100;

	const renderShape = (type: string, x: number, y: number, color: string, opacity: number, scale: number) => {
		if (type === "circle") {
			return <circle cx={x} cy={y} r={12 * scale} fill={color} opacity={opacity} />;
		} else if (type === "rect") {
			return <rect x={x - 8 * scale} y={y - 8 * scale} width={16 * scale} height={16 * scale} rx={2} fill={color} opacity={opacity} />;
		} else {
			return (
				<path
					d={`M ${x} ${y - 10 * scale} L ${x + 10 * scale} ${y + 8 * scale} L ${x - 10 * scale} ${y + 8 * scale} Z`}
					fill={color}
					opacity={opacity}
				/>
			);
		}
	};

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			{/* Shapes — outside lens, chaotic, fading */}
			{shapes.map((s, i) => {
				const isInsideLens =
					Math.sqrt(
						(gridPositions[i].x - 300) ** 2 + (gridPositions[i].y - 270) ** 2
					) < lensR;

				// Interpolate position from original to grid
				const curX = interpolate(organizeProg, [0, 1], [s.x, gridPositions[i].x]);
				const curY = interpolate(organizeProg, [0, 1], [s.y, gridPositions[i].y]);

				const isInLensView = Math.sqrt((curX - lensX) ** 2 + (curY - 270) ** 2) < lensR;

				const shapeColor = isInLensView && lensReveal > 0.5 ? ORANGE : LIGHT_GRAY;
				const shapeOp = isInLensView ? 1 : outsideFade * 0.4;

				return (
					<React.Fragment key={i}>
						{renderShape(s.type, curX, curY, shapeColor, shapeOp, 1)}
					</React.Fragment>
				);
			})}

			{/* Magnifying glass */}
			<g opacity={lensReveal}>
				{/* Glow behind lens */}
				{lensGlow > 0 && (
					<circle cx={lensX} cy="270" r={lensR + 10} fill={ORANGE} opacity={lensGlow * 0.06} />
				)}
				{/* Lens circle */}
				<circle
					cx={lensX}
					cy="270"
					r={lensR}
					fill="none"
					stroke={BLACK}
					strokeWidth="3"
				/>
				{/* Handle */}
				<line
					x1={lensX + lensR * 0.7}
					y1={270 + lensR * 0.7}
					x2={lensX + lensR * 0.7 + 50}
					y2={270 + lensR * 0.7 + 50}
					stroke={BLACK}
					strokeWidth="6"
					strokeLinecap="round"
				/>
				{/* Glass shine */}
				<ellipse cx={lensX - 30} cy={230} rx="20" ry="8" fill="white" opacity={0.15} transform={`rotate(-30, ${lensX - 30}, 230)`} />
			</g>

			{/* CLARITY label */}
			<text
				x="300"
				y="460"
				textAnchor="middle"
				fontSize="26"
				fontWeight="800"
				fill={BLACK}
				fontFamily={FONT}
				letterSpacing="6"
				opacity={labelReveal}
			>
				CLARITY
			</text>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. CampaignFlowPipeline — Horizontal flowing pipeline with nodes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CampaignFlowPipeline: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Pipe structure draws left-to-right (0-8)
	const pipeDraw = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		config: { damping: 18, stiffness: 50 },
	});
	const pipeEndX = interpolate(pipeDraw, [0, 1], [100, 500]);

	// Three nodes
	const nodes = [
		{ label: "SETUP", x: 160, delay: 6 },
		{ label: "BUILD", x: 300, delay: 9 },
		{ label: "LAUNCH", x: 440, delay: 12 },
	];

	// Flow particles (10-18+)
	const particleCount = 6;

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			{/* Pipe structure: two parallel lines */}
			<line
				x1="100"
				y1="290"
				x2={pipeEndX}
				y2="290"
				stroke={LIGHT_GRAY}
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<line
				x1="100"
				y1="310"
				x2={pipeEndX}
				y2="310"
				stroke={LIGHT_GRAY}
				strokeWidth="3"
				strokeLinecap="round"
			/>
			{/* Rounded end caps */}
			{pipeDraw > 0.1 && (
				<>
					<path d="M 100 290 Q 88 300 100 310" fill="none" stroke={LIGHT_GRAY} strokeWidth="3" />
				</>
			)}
			{pipeDraw > 0.9 && (
				<path d="M 500 290 Q 512 300 500 310" fill="none" stroke={LIGHT_GRAY} strokeWidth="3" />
			)}

			{/* Flow particles moving through the pipe */}
			{Array.from({ length: particleCount }).map((_, i) => {
				if (frame < 10) return null;
				const t = ((frame * 2 + i * 25) % 120) / 120;
				const px = interpolate(t, [0, 1], [100, 500]);
				const py = 300 + Math.sin(t * Math.PI * 4) * 6;
				return (
					<circle
						key={i}
						cx={px}
						cy={py}
						r="4"
						fill={ORANGE}
						opacity={0.15 + 0.2 * Math.sin(t * Math.PI)}
					/>
				);
			})}

			{/* Arrow heads between nodes (pulsing) */}
			{[220, 365].map((ax, i) => {
				const arrowOp = spring({
					frame: Math.max(0, frame - 14 - i * 3),
					fps,
					from: 0,
					to: 1,
					config: { damping: 14, stiffness: 80 },
				});
				const pulse = 0.4 + 0.2 * Math.sin(frame * 0.12 + i);
				return (
					<path
						key={i}
						d={`M ${ax} 293 L ${ax + 10} 300 L ${ax} 307`}
						fill="none"
						stroke={ORANGE}
						strokeWidth="2.5"
						strokeLinecap="round"
						opacity={arrowOp * pulse}
					/>
				);
			})}

			{/* Nodes emerging from the pipe */}
			{nodes.map((node, i) => {
				const nodePop = spring({
					frame: Math.max(0, frame - node.delay),
					fps,
					from: 0,
					to: 1,
					config: { damping: 12, stiffness: 100 },
				});

				// Icon paths
				const icons = [
					// Wrench (SETUP)
					"M -8 -8 L 8 8 M 8 -8 L -8 8 M -10 -10 L -6 -10 L -6 -6 M 10 10 L 6 10 L 6 6",
					// Hammer (BUILD)
					"M -4 -10 L -4 6 M -10 6 L 2 6 M -4 -10 L 6 -10 L 8 -6 L -2 -6",
					// Play triangle (LAUNCH)
					"M -6 -10 L 10 0 L -6 10 Z",
				];

				return (
					<g key={i}>
						{/* Node emerges upward from pipe */}
						<g
							transform={`translate(${node.x}, ${260 - 30 * nodePop}) scale(${nodePop})`}
							opacity={nodePop}
						>
							<circle cx="0" cy="0" r="28" fill="white" stroke={ORANGE} strokeWidth="2.5" />
							<path
								d={icons[i]}
								fill="none"
								stroke={ORANGE}
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</g>
						{/* Connector stem from pipe to node */}
						{nodePop > 0.3 && (
							<line
								x1={node.x}
								y1="290"
								x2={node.x}
								y2={260 - 30 * nodePop + 28}
								stroke={ORANGE}
								strokeWidth="2"
								opacity={nodePop * 0.5}
								strokeDasharray="3 3"
							/>
						)}
						{/* Label below pipe */}
						<text
							x={node.x}
							y="340"
							textAnchor="middle"
							fontSize="12"
							fontWeight="700"
							fill={ORANGE}
							fontFamily={FONT}
							letterSpacing="2"
							opacity={nodePop}
						>
							{node.label}
						</text>
					</g>
				);
			})}

			{/* Title */}
			<text
				x="300"
				y="180"
				textAnchor="middle"
				fontSize="20"
				fontWeight="700"
				fill={BLACK}
				fontFamily={FONT}
				letterSpacing="3"
				opacity={pipeDraw}
			>
				CAMPAIGN FLOW
			</text>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. TestIterationLoop — Circular 3-stage cycle with TEST/LEARN/IMPROVE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const TestIterationLoop: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const cycleR = 120;
	const cx = 300;
	const cy = 280;

	// Three arrow segments drawing sequentially
	const arrow1Draw = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		config: { damping: 16, stiffness: 50 },
	});
	const arrow2Draw = spring({
		frame: Math.max(0, frame - 4),
		fps,
		from: 0,
		to: 1,
		config: { damping: 16, stiffness: 50 },
	});
	const arrow3Draw = spring({
		frame: Math.max(0, frame - 8),
		fps,
		from: 0,
		to: 1,
		config: { damping: 16, stiffness: 50 },
	});

	// Arc segment helper
	const arcLength = (2 * Math.PI * cycleR) / 3;

	// Labels appear at endpoints (8-16)
	const labels = [
		{ text: "TEST", angle: -90, delay: 8 },
		{ text: "LEARN", angle: 30, delay: 12 },
		{ text: "IMPROVE", angle: 150, delay: 16 },
	];

	// Icons for each label
	const iconPaths = [
		// Flask (TEST)
		"M -5 -8 L -5 0 L -10 8 L 10 8 L 5 0 L 5 -8 Z M -6 -10 L 6 -10",
		// Lightbulb (LEARN)
		"M 0 -10 C -7 -10 -10 -4 -7 2 C -5 5 -5 7 -5 9 L 5 9 C 5 7 5 5 7 2 C 10 -4 7 -10 0 -10 Z M -3 11 L 3 11",
		// Upward arrow (IMPROVE)
		"M 0 -10 L -7 -2 M 0 -10 L 7 -2 M 0 -10 L 0 10",
	];

	// Center badge (14-20)
	const centerPop = spring({
		frame: Math.max(0, frame - 14),
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 100 },
	});

	// Subtle rotation oscillation (18+)
	const rotation =
		frame >= 18
			? interpolate(Math.sin(frame * 0.05), [-1, 1], [-2, 2])
			: 0;

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
				{/* Three curved arrow segments */}
				{[arrow1Draw, arrow2Draw, arrow3Draw].map((prog, i) => {
					const startAngle = -90 + i * 120 + 15;
					const endAngle = startAngle + 90;
					const dashTotal = arcLength;

					// SVG arc for each segment
					const sa = (startAngle * Math.PI) / 180;
					const ea = ((startAngle + 90 * prog) * Math.PI) / 180;
					const x1 = cx + Math.cos(sa) * cycleR;
					const y1 = cy + Math.sin(sa) * cycleR;
					const x2 = cx + Math.cos(ea) * cycleR;
					const y2 = cy + Math.sin(ea) * cycleR;

					return (
						<g key={i}>
							<path
								d={`M ${x1} ${y1} A ${cycleR} ${cycleR} 0 0 1 ${x2} ${y2}`}
								fill="none"
								stroke={ORANGE}
								strokeWidth="3"
								opacity={prog * 0.8}
								strokeLinecap="round"
							/>
							{/* Arrow head at end of arc */}
							{prog > 0.7 && (
								<g
									transform={`translate(${x2}, ${y2}) rotate(${startAngle + 90 * prog + 90})`}
									opacity={prog}
								>
									<path
										d="M -6 -4 L 0 0 L -6 4"
										fill="none"
										stroke={ORANGE}
										strokeWidth="2.5"
										strokeLinecap="round"
									/>
								</g>
							)}
						</g>
					);
				})}
			</g>

			{/* Labels with icons at each endpoint */}
			{labels.map((label, i) => {
				const rad = (label.angle * Math.PI) / 180;
				const lx = cx + Math.cos(rad) * (cycleR + 55);
				const ly = cy + Math.sin(rad) * (cycleR + 55);
				const labelPop = spring({
					frame: Math.max(0, frame - label.delay),
					fps,
					from: 0,
					to: 1,
					config: { damping: 12, stiffness: 100 },
				});

				return (
					<g
						key={i}
						transform={`translate(${lx}, ${ly}) scale(${labelPop})`}
						opacity={labelPop}
					>
						{/* Icon */}
						<path
							d={iconPaths[i]}
							fill="none"
							stroke={ORANGE}
							strokeWidth="1.8"
							strokeLinecap="round"
							strokeLinejoin="round"
							transform="translate(0, -12)"
						/>
						{/* Text */}
						<text
							x="0"
							y="12"
							textAnchor="middle"
							fontSize="12"
							fontWeight="700"
							fill={BLACK}
							fontFamily={FONT}
							letterSpacing="1"
						>
							{label.text}
						</text>
					</g>
				);
			})}

			{/* Center badge "ITERATION" */}
			<g
				transform={`translate(${cx}, ${cy}) scale(${centerPop})`}
				opacity={centerPop}
			>
				<circle cx="0" cy="0" r="42" fill="white" stroke={ORANGE} strokeWidth="2" />
				<text
					x="0"
					y="4"
					textAnchor="middle"
					fontSize="10"
					fontWeight="700"
					fill={ORANGE}
					fontFamily={FONT}
					letterSpacing="1.5"
				>
					ITERATION
				</text>
			</g>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. CampaignBrainV2 — HERO: Neural network brain with active pathways
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CampaignBrainV2: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Brain outline draws (0-6)
	const brainDraw = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		config: { damping: 16, stiffness: 50 },
	});

	// Neural pathway lines (4-14)
	const neuralPaths = [
		{ x1: 260, y1: 230, x2: 290, y2: 260, delay: 4 },
		{ x1: 290, y1: 260, x2: 320, y2: 240, delay: 5 },
		{ x1: 320, y1: 240, x2: 340, y2: 270, delay: 6 },
		{ x1: 280, y1: 280, x2: 310, y2: 300, delay: 7 },
		{ x1: 310, y1: 300, x2: 330, y2: 280, delay: 8 },
		{ x1: 260, y1: 270, x2: 280, y2: 280, delay: 9 },
		{ x1: 340, y1: 270, x2: 320, y2: 300, delay: 10 },
		{ x1: 270, y1: 240, x2: 300, y2: 230, delay: 11 },
		{ x1: 300, y1: 310, x2: 280, y2: 290, delay: 12 },
		{ x1: 330, y1: 250, x2: 350, y2: 270, delay: 13 },
	];

	// Node positions at intersections (8-18)
	const nodePositions = [
		{ x: 260, y: 230, delay: 8 },
		{ x: 290, y: 260, delay: 9 },
		{ x: 320, y: 240, delay: 10 },
		{ x: 340, y: 270, delay: 11 },
		{ x: 280, y: 280, delay: 12 },
		{ x: 310, y: 300, delay: 13 },
		{ x: 260, y: 270, delay: 14 },
		{ x: 330, y: 280, delay: 15 },
	];

	// Lit pathway (chain of 4 nodes: 0, 1, 2, 3) — lights up ORANGE (12-22)
	const litNodes = [0, 1, 2, 3];
	const litProgress = spring({
		frame: Math.max(0, frame - 12),
		fps,
		from: 0,
		to: 1,
		config: { damping: 16, stiffness: 40 },
	});

	// Traveling thought dot (16-26)
	const thoughtT =
		frame >= 16
			? interpolate(frame - 16, [0, 20], [0, 1], { extrapolateRight: "clamp" })
			: 0;
	const thoughtIdx = Math.min(litNodes.length - 2, Math.floor(thoughtT * (litNodes.length - 1)));
	const thoughtLocalT = (thoughtT * (litNodes.length - 1)) % 1;
	const thoughtNode1 = nodePositions[litNodes[thoughtIdx]];
	const thoughtNode2 = nodePositions[litNodes[Math.min(thoughtIdx + 1, litNodes.length - 1)]];
	const thoughtX = interpolate(thoughtLocalT, [0, 1], [thoughtNode1.x, thoughtNode2.x]);
	const thoughtY = interpolate(thoughtLocalT, [0, 1], [thoughtNode1.y, thoughtNode2.y]);

	// Radiating glow (20+)
	const glowReveal = spring({
		frame: Math.max(0, frame - 20),
		fps,
		from: 0,
		to: 1,
		config: { damping: 18, stiffness: 40 },
	});

	// Orbiting labels (24+)
	const orbitLabels = [
		{ text: "STRATEGY", angle: -90, delay: 24 },
		{ text: "COPY", angle: 0, delay: 26 },
		{ text: "LEADS", angle: 90, delay: 28 },
		{ text: "DATA", angle: 180, delay: 30 },
	];

	const brainCx = 300;
	const brainCy = 270;

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			{/* Radiating glow */}
			{[100, 80, 60].map((r, i) => (
				<ellipse
					key={i}
					cx={brainCx}
					cy={brainCy}
					rx={r}
					ry={r * 0.85}
					fill={ORANGE}
					opacity={glowReveal * (0.03 + i * 0.02)}
				/>
			))}

			{/* Brain outline — two halves */}
			<g opacity={brainDraw}>
				{/* Left hemisphere */}
				<path
					d="M 300 200 C 270 195 240 210 235 240 C 230 260 235 280 250 295 C 255 310 265 320 280 325 C 290 330 300 328 300 325"
					fill="none"
					stroke={BLACK}
					strokeWidth="3"
					strokeLinecap="round"
					strokeDasharray="300"
					strokeDashoffset={300 * (1 - brainDraw)}
				/>
				{/* Right hemisphere */}
				<path
					d="M 300 200 C 330 195 360 210 365 240 C 370 260 365 280 350 295 C 345 310 335 320 320 325 C 310 330 300 328 300 325"
					fill="none"
					stroke={BLACK}
					strokeWidth="3"
					strokeLinecap="round"
					strokeDasharray="300"
					strokeDashoffset={300 * (1 - brainDraw)}
				/>
				{/* Central fissure */}
				<line
					x1="300"
					y1="200"
					x2="300"
					y2="325"
					stroke={BLACK}
					strokeWidth="1.5"
					opacity={brainDraw * 0.4}
				/>
			</g>

			{/* Neural pathway lines */}
			{neuralPaths.map((p, i) => {
				const lineProg = spring({
					frame: Math.max(0, frame - p.delay),
					fps,
					from: 0,
					to: 1,
					config: { damping: 14, stiffness: 60 },
				});
				// Check if this line is part of the lit pathway
				const isLit =
					litProgress > 0.5 &&
					litNodes.some(
						(ni) =>
							(nodePositions[ni].x === p.x1 && nodePositions[ni].y === p.y1) ||
							(nodePositions[ni].x === p.x2 && nodePositions[ni].y === p.y2)
					);
				return (
					<line
						key={i}
						x1={p.x1}
						y1={p.y1}
						x2={p.x1 + (p.x2 - p.x1) * lineProg}
						y2={p.y1 + (p.y2 - p.y1) * lineProg}
						stroke={isLit ? ORANGE : GRAY}
						strokeWidth={isLit ? "2" : "1.5"}
						opacity={lineProg * (isLit ? 0.8 : 0.3)}
						strokeLinecap="round"
					/>
				);
			})}

			{/* Nodes at intersections */}
			{nodePositions.map((node, i) => {
				const nodePop = spring({
					frame: Math.max(0, frame - node.delay),
					fps,
					from: 0,
					to: 1,
					config: { damping: 12, stiffness: 100 },
				});
				const isLitNode = litProgress > 0.5 && litNodes.includes(i);
				return (
					<circle
						key={i}
						cx={node.x}
						cy={node.y}
						r={6 * nodePop}
						fill={isLitNode ? ORANGE : GRAY}
						opacity={nodePop * (isLitNode ? 1 : 0.5)}
					/>
				);
			})}

			{/* Traveling thought dot */}
			{frame >= 16 && thoughtT < 1 && (
				<>
					<circle cx={thoughtX} cy={thoughtY} r="10" fill={ORANGE} opacity={0.15} />
					<circle cx={thoughtX} cy={thoughtY} r="5" fill={ORANGE} opacity={0.9} />
				</>
			)}

			{/* Orbiting labels */}
			{orbitLabels.map((label, i) => {
				const labelPop = spring({
					frame: Math.max(0, frame - label.delay),
					fps,
					from: 0,
					to: 1,
					config: { damping: 14, stiffness: 80 },
				});
				const rad = (label.angle * Math.PI) / 180;
				const lx = brainCx + Math.cos(rad) * 130;
				const ly = brainCy + Math.sin(rad) * 100;

				return (
					<text
						key={i}
						x={lx}
						y={ly}
						textAnchor="middle"
						fontSize="11"
						fontWeight="700"
						fill={ORANGE}
						fontFamily={FONT}
						letterSpacing="1"
						opacity={labelPop}
					>
						{label.text}
					</text>
				);
			})}

			{/* Title */}
			<text
				x="300"
				y="480"
				textAnchor="middle"
				fontSize="22"
				fontWeight="800"
				fill={BLACK}
				fontFamily={FONT}
				letterSpacing="3"
				opacity={brainDraw}
			>
				CAMPAIGN BRAIN
			</text>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. PowerBeastMetaphor — Lightning bolt + energy rings + power gauge
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const PowerBeastMetaphor: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Lightning bolt draws (0-6)
	const boltDraw = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 80 },
	});

	// Central circle
	const circlePop = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		config: { damping: 14, stiffness: 80 },
	});

	// Energy rings expanding (4-12)
	const rings = [
		{ delay: 4, maxR: 90 },
		{ delay: 6, maxR: 120 },
		{ delay: 8, maxR: 150 },
	];

	// Power gauge arc at bottom (8-16)
	const gaugeProgress = spring({
		frame: Math.max(0, frame - 8),
		fps,
		from: 0,
		to: 1,
		config: { damping: 14, stiffness: 50 },
	});

	// Needle swings to MAX (12-20)
	const needleAngle = spring({
		frame: Math.max(0, frame - 12),
		fps,
		from: -90,
		to: 80,
		config: { damping: 8, stiffness: 60 },
	});

	// Sparks (16+)
	const sparks = [
		{ angle: 30, delay: 0, r: 4 },
		{ angle: 80, delay: 2, r: 3 },
		{ angle: 140, delay: 4, r: 5 },
		{ angle: 210, delay: 1, r: 3 },
		{ angle: 280, delay: 3, r: 4 },
		{ angle: 330, delay: 5, r: 3 },
	];

	const gcx = 300;
	const gcy = 440;
	const gaugeR = 70;

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			{/* Energy rings expanding from center */}
			{rings.map((ring, i) => {
				const ringExpand =
					frame >= ring.delay
						? interpolate(
								(frame - ring.delay) % 30,
								[0, 30],
								[0, 1]
							)
						: 0;
				return (
					<circle
						key={i}
						cx="300"
						cy="240"
						r={60 + ring.maxR * ringExpand}
						fill="none"
						stroke={ORANGE}
						strokeWidth="2"
						opacity={(1 - ringExpand) * 0.2 * circlePop}
					/>
				);
			})}

			{/* Central circle with lightning bolt */}
			<g
				transform={`translate(300, 240) scale(${circlePop})`}
				opacity={circlePop}
			>
				<circle cx="0" cy="0" r="55" fill={ORANGE} opacity={0.1} />
				<circle cx="0" cy="0" r="45" fill={ORANGE} />
				{/* Lightning bolt (drawn with strokeDashoffset) */}
				<path
					d="M -5 -25 L -12 -2 L -2 -2 L -8 25 L 12 -5 L 2 -5 L 8 -25 Z"
					fill="white"
					stroke="white"
					strokeWidth="1"
					strokeDasharray="150"
					strokeDashoffset={150 * (1 - boltDraw)}
				/>
			</g>

			{/* Power gauge at bottom */}
			<g>
				{/* Gauge background arc */}
				<path
					d={`M ${gcx - gaugeR} ${gcy} A ${gaugeR} ${gaugeR} 0 0 1 ${gcx + gaugeR} ${gcy}`}
					fill="none"
					stroke={LIGHT_GRAY}
					strokeWidth="10"
					strokeLinecap="round"
				/>
				{/* Gauge fill arc */}
				{gaugeProgress > 0 && (
					<path
						d={`M ${gcx - gaugeR} ${gcy} A ${gaugeR} ${gaugeR} 0 0 1 ${gcx - gaugeR + 2 * gaugeR * gaugeProgress} ${gcy - Math.sin(Math.PI * gaugeProgress) * gaugeR}`}
						fill="none"
						stroke={ORANGE}
						strokeWidth="10"
						strokeLinecap="round"
					/>
				)}
				{/* Needle */}
				<line
					x1={gcx}
					y1={gcy}
					x2={gcx + Math.cos(((needleAngle - 90) * Math.PI) / 180) * (gaugeR - 15)}
					y2={gcy + Math.sin(((needleAngle - 90) * Math.PI) / 180) * (gaugeR - 15)}
					stroke={BLACK}
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<circle cx={gcx} cy={gcy} r="6" fill={BLACK} />
				{/* MAX label */}
				<text
					x={gcx + gaugeR + 10}
					y={gcy + 5}
					fontSize="11"
					fontWeight="700"
					fill={ORANGE}
					fontFamily={FONT}
				>
					MAX
				</text>
			</g>

			{/* Sparks around perimeter (16+) */}
			{frame >= 16 &&
				sparks.map((sp, i) => {
					const sparkOp = interpolate(
						(frame + sp.delay * 4) % 14,
						[0, 7, 14],
						[0, 0.9, 0]
					);
					const rad = (sp.angle * Math.PI) / 180;
					const dist = 65 + Math.sin(frame * 0.2 + i) * 8;
					return (
						<circle
							key={i}
							cx={300 + Math.cos(rad) * dist}
							cy={240 + Math.sin(rad) * dist}
							r={sp.r}
							fill="white"
							stroke={ORANGE}
							strokeWidth="1.5"
							opacity={sparkOp * 0.7}
						/>
					);
				})}

			{/* Label */}
			<text
				x="300"
				y="550"
				textAnchor="middle"
				fontSize="24"
				fontWeight="900"
				fill={BLACK}
				fontFamily={FONT}
				letterSpacing="4"
				opacity={circlePop}
			>
				POWER
			</text>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. DeepDiveQuestion — Question mark submerges into water ripples
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DeepDiveQuestion: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Question mark draws top-to-bottom (0-6)
	const qDraw = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		config: { damping: 14, stiffness: 60 },
	});

	// Concentric ripple circles below (4-12)
	const ripples = [
		{ delay: 4, maxR: 60 },
		{ delay: 6, maxR: 90 },
		{ delay: 8, maxR: 120 },
	];

	// Question mark sinks downward (8-16)
	const sinkY =
		frame >= 8
			? interpolate(frame - 8, [0, 16], [0, 100], { extrapolateRight: "clamp" })
			: 0;
	const sinkOp = frame >= 8
		? interpolate(frame - 8, [0, 12, 16], [1, 0.5, 0.1], { extrapolateRight: "clamp" })
		: 1;

	// Answer fragments rising (10-18)
	const fragments = [
		{ text: "WHAT?", x: 210, delay: 10 },
		{ text: "HOW?", x: 300, delay: 13 },
		{ text: "WHY?", x: 390, delay: 16 },
	];

	// Treasure gem at bottom (16+)
	const gemReveal = spring({
		frame: Math.max(0, frame - 18),
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 100 },
	});

	// Gem glow (20+)
	const gemGlow = spring({
		frame: Math.max(0, frame - 22),
		fps,
		from: 0,
		to: 1,
		config: { damping: 18, stiffness: 60 },
	});

	const waterLineY = 330;

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			{/* Water surface line */}
			<line
				x1="120"
				y1={waterLineY}
				x2="480"
				y2={waterLineY}
				stroke={LIGHT_GRAY}
				strokeWidth="2"
				opacity={0.4}
			/>

			{/* Question mark (sinking) */}
			<text
				x="300"
				y={240 + sinkY}
				textAnchor="middle"
				fontSize="140"
				fontWeight="900"
				fill={ORANGE}
				fontFamily={FONT}
				opacity={sinkOp * qDraw}
				strokeDasharray="400"
				strokeDashoffset={400 * (1 - qDraw)}
			>
				?
			</text>

			{/* Trail behind sinking question mark */}
			{sinkY > 10 && (
				<line
					x1="300"
					y1="240"
					x2="300"
					y2={240 + sinkY - 30}
					stroke={ORANGE}
					strokeWidth="2"
					opacity={0.15}
					strokeDasharray="4 4"
				/>
			)}

			{/* Concentric ripple circles at water line */}
			{ripples.map((rip, i) => {
				if (frame < rip.delay) return null;
				const expand = interpolate(frame - rip.delay, [0, 15], [0, 1], {
					extrapolateRight: "clamp",
				});
				return (
					<ellipse
						key={i}
						cx="300"
						cy={waterLineY}
						rx={rip.maxR * expand}
						ry={rip.maxR * expand * 0.3}
						fill="none"
						stroke={ORANGE}
						strokeWidth="1.5"
						opacity={(1 - expand) * 0.4}
					/>
				);
			})}

			{/* Answer fragments rising upward */}
			{fragments.map((frag, i) => {
				const fragProg = spring({
					frame: Math.max(0, frame - frag.delay),
					fps,
					from: 0,
					to: 1,
					config: { damping: 14, stiffness: 80 },
				});
				const riseY = interpolate(fragProg, [0, 1], [waterLineY + 20, waterLineY - 40]);
				return (
					<text
						key={i}
						x={frag.x}
						y={riseY}
						textAnchor="middle"
						fontSize="16"
						fontWeight="700"
						fill={GRAY}
						fontFamily={FONT}
						letterSpacing="1"
						opacity={fragProg * 0.7}
					>
						{frag.text}
					</text>
				);
			})}

			{/* Treasure gem at bottom */}
			<g
				transform={`translate(300, 460) scale(${gemReveal})`}
				opacity={gemReveal}
			>
				{/* Glow */}
				{gemGlow > 0 && (
					<circle cx="0" cy="0" r={35 * gemGlow} fill={ORANGE} opacity={gemGlow * 0.08} />
				)}
				{/* Diamond shape */}
				<path
					d="M 0 -22 L 20 0 L 0 22 L -20 0 Z"
					fill={ORANGE}
					stroke={ORANGE}
					strokeWidth="2"
				/>
				{/* Inner highlight */}
				<path d="M 0 -14 L 12 0 L 0 14" fill="white" opacity={0.2} />
				{/* Sparkle dots */}
				<circle cx="-28" cy="-10" r="2" fill={ORANGE} opacity={gemGlow * 0.5} />
				<circle cx="25" cy="-15" r="1.5" fill={ORANGE} opacity={gemGlow * 0.4} />
			</g>

			{/* DEEP DIVE label */}
			<text
				x="300"
				y="540"
				textAnchor="middle"
				fontSize="24"
				fontWeight="800"
				fill={BLACK}
				fontFamily={FONT}
				letterSpacing="5"
				opacity={gemReveal}
			>
				DEEP DIVE
			</text>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12. PromptTerminalWindow — Terminal window with typing code lines
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const PromptTerminalWindow: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Window frame (0-6)
	const windowReveal = spring({
		frame,
		fps,
		from: 0.85,
		to: 1,
		config: { damping: 14, stiffness: 100 },
	});
	const windowOp = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		config: { damping: 14, stiffness: 80 },
	});

	// Traffic light dots (2-4)
	const dotsReveal = spring({
		frame: Math.max(0, frame - 2),
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 100 },
	});

	// Title bar "CAMPAIGN PROMPT" (4-10)
	const titleReveal = spring({
		frame: Math.max(0, frame - 4),
		fps,
		from: 0,
		to: 1,
		config: { damping: 14, stiffness: 80 },
	});

	// Code lines type in one-by-one
	const lines = [
		{ text: "> Define target audience...", color: GREEN, startFrame: 6, speed: 1.5 },
		{ text: "> Set campaign angle...", color: GREEN, startFrame: 12, speed: 1.3 },
		{ text: "> Generate copy variants...", color: GREEN, startFrame: 18, speed: 1.2 },
		{ text: "> Launch sequence ready \u2713", color: ORANGE, startFrame: 24, speed: 1.8 },
	];

	// Blinking cursor
	const cursorBlink = frame % 16 < 8 ? 1 : 0;

	// Find current typing line
	let currentLine = -1;
	for (let i = lines.length - 1; i >= 0; i--) {
		if (frame >= lines[i].startFrame) {
			currentLine = i;
			break;
		}
	}

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			<g
				opacity={windowOp}
				transform={`translate(300, 300) scale(${windowReveal}) translate(-300, -300)`}
			>
				{/* Window background */}
				<rect x="60" y="110" width="480" height="380" rx="16" fill="white" stroke={LIGHT_GRAY} strokeWidth="2" />

				{/* Title bar */}
				<rect x="60" y="110" width="480" height="44" rx="16" fill="#F5F5F5" />
				<rect x="60" y="138" width="480" height="16" fill="#F5F5F5" />

				{/* Traffic light dots */}
				<g opacity={dotsReveal}>
					<circle cx="92" cy="132" r="7" fill="#FF5F56" />
					<circle cx="114" cy="132" r="7" fill="#FFBD2E" />
					<circle cx="136" cy="132" r="7" fill="#27C93F" />
				</g>

				{/* Title */}
				<text
					x="300"
					y="138"
					textAnchor="middle"
					fontSize="13"
					fontWeight="700"
					fill={GRAY}
					fontFamily={FONT}
					letterSpacing="2"
					opacity={titleReveal}
				>
					CAMPAIGN PROMPT
				</text>

				{/* Separator line */}
				<line x1="60" y1="154" x2="540" y2="154" stroke={LIGHT_GRAY} strokeWidth="1" />

				{/* Code lines */}
				{lines.map((line, i) => {
					if (frame < line.startFrame) return null;
					const elapsed = frame - line.startFrame;
					const charsVisible = Math.min(
						line.text.length,
						Math.floor(elapsed * line.speed)
					);
					const displayText = line.text.substring(0, charsVisible);
					const isTyping = charsVisible < line.text.length;
					const lineY = 195 + i * 55;

					return (
						<g key={i}>
							<text
								x="90"
								y={lineY}
								fontSize="17"
								fontWeight="600"
								fill={line.color}
								fontFamily="monospace"
							>
								{displayText}
							</text>
							{/* Cursor on current typing line */}
							{isTyping && i === currentLine && (
								<rect
									x={90 + charsVisible * 10.2}
									y={lineY - 15}
									width="9"
									height="19"
									fill={line.color}
									opacity={cursorBlink}
								/>
							)}
						</g>
					);
				})}

				{/* Final blinking cursor after all done */}
				{currentLine === lines.length - 1 &&
					frame >= lines[lines.length - 1].startFrame + 20 && (
						<rect
							x="90"
							y={195 + lines.length * 55 - 15}
							width="9"
							height="19"
							fill={GREEN}
							opacity={cursorBlink}
						/>
					)}
			</g>
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 13. FlowStagesWaterfall — Vertical cascading waterfall diagram
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const FlowStagesWaterfall: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// 4 steps cascading downward, offset right like a staircase
	const steps = [
		{ label: "RESEARCH", number: "1", x: 140, y: 150, bgFill: "#F0F4F8", borderColor: GRAY, delay: 0 },
		{ label: "STRATEGY", number: "2", x: 220, y: 250, bgFill: "white", borderColor: ORANGE, delay: 6 },
		{ label: "EXECUTE", number: "3", x: 300, y: 350, bgFill: ORANGE, borderColor: ORANGE, delay: 12 },
		{ label: "OPTIMIZE", number: "4", x: 380, y: 450, bgFill: "white", borderColor: GREEN, delay: 18 },
	];

	const boxW = 160;
	const boxH = 50;

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			{/* Waterfall connector lines + animated droplets */}
			{steps.map((step, i) => {
				if (i === 0) return null;
				const prev = steps[i - 1];
				const lineReveal = spring({
					frame: Math.max(0, frame - step.delay + 2),
					fps,
					from: 0,
					to: 1,
					config: { damping: 14, stiffness: 60 },
				});

				// Vertical then horizontal L-shaped connector
				const midY = prev.y + boxH / 2 + (step.y - prev.y - boxH) / 2;

				// Animated water droplets flowing down connector
				const dropletCount = 3;

				return (
					<g key={`conn-${i}`} opacity={lineReveal}>
						{/* Vertical line down from prev */}
						<line
							x1={prev.x + boxW / 2}
							y1={prev.y + boxH / 2}
							x2={prev.x + boxW / 2}
							y2={midY}
							stroke={ORANGE}
							strokeWidth="2"
							opacity={0.4}
						/>
						{/* Horizontal line across */}
						<line
							x1={prev.x + boxW / 2}
							y1={midY}
							x2={step.x + boxW / 2}
							y2={midY}
							stroke={ORANGE}
							strokeWidth="2"
							opacity={0.4}
						/>
						{/* Vertical line down to step */}
						<line
							x1={step.x + boxW / 2}
							y1={midY}
							x2={step.x + boxW / 2}
							y2={step.y - boxH / 2 + 4}
							stroke={ORANGE}
							strokeWidth="2"
							opacity={0.4}
						/>
						{/* Water droplets */}
						{Array.from({ length: dropletCount }).map((_, di) => {
							if (lineReveal < 0.5) return null;
							const dropT = ((frame * 1.5 + di * 12) % 30) / 30;
							const totalLen = (midY - prev.y - boxH / 2) + (step.x - prev.x) + (step.y - boxH / 2 - midY);
							const along = dropT * totalLen;
							let dx: number, dy: number;

							const seg1 = midY - prev.y - boxH / 2;
							const seg2 = Math.abs(step.x - prev.x);

							if (along < seg1) {
								dx = prev.x + boxW / 2;
								dy = prev.y + boxH / 2 + along;
							} else if (along < seg1 + seg2) {
								dx = prev.x + boxW / 2 + (along - seg1) * Math.sign(step.x - prev.x);
								dy = midY;
							} else {
								dx = step.x + boxW / 2;
								dy = midY + (along - seg1 - seg2);
							}

							return (
								<circle
									key={`drop-${di}`}
									cx={dx}
									cy={dy}
									r="3"
									fill={ORANGE}
									opacity={0.3 * Math.sin(dropT * Math.PI)}
								/>
							);
						})}
					</g>
				);
			})}

			{/* Step boxes */}
			{steps.map((step, i) => {
				const boxPop = spring({
					frame: Math.max(0, frame - step.delay),
					fps,
					from: 0,
					to: 1,
					config: { damping: 12, stiffness: 100 },
				});

				const isFilledOrange = step.bgFill === ORANGE;

				return (
					<g
						key={i}
						transform={`translate(${step.x}, ${step.y - boxH / 2}) scale(${boxPop})`}
						opacity={boxPop}
					>
						{/* Shadow */}
						<rect
							x="3"
							y="3"
							width={boxW}
							height={boxH}
							rx="10"
							fill={BLACK}
							opacity={0.06}
						/>
						{/* Box */}
						<rect
							x="0"
							y="0"
							width={boxW}
							height={boxH}
							rx="10"
							fill={step.bgFill}
							stroke={step.borderColor}
							strokeWidth="2"
						/>
						{/* Circled number at left */}
						<circle
							cx="22"
							cy={boxH / 2}
							r="14"
							fill={isFilledOrange ? "white" : step.borderColor}
							opacity={isFilledOrange ? 0.3 : 0.15}
						/>
						<text
							x="22"
							y={boxH / 2 + 5}
							textAnchor="middle"
							fontSize="14"
							fontWeight="800"
							fill={isFilledOrange ? "white" : step.borderColor}
							fontFamily={FONT}
						>
							{step.number}
						</text>
						{/* Label */}
						<text
							x={boxW / 2 + 10}
							y={boxH / 2 + 5}
							textAnchor="middle"
							fontSize="13"
							fontWeight="700"
							fill={isFilledOrange ? "white" : BLACK}
							fontFamily={FONT}
							letterSpacing="2"
						>
							{step.label}
						</text>
					</g>
				);
			})}
		</svg>
	);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 14. ResultsDashboardMini — Mini analytics dashboard with 3 card types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ResultsDashboardMini: React.FC<{ size?: number }> = ({
	size = 600,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Dashboard frame (0-6)
	const dashReveal = spring({
		frame,
		fps,
		from: 0.9,
		to: 1,
		config: { damping: 14, stiffness: 80 },
	});
	const dashOp = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		config: { damping: 14, stiffness: 60 },
	});

	// Top-left: Bar chart (4-10)
	const barDelays = [4, 6, 8];
	const barHeights = [50, 80, 110];

	// Top-right: Circular progress ring (8-14)
	const ringProgress = spring({
		frame: Math.max(0, frame - 8),
		fps,
		from: 0,
		to: 0.78,
		config: { damping: 18, stiffness: 40 },
	});
	const ringR = 38;
	const ringCirc = 2 * Math.PI * ringR;
	const percentNum = Math.round(ringProgress * 100);

	// Bottom: Line chart (12-18)
	const lineChartProg = spring({
		frame: Math.max(0, frame - 12),
		fps,
		from: 0,
		to: 1,
		config: { damping: 16, stiffness: 50 },
	});
	const linePoints = [
		{ x: 80, y: 70 },
		{ x: 150, y: 50 },
		{ x: 230, y: 60 },
		{ x: 350, y: 30 },
		{ x: 460, y: 15 },
	];

	// Metric labels (16-22)
	const labelReveal = spring({
		frame: Math.max(0, frame - 16),
		fps,
		from: 0,
		to: 1,
		config: { damping: 14, stiffness: 80 },
	});

	// Pulsing +12% badge (20+)
	const badgePulse =
		frame >= 20
			? 1 + 0.05 * Math.sin(frame * 0.15)
			: 0;
	const badgeReveal = spring({
		frame: Math.max(0, frame - 20),
		fps,
		from: 0,
		to: 1,
		config: { damping: 12, stiffness: 100 },
	});

	const cardPadding = 16;

	return (
		<svg width={size} height={size} viewBox="0 0 600 600">
			{/* Dashboard outer frame */}
			<rect
				x="50"
				y="80"
				width="500"
				height="440"
				rx="20"
				fill="#FAFAFA"
				stroke={LIGHT_GRAY}
				strokeWidth="1.5"
				opacity={dashOp}
			/>

			{/* Top-left card: Bar chart */}
			<g opacity={dashOp}>
				<rect
					x="70"
					y="100"
					width="220"
					height="180"
					rx="14"
					fill="white"
					stroke={LIGHT_GRAY}
					strokeWidth="1"
				/>
				<text
					x="85"
					y="124"
					fontSize="11"
					fontWeight="700"
					fill={GRAY}
					fontFamily={FONT}
					letterSpacing="1"
					opacity={labelReveal}
				>
					OPEN RATE
				</text>

				{barHeights.map((h, i) => {
					const barH = spring({
						frame: Math.max(0, frame - barDelays[i]),
						fps,
						from: 0,
						to: h,
						config: { damping: 14, stiffness: 60 },
					});
					return (
						<rect
							key={i}
							x={110 + i * 48}
							y={260 - barH}
							width="30"
							height={barH}
							rx="4"
							fill={i === 2 ? ORANGE : interpolate(i, [0, 1, 2], [0.4, 0.6, 1]) > 0.5 ? ORANGE : "#FFB088"}
							opacity={0.85}
						/>
					);
				})}
			</g>

			{/* Top-right card: Progress ring */}
			<g opacity={dashOp}>
				<rect
					x="310"
					y="100"
					width="220"
					height="180"
					rx="14"
					fill="white"
					stroke={LIGHT_GRAY}
					strokeWidth="1"
				/>
				<text
					x="325"
					y="124"
					fontSize="11"
					fontWeight="700"
					fill={GRAY}
					fontFamily={FONT}
					letterSpacing="1"
					opacity={labelReveal}
				>
					REPLY RATE
				</text>

				{/* Background ring */}
				<circle
					cx="420"
					cy="210"
					r={ringR}
					fill="none"
					stroke={LIGHT_GRAY}
					strokeWidth="8"
				/>
				{/* Progress ring */}
				<circle
					cx="420"
					cy="210"
					r={ringR}
					fill="none"
					stroke={GREEN}
					strokeWidth="8"
					strokeLinecap="round"
					strokeDasharray={ringCirc}
					strokeDashoffset={ringCirc * (1 - ringProgress)}
					transform="rotate(-90, 420, 210)"
				/>
				{/* Percentage number */}
				<text
					x="420"
					y="217"
					textAnchor="middle"
					fontSize="26"
					fontWeight="900"
					fill={BLACK}
					fontFamily={FONT}
				>
					{percentNum}%
				</text>
			</g>

			{/* Bottom card: Line chart spanning full width */}
			<g opacity={dashOp}>
				<rect
					x="70"
					y="300"
					width="460"
					height="200"
					rx="14"
					fill="white"
					stroke={LIGHT_GRAY}
					strokeWidth="1"
				/>
				<text
					x="85"
					y="325"
					fontSize="11"
					fontWeight="700"
					fill={GRAY}
					fontFamily={FONT}
					letterSpacing="1"
					opacity={labelReveal}
				>
					SENT
				</text>

				{/* Line chart segments */}
				{linePoints.map((pt, i) => {
					if (i === 0) return null;
					const prev = linePoints[i - 1];
					const segProg = interpolate(
						lineChartProg,
						[(i - 1) / (linePoints.length - 1), i / (linePoints.length - 1)],
						[0, 1],
						{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }
					);
					if (segProg <= 0) return null;
					return (
						<line
							key={i}
							x1={prev.x}
							y1={prev.y + 340}
							x2={prev.x + (pt.x - prev.x) * segProg}
							y2={prev.y + (pt.y - prev.y) * segProg + 340}
							stroke={GREEN}
							strokeWidth="2.5"
							strokeLinecap="round"
						/>
					);
				})}

				{/* Data point dots */}
				{linePoints.map((pt, i) => {
					const dotVis = interpolate(
						lineChartProg,
						[i / (linePoints.length - 1) - 0.05, i / (linePoints.length - 1) + 0.05],
						[0, 1],
						{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }
					);
					const isLast = i === linePoints.length - 1;
					return (
						<circle
							key={i}
							cx={pt.x}
							cy={pt.y + 340}
							r={isLast ? 5 : 3.5}
							fill={isLast ? GREEN : GREEN}
							opacity={dotVis}
						/>
					);
				})}
			</g>

			{/* +12% pulsing badge */}
			{badgeReveal > 0 && (
				<g
					transform={`translate(490, 320) scale(${badgePulse * badgeReveal})`}
					opacity={badgeReveal}
				>
					<rect x="-28" y="-12" width="56" height="24" rx="12" fill={GREEN} />
					<text
						x="0"
						y="5"
						textAnchor="middle"
						fontSize="12"
						fontWeight="800"
						fill="white"
						fontFamily={FONT}
					>
						+12%
					</text>
				</g>
			)}
		</svg>
	);
};
