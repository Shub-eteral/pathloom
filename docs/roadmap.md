# 🗺️ Pathloom — 40-Day Development Roadmap

> Last updated: July 5, 2026
> Start date: June 18, 2026 | Target launch: August 2026

---

## Phase 1: Foundation (Days 1–10) ✅ COMPLETE

**Goal:** Build the core career intelligence engine with a working full-stack prototype.

### Day 1–3: Setup & Database
- [x] Initialize repository with project structure
- [x] Create documentation (vision, scoring, roadmap engine)
- [x] Design CSV database schema (roles, skills, role_skills, domains, countries)
- [x] Populate initial data (15 roles, 20 skills, 45 role-skill mappings)

### Day 4–7: Backend Core
- [x] Build readiness scoring algorithm (weighted importance model)
- [x] Build skill name resolution system
- [x] Build roadmap engine (priority-sorted learning paths)
- [x] Create FastAPI server with CORS
- [x] Implement `/analyze`, `/roles`, `/skills` endpoints
- [x] CLI test script (`main.py`)

### Day 8–10: Frontend MVP & Intelligence
- [x] Create React + Vite + Tailwind project
- [x] Design custom UI system (thread gauge, panels, chips, alerts)
- [x] Build career analysis dashboard (readiness score, missing skills, roadmap)
- [x] Build recommendation engine + `/recommend` endpoint
- [x] Build explanation engine + `/explain` endpoint
- [x] Build insight engine + `/insight` endpoint
- [x] Build comparison engine + `/compare` endpoint
- [x] Add career info data (`careerinfo.csv`) with salary, demand, difficulty
- [x] Career comparison table + chart visualization
- [x] Profile export/import (JSON)

**Deliverable:** Working career intelligence MVP with 8 API endpoints.

---

## Phase 2: Study Intelligence (Days 11–20) ✅ COMPLETE

**Goal:** Build the study planning module with university/scholarship matching.

### Day 11–14: Study Mode Foundation
- [x] Add journey mode selector (Career / Study toggle)
- [x] Create static study data (countries, universities, scholarships)
- [x] Build academic profile form (GPA, degree level, exam scores)
- [x] Build university finder with country/career filtering
- [x] University sorting (QS rank, cost, scholarship, eligibility, match)

### Day 15–17: Admission Intelligence
- [x] Build multi-factor eligibility engine
- [x] Build admission chance predictor (GPA + language + admission exam + profile)
- [x] Admission tier classification (Safe / Target / Reach)
- [x] Build scholarship match scoring engine
- [x] Scholarship analysis with eligibility breakdown
- [x] Country strategy view with match scoring

### Day 18–20: Profile & Data Expansion
- [x] Document readiness checklist (SOP, LOR, CV, passport, transcripts)
- [x] PhD-specific fields (research projects, publications, faculty match)
- [x] Profile summary dashboard
- [x] Expand university database (target: 20+ universities)
- [x] Expand scholarship database (target: 15+ scholarships)
- [x] Complete role-skill mappings for all 15 roles

**Deliverable:** Study planner with admission prediction and scholarship matching.

---

## Phase 3: AI Integration & Global Intelligence (Days 21–30) 🔄 IN PROGRESS

**Goal:** Integrate Gemini AI and build the global opportunity module.

### Day 21–23: Database Migration
- [ ] Set up PostgreSQL on Railway
- [x] Create database schema (`database/schema.sql`)
- [x] Create seed data & seed scripts (`database/seed/`, `backend/seed.py`)
- [ ] Migrate CSV data to PostgreSQL
- [ ] Update backend loaders to use SQL queries
- [ ] Add connection pooling and error handling

### Day 24–26: AI Integration
- [ ] Integrate Gemini API
- [ ] Build AI Career Coach (conversational endpoint)
- [ ] Build AI Study Coach (university/scholarship guidance)
- [ ] Replace template-based insights with AI-generated insights
- [ ] Add resume upload + AI-powered skill extraction

### Day 27–28: Global Opportunity Module
- [ ] Add multi-country salary data
- [ ] Build country recommendation engine
- [ ] Add immigration/visa pathway data
- [ ] Build migration planner
- [ ] Build cost-of-living simulator

### Day 29–30: Intelligence Features
- [ ] Market trends data and visualization
- [ ] Global salary ranking
- [ ] Opportunity score per country
- [ ] AI resume feedback

**Deliverable:** AI-powered coaches, global intelligence data, and PostgreSQL backend.

---

## Phase 4: Flagship Features & Launch (Days 31–40)

**Goal:** Build the AI Future Planner, polish the product, and deploy.

### Day 31–33: Flagship Features
- [ ] 5-Year Career Planner
- [ ] AI Future Planner (comprehensive life plan generation)
- [ ] Student visa pathway planner
- [ ] Study roadmap generation (month-by-month)

### Day 34–36: Architecture & Polish
- [x] Refactor `App.jsx` into modular components with React Router (Completed early in Phase 2)
- [ ] Add user authentication (sign up / log in)
- [ ] Persistent user profiles (database-backed)
- [ ] Responsive design optimization for mobile
- [ ] Error boundaries and loading states

### Day 37–38: Testing & QA
- [ ] Backend unit tests (pytest)
- [ ] Frontend component tests
- [ ] API integration tests
- [ ] Cross-browser testing
- [ ] Performance profiling

### Day 39–40: Deployment & Launch
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend + PostgreSQL to Railway
- [ ] Configure production environment variables
- [ ] Set up CI/CD pipeline
- [ ] Landing page and SEO optimization
- [ ] Business model implementation (Free / Pro / Premium tiers)

**Deliverable:** Production-ready AI-powered career, study, and opportunity platform.

---

## Progress Summary

| Phase | Days | Status | Completion |
|-------|------|--------|------------|
| Phase 1: Foundation | 1–10 | ✅ Complete | 100% |
| Phase 2: Study Intelligence | 11–20 | ✅ Complete | 100% |
| Phase 3: AI & Global | 21–30 | 🔄 In Progress | ~10% (schema/seeding ready) |
| Phase 4: Launch | 31–40 | 🔲 Not Started | ~5% (router refactor completed early) |

---

## Risk Factors

| Risk | Impact | Mitigation |
|------|--------|------------|
| Gemini API rate limits | May limit AI coach responsiveness | Cache responses, implement fallback templates |
| Data quality | Poor university/salary data affects recommendations | Manual curation + user feedback loop |
| Monolithic frontend | Slows development velocity | Decomposed and restructured with Router (Completed) |
| Scope creep | 40 days is tight for full vision | Prioritize MVP of each module |
| No tests | Regressions go undetected | Add test coverage in Phase 4 |