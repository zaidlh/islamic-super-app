import { NextResponse } from "next/server";
import { fetchChapters } from "@/lib/quran";

export const revalidate = 86400;

export async function GET() {
  try {
    const chapters = await fetchChapters();
    return NextResponse.json({ chapters });
  } catch (error) {
    console.error("Chapters API error:", error);
    return NextResponse.json({ error: "Failed to fetch chapters" }, { status: 500 });
  }
}
