def recommend_roles(user_skills, role_skills):

    recommendations = []

    for role_id, required_skills in role_skills.items():

        # Each entry in required_skills is a requirement record (a dict),
        # not a bare skill id — e.g. {"role_id": ..., "skill_id": "1"}.
        # set(required_skills) was trying to hash the dicts directly,
        # which raised "TypeError: unhashable type: 'dict'". Pull the
        # skill_id field out of each one first.
        required_skill_ids = {
            skill["skill_id"]
            for skill in required_skills
        }

        matched_skills = len(
            set(user_skills).intersection(required_skill_ids)
        )

        total_required = len(required_skills)

        if total_required == 0:
            score = 0
        else:
            score = round(
                (matched_skills / total_required) * 100
            )

        recommendations.append(
            {
                "role_id": role_id,
                "score": score
            }
        )

    recommendations.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return recommendations[:5]