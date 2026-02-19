"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface AudioPlayerProps {
  audioUrl: string;
  prompt: string;
}

export default function AudioPlayer({ audioUrl, prompt }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceCreatedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.85;
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, "rgba(139, 92, 246, 0.4)");
        gradient.addColorStop(1, "rgba(167, 139, 250, 1)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, Math.max(barWidth - 1, 1), barHeight, 2);
        ctx.fill();
        x += barWidth + 1;
      }
    };

    draw();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || sourceCreatedRef.current) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyserRef.current = analyser;
    sourceCreatedRef.current = true;
  }, []);

  useEffect(() => {
    if (isPlaying) {
      drawWaveform();
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, drawWaveform]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await audio.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `philharmonic-${Date.now()}.mp3`;
    a.click();
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 space-y-3 card-hover">
      <audio
        ref={audioRef}
        src={audioUrl}
        crossOrigin="anonymous"
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setIsPlaying(false)}
      />

      <p className="text-xs text-[var(--text-secondary)] truncate" title={prompt}>
        {prompt}
      </p>

      <canvas
        ref={canvasRef}
        width={600}
        height={60}
        className="w-full h-[60px] rounded-lg bg-[var(--bg-primary)]"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-all hover:bg-[var(--accent-hover)] hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="1" y="0" width="3.5" height="12" rx="1" />
              <rect x="7.5" y="0" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
              <path d="M0 0l12 7-12 7z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <div className="relative h-1 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
            <div
              className="absolute h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-purple-400 transition-[width] duration-200"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
            />
          </div>
        </div>

        <span className="text-[11px] text-[var(--text-tertiary)] font-mono tabular-nums min-w-[70px] text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <button
          onClick={handleDownload}
          className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-tertiary)] transition-all hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          title="Download MP3"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2v8m0 0l-3-3m3 3l3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" />
          </svg>
        </button>
      </div>
    </div>
  );
}
