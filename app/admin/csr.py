from django.contrib import admin
from django.utils.html import format_html

from app.admin.base import admin_site
from app.models.csr import CSRProject


@admin.register(CSRProject, site=admin_site)
class CSRProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "date",
        "location",
    )

    list_filter = (
        "is_active",
        "date",
        "location",
    )

    search_fields = (
        "title",
        "description",
        "impact_statement",
        "location",
    )

    ordering = ("-date",)
    prepopulated_fields = {"slug": ("title",)}

    fieldsets = (
        (
            "Project Information",
            {
                "fields": (
                    "title",
                    "slug",
                    "description",
                    "impact_statement",
                    "featured_image",
                )
            },
        ),
        (
            "Additional Details",
            {
                "fields": (
                    "date",
                    "location",
                    "is_active",
                )
            },
        ),
    )

    readonly_fields = ()
    save_on_top = True
    list_per_page = 25

    def active_status(self, obj):
        if obj.is_active:
            return format_html('<strong style="color:green;">Active</strong>')
        return format_html('<strong style="color:red;">Inactive</strong>')

    active_status.short_description = "Status"
