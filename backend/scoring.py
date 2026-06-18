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