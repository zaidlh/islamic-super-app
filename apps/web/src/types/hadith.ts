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
  description: string;
  total_hadiths: number;
  source_url: string;
}

export const HADITH_COLLECTIONS: HadithCollection[] = [
  {
    id: "eng-bukhari",
    name: "Sahih al-Bukhari",
    arabic_name: "صحيح البخاري",
    author: "Imam Muhammad ibn Ismail al-Bukhari",
    description:
      "Considered the most authentic book after the Quran. Imam Bukhari collected hadiths he authenticated from over 600,000 narrations.",
    total_hadiths: 7563,
    source_url:
      "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-bukhari.json",
  },
  {
    id: "eng-muslim",
    name: "Sahih Muslim",
    arabic_name: "صحيح مسلم",
    author: "Imam Muslim ibn al-Hajjaj",
    description:
      "The second most authentic Hadith collection. Muslim dedicated 15 years to compiling this work.",
    total_hadiths: 7470,
    source_url:
      "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-muslim.json",
  },
  {
    id: "eng-nawawi40",
    name: "40 Hadith Nawawi",
    arabic_name: "الأربعون النووية",
    author: "Imam Yahya ibn Sharaf al-Nawawi",
    description:
      "A collection of 42 fundamental hadiths covering core principles of Islam, compiled by Imam Nawawi.",
    total_hadiths: 42,
    source_url:
      "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-nawawi40.json",
  },
  {
    id: "eng-abudawud",
    name: "Sunan Abu Dawud",
    arabic_name: "سنن أبي داود",
    author: "Abu Dawud Sulayman ibn al-Ash'ath",
    description:
      "One of the six canonical Hadith collections, focusing on legal matters and jurisprudence.",
    total_hadiths: 5274,
    source_url:
      "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-abudawud.json",
  },
  {
    id: "eng-tirmidhi",
    name: "Jami at-Tirmidhi",
    arabic_name: "جامع الترمذي",
    author: "Abu Isa Muhammad ibn Isa al-Tirmidhi",
    description:
      "Famous for including commentary on hadith grading and recording scholarly opinions.",
    total_hadiths: 3956,
    source_url:
      "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-tirmidhi.json",
  },
  {
    id: "eng-ibnmajah",
    name: "Sunan Ibn Majah",
    arabic_name: "سنن ابن ماجه",
    author: "Ibn Majah Abu Abdillah Muhammad ibn Yazid",
    description:
      "The sixth canonical collection, containing hadiths not found in other major collections.",
    total_hadiths: 4341,
    source_url:
      "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-ibnmajah.json",
  },
];

export interface HadithApiResponse {
  metadata: {
    name: string;
    section?: Record<string, string>;
    section_detail?: Record<string, { arabicnumber: number; hadithnumber: string }>;
  };
  hadiths: HadithEntry[];
}
