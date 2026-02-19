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
      className={`w-full rounded-xl bg-[var(--accent)] px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed ${loading ? "generating" : ""}`}
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
          Generating...
        </span>
      ) : (
        "Generate Music"
      )}
    </button>
  );
}
