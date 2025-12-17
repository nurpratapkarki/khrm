from django.contrib import admin

from app.models.training import TrainingCourse, TrainingFacility
from app.admin.base import admin_site


@admin.register(TrainingCourse, site=admin_site)
class TrainingCourseAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "course_type",
        "duration",
        "certification_provided",
        "is_active",
        "display_order",
    )

    list_filter = (
        "course_type",
        "certification_provided",
        "is_active",
    )

    list_editable = (
        "is_active",
        "display_order",
    )

    search_fields = (
        "name",
        "description",
        "syllabus",
    )

    prepopulated_fields = {"slug": ("name",)}
    ordering = ("display_order", "name")

    fieldsets = (
        (
            "Course Information",
            {
                "fields": (
                    "name",
                    "slug",
                    "course_type",
                    "description",
                    "course_image",
                )
            },
        ),
        (
            "Course Details",
            {
                "fields": (
                    "duration",
                    "syllabus",
                    "prerequisites",
                )
            },
        ),
        (
            "Certification & Visibility",
            {
                "fields": (
                    "certification_provided",
                    "is_active",
                    "display_order",
                )
            },
        ),
    )

    save_on_top = True
    list_per_page = 25


@admin.register(TrainingFacility, site=admin_site)
class TrainingFacilityAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "capacity",
        "display_order",
    )

    list_editable = ("display_order",)

    search_fields = (
        "name",
        "description",
    )

    ordering = ("display_order", "name")

    fieldsets = (
        (
            "Facility Information",
            {
                "fields": (
                    "name",
                    "description",
                    "capacity",
                    "image",
                )
            },
        ),
        (
            "Display Settings",
            {"fields": ("display_order",)},
        ),
    )

    save_on_top = True
    list_per_page = 25
