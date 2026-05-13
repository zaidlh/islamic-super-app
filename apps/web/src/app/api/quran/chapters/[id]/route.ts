import { NextRequest, NextResponse } from "next/server";
import { fetchChapter } from "@/lib/quran";

export const revalidate = 86400;

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const surahId = parseInt(params.id);

  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    return NextResponse.json({ error: "Invalid surah ID" }, { status: 400 });
  }

  try {
    const chapter = await fetchChapter(surahId);
    return NextResponse.json({ chapter });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch chapter" }, { status: 500 });
  }
}
