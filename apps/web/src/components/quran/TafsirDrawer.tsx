"use client";

import { useState, useEffect } from "react";
import type { QuranVerse } from "@/types/quran";
import { cn } from "@/lib/utils";

interface TafsirDrawerProps {
  verse: QuranVerse | null;
  surahName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TafsirDrawer({ verse, surahName, isOpen, onClose }: TafsirDrawerProps) {
  const [tafsirText, setTafsirText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!verse || !isOpen) return;

    setIsLoading(true);
    setTafsirText(null);

    const [surahNum, ayahNum] = verse.verse_key.split(":").map(Number);

    // Fetch tafsir from Quran.com API
    fetch(
      `https://api.quran.com/api/v4/tafsirs/169/by_ayah/${surahNum}:${ayahNum}`,
    )
      .then((r) => r.json())
      .then((data) => {
        const text = data?.tafsir?.text ?? null;
        if (text) {
          // Remove HTML tags for display
          setTafsirText(text.replace(/<[^>]+>/g, "").trim());
        } else {
          setTafsirText("No tafsir available for this verse.");
        }
      })
      .catch(() => {
        setTafsirText("Failed to load tafsir. Please try again.");
      })
      .finally(() => setIsLoading(false));
  }, [verse, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-screen w-full max-w-md bg-[var(--surface)] border-l border-[var(--border)] z-50 flex flex-col shadow-dark-lg",
          "animate-slide-in-right"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <div>
            <h2 className="font-semibold text-[var(--text)]">Tafsir</h2>
            {verse && (
              <p className="text-sm text-[var(--text-muted)]">
                {surahName} — Ayah {verse.verse_number}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--elevated)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Verse text */}
        {verse && (
          <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--elevated)]/50">
            <p
              className="text-[var(--text)] text-xl text-right leading-loose"
              dir="rtl"
              style={{ fontFamily: "Amiri, serif" }}
            >
              {verse.text_uthmani}
            </p>
            {verse.translations?.[0] && (
              <p className="text-[var(--text-muted)] text-sm mt-3 leading-relaxed">
                {verse.translations[0].text.replace(/<[^>]+>/g, "").replace(/\[\d+\]/g, "").trim()}
              </p>
            )}
          </div>
        )}

        {/* Tafsir content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge bg-[var(--primary)]/10 text-[var(--primary)]">Ibn Kathir</span>
            <span className="text-xs text-[var(--text-muted)]">— English Translation</span>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={cn("shimmer h-4 rounded", i % 3 === 2 ? "w-3/4" : "w-full")} />
              ))}
            </div>
          ) : tafsirText ? (
            <p className="text-[var(--text)] leading-relaxed text-sm whitespace-pre-line">
              {tafsirText}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
