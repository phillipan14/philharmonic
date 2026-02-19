"use client";

interface DurationSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function DurationSlider({ value, onChange, disabled }: DurationSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm text-[var(--text-secondary)]">Duration</label>
        <span className="text-sm font-medium text-[var(--text-primary)]">{value}s</span>
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
      <div className="flex justify-between text-xs text-[var(--text-secondary)]">
        <span>5s</span>
        <span>30s</span>
      </div>
    </div>
  );
}
