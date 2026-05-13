"use client";

import { useState } from "react";
import { useTasbih } from "@/hooks/useAdhkar";
import { cn } from "@/lib/utils";

const COMMON_DHIKR = [
  { text: "سُبْحَانَ اللَّهِ", transliteration: "Subhanallah", target: 33 },
  { text: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", target: 33 },
  { text: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", target: 33 },
  { text: "لَا إِلَٰهَ إِلَّا اللَّهُ", transliteration: "La ilaha illallah", target: 100 },
  { text: "أَسْتَغْفِرُ اللَّهَ", transliteration: "Astaghfirullah", target: 100 },
];

export function TasbihCounter() {
  const { count, target, completed, increment, reset, setTarget, progress } = useTasbih();
  const [selectedDhikr, setSelectedDhikr] = useState(0);
  const currentDhikr = COMMON_DHIKR[selectedDhikr]!;

  const circumference = 2 * Math.PI * 56; // radius = 56

  return (
    <div className="card p-6 flex flex-col items-center gap-6">
      <h3 className="section-title self-start">Tasbih Counter</h3>

      {/* Dhikr selector */}
      <div className="w-full flex flex-wrap gap-2">
        {COMMON_DHIKR.map((d, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedDhikr(i);
              reset();
              setTarget(d.target);
            }}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs transition-all",
              selectedDhikr === i
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--elevated)] text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
          >
            {d.transliteration}
          </button>
        ))}
      </div>

      {/* Circular progress */}
      <div className="relative">
        <svg width="140" height="140" className="-rotate-90">
          <circle
            cx="70"
            cy="70"
            r="56"
            fill="none"
            stroke="var(--border)"
            strokeWidth="8"
          />
          <circle
            cx="70"
            cy="70"
            r="56"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
        </svg>
        <button
          onClick={increment}
          className="absolute inset-0 flex flex-col items-center justify-center group active:scale-95 transition-transform"
        >
          <span className="text-4xl font-bold text-[var(--primary)] group-active:scale-110 transition-transform">
            {count}
          </span>
          <span className="text-xs text-[var(--text-muted)] mt-1">of {target}</span>
        </button>
      </div>

      {/* Current dhikr */}
      <div className="text-center">
        <p
          className="text-2xl text-[var(--text)]"
          style={{ fontFamily: "Amiri, serif", lineHeight: "2.5" }}
          dir="rtl"
        >
          {currentDhikr.text}
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-1 italic">
          {currentDhikr.transliteration}
        </p>
      </div>

      {/* Completed rounds */}
      {completed > 0 && (
        <div className="badge bg-[var(--primary)]/10 text-[var(--primary)]">
          {completed} × {target} = {completed * target} total
        </div>
      )}

      {/* Controls */}
      <div className="w-full flex gap-3">
        <button
          onClick={increment}
          className="flex-1 btn-primary py-3 text-base"
        >
          Count
        </button>
        <button
          onClick={reset}
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--elevated)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        >
          ↺
        </button>
      </div>
    </div>
  );
}
