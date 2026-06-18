import csv

def load_role_skills(file_path):
    role_skills = {}

    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)

        for row in reader:
            role_id = row["role_id"]

            if role_id not in role_skills:
                role_skills[role_id] = []

            role_skills[role_id].append({
                "skill_id": row["skill_id"],
                "importance": int(row["importance"])
            })

    return role_skills