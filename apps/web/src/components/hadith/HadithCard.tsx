"use client";

import type { HadithEntry } from "@/types/hadith";
import { useBookmarks } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";

interface HadithCardProps {
  hadith: HadithEntry;
  collectionId: string;
  collectionName: string;
  expanded?: boolean;
  onToggle?: () => void;
}

export function HadithCard({
  hadith,
  collectionId,
  collectionName,
  expanded = false,
  onToggle,
}: HadithCardProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const hadithId = `${collectionId}-${hadith.hadithnumber}`;
  const bookmarked = isBookmarked(hadithId);

  const previewLength = 300;
  const isLong = hadith.text.length > previewLength;
  const displayText = !expanded && isLong ? hadith.text.slice(0, previewLength) + "…" : hadith.text;

  const handleBookmark = () => {
    toggleBookmark({
      id: hadithId,
      type: "hadith",
      reference: `${collectionName} #${hadith.hadithnumber}`,
      text: hadith.text.slice(0, 200),
    });
  };

  const gradeColor = (grade: string): string => {
    const lower = grade.toLowerCase();
    if (lower.includes("sahih") || lower.includes("authentic")) return "text-emerald-500 bg-emerald-500/10";
    if (lower.includes("hasan") || lower.includes("good")) return "text-blue-400 bg-blue-400/10";
    if (lower.includes("da") || lower.includes("weak")) return "text-red-400 bg-red-400/10";
    return "text-[var(--text-muted)] bg-[var(--elevated)]";
  };

  return (
    <div className="card p-5 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold text-sm flex-shrink-0">
            {hadith.hadithnumber}
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)]">{collectionName}</p>
            {hadith.chapter && (
              <p className="text-xs text-[var(--text-subtle)] mt-0.5 max-w-[200px] truncate">
                {hadith.chapter}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleBookmark}
            className={cn(
              "w-7 h-7 flex items-center justify-center rounded transition-all",
              bookmarked
                ? "text-[var(--primary)]"
                : "text-[var(--text-subtle)] hover:text-[var(--primary)]"
            )}
          >
            <svg
              width="13"
              height="13"
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
              navigator.clipboard.writeText(
                `${hadith.text}\n\n— ${collectionName} #${hadith.hadithnumber}`
              );
            }}
            className="w-7 h-7 flex items-center justify-center rounded text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hadith text */}
      <p className="text-[var(--text)] leading-relaxed text-sm">{displayText}</p>

      {isLong && (
        <button
          onClick={onToggle}
          className="text-xs text-[var(--primary)] hover:underline mt-2"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      {/* Grades */}
      {hadith.grades && hadith.grades.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[var(--border)]">
          {hadith.grades.map((g, i) => (
            <span key={i} className={cn("badge text-xs", gradeColor(g.grade))}>
              {g.grade}
              {g.graded_by && <span className="ml-1 opacity-70">— {g.graded_by}</span>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
