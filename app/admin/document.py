from django.contrib import admin
from django.utils.html import format_html
from app.admin.base import admin_site
from app.models.document import Document


@admin.register(Document,site=admin_site)
class DocumentAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "document_type",
        "file_link",
        "file_size",
        "download_count",
        "is_active",
        "display_order",
        "uploaded_at",
    )

    list_filter = (
        "document_type",
        "is_active",
        "uploaded_at",
    )

    list_editable = (
        "is_active",
        "display_order",
    )

    search_fields = (
        "title",
        "description",
    )

    ordering = ("display_order", "title")
    date_hierarchy = "uploaded_at"

    fieldsets = (
        (
            "Document Information",
            {
                "fields": (
                    "title",
                    "document_type",
                    "description",
                )
            },
        ),
        (
            "File",
            {
                "fields": (
                    "file",
                    "file_size",
                )
            },
        ),
        (
            "Visibility & Ordering",
            {
                "fields": (
                    "is_active",
                    "display_order",
                )
            },
        ),
        (
            "Statistics",
            {
                "fields": (
                    "download_count",
                    "uploaded_at",
                )
            },
        ),
    )

    readonly_fields = (
        "download_count",
        "uploaded_at",
    )

    save_on_top = True
    list_per_page = 25

    def file_link(self, obj):
        if obj.file:
            return format_html(
                '<a href="{}" target="_blank">Download</a>',
                obj.file.url,
            )
        return "—"

    file_link.short_description = "File"
