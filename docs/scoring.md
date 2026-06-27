# 🎯 Pathloom — Readiness Score Algorithm

> Technical design document for the career readiness scoring system.

---

## Overview

The Readiness Score is Pathloom's core metric. It measures how prepared a user is for a specific career role based on their current skill set. Unlike simple percentage-match systems, Pathloom uses **weighted importance scoring** — not all skills are equally important for a role.

---

## Algorithm

### Formula

```
Readiness Score = (Earned Points / Total Points) × 100
```

Where:
- **Earned Points** = Sum of importance weights for skills the user **has**
- **Total Points** = Sum of importance weights for **all** skills required by the role

### Importance Weights

Each skill-role mapping has an `importance` value from **1 to 10**:

| Weight | Meaning |
|--------|---------|
| 10 | Absolutely essential — role cannot function without this skill |
| 7–9 | Highly important — expected in most job listings |
| 4–6 | Valuable — improves candidate profile significantly |
| 1–3 | Nice to have — differentiator but not required |

---

## Implementation

**File:** [`backend/scoring.py`](../backend/scoring.py)

```python
def calculate_readiness(required_skills, user_skill_ids):
    total_points = 0
    earned_points = 0
    missing_skills = []

    for skill in required_skills:
        total_points += skill["importance"]

        if skill["skill_id"] in user_skill_ids:
            earned_points += skill["importance"]
        else:
            missing_skills.append(skill["skill_id"])

    score = round((earned_points / total_points) * 100)
    return score, missing_skills
```

**Inputs:**
- `required_skills` — List of `{skill_id, importance}` dicts from `role_skills.csv`
- `user_skill_ids` — List of skill ID strings provided by the user

**Outputs:**
- `score` — Integer percentage (0–100)
- `missing_skills` — List of skill IDs the user lacks

---

## Example Walkthrough

### Target Role: Data Engineer (role_id = 2)

**Required Skills:**

| Skill | Skill ID | Importance |
|-------|----------|-----------|
| Python | 1 | 10 |
| SQL | 2 | 10 |
| Spark | 10 | 10 |
| Docker | 11 | 9 |
| AWS | 12 | 9 |
| Git | 13 | 7 |

**Total Required Points = 10 + 10 + 10 + 9 + 9 + 7 = 55**

### Scenario: User has Python, SQL, Git

| Skill | Importance | User Has? | Points Earned |
|-------|-----------|-----------|---------------|
| Python | 10 | ✅ | 10 |
| SQL | 10 | ✅ | 10 |
| Spark | 10 | ❌ | 0 |
| Docker | 9 | ❌ | 0 |
| AWS | 9 | ❌ | 0 |
| Git | 7 | ✅ | 7 |

**Earned Points = 10 + 10 + 7 = 27**

**Readiness Score = (27 / 55) × 100 = 49%**

**Missing Skills:** Spark, Docker, AWS

### Why Weighted Scoring Matters

If we used simple count-based scoring: 3 out of 6 skills = **50%**

But with weighted scoring, the result is **49%** — because the missing skills (Spark, Docker, AWS) have higher importance weights than the skill the user has (Git = 7). This means the user is missing the most critical skills.

In another scenario, if a user had Spark (10), Docker (9), AWS (9) but was missing Python, SQL, and Git:
- Count-based: 3/6 = 50% (same as above)
- Weighted: (10+9+9)/55 = 51% (slightly higher because the skills they have are more important)

---

## Integration Points

The readiness score is used across multiple features:

| Feature | How Score is Used |
|---------|-------------------|
| **Career Analysis** (`/analyze`) | Primary readiness metric displayed to user |
| **Recommendation** (`/recommend`) | Roles sorted by skill overlap percentage |
| **Comparison** (`/compare`) | Side-by-side readiness scores per role |
| **Roadmap** (`/analyze`) | Missing skills sorted by importance for learning priority |
| **Insights** (`/insight`) | Score context used to generate insight text |

---

## Score Interpretation

| Score Range | Interpretation | Recommended Action |
|-------------|---------------|-------------------|
| 90–100% | Highly ready | Apply now — minor upskilling optional |
| 70–89% | Strong candidate | Focus on 1–2 missing skills |
| 50–69% | Moderate readiness | Create a structured learning plan |
| 30–49% | Early stage | Significant upskilling needed |
| 0–29% | Exploring | This role requires major skill development |

---

## Future Enhancements

- **Skill proficiency levels** — Not just "has/doesn't have" but beginner/intermediate/expert
- **Experience weighting** — Years of experience with each skill
- **Certification bonuses** — Additional score for relevant certifications
- **Market demand adjustment** — Dynamic weighting based on current job market trends
- **Peer comparison** — How your score compares to other users targeting the same role