# Scoring Framework — Stage 2: Rank, Score, and Enrich

You have a set of selected clips from Stage 1. Now score each one precisely, rank them, and generate social media captions.

## Scoring Process

For each clip, evaluate all 5 categories independently (0-20 each):

### 1. Hook Strength (0-20)
Rate the first 3 seconds of the clip:
- **18-20**: Pattern interrupt, shocking stat, bold claim that stops the scroll
- **14-17**: Clear pain point or curiosity gap, strong but not viral-level
- **10-13**: Decent opener, viewer might keep watching
- **0-9**: Weak start, easily scrolled past

### 2. Value Delivery (0-20)
Rate the actionable value:
- **18-20**: Framework, step-by-step, or insight that viewers save/screenshot
- **14-17**: Teaches something specific and useful
- **10-13**: Some value but surface-level or obvious
- **0-9**: Just talking, no real takeaway

### 3. Clarity (0-20)
Rate message clarity:
- **18-20**: One crystal-clear message, zero confusion, clean structure
- **14-17**: Clear main point with minor digressions
- **10-13**: Message is there but takes effort to extract
- **0-9**: Multiple topics, rambling, or confusing

### 4. Shareability (0-20)
Rate the share/save impulse:
- **18-20**: "I need to send this to 3 people right now"
- **14-17**: Would get saves, bookmarks, maybe shares
- **10-13**: Interesting but not share-worthy
- **0-9**: No impulse to interact

### 5. Completeness (0-20)
Rate how naturally it works as a standalone clip:
- **18-20**: Feels like it was always meant to be a short — perfect arc
- **14-17**: Clean start and end, minor rough edges
- **10-13**: Slightly awkward start or end
- **0-9**: Clearly ripped from longer content, confusing without context

## Ranking Rules

1. **Primary sort**: `total_score` (descending)
2. **Tiebreaker**: `hook_strength` (descending) — hooks matter most for short-form
3. **Assign rank**: 1 = best clip, N = lowest scoring clip

## Title Format

- 6-8 words that capture the clip's core message
- kebab-case (lowercase, hyphens)
- Should work as a filename and a search term
- Examples: `from-zero-to-90k`, `stop-manually-posting`, `parallel-processing-explained`

## Category Taxonomy

Assign exactly one category per clip:

| Category | Description | Example |
|----------|-------------|---------|
| `educational` | Teaches a concept, explains how something works | "Here's how AI scheduling works..." |
| `tactical` | Step-by-step, how-to, specific process | "Step 1: connect your accounts..." |
| `inspirational` | Motivational, success story, aspirational | "He went from 0 to $90K..." |
| `personal_story` | Personal anecdote, behind-the-scenes, journey | "When I first started this..." |
| `entertaining` | Reaction, humor, wow-factor, unexpected twist | "Watch what happens when..." |

## Social Media Caption

For each clip, write a caption suitable for Instagram/TikTok/Threads:

### Structure
1. **Hook line** (first sentence): Match the energy of the clip's opening
2. **Value bridge** (1-2 sentences): What the viewer will learn/see
3. **CTA** (last line): Drive engagement

### Rules
- Under 150 words total
- No hashtags in the caption body (those go in first comment)
- Conversational tone, not corporate
- Match the speaker's energy and vocabulary
- Include a specific detail or number from the clip when possible

### Example
```
He made $90,000 in 90 days — not from his main business, but from reselling the AI system that 10x'd it.

Zach came to us struggling with manual outreach. We plugged in the AIX system and within weeks he doubled his bookings, revenue, and pipeline. Then his network started asking questions.

Drop a 🔥 if you want to see how the system works.
```

## Best Improvement

For each clip, provide ONE specific suggestion for what would make it score higher. Be concrete:
- **Good**: "Starting 2 seconds earlier to catch the stat would improve hook from 14 to 18"
- **Bad**: "Could be better" (too vague)

## Output Format

For each scored clip:
```json
{
  "id": 1,
  "rank": 1,
  "title": "from-zero-to-90k",
  "hook_strength": 18,
  "value_delivery": 17,
  "clarity": 19,
  "shareability": 18,
  "completeness": 18,
  "total_score": 90,
  "category": "personal_story",
  "caption": "He made $90,000 in 90 days...",
  "best_improvement": "Starting at 'This is Zach' instead of 'This is one of' gives a stronger character intro hook (18→19)"
}
```
