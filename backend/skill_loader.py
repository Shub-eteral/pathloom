import csv

def load_skills(file_path):

    skills = {}

    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)

        for row in reader:
            skills[row["skill_id"]] = row["skill_name"]

    return skills