from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils.text import slugify

from app.models.industry import Client, Industry


class JobCategory(models.Model):
    SKILL_LEVEL = [
        ("skilled", "Skilled"),
        ("semi_skilled", "Semi-Skilled"),
        ("professinal", "Professional"),
        ("unskilled", "Unskilled"),
    ]

    name = models.CharField(max_length=255)
    skill_level = models.CharField(max_length=50, choices=SKILL_LEVEL)
    industry = models.ForeignKey(
        Industry, on_delete=models.CASCADE, related_name="job_categories"
    )
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Job Categories"
        ordering = ["industry", "name"]

    def __str__(self):
        return f"{self.name}({self.get_skill_level_display()})"


class Job(models.Model):
    STATUS_CHOICES = [
        ("open", "Open"),
        ("closed", "Closed"),
        ("filled", "Filled"),
        ("on_hold", "ON Hold"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    image = models.ImageField(upload_to="jobs/", blank=True)
    category = models.ForeignKey(
        JobCategory, on_delete=models.CASCADE, related_name="jobs"
    )
    industry = models.ForeignKey(
        Industry, on_delete=models.CASCADE, related_name="jobs"
    )
    client = models.ForeignKey(
        Client, on_delete=models.SET_NULL, null=True, blank=True, related_name="jobs"
    )
    country = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField()
    requirements = models.TextField()
    responsibilities = models.TextField(blank=True)
    salary_range = models.CharField(max_length=255, blank=True)
    contract_duration = models.CharField(max_length=255, blank=True)
    vacancies = models.IntegerField(default=1)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="open")
    is_featured = models.BooleanField(default=False)
    application_deadline = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Jobs"
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            # Ensure slug uniqueness in case multiple jobs share the same title
            while Job.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} - {self.country}"


class JobApplication(models.Model):
    STATUS_CHOICES = [
        ("submitted", "Submitted"),
        ("screening", "Screening"),
        ("interview", "Interview Scheduled"),
        ("medical", "Medical Process"),
        ("selected", "Selected"),
        ("rejected", "Rejected"),
        ("deployed", "Deployed"),
    ]

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    nationality = models.CharField(max_length=255)
    current_location = models.CharField(max_length=255)

    resume = models.FileField(
        upload_to="applications/resumes/",
        validators=[FileExtensionValidator(["pdf", "doc", "docx"])],
    )
    passport_copy = models.ImageField(upload_to="applications/passports/", blank=True)
    photo = models.ImageField(upload_to="applications/photos/", blank=True)

    years_of_experience = models.IntegerField(default=0)
    previous_experience = models.TextField(blank=True)
    skills = models.TextField(blank=True)

    status = models.CharField(
        max_length=50, choices=STATUS_CHOICES, default="submitted"
    )
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Job Applications"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.job.title}"
