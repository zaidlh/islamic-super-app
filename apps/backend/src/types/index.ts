export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export interface QuranChapterBasic {
  id: number;
  name_simple: string;
  name_arabic: string;
  verses_count: number;
  revelation_place: "makkah" | "madinah";
  translated_name: { name: string };
}

export interface HadithEntry {
  hadithnumber: number | string;
  text: string;
  grades?: Array<{ grade: string; graded_by: string }>;
  chapter?: string;
}
