"use client";

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function GenerateButton({ onClick, loading, disabled }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`group w-full rounded-xl bg-[var(--accent)] px-6 py-4 text-base font-semibold text-white transition-all hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.99] ${loading ? "generating" : ""}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-3">
          <span className="flex items-end gap-0.5 h-5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="waveform-bar inline-block w-1 rounded-full bg-white/80"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
          Composing your track...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
            <circle cx="5.5" cy="17.5" r="2.5" />
            <circle cx="17.5" cy="15.5" r="2.5" />
            <path d="M8 17V5l12-2v12" />
          </svg>
          Generate Music
        </span>
      )}
    </button>
  );
}
