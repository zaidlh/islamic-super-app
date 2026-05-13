"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Bookmark {
  id: string;
  type: "ayah" | "hadith" | "adhkar";
  reference: string;
  text: string;
  translation?: string;
  addedAt: number;
  note?: string;
}

interface BookmarkState {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "addedAt">) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  addNote: (id: string, note: string) => void;
  clearAll: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [
            { ...bookmark, addedAt: Date.now() },
            ...state.bookmarks.filter((b) => b.id !== bookmark.id),
          ],
        })),

      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),

      isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),

      addNote: (id, note) =>
        set((state) => ({
          bookmarks: state.bookmarks.map((b) => (b.id === id ? { ...b, note } : b)),
        })),

      clearAll: () => set({ bookmarks: [] }),
    }),
    {
      name: "islamic-app-bookmarks",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
