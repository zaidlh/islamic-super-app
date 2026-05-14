"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Category = "Quran" | "Hadith" | "History" | "Fiqh" | "Prophets";

interface Question {
  id: number; category: Category; question: string; options: string[]; answer: number; explanation: string;
}

const QUESTIONS: Question[] = [
  { id:1, category:"Quran", question:"How many surahs are in the Quran?", options:["112","113","114","115"], answer:2, explanation:"The Quran contains exactly 114 surahs, from Al-Fatiha to An-Nas." },
  { id:2, category:"Quran", question:"Which is the longest surah in the Quran?", options:["Al-Imran","An-Nisa","Al-Baqarah","Al-Maidah"], answer:2, explanation:"Al-Baqarah (The Cow) is the longest surah with 286 verses." },
  { id:3, category:"Quran", question:"Which surah is called 'the heart of the Quran'?", options:["Al-Fatiha","Ya-Sin","Al-Ikhlas","Al-Kahf"], answer:1, explanation:"Ya-Sin is often called the heart of the Quran based on a hadith." },
  { id:4, category:"Quran", question:"In how many years was the Quran fully revealed?", options:["20 years","21 years","23 years","25 years"], answer:2, explanation:"The Quran was revealed over approximately 23 years of prophethood." },
  { id:5, category:"Quran", question:"Which surah begins without Bismillah?", options:["Al-Anfal","At-Tawbah","Al-Fath","Al-Hashr"], answer:1, explanation:"Surah At-Tawbah (9) is the only surah that does not begin with Bismillah." },
  { id:6, category:"Quran", question:"What is the first revealed surah?", options:["Al-Fatiha","Al-Baqarah","Al-Alaq","Al-Mudathir"], answer:2, explanation:"The first 5 verses of Surah Al-Alaq were the first revelation in Cave Hira." },
  { id:7, category:"Quran", question:"Which prophet is mentioned most in the Quran?", options:["Ibrahim","Isa","Dawud","Musa"], answer:3, explanation:"Musa (AS) is mentioned approximately 136 times — more than any other prophet." },
  { id:8, category:"Quran", question:"How many Makki surahs are in the Quran?", options:["86","87","88","89"], answer:0, explanation:"86 surahs were revealed in Makkah, and 28 in Madinah." },
  { id:9, category:"Hadith", question:"How many hadith did Imam Bukhari collect and verify?", options:["2,602","7,563","600,000","10,000"], answer:1, explanation:"Sahih al-Bukhari contains 7,563 hadiths selected from over 600,000 narrations." },
  { id:10, category:"Hadith", question:"Which hadith collection is known as 'the most authentic book after the Quran'?", options:["Sahih Muslim","Sunan Abu Dawud","Sahih al-Bukhari","Muwatta Malik"], answer:2, explanation:"Sahih al-Bukhari is widely regarded by scholars as the most authentic hadith collection." },
  { id:11, category:"Hadith", question:"How many hadith are in the 40 Hadith Nawawi?", options:["40","41","42","43"], answer:2, explanation:"Despite being called '40 Hadith', Imam Nawawi's collection actually contains 42 hadiths." },
  { id:12, category:"Hadith", question:"Which companion narrated the most hadiths?", options:["Umar ibn al-Khattab","Abu Bakr","Abu Hurairah","Aisha"], answer:2, explanation:"Abu Hurairah (RA) narrated the most hadiths — approximately 5,374 narrations." },
  { id:13, category:"History", question:"In which year did the Hijra (migration to Madinah) take place?", options:["619 CE","620 CE","621 CE","622 CE"], answer:3, explanation:"The Hijra took place in 622 CE, which marks the beginning of the Islamic Hijri calendar." },
  { id:14, category:"History", question:"What was the first major battle in Islam?", options:["Battle of Uhud","Battle of Badr","Battle of Khandaq","Battle of Hunayn"], answer:1, explanation:"The Battle of Badr (2 AH / 624 CE) was the first major military confrontation in Islam." },
  { id:15, category:"History", question:"How many companions participated in the Battle of Badr?", options:["300","313","317","325"], answer:1, explanation:"313 companions (some say 314-317) participated in the Battle of Badr against ~1000 Quraysh." },
  { id:16, category:"History", question:"In which year was Makkah conquered?", options:["7 AH","8 AH","9 AH","10 AH"], answer:1, explanation:"Makkah was conquered peacefully in 8 AH (630 CE) after the Quraysh violated the Treaty of Hudaybiyyah." },
  { id:17, category:"History", question:"Who was the first Caliph after the Prophet ﷺ?", options:["Umar ibn al-Khattab","Uthman ibn Affan","Abu Bakr as-Siddiq","Ali ibn Abi Talib"], answer:2, explanation:"Abu Bakr as-Siddiq (RA) was elected as the first Caliph immediately after the Prophet's death." },
  { id:18, category:"History", question:"How long did the Prophet ﷺ live?", options:["60 years","61 years","63 years","65 years"], answer:2, explanation:"The Prophet Muhammad ﷺ lived for 63 years (570-632 CE)." },
  { id:19, category:"Fiqh", question:"How many times does a Muslim pray daily?", options:["3","4","5","6"], answer:2, explanation:"Muslims are obligated to perform 5 daily prayers: Fajr, Dhuhr, Asr, Maghrib, and Isha." },
  { id:20, category:"Fiqh", question:"What is the Nisab for gold (in grams)?", options:["75g","85g","87.48g","90g"], answer:2, explanation:"The Nisab for gold is 87.48 grams — if one possesses this amount for a lunar year, Zakat is due." },
  { id:21, category:"Fiqh", question:"What percentage of wealth is Zakat?", options:["2%","2.5%","3%","5%"], answer:1, explanation:"Zakat is 2.5% (1/40) of eligible wealth that has been held for one complete lunar year above the Nisab." },
  { id:22, category:"Fiqh", question:"How many days is the waiting period (Iddah) for a divorced woman?", options:["2 menstrual cycles","3 menstrual cycles","4 months","6 months"], answer:1, explanation:"A divorced woman must observe an Iddah of 3 menstrual cycles before she may remarry." },
  { id:23, category:"Fiqh", question:"What is the minimum number of people required for Jumu'ah prayer?", options:["12","30","40","2"], answer:2, explanation:"According to the majority of scholars, 40 free adult Muslim men are required for Jumu'ah prayer." },
  { id:24, category:"Fiqh", question:"How many rak'ahs are in Fajr prayer?", options:["2","3","4","6"], answer:0, explanation:"Fajr consists of 2 obligatory rak'ahs, preceded by 2 Sunnah rak'ahs." },
  { id:25, category:"Prophets", question:"How long did Nuh (AS) preach to his people?", options:["500 years","750 years","900 years","950 years"], answer:3, explanation:"Nuh (AS) preached to his people for 950 years according to Quran 29:14." },
  { id:26, category:"Prophets", question:"Which prophet is called 'Khalilullah' (Friend of Allah)?", options:["Musa","Isa","Ibrahim","Sulaiman"], answer:2, explanation:"Ibrahim (AS) was given the title 'Khalilullah' — the intimate friend of Allah (Quran 4:125)." },
  { id:27, category:"Prophets", question:"Which prophet could speak with birds and animals?", options:["Dawud","Sulaiman","Yunus","Ilyas"], answer:1, explanation:"Sulaiman (AS) was given the ability to understand and communicate with birds, animals, and jinn." },
  { id:28, category:"Prophets", question:"What was the du'a of Yunus (AS) in the whale's belly?", options:["Rabbi inni massaniya al-durr","La ilaha illa anta subhanaka inni kuntu min al-zalimin","Allahumma inni a'udhu bika","Hasbunallahu wa ni'mal wakeel"], answer:1, explanation:"Yunus called: 'La ilaha illa anta subhanaka inni kuntu min al-zalimin' — There is no god but You, glory be to You, I have been among the wrongdoers." },
  { id:29, category:"Prophets", question:"Which prophet was raised to the heavens without dying?", options:["Ilyas","Idris","Isa","Both Idris and Isa"], answer:3, explanation:"Both Idris (AS) was elevated to a high station (Quran 19:57) and Isa (AS) was raised to the heavens (Quran 4:158)." },
  { id:30, category:"Prophets", question:"What miracle was given to Musa (AS) that parted the sea?", options:["His hand","His staff/rod","His voice","His prayer"], answer:1, explanation:"Allah commanded Musa to strike the Red Sea with his staff, and it parted into twelve dry paths." },
];

export default function QuizPage() {
  const [category, setCategory] = useState<Category | "All">("All");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ correct: boolean; selected: number }[]>([]);
  const [finished, setFinished] = useState(false);

  const pool = category === "All" ? QUESTIONS : QUESTIONS.filter((q) => q.category === category);
  const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 10);
  const [quizQuestions] = useState(() => pool.sort(() => Math.random() - 0.5).slice(0, 10));
  const q = quizQuestions[currentQ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, { correct, selected: idx }]);
  };

  const next = () => {
    if (currentQ + 1 >= quizQuestions.length) { setFinished(true); return; }
    setCurrentQ((c) => c + 1);
    setSelected(null);
    setAnswered(false);
  };

  const restart = () => {
    setQuizStarted(false); setCurrentQ(0); setSelected(null);
    setAnswered(false); setScore(0); setAnswers([]); setFinished(false);
  };

  const CATEGORIES: (Category | "All")[] = ["All", "Quran", "Hadith", "History", "Fiqh", "Prophets"];

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="card p-8 text-center space-y-4">
          <p className="text-5xl">{score >= 8 ? "🏆" : score >= 5 ? "👍" : "📚"}</p>
          <h2 className="text-2xl font-bold text-[var(--text)]">Quiz Complete!</h2>
          <p className="text-5xl font-bold text-[var(--primary)]">{score} / {quizQuestions.length}</p>
          <p className="text-[var(--text-muted)]">{score >= 8 ? "Excellent! MashAllah!" : score >= 5 ? "Good effort! Keep learning." : "Keep studying — every attempt is worship!"}</p>
          <button onClick={restart} className="btn-primary px-8 py-2.5">Try Again</button>
        </div>
        <div className="space-y-3">
          <h3 className="section-title">Review Your Answers</h3>
          {quizQuestions.map((q, i) => (
            <div key={q.id} className={cn("card p-4", answers[i]?.correct ? "border-emerald-500/30" : "border-red-500/30")}>
              <div className="flex items-start gap-2">
                <span className="text-lg">{answers[i]?.correct ? "✅" : "❌"}</span>
                <div>
                  <p className="font-medium text-[var(--text)] text-sm">{q.question}</p>
                  <p className="text-xs text-[var(--primary)] mt-1">✓ {q.options[q.answer]}</p>
                  {!answers[i]?.correct && <p className="text-xs text-red-400">✗ {q.options[answers[i]?.selected]}</p>}
                  <p className="text-xs text-[var(--text-muted)] mt-1">{q.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)]">مسابقة إسلامية</h1>
          <p className="text-[var(--text-muted)] mt-1">Test your Islamic knowledge</p>
        </div>
        <div>
          <p className="text-sm text-[var(--text-muted)] mb-2">Select Category:</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={cn("px-4 py-1.5 rounded-full text-sm transition-all",
                  category === c ? "bg-[var(--primary)] text-white" : "bg-[var(--elevated)] text-[var(--text-muted)] hover:text-[var(--text)]")}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="card p-6 text-center space-y-4">
          <p className="text-4xl">🎯</p>
          <h2 className="text-xl font-bold text-[var(--text)]">10 Questions · {category} Category</h2>
          <p className="text-[var(--text-muted)] text-sm">Choose the correct answer for each question. Explanations provided at the end.</p>
          <button onClick={() => setQuizStarted(true)} className="btn-primary px-8 py-2.5">Start Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="badge bg-[var(--primary)]/10 text-[var(--primary)]">{q.category}</span>
        <span className="text-sm text-[var(--text-muted)]">{currentQ + 1} / {quizQuestions.length}</span>
        <span className="font-bold text-[var(--primary)]">Score: {score}</span>
      </div>
      <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
        <div className="h-full bg-[var(--primary)] transition-all rounded-full" style={{ width: `${((currentQ + 1)/quizQuestions.length)*100}%` }} />
      </div>
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-[var(--text)] leading-relaxed">{q.question}</h2>
      </div>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} disabled={answered}
            className={cn("w-full text-left p-4 rounded-xl border-2 transition-all",
              !answered ? "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5"
              : i === q.answer ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
              : i === selected ? "border-red-500 bg-red-500/10 text-red-400"
              : "border-[var(--border)] bg-[var(--surface)] opacity-60")}>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg border-2 flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ borderColor: !answered ? "var(--border)" : i === q.answer ? "#10b981" : i === selected ? "#ef4444" : "var(--border)" }}>
                {["A","B","C","D"][i]}
              </span>
              <span className="text-sm">{opt}</span>
              {answered && i === q.answer && <span className="ml-auto">✅</span>}
              {answered && i === selected && i !== q.answer && <span className="ml-auto">❌</span>}
            </div>
          </button>
        ))}
      </div>
      {answered && (
        <div className="card p-4 bg-[var(--elevated)]">
          <p className="text-xs text-[var(--primary)] font-semibold uppercase tracking-wider mb-1">Explanation</p>
          <p className="text-sm text-[var(--text)]">{q.explanation}</p>
        </div>
      )}
      {answered && (
        <button onClick={next} className="btn-primary w-full py-3">
          {currentQ + 1 >= quizQuestions.length ? "See Results" : "Next Question →"}
        </button>
      )}
    </div>
  );
}
