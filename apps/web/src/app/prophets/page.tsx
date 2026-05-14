"use client";
import { useState } from "react";
import { PROPHETS, type Prophet } from "@/data/prophets";
import { cn } from "@/lib/utils";

export default function ProphetsPage() {
  const [selected, setSelected] = useState<Prophet | null>(null);
  const [query, setQuery] = useState("");

  const filtered = PROPHETS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.arabicName.includes(query)
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">قِصَصُ الْأَنْبِيَاء</h1>
        <p className="text-[var(--text-muted)] mt-1">Stories of the 25 Prophets mentioned in the Quran</p>
      </div>

      <input
        className="input-field"
        placeholder="Search prophets…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((prophet) => (
          <button
            key={prophet.id}
            onClick={() => setSelected(prophet)}
            className="card card-hover p-5 text-left group flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="text-2xl text-[var(--primary)] mb-1"
                  style={{ fontFamily: "Amiri, serif", lineHeight: 1.8 }}
                  dir="rtl"
                >
                  {prophet.arabicName}
                </p>
                <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                  Prophet {prophet.name} (AS)
                </h3>
                <p className="text-xs text-[var(--text-muted)]">{prophet.title}</p>
              </div>
              <span className="badge bg-[var(--primary)]/10 text-[var(--primary)] text-xs">
                #{prophet.id}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>📅 {prophet.period}</span>
              <span>📖 Mentioned {prophet.mentionedIn}×</span>
            </div>
          </button>
        ))}
      </div>

      {/* Story Drawer */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setSelected(null)} />
          <div className="fixed right-0 top-0 h-screen w-full max-w-lg bg-[var(--surface)] border-l border-[var(--border)] z-50 flex flex-col shadow-2xl overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 bg-[var(--surface)] border-b border-[var(--border)] p-6 flex items-start justify-between gap-4">
              <div>
                <p
                  className="text-3xl text-[var(--primary)] mb-1"
                  style={{ fontFamily: "Amiri, serif", lineHeight: 1.8 }}
                  dir="rtl"
                >
                  {selected.arabicName}
                </p>
                <h2 className="font-bold text-xl text-[var(--text)]">Prophet {selected.name} (AS)</h2>
                <p className="text-sm text-[var(--primary)]">{selected.title}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--elevated)] transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex gap-4 text-sm">
                <div className="card p-3 flex-1 text-center">
                  <p className="text-xs text-[var(--text-muted)] mb-1">Period</p>
                  <p className="font-medium text-[var(--text)]">{selected.period}</p>
                </div>
                <div className="card p-3 flex-1 text-center">
                  <p className="text-xs text-[var(--text-muted)] mb-1">Mentioned in Quran</p>
                  <p className="font-medium text-[var(--primary)]">{selected.mentionedIn} times</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--text)] mb-2">Story</h3>
                <p className="text-sm text-[var(--text)] leading-relaxed">{selected.story}</p>
              </div>

              {selected.quranVerses.length > 0 && (
                <div>
                  <h3 className="font-semibold text-[var(--text)] mb-2">Quranic References</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.quranVerses.map((v) => (
                      <span key={v} className="badge bg-[var(--primary)]/10 text-[var(--primary)] text-xs">
                        📖 {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-[var(--text)] mb-2">Lessons</h3>
                <ul className="space-y-2">
                  {selected.lessons.map((lesson, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--text)]">
                      <span className="text-[var(--primary)] mt-0.5 flex-shrink-0">✦</span>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
