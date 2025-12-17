from django.db import models


class Industry(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    icon = models.CharField(max_length=50, help_text="CSS icon class or emoji")
    description = models.TextField()
    overview = models.TextField(blank=True)
    image = models.ImageField(upload_to="industries/", blank=True)
    display_order = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ["display_order"]
        verbose_name_plural = "Industries"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.name.lower().replace(" ", "-")
        super(Industry, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Client(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="clients/", blank=True)
    website = models.URLField(blank=True)
    industry = models.ForeignKey(
        Industry, on_delete=models.SET_NULL, null=True, related_name="clients"
    )
    country = models.CharField(max_length=255, blank=True)
    is_featured = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["display_order", "name"]

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="testimonials",
        null=True,
        blank=True,
    )
    person_name = models.CharField(max_length=200)
    person_position = models.CharField(max_length=200)
    person_photo = models.ImageField(upload_to="testimonials/", blank=True)
    company_name = models.CharField(max_length=200, blank=True)
    testimonial_text = models.TextField()
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.person_name} - {self.company_name}"
