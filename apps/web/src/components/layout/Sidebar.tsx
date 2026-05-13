"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "🏠", ar: "الرئيسية" },
  { href: "/quran", label: "Quran", icon: "📖", ar: "القرآن" },
  { href: "/hadith", label: "Hadith", icon: "📚", ar: "الحديث" },
  { href: "/adhkar", label: "Adhkar", icon: "🤲", ar: "الأذكار" },
  { href: "/dua", label: "Dua", icon: "💫", ar: "الدعاء" },
  { href: "/prayer", label: "Prayer Times", icon: "🕌", ar: "الصلاة" },
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
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "nav-link",
                isActive && "nav-link-active"
              )}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              <span
                className={cn(
                  "text-xs font-arabic",
                  isActive ? "text-[var(--primary)]" : "text-[var(--text-subtle)]"
                )}
                dir="rtl"
              >
                {item.ar}
              </span>
            </Link>
          );
        })}
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
