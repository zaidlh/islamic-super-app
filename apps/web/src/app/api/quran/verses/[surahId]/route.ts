import { NextRequest, NextResponse } from "next/server";
import { fetchAllVerses } from "@/lib/quran";

export const revalidate = 86400;

export async function GET(_req: NextRequest, { params }: { params: { surahId: string } }) {
  const surahId = parseInt(params.surahId);

  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    return NextResponse.json({ error: "Invalid surah ID" }, { status: 400 });
  }

  try {
    const verses = await fetchAllVerses(surahId);
    return NextResponse.json({ verses, total: verses.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch verses" }, { status: 500 });
  }
}
