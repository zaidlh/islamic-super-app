export interface QuranWord {
  id: number;
  position: number;
  audio_url?: string;
  char_type_name: "word" | "end" | "pause" | "sajdah";
  text: string;
  text_uthmani: string;
  transliteration?: {
    text: string;
  };
  translation?: {
    text: string;
    language_name: string;
  };
}

export interface QuranVerse {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number?: number | null;
  page_number: number;
  juz_number: number;
  text_uthmani: string;
  words: QuranWord[];
  translations?: Array<{
    id: number;
    resource_id: number;
    text: string;
    resource_name: string;
    language_name: string;
  }>;
}

export interface QuranChapter {
  id: number;
  revelation_place: "makkah" | "madinah";
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: [number, number];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface QuranApiChaptersResponse {
  chapters: QuranChapter[];
}

export interface QuranApiVersesResponse {
  verses: QuranVerse[];
  pagination: {
    per_page: number;
    current_page: number;
    next_page: number | null;
    total_pages: number;
    total_records: number;
  };
  meta: {
    filters: {
      chapter_number: number;
    };
  };
}

export interface TafsirEntry {
  id: number;
  verse_id: number;
  verse_key: string;
  resource_id: number;
  text: string;
  resource_name: string;
  language_name: string;
}

export interface QuranReciter {
  id: string;
  name: string;
  arabic_name?: string;
  style: string;
  url_template: string;
}

export const QURAN_RECITERS: QuranReciter[] = [
  {
    id: "ar.alafasy",
    name: "Mishary Rashid Alafasy",
    arabic_name: "مشاري راشد العفاسي",
    style: "Murattal",
    url_template: "https://verses.quran.com/Alafasy_128kbps/{surah}/{verse}.mp3",
  },
  {
    id: "ar.abdulbasitmurattal",
    name: "Abdul Basit Murattal",
    arabic_name: "عبد الباسط عبد الصمد",
    style: "Murattal",
    url_template: "https://verses.quran.com/AbdulSamad_128kbps_Quran_url/{surah}/{verse}.mp3",
  },
  {
    id: "ar.husary",
    name: "Mahmoud Khalil Al-Husary",
    arabic_name: "محمود خليل الحصري",
    style: "Murattal",
    url_template: "https://verses.quran.com/Husary_128kbps/{surah}/{verse}.mp3",
  },
];
