# 📋 Pathloom — Product Requirements Document (PRD)

> Version 1.0 · July 2026  
> Status: Living Document

---

## 1. Executive Summary

**Pathloom** is an AI-powered unified intelligence platform that helps users plan their career, education, and global mobility through data-driven analysis. It replaces the need to visit 8+ fragmented platforms (LinkedIn, Roadmap.sh, Levels.fyi, QS Rankings, scholarship portals, visa websites, ChatGPT) by bringing career analysis, university matching, scholarship discovery, and migration planning into one cohesive experience.

**Core Value Proposition:**  
> *"Given who I am today, what is the best path to the future I want?"*

---

## 2. Problem Statement

### The Problem

Students and early-career professionals face **decision paralysis** when planning their career, education, and global mobility. The information they need is scattered across dozens of disconnected platforms, each with its own interface, data format, and limitations.

### Pain Points

| Pain Point | Impact |
|-----------|--------|
| **Fragmented information** | Users visit 8+ platforms to answer basic career/study questions |
| **No unified analysis** | Career, study, and migration decisions are treated as separate problems |
| **Generic advice** | Most tools provide one-size-fits-all guidance without personalization |
| **Outdated data** | Many platforms have stale salary, scholarship, or visa information |
| **No actionable roadmaps** | Users know *what* to do but not *how* or *in what order* |
| **Decision paralysis** | Too many options with no way to compare trade-offs objectively |

### Market Opportunity

- **1.1 billion** students globally (UNESCO, 2025)
- **5.6 million** international students annually (growing 10% YoY)
- **67%** of professionals consider career pivots within 5 years
- Career guidance market valued at **$2.4B** and growing

---

## 3. Target Users & Personas

### Persona 1: The Aspiring Student (Aarav, 21)
- **Profile:** Final-year CS student in India
- **Goal:** Master's degree abroad → tech career in USA/Canada/Germany
- **Needs:** University shortlisting, scholarship matching, admission prediction, visa planning
- **Frustration:** Spends hours comparing universities across 10+ tabs; no way to see which scholarships he actually qualifies for

### Persona 2: The Career Pivoter (Priya, 27)
- **Profile:** Marketing professional wanting to switch to Data Science
- **Goal:** Understand skill gaps, get a learning roadmap, find the right role
- **Needs:** Career readiness scoring, skill gap analysis, structured upskilling plan
- **Frustration:** Doesn't know which skills to learn first or how long it will take

### Persona 3: The Global Mover (Ravi, 30)
- **Profile:** Mid-level software engineer exploring international opportunities
- **Goal:** Move to a country with best career prospects, salary, and quality of life
- **Needs:** Country comparison, salary intelligence, visa pathway planning, cost of living
- **Frustration:** Can't find a single place that compares career opportunities across countries

---

## 4. Feature Requirements

### Module 1: 💼 Career Intelligence

#### F1.1 — Career Analysis ✅ `IMPLEMENTED`
**As a** user, **I want to** select a target career role and my existing skills **so that** I can see how ready I am for that role.

| Acceptance Criteria | Status |
|-------------------|--------|
| User can select from 15+ career roles across 4 domains | ✅ Done |
| User can select from 20+ technical skills | ✅ Done |
| System calculates a weighted readiness score (0-100%) | ✅ Done |
| System identifies missing skills | ✅ Done |
| System generates a priority-ordered learning roadmap | ✅ Done |

#### F1.2 — Career Recommendation ✅ `IMPLEMENTED`
**As a** user, **I want to** receive career role suggestions based on my skills **so that** I can discover roles I may not have considered.

| Acceptance Criteria | Status |
|-------------------|--------|
| System recommends top 5 matching roles | ✅ Done |
| Results sorted by skill overlap percentage | ✅ Done |
| Each recommendation shows match score | ✅ Done |

#### F1.3 — Career Comparison ✅ `IMPLEMENTED`
**As a** user, **I want to** compare multiple roles side-by-side **so that** I can make an informed decision.

| Acceptance Criteria | Status |
|-------------------|--------|
| Compare 2+ roles on salary, demand, difficulty, learning time | ✅ Done |
| Readiness scores shown per role | ✅ Done |
| Visual chart comparison | ✅ Done |

#### F1.4 — Salary Intelligence 🔲 `PLANNED`
**As a** user, **I want to** see country-wise salary data for my target role **so that** I can understand earning potential globally.

| Acceptance Criteria | Status |
|-------------------|--------|
| Salary ranges by experience level (entry/mid/senior) | 🔲 Not started |
| Multi-country salary comparison | 🔲 Not started |
| Local currency + USD conversion | 🔲 Not started |

#### F1.5 — AI Career Coach 🔲 `PLANNED`
**As a** user, **I want to** have a conversational AI assistant for career guidance **so that** I can get personalized advice.

| Acceptance Criteria | Status |
|-------------------|--------|
| Chat interface with context-aware responses | 🔲 Not started |
| Powered by Gemini API | 🔲 Not started |
| Uses user's profile data for personalization | 🔲 Not started |

#### F1.6 — Resume Analyzer 🔲 `PLANNED`
**As a** user, **I want to** upload my resume and get skills extracted automatically **so that** I don't have to manually select skills.

| Acceptance Criteria | Status |
|-------------------|--------|
| PDF upload support | 🔲 Not started |
| AI-powered skill extraction | 🔲 Not started |
| Auto-populate skills and suggest matching roles | 🔲 Not started |

#### F1.7 — 5-Year Career Planner 🔲 `PLANNED`
**As a** user, **I want to** see a multi-year career progression timeline **so that** I can plan long-term growth.

| Acceptance Criteria | Status |
|-------------------|--------|
| Career path visualization (role → role) | 🔲 Not started |
| Skill acquisition milestones | 🔲 Not started |
| Salary growth projections | 🔲 Not started |

---

### Module 2: 🎓 Study Intelligence

#### F2.1 — Academic Profile ✅ `IMPLEMENTED`
**As a** student, **I want to** input my academic credentials **so that** the system can assess my eligibility for universities and scholarships.

| Acceptance Criteria | Status |
|-------------------|--------|
| GPA input with 4.0/10.0 scale support | ✅ Done |
| Standardized exam scores (SAT/ACT/GRE/GMAT/IELTS/TOEFL) | ✅ Done |
| Document readiness checklist | ✅ Done |
| PhD-specific fields (research, publications) | ✅ Done |

#### F2.2 — University Finder ✅ `IMPLEMENTED`
**As a** student, **I want to** search and filter universities by country and program **so that** I can find schools that match my goals.

| Acceptance Criteria | Status |
|-------------------|--------|
| Filter by country and career goal | ✅ Done |
| Sort by QS rank, cost, scholarship availability, eligibility | ✅ Done |
| University detail view with programs and requirements | ✅ Done |

#### F2.3 — Admission Predictor ✅ `IMPLEMENTED`
**As a** student, **I want to** see my acceptance probability for a university **so that** I can set realistic expectations.

| Acceptance Criteria | Status |
|-------------------|--------|
| Multi-factor eligibility scoring | ✅ Done |
| Admission chance percentage | ✅ Done |
| Tier classification (Safe / Target / Reach) | ✅ Done |

#### F2.4 — Scholarship Matching ✅ `IMPLEMENTED`
**As a** student, **I want to** discover scholarships I'm eligible for **so that** I can fund my education.

| Acceptance Criteria | Status |
|-------------------|--------|
| Match scoring based on GPA, country, degree level | ✅ Done |
| Eligibility breakdown per scholarship | ✅ Done |
| Scholarship detail with amounts and deadlines | ✅ Done |

#### F2.5 — Study Roadmap 🔲 `PLANNED`
**As a** student, **I want to** get a month-by-month preparation plan **so that** I can stay on track.

| Acceptance Criteria | Status |
|-------------------|--------|
| Timeline from now to application deadline | 🔲 Not started |
| Milestone-based preparation steps | 🔲 Not started |
| Exam prep scheduling | 🔲 Not started |

#### F2.6 — AI Study Coach 🔲 `PLANNED`
**As a** student, **I want to** chat with an AI for study guidance **so that** I can get answers to university/scholarship questions.

| Acceptance Criteria | Status |
|-------------------|--------|
| Conversational interface | 🔲 Not started |
| Context-aware responses using academic profile | 🔲 Not started |

---

### Module 3: 🌎 Global Opportunity Intelligence

#### F3.1 — Country Scoring ⚠️ `PARTIAL`
**As a** user, **I want to** see which countries are best for my goals **so that** I can decide where to study or work.

| Acceptance Criteria | Status |
|-------------------|--------|
| Match score per country | ⚠️ Basic scoring only |
| Comprehensive opportunity scoring | 🔲 Not started |

#### F3.2 — Immigration Intelligence 🔲 `PLANNED`
| Acceptance Criteria | Status |
|-------------------|--------|
| Work visa pathway per country | 🔲 Not started |
| PR/citizenship timelines | 🔲 Not started |
| Step-by-step migration planning | 🔲 Not started |

#### F3.3 — Cost of Living Simulator 🔲 `PLANNED`
| Acceptance Criteria | Status |
|-------------------|--------|
| City-level cost breakdown | 🔲 Not started |
| Monthly vs. annual estimates | 🔲 Not started |
| Net salary after cost of living | 🔲 Not started |

---

### Module 4: 🤖 AI Future Planner (Flagship)

#### F4.1 — Comprehensive Life Plan 🔲 `PLANNED`
**As a** user, **I want to** input my profile (age, country, degree, career goal) and receive a complete life plan **so that** I have a unified roadmap combining career + education + migration.

| Acceptance Criteria | Status |
|-------------------|--------|
| Integrated career + study + migration timeline | 🔲 Not started |
| Success probability score | 🔲 Not started |
| Personalized milestone schedule | 🔲 Not started |

---

## 5. Prioritization (MoSCoW)

### Must Have (v1.0 Launch)
- ✅ Career analysis with readiness scoring
- ✅ Career recommendation engine
- ✅ Career comparison dashboard
- ✅ Academic profile system
- ✅ University finder with admission prediction
- ✅ Scholarship matching
- 🔲 PostgreSQL database migration
- 🔲 Complete role-skill mappings (all 15 roles)

### Should Have (v1.0 Launch)
- 🔲 Gemini AI integration (Career Coach + Study Coach)
- 🔲 Multi-country salary intelligence
- 🔲 Expanded university database (20+)
- 🔲 Expanded scholarship database (15+)
- 🔲 Frontend component refactoring

### Could Have (Post-Launch)
- 🔲 Resume upload + AI analysis
- 🔲 Immigration/visa pathway planner
- 🔲 Cost of living simulator
- 🔲 Market trends dashboard
- 🔲 5-Year Career Planner

### Won't Have (v1.0)
- 🔲 AI Future Planner (deferred to v2.0)
- 🔲 User authentication (deferred to v1.1)
- 🔲 Mobile app
- 🔲 Multi-language support

---

## 6. Business Model

| Tier | Price | Features |
|------|-------|----------|
| **Free** | ₹0 | Career analysis, readiness scoring, basic recommendations, university search |
| **Pro** | ₹499/month | AI Career Coach, AI Study Coach, country intelligence, salary intelligence, scholarship intelligence |
| **Premium** | ₹999/month | Resume AI analysis, SOP AI assistant, visa planner, migration planner, 5-Year Career Planner, AI Future Planner |

---

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Profile completion rate | > 60% | Users who complete career + academic profile |
| Feature engagement | > 3 features/session | Average features used per session |
| Readiness score improvement | Measurable | Score increase over 30 days |
| Scholarship match accuracy | > 80% | User confirms eligibility for matched scholarships |
| University application conversion | > 10% | Users who apply to a recommended university |
| User retention (30-day) | > 40% | Return visitors within 30 days |

---

## 8. Out of Scope (v1.0)

- Native mobile applications (iOS/Android)
- Multi-language / internationalization
- Real-time job listings integration
- Social features (forums, peer networking)
- Payment processing / subscription management
- Admin dashboard
- Automated email notifications

---

## 9. Dependencies & Risks

| Dependency/Risk | Impact | Mitigation |
|----------------|--------|------------|
| Gemini API availability & rate limits | AI features may be slow or unavailable | Implement caching, fallback to template-based responses |
| Data quality (universities, salaries) | Poor recommendations erode user trust | Manual curation + user feedback loop |
| 40-day development timeline | Scope may be too ambitious | Strict MoSCoW prioritization; ship Must Have first |
| Monolithic frontend (2,500+ line App.jsx) | Slows development velocity | Schedule refactoring in Phase 4 |
| No test coverage | Regressions go undetected | Add test suite in Phase 4 |

---

> **Document Owner:** Pathloom Development Team  
> **Last Updated:** July 3, 2026  
> **Review Cadence:** Updated with each major feature milestone
