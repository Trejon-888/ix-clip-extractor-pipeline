# Rules — Visual

---

## Do

- **Center all scene content vertically** — use `justifyContent: "center"` on the scene wrapper, never rely on padding to position content
- Make text and elements large enough to read on mobile — headlines 42px+, body 24px+
- Use inline SVG for all icons and illustrations — hand-drawn style with thick black strokes and lime green accents
- Use clean off-white background (`#FAFAF8`) as the default
- Load fonts via `@remotion/google-fonts` — Inter for text, Space Grotesk for labels
- Use accent blobs (`filter: blur()`) for subtle depth — never flat backgrounds
- Give cards/containers: white bg, light border, subtle shadow, rounded corners (12-16px)
- Use `<Img>` from `remotion` for all images (never native `<img>` or CSS `background-image`)
- Use `staticFile()` for local assets in `public/`

## Don't

- Never use top/bottom padding to position scene content — it pushes content to the top-left corner instead of centering
- Never make elements too small — portrait videos are viewed on mobile, everything must be bold and readable
- Never use emojis — always create hand-drawn SVG icons
- Never use system fonts (`sans-serif`, `system-ui`, `monospace`) — always `@remotion/google-fonts`
- Never use dark/black backgrounds as default — established look is off-white `#FAFAF8`
- Never use the old purple/dark theme (`#06040c`, `#a855f7`) — deprecated v1
- Never use native `<img>` elements — always `<Img>` from remotion
- Never use CSS `background-image` — use the `<Img>` component
