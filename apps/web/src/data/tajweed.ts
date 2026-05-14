export interface TajweedRule {
  id: number;
  name: string;
  arabicName: string;
  description: string;
  examples: { arabic: string; transliteration: string }[];
  color: string;
}

export const TAJWEED_RULES: TajweedRule[] = [
  {
    id: 1, name: "Madd (Elongation)", arabicName: "المد", color: "#3B82F6",
    description: "Madd means prolonging the sound of a vowel. There are several types: Natural Madd (2 beats) occurs whenever a long vowel (alif, waw, ya) appears without a hamzah or sukun following it. Extended Madd (4-6 beats) occurs under specific conditions.",
    examples: [
      { arabic: "قَالَ", transliteration: "Qaala (Natural Madd - 2 beats)" },
      { arabic: "جَاءَ", transliteration: "Jaa'a (Connected Madd - 4-5 beats)" },
      { arabic: "الضَّالِّينَ", transliteration: "Adh-dhaalleen (Obligatory Madd - 6 beats)" },
    ],
  },
  {
    id: 2, name: "Ghunna (Nasalization)", arabicName: "الغنة", color: "#10B981",
    description: "Ghunna is the nasal humming sound produced from the nasal cavity (khayshum). It applies to the letters Nun (ن) and Mim (م) when they carry shaddah. Duration is 2 beats.",
    examples: [
      { arabic: "إِنَّ", transliteration: "Inna (Nun with Shaddah)" },
      { arabic: "ثُمَّ", transliteration: "Thumma (Mim with Shaddah)" },
    ],
  },
  {
    id: 3, name: "Ikhfa (Concealment)", arabicName: "الإخفاء", color: "#F59E0B",
    description: "Ikhfa is the pronunciation of a Nun Sakin or Tanwin in a state between Idhar (clear) and Idgham (merging), with ghunna maintained for 2 beats. It occurs before 15 letters.",
    examples: [
      { arabic: "مِن قَبْلُ", transliteration: "Min qablu — Nun hidden before Qaf" },
      { arabic: "أَنتُم", transliteration: "Antum — Nun hidden before Ta" },
    ],
  },
  {
    id: 4, name: "Idgham (Merging)", arabicName: "الإدغام", color: "#8B5CF6",
    description: "Idgham is the merging of Nun Sakin or Tanwin with the following letter, so the two become one letter with shaddah. Idgham with Ghunna occurs with: ي، ن، م، و. Idgham without Ghunna: ل، ر.",
    examples: [
      { arabic: "مَن يَعْمَلُ", transliteration: "Man ya'malu — Nun merges with Ya" },
      { arabic: "لَن تَرَاهُ", transliteration: "Wrong example — Ikhfa, not Idgham" },
      { arabic: "مِن رَّبِّهِمْ", transliteration: "Min Rabbihim — Nun merges with Ra" },
    ],
  },
  {
    id: 5, name: "Iqlab (Conversion)", arabicName: "الإقلاب", color: "#EF4444",
    description: "Iqlab is the conversion of Nun Sakin or Tanwin into a Mim sound when followed by the letter Ba (ب), with ghunna for 2 beats.",
    examples: [
      { arabic: "مِنْ بَعْدِ", transliteration: "Min ba'di — Nun converts to Mim before Ba" },
      { arabic: "سَمِيعٌ بَصِيرٌ", transliteration: "Sami'un Baseer — Tanwin converts to Mim" },
    ],
  },
  {
    id: 6, name: "Qalqala (Echo/Vibration)", arabicName: "القلقلة", color: "#06B6D4",
    description: "Qalqala is a strong echoing or bouncing sound produced when one of the 5 Qalqala letters (ق، ط، ب، ج، د) has a sukun (resting). It is stronger at the end of a verse.",
    examples: [
      { arabic: "خَلَقَ", transliteration: "Khalaqa — Qaf at end" },
      { arabic: "أَحَد", transliteration: "Ahad — Dal at end" },
      { arabic: "يُجِيبُ", transliteration: "Yujibu — Ba with sukun" },
    ],
  },
  {
    id: 7, name: "Idhar (Clear Pronunciation)", arabicName: "الإظهار الحلقي", color: "#64748B",
    description: "Idhar is the clear, distinct pronunciation of Nun Sakin or Tanwin without ghunna when followed by the 6 throat letters: ء، هـ، ع، ح، غ، خ.",
    examples: [
      { arabic: "مَنْ آمَنَ", transliteration: "Man Amana — Nun clear before Hamzah" },
      { arabic: "مِنْ خَيْرٍ", transliteration: "Min Khayrin — Nun clear before Kha" },
    ],
  },
  {
    id: 8, name: "Tafkhim (Heavy Pronunciation)", arabicName: "التفخيم", color: "#D97706",
    description: "Tafkhim is the heavy, thick pronunciation of certain letters. Always heavy: خ، ص، ض، غ، ط، ق، ظ. The letter Ra (ر) and the Majestic Name 'Allah' can be heavy or light depending on context.",
    examples: [
      { arabic: "قُلْ", transliteration: "Qul — heavy Qaf" },
      { arabic: "وَاللَّهُ", transliteration: "Wallahu — heavy Lam in Allah after Fatha/Damma" },
      { arabic: "الرَّحْمَٰنُ", transliteration: "Ar-Rahman — heavy Ra" },
    ],
  },
  {
    id: 9, name: "Tarqeeq (Light Pronunciation)", arabicName: "الترقيق", color: "#6EE7B7",
    description: "Tarqeeq is the light, thin pronunciation of certain letters. The letter Ra (ر) is light when preceded by Kasra or when it has Kasra. The Majestic Name 'Allah' is light when preceded by Kasra or Tanwin Kasra.",
    examples: [
      { arabic: "بِسْمِ اللَّهِ", transliteration: "Bismillahi — light Lam in Allah after Kasra" },
      { arabic: "فِرْعَوْنَ", transliteration: "Fir'awna — light Ra after Kasra" },
    ],
  },
  {
    id: 10, name: "Waqf (Pause)", arabicName: "الوقف", color: "#7C3AED",
    description: "Waqf is the pause at the end of a word during recitation. Types: Taam (complete pause), Kafi (sufficient), Hasan (good), and Qabih (defective). Various pause signs appear in the Mushaf.",
    examples: [
      { arabic: "مـ", transliteration: "Compulsory stop (Waqf Lazim)" },
      { arabic: "ج", transliteration: "Permissible stop (Waqf Ja'iz)" },
      { arabic: "لا", transliteration: "Do not stop here" },
      { arabic: "صلى", transliteration: "Better to continue (but stopping allowed)" },
    ],
  },
  {
    id: 11, name: "Sakt (Brief Pause)", arabicName: "السكت", color: "#F472B6",
    description: "Sakt is a brief silence without breathing, shorter than a full stop. It occurs in 4 specific places in the Quran (in the Hafs narration): 18:1-2, 36:52, 75:27, and between Surah Al-Anfal and At-Tawbah.",
    examples: [
      { arabic: "عِوَجًا ۜ قَيِّمًا", transliteration: "'Iwajan (sakt) Qayyiman — Surah Al-Kahf" },
    ],
  },
  {
    id: 12, name: "Noon and Meem Mushaddad", arabicName: "النون والميم المشددتان", color: "#34D399",
    description: "When Noon or Meem carries a shaddah, it must be read with a strong Ghunna of 2 beats. This is one of the most important rules as it occurs very frequently.",
    examples: [
      { arabic: "إِنَّ اللَّهَ", transliteration: "Innallaha — Nun with shaddah" },
      { arabic: "أَمَّا", transliteration: "Amma — Mim with shaddah" },
    ],
  },
  {
    id: 13, name: "Lam Shamsiyyah and Qamariyyah", arabicName: "اللام الشمسية والقمرية", color: "#FBBF24",
    description: "Sun letters (Shamsiyyah): The Lam of the definite article 'al-' assimilates into the following letter. Moon letters (Qamariyyah): The Lam is pronounced clearly. Sun letters: ت ث د ذ ر ز س ش ص ض ط ظ ل ن.",
    examples: [
      { arabic: "الشَّمْسُ", transliteration: "Ash-Shamsu — Lam assimilates (solar)" },
      { arabic: "الْقَمَرُ", transliteration: "Al-Qamaru — Lam clear (lunar)" },
    ],
  },
  {
    id: 14, name: "Hamzat al-Wasl (Connecting Hamzah)", arabicName: "همزة الوصل", color: "#A78BFA",
    description: "Hamzat al-Wasl is a Hamzah that is pronounced when starting but dropped in the middle of speech. It appears at the beginning of: ال (the), and certain verb patterns.",
    examples: [
      { arabic: "اقْرَأْ بِاسْمِ رَبِّكَ", transliteration: "Starting: Iqra — drop Hamzah of 'bismi' in flow" },
    ],
  },
  {
    id: 15, name: "Madd Lazim (Obligatory Madd)", arabicName: "المد اللازم", color: "#60A5FA",
    description: "Madd Lazim is the compulsory elongation of 6 beats. It occurs when a long vowel is followed by a letter with shaddah or sukun in the same word. Most common in the Muqatta'at (opening letters of surahs).",
    examples: [
      { arabic: "الۤمۤ", transliteration: "Alif-Lam-Meem — Lam held 6 beats" },
      { arabic: "الۤمۤصۤ", transliteration: "Alif-Lam-Meem-Sad — each held 6 beats" },
    ],
  },
];
