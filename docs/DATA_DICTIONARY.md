# 📊 Pathloom — Data Dictionary

> Version 1.0 · July 2026  
> Status: Living Document

---

## Overview

This document provides a comprehensive reference for all data models in Pathloom — including the current CSV flat files, the planned PostgreSQL schema, and the frontend static data structures.

---

## 1. Current Data Layer (CSV Flat Files)

All CSV files are located in the `database/` directory and are loaded into memory at server startup by dedicated loader modules.

### 1.1 `roles.csv` — Career Role Catalog

**Loaded by:** `backend/role_loader.py` → `load_roles()`  
**Records:** 74  
**In-memory structure:** `List[Dict]`

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `role_id` | string | Unique role identifier | `"2"` |
| `role_name` | string | Human-readable role name | `"Data Engineer"` |
| `domain_id` | string | Foreign key to domains.csv | `"1"` |

**Coverage by Domain:**

| Domain ID | Domain | Roles |
|-----------|--------|-------|
| 1 | AI & Data | Data Analyst, Data Engineer, ML Engineer, AI Engineer, Data Scientist, Business Analyst, Data Architect, NLP Engineer, Computer Vision Engineer, BI Analyst, MLOps Engineer |
| 2 | Software Development | Frontend Developer, Backend Developer, Full Stack Developer, Mobile Developer, iOS Developer, Android Developer, Game Developer, Embedded Systems Developer, QA Engineer, Solutions Architect |
| 3 | Cybersecurity | Cybersecurity Analyst, Security Engineer, Penetration Tester, SOC Analyst, Security Architect, Incident Responder |
| 4 | Cloud Computing | DevOps Engineer, Cloud Engineer, Cloud Architect, Site Reliability Engineer, Platform Engineer, Infrastructure Engineer |
| 5 | Finance | Financial Analyst, Quantitative Analyst, Risk Analyst, Fintech Developer, Investment Analyst |
| 6 | Marketing | Digital Marketing Manager, SEO Specialist, Content Strategist, Growth Hacker, Marketing Analyst |
| 7 | Healthcare | Health Informatics Specialist, Biomedical Engineer, Clinical Data Manager, Healthcare IT Specialist |
| 8 | Education | Instructional Designer, EdTech Developer, Curriculum Specialist |
| 9 | Engineering | Mechanical Engineer, Civil Engineer, Electrical Engineer, Robotics Engineer, Systems Engineer |
| 10 | Hospitality | Hotel Manager, Event Planner, Tourism Analyst |
| 11 | Government | Policy Analyst, Public Affairs Specialist |
| 12 | Legal | Legal Tech Specialist, Compliance Analyst, Contract Analyst |
| 13 | Human Resources | HR Analyst, Talent Acquisition Specialist, Compensation Analyst |
| 14 | Sales | Sales Engineer, Account Manager, Revenue Operations Analyst |
| 15 | Design | UX Designer, UI Developer, Product Designer, Motion Designer, Brand Strategist |

---

### 1.2 `skills.csv` — Technical Skill Catalog

**Loaded by:** `backend/skill_loader.py` → `load_skills()`  
**Records:** 140  
**In-memory structure:** `Dict[str, str]` (skill_id → skill_name)

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `skill_id` | string | Unique skill identifier | `"1"` |
| `skill_name` | string | Human-readable skill name | `"Python"` |

**Sample Skill List:**

| ID | Skill | ID | Skill |
|----|-------|----|-------|
| 1 | Python | 11 | Docker |
| 2 | SQL | 12 | AWS |
| 14 | JavaScript | 15 | React |
| 21 | Java | 22 | C++ |
| 24 | Go | 25 | Rust |
| 45 | MongoDB | 46 | PostgreSQL |
| 53 | NLP | 54 | Computer Vision |
| 57 | LLMs | 58 | MLOps |
| 61 | Kubernetes | 62 | Terraform |
| 66 | Network Security | 78 | Figma |
| 84 | Project Management | 85 | Agile/Scrum |
| 110| AutoCAD | 115| Embedded C |

---

### 1.3 `role_skills.csv` — Role-Skill Mappings

**Loaded by:** `backend/data_loader.py` → `load_role_skills()`  
**Records:** 450+  
**In-memory structure:** `Dict[str, List[Dict]]` (role_id → list of {skill_id, importance})

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `role_id` | string | Foreign key to roles.csv | `"2"` |
| `skill_id` | string | Foreign key to skills.csv | `"1"` |
| `importance` | integer | Skill importance weight (1–10) | `10` |

**Importance Scale:**

| Weight | Meaning |
|--------|---------|
| 10 | Absolutely essential — role cannot function without this |
| 7–9 | Highly important — expected in most job listings |
| 4–6 | Valuable — improves candidate profile significantly |
| 1–3 | Nice to have — differentiator but not required |

**Data Coverage:**
All 74 roles are fully mapped to 5-8 relevant skills (total 450+ mappings). There are no remaining data gaps in role-skill coverage.

---

### 1.4 `careerinfo.csv` — Career Metadata

**Loaded by:** `backend/career_loader.py` → `load_career_info()`  
**Records:** 74  
**In-memory structure:** `Dict[str, Dict]` (role_id → {salary, demand, difficulty, learning_time})

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `role_id` | string | Foreign key to roles.csv | `"2"` |
| `salary` | string | Global salary range (USD) | `"$90k-$140k"` |
| `demand` | string | Market demand level | `"High"` |
| `difficulty` | string | Skill difficulty tier | `"Medium"` |
| `learning_time` | string | Estimated time to learn | `"6 Months"` |

> **Note:** Salary data has been upgraded from India LPA to global USD ranges for all 74 roles, aligning with international mobility options.

---

### 1.5 `countries.csv` — Country Catalog

**Records:** 10  
**Not loaded by backend** — currently unused by API endpoints.

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `country_id` | string | Unique country identifier | `"3"` |
| `country_name` | string | Country name | `"Japan"` |

**Countries:** India, Nepal, Japan, USA, Canada, Germany, UK, Australia, Singapore, South Korea

---

### 1.6 `domains.csv` — Career Domain Catalog

**Records:** 15  

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `domain_id` | string | Unique domain identifier | `"1"` |
| `domain_name` | string | Domain name | `"AI & Data Science"` |

---

## 2. Frontend Static Data (ES Modules)

Located in `frontend/src/data/`. These are JavaScript modules imported directly by the React frontend. They are **not** served by the backend API.

### 2.1 `countries.js` — Study Destination Countries

**Records:** 20

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Country identifier |
| `name` | string | Country name |
| `tuition` | string | Annual tuition range |
| `avg_living_cost` | string | Monthly living cost range |
| `visa_difficulty` | string | Visa difficulty level |
| `pr_score` | number | PR availability score (1-10) |
| `work_rights` | string | Student work rights |
| `scholarships` | string | Scholarship availability level |
| `language` | string | Primary language of instruction |
| `currency` | string | Currency code & symbol |
| `avg_living_cost` | string | Monthly living cost estimate |
| `climate` | string | Climate description |
| `safety_index` | number | Safety index rating |
| `international_student_population` | string | Estimated international student count |
| `post_study_work_visa_duration` | string | Post-study stay back option |
| `top_fields` | array | Prominent fields of study |

**Countries covered:** Japan, USA, Germany, Canada, Australia, United Kingdom, South Korea, Netherlands, Singapore, France, Sweden, Switzerland, New Zealand, Ireland, Finland, Norway, Denmark, Italy, Spain, Malaysia

---

### 2.2 `universities.js` — University Database

**Records:** 58

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | University identifier |
| `country` | string | Country name |
| `city` | string | City name |
| `name` | string | University name |
| `qs_rank` | number | QS World Ranking |
| `tuition` | number | Typical annual tuition in USD |
| `living_cost` | number | Typical annual living cost in USD |
| `scholarships` | object | Scholarship type availability flags |
| `employment_score` | number | Graduate employability score |
| `employment_rate` | number | Average employment rate (0-1) |
| `average_salary` | string | Typical graduate starting salary |
| `work_rights` | string | Student work rights description |
| `intakes` | array | Available entry terms |
| `programs` | array | Available degree programs with requirements |

**Universities covered:** 58 top-tier institutions across all 20 countries, including University of Tokyo, MIT, Stanford, TU Munich, University of Toronto, University of Melbourne, Imperial College London, ETH Zurich, and more.

Each program object contains:
| Field | Type | Description |
|-------|------|-------------|
| `course` | string | Program/course title |
| `level` | string | Bachelor's / Master's / PhD |
| `language_track` | string | Instruction language track |
| `requirements` | object | Required scores: gpa10, gpa4, ielts, toefl, gre, sat, act, work_experience_years, research_projects, publications, etc. |
| `careers` | array | Target career outcomes |

---

### 2.3 `scholarships.js` — Scholarship Database

**Records:** 45

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Scholarship identifier |
| `name` | string | Scholarship name |
| `country` | string | Host country |
| `amount` | string | Award coverage/stipend details |
| `min_gpa_10` | number | Minimum GPA (10.0 scale) |
| `min_ielts` | number | Minimum IELTS score |
| `degree_levels` | array | Eligible degree levels |
| `type` | string | Government / University / Foundation |
| `deadline` | string | Application deadline |
| `eligibility_notes` | string | Additional eligibility criteria notes |

**Scholarships covered:** MEXT, JASSO, ADB, DAAD, Deutschland Stipendium, Fulbright, Hubert H. Humphrey, Vanier, Lester B. Pearson, Banting, Australia Awards, RTP, Chevening, Gates Cambridge, Rhodes, and 30 others.

---

## 3. Planned Data Model (PostgreSQL — 14 Tables)

The full PostgreSQL schema is defined in `database/schema.sql`. All tables use UUIDs as primary keys and include `created_at` timestamps.

### 3.1 Entity-Relationship Diagram

```mermaid
erDiagram
    DOMAINS {
        uuid id PK
        text name UK
        text icon
        text description
    }

    ROLES {
        uuid id PK
        text name
        uuid domain_id FK
        text description
        int avg_experience_years
        text remote_availability
        text growth_outlook
    }

    SKILLS {
        uuid id PK
        text name UK
        text category
        text description
    }

    ROLE_SKILLS {
        uuid id PK
        uuid role_id FK
        uuid skill_id FK
        int importance
    }

    COUNTRIES {
        uuid id PK
        text name UK
        text code UK
        text region
        text currency
        int tech_hub_score
        int quality_of_life_score
        int immigration_score
        int opportunity_score
    }

    SALARY_DATA {
        uuid id PK
        uuid role_id FK
        uuid country_id FK
        int entry_level_min
        int entry_level_max
        int mid_level_min
        int mid_level_max
        int senior_level_min
        int senior_level_max
    }

    COST_OF_LIVING {
        uuid id PK
        text city
        uuid country_id FK
        int monthly_rent_1br_center
        int monthly_food
        int monthly_transport
        int monthly_total_estimate
    }

    UNIVERSITIES {
        uuid id PK
        text name
        uuid country_id FK
        text city
        int qs_rank
        int annual_tuition_usd
        numeric acceptance_rate
        numeric employment_rate
    }

    PROGRAMS {
        uuid id PK
        uuid university_id FK
        text name
        text level
        numeric duration_years
        text language
        numeric min_gpa_4
        numeric min_ielts
    }

    SCHOLARSHIPS {
        uuid id PK
        text name
        uuid country_id FK
        uuid university_id FK
        text type
        text coverage
        int amount_usd_annual
    }

    VISA_ROUTES {
        uuid id PK
        uuid from_country_id FK
        uuid to_country_id FK
        text visa_type
        text name
        text processing_time
        boolean path_to_pr
    }

    MARKET_TRENDS {
        uuid id PK
        uuid role_id FK
        uuid country_id FK
        int year
        int demand_score
        text trend_direction
    }

    CAREER_PATHS {
        uuid id PK
        uuid from_role_id FK
        uuid to_role_id FK
        int typical_years
        text difficulty
    }

    USER_PROFILES {
        uuid id PK
        text full_name
        text email
        uuid target_role_id FK
        uuid target_country_id FK
        text plan_type
    }

    DOMAINS ||--o{ ROLES : "contains"
    ROLES ||--o{ ROLE_SKILLS : "requires"
    SKILLS ||--o{ ROLE_SKILLS : "maps"
    ROLES ||--o{ SALARY_DATA : "earns"
    COUNTRIES ||--o{ SALARY_DATA : "in"
    COUNTRIES ||--o{ COST_OF_LIVING : "costs"
    COUNTRIES ||--o{ UNIVERSITIES : "hosts"
    UNIVERSITIES ||--o{ PROGRAMS : "offers"
    COUNTRIES ||--o{ SCHOLARSHIPS : "funds"
    UNIVERSITIES ||--o{ SCHOLARSHIPS : "awards"
    COUNTRIES ||--o{ VISA_ROUTES : "to"
    ROLES ||--o{ MARKET_TRENDS : "trends"
    COUNTRIES ||--o{ MARKET_TRENDS : "in"
    ROLES ||--o{ CAREER_PATHS : "from"
    ROLES ||--o{ USER_PROFILES : "targets"
    COUNTRIES ||--o{ USER_PROFILES : "targets"
```

### 3.2 Table Summary

| # | Table | Purpose | Key Relations |
|---|-------|---------|--------------|
| 1 | `domains` | Career domain categories | Parent of roles |
| 2 | `roles` | Career role catalog | Belongs to domain |
| 3 | `skills` | Technical skill catalog | Categorized |
| 4 | `role_skills` | Role-skill mappings with weights | Many-to-many |
| 5 | `countries` | Country intelligence data | Rich metadata (scores, visa info) |
| 6 | `salary_data` | Per-role, per-country salary ranges | Role × Country |
| 7 | `cost_of_living` | City-level cost breakdown | City within country |
| 8 | `universities` | University catalog | In a country |
| 9 | `programs` | Academic programs | Within a university |
| 10 | `scholarships` | Scholarship catalog | Country and/or university scoped |
| 11 | `visa_routes` | Immigration visa pathways | From country → to country |
| 12 | `market_trends` | Career demand trends by year | Role × Country × Year |
| 13 | `career_paths` | Role transition pathways | From role → to role |
| 14 | `user_profiles` | User accounts & preferences | References Supabase Auth |

### 3.3 Security Model

- **Row Level Security (RLS)** enabled on all tables
- Public read access for all intelligence data tables (1–13)
- User profiles restricted to authenticated owner (SELECT, UPDATE, INSERT)
- Supabase Auth integration via `auth.uid()` function

---

## 4. Seed Data

### 4.1 JSON Seed Files (`database/seed/`)

| File | Records | Content |
|------|---------|---------|
| `domains.json` | 15 | Career domain names and icons |
| `roles.json` | 15 | Career roles with domain references and descriptions |

### 4.2 Seed Script (`backend/seed.py`)

The seed script uses the Supabase Python SDK to:
1. Upsert domains from `domains.json`
2. Look up domain IDs by name
3. Replace domain names with UUIDs in role data
4. Clear and re-insert roles

**Required Environment Variables:**
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_KEY` — Supabase service role key (not the anon key)

---

## 5. Data Gaps & Expansion Plan

| Data Category | Current Records | Target | Gap |
|--------------|----------------|--------|-----|
| Career Roles | 74 | 74 | ✅ Complete |
| Skills | 140 | 140 | ✅ Complete (soft + tech skills) |
| Role-Skill Mappings | 450+ | 450+ | ✅ Complete (all roles mapped) |
| Salary Data | 74 (Global USD) | 74 (Global USD) | ✅ Complete |
| Universities | 58 | 58 | ✅ Complete |
| Scholarships | 45 | 45 | ✅ Complete |
| Countries | 20 (Study-focused) | 20 (Study-focused) | ✅ Complete |
| Cost of Living | 0 | 20+ cities | 🔲 Not started |
| Visa Routes | 0 | 30+ routes | 🔲 Not started |
| Market Trends | 0 | Historical data needed | 🔲 Not started |
| Career Paths | 0 | Role transition data | 🔲 Not started |

---

> **Document Owner:** Pathloom Development Team  
> **Last Updated:** July 12, 2026
