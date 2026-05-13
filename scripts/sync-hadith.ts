#!/usr/bin/env tsx
/**
 * sync-hadith.ts
 * Fetches Hadith collections from fawazahmed0/hadith-api and normalizes them
 */

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUTPUT_DIR = join(process.cwd(), "content", "hadith");
const CDN_BASE = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions";

interface HadithEntry {
  hadithnumber: number | string;
  text: string;
  grades?: Array<{ grade: string; graded_by: string }>;
}

interface HadithApiResponse {
  metadata: { name: string };
  hadiths: HadithEntry[];
}

const COLLECTIONS = [
  { id: "eng-bukhari", name: "Sahih al-Bukhari" },
  { id: "eng-muslim", name: "Sahih Muslim" },
  { id: "eng-nawawi40", name: "40 Hadith Nawawi" },
  { id: "eng-abudawud", name: "Sunan Abu Dawud" },
  { id: "eng-tirmidhi", name: "Jami at-Tirmidhi" },
  { id: "eng-ibnmajah", name: "Sunan Ibn Majah" },
];

async function fetchAndSaveCollection(id: string, name: string): Promise<void> {
  const url = `${CDN_BASE}/${id}.json`;
  console.log(`\n📚 Fetching ${name}...`);
  console.log(`   URL: ${url}`);

  const res = await fetch(url, {
    headers: { "Accept-Encoding": "gzip" },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${url}`);
  }

  const data = await res.json() as HadithApiResponse;
  const hadiths = data.hadiths ?? [];

  // Save full collection
  const filepath = join(OUTPUT_DIR, `${id}.json`);
  writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");

  // Save a lightweight index (hadithnumber + first 100 chars)
  const index = hadiths.map((h) => ({
    n: h.hadithnumber,
    t: h.text.slice(0, 100) + (h.text.length > 100 ? "…" : ""),
    g: h.grades?.[0]?.grade ?? null,
  }));

  const indexPath = join(OUTPUT_DIR, `${id}.index.json`);
  writeFileSync(indexPath, JSON.stringify({ collection: id, count: hadiths.length, index }, null, 2));

  console.log(`   ✓ ${hadiths.length} hadiths saved`);
  console.log(`   ✓ Index saved: ${indexPath}`);
}

async function main(): Promise<void> {
  console.log("🕌 Islamic Super App — Hadith Data Sync");
  console.log("═══════════════════════════════════════");

  mkdirSync(OUTPUT_DIR, { recursive: true });

  let successCount = 0;
  let errorCount = 0;

  for (const { id, name } of COLLECTIONS) {
    try {
      await fetchAndSaveCollection(id, name);
      successCount++;
      // Brief pause to avoid hammering CDN
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      errorCount++;
      console.error(`   ✗ Failed to fetch ${name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`\n✅ Hadith sync complete!`);
  console.log(`   ✓ ${successCount} collections synced`);
  if (errorCount > 0) {
    console.log(`   ✗ ${errorCount} collections failed`);
  }
  console.log(`   Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
