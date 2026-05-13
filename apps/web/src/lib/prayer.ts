import type { AladhanResponse, PrayerWithCountdown, GeoLocation } from "@/types/prayer";
import { parseTime, getTimeUntil } from "./utils";

const ALADHAN_BASE = "https://api.aladhan.com/v1";

export async function fetchPrayerTimes(
  location: GeoLocation,
  method = 3,
  date?: string
): Promise<AladhanResponse> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    method: String(method),
  });

  if (date) params.set("date", date);

  const res = await fetch(`${ALADHAN_BASE}/timings?${params}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch prayer times: ${res.status}`);
  }

  return res.json() as Promise<AladhanResponse>;
}

export async function fetchPrayerTimesByCity(
  city: string,
  country: string,
  method = 3
): Promise<AladhanResponse> {
  const params = new URLSearchParams({
    city,
    country,
    method: String(method),
  });

  const res = await fetch(`${ALADHAN_BASE}/timingsByCity?${params}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch prayer times for ${city}: ${res.status}`);
  }

  return res.json() as Promise<AladhanResponse>;
}

const PRAYER_DISPLAY_NAMES: Record<string, { en: string; ar: string }> = {
  Fajr: { en: "Fajr", ar: "الفجر" },
  Sunrise: { en: "Sunrise", ar: "الشروق" },
  Dhuhr: { en: "Dhuhr", ar: "الظهر" },
  Asr: { en: "Asr", ar: "العصر" },
  Maghrib: { en: "Maghrib", ar: "المغرب" },
  Isha: { en: "Isha", ar: "العشاء" },
};

export function parsePrayerTimes(timings: Record<string, string>): PrayerWithCountdown[] {
  const prayerKeys = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const now = new Date();

  const prayers = prayerKeys.map((key) => {
    const timeStr = timings[key] ?? "00:00";
    const timestamp = parseTime(timeStr);
    const displayNames = PRAYER_DISPLAY_NAMES[key];

    return {
      name: displayNames?.en ?? key,
      arabic: displayNames?.ar ?? key,
      time: timeStr.replace(/ \([^)]+\)/, ""), // Remove timezone info
      isCurrent: false,
      isNext: false,
      countdown: undefined as string | undefined,
      timestamp,
    };
  });

  // Find current and next prayer
  let nextIndex = -1;
  for (let i = 0; i < prayers.length; i++) {
    const prayer = prayers[i]!;
    if (prayer.timestamp > now) {
      nextIndex = i;
      break;
    }
  }

  if (nextIndex === -1) {
    // All prayers have passed today, next is Fajr tomorrow
    const fajr = prayers[0];
    if (fajr) {
      fajr.isNext = true;
      const tomorrowFajr = new Date(fajr.timestamp);
      tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
      fajr.countdown = getTimeUntil(tomorrowFajr);
    }
  } else {
    const nextPrayer = prayers[nextIndex]!;
    nextPrayer.isNext = true;
    nextPrayer.countdown = getTimeUntil(nextPrayer.timestamp);

    // Current prayer is the one before next
    if (nextIndex > 0) {
      prayers[nextIndex - 1]!.isCurrent = true;
    }
  }

  return prayers;
}

export function calculateQibla(latitude: number, longitude: number): number {
  const meccaLat = 21.4225; // Mecca latitude
  const meccaLng = 39.8262; // Mecca longitude

  const lat1 = (latitude * Math.PI) / 180;
  const lat2 = (meccaLat * Math.PI) / 180;
  const deltaLng = ((meccaLng - longitude) * Math.PI) / 180;

  const y = Math.sin(deltaLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);

  let angle = (Math.atan2(y, x) * 180) / Math.PI;
  angle = (angle + 360) % 360; // Normalize to 0-360

  return Math.round(angle);
}
