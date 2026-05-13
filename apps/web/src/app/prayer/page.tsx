import type { Metadata } from "next";
import { PrayerTimes } from "@/components/prayer/PrayerTimes";
import { QiblaCompass } from "@/components/prayer/QiblaCompass";

export const metadata: Metadata = {
  title: "Prayer Times",
  description:
    "Accurate Islamic prayer times using your location with Qibla direction compass.",
};

export default function PrayerPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2">أوقات الصلاة</h1>
        <p className="text-[var(--text-muted)]">Prayer times based on your location</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PrayerTimes />
        </div>
        <div className="lg:col-span-1">
          <QiblaCompass />
        </div>
      </div>
    </div>
  );
}
