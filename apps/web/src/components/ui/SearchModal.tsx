"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useChapters } from "@/hooks/useQuran";
import type { QuranChapter } from "@/types/quran";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { chapters } = useChapters();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        // The parent should handle open
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Filter chapters by query
  const filteredChapters: QuranChapter[] = query.length > 0
    ? chapters
        .filter(
          (c) =>
            c.name_simple.toLowerCase().includes(query.toLowerCase()) ||
            c.name_arabic.includes(query) ||
            c.translated_name.name.toLowerCase().includes(query.toLowerCase()) ||
            String(c.id) === query
        )
        .slice(0, 8)
    : chapters.slice(0, 6);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
          <svg
            className="text-[var(--text-muted)] flex-shrink-0"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search surah by name or number…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none text-sm"
          />
          <kbd className="text-xs bg-[var(--elevated)] px-2 py-0.5 rounded text-[var(--text-subtle)]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredChapters.length === 0 ? (
            <div className="text-center py-8 text-[var(--text-muted)] text-sm">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <>
              <p className="text-xs text-[var(--text-subtle)] px-3 py-2 uppercase tracking-wider">
                {query ? "Results" : "Popular Surahs"}
              </p>
              {filteredChapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/quran/${chapter.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--elevated)] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] text-xs font-bold flex-shrink-0">
                    {chapter.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                      {chapter.name_simple}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {chapter.translated_name.name} · {chapter.verses_count} verses
                    </p>
                  </div>
                  <p className="text-[var(--primary)] text-lg font-arabic">{chapter.name_arabic}</p>
                </Link>
              ))}
            </>
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-[var(--border)] flex items-center gap-4 text-xs text-[var(--text-subtle)]">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
}
