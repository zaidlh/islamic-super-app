"use client";

import { useState, useCallback } from "react";


type Status = "not_started" | "learning" | "memorized" | "needs_review";

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; icon: string }> = {
  not_started: { label: "Not Started", color: "text-white/30", bg: "bg-white/5", icon: "○" },
  learning: { label: "Learning", color: "text-blue-400", bg: "bg-blue-500/10", icon: "📚" },
  memorized: { label: "Memorized", color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10", icon: "✅" },
  needs_review: { label: "Needs Review", color: "text-orange-400", bg: "bg-orange-500/10", icon: "🔄" },
};

const JUZ_DATA = [
  { juz: 1, surahs: [{ id: 1, name: "Al-Fatihah", ayahs: 7 }, { id: 2, name: "Al-Baqarah (1-141)", ayahs: 141 }] },
  { juz: 2, surahs: [{ id: 3, name: "Al-Baqarah (142-252)", ayahs: 111 }] },
  { juz: 3, surahs: [{ id: 4, name: "Al-Baqarah (253-286)", ayahs: 34 }, { id: 5, name: "Ali 'Imran (1-92)", ayahs: 92 }] },
  { juz: 4, surahs: [{ id: 6, name: "Ali 'Imran (93-200)", ayahs: 108 }, { id: 7, name: "An-Nisa (1-23)", ayahs: 23 }] },
  { juz: 5, surahs: [{ id: 8, name: "An-Nisa (24-147)", ayahs: 124 }] },
  { juz: 6, surahs: [{ id: 9, name: "An-Nisa (148-176)", ayahs: 29 }, { id: 10, name: "Al-Ma'idah (1-81)", ayahs: 81 }] },
  { juz: 7, surahs: [{ id: 11, name: "Al-Ma'idah (82-120)", ayahs: 39 }, { id: 12, name: "Al-An'am (1-110)", ayahs: 110 }] },
  { juz: 8, surahs: [{ id: 13, name: "Al-An'am (111-165)", ayahs: 55 }, { id: 14, name: "Al-A'raf (1-87)", ayahs: 87 }] },
  { juz: 9, surahs: [{ id: 15, name: "Al-A'raf (88-206)", ayahs: 119 }, { id: 16, name: "Al-Anfal (1-40)", ayahs: 40 }] },
  { juz: 10, surahs: [{ id: 17, name: "Al-Anfal (41-75)", ayahs: 35 }, { id: 18, name: "At-Tawbah (1-92)", ayahs: 92 }] },
  { juz: 11, surahs: [{ id: 19, name: "At-Tawbah (93-129)", ayahs: 37 }, { id: 20, name: "Yunus (1-109)", ayahs: 109 }] },
  { juz: 12, surahs: [{ id: 21, name: "Hud (1-123)", ayahs: 123 }, { id: 22, name: "Yusuf (1-52)", ayahs: 52 }] },
  { juz: 13, surahs: [{ id: 23, name: "Yusuf (53-111)", ayahs: 59 }, { id: 24, name: "Ar-Ra'd", ayahs: 43 }, { id: 25, name: "Ibrahim (1-52)", ayahs: 52 }] },
  { juz: 14, surahs: [{ id: 26, name: "Al-Hijr", ayahs: 99 }, { id: 27, name: "An-Nahl (1-128)", ayahs: 128 }] },
  { juz: 15, surahs: [{ id: 28, name: "Al-Isra", ayahs: 111 }, { id: 29, name: "Al-Kahf (1-74)", ayahs: 74 }] },
  { juz: 16, surahs: [{ id: 30, name: "Al-Kahf (75-110)", ayahs: 36 }, { id: 31, name: "Maryam", ayahs: 98 }, { id: 32, name: "Ta-Ha (1-135)", ayahs: 135 }] },
  { juz: 17, surahs: [{ id: 33, name: "Al-Anbiya", ayahs: 112 }, { id: 34, name: "Al-Hajj (1-78)", ayahs: 78 }] },
  { juz: 18, surahs: [{ id: 35, name: "Al-Mu'minun", ayahs: 118 }, { id: 36, name: "An-Nur (1-64)", ayahs: 64 }] },
  { juz: 19, surahs: [{ id: 37, name: "Al-Furqan", ayahs: 77 }, { id: 38, name: "Ash-Shu'ara (1-227)", ayahs: 227 }] },
  { juz: 20, surahs: [{ id: 39, name: "An-Naml", ayahs: 93 }, { id: 40, name: "Al-Qasas (1-88)", ayahs: 88 }] },
  { juz: 21, surahs: [{ id: 41, name: "Al-Ankabut", ayahs: 69 }, { id: 42, name: "Ar-Rum", ayahs: 60 }, { id: 43, name: "Luqman", ayahs: 34 }] },
  { juz: 22, surahs: [{ id: 44, name: "Al-Ahzab", ayahs: 73 }, { id: 45, name: "Saba'", ayahs: 54 }, { id: 46, name: "Fatir (1-45)", ayahs: 45 }] },
  { juz: 23, surahs: [{ id: 47, name: "Ya-Sin", ayahs: 83 }, { id: 48, name: "As-Saffat", ayahs: 182 }, { id: 49, name: "Sad (1-88)", ayahs: 88 }] },
  { juz: 24, surahs: [{ id: 50, name: "Az-Zumar", ayahs: 75 }, { id: 51, name: "Ghafir (1-85)", ayahs: 85 }] },
  { juz: 25, surahs: [{ id: 52, name: "Fussilat", ayahs: 54 }, { id: 53, name: "Ash-Shura", ayahs: 53 }, { id: 54, name: "Az-Zukhruf (1-89)", ayahs: 89 }] },
  { juz: 26, surahs: [{ id: 55, name: "Ad-Dukhan", ayahs: 59 }, { id: 56, name: "Al-Jathiyah", ayahs: 37 }, { id: 57, name: "Al-Ahqaf", ayahs: 35 }, { id: 58, name: "Muhammad", ayahs: 38 }] },
  { juz: 27, surahs: [{ id: 59, name: "Al-Fath", ayahs: 29 }, { id: 60, name: "Al-Hujurat", ayahs: 18 }, { id: 61, name: "Qaf", ayahs: 45 }, { id: 62, name: "Adh-Dhariyat (1-30)", ayahs: 30 }] },
  { juz: 28, surahs: [{ id: 63, name: "Adh-Dhariyat (31-60)", ayahs: 30 }, { id: 64, name: "At-Tur", ayahs: 49 }, { id: 65, name: "An-Najm", ayahs: 62 }, { id: 66, name: "Al-Qamar", ayahs: 55 }, { id: 67, name: "Ar-Rahman", ayahs: 78 }, { id: 68, name: "Al-Waqi'ah", ayahs: 96 }] },
  { juz: 29, surahs: [{ id: 69, name: "Al-Mulk", ayahs: 30 }, { id: 70, name: "Al-Qalam", ayahs: 52 }, { id: 71, name: "Al-Haqqah", ayahs: 52 }, { id: 72, name: "Al-Ma'arij", ayahs: 44 }, { id: 73, name: "Nuh", ayahs: 28 }, { id: 74, name: "Al-Jinn", ayahs: 28 }, { id: 75, name: "Al-Muzzammil", ayahs: 20 }, { id: 76, name: "Al-Muddaththir", ayahs: 56 }, { id: 77, name: "Al-Qiyamah", ayahs: 40 }, { id: 78, name: "Al-Insan", ayahs: 31 }, { id: 79, name: "Al-Mursalat", ayahs: 50 }] },
  { juz: 30, surahs: [{ id: 80, name: "An-Naba'", ayahs: 40 }, { id: 81, name: "An-Nazi'at", ayahs: 46 }, { id: 82, name: "Abasa", ayahs: 42 }, { id: 83, name: "At-Takwir", ayahs: 29 }, { id: 84, name: "Al-Infitar", ayahs: 19 }, { id: 85, name: "Al-Mutaffifin", ayahs: 36 }, { id: 86, name: "Al-Inshiqaq", ayahs: 25 }, { id: 87, name: "Al-Buruj", ayahs: 22 }, { id: 88, name: "At-Tariq", ayahs: 17 }, { id: 89, name: "Al-A'la", ayahs: 19 }, { id: 90, name: "Al-Ghashiyah", ayahs: 26 }, { id: 91, name: "Al-Fajr", ayahs: 30 }, { id: 92, name: "Al-Balad", ayahs: 20 }, { id: 93, name: "Ash-Shams", ayahs: 15 }, { id: 94, name: "Al-Layl", ayahs: 21 }, { id: 95, name: "Ad-Duha", ayahs: 11 }, { id: 96, name: "Ash-Sharh", ayahs: 8 }, { id: 97, name: "At-Tin", ayahs: 8 }, { id: 98, name: "Al-'Alaq", ayahs: 19 }, { id: 99, name: "Al-Qadr", ayahs: 5 }, { id: 100, name: "Al-Bayyinah", ayahs: 8 }, { id: 101, name: "Az-Zalzalah", ayahs: 8 }, { id: 102, name: "Al-'Adiyat", ayahs: 11 }, { id: 103, name: "Al-Qari'ah", ayahs: 11 }, { id: 104, name: "At-Takathur", ayahs: 8 }, { id: 105, name: "Al-'Asr", ayahs: 3 }, { id: 106, name: "Al-Humazah", ayahs: 9 }, { id: 107, name: "Al-Fil", ayahs: 5 }, { id: 108, name: "Quraysh", ayahs: 4 }, { id: 109, name: "Al-Ma'un", ayahs: 7 }, { id: 110, name: "Al-Kawthar", ayahs: 3 }, { id: 111, name: "Al-Kafirun", ayahs: 6 }, { id: 112, name: "An-Nasr", ayahs: 3 }, { id: 113, name: "Al-Masad", ayahs: 5 }, { id: 114, name: "Al-Ikhlas", ayahs: 4 }, { id: 115, name: "Al-Falaq", ayahs: 5 }, { id: 116, name: "An-Nas", ayahs: 6 }] },
];

const STATUS_CYCLE: Status[] = ["not_started", "learning", "memorized", "needs_review"];

function nextStatus(s: Status): Status {
  const idx = STATUS_CYCLE.indexOf(s);
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
}

function useLocalStorage<T>(key: string, initial: T) {
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

export default function HifzPage() {
  const [surahStatus, setSurahStatus] = useLocalStorage<Record<number, Status>>("hifz_status", {});
  const [lastReview, setLastReview] = useLocalStorage<Record<number, number>>("hifz_last_review", {});
  const [expanded, setExpanded] = useState<number | null>(null);
  const [dailyReview, setDailyReview] = useLocalStorage<Record<string, boolean>>(
    `hifz_review_${new Date().toDateString()}`, {}
  );

  const toggleSurahStatus = (id: number) =>
    setSurahStatus((prev) => ({ ...prev, [id]: nextStatus(prev[id] || "not_started") }));

  const markJuzReviewed = (juz: number) =>
    setLastReview((prev) => ({ ...prev, [juz]: Date.now() }));

  const toggleDailyReview = (juz: number) =>
    setDailyReview((prev) => ({ ...prev, [juz]: !prev[juz] }));

  const totalSurahs = JUZ_DATA.reduce((acc, j) => acc + j.surahs.length, 0);
  const memorizedSurahs = Object.values(surahStatus).filter((s) => s === "memorized").length;
  const pct = Math.round((memorizedSurahs / totalSurahs) * 100);

  // Spaced repetition suggestions
  const suggestions = JUZ_DATA
    .filter(({ juz }) => {
      const juzSurahs = JUZ_DATA.find((j) => j.juz === juz)?.surahs || [];
      const hasMemorized = juzSurahs.some((s) => surahStatus[s.id] === "memorized");
      if (!hasMemorized) return false;
      const last = lastReview[juz];
      if (!last) return true;
      const daysSince = (Date.now() - last) / 86400000;
      return daysSince >= 3;
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--bg)] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">📗</div>
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-2">Hifz Tracker</h1>
          <p className="text-white/60">Track your Quran memorization journey</p>
        </div>

        {/* Progress Circle + Stats */}
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--primary)]/20 p-8 mb-6 flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-36 h-36 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
              <circle
                cx="60" cy="60" r="50" fill="none"
                stroke="var(--primary)" strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[var(--primary)]">{pct}%</span>
              <span className="text-white/40 text-xs">memorized</span>
            </div>
          </div>
          <div className="flex-1 space-y-3 w-full">
            {(["memorized", "learning", "needs_review", "not_started"] as Status[]).map((s) => {
              const count = Object.values(surahStatus).filter((v) => v === s).length;
              const total = s === "not_started" ? totalSurahs - Object.keys(surahStatus).length + count : count;
              return (
                <div key={s} className="flex items-center gap-3">
                  <span className={`text-sm w-5 ${STATUS_CONFIG[s].color}`}>{STATUS_CONFIG[s].icon}</span>
                  <span className="text-white/60 text-sm flex-1">{STATUS_CONFIG[s].label}</span>
                  <span className={`font-bold text-sm ${STATUS_CONFIG[s].color}`}>{total}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spaced Repetition Suggestions */}
        {suggestions.length > 0 && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 mb-6">
            <h2 className="text-orange-400 font-bold mb-3">🔄 Suggested Reviews</h2>
            <div className="flex flex-wrap gap-2">
              {suggestions.map(({ juz }) => (
                <button
                  key={juz}
                  onClick={() => { markJuzReviewed(juz); toggleDailyReview(juz); }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    dailyReview[juz]
                      ? "bg-[var(--primary)] text-black"
                      : "bg-orange-500/20 text-orange-300 hover:bg-orange-500/30"
                  }`}
                >
                  {dailyReview[juz] ? "✓ " : ""}Juz {juz}
                  {!lastReview[juz] && " (never reviewed)"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 30 Juz Accordion */}
        <div className="space-y-2">
          {JUZ_DATA.map(({ juz, surahs }) => {
            const mem = surahs.filter((s) => surahStatus[s.id] === "memorized").length;
            const learning = surahs.filter((s) => surahStatus[s.id] === "learning").length;
            const juzPct = Math.round((mem / surahs.length) * 100);

            return (
              <div key={juz} className="bg-[var(--surface)] rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === juz ? null : juz)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] text-sm font-bold flex-shrink-0">
                    {juz}
                  </span>
                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-white font-medium text-sm">Juz {juz}</span>
                      <span className="text-white/40 text-xs">{mem}/{surahs.length} memorized</span>
                    </div>
                    <div className="h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--primary)] to-yellow-300 rounded-full transition-all"
                        style={{ width: `${juzPct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-white/30 text-sm">{expanded === juz ? "▲" : "▼"}</span>
                </button>

                {expanded === juz && (
                  <div className="border-t border-white/10 p-4 space-y-2">
                    <div className="flex justify-end mb-3">
                      <button
                        onClick={() => markJuzReviewed(juz)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors"
                      >
                        Mark Juz {juz} as Reviewed
                        {lastReview[juz] && (
                          <span className="ml-1 text-white/30">
                            (last: {Math.floor((Date.now() - lastReview[juz]) / 86400000)}d ago)
                          </span>
                        )}
                      </button>
                    </div>
                    {surahs.map((surah) => {
                      const status = surahStatus[surah.id] || "not_started";
                      const cfg = STATUS_CONFIG[status];
                      return (
                        <div
                          key={surah.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${cfg.bg} border-transparent`}
                        >
                          <span className={`text-lg ${cfg.color}`}>{cfg.icon}</span>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${cfg.color}`}>{surah.name}</p>
                            <p className="text-white/30 text-xs">{surah.ayahs} ayahs</p>
                          </div>
                          <button
                            onClick={() => toggleSurahStatus(surah.id)}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${cfg.bg} ${cfg.color} border-current/20 hover:brightness-110`}
                          >
                            {cfg.label}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
