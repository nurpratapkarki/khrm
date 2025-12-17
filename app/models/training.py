from django.db import models


class TrainingCourse(models.Model):
    COURSE_TYPE = [
        ("language", "Language"),
        ("vocational", "Vocational"),
        ("technical", "Technical"),
        ("soft_skills", "Soft Skills"),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    course_type = models.CharField(max_length=50, choices=COURSE_TYPE)
    description = models.TextField()
    duration = models.CharField(max_length=100)
    course_image = models.ImageField(upload_to="training/courses/", blank=True)

    syllabus = models.TextField(blank=True)
    prerequisites = models.TextField(blank=True)
    certification_provided = models.BooleanField(default=True)

    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["display_order", "name"]
        verbose_name_plural = "Training Courses"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.name.lower().replace(" ", "-")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class TrainingFacility(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    capacity = models.IntegerField()
    image = models.ImageField(upload_to="training/facilities/", blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Training Facilities"
        ordering = ["display_order"]

    def __str__(self):
        return self.name
