#!/usr/bin/env tsx
/**
 * sync-adhkar.ts
 * Fetches Adhkar & Dua data from Hisnul Muslim and azkar-database
 */

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const ADHKAR_OUTPUT = join(process.cwd(), "content", "adhkar");
const DUA_OUTPUT = join(process.cwd(), "content", "dua");

const SOURCES = [
  {
    name: "Hisnul Muslim",
    url: "https://raw.githubusercontent.com/omaralashqar/Hisnul-Muslim-App/master/app/src/main/assets/hisnulmuslim_db.json",
    outputDir: ADHKAR_OUTPUT,
    filename: "hisnulmuslim.json",
  },
  {
    name: "Azkar Database",
    url: "https://raw.githubusercontent.com/mohamad-almogren/azkar-database/main/azkar.json",
    outputDir: ADHKAR_OUTPUT,
    filename: "azkar.json",
  },
];

async function fetchSource(
  name: string,
  url: string,
  outputDir: string,
  filename: string
): Promise<void> {
  console.log(`\n🤲 Fetching ${name}...`);
  console.log(`   URL: ${url}`);

  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${url}`);
  }

  const data = await res.json();
  const filepath = join(outputDir, filename);
  writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");

  const size = Math.round(JSON.stringify(data).length / 1024);
  console.log(`   ✓ Saved: ${filepath} (${size} KB)`);
}

async function savePrayerTimeSample(): Promise<void> {
  console.log("\n🕌 Fetching prayer times sample from Aladhan...");

  const res = await fetch(
    "https://api.aladhan.com/v1/timingsByCity?city=Mecca&country=Saudi Arabia&method=2",
    { signal: AbortSignal.timeout(15000) }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  const filepath = join(ADHKAR_OUTPUT, "prayer_times_sample.json");
  writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`   ✓ Saved prayer times sample: ${filepath}`);
}

async function main(): Promise<void> {
  console.log("🕌 Islamic Super App — Adhkar & Dua Sync");
  console.log("═════════════════════════════════════════");

  mkdirSync(ADHKAR_OUTPUT, { recursive: true });
  mkdirSync(DUA_OUTPUT, { recursive: true });

  let successCount = 0;
  let errorCount = 0;

  for (const source of SOURCES) {
    try {
      await fetchSource(source.name, source.url, source.outputDir, source.filename);
      successCount++;
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      errorCount++;
      console.error(`   ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  try {
    await savePrayerTimeSample();
    successCount++;
  } catch (err) {
    errorCount++;
    console.error(`   ✗ Prayer times sample failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  console.log(`\n✅ Adhkar sync complete!`);
  console.log(`   ✓ ${successCount} sources synced`);
  if (errorCount > 0) {
    console.log(`   ✗ ${errorCount} sources failed`);
  }
}

main().catch(console.error);
