"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  ayahRef?: string;
  hadithRef?: string;
  mood?: "grateful" | "reflective" | "hopeful" | "struggling" | "peaceful";
  tags?: string[];
}

interface JournalState {
  entries: JournalEntry[];
  addEntry: (e: Omit<JournalEntry, "id">) => void;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  searchEntries: (query: string) => JournalEntry[];
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (e) =>
        set((s) => ({ entries: [{ ...e, id: Date.now().toString() }, ...s.entries] })),
      updateEntry: (id, updates) =>
        set((s) => ({ entries: s.entries.map((e) => (e.id === id ? { ...e, ...updates } : e)) })),
      deleteEntry: (id) =>
        set((s) => ({ entries: s.entries.filter((e) => e.id !== id) })),
      searchEntries: (query) => {
        const q = query.toLowerCase();
        return get().entries.filter(
          (e) =>
            e.content.toLowerCase().includes(q) ||
            e.ayahRef?.toLowerCase().includes(q) ||
            e.tags?.some((t) => t.toLowerCase().includes(q))
        );
      },
    }),
    { name: "islamic-journal", storage: createJSONStorage(() => localStorage) }
  )
);
