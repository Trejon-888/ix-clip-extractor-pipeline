# Execution Roadmap: 20 → 95/100

## Current Issues (Why it's 20/100):

1. ❌ Content doesn't fill the frame (too small)
2. ❌ Using screenshots instead of real videos
3. ❌ No blur effects on background
4. ❌ No sound effects
5. ❌ No dynamic transitions
6. ❌ Not thinking like an editor (just placing assets)

---

## The Fix (Step by Step):

### PHASE 1: Download Real Content (30 min)

**1.1 Official Anthropic Skills Video:**
```bash
# Install yt-dlp if not installed
pip install yt-dlp

# Download "Claude Agent Skills Explained"
yt-dlp "https://www.youtube.com/watch?v=fOxC44g8vig" \
  -f "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]" \
  -o "public/official-content/claude-skills-explained-full.mp4"

# Extract opening clip (0-10s)
ffmpeg -ss 0 -i public/official-content/claude-skills-explained-full.mp4 \
  -t 10 -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -movflags +faststart \
  public/official-content/skills-announcement-10s.mp4

# Extract demo clip (if video shows demo at ~30s mark)
ffmpeg -ss 30 -i public/official-content/claude-skills-explained-full.mp4 \
  -t 15 -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -movflags +faststart \
  public/official-content/skills-demo-15s.mp4
```

**1.2 Framework Comparison Content:**
```bash
# Search for videos comparing frameworks
yt-dlp ytsearch:"LangChain vs CrewAI vs Pydantic AI" \
  -f "best[height<=720]" \
  --max-downloads 1 \
  -o "public/social-proof/framework-comparison.mp4"

# Extract 10s clip
ffmpeg -ss 5 -i public/social-proof/framework-comparison.mp4 \
  -t 10 -c copy public/social-proof/framework-comparison-10s.mp4
```

---

### PHASE 2: Create Proper Visual Components (1 hour)

**2.1 Full-Frame Content Component:**

Create `remotion/components/FullFrameContent.tsx`:
```typescript
import { Img, Video, staticFile, useCurrentFrame, interpolate } from 'remotion';
import React from 'react';

interface FullFrameContentProps {
  type: 'image' | 'video';
  src: string;
  caption?: string;
  blurBackground?: boolean;
  scaleContent?: number; // Default 1.0, use 0.9 for slight breathing room
}

export const FullFrameContent: React.FC<FullFrameContentProps> = ({
  type,
  src,
  caption,
  blurBackground = false,
  scaleContent = 0.95,
}) => {
  const frame = useCurrentFrame();

  // Entry animation (scale up from 0.8 to final scale)
  const scale = interpolate(frame, [0, 15], [0.8, scaleContent], {
    extrapolateRight: 'clamp',
  });

  // Opacity fade in
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: blurBackground ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
      backdropFilter: blurBackground ? 'blur(20px)' : 'none',
      padding: '40px',
    }}>
      {/* Content */}
      <div style={{
        transform: `scale(${scale})`,
        opacity,
        maxWidth: '95%',
        maxHeight: caption ? '80%' : '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {type === 'video' ? (
          <Video
            src={staticFile(src)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        ) : (
          <Img
            src={staticFile(src)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        )}
      </div>

      {/* Caption */}
      {caption && (
        <div style={{
          marginTop: '30px',
          fontSize: '48px',
          fontWeight: 900,
          color: '#FF7614',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          textShadow: '0 4px 20px rgba(255, 118, 20, 0.5)',
        }}>
          {caption}
        </div>
      )}
    </div>
  );
};
```

**2.2 Logo Reveal Component:**

Create `remotion/components/LogoReveal.tsx`:
```typescript
import { Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import React from 'react';

export const LogoReveal: React.FC<{
  logos: Array<{ src: string; name: string }>;
  durationPerLogo: number;
}> = ({ logos, durationPerLogo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentIndex = Math.floor(frame / durationPerLogo) % logos.length;
  const currentLogo = logos[currentIndex];
  const logoFrame = frame % durationPerLogo;

  // Spring animation for pop-in effect
  const scale = spring({
    frame: logoFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
    },
  });

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
    }}>
      <div style={{
        transform: `scale(${scale})`,
        width: '500px',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Img
          src={staticFile(currentLogo.src)}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      <div style={{
        fontSize: '56px',
        fontWeight: 800,
        color: '#FF7614',
        textTransform: 'uppercase',
      }}>
        {currentLogo.name}
      </div>
    </div>
  );
};
```

---

### PHASE 3: Add Sound Effects System (30 min)

**3.1 Create SFX Component:**

Create `remotion/components/SFXTrigger.tsx`:
```typescript
import { Audio, staticFile } from 'remotion';
import React from 'react';

export const SFXTrigger: React.FC<{
  triggerFrame: number;
  sfxFile: string;
  volume?: number;
}> = ({ sfxFile, volume = 0.2 }) => {
  return (
    <Audio
      src={staticFile(sfxFile)}
      volume={volume}
    />
  );
};
```

**3.2 Download Sound Effects:**
```bash
# Free sound effects from Pixabay or similar
mkdir -p public/sfx

# Download whoosh, pop, click sounds
# Or use existing ones from public/audio/
```

---

### PHASE 4: Rebuild Composition (2 hours)

**4.1 New Composition Structure:**

Create `ProgressiveDisclosureSkillsV5.tsx`:

```typescript
import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig, OffthreadVideo, staticFile } from 'remotion';
import { FullFrameContent } from '../components/FullFrameContent';
import { LogoReveal } from '../components/LogoReveal';
import { SFXTrigger } from '../components/SFXTrigger';
import { WORDS } from '../data/progressive-disclosure-cut-words';

export const ProgressiveDisclosureSkillsV5: React.FC<{ videoSrc: string }> = ({ videoSrc }) => {
  const { fps } = useVideoConfig();

  // SECTION 1: Official Anthropic announcement (0-10s)
  const ANNOUNCEMENT_START = 0;
  const ANNOUNCEMENT_DURATION = 300; // 10s @ 30fps

  // SECTION 2: Multi-framework reveal (10-20s)
  const FRAMEWORKS_START = 300;
  const FRAMEWORKS_DURATION = 300;

  const frameworks = [
    { src: 'logos/claude-logo.png', name: 'CLAUDE' },
    { src: 'logos/langchain-logo.png', name: 'LANGCHAIN' },
    { src: 'logos/crewai-logo.png', name: 'CREWAI' },
    { src: 'logos/pydantic-ai-logo.png', name: 'PYDANTIC AI' },
  ];

  // SECTION 3: Progressive disclosure explanation (20-40s)
  const EXPLANATION_START = 600;
  const EXPLANATION_DURATION = 600;

  // Continue for full 111 seconds...

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0A' }}>

      {/* TOP ZONE: Dynamic content (55% height) */}
      <div style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '46%',
        backgroundColor: '#1A1A1A',
        overflow: 'hidden',
      }}>

        {/* SECTION 1: Official video */}
        <Sequence from={ANNOUNCEMENT_START} durationInFrames={ANNOUNCEMENT_DURATION}>
          <FullFrameContent
            type="video"
            src="official-content/skills-announcement-10s.mp4"
            caption="ANTHROPIC ANNOUNCES SKILLS"
            blurBackground={false}
            scaleContent={1.0}
          />
        </Sequence>

        {/* SFX: Whoosh on entry */}
        <Sequence from={ANNOUNCEMENT_START}>
          <SFXTrigger
            triggerFrame={0}
            sfxFile="audio/whoosh-effect-382717.mp3"
            volume={0.18}
          />
        </Sequence>

        {/* SECTION 2: Framework logos */}
        <Sequence from={FRAMEWORKS_START} durationInFrames={FRAMEWORKS_DURATION}>
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(15px)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
            <LogoReveal
              logos={frameworks}
              durationPerLogo={75} // 2.5s per logo
            />
          </div>
        </Sequence>

        {/* SFX: Pop on each logo change */}
        {frameworks.map((_, idx) => (
          <Sequence key={idx} from={FRAMEWORKS_START + (idx * 75)}>
            <SFXTrigger
              triggerFrame={0}
              sfxFile="audio/pop-402324.mp3"
              volume={0.22}
            />
          </Sequence>
        ))}

        {/* SECTION 3: Explanation with blur */}
        <Sequence from={EXPLANATION_START} durationInFrames={EXPLANATION_DURATION}>
          <FullFrameContent
            type="image"
            src="section-1/piece-6-with-without-comparison.svg"
            caption="PROGRESSIVE DISCLOSURE"
            blurBackground={true}
            scaleContent={0.9}
          />
        </Sequence>

        {/* Continue mapping all 111 seconds... */}
      </div>

      {/* MIDDLE ZONE: Captions */}
      <div style={{
        position: 'absolute',
        top: '46%',
        width: '100%',
        height: '8%',
        backgroundColor: '#000000',
        borderTop: '4px solid #FF7614',
        borderBottom: '4px solid #FF7614',
      }}>
        {/* Word-by-word captions (keep existing logic) */}
      </div>

      {/* BOTTOM ZONE: Face circle */}
      <div style={{
        position: 'absolute',
        top: '54%',
        width: '100%',
        height: '46%',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Circular face (keep existing logic) */}
      </div>

    </AbsoluteFill>
  );
};
```

---

### PHASE 5: Quality Checklist

Before calling it done, verify:

- [ ] **Content fills 90%+ of available space** (not tiny)
- [ ] **Real videos playing** (not screenshots)
- [ ] **Blur effects when showing concepts** (backdropFilter: blur)
- [ ] **Sound effects strategic** (10-15 total, not spammy)
- [ ] **Smooth transitions** (spring animations, fades)
- [ ] **Proper pacing** (new content every 5-10s)
- [ ] **Caption sync** (word-by-word matches audio)
- [ ] **Professional polish** (feels like a real editor made it)

---

## Immediate Next Steps:

1. **Download official video:**
   ```bash
   yt-dlp "https://www.youtube.com/watch?v=fOxC44g8vig" -o public/official-content/skills-full.mp4
   ```

2. **Extract 10s opening clip:**
   ```bash
   ffmpeg -ss 0 -i public/official-content/skills-full.mp4 -t 10 -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -movflags +faststart public/official-content/skills-announcement-10s.mp4
   ```

3. **Create FullFrameContent component** (copy code above)

4. **Create new composition V5** with proper structure

5. **Test in Remotion Studio** → iterate

---

**This is how you get from 20 to 95.**

The difference is:
- **Real content** (not mockups)
- **Fills the frame** (not tiny)
- **Dynamic** (videos, animations, not static)
- **Professional** (blur, transitions, SFX)
- **Editor mindset** (telling a story, not placing assets)
