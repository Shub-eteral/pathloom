# 📝 Pathloom — Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [v0.82] — June 20, 2026

### Added
- **Admission Predictor** — Multi-factor eligibility engine with admission chance percentage and tier classification (Safe/Target/Reach)
- **Scholarship Matching** — Score-based scholarship matching with eligibility breakdown (MEXT, JASSO, DAAD)
- **Scholarship Analytics** — Detailed scholarship analysis with coverage, amounts, and deadline information
- **Country Strategy View** — Country match scoring based on university data
- **Document Readiness Checklist** — Track SOP, LOR, CV, passport, and transcript preparation
- **PhD-specific Fields** — Research projects, publications, and faculty match tracking in academic profile

### Improved
- University detail view with program requirements and admission analysis
- Academic profile summary dashboard

---

## [v0.80] — June 19, 2026

### Added
- **Academic Profile System** — Comprehensive form with GPA input (4.0/10.0 scale), standardized exam scores (SAT/ACT/GRE/GMAT/IELTS/TOEFL)
- **University Finder** — Search and filter universities by country and career goal
- **University Intelligence** — QS ranking, tuition, employment score display
- **University Sorting** — Sort by QS rank, cost, scholarship availability, eligibility, and match
- **Study Mode** — New journey mode with Career/Study toggle
- **Country Dataset** — 5 study destination countries (Japan, USA, Germany, Canada, Australia) with tuition, visa, and PR data
- **University Dataset** — 3 universities (University of Tokyo, Kyoto University, TU Munich) with programs and requirements
- **Scholarship Dataset** — 3 scholarships (MEXT, JASSO, DAAD) with eligibility criteria

---

## [v0.60] — June 19, 2026

### Added
- **Career Comparison Engine** — `GET /compare` endpoint for multi-role side-by-side comparison
- **Comparison Dashboard** — Visual comparison table with sortable columns and bar chart
- **Career Info Data** — `careerinfo.csv` with salary, demand, difficulty, and learning time for all 15 roles
- **`GET /career-info/{role_id}`** — Dynamic endpoint for career metadata retrieval
- **ComparisonChart Component** — Extracted bar chart for visual comparison

---

## [v0.50] — June 19, 2026

### Added
- **Explanation Engine** — `GET /explain` endpoint showing matched vs. missing skills per role
- **Insight Engine** — `GET /insight` endpoint generating template-based career insight text
- **AI Insights** section in frontend with contextual career guidance text

---

## [v0.40] — June 19, 2026

### Added
- **Custom Design System** — "Thread Gauge" theme with Space Grotesk, IBM Plex Sans, and IBM Plex Mono fonts
- **Color Palette** — Canvas, Indigo, Brass, Rust, and Teal color tokens
- **Thread Gauge Progress Bars** — Signature woven measuring tape visualization
- **UI Component Library** — Panels, chips, gauges, alerts, cards, dropdowns, tables
- **Profile Export/Import** — Save and load career profile as JSON file
- **Server Connection Status** — Live indicator in header showing backend connectivity

---

## [v0.30] — June 18, 2026

### Added
- **Career Recommendation Engine** — `GET /recommend` endpoint returning top 5 matching roles by skill overlap
- **Recommendation UI** — Best match hero card with career info + alternative role cards in grid layout
- **React Frontend** — Vite + React 19 + Tailwind CSS 4 project setup
- **Career Analysis Dashboard** — Readiness score display, missing skills tags, and upskilling roadmap

---

## [v0.20] — June 18, 2026

### Added
- **FastAPI Backend** — REST API server with CORS middleware
- **`GET /analyze`** — Career readiness analysis endpoint
- **`GET /roles`** — Career role listing endpoint
- **`GET /skills`** — Skill catalog endpoint
- **Readiness Scoring Algorithm** — Weighted importance scoring (1–10 scale)
- **Roadmap Engine** — Priority-ordered learning path generation
- **CLI Test Script** — `main.py` for standalone backend testing

---

## [v0.10] — June 18, 2026

### Added
- **Project Initialization** — Repository structure, documentation framework
- **Database Foundation** — CSV schema with `roles.csv` (15 roles), `skills.csv` (20 skills), `role_skills.csv` (45 mappings)
- **Domain Catalog** — 15 career domains in `domains.csv`
- **Country Catalog** — 10 countries in `countries.csv`
- **Documentation** — Vision document, scoring algorithm design, roadmap engine design, requirements, development roadmap

---

## [Unreleased]

### Planned
- PostgreSQL/Supabase database migration
- Gemini API integration for AI coaches
- Multi-country salary intelligence
- Resume upload and AI analysis
- Immigration/visa pathway planner
- Cost of living simulator
- Frontend component refactoring (React Router)
- User authentication (Supabase Auth)
- Deployment to Vercel + Railway

---

> **Versioning:** Pathloom uses a simple `v0.XX` versioning during development.  
> Version `v1.0` will mark the first production release.
