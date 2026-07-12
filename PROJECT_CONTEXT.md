# Pathloom — Project Context

> **Living Document** — A single-file snapshot of the entire project state.  
> Designed for AI agents, new developers, and anyone needing rapid orientation.  
> **Last Updated:** July 12, 2026

---

## Identity

| Field | Value |
|-------|-------|
| **Project Name** | Pathloom |
| **Repository** | `Shub-eteral/pathloom` |
| **Tagline** | *"From Where You Are -> To Where You Want To Be"* |
| **Purpose** | AI-powered Career, Study & Global Opportunity Intelligence Platform |
| **Core Question** | *"Given who I am today, what is the best path to the future I want?"* |
| **Version** | v2.1 |
| **Status** | In Development |
| **Started** | June 18, 2026 |
| **Target Launch** | August 2026 |
| **Dev Days Elapsed** | ~24 of 40 |
| **Overall Completion** | ~45% |

---

## Tech Stack

| Layer | Technology | Version | Status |
|-------|-----------|---------|--------|
| **Frontend Framework** | React | 19.2.6 | Active |
| **Routing** | React Router | 7.x | Active |
| **Build Tool** | Vite | 8.0.12 | Active |
| **CSS** | Custom Design System ("Linen") | v2.1 | Active |
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
| **Career Intelligence** | ~55% | Analysis, recommendations, comparison, readiness scoring, 74 roles across 15 domains, global USD salaries | AI coach, resume analyzer, 5-year planner, market trends |
| **Study Intelligence** | ~80% | Academic profile, university finder (58 universities), admission predictor, scholarship matching (45 scholarships), country strategy (20 countries), 43 career goals | Study roadmap, visa planner, AI study coach |
| **Global Opportunity** | ~35% | Country strategy with 20 countries, match scoring, upcoming feature previews | Immigration intelligence, migration planner, global salary, opportunity scoring |
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
- **"Linen" Design System:** Custom CSS token system with dark/light themes, section-contextual accent colors (Career=amber, Study=green, Global=blue, Profile=violet).
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
| `/` | `DashboardPage` | Overview hub with profile completeness and navigation cards |
| `/career` | `CareerAnalysisPage` | Target role selection and skills-readiness fit analysis |
| `/career/recommend` | `CareerRecommendPage` | Recommended alternative paths with AI insights |
| `/career/compare` | `CareerComparePage` | Side-by-side career comparison dashboard and chart |
| `/study` | `StudyProfilePage` | Detailed academic profile, test scores, and doc checklist |
| `/study/universities` | `UniversityFinderPage` | Filterable university search and admission eligibility predictor |
| `/study/scholarships` | `ScholarshipPage` | Scholarship match scoring and application tips |
| `/study/countries` | `CountryStrategyPage` | Multi-destination category scoring (Safe/Target/Reach) |
| `/global` | `GlobalOpportunityPage` | Global opportunity planner preview |
| `/profile` | `ProfilePage` | Global profile overview, export, import, and data reset |

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
- **`frontend/src/styles/design-system.css`** — Centralized "Linen" design system (500+ lines of tokens, dark/light themes)
- **`frontend/src/index.css`** — Typography setup (Plus Jakarta Sans, JetBrains Mono)
- **`frontend/src/contexts/`** — `ApiContext.jsx`, `ProfileContext.jsx`, `ThemeContext.jsx`
- **`frontend/src/hooks/`** — `useCareerAnalysis.js`, `useStudyEligibility.js`, `useProfileExport.js`, `usePageTitle.js`
- **`frontend/src/components/ui/`** — 11 UI primitive components (Panel, Button, ThemeToggle, ThreadGauge, etc.)
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

## Design System: "Linen"

The "Linen" design system replaced the original "Thread Gauge" system in July 2026.

**Typography:**
- Plus Jakarta Sans (display/headings) — soft rounded terminals
- JetBrains Mono (data labels/stats) — monospaced for precision

**Section Accent Colors:**

| Section | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Career | #C67D3A (amber) | #D99A5C |
| Study | #3A8A6E (green) | #5DB896 |
| Global | #4A72A8 (blue) | #6B9AD4 |
| Profile | #7C6BA8 (violet) | #A08ED0 |

**Theme:** Dark/light mode with system preference detection and localStorage persistence. Sun/moon toggle in header.

**Layout:** Fixed header with accent gradient line, collapsible sidebar with pill-shaped active indicators, minimal footer.

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

**Currently working on:** Data quality improvements and backend expansion

**Recently completed:**
1. Complete UI redesign ("Linen" design system) with dark/light theme support
2. Massive data expansion (74 roles, 140 skills, 58 universities, 45 scholarships, 20 countries)
3. All role-skill mappings completed (450+ mappings)
4. Global USD salary data for all 74 roles

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
