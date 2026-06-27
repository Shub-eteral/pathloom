# 🚀 Pathloom

### *"From Where You Are → To Where You Want To Be."*

**AI-Powered Career, Study & Global Opportunity Intelligence Platform**

[![Status](https://img.shields.io/badge/Status-In%20Development-yellow)]()
[![Launch](https://img.shields.io/badge/Launch%20Target-August%202026-blue)]()
[![Version](https://img.shields.io/badge/Version-v0.82-green)]()

---

## 🌟 What is Pathloom?

Pathloom is a unified intelligence platform that helps users plan their **career**, **education**, and **global mobility** through AI-powered analysis. Instead of visiting LinkedIn, Roadmap.sh, Levels.fyi, QS Rankings, scholarship portals, and visa websites separately — Pathloom brings all of it into one place.

**Core question Pathloom answers:**
> *"Given who I am today, what is the best path to the future I want?"*

---

## ✨ Features

### 💼 Career Intelligence (Module 1)
- **Career Analysis** — Enter your skills, get a readiness score, see skill gaps, and receive an upskilling roadmap
- **Career Recommendation** — Discover the best-fit career roles based on your existing skill set
- **Career Comparison** — Compare roles side-by-side on salary, demand, difficulty, and learning time
- **AI Insights** — Get contextual explanations for why a career is a good match
- **Readiness Scoring** — Weighted algorithm that considers skill importance, not just count

### 🎓 Study Intelligence (Module 2)
- **University Finder** — Search universities by country and career goal, with QS ranking and tuition data
- **Academic Profile** — Track GPA (4.0/10.0 scale), standardized exam scores (SAT/ACT/GRE/GMAT/IELTS/TOEFL), and document readiness
- **Admission Predictor** — Get acceptance probability with tier classification (Safe/Target/Reach)
- **Scholarship Matching** — Match scholarships by country, degree level, and academic profile with eligibility scoring
- **Country Strategy** — Compare study destinations with match scores

### 🌎 Global Opportunity Intelligence (Module 3) *(In Progress)*
- **Country Scoring** — Basic match scoring per country based on university data

### 🤖 AI Future Planner (Module 4) *(Planned)*
- Combined career + study + migration timeline generation

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React + Vite + Tailwind CSS | React 19, Vite 8, Tailwind 4 |
| **Backend** | Python + FastAPI | FastAPI (latest) |
| **Database** | CSV flat files (migration to PostgreSQL planned) | — |
| **AI** | Template-based (Gemini API integration planned) | — |
| **Hosting** | Local development (Vercel + Railway planned) | — |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **npm** or **yarn**

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
pip install fastapi uvicorn

# Start the API server
uvicorn app:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

> **Note:** The frontend expects the backend API to be running at `http://127.0.0.1:8000`. You can override this by setting the `VITE_API_BASE` environment variable.

---

## 📡 API Reference

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/` | GET | Health check | — |
| `/roles` | GET | List all career roles | — |
| `/skills` | GET | List all skills | — |
| `/analyze` | GET | Career readiness analysis | `role` (role ID), `skills_input` (comma-separated skill IDs) |
| `/recommend` | GET | Get role recommendations | `skills_input` (comma-separated skill IDs) |
| `/explain` | GET | Skill match explanation | `role_id`, `skills_input` |
| `/insight` | GET | AI career insight | `role_id`, `skills_input` |
| `/career-info/{role_id}` | GET | Career details (salary, demand) | `role_id` (path param) |
| `/compare` | GET | Compare multiple roles | `role_ids` (comma-separated), `skills_input` |

### Example API Calls

```bash
# Get readiness score for Data Engineer with Python, SQL, Git
curl "http://127.0.0.1:8000/analyze?role=2&skills_input=1,2,13"

# Get career recommendations based on skills
curl "http://127.0.0.1:8000/recommend?skills_input=1,2,13"

# Compare Data Engineer vs Data Scientist vs AI Engineer
curl "http://127.0.0.1:8000/compare?role_ids=2,5,4&skills_input=1,2,13"
```

---

## 📊 Data Model

### Career Roles (15 roles across 4 domains)

| Domain | Roles |
|--------|-------|
| AI & Data | Data Analyst, Data Engineer, ML Engineer, AI Engineer, Data Scientist, Business Analyst |
| Software Development | Frontend Developer, Backend Developer, Full Stack Developer, Mobile Developer |
| Cloud Computing | DevOps Engineer, Cloud Engineer, Cloud Architect |
| Cybersecurity | Cybersecurity Analyst, Security Engineer |

### Skills (20 technical skills)

Python, SQL, Excel, Pandas, NumPy, Machine Learning, Deep Learning, PyTorch, TensorFlow, Spark, Docker, AWS, Git, JavaScript, React, Node.js, HTML, CSS, Statistics, Data Visualization

### Readiness Score Algorithm

```
Readiness Score = (User Skill Points / Total Required Skill Points) × 100
```

Each skill has an **importance weight** (1–10). The score considers not just whether you know a skill, but how critical that skill is to the role.

---

## 📁 Project Structure

```
pathloom/
├── backend/              # Python FastAPI server
│   ├── app.py            # API endpoints and server configuration
│   ├── scoring.py        # Readiness score algorithm
│   ├── recommender.py    # Role recommendation engine
│   ├── comparison.py     # Multi-role comparison logic
│   ├── roadmap.py        # Learning path generator
│   ├── explainer.py      # Skill match/miss breakdown
│   ├── insights.py       # Career insight text generator
│   ├── career_loader.py  # Career metadata loader
│   ├── data_loader.py    # Role-skill mapping loader
│   ├── role_loader.py    # Role catalog loader
│   ├── skill_loader.py   # Skill catalog loader
│   └── main.py           # CLI testing script
├── database/             # CSV data files
│   ├── roles.csv         # 15 career roles
│   ├── skills.csv        # 20 skills
│   ├── role_skills.csv   # Role-skill mappings with importance weights
│   ├── careerinfo.csv    # Salary, demand, difficulty per role
│   ├── countries.csv     # 10 target countries
│   └── domains.csv       # 15 career domains
├── frontend/             # React + Vite application
│   └── src/
│       ├── App.jsx       # Main application component
│       ├── components/   # Reusable UI components
│       └── data/         # Static study intelligence data
├── docs/                 # Design & architecture documentation
├── PROJECT_PROGRESS.md   # Detailed progress tracker
└── README.md             # This file
```

---

## 📈 Development Progress

See [PROJECT_PROGRESS.md](./PROJECT_PROGRESS.md) for the detailed module-by-module progress tracker.

| Module | Progress |
|--------|----------|
| 💼 Career Intelligence | ███░░░░░░░ ~35% |
| 🎓 Study Intelligence | ████░░░░░░ ~40% |
| 🌎 Global Opportunity | █░░░░░░░░░ ~10% |
| 🤖 AI Future Planner | ░░░░░░░░░░ 0% |
| **Overall** | ██░░░░░░░░ **~20%** |

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅ (Days 1–10)
- [x] Project setup and database schema
- [x] Readiness scoring algorithm
- [x] Career recommendation engine
- [x] FastAPI backend with CORS
- [x] React frontend with design system
- [x] Career comparison dashboard
- [x] Profile export/import

### Phase 2: Study Intelligence 🔄 (Days 11–20)
- [x] Academic profile system
- [x] University finder and filtering
- [x] Admission predictor
- [x] Scholarship matching engine
- [ ] Migrate to PostgreSQL
- [ ] Expand university/scholarship data

### Phase 3: AI & Global Features (Days 21–30)
- [ ] Gemini API integration
- [ ] AI Career Coach
- [ ] AI Study Coach
- [ ] Resume upload and analysis
- [ ] Multi-country salary intelligence
- [ ] Visa/immigration planner
- [ ] Cost of living simulator

### Phase 4: Launch (Days 31–40)
- [ ] AI Future Planner
- [ ] 5-Year Career Planner
- [ ] Market trends dashboard
- [ ] Deploy to Vercel + Railway
- [ ] Testing and QA
- [ ] Landing page and SEO

---

## 🤝 Contributing

This project is currently in active development. Contributions, feedback, and ideas are welcome.

---

## 📄 License

This project is private and not yet licensed for distribution.

---

<p align="center">
  <strong>Pathloom</strong> — Plan Your Career. Plan Your Studies. Plan Your Future.
</p>