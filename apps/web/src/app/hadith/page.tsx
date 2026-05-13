import type { Metadata } from "next";
import Link from "next/link";
import { HADITH_COLLECTIONS } from "@/types/hadith";

export const metadata: Metadata = {
  title: "Hadith",
  description:
    "Browse authentic Hadith collections including Bukhari, Muslim, 40 Nawawi, and more.",
};

export default function HadithPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2">الحديث الشريف</h1>
        <p className="text-[var(--text-muted)]">
          Authentic Hadith collections from the most trusted sources
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HADITH_COLLECTIONS.map((collection) => (
          <Link
            key={collection.id}
            href={`/hadith/${collection.id}`}
            className="card card-hover p-6 flex flex-col gap-3 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors text-lg">
                  {collection.name}
                </h2>
                <p className="arabic-text text-xl text-[var(--primary)] mt-1">
                  {collection.arabic_name}
                </p>
              </div>
              <span className="badge bg-[var(--primary)]/10 text-[var(--primary)]">
                {collection.total_hadiths.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] line-clamp-2">
              {collection.description}
            </p>
            <p className="text-xs text-[var(--text-subtle)]">By {collection.author}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
