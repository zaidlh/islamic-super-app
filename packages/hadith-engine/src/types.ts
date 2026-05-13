export interface HadithText {
  text: string;
  grades?: Array<{ grade: string; graded_by: string }>;
}

export interface HadithEntry {
  hadithnumber: number | string;
  arabicnumber?: number;
  text: string;
  reference?: {
    book?: number | string;
    hadith?: number | string;
  };
  grades?: Array<{ grade: string; graded_by: string }>;
  chapter?: string;
  chapter_ar?: string;
}

export interface HadithCollection {
  id: string;
  name: string;
  arabic_name: string;
  author: string;
  author_ar: string;
  total_hadiths: number;
  hadiths: HadithEntry[];
}

export interface HadithSearchResult {
  hadith: HadithEntry;
  collection: string;
  collection_name: string;
  score: number;
}

export interface HadithApiResponse {
  metadata: {
    name: string;
    section?: Record<string, string>;
    section_detail?: Record<string, { arabicnumber: number; hadithnumber: string }>;
  };
  hadiths: HadithEntry[];
}
