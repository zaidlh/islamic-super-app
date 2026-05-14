"use client";

import { useState, useEffect, useCallback } from "react";


const JUZS = Array.from({ length: 30 }, (_, i) => ({
  number: i + 1,
  name: `Juz ${i + 1}`,
  day: i + 1,
}));

const IBADAH_ITEMS = [
  { id: "fajr", label: "Fajr Prayer", icon: "🌅" },
  { id: "dhuhr", label: "Dhuhr Prayer", icon: "☀️" },
  { id: "asr", label: "Asr Prayer", icon: "🌤️" },
  { id: "maghrib", label: "Maghrib / Iftar", icon: "🌇" },
  { id: "isha", label: "Isha Prayer", icon: "🌙" },
  { id: "tarawih", label: "Tarawih Prayer", icon: "✨" },
  { id: "quran", label: "Quran Reading", icon: "📖" },
  { id: "dhikr", label: "Dhikr / Adhkar", icon: "🤲" },
];

function getNextRamadan(): Date {
  const now = new Date();
  const year = now.getFullYear();
  // Approximate Ramadan start (shifts ~11 days/year). Using 2025: March 1.
  const base2025 = new Date("2025-03-01");
  const diff = Math.round((now.getTime() - base2025.getTime()) / (365.25 * 24 * 3600 * 1000));
  const cycles = Math.floor(diff);
  let candidate = new Date(base2025);
  candidate.setFullYear(base2025.getFullYear() + cycles + 1);
  // shift 11 days per year
  candidate.setDate(candidate.getDate() - 11 * (cycles + 1));
  if (candidate <= now) {
    candidate.setDate(candidate.getDate() + 354);
  }
  return candidate;
}

function useLocalStorageState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  const set = useCallback(
    (val: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next = typeof val === "function" ? (val as (p: T) => T)(prev) : val;
        localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    },
    [key]
  );

  return [state, set] as const;
}

export default function RamadanPage() {
  const [city, setCity] = useState("London");
  const [inputCity, setInputCity] = useState("London");
  const [prayerTimes, setPrayerTimes] = useState<{ fajr: string; maghrib: string } | null>(null);
  const [loadingPrayer, setLoadingPrayer] = useState(false);
  const [activeTab, setActiveTab] = useState<"times" | "quran" | "ibadah" | "countdown">("times");
  const [juzDone, setJuzDone] = useLocalStorageState<Record<number, boolean>>("ramadan_juz", {});
  const today = new Date().getDate();
  const [ibadah, setIbadah] = useLocalStorageState<Record<string, boolean>>(
    `ramadan_ibadah_${new Date().toDateString()}`,
    {}
  );
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const target = getNextRamadan();
    const update = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setCountdown("Ramadan Mubarak! 🌙"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(`${d}d ${h}h ${m}m ${s}s`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const fetchPrayerTimes = useCallback(() => {
    setLoadingPrayer(true);
    const date = new Date();
    fetch(
      `https://api.aladhan.com/v1/timingsByCity/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?city=${encodeURIComponent(city)}&country=&method=2`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data?.data?.timings) {
          setPrayerTimes({
            fajr: data.data.timings.Fajr,
            maghrib: data.data.timings.Maghrib,
          });
        }
      })
      .catch(() => setPrayerTimes({ fajr: "05:00", maghrib: "19:30" }))
      .finally(() => setLoadingPrayer(false));
  }, [city]);

  useEffect(() => { fetchPrayerTimes(); }, []);

  const toggleJuz = (n: number) =>
    setJuzDone((prev) => ({ ...prev, [n]: !prev[n] }));

  const toggleIbadah = (id: string) =>
    setIbadah((prev) => ({ ...prev, [id]: !prev[id] }));

  const juzCompleted = Object.values(juzDone).filter(Boolean).length;
  const ibadahCompleted = Object.values(ibadah).filter(Boolean).length;

  const tabs = [
    { id: "times", label: "🌅 Suhoor/Iftar" },
    { id: "quran", label: "📖 Quran Plan" },
    { id: "ibadah", label: "🤲 Ibadah" },
    { id: "countdown", label: "⏳ Countdown" },
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--bg)] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">🌙</div>
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-2">Ramadan Planner</h1>
          <p className="text-white/60">Your complete Ramadan companion</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all text-sm ${
                activeTab === t.id
                  ? "bg-[var(--primary)] text-black"
                  : "bg-[var(--surface)] text-white/60 hover:text-white border border-white/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Suhoor/Iftar */}
        {activeTab === "times" && (
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--primary)]/20 p-8">
            <h2 className="text-xl font-bold text-white mb-6">Prayer & Fasting Times</h2>
            <div className="flex gap-3 mb-6">
              <input
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { setCity(inputCity); fetchPrayerTimes(); }}}
                placeholder="Enter city..."
                className="flex-1 bg-[var(--bg)] border border-[var(--primary)]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--primary)]"
              />
              <button
                onClick={() => { setCity(inputCity); fetchPrayerTimes(); }}
                className="px-5 py-2 bg-[var(--primary)] text-black font-bold rounded-lg hover:brightness-110 transition-all"
              >
                Search
              </button>
            </div>
            {loadingPrayer ? (
              <div className="text-center text-white/40 py-8">Fetching prayer times...</div>
            ) : prayerTimes ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-2">🌅</div>
                  <p className="text-white/60 text-sm mb-1">Suhoor ends (Fajr)</p>
                  <p className="text-[var(--primary)] text-3xl font-black">{prayerTimes.fajr}</p>
                  <p className="text-white/40 text-xs mt-2">Stop eating before this time</p>
                </div>
                <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-2">🌇</div>
                  <p className="text-white/60 text-sm mb-1">Iftar time (Maghrib)</p>
                  <p className="text-[var(--primary)] text-3xl font-black">{prayerTimes.maghrib}</p>
                  <p className="text-white/40 text-xs mt-2">Break fast at this time</p>
                </div>
              </div>
            ) : null}
            <p className="text-white/30 text-xs mt-4 text-center">Powered by AlAdhan API • {city}</p>
          </div>
        )}

        {/* Quran Plan */}
        {activeTab === "quran" && (
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--primary)]/20 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">30-Juz Quran Plan</h2>
              <span className="text-[var(--primary)] font-bold">{juzCompleted}/30</span>
            </div>
            <div className="h-2 bg-[var(--bg)] rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--primary)] to-yellow-300 rounded-full transition-all duration-500"
                style={{ width: `${(juzCompleted / 30) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {JUZS.map(({ number, day }) => (
                <button
                  key={number}
                  onClick={() => toggleJuz(number)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    juzDone[number]
                      ? "bg-[var(--primary)] border-[var(--primary)] text-black"
                      : number === today
                      ? "border-[var(--primary)] text-[var(--primary)] bg-[var(--primary)]/10"
                      : "border-white/10 text-white/50 hover:border-white/30"
                  }`}
                >
                  <div className="text-xs font-bold">Juz</div>
                  <div className="text-lg font-black">{number}</div>
                  <div className="text-xs opacity-60">Day {day}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ibadah Tracker */}
        {activeTab === "ibadah" && (
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--primary)]/20 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Daily Ibadah Tracker</h2>
              <span className="text-[var(--primary)] font-bold">{ibadahCompleted}/{IBADAH_ITEMS.length}</span>
            </div>
            <div className="h-2 bg-[var(--bg)] rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--primary)] to-yellow-300 rounded-full transition-all"
                style={{ width: `${(ibadahCompleted / IBADAH_ITEMS.length) * 100}%` }}
              />
            </div>
            <div className="space-y-3">
              {IBADAH_ITEMS.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => toggleIbadah(id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    ibadah[id]
                      ? "border-[var(--primary)] bg-[var(--primary)]/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="text-2xl">{icon}</span>
                  <span className={`flex-1 text-left font-medium ${ibadah[id] ? "text-[var(--primary)]" : "text-white"}`}>
                    {label}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      ibadah[id] ? "bg-[var(--primary)] border-[var(--primary)]" : "border-white/30"
                    }`}
                  >
                    {ibadah[id] && <span className="text-black text-xs font-bold">✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Countdown */}
        {activeTab === "countdown" && (
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--primary)]/20 p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Countdown to Ramadan</h2>
            <p className="text-white/50 text-sm mb-8">Approximate date based on Hijri calendar</p>
            <div className="text-[var(--primary)] text-5xl font-black mb-4 font-mono">{countdown}</div>
            <p className="text-white/40 text-sm">Next Ramadan: ~{getNextRamadan().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-left">
              <div className="bg-[var(--primary)]/10 rounded-xl p-4">
                <p className="text-[var(--primary)] font-bold mb-1">📖 Quran Progress</p>
                <p className="text-white">{juzCompleted}/30 Juz completed</p>
              </div>
              <div className="bg-[var(--primary)]/10 rounded-xl p-4">
                <p className="text-[var(--primary)] font-bold mb-1">🤲 Today's Ibadah</p>
                <p className="text-white">{ibadahCompleted}/{IBADAH_ITEMS.length} completed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
