import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchChapter, fetchAllVerses } from "@/lib/quran";
import { QuranReader } from "@/components/quran/QuranReader";

interface Props {
  params: { surah: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const surahId = parseInt(params.surah);
  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    return { title: "Not Found" };
  }
  try {
    const chapter = await fetchChapter(surahId);
    return {
      title: `${chapter.name_simple} — Surah ${surahId}`,
      description: `Read Surah ${chapter.name_simple} (${chapter.name_arabic}) — ${chapter.verses_count} verses, ${chapter.revelation_place === "makkah" ? "Makkan" : "Medinan"} revelation.`,
    };
  } catch {
    return { title: `Surah ${surahId}` };
  }
}

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({ surah: String(i + 1) }));
}

export const revalidate = 86400;

export default async function SurahPage({ params }: Props) {
  const surahId = parseInt(params.surah);

  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    notFound();
  }

  const [chapter, verses] = await Promise.all([
    fetchChapter(surahId),
    fetchAllVerses(surahId),
  ]);

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <QuranReader chapter={chapter} verses={verses} />
    </div>
  );
}
