# 🧠 Pathloom — Project Context

> **Living Document** — A single-file snapshot of the entire project state.  
> Designed for AI agents, new developers, and anyone needing rapid orientation.  
> **Last Updated:** July 5, 2026

---

## Identity

| Field | Value |
|-------|-------|
| **Project Name** | Pathloom |
| **Repository** | `Shub-eteral/pathloom` |
| **Tagline** | *"From Where You Are → To Where You Want To Be"* |
| **Purpose** | AI-powered Career, Study & Global Opportunity Intelligence Platform |
| **Core Question** | *"Given who I am today, what is the best path to the future I want?"* |
| **Version** | v0.90 |
| **Status** | In Development |
| **Started** | June 18, 2026 |
| **Target Launch** | August 2026 |
| **Dev Days Elapsed** | ~17 of 40 |
| **Overall Completion** | ~38% |

---

## Tech Stack

| Layer | Technology | Version | Status |
|-------|-----------|---------|--------|
| **Frontend Framework** | React | 19.2.6 | ✅ Active |
| **Routing** | React Router | 7.x | ✅ Active |
| **Build Tool** | Vite | 8.0.12 | ✅ Active |
| **CSS Framework** | Tailwind CSS | 4.3.1 | ✅ Active |
| **Backend Framework** | FastAPI (Python) | Latest | ✅ Active |
| **ASGI Server** | Uvicorn | Latest | ✅ Active |
| **Database (Current)** | CSV flat files | — | ✅ Active (temporary) |
| **Database (Planned)** | PostgreSQL via Supabase | — | 🔲 Schema ready, not migrated |
| **AI (Current)** | Template-based string generation | — | ⚠️ Placeholder |
| **AI (Planned)** | Google Gemini API | — | 🔲 Not started |
| **Frontend Hosting** | Vercel (planned) | — | 🔲 Not deployed |
| **Backend Hosting** | Railway (planned) | — | 🔲 Not deployed |

---

## Module Status

| Module | Completion | What Works | What's Missing |
|--------|-----------|------------|----------------|
| **💼 Career Intelligence** | ~50% | Analysis, recommendations, comparison, readiness scoring, page-based layout | Multi-country salary, AI coach, resume analyzer, 5-year planner, market trends |
| **🎓 Study Intelligence** | ~75% | Academic profile form options, university finder, admission predictor, scholarship matching, country strategy, document readiness checklist, PhD fields | Study roadmap timeline, visa planner timeline, AI study coach |
| **🌎 Global Opportunity** | ~30% | Navigation placeholder, upcoming feature list, expanded country strategy page | Immigration intelligence, migration planner, global salary, opportunity scoring |
| **🤖 AI Future Planner** | 0% | Nothing | Everything (requires all other modules + Gemini API) |

---

## Architecture Summary

```
Frontend (React + Vite + Router 7)  ←→  Backend (FastAPI)  ←→  Data (CSV files)
           Port 5173                       Port 8000            database/ directory

Study intelligence data lives in frontend/src/data/ (static JS modules)
Career intelligence data served via REST API from CSV files
```

**Key architecture facts:**
- **Modular Frontend Architecture:** Decomposed from a monolithic file into nested folders (`components/ui/`, `components/layout/`, `contexts/`, `hooks/`, `pages/`).
- **Page-Based Navigation:** Implemented React Router 7 with 11 custom routes.
- **Fixed Sidebar Layout:** A fixed, collapsible sidebar toggleable by clicking the header logo.
- **State Management:** Handled via React Context (`ApiContext` for server sync, `ProfileContext` for user profile state).
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
| `/global` | `GlobalOpportunityPage` | Global salary and immigration planner preview |
| `/profile` | `ProfilePage` | Global profile overview, export, import, and data reset |

---

## Data Coverage

| Dataset | Records | Coverage | Gaps |
|---------|---------|----------|------|
| Roles | 15 | 4 domains covered | ✅ Complete for MVP |
| Skills | 20 | Technical skills only | Missing: soft skills, domain-specific |
| Role-Skill Mappings | 45 | 9 of 15 roles | **6 roles have ZERO mappings** |
| Career Info | 15 | India-only salary (LPA) | No multi-country salary |
| Countries (CSV) | 10 | Basic catalog only | No intelligence data |
| Countries (frontend) | 10 | Rich study destination data | Complete for 10 countries |
| Universities | 20 | Rich programs, tuition & requirements | 2 universities per target country |
| Scholarships | 16 | Rich eligibility & deadlines | Covers all target countries |
| Cost of Living | 0 | — | Not started |
| Visa Routes | 0 | — | Not started |
| Market Trends | 0 | — | Not started |

---

## Key Files Quick Reference

### Backend
- **`backend/app.py`** — FastAPI application, all routes, CORS config, data loading

### Frontend Architecture
- **`frontend/src/App.jsx`** — Main application shell and routing definitions
- **`frontend/src/main.jsx`** — Wrap application in BrowserRouter, ApiProvider, and ProfileProvider
- **`frontend/src/styles/design-system.css`** — Centralized CSS stylesheet for "Thread Gauge" tokens and layout styles
- **`frontend/src/contexts/`** — `ApiContext.jsx` (API connection, roles & skills list), `ProfileContext.jsx` (global profile state)
- **`frontend/src/hooks/`** — `useCareerAnalysis.js`, `useStudyEligibility.js`, `useProfileExport.js`, `usePageTitle.js`
- **`frontend/src/components/ui/`** — 10 UI primitive components (ThreadGauge, Panel, etc.)
- **`frontend/src/components/layout/`** — Layout structure (Header, Sidebar, Footer)
- **`frontend/src/pages/`** — Page views for Career, Study, Global, and Dashboard

### Frontend Data
- **`frontend/src/data/countries.js`** — Rich study metrics for 10 countries
- **`frontend/src/data/universities.js`** — 20 universities with course details and entry requirements
- **`frontend/src/data/scholarships.js`** — 16 scholarships with eligibility and application dates
- **`frontend/src/data/examConfig.js`** — Score ranges and configurations for SAT, IELTS, TOEFL, GRE, etc.
- **`frontend/src/data/constants.js`** — Common form selections (budget, citizenship, intake)

---

## Design System: "Thread Gauge"

| Token | Hex | Usage |
|-------|-----|-------|
| Canvas | `#F5F6F9` | Background |
| Indigo | `#1E2B4D` | Main text, primary elements |
| Purple | `#7C4DFF` | Brand accent highlight |
| Sky | `#38BDF8` | Alternative highlight |
| Brass | `#AD7F2C` | Warm highlight, recommended markers |
| Rust | `#AE4F37` | Warnings, missing parameters |
| Teal | `#1F6F61` | Success indicators, high scores |

**Fonts:** Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (data)  
**Signature:** Woven measuring tape "thread gauge" progress bars (no emojis in headings/labels)

---

## Known Issues & Technical Debt

| Priority | Issue | Status |
|----------|-------|--------|
| 🔴 High | CSV database — must migrate to PostgreSQL before production | 🔄 Seed/schema ready |
| 🟡 Medium | "AI" is template strings, not actual AI | 🔲 Planned |
| 🟡 Medium | 6 roles have no skill mappings — `/analyze` fails silently for them | 🔲 Planned |
| 🟡 Medium | No authentication or user accounts | 🔲 Planned |
| 🟡 Medium | No test coverage (zero tests) | 🔲 Planned |
| 🟡 Medium | CORS wildcard `allow_origins=["*"]` | 🔲 Planned |
| 🟠 Low | Countries/universities duplicated between backend CSV and frontend JS | 🔲 Planned |

---

## Development Environment

| Requirement | Version |
|------------|---------|
| Node.js | ≥ 18.x |
| Python | ≥ 3.10 |
| npm | ≥ 9.x |

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
| `SUPABASE_URL` | — | Supabase project URL (seed script) |
| `SUPABASE_KEY` | — | Supabase service role key (seed script) |
| `GEMINI_API_KEY` | — | Google Gemini API key (planned) |

---

## Active Development Focus

**Currently working on:** Phase 3 — AI Integration & Global Intelligence (Days 21-30)

**Next priorities:**
1. Migrate from CSV flat files to PostgreSQL database (Supabase)
2. Integrate Google Gemini API for AI Coaches and dynamic insights
3. Add multi-country salary data
4. Complete role-skill mappings for all 15 roles in CSV/database

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
| Changelog | `CHANGELOG.md` | Version history |

---

> **⚡ This file should be updated after every significant change to the project.**
