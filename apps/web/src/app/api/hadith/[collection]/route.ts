import { NextRequest, NextResponse } from "next/server";
import { fetchHadithCollection } from "@/lib/hadith";

const VALID_COLLECTIONS = [
  "eng-bukhari", "eng-muslim", "eng-nawawi40",
  "eng-abudawud", "eng-tirmidhi", "eng-ibnmajah",
];

export async function GET(
  request: NextRequest,
  { params }: { params: { collection: string } }
) {
  const { collection } = params;

  if (!VALID_COLLECTIONS.includes(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);

  try {
    const hadiths = await fetchHadithCollection(collection);
    const start = (page - 1) * limit;
    const paginated = hadiths.slice(start, start + limit);

    return NextResponse.json({
      hadiths: paginated,
      total: hadiths.length,
      page,
      limit,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hadiths" }, { status: 500 });
  }
}
