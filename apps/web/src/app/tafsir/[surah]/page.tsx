import type { Metadata } from "next";
import { fetchChapter, fetchAllVerses } from "@/lib/quran";
import { TafsirPageClient } from "./TafsirPageClient";

interface Props { params: { surah: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chapter = await fetchChapter(Number(params.surah)).catch(() => null);
  return { title: chapter ? `Tafsir ${chapter.name_simple}` : "Tafsir" };
}

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({ surah: String(i + 1) }));
}

export const revalidate = 86400;

export default async function TafsirSurahPage({ params }: Props) {
  const surahId = Number(params.surah);
  const [chapter, verses] = await Promise.all([
    fetchChapter(surahId).catch(() => null),
    fetchAllVerses(surahId).catch(() => []),
  ]);
  if (!chapter) return <p className="text-[var(--text-muted)]">Surah not found.</p>;
  return <TafsirPageClient chapter={chapter} verses={verses} />;
}
