"use client";

import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useSettingsStore } from "@/store/settingsStore";
import { formatHijriDate } from "@/lib/utils";
import { CALCULATION_METHODS } from "@islamic-app/shared";
import { cn } from "@/lib/utils";

export function PrayerTimes() {
  const { prayers, hijriDate, gregorianDate, location, locationError, isLoading, error } =
    usePrayerTimes();
  const { prayerCalculationMethod, setPrayerCalculationMethod } = useSettingsStore();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="shimmer h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6 text-center">
        <p className="text-red-400 mb-2">Failed to load prayer times</p>
        <p className="text-[var(--text-muted)] text-sm">Please check your connection and try again</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Date header */}
      <div className="card p-5">
        <div className="flex items-start justify-between">
          <div>
            {hijriDate && (
              <>
                <p
                  className="text-[var(--primary)] text-lg mb-1"
                  style={{ fontFamily: "Amiri, serif" }}
                  dir="rtl"
                >
                  {formatHijriDateAr(hijriDate)}
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  {formatHijriDate(hijriDate)}
                </p>
              </>
            )}
            {gregorianDate && (
              <p className="text-xs text-[var(--text-subtle)] mt-1">{gregorianDate}</p>
            )}
          </div>
          {location && (
            <div className="text-right">
              <p className="text-xs text-[var(--text-muted)]">
                {location.city ?? `${location.latitude.toFixed(2)}°N`}
              </p>
              <p className="text-xs text-[var(--text-subtle)]">
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </p>
            </div>
          )}
        </div>
        {locationError && (
          <p className="text-xs text-amber-500 mt-2">⚠ {locationError}</p>
        )}
      </div>

      {/* Prayer time cards */}
      <div className="space-y-2">
        {prayers.map((prayer) => (
          <div
            key={prayer.name}
            className={cn(
              "card p-4 flex items-center gap-4 transition-all",
              prayer.isNext && "border-[var(--primary)]/50 bg-[var(--primary)]/5",
              prayer.isCurrent && "border-[var(--border)]/80"
            )}
          >
            {/* Status dot */}
            <div
              className={cn(
                "w-2.5 h-2.5 rounded-full flex-shrink-0",
                prayer.isNext
                  ? "bg-[var(--primary)] animate-pulse"
                  : prayer.isCurrent
                  ? "bg-emerald-500"
                  : "bg-[var(--border)]"
              )}
            />

            {/* Names */}
            <div className="flex-1">
              <p
                className={cn(
                  "font-semibold",
                  prayer.isNext ? "text-[var(--primary)]" : "text-[var(--text)]"
                )}
              >
                {prayer.name}
              </p>
              <p className="text-xs text-[var(--text-muted)]">{prayer.arabic}</p>
            </div>

            {/* Countdown */}
            {prayer.countdown && (
              <div className="text-right">
                <p className="text-xs text-[var(--primary)]">in {prayer.countdown}</p>
              </div>
            )}

            {/* Time */}
            <div className="text-right">
              <p
                className={cn(
                  "font-mono text-lg font-semibold",
                  prayer.isNext ? "text-[var(--primary)]" : "text-[var(--text)]"
                )}
              >
                {prayer.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Calculation method */}
      <div className="card p-4">
        <label className="text-sm font-medium text-[var(--text)] block mb-2">
          Calculation Method
        </label>
        <select
          value={prayerCalculationMethod}
          onChange={(e) => setPrayerCalculationMethod(Number(e.target.value))}
          className="input-field text-sm"
        >
          {CALCULATION_METHODS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function formatHijriDateAr(date: { day: string; month: { ar: string }; year: string }): string {
  return `${date.day} ${date.month.ar} ${date.year} هـ`;
}
