from django.db import models


class Document(models.Model):
    DOCUMENT_TYPE = [
        ("employer_form", "Employer Form"),
        ("candidate_form", "Candidate Form"),
        ("demand_letter", "Demand Letter Template"),
        ("power_of_attorney", "Power of Attorney"),
        ("medical_checklist", "Medical Checklist"),
        ("policy", "Policy Document"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=200)
    document_type = models.CharField(max_length=50, choices=DOCUMENT_TYPE)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="documents/")
    file_size = models.CharField(max_length=50, blank=True)
    download_count = models.IntegerField(default=0)

    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order", "title"]

    def __str__(self):
        return self.title
