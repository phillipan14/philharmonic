# PhilHarmonic

AI-powered music generator. Describe a vibe, get a track. Open-source, runs locally.

**Built by [Phillip An](https://linkedin.com/in/phillipan)**

## How it works

Type a description of the music you want ("lo-fi hip hop beats for studying", "epic cinematic orchestral") and PhilHarmonic generates audio using [MiniMax Music v2](https://fal.ai/models/fal-ai/minimax-music/v2) via the fal.ai API.

### Features

- **Text-to-music** — describe any genre, mood, or style and get audio back
- **10 genre presets** — lo-fi, cinematic, pop, acoustic, electronic, jazz, rock, ambient, classical, synthwave
- **Duration control** — generate 5 to 30 seconds of audio
- **Waveform visualizer** — real-time frequency visualization during playback
- **Download** — save generated tracks as MP3
- **History** — past generations saved locally in your browser
- **Sample tracks** — pre-loaded examples to hear what's possible

## Tech stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS 4
- **Music AI:** [MiniMax Music v2](https://fal.ai/models/fal-ai/minimax-music/v2) via [fal.ai](https://fal.ai)
- **No backend infra** — the Next.js API route proxies requests to fal.ai

## Run locally

```bash
git clone https://github.com/phillipan14/philharmonic.git
cd philharmonic
npm install
```

Add your fal.ai API key:

```bash
echo "FAL_KEY=your-key-here" > .env.local
```

Get a key at [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys) (GitHub login works, ~$0.03 per generation).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/phillipan14/philharmonic&env=FAL_KEY&envDescription=fal.ai%20API%20key%20for%20music%20generation&envLink=https://fal.ai/dashboard/keys)

One-click deploy. Set `FAL_KEY` as an environment variable.

## License

MIT
