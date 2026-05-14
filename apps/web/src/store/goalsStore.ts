"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Goal {
  id: string;
  title: string;
  category: "Quran" | "Prayer" | "Dhikr" | "Fasting" | "Charity" | "Other";
  target: number;
  unit: string;
  frequency: "daily" | "weekly" | "monthly";
  createdAt: number;
  note?: string;
}

export interface GoalLog {
  goalId: string;
  date: string;
  amount: number;
}

interface GoalsState {
  goals: Goal[];
  logs: GoalLog[];
  addGoal: (goal: Omit<Goal, "id" | "createdAt">) => void;
  removeGoal: (id: string) => void;
  logProgress: (goalId: string, amount: number) => void;
  getTodayProgress: (goalId: string) => number;
  getWeekProgress: (goalId: string) => number;
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set, get) => ({
      goals: [],
      logs: [],
      addGoal: (goal) =>
        set((s) => ({
          goals: [...s.goals, { ...goal, id: Date.now().toString(), createdAt: Date.now() }],
        })),
      removeGoal: (id) => set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
      logProgress: (goalId, amount) => {
        const date = new Date().toISOString().split("T")[0];
        set((s) => ({
          logs: [...s.logs.filter((l) => !(l.goalId === goalId && l.date === date)), { goalId, date, amount }],
        }));
      },
      getTodayProgress: (goalId) => {
        const date = new Date().toISOString().split("T")[0];
        return get().logs.filter((l) => l.goalId === goalId && l.date === date).reduce((s, l) => s + l.amount, 0);
      },
      getWeekProgress: (goalId) => {
        const now = Date.now();
        const week = 7 * 24 * 60 * 60 * 1000;
        return get().logs
          .filter((l) => l.goalId === goalId && new Date(l.date).getTime() > now - week)
          .reduce((s, l) => s + l.amount, 0);
      },
    }),
    { name: "islamic-goals", storage: createJSONStorage(() => localStorage) }
  )
);
