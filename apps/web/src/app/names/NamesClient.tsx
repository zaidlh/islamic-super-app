"use client";
import { useState } from "react";
import { ALLAH_NAMES, type AllaahName } from "@/data/names";
import { cn } from "@/lib/utils";

export function NamesClient() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AllaahName | null>(null);

  const filtered = ALLAH_NAMES.filter(
    (n) =>
      n.transliteration.toLowerCase().includes(query.toLowerCase()) ||
      n.meaning.toLowerCase().includes(query.toLowerCase()) ||
      n.arabic.includes(query)
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--text)]">
          أَسْمَاءُ اللَّهِ الْحُسْنَى
        </h1>
        <p className="text-[var(--text-muted)]">The 99 Most Beautiful Names of Allah</p>
      </div>

      <input
        className="input-field"
        placeholder="Search by name, transliteration or meaning…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((name) => (
          <button
            key={name.number}
            onClick={() => setSelected(name)}
            className="card card-hover p-4 text-center flex flex-col items-center gap-2 group"
          >
            <span className="text-xs text-[var(--primary)] font-medium bg-[var(--primary)]/10 px-2 py-0.5 rounded-full">
              {name.number}
            </span>
            <p
              className="text-2xl text-[var(--text)] leading-loose"
              style={{ fontFamily: "Amiri, serif" }}
              dir="rtl"
            >
              {name.arabic}
            </p>
            <p className="text-xs font-medium text-[var(--primary)]">{name.transliteration}</p>
            <p className="text-xs text-[var(--text-muted)] leading-snug">{name.meaning}</p>
          </button>
        ))}
      </div>

      {/* Detail Drawer */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setSelected(null)} />
          <div className="fixed right-0 top-0 h-screen w-full max-w-md bg-[var(--surface)] border-l border-[var(--border)] z-50 flex flex-col shadow-2xl animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <div>
                <span className="badge bg-[var(--primary)]/10 text-[var(--primary)] text-xs mb-1 inline-block">
                  #{selected.number}
                </span>
                <h2 className="font-bold text-lg text-[var(--text)]">{selected.transliteration}</h2>
                <p className="text-sm text-[var(--text-muted)]">{selected.meaning}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--elevated)] transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="text-center py-8 bg-[var(--elevated)] rounded-xl">
                <p
                  className="text-5xl text-[var(--primary)]"
                  style={{ fontFamily: "Amiri, serif", lineHeight: 2 }}
                  dir="rtl"
                >
                  {selected.arabic}
                </p>
              </div>
              <div className="card p-4">
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">Meaning</p>
                <p className="text-[var(--text)] font-medium">{selected.meaning}</p>
              </div>
              <div className="card p-4">
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">Benefits & Reflection</p>
                <p className="text-[var(--text)] leading-relaxed text-sm">{selected.benefits}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
