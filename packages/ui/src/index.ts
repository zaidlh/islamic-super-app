// Shared UI primitives re-exported from the web app's components
// In a full monorepo these would be extracted here as truly reusable primitives

export const THEME_COLORS = {
  dark: {
    bg: "#0A0A0A",
    surface: "#111111",
    border: "#1E1E1E",
    primary: "#C9A96E",
    primaryHover: "#D4B483",
    text: "#FAFAF8",
    textMuted: "#888888",
    textSubtle: "#555555",
  },
  light: {
    bg: "#FAFAF8",
    surface: "#FFFFFF",
    border: "#E8E4DC",
    primary: "#9B7A2E",
    primaryHover: "#7A5E1E",
    text: "#0A0A0A",
    textMuted: "#666666",
    textSubtle: "#999999",
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Theme = "dark" | "light" | "system";
