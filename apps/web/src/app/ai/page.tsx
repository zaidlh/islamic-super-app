import type { Metadata } from "next";
import { AIAssistant } from "@/components/ai/AIAssistant";

export const metadata: Metadata = {
  title: "AI Islamic Assistant",
  description:
    "Ask questions about Islam, Quran, Hadith, and Islamic jurisprudence powered by AI.",
};

export default function AIPage() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in h-[calc(100vh-10rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2">المساعد الإسلامي</h1>
        <p className="text-[var(--text-muted)]">
          Ask any question about Islam, Quran, Hadith, or Islamic practice
        </p>
      </div>
      <AIAssistant />
    </div>
  );
}
