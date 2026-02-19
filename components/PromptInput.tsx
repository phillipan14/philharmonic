"use client";

const PRESETS = [
  { label: "Lo-fi Chill", emoji: "🎧", prompt: "lo-fi hip hop beats, relaxing, jazzy chords, vinyl crackle, mellow" },
  { label: "Cinematic", emoji: "🎬", prompt: "epic cinematic orchestral, dramatic strings, brass, timpani, film score" },
  { label: "Pop", emoji: "🎤", prompt: "upbeat pop music, catchy melody, synth, drums, happy energy, radio-ready" },
  { label: "Acoustic", emoji: "🎸", prompt: "acoustic guitar fingerpicking, warm, folk, peaceful, campfire vibes" },
  { label: "Electronic", emoji: "🎛️", prompt: "electronic dance music, synth bass, arpeggios, energetic beat, club" },
  { label: "Jazz", emoji: "🎹", prompt: "smooth jazz piano, upright bass, brushed drums, mellow, late night" },
  { label: "Rock", emoji: "🎸", prompt: "electric guitar rock, driving drums, bass, powerful riffs, stadium energy" },
  { label: "Ambient", emoji: "🌊", prompt: "ambient atmospheric pads, ethereal, dreamy, slow evolving textures, space" },
  { label: "Classical", emoji: "🎻", prompt: "classical piano sonata, elegant, expressive, romantic period, concert hall" },
  { label: "Synthwave", emoji: "🌆", prompt: "80s synthwave, retro, neon, pulsing bass, analog synths, nostalgic" },
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
          maxLength={300}
          rows={3}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3.5 text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]/30 disabled:opacity-50 resize-none transition-colors"
        />
        <span className="absolute bottom-2.5 right-3 text-xs text-[var(--text-tertiary)]">
          {value.length}/300
        </span>
      </div>

      <div>
        <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
          Quick presets
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => onChange(preset.prompt)}
              disabled={disabled}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-all hover:border-[var(--accent)]/50 hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] disabled:opacity-50 active:scale-[0.97]"
            >
              <span>{preset.emoji}</span>
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
