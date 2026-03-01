# Style Library

Searchable index of all visual styles. During editing, the AI reads this to match user preferences to the right style, then loads the full style file for color palette, typography, illustrations, animation springs, and component compatibility.

---

## Available Styles

| ID | Name | Energy | Mood | Best For | File |
|----|------|--------|------|----------|------|
| freehand-illustrated | Freehand Illustrated | medium | warm | tutorials, how-tos, friendly demos | `freehand-illustrated-01.md` |
| stippled-editorial | Stippled Editorial | high | authoritative | announcements, thought-leadership, bold reveals | `stippled-editorial-02.md` |
| high-contrast-editorial | High-Contrast Editorial | high | authoritative-minimal | product launches, brand statements, premium reveals | `high-contrast-editorial-03.md` |
| minimalist-beta-capture | Minimalist Beta Capture | low-medium | premium, elite | beta launches, exclusive reveals, technical products | `minimalist-beta-capture-04.md` |
| lumina-neo-brutalist | Lumina Neo-Brutalist | high | confident, playful | SaaS launches, feature reveals, product marketing | `lumina-neo-brutalist-05.md` |
| kinetic-orange | Kinetic Orange | very-high | urgent, technical | agency reels, service showcases, high-energy promos | `kinetic-orange-07.md` |

---

## Style Selection Guide

| User Says | Recommended Style |
|-----------|------------------|
| "clean", "minimal", "friendly", "warm" | freehand-illustrated |
| "bold", "dark", "editorial", "textured" | stippled-editorial |
| "swiss", "high-contrast", "luxury", "brutalist" | high-contrast-editorial |
| "obsidian", "dark premium", "elite", "technical dark" | minimalist-beta-capture |
| "neo-brutalist", "yellow", "playful bold", "SaaS" | lumina-neo-brutalist |
| "kinetic", "aggressive", "orange brutalist", "high-energy" | kinetic-orange |
| nothing / "default" / "orange" | Default INFINITX orange (`remotion/lib/colors.ts`) |

---

## Adding a New Style

When a new design is provided from SuperDesign.dev:

1. Create `{slug}-{nn}.md` in this directory
2. Follow the existing format — must include all sections:
   - Color Palette (with `const C = { ... }` block)
   - Typography (font hierarchy table)
   - Illustrations (stroke style, fill approach, sizing)
   - Animation Springs (preferred spring configs)
   - Background Treatment (base + decorative elements)
   - Scene Transitions (transition type preferences)
   - Cards & Containers (card styling specs)
   - Component Preferences (compatibility table — see below)
3. Add a row to the Available Styles table above
4. Update `remotion/playbook/components/_index.md` Style Compatibility Matrix

### Required: Component Preferences Section

Every style MUST include a Component Preferences table mapping each Remotion component to a compatibility level:

| Compat Level | Meaning |
|-------------|---------|
| PRIMARY | This is the go-to component for this style |
| HIGH | Works well, may need minor config overrides |
| MEDIUM | Usable with significant config changes |
| LOW | Clashes with this style's aesthetic — avoid |

Example:
```
| Component | Compat | Config Override |
|-----------|--------|----------------|
| ConceptOverlay (solid-white) | PRIMARY | bg matches C.bg |
| ConceptOverlay (dark-blur) | LOW | clashes with light aesthetic |
| AppleStylePopup | HIGH | accentColor: C.accent |
| FloatingKeyword | HIGH | text: C.ink, accent: C.accentDark |
| FloatingCard | HIGH | bg: C.white, border: C.stroke |
```
