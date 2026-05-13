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
  verse_key: string; // e.g. "1:1"
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number?: number | null;
  page_number: number;
  juz_number: number;
  text_uthmani: string;
  text_imlaei?: string;
  words: QuranWord[];
  translations?: QuranTranslation[];
  audio?: {
    url: string;
  };
}

export interface QuranTranslation {
  id: number;
  resource_id: number;
  text: string;
  resource_name: string;
  language_name: string;
}

export interface QuranChapter {
  id: number;
  revelation_place: "makkah" | "madinah";
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  name_arabic_long?: string;
  verses_count: number;
  pages: [number, number];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface QuranJuz {
  id: number;
  juz_number: number;
  verse_mapping: Record<string, string>;
  first_verse_id: number;
  last_verse_id: number;
  verses_count: number;
}

export interface SearchResult {
  verse: QuranVerse;
  chapter: QuranChapter;
  score: number;
  highlights: string[];
}

export interface QuranReaderState {
  currentSurah: number;
  currentAyah: number;
  isPlaying: boolean;
  reciter: string;
  showTranslation: boolean;
  showTransliteration: boolean;
  fontSize: number;
}
