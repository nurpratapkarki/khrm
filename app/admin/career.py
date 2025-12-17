from django.contrib import admin
from django.utils.html import format_html
from app.admin.base import admin_site
from app.models.career import Career


@admin.register(Career, site=admin_site)
class CareerAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "department",
        "location",
        "employment_type",
        "is_active",
        "priority",
        "posted_at",
    )

    list_filter = (
        "is_active",
        "department",
        "employment_type",
        "posted_at",
    )

    list_editable = (
        "is_active",
        "priority",
    )

    search_fields = (
        "title",
        "department",
        "location",
        "summary",
        "responsibilities",
        "requirements",
    )

    ordering = ("priority", "-posted_at")
    prepopulated_fields = {"slug": ("title",)}
    save_on_top = True
    list_per_page = 25

    fieldsets = (
        (
            "Job Information",
            {
                "fields": (
                    "title",
                    "slug",
                    "image",
                    "department",
                    "location",
                    "employment_type",
                )
            },
        ),
        (
            "Job Description",
            {
                "fields": (
                    "summary",
                    "responsibilities",
                    "requirements",
                )
            },
        ),
        (
            "Application Info",
            {
                "fields": (
                    "application_email",
                    "apply_url",
                )
            },
        ),
        (
            "Visibility & Priority",
            {
                "fields": (
                    "is_active",
                    "priority",
                    "posted_at",
                    "updated_at",
                )
            },
        ),
    )

    readonly_fields = ("posted_at", "updated_at")

    def active_status(self, obj):
        color = "green" if obj.is_active else "red"
        return format_html(
            '<strong style="color:{};">{}</strong>',
            color,
            "Active" if obj.is_active else "Inactive",
        )

    active_status.short_description = "Status"

    actions = ["mark_as_active", "mark_as_inactive"]

    @admin.action(description="Mark selected careers as active")
    def mark_as_active(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description="Mark selected careers as inactive")
    def mark_as_inactive(self, request, queryset):
        queryset.update(is_active=False)
