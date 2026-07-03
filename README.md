# 🚀 Pathloom

### *"From Where You Are → To Where You Want To Be."*

**AI-Powered Career, Study & Global Opportunity Intelligence Platform**

[![Status](https://img.shields.io/badge/Status-In%20Development-yellow)]()
[![Launch](https://img.shields.io/badge/Launch%20Target-August%202026-blue)]()
[![Version](https://img.shields.io/badge/Version-v0.82-green)]()
[![Docs](https://img.shields.io/badge/Docs-Comprehensive-purple)]()

---

## 🌟 What is Pathloom?

Pathloom is a unified intelligence platform that helps users plan their **career**, **education**, and **global mobility** through AI-powered analysis. Instead of visiting LinkedIn, Roadmap.sh, Levels.fyi, QS Rankings, scholarship portals, and visa websites separately — Pathloom brings all of it into one place.

**Core question Pathloom answers:**
> *"Given who I am today, what is the best path to the future I want?"*

---

## ✨ Features

### 💼 Career Intelligence (Module 1) — ~35% Complete
| Feature | Status | Description |
|---------|--------|-------------|
| Career Analysis | ✅ Done | Enter your skills, get a weighted readiness score, see skill gaps |
| Career Recommendation | ✅ Done | Discover best-fit roles based on your skill set (top 5) |
| Career Comparison | ✅ Done | Compare roles side-by-side on salary, demand, difficulty |
| AI Insights | ✅ Done | Get contextual explanations for career matches |
| Upskilling Roadmap | ✅ Done | Priority-ordered learning path based on skill importance |
| Salary Intelligence | 🔲 Planned | Multi-country salary data |
| AI Career Coach | 🔲 Planned | Conversational guidance (Gemini API) |
| Resume Analyzer | 🔲 Planned | Upload PDF → auto-extract skills |

### 🎓 Study Intelligence (Module 2) — ~40% Complete
| Feature | Status | Description |
|---------|--------|-------------|
| Academic Profile | ✅ Done | GPA (4.0/10.0), exam scores, document readiness |
| University Finder | ✅ Done | Search by country and career goal with filtering |
| Admission Predictor | ✅ Done | Acceptance probability with tier classification |
| Scholarship Matching | ✅ Done | Eligibility-based scoring (MEXT, JASSO, DAAD) |
| Country Strategy | ✅ Done | Match scoring per study destination |
| Study Roadmap | 🔲 Planned | Month-by-month preparation timeline |
| AI Study Coach | 🔲 Planned | Conversational guidance (Gemini API) |

### 🌎 Global Opportunity Intelligence (Module 3) — ~10% Complete
| Feature | Status | Description |
|---------|--------|-------------|
| Country Scoring | ⚠️ Partial | Basic match scoring per country |
| Immigration Intelligence | 🔲 Planned | Visa pathways and PR routes |
| Cost of Living | 🔲 Planned | City-level cost simulator |

### 🤖 AI Future Planner (Module 4) — 0% Complete
| Feature | Status | Description |
|---------|--------|-------------|
| Comprehensive Life Plan | 🔲 Planned | Career + study + migration unified timeline |

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React + Vite + Tailwind CSS | React 19.2.6, Vite 8.0.12, Tailwind 4.3.1 |
| **Backend** | Python + FastAPI + Uvicorn | Python 3.10+, FastAPI latest |
| **Database** | CSV flat files (PostgreSQL migration planned) | Schema ready |
| **AI** | Template-based (Gemini API integration planned) | — |
| **Hosting** | Local development (Vercel + Railway planned) | — |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18 · **Python** ≥ 3.10 · **npm** ≥ 9

### Backend

```bash
cd backend
pip install fastapi uvicorn
uvicorn app:app --reload
```
→ API running at **http://127.0.0.1:8000**

### Frontend

```bash
cd frontend
npm install
npm run dev
```
→ App running at **http://localhost:5173**

> The frontend connects to the backend at `http://127.0.0.1:8000`. Override with the `VITE_API_BASE` environment variable.

---

## 📡 API Overview

| Endpoint | Description |
|----------|-------------|
| `GET /roles` | List all 15 career roles |
| `GET /skills` | List all 20 skills |
| `GET /analyze` | Career readiness score + missing skills + roadmap |
| `GET /recommend` | Top 5 role recommendations by skill match |
| `GET /explain` | Matched vs. missing skill breakdown |
| `GET /insight` | AI-generated career insight |
| `GET /career-info/{id}` | Salary, demand, difficulty per role |
| `GET /compare` | Multi-role side-by-side comparison |

**Full documentation:** [API Reference](./docs/API_REFERENCE.md)  
**Interactive docs:** http://127.0.0.1:8000/docs (when server is running)

---

## 📊 Data Model

**15 career roles** across 4 domains · **20 technical skills** · **45 role-skill mappings** with importance weights

| Domain | Roles |
|--------|-------|
| AI & Data | Data Analyst, Data Engineer, ML Engineer, AI Engineer, Data Scientist, Business Analyst |
| Software Development | Frontend Developer, Backend Developer, Full Stack Developer, Mobile Developer |
| Cloud Computing | DevOps Engineer, Cloud Engineer, Cloud Architect |
| Cybersecurity | Cybersecurity Analyst, Security Engineer |

**Full data reference:** [Data Dictionary](./docs/DATA_DICTIONARY.md)

---

## 📁 Project Structure

```
pathloom/
├── backend/              # Python FastAPI server (14 files)
│   ├── app.py            # API endpoints and CORS configuration
│   ├── scoring.py        # Weighted readiness score algorithm
│   ├── recommender.py    # Role recommendation engine
│   ├── comparison.py     # Multi-role comparison
│   ├── roadmap.py        # Learning path generator
│   ├── explainer.py      # Skill match/miss breakdown
│   └── insights.py       # Template-based insight generator
├── database/             # CSV data files and SQL schema
│   ├── schema.sql        # PostgreSQL schema (14 tables)
│   ├── roles.csv, skills.csv, role_skills.csv, careerinfo.csv
│   └── seed/             # JSON seed data
├── frontend/             # React + Vite + Tailwind CSS 4
│   └── src/
│       ├── App.jsx       # Main application component
│       ├── components/   # Reusable UI components
│       └── data/         # Static study intelligence data
├── docs/                 # 📚 Comprehensive documentation suite
├── README.md             # This file
├── PROJECT_CONTEXT.md    # Living project state snapshot
├── PROJECT_PROGRESS.md   # Module-by-module progress tracker
└── CHANGELOG.md          # Version history
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[📚 Documentation Index](./docs/INDEX.md)** | Start here — links to all docs |
| [PRD](./docs/PRD.md) | Product requirements with user stories |
| [System Design](./docs/SYSTEM_DESIGN.md) | Architecture diagrams and data flows |
| [Architecture](./docs/ARCHITECTURE.md) | ADRs and technical decisions |
| [API Reference](./docs/API_REFERENCE.md) | Complete REST API documentation |
| [Data Dictionary](./docs/DATA_DICTIONARY.md) | All data models and schemas |
| [Contributing](./docs/CONTRIBUTING.md) | Developer setup and code conventions |
| [Vision](./docs/vision.md) | Mission and product direction |
| [Roadmap](./docs/roadmap.md) | 40-day development plan |
| [Scoring Algorithm](./docs/scoring.md) | Readiness scoring design |
| [Roadmap Engine](./docs/roadmap_engine.md) | Learning path engine design |
| [Project Context](./PROJECT_CONTEXT.md) | Full project state snapshot |
| [Progress Tracker](./PROJECT_PROGRESS.md) | Detailed feature status |
| [Changelog](./CHANGELOG.md) | Version history |

---

## 📈 Development Progress

| Module | Progress |
|--------|----------|
| 💼 Career Intelligence | ███░░░░░░░ ~35% |
| 🎓 Study Intelligence | ████░░░░░░ ~40% |
| 🌎 Global Opportunity | █░░░░░░░░░ ~10% |
| 🤖 AI Future Planner | ░░░░░░░░░░ 0% |
| **Overall** | ██░░░░░░░░ **~22%** |

**Detailed progress:** [PROJECT_PROGRESS.md](./PROJECT_PROGRESS.md)

---

## 🗺️ Roadmap

| Phase | Days | Status |
|-------|------|--------|
| Phase 1: Foundation | 1–10 | ✅ Complete |
| Phase 2: Study Intelligence | 11–20 | 🔄 In Progress |
| Phase 3: AI & Global Intelligence | 21–30 | 🔲 Not Started |
| Phase 4: Launch | 31–40 | 🔲 Not Started |

**Full roadmap:** [docs/roadmap.md](./docs/roadmap.md)

---

## 🤝 Contributing

This project is in active development. See our [Contributing Guide](./docs/CONTRIBUTING.md) for setup instructions, code conventions, and how to add features.

---

## 📄 License

This project is private and not yet licensed for distribution.

---

<p align="center">
  <strong>Pathloom</strong> — Plan Your Career. Plan Your Studies. Plan Your Future.
</p>