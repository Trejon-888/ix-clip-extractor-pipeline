# Rules — Animation

---

## Do

- Use `useCurrentFrame()` + `useVideoConfig()` for ALL animations
- Write timing as `seconds * fps` (e.g., `0.5 * fps`, `2 * fps`), never raw frame numbers
- Clamp interpolations: `extrapolateRight: 'clamp'`, `extrapolateLeft: 'clamp'`
- Use the spring helper hooks (`useSmooth`, `useSnappy`, `useBouncy`, `useReveal`)
- Add subtle floating motion to hero illustrations: `Math.sin(frame / N) * amplitude`
- Use `linearTiming` for TransitionSeries transitions (predictable duration)
- Stagger list item entrances with incremental delays: `baseDelay + i * stepDelay`

## Don't

- Never use CSS transitions (`transition: ...`) — they don't render in Remotion
- Never use Tailwind `animate-*` or `transition-*` classes — they don't render
- Never hardcode frame numbers — always express as `seconds * fps`
- Never use `springTiming` for TransitionSeries — unpredictable total duration
- Never skip clamping on interpolations — values will overshoot
- Never put animation logic in `useEffect` — use `useCurrentFrame()` directly in render
