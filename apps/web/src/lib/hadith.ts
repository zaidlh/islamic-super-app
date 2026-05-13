import type { HadithEntry, HadithApiResponse } from "@/types/hadith";

const HADITH_CDN_BASE = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions";

// In-memory cache to avoid re-fetching
const hadithCache = new Map<string, HadithEntry[]>();

export async function fetchHadithCollection(collectionId: string): Promise<HadithEntry[]> {
  if (hadithCache.has(collectionId)) {
    return hadithCache.get(collectionId)!;
  }

  const url = `${HADITH_CDN_BASE}/${collectionId}.json`;

  const res = await fetch(url, {
    next: { revalidate: 86400 * 7 }, // Cache for 7 days
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch hadith collection ${collectionId}: ${res.status}`);
  }

  const data: HadithApiResponse = await res.json();
  const hadiths = data.hadiths ?? [];
  hadithCache.set(collectionId, hadiths);
  return hadiths;
}

export async function fetchHadithByNumber(
  collectionId: string,
  hadithNumber: number
): Promise<HadithEntry | null> {
  const hadiths = await fetchHadithCollection(collectionId);
  return hadiths.find((h) => Number(h.hadithnumber) === hadithNumber) ?? null;
}

export async function getRandomHadith(collectionId: string): Promise<HadithEntry | null> {
  const hadiths = await fetchHadithCollection(collectionId);
  if (hadiths.length === 0) return null;
  return hadiths[Math.floor(Math.random() * hadiths.length)] ?? null;
}

export async function searchHadiths(
  collectionId: string,
  query: string,
  limit = 20
): Promise<HadithEntry[]> {
  const hadiths = await fetchHadithCollection(collectionId);
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return hadiths.slice(0, limit);

  return hadiths
    .filter((h) => h.text.toLowerCase().includes(lowerQuery))
    .slice(0, limit);
}

export function previewText(text: string, maxChars = 250): string {
  if (text.length <= maxChars) return text;
  const truncated = text.slice(0, maxChars).trimEnd();
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 200 ? truncated.slice(0, lastSpace) : truncated) + "…";
}
