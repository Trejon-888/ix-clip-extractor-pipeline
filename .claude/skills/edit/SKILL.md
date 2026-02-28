---
name: edit
description: "Edit a video using the video-editing orchestrator. Detects format, routes to correct editing skill, and executes the full process. Use when user says: /edit, edit video, edit clip, edit this, make it polished, finish editing, polish this video."
metadata:
  category: video-production
  version: 3.0
---

# /edit — Video Editing Entry Point

Single command to enter the video editing process correctly. Detects format, loads the right skill, and executes.

---

## Phase 0: LOAD PROCESS GUIDE (Non-Negotiable)

**RULE:** Before touching any code, load the orchestrator and detect format.

1. Read `.claude/skills/video-editing/SKILL.md` — the router (shared component library, rules, brand assets)
2. Read `remotion/lib/config.ts` — FPS (30) and resolution presets
3. Read `remotion/lib/colors.ts` — brand color palette

---

## Phase 1: IDENTIFY THE VIDEO

| Question | How to Find Out |
|----------|----------------|
| What video file? | User provides path or check `ix-content-vault/04-production/` |
| What duration? | `ffprobe` or check production tracking file |
| Does it have a transcript? | Check for `*_whisperx.srt` alongside video, or `remotion/data/*-words.ts` |
| Is it already registered in Remotion? | Check `remotion/Root.tsx` |

---

## Phase 2: DETECT FORMAT & LOAD SUB-SKILL

**Step 1: Detect format by duration**

| Duration | Format | Pop-Out Density | Route To |
|----------|--------|----------------|----------|
| **< 90 seconds** | Short-form | **5-8** (pipeline), **4-6** (standalone), **8-12** (announcement) — A+B tier scored | `.claude/skills/short-form-editing/SKILL.md` |
| **5+ minutes** | Long-form | **20-30** (A+B tier scored) | `.claude/skills/long-form-editing/SKILL.md` |

**Step 2: Load the sub-skill and study the gold standard**

| Format | Sub-Skill | Gold Standard |
|--------|-----------|---------------|
| Long-form (5+ min) | `long-form-editing/SKILL.md` | `CraftingOutreachCampaign.tsx` (28min, 35+ pop-outs) or `ClaudeCreatives.tsx` (FloatingKeyword style) |
| Short-form pipeline | `short-form-editing/SKILL.md` | `Clip1FromZeroTo90K.tsx` (76s, **8 pop-outs, ~8s spacing** — the comfortable benchmark) |
| Short-form standalone | `short-form-editing/SKILL.md` | `Clip6VoiceControlDemoV3.tsx` (70s, v2 tier system) |
| Announcement | `short-form-editing/SKILL.md` | `ClaudeOpus46Announcement.tsx` (130s, 18 pop-outs) |

**RULE:** The video format determines EVERYTHING — component choices, pop-out density, caption style, zoom, SFX strategy. Get this right first.

---

## Phase 3: EXECUTE THE SUB-SKILL PROCESS

Follow the loaded sub-skill's phased process in order. Do NOT skip or reorder.

**Long-form (7 phases):**
1. Transcript Analysis → Identify edit points, score each A/B/C, select 20-30 (A+B only)
2. Asset Inventory → real content > illustrations
3. Pop-Out Planning → V4 illustration-first (ConceptOverlay, 800px, no text default)
4. Create Illustrations → parallel agents, split files
5. SFX Strategy → variety per pop-out type
6. Caption System → word-by-word, hide during overlays
7. Assembly & Verification → compile, validate timing

**Short-form (7 phases):**
1. Transcript Analysis → identify hook, core message, CTA; score each potential pop-out A/B/C
2. Asset Inventory → logos, audio, source content
3. Pop-Out Planning → tier system (standalone) or ConceptOverlay-first (pipeline)
4. Create Illustrations → inline in composition file
5. SFX Strategy → J-cut, collision handling
6. Caption System → PhraseCaption or custom word captions
7. Assembly & Verification → standalone composition, register

---

## Phase 4: COMPOSITION ARCHITECTURE

**RULE:** Always create a **standalone composition** file.

```
remotion/compositions/{CompositionName}.tsx
```

**Why:** Passing JSX through defaultProps causes serialization errors. All illustrations defined at module level.

---

## Phase 5: VERIFY & PREVIEW

1. Run `npx tsc --noEmit` — zero errors
2. Kill node processes: `powershell -Command "Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force"`
3. Start studio: `npx remotion studio remotion/index.ts`
4. Review checklist:
   - [ ] Captions sync with speech
   - [ ] Pop-outs appear at correct moments (when word is spoken)
   - [ ] Pop-outs don't overlap each other
   - [ ] SFX complement, don't distract
   - [ ] CTA is visible and clear
   - [ ] Background music barely audible (0.02)

---

## Phase 6: VAULT PIPELINE UPDATE

1. Update `ix-content-vault/04-production/` — mark as "Composition built"
2. Create/update `ix-content-vault/05-review/` — with review checklist
3. After approval: render, post, track in `ix-content-vault/06-published/`

---

## Non-Negotiable Rules

1. **ALWAYS load the router + sub-skill first** — Phase 0 is non-negotiable
2. **ALWAYS detect format** — Duration determines everything
3. **ALWAYS use standalone compositions** — Never pass JSX through defaultProps
4. **ALWAYS use real assets first** — Check `public/logos/` before creating SVG illustrations
5. **ALWAYS use frame-precise timing** — From WORDS data or SRT × 30fps
6. **NEVER estimate timing** — Always calculate from transcript data
7. **premountFor={fps}** on every `<Sequence>`
8. **Background music at 0.02** — Never above 0.04
9. **Content videos muted** — `volume={0}` always
10. **Pop-out at EXACT frame** keyword is spoken
11. **Visual Restraint** — Score every pop-out A/B/C before adding. See router SKILL.md for Impact Score + Visual Treatment Hierarchy. When in doubt, cut.

---

## References

| File | Purpose |
|------|---------|
| `.claude/skills/video-editing/SKILL.md` | **Router** — shared component library, rules, brand assets |
| `.claude/skills/long-form-editing/SKILL.md` | **Long-form process** — V4 illustration-first, 20-30 scored pop-outs |
| `.claude/skills/short-form-editing/SKILL.md` | **Short-form process** — pipeline/standalone/announcement |
| `remotion/compositions/CraftingOutreachCampaign.tsx` | Long-form gold standard |
| `remotion/compositions/Clip6VoiceControlDemoV3.tsx` | Short-form standalone gold standard |
| `remotion/compositions/Clip1FromZeroTo90K.tsx` | Pipeline clip gold standard |
| `remotion/compositions/ClaudeOpus46Announcement.tsx` | Announcement gold standard |

---

## Evolution Check (End of Every Invocation)

1. Did this edit reveal a new pattern? → Update the relevant sub-skill
2. Did a new illustration type get created? → Add to library reference
3. Was the routing wrong? → Update the router
4. Did the user manually adjust something? → Flag as skill expansion opportunity

---

*Version: 3.1 | Updated: 2026-02-23 | Visual Restraint: Impact Score (A/B/C) + Visual Treatment Hierarchy (heavy/medium/light). Density: pipeline 5-8, standalone 4-6, announcement 8-12, long-form 20-30. Min spacing: 7 seconds.*
