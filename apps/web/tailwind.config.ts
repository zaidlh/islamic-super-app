import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FDF8EF",
          100: "#F9EDCF",
          200: "#F2D99E",
          300: "#E8C06A",
          400: "#D9A83C",
          500: "#C9A96E",
          600: "#B8921A",
          700: "#9B7A2E",
          800: "#7A5E1E",
          900: "#5C4615",
        },
        dark: {
          bg: "#0A0A0A",
          surface: "#111111",
          elevated: "#1A1A1A",
          border: "#1E1E1E",
          hover: "#222222",
        },
        light: {
          bg: "#FAFAF8",
          surface: "#FFFFFF",
          elevated: "#F5F1EA",
          border: "#E8E4DC",
          hover: "#F0EBE0",
        },
      },
      fontFamily: {
        arabic: [
          "Amiri",
          "Traditional Arabic",
          "Arabic Typesetting",
          "Scheherazade New",
          "Noto Naskh Arabic",
          "serif",
        ],
        latin: [
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      fontSize: {
        "arabic-sm": ["1.25rem", { lineHeight: "2.5" }],
        "arabic-base": ["1.5rem", { lineHeight: "2.75" }],
        "arabic-lg": ["1.875rem", { lineHeight: "3" }],
        "arabic-xl": ["2.25rem", { lineHeight: "3.25" }],
        "arabic-2xl": ["2.75rem", { lineHeight: "3.5" }],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201, 169, 110, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(201, 169, 110, 0)" },
        },
      },
      boxShadow: {
        "gold-sm": "0 1px 3px rgba(201, 169, 110, 0.2)",
        "gold-md": "0 4px 12px rgba(201, 169, 110, 0.15)",
        "gold-lg": "0 8px 24px rgba(201, 169, 110, 0.12)",
        "dark-sm": "0 1px 3px rgba(0, 0, 0, 0.5)",
        "dark-md": "0 4px 12px rgba(0, 0, 0, 0.4)",
        "dark-lg": "0 8px 24px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
