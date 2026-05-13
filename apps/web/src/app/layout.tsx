import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | Islamic Super App",
    default: "Islamic Super App — Quran, Hadith, Adhkar & More",
  },
  description:
    "Your complete Islamic companion. Read the Quran with translation, browse authentic Hadith, perform daily Adhkar, check Prayer Times, and consult the AI Islamic Assistant.",
  keywords: [
    "Quran",
    "Hadith",
    "Islam",
    "Prayer Times",
    "Adhkar",
    "Dua",
    "Muslim",
    "Islamic App",
    "Quran Reader",
  ],
  authors: [{ name: "Islamic Super App" }],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Islamic Super App",
    description: "Your complete Islamic companion — Quran, Hadith, Adhkar, Prayer Times, and AI",
    siteName: "Islamic Super App",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen bg-[var(--bg)]">
            {/* Sidebar — visible on desktop */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex flex-col flex-1 min-w-0 lg:ml-64">
              <Header />
              <main className="flex-1 px-4 py-6 md:px-6 pb-24 lg:pb-6">
                {children}
              </main>
            </div>

            {/* Bottom nav — visible on mobile */}
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
