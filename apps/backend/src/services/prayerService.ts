import type { CacheEntry } from "../types/index.js";

const ALADHAN_BASE = "https://api.aladhan.com/v1";

interface PrayerTimesData {
  timings: Record<string, string>;
  date: unknown;
  meta: unknown;
}

const cache = new Map<string, CacheEntry<PrayerTimesData>>();
const CACHE_TTL = 3600 * 1000; // 1 hour

function getCacheKey(lat?: number, lng?: number, city?: string, country?: string, method = 3): string {
  if (lat !== undefined && lng !== undefined) {
    return `coords-${lat.toFixed(4)}-${lng.toFixed(4)}-${method}`;
  }
  return `city-${city}-${country}-${method}`;
}

function getFromCache(key: string): PrayerTimesData | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export async function getPrayerTimesByCoords(
  lat: number,
  lng: number,
  method = 3
): Promise<PrayerTimesData> {
  const key = getCacheKey(lat, lng, undefined, undefined, method);
  const cached = getFromCache(key);
  if (cached) return cached;

  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    method: String(method),
  });

  const res = await fetch(`${ALADHAN_BASE}/timings?${params}`);
  if (!res.ok) throw new Error(`Aladhan API error: ${res.status}`);

  const json = await res.json() as { code: number; data: PrayerTimesData };
  if (json.code !== 200) throw new Error(`Aladhan API returned ${json.code}`);

  cache.set(key, { data: json.data, expiresAt: Date.now() + CACHE_TTL });
  return json.data;
}

export async function getPrayerTimesByCity(
  city: string,
  country: string,
  method = 3
): Promise<PrayerTimesData> {
  const key = getCacheKey(undefined, undefined, city, country, method);
  const cached = getFromCache(key);
  if (cached) return cached;

  const params = new URLSearchParams({ city, country, method: String(method) });
  const res = await fetch(`${ALADHAN_BASE}/timingsByCity?${params}`);
  if (!res.ok) throw new Error(`Aladhan API error: ${res.status}`);

  const json = await res.json() as { code: number; data: PrayerTimesData };
  if (json.code !== 200) throw new Error(`Aladhan returned ${json.code}`);

  cache.set(key, { data: json.data, expiresAt: Date.now() + CACHE_TTL });
  return json.data;
}
