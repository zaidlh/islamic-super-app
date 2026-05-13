import type { Metadata } from "next";
import Link from "next/link";
import { fetchChapters } from "@/lib/quran";
import { fetchPrayerTimesByCity } from "@/lib/prayer";
import { parsePrayerTimes } from "@/lib/prayer";
import { getRandomHadith } from "@/lib/hadith";
import { previewText } from "@/lib/hadith";

export const metadata: Metadata = {
  title: "Home",
};

export const revalidate = 3600;

async function getDashboardData() {
  try {
    const [chapters, prayerResponse, randomHadith] = await Promise.allSettled([
      fetchChapters(),
      fetchPrayerTimesByCity("Mecca", "Saudi Arabia", 3),
      getRandomHadith("eng-nawawi40"),
    ]);

    return {
      chapters: chapters.status === "fulfilled" ? chapters.value.slice(0, 8) : [],
      prayer:
        prayerResponse.status === "fulfilled"
          ? { timings: prayerResponse.value.data.timings, date: prayerResponse.value.data.date }
          : null,
      hadith: randomHadith.status === "fulfilled" ? randomHadith.value : null,
    };
  } catch {
    return { chapters: [], prayer: null, hadith: null };
  }
}

export default async function HomePage() {
  const { chapters, prayer, hadith } = await getDashboardData();
  const prayers = prayer ? parsePrayerTimes(prayer.timings) : [];
  const nextPrayer = prayers.find((p) => p.isNext);
  const hijri = prayer?.date?.hijri;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Hero / Greeting */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1200] via-[#0A0A0A] to-[#0A0A0A] dark:from-[#1A1200] border border-[var(--border)] p-8">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>
        <div className="relative z-10">
          <p className="text-[var(--primary)] text-sm font-medium mb-2">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <h1 className="text-3xl font-bold text-white mb-2">
            As-salamu alaykum 🌙
          </h1>
          {hijri && (
            <p className="text-gray-400 text-sm">
              {hijri.day} {hijri.month.en} {hijri.year} AH
              <span className="mx-2">·</span>
              <span className="arabic-text text-base">{hijri.day} {hijri.month.ar} {hijri.year} هـ</span>
            </p>
          )}
          {nextPrayer && (
            <div className="mt-4 flex items-center gap-3">
              <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse" />
              <p className="text-gray-300 text-sm">
                Next prayer:{" "}
                <span className="text-[var(--primary)] font-semibold">{nextPrayer.name}</span>
                {nextPrayer.countdown && (
                  <span className="text-gray-400 ml-1">in {nextPrayer.countdown}</span>
                )}
                <span className="text-gray-500 ml-2">({nextPrayer.time})</span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Nav Cards */}
      <section>
        <h2 className="section-title mb-4">Your Islamic Companion</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: "/quran", icon: "📖", title: "Quran", subtitle: "114 Surahs", color: "from-emerald-900/40 to-emerald-950/20" },
            { href: "/hadith", icon: "📚", title: "Hadith", subtitle: "6 Collections", color: "from-blue-900/40 to-blue-950/20" },
            { href: "/adhkar", icon: "🤲", title: "Adhkar", subtitle: "Daily Remembrance", color: "from-purple-900/40 to-purple-950/20" },
            { href: "/prayer", icon: "🕌", title: "Prayer Times", subtitle: "With Qibla", color: "from-amber-900/40 to-amber-950/20" },
            { href: "/dua", icon: "💫", title: "Dua", subtitle: "Hisnul Muslim", color: "from-rose-900/40 to-rose-950/20" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`card card-hover bg-gradient-to-br ${item.color} p-5 flex flex-col gap-2 group`}
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-muted">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Prayer Times Preview */}
      {prayers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Today&apos;s Prayer Times</h2>
            <Link href="/prayer" className="text-sm text-[var(--primary)] hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {prayers.map((p) => (
              <div
                key={p.name}
                className={`card p-3 text-center transition-all ${
                  p.isNext
                    ? "border-[var(--primary)]/50 bg-[var(--primary)]/5"
                    : ""
                }`}
              >
                {p.isNext && (
                  <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mx-auto mb-1 animate-pulse" />
                )}
                <p className="text-xs text-muted mb-1">{p.name}</p>
                <p
                  className={`text-sm font-semibold ${
                    p.isNext ? "text-[var(--primary)]" : "text-[var(--text)]"
                  }`}
                >
                  {p.time}
                </p>
                {p.countdown && (
                  <p className="text-xs text-[var(--primary)] mt-0.5">{p.countdown}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hadith of the Day */}
      {hadith && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Hadith of the Day</h2>
            <Link href="/hadith" className="text-sm text-[var(--primary)] hover:underline">
              Browse →
            </Link>
          </div>
          <div className="card p-6 border-l-4 border-l-[var(--primary)]">
            <p className="text-[var(--text)] leading-relaxed">
              &ldquo;{previewText(hadith.text, 400)}&rdquo;
            </p>
            <p className="text-sm text-muted mt-3">
              40 Hadith Nawawi · #{hadith.hadithnumber}
            </p>
          </div>
        </section>
      )}

      {/* Recent Surahs */}
      {chapters.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Start Reading</h2>
            <Link href="/quran" className="text-sm text-[var(--primary)] hover:underline">
              All Surahs →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/quran/${chapter.id}`}
                className="card card-hover p-4 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold text-sm flex-shrink-0">
                  {chapter.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                    {chapter.name_simple}
                  </p>
                  <p className="text-xs text-muted">
                    {chapter.translated_name.name} · {chapter.verses_count} verses ·{" "}
                    {chapter.revelation_place}
                  </p>
                </div>
                <p className="arabic-text text-xl text-[var(--primary)] flex-shrink-0">
                  {chapter.name_arabic}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
