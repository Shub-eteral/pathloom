# 🛤️ Pathloom — Roadmap Engine Design

> Technical design document for the career learning roadmap generator.

---

## Overview

The Roadmap Engine converts a user's skill gaps into an actionable, **priority-ordered learning plan**. After the readiness score identifies missing skills, the roadmap engine generates a step-by-step upskilling path — starting with the most impactful skills first.

---

## How It Works

### Input
- **Required skills** — Full list of skills needed for the target role (with importance weights)
- **Missing skills** — Skills the user doesn't have (from the scoring engine)
- **Skill catalog** — Maps skill IDs to human-readable names

### Process
1. Filter required skills to only include missing ones
2. Sort missing skills by **importance weight** (highest first)
3. Generate numbered steps: "Step 1: Learn [Skill Name]", "Step 2: ..."

### Output
An ordered list of learning steps, e.g.:
```
Step 1: Learn Spark
Step 2: Learn Docker
Step 3: Learn AWS
```

---

## Implementation

**File:** [`backend/roadmap.py`](../backend/roadmap.py)

```python
def generate_roadmap(required_skills, missing_skills, skills):
    roadmap_data = []

    for skill in required_skills:
        if skill["skill_id"] in missing_skills:
            roadmap_data.append((
                skill["importance"],
                skills[skill["skill_id"]]
            ))

    roadmap_data.sort(reverse=True)  # Highest importance first

    roadmap = []
    step = 1
    for _, skill_name in roadmap_data:
        roadmap.append(f"Step {step}: Learn {skill_name}")
        step += 1

    return roadmap
```

---

## Prioritization Logic

Skills are prioritized by their **importance weight** for the target role:

| Priority | Importance | Rationale |
|----------|-----------|-----------|
| Learn first | 10 | Core skill — role is impossible without it |
| Learn second | 8–9 | High-value skill — expected by most employers |
| Learn third | 5–7 | Supporting skill — strengthens profile |
| Learn last | 1–4 | Supplementary — nice to have |

### Example: Data Engineer Missing Skills

If a user targeting Data Engineer is missing Spark (10), Docker (9), and AWS (9):

```
Step 1: Learn Spark       (importance: 10)
Step 2: Learn Docker      (importance: 9)
Step 3: Learn AWS         (importance: 9)
```

Spark is prioritized first because it has the highest importance weight for the Data Engineer role.

---

## Integration

The roadmap is generated as part of the `/analyze` endpoint response:

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

The frontend renders this as a numbered timeline with connected step indicators using the thread gauge design system.

---

## Future Enhancements

- **Time estimates** — "Step 1: Learn Spark (estimated 4–6 weeks)"
- **Resource links** — Curated courses, tutorials, and documentation per skill
- **Prerequisite chains** — "Learn Python before Machine Learning"
- **Parallel tracks** — Skills that can be learned simultaneously
- **Progress tracking** — Mark skills as completed, update readiness score
- **AI-generated plans** — Gemini API generates personalized study schedules
- **Monthly milestones** — "Month 1: Complete Python, Month 2: Learn SQL..."