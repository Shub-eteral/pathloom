from data_loader import load_role_skills
from skill_loader import load_skills
from scoring import calculate_readiness

role_skills = load_role_skills("../database/role_skills.csv")

skills = load_skills("../database/skills.csv")

target_role = "2"

user_skills = ["1", "2", "13"]

score, missing = calculate_readiness(
    role_skills[target_role],
    user_skills
)

print("Readiness Score:", score)

print("\nMissing Skills:")

for skill_id in missing:
    print("-", skills[skill_id])