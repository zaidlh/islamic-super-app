"use client";
import { useState } from "react";
import { TAJWEED_RULES } from "@/data/tajweed";
import { cn } from "@/lib/utils";

export default function TajweedPage() {
  const [selected, setSelected] = useState<typeof TAJWEED_RULES[0] | null>(null);
  const [learned, setLearned] = useState<Record<number, boolean>>({});
  const learnedCount = Object.values(learned).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">أحكام التجويد</h1>
        <p className="text-[var(--text-muted)] mt-1">Rules of Tajweed — The Science of Quran Recitation</p>
      </div>

      <div className="card p-4 flex items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-[var(--text-muted)] mb-1">{learnedCount} / {TAJWEED_RULES.length} rules learned</p>
          <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--primary)] rounded-full transition-all" style={{ width: `${(learnedCount/TAJWEED_RULES.length)*100}%` }} />
          </div>
        </div>
        <span className="text-2xl font-bold text-[var(--primary)]">{Math.round((learnedCount/TAJWEED_RULES.length)*100)}%</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {TAJWEED_RULES.map((rule) => (
          <div key={rule.id} className="card card-hover overflow-hidden">
            <button onClick={() => setSelected(rule)} className="w-full p-4 text-left">
              <div className="flex items-start justify-between gap-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: rule.color }} />
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text)] text-sm">{rule.name}</h3>
                  <p className="text-xs text-[var(--primary)]" style={{ fontFamily: "Amiri, serif" }} dir="rtl">{rule.arabicName}</p>
                </div>
                {learned[rule.id] && <span className="text-emerald-400 text-sm flex-shrink-0">✓</span>}
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2 leading-snug line-clamp-2">{rule.description}</p>
            </button>
            <div className="px-4 pb-3">
              <button
                onClick={() => setLearned((l) => ({ ...l, [rule.id]: !l[rule.id] }))}
                className={cn("text-xs px-3 py-1 rounded-full transition-all",
                  learned[rule.id] ? "bg-emerald-500/20 text-emerald-400" : "bg-[var(--elevated)] text-[var(--text-muted)]")}
              >
                {learned[rule.id] ? "✓ Learned" : "Mark as Learned"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setSelected(null)} />
          <div className="fixed right-0 top-0 h-screen w-full max-w-lg bg-[var(--surface)] border-l border-[var(--border)] z-50 flex flex-col overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 bg-[var(--surface)] border-b border-[var(--border)] p-6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selected.color }} />
                  <h2 className="font-bold text-xl text-[var(--text)]">{selected.name}</h2>
                </div>
                <p className="text-[var(--primary)] text-lg" style={{ fontFamily: "Amiri, serif" }} dir="rtl">{selected.arabicName}</p>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--elevated)] transition-colors">✕</button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-sm text-[var(--text)] leading-relaxed">{selected.description}</p>
              {selected.examples.length > 0 && (
                <div>
                  <h3 className="font-semibold text-[var(--text)] mb-3">Examples</h3>
                  <div className="space-y-2">
                    {selected.examples.map((ex, i) => (
                      <div key={i} className="card p-3 flex items-center gap-3">
                        <p className="text-2xl flex-shrink-0" style={{ fontFamily: "Amiri, serif", color: selected.color, lineHeight: 2 }} dir="rtl">{ex.arabic}</p>
                        <p className="text-sm text-[var(--text-muted)]">{ex.transliteration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => setLearned((l) => ({ ...l, [selected.id]: !l[selected.id] }))}
                className={cn("w-full py-2.5 rounded-xl font-medium transition-all",
                  learned[selected.id] ? "bg-emerald-500/20 text-emerald-400" : "btn-primary")}
              >
                {learned[selected.id] ? "✓ Marked as Learned" : "Mark as Learned"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
