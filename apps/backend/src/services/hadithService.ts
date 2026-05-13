import type { CacheEntry, HadithEntry } from "../types/index.js";

const HADITH_CDN = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions";
const CACHE_TTL = 86400 * 7 * 1000; // 7 days

const cache = new Map<string, CacheEntry<HadithEntry[]>>();

const VALID_COLLECTIONS = [
  "eng-bukhari",
  "eng-muslim",
  "eng-nawawi40",
  "eng-abudawud",
  "eng-tirmidhi",
  "eng-ibnmajah",
];

function getFromCache(key: string): HadithEntry[] | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key: string, data: HadithEntry[]): void {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL });
}

export async function getCollection(collectionId: string): Promise<HadithEntry[]> {
  if (!VALID_COLLECTIONS.includes(collectionId)) {
    throw new Error(`Invalid collection: ${collectionId}`);
  }

  const cached = getFromCache(collectionId);
  if (cached) return cached;

  const res = await fetch(`${HADITH_CDN}/${collectionId}.json`);
  if (!res.ok) throw new Error(`Hadith API error: ${res.status}`);

  const data = await res.json() as { hadiths: HadithEntry[] };
  const hadiths = data.hadiths ?? [];
  setCache(collectionId, hadiths);
  return hadiths;
}

export async function getHadithByNumber(
  collectionId: string,
  number: number
): Promise<HadithEntry | null> {
  const hadiths = await getCollection(collectionId);
  return hadiths.find((h) => Number(h.hadithnumber) === number) ?? null;
}

export async function searchCollection(
  collectionId: string,
  query: string,
  limit = 20
): Promise<HadithEntry[]> {
  const hadiths = await getCollection(collectionId);
  const lowerQuery = query.toLowerCase();
  return hadiths
    .filter((h) => h.text.toLowerCase().includes(lowerQuery))
    .slice(0, limit);
}

export async function getRandomHadith(collectionId: string): Promise<HadithEntry | null> {
  const hadiths = await getCollection(collectionId);
  if (hadiths.length === 0) return null;
  return hadiths[Math.floor(Math.random() * hadiths.length)] ?? null;
}
