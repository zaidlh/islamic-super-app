import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(timeStr: string): { hour: string; minute: string; period: string } {
  const [time, period] = timeStr.split(" ");
  const [hour, minute] = (time ?? "").split(":");
  return {
    hour: hour ?? "--",
    minute: minute ?? "--",
    period: period ?? "",
  };
}

export function getTimeUntil(targetTime: Date): string {
  const now = new Date();
  const diff = targetTime.getTime() - now.getTime();
  if (diff <= 0) return "Now";

  const totalMinutes = Math.floor(diff / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function parseTime(timeStr: string): Date {
  const today = new Date();
  // Handle "HH:MM (TZ)" format from Aladhan
  const match = timeStr.match(/(\d{1,2}):(\d{2})/);
  if (!match) return today;
  const [, h, m] = match;
  const result = new Date(today);
  result.setHours(parseInt(h ?? "0"), parseInt(m ?? "0"), 0, 0);
  return result;
}

export function formatHijriDate(date: {
  day: string;
  month: { en: string; ar: string };
  year: string;
}): string {
  return `${date.day} ${date.month.en} ${date.year} AH`;
}

export function formatHijriDateAr(date: {
  day: string;
  month: { ar: string };
  year: string;
}): string {
  return `${date.day} ${date.month.ar} ${date.year} هـ`;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export function arabicToInt(arabicNum: string): number {
  const arabicNumerals: Record<string, string> = {
    "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
    "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
  };
  return parseInt(
    arabicNum
      .split("")
      .map((c) => arabicNumerals[c] ?? c)
      .join("")
  );
}
