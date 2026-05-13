import type { QuranVerse, QuranChapter, SearchResult } from "./types";

/**
 * Normalize Arabic text by removing diacritics for search
 */
export function normalizeArabic(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, "") // Remove tashkeel
    .replace(/\u0622/g, "\u0627") // Replace alef madda with alef
    .replace(/\u0623/g, "\u0627") // Replace alef hamza above with alef
    .replace(/\u0625/g, "\u0627") // Replace alef hamza below with alef
    .replace(/\u0671/g, "\u0627") // Replace alef wasla with alef
    .replace(/\u0629/g, "\u0647") // Replace ta marbuta with ha
    .replace(/\u064A/g, "\u06CC") // Normalize ya
    .trim();
}

/**
 * Search verses by Arabic text or translation
 */
export function searchVerses(
  verses: QuranVerse[],
  query: string,
  chapters: QuranChapter[]
): SearchResult[] {
  const normalizedQuery = normalizeArabic(query.trim());
  const lowerQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  const chapterMap = new Map(chapters.map((c) => [c.id, c]));

  for (const verse of verses) {
    let score = 0;
    const highlights: string[] = [];

    // Check Arabic text
    const normalizedText = normalizeArabic(verse.text_uthmani);
    if (normalizedText.includes(normalizedQuery)) {
      score += 10;
      highlights.push(verse.text_uthmani);
    }

    // Check translations
    for (const translation of verse.translations ?? []) {
      const lowerTranslation = translation.text.toLowerCase();
      if (lowerTranslation.includes(lowerQuery)) {
        score += 5;
        highlights.push(translation.text);
      }
    }

    if (score > 0) {
      const [surahNum] = verse.verse_key.split(":").map(Number);
      const chapter = chapterMap.get(surahNum!);
      if (chapter) {
        results.push({ verse, chapter, score, highlights });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 50);
}

/**
 * Get the Basmala text (for display before each surah)
 */
export function getBasmala(): string {
  return "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
}

/**
 * Build a verse audio URL for a given reciter
 */
export function buildAudioUrl(
  surahNumber: number,
  verseNumber: number,
  reciter: string = "ar.alafasy"
): string {
  const paddedSurah = String(surahNumber).padStart(3, "0");
  const paddedVerse = String(verseNumber).padStart(3, "0");
  return `https://verses.quran.com/${reciter}/${paddedSurah}${paddedVerse}.mp3`;
}

/**
 * Get verse key from surah and ayah numbers
 */
export function verseKey(surah: number, ayah: number): string {
  return `${surah}:${ayah}`;
}

/**
 * Parse verse key into surah and ayah
 */
export function parseVerseKey(key: string): { surah: number; ayah: number } {
  const [surah, ayah] = key.split(":").map(Number);
  return { surah: surah ?? 1, ayah: ayah ?? 1 };
}

/**
 * Calculate reading time estimate (words per minute = ~150 for Arabic)
 */
export function estimateReadingTime(verseCount: number): string {
  const avgWordsPerVerse = 10;
  const wpm = 120;
  const minutes = Math.ceil((verseCount * avgWordsPerVerse) / wpm);
  if (minutes < 60) return `~${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return `~${hours}h ${remaining}m`;
}

/**
 * Get juz number from surah and ayah (approximate mapping)
 */
export const JUZ_MAPPING: Array<{ surah: number; ayah: number }> = [
  { surah: 1, ayah: 1 },   // Juz 1
  { surah: 2, ayah: 142 },  // Juz 2
  { surah: 2, ayah: 253 },  // Juz 3
  { surah: 3, ayah: 92 },   // Juz 4
  { surah: 4, ayah: 24 },   // Juz 5
  { surah: 4, ayah: 148 },  // Juz 6
  { surah: 5, ayah: 82 },   // Juz 7
  { surah: 6, ayah: 111 },  // Juz 8
  { surah: 7, ayah: 87 },   // Juz 9
  { surah: 8, ayah: 41 },   // Juz 10
  { surah: 9, ayah: 93 },   // Juz 11
  { surah: 11, ayah: 6 },   // Juz 12
  { surah: 12, ayah: 53 },  // Juz 13
  { surah: 15, ayah: 1 },   // Juz 14
  { surah: 17, ayah: 1 },   // Juz 15
  { surah: 18, ayah: 75 },  // Juz 16
  { surah: 21, ayah: 1 },   // Juz 17
  { surah: 23, ayah: 1 },   // Juz 18
  { surah: 25, ayah: 21 },  // Juz 19
  { surah: 27, ayah: 56 },  // Juz 20
  { surah: 29, ayah: 46 },  // Juz 21
  { surah: 33, ayah: 31 },  // Juz 22
  { surah: 36, ayah: 28 },  // Juz 23
  { surah: 39, ayah: 32 },  // Juz 24
  { surah: 41, ayah: 47 },  // Juz 25
  { surah: 46, ayah: 1 },   // Juz 26
  { surah: 51, ayah: 31 },  // Juz 27
  { surah: 58, ayah: 1 },   // Juz 28
  { surah: 67, ayah: 1 },   // Juz 29
  { surah: 78, ayah: 1 },   // Juz 30
];
