"use client";

import { useState, useCallback } from "react";
import { HAJJ_STEPS, HajjStep } from "@/data/hajj";


export default function HajjPage() {
  const [activeTab, setActiveTab] = useState<"hajj" | "umrah">("hajj");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [done, setDone] = useState<Record<number, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem("hajj_done") || "{}"); } catch { return {}; }
  });

  const steps = HAJJ_STEPS.filter((s) => s.type === activeTab || s.type === "both");

  const toggleDone = useCallback((step: number) => {
    setDone((prev) => {
      const next = { ...prev, [step]: !prev[step] };
      localStorage.setItem("hajj_done", JSON.stringify(next));
      return next;
    });
  }, []);

  const completed = steps.filter((s) => done[s.step]).length;

  return (
    <div className="min-h-screen bg-[var(--bg)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">🕋</div>
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-2">Hajj & Umrah Guide</h1>
          <p className="text-white/60">Step-by-step guide with duas and tips</p>
        </div>

        {/* Tab toggle */}
        <div className="flex gap-4 mb-8">
          {(["hajj", "umrah"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-1 py-3 rounded-xl font-bold capitalize transition-all ${
                activeTab === t
                  ? "bg-[var(--primary)] text-black"
                  : "bg-[var(--surface)] text-white/60 border border-white/10"
              }`}
            >
              {t === "hajj" ? "🕋 Hajj" : "🤍 Umrah"}
            </button>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] gap-6">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`bg-[var(--surface)] rounded-xl border transition-all ${
                  done[step.step]
                    ? "border-[var(--primary)]/40 bg-[var(--primary)]/5"
                    : expanded === step.step
                    ? "border-[var(--primary)]/50"
                    : "border-white/10"
                }`}
              >
                <div className="flex items-center gap-4 p-4">
                  <span className="w-7 h-7 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <button
                    onClick={() => setExpanded(expanded === step.step ? null : step.step)}
                    className="flex-1 text-left"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-semibold ${done[step.step] ? "text-[var(--primary)]" : "text-white"}`}>
                        {step.title}
                      </span>
                      <span className="text-white/40 text-sm">{step.arabicTitle}</span>
                      {step.type !== "both" && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                          {step.type}
                        </span>
                      )}
                    </div>
                    <p className="text-white/40 text-sm mt-1">📍 {step.location}</p>
                  </button>
                  <button
                    onClick={() => toggleDone(step.step)}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      done[step.step]
                        ? "bg-[var(--primary)] border-[var(--primary)]"
                        : "border-white/30 hover:border-[var(--primary)]"
                    }`}
                  >
                    {done[step.step] && <span className="text-black text-xs font-bold">✓</span>}
                  </button>
                </div>

                {expanded === step.step && (
                  <div className="px-6 pb-6 space-y-4 border-t border-white/10 pt-4">
                    <p className="text-white/70 leading-relaxed">{step.description}</p>
                    {step.duas && step.duas.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-[var(--primary)] text-sm font-semibold">📿 Duas</p>
                        {step.duas.map((dua, i) => (
                          <div key={i} className="bg-[var(--primary)]/10 rounded-lg p-4 space-y-1">
                            <p className="text-white text-right text-lg leading-relaxed">{dua.arabic}</p>
                            <p className="text-white/60 text-sm italic">{dua.transliteration}</p>
                            <p className="text-white/50 text-sm">{dua.translation}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {step.tips && step.tips.length > 0 && (
                      <div>
                        <p className="text-[var(--primary)] text-sm font-semibold mb-2">💡 Tips</p>
                        <ul className="space-y-1">
                          {step.tips.map((tip, i) => (
                            <li key={i} className="text-white/60 text-sm flex gap-2">
                              <span className="text-[var(--primary)]">•</span> {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block mt-6 lg:mt-0">
            <div className="bg-[var(--surface)] rounded-2xl border border-[var(--primary)]/20 p-6 sticky top-6">
              <h3 className="text-[var(--primary)] font-bold mb-4">Progress Summary</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-black text-white">{completed}/{steps.length}</div>
                <div className="text-white/50 text-sm">Steps completed</div>
              </div>
              <div className="h-3 bg-[var(--bg)] rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-yellow-300 rounded-full transition-all"
                  style={{ width: `${steps.length ? (completed / steps.length) * 100 : 0}%` }}
                />
              </div>
              <div className="space-y-2">
                {steps.map((step, i) => (
                  <div key={step.step} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${done[step.step] ? "bg-[var(--primary)]" : "bg-white/20"}`} />
                    <span className={`text-xs truncate ${done[step.step] ? "text-[var(--primary)]" : "text-white/40"}`}>
                      {i + 1}. {step.title}
                    </span>
                  </div>
                ))}
              </div>
              {completed === steps.length && steps.length > 0 && (
                <div className="mt-6 bg-[var(--primary)] rounded-xl p-4 text-center">
                  <div className="text-black font-black text-lg">🎉 Masha'Allah!</div>
                  <div className="text-black/70 text-sm">All steps completed</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
