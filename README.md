# 🕌 Islamic Super App

A production-grade, full-featured Islamic Super App built as a modern monorepo. Combines Quran reader, Hadith browser, Adhkar & Dua, Prayer Times, Qibla direction, and an AI Islamic Assistant — all in one beautifully crafted application.

## ✨ Features

- **📖 Quran Reader** — Full Quran with Arabic text, transliteration, multiple translations, Tafsir, and audio recitation
- **📚 Hadith Browser** — Browse Bukhari, Muslim, 40 Nawawi, and more collections with search
- **🤲 Adhkar & Dua** — Morning/evening adhkar, situational duas from Hisnul Muslim
- **🕌 Prayer Times** — Accurate prayer times using geolocation with multiple calculation methods
- **🧭 Qibla Compass** — Device-based compass pointing toward Mecca
- **🤖 AI Assistant** — Islamic knowledge assistant powered by LLMs
- **📱 PWA Support** — Installable on iOS and Android
- **🌙 Dark/Light Mode** — Premium dark theme with golden accents
- **🌐 RTL Support** — Full Arabic right-to-left text rendering

## 🏗 Architecture

This is a **pnpm + Turborepo** monorepo:

```
apps/
  web/          → Next.js 14 App Router (frontend + API routes)
  backend/      → Node.js Express API (data aggregation & caching)

packages/
  ui/           → Shared UI components
  quran-engine/ → Quran parsing, search, and data logic
  hadith-engine/→ Hadith parsing and search logic
  shared/       → Shared types, utilities, constants
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Install dependencies

```bash
pnpm install
```

### Sync Islamic content data

```bash
pnpm sync:all
```

This fetches and normalizes data from:
- Quran.com API v4
- fawazahmed0/hadith-api (GitHub)
- Hisnul Muslim database
- Aladhan prayer times API

### Start development

```bash
pnpm dev
```

- Web app: http://localhost:3000
- Backend API: http://localhost:3001

### Build for production

```bash
pnpm build
```

## 📦 Data Sources

All Islamic content is fetched from reputable open-source repositories:

| Content | Source |
|---------|--------|
| Quran text | [quran.com API v4](https://quran.com) |
| Quran JSON | [risan/quran-json](https://github.com/risan/quran-json) |
| Hadith | [fawazahmed0/hadith-api](https://github.com/fawazahmed0/hadith-api) |
| Adhkar | [Hisnul Muslim DB](https://github.com/omaralashqar/Hisnul-Muslim-App) |
| Prayer Times | [Aladhan API](https://aladhan.com/prayer-times-api) |

## 🎨 Design System

- **Dark bg**: `#0A0A0A` / **Light bg**: `#FAFAF8`
- **Primary accent**: `#C9A96E` (golden)
- **Font**: Inter (Latin) + System Arabic fonts
- **UI**: Tailwind CSS + shadcn/ui primitives
- **Animation**: Framer Motion

## 🐳 Docker

```bash
# Start all services
docker-compose -f infrastructure/docker/docker-compose.yml up

# Build images
docker build -f infrastructure/docker/Dockerfile.web -t islamic-app-web .
docker build -f infrastructure/docker/Dockerfile.backend -t islamic-app-backend .
```

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example apps/web/.env.local
cp .env.example apps/backend/.env
```

Key variables:
- `OPENAI_API_KEY` — For AI Assistant feature
- `NEXT_PUBLIC_APP_URL` — Public URL of the web app

## 📜 License

This project is open-source and available under the MIT License.

---

*"And We have certainly made the Quran easy for remembrance, so is there any who will remember?"* — Quran 54:17
