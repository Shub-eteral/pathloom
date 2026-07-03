# 🤝 Pathloom — Contributing Guide

> Welcome to Pathloom! This guide will help you set up the project locally and start contributing.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [How to Add a New API Endpoint](#how-to-add-a-new-api-endpoint)
- [How to Add a New Frontend Feature](#how-to-add-a-new-frontend-feature)
- [Code Conventions](#code-conventions)
- [Git Workflow](#git-workflow)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Requirement | Version | Check Command |
|------------|---------|---------------|
| **Node.js** | ≥ 18.x | `node --version` |
| **npm** | ≥ 9.x | `npm --version` |
| **Python** | ≥ 3.10 | `python --version` |
| **pip** | Latest | `pip --version` |
| **Git** | Latest | `git --version` |

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Shub-eteral/pathloom.git
cd pathloom
```

### 2. Start the Backend

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install fastapi uvicorn

# (Optional) For database seeding features
pip install python-dotenv supabase

# Start the API server with hot-reload
uvicorn app:app --reload
```

The API will be available at **http://127.0.0.1:8000**

Verify it's running:
```bash
curl http://127.0.0.1:8000/
# Expected: {"message":"Welcome to Pathloom API"}
```

### 3. Start the Frontend

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at **http://localhost:5173**

### 4. Verify Full Stack

1. Open http://localhost:5173 in your browser
2. Check the header for a green "Server Connected" indicator
3. Select a career role and some skills — you should see analysis results

> **Tip:** The frontend expects the backend at `http://127.0.0.1:8000`. Override with the `VITE_API_BASE` environment variable if needed.

---

## Project Structure

```
pathloom/
├── backend/                    # Python FastAPI server
│   ├── app.py                  # 🔑 Main API — all routes defined here
│   ├── scoring.py              # Readiness score algorithm
│   ├── recommender.py          # Role recommendation engine
│   ├── comparison.py           # Multi-role comparison
│   ├── roadmap.py              # Learning path generator
│   ├── explainer.py            # Skill match/miss breakdown
│   ├── insights.py             # Template-based insight generator
│   ├── career_loader.py        # Loads careerinfo.csv
│   ├── data_loader.py          # Loads role_skills.csv
│   ├── role_loader.py          # Loads roles.csv
│   ├── skill_loader.py         # Loads skills.csv
│   ├── seed.py                 # Database seeding (Supabase)
│   ├── main.py                 # CLI testing script
│   ├── .env.example            # Environment variable template
│   └── .env                    # Local env (git-ignored)
│
├── database/                   # Data files and schemas
│   ├── roles.csv               # 15 career roles
│   ├── skills.csv              # 20 technical skills
│   ├── role_skills.csv         # Role-skill mappings (importance weights)
│   ├── careerinfo.csv          # Salary, demand, difficulty per role
│   ├── countries.csv           # 10 countries
│   ├── domains.csv             # 15 career domains
│   ├── schema.sql              # PostgreSQL schema (14 tables)
│   └── seed/                   # JSON seed data
│       ├── domains.json
│       └── roles.json
│
├── frontend/                   # React + Vite + Tailwind CSS 4
│   ├── src/
│   │   ├── App.jsx             # 🔑 Main app component (~2,500 lines)
│   │   ├── App.css             # Design system CSS
│   │   ├── main.jsx            # React entry point
│   │   ├── index.css           # Tailwind CSS import
│   │   ├── components/
│   │   │   └── ComparisonChart.jsx
│   │   └── data/               # Static study data
│   │       ├── countries.js
│   │       ├── universities.js
│   │       └── scholarships.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── docs/                       # 📚 Documentation
│   ├── INDEX.md                # Documentation hub
│   ├── PRD.md                  # Product requirements
│   ├── SYSTEM_DESIGN.md        # System design
│   ├── ARCHITECTURE.md         # Architecture decisions
│   ├── API_REFERENCE.md        # API documentation
│   ├── DATA_DICTIONARY.md      # Data models
│   ├── CONTRIBUTING.md         # This file
│   ├── vision.md               # Product vision
│   ├── roadmap.md              # Development roadmap
│   ├── scoring.md              # Scoring algorithm design
│   ├── roadmap_engine.md       # Roadmap engine design
│   └── requirements.md         # Tech stack & versions
│
├── README.md                   # Project overview
├── PROJECT_CONTEXT.md          # Living project state snapshot
├── PROJECT_PROGRESS.md         # Module progress tracker
├── CHANGELOG.md                # Version history
└── .gitignore
```

---

## Development Workflow

### Understanding the Data Flow

```
User interaction in browser
    ↓
React App (frontend/src/App.jsx)
    ↓ HTTP fetch() call
FastAPI Server (backend/app.py)
    ↓ Calls engine function
Engine Module (scoring.py, recommender.py, etc.)
    ↓ Uses in-memory data
Data (loaded at startup from database/*.csv)
    ↓
Response JSON → React renders results
```

### Making Changes

1. **Backend changes**: Edit Python files in `backend/`, the server auto-reloads (if started with `--reload`)
2. **Frontend changes**: Edit files in `frontend/src/`, Vite provides instant HMR (Hot Module Replacement)
3. **Data changes**: Edit CSV files in `database/` — requires backend server restart
4. **Doc changes**: Edit markdown files in `docs/` — no restart needed

---

## How to Add a New API Endpoint

### Step 1: Create the Engine Module

Create a new Python file in `backend/`:

```python
# backend/my_feature.py

def my_feature_logic(param1, param2):
    """
    Describe what this engine does.
    
    Args:
        param1: Description
        param2: Description
    
    Returns:
        Description of return value
    """
    # Your logic here
    result = {"key": "value"}
    return result
```

### Step 2: Register the Route in `app.py`

```python
# In backend/app.py

# 1. Import your module
from my_feature import my_feature_logic

# 2. Add the route
@app.get("/my-endpoint")
def my_endpoint(param1: str, param2: str):
    return my_feature_logic(param1, param2)
```

### Step 3: Update Documentation

1. Add the endpoint to `docs/API_REFERENCE.md`
2. Update `PROJECT_CONTEXT.md` if it changes the project state

### Step 4: Test

```bash
# Test the endpoint
curl "http://127.0.0.1:8000/my-endpoint?param1=value1&param2=value2"

# Check auto-generated docs
# http://127.0.0.1:8000/docs
```

---

## How to Add a New Frontend Feature

### Current Architecture Note

> ⚠️ The frontend is currently a monolithic `App.jsx` (~2,500 lines). Until the Phase 4 refactor, new features are added as new sections within this file. Follow the existing patterns.

### Step 1: Add State

```jsx
// In App.jsx, near the other useState declarations
const [myFeatureData, setMyFeatureData] = useState(null);
```

### Step 2: Add API Call

```jsx
// In App.jsx, add a fetch function
const fetchMyFeature = async () => {
  try {
    const response = await fetch(`${API_BASE}/my-endpoint?param=value`);
    const data = await response.json();
    setMyFeatureData(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### Step 3: Add UI Section

Follow the existing design system patterns:

```jsx
{/* My Feature Panel */}
<div className="panel">
  <h2 className="panel-title">My Feature</h2>
  <div className="panel-content">
    {/* Your UI here */}
  </div>
</div>
```

### Step 4: Update Documentation

Update `PROJECT_CONTEXT.md` and `PROJECT_PROGRESS.md` to reflect the new feature.

---

## Code Conventions

### Python (Backend)

- **Style:** PEP 8 compliant
- **Functions:** Use descriptive names, e.g., `calculate_readiness()` not `calc_r()`
- **Modules:** One responsibility per file (single engine per module)
- **Data types:** Use built-in types (`list`, `dict`, `str`, `int`)
- **Error handling:** Use `HTTPException` for API errors
- **Docstrings:** Google-style docstrings for all public functions

### JavaScript/JSX (Frontend)

- **Framework:** React 19 with functional components and hooks
- **Styling:** Tailwind CSS 4 utility classes + custom design system classes in `App.css`
- **State:** `useState` hooks (no external state management)
- **API calls:** `fetch()` API (no axios)
- **Naming:** camelCase for variables and functions, PascalCase for components

### CSS Design System

| Token | Usage |
|-------|-------|
| `var(--canvas)` / `#F5F6F9` | Background |
| `var(--indigo)` / `#232C52` | Primary text, headers |
| `var(--brass)` / `#AD7F2C` | Accents, highlights |
| `var(--rust)` / `#AE4F37` | Warnings, low scores |
| `var(--teal)` / `#1F6F61` | Success, high scores |
| Font: Space Grotesk | Display headings |
| Font: IBM Plex Sans | Body text |
| Font: IBM Plex Mono | Data, numbers, code |

---

## Git Workflow

### Branch Naming

```
feature/short-description     # New features
fix/short-description          # Bug fixes
docs/short-description         # Documentation changes
refactor/short-description     # Code refactoring
```

### Commit Messages

Follow conventional commits:

```
feat: add scholarship matching engine
fix: handle empty skill list in /analyze
docs: add API reference documentation
refactor: extract comparison chart component
data: add role-skill mappings for DevOps Engineer
```

### Workflow

1. Create a feature branch from `main`
2. Make changes and commit with descriptive messages
3. Test locally (backend + frontend)
4. Push and create a Pull Request
5. Update relevant documentation

---

## Testing

> **Note:** Automated tests are not yet implemented. This section documents the planned testing approach.

### Backend Testing (Planned — pytest)

```bash
cd backend
pip install pytest httpx
pytest
```

### Frontend Testing (Planned)

```bash
cd frontend
npm test
```

### Manual Testing Checklist

Before submitting changes, verify:

- [ ] Backend server starts without errors (`uvicorn app:app --reload`)
- [ ] All existing API endpoints return expected responses
- [ ] Frontend loads and connects to backend (green indicator)
- [ ] Career analysis flow works (select role → select skills → see results)
- [ ] Study mode works (academic profile → university finder → results)
- [ ] No console errors in browser DevTools

---

## Troubleshooting

### Backend won't start

```bash
# Check Python version
python --version  # Should be ≥ 3.10

# Install dependencies
pip install fastapi uvicorn

# Check if port 8000 is in use
netstat -ano | findstr :8000  # Windows
lsof -i :8000                 # Mac/Linux
```

### Frontend won't connect to backend

1. Ensure backend is running at `http://127.0.0.1:8000`
2. Check CORS — backend allows all origins (`*`)
3. Check the browser console for network errors
4. Try: `curl http://127.0.0.1:8000/` to verify backend

### CSV data not loading

- CSV files must be in the `database/` directory (relative to project root)
- Check file encoding (must be UTF-8)
- Verify column headers match expected names exactly
- Backend must be restarted after CSV changes

---

> **Questions?** Open an issue or reach out to the development team.  
> **Last Updated:** July 3, 2026
