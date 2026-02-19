# AI Music Generator

Create music from text prompts using AI. Free, open-source, no account required.

**Live demo:** [Coming soon — deploy to Vercel]

## How it works

Type a description of the music you want ("lo-fi hip hop beats for studying", "epic cinematic orchestral") and the app generates audio using Meta's [MusicGen](https://huggingface.co/facebook/musicgen-small) model via the Hugging Face Inference API.

### Features

- **Text-to-music** — describe any genre, mood, or style and get audio back
- **10 genre presets** — lo-fi, cinematic, pop, acoustic, electronic, jazz, rock, ambient, classical, synthwave
- **Duration control** — generate 5 to 30 seconds of audio
- **Waveform visualizer** — real-time frequency visualization during playback
- **Download** — save generated audio as .flac files
- **History** — past generations saved locally in your browser

## Tech stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS 4
- **Music AI:** [MusicGen](https://github.com/facebookresearch/audiocraft) (Meta) via [Hugging Face Inference API](https://huggingface.co/inference-api) (free)
- **No backend infra** — the Next.js API route proxies requests to Hugging Face

## Run locally

```bash
git clone https://github.com/Skylarq-ai/ai-music-gen.git
cd ai-music-gen
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Optional: Hugging Face API token

The app works without an API token (uses the free anonymous tier), but you'll hit rate limits faster. To use a token:

```bash
echo "HF_TOKEN=hf_your_token_here" > .env.local
```

Get a free token at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens).

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Skylarq-ai/ai-music-gen)

One-click deploy. No environment variables required (works with the free HF tier).

## How MusicGen works

MusicGen is a single-stage autoregressive transformer model developed by Meta's FAIR team. It generates high-quality music conditioned on text descriptions. The `musicgen-small` (300M parameters) model is used by default for fast generation. You can switch to `musicgen-medium` or `musicgen-large` in `lib/huggingface.ts` for higher quality at the cost of slower generation.

## License

MIT

---

Built by [Skylarq AI](https://skylarq.com)
