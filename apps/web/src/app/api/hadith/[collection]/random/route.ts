import { NextRequest, NextResponse } from "next/server";
import { getRandomHadith } from "@/lib/hadith";

export async function GET(
  _request: NextRequest,
  { params }: { params: { collection: string } }
) {
  try {
    const hadith = await getRandomHadith(params.collection);
    return NextResponse.json({ hadith });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get random hadith" }, { status: 500 });
  }
}
