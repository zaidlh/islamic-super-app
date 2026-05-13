import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an Islamic knowledge assistant with deep expertise in:
- The Holy Quran (Tafsir, meaning, context, and application)
- Hadith sciences and the major hadith collections
- Islamic jurisprudence (Fiqh) across the four major madhabs
- Islamic history and the life of the Prophet Muhammad ﷺ
- Islamic theology (Aqeedah) and spirituality
- Daily Islamic practice, worship, and ethics

Guidelines:
- Always be respectful, accurate, and cite sources when possible
- Acknowledge scholarly differences of opinion when they exist
- Distinguish between what is clearly established vs. matters of scholarly debate
- Use phrases like "According to scholars..." or "The majority opinion is..." when appropriate
- When citing Quran, provide the surah and verse number (e.g., Al-Baqarah 2:255)
- When citing Hadith, mention the collection and authenticity grade when known
- Respond in English by default, but switch to Arabic if the user writes in Arabic
- Be warm, educational, and accessible — like a knowledgeable friend, not a cold encyclopedia
- Never issue fatwas or personal religious rulings — defer to qualified scholars for those`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, model = "gpt-4o-mini" } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = process.env.OPENAI_API_BASE_URL ?? "https://api.openai.com/v1";

    if (!apiKey) {
      // Return a demo response if no API key configured
      return NextResponse.json({
        message: {
          role: "assistant",
          content:
            "As-salamu alaykum! I'm your Islamic knowledge assistant. To enable AI responses, please configure your OpenAI API key in the environment variables. In the meantime, I can tell you that the Quran, Hadith, Adhkar and Prayer Times features work fully without any API key.",
        },
      });
    }

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      }),
    });

    if (!res.ok) {
      const errData = await res.text();
      console.error("OpenAI API error:", res.status, errData);
      return NextResponse.json(
        { error: `AI service error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const message = data.choices?.[0]?.message;

    if (!message) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
  }
}
