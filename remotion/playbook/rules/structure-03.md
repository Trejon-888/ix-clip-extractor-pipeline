# Rules — Composition Structure

---

## Do

- Register every composition in `Root.tsx` with correct `durationInFrames`
- Calculate total duration: scene frames minus transition overlap frames
- Use `TransitionSeries` for multi-scene compositions
- Keep scene components as separate `const` functions (not inline JSX)
- Define design tokens in a `C` object at the top of the file
- Type all props with explicit TypeScript types
- Preview in Remotion Studio before rendering
- Render with `--codec h264` for universal compatibility

## Don't

- Never forget to update `durationInFrames` in Root.tsx when changing scenes/transitions
- Never render without previewing in Studio first
- Never create a composition without registering it in Root.tsx
