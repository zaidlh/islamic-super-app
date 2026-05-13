import { NextRequest, NextResponse } from "next/server";
import { searchHadiths } from "@/lib/hadith";

export async function GET(
  request: NextRequest,
  { params }: { params: { collection: string } }
) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);

  if (!query.trim()) {
    return NextResponse.json({ results: [], query });
  }

  try {
    const results = await searchHadiths(params.collection, query, limit);
    return NextResponse.json({ results, query });
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
