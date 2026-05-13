"use client";

import { useState, useRef, useEffect } from "react";
import type { QuranVerse } from "@/types/quran";
import { buildAudioUrl } from "@/lib/quran";
import { useSettingsStore } from "@/store/settingsStore";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  surahNumber: number;
  verses: QuranVerse[];
  currentVerse: number | null;
  onVerseChange: (verseNumber: number) => void;
}

export function AudioPlayer({
  surahNumber,
  verses,
  currentVerse,
  onVerseChange,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const reciter = useSettingsStore((s) => s.quranReciter);

  const currentVerseObj = verses.find((v) => v.verse_number === currentVerse);

  useEffect(() => {
    if (currentVerse && audioRef.current) {
      const url = buildAudioUrl(surahNumber, currentVerse, reciter);
      audioRef.current.src = url;
      if (isPlaying) {
        setIsLoading(true);
        audioRef.current.load();
        audioRef.current.play().catch(() => setIsLoading(false));
      }
    }
  }, [currentVerse, surahNumber, reciter, isPlaying]);

  const handlePlay = (verseNumber?: number) => {
    const targetVerse = verseNumber ?? currentVerse ?? 1;
    if (!audioRef.current) return;

    if (isPlaying && targetVerse === currentVerse) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      onVerseChange(targetVerse);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!currentVerse) return;
    const nextVerse = currentVerse + 1;
    if (nextVerse <= verses.length) {
      onVerseChange(nextVerse);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (!currentVerse || currentVerse <= 1) return;
    onVerseChange(currentVerse - 1);
  };

  if (!currentVerse) return null;

  return (
    <div className="sticky bottom-6 z-20">
      <div className="card bg-[var(--surface)]/95 backdrop-blur-md border-[var(--primary)]/20 p-4 flex items-center gap-4 shadow-gold-lg">
        {/* Verse info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[var(--text-muted)] mb-0.5">Now playing</p>
          <p className="text-sm font-medium text-[var(--text)] truncate">
            Ayah {currentVerse}
            {currentVerseObj && (
              <span className="text-[var(--text-muted)] ml-2 text-xs">of {verses.length}</span>
            )}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={!currentVerse || currentVerse <= 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--elevated)] transition-all disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="19,20 9,12 19,4" />
              <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <button
            onClick={() => handlePlay()}
            disabled={isLoading}
            className={cn(
              "w-11 h-11 flex items-center justify-center rounded-full transition-all",
              isPlaying
                ? "bg-[var(--primary)] text-white shadow-gold-md"
                : "bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
            )}
          >
            {isLoading ? (
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={!currentVerse || currentVerse >= verses.length}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--elevated)] transition-all disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,4 15,12 5,20" />
              <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Auto advance toggle */}
        <button
          onClick={() => setAutoAdvance(!autoAdvance)}
          className={cn(
            "text-xs px-2 py-1 rounded transition-colors",
            autoAdvance ? "text-[var(--primary)]" : "text-[var(--text-muted)]"
          )}
          title="Auto-advance to next ayah"
        >
          Auto
        </button>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          onLoadStart={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          onEnded={() => {
            if (autoAdvance && currentVerse && currentVerse < verses.length) {
              onVerseChange(currentVerse + 1);
            } else {
              setIsPlaying(false);
            }
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
}
