from django.db import models
from django.utils.text import slugify


class Career(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    image = models.ImageField(upload_to="career/")
    department = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=200)
    employment_type = models.CharField(max_length=100, blank=True)

    summary = models.TextField(blank=True)
    responsibilities = models.TextField(blank=True)
    requirements = models.TextField(blank=True)

    application_email = models.EmailField(blank=True)
    apply_url = models.URLField(blank=True)

    is_active = models.BooleanField(default=True)
    priority = models.IntegerField(default=0)
    posted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["priority", "-posted_at"]
        verbose_name = "Career"
        verbose_name_plural = "Careers"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
