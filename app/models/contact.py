from django.db import models


class ContactMessage(models.Model):
    INQUIRY_TYPE = [
        ("general", "General Inquiry"),
        ("employer", "Employer/Recruitment"),
        ("job_seeker", "Job Application"),
        ("training", "Training Inquiry"),
        ("complaint", "Complaint"),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    company = models.CharField(max_length=200, blank=True)
    inquiry_type = models.CharField(max_length=50, choices=INQUIRY_TYPE)
    message = models.TextField()

    is_read = models.BooleanField(default=False)
    replied = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.inquiry_type}"
