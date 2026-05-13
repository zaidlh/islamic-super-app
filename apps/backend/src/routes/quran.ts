import { Router, type Request, type Response } from "express";
import * as quranService from "../services/quranService.js";

const router = Router();

// GET /api/quran/chapters
router.get("/chapters", async (_req: Request, res: Response) => {
  try {
    const chapters = await quranService.getChapters();
    res.json({ status: "success", data: chapters });
  } catch (err) {
    res.status(500).json({ status: "error", error: String(err) });
  }
});

// GET /api/quran/chapters/:id
router.get("/chapters/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "0");
  if (isNaN(id) || id < 1 || id > 114) {
    return res.status(400).json({ status: "error", error: "Invalid surah number (1-114)" });
  }
  try {
    const chapter = await quranService.getChapter(id);
    res.json({ status: "success", data: chapter });
  } catch (err) {
    res.status(500).json({ status: "error", error: String(err) });
  }
});

// GET /api/quran/verses/:surahId
router.get("/verses/:surahId", async (req: Request, res: Response) => {
  const surahId = parseInt(req.params.surahId ?? "0");
  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    return res.status(400).json({ status: "error", error: "Invalid surah number" });
  }

  const page = parseInt(req.query.page as string ?? "1");
  const perPage = Math.min(parseInt(req.query.per_page as string ?? "50"), 300);

  try {
    const data = await quranService.getVerses(surahId, page, perPage);
    res.json({ status: "success", data });
  } catch (err) {
    res.status(500).json({ status: "error", error: String(err) });
  }
});

// GET /api/quran/search?q=...
router.get("/search", async (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query?.trim()) {
    return res.status(400).json({ status: "error", error: "Query parameter 'q' is required" });
  }

  try {
    const results = await quranService.searchQuran(query);
    res.json({ status: "success", data: results });
  } catch (err) {
    res.status(500).json({ status: "error", error: String(err) });
  }
});

export default router;
