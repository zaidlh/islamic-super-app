"use client";
import { useState } from "react";
import type { QuranChapter, QuranVerse } from "@/types/quran";
import { cn } from "@/lib/utils";

const TAFSIR_SOURCES = [
  { id: 169, name: "Ibn Kathir", arabicName: "ابن كثير" },
  { id: 238, name: "Al-Muyassar", arabicName: "الميسر" },
  { id: 817, name: "Al-Jalalayn", arabicName: "الجلالين" },
];

interface Props { chapter: QuranChapter; verses: QuranVerse[] }

interface TafsirCache { [key: string]: string }

export function TafsirPageClient({ chapter, verses }: Props) {
  const [selectedSource, setSelectedSource] = useState(169);
  const [expandedVerse, setExpandedVerse] = useState<string | null>(null);
  const [tafsirCache, setTafsirCache] = useState<TafsirCache>({});
  const [loadingVerse, setLoadingVerse] = useState<string | null>(null);

  const loadTafsir = async (verseKey: string) => {
    const cacheKey = `${selectedSource}-${verseKey}`;
    if (tafsirCache[cacheKey]) { setExpandedVerse(verseKey); return; }
    setLoadingVerse(verseKey);
    try {
      const [s, v] = verseKey.split(":");
      const res = await fetch(`https://api.quran.com/api/v4/tafsirs/${selectedSource}/by_ayah/${s}:${v}`);
      const data = await res.json();
      const text = data?.tafsir?.text?.replace(/<[^>]+>/g, "").trim() ?? "No tafsir available.";
      setTafsirCache((c) => ({ ...c, [cacheKey]: text }));
    } catch {
      setTafsirCache((c) => ({ ...c, [cacheKey]: "Failed to load tafsir." }));
    } finally {
      setLoadingVerse(null);
      setExpandedVerse(verseKey);
    }
  };

  const toggleVerse = (verseKey: string) => {
    if (expandedVerse === verseKey) { setExpandedVerse(null); return; }
    loadTafsir(verseKey);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">{chapter.name_simple}</h1>
          <p className="text-[var(--text-muted)] text-sm">
            {chapter.translated_name.name} · {chapter.verses_count} verses · {chapter.revelation_place}
          </p>
        </div>
        <p
          className="text-3xl text-[var(--primary)] flex-shrink-0"
          style={{ fontFamily: "Amiri, serif", lineHeight: 1.8 }}
          dir="rtl"
        >
          {chapter.name_arabic}
        </p>
      </div>

      {/* Scholar Toggle */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-sm text-[var(--text-muted)] self-center">Scholar:</span>
        {TAFSIR_SOURCES.map((src) => (
          <button
            key={src.id}
            onClick={() => { setSelectedSource(src.id); setExpandedVerse(null); }}
            className={cn(
              "px-3 py-1 rounded-lg text-sm transition-all",
              selectedSource === src.id
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--elevated)] text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
          >
            {src.name}
          </button>
        ))}
      </div>

      {/* Verses */}
      <div className="space-y-3">
        {verses.map((verse) => (
          <div key={verse.verse_key} className="card overflow-hidden">
            <button
              onClick={() => toggleVerse(verse.verse_key)}
              className="w-full p-5 text-left hover:bg-[var(--elevated)] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="badge bg-[var(--primary)]/10 text-[var(--primary)] text-xs flex-shrink-0 mt-1">
                  {verse.verse_number}
                </span>
                <p
                  className="text-right text-xl text-[var(--text)] flex-1 leading-loose"
                  style={{ fontFamily: "Amiri, serif" }}
                  dir="rtl"
                >
                  {verse.text_uthmani}
                </p>
              </div>
              {verse.translations?.[0] && (
                <p className="text-sm text-[var(--text-muted)] mt-3 leading-relaxed">
                  {verse.translations[0].text.replace(/<[^>]+>/g, "").replace(/\[\d+\]/g, "").trim()}
                </p>
              )}
              <p className="text-xs text-[var(--primary)] mt-2">
                {expandedVerse === verse.verse_key ? "▲ Hide tafsir" : "▼ View tafsir"}
              </p>
            </button>

            {expandedVerse === verse.verse_key && (
              <div className="border-t border-[var(--border)] bg-[var(--elevated)]/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge bg-[var(--primary)]/10 text-[var(--primary)] text-xs">
                    {TAFSIR_SOURCES.find((s) => s.id === selectedSource)?.name}
                  </span>
                </div>
                {loadingVerse === verse.verse_key ? (
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={cn("shimmer h-3 rounded", i % 3 === 2 ? "w-2/3" : "w-full")} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--text)] leading-relaxed whitespace-pre-line">
                    {tafsirCache[`${selectedSource}-${verse.verse_key}`]}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
