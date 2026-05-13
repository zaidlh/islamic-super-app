import rateLimit from "express-rate-limit";

export const apiRateLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? "60000"),
  max: parseInt(process.env.RATE_LIMIT_MAX ?? "100"),
  message: {
    status: "error",
    error: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const strictRateLimit = rateLimit({
  windowMs: 60000,
  max: 20,
  message: {
    status: "error",
    error: "Rate limit exceeded for this endpoint.",
  },
});
