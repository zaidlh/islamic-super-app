import { NextRequest, NextResponse } from "next/server";
import { fetchHadithCollection, searchHadiths, getRandomHadith } from "@/lib/hadith";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get("collection") ?? "eng-nawawi40";
  const query = searchParams.get("q");
  const random = searchParams.get("random");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);

  const validCollections = [
    "eng-bukhari",
    "eng-muslim",
    "eng-nawawi40",
    "eng-abudawud",
    "eng-tirmidhi",
    "eng-ibnmajah",
  ];

  if (!validCollections.includes(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  try {
    if (random) {
      const hadith = await getRandomHadith(collection);
      return NextResponse.json({ hadith, collection });
    }

    if (query) {
      const results = await searchHadiths(collection, query, limit);
      return NextResponse.json({ results, query, collection });
    }

    const hadiths = await fetchHadithCollection(collection);
    const start = (page - 1) * limit;
    const paginated = hadiths.slice(start, start + limit);

    return NextResponse.json({
      hadiths: paginated,
      total: hadiths.length,
      page,
      limit,
      collection,
    });
  } catch (error) {
    console.error("Hadith API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hadith data" },
      { status: 500 }
    );
  }
}
