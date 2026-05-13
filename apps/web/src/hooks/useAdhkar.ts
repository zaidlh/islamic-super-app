"use client";

import { useState } from "react";
import { ADHKAR_DATA, ADHKAR_CATEGORIES, getAdhkarByCategory } from "@/lib/adhkar";
import type { AdhkarEntry } from "@/lib/adhkar";

export function useAdhkar(categoryId: string) {
  const entries = getAdhkarByCategory(categoryId);
  const category = ADHKAR_CATEGORIES.find((c) => c.id === categoryId);

  return { entries, category };
}

export function useAdhkarCategories() {
  return { categories: ADHKAR_CATEGORIES };
}

export function useTasbih() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [completed, setCompleted] = useState(0);

  const increment = () => {
    const newCount = count + 1;
    if (newCount >= target) {
      setCount(0);
      setCompleted((c) => c + 1);
    } else {
      setCount(newCount);
    }
  };

  const reset = () => {
    setCount(0);
    setCompleted(0);
  };

  return {
    count,
    target,
    completed,
    increment,
    reset,
    setTarget,
    progress: target > 0 ? (count / target) * 100 : 0,
  };
}

export function useRandomAdhkar(): AdhkarEntry {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * ADHKAR_DATA.length));
  
  const next = () => {
    setIndex((i) => (i + 1) % ADHKAR_DATA.length);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + ADHKAR_DATA.length) % ADHKAR_DATA.length);
  };

  return { ...(ADHKAR_DATA[index] ?? ADHKAR_DATA[0]!), next, prev } as AdhkarEntry & { next: () => void; prev: () => void };
}
