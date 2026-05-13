import { Router, type Request, type Response } from "express";

const router = Router();

// Static adhkar data (in a full impl, this would come from the database)
const CATEGORIES = [
  { id: "morning", name: "Morning Adhkar", arabic_name: "أذكار الصباح" },
  { id: "evening", name: "Evening Adhkar", arabic_name: "أذكار المساء" },
  { id: "sleep", name: "Before Sleep", arabic_name: "أذكار النوم" },
  { id: "prayer", name: "After Prayer", arabic_name: "أذكار بعد الصلاة" },
  { id: "eating", name: "Eating & Drinking", arabic_name: "أذكار الأكل" },
  { id: "travel", name: "Travel", arabic_name: "أذكار السفر" },
  { id: "distress", name: "Distress & Anxiety", arabic_name: "الكرب والهم" },
  { id: "mosque", name: "Entering Mosque", arabic_name: "دخول المسجد" },
];

// GET /api/adhkar/categories
router.get("/categories", (_req: Request, res: Response) => {
  res.json({ status: "success", data: CATEGORIES });
});

// GET /api/adhkar/:category
router.get("/:category", async (req: Request, res: Response) => {
  const { category } = req.params;

  if (category === "categories") {
    return res.json({ status: "success", data: CATEGORIES });
  }

  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) {
    return res.status(404).json({ status: "error", error: "Category not found" });
  }

  try {
    // Fetch from Hisnul Muslim source or return local data
    res.json({
      status: "success",
      data: {
        category: cat,
        message: "Adhkar data is served from the frontend package for optimal performance",
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", error: String(err) });
  }
});

export default router;
