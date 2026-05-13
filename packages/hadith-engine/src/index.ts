export * from "./types";

import type { HadithEntry, HadithSearchResult } from "./types";

/**
 * Search hadiths by keyword in text
 */
export function searchHadiths(
  hadiths: HadithEntry[],
  collectionId: string,
  collectionName: string,
  query: string
): HadithSearchResult[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  const results: HadithSearchResult[] = [];

  for (const hadith of hadiths) {
    const lowerText = hadith.text.toLowerCase();
    let score = 0;

    if (lowerText.includes(lowerQuery)) {
      // Exact phrase match is higher score
      const occurrences = (lowerText.match(new RegExp(escapeRegex(lowerQuery), "g")) || []).length;
      score = occurrences * 10;

      // Boost if found near start
      if (lowerText.indexOf(lowerQuery) < 100) score += 5;

      results.push({ hadith, collection: collectionId, collection_name: collectionName, score });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 30);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Get a random hadith from a collection
 */
export function getRandomHadith(hadiths: HadithEntry[]): HadithEntry | undefined {
  if (hadiths.length === 0) return undefined;
  return hadiths[Math.floor(Math.random() * hadiths.length)];
}

/**
 * Truncate hadith text for preview
 */
export function previewHadith(text: string, maxChars = 200): string {
  if (text.length <= maxChars) return text;
  const truncated = text.slice(0, maxChars).trimEnd();
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 150 ? truncated.slice(0, lastSpace) : truncated) + "…";
}

/**
 * Format hadith reference display
 */
export function formatReference(collectionName: string, number: number | string): string {
  return `${collectionName} ${number}`;
}
