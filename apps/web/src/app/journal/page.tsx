"use client";
import { useState } from "react";
import { useJournalStore, type JournalEntry } from "@/store/journalStore";
import { cn } from "@/lib/utils";

const DAILY_PROMPTS = [
  "What did you learn from today's Quran recitation?",
  "Which hadith touched your heart recently?",
  "What are you most grateful to Allah for today?",
  "How did you feel during today's prayers?",
  "What challenge did you face today and how did you respond?",
  "Which Name of Allah did you reflect on today?",
  "What act of kindness did you perform or witness today?",
  "What du'a do you want to focus on this week?",
  "How can you improve your salah tomorrow?",
  "What reminded you of Allah today?",
  "What are your intentions for tomorrow?",
  "Which surah would you like to memorize and why?",
  "How did you balance dunya and deen today?",
  "What is one thing you want to ask Allah for?",
  "Write about a person who inspires you Islamically.",
  "What does Tawakkul (trust in Allah) mean to you?",
  "How can you increase your dhikr this week?",
  "Reflect on the blessings of good health.",
  "What lesson did the story of a prophet teach you recently?",
  "How do you want to be remembered?",
  "Write a short letter of gratitude to Allah.",
  "What habits do you want to build this Ramadan?",
  "What does Sabr (patience) look like in your life?",
  "How has your relationship with the Quran changed?",
  "What are your spiritual goals for this month?",
  "Reflect on the concept of Akhirah (the Hereafter).",
  "What does it mean to you to be a Muslim?",
  "Which ayah gave you strength recently?",
  "Write about a moment when you felt close to Allah.",
  "What do you want your legacy to be?",
];

const MOODS: JournalEntry["mood"][] = ["grateful", "reflective", "hopeful", "struggling", "peaceful"];
const MOOD_EMOJI: Record<NonNullable<JournalEntry["mood"]>, string> = {
  grateful: "🤲", reflective: "💭", hopeful: "🌟", struggling: "💪", peaceful: "☮️",
};

export default function JournalPage() {
  const store = useJournalStore();
  const [search, setSearch] = useState("");
  const [showWrite, setShowWrite] = useState(false);
  const [content, setContent] = useState("");
  const [ayahRef, setAyahRef] = useState("");
  const [mood, setMood] = useState<JournalEntry["mood"]>("grateful");
  const todayPrompt = DAILY_PROMPTS[new Date().getDate() % DAILY_PROMPTS.length];

  const entries = search ? store.searchEntries(search) : store.entries;

  const save = () => {
    if (!content.trim()) return;
    store.addEntry({ date: new Date().toISOString().split("T")[0], content, ayahRef: ayahRef || undefined, mood });
    setContent(""); setAyahRef(""); setMood("grateful"); setShowWrite(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)]">المذكرة الإسلامية</h1>
          <p className="text-[var(--text-muted)] mt-1">Personal reflection journal</p>
        </div>
        <button onClick={() => setShowWrite(!showWrite)} className="btn-primary px-4 py-2">
          {showWrite ? "Cancel" : "✏️ Write"}
        </button>
      </div>

      {/* Daily Prompt */}
      <div className="card p-4 border-l-4 border-l-[var(--primary)] bg-[var(--primary)]/5">
        <p className="text-xs text-[var(--primary)] font-semibold mb-1">Today's Prompt</p>
        <p className="text-sm text-[var(--text)] italic">"{todayPrompt}"</p>
      </div>

      {/* Write Form */}
      {showWrite && (
        <div className="card p-5 space-y-4">
          <h2 className="section-title">New Entry — {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h2>
          <textarea
            className="input-field min-h-[150px] resize-none"
            placeholder={`${todayPrompt}

Write your reflection here…`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <input className="input-field text-sm" placeholder="Ayah ref (e.g. 2:255)" value={ayahRef} onChange={(e) => setAyahRef(e.target.value)} />
            <select className="input-field text-sm" value={mood} onChange={(e) => setMood(e.target.value as JournalEntry["mood"])}>
              {MOODS.map((m) => <option key={m} value={m}>{MOOD_EMOJI[m!]} {m}</option>)}
            </select>
          </div>
          <button onClick={save} className="btn-primary w-full py-2.5">Save Entry</button>
        </div>
      )}

      {/* Search */}
      <input className="input-field" placeholder="🔍 Search journal…" value={search} onChange={(e) => setSearch(e.target.value)} />

      {/* Entries */}
      {entries.length === 0 && (
        <div className="card p-8 text-center space-y-2">
          <p className="text-4xl">📓</p>
          <p className="text-[var(--text-muted)]">{search ? "No entries matching your search." : "Your journal is empty. Start writing your reflections."}</p>
        </div>
      )}
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{MOOD_EMOJI[entry.mood ?? "reflective"]}</span>
                <span className="text-sm font-medium text-[var(--text)]">{new Date(entry.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
              </div>
              <button onClick={() => store.deleteEntry(entry.id)} className="text-[var(--text-muted)] hover:text-red-400 transition-colors text-xs">Delete</button>
            </div>
            <p className="text-sm text-[var(--text)] leading-relaxed whitespace-pre-wrap line-clamp-4">{entry.content}</p>
            {entry.ayahRef && (
              <span className="badge bg-[var(--primary)]/10 text-[var(--primary)] text-xs">📖 Quran {entry.ayahRef}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
