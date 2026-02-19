"use client";

import AudioPlayer from "./AudioPlayer";

const SAMPLES = [
  {
    id: "sample-1",
    prompt: "Upbeat piano, warm autumn vibes, instrumental background",
    audioUrl: "/samples/upbeat-piano.mp3",
    genre: "Piano",
  },
  {
    id: "sample-2",
    prompt: "Cinematic tension, futuristic mystery, electronic suspense",
    audioUrl: "/samples/cinematic-tension.mp3",
    genre: "Cinematic",
  },
  {
    id: "sample-3",
    prompt: "Ambient melancholy, dark atmospheric intro, instrumental",
    audioUrl: "/samples/ambient-melancholy.mp3",
    genre: "Ambient",
  },
  {
    id: "sample-4",
    prompt: "Retro jazz dance, swing piano, vintage instrumental",
    audioUrl: "/samples/retro-jazz.mp3",
    genre: "Jazz",
  },
];

export default function SampleTracks() {
  return (
    <div className="space-y-4 pt-6">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
          Sample tracks
        </h2>
        <span className="rounded-full bg-[var(--accent-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
          AI Generated
        </span>
      </div>

      <div className="grid gap-3">
        {SAMPLES.map((sample) => (
          <div key={sample.id} className="relative">
            <span className="absolute -top-1 right-3 z-10 rounded-full bg-[var(--bg-tertiary)] px-2 py-0.5 text-[10px] text-[var(--text-tertiary)]">
              {sample.genre}
            </span>
            <AudioPlayer audioUrl={sample.audioUrl} prompt={sample.prompt} />
          </div>
        ))}
      </div>

      <p className="text-center text-[10px] text-[var(--text-tertiary)]">
        Samples from Pixabay. Free under the Pixabay Content License.
      </p>
    </div>
  );
}
