def generate_insight(
    role_name,
    matched,
    missing
):

    matched_text = ", ".join(
        matched[:3]
    )

    missing_text = ", ".join(
        missing[:3]
    )

    return (
        f"You already possess skills such as "
        f"{matched_text}. "
        f"Learning {missing_text} could significantly "
        f"improve your readiness for a "
        f"{role_name} role."
    )