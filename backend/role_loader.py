import csv

def load_roles(file_path):

    roles = []

    with open(file_path, mode="r", encoding="utf-8") as file:

        reader = csv.DictReader(file)

        for row in reader:

            roles.append({
                "role_id": row["role_id"],
                "role_name": row["role_name"]
            })

    return roles