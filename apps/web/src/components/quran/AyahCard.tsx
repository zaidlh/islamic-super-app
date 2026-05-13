"use client";

import { useState } from "react";
import type { QuranVerse } from "@/types/quran";
import { useBookmarks } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";

interface AyahCardProps {
  verse: QuranVerse;
  surahName: string;
  showTranslation?: boolean;
  showTransliteration?: boolean;
  arabicFontSize?: number;
  isHighlighted?: boolean;
  onPlay?: (verse: QuranVerse) => void;
  isPlaying?: boolean;
}

export function AyahCard({
  verse,
  surahName,
  showTranslation = true,
  showTransliteration = false,
  arabicFontSize = 28,
  isHighlighted,
  onPlay,
  isPlaying,
}: AyahCardProps) {
  const [showTafsir, setShowTafsir] = useState(false);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const translation = verse.translations?.[0]?.text ?? "";
  const verseId = `${verse.verse_key}`;
  const bookmarked = isBookmarked(verseId);

  const handleBookmark = () => {
    toggleBookmark({
      id: verseId,
      type: "ayah",
      reference: `${surahName} ${verse.verse_key}`,
      text: verse.text_uthmani,
      translation,
    });
  };

  // Clean translation text (remove footnote markers like [1], <sup>...)
  const cleanTranslation = translation
    .replace(/<[^>]+>/g, "")
    .replace(/\[\d+\]/g, "")
    .trim();

  return (
    <div
      id={`ayah-${verse.verse_number}`}
      className={cn(
        "card p-6 transition-all duration-300",
        isHighlighted && "border-[var(--primary)]/50 bg-[var(--primary)]/5",
        isPlaying && "border-[var(--primary)] shadow-gold-md"
      )}
    >
      {/* Verse number badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border-2 border-[var(--primary)]/40 flex items-center justify-center text-[var(--primary)] text-sm font-bold">
            {verse.verse_number}
          </div>
          <span className="text-xs text-[var(--text-muted)]">{verse.verse_key}</span>
          {verse.juz_number && (
            <span className="badge bg-[var(--elevated)] text-[var(--text-subtle)] text-xs">
              Juz {verse.juz_number}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {onPlay && (
            <button
              onClick={() => onPlay(verse)}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-lg transition-all",
                isPlaying
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-[var(--primary)]"
              )}
              title={isPlaying ? "Pause" : "Play ayah"}
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>
          )}

          <button
            onClick={handleBookmark}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-lg transition-all",
              bookmarked
                ? "text-[var(--primary)] bg-[var(--primary)]/10"
                : "text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-[var(--primary)]"
            )}
            title={bookmarked ? "Remove bookmark" : "Bookmark"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={bookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </button>

          <button
            onClick={() => {
              const text = `${verse.text_uthmani}\n\n${cleanTranslation}\n\n— ${surahName} ${verse.verse_key}`;
              navigator.clipboard.writeText(text);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-[var(--text)] transition-all"
            title="Copy"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Arabic Text */}
      <p
        className="text-[var(--text)] text-right leading-loose mb-6"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: "Amiri, Traditional Arabic, serif",
          fontSize: `${arabicFontSize}px`,
          lineHeight: "2.8",
        }}
      >
        {verse.text_uthmani}
      </p>

      {/* Transliteration */}
      {showTransliteration && verse.words && (
        <p className="text-[var(--text-muted)] text-sm italic mb-4 leading-relaxed">
          {verse.words
            .filter((w) => w.char_type_name === "word")
            .map((w) => w.transliteration?.text)
            .filter(Boolean)
            .join(" ")}
        </p>
      )}

      {/* Translation */}
      {showTranslation && cleanTranslation && (
        <p className="text-[var(--text-muted)] leading-relaxed text-sm border-t border-[var(--border)] pt-4">
          {cleanTranslation}
        </p>
      )}
    </div>
  );
}
