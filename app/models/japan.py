from django.db import models


class JapanLandingPage(models.Model):
    intro_title = models.CharField(max_length=200)
    intro_description = models.TextField()

    commitment_title = models.CharField(max_length=200)
    commitment_intro = models.TextField(blank=True)

    preparation_title = models.CharField(max_length=200)
    preparation_intro = models.TextField(blank=True)

    trust_title = models.CharField(max_length=200)
    trust_intro = models.TextField(blank=True)

    vision_title = models.CharField(max_length=200)
    vision_intro = models.TextField(blank=True)

    commitment_image = models.ImageField(upload_to="japan/sections/", blank=True)
    preparation_image = models.ImageField(upload_to="japan/sections/", blank=True)
    trust_image = models.ImageField(upload_to="japan/sections/", blank=True)
    vision_image = models.ImageField(upload_to="japan/sections/", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Japan Landing Page"
        verbose_name_plural = "Japan Landing Pages"

    def __str__(self):
        return self.intro_title


class JapanBulletPoint(models.Model):
    SECTION_CHOICES = [
        ("commitment", "Commitment"),
        ("preparation", "Preparation System"),
        ("trust", "Why Japan Trusts KHRM"),
        ("vision", "Vision"),
    ]

    page = models.ForeignKey(
        JapanLandingPage,
        on_delete=models.CASCADE,
        related_name="bullet_points",
    )
    section = models.CharField(max_length=20, choices=SECTION_CHOICES)
    title = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["section", "order"]

    def __str__(self):
        return f"{self.get_section_display()} - {self.title or self.description[:40]}"


class JapanTeamMember(models.Model):
    page = models.ForeignKey(
        JapanLandingPage,
        on_delete=models.CASCADE,
        related_name="team_members",
    )
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200, blank=True)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to="japan/team/", blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Japan Team Member"
        verbose_name_plural = "Japan Team Members"

    def __str__(self):
        return self.name


class JapanProgramType(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Japan Program Type"
        verbose_name_plural = "Japan Program Types"

    def __str__(self):
        return self.name


class JapanProgram(models.Model):
    program_type = models.ForeignKey(
        JapanProgramType, on_delete=models.PROTECT, related_name="programs"
    )
    subtitle = models.CharField(
        max_length=255, blank=True, help_text="Secondary title or short description"
    )
    overview = models.TextField(help_text="Program overview and description")
    # Language Training Section
    language_training_title = models.CharField(
        max_length=255, default="Japanese Language Training"
    )
    training_duration = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Required for SSW; optional for Engineer/Specialist",
    )
    target_level = models.CharField(
        max_length=150, help_text="JLPT/JFT or professional communication level"
    )
    objective = models.TextField(help_text="Objective of the training")
    image = models.ImageField(upload_to="japan_programs/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Japan Training Program"
        verbose_name_plural = "Japan Training Programs"
        ordering = ["program_type", "-created_at"]

    def __str__(self):
        if self.program_type_id and getattr(self, "program_type", None):
            base = self.program_type.name
        else:
            base = "Japan Program"

        if self.subtitle:
            return f"{base} - {self.subtitle}"
        return base


class JapanProgramTrainingPoint(models.Model):
    program = models.ForeignKey(
        JapanProgram, related_name="training_points", on_delete=models.CASCADE
    )

    point = models.CharField(max_length=255, help_text="Single training point")

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Training Point"
        verbose_name_plural = "Training Points"

    def __str__(self):
        return self.point


class WhyChooseJapanProgram(models.Model):
    program = models.ForeignKey(
        JapanProgram, related_name="why_choose_points", on_delete=models.CASCADE
    )
    why_choose = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Why Choose Japan Program"
        verbose_name_plural = "Why Choose Japan Programs"

    def __str__(self):
        return self.why_choose
