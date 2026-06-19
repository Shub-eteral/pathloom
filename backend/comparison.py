from scoring import calculate_readiness


def compare_roles(
    role_ids,
    user_skills,
    roles,
    role_skills,
    career_info
):

    comparisons = []

    for role_id in role_ids:

        score, _ = calculate_readiness(
            role_skills[role_id],
            user_skills
        )

        role_name = next(
            (
                role["role_name"]
                for role in roles
                if role["role_id"] == role_id
            ),
            role_id
        )

        info = career_info.get(
            role_id,
            {}
        )

        comparisons.append(
            {
                "role_id": role_id,
                "role_name": role_name,
                "readiness_score": score,
                "salary": info.get(
                    "salary",
                    "N/A"
                ),
                "demand": info.get(
                    "demand",
                    "N/A"
                ),
                "difficulty": info.get(
                    "difficulty",
                    "N/A"
                ),
                "learning_time": info.get(
                    "learning_time",
                    "N/A"
                )
            }
        )

    comparisons.sort(
        key=lambda x: x["readiness_score"],
        reverse=True
    )

    return comparisons