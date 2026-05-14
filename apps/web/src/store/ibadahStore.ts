"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DailyLog {
  date: string; // YYYY-MM-DD
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  quranPages: number;
  quranTarget: number;
  dhikrCount: number;
  sunnahPrayers: boolean;
  tahajjud: boolean;
  fasting: boolean;
}

interface FastLog {
  date: string;
  type: "obligatory" | "voluntary";
  category?: string;
}

interface IbadahState {
  logs: Record<string, DailyLog>;
  fastLogs: FastLog[];
  streak: number;
  quranPagesTarget: number;
  getTodayLog: () => DailyLog;
  updateLog: (date: string, updates: Partial<DailyLog>) => void;
  logFast: (date: string, type: "obligatory" | "voluntary", category?: string) => void;
  removeFast: (date: string) => void;
  isFasted: (date: string) => boolean;
  getDayScore: (date: string) => number;
  setQuranTarget: (n: number) => void;
}

const today = () => new Date().toISOString().split("T")[0];

const defaultDay = (date: string): DailyLog => ({
  date, fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false,
  quranPages: 0, quranTarget: 5, dhikrCount: 0, sunnahPrayers: false, tahajjud: false, fasting: false,
});

export const useIbadahStore = create<IbadahState>()(
  persist(
    (set, get) => ({
      logs: {},
      fastLogs: [],
      streak: 0,
      quranPagesTarget: 5,

      getTodayLog: () => {
        const d = today();
        return get().logs[d] ?? defaultDay(d);
      },

      updateLog: (date, updates) =>
        set((s) => ({
          logs: {
            ...s.logs,
            [date]: { ...(s.logs[date] ?? defaultDay(date)), ...updates },
          },
        })),

      logFast: (date, type, category) =>
        set((s) => ({ fastLogs: [...s.fastLogs.filter((f) => f.date !== date), { date, type, category }] })),

      removeFast: (date) =>
        set((s) => ({ fastLogs: s.fastLogs.filter((f) => f.date !== date) })),

      isFasted: (date) => get().fastLogs.some((f) => f.date === date),

      getDayScore: (date) => {
        const log = get().logs[date];
        if (!log) return 0;
        let score = 0;
        if (log.fajr) score += 20;
        if (log.dhuhr) score += 20;
        if (log.asr) score += 20;
        if (log.maghrib) score += 20;
        if (log.isha) score += 20;
        return score;
      },

      setQuranTarget: (n) => set({ quranPagesTarget: n }),
    }),
    { name: "islamic-ibadah", storage: createJSONStorage(() => localStorage) }
  )
);
