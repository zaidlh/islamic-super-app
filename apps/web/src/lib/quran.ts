import type { QuranChapter, QuranVerse, QuranApiChaptersResponse, QuranApiVersesResponse } from "@/types/quran";

const QURAN_API_BASE = "https://api.quran.com/api/v4";
const TRANSLATION_ID = 131; // Dr. Mustafa Khattab, The Clear Quran

// In-memory cache
const chaptersCache = new Map<string, QuranChapter[]>();
const versesCache = new Map<string, QuranVerse[]>();

export async function fetchChapters(): Promise<QuranChapter[]> {
  const cacheKey = "chapters";
  if (chaptersCache.has(cacheKey)) {
    return chaptersCache.get(cacheKey)!;
  }

  const res = await fetch(`${QURAN_API_BASE}/chapters?language=en`, {
    next: { revalidate: 86400 }, // Cache for 24h on server
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch chapters: ${res.status}`);
  }

  const data: QuranApiChaptersResponse = await res.json();
  chaptersCache.set(cacheKey, data.chapters);
  return data.chapters;
}

export async function fetchChapter(id: number): Promise<QuranChapter> {
  const chapters = await fetchChapters();
  const chapter = chapters.find((c) => c.id === id);
  if (!chapter) throw new Error(`Chapter ${id} not found`);
  return chapter;
}

export async function fetchVerses(
  surahNumber: number,
  page = 1,
  perPage = 50
): Promise<QuranApiVersesResponse> {
  const cacheKey = `verses-${surahNumber}-${page}-${perPage}`;
  if (versesCache.has(cacheKey)) {
    const cached = versesCache.get(cacheKey)!;
    // Return a fake response shape with cached verses
    return {
      verses: cached,
      pagination: { per_page: perPage, current_page: page, next_page: null, total_pages: 1, total_records: cached.length },
      meta: { filters: { chapter_number: surahNumber } },
    };
  }

  const params = new URLSearchParams({
    language: "en",
    words: "true",
    translations: String(TRANSLATION_ID),
    word_fields: "text_uthmani,transliteration",
    translation_fields: "resource_name,language_name",
    per_page: String(perPage),
    page: String(page),
  });

  const res = await fetch(
    `${QURAN_API_BASE}/verses/by_chapter/${surahNumber}?${params}`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch verses for surah ${surahNumber}: ${res.status}`);
  }

  const data: QuranApiVersesResponse = await res.json();
  versesCache.set(cacheKey, data.verses);
  return data;
}

export async function fetchAllVerses(surahNumber: number): Promise<QuranVerse[]> {
  const firstPage = await fetchVerses(surahNumber, 1, 286);
  const total = firstPage.pagination.total_records;
  const perPage = 286;
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return firstPage.verses;

  const pages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) =>
      fetchVerses(surahNumber, i + 2, perPage)
    )
  );

  return [firstPage, ...pages].flatMap((p) => p.verses);
}

export async function searchQuran(query: string): Promise<{
  verses: QuranVerse[];
  chapters: QuranChapter[];
}> {
  const params = new URLSearchParams({
    q: query,
    size: "20",
    translations: String(TRANSLATION_ID),
  });

  const [searchRes, chaptersData] = await Promise.all([
    fetch(`${QURAN_API_BASE}/search?${params}`),
    fetchChapters(),
  ]);

  if (!searchRes.ok) {
    return { verses: [], chapters: chaptersData };
  }

  const searchData = await searchRes.json();
  return {
    verses: searchData.search?.results ?? [],
    chapters: chaptersData,
  };
}

export function buildAudioUrl(
  surahNumber: number,
  verseNumber: number,
  reciterId = "Alafasy_128kbps"
): string {
  const paddedSurah = String(surahNumber).padStart(3, "0");
  const paddedVerse = String(verseNumber).padStart(3, "0");
  return `https://verses.quran.com/${reciterId}/${paddedSurah}${paddedVerse}.mp3`;
}
