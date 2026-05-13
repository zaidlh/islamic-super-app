import "dotenv/config";
import express from "express";
import { corsMiddleware } from "./middleware/cors.js";
import { apiRateLimit } from "./middleware/rateLimit.js";
import quranRoutes from "./routes/quran.js";
import hadithRoutes from "./routes/hadith.js";
import adhkarRoutes from "./routes/adhkar.js";
import prayerRoutes from "./routes/prayer.js";
import aiRoutes from "./routes/ai.js";

const app = express();
const PORT = parseInt(process.env.PORT ?? "3001");

// Middleware
app.use(corsMiddleware);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(apiRateLimit);

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Islamic Super App API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/quran", quranRoutes);
app.use("/api/hadith", hadithRoutes);
app.use("/api/adhkar", adhkarRoutes);
app.use("/api/prayer", prayerRoutes);
app.use("/api/ai", aiRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ status: "error", error: "Route not found" });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ status: "error", error: "Internal server error" });
});

// Start
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║       🕌 Islamic Super App — Backend API         ║
║   Running on http://localhost:${PORT}              ║
╚══════════════════════════════════════════════════╝

Routes:
  GET  /health
  GET  /api/quran/chapters
  GET  /api/quran/chapters/:id
  GET  /api/quran/verses/:surahId
  GET  /api/quran/search?q=...
  GET  /api/hadith/:collection
  GET  /api/hadith/:collection/search?q=...
  GET  /api/hadith/:collection/random
  GET  /api/prayer?lat=...&lng=...
  POST /api/ai/chat
`);
});

export default app;
