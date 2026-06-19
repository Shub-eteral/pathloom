from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from role_loader import load_roles
from data_loader import load_role_skills
from skill_loader import load_skills
from scoring import calculate_readiness
from roadmap import generate_roadmap
from recommender import recommend_roles
from career_loader import load_career_info

# Resolve paths relative to this file's location
BASE_DIR = Path(__file__).resolve().parent
DATABASE_DIR = BASE_DIR.parent / "database"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load base datasets
roles = load_roles(str(DATABASE_DIR / "roles.csv"))
role_skills = load_role_skills(str(DATABASE_DIR / "role_skills.csv"))
skills = load_skills(str(DATABASE_DIR / "skills.csv"))

# Task 3 Data Load (Using corrected file name without underscore)
career_info = load_career_info(str(DATABASE_DIR / "careerinfo.csv"))


def parse_skills_input(skills_input: str):
    """Split a comma-separated skill-id string into a clean list.

    Strips whitespace around each id and drops empty entries.
    """
    user_skills = [
        skill.strip()
        for skill in skills_input.split(",")
        if skill.strip()
    ]

    if not user_skills:
        raise HTTPException(status_code=400, detail="No skills provided.")

    return user_skills


@app.get("/")
def home():
    return {
        "message": "Welcome to Pathloom API"
    }


@app.get("/analyze")
def analyze(role: str, skills_input: str):
    if role not in role_skills:
        raise HTTPException(status_code=404, detail=f"Unknown role: {role}")

    user_skills = parse_skills_input(skills_input)

    score, missing = calculate_readiness(
        role_skills[role],
        user_skills
    )

    roadmap = generate_roadmap(
        role_skills[role],
        missing,
        skills
    )

    missing_skill_names = [
        skills.get(skill_id, skill_id)
        for skill_id in missing
    ]

    return {
        "role_id": role,
        "readiness_score": score,
        "missing_skills": missing_skill_names,
        "roadmap": roadmap
    }


@app.get("/roles")
def get_roles():
    return roles


@app.get("/skills")
def get_skills():
    return skills


@app.get("/recommend")
def recommend(skills_input: str):
    user_skills = parse_skills_input(skills_input)

    recommendations = recommend_roles(
        user_skills,
        role_skills
    )

    return recommendations


# Task 3 Specific Dynamic Endpoint
@app.get("/career-info/{role_id}")
def get_career_info(role_id: str):
    return career_info.get(
        role_id,
        {}
    )