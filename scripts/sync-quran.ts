#!/usr/bin/env tsx
/**
 * sync-quran.ts
 * Fetches Quran data from real sources and saves normalized JSON to /content/quran/
 */

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUTPUT_DIR = join(process.cwd(), "content", "quran");

async function fetchJson(url: string): Promise<unknown> {
  console.log(`  Fetching: ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

function saveJson(filename: string, data: unknown): void {
  const filepath = join(OUTPUT_DIR, filename);
  writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`  ✓ Saved: ${filepath}`);
}

async function syncChapters(): Promise<void> {
  console.log("\n📖 Syncing Quran chapters from quran.com API...");

  const data = await fetchJson("https://api.quran.com/api/v4/chapters?language=en") as { chapters: unknown[] };
  saveJson("chapters.json", data.chapters);
  console.log(`  ✓ ${data.chapters.length} chapters saved`);
}

async function syncSurahStructure(): Promise<void> {
  console.log("\n📖 Syncing surah structure from quranjson...");

  const data = await fetchJson(
    "https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah/surah_1.json"
  );
  saveJson("surah_1_sample.json", data);
  console.log("  ✓ Sample surah structure saved");
}

async function syncEnglishTranslation(): Promise<void> {
  console.log("\n📖 Syncing English (Sahih) translation...");

  const data = await fetchJson(
    "https://raw.githubusercontent.com/risan/quran-json/main/data/editions/en.sahih.json"
  );
  saveJson("translation_en_sahih.json", data);
  console.log("  ✓ English Sahih translation saved");
}

async function syncVersesSurahFatiha(): Promise<void> {
  console.log("\n📖 Syncing verses for Al-Fatiha (sample)...");

  const params = new URLSearchParams({
    language: "en",
    words: "true",
    translations: "131",
    word_fields: "text_uthmani,transliteration",
    per_page: "10",
  });

  const data = await fetchJson(
    `https://api.quran.com/api/v4/verses/by_chapter/1?${params}`
  );
  saveJson("verses_surah_1.json", data);
  console.log("  ✓ Surah Al-Fatiha verses saved");
}

async function main(): Promise<void> {
  console.log("🕌 Islamic Super App — Quran Data Sync");
  console.log("═══════════════════════════════════════");

  mkdirSync(OUTPUT_DIR, { recursive: true });

  const tasks = [
    syncChapters,
    syncSurahStructure,
    syncEnglishTranslation,
    syncVersesSurahFatiha,
  ];

  for (const task of tasks) {
    try {
      await task();
    } catch (err) {
      console.error(`  ✗ Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log("\n✅ Quran sync complete!");
  console.log(`   Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
