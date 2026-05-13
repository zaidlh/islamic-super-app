"use client";

import useSWR from "swr";
import type { HadithEntry } from "@/types/hadith";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useHadithCollection(collectionId: string | null, page = 1, limit = 20) {
  const { data, error, isLoading } = useSWR<{
    hadiths: HadithEntry[];
    total: number;
    page: number;
  }>(
    collectionId ? `/api/hadith/${collectionId}?page=${page}&limit=${limit}` : null,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  return {
    hadiths: data?.hadiths ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
  };
}

export function useHadithSearch(collectionId: string, query: string) {
  const { data, error, isLoading } = useSWR(
    query.length > 2 ? `/api/hadith/${collectionId}/search?q=${encodeURIComponent(query)}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    results: data?.results ?? [],
    isLoading,
    error,
  };
}

export function useRandomHadith(collectionId = "eng-nawawi40") {
  const { data, error, isLoading } = useSWR<{ hadith: HadithEntry }>(
    `/api/hadith/${collectionId}/random`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  return {
    hadith: data?.hadith,
    isLoading,
    error,
  };
}
