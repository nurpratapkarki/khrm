from django.contrib import admin
from django.utils.html import format_html

from app.models.industry import Client, Industry, Testimonial
from app.admin.base import admin_site

@admin.register(Industry, site=admin_site)
class IndustryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "icon_preview",
        "is_featured",
        "display_order",
    )
    list_editable = ("is_featured", "display_order")
    list_filter = ("is_featured",)
    search_fields = ("name", "description", "overview")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("display_order",)
    save_on_top = True

    fieldsets = (
        (
            "Basic Information",
            {
                "fields": ("name", "slug", "icon", "description"),
            },
        ),
        (
            "Content & Media",
            {
                "fields": ("overview", "image"),
            },
        ),
        (
            "Display Settings",
            {
                "fields": ("display_order", "is_featured"),
            },
        ),
    )

    def icon_preview(self, obj):
        return format_html("<span style='font-size:18px'>{}</span>", obj.icon)

    icon_preview.short_description = "Icon"


@admin.register(Client, site=admin_site)
class ClientAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "logo_preview",
        "industry",
        "country",
        "is_featured",
        "display_order",
    )
    list_editable = ("is_featured", "display_order")
    list_filter = ("industry", "country", "is_featured")
    search_fields = ("name", "country", "website")
    autocomplete_fields = ("industry",)
    ordering = ("display_order", "name")
    save_on_top = True

    fieldsets = (
        (
            "Client Information",
            {
                "fields": ("name", "industry", "country"),
            },
        ),
        (
            "Brand & Online Presence",
            {
                "fields": ("logo", "website"),
            },
        ),
        (
            "Display Settings",
            {
                "fields": ("display_order", "is_featured"),
            },
        ),
    )

    def logo_preview(self, obj):
        if obj.logo:
            return format_html(
                "<img src='{}' style='height:40px; object-fit:contain;' />",
                obj.logo.url,
            )
        return "-"

    logo_preview.short_description = "Logo"


@admin.register(Testimonial, site=admin_site)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = (
        "person_name",
        "company_name",
        "client",
        "rating",
        "is_featured",
        "created_at",
    )
    list_filter = ("rating", "is_featured", "created_at")
    search_fields = (
        "person_name",
        "company_name",
        "testimonial_text",
    )
    autocomplete_fields = ("client",)
    ordering = ("-created_at",)
    readonly_fields = ("created_at",)
    save_on_top = True

    fieldsets = (
        (
            "Person Details",
            {
                "fields": (
                    "person_name",
                    "person_position",
                    "person_photo",
                    "company_name",
                ),
            },
        ),
        (
            "Testimonial Content",
            {
                "fields": ("testimonial_text", "rating"),
            },
        ),
        (
            "Associations & Status",
            {
                "fields": ("client", "is_featured", "created_at"),
            },
        ),
    )
