import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HADITH_COLLECTIONS } from "@/types/hadith";
import { CollectionList } from "@/components/hadith/CollectionList";

interface Props {
  params: { collection: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = HADITH_COLLECTIONS.find((c) => c.id === params.collection);
  if (!collection) return { title: "Not Found" };
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default function HadithCollectionPage({ params }: Props) {
  const collection = HADITH_COLLECTIONS.find((c) => c.id === params.collection);
  if (!collection) notFound();

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text)] mb-1">{collection.name}</h1>
            <p className="arabic-text text-2xl text-[var(--primary)] mb-2">
              {collection.arabic_name}
            </p>
            <p className="text-[var(--text-muted)] text-sm">{collection.description}</p>
          </div>
          <span className="badge bg-[var(--primary)]/10 text-[var(--primary)] text-sm px-3 py-1">
            {collection.total_hadiths.toLocaleString()} hadiths
          </span>
        </div>
      </div>

      <CollectionList collectionId={collection.id} collectionName={collection.name} />
    </div>
  );
}
