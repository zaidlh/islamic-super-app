"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchModal } from "@/components/ui/SearchModal";

const PAGE_TITLES: Record<string, string> = {
  "/": "Home",
  "/quran": "Quran",
  "/hadith": "Hadith",
  "/adhkar": "Adhkar",
  "/dua": "Dua",
  "/prayer": "Prayer Times",
  "/ai": "AI Assistant",
};

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  // Determine page title
  const title =
    PAGE_TITLES[pathname] ??
    Object.entries(PAGE_TITLES).find(([key]) => key !== "/" && pathname.startsWith(key))?.[1] ??
    "Islamic App";

  return (
    <>
      <header className="sticky top-0 z-30 bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)] px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <span className="text-xl">🕌</span>
            <span className="font-bold text-[var(--text)] text-sm">Islamic App</span>
          </Link>

          {/* Desktop title */}
          <h1 className="hidden lg:block text-lg font-semibold text-[var(--text)]">{title}</h1>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--elevated)] border border-[var(--border)] text-[var(--text-muted)] text-sm hover:border-[var(--primary)]/30 transition-colors"
              aria-label="Search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <span className="hidden md:inline text-xs">Search Quran…</span>
              <kbd className="hidden md:inline text-xs bg-[var(--border)] px-1.5 py-0.5 rounded text-[var(--text-subtle)]">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
