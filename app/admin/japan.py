from django.contrib import admin
from django.utils.html import format_html
from app.admin.base import admin_site
from app.models.japan import (
    JapanBulletPoint,
    JapanLandingPage,
    JapanProgram,
    JapanProgramTrainingPoint,
    JapanProgramType,
    JapanTeamMember,
    WhyChooseJapanProgram,
)


def image_preview(obj, field_name):
    img = getattr(obj, field_name)
    if img:
        return format_html(
            '<img src="{}" style="max-height:100px; max-width:150px;" />', img.url
        )
    return "—"


image_preview.short_description = "Preview"



@admin.register(JapanLandingPage, site=admin_site)
class JapanLandingPageAdmin(admin.ModelAdmin):
    list_display = ("intro_title", "created_at", "updated_at")
    save_on_top = True
    list_per_page = 20

    fieldsets = (
        ("Introduction", {"fields": ("intro_title", "intro_description")}),
        (
            "Commitment Section",
            {
                "fields": (
                    "commitment_title",
                    "commitment_intro",
                    "commitment_image_preview",
                    "commitment_image",
                )
            },
        ),
        (
            "Preparation Section",
            {
                "fields": (
                    "preparation_title",
                    "preparation_intro",
                    "preparation_image_preview",
                    "preparation_image",
                )
            },
        ),
        (
            "Trust Section",
            {
                "fields": (
                    "trust_title",
                    "trust_intro",
                    "trust_image_preview",
                    "trust_image",
                )
            },
        ),
        (
            "Vision Section",
            {
                "fields": (
                    "vision_title",
                    "vision_intro",
                    "vision_image_preview",
                    "vision_image",
                )
            },
        ),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    readonly_fields = (
        "created_at",
        "updated_at",
        "commitment_image_preview",
        "preparation_image_preview",
        "trust_image_preview",
        "vision_image_preview",
    )



    def commitment_image_preview(self, obj):
        return image_preview(obj, "commitment_image")

    def preparation_image_preview(self, obj):
        return image_preview(obj, "preparation_image")

    def trust_image_preview(self, obj):
        return image_preview(obj, "trust_image")

    def vision_image_preview(self, obj):
        return image_preview(obj, "vision_image")


@admin.register(JapanProgramType, site=admin_site)
class JapanProgramTypeAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    save_on_top = True


@admin.register(JapanBulletPoint, site=admin_site)
class JapanBulletPointAdmin(admin.ModelAdmin):
    list_display = ("section", "title", "order")
    list_filter = ("section",)
    search_fields = ("title", "description")
    ordering = ("section", "order")
    save_on_top = True
    list_per_page = 25

    fieldsets = (
        ("Bullet Point Info", {"fields": ("section", "title", "description", "order")}),
    )


@admin.register(JapanTeamMember, site=admin_site)
class JapanTeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "order", "photo_preview")
    list_filter = ("role",)
    search_fields = ("name", "role", "bio")
    ordering = ("order",)
    save_on_top = True
    list_per_page = 25

    fieldsets = (
        ("Team Member Info", {"fields": ("name", "role", "bio", "order")}),
        ("Photo", {"fields": ("photo_preview", "photo")}),
    )

    readonly_fields = ("photo_preview",)

    def photo_preview(self, obj):
        return image_preview(obj, "photo")

    photo_preview.short_description = "Photo Preview"


class JapanProgramTrainingPointInline(admin.TabularInline):
    model = JapanProgramTrainingPoint
    extra = 1
    fields = ("point", "order")
    ordering = ("order",)


class WhyChooseJapanProgramInline(admin.TabularInline):
    model = WhyChooseJapanProgram
    extra = 1
    fields = ("why_choose", "order")
    ordering = ("order",)


@admin.register(JapanProgram, site=admin_site)
class JapanProgramAdmin(admin.ModelAdmin):
    list_display = (
        "program_display",
        "program_type",
        "is_active",
        "created_at",
        "image_preview",
    )
    list_filter = ("program_type", "is_active", "created_at")
    search_fields = ("subtitle", "overview", "objective", "target_level")
    save_on_top = True
    list_per_page = 25
    ordering = ("program_type", "-created_at")

    fieldsets = (
        (
            "Program Info",
            {
                "fields": (
                    "program_type",
                    "subtitle",
                    "overview",
                    "image_preview",
                    "image",
                    "is_active",
                )
            },
        ),
        (
            "Language Training",
            {
                "fields": (
                    "language_training_title",
                    "training_duration",
                    "target_level",
                    "objective",
                )
            },
        ),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    readonly_fields = ("created_at", "updated_at", "image_preview")
    inlines = [JapanProgramTrainingPointInline, WhyChooseJapanProgramInline]

    def program_display(self, obj):
        return str(obj)

    program_display.short_description = "Program"

    def image_preview(self, obj):
        return image_preview(obj, "image")

    image_preview.short_description = "Image Preview"
