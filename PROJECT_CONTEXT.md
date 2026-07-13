# Pathloom — Project Context

> **Living Document** — A single-file snapshot of the entire project state.  
> Designed for AI agents, new developers, and anyone needing rapid orientation.  
> **Last Updated:** July 13, 2026

---

## Identity

| Field | Value |
|-------|-------|
| **Project Name** | Pathloom |
| **Repository** | `Shub-eteral/pathloom` |
| **Tagline** | *"From Where You Are -> To Where You Want To Be"* |
| **Purpose** | AI-powered Career, Study & Global Opportunity Intelligence Platform |
| **Core Question** | *"Given who I am today, what is the best path to the future I want?"* |
| **Version** | v2.2 |
| **Status** | In Development |
| **Started** | June 18, 2026 |
| **Target Launch** | August 2026 |
| **Dev Days Elapsed** | ~24 of 40 |
| **Overall Completion** | ~50% |

---

## Tech Stack

| Layer | Technology | Version | Status |
|-------|-----------|---------|--------|
| **Frontend Framework** | React | 19.2.6 | Active |
| **Routing** | React Router | 7.x | Active |
| **Build Tool** | Vite | 8.0.16 | Active |
| **CSS** | Custom Design System ("Meridian") | v2.2 | Active |
| **Backend Framework** | FastAPI (Python) | Latest | Active |
| **ASGI Server** | Uvicorn | Latest | Active |
| **Database (Current)** | CSV flat files | -- | Active (temporary) |
| **Database (Planned)** | PostgreSQL via Supabase | -- | Schema ready, not migrated |
| **AI (Current)** | Template-based string generation | -- | Placeholder |
| **AI (Planned)** | Google Gemini API | -- | Not started |
| **Frontend Hosting** | Vercel (planned) | -- | Not deployed |
| **Backend Hosting** | Railway (planned) | -- | Not deployed |

---

## Module Status

| Module | Completion | What Works | What's Missing |
|--------|-----------|------------|----------------|
| **Career Intelligence** | ~60% | Analysis, recommendations, comparison, readiness scoring, 74 roles across 15 domains, global USD salaries, Meridian UX integration | AI coach, resume analyzer, 5-year planner, market trends |
| **Study Intelligence** | ~85% | Academic profile, university finder (58 universities), admission predictor, scholarship matching (45 scholarships), country strategy (20 countries), 43 career goals, Meridian UX integration | Study roadmap, visa planner, AI study coach |
| **Global Opportunity** | ~40% | Country strategy with 20 countries, match scoring, upcoming feature previews, Meridian UX integration | Immigration intelligence, migration planner, global salary, opportunity scoring |
| **AI Future Planner** | 0% | Nothing | Everything (requires all other modules + Gemini API) |

---

## Architecture Summary

```
Frontend (React + Vite + Router 7)  <->  Backend (FastAPI)  <->  Data (CSV files)
           Port 5173                       Port 8000            database/ directory

Study intelligence data lives in frontend/src/data/ (static JS modules)
Career intelligence data served via REST API from CSV files
```

**Key architecture facts:**
- **Modular Frontend Architecture:** Decomposed into nested folders (`components/ui/`, `components/layout/`, `contexts/`, `hooks/`, `pages/`).
- **"Meridian" Design System:** Custom CSS token system with radial gauges, glassmorphic panels, gradient section accents (Career=amber→rose, Study=emerald→cyan, Global=indigo→violet, Profile=pink→orange).
- **Page-Based Navigation:** React Router 7 with 11 routes, section-aware class wrapping in App.jsx.
- **Fixed Sidebar Layout:** Collapsible sidebar toggleable by clicking the header logo, icon-only mode.
- **Theme System:** ThemeContext with dark/light toggle, system preference detection, localStorage persistence.
- **State Management:** React Context (ApiContext for server sync, ProfileContext for user profile, ThemeContext for theme).
- **Core logic separation:** API engines and eligibility rules isolated in custom React hooks.
- CORS is set to `allow_origins=["*"]` (open to all).
- No user authentication, no persistent database-backed user profiles (local profile import/export only).

---

## Navigation Routes (All Active)

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/` | `DashboardPage` | Command center with radial profile completeness gauge and module cards |
| `/career` | `CareerAnalysisPage` | Target role selection, skills-readiness fit analysis with radial gauges |
| `/career/recommend` | `CareerRecommendPage` | Recommended alternative paths with AI insights and comparison |
| `/career/compare` | `CareerComparePage` | Side-by-side career comparison dashboard and animated bar charts |
| `/study` | `StudyProfilePage` | Detailed academic profile, test scores, and doc checklist |
| `/study/universities` | `UniversityFinderPage` | Filterable university search and admission eligibility predictor |
| `/study/scholarships` | `ScholarshipPage` | Scholarship match scoring and application recommendations |
| `/study/countries` | `CountryStrategyPage` | Multi-destination category scoring (Safe/Target/Reach) |
| `/global` | `GlobalOpportunityPage` | Global opportunity planner preview with animated orb |
| `/profile` | `ProfilePage` | Global profile completeness radial gauge, export, import, and data reset |

---

## Data Coverage

| Dataset | Records | Coverage | Gaps |
|---------|---------|----------|------|
| Roles | 74 | All 15 domains covered | Complete |
| Skills | 140 | Programming, web, data, ML/AI, cloud, security, business, design, engineering, healthcare, education, legal, HR, sales | Complete |
| Role-Skill Mappings | 450+ | All 74 roles fully mapped (5-8 skills each) | Complete |
| Career Info | 74 | Global USD salary ranges | No multi-country breakdown |
| Countries (frontend) | 20 | Comprehensive study destination data | Complete for target countries |
| Universities | 58 | Real universities with programs, rankings, and requirements | Complete |
| Scholarships | 45 | Real scholarships with eligibility and deadlines | Complete |
| Career Goals | 43 | Value/label pairs mapping to university programs | Complete |
| Cost of Living | 0 | -- | Not started |
| Visa Routes | 0 | -- | Not started |
| Market Trends | 0 | -- | Not started |

---

## Key Files Quick Reference

### Backend
- **`backend/app.py`** — FastAPI application, all routes, CORS config, data loading

### Frontend Architecture
- **`frontend/src/App.jsx`** — Main application shell, routing definitions, section-aware class wrapping
- **`frontend/src/main.jsx`** — Wrap application in BrowserRouter, ThemeProvider, ApiProvider, and ProfileProvider
- **`frontend/src/styles/design-system.css`** — Centralized "Meridian" design system (990+ lines of custom tokens, radial gauges, layouts)
- **`frontend/src/index.css`** — Typography setup (Space Grotesk, Inter, JetBrains Mono)
- **`frontend/src/contexts/`** — `ApiContext.jsx`, `ProfileContext.jsx`, `ThemeContext.jsx`
- **`frontend/src/hooks/`** — `useCareerAnalysis.js`, `useStudyEligibility.js`, `useProfileExport.js`, `usePageTitle.js`
- **`frontend/src/components/ui/`** — UI primitive components (Panel, Button, ThemeToggle, ThreadGauge, RadialGauge, GlowBadge, etc.)
- **`frontend/src/components/layout/`** — Layout structure (Header, Sidebar, Footer)
- **`frontend/src/pages/`** — Page views for Career, Study, Global, Dashboard, Profile

### Frontend Data
- **`frontend/src/data/countries.js`** — Rich study metrics for 20 countries
- **`frontend/src/data/universities.js`** — 58 universities with course details and entry requirements
- **`frontend/src/data/scholarships.js`** — 45 scholarships with eligibility and application dates
- **`frontend/src/data/careerGoals.js`** — 43 career goals as value/label objects
- **`frontend/src/data/examConfig.js`** — Score ranges and configurations for SAT, IELTS, TOEFL, GRE, etc.
- **`frontend/src/data/constants.js`** — Common form selections (budget, citizenship, intake)

---

## Design System: "Meridian"

The "Meridian" design system replaced the "Linen" system in July 2026.

**Typography:**
- Space Grotesk (display/headings) — clean, modern, mathematical feel
- Inter (body) — maximum readability
- JetBrains Mono (data labels/stats) — monospaced for precision

**Section Accent Gradients:**

| Section | Light Mode Gradient | Dark Mode Gradient |
|---------|---------------------|--------------------|
| Career | Amber → Rose | Amber → Rose |
| Study | Emerald → Cyan | Emerald → Cyan |
| Global | Indigo → Violet | Indigo → Violet |
| Profile | Pink → Orange | Pink → Orange |

**Theme:** Dark/light mode with system preference detection and localStorage persistence. Sun/moon toggle in header.

**Layout:** Frosted glass header with `backdrop-filter: blur`, collapsible sidebar with glow pill indicators, section-accented gradients and radial gauge scores.

---

## Known Issues & Technical Debt

| Priority | Issue | Status |
|----------|-------|--------|
| High | CSV database — must migrate to PostgreSQL before production | Seed/schema ready |
| Medium | "AI" is template strings, not actual AI | Planned |
| Medium | No authentication or user accounts | Planned |
| Medium | No test coverage (zero tests) | Planned |
| Medium | CORS wildcard `allow_origins=["*"]` | Planned |
| Low | Countries/universities duplicated between backend CSV and frontend JS | Planned |
| Low | No error boundaries in frontend | Planned |

---

## Development Environment

| Requirement | Version |
|------------|---------|
| Node.js | >= 18.x |
| Python | >= 3.10 |
| npm | >= 9.x |

### Quick Start

```bash
# Backend
cd backend && pip install fastapi uvicorn && uvicorn app:app --reload

# Frontend (separate terminal)
cd frontend && npm install && npm run dev
```

Backend: http://127.0.0.1:8000 · Frontend: http://localhost:5173

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE` | `http://127.0.0.1:8000` | Backend API URL (frontend) |
| `SUPABASE_URL` | -- | Supabase project URL (seed script) |
| `SUPABASE_KEY` | -- | Supabase service role key (seed script) |
| `GEMINI_API_KEY` | -- | Google Gemini API key (planned) |

---

## Active Development Focus

**Currently working on:** Planning Supabase PostgreSQL migration & Gemini API integration

**Recently completed:**
1. Complete UI/UX redesign ("Meridian" design system) with glassmorphism, radial progress gauges, and gradient aesthetics
2. Complete page layouts and component system restyling across all 11 pages
3. Expanded data set integration for roles, skills, universities, scholarships, and countries

**Next priorities:**
1. Migrate from CSV flat files to PostgreSQL database (Supabase)
2. Integrate Google Gemini API for AI Coaches and dynamic insights
3. Add immigration/visa pathway data
4. Cost of living simulator

---

## Documentation Map

| Document | Path | Purpose |
|----------|------|---------|
| This file | `PROJECT_CONTEXT.md` | Living project state snapshot |
| Doc index | `docs/INDEX.md` | Documentation navigation hub |
| README | `README.md` | Project overview & quick start |
| PRD | `docs/PRD.md` | Product requirements & user stories |
| System Design | `docs/SYSTEM_DESIGN.md` | Architecture diagrams & data flows |
| Architecture | `docs/ARCHITECTURE.md` | Technical ADRs |
| API Reference | `docs/API_REFERENCE.md` | FastAPI endpoint documentation |
| Data Dictionary | `docs/DATA_DICTIONARY.md` | Database models & schemas |
| vision | `docs/vision.md` | MVP scope & target goals |
| roadmap | `docs/roadmap.md` | Day-by-day development timeline |
| Progress | `PROJECT_PROGRESS.md` | Module-by-module tracker |

---

> **This file should be updated after every significant change to the project.**
