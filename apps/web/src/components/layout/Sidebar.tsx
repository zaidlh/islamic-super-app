"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  {
    label: "Core",
    items: [
      { href: "/", label: "Home", icon: "🏠", ar: "الرئيسية" },
      { href: "/quran", label: "Quran", icon: "📖", ar: "القرآن" },
      { href: "/tafsir", label: "Tafsir", icon: "🔬", ar: "التفسير" },
      { href: "/hadith", label: "Hadith", icon: "📚", ar: "الحديث" },
      { href: "/adhkar", label: "Adhkar", icon: "🤲", ar: "الأذكار" },
      { href: "/dua", label: "Dua", icon: "💫", ar: "الدعاء" },
      { href: "/prayer", label: "Prayer Times", icon: "🕌", ar: "الصلاة" },
    ],
  },
  {
    label: "Knowledge",
    items: [
      { href: "/names", label: "99 Names", icon: "✨", ar: "أسماء الله" },
      { href: "/prophets", label: "Prophets", icon: "🌟", ar: "الأنبياء" },
      { href: "/seerah", label: "Seerah", icon: "📜", ar: "السيرة" },
      { href: "/calendar", label: "Hijri Calendar", icon: "📅", ar: "التقويم" },
      { href: "/tajweed", label: "Tajweed", icon: "🎵", ar: "التجويد" },
      { href: "/quiz", label: "Islamic Quiz", icon: "🎯", ar: "مسابقة" },
    ],
  },
  {
    label: "Tools",
    items: [
      { href: "/zakat", label: "Zakat Calc", icon: "💰", ar: "الزكاة" },
      { href: "/ramadan", label: "Ramadan", icon: "🌙", ar: "رمضان" },
      { href: "/hajj", label: "Hajj & Umrah", icon: "🕋", ar: "الحج" },
      { href: "/fasting", label: "Fasting", icon: "☀️", ar: "الصيام" },
      { href: "/tracker", label: "Ibadah Tracker", icon: "📊", ar: "المتابعة" },
      { href: "/hifz", label: "Hifz Tracker", icon: "📿", ar: "الحفظ" },
      { href: "/goals", label: "Goals", icon: "🎯", ar: "الأهداف" },
    ],
  },
  {
    label: "Library",
    items: [
      { href: "/translations", label: "Translations", icon: "🌍", ar: "الترجمات" },
      { href: "/reciters", label: "Reciters", icon: "🎙️", ar: "القراء" },
      { href: "/journal", label: "Journal", icon: "📓", ar: "المذكرة" },
      { href: "/search", label: "Search", icon: "🔍", ar: "البحث" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col bg-[var(--surface)] border-r border-[var(--border)] z-40">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-xl">
            🕌
          </div>
          <div>
            <p className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
              Islamic App
            </p>
            <p className="text-xs text-[var(--text-muted)]">Your companion</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="text-xs font-semibold text-[var(--text-subtle)] uppercase tracking-wider px-2 mb-1">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn("nav-link", isActive && "nav-link-active")}
                  >
                    <span className="text-base flex-shrink-0">{item.icon}</span>
                    <span className="flex-1 text-sm">{item.label}</span>
                    <span
                      className={cn("text-xs font-arabic", isActive ? "text-[var(--primary)]" : "text-[var(--text-subtle)]")}
                      dir="rtl"
                    >
                      {item.ar}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border)]">
        <p className="text-xs text-[var(--text-subtle)] text-center">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>
    </aside>
  );
}
