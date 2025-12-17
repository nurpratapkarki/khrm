from django.db import models


class PrivacyPolicy(models.Model):
    title = models.CharField(max_length=200, default="Privacy Policy")
    slug = models.SlugField(unique=True, default="privacy-policy")
    content = models.TextField()
    last_updated = models.DateField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Privacy Policy"
        verbose_name_plural = "Privacy Policies"

    def __str__(self):
        return self.title


class TermsOfService(models.Model):
    title = models.CharField(max_length=200, default="Terms of Service")
    slug = models.SlugField(unique=True, default="terms-of-service")
    content = models.TextField()
    last_updated = models.DateField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Terms of Service"
        verbose_name_plural = "Terms of Service"

    def __str__(self):
        return self.title


class FAQ(models.Model):
    """Frequently Asked Questions"""

    CATEGORY = [
        ("general", "General"),
        ("job_seekers", "Job Seekers"),
        ("employers", "Employers"),
        ("training", "Training"),
        ("visa", "Visa & Documentation"),
    ]

    category = models.CharField(max_length=50, choices=CATEGORY)
    question = models.CharField(max_length=300)
    answer = models.TextField()
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"
        ordering = ["category", "display_order"]

    def __str__(self):
        return self.question
