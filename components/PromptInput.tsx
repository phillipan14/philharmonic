"use client";

const PRESETS = [
  { label: "Lo-fi Chill", prompt: "lo-fi hip hop beats, relaxing, jazzy chords, vinyl crackle" },
  { label: "Cinematic Epic", prompt: "epic cinematic orchestral, dramatic strings, brass, timpani" },
  { label: "Upbeat Pop", prompt: "upbeat pop music, catchy melody, synth, drums, happy energy" },
  { label: "Acoustic Guitar", prompt: "acoustic guitar fingerpicking, warm, folk, peaceful" },
  { label: "Electronic", prompt: "electronic dance music, synth bass, arpeggios, energetic beat" },
  { label: "Jazz Piano", prompt: "smooth jazz piano, upright bass, brushed drums, mellow" },
  { label: "Rock", prompt: "electric guitar rock, driving drums, bass, powerful riffs" },
  { label: "Ambient", prompt: "ambient atmospheric pads, ethereal, dreamy, slow evolving textures" },
  { label: "Classical", prompt: "classical piano sonata, elegant, expressive, romantic period" },
  { label: "Synthwave", prompt: "80s synthwave, retro, neon, pulsing bass, analog synths" },
];

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function PromptInput({ value, onChange, disabled }: PromptInputProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Describe the music you want to create..."
          maxLength={500}
          rows={3}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50 resize-none"
        />
        <span className="absolute bottom-2 right-3 text-xs text-[var(--text-secondary)]">
          {value.length}/500
        </span>
      </div>

      <div>
        <p className="mb-2 text-sm text-[var(--text-secondary)]">Quick presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => onChange(preset.prompt)}
              disabled={disabled}
              className="rounded-full border border-[var(--border)] bg-[var(--bg-tertiary)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)] disabled:opacity-50"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
