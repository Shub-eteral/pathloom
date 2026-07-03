# 📡 Pathloom — API Reference

> Version 1.0 · July 2026  
> Base URL: `http://127.0.0.1:8000`  
> Protocol: REST over HTTP  
> Format: JSON

---

## Overview

The Pathloom API provides career intelligence endpoints for readiness scoring, role recommendation, career comparison, and AI-powered insights. All endpoints are currently unauthenticated and publicly accessible.

### Quick Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| [`/`](#get-) | GET | Health check |
| [`/roles`](#get-roles) | GET | List all career roles |
| [`/skills`](#get-skills) | GET | List all skills |
| [`/analyze`](#get-analyze) | GET | Career readiness analysis |
| [`/recommend`](#get-recommend) | GET | Role recommendations |
| [`/explain`](#get-explain) | GET | Skill match explanation |
| [`/insight`](#get-insight) | GET | AI career insight |
| [`/career-info/{role_id}`](#get-career-inforole_id) | GET | Career metadata |
| [`/compare`](#get-compare) | GET | Multi-role comparison |

---

## Common Patterns

### Skill Input Format

Many endpoints accept a `skills_input` parameter. This is a **comma-separated string of skill IDs** (not skill names).

```
skills_input=1,2,13    →  Python, SQL, Git
skills_input=1,2,10,11  →  Python, SQL, Spark, Docker
```

### Error Responses

All errors follow this format:

```json
{
  "detail": "Error message describing the issue"
}
```

| HTTP Status | Meaning |
|------------|---------|
| `200` | Success |
| `400` | Bad request — missing or invalid parameters |
| `404` | Not found — unknown role ID or missing data |
| `422` | Validation error — FastAPI parameter validation failed |

---

## Endpoints

### GET `/`

Health check endpoint. Returns a welcome message confirming the API is running.

**Parameters:** None

**Response:**
```json
{
  "message": "Welcome to Pathloom API"
}
```

**Example:**
```bash
curl http://127.0.0.1:8000/
```

---

### GET `/roles`

Returns the complete catalog of career roles.

**Parameters:** None

**Response Schema:**
```json
[
  {
    "role_id": "string",
    "role_name": "string"
  }
]
```

**Example Response:**
```json
[
  { "role_id": "1", "role_name": "Data Analyst" },
  { "role_id": "2", "role_name": "Data Engineer" },
  { "role_id": "3", "role_name": "ML Engineer" },
  { "role_id": "4", "role_name": "AI Engineer" },
  { "role_id": "5", "role_name": "Data Scientist" },
  { "role_id": "6", "role_name": "Business Analyst" },
  { "role_id": "7", "role_name": "Frontend Developer" },
  { "role_id": "8", "role_name": "Backend Developer" },
  { "role_id": "9", "role_name": "Full Stack Developer" },
  { "role_id": "10", "role_name": "Mobile Developer" },
  { "role_id": "11", "role_name": "DevOps Engineer" },
  { "role_id": "12", "role_name": "Cloud Engineer" },
  { "role_id": "13", "role_name": "Cloud Architect" },
  { "role_id": "14", "role_name": "Cybersecurity Analyst" },
  { "role_id": "15", "role_name": "Security Engineer" }
]
```

**Example:**
```bash
curl http://127.0.0.1:8000/roles
```

---

### GET `/skills`

Returns the complete skill catalog as a key-value map of `skill_id → skill_name`.

**Parameters:** None

**Response Schema:**
```json
{
  "skill_id": "skill_name"
}
```

**Example Response:**
```json
{
  "1": "Python",
  "2": "SQL",
  "3": "Excel",
  "4": "Pandas",
  "5": "NumPy",
  "6": "Machine Learning",
  "7": "Deep Learning",
  "8": "PyTorch",
  "9": "TensorFlow",
  "10": "Spark",
  "11": "Docker",
  "12": "AWS",
  "13": "Git",
  "14": "JavaScript",
  "15": "React",
  "16": "Node.js",
  "17": "HTML",
  "18": "CSS",
  "19": "Statistics",
  "20": "Data Visualization"
}
```

**Example:**
```bash
curl http://127.0.0.1:8000/skills
```

---

### GET `/analyze`

Core analysis endpoint. Calculates readiness score, identifies missing skills, and generates a learning roadmap for a target role.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `role` | string | ✅ | Role ID (e.g., `"2"` for Data Engineer) |
| `skills_input` | string | ✅ | Comma-separated skill IDs (e.g., `"1,2,13"`) |

**Response Schema:**
```json
{
  "role_id": "string",
  "readiness_score": "integer (0-100)",
  "missing_skills": ["string (skill names)"],
  "roadmap": ["string (step instructions)"]
}
```

**Example Request:**
```bash
curl "http://127.0.0.1:8000/analyze?role=2&skills_input=1,2,13"
```

**Example Response:**
```json
{
  "role_id": "2",
  "readiness_score": 49,
  "missing_skills": ["Spark", "Docker", "AWS"],
  "roadmap": [
    "Step 1: Learn Spark",
    "Step 2: Learn Docker",
    "Step 3: Learn AWS"
  ]
}
```

**How It Works:**
1. Parses and validates skill IDs from `skills_input`
2. Retrieves required skills for the target role (with importance weights)
3. Calls `calculate_readiness()` — earns points for matched skills, tracks missing ones
4. Calls `generate_roadmap()` — sorts missing skills by importance (highest first)
5. Resolves skill IDs to human-readable skill names
6. Returns combined analysis result

**Error Cases:**
| Scenario | Response |
|----------|----------|
| Unknown role ID | `404 {"detail": "Unknown role: {role}"}` |
| Empty skills input | `400 {"detail": "No skills provided."}` |

---

### GET `/recommend`

Returns top 5 career role recommendations based on the user's skills, sorted by skill overlap percentage.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `skills_input` | string | ✅ | Comma-separated skill IDs |

**Response Schema:**
```json
[
  {
    "role_id": "string",
    "score": "integer (0-100)"
  }
]
```

**Example Request:**
```bash
curl "http://127.0.0.1:8000/recommend?skills_input=1,2,13"
```

**Example Response:**
```json
[
  { "role_id": "1", "score": 67 },
  { "role_id": "2", "score": 50 },
  { "role_id": "5", "score": 50 },
  { "role_id": "3", "score": 43 },
  { "role_id": "8", "score": 40 }
]
```

**How It Works:**
1. For each role in the catalog, calculates the percentage of required skills the user has
2. Uses simple count-based matching (not weighted importance — contrast with `/analyze`)
3. Sorts by score descending
4. Returns top 5 results

> **Note:** The recommendation score uses **count-based matching** (skills matched / total required), while `/analyze` uses **weighted importance scoring**. This is by design — recommendations should surface roles where you have the most skills, while analysis should tell you how important those skills are.

---

### GET `/explain`

Returns a breakdown of matched and missing skills for a specific role.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `role_id` | string | ✅ | Target role ID |
| `skills_input` | string | ✅ | Comma-separated skill IDs |

**Response Schema:**
```json
{
  "matched": ["string (skill names, max 5)"],
  "missing": ["string (skill names, max 5)"]
}
```

**Example Request:**
```bash
curl "http://127.0.0.1:8000/explain?role_id=2&skills_input=1,2,13"
```

**Example Response:**
```json
{
  "matched": ["Python", "SQL", "Git"],
  "missing": ["Spark", "Docker", "AWS"]
}
```

> **Note:** Results are capped at 5 items per list to keep the explanation concise.

---

### GET `/insight`

Generates a template-based career insight text combining the user's matched and missing skills for a role.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `role_id` | string | ✅ | Target role ID |
| `skills_input` | string | ✅ | Comma-separated skill IDs |

**Response Schema:**
```json
{
  "insight": "string (generated insight text)"
}
```

**Example Request:**
```bash
curl "http://127.0.0.1:8000/insight?role_id=2&skills_input=1,2,13"
```

**Example Response:**
```json
{
  "insight": "You already possess skills such as Python, SQL, Git. Learning Spark, Docker, AWS could significantly improve your readiness for a Data Engineer role."
}
```

> **Note:** This currently uses template-based text generation, not an LLM. Gemini API integration is planned for Phase 3.

---

### GET `/career-info/{role_id}`

Returns career metadata (salary, demand, difficulty, learning time) for a specific role.

**Parameters:**

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `role_id` | string | Path | ✅ | Target role ID |

**Response Schema:**
```json
{
  "salary": "string (e.g., '6-18 LPA')",
  "demand": "string (e.g., 'High')",
  "difficulty": "string (e.g., 'Advanced')",
  "learning_time": "string (e.g., '6-12 months')"
}
```

**Example Request:**
```bash
curl http://127.0.0.1:8000/career-info/2
```

**Example Response:**
```json
{
  "salary": "6-18 LPA",
  "demand": "High",
  "difficulty": "Advanced",
  "learning_time": "6-12 months"
}
```

**Error Cases:**
| Scenario | Response |
|----------|----------|
| Unknown role ID | `404 {"detail": "Career info not found for role: {role_id}"}` |

> **Note:** Salary data is currently India-only (LPA = Lakhs Per Annum). Multi-country salary data is planned.

---

### GET `/compare`

Compares multiple roles side-by-side with readiness scores and career metadata.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `role_ids` | string | ✅ | Comma-separated role IDs to compare |
| `skills_input` | string | ✅ | Comma-separated skill IDs |

**Response Schema:**
```json
[
  {
    "role_id": "string",
    "role_name": "string",
    "readiness_score": "integer (0-100)",
    "salary": "string",
    "demand": "string",
    "difficulty": "string",
    "learning_time": "string"
  }
]
```

**Example Request:**
```bash
curl "http://127.0.0.1:8000/compare?role_ids=2,5,4&skills_input=1,2,13"
```

**Example Response:**
```json
[
  {
    "role_id": "5",
    "role_name": "Data Scientist",
    "readiness_score": 52,
    "salary": "6-25 LPA",
    "demand": "Very High",
    "difficulty": "Expert",
    "learning_time": "12-24 months"
  },
  {
    "role_id": "2",
    "role_name": "Data Engineer",
    "readiness_score": 49,
    "salary": "6-18 LPA",
    "demand": "High",
    "difficulty": "Advanced",
    "learning_time": "6-12 months"
  },
  {
    "role_id": "4",
    "role_name": "AI Engineer",
    "readiness_score": 38,
    "salary": "8-30 LPA",
    "demand": "Very High",
    "difficulty": "Expert",
    "learning_time": "12-24 months"
  }
]
```

**How It Works:**
1. For each role ID in `role_ids`, calculates readiness score using weighted importance
2. Looks up career metadata (salary, demand, difficulty, learning_time) from `careerinfo.csv`
3. Resolves role IDs to human-readable names
4. Sorts results by readiness score (highest first)
5. Returns the comparison array

> **Note:** Results are sorted by `readiness_score` descending — roles the user is most ready for appear first.

---

## Planned Endpoints

These endpoints are designed but not yet implemented:

| Endpoint | Method | Description | Phase |
|----------|--------|-------------|-------|
| `POST /resume/upload` | POST | Upload resume PDF for AI skill extraction | Phase 3 |
| `POST /ai/chat` | POST | Conversational AI Career/Study Coach | Phase 3 |
| `GET /countries/{id}/intelligence` | GET | Country-level opportunity intelligence | Phase 3 |
| `GET /salary/{role}/{country}` | GET | Country-specific salary ranges | Phase 3 |
| `GET /visa/{from}/{to}` | GET | Visa route planning between countries | Phase 3 |
| `GET /cost-of-living/{city}` | GET | City-level cost of living data | Phase 3 |
| `POST /ai/future-plan` | POST | AI-generated comprehensive life plan | Phase 4 |
| `GET /market-trends` | GET | Career demand trends over time | Phase 3 |

---

## Interactive API Documentation

When the backend server is running, FastAPI auto-generates interactive API documentation:

- **Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

> **Document Owner:** Pathloom Development Team  
> **Last Updated:** July 3, 2026
