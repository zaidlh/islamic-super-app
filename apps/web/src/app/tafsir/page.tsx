import type { Metadata } from "next";
import Link from "next/link";
import { fetchChapters } from "@/lib/quran";

export const metadata: Metadata = { title: "Tafsir — Quran Commentary" };
export const revalidate = 86400;

export default async function TafsirPage() {
  const chapters = await fetchChapters().catch(() => []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">تفسير القرآن الكريم</h1>
        <p className="text-[var(--text-muted)] mt-1">Verse-by-verse commentary — Ibn Kathir, Al-Muyassar, Al-Jalalayn</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {chapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/tafsir/${ch.id}`}
            className="card card-hover p-4 flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold text-sm flex-shrink-0">
              {ch.id}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                {ch.name_simple}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {ch.translated_name.name} · {ch.verses_count} verses
              </p>
            </div>
            <p
              className="text-xl text-[var(--primary)] flex-shrink-0"
              style={{ fontFamily: "Amiri, serif" }}
              dir="rtl"
            >
              {ch.name_arabic}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
