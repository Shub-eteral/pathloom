# 📊 PATHLOOM — Project Progress Tracker

> **Last Updated:** July 3, 2026
> **Project Start Date:** June 18, 2026
> **Development Days Elapsed:** ~15 of 40
> **Target Launch:** August 2026
>
> See also: [Project Context](./PROJECT_CONTEXT.md) · [Documentation Index](./docs/INDEX.md)

---

## 🏗️ Project Overview

Pathloom is an AI-powered Career, Study & Global Opportunity Intelligence Platform. The vision is to become a single platform that answers: *"Given who I am today, what is the best path to the future I want?"*

**Current Status:** Early-mid development — Module 1 (Career Intelligence) has a functional MVP and Module 2 (Study Intelligence) is partially built. Module 3 (Global Opportunity Intelligence) and Module 4 (AI Future Planner) are not started.

---

## 🧱 Architecture & Tech Stack

### Current Implementation

| Layer | Technology | Status |
|-------|-----------|--------|
| **Frontend** | React 19 + Vite 8 + Tailwind CSS 4 | ✅ Active |
| **Backend** | Python + FastAPI | ✅ Active |
| **Database** | CSV flat files (6 files) | ✅ Active (temporary) |
| **AI Integration** | Template-based insights (no LLM) | ⚠️ Placeholder |
| **Hosting** | Local development only | 🔲 Not deployed |

### Planned (from docs/requirements.md)

| Layer | Technology | Status |
|-------|-----------|--------|
| **Database** | PostgreSQL | 🔄 In Progress (Schema & seed scripts ready) |
| **AI** | Gemini API | 🔲 Not started |
| **Frontend Hosting** | Vercel | 🔲 Not started |
| **Backend Hosting** | Railway | 🔲 Not started |

---

## 📁 Repository Structure

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
│   ├── careerinfo.csv    # Salary, demand, difficulty per role (15 roles)
│   ├── countries.csv     # 10 countries
│   ├── domains.csv       # 15 career domains
│   ├── role_skills.csv   # Role-to-skill mappings with importance weights
│   ├── roles.csv         # 15 career roles across 4 domains
│   ├── schema.sql        # PostgreSQL/Supabase database schema definition
│   ├── skills.csv        # 20 technical skills
│   └── seed/             # Seeding JSON data (domains.json, roles.json)
├── docs/                 # Project documentation (5 files)
│   ├── requirements.md   # Tech stack listing
│   ├── roadmap.md        # 40-day build plan
│   ├── roadmap_engine.md # Roadmap engine design doc
│   ├── scoring.md        # Readiness score algorithm doc
│   └── vision.md         # Mission & MVP features doc
├── frontend/             # React + Vite + Tailwind CSS 4
│   ├── src/
│   │   ├── App.jsx       # Monolithic app component (~2,500 lines)
│   │   ├── App.css       # Custom CSS (mostly Vite boilerplate)
│   │   ├── main.jsx      # React entry point
│   │   ├── index.css     # Tailwind CSS import
│   │   ├── components/
│   │   │   └── ComparisonChart.jsx  # Bar chart component
│   │   ├── data/
│   │   │   ├── countries.js     # 5 countries with study data
│   │   │   ├── scholarships.js  # 3 scholarships (MEXT, JASSO, DAAD)
│   │   │   └── universities.js  # 3 universities with programs
│   │   └── assets/
│   │       ├── hero.png
│   │       ├── react.svg
│   │       └── vite.svg
│   └── public/
│       ├── favicon.svg
│       └── icons.svg
├── README.md
├── .gitignore
└── PROJECT_PROGRESS.md   # This file
```

---

## 🎯 Module-by-Module Progress

### Module 1: 💼 Career Intelligence

| Feature | Vision Description | Status | Implementation Details |
|---------|-------------------|--------|----------------------|
| **Career Analysis** | User enters skills → readiness score + missing skills + roadmap | ✅ Done | `GET /analyze` endpoint; weighted readiness scoring algorithm |
| **Career Recommendation** | Best match + alternative career roles | ✅ Done | `GET /recommend` returns top 5 roles sorted by skill overlap |
| **Career Comparison** | Side-by-side: salary, demand, difficulty, growth | ✅ Done | `GET /compare` endpoint; comparison table + chart in frontend |
| **Salary Intelligence** | Country-wise salary data | ⚠️ Partial | Only India LPA ranges in `careerinfo.csv`; no multi-country salary data |
| **Country Intelligence** | Best countries by demand, immigration, salary | 🔲 Not started | `countries.csv` exists (10 countries) but no country-career intelligence API |
| **Cost of Living Simulator** | City-level cost breakdown | 🔲 Not started | No data or logic implemented |
| **Market Trends** | Career demand trends over time | 🔲 Not started | No trending data or time-series analysis |
| **Resume Analyzer** | Upload PDF → extract skills → readiness | 🔲 Not started | No file upload or parsing logic |
| **AI Resume Feedback** | AI-powered resume suggestions | 🔲 Not started | Requires Gemini API integration |
| **AI Career Coach** | Conversational career guidance | 🔲 Not started | Requires Gemini API integration |
| **5-Year Career Planner** | Multi-year progression timeline | 🔲 Not started | No planner data model or logic |

**Module 1 Completion: ~35%** (core analysis, recommendation, comparison done; intelligence features and AI not started)

---

### Module 2: 🎓 Study Intelligence

| Feature | Vision Description | Status | Implementation Details |
|---------|-------------------|--------|----------------------|
| **University Finder** | Search by country + program | ✅ Done | Frontend-only with 3 universities in static JS data |
| **University Intelligence** | Ranking, tuition, acceptance rate, ROI | ⚠️ Partial | QS rank, tuition, employment score present; acceptance rate & ROI missing |
| **Scholarship Finder** | Browse scholarships by country/degree | ✅ Done | 3 scholarships (MEXT, JASSO, DAAD) with match scoring |
| **Admission Predictor** | Input CGPA/IELTS/GRE → acceptance probability | ✅ Done | Multi-factor eligibility engine with admission chance % |
| **Study Cost Calculator** | Tuition + living cost + scholarships | ⚠️ Partial | Tuition and living cost displayed; net cost after scholarship not calculated |
| **Study Roadmap** | Month-by-month preparation plan | 🔲 Not started | No timeline generation logic |
| **Student Visa Planner** | Country → visa route steps | 🔲 Not started | Listed as "Coming Soon" in UI |
| **AI Study Coach** | Conversational study guidance | 🔲 Not started | Requires Gemini API integration |
| **Academic Profile** | GPA, exam scores, document readiness | ✅ Done | Comprehensive form with GPA conversion, exam scores, document checklist |

**Module 2 Completion: ~40%** (profile, university finder, scholarship matching, admission predictor done; roadmaps and AI not started)

---

### Module 3: 🌎 Global Opportunity Intelligence

| Feature | Vision Description | Status | Implementation Details |
|---------|-------------------|--------|----------------------|
| **Country Recommendation Engine** | Best country based on profile | ⚠️ Partial | Country scoring in frontend (average match score of universities in that country); no dedicated API |
| **Immigration Intelligence** | Work visa, PR, citizenship routes | 🔲 Not started | No immigration data |
| **Migration Planner** | Step-by-step migration path | 🔲 Not started | No data or logic |
| **Global Salary Ranking** | Highest paying countries ranking | 🔲 Not started | No multi-country salary API |
| **Opportunity Score** | Per-country composite score | ⚠️ Partial | Basic country match score exists but not a full opportunity score |

**Module 3 Completion: ~10%** (basic country scoring only)

---

### Module 4: 🤖 AI Future Planner (Flagship Feature)

| Feature | Vision Description | Status | Implementation Details |
|---------|-------------------|--------|----------------------|
| **Full Life Planner** | Enter age, country, degree, goal → get complete plan | 🔲 Not started | Requires all modules + Gemini API |
| **Success Probability** | ML-predicted chance of achieving goal | 🔲 Not started | No ML model |
| **Integrated Timeline** | Combined career + study + migration timeline | 🔲 Not started | No timeline engine |

**Module 4 Completion: 0%**

---

## 🔌 API Endpoints (Backend)

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `GET /` | GET | ✅ | Health check / welcome message |
| `GET /roles` | GET | ✅ | Returns all 15 career roles |
| `GET /skills` | GET | ✅ | Returns all 20 skills |
| `GET /analyze` | GET | ✅ | Readiness score + missing skills + roadmap |
| `GET /recommend` | GET | ✅ | Top 5 role recommendations |
| `GET /explain` | GET | ✅ | Matched vs. missing skills breakdown |
| `GET /insight` | GET | ✅ | Template-based career insight text |
| `GET /career-info/{role_id}` | GET | ✅ | Salary, demand, difficulty, learning time |
| `GET /compare` | GET | ✅ | Side-by-side role comparison |

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

## 📊 Data Coverage

### Current Database (CSV)

| Dataset | Records | Coverage |
|---------|---------|----------|
| **Roles** | 15 | AI & Data (6), Software Dev (4), Cloud (3), Cybersecurity (2) |
| **Skills** | 20 | Technical skills only (Python, SQL, React, AWS, etc.) |
| **Role-Skill Mappings** | 45 | Covers 9 of 15 roles (roles 6, 10–15 have no mappings) |
| **Career Info** | 15 | India-only salary ranges in LPA format |
| **Countries** | 10 | India, Nepal, Japan, USA, Canada, Germany, UK, Australia, Singapore, South Korea |
| **Domains** | 15 | Broad coverage from AI to Design |

### Frontend Static Data

| Dataset | Records | Notes |
|---------|---------|-------|
| **Countries (Study)** | 5 | Japan, USA, Germany, Canada, Australia — with tuition, visa, PR data |
| **Universities** | 3 | Univ. of Tokyo, Kyoto Univ., TU Munich — with programs and requirements |
| **Scholarships** | 3 | MEXT, JASSO, DAAD — with eligibility criteria |

### Data Gaps

- No multi-country salary data (only India LPA)
- Role-skill mappings incomplete (6 roles have zero mappings)
- No immigration/visa data
- No cost-of-living data
- No market trends/time-series data
- University data is minimal (3 universities vs. thousands needed)
- Scholarship data is minimal (3 vs. hundreds needed)

---

## 🎨 Frontend Architecture

### Design System

The frontend uses a custom design system called "Thread Gauge" with:
- **Color palette:** Canvas (#F5F6F9), Indigo (#232C52), Brass (#AD7F2C), Rust (#AE4F37), Teal (#1F6F61)
- **Typography:** Space Grotesk (headings), IBM Plex Sans (body), IBM Plex Mono (data)
- **Signature visual:** "Thread gauge" progress bars with woven measuring tape pattern
- **Component library:** Panels, chips, gauges, alerts, cards, dropdowns, tables

### Component Structure

The entire frontend is essentially a single monolithic component:
- `App.jsx` — 2,497 lines containing all UI, state, and logic
- `ComparisonChart.jsx` — Small bar chart component (47 lines)

### Navigation Modes

Two modes toggled via buttons:
1. **Career Mode** — Role selection, skill analysis, recommendations, comparison
2. **Study Mode** — Academic profile, university finder, scholarship matching, country strategy

### Key UI Features

| Feature | Status | Notes |
|---------|--------|-------|
| Career profile builder | ✅ | Role + skill selection with search/dropdown |
| Readiness score display | ✅ | Thread gauge visualization |
| Missing skills display | ✅ | Tag-based display |
| Upskilling roadmap | ✅ | Numbered step list |
| Best match hero card | ✅ | Full career info + explanation |
| Alternative role cards | ✅ | Grid layout with stats |
| Career comparison table | ✅ | Sortable table with gauge bars |
| Academic profile form | ✅ | GPA, exam scores, documents |
| University listing | ✅ | Filterable and sortable |
| University detail view | ✅ | Admission analysis + requirements |
| Scholarship matching | ✅ | Score-based with recommendations |
| Country strategy view | ✅ | Match scoring per country |
| Profile export/import | ✅ | JSON file download/upload |
| Server connection status | ✅ | Live indicator in header |
| Responsive design | ⚠️ | Partial — some layouts need mobile optimization |

---

## 📅 Development Timeline

### Completed Milestones

| Date | Day | Milestone | Key Changes |
|------|-----|-----------|-------------|
| Jun 18 | 1 | Project setup | Repo, docs, database schema, initial structure |
| Jun 18 | 1 | Database foundation | roles.csv, skills.csv, role_skills.csv with importance weights |
| Jun 18 | 1 | Backend MVP | Readiness scoring, roadmap engine, FastAPI endpoints |
| Jun 18 | 1 | Full-stack prototype | React frontend consuming backend API |
| Jun 19 | 2 | v0.4 Platform foundation | Design system, thread gauge visuals |
| Jun 19 | 2 | v0.5 AI insights | Explanation engine, template-based insights |
| Jun 19 | 2 | v0.6 Comparison | Career comparison API + dashboard UI |
| Jun 19 | 2 | Day 13 - Profile system | Export/import profile as JSON |
| Jun 19 | 2 | Day 14 - Study intelligence | Country dataset, study mode UI |
| Jun 19 | 2 | v0.8x University engine | Academic profile, eligibility, match scoring |
| Jun 20 | 3 | Day 19 - Admission intelligence | Admission predictor, scholarship analytics |

### What's Next (Remaining ~30 Days)

**High Priority (Days 11–20):**
- [/] Migrate from CSV to PostgreSQL (Schema & seed scripts created)
- [ ] Integrate Gemini API for AI Career Coach
- [ ] Add multi-country salary data
- [ ] Complete role-skill mappings for all 15 roles
- [ ] Expand university and scholarship databases
- [ ] Component refactoring (break up `App.jsx`)

**Medium Priority (Days 21–30):**
- [ ] Resume upload + skill extraction
- [ ] AI Study Coach
- [ ] Visa/immigration data and planner
- [ ] Cost of living simulator
- [ ] Market trends data
- [ ] 5-Year Career Planner
- [ ] Student visa pathway planner

**Lower Priority (Days 31–40):**
- [ ] AI Future Planner (flagship feature)
- [ ] Deployment to Vercel + Railway
- [ ] Business model implementation (Free/Pro/Premium tiers)
- [ ] Testing and QA
- [ ] Performance optimization
- [ ] SEO and landing page

---

## ⚠️ Known Issues & Technical Debt

1. **Monolithic frontend:** `App.jsx` is 2,497 lines — needs decomposition into separate components and pages (possibly with React Router)
2. **No real AI:** The "AI Insight" feature is a template string, not actual LLM output
3. **CSV database:** Not suitable for production; needs PostgreSQL migration (schema & seeding prepared)
4. **Incomplete data:** 6 of 15 roles have no skill mappings; only 3 universities
5. **No authentication:** No user accounts or persistent storage
6. **No routing:** Single-page app with mode toggle instead of proper routes
7. **No tests:** Zero unit tests or integration tests
8. **CORS wildcard:** `allow_origins=["*"]` in production is a security concern
9. **Frontend data duplication:** Countries/universities exist in both CSV backend and JS frontend
10. **No error boundaries:** Frontend has no React error boundaries
11. **No environment configuration:** Backend has no `.env` file or config management

---

## 📈 Overall Project Completion

| Module | Completion | Notes |
|--------|-----------|-------|
| Module 1: Career Intelligence | ~35% | Core analysis done; salary intelligence, AI coach, resume analyzer missing |
| Module 2: Study Intelligence | ~40% | Profile + university + scholarship done; roadmaps, visa, AI coach missing |
| Module 3: Global Opportunity | ~10% | Basic country scoring only |
| Module 4: AI Future Planner | 0% | Not started |
| **Infrastructure** | ~35% | Local dev only; database schema & seed scripts created |
| **Data Completeness** | ~15% | Minimal seed data in all categories |
| **AI Integration** | ~5% | Template strings only; no LLM |

### **Overall Estimated Completion: ~22%**

---

*This document will be updated as development progresses. Check git log for the latest commit history.*
