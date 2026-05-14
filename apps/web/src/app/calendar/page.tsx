"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const HIJRI_MONTHS = [
  "Muharram","Safar","Rabi al-Awwal","Rabi al-Thani",
  "Jumada al-Awwal","Jumada al-Thani","Rajab","Sha'ban",
  "Ramadan","Shawwal","Dhul Qa'dah","Dhul Hijjah",
];

const ISLAMIC_EVENTS = [
  { month: 1, day: 1, name: "Islamic New Year", emoji: "🌙" },
  { month: 1, day: 10, name: "Day of Ashura", emoji: "🤲" },
  { month: 3, day: 12, name: "Mawlid al-Nabi ﷺ", emoji: "⭐" },
  { month: 7, day: 27, name: "Isra wal-Miraj", emoji: "✨" },
  { month: 8, day: 15, name: "Laylat al-Bara'ah", emoji: "🌟" },
  { month: 9, day: 1, name: "Start of Ramadan", emoji: "🌙" },
  { month: 9, day: 27, name: "Laylat al-Qadr (approx)", emoji: "💫" },
  { month: 10, day: 1, name: "Eid al-Fitr", emoji: "🎉" },
  { month: 12, day: 9, name: "Day of Arafah", emoji: "🕌" },
  { month: 12, day: 10, name: "Eid al-Adha", emoji: "🐑" },
];

interface HijriData {
  day: string; month: { number: number; en: string; ar: string }; year: string; weekday: { en: string };
}

export default function CalendarPage() {
  const [hijriToday, setHijriToday] = useState<HijriData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentHijriMonth, setCurrentHijriMonth] = useState(0);
  const [currentHijriYear, setCurrentHijriYear] = useState(0);

  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    fetch(`https://api.aladhan.com/v1/gToH?date=${dd}-${mm}-${yyyy}`)
      .then((r) => r.json())
      .then((data) => {
        const h = data?.data?.hijri;
        if (h) {
          setHijriToday(h);
          setCurrentHijriMonth(Number(h.month.number));
          setCurrentHijriYear(Number(h.year));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const eventsThisMonth = ISLAMIC_EVENTS.filter((e) => e.month === currentHijriMonth);
  const upcomingEvents = ISLAMIC_EVENTS.filter((e) => {
    if (!hijriToday) return true;
    const todayDay = Number(hijriToday.day);
    const todayMonth = Number(hijriToday.month.number);
    if (e.month > todayMonth) return true;
    if (e.month === todayMonth && e.day >= todayDay) return true;
    return false;
  }).slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">التقويم الهجري</h1>
        <p className="text-[var(--text-muted)] mt-1">Islamic Hijri Calendar</p>
      </div>

      {/* Today's Hijri Date */}
      <div className="card p-6 bg-gradient-to-br from-[var(--primary)]/10 to-transparent border-[var(--primary)]/30">
        {loading ? (
          <div className="shimmer h-16 rounded" />
        ) : hijriToday ? (
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Today</p>
              <p
                className="text-4xl text-[var(--primary)] font-bold"
                style={{ fontFamily: "Amiri, serif" }}
                dir="rtl"
              >
                {hijriToday.day} {hijriToday.month.ar} {hijriToday.year}
              </p>
              <p className="text-lg text-[var(--text)] mt-1">
                {hijriToday.day} {hijriToday.month.en} {hijriToday.year} AH
              </p>
              <p className="text-sm text-[var(--text-muted)]">{hijriToday.weekday?.en}</p>
            </div>
          </div>
        ) : (
          <p className="text-[var(--text-muted)]">Unable to load Hijri date</p>
        )}
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentHijriMonth((m) => m === 1 ? 12 : m - 1)}
          className="btn-ghost px-3 py-2"
        >
          ← Prev
        </button>
        <div className="text-center">
          <p
            className="text-xl font-bold text-[var(--text)]"
            style={{ fontFamily: "Amiri, serif" }}
            dir="rtl"
          >
            {HIJRI_MONTHS[(currentHijriMonth - 1) % 12]}
          </p>
          <p className="text-sm text-[var(--text-muted)]">{currentHijriYear} AH</p>
        </div>
        <button
          onClick={() => setCurrentHijriMonth((m) => m === 12 ? 1 : m + 1)}
          className="btn-ghost px-3 py-2"
        >
          Next →
        </button>
      </div>

      {/* Events this month */}
      {eventsThisMonth.length > 0 && (
        <div className="space-y-2">
          <h2 className="section-title">Events in {HIJRI_MONTHS[(currentHijriMonth - 1) % 12]}</h2>
          {eventsThisMonth.map((e) => (
            <div key={e.name} className="card p-4 flex items-center gap-4">
              <span className="text-2xl">{e.emoji}</span>
              <div>
                <p className="font-medium text-[var(--text)]">{e.name}</p>
                <p className="text-sm text-[var(--text-muted)]">
                  {e.day} {HIJRI_MONTHS[(currentHijriMonth - 1) % 12]}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Events */}
      <div className="space-y-3">
        <h2 className="section-title">Upcoming Islamic Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {upcomingEvents.map((e) => (
            <div key={e.name} className="card p-4 flex items-center gap-4 border-l-4 border-l-[var(--primary)]">
              <span className="text-3xl">{e.emoji}</span>
              <div>
                <p className="font-semibold text-[var(--text)]">{e.name}</p>
                <p className="text-sm text-[var(--primary)]">
                  {e.day} {HIJRI_MONTHS[(e.month - 1) % 12]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Events List */}
      <div className="space-y-3">
        <h2 className="section-title">All Islamic Events</h2>
        <div className="card divide-y divide-[var(--border)]">
          {ISLAMIC_EVENTS.map((e) => (
            <div key={e.name} className="p-4 flex items-center gap-4 hover:bg-[var(--elevated)] transition-colors">
              <span className="text-2xl w-8 text-center">{e.emoji}</span>
              <div className="flex-1">
                <p className="font-medium text-[var(--text)]">{e.name}</p>
              </div>
              <span className="text-sm text-[var(--text-muted)]">
                {e.day} {HIJRI_MONTHS[(e.month - 1) % 12]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
