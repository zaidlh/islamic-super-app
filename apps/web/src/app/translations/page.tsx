"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Translation { id: number; name: string; language_name: string; author_name: string; }
interface Verse { verse_key: string; text_uthmani: string; translations: { resource_id: number; text: string }[]; }

const POPULAR_TRANSLATIONS = [
  { id: 131, name: "The Clear Quran (Khattab)", language_name: "English" },
  { id: 85, name: "Sahih International", language_name: "English" },
  { id: 203, name: "Dr. Mustafa Khattab", language_name: "English" },
  { id: 95, name: "Tafsir Ibn Kathir (abridged)", language_name: "English" },
  { id: 76, name: "Mufti Taqi Usmani", language_name: "Urdu" },
  { id: 54, name: "Muhammad Junagarhi", language_name: "Urdu" },
  { id: 136, name: "Pickthal", language_name: "English" },
  { id: 101, name: "Yusuf Ali", language_name: "English" },
  { id: 167, name: "French - Hamidullah", language_name: "French" },
  { id: 77, name: "Indonesian - Depag", language_name: "Indonesian" },
  { id: 45, name: "Malay - Basmeih", language_name: "Malay" },
  { id: 77, name: "Turkish - Diyanet", language_name: "Turkish" },
  { id: 17, name: "Russian - Kuliev", language_name: "Russian" },
  { id: 109, name: "Spanish - Cortes", language_name: "Spanish" },
  { id: 33, name: "German - Bubenheim", language_name: "German" },
];

const SURAH_NAMES = ["Al-Fatiha","Al-Baqarah","Al-Imran","An-Nisa","Al-Maidah","Al-Anam","Al-Araf","Al-Anfal","At-Tawbah","Yunus","Hud","Yusuf","Ar-Rad","Ibrahim","Al-Hijr","An-Nahl","Al-Isra","Al-Kahf","Maryam","Ta-Ha","Al-Anbiya","Al-Hajj","Al-Muminun","An-Nur","Al-Furqan","Ash-Shuara","An-Naml","Al-Qasas","Al-Ankabut","Ar-Rum","Luqman","As-Sajda","Al-Ahzab","Saba","Fatir","Ya-Sin","As-Saffat","Sad","Az-Zumar","Ghafir","Fussilat","Ash-Shura","Az-Zukhruf","Ad-Dukhan","Al-Jathiya","Al-Ahqaf","Muhammad","Al-Fath","Al-Hujurat","Qaf","Adh-Dhariyat","At-Tur","An-Najm","Al-Qamar","Ar-Rahman","Al-Waqia","Al-Hadid","Al-Mujadila","Al-Hashr","Al-Mumtahana","As-Saf","Al-Jumuah","Al-Munafiqun","At-Taghabun","At-Talaq","At-Tahrim","Al-Mulk","Al-Qalam","Al-Haqqa","Al-Maarij","Nuh","Al-Jinn","Al-Muzzammil","Al-Muddaththir","Al-Qiyama","Al-Insan","Al-Mursalat","An-Naba","An-Naziat","Abasa","At-Takwir","Al-Infitar","Al-Mutaffifin","Al-Inshiqaq","Al-Buruj","At-Tariq","Al-Ala","Al-Ghashiya","Al-Fajr","Al-Balad","Ash-Shams","Al-Layl","Ad-Duha","Ash-Sharh","At-Tin","Al-Alaq","Al-Qadr","Al-Bayyina","Az-Zalzala","Al-Adiyat","Al-Qaria","At-Takathur","Al-Asr","Al-Humaza","Al-Fil","Quraysh","Al-Maun","Al-Kawthar","Al-Kafirun","An-Nasr","Al-Masad","Al-Ikhlas","Al-Falaq","An-Nas"];

export default function TranslationsPage() {
  const [surah, setSurah] = useState(1);
  const [translation1, setTranslation1] = useState(131);
  const [translation2, setTranslation2] = useState(85);
  const [sideBySide, setSideBySide] = useState(false);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const ids = sideBySide ? `${translation1},${translation2}` : `${translation1}`;
    try {
      const res = await fetch(
        `https://api.quran.com/api/v4/verses/by_chapter/${surah}?translations=${ids}&words=false&per_page=300&language=en`
      );
      const data = await res.json();
      setVerses(data.verses ?? []);
    } catch { setVerses([]); }
    finally { setLoading(false); }
  };

  const t1 = POPULAR_TRANSLATIONS.find((t) => t.id === translation1);
  const t2 = POPULAR_TRANSLATIONS.find((t) => t.id === translation2);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">ترجمات القرآن</h1>
        <p className="text-[var(--text-muted)] mt-1">Quran in multiple languages — side-by-side comparison</p>
      </div>

      <div className="card p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">Surah</label>
            <select className="input-field" value={surah} onChange={(e) => setSurah(Number(e.target.value))}>
              {SURAH_NAMES.map((name, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}. {name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">Translation 1</label>
            <select className="input-field" value={translation1} onChange={(e) => setTranslation1(Number(e.target.value))}>
              {POPULAR_TRANSLATIONS.map((t, i) => (
                <option key={i} value={t.id}>{t.language_name} — {t.name}</option>
              ))}
            </select>
          </div>
          {sideBySide && (
            <div>
              <label className="text-xs text-[var(--text-muted)] mb-1 block">Translation 2</label>
              <select className="input-field" value={translation2} onChange={(e) => setTranslation2(Number(e.target.value))}>
                {POPULAR_TRANSLATIONS.map((t, i) => (
                  <option key={i} value={t.id}>{t.language_name} — {t.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={sideBySide} onChange={(e) => setSideBySide(e.target.checked)} className="accent-[var(--primary)]" />
            <span className="text-sm text-[var(--text)]">Side-by-side comparison</span>
          </label>
          <button onClick={load} className="btn-primary px-6 py-2 ml-auto">Load Surah</button>
        </div>
      </div>

      {loading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="shimmer h-24 rounded-xl" />)}
        </div>
      )}

      {!loading && verses.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-[var(--text-muted)]">
            Surah {SURAH_NAMES[surah - 1]} · {verses.length} verses
            {sideBySide && t1 && t2 && ` · ${t1.language_name}/${t1.name.split(" ")[0]} vs ${t2.language_name}/${t2.name.split(" ")[0]}`}
          </p>
          {verses.map((verse) => (
            <div key={verse.verse_key} className="card p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="badge bg-[var(--primary)]/10 text-[var(--primary)] text-xs">{verse.verse_key}</span>
              </div>
              <p
                className="text-xl text-right text-[var(--text)] leading-loose"
                style={{ fontFamily: "Amiri, serif" }}
                dir="rtl"
              >
                {verse.text_uthmani}
              </p>
              <div className={cn("gap-4", sideBySide ? "grid grid-cols-2" : "")}>
                {verse.translations?.map((tr, i) => (
                  <div key={i} className={cn("text-sm text-[var(--text-muted)] leading-relaxed", sideBySide && i === 0 ? "border-r border-[var(--border)] pr-4" : "")}>
                    {sideBySide && (
                      <p className="text-xs text-[var(--primary)] mb-1">
                        {i === 0 ? t1?.name?.split(" ")[0] : t2?.name?.split(" ")[0]}
                      </p>
                    )}
                    <p>{tr.text.replace(/<[^>]+>/g, "").replace(/\[\d+\]/g, "").trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && verses.length === 0 && (
        <div className="card p-8 text-center space-y-2">
          <p className="text-4xl">🌍</p>
          <p className="text-[var(--text-muted)]">Select a surah and translation, then click Load Surah.</p>
        </div>
      )}
    </div>
  );
}
