# Remotion Components Reference

Complete guide to all available Remotion components for video editing compositions.

---

## Caption Components

### FullWidthCaption
**Use:** Modern full-width centered captions (preferred for Script17ShortFormV9 style)
```tsx
<FullWidthCaption word="hello" emphasis={false} />
```
**Props:**
- `word: string` — The word to display
- `emphasis: boolean` — If true, styles as emphasis word

**Style:** White text, centered, full width, subtle shadow

---

### OrangeWordCaption
**Use:** Orange accent word captions (used in Script19OutreachIgnoredV4)
```tsx
<OrangeWordCaption word="infrastructure" emphasis={true} />
```
**Props:**
- `word: string` — The word to display
- `emphasis: boolean` — If true, larger size + bold

**Style:** Orange `#FF6B35`, bold weight, centered

---

### BottomCaption
**Use:** Traditional bottom-third captions
```tsx
<BottomCaption word="example" />
```
**Props:**
- `word: string` — The word to display

**Style:** Bottom-positioned, white text, dark background

---

### CleanWordCaption
**Use:** Minimal clean captions
```tsx
<CleanWordCaption word="simple" emphasis={false} />
```
**Props:**
- `word: string`
- `emphasis: boolean`

**Style:** Simple white text, no background

---

### WordByWordCaption
**Use:** Legacy word-by-word caption system (deprecated — use FullWidthCaption instead)

---

### CaptionOverlay
**Use:** Full sentence overlay captions (deprecated for word-by-word)

---

## Illustration & B-Roll Components

### BigIllustrationReveal
**Use:** Large 700px illustrations with caption labels (Script17ShortFormV9 pattern)
```tsx
<BigIllustrationReveal
  illustration="fragmented-tools"
  durationInFrames={50}
  caption="DUCT-TAPING TOOLS"
/>
```
**Props:**
- `illustration: OrangeIllustrationType` — Which illustration to show
- `durationInFrames: number` — How long to display
- `caption?: string` — Optional label (concept-specific, not generic)

**Animation:** Scale up from 0.8 to 1.0, fade in

**Available illustrations:**
- `fragmented-tools`
- `leads`
- `email`
- `ai-brain`
- `broken-connection`
- `spam`
- `unified-system`
- `outreach`
- `calendar`
- `engine`
- `success`

---

### BRollIllustration
**Use:** Standard 550-650px B-roll overlays (Script19OutreachIgnoredV4)
```tsx
<BRollIllustration
  type="email"
  durationInFrames={60}
/>
```
**Props:**
- `type: IllustrationType` — Illustration type
- `durationInFrames: number`

**Size:** 650px for portrait format

---

### OrangeIllustrationReveal
**Use:** Orange-themed illustration reveals
```tsx
<OrangeIllustrationReveal
  type="ai-brain"
  durationInFrames={45}
/>
```
**Props:**
- `type: OrangeIllustrationType`
- `durationInFrames: number`

**Style:** Orange illustrations with reveal animation

---

### CleanIllustrationReveal
**Use:** Minimal clean-style illustrations
```tsx
<CleanIllustrationReveal
  type="leads"
  durationInFrames={40}
/>
```

---

### IllustrationReveal
**Use:** Generic illustration reveal (legacy)

---

### LargeIllustrationReveal
**Use:** Extra-large illustration overlays (for emphasis)

---

## Structure & Section Components

### CornerSectionBadge
**Use:** Top-left corner section markers (Script17ShortFormV9 improvement)
```tsx
<CornerSectionBadge
  label="01"
  subtitle="THE PROBLEM"
  durationInFrames={40}
/>
```
**Props:**
- `label: string` — Section number
- `subtitle: string` — Section title
- `durationInFrames: number`

**Position:** Top-left corner (less intrusive than center)

**Animation:** Fade in + slide from left

---

### SectionBadge
**Use:** Center section markers (older pattern)
```tsx
<SectionBadge label="02" subtitle="SOLUTION" />
```
**Props:**
- `label: string`
- `subtitle: string`

**Position:** Center screen

---

### SectionBadgeTransparent
**Use:** Transparent variant of section badge

---

### TransitionFlash
**Use:** White flash for section transitions (8 frames)
```tsx
<TransitionFlash />
```
**Props:** None (fixed duration)

**Effect:** Full-screen white flash, fades out in 8 frames

**Usage:** Always pair with section badges
```tsx
<Sequence from={234} durationInFrames={8}>
  <TransitionFlash />
</Sequence>
<Sequence from={234} durationInFrames={40} premountFor={fps}>
  <CornerSectionBadge label="01" subtitle="THE PROBLEM" durationInFrames={40} />
</Sequence>
```

---

### FrostedNumberBoxes
**Use:** "3 things missing" number reveal (Script19OutreachIgnoredV4)
```tsx
<FrostedNumberBoxes durationInFrames={42} />
```
**Props:**
- `durationInFrames: number`

**Animation:** 3 boxes pop in sequentially

---

## Hook & Outro Components

### IntroCard
**Use:** Hook overlay that appears on top of video (Script19OutreachIgnoredV4 pattern)
```tsx
<Sequence from={0} durationInFrames={75} premountFor={fps}>
  <IntroCard durationInFrames={75} />
</Sequence>
```
**Props:**
- `durationInFrames: number`

**Content:** "99% COLD MESSAGES GET IGNORED" (customize per video)

**Rule:** Video starts at frame 0, intro card overlays on top (backlog-01.md Rule #9)

---

### OutroCTA
**Use:** End card with logo + CTA + visual proof (Script19OutreachIgnoredV4)
```tsx
<Sequence from={2240} durationInFrames={80} premountFor={fps}>
  <OutroCTA durationInFrames={80} />
</Sequence>
```
**Props:**
- `durationInFrames: number`

**Components:**
- IX logo reveal
- Headline + benefit text
- Screenshot or visual proof
- "LINK IN BIO" badge

**Rule:** Every video needs an outro CTA (backlog-01.md Rule #10)

---

### Script17IntroHook
**Use:** Script17-specific intro hook

---

### Script17CTA
**Use:** Script17-specific CTA end card

---

### Script17IntroOverlay
**Use:** Script17 intro overlay variant

---

### Script17OutroCTA
**Use:** Script17 outro variant

---

## Special Effect Components

### IXLogoReveal
**Use:** IX logo reveal animation
```tsx
<Sequence from={715} durationInFrames={70} premountFor={fps}>
  <IXLogoReveal durationInFrames={70} />
</Sequence>
```
**Props:**
- `durationInFrames: number`

**Animation:** Logo scales in with glow effect

---

### ScreenshotReveal
**Use:** Screenshot reveal with camera shutter effect
```tsx
<Sequence from={758} durationInFrames={60} premountFor={fps}>
  <ScreenshotReveal
    durationInFrames={60}
    imageSrc="ix-campaign-screenshot.png"
  />
</Sequence>
```
**Props:**
- `durationInFrames: number`
- `imageSrc: string` — Filename in `public/`

**Animation:** Shutter flash + screenshot scales in

---

### PersonalizationCompare
**Use:** Bad vs good message comparison (Script19OutreachIgnoredV4)
```tsx
<Sequence from={932} durationInFrames={90} premountFor={fps}>
  <PersonalizationCompare durationInFrames={90} />
</Sequence>
```
**Props:**
- `durationInFrames: number`

**Content:** Shows "Hi, [first name]. No." vs proper personalized message

---

### IXCampaignScreenshot
**Use:** IX Campaign Builder screenshot reveal
```tsx
<IXCampaignScreenshot durationInFrames={70} />
```

---

### DisconnectedToolsVisual
**Use:** "5 logins, 5 dashboards, nothing connected" visual (Script17ShortFormV9)
```tsx
<Sequence from={473} durationInFrames={120} premountFor={fps}>
  <DisconnectedToolsVisual durationInFrames={120} />
</Sequence>
```
**Props:**
- `durationInFrames: number`

**Content:** Animated text revealing disconnected tools problem

---

### JugglingPainPoint
**Use:** "Tired of juggling" pain point visual (Script17ShortFormV9)
```tsx
<Sequence from={1782} durationInFrames={150} premountFor={fps}>
  <JugglingPainPoint durationInFrames={150} />
</Sequence>
```
**Props:**
- `durationInFrames: number`

**Content:** Animated juggling visual + pain point text

---

## Video & Camera Components

### FaceCenteredVideo
**Use:** Portrait crop with face-centered positioning (Script19OutreachIgnoredV4)
```tsx
<FaceCenteredVideo
  videoSrc="script-19-outreach-ignored-kf.mp4"
  startFrom={Math.round(seg.videoStart * fps)}
  transform={FACE_TRANSFORM}
  containerSize={{ width: 1080, height: 1920 }}
  originalSize={{ width: 1920, height: 1080 }}
/>
```
**Props:**
- `videoSrc: string` — Video filename (use `-kf.mp4` keyframed version)
- `startFrom: number` — Start frame
- `transform: { scale, translateX, translateY }` — Face-centering transform
- `containerSize: { width, height }` — Output dimensions
- `originalSize: { width, height }` — Source video dimensions

**Purpose:** Converts landscape video to portrait by cropping and centering on face

---

### DynamicZoomWrapper
**Use:** Keyframe-based zoom animation for energy (Script19OutreachIgnoredV4, Script17ShortFormV9)
```tsx
<DynamicZoomWrapper keyframes={ZOOM_KEYFRAMES}>
  <div style={{ filter: "brightness(1.03) contrast(1.08) saturate(1.05)" }}>
    <OffthreadVideo src={staticFile(videoSrc)} />
  </div>
</DynamicZoomWrapper>
```
**Props:**
- `keyframes: ZoomKeyframe[]` — Array of `{ frame, zoom }` objects
- `children: ReactNode` — Video or content to zoom

**Zoom range:** 1.0 to 1.08 (never higher — backlog-01.md)

**Example keyframes:**
```typescript
const ZOOM_KEYFRAMES: ZoomKeyframe[] = [
  { frame: 0, zoom: 1.0 },
  { frame: 80, zoom: 1.04 },
  { frame: 234, zoom: 1.06 },
  { frame: 512, zoom: 1.08 },
  { frame: 715, zoom: 1.0 },
];
```

---

### ZoomWrapper
**Use:** Legacy zoom wrapper (deprecated — use DynamicZoomWrapper)

---

### VignetteOverlay
**Use:** Vignette overlay effect

**Warning:** Tried & rejected (backlog-01.md) — darkens speaker face, looks unnatural. Use CSS filter on video layer instead.

---

## Audio Components

### AudioSFXTrigger
**Use:** Sound effect player for SFX events
```tsx
<Sequence from={234} durationInFrames={15}>
  <AudioSFXTrigger frame={0} volume={0.18} sfxFile="whoosh-effect-382717.mp3" />
</Sequence>
```
**Props:**
- `frame: number` — Frame to trigger (usually 0 within Sequence)
- `volume: number` — Volume level (0.0 to 1.0)
- `sfxFile: string` — Filename in `public/sfx/`

**Available SFX:**
- Whoosh (3 variants):
  - `whoosh-effect-382717.mp3`
  - `whoosh-bamboo-389752.mp3`
  - `whoosh-large-sub-384631.mp3`
- Pop: `pop-402324.mp3`
- Click: `mouse-click-290204.mp3`

**Volume guidelines:**
- Whoosh: 0.14-0.20
- Pop: 0.20-0.25
- Click: 0.20-0.25

---

## Text & Typography Components

### BigTextReveal
**Use:** Large text reveal animation
```tsx
<BigTextReveal text="INFRASTRUCTURE" durationInFrames={40} />
```

---

### DisconnectedToolsText
**Use:** Text variant of disconnected tools (Script17)

---

## Conversation & Chat Components

### ChatBubbleConversation
**Use:** Animated chat bubble conversation
```tsx
<ChatBubbleConversation durationInFrames={90} />
```

---

## Diagram & Visualization Components

### OrbitalDiagram
**Use:** Orbital diagram visualization
```tsx
<OrbitalDiagram durationInFrames={80} />
```

---

### ConceptIconReveal
**Use:** Icon reveal for concepts
```tsx
<ConceptIconReveal icon="leads" durationInFrames={45} />
```

---

## Legacy & Deprecated Components

### TitleSlide
**Use:** Title slide (deprecated for short-form)

---

### SmoothCardReveal
**Use:** Card reveal animation (deprecated)

---

### Script17* Components
**Use:** Script17-specific components (use generic equivalents for new videos)

- `Script17Intro3D`
- `Script17IntroCard`
- `Script17IntroCardV2`
- `Script17CinematicIntro`
- `Script17FrostedBoxes`
- `Script17FrostedBoxesOrange`
- `Script17NumberBoxes`

---

## Component Usage Patterns

### Pattern 1: Layered Composition (12 layers)

```tsx
<AbsoluteFill style={{ backgroundColor: "#0D0D0D" }}>
  {/* Layer 1: Video */}
  <DynamicZoomWrapper keyframes={ZOOM_KEYFRAMES}>
    <OffthreadVideo ... />
  </DynamicZoomWrapper>

  {/* Layer 2: Intro Hook */}
  <Sequence from={0} durationInFrames={75} premountFor={fps}>
    <IntroCard durationInFrames={75} />
  </Sequence>

  {/* Layer 3: Captions */}
  {visibleCaptions.map(...)}

  {/* Layer 4: Section Badges */}
  {SECTION_TRANSITIONS.map(...)}

  {/* Layer 5: Illustrations */}
  {ILLUSTRATION_EVENTS.map(...)}

  {/* Layer 6: Outro CTA */}
  <Sequence from={OUTRO_START} durationInFrames={80} premountFor={fps}>
    <OutroCTA durationInFrames={80} />
  </Sequence>

  {/* Layer 7: SFX */}
  {SFX_EVENTS.map(...)}
</AbsoluteFill>
```

---

### Pattern 2: Section Badge + Flash

```tsx
{SECTION_TRANSITIONS.map((section) => (
  <React.Fragment key={`section-${section.label}`}>
    {/* Flash first (8 frames) */}
    <Sequence from={section.frame} durationInFrames={8}>
      <TransitionFlash />
    </Sequence>
    {/* Badge overlays flash */}
    <Sequence from={section.frame} durationInFrames={40} premountFor={fps}>
      <CornerSectionBadge
        label={section.label}
        subtitle={section.subtitle}
        durationInFrames={40}
      />
    </Sequence>
  </React.Fragment>
))}
```

---

### Pattern 3: Caption with Overlay Hiding

```tsx
// Build overlay ranges
const overlayRanges = getOverlayRanges(); // All illustration/badge/CTA ranges

// Filter captions
const visibleCaptions = WORDS.filter(word => {
  return !isFrameInOverlay(word.frame, overlayRanges);
});

// Render visible captions only
{visibleCaptions.map(wordEntry => (
  <Sequence
    key={`cap-${wordEntry.id}`}
    from={wordEntry.frame}
    durationInFrames={Math.max(wordEntry.duration, 4)}
  >
    <FullWidthCaption word={wordEntry.word} emphasis={wordEntry.emphasis} />
  </Sequence>
))}
```

---

### Pattern 4: B-Roll Illustration Timing

```tsx
const ILLUSTRATION_EVENTS = [
  // Align to exact frame where concept is spoken
  { frame: 235, duration: 50, type: "fragmented-tools", caption: "DUCT-TAPING TOOLS" },
  { frame: 290, duration: 35, type: "leads", caption: "ONE TOOL FOR LEADS" },
  // Space at least 100 frames apart
  { frame: 604, duration: 45, type: "broken-connection", caption: "SOMETHING BROKE" },
];

{ILLUSTRATION_EVENTS.map((illust, i) => (
  <Sequence
    key={`illust-${i}`}
    from={illust.frame}
    durationInFrames={illust.duration}
    premountFor={fps}
  >
    <BigIllustrationReveal
      illustration={illust.type}
      durationInFrames={illust.duration}
      caption={illust.caption}
    />
  </Sequence>
))}
```

---

### Pattern 5: SFX Strategy (Max 10-20)

```tsx
const SFX_EVENTS = [
  // Intro punch
  { frame: 5, sfx: "whoosh-effect-382717.mp3", volume: 0.18 },
  // Section transitions (whoosh, rotate variants)
  { frame: 234, sfx: "whoosh-bamboo-389752.mp3", volume: 0.20 },
  { frame: 873, sfx: "whoosh-large-sub-384631.mp3", volume: 0.18 },
  // B-roll (whoosh, first appearance only)
  { frame: 350, sfx: "whoosh-effect-382717.mp3", volume: 0.15 },
  // Emphasis words (click, max 5-7)
  // ... defined separately via CLICK_WORD_IDS
];

{SFX_EVENTS.map((evt, i) => (
  <Sequence key={`sfx-${i}`} from={evt.frame} durationInFrames={15}>
    <AudioSFXTrigger frame={0} volume={evt.volume} sfxFile={evt.sfx} />
  </Sequence>
))}
```

---

## Critical Rules

1. **premountFor={fps}** on every Sequence (prevents flash)
2. **staticFile()** resolves from ROOT `public/` only
3. **Restart studio** after adding new static files
4. **Use `<Img>` from remotion**, never `<img>` or CSS background-image
5. **Max 10-20 SFX** per video (strategic, not spammy)
6. **Overlays need opaque backgrounds** to cover captions
7. **Every video needs outro CTA** (logo + headline + proof + badge)

---

*Component reference version: 1.0 | Created: 2026-02-03 | 48 components documented*
