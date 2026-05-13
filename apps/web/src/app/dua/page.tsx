import type { Metadata } from "next";
import { ADHKAR_DATA, ADHKAR_CATEGORIES } from "@/lib/adhkar";

export const metadata: Metadata = {
  title: "Dua",
  description: "Authentic duas and supplications from the Quran and Sunnah.",
};

export default function DuaPage() {
  // Group duas by category
  const duasByCategory = ADHKAR_CATEGORIES.map((cat) => ({
    ...cat,
    duas: ADHKAR_DATA.filter((d) => d.category === cat.id),
  })).filter((c) => c.duas.length > 0);

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2">الدعاء</h1>
        <p className="text-[var(--text-muted)]">
          Authentic duas from the Quran and Sunnah
        </p>
      </div>

      <div className="space-y-10">
        {duasByCategory.map((cat) => (
          <section key={cat.id}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="section-title">{cat.name}</h2>
              <span className="arabic-text text-lg text-[var(--primary)]">{cat.arabic_name}</span>
            </div>

            <div className="space-y-4">
              {cat.duas.map((dua) => (
                <div key={dua.id} className="card p-6">
                  {/* Arabic text */}
                  <p
                    className="text-[var(--text)] arabic-quran text-2xl mb-4 leading-loose"
                    dir="rtl"
                  >
                    {dua.arabic}
                  </p>

                  {/* Transliteration */}
                  {dua.transliteration && (
                    <p className="text-[var(--text-muted)] text-sm italic mb-3">
                      {dua.transliteration}
                    </p>
                  )}

                  {/* Translation */}
                  <p className="text-[var(--text)] leading-relaxed mb-4">{dua.translation}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[var(--border)]">
                    <span className="badge bg-[var(--elevated)] text-[var(--text-muted)] text-xs">
                      📖 {dua.reference}
                    </span>
                    {dua.count > 1 && (
                      <span className="badge bg-[var(--primary)]/10 text-[var(--primary)] text-xs">
                        × {dua.count}
                      </span>
                    )}
                    {dua.benefit && (
                      <p className="text-xs text-[var(--text-subtle)] w-full mt-1">
                        ✨ {dua.benefit}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
