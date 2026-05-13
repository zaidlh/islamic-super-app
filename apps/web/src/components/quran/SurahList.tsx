"use client";

import { useState } from "react";
import Link from "next/link";
import type { QuranChapter } from "@/types/quran";
import { cn } from "@/lib/utils";

interface SurahListProps {
  chapters: QuranChapter[];
}

export function SurahList({ chapters }: SurahListProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "makkah" | "madinah">("all");

  const filtered = chapters.filter((c) => {
    const matchesSearch =
      !query ||
      c.name_simple.toLowerCase().includes(query.toLowerCase()) ||
      c.name_arabic.includes(query) ||
      c.translated_name.name.toLowerCase().includes(query.toLowerCase()) ||
      String(c.id) === query;
    const matchesFilter =
      filter === "all" ||
      (filter === "makkah" && c.revelation_place === "makkah") ||
      (filter === "madinah" && c.revelation_place === "madinah");
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Search & filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or number…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "makkah", "madinah"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                filter === f
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--elevated)] text-[var(--text-muted)] hover:text-[var(--text)]"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Surah grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filtered.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/quran/${chapter.id}`}
            className="card card-hover p-4 flex items-center gap-4 group"
          >
            <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold text-sm flex-shrink-0 group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-200">
              {chapter.id}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors truncate">
                {chapter.name_simple}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {chapter.translated_name.name} · {chapter.verses_count} ayahs ·{" "}
                <span
                  className={cn(
                    "capitalize",
                    chapter.revelation_place === "makkah" ? "text-amber-500" : "text-blue-400"
                  )}
                >
                  {chapter.revelation_place}
                </span>
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[var(--primary)] text-xl" style={{ fontFamily: "Amiri, serif" }}>
                {chapter.name_arabic}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--text-muted)]">
          No surahs found matching &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
