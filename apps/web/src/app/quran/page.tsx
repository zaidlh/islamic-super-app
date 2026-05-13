import type { Metadata } from "next";
import { fetchChapters } from "@/lib/quran";
import { SurahList } from "@/components/quran/SurahList";

export const metadata: Metadata = {
  title: "Quran",
  description: "Read the Holy Quran with Arabic text, translation, and transliteration.",
};

export const revalidate = 86400;

export default async function QuranPage() {
  const chapters = await fetchChapters();

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2">القرآن الكريم</h1>
        <p className="text-[var(--text-muted)]">
          The Holy Quran — 114 Surahs, 6,236 Ayahs
        </p>
      </div>
      <SurahList chapters={chapters} />
    </div>
  );
}
