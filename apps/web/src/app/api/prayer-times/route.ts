import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const city = searchParams.get("city");
  const country = searchParams.get("country");
  const method = searchParams.get("method") ?? "3";

  try {
    let apiUrl: string;

    if (lat && lng) {
      const params = new URLSearchParams({
        latitude: lat,
        longitude: lng,
        method,
      });
      apiUrl = `https://api.aladhan.com/v1/timings?${params}`;
    } else if (city && country) {
      const params = new URLSearchParams({
        city,
        country,
        method,
      });
      apiUrl = `https://api.aladhan.com/v1/timingsByCity?${params}`;
    } else {
      // Default to Mecca
      apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=Mecca&country=Saudi Arabia&method=${method}`;
    }

    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Aladhan API error: ${res.status}`);
    }

    const data = await res.json();

    if (data.code !== 200) {
      throw new Error(`Aladhan API returned status ${data.code}: ${data.status}`);
    }

    return NextResponse.json({
      timings: data.data.timings,
      date: data.data.date,
      meta: data.data.meta,
    });
  } catch (error) {
    console.error("Prayer times API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch prayer times" },
      { status: 500 }
    );
  }
}
