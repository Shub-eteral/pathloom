# 📊 PATHLOOM — Project Progress Tracker

> **Last Updated:** July 5, 2026
> **Project Start Date:** June 18, 2026
> **Development Days Elapsed:** ~17 of 40
> **Target Launch:** August 2026
>
> See also: [Project Context](./PROJECT_CONTEXT.md) · [Documentation Index](./docs/INDEX.md)

---

## 🏗️ Project Overview

Pathloom is an AI-powered Career, Study & Global Opportunity Intelligence Platform. The vision is to become a single platform that answers: *"Given who I am today, what is the best path to the future I want?"*

**Current Status:** Architecture Refactored — The monolithic frontend is fully decomposed into a routed structure with 11 custom page views. Phase 2 (Study Intelligence) data has been completely expanded (20 universities, 16 scholarships, 10 countries) and the admission chance engine is online.

---

## 🧱 Architecture & Tech Stack

### Current Implementation

| Layer | Technology | Status |
|-------|-----------|--------|
| **Frontend** | React 19 + Vite 8 + Router 7 + CSS Variables | ✅ Active |
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
├── frontend/             # React + Vite + Tailwind CSS 4 + Router 7
│   ├── src/
│   │   ├── App.jsx       # Routing layout and top shell (~50 lines)
│   │   ├── main.jsx      # React entry point with Providers
│   │   ├── index.css     # Tailwind CSS & Fonts import
│   │   ├── styles/
│   │   │   └── design-system.css  # Custom CSS design system tokens
│   │   ├── data/         # Extended static datasets (countries, universities, scholarships)
│   │   ├── contexts/     # Shared states (ApiContext, ProfileContext)
│   │   ├── hooks/        # Custom react hooks (career, study, export logic)
│   │   ├── components/
│   │   │   ├── ui/       # UI primitive components (Gauges, buttons, cards)
│   │   │   └── layout/   # Layout elements (Header, Sidebar, Footer)
│   │   └── pages/        # Route page views (Dashboard, Career, Study)
│   └── public/
│       └── pathloom-logo.png
├── README.md
├── .gitignore
└── PROJECT_PROGRESS.md   # This file
```

---

## 🎯 Module-by-Module Progress

### Module 1: 💼 Career Intelligence

| Feature | Vision Description | Status | Implementation Details |
|---------|-------------------|--------|----------------------|
| **Career Analysis** | User enters skills → readiness score + missing skills + roadmap | ✅ Done | Decomposed Page view; client hooks interact with backend engine |
| **Career Recommendation** | Best match + alternative career roles | ✅ Done | Decomposed recommendations page with AI insights card |
| **Career Comparison** | Side-by-side: salary, demand, difficulty, growth | ✅ Done | Dynamic compare page with detailed metrics table and chart |
| **Salary Intelligence** | Country-wise salary data | ⚠️ Partial | Only India LPA ranges in `careerinfo.csv`; no multi-country salary data |
| **Country Intelligence** | Best countries by demand, immigration, salary | 🔲 Not started | `countries.csv` exists (10 countries) but no country-career intelligence API |
| **Cost of Living Simulator** | City-level cost breakdown | 🔲 Not started | No data or logic implemented |
| **Market Trends** | Career demand trends over time | 🔲 Not started | No trending data or time-series analysis |
| **Resume Analyzer** | Upload PDF → extract skills → readiness | 🔲 Not started | No file upload or parsing logic |
| **AI Resume Feedback** | AI-powered resume suggestions | 🔲 Not started | Requires Gemini API integration |
| **AI Career Coach** | Conversational career guidance | 🔲 Not started | Requires Gemini API integration |
| **5-Year Career Planner** | Multi-year progression timeline | 🔲 Not started | No planner data model or logic |

**Module 1 Completion: ~50%** (analysis, recommendations, comparison, design components done; multi-country intelligence & AI coach not started)

---

### Module 2: 🎓 Study Intelligence

| Feature | Vision Description | Status | Implementation Details |
|---------|-------------------|--------|----------------------|
| **University Finder** | Search by country + program | ✅ Done | Expanded static data for 20 universities; program and requirements matching |
| **University Intelligence** | Ranking, tuition, acceptance rate, ROI | ✅ Done | QS rank, city, average salary, and employment rates displayed |
| **Scholarship Finder** | Browse scholarships by country/degree | ✅ Done | 16 scholarships covering all 10 target countries |
| **Admission Predictor** | Input CGPA/IELTS/GRE → acceptance probability | ✅ Done | Predictive chance formula per university with safe/target/reach tiers |
| **Study Cost Calculator** | Tuition + living cost + scholarships | ⚠️ Partial | Tuition and living cost displayed; net cost after scholarship not calculated |
| **Study Roadmap** | Month-by-month preparation plan | 🔲 Not started | No timeline generation logic |
| **Student Visa Planner** | Country → visa route steps | 🔲 Not started | Relocation roadmap preview on Global page |
| **AI Study Coach** | Conversational study guidance | 🔲 Not started | Requires Gemini API integration |
| **Academic Profile** | GPA, exam scores, document readiness | ✅ Done | Central profile setup (GPA scale conversion, score limits, doc checklists) |

**Module 2 Completion: ~75%** (Profile, finder, scholarship, country strategy complete; timelines and AI guide remaining)

---

### Module 3: 🌎 Global Opportunity Intelligence

| Feature | Vision Description | Status | Implementation Details |
|---------|-------------------|--------|----------------------|
| **Country Recommendation Engine** | Best country based on profile | ✅ Done | Integrated Country Strategy page with match scoring based on profile fit |
| **Immigration Intelligence** | Work visa, PR, citizenship routes | 🔲 Not started | Upcoming features listed |
| **Migration Planner** | Step-by-step migration path | 🔲 Not started | Upcoming features listed |
| **Global Salary Ranking** | Highest paying countries ranking | 🔲 Not started | Upcoming features listed |
| **Opportunity Score** | Per-country composite score | ⚠️ Partial | Core country Strategy metrics implemented (Safety index, PR score, top fields) |

**Module 3 Completion: ~30%** (strategy page, scoring, visual previews done)

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

1. **No real AI:** The "AI Insight" feature is a template string, not actual LLM output
2. **CSV database:** Not suitable for production; needs PostgreSQL migration (schema & seeding prepared)
3. **Incomplete data:** 6 of 15 roles have no skill mappings
4. **No authentication:** No user accounts or persistent storage
5. **No tests:** Zero unit tests or integration tests
6. **CORS wildcard:** `allow_origins=["*"]` in production is a security concern
7. **Frontend data duplication:** Countries/universities exist in both CSV backend and JS frontend
8. **No error boundaries:** Frontend has no React error boundaries
9. **No environment configuration:** Backend has no `.env` file or config management

---

## 📈 Overall Project Completion

| Module | Completion | Notes |
|--------|-----------|-------|
| Module 1: Career Intelligence | ~50% | Core dashboard & pages complete |
| Module 2: Study Intelligence | ~75% | Full dataset & eligibility complete |
| Module 3: Global Opportunity | ~30% | Country strategy page complete |
| Module 4: AI Future Planner | 0% | Not started |
| **Infrastructure** | ~45% | React Router 7 + Context providers + PostgreSQL schemas prepared |
| **Data Completeness** | ~40% | Extended countries (10), universities (20), scholarships (16) data |
| **AI Integration** | ~5% | Template-based placeholders |

### **Overall Estimated Completion: ~38%**

---

*This document will be updated as development progresses. Check git log for the latest commit history.*
