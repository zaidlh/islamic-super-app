"use client";

import useSWR from "swr";
import type { QuranChapter, QuranVerse } from "@/types/quran";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useChapters() {
  const { data, error, isLoading } = useSWR<{ chapters: QuranChapter[] }>(
    "/api/quran/chapters",
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  return {
    chapters: data?.chapters ?? [],
    isLoading,
    error,
  };
}

export function useChapter(surahId: number | null) {
  const { data, error, isLoading } = useSWR<{ chapter: QuranChapter }>(
    surahId ? `/api/quran/chapters/${surahId}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    chapter: data?.chapter,
    isLoading,
    error,
  };
}

export function useVerses(surahId: number | null) {
  const { data, error, isLoading } = useSWR<{ verses: QuranVerse[]; total: number }>(
    surahId ? `/api/quran/verses/${surahId}` : null,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  return {
    verses: data?.verses ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
  };
}

export function useQuranSearch(query: string) {
  const { data, error, isLoading } = useSWR(
    query.length > 2 ? `/api/quran/search?q=${encodeURIComponent(query)}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    results: data?.results ?? [],
    isLoading,
    error,
  };
}
