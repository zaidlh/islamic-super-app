"use client";

import { useSettingsStore } from "@/store/settingsStore";

export function ThemeToggle() {
  const { theme, setTheme } = useSettingsStore();

  const toggle = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)]/30 hover:text-[var(--text)] transition-all duration-200"
      aria-label="Toggle theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
