def explain_role(
    user_skills,
    required_skills,
    skills
):

    matched = []
    missing = []

    for skill in required_skills:

        skill_id = skill["skill_id"]

        skill_name = skills.get(
            skill_id,
            skill_id
        )

        if skill_id in user_skills:

            matched.append(
                skill_name
            )

        else:

            missing.append(
                skill_name
            )

    return {
        "matched": matched[:5],
        "missing": missing[:5]
    }