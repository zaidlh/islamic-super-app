"use client";
import { useIbadahStore } from "@/store/ibadahStore";
import { cn } from "@/lib/utils";

const PRAYERS = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;
const PRAYER_LABELS: Record<typeof PRAYERS[number], string> = { fajr: "Fajr", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha" };
const PRAYER_TIMES: Record<typeof PRAYERS[number], string> = { fajr: "🌅", dhuhr: "☀️", asr: "🌤️", maghrib: "🌇", isha: "🌙" };

export default function TrackerPage() {
  const store = useIbadahStore();
  const today = new Date().toISOString().split("T")[0];
  const log = store.getTodayLog();
  const prayerScore = PRAYERS.filter((p) => log[p]).length;

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  const update = (field: keyof typeof log, value: boolean | number) => store.updateLog(today, { [field]: value });

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">متابعة العبادة</h1>
        <p className="text-[var(--text-muted)] mt-1">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      {/* Prayer Score */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Today's Prayers</h2>
          <span className="text-2xl font-bold text-[var(--primary)]">{prayerScore}/5</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {PRAYERS.map((p) => (
            <button
              key={p}
              onClick={() => update(p, !log[p])}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all",
                log[p]
                  ? "bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)]"
                  : "bg-[var(--elevated)] border-[var(--border)] text-[var(--text-muted)]"
              )}
            >
              <span className="text-xl">{PRAYER_TIMES[p]}</span>
              <span className="text-xs font-medium">{PRAYER_LABELS[p]}</span>
              {log[p] && <span className="text-xs">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Quran */}
      <div className="card p-5">
        <h2 className="section-title mb-4">📖 Quran Reading</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-[var(--text-muted)]">Pages today</span>
              <span className="text-sm font-medium text-[var(--primary)]">{log.quranPages} / {log.quranTarget}</span>
            </div>
            <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--primary)] rounded-full transition-all" style={{ width: `${Math.min(100, (log.quranPages / log.quranTarget) * 100)}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => update("quranPages", Math.max(0, log.quranPages - 1))} className="w-8 h-8 rounded-lg bg-[var(--elevated)] text-[var(--text)] flex items-center justify-center hover:bg-[var(--border)] transition-colors">-</button>
            <span className="w-8 text-center font-bold text-[var(--primary)]">{log.quranPages}</span>
            <button onClick={() => update("quranPages", log.quranPages + 1)} className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--primary-hover)] transition-colors">+</button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs text-[var(--text-muted)]">Daily target:</span>
          <input type="number" min="1" max="20" value={log.quranTarget} onChange={(e) => update("quranTarget", Number(e.target.value))} className="w-16 input-field text-xs py-1 text-center" />
          <span className="text-xs text-[var(--text-muted)]">pages</span>
        </div>
      </div>

      {/* Optional practices */}
      <div className="card p-5 grid grid-cols-2 gap-3">
        {[
          { key: "sunnahPrayers" as const, label: "Sunnah Prayers", icon: "🙏" },
          { key: "tahajjud" as const, label: "Tahajjud", icon: "🌙" },
          { key: "fasting" as const, label: "Fasting", icon: "✨" },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => update(key, !log[key])}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left",
              log[key]
                ? "bg-[var(--primary)]/10 border-[var(--primary)]"
                : "bg-[var(--elevated)] border-[var(--border)]"
            )}
          >
            <span className="text-xl">{icon}</span>
            <div>
              <p className={cn("text-sm font-medium", log[key] ? "text-[var(--primary)]" : "text-[var(--text)]")}>{label}</p>
              <p className="text-xs text-[var(--text-muted)]">{log[key] ? "✓ Done" : "Tap to log"}</p>
            </div>
          </button>
        ))}
      </div>

      {/* 7-day heatmap */}
      <div className="card p-5">
        <h2 className="section-title mb-4">📊 7-Day Overview</h2>
        <div className="flex gap-2">
          {last7Days.map((date) => {
            const score = store.getDayScore(date);
            const isToday = date === today;
            return (
              <div key={date} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={cn("w-full rounded-lg transition-colors", isToday && "ring-2 ring-[var(--primary)]")}
                  style={{
                    height: 40,
                    background: score === 0 ? "var(--border)" : score < 60 ? "rgba(201,169,110,0.3)" : score < 100 ? "rgba(201,169,110,0.6)" : "var(--primary)",
                  }}
                />
                <span className="text-xs text-[var(--text-muted)]">{new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" })}</span>
                <span className="text-xs font-medium text-[var(--primary)]">{score}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
