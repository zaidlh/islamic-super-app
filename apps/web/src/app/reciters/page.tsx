"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useSettingsStore } from "@/store/settingsStore";
import { cn } from "@/lib/utils";

interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  nationality: string;
  style: "Murattal" | "Mujawwad" | "Muallim";
  urlTemplate: string;
}

const RECITERS: Reciter[] = [
  { id: "Alafasy_128kbps", name: "Mishary Rashid Alafasy", arabicName: "مشاري راشد العفاسي", nationality: "Kuwait", style: "Murattal", urlTemplate: "https://verses.quran.com/Alafasy_128kbps/{s}/{v}.mp3" },
  { id: "AbdulSamad_128kbps_Quran_url", name: "Abdul Basit Abd us-Samad", arabicName: "عبد الباسط عبد الصمد", nationality: "Egypt", style: "Mujawwad", urlTemplate: "https://verses.quran.com/AbdulSamad_128kbps_Quran_url/{s}/{v}.mp3" },
  { id: "Husary_128kbps", name: "Mahmoud Khalil Al-Husary", arabicName: "محمود خليل الحصري", nationality: "Egypt", style: "Murattal", urlTemplate: "https://verses.quran.com/Husary_128kbps/{s}/{v}.mp3" },
  { id: "Minshawy_128kbps", name: "Muhammad Siddiq Al-Minshawi", arabicName: "محمد صديق المنشاوي", nationality: "Egypt", style: "Mujawwad", urlTemplate: "https://verses.quran.com/Minshawy_128kbps/{s}/{v}.mp3" },
  { id: "Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net", name: "Ahmed ibn Ali Al-Ajamy", arabicName: "أحمد بن علي العجمي", nationality: "Saudi Arabia", style: "Murattal", urlTemplate: "https://verses.quran.com/Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net/{s}/{v}.mp3" },
  { id: "Ghamadi_40kbps", name: "Saad Al-Ghamdi", arabicName: "سعد الغامدي", nationality: "Saudi Arabia", style: "Murattal", urlTemplate: "https://verses.quran.com/Ghamadi_40kbps/{s}/{v}.mp3" },
  { id: "Hani_Rifai_128kbps", name: "Hani Ar-Rifai", arabicName: "هاني الرفاعي", nationality: "Saudi Arabia", style: "Murattal", urlTemplate: "https://verses.quran.com/Hani_Rifai_128kbps/{s}/{v}.mp3" },
  { id: "AbdulBaset_Murattal_192kbps", name: "Abdul Basit (Murattal)", arabicName: "عبد الباسط عبد الصمد (مرتل)", nationality: "Egypt", style: "Murattal", urlTemplate: "https://verses.quran.com/AbdulBaset_Murattal_192kbps/{s}/{v}.mp3" },
  { id: "MaherAlMuaiqly_128kbps", name: "Maher Al-Muaiqly", arabicName: "ماهر المعيقلي", nationality: "Saudi Arabia", style: "Murattal", urlTemplate: "https://verses.quran.com/MaherAlMuaiqly_128kbps/{s}/{v}.mp3" },
  { id: "Ibrahim_Akhdar_128kbps", name: "Ibrahim Al-Akhdar", arabicName: "إبراهيم الأخضر", nationality: "Saudi Arabia", style: "Murattal", urlTemplate: "https://verses.quran.com/Ibrahim_Akhdar_128kbps/{s}/{v}.mp3" },
  { id: "Mohammad_al_Tablaway_128kbps", name: "Mohammad Al-Tablawi", arabicName: "محمد الطبلاوي", nationality: "Egypt", style: "Mujawwad", urlTemplate: "https://verses.quran.com/Mohammad_al_Tablaway_128kbps/{s}/{v}.mp3" },
  { id: "Nasser_Alqatami_128kbps", name: "Nasser Al-Qatami", arabicName: "ناصر القطامي", nationality: "Saudi Arabia", style: "Murattal", urlTemplate: "https://verses.quran.com/Nasser_Alqatami_128kbps/{s}/{v}.mp3" },
  { id: "Sahl_Yasin_128kbps", name: "Sahl Yassin", arabicName: "سهل ياسين", nationality: "Saudi Arabia", style: "Muallim", urlTemplate: "https://verses.quran.com/Sahl_Yasin_128kbps/{s}/{v}.mp3" },
  { id: "Parhizgar_40kbps", name: "Shahriar Parhizgar", arabicName: "شهریار پرهیزگار", nationality: "Iran", style: "Murattal", urlTemplate: "https://verses.quran.com/Parhizgar_40kbps/{s}/{v}.mp3" },
  { id: "Salah_Al_Budair_128kbps", name: "Salah Al-Budair", arabicName: "صلاح البدير", nationality: "Saudi Arabia", style: "Murattal", urlTemplate: "https://verses.quran.com/Salah_Al_Budair_128kbps/{s}/{v}.mp3" },
];

function buildUrl(template: string, surah: number, verse: number) {
  const s = String(surah).padStart(3, "0");
  const v = String(verse).padStart(3, "0");
  return template.replace("{s}", s).replace("{v}", v);
}

export default function RecitersPage() {
  const { quranReciter, setQuranReciter } = useSettingsStore();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playPreview = (reciter: Reciter) => {
    if (playingId === reciter.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }
    audioRef.current?.pause();
    const url = buildUrl(reciter.urlTemplate, 1, 1); // Al-Fatiha verse 1
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play().catch(() => {});
    setPlayingId(reciter.id);
    audio.onended = () => setPlayingId(null);
  };

  const STYLE_COLORS: Record<Reciter["style"], string> = {
    Murattal: "bg-emerald-500/10 text-emerald-400",
    Mujawwad: "bg-blue-500/10 text-blue-400",
    Muallim: "bg-amber-500/10 text-amber-400",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">مكتبة القراء</h1>
        <p className="text-[var(--text-muted)] mt-1">Select your preferred Quran reciter</p>
      </div>

      {quranReciter && (
        <div className="card p-4 border-[var(--primary)]/30 bg-[var(--primary)]/5">
          <p className="text-sm text-[var(--text-muted)]">
            Current reciter: <span className="font-semibold text-[var(--primary)]">
              {RECITERS.find((r) => r.id === quranReciter)?.name ?? quranReciter}
            </span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {RECITERS.map((reciter) => {
          const isActive = quranReciter === reciter.id;
          const isPlaying = playingId === reciter.id;
          return (
            <div
              key={reciter.id}
              className={cn(
                "card p-4 flex items-start gap-4 transition-all",
                isActive && "border-[var(--primary)] bg-[var(--primary)]/5"
              )}
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-2xl flex-shrink-0">
                🎙️
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {isActive && <span className="badge bg-[var(--primary)] text-white text-xs">✓ Selected</span>}
                  <span className={cn("badge text-xs", STYLE_COLORS[reciter.style])}>{reciter.style}</span>
                  <span className="badge bg-[var(--elevated)] text-[var(--text-muted)] text-xs">🌍 {reciter.nationality}</span>
                </div>
                <h3 className="font-semibold text-[var(--text)] text-sm">{reciter.name}</h3>
                <p
                  className="text-sm text-[var(--primary)] mt-0.5"
                  style={{ fontFamily: "Amiri, serif", lineHeight: 1.8 }}
                  dir="rtl"
                >
                  {reciter.arabicName}
                </p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => playPreview(reciter)}
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-all text-sm",
                    isPlaying
                      ? "bg-[var(--primary)] text-white animate-pulse"
                      : "bg-[var(--elevated)] text-[var(--text-muted)] hover:text-[var(--text)]"
                  )}
                  title="Preview Al-Fatiha"
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button
                  onClick={() => setQuranReciter(reciter.id)}
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-all text-sm",
                    isActive
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--elevated)] text-[var(--text-muted)] hover:text-[var(--primary)]"
                  )}
                  title="Set as default"
                >
                  {isActive ? "✓" : "☆"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card p-4 text-center">
        <p className="text-sm text-[var(--text-muted)]">
          Preview plays the opening verse of Al-Fatiha. Your selection is saved and used throughout the app.
        </p>
        <Link href="/quran" className="text-sm text-[var(--primary)] hover:underline mt-1 inline-block">
          → Listen to full Quran with your selected reciter
        </Link>
      </div>
    </div>
  );
}
