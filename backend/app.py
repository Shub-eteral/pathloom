from fastapi import FastAPI

from data_loader import load_role_skills
from skill_loader import load_skills
from scoring import calculate_readiness
from roadmap import generate_roadmap

app = FastAPI()

role_skills = load_role_skills("../database/role_skills.csv")
skills = load_skills("../database/skills.csv")


@app.get("/")
def home():

    return {
        "message": "Welcome to Pathloom API"
    }


@app.get("/analyze")
def analyze(role: str, skills_input: str):

    user_skills = [
        skill.strip()
        for skill in skills_input.split(",")
    ]

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
        skills[skill_id]
        for skill_id in missing
    ]

    return {
        "role_id": role,
        "readiness_score": score,
        "missing_skills": missing_skill_names,
        "roadmap": roadmap
    }