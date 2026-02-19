"use client";

import { useState, useCallback } from "react";
import PromptInput from "@/components/PromptInput";
import DurationSlider from "@/components/DurationSlider";
import GenerateButton from "@/components/GenerateButton";
import AudioPlayer from "@/components/AudioPlayer";
import History, { saveToHistory } from "@/components/History";
import SampleTracks from "@/components/SampleTracks";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<{ url: string; prompt: string } | null>(null);
  const [showSetup, setShowSetup] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentAudio(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), duration }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error?.includes("API key")) {
          setShowSetup(true);
        }
        throw new Error(data.error || "Failed to generate music");
      }

      const audioUrl = data.audioUrl;
      setCurrentAudio({ url: audioUrl, prompt: prompt.trim() });

      saveToHistory({ prompt: prompt.trim(), audioUrl, duration });
      window.dispatchEvent(new Event("history-updated"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [prompt, duration]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      {/* Hero */}
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-1.5 text-xs text-[var(--text-secondary)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
          Open-source AI music generator
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
          <span className="bg-gradient-to-r from-[var(--accent)] via-purple-400 to-violet-300 bg-clip-text text-transparent">
            PhilHarmonic
          </span>
        </h1>

        <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
          Describe the vibe. Get a track.{" "}
          <span className="text-[var(--text-primary)]">AI-powered music</span>{" "}
          from a text prompt in seconds.
        </p>
      </div>

      {/* Setup Banner */}
      {showSetup && (
        <div className="setup-banner rounded-xl px-5 py-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-lg">&#9881;</span>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-[var(--text-primary)]">
                API key needed to generate music
              </p>
              <ol className="list-decimal list-inside space-y-1 text-[var(--text-secondary)]">
                <li>
                  Sign up at{" "}
                  <a href="https://fal.ai" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                    fal.ai
                  </a>{" "}
                  (GitHub login works)
                </li>
                <li>
                  Get your key from{" "}
                  <a href="https://fal.ai/dashboard/keys" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                    fal.ai/dashboard/keys
                  </a>
                </li>
                <li>
                  Add <code className="rounded bg-[var(--bg-tertiary)] px-1.5 py-0.5 text-xs font-mono">FAL_KEY=your-key-here</code> to{" "}
                  <code className="rounded bg-[var(--bg-tertiary)] px-1.5 py-0.5 text-xs font-mono">.env.local</code>
                </li>
                <li>Restart the dev server</li>
              </ol>
              <p className="text-xs text-[var(--text-tertiary)]">
                Each generation costs ~$0.03 via fal.ai&apos;s MiniMax Music v2 model.
              </p>
            </div>
            <button
              onClick={() => setShowSetup(false)}
              className="ml-auto shrink-0 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Generator */}
      <div className="space-y-5">
        <PromptInput value={prompt} onChange={setPrompt} disabled={loading} />

        <DurationSlider value={duration} onChange={setDuration} disabled={loading} />

        <GenerateButton
          onClick={handleGenerate}
          loading={loading}
          disabled={!prompt.trim()}
        />

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {currentAudio && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-[var(--text-secondary)]">
              Now playing
            </p>
            <AudioPlayer audioUrl={currentAudio.url} prompt={currentAudio.prompt} />
          </div>
        )}

        <History />

        <SampleTracks />
      </div>

      {/* Footer */}
      <footer className="mt-20 flex flex-col items-center gap-3 text-xs text-[var(--text-tertiary)]">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">&#9835;</span>
          <span>
            Built by{" "}
            <a
              href="https://linkedin.com/in/phillipan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              Phillip An
            </a>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/phillipan14/philharmonic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-secondary)] transition-colors"
          >
            GitHub
          </a>
          <span>&middot;</span>
          <a
            href="https://skylarq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-secondary)] transition-colors"
          >
            Skylarq AI
          </a>
        </div>
      </footer>
    </main>
  );
}
