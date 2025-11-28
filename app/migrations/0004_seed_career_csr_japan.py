from django.db import migrations
from datetime import date


def create_seed_data(apps, schema_editor):
    Career = apps.get_model("app", "Career")
    CSRProject = apps.get_model("app", "CSRProject")
    JapanLandingPage = apps.get_model("app", "JapanLandingPage")
    JapanBulletPoint = apps.get_model("app", "JapanBulletPoint")
    JapanTeamMember = apps.get_model("app", "JapanTeamMember")

    # Only create seed data if there is nothing yet, so it stays non-destructive
    if Career.objects.exists() or CSRProject.objects.exists() or JapanLandingPage.objects.exists():
        return

    # --- Careers (internal hiring) ---
    Career.objects.create(
        title="Japan Desk Recruitment Officer",
        department="Japan Desk",
        location="Kathmandu, Nepal",
        employment_type="Full-time",
        summary=(
            "Coordinate end-to-end recruitment activities for Japan-focused hiring, "
            "including candidate screening, interview scheduling, and client updates."
        ),
        responsibilities=(
            "- Manage candidate pipeline for Japan opportunities\n"
            "- Coordinate with Japanese employers and local partners\n"
            "- Maintain accurate documentation and reporting"
        ),
        requirements=(
            "- Bachelor's degree in any discipline\n"
            "- Strong communication skills in English (Japanese is a plus)\n"
            "- Prior experience in recruitment or HR preferred"
        ),
        application_email="careers@khrm.com.np",
        is_active=True,
        priority=1,
    )

    Career.objects.create(
        title="Training & Compliance Coordinator (Japan)",
        department="Training",
        location="Kathmandu, Nepal",
        employment_type="Full-time",
        summary=(
            "Oversee pre-departure training, compliance documentation, and orientation "
            "for candidates travelling to Japan."
        ),
        responsibilities=(
            "- Coordinate language and cultural training sessions\n"
            "- Ensure documentation complies with Japan regulations\n"
            "- Liaise with candidates, trainers, and partner institutions"
        ),
        requirements=(
            "- Bachelor's degree in management or related field\n"
            "- Excellent organisational skills\n"
            "- Experience in training or compliance is an advantage"
        ),
        application_email="careers@khrm.com.np",
        is_active=True,
        priority=2,
    )

    # --- CSR Projects ---
    CSRProject.objects.create(
        title="Skill Development for Returnee Migrant Workers",
        description=(
            "A community initiative focused on upskilling returnee migrant workers "
            "through career counselling and technical training."
        ),
        impact_statement=(
            "Supported dozens of returnee workers to re-enter the job market with "
            "better skills and confidence."
        ),
        featured_image="csr/skill-development.jpg",
        date=date(2024, 3, 15),
        location="Kathmandu Valley, Nepal",
        is_active=True,
    )

    CSRProject.objects.create(
        title="Community Outreach on Ethical Recruitment",
        description=(
            "Awareness sessions conducted in local communities about safe migration, "
            "ethical recruitment practices, and workers rights."
        ),
        impact_statement=(
            "Reached hundreds of prospective migrants and their families with "
            "practical information on safe migration."
        ),
        featured_image="csr/ethical-recruitment.jpg",
        date=date(2024, 7, 10),
        location="Province 3, Nepal",
        is_active=True,
    )

    # --- Japan Landing Page ---
    landing = JapanLandingPage.objects.create(
        intro_title="Japan-focused recruitment from Nepal",
        intro_description=(
            "KHRM Nepal connects motivated Nepali talent with trusted employers in "
            "Japan through a transparent, compliant and well-prepared process."
        ),
        commitment_title="Our commitment to Japan and Nepali workers",
        commitment_intro=(
            "We invest in long-term partnerships built on trust, compliance and "
            "continuous support for both employers and candidates."
        ),
        preparation_title="Japan-focused preparation system",
        preparation_intro=(
            "From language and culture to workplace discipline, candidates go "
            "through a structured preparation journey before departure."
        ),
        trust_title="Why Japan trusts KHRM Nepal",
        trust_intro=(
            "A combination of compliance, transparency and strong on-the-ground "
            "support makes us a reliable partner for Japan."
        ),
        vision_title="Vision for the Japan-Nepal workforce partnership",
        vision_intro=(
            "To build a sustainable bridge between Japan and Nepal where skilled, "
            "well-prepared workers contribute to both economies."
        ),
    )

    # --- Japan Bullet Points ---
    bullets = [
        # Commitment
        {
            "section": "commitment",
            "title": "Ethical recruitment",
            "description": "Zero-tolerance policy on illegal fees and unfair practices.",
            "order": 1,
        },
        {
            "section": "commitment",
            "title": "Long-term support",
            "description": "Support for workers before departure and after arrival in Japan.",
            "order": 2,
        },
        # Preparation system
        {
            "section": "preparation",
            "title": "Language & culture training",
            "description": "JLPT-focused language classes and practical cultural orientation.",
            "order": 1,
        },
        {
            "section": "preparation",
            "title": "Workplace discipline",
            "description": "Emphasis on safety, punctuality and teamwork in Japanese workplaces.",
            "order": 2,
        },
        # Trust
        {
            "section": "trust",
            "title": "Transparent processes",
            "description": "Clear documentation, communication and reporting for clients.",
            "order": 1,
        },
        {
            "section": "trust",
            "title": "Compliance-first mindset",
            "description": "Aligned with regulations in both Nepal and Japan.",
            "order": 2,
        },
        # Vision
        {
            "section": "vision",
            "title": "Sustainable partnerships",
            "description": "Build a stable corridor of skilled workers between Japan and Nepal.",
            "order": 1,
        },
        {
            "section": "vision",
            "title": "Shared growth",
            "description": "Create opportunities that benefit employers, workers and communities.",
            "order": 2,
        },
    ]

    for data in bullets:
        JapanBulletPoint.objects.create(page=landing, **data)

    # --- Japan Team Members ---
    JapanTeamMember.objects.create(
        page=landing,
        name="Japan Program Director",
        role="Leads Japan market strategy and employer relations",
        bio=(
            "Over a decade of experience connecting Nepali talent with "
            "international opportunities, with a dedicated focus on Japan."
        ),
        photo="japan/team/director.jpg",
        order=1,
    )

    JapanTeamMember.objects.create(
        page=landing,
        name="Training & Compliance Lead",
        role="Oversees pre-departure training and documentation",
        bio=(
            "Ensures every candidate is well-prepared, compliant and confident "
            "before travelling to Japan."
        ),
        photo="japan/team/training-lead.jpg",
        order=2,
    )


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0003_career_and_japan_landing"),
    ]

    operations = [
        migrations.RunPython(create_seed_data, migrations.RunPython.noop),
    ]

