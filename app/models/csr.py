from django.db import models
from django.utils.text import slugify


class CSRProject(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    impact_statement = models.TextField()
    featured_image = models.ImageField(upload_to="csr/", blank=True)
    date = models.DateField()
    location = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "CSR Project"
        ordering = ["-date"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
