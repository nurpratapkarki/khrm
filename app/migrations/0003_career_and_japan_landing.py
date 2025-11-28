from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0002_privacypolicy_termsofservice"),
    ]

    operations = [
        migrations.CreateModel(
            name="Career",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200)),
                ("slug", models.SlugField(blank=True, unique=True)),
                ("department", models.CharField(blank=True, max_length=100)),
                ("location", models.CharField(max_length=200)),
                ("employment_type", models.CharField(blank=True, max_length=100)),
                ("summary", models.TextField(blank=True)),
                ("responsibilities", models.TextField(blank=True)),
                ("requirements", models.TextField(blank=True)),
                ("application_email", models.EmailField(blank=True, max_length=254)),
                ("apply_url", models.URLField(blank=True)),
                ("is_active", models.BooleanField(default=True)),
                ("priority", models.IntegerField(default=0)),
                ("posted_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Career",
                "verbose_name_plural": "Careers",
                "ordering": ["priority", "-posted_at"],
            },
        ),
        migrations.CreateModel(
            name="JapanLandingPage",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("intro_title", models.CharField(max_length=200)),
                ("intro_description", models.TextField()),
                ("commitment_title", models.CharField(max_length=200)),
                ("commitment_intro", models.TextField(blank=True)),
                ("preparation_title", models.CharField(max_length=200)),
                ("preparation_intro", models.TextField(blank=True)),
                ("trust_title", models.CharField(max_length=200)),
                ("trust_intro", models.TextField(blank=True)),
                ("vision_title", models.CharField(max_length=200)),
                ("vision_intro", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Japan Landing Page",
                "verbose_name_plural": "Japan Landing Pages",
            },
        ),
        migrations.CreateModel(
            name="JapanBulletPoint",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("section", models.CharField(choices=[("commitment", "Commitment"), ("preparation", "Preparation System"), ("trust", "Why Japan Trusts KHRM"), ("vision", "Vision")], max_length=20)),
                ("title", models.CharField(blank=True, max_length=200)),
                ("description", models.TextField()),
                ("order", models.IntegerField(default=0)),
                ("page", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="bullet_points", to="app.japanlandingpage")),
            ],
            options={
                "ordering": ["section", "order"],
            },
        ),
        migrations.CreateModel(
            name="JapanTeamMember",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200)),
                ("role", models.CharField(blank=True, max_length=200)),
                ("bio", models.TextField(blank=True)),
                ("photo", models.ImageField(blank=True, upload_to="japan/team/")),
                ("order", models.IntegerField(default=0)),
                ("page", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="team_members", to="app.japanlandingpage")),
            ],
            options={
                "verbose_name": "Japan Team Member",
                "verbose_name_plural": "Japan Team Members",
                "ordering": ["order"],
            },
        ),
    ]

