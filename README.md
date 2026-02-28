# DoodleDirector

DoodleDirector is a neon-night, storyboard toy built with **Next.js**, **TypeScript**, **TailwindCSS**, and **Framer Motion**. Sketch up to five scenes, brand them with an artist-inspired style, cast a narrator, and hit play to watch a looping “micro-film” with captions and audio.

## What’s new in the latest revamp

- **Immersive landing page** – hero grid with stats, flowing gradients, animated background orbs, and refreshed marketing copy.
- **Narrated timeline** – “How it works” now doubles as a scroll-anchored timeline so users can jump straight from the hero CTA.
- **Moodboard carousel & voice tiles** – updated art direction for artist cards and voice previews, with responsive snapping layouts.
- **Creation studio polish** – wizard header, stepper, and each step (style pickers, voice deck, doodle canvas, progress rail, storyboard player) now share the same glassmorphic treatment.
- **Design tokens** – expanded palette (`velvetNavy`, `plumGlow`, `mintFlash`, etc.) plus new font stack (Space Grotesk + Inter) and reusable gradient/noise utilities.

## Product guide

### 1. Landing experience

- **Hero + CTA** – `components/LandingHero.tsx` pairs a stat block with stacked CTAs (`Start directing` and `Watch tour`). The background animates via `framer-motion`, so the page already feels alive before a user draws anything.
- **Timeline (“How it works”)** – `components/HowItWorks.tsx` is anchored at `#how-it-works`, so clicking the secondary CTA scrolls straight into the three-step overview: sketch → style + voice → play.
- **Artist carousel & voice preview** – `components/ArtistCarousel.tsx` and `components/VoicePickerPreview.tsx` let visitors ideate on mood before committing to the wizard; these cards mirror the components used later in the create flow.
- **Made for chaos + footer** – highlights target use cases, demo/live status, and contact info.

### 2. Create wizard (`/create`)

| Step | Component | Highlights |
| ---- | --------- | ---------- |
| 1. Artist style | `CreateWizard` + inline card grid | Selects `project.artistStyle`, showing descriptive copy and glow state. |
| 2. Voice | `components/VoicePicker.tsx` | Fetches `/api/env-status` to show Demo Mode, enables live or speech-synthesis previews. |
| 3. Scenes | `components/SceneEditor.tsx` | `react-sketch-canvas` for doodles, script textarea, duration slider, undo/redo/clear, and autosave back into `ProjectContext`. |
| 4. Generate | `components/GenerateProgress.tsx` | Calls `/api/generate-image` and `/api/generate-voice` sequentially per scene, showing readiness chips. |
| 5. Play | `components/StoryPlayer.tsx` | Animated slideshow with captions, audio playback, scene thumbnails, and confetti trigger. |

Tips for running the flow:

1. From the hero CTA hit `/create` or visit directly.
2. Add at least one scene before moving past Step 3; the “Next step” button enforces this.
3. Regeneration is idempotent—run Step 4 as many times as desired; Step 5 unlocks once every scene has both `generatedImageUrl` and `voiceUrl`.

### 3. Demo vs. live mode

- The footer and voice picker display Demo Mode status fetched from `/api/env-status`.
- When environment variables are missing (see section below), the API routes fall back to bundled SVG/MP3 files so you can still demo the UI while offline.
- You can swap the placeholder audio (`public/demo/demo-voice.mp3`) or art assets to customize the demo narrative.

### 4. Persistence, resets, and local state

- `context/ProjectContext.tsx` stores the full project in React context and persists to `localStorage` under `doodle-director-project-v1`.
- Clearing browser storage or calling the `reset` helper (wire this into any new UI you add) wipes the slate.
- Scenes are stored as arrays of `Scene` objects; the wizard prevents more than five to preserve pacing.

### 5. Customizing the experience

- **Styling tokens** live in `tailwind.config.ts` and `app/globals.css`. Update or add gradients there to keep styles consistent across the hero, wizard, and player.
- **Voice options** – extend the `VOICES` array in `components/VoicePicker.tsx` and `components/VoicePickerPreview.tsx` to expose more narrator personas.
- **Artist styles** – extend `artistStyles` in both `components/CreateWizard.tsx` and `components/ArtistCarousel.tsx` so marketing and product stay consistent.
- **API hooks** – `components/CreateWizard.tsx` sequentially fetches `/api/generate-image` and `/api/generate-voice`. Swap these endpoints for your own services without touching the UI.

## Getting started

```bash
pnpm install   # or npm install / yarn
pnpm dev       # or npm run dev / yarn dev
```

Then open `http://localhost:3000` in your browser.

## Environment variables

Copy `.env.local.example` to `.env.local` and add your keys:

```bash
cp .env.local.example .env.local
```

Fill in as needed:

- `GEMINI_API_KEY`
- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_MALE_1`
- `ELEVENLABS_VOICE_FEMALE_1`
- `ELEVENLABS_VOICE_MALE_2`
- `ELEVENLABS_VOICE_FEMALE_2`

If any of these are missing, the app automatically switches to **Demo Mode**:

- `/api/generate-image` returns stylized SVG placeholders from `public/demo/scene-*.svg`
- `/api/generate-voice` returns a placeholder audio URL (`/demo/demo-voice.mp3`)

> Note: you can drop any short MP3 file at `public/demo/demo-voice.mp3` to have audible previews in demo mode.

## Main flows

- **Landing page**: animated hero, “how it works”, artist style carousel, voice preview section, and playful feature callouts.
- **Create wizard** (`/create`):
  - Step 1: choose an **artist style** card.
  - Step 2: choose a **voice** and preview it.
  - Step 3: create up to **5 scenes** with a doodle canvas + script + duration slider.
  - Step 4: generate images + voiceover per scene with a progress list.
  - Step 5: play everything in the **Storyboard Player** with Ken Burns motion, transitions, and captions.

Project state (`artistStyle`, `voiceId`, `scenes`) is stored in React context (`ProjectContext`) and persisted to `localStorage`.

## Design system

- **Fonts** – Space Grotesk (display) + Inter (body) injected via `next/font`.
- **Palette highlights**
  - Electric Pink `#FF2EB8`
  - Acid Lime `#B6FF2E`
  - Cyan Pop `#2EF2FF`
  - Velvet Navy `#0C0A24`
  - Plum Glow `#4C1C8C`
  - Peach Fuzz `#FFD9C8`
- **Utilities** – glass-card, hero-grid, noise overlays, gradient borders, and custom background images live in `app/globals.css`.
- **Motion** – Framer Motion drives hero stats, timeline reveals, carousel entrance, and storyboard transitions.

## Files to explore

- `app/page.tsx` – landing page
- `app/create/page.tsx` – main create wizard
- `components/CreateWizard.tsx` – multi-step flow controller
- `components/SceneEditor.tsx` – doodle canvas + script editor
- `components/StoryPlayer.tsx` – animated storyboard “video” player
- `app/api/generate-image/route.ts` – Gemini integration + demo fallback
- `app/api/generate-voice/route.ts` – ElevenLabs integration + demo fallback
