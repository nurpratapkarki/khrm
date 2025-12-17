from django.contrib import admin
from app.models.sso import AllowedEmail
from app.admin.base import admin_site

@admin.register(AllowedEmail, site=admin_site)
class AllowedEmailAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at", "updated_at")
    search_fields = ("email",)
    ordering = ("-created_at",)
