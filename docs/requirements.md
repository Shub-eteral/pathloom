# 📋 Technical Requirements & Stack

> Last updated: July 3, 2026
>
> Part of the [Pathloom Documentation Suite](./INDEX.md)

---

## Architecture Overview

Pathloom follows a client-server architecture with a React frontend consuming a Python FastAPI backend. Data is currently stored in CSV flat files with a planned migration to PostgreSQL.

```
┌─────────────────┐     HTTP/REST     ┌─────────────────┐     File I/O     ┌──────────────┐
│   React + Vite  │  ◄────────────►   │   FastAPI        │  ◄──────────►   │  CSV / DB    │
│   (Port 5173)   │                   │   (Port 8000)    │                 │              │
│                 │                   │                  │                 │  roles.csv   │
│  Tailwind CSS 4 │                   │  CORS enabled    │                 │  skills.csv  │
│  Static data    │                   │  8 endpoints     │                 │  ...         │
└─────────────────┘                   └─────────────────┘                 └──────────────┘
```

---

## Frontend Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.6 | UI framework |
| **Vite** | 8.0.12 | Build tool and dev server |
| **Tailwind CSS** | 4.3.1 | Utility-first CSS framework |
| **@tailwindcss/vite** | 4.3.1 | Vite plugin for Tailwind |
| **ESLint** | 10.3.0 | Code linting |
| **@vitejs/plugin-react** | 6.0.1 | React Fast Refresh for Vite |

### Frontend Design System

- **Fonts:** Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (data/code)
- **Colors:** Canvas #F5F6F9, Indigo #232C52, Brass #AD7F2C, Rust #AE4F37, Teal #1F6F61
- **Signature element:** "Thread gauge" — woven measuring tape progress bars

---

## Backend Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Python** | 3.10+ | Runtime |
| **FastAPI** | Latest | REST API framework |
| **Uvicorn** | Latest | ASGI server |

### Backend Modules

| Module | File | Responsibility |
|--------|------|----------------|
| API Server | `app.py` | Route definitions, CORS, data loading |
| Scoring | `scoring.py` | Weighted readiness score calculation |
| Recommender | `recommender.py` | Skill-overlap role recommendation |
| Comparison | `comparison.py` | Multi-role comparison engine |
| Roadmap | `roadmap.py` | Learning path generation |
| Explainer | `explainer.py` | Matched/missing skill breakdown |
| Insights | `insights.py` | Template-based insight text |
| Career Loader | `career_loader.py` | `careerinfo.csv` parser |
| Data Loader | `data_loader.py` | `role_skills.csv` parser |
| Role Loader | `role_loader.py` | `roles.csv` parser |
| Skill Loader | `skill_loader.py` | `skills.csv` parser |
| CLI Test | `main.py` | Standalone testing script |

---

## Database (Current — CSV)

| File | Columns | Records | Purpose |
|------|---------|---------|---------|
| `roles.csv` | role_id, role_name, domain_id | 15 | Career role catalog |
| `skills.csv` | skill_id, skill_name | 20 | Technical skill catalog |
| `role_skills.csv` | role_id, skill_id, importance | 45 | Skill requirements per role |
| `careerinfo.csv` | role_id, salary, demand, difficulty, learning_time | 15 | Career metadata |
| `countries.csv` | country_id, country_name | 10 | Country catalog |
| `domains.csv` | domain_id, domain_name | 15 | Career domain catalog |

---

## Database (Planned — PostgreSQL)

Migration to PostgreSQL is planned for robust querying, relationships, and scalability. Key tables will include:

- `users` — User accounts and authentication
- `roles` / `skills` / `role_skills` — Career data (migrated from CSV)
- `universities` — University catalog with programs
- `scholarships` — Scholarship database
- `countries` — Country intelligence data
- `salary_data` — Multi-country salary information
- `visa_routes` — Immigration pathway data

---

## AI Integration (Planned — Gemini API)

The Gemini API will power:
- **AI Career Coach** — Conversational career guidance
- **AI Study Coach** — University and scholarship guidance
- **Resume Analysis** — Skill extraction from uploaded PDFs
- **AI Future Planner** — Comprehensive life plan generation
- **AI Resume Feedback** — Actionable resume improvement suggestions

---

## Hosting (Planned)

| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend deployment (React + Vite) |
| **Railway** | Backend deployment (FastAPI) + PostgreSQL |
| **GitHub** | Version control and CI/CD |

---

## Development Environment

| Tool | Purpose |
|------|---------|
| **VS Code** | Primary IDE |
| **Git** | Version control |
| **npm** | Frontend package management |
| **pip** | Python package management |
| **Uvicorn** | Local API server with hot-reload |
| **Vite** | Frontend dev server with HMR |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE` | `http://127.0.0.1:8000` | Backend API URL (frontend) |
| `GEMINI_API_KEY` | — | Google Gemini API key (planned) |
| `DATABASE_URL` | — | PostgreSQL connection string (planned) |