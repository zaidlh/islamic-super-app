import type { Metadata } from "next";
import { AdhkarCarousel } from "@/components/adhkar/AdhkarCarousel";
import { TasbihCounter } from "@/components/adhkar/TasbihCounter";
import { ADHKAR_CATEGORIES } from "@/lib/adhkar";

export const metadata: Metadata = {
  title: "Adhkar",
  description: "Daily Islamic remembrances and supplications from Hisnul Muslim.",
};

export default function AdhkarPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2">الأذكار</h1>
        <p className="text-[var(--text-muted)]">Daily Remembrances from Hisnul Muslim</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories grid */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="section-title">Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            {ADHKAR_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="card card-hover p-4 flex flex-col gap-1 group"
              >
                <p className="font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                  {cat.name}
                </p>
                <p className="arabic-text text-base text-[var(--primary)]">{cat.arabic_name}</p>
                <p className="text-xs text-muted mt-1">{cat.count} adhkar</p>
              </a>
            ))}
          </div>

          {/* Adhkar entries by category */}
          {ADHKAR_CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-6">
              <AdhkarCarousel categoryId={cat.id} />
            </div>
          ))}
        </div>

        {/* Tasbih counter */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <TasbihCounter />
          </div>
        </div>
      </div>
    </div>
  );
}
