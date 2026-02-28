# DoodleDirector

DoodleDirector is a playful storyboard toy built with **Next.js**, **TypeScript**, **TailwindCSS**, and **Framer Motion**. Doodle up to five scenes, pick an iconic artist style and a voice, and play everything back as a tiny animated “video” (slideshow with captions and audio).

## Tech stack

- **Next.js (App Router) + TypeScript**
- **TailwindCSS** with a custom funky palette
- **Framer Motion** for micro-interactions and Ken Burns motion
- **react-sketch-canvas** for the doodle canvas
- API routes for:
  - `/api/generate-image` (Gemini image generation or demo placeholders)
  - `/api/generate-voice` (ElevenLabs TTS or demo placeholders)
  - `/api/compose` (returns a simple timeline manifest)

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

- Custom Tailwind palette using:
  - Electric Pink `#FF2EB8`
  - Acid Lime `#B6FF2E`
  - Cyan Pop `#2EF2FF`
  - Sunny Orange `#FF9F2E`
  - Deep Indigo `#1A1446`
  - Off-White `#FFF7EE`
- Components use “sticker” styling, thick shadows, and soft 2xl/3xl radii.
- Background: animated gradient mesh with a subtle grain overlay.
- Motion: hover glows, slide/fade transitions, stepper bounce, and subtle Ken Burns pans in the player.

## Files to explore

- `app/page.tsx` – landing page
- `app/create/page.tsx` – main create wizard
- `components/CreateWizard.tsx` – multi-step flow controller
- `components/SceneEditor.tsx` – doodle canvas + script editor
- `components/StoryPlayer.tsx` – animated storyboard “video” player
- `app/api/generate-image/route.ts` – Gemini integration + demo fallback
- `app/api/generate-voice/route.ts` – ElevenLabs integration + demo fallback

