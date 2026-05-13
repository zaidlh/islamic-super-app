import { Router, type Request, type Response } from "express";
import * as hadithService from "../services/hadithService.js";

const router = Router();

// GET /api/hadith/:collection
router.get("/:collection", async (req: Request, res: Response) => {
  const { collection } = req.params;
  const page = parseInt(req.query.page as string ?? "1");
  const limit = Math.min(parseInt(req.query.limit as string ?? "20"), 100);

  try {
    const hadiths = await hadithService.getCollection(collection!);
    const start = (page - 1) * limit;
    const paginated = hadiths.slice(start, start + limit);

    res.json({
      status: "success",
      data: paginated,
      pagination: {
        page,
        limit,
        total: hadiths.length,
        totalPages: Math.ceil(hadiths.length / limit),
      },
    });
  } catch (err) {
    res.status(err instanceof Error && err.message.includes("Invalid") ? 400 : 500).json({
      status: "error",
      error: String(err),
    });
  }
});

// GET /api/hadith/:collection/search?q=...
router.get("/:collection/search", async (req: Request, res: Response) => {
  const { collection } = req.params;
  const query = req.query.q as string;
  const limit = Math.min(parseInt(req.query.limit as string ?? "20"), 100);

  if (!query?.trim()) {
    return res.status(400).json({ status: "error", error: "Query parameter 'q' is required" });
  }

  try {
    const results = await hadithService.searchCollection(collection!, query, limit);
    res.json({ status: "success", data: results, query });
  } catch (err) {
    res.status(500).json({ status: "error", error: String(err) });
  }
});

// GET /api/hadith/:collection/random
router.get("/:collection/random", async (req: Request, res: Response) => {
  const { collection } = req.params;
  try {
    const hadith = await hadithService.getRandomHadith(collection!);
    res.json({ status: "success", data: hadith });
  } catch (err) {
    res.status(500).json({ status: "error", error: String(err) });
  }
});

// GET /api/hadith/:collection/:number
router.get("/:collection/:number", async (req: Request, res: Response) => {
  const { collection, number } = req.params;
  const hadithNumber = parseInt(number!);

  if (isNaN(hadithNumber)) {
    return res.status(400).json({ status: "error", error: "Invalid hadith number" });
  }

  try {
    const hadith = await hadithService.getHadithByNumber(collection!, hadithNumber);
    if (!hadith) return res.status(404).json({ status: "error", error: "Hadith not found" });
    res.json({ status: "success", data: hadith });
  } catch (err) {
    res.status(500).json({ status: "error", error: String(err) });
  }
});

export default router;
