"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LastRead {
  surah: number;
  ayah: number;
  surahName: string;
  timestamp: number;
}

interface QuranState {
  lastRead: LastRead | null;
  readingHistory: LastRead[];
  isPlaying: boolean;
  currentReciter: string;
  currentSurah: number;
  currentAyah: number;
  // Actions
  setLastRead: (surah: number, ayah: number, surahName: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentReciter: (reciter: string) => void;
  setCurrentAyah: (surah: number, ayah: number) => void;
}

export const useQuranStore = create<QuranState>()(
  persist(
    (set) => ({
      lastRead: null,
      readingHistory: [],
      isPlaying: false,
      currentReciter: "Alafasy_128kbps",
      currentSurah: 1,
      currentAyah: 1,

      setLastRead: (surah, ayah, surahName) =>
        set((state) => {
          const newEntry: LastRead = { surah, ayah, surahName, timestamp: Date.now() };
          const history = [newEntry, ...state.readingHistory.filter((h) => h.surah !== surah)]
            .slice(0, 10);
          return { lastRead: newEntry, readingHistory: history };
        }),

      setIsPlaying: (isPlaying) => set({ isPlaying }),

      setCurrentReciter: (currentReciter) => set({ currentReciter }),

      setCurrentAyah: (currentSurah, currentAyah) => set({ currentSurah, currentAyah }),
    }),
    {
      name: "islamic-app-quran",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
