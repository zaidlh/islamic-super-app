"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type HifzStatus = "not_started" | "learning" | "memorized" | "needs_review";

interface SurahProgress {
  surahId: number;
  status: HifzStatus;
  lastReviewed?: number; // timestamp
  notes?: string;
}

interface HifzState {
  progress: Record<number, SurahProgress>;
  getSurahStatus: (id: number) => HifzStatus;
  setSurahStatus: (id: number, status: HifzStatus) => void;
  getJuzProgress: (juzSurahs: number[]) => { total: number; memorized: number; learning: number };
  getTotalMemorized: () => number;
  getSurahsToReview: () => number[];
}

export const useHifzStore = create<HifzState>()(
  persist(
    (set, get) => ({
      progress: {},

      getSurahStatus: (id) => get().progress[id]?.status ?? "not_started",

      setSurahStatus: (id, status) =>
        set((s) => ({
          progress: {
            ...s.progress,
            [id]: { surahId: id, status, lastReviewed: status === "memorized" ? Date.now() : s.progress[id]?.lastReviewed },
          },
        })),

      getJuzProgress: (surahIds) => {
        const p = get().progress;
        return {
          total: surahIds.length,
          memorized: surahIds.filter((id) => p[id]?.status === "memorized").length,
          learning: surahIds.filter((id) => p[id]?.status === "learning").length,
        };
      },

      getTotalMemorized: () => {
        return Object.values(get().progress).filter((p) => p.status === "memorized").length;
      },

      getSurahsToReview: () => {
        const now = Date.now();
        const week = 7 * 24 * 60 * 60 * 1000;
        return Object.values(get().progress)
          .filter((p) => p.status === "memorized" && (!p.lastReviewed || now - p.lastReviewed > week))
          .map((p) => p.surahId)
          .slice(0, 10);
      },
    }),
    { name: "islamic-hifz", storage: createJSONStorage(() => localStorage) }
  )
);
