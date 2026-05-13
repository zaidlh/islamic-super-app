import { Router, type Request, type Response } from "express";
import * as prayerService from "../services/prayerService.js";

const router = Router();

// GET /api/prayer?lat=...&lng=...&method=...
// GET /api/prayer?city=...&country=...&method=...
router.get("/", async (req: Request, res: Response) => {
  const { lat, lng, city, country, method } = req.query as Record<string, string>;
  const methodId = parseInt(method ?? "3") || 3;

  try {
    let data;

    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);

      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ status: "error", error: "Invalid coordinates" });
      }

      data = await prayerService.getPrayerTimesByCoords(latitude, longitude, methodId);
    } else if (city && country) {
      data = await prayerService.getPrayerTimesByCity(city, country, methodId);
    } else {
      // Default to Mecca
      data = await prayerService.getPrayerTimesByCity("Mecca", "Saudi Arabia", methodId);
    }

    res.json({ status: "success", data });
  } catch (err) {
    res.status(500).json({ status: "error", error: String(err) });
  }
});

export default router;
