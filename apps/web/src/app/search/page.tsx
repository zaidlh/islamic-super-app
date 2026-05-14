"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Result {
  id: string;
  type: "quran" | "hadith" | "adhkar";
  title: string;
  subtitle: string;
  arabic?: string;
  href: string;
}

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const TYPE_STYLES: Record<Result["type"], string> = {
  quran: "bg-emerald-500/10 text-emerald-400",
  hadith: "bg-blue-500/10 text-blue-400",
  adhkar: "bg-purple-500/10 text-purple-400",
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 400);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true);

    const q = debouncedQuery.trim();
    const found: Result[] = [];

    Promise.allSettled([
      // Quran search
      fetch(
        `https://api.quran.com/api/v4/search?q=${encodeURIComponent(q)}&size=5&translations=131`,
        { signal: abortRef.current.signal }
      )
        .then((r) => r.json())
        .then((data) => {
          const items = data?.search?.results ?? [];
          items.forEach((item: { verse_key: string; text: string; translations?: {text: string}[] }) => {
            const [s, v] = item.verse_key.split(":");
            found.push({
              id: `quran-${item.verse_key}`,
              type: "quran",
              title: `Surah ${s}, Ayah ${v}`,
              subtitle: item.translations?.[0]?.text?.replace(/<[^>]+>/g, "").slice(0, 120) ?? item.text.slice(0, 80),
              arabic: item.text?.slice(0, 60),
              href: `/quran/${s}`,
            });
          });
        }),

      // Hadith search (Nawawi40 as lightweight option)
      fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-nawawi40.json`,
        { signal: abortRef.current.signal }
      )
        .then((r) => r.json())
        .then((data) => {
          const hadiths: {hadithnumber: number; text: string}[] = data?.hadiths ?? [];
          const lq = q.toLowerCase();
          hadiths
            .filter((h) => h.text?.toLowerCase().includes(lq))
            .slice(0, 3)
            .forEach((h) => {
              found.push({
                id: `hadith-nawawi-${h.hadithnumber}`,
                type: "hadith",
                title: `40 Hadith Nawawi #${h.hadithnumber}`,
                subtitle: h.text.slice(0, 150) + "…",
                href: `/hadith/eng-nawawi40`,
              });
            });
        }),
    ]).finally(() => {
      setResults(found);
      setLoading(false);
    });
  }, [debouncedQuery]);

  const grouped = {
    quran: results.filter((r) => r.type === "quran"),
    hadith: results.filter((r) => r.type === "hadith"),
    adhkar: results.filter((r) => r.type === "adhkar"),
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">البحث الشامل</h1>
        <p className="text-[var(--text-muted)] mt-1">Search across Quran, Hadith, and more</p>
      </div>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-lg">🔍</span>
        <input
          className="input-field pl-10 py-3 text-base"
          placeholder="Search in English or Arabic… (e.g. 'mercy', 'salam', 'patience')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm animate-pulse">Searching…</span>
        )}
      </div>

      {query.length > 0 && query.length < 2 && (
        <p className="text-sm text-[var(--text-muted)]">Type at least 2 characters to search…</p>
      )}

      {results.length === 0 && debouncedQuery.length >= 2 && !loading && (
        <div className="card p-8 text-center">
          <p className="text-4xl mb-2">🔍</p>
          <p className="text-[var(--text-muted)]">No results for "{debouncedQuery}"</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">Try a different word or phrase</p>
        </div>
      )}

      {(["quran", "hadith", "adhkar"] as const).map((type) => {
        const items = grouped[type];
        if (!items.length) return null;
        return (
          <div key={type} className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="section-title capitalize">{type === "quran" ? "📖 Quran" : type === "hadith" ? "📚 Hadith" : "🤲 Adhkar"}</h2>
              <span className="badge bg-[var(--elevated)] text-[var(--text-muted)] text-xs">{items.length}</span>
            </div>
            {items.map((result) => (
              <Link key={result.id} href={result.href} className="card card-hover p-4 flex flex-col gap-1 block">
                <div className="flex items-center gap-2">
                  <span className={cn("badge text-xs", TYPE_STYLES[result.type])}>{result.type}</span>
                  <span className="font-medium text-[var(--text)] text-sm">{result.title}</span>
                </div>
                {result.arabic && (
                  <p className="text-sm text-[var(--primary)] text-right" style={{ fontFamily: "Amiri, serif", lineHeight: 2 }} dir="rtl">
                    {result.arabic}…
                  </p>
                )}
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{result.subtitle}</p>
              </Link>
            ))}
          </div>
        );
      })}

      {!query && (
        <div className="space-y-4">
          <h2 className="section-title">Quick Links</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { href: "/quran", label: "📖 Browse Quran", desc: "114 Surahs" },
              { href: "/hadith", label: "📚 Browse Hadith", desc: "6 Collections" },
              { href: "/tafsir", label: "🔬 Tafsir", desc: "Verse Commentary" },
              { href: "/names", label: "✨ 99 Names", desc: "Asma ul Husna" },
              { href: "/prophets", label: "🌟 Prophets", desc: "25 Stories" },
              { href: "/translations", label: "🌍 Translations", desc: "20+ Languages" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="card card-hover p-3 flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">{link.label}</p>
                  <p className="text-xs text-[var(--text-muted)]">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
