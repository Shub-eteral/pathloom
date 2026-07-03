# 🧠 Pathloom — Project Context

> **Living Document** — A single-file snapshot of the entire project state.  
> Designed for AI agents, new developers, and anyone needing rapid orientation.  
> **Last Updated:** July 3, 2026

---

## Identity

| Field | Value |
|-------|-------|
| **Project Name** | Pathloom |
| **Repository** | `Shub-eteral/pathloom` |
| **Tagline** | *"From Where You Are → To Where You Want To Be"* |
| **Purpose** | AI-powered Career, Study & Global Opportunity Intelligence Platform |
| **Core Question** | *"Given who I am today, what is the best path to the future I want?"* |
| **Version** | v0.82 |
| **Status** | In Development |
| **Started** | June 18, 2026 |
| **Target Launch** | August 2026 |
| **Dev Days Elapsed** | ~15 of 40 |
| **Overall Completion** | ~22% |

---

## Tech Stack

| Layer | Technology | Version | Status |
|-------|-----------|---------|--------|
| **Frontend Framework** | React | 19.2.6 | ✅ Active |
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
| **💼 Career Intelligence** | ~35% | Analysis, recommendations, comparison, readiness scoring | Multi-country salary, AI coach, resume analyzer, 5-year planner, market trends |
| **🎓 Study Intelligence** | ~40% | Academic profile, university finder, admission predictor, scholarship matching | Study roadmap, visa planner, AI study coach, expanded data |
| **🌎 Global Opportunity** | ~10% | Basic country match scoring | Immigration intelligence, migration planner, global salary, opportunity scoring |
| **🤖 AI Future Planner** | 0% | Nothing | Everything (requires all other modules + Gemini API) |

---

## Architecture Summary

```
Frontend (React + Vite)  ←→  Backend (FastAPI)  ←→  Data (CSV files)
     Port 5173                   Port 8000            database/ directory

Study intelligence data lives in frontend/src/data/ (static JS modules)
Career intelligence data served via REST API from CSV files
```

**Key architecture facts:**
- Frontend is a **monolithic single component** (`App.jsx`, ~2,500 lines, ~113KB)
- Backend has **9 REST endpoints** — all GET, all unauthenticated
- All data is loaded **once at startup** into Python dictionaries
- Backend engines are **pure functions** — no state, no side effects
- Study features run **entirely in the frontend** — no backend API calls
- CORS is set to `allow_origins=["*"]` (open to all)
- No user authentication, no persistent user data, no routing

---

## API Endpoints (All Active)

| Endpoint | Purpose | Engine Module |
|----------|---------|---------------|
| `GET /` | Health check | — |
| `GET /roles` | List 15 career roles | `role_loader.py` |
| `GET /skills` | List 20 skills (id→name map) | `skill_loader.py` |
| `GET /analyze` | Readiness score + missing skills + roadmap | `scoring.py` + `roadmap.py` |
| `GET /recommend` | Top 5 role recommendations | `recommender.py` |
| `GET /explain` | Matched vs. missing skill breakdown | `explainer.py` |
| `GET /insight` | Template-based career insight text | `insights.py` |
| `GET /career-info/{id}` | Salary, demand, difficulty per role | `career_loader.py` |
| `GET /compare` | Multi-role side-by-side comparison | `comparison.py` |

---

## Data Coverage

| Dataset | Records | Coverage | Gaps |
|---------|---------|----------|------|
| Roles | 15 | 4 domains covered | ✅ Complete for MVP |
| Skills | 20 | Technical skills only | Missing: soft skills, domain-specific |
| Role-Skill Mappings | 45 | 9 of 15 roles | **6 roles have ZERO mappings** |
| Career Info | 15 | India-only salary (LPA) | No multi-country salary |
| Countries (CSV) | 10 | Basic catalog only | No intelligence data |
| Countries (frontend) | 5 | Study destination data | Limited to Japan, USA, Germany, Canada, Australia |
| Universities | 3 | Frontend static data | Only: U. Tokyo, Kyoto U., TU Munich |
| Scholarships | 3 | Frontend static data | Only: MEXT, JASSO, DAAD |
| Cost of Living | 0 | — | Not started |
| Visa Routes | 0 | — | Not started |
| Market Trends | 0 | — | Not started |

---

## Key Files Quick Reference

### Backend (Entry Point)
- **`backend/app.py`** — FastAPI application, all routes, CORS config, data loading

### Backend (Engines)
- **`backend/scoring.py`** — `calculate_readiness(required_skills, user_skill_ids)` → (score, missing)
- **`backend/recommender.py`** — `recommend_roles(user_skills, role_skills)` → top 5 roles
- **`backend/comparison.py`** — `compare_roles(role_ids, user_skills, ...)` → comparison array
- **`backend/roadmap.py`** — `generate_roadmap(required, missing, skills)` → step list
- **`backend/explainer.py`** — `explain_role(user_skills, required, skills)` → {matched, missing}
- **`backend/insights.py`** — `generate_insight(role_name, matched, missing)` → text string

### Backend (Data Loaders)
- **`backend/role_loader.py`** — `load_roles(path)` → List[Dict]
- **`backend/skill_loader.py`** — `load_skills(path)` → Dict[str, str]
- **`backend/data_loader.py`** — `load_role_skills(path)` → Dict[str, List[Dict]]
- **`backend/career_loader.py`** — `load_career_info(path)` → Dict[str, Dict]

### Frontend
- **`frontend/src/App.jsx`** — Monolithic UI component (career + study modes)
- **`frontend/src/components/ComparisonChart.jsx`** — Bar chart component
- **`frontend/src/data/universities.js`** — 3 universities with programs
- **`frontend/src/data/scholarships.js`** — 3 scholarships
- **`frontend/src/data/countries.js`** — 5 study destination countries

### Database
- **`database/schema.sql`** — PostgreSQL schema (14 tables, UUIDs, RLS policies)
- **`database/seed/`** — JSON seed data (domains, roles)
- **`backend/seed.py`** — Supabase seeding script

### Documentation
- **`docs/INDEX.md`** — Documentation hub (start here for docs)
- **`README.md`** — Project overview and quick start
- **`PROJECT_PROGRESS.md`** — Detailed module-by-module progress
- **`CHANGELOG.md`** — Version history

---

## Design System: "Thread Gauge"

| Token | Hex | Usage |
|-------|-----|-------|
| Canvas | `#F5F6F9` | Background |
| Indigo | `#232C52` | Primary text, headers |
| Brass | `#AD7F2C` | Accents, highlights |
| Rust | `#AE4F37` | Warnings, low scores |
| Teal | `#1F6F61` | Success, high scores |

**Fonts:** Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (data)  
**Signature:** Woven measuring tape "thread gauge" progress bars

---

## Known Issues & Technical Debt

| Priority | Issue |
|----------|-------|
| 🔴 High | `App.jsx` is 2,500 lines — needs component decomposition |
| 🔴 High | CSV database — must migrate to PostgreSQL before production |
| 🟡 Medium | "AI" is template strings, not actual AI |
| 🟡 Medium | 6 roles have no skill mappings — `/analyze` fails silently for them |
| 🟡 Medium | No authentication or user accounts |
| 🟡 Medium | No test coverage (zero tests) |
| 🟡 Medium | CORS wildcard `allow_origins=["*"]` |
| 🟠 Low | No React Router — mode toggle instead of URL routing |
| 🟠 Low | No error boundaries in React |
| 🟠 Low | Countries/universities duplicated between backend CSV and frontend JS |

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

**Currently working on:** Phase 2 — Study Intelligence (Days 11-20)

**Next priorities:**
1. Expand university database (3 → 20+)
2. Expand scholarship database (3 → 15+)
3. Complete role-skill mappings for remaining 6 roles
4. Begin PostgreSQL/Supabase migration

---

## Documentation Map

| Document | Path | Purpose |
|----------|------|---------|
| This file | `PROJECT_CONTEXT.md` | Living project state snapshot |
| Doc index | `docs/INDEX.md` | Documentation navigation hub |
| README | `README.md` | Project overview & quick start |
| PRD | `docs/PRD.md` | Product requirements & user stories |
| System Design | `docs/SYSTEM_DESIGN.md` | Architecture diagrams & data flows |
| Architecture | `docs/ARCHITECTURE.md` | ADRs & technical decisions |
| API Reference | `docs/API_REFERENCE.md` | Complete API documentation |
| Data Dictionary | `docs/DATA_DICTIONARY.md` | All data models & schemas |
| Contributing | `docs/CONTRIBUTING.md` | Developer setup & conventions |
| Vision | `docs/vision.md` | Mission & product direction |
| Roadmap | `docs/roadmap.md` | 40-day development plan |
| Scoring | `docs/scoring.md` | Readiness score algorithm design |
| Roadmap Engine | `docs/roadmap_engine.md` | Learning path engine design |
| Requirements | `docs/requirements.md` | Tech stack & versions |
| Progress | `PROJECT_PROGRESS.md` | Module-by-module tracker |
| Changelog | `CHANGELOG.md` | Version history |

---

> **⚡ This file should be updated after every significant change to the project.**
