from django.contrib import admin
from django.utils.html import format_html

from app.admin.base import admin_site
from app.models.office import (
    Branch,
    Certification,
    Company,
    Leadership,
    Office,
)


def image_preview(obj, field_name, width=80):
    field = getattr(obj, field_name)
    if field:
        return format_html(
            '<img src="{}" width="{}" style="border-radius:6px;" />',
            field.url,
            width,
        )
    return "-"


@admin.register(Company, site=admin_site)
class CompanyAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            "Basic Information",
            {
                "fields": (
                    "establishment_year",
                    "license_number",
                    "experience_years",
                    "total_deployment",
                    "client_satisfaction",
                )
            },
        ),
        (
            "Hero Section",
            {
                "fields": (
                    "hero_headline",
                    # "hero_subtext",
                    ("hero_image", "hero_image1", "hero_image2", "hero_image3"),
                )
            },
        ),
        (
            "About Company",
            {
                "fields": (
                    "about_text",
                    "about_image",
                    "about_background_image",
                )
            },
        ),
        (
            "Mission, Vision & Values",
            {
                "fields": (
                    ("mission", "mission_image"),
                    ("vision", "vision_image"),
                    ("values", "values_image"),
                )
            },
        ),
        (
            "Branding",
            {
                "fields": ("logo",),
            },
        ),
    )

    readonly_fields = (
        "logo_preview",
        "hero_preview",
    )

    def logo_preview(self, obj):
        return image_preview(obj, "logo")

    def hero_preview(self, obj):
        return image_preview(obj, "hero_image", width=120)

    logo_preview.short_description = "Logo Preview"
    hero_preview.short_description = "Hero Image Preview"

    def has_add_permission(self, request):
        return not self.model.objects.exists()


@admin.register(Branch, site=admin_site)
class BranchAdmin(admin.ModelAdmin):
    list_display = ("country",)
    search_fields = ("country",)
    ordering = ("country",)


@admin.register(Office, site=admin_site)
class OfficeAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "branch",
        "city",
        "phone",
        "is_headquarter",
        "is_active",
        "display_order",
        "office_image_preview",
    )

    list_filter = (
        "branch",
        "is_headquarter",
        "is_active",
    )

    search_fields = (
        "name",
        "city",
        "phone",
        "email",
    )

    list_editable = (
        "is_active",
        "display_order",
    )

    ordering = ("display_order", "name")

    fieldsets = (
        (
            "Office Details",
            {
                "fields": (
                    "name",
                    "branch",
                    "is_headquarter",
                    "is_active",
                    "display_order",
                )
            },
        ),
        (
            "Contact Information",
            {
                "fields": (
                    "address",
                    "city",
                    "phone",
                    "email",
                    "whatsapp",
                    "facebook",
                )
            },
        ),
        (
            "Location",
            {"fields": (("latitude", "longitude"),)},
        ),
        (
            "Media",
            {
                "fields": ("office_image",),
            },
        ),
    )

    def office_image_preview(self, obj):
        return image_preview(obj, "office_image")

    office_image_preview.short_description = "Image"


@admin.register(Leadership, site=admin_site)
class LeadershipAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "position",
        "display_order",
        "photo_preview",
    )

    list_editable = ("display_order",)
    search_fields = ("name", "position")
    ordering = ("display_order",)

    fieldsets = (
        (
            "Profile",
            {
                "fields": (
                    "name",
                    "position",
                    "bio",
                    "email",
                )
            },
        ),
        (
            "Media",
            {
                "fields": ("photo",),
            },
        ),
        (
            "Display Settings",
            {
                "fields": ("display_order",),
            },
        ),
    )

    def photo_preview(self, obj):
        return image_preview(obj, "photo")

    photo_preview.short_description = "Photo"


@admin.register(Certification, site=admin_site)
class CertificationAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "issuing_authority",
        "certificate_number",
        "issue_date",
        "display_order",
        "certificate_preview",
    )

    list_editable = ("display_order",)
    list_filter = ("issuing_authority",)
    search_fields = (
        "name",
        "certificate_number",
        "issuing_authority",
    )

    ordering = ("display_order",)

    fieldsets = (
        (
            "Certificate Info",
            {
                "fields": (
                    "name",
                    "issuing_authority",
                    "certificate_number",
                    "issue_date",
                )
            },
        ),
        (
            "Media",
            {
                "fields": ("certificate_image",),
            },
        ),
        (
            "Display Settings",
            {
                "fields": ("display_order",),
            },
        ),
    )

    def certificate_preview(self, obj):
        return image_preview(obj, "certificate_image")

    certificate_preview.short_description = "Certificate"
