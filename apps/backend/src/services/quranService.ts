import type { CacheEntry } from "../types/index.js";

const QURAN_API = "https://api.quran.com/api/v4";
const CACHE_TTL = 86400 * 1000; // 24 hours

const cache = new Map<string, CacheEntry<unknown>>();

function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache<T>(key: string, data: T, ttl = CACHE_TTL): void {
  cache.set(key, { data, expiresAt: Date.now() + ttl });
}

export async function getChapters() {
  const cached = getFromCache("chapters");
  if (cached) return cached;

  const res = await fetch(`${QURAN_API}/chapters?language=en`);
  if (!res.ok) throw new Error(`Quran API error: ${res.status}`);
  const data = await res.json() as { chapters: unknown[] };
  setCache("chapters", data.chapters);
  return data.chapters;
}

export async function getChapter(id: number) {
  const key = `chapter-${id}`;
  const cached = getFromCache(key);
  if (cached) return cached;

  const res = await fetch(`${QURAN_API}/chapters/${id}?language=en`);
  if (!res.ok) throw new Error(`Quran API error: ${res.status}`);
  const data = await res.json() as { chapter: unknown };
  setCache(key, data.chapter);
  return data.chapter;
}

export async function getVerses(surahId: number, page = 1, perPage = 50) {
  const key = `verses-${surahId}-${page}-${perPage}`;
  const cached = getFromCache(key);
  if (cached) return cached;

  const params = new URLSearchParams({
    language: "en",
    words: "true",
    translations: "131",
    per_page: String(perPage),
    page: String(page),
  });

  const res = await fetch(`${QURAN_API}/verses/by_chapter/${surahId}?${params}`);
  if (!res.ok) throw new Error(`Quran API error: ${res.status}`);
  const data = await res.json();
  setCache(key, data);
  return data;
}

export async function searchQuran(query: string) {
  const res = await fetch(
    `${QURAN_API}/search?q=${encodeURIComponent(query)}&size=20&translations=131`
  );
  if (!res.ok) throw new Error(`Quran search error: ${res.status}`);
  const data = await res.json() as { search: unknown };
  return data.search;
}
