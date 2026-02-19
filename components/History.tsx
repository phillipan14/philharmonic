"use client";

import { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";

export interface HistoryItem {
  id: string;
  prompt: string;
  audioUrl: string;
  createdAt: number;
  duration: number;
}

const STORAGE_KEY = "ai-music-gen-history";

export function saveToHistory(item: Omit<HistoryItem, "id" | "createdAt">) {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  // Keep latest 20 items
  const updated = [newItem, ...history].slice(0, 20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newItem;
}

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function History() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(getHistory());

    const handleStorage = () => setItems(getHistory());
    window.addEventListener("storage", handleStorage);
    // Also listen for custom event from same-tab updates
    window.addEventListener("history-updated", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("history-updated", handleStorage);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">History</h2>
        <button
          onClick={() => {
            clearHistory();
            setItems([]);
          }}
          className="text-xs text-[var(--text-secondary)] hover:text-red-400 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <AudioPlayer key={item.id} audioUrl={item.audioUrl} prompt={item.prompt} />
        ))}
      </div>
    </div>
  );
}
