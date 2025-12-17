from django.db import models

from app.models.industry import Industry


class EmployerInquiry(models.Model):
    STATUS_CHOICES = [
        ("new", "New"),
        ("processing", "Processing"),
        ("quotation_sent", "Quotation Sent"),
        ("approved", "Approved"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    company_name = models.CharField(max_length=200)
    contact_person = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    country = models.CharField(max_length=100)

    industry = models.ForeignKey(
        Industry, on_delete=models.SET_NULL, null=True, related_name="inquiries"
    )
    required_positions = models.TextField(help_text="List of positions needed")
    number_of_workers = models.IntegerField()
    job_description = models.TextField(blank=True)

    expected_start_date = models.DateField(null=True, blank=True)
    contract_duration = models.CharField(max_length=100, blank=True)

    demand_letter = models.FileField(upload_to="employer/demand_letters/", blank=True)
    additional_documents = models.FileField(upload_to="employer/documents/", blank=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Employer Inquiries"

    def __str__(self):
        return f"{self.company_name} - {self.number_of_workers} workers"
