# Pathloom — Project Progress Tracker

> **Last Updated:** July 13, 2026
> **Project Start Date:** June 18, 2026
> **Development Days Elapsed:** ~24 of 40
> **Target Launch:** August 2026
>
> See also: [Project Context](./PROJECT_CONTEXT.md) · [Documentation Index](./docs/INDEX.md)

---

## Project Overview

Pathloom is an AI-powered Career, Study & Global Opportunity Intelligence Platform. The vision is to become a single platform that answers: *"Given who I am today, what is the best path to the future I want?"*

**Current Status:** The platform has undergone a complete UI/UX redesign ("Meridian" design system) with glassmorphism, radial progress gauges, and gradient accents. Data is expanded to a real-world dataset (74 roles, 140 skills, 58 universities, 45 scholarships, 20 countries). All frontend pages and components are fully restyled to use the new Meridian look, and all backend endpoints serve the data correctly.

---

## Architecture & Tech Stack

### Current Implementation

| Layer | Technology | Status |
|-------|-----------|--------|
| **Frontend** | React 19 + Vite 8 + Router 7 + CSS Design System | ✅ Active |
| **Design System** | "Meridian" — Glassmorphism, radial gauges, gradient section accents | ✅ Active |
| **Backend** | Python + FastAPI | ✅ Active |
| **Database** | CSV flat files (7 files) | ✅ Active (temporary) |
| **AI Integration** | Template-based insights (no LLM) | ⚠️ Placeholder |
| **Hosting** | Local development only | Not deployed |

### Planned (from docs/requirements.md)

| Layer | Technology | Status |
|-------|-----------|--------|
| **Database** | PostgreSQL | In Progress (Schema & seed scripts ready) |
| **AI** | Gemini API | Not started |
| **Frontend Hosting** | Vercel | Not started |
| **Backend Hosting** | Railway | Not started |

---

## Repository Structure

```
pathloom/
├── backend/              # FastAPI backend (14 files)
│   ├── app.py            # Main FastAPI app with all endpoints
│   ├── main.py           # CLI prototype (standalone testing script)
│   ├── career_loader.py  # Loads careerinfo.csv
│   ├── comparison.py     # Multi-role comparison logic
│   ├── data_loader.py    # Loads role_skills.csv
│   ├── explainer.py      # Skill match/miss explanation
│   ├── insights.py       # Template-based career insight generator
│   ├── recommender.py    # Role recommendation engine
│   ├── roadmap.py        # Learning roadmap generator
│   ├── role_loader.py    # Loads roles.csv
│   ├── scoring.py        # Readiness score calculator
│   ├── seed.py           # Database seeding script for Supabase/PostgreSQL
│   ├── skill_loader.py   # Loads skills.csv
│   └── .env.example      # Example environment variables file
├── database/             # Flat-file CSV data store & SQL migrations (8 files)
│   ├── careerinfo.csv    # Salary (USD), demand, difficulty per role (74 roles)
│   ├── countries.csv     # Country catalog
│   ├── domains.csv       # 15 career domains
│   ├── role_skills.csv   # 450+ role-to-skill mappings with importance weights
│   ├── roles.csv         # 74 career roles across 15 domains
│   ├── schema.sql        # PostgreSQL/Supabase database schema definition
│   ├── skills.csv        # 140 technical and professional skills
│   └── seed/             # Seeding JSON data (domains.json, roles.json)
├── docs/                 # Project documentation (12 files)
│   ├── INDEX.md          # Documentation navigation hub
│   ├── PRD.md            # Product requirements & user stories
│   ├── SYSTEM_DESIGN.md  # Architecture diagrams & data flows
│   ├── ARCHITECTURE.md   # Technical ADRs
│   ├── API_REFERENCE.md  # FastAPI endpoint documentation
│   ├── DATA_DICTIONARY.md# Database models & schemas
│   ├── CONTRIBUTING.md   # Developer setup and code conventions
│   ├── requirements.md   # Tech stack listing
│   ├── roadmap.md        # 40-day build plan
│   ├── roadmap_engine.md # Roadmap engine design doc
│   ├── scoring.md        # Readiness score algorithm doc
│   └── vision.md         # Mission & MVP features doc
├── frontend/             # React + Vite + CSS Design System + Router 7
│   ├── src/
│   │   ├── App.jsx       # Routing layout with section-aware class wrapping
│   │   ├── main.jsx      # React entry point with Providers (Theme, Api, Profile)
│   │   ├── index.css     # Typography setup (Space Grotesk, Inter, JetBrains Mono)
│   │   ├── styles/
│   │   │   └── design-system.css  # "Meridian" design system (990+ lines of custom tokens)
│   │   ├── data/         # Expanded datasets (20 countries, 58 universities, 45 scholarships)
│   │   ├── contexts/     # Shared states (ApiContext, ProfileContext, ThemeContext)
│   │   ├── hooks/        # Custom react hooks (career, study, export logic)
│   │   ├── components/
│   │   │   ├── ui/       # UI primitives (Panel, Button, ThemeToggle, ThreadGauge, RadialGauge, GlowBadge, etc.)
│   │   │   └── layout/   # Layout elements (Header, Sidebar, Footer)
│   │   └── pages/        # Route page views (Dashboard, Career, Study, Global, Profile)
│   └── public/
│       └── pathloom-logo.png
├── README.md
├── .gitignore
├── PROJECT_CONTEXT.md    # Living project state snapshot
└── PROJECT_PROGRESS.md   # This file
```

---

## Module-by-Module Progress

### Module 1: Career Intelligence

| Feature | Vision Description | Status | Implementation Details |
|---------|-------------------|--------|----------------------|
| **Career Analysis** | User enters skills -> readiness score + missing skills + roadmap | Done | Decomposed Page view; client hooks interact with backend engine |
| **Career Recommendation** | Best match + alternative career roles | Done | Decomposed recommendations page with AI insights card |
| **Career Comparison** | Side-by-side: salary, demand, difficulty, growth | Done | Dynamic compare page with detailed metrics table and chart |
| **Salary Intelligence** | Global salary data per role | Done | Global USD salary ranges for all 74 roles |
| **Country Intelligence** | Best countries by demand, immigration, salary | Not started | `countries.csv` exists but no country-career intelligence API |
| **Cost of Living Simulator** | City-level cost breakdown | Not started | No data or logic implemented |
| **Market Trends** | Career demand trends over time | Not started | No trending data or time-series analysis |
| **Resume Analyzer** | Upload PDF -> extract skills -> readiness | Not started | No file upload or parsing logic |
| **AI Resume Feedback** | AI-powered resume suggestions | Not started | Requires Gemini API integration |
| **AI Career Coach** | Conversational career guidance | Not started | Requires Gemini API integration |
| **5-Year Career Planner** | Multi-year progression timeline | Not started | No planner data model or logic |

**Module 1 Completion: ~60%** (analysis, recommendations, comparison, and Meridian UI/UX done; expanded to 74 roles across 15 domains with global salaries; AI coach and resume analyzer not started)

---

### Module 2: Study Intelligence

| Feature | Vision Description | Status | Implementation Details |
|---------|-------------------|--------|----------------------|
| **University Finder** | Search by country + program | Done | 58 real universities across 20 countries with programs and requirements |
| **University Intelligence** | Ranking, tuition, acceptance rate, ROI | Done | QS rank, city, average salary, and employment rates displayed |
| **Scholarship Finder** | Browse scholarships by country/degree | Done | 45 real scholarships with eligibility criteria and deadlines |
| **Admission Predictor** | Input CGPA/IELTS/GRE -> acceptance probability | Done | Predictive chance formula per university with safe/target/reach tiers |
| **Study Cost Calculator** | Tuition + living cost + scholarships | Partial | Tuition and living cost displayed; net cost after scholarship not calculated |
| **Study Roadmap** | Month-by-month preparation plan | Not started | No timeline generation logic |
| **Student Visa Planner** | Country -> visa route steps | Not started | Relocation roadmap preview on Global page |
| **AI Study Coach** | Conversational study guidance | Not started | Requires Gemini API integration |
| **Academic Profile** | GPA, exam scores, document readiness | Done | Central profile setup (GPA scale conversion, score limits, doc checklists) |

**Module 2 Completion: ~85%** (academic profile, finder, scholarship, country strategy complete with Meridian UI/UX; timelines and AI guide remaining)

---

### Module 3: Global Opportunity Intelligence

| Feature | Vision Description | Status | Implementation Details |
|---------|-------------------|--------|----------------------|
| **Country Recommendation Engine** | Best country based on profile | Done | Country strategy page with 20 countries, match scoring, and Meridian UX |
| **Immigration Intelligence** | Work visa, PR, citizenship routes | Not started | Upcoming features listed |
| **Migration Planner** | Step-by-step migration path | Not started | Upcoming features listed |
| **Global Salary Ranking** | Highest paying countries ranking | Not started | Upcoming features listed |
| **Opportunity Score** | Per-country composite score | Partial | Core country strategy metrics implemented (Safety index, PR score, top fields) |

**Module 3 Completion: ~40%** (strategy page with 20 countries, match scoring, previews, and Meridian UI/UX done)

---

### Module 4: AI Future Planner (Flagship Feature)

| Feature | Vision Description | Status | Implementation Details |
|---------|-------------------|--------|----------------------|
| **Full Life Planner** | Enter age, country, degree, goal -> get complete plan | Not started | Requires all modules + Gemini API |
| **Success Probability** | ML-predicted chance of achieving goal | Not started | No ML model |
| **Integrated Timeline** | Combined career + study + migration timeline | Not started | No timeline engine |

**Module 4 Completion: 0%**

---

## API Endpoints (Backend)

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `GET /` | GET | Active | Health check / welcome message |
| `GET /roles` | GET | Active | Returns all 74 career roles |
| `GET /skills` | GET | Active | Returns all 140 skills |
| `GET /analyze` | GET | Active | Readiness score + missing skills + roadmap |
| `GET /recommend` | GET | Active | Top 5 role recommendations |
| `GET /explain` | GET | Active | Matched vs. missing skills breakdown |
| `GET /insight` | GET | Active | Template-based career insight text |
| `GET /career-info/{role_id}` | GET | Active | Salary, demand, difficulty, learning time |
| `GET /compare` | GET | Active | Side-by-side role comparison |

**Missing API endpoints needed for vision:**
- `POST /resume/upload` — Resume parsing
- `POST /ai/chat` — AI Career Coach / Study Coach
- `GET /countries/{id}/intelligence` — Country intelligence
- `GET /salary/{role}/{country}` — Country-wise salary
- `GET /visa/{from_country}/{to_country}` — Visa route planner
- `GET /cost-of-living/{city}` — Cost of living data
- `POST /ai/future-plan` — AI Future Planner
- `GET /market-trends` — Market trend data

---

## Data Coverage

### Current Database (CSV)

| Dataset | Records | Coverage |
|---------|---------|----------|
| **Roles** | 74 | All 15 domains covered (AI & Data, Software Dev, Cloud, Security, Finance, Marketing, Healthcare, Education, Engineering, Hospitality, Government, Legal, HR, Sales, Design) |
| **Skills** | 140 | Programming, Web, Data, ML/AI, Cloud, Security, Business, Design, Engineering, Healthcare, Education, Legal, HR, Sales |
| **Role-Skill Mappings** | 450+ | All 74 roles fully mapped with 5-8 skills each |
| **Career Info** | 74 | Global USD salary ranges for all roles |
| **Countries** | 10 | Basic catalog |
| **Domains** | 15 | Complete coverage |

### Frontend Static Data

| Dataset | Records | Notes |
|---------|---------|-------|
| **Countries (Study)** | 20 | Japan, USA, Germany, Canada, Australia, UK, South Korea, Netherlands, Singapore, France, Sweden, Switzerland, NZ, Ireland, Finland, Norway, Denmark, Italy, Spain, Malaysia |
| **Universities** | 58 | Real universities with QS ranks, programs, tuition, and requirements |
| **Scholarships** | 45 | Real scholarships with eligibility, deadlines, and award amounts |
| **Career Goals** | 43 | Career goals mapped to university programs |

### Data Gaps

- No immigration/visa data
- No cost-of-living data
- No market trends/time-series data
- No multi-country salary comparison (single global range per role)

---

## UI & Design System

### "Meridian" Design System (v2.2)

The frontend was completely redesigned in July 2026 to introduce a premium, data-dense "Meridian" design language centered on glassmorphism, radial gauge metrics, and gradient section accents.

- **Typography:** Space Grotesk (headings/display), Inter (body), JetBrains Mono (data labels)
- **Theme Support:** Full dark/light mode with system preference detection, localStorage persistence, and navy base dark mode
- **Section Accents:** Each module has dedicated gradient accent pairs:
  - Career: Amber (#F59E0B) → Rose (#EF4444)
  - Study: Emerald (#10B981) → Cyan (#06B6D4)
  - Global: Indigo (#6366F1) → Violet (#8B5CF6)
  - Profile: Pink (#EC4899) → Orange (#F97316)
- **Layout:** Frosted glass header, collapsible sidebar with active glow indicators, responsive adaptive sidebar
- **Component library:** Panel (glass/accent), Button, ThemeToggle, ThreadGauge, RadialGauge (SVG circles), GlowBadge, StatCard, Alert, ChipGroup, EmptyState (floating shapes), SearchInput, Select, StatusBadge

### Component Structure

| Category | Components |
|----------|-----------|
| **Layout** | Header, Sidebar, Footer |
| **UI Primitives** | Panel, Button, ThemeToggle, ThreadGauge, RadialGauge, GlowBadge, StatCard, Alert, EmptyState, SearchInput, Select, StatusBadge, ChipGroup |
| **Contexts** | ApiContext, ProfileContext, ThemeContext |
| **Pages** | DashboardPage, CareerAnalysisPage, CareerRecommendPage, CareerComparePage, StudyProfilePage, UniversityFinderPage, ScholarshipPage, CountryStrategyPage, GlobalOpportunityPage, ProfilePage, NotFoundPage |

---

## Development Timeline

### Completed Milestones

| Date | Milestone | Key Changes |
|------|-----------|-------------|
| Jun 18 | Project setup | Repo, docs, database schema, initial structure |
| Jun 18 | Database foundation | roles.csv, skills.csv, role_skills.csv with importance weights |
| Jun 18 | Backend MVP | Readiness scoring, roadmap engine, FastAPI endpoints |
| Jun 18 | Full-stack prototype | React frontend consuming backend API |
| Jun 19 | v0.4 Platform foundation | Design system, thread gauge visuals |
| Jun 19 | v0.5 AI insights | Explanation engine, template-based insights |
| Jun 19 | v0.6 Comparison | Career comparison API + dashboard UI |
| Jun 19 | Profile system | Export/import profile as JSON |
| Jun 19 | Study intelligence | Country dataset, study mode UI |
| Jun 19 | University engine | Academic profile, eligibility, match scoring |
| Jun 20 | Admission intelligence | Admission predictor, scholarship analytics |
| Jul 4 | UI polish | Fixed sidebar, logo integration, emoji removal, favicon |
| Jul 5 | Architecture docs | Complete documentation suite (12 docs) |
| Jul 9-10 | Linen UI redesign | Complete visual overhaul — 30+ files, dark/light themes, section accents |
| Jul 10-12 | Data expansion | 74 roles, 140 skills, 58 universities, 45 scholarships, 20 countries |
| Jul 13 | Meridian UI/UX Redesign | Complete visual overhaul to "Meridian" with glassmorphism, SVG radial gauges, gradients, and custom components across all 11 pages |

### What's Next

**High Priority:**
- [ ] Migrate from CSV to PostgreSQL (Schema & seed scripts created)
- [ ] Integrate Gemini API for AI Career Coach
- [ ] Add immigration/visa pathway data
- [ ] Cost of living simulator

**Medium Priority:**
- [ ] Resume upload + skill extraction
- [ ] AI Study Coach
- [ ] Market trends data
- [ ] 5-Year Career Planner
- [ ] Student visa pathway planner

**Lower Priority:**
- [ ] AI Future Planner (flagship feature)
- [ ] Deployment to Vercel + Railway
- [ ] Business model implementation (Free/Pro/Premium tiers)
- [ ] Testing and QA
- [ ] Performance optimization

---

## Known Issues & Technical Debt

1. **No real AI:** The "AI Insight" feature is a template string, not actual LLM output
2. **CSV database:** Not suitable for production; needs PostgreSQL migration (schema & seeding prepared)
3. **No authentication:** No user accounts or persistent storage
4. **No tests:** Zero unit tests or integration tests
5. **CORS wildcard:** `allow_origins=["*"]` in production is a security concern
6. **Frontend data duplication:** Countries/universities exist in both CSV backend and JS frontend
7. **No error boundaries:** Frontend has no React error boundaries

---

## Overall Project Completion

| Module | Completion | Notes |
|--------|-----------|-------|
| Module 1: Career Intelligence | ~60% | Core pages + 74 roles across 15 domains with global USD salaries + Meridian UX |
| Module 2: Study Intelligence | ~85% | Full dataset with 58 universities, 45 scholarships, 20 countries + Meridian UX |
| Module 3: Global Opportunity | ~40% | Country strategy page with 20 countries + Meridian UX |
| Module 4: AI Future Planner | 0% | Not started |
| **Infrastructure** | ~60% | Router + Contexts + Meridian Design System + Theme + PostgreSQL schemas prepared |
| **Data Completeness** | ~70% | Comprehensive career, university, scholarship, and country data |
| **AI Integration** | ~5% | Template-based placeholders |

### **Overall Estimated Completion: ~50%**

---

*This document will be updated as development progresses. Check git log for the latest commit history.*
