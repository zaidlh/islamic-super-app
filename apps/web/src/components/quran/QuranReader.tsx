"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { QuranChapter, QuranVerse } from "@/types/quran";
import { AyahCard } from "./AyahCard";
import { AudioPlayer } from "./AudioPlayer";
import { TafsirDrawer } from "./TafsirDrawer";
import { useSettingsStore } from "@/store/settingsStore";
import { useQuranStore } from "@/store/quranStore";
import { cn } from "@/lib/utils";

interface QuranReaderProps {
  chapter: QuranChapter;
  verses: QuranVerse[];
}

export function QuranReader({ chapter, verses }: QuranReaderProps) {
  const { showTranslation, showTransliteration, arabicFontSize, toggleTranslation, toggleTransliteration } =
    useSettingsStore();
  const { setLastRead } = useQuranStore();

  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [tafsirVerse, setTafsirVerse] = useState<QuranVerse | null>(null);
  const [tafsirOpen, setTafsirOpen] = useState(false);

  useEffect(() => {
    // Save last read
    setLastRead(chapter.id, 1, chapter.name_simple);
  }, [chapter, setLastRead]);

  const handlePlayVerse = (verse: QuranVerse) => {
    if (playingVerse === verse.verse_number) {
      setPlayingVerse(null);
    } else {
      setPlayingVerse(verse.verse_number);
    }
  };

  const handleOpenTafsir = (verse: QuranVerse) => {
    setTafsirVerse(verse);
    setTafsirOpen(true);
  };

  return (
    <div>
      {/* Chapter header */}
      <div className="mb-8 text-center">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6 text-sm">
          {chapter.id > 1 ? (
            <Link
              href={`/quran/${chapter.id - 1}`}
              className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
            >
              ← Previous
            </Link>
          ) : <span />}
          <Link href="/quran" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
            All Surahs
          </Link>
          {chapter.id < 114 ? (
            <Link
              href={`/quran/${chapter.id + 1}`}
              className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
            >
              Next →
            </Link>
          ) : <span />}
        </div>

        {/* Surah info */}
        <div className="card p-8 bg-gradient-to-br from-[var(--primary)]/5 to-transparent">
          <p
            className="text-5xl text-[var(--primary)] mb-3"
            style={{ fontFamily: "Amiri, serif" }}
          >
            {chapter.name_arabic}
          </p>
          <h1 className="text-2xl font-bold text-[var(--text)] mb-1">
            {chapter.name_simple}
          </h1>
          <p className="text-[var(--text-muted)] text-sm mb-4">
            {chapter.translated_name.name}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-[var(--text-muted)]">
            <span>{chapter.verses_count} ayahs</span>
            <span>·</span>
            <span
              className={cn(
                "capitalize",
                chapter.revelation_place === "makkah" ? "text-amber-500" : "text-blue-400"
              )}
            >
              {chapter.revelation_place}
            </span>
            <span>·</span>
            <span>Revelation #{chapter.revelation_order}</span>
          </div>
        </div>

        {/* Bismillah */}
        {chapter.bismillah_pre && chapter.id !== 1 && (
          <div className="my-6">
            <p
              className="text-[var(--text)] text-center text-2xl"
              style={{ fontFamily: "Amiri, serif", lineHeight: "2.5" }}
              dir="rtl"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        )}

        {/* Controls bar */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={toggleTranslation}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              showTranslation
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--elevated)] text-[var(--text-muted)]"
            )}
          >
            Translation
          </button>
          <button
            onClick={toggleTransliteration}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              showTransliteration
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--elevated)] text-[var(--text-muted)]"
            )}
          >
            Transliteration
          </button>
          <button
            onClick={() => setPlayingVerse(1)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--elevated)] text-[var(--text-muted)] hover:bg-[var(--primary)] hover:text-white transition-all"
          >
            ▶ Play All
          </button>
        </div>
      </div>

      {/* Verses */}
      <div className="space-y-4">
        {verses.map((verse) => (
          <div key={verse.id}>
            <AyahCard
              verse={verse}
              surahName={chapter.name_simple}
              showTranslation={showTranslation}
              showTransliteration={showTransliteration}
              arabicFontSize={arabicFontSize}
              isHighlighted={false}
              isPlaying={playingVerse === verse.verse_number}
              onPlay={handlePlayVerse}
            />
            {/* Tafsir button */}
            <div className="flex justify-end mt-1">
              <button
                onClick={() => handleOpenTafsir(verse)}
                className="text-xs text-[var(--text-subtle)] hover:text-[var(--primary)] transition-colors px-2 py-1"
              >
                Tafsir →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Audio Player */}
      <AudioPlayer
        surahNumber={chapter.id}
        verses={verses}
        currentVerse={playingVerse}
        onVerseChange={setPlayingVerse}
      />

      {/* Tafsir Drawer */}
      <TafsirDrawer
        verse={tafsirVerse}
        surahName={chapter.name_simple}
        isOpen={tafsirOpen}
        onClose={() => setTafsirOpen(false)}
      />
    </div>
  );
}
