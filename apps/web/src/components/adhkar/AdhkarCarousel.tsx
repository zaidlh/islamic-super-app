"use client";

import { useState } from "react";
import { useAdhkar } from "@/hooks/useAdhkar";
import { cn } from "@/lib/utils";

interface AdhkarCarouselProps {
  categoryId: string;
}

export function AdhkarCarousel({ categoryId }: AdhkarCarouselProps) {
  const { entries, category } = useAdhkar(categoryId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSet, setCompletedSet] = useState<Set<string>>(new Set());

  if (!category || entries.length === 0) return null;

  const current = entries[currentIndex];
  if (!current) return null;

  const isCompleted = completedSet.has(current.id);

  const handleComplete = () => {
    setCompletedSet((prev) => new Set([...prev, current.id]));
    // Auto-advance
    setTimeout(() => {
      if (currentIndex < entries.length - 1) {
        setCurrentIndex((i) => i + 1);
      }
    }, 500);
  };

  const progress = Math.round(((currentIndex + (isCompleted ? 1 : 0)) / entries.length) * 100);

  return (
    <div className="card p-0 overflow-hidden">
      {/* Category header */}
      <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-[var(--text)]">{category.name}</h3>
          <p className="text-xs text-[var(--text-muted)]">{category.description}</p>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          {currentIndex + 1}/{entries.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[var(--border)]">
        <div
          className="h-full bg-[var(--primary)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Arabic text */}
        <p
          className="text-[var(--text)] text-2xl text-right leading-loose mb-6"
          dir="rtl"
          style={{ fontFamily: "Amiri, serif", lineHeight: "2.8" }}
        >
          {current.arabic}
        </p>

        {/* Transliteration */}
        {current.transliteration && (
          <p className="text-[var(--text-muted)] text-sm italic mb-4 leading-relaxed">
            {current.transliteration}
          </p>
        )}

        {/* Translation */}
        <p className="text-[var(--text)] text-sm leading-relaxed mb-6">{current.translation}</p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border)]">
          <span className="badge bg-[var(--elevated)] text-[var(--text-muted)] text-xs">
            📖 {current.reference}
          </span>
          {current.count > 1 && (
            <span className="badge bg-[var(--primary)]/10 text-[var(--primary)] text-xs">
              × {current.count} times
            </span>
          )}
          {current.benefit && (
            <p className="text-xs text-[var(--text-subtle)] w-full mt-1">✨ {current.benefit}</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-[var(--border)] flex items-center gap-3">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--elevated)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors disabled:opacity-30"
        >
          ←
        </button>

        <button
          onClick={handleComplete}
          className={cn(
            "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all",
            isCompleted
              ? "bg-emerald-500/10 text-emerald-500 cursor-default"
              : "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] active:scale-95"
          )}
        >
          {isCompleted ? "✓ Completed" : `Done × ${current.count}`}
        </button>

        <button
          onClick={() => setCurrentIndex((i) => Math.min(entries.length - 1, i + 1))}
          disabled={currentIndex === entries.length - 1}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--elevated)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors disabled:opacity-30"
        >
          →
        </button>
      </div>
    </div>
  );
}
