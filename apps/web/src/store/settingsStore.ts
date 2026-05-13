"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Theme = "dark" | "light" | "system";
export type ArabicFont = "uthmanic" | "naskh" | "nastaliq";

interface SettingsState {
  theme: Theme;
  language: "en" | "ar";
  arabicFont: ArabicFont;
  arabicFontSize: number;
  translationFontSize: number;
  showTranslation: boolean;
  showTransliteration: boolean;
  quranReciter: string;
  prayerCalculationMethod: number;
  // Actions
  setTheme: (theme: Theme) => void;
  setLanguage: (lang: "en" | "ar") => void;
  setArabicFont: (font: ArabicFont) => void;
  setArabicFontSize: (size: number) => void;
  setTranslationFontSize: (size: number) => void;
  toggleTranslation: () => void;
  toggleTransliteration: () => void;
  setQuranReciter: (reciter: string) => void;
  setPrayerCalculationMethod: (method: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "dark",
      language: "en",
      arabicFont: "uthmanic",
      arabicFontSize: 28,
      translationFontSize: 16,
      showTranslation: true,
      showTransliteration: false,
      quranReciter: "Alafasy_128kbps",
      prayerCalculationMethod: 3,

      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setArabicFont: (arabicFont) => set({ arabicFont }),
      setArabicFontSize: (arabicFontSize) => set({ arabicFontSize }),
      setTranslationFontSize: (translationFontSize) => set({ translationFontSize }),
      toggleTranslation: () => set((state) => ({ showTranslation: !state.showTranslation })),
      toggleTransliteration: () =>
        set((state) => ({ showTransliteration: !state.showTransliteration })),
      setQuranReciter: (quranReciter) => set({ quranReciter }),
      setPrayerCalculationMethod: (prayerCalculationMethod) => set({ prayerCalculationMethod }),
    }),
    {
      name: "islamic-app-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
