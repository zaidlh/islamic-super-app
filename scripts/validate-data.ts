#!/usr/bin/env tsx
/**
 * validate-data.ts
 * Validates all synced content data files for correctness and completeness
 */

import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";

interface ValidationResult {
  file: string;
  valid: boolean;
  count?: number;
  errors: string[];
  warnings: string[];
}

const CONTENT_DIR = join(process.cwd(), "content");

function validateQuranChapters(): ValidationResult {
  const file = join(CONTENT_DIR, "quran", "chapters.json");
  const result: ValidationResult = { file, valid: false, errors: [], warnings: [] };

  if (!existsSync(file)) {
    result.errors.push("chapters.json not found — run pnpm sync:quran");
    return result;
  }

  const data = JSON.parse(readFileSync(file, "utf-8")) as unknown[];
  result.count = data.length;

  if (data.length !== 114) {
    result.errors.push(`Expected 114 chapters, found ${data.length}`);
  }

  result.valid = result.errors.length === 0;
  return result;
}

function validateHadithCollection(collectionId: string): ValidationResult {
  const file = join(CONTENT_DIR, "hadith", `${collectionId}.json`);
  const result: ValidationResult = { file, valid: false, errors: [], warnings: [] };

  if (!existsSync(file)) {
    result.errors.push(`${collectionId}.json not found — run pnpm sync:hadith`);
    return result;
  }

  const data = JSON.parse(readFileSync(file, "utf-8")) as { hadiths?: unknown[] };
  const hadiths = data.hadiths ?? [];
  result.count = hadiths.length;

  if (hadiths.length === 0) {
    result.errors.push("No hadiths found");
  } else if (hadiths.length < 10) {
    result.warnings.push(`Only ${hadiths.length} hadiths — seems low`);
  }

  result.valid = result.errors.length === 0;
  return result;
}

function validateAdhkar(): ValidationResult {
  const file = join(CONTENT_DIR, "adhkar", "hisnulmuslim.json");
  const result: ValidationResult = { file, valid: false, errors: [], warnings: [] };

  if (!existsSync(file)) {
    result.errors.push("hisnulmuslim.json not found — run pnpm sync:adhkar");
    return result;
  }

  result.valid = true;
  return result;
}

function printResult(result: ValidationResult): void {
  const status = result.valid ? "✅" : "❌";
  const countStr = result.count !== undefined ? ` (${result.count} items)` : "";
  console.log(`${status} ${result.file}${countStr}`);

  for (const err of result.errors) {
    console.log(`   ✗ ERROR: ${err}`);
  }
  for (const warn of result.warnings) {
    console.log(`   ⚠ WARN: ${warn}`);
  }
}

function main(): void {
  console.log("🕌 Islamic Super App — Data Validation");
  console.log("════════════════════════════════════════\n");

  const results: ValidationResult[] = [];

  // Validate Quran
  console.log("📖 Quran:");
  const chaptersResult = validateQuranChapters();
  printResult(chaptersResult);
  results.push(chaptersResult);

  // Validate Hadith collections
  console.log("\n📚 Hadith:");
  const collections = ["eng-bukhari", "eng-muslim", "eng-nawawi40"];
  for (const id of collections) {
    const r = validateHadithCollection(id);
    printResult(r);
    results.push(r);
  }

  // Validate Adhkar
  console.log("\n🤲 Adhkar:");
  const adhkarResult = validateAdhkar();
  printResult(adhkarResult);
  results.push(adhkarResult);

  // Summary
  const valid = results.filter((r) => r.valid).length;
  const invalid = results.filter((r) => !r.valid).length;
  const warnings = results.reduce((sum, r) => sum + r.warnings.length, 0);

  console.log(`\n════════════════════════════════════════`);
  console.log(`Summary: ${valid} passed, ${invalid} failed, ${warnings} warnings`);

  if (invalid > 0) {
    console.log("\nRun data sync scripts to fix missing files:");
    console.log("  pnpm sync:all");
    process.exit(1);
  } else {
    console.log("\n✅ All data files are valid!");
  }
}

main();
