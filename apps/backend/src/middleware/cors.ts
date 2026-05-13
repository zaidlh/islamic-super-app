import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.NEXT_PUBLIC_APP_URL,
].filter(Boolean) as string[];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === "development") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
