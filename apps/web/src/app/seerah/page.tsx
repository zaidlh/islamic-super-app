"use client";
import type { Metadata } from "next";
import { useState } from "react";
import { SEERAH_EVENTS } from "@/data/seerah";
import { cn } from "@/lib/utils";

export default function SeerahPage() {
  const [filter, setFilter] = useState<"all" | "high" | "medium">("all");
  const events = filter === "all" ? SEERAH_EVENTS : SEERAH_EVENTS.filter((e) => e.importance === filter);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">السيرة النبوية</h1>
        <p className="text-[var(--text-muted)] mt-1">The Life of Prophet Muhammad ﷺ — A Chronological Journey</p>
      </div>

      <div className="flex gap-2">
        {(["all", "high", "medium"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm transition-all",
              filter === f
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--elevated)] text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
          >
            {f === "all" ? "All Events" : f === "high" ? "⭐ Major" : "Minor"}
          </button>
        ))}
      </div>

      <div className="relative">
        {/* Center line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border)] -translate-x-1/2" />
        <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--border)]" />

        <div className="space-y-8">
          {events.map((event, i) => (
            <div
              key={event.id}
              className={cn(
                "relative flex gap-4",
                "md:items-start",
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                "flex-row pl-10 md:pl-0"
              )}
            >
              {/* Timeline dot */}
              <div
                className={cn(
                  "absolute md:left-1/2 left-4 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[var(--primary)] top-5 z-10",
                  event.importance === "high" ? "bg-[var(--primary)]" : "bg-[var(--surface)]"
                )}
              />

              {/* Spacer on desktop */}
              <div className="hidden md:block flex-1" />

              {/* Card */}
              <div
                className={cn(
                  "card p-5 flex-1 md:max-w-[calc(50%-2rem)]",
                  event.importance === "high" && "border-l-4 border-l-[var(--primary)]"
                )}
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="badge bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold">
                    {event.year}
                  </span>
                  {event.hijriYear && (
                    <span className="badge bg-[var(--elevated)] text-[var(--text-muted)] text-xs">
                      {event.hijriYear}
                    </span>
                  )}
                  {event.importance === "high" && (
                    <span className="text-xs text-[var(--primary)]">⭐</span>
                  )}
                </div>
                <h3 className="font-semibold text-[var(--text)] mb-2">{event.event}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">{event.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-[var(--text-muted)]">
                  {event.location && (
                    <span>📍 {event.location}</span>
                  )}
                  {event.quranRef && (
                    <span className="text-[var(--primary)]">📖 Quran {event.quranRef}</span>
                  )}
                </div>
                {event.companions && event.companions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {event.companions.map((c) => (
                      <span key={c} className="badge bg-[var(--elevated)] text-[var(--text-muted)] text-xs">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
