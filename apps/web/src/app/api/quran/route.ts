import { NextRequest, NextResponse } from "next/server";
import { fetchChapters } from "@/lib/quran";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const surahId = searchParams.get("surah");
  const query = searchParams.get("q");

  try {
    if (query) {
      // Search
      const res = await fetch(
        `https://api.quran.com/api/v4/search?q=${encodeURIComponent(query)}&size=20&translations=131`,
        { next: { revalidate: 300 } }
      );
      const data = await res.json();
      return NextResponse.json({
        results: data.search?.results ?? [],
        query,
      });
    }

    if (surahId) {
      const surahNum = parseInt(surahId);
      if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) {
        return NextResponse.json({ error: "Invalid surah number" }, { status: 400 });
      }

      const params = new URLSearchParams({
        language: "en",
        words: "true",
        translations: "131",
        word_fields: "text_uthmani,transliteration",
        per_page: "286",
      });

      const res = await fetch(
        `https://api.quran.com/api/v4/verses/by_chapter/${surahNum}?${params}`,
        { next: { revalidate: 86400 } }
      );

      if (!res.ok) {
        throw new Error(`Quran API error: ${res.status}`);
      }

      const data = await res.json();
      return NextResponse.json({
        verses: data.verses ?? [],
        total: data.pagination?.total_records ?? 0,
        surah: surahNum,
      });
    }

    // Return chapters list
    const chapters = await fetchChapters();
    return NextResponse.json({ chapters });
  } catch (error) {
    console.error("Quran API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Quran data" },
      { status: 500 }
    );
  }
}
