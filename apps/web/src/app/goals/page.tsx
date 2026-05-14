"use client";
import { useState } from "react";
import { useGoalsStore, type Goal } from "@/store/goalsStore";
import { cn } from "@/lib/utils";

const CATEGORIES: Goal["category"][] = ["Quran", "Prayer", "Dhikr", "Fasting", "Charity", "Other"];
const UNITS = ["pages", "rakat", "times", "days", "minutes", "juz"];
const FREQS: Goal["frequency"][] = ["daily", "weekly", "monthly"];
const CAT_COLORS: Record<Goal["category"], string> = {
  Quran: "bg-emerald-500/10 text-emerald-400", Prayer: "bg-blue-500/10 text-blue-400",
  Dhikr: "bg-purple-500/10 text-purple-400", Fasting: "bg-amber-500/10 text-amber-400",
  Charity: "bg-pink-500/10 text-pink-400", Other: "bg-gray-500/10 text-gray-400",
};

export default function GoalsPage() {
  const store = useGoalsStore();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Quran" as Goal["category"], target: 5, unit: "pages", frequency: "daily" as Goal["frequency"], note: "" });

  const submit = () => {
    if (!form.title.trim()) return;
    store.addGoal(form);
    setForm({ title: "", category: "Quran", target: 5, unit: "pages", frequency: "daily", note: "" });
    setShowAdd(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)]">الأهداف الروحية</h1>
          <p className="text-[var(--text-muted)] mt-1">Set and track your spiritual goals</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary px-4 py-2">+ Add Goal</button>
      </div>

      {store.goals.length === 0 && !showAdd && (
        <div className="card p-8 text-center space-y-3">
          <p className="text-4xl">🎯</p>
          <p className="text-[var(--text-muted)]">No goals yet. Set a spiritual target to track your progress.</p>
          <button onClick={() => setShowAdd(true)} className="btn-primary px-6 py-2">Set First Goal</button>
        </div>
      )}

      {showAdd && (
        <div className="card p-6 space-y-4">
          <h2 className="section-title">New Goal</h2>
          <input className="input-field" placeholder="Goal title (e.g. Read 5 pages of Quran daily)" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[var(--text-muted)] mb-1 block">Category</label>
              <select className="input-field" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Goal["category"] }))}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--text-muted)] mb-1 block">Frequency</label>
              <select className="input-field" value={form.frequency} onChange={(e) => setForm((f) => ({ ...f, frequency: e.target.value as Goal["frequency"] }))}>
                {FREQS.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--text-muted)] mb-1 block">Target</label>
              <input type="number" min="1" className="input-field" value={form.target} onChange={(e) => setForm((f) => ({ ...f, target: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="text-xs text-[var(--text-muted)] mb-1 block">Unit</label>
              <select className="input-field" value={form.unit} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}>
                {UNITS.map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>
          <input className="input-field" placeholder="Note (optional)" value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} />
          <div className="flex gap-2">
            <button onClick={submit} className="btn-primary flex-1 py-2">Save Goal</button>
            <button onClick={() => setShowAdd(false)} className="btn-ghost flex-1 py-2">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {store.goals.map((goal) => {
          const progress = store.getTodayProgress(goal.id);
          const pct = Math.min(100, (progress / goal.target) * 100);
          return (
            <div key={goal.id} className="card p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={cn("badge text-xs", CAT_COLORS[goal.category])}>{goal.category}</span>
                    <span className="badge bg-[var(--elevated)] text-[var(--text-muted)] text-xs">{goal.frequency}</span>
                  </div>
                  <h3 className="font-semibold text-[var(--text)]">{goal.title}</h3>
                  <p className="text-xs text-[var(--text-muted)]">Target: {goal.target} {goal.unit}</p>
                </div>
                <button onClick={() => store.removeGoal(goal.id)} className="text-[var(--text-muted)] hover:text-red-400 transition-colors text-sm">✕</button>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1 text-xs text-[var(--text-muted)]">
                  <span>Progress: {progress} / {goal.target} {goal.unit}</span>
                  <span className="text-[var(--primary)] font-medium">{Math.round(pct)}%</span>
                </div>
                <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--primary)] rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => store.logProgress(goal.id, 1)} className="btn-primary px-4 py-1.5 text-sm">+ 1 {goal.unit}</button>
                <button onClick={() => store.logProgress(goal.id, goal.target - progress)} disabled={pct >= 100} className={cn("btn-ghost px-4 py-1.5 text-sm", pct >= 100 && "opacity-50")}>Mark Complete</button>
                {pct >= 100 && <span className="text-emerald-400 text-sm ml-auto">✓ Done!</span>}
              </div>
              {goal.note && <p className="text-xs text-[var(--text-muted)] italic">{goal.note}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
