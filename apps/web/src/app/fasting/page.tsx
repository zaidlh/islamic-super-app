"use client";

import { useState, useCallback, useMemo } from "react";

export const metadata = undefined;

type FastType = "obligatory" | "voluntary" | null;
type FastRecord = { type: FastType; note?: string };

const VOLUNTARY_TYPES = [
  { id: "six_shawwal", label: "6 Days of Shawwal", icon: "🌙", desc: "After Ramadan — like fasting a whole year" },
  { id: "mon_thu", label: "Monday & Thursday", icon: "📅", desc: "Sunnah of the Prophet ﷺ" },
  { id: "ayyam_albid", label: "Ayyam al-Bid (13–15)", icon: "🌕", desc: "White days of each lunar month" },
  { id: "arafah", label: "Day of Arafah (9 Dhul Hijjah)", icon: "🕋", desc: "Expiates sins of two years" },
  { id: "ashura", label: "Day of Ashura (10 Muharram)", icon: "⭐", desc: "Expiates sins of past year" },
];

function useLocalStorageState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try { return JSON.parse(localStorage.getItem(key) || "null") ?? initial; } catch { return initial; }
  });
  const set = useCallback((val: T | ((p: T) => T)) => {
    setState((prev) => {
      const next = typeof val === "function" ? (val as (p: T) => T)(prev) : val;
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  }, [key]);
  return [state, set] as const;
}

export default function FastingPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const [fasts, setFasts] = useLocalStorageState<Record<string, FastRecord>>("fasting_log", {});
  const [voluntaryDone, setVoluntaryDone] = useLocalStorageState<Record<string, boolean>>("voluntary_fasts", {});

  const monthKey = `${year}-${month}`;

  const dayKey = (day: number) => `${year}-${month}-${day}`;

  const logFast = (type: FastType) => {
    const key = dayKey(today);
    setFasts((prev) => {
      if (prev[key]?.type === type) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: { type } };
    });
  };

  const toggleVoluntary = (id: string) =>
    setVoluntaryDone((prev) => ({ ...prev, [id]: !prev[id] }));

  const monthFasts = useMemo(
    () => Object.entries(fasts).filter(([k]) => k.startsWith(`${year}-${month}-`)),
    [fasts, year, month]
  );

  const obligatoryCount = monthFasts.filter(([, v]) => v.type === "obligatory").length;
  const voluntaryCount = monthFasts.filter(([, v]) => v.type === "voluntary").length;
  const yearFasts = Object.entries(fasts).filter(([k]) => k.startsWith(`${year}-`)).length;

  const todayFast = fasts[dayKey(today)];

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return (
    <div className="min-h-screen bg-[var(--bg)] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">🌙</div>
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-2">Fasting Tracker</h1>
          <p className="text-white/60">Track obligatory and voluntary fasts</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "This Month", value: monthFasts.length, icon: "📅" },
            { label: "Obligatory", value: obligatoryCount, icon: "🕌" },
            { label: "This Year", value: yearFasts, icon: "📊" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-[var(--surface)] rounded-xl border border-[var(--primary)]/20 p-4 text-center">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-2xl font-black text-[var(--primary)]">{value}</div>
              <div className="text-white/50 text-xs">{label}</div>
            </div>
          ))}
        </div>

        {/* Log Today */}
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--primary)]/20 p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">
            Log Today's Fast — {monthNames[month]} {today}
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => logFast("obligatory")}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                todayFast?.type === "obligatory"
                  ? "bg-[var(--primary)] text-black"
                  : "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 hover:bg-[var(--primary)]/20"
              }`}
            >
              {todayFast?.type === "obligatory" ? "✓ " : ""}Obligatory
            </button>
            <button
              onClick={() => logFast("voluntary")}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                todayFast?.type === "voluntary"
                  ? "bg-[var(--primary)] text-black"
                  : "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 hover:bg-[var(--primary)]/20"
              }`}
            >
              {todayFast?.type === "voluntary" ? "✓ " : ""}Voluntary
            </button>
          </div>
          {todayFast && (
            <p className="text-center text-[var(--primary)] text-sm mt-3">
              ✅ {todayFast.type === "obligatory" ? "Obligatory" : "Voluntary"} fast logged for today
            </p>
          )}
        </div>

        {/* Calendar */}
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--primary)]/20 p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">{monthNames[month]} {year}</h2>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
              <div key={d} className="text-center text-white/30 text-xs py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const fast = fasts[dayKey(day)];
              const isToday = day === today;
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all ${
                    fast?.type === "obligatory"
                      ? "bg-[var(--primary)] text-black font-bold"
                      : fast?.type === "voluntary"
                      ? "bg-[var(--primary)]/40 text-[var(--primary)] font-bold"
                      : isToday
                      ? "border-2 border-[var(--primary)] text-white"
                      : "text-white/40"
                  }`}
                >
                  {day}
                  {fast && <div className="text-xs leading-none">{fast.type === "obligatory" ? "F" : "v"}</div>}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-white/50">
            <span><span className="inline-block w-3 h-3 rounded bg-[var(--primary)] mr-1" />Obligatory</span>
            <span><span className="inline-block w-3 h-3 rounded bg-[var(--primary)]/40 mr-1" />Voluntary</span>
          </div>
        </div>

        {/* Voluntary Fasting Types */}
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--primary)]/20 p-6">
          <h2 className="text-lg font-bold text-white mb-4">Recommended Voluntary Fasts</h2>
          <div className="space-y-3">
            {VOLUNTARY_TYPES.map(({ id, label, icon, desc }) => (
              <button
                key={id}
                onClick={() => toggleVoluntary(id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                  voluntaryDone[id]
                    ? "border-[var(--primary)] bg-[var(--primary)]/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <span className="text-2xl">{icon}</span>
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${voluntaryDone[id] ? "text-[var(--primary)]" : "text-white"}`}>{label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${voluntaryDone[id] ? "bg-[var(--primary)] border-[var(--primary)]" : "border-white/30"}`}>
                  {voluntaryDone[id] && <span className="text-black text-xs">✓</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
