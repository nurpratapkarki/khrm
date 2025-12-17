from django.contrib import admin

from app.admin.base import admin_site
from app.models.contact import ContactMessage


@admin.register(ContactMessage, site=admin_site)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "company",
        "inquiry_type",
        "is_read",
        "replied",
        "created_at",
    )

    list_display_links = ("name", "email")

    list_editable = (
        "is_read",
        "replied",
    )

    list_filter = (
        "inquiry_type",
        "is_read",
        "replied",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "company",
        "message",
        "notes",
    )

    ordering = ("-created_at",)
    list_per_page = 25
    date_hierarchy = "created_at"
    empty_value_display = "—"

    save_on_top = True
    show_facets = admin.ShowFacets.ALWAYS

    fieldsets = (
        (
            "Contact Details",
            {
                "fields": (
                    "name",
                    "email",
                    "phone",
                    "company",
                )
            },
        ),
        (
            "Inquiry",
            {
                "fields": (
                    "inquiry_type",
                    "message",
                )
            },
        ),
        (
            "Admin Status",
            {
                "fields": (
                    "is_read",
                    "replied",
                    "notes",
                )
            },
        ),
        (
            "System Info",
            {
                "fields": ("created_at",),
                "classes": ("collapse",),
            },
        ),
    )

    readonly_fields = ("created_at",)

    actions = (
        "mark_as_read",
        "mark_as_unread",
        "mark_as_replied",
        "mark_as_pending",
    )

    @admin.action(description="Mark selected messages as read")
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)

    @admin.action(description="Mark selected messages as unread")
    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)

    @admin.action(description="Mark selected messages as replied")
    def mark_as_replied(self, request, queryset):
        queryset.update(replied=True)

    @admin.action(description="Mark selected messages as pending reply")
    def mark_as_pending(self, request, queryset):
        queryset.update(replied=False)
