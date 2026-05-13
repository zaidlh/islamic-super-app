// Shared types, constants, and utilities for the Islamic Super App

// ─── Constants ────────────────────────────────────────────────────────────────

export const QURAN_TOTAL_SURAHS = 114;
export const QURAN_TOTAL_AYAHS = 6236;

export const SURAH_NAMES_AR: Record<number, string> = {
  1: "الفاتحة",
  2: "البقرة",
  3: "آل عمران",
  4: "النساء",
  5: "المائدة",
  6: "الأنعام",
  7: "الأعراف",
  8: "الأنفال",
  9: "التوبة",
  10: "يونس",
  11: "هود",
  12: "يوسف",
  13: "الرعد",
  14: "إبراهيم",
  15: "الحجر",
  16: "النحل",
  17: "الإسراء",
  18: "الكهف",
  19: "مريم",
  20: "طه",
  21: "الأنبياء",
  22: "الحج",
  23: "المؤمنون",
  24: "النور",
  25: "الفرقان",
  26: "الشعراء",
  27: "النمل",
  28: "القصص",
  29: "العنكبوت",
  30: "الروم",
  31: "لقمان",
  32: "السجدة",
  33: "الأحزاب",
  34: "سبأ",
  35: "فاطر",
  36: "يس",
  37: "الصافات",
  38: "ص",
  39: "الزمر",
  40: "غافر",
  41: "فصلت",
  42: "الشورى",
  43: "الزخرف",
  44: "الدخان",
  45: "الجاثية",
  46: "الأحقاف",
  47: "محمد",
  48: "الفتح",
  49: "الحجرات",
  50: "ق",
  51: "الذاريات",
  52: "الطور",
  53: "النجم",
  54: "القمر",
  55: "الرحمن",
  56: "الواقعة",
  57: "الحديد",
  58: "المجادلة",
  59: "الحشر",
  60: "الممتحنة",
  61: "الصف",
  62: "الجمعة",
  63: "المنافقون",
  64: "التغابن",
  65: "الطلاق",
  66: "التحريم",
  67: "الملك",
  68: "القلم",
  69: "الحاقة",
  70: "المعارج",
  71: "نوح",
  72: "الجن",
  73: "المزمل",
  74: "المدثر",
  75: "القيامة",
  76: "الإنسان",
  77: "المرسلات",
  78: "النبأ",
  79: "النازعات",
  80: "عبس",
  81: "التكوير",
  82: "الانفطار",
  83: "المطففين",
  84: "الانشقاق",
  85: "البروج",
  86: "الطارق",
  87: "الأعلى",
  88: "الغاشية",
  89: "الفجر",
  90: "البلد",
  91: "الشمس",
  92: "الليل",
  93: "الضحى",
  94: "الشرح",
  95: "التين",
  96: "العلق",
  97: "القدر",
  98: "البينة",
  99: "الزلزلة",
  100: "العاديات",
  101: "القارعة",
  102: "التكاثر",
  103: "العصر",
  104: "الهمزة",
  105: "الفيل",
  106: "قريش",
  107: "الماعون",
  108: "الكوثر",
  109: "الكافرون",
  110: "النصر",
  111: "المسد",
  112: "الإخلاص",
  113: "الفلق",
  114: "الناس",
};

export const PRAYER_NAMES = {
  Fajr: { ar: "الفجر", en: "Fajr" },
  Sunrise: { ar: "الشروق", en: "Sunrise" },
  Dhuhr: { ar: "الظهر", en: "Dhuhr" },
  Asr: { ar: "العصر", en: "Asr" },
  Maghrib: { ar: "المغرب", en: "Maghrib" },
  Isha: { ar: "العشاء", en: "Isha" },
} as const;

export const HADITH_COLLECTIONS = [
  { id: "eng-bukhari", name: "Sahih al-Bukhari", ar: "صحيح البخاري", count: 7563 },
  { id: "eng-muslim", name: "Sahih Muslim", ar: "صحيح مسلم", count: 7500 },
  { id: "eng-nawawi40", name: "40 Hadith Nawawi", ar: "الأربعون النووية", count: 42 },
  { id: "eng-abudawud", name: "Sunan Abu Dawud", ar: "سنن أبي داود", count: 5274 },
  { id: "eng-tirmidhi", name: "Jami at-Tirmidhi", ar: "جامع الترمذي", count: 3956 },
  { id: "eng-ibnmajah", name: "Sunan Ibn Majah", ar: "سنن ابن ماجه", count: 4341 },
] as const;

export const CALCULATION_METHODS = [
  { id: 1, name: "University of Islamic Sciences, Karachi" },
  { id: 2, name: "Islamic Society of North America (ISNA)" },
  { id: 3, name: "Muslim World League" },
  { id: 4, name: "Umm Al-Qura University, Makkah" },
  { id: 5, name: "Egyptian General Authority of Survey" },
  { id: 7, name: "Institute of Geophysics, University of Tehran" },
  { id: 8, name: "Gulf Region" },
  { id: 9, name: "Kuwait" },
  { id: 10, name: "Qatar" },
  { id: 11, name: "Majlis Ugama Islam Singapura, Singapore" },
  { id: 12, name: "Union Organization Islamic de France" },
  { id: 13, name: "Diyanet İşleri Başkanlığı, Turkey" },
  { id: 14, name: "Spiritual Administration of Muslims of Russia" },
] as const;

// ─── Utilities ────────────────────────────────────────────────────────────────

export function formatArabicNumber(n: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(n)
    .split("")
    .map((d) => arabicNumerals[parseInt(d)] ?? d)
    .join("");
}

export function toArabicOrdinal(n: number): string {
  return formatArabicNumber(n);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    perPage: number;
  };
}

export interface BookmarkItem {
  id: string;
  type: "ayah" | "hadith" | "adhkar" | "dua";
  reference: string;
  text: string;
  translation?: string;
  addedAt: number;
  note?: string;
}

export interface UserSettings {
  theme: "dark" | "light" | "system";
  language: "en" | "ar";
  arabicFont: "uthmanic" | "naskh" | "nastaliq";
  arabicFontSize: number;
  translationFontSize: number;
  showTranslation: boolean;
  showTransliteration: boolean;
  quranReciter: string;
  prayerCalculationMethod: number;
  prayerAdjustments: Record<string, number>;
}

export const DEFAULT_SETTINGS: UserSettings = {
  theme: "dark",
  language: "en",
  arabicFont: "uthmanic",
  arabicFontSize: 28,
  translationFontSize: 16,
  showTranslation: true,
  showTransliteration: false,
  quranReciter: "ar.alafasy",
  prayerCalculationMethod: 3,
  prayerAdjustments: {},
};
