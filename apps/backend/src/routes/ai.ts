import { Router, type Request, type Response } from "express";

const router = Router();

const SYSTEM_PROMPT = `You are an Islamic knowledge assistant specializing in:
- The Holy Quran (Tafsir, meaning, context)
- Hadith sciences and major collections
- Islamic jurisprudence (Fiqh) across madhabs
- Islamic history and the Prophet's life ﷺ
- Islamic theology (Aqeedah) and spirituality
- Daily Islamic practice and ethics

Always cite sources, acknowledge scholarly differences, and defer to qualified scholars for fatwas.`;

// POST /api/ai/chat
router.post("/chat", async (req: Request, res: Response) => {
  const { messages, model = "gpt-4o-mini" } = req.body as {
    messages?: Array<{ role: string; content: string }>;
    model?: string;
  };

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ status: "error", error: "Invalid messages format" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENAI_API_BASE_URL ?? "https://api.openai.com/v1";

  if (!apiKey) {
    return res.json({
      status: "success",
      data: {
        role: "assistant",
        content:
          "As-salamu alaykum! The AI assistant requires an OpenAI API key to function. Please configure OPENAI_API_KEY in your environment.",
      },
    });
  }

  try {
    const openaiRes = await fetch(`${baseUrl}/chat/completions`, {
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
      }),
    });

    if (!openaiRes.ok) {
      throw new Error(`OpenAI API error: ${openaiRes.status}`);
    }

    const data = await openaiRes.json() as {
      choices?: Array<{ message: { role: string; content: string } }>;
    };
    const message = data.choices?.[0]?.message;

    res.json({ status: "success", data: message });
  } catch (err) {
    res.status(500).json({ status: "error", error: String(err) });
  }
});

export default router;
