"use client";

import { useState, useCallback } from "react";
import { HadithCard } from "./HadithCard";
import { useHadithCollection } from "@/hooks/useHadith";
import { cn } from "@/lib/utils";

interface CollectionListProps {
  collectionId: string;
  collectionName: string;
}

export function CollectionList({ collectionId, collectionName }: CollectionListProps) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<number | string>>(new Set());

  const { hadiths, total, isLoading } = useHadithCollection(collectionId, page, 20);

  const toggleExpand = useCallback((id: number | string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const filteredHadiths = query.trim()
    ? hadiths.filter((h) => h.text.toLowerCase().includes(query.toLowerCase()))
    : hadiths;

  const totalPages = Math.ceil(total / 20);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
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
          placeholder={`Search in ${collectionName}…`}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="input-field pl-10"
        />
      </div>

      {/* Total count */}
      <p className="text-sm text-[var(--text-muted)] mb-4">
        {query ? `${filteredHadiths.length} results` : `${total.toLocaleString()} hadiths total`}
        {!query && ` · Page ${page} of ${totalPages}`}
      </p>

      {/* List */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card p-5 space-y-3">
              <div className="flex gap-3">
                <div className="shimmer w-9 h-9 rounded-lg" />
                <div className="shimmer h-4 w-32 rounded" />
              </div>
              <div className="shimmer h-4 w-full rounded" />
              <div className="shimmer h-4 w-5/6 rounded" />
              <div className="shimmer h-4 w-4/5 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHadiths.map((hadith) => (
            <HadithCard
              key={hadith.hadithnumber}
              hadith={hadith}
              collectionId={collectionId}
              collectionName={collectionName}
              expanded={expandedIds.has(hadith.hadithnumber)}
              onToggle={() => toggleExpand(hadith.hadithnumber)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!query && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="btn-ghost px-3 py-2 text-sm disabled:opacity-30"
          >
            ← Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-sm transition-all",
                    page === pageNum
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--text-muted)] hover:bg-[var(--elevated)]"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="btn-ghost px-3 py-2 text-sm disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
