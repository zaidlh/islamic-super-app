# 🕌 Islamic Super App

A production-grade, world-class Islamic Super App built as a modern monorepo. The most comprehensive Islamic companion — Quran reader with Tafsir, Hadith browser, Adhkar & Dua, Prayer Times, Qibla, AI Assistant, 99 Names of Allah, Seerah, Prophet Stories, Hajj Guide, Zakat Calculator, Ramadan Planner, Hifz Tracker, Ibadah Dashboard, Tajweed Lessons, Islamic Quiz, and much more — all in one beautifully crafted application.

> *"And We have certainly made the Quran easy for remembrance, so is there any who will remember?"* — Quran 54:17

---

## ✨ Full Feature List

### 📖 Quran & Tafsir
- **Quran Reader** — Full Quran with Arabic (Uthmani script), transliteration, and translations
- **Tafsir** — Verse-by-verse commentary with scholar toggle: Ibn Kathir, Al-Muyassar, Al-Jalalayn
- **Word-by-Word** — Tap any word for root, grammar, and meaning (via Quran.com API)
- **Multiple Translations** — 15+ languages side-by-side (English, Urdu, French, Indonesian, Turkish, Russian, Spanish, German, Malay, and more)
- **Audio Recitation** — 15+ reciters (Alafasy, Abdul Basit, Husary, Minshawi, Maher Al-Muaiqly, etc.) with audio preview and default selection
- **Hifz Tracker** — 30-Juz memorization tracker with per-surah status (Not Started / Learning / Memorized / Needs Review), progress circle, and spaced repetition

### 📚 Hadith
- **Hadith Browser** — Sahih Bukhari, Sahih Muslim, 40 Hadith Nawawi, Abu Dawud, Tirmidhi, Ibn Majah
- **Global Search** — Search Quran + Hadith simultaneously with debounced input and grouped results

### 🤲 Adhkar & Dua
- **Daily Adhkar** — Morning/evening adhkar carousel with Arabic, transliteration, and benefits
- **Dua Collection** — Situational duas from Hisnul Muslim with categories
- **Tasbih Counter** — Digital tasbih with preset dhikr, vibration feedback, custom goals, daily totals, and circular progress ring

### 🕌 Prayer & Qibla
- **Prayer Times** — Accurate geolocation-based prayer times with multiple calculation methods
- **Qibla Compass** — Live device-orientation compass with distance to Mecca, works offline
- **Adhan Alerts** — Push notifications for prayer times

### ✨ 99 Names of Allah (Asma ul Husna)
- All 99 names with Arabic calligraphy, transliteration, meaning, and benefits
- Searchable by name, transliteration, or meaning
- Slide-out detail drawer with reflection text

### 📅 Islamic Calendar (Hijri)
- Live Hijri date via AlAdhan API
- Full calendar with month navigation
- All major Islamic events highlighted: Ramadan, Eid al-Fitr, Eid al-Adha, Ashura, Mawlid al-Nabi, Isra wal-Miraj, Laylat al-Bara'ah, Laylat al-Qadr, Day of Arafah, Islamic New Year

### 📜 Seerah (Prophet's ﷺ Biography)
- 28-event chronological timeline from birth to death
- Alternating desktop timeline layout
- Each event: year/Hijri date, description, location, Quranic reference, companions present
- Filter by major/minor events

### 🌟 Prophet Stories (Qisas Al-Anbiya)
- All 25 prophets mentioned in the Quran
- Full story, Quranic references, lessons learned, period, and mention count
- Slide-out story drawer with Arabic name display

### 💰 Zakat Calculator
- Gold, silver, cash, business inventory, receivable debts, liabilities
- Auto Nisab calculation (87.48g gold / 612.36g silver equivalent)
- Outputs 2.5% Zakat due with pass/fail indication

### 🌙 Ramadan Planner
- Suhoor/Iftar times by city (AlAdhan API)
- 30-Juz reading plan with daily checkbox tracking
- Full ibadah daily checklist (5 prayers + Tarawih + Quran + Dhikr)
- Live countdown to next Ramadan

### 🕋 Hajj & Umrah Guide
- 16 step-by-step manasik for both Hajj and Umrah
- Each step: description, duas (Arabic + transliteration + translation), tips
- Accordion UI with checklist mode — mark steps as completed
- Progress bar

### ☀️ Fasting Tracker
- Log obligatory and voluntary fasts on a monthly calendar
- Track sunnah fasts: 6 Shawwal, Monday/Thursday, Ayyam al-Bid, Day of Arafah, Ashura
- Monthly and yearly stats
- Upcoming recommended fast reminders

### 🎵 Tajweed Lessons
- 15 core rules: Madd, Ghunna, Ikhfa, Idgham, Iqlab, Qalqala, Idhar, Tafkhim, Tarqeeq, Waqf, Sakt, Noon/Meem Mushaddad, Lam Shamsiyyah, Hamzat al-Wasl, Madd Lazim
- Color-coded rule system
- Arabic examples with transliteration
- Mark rules as "learned" with progress tracking

### 🎯 Islamic Quiz
- 30+ questions across 5 categories: Quran, Hadith, History, Fiqh, Prophets
- 10-question sessions with multiple choice (4 options)
- Full explanation shown after each answer
- Score display with emoji feedback

### 📊 Ibadah Tracker (Dashboard)
- Daily prayer checklist: Fajr, Dhuhr, Asr, Maghrib, Isha
- Quran pages read with adjustable daily target and progress bar
- Optional: Sunnah prayers, Tahajjud, Fasting
- 7-day heatmap calendar (GitHub-style contribution graph)

### 📿 Hifz Tracker
- 30-Juz accordion with all surahs per Juz
- 4-status cycle per surah: Not Started → Learning → Memorized → Needs Review
- Overall progress circle (% of 114 surahs memorized)
- Spaced repetition: suggests surahs due for review (memorized >7 days ago)

### 🎯 Spiritual Goals
- Create goals with category, target, unit, frequency (daily/weekly/monthly)
- Progress bar per goal (today's progress vs target)
- One-tap logging with "+1" and "Mark Complete" buttons
- Categories: Quran, Prayer, Dhikr, Fasting, Charity, Other

### 📓 Personal Reflection Journal
- Private entries stored locally (localStorage)
- 30 rotating daily Islamic prompts
- Link entries to an Ayah reference
- Mood tagging (grateful, reflective, hopeful, struggling, peaceful)
- Full-text search

### 🔍 Global Search
- Searches Quran (quran.com API) and Hadith simultaneously
- Debounced with abort controller for fast UX
- Results grouped by type with color-coded badges
- Quick links to all major sections

---

## 🏗 Architecture

This is a **pnpm + Turborepo** monorepo:

```
apps/
  web/              → Next.js 14 App Router (frontend + API routes)
  backend/          → Node.js Express API (data aggregation & caching)

packages/
  ui/               → Shared UI components
  quran-engine/     → Quran parsing, search, and data logic
  hadith-engine/    → Hadith parsing and search logic
  shared/           → Shared types, utilities, constants

apps/web/src/
  app/              → 30+ Next.js pages (App Router)
  components/       → Layout, Quran, Hadith, Prayer, Adhkar, UI components
  data/             → Static Islamic data (names, prophets, seerah, hajj, tajweed)
  store/            → Zustand stores (settings, bookmarks, quran, ibadah, hifz, goals, journal)
  lib/              → API clients (quran, hadith, prayer)
  types/            → TypeScript interfaces
```

---

## 📦 Data Sources

All Islamic content is sourced from reputable open datasets:

| Content | Source |
|---------|--------|
| Quran text & audio | [Quran.com API v4](https://quran.com) |
| Tafsir (Ibn Kathir, Muyassar, Jalalayn) | [Quran.com Tafsirs](https://quran.com/api) |
| Hadith collections | [fawazahmed0/hadith-api](https://github.com/fawazahmed0/hadith-api) |
| Adhkar & Dua | [Hisnul Muslim](https://github.com/omaralashqar/Hisnul-Muslim-App) |
| Prayer times | [AlAdhan API](https://aladhan.com/prayer-times-api) |
| Hijri calendar | [AlAdhan gToH API](https://aladhan.com) |
| Audio reciters | [verses.quran.com CDN](https://verses.quran.com) |

---

## 🎨 Design System

| Token | Dark | Light |
|-------|------|-------|
| Background | `#0A0A0A` | `#FAFAF8` |
| Surface | `#111111` | `#FFFFFF` |
| Elevated | `#1A1A1A` | `#F5F1EA` |
| Primary (Gold) | `#C9A96E` | `#9B7A2E` |
| Border | `#1E1E1E` | `#E8E4DC` |

- **Typography**: Inter (Latin) + Amiri (Arabic)
- **Styling**: Tailwind CSS with custom CSS variables
- **State**: Zustand with localStorage persistence
- **Animations**: CSS keyframes (fadeIn, slideUp, slideInRight, pulseGold)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Install

```bash
git clone https://github.com/zaidlh/islamic-super-app.git
cd islamic-super-app
pnpm install
```

### Sync Islamic content data

```bash
pnpm sync:all
```

Fetches and normalizes:
- Quran text + translations from Quran.com API v4
- Hadith collections from fawazahmed0/hadith-api
- Hisnul Muslim adhkar database
- Prayer times from AlAdhan API

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

---

## 🐳 Docker

```bash
# Start all services
docker-compose -f infrastructure/docker/docker-compose.yml up

# Build images individually
docker build -f infrastructure/docker/Dockerfile.web -t islamic-app-web .
docker build -f infrastructure/docker/Dockerfile.backend -t islamic-app-backend .
```

---

## 🔧 Environment Variables

```bash
cp .env.example apps/web/.env.local
cp .env.example apps/backend/.env
```

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | For AI Islamic Assistant feature |
| `NEXT_PUBLIC_APP_URL` | Public URL of the web app |

---

## 📱 PWA Support

The app is a fully installable Progressive Web App:
- Offline Quran text (cached via service worker)
- Home screen installable on iOS & Android
- Push notification support for prayer time alerts
- Manifest with Islamic theme colors

---

## 🗺️ Page Routes

| Route | Module |
|-------|--------|
| `/` | Home dashboard |
| `/quran` · `/quran/[surah]` | Quran reader |
| `/tafsir` · `/tafsir/[surah]` | Tafsir commentary |
| `/hadith` · `/hadith/[collection]` | Hadith browser |
| `/adhkar` | Daily Adhkar |
| `/dua` | Dua collection |
| `/prayer` | Prayer times + Qibla |
| `/names` | 99 Names of Allah |
| `/prophets` | Prophet stories |
| `/seerah` | Seerah timeline |
| `/calendar` | Hijri calendar |
| `/tajweed` | Tajweed lessons |
| `/quiz` | Islamic quiz |
| `/zakat` | Zakat calculator |
| `/ramadan` | Ramadan planner |
| `/hajj` | Hajj & Umrah guide |
| `/fasting` | Fasting tracker |
| `/tracker` | Ibadah tracker |
| `/hifz` | Hifz (memorization) tracker |
| `/goals` | Spiritual goals |
| `/journal` | Reflection journal |
| `/translations` | Multi-language Quran |
| `/reciters` | Audio reciters library |
| `/search` | Global search |

---

## 📜 License

This project is open-source under the **MIT License**.

---

*Built with love for the Ummah. May Allah accept it as a means of benefit. آمين*
