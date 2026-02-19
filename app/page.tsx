"use client";

import { useState, useCallback } from "react";
import PromptInput from "@/components/PromptInput";
import DurationSlider from "@/components/DurationSlider";
import GenerateButton from "@/components/GenerateButton";
import AudioPlayer from "@/components/AudioPlayer";
import History, { saveToHistory } from "@/components/History";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<{ url: string; prompt: string } | null>(null);

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

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate music");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      setCurrentAudio({ url: audioUrl, prompt: prompt.trim() });

      // Save to history
      saveToHistory({ prompt: prompt.trim(), audioUrl, duration });
      window.dispatchEvent(new Event("history-updated"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [prompt, duration]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-[var(--accent)] to-purple-400 bg-clip-text text-transparent">
            AI Music Generator
          </span>
        </h1>
        <p className="mt-2 text-[var(--text-secondary)]">
          Create music from text prompts. Free, open-source, powered by MusicGen.
        </p>
      </div>

      <div className="space-y-6">
        <PromptInput value={prompt} onChange={setPrompt} disabled={loading} />

        <DurationSlider value={duration} onChange={setDuration} disabled={loading} />

        <GenerateButton
          onClick={handleGenerate}
          loading={loading}
          disabled={!prompt.trim()}
        />

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {currentAudio && (
          <div>
            <p className="mb-2 text-sm font-medium text-[var(--text-secondary)]">Just generated</p>
            <AudioPlayer audioUrl={currentAudio.url} prompt={currentAudio.prompt} />
          </div>
        )}

        <History />
      </div>

      <footer className="mt-16 text-center text-xs text-[var(--text-secondary)]">
        Built by{" "}
        <a
          href="https://skylarq.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] hover:underline"
        >
          Skylarq AI
        </a>
        {" "}&middot;{" "}
        <a
          href="https://github.com/Skylarq-ai/ai-music-gen"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-primary)] transition-colors"
        >
          Source on GitHub
        </a>
      </footer>
    </main>
  );
}
