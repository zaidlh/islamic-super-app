import type { Metadata } from "next";
import Link from "next/link";
import { fetchChapters } from "@/lib/quran";
import { fetchPrayerTimesByCity, parsePrayerTimes } from "@/lib/prayer";
import { getRandomHadith, previewText } from "@/lib/hadith";

export const metadata: Metadata = { title: "Home" };
export const revalidate = 3600;

async function getDashboardData() {
  try {
    const [chapters, prayerResponse, randomHadith] = await Promise.allSettled([
      fetchChapters(),
      fetchPrayerTimesByCity("Mecca", "Saudi Arabia", 3),
      getRandomHadith("eng-nawawi40"),
    ]);
    return {
      chapters: chapters.status === "fulfilled" ? chapters.value.slice(0, 6) : [],
      prayer: prayerResponse.status === "fulfilled"
        ? { timings: prayerResponse.value.data.timings, date: prayerResponse.value.data.date }
        : null,
      hadith: randomHadith.status === "fulfilled" ? randomHadith.value : null,
    };
  } catch {
    return { chapters: [], prayer: null, hadith: null };
  }
}

const MODULE_SECTIONS = [
  {
    title: "Quran & Hadith",
    color: "from-emerald-900/40",
    modules: [
      { href: "/quran", icon: "📖", title: "Quran", subtitle: "114 Surahs" },
      { href: "/tafsir", icon: "🔬", title: "Tafsir", subtitle: "Ibn Kathir & More" },
      { href: "/hadith", icon: "📚", title: "Hadith", subtitle: "6 Collections" },
      { href: "/translations", icon: "🌍", title: "Translations", subtitle: "20+ Languages" },
      { href: "/reciters", icon: "🎙️", title: "Reciters", subtitle: "15+ Voices" },
    ],
  },
  {
    title: "Daily Practice",
    color: "from-blue-900/40",
    modules: [
      { href: "/prayer", icon: "🕌", title: "Prayer Times", subtitle: "With Qibla" },
      { href: "/adhkar", icon: "🤲", title: "Adhkar", subtitle: "Daily Remembrance" },
      { href: "/dua", icon: "💫", title: "Dua", subtitle: "Hisnul Muslim" },
      { href: "/tracker", icon: "📊", title: "Ibadah Tracker", subtitle: "Daily checklist" },
      { href: "/hifz", icon: "📿", title: "Hifz Tracker", subtitle: "Memorization" },
    ],
  },
  {
    title: "Islamic Tools",
    color: "from-amber-900/40",
    modules: [
      { href: "/zakat", icon: "💰", title: "Zakat Calc", subtitle: "Nisab & 2.5%" },
      { href: "/ramadan", icon: "🌙", title: "Ramadan", subtitle: "Planner & Times" },
      { href: "/hajj", icon: "🕋", title: "Hajj & Umrah", subtitle: "Step-by-step" },
      { href: "/fasting", icon: "☀️", title: "Fasting", subtitle: "Tracker" },
      { href: "/calendar", icon: "📅", title: "Hijri Calendar", subtitle: "Islamic Events" },
    ],
  },
  {
    title: "Knowledge",
    color: "from-purple-900/40",
    modules: [
      { href: "/names", icon: "✨", title: "99 Names", subtitle: "Asma ul Husna" },
      { href: "/prophets", icon: "🌟", title: "Prophets", subtitle: "25 Stories" },
      { href: "/seerah", icon: "📜", title: "Seerah", subtitle: "Prophet's Life" },
      { href: "/tajweed", icon: "🎵", title: "Tajweed", subtitle: "15 Rules" },
      { href: "/quiz", icon: "🎯", title: "Islamic Quiz", subtitle: "Test yourself" },
    ],
  },
  {
    title: "Personal",
    color: "from-rose-900/40",
    modules: [
      { href: "/goals", icon: "🎯", title: "Goals", subtitle: "Spiritual targets" },
      { href: "/journal", icon: "📓", title: "Journal", subtitle: "Daily reflection" },
      { href: "/search", icon: "🔍", title: "Search", subtitle: "Global search" },
    ],
  },
];

export default async function HomePage() {
  const { chapters, prayer, hadith } = await getDashboardData();
  const prayers = prayer ? parsePrayerTimes(prayer.timings as Record<string, string>) : [];
  const nextPrayer = prayers.find((p) => p.isNext);
  const hijri = prayer?.date?.hijri;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1200] via-[#0A0A0A] to-[#0A0A0A] border border-[var(--border)] p-8">
        <div className="relative z-10">
          <p className="text-[var(--primary)] text-sm font-medium mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <h1 className="text-3xl font-bold text-white mb-2">As-salamu alaykum 🌙</h1>
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
                Next prayer: <span className="text-[var(--primary)] font-semibold">{nextPrayer.name}</span>
                {nextPrayer.countdown && <span className="text-gray-400 ml-1">in {nextPrayer.countdown}</span>}
                <span className="text-gray-500 ml-2">({nextPrayer.time})</span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Prayer Times */}
      {prayers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Today's Prayer Times</h2>
            <Link href="/prayer" className="text-sm text-[var(--primary)] hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {prayers.map((p) => (
              <div key={p.name} className={`card p-3 text-center transition-all ${p.isNext ? "border-[var(--primary)]/50 bg-[var(--primary)]/5" : ""}`}>
                {p.isNext && <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mx-auto mb-1 animate-pulse" />}
                <p className="text-xs text-muted mb-1">{p.name}</p>
                <p className={`text-sm font-semibold ${p.isNext ? "text-[var(--primary)]" : "text-[var(--text)]"}`}>{p.time}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Module Sections */}
      {MODULE_SECTIONS.map((section) => (
        <section key={section.title}>
          <h2 className="section-title mb-4">{section.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {section.modules.map((mod) => (
              <Link
                key={mod.href}
                href={mod.href}
                className={`card card-hover bg-gradient-to-br ${section.color} to-transparent p-4 flex flex-col gap-2 group`}
              >
                <span className="text-2xl">{mod.icon}</span>
                <div>
                  <p className="font-semibold text-[var(--text)] text-sm group-hover:text-[var(--primary)] transition-colors">{mod.title}</p>
                  <p className="text-xs text-muted">{mod.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Hadith of the Day */}
      {hadith && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Hadith of the Day</h2>
            <Link href="/hadith" className="text-sm text-[var(--primary)] hover:underline">Browse →</Link>
          </div>
          <div className="card p-6 border-l-4 border-l-[var(--primary)]">
            <p className="text-[var(--text)] leading-relaxed">&ldquo;{previewText(hadith.text, 400)}&rdquo;</p>
            <p className="text-sm text-muted mt-3">40 Hadith Nawawi · #{hadith.hadithnumber}</p>
          </div>
        </section>
      )}

      {/* Quick Surahs */}
      {chapters.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Start Reading</h2>
            <Link href="/quran" className="text-sm text-[var(--primary)] hover:underline">All Surahs →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {chapters.map((chapter) => (
              <Link key={chapter.id} href={`/quran/${chapter.id}`} className="card card-hover p-4 flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold text-sm flex-shrink-0">
                  {chapter.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{chapter.name_simple}</p>
                  <p className="text-xs text-muted">{chapter.translated_name.name} · {chapter.verses_count} verses</p>
                </div>
                <p className="arabic-text text-xl text-[var(--primary)] flex-shrink-0">{chapter.name_arabic}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
