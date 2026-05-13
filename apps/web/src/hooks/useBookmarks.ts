"use client";

import { useCallback } from "react";
import { useBookmarkStore, type Bookmark } from "@/store/bookmarkStore";

export function useBookmarks() {
  const { bookmarks, addBookmark, removeBookmark, isBookmarked, addNote, clearAll } =
    useBookmarkStore();

  const toggleBookmark = useCallback(
    (bookmark: Omit<Bookmark, "addedAt">) => {
      if (isBookmarked(bookmark.id)) {
        removeBookmark(bookmark.id);
      } else {
        addBookmark(bookmark);
      }
    },
    [isBookmarked, removeBookmark, addBookmark]
  );

  const getBookmarksByType = (type: Bookmark["type"]) =>
    bookmarks.filter((b) => b.type === type);

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    addNote,
    clearAll,
    getBookmarksByType,
    totalCount: bookmarks.length,
  };
}
