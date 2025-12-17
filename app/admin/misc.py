from django.contrib import admin

from app.admin.base import admin_site
from app.models.misc import FAQ, PrivacyPolicy, TermsOfService


@admin.register(PrivacyPolicy, site=admin_site)
class PrivacyPolicyAdmin(admin.ModelAdmin):
    list_display = ("title", "last_updated", "is_active")
    list_editable = ("is_active",)
    search_fields = ("title",)
    save_on_top = True
    readonly_fields = ("last_updated",)
    list_per_page = 20
    fieldsets = (
        (None, {"fields": ("title", "slug", "content", "is_active", "last_updated")}),
    )


@admin.register(TermsOfService, site=admin_site)
class TermsOfServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "last_updated", "is_active")
    list_editable = ("is_active",)
    search_fields = ("title",)
    save_on_top = True
    readonly_fields = ("last_updated",)
    list_per_page = 20
    fieldsets = (
        (None, {"fields": ("title", "slug", "content", "is_active", "last_updated")}),
    )


@admin.register(FAQ, site=admin_site)
class FAQAdmin(admin.ModelAdmin):
    list_display = ["question", "category", "display_order", "is_active"]
    list_filter = ["category", "is_active"]
    search_fields = ["question", "answer"]
    list_editable = ["display_order", "is_active"]
