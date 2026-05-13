"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/quran", label: "Quran", icon: "📖" },
  { href: "/prayer", label: "Prayer", icon: "🕌" },
  { href: "/adhkar", label: "Adhkar", icon: "🤲" },
  { href: "/dua", label: "Dua", icon: "💫" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--border)] px-2 py-2">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all duration-200 min-w-[60px]",
                isActive
                  ? "text-[var(--primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              )}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className={cn("text-xs", isActive ? "font-medium" : "")}>{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[var(--primary)] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
