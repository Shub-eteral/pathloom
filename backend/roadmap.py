def generate_roadmap(required_skills, missing_skills, skills):

    roadmap_data = []

    for skill in required_skills:

        if skill["skill_id"] in missing_skills:

            roadmap_data.append(
                (
                    skill["importance"],
                    skills[skill["skill_id"]]
                )
            )

    roadmap_data.sort(reverse=True)

    roadmap = []

    step = 1

    for _, skill_name in roadmap_data:

        roadmap.append(
            f"Step {step}: Learn {skill_name}"
        )

        step += 1

    return roadmap