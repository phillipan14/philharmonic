"use client";

interface DurationSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function DurationSlider({ value, onChange, disabled }: DurationSliderProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3.5">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-[var(--text-secondary)]">Duration</label>
        <span className="rounded-md bg-[var(--bg-tertiary)] px-2.5 py-0.5 text-sm font-mono font-medium text-[var(--text-primary)]">
          {value}s
        </span>
      </div>
      <input
        type="range"
        min={5}
        max={30}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="disabled:opacity-50"
      />
      <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] mt-1">
        <span>5s</span>
        <span>10s</span>
        <span>15s</span>
        <span>20s</span>
        <span>25s</span>
        <span>30s</span>
      </div>
    </div>
  );
}
