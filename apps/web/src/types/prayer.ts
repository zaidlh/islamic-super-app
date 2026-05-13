export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface PrayerDate {
  readable: string;
  timestamp: string;
  hijri: {
    date: string;
    format: string;
    day: string;
    weekday: {
      en: string;
      ar: string;
    };
    month: {
      number: number;
      en: string;
      ar: string;
    };
    year: string;
    designation: {
      abbreviated: string;
      expanded: string;
    };
    holidays: string[];
  };
  gregorian: {
    date: string;
    format: string;
    day: string;
    weekday: {
      en: string;
    };
    month: {
      number: number;
      en: string;
    };
    year: string;
    designation: {
      abbreviated: string;
      expanded: string;
    };
  };
}

export interface PrayerMeta {
  latitude: number;
  longitude: number;
  timezone: string;
  method: {
    id: number;
    name: string;
    params: {
      Fajr: number;
      Isha: number;
    };
    location: {
      latitude: number;
      longitude: number;
    };
  };
  latitudeAdjustmentMethod: string;
  midnightMode: string;
  school: string;
  offset: Record<string, number>;
}

export interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimings;
    date: PrayerDate;
    meta: PrayerMeta;
  };
}

export interface PrayerWithCountdown {
  name: string;
  arabic: string;
  time: string;
  isCurrent: boolean;
  isNext: boolean;
  countdown?: string;
  timestamp: Date;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export type CalculationMethod =
  | 1 | 2 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
