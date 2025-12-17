from django.contrib import admin
from django.utils.html import format_html

from app.models.inquiry import EmployerInquiry
from app.admin.base import admin_site

@admin.register(EmployerInquiry, site=admin_site)
class EmployerInquiryAdmin(admin.ModelAdmin):
    list_display = (
        "company_name",
        "contact_person",
        "email",
        "country",
        "industry",
        "number_of_workers",
        "colored_status",
        "created_at",
    )

    list_filter = (
        "status",
        "country",
        "industry",
        "created_at",
    )

    search_fields = (
        "company_name",
        "contact_person",
        "email",
        "phone",
        "required_positions",
    )

    list_select_related = ("industry",)
    date_hierarchy = "created_at"
    ordering = ("-created_at",)

    fieldsets = (
        (
            "Company Information",
            {
                "fields": (
                    "company_name",
                    "industry",
                    "country",
                )
            },
        ),
        (
            "Contact Details",
            {
                "fields": (
                    "contact_person",
                    "email",
                    "phone",
                )
            },
        ),
        (
            "Requirement Details",
            {
                "fields": (
                    "required_positions",
                    "number_of_workers",
                    "job_description",
                )
            },
        ),
        (
            "Contract & Timeline",
            {
                "fields": (
                    "expected_start_date",
                    "contract_duration",
                )
            },
        ),
        (
            "Documents",
            {
                "fields": (
                    "demand_letter",
                    "additional_documents",
                )
            },
        ),
        (
            "Status & Internal Notes",
            {
                "fields": (
                    "status",
                    "notes",
                )
            },
        ),
        (
            "System Info",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )

    readonly_fields = ("created_at", "updated_at")

    list_per_page = 25
    save_on_top = True
    autocomplete_fields = ("industry",)

    actions = [
        "mark_processing",
        "mark_quotation_sent",
        "mark_completed",
        "mark_cancelled",
    ]

    def colored_status(self, obj):
        color_map = {
            "new": "#0d6efd",
            "processing": "#fd7e14",
            "quotation_sent": "#6f42c1",
            "approved": "#198754",
            "completed": "#20c997",
            "cancelled": "#dc3545",
        }
        color = color_map.get(obj.status, "#6c757d")
        return format_html(
            '<strong style="color: {};">{}</strong>',
            color,
            obj.get_status_display(),
        )

    colored_status.short_description = "Status"

    @admin.action(description="Mark selected as Processing")
    def mark_processing(self, request, queryset):
        queryset.update(status="processing")

    @admin.action(description="Mark selected as Quotation Sent")
    def mark_quotation_sent(self, request, queryset):
        queryset.update(status="quotation_sent")

    @admin.action(description="Mark selected as Completed")
    def mark_completed(self, request, queryset):
        queryset.update(status="completed")

    @admin.action(description="Mark selected as Cancelled")
    def mark_cancelled(self, request, queryset):
        queryset.update(status="cancelled")
