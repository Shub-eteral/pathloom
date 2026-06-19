import csv

def load_career_info(filepath):

    career_info = {}

    with open(filepath, "r", encoding="utf-8") as file:

        reader = csv.DictReader(file)

        for row in reader:

            career_info[row["role_id"]] = {
                "salary": row["salary"],
                "demand": row["demand"],
                "difficulty": row["difficulty"],
                "learning_time": row["learning_time"]
            }

    return career_info