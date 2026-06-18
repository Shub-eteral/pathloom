from data_loader import load_role_skills
from skill_loader import load_skills
from scoring import calculate_readiness
from roadmap import generate_roadmap

# Load data
role_skills = load_role_skills("../database/role_skills.csv")
skills = load_skills("../database/skills.csv")

# Target role
# 2 = Data Engineer
target_role = "2"

# User skills
# 1 = Python
# 2 = SQL
# 13 = Git
user_skills = ["1", "2", "13"]

# Calculate readiness
score, missing = calculate_readiness(
    role_skills[target_role],
    user_skills
)

# Generate roadmap
roadmap = generate_roadmap(
    role_skills[target_role],
    missing,
    skills
)

# Display results
print("=" * 40)
print("PATHLOOM CAREER ANALYSIS")
print("=" * 40)

print(f"\nReadiness Score: {score}%")

print("\nMissing Skills:")

for skill_id in missing:
    print(f"- {skills[skill_id]}")

print("\nRoadmap:")

for step in roadmap:
    print(step)

print("\nAnalysis Complete.")