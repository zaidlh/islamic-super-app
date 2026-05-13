"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import type { PrayerWithCountdown, GeoLocation } from "@/types/prayer";
import { parsePrayerTimes } from "@/lib/prayer";
import { useSettingsStore } from "@/store/settingsStore";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function usePrayerTimes() {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const method = useSettingsStore((s) => s.prayerCalculationMethod);

  useEffect(() => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setIsLocating(false);
        },
        () => {
          // Fall back to Mecca
          setLocation({ latitude: 21.3891, longitude: 39.8579, city: "Mecca", country: "SA" });
          setLocationError("Using default location (Mecca). Enable location for local times.");
          setIsLocating(false);
        },
        { timeout: 10000, maximumAge: 300000 }
      );
    } else {
      setLocation({ latitude: 21.3891, longitude: 39.8579, city: "Mecca", country: "SA" });
      setIsLocating(false);
    }
  }, []);

  const apiUrl = location
    ? `/api/prayer-times?lat=${location.latitude}&lng=${location.longitude}&method=${method}`
    : null;

  const { data, error, isLoading } = useSWR<{
    timings: Record<string, string>;
    date: { hijri: { day: string; month: { en: string; ar: string }; year: string }; gregorian: { date: string } };
    meta: { timezone: string };
  }>(apiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60000, // Refresh every minute for countdown
  });

  const prayers: PrayerWithCountdown[] = data?.timings ? parsePrayerTimes(data.timings) : [];

  return {
    prayers,
    hijriDate: data?.date?.hijri,
    gregorianDate: data?.date?.gregorian?.date,
    timezone: data?.meta?.timezone,
    location,
    locationError,
    isLoading: isLoading || isLocating,
    error,
  };
}
