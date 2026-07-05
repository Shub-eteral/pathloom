# 🏗️ Pathloom — System Design Document

> Version 1.0 · July 2026  
> Status: Living Document

---

## 1. System Overview

Pathloom is a three-tier web application following a **client-server architecture** with a React frontend consuming a Python FastAPI backend. Data is currently stored in CSV flat files, with a planned migration to PostgreSQL via Supabase.

---

## 2. High-Level Architecture

```mermaid
graph TB
    subgraph Client["🖥️ Client Layer"]
        Browser["Web Browser"]
        ReactApp["React 19 + Vite 8 SPA"]
    end

    subgraph Server["⚙️ Server Layer"]
        FastAPI["FastAPI Application<br/>Port 8000"]
        subgraph Engines["Intelligence Engines"]
            Scoring["Scoring Engine"]
            Recommender["Recommender Engine"]
            Comparison["Comparison Engine"]
            Roadmap["Roadmap Engine"]
            Explainer["Explainer Engine"]
            Insights["Insights Engine"]
        end
        subgraph Loaders["Data Loaders"]
            RoleLoader["Role Loader"]
            SkillLoader["Skill Loader"]
            DataLoader["Data Loader"]
            CareerLoader["Career Loader"]
        end
    end

    subgraph Data["💾 Data Layer"]
        CSV["CSV Flat Files"]
        StaticJS["Frontend Static JS Data"]
    end

    subgraph Planned["🔮 Planned"]
        GeminiAPI["Gemini API"]
        Supabase["Supabase PostgreSQL"]
        Vercel["Vercel CDN"]
        Railway["Railway Hosting"]
    end

    Browser --> ReactApp
    ReactApp -->|"HTTP REST / CORS"| FastAPI
    FastAPI --> Engines
    FastAPI --> Loaders
    Loaders -->|"File I/O"| CSV
    ReactApp -->|"ES Module Import"| StaticJS

    FastAPI -.->|"Planned"| GeminiAPI
    Loaders -.->|"Planned Migration"| Supabase
    ReactApp -.->|"Planned Deploy"| Vercel
    FastAPI -.->|"Planned Deploy"| Railway

    style Planned fill:#f0f0f0,stroke:#ccc,stroke-dasharray: 5 5
```

---

## 3. Component Architecture

### 3.1 Backend Components

```mermaid
graph LR
    subgraph API["app.py — FastAPI Server"]
        Routes["Route Handlers<br/>/analyze, /recommend, /compare, etc."]
        CORS["CORS Middleware<br/>allow_origins=*"]
        Parse["parse_skills_input()"]
    end

    subgraph Engines["Intelligence Engines"]
        S["scoring.py<br/>calculate_readiness()"]
        R["recommender.py<br/>recommend_roles()"]
        C["comparison.py<br/>compare_roles()"]
        RM["roadmap.py<br/>generate_roadmap()"]
        E["explainer.py<br/>explain_role()"]
        I["insights.py<br/>generate_insight()"]
    end

    subgraph Loaders["Data Loaders"]
        RL["role_loader.py<br/>load_roles()"]
        SL["skill_loader.py<br/>load_skills()"]
        DL["data_loader.py<br/>load_role_skills()"]
        CL["career_loader.py<br/>load_career_info()"]
    end

    subgraph Data["CSV Files"]
        R_CSV["roles.csv"]
        S_CSV["skills.csv"]
        RS_CSV["role_skills.csv"]
        CI_CSV["careerinfo.csv"]
    end

    Routes --> S
    Routes --> R
    Routes --> C
    Routes --> RM
    Routes --> E
    Routes --> I
    C --> S
    Routes --> Parse

    RL --> R_CSV
    SL --> S_CSV
    DL --> RS_CSV
    CL --> CI_CSV
```

**Key design decisions:**
- Data is loaded **once at startup** into memory — no per-request file I/O
- All engines are **pure functions** — no state, no side effects, easily testable
- `comparison.py` depends on `scoring.py` for per-role readiness calculation
- `insights.py` depends on `explainer.py` output for matched/missing skill context

### 3.2 Frontend Components

```mermaid
graph TB
    subgraph Entry["Entry Point"]
        Main["main.jsx<br/>BrowserRouter + Providers"]
        DesignCSS["design-system.css<br/>CSS Variables & Tokens"]
        IndexCSS["index.css<br/>Tailwind & Font Imports"]
    end

    subgraph CoreShell["App.jsx — Shell Layout"]
        Header["Header.jsx<br/>Logo Click & Status"]
        Sidebar["Sidebar.jsx<br/>Collapsible Fixed Nav"]
        Footer["Footer.jsx"]
        Routes["React Router v7 Outlet"]
    end

    subgraph StateManagement["State & Logic Layer"]
        ApiCtx["ApiContext.jsx<br/>Server Sync (Roles/Skills)"]
        ProfCtx["ProfileContext.jsx<br/>Global User Selections"]
        useCareer["useCareerAnalysis.js"]
        useStudy["useStudyEligibility.js"]
        useExport["useProfileExport.js"]
    end

    subgraph Pages["Modular Page Components"]
        Dashboard["DashboardPage.jsx"]
        CareerGroup["Career Intelligence Pages"]
        StudyGroup["Study Intelligence Pages"]
        GlobalPage["GlobalOpportunityPage.jsx"]
        ProfilePage["ProfilePage.jsx"]
    end

    subgraph StaticData["Static Configuration Data"]
        Countries["countries.js (10 countries)"]
        Unis["universities.js (20 universities)"]
        Scholarships["scholarships.js (16 scholarships)"]
    end

    Main --> CoreShell
    CoreShell --> Routes
    Routes --> Pages
    Pages --> StateManagement
    StateManagement --> StaticData
```

*Note:* The monolithic frontend has been fully decomposed into dedicated page files, layout containers, contexts, and business hooks. Routing is handled via React Router 7.

---

## 4. Data Flow Diagrams

### 4.1 Career Analysis Flow

```mermaid
sequenceDiagram
    participant User as 👤 User
    participant FE as React Frontend
    participant API as FastAPI Backend
    participant Score as Scoring Engine
    participant Road as Roadmap Engine

    User->>FE: Select role + skills
    FE->>API: GET /analyze?role=2&skills_input=1,2,13
    API->>API: parse_skills_input("1,2,13")
    API->>Score: calculate_readiness(role_skills["2"], ["1","2","13"])
    Score-->>API: (score=49, missing=["10","11","12"])
    API->>Road: generate_roadmap(role_skills["2"], missing, skills)
    Road-->>API: ["Step 1: Learn Spark", "Step 2: Learn Docker", ...]
    API-->>FE: {readiness_score: 49, missing_skills: [...], roadmap: [...]}
    FE-->>User: Display readiness gauge + missing skills + roadmap
```

### 4.2 Career Recommendation Flow

```mermaid
sequenceDiagram
    participant User as 👤 User
    participant FE as React Frontend
    participant API as FastAPI Backend
    participant Rec as Recommender Engine

    User->>FE: Enter skills
    FE->>API: GET /recommend?skills_input=1,2,13
    API->>Rec: recommend_roles(["1","2","13"], role_skills)
    Note over Rec: For each role:<br/>Calculate skill overlap %<br/>Sort descending<br/>Return top 5
    Rec-->>API: [{role_id: "1", score: 67}, {role_id: "2", score: 50}, ...]
    API-->>FE: Top 5 role recommendations
    FE-->>User: Display best match + alternative roles
```

### 4.3 Career Comparison Flow

```mermaid
sequenceDiagram
    participant User as 👤 User
    participant FE as React Frontend
    participant API as FastAPI Backend
    participant Comp as Comparison Engine
    participant Score as Scoring Engine

    User->>FE: Select roles to compare
    FE->>API: GET /compare?role_ids=2,5,4&skills_input=1,2,13
    API->>Comp: compare_roles(["2","5","4"], user_skills, roles, role_skills, career_info)
    loop For each role
        Comp->>Score: calculate_readiness(role_skills[role_id], user_skills)
        Score-->>Comp: (score, missing)
        Comp->>Comp: Merge with career_info (salary, demand, difficulty)
    end
    Comp-->>API: [{role_name: "Data Engineer", readiness: 49, salary: "6-18 LPA", ...}, ...]
    API-->>FE: Comparison data array
    FE-->>User: Comparison table + bar chart
```

### 4.4 Study Intelligence Flow (Frontend-Only)

```mermaid
sequenceDiagram
    participant User as 👤 User
    participant FE as React Frontend
    participant Data as Static JS Data

    User->>FE: Fill academic profile (GPA, exams, docs)
    User->>FE: Select country + career goal
    FE->>Data: Import universities.js, scholarships.js, countries.js
    FE->>FE: Filter universities by country + career
    FE->>FE: Calculate eligibility scores
    FE->>FE: Calculate admission probability
    FE->>FE: Match scholarships by eligibility
    FE->>FE: Score countries by match
    FE-->>User: University list + admission tiers + scholarship matches + country strategy
```

> **Note:** Study Intelligence currently runs entirely in the frontend with static JS data. No backend API calls are involved. This will change when the PostgreSQL migration is completed.

---

## 5. Data Architecture

### 5.1 Current Data Model (CSV)

```mermaid
erDiagram
    ROLES {
        string role_id PK
        string role_name
        string domain_id FK
    }

    SKILLS {
        string skill_id PK
        string skill_name
    }

    ROLE_SKILLS {
        string role_id FK
        string skill_id FK
        int importance
    }

    CAREER_INFO {
        string role_id FK
        string salary
        string demand
        string difficulty
        string learning_time
    }

    COUNTRIES {
        string country_id PK
        string country_name
    }

    DOMAINS {
        string domain_id PK
        string domain_name
    }

    ROLES ||--o{ ROLE_SKILLS : "requires"
    SKILLS ||--o{ ROLE_SKILLS : "used by"
    DOMAINS ||--o{ ROLES : "contains"
    ROLES ||--|| CAREER_INFO : "has"
```

### 5.2 Planned Data Model (PostgreSQL — 14 Tables)

```mermaid
erDiagram
    DOMAINS ||--o{ ROLES : "contains"
    ROLES ||--o{ ROLE_SKILLS : "requires"
    SKILLS ||--o{ ROLE_SKILLS : "used by"
    ROLES ||--o{ SALARY_DATA : "earns"
    COUNTRIES ||--o{ SALARY_DATA : "in"
    COUNTRIES ||--o{ COST_OF_LIVING : "has"
    COUNTRIES ||--o{ UNIVERSITIES : "located in"
    UNIVERSITIES ||--o{ PROGRAMS : "offers"
    COUNTRIES ||--o{ SCHOLARSHIPS : "provides"
    UNIVERSITIES ||--o{ SCHOLARSHIPS : "offers"
    COUNTRIES ||--o{ VISA_ROUTES : "destination"
    COUNTRIES ||--o{ MARKET_TRENDS : "trends in"
    ROLES ||--o{ MARKET_TRENDS : "trends for"
    ROLES ||--o{ CAREER_PATHS : "from"
    ROLES ||--o{ CAREER_PATHS : "to"
    ROLES ||--o{ USER_PROFILES : "targets"
    COUNTRIES ||--o{ USER_PROFILES : "targets"
```

> See [Data Dictionary](./DATA_DICTIONARY.md) for complete schema definitions.

---

## 6. API Architecture

### 6.1 Current Endpoints

| Endpoint | Method | Engine | Data Source |
|----------|--------|--------|-------------|
| `GET /` | GET | — | — |
| `GET /roles` | GET | RoleLoader | roles.csv |
| `GET /skills` | GET | SkillLoader | skills.csv |
| `GET /analyze` | GET | Scoring + Roadmap | role_skills.csv, skills.csv |
| `GET /recommend` | GET | Recommender | role_skills.csv |
| `GET /explain` | GET | Explainer | role_skills.csv, skills.csv |
| `GET /insight` | GET | Explainer + Insights | role_skills.csv, skills.csv |
| `GET /career-info/{role_id}` | GET | CareerLoader | careerinfo.csv |
| `GET /compare` | GET | Comparison + Scoring | role_skills.csv, careerinfo.csv |

### 6.2 Planned Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /resume/upload` | POST | Resume PDF upload and skill extraction |
| `POST /ai/chat` | POST | AI Career/Study Coach conversation |
| `GET /countries/{id}/intelligence` | GET | Country-level intelligence data |
| `GET /salary/{role}/{country}` | GET | Country-specific salary data |
| `GET /visa/{from}/{to}` | GET | Visa route planning |
| `GET /cost-of-living/{city}` | GET | City-level cost of living |
| `POST /ai/future-plan` | POST | AI Future Planner generation |
| `GET /market-trends` | GET | Market trend data |

> See [API Reference](./API_REFERENCE.md) for complete documentation.

---

## 7. Frontend Architecture

### 7.1 Design System: "Thread Gauge"

| Element | Value |
|---------|-------|
| **Display Font** | Space Grotesk |
| **Body Font** | IBM Plex Sans |
| **Mono Font** | IBM Plex Mono |
| **Canvas** | `#F5F6F9` |
| **Indigo** | `#232C52` |
| **Brass** | `#AD7F2C` |
| **Rust** | `#AE4F37` |
| **Teal** | `#1F6F61` |
| **Signature Visual** | Woven measuring tape progress bars |

### 7.2 Navigation Architecture

```mermaid
graph LR
    Landing["Landing / Hero"]
    CareerMode["💼 Career Mode"]
    StudyMode["🎓 Study Mode"]

    Landing --> CareerMode
    Landing --> StudyMode

    subgraph Career["Career Mode Views"]
        RoleSkill["Role & Skill Selection"]
        Analysis["Analysis Results"]
        Recommend["Recommendations"]
        Compare["Comparison Dashboard"]
    end

    subgraph Study["Study Mode Views"]
        Profile["Academic Profile"]
        UniSearch["University Finder"]
        UniDetail["University Detail"]
        Scholar["Scholarship Matching"]
        Country["Country Strategy"]
    end

    CareerMode --> Career
    StudyMode --> Study
```

Currently implemented as mode toggle (no URL routing). React Router integration is planned for Phase 4.

---

## 8. Security Considerations

| Area | Current State | Plan |
|------|-------------|------|
| **CORS** | `allow_origins=["*"]` (open to all) | Restrict to specific domains in production |
| **Authentication** | None | Supabase Auth (email + OAuth) planned |
| **Authorization** | None (all data is public) | Row Level Security (RLS) defined in schema |
| **Input Validation** | Basic — skill IDs parsed, role IDs checked | Add Pydantic models for request validation |
| **Rate Limiting** | None | Add API rate limiting for AI endpoints |
| **HTTPS** | N/A (local dev) | Enforced by Vercel/Railway in production |
| **Environment Secrets** | `.env` file | Railway environment variables |

---

## 9. Performance Considerations

| Aspect | Current Approach | Future Optimization |
|--------|-----------------|-------------------|
| **Data Loading** | All CSVs loaded into memory at startup (~50KB total) | PostgreSQL with connection pooling |
| **API Response Time** | <10ms for all endpoints (in-memory computation) | May increase with DB queries; add caching layer |
| **Frontend Bundle** | Single monolithic App.jsx (~113KB) | Code splitting with React.lazy + React Router |
| **Static Data** | Study data embedded in JS modules | Move to API; implement pagination |
| **AI Responses** | Template strings (instant) | Gemini API calls (~1-3s); add streaming + caching |

---

> **Document Owner:** Pathloom Development Team  
> **Last Updated:** July 3, 2026
