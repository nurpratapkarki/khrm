from django.contrib import admin

from app.models.job import Job, JobApplication, JobCategory

from app.admin.base import admin_site
@admin.register(JobCategory, site=admin_site)
class JobCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "skill_level",
        "industry",
    )
    list_filter = ("skill_level", "industry")
    search_fields = ("name", "description")
    autocomplete_fields = ("industry",)
    ordering = ("industry", "name")
    save_on_top = True

    fieldsets = (
        (
            "Category Information",
            {
                "fields": ("name", "skill_level", "industry"),
            },
        ),
        (
            "Description",
            {
                "fields": ("description",),
            },
        ),
    )


@admin.register(Job, site=admin_site)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "industry",
        "category",
        "country",
        "status",
        "vacancies",
        "is_featured",
        "created_at",
    )
    list_editable = ("status", "vacancies", "is_featured")
    list_filter = (
        "status",
        "is_featured",
        "industry",
        "category",
        "country",
        "created_at",
    )
    search_fields = (
        "title",
        "country",
        "location",
        "description",
        "requirements",
    )
    autocomplete_fields = ("industry", "category", "client")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    date_hierarchy = "created_at"
    save_on_top = True
    ordering = ("-created_at",)

    fieldsets = (
        (
            "Job Basics",
            {
                "fields": (
                    "title",
                    "slug",
                    "image",
                    "status",
                    "is_featured",
                )
            },
        ),
        (
            "Associations",
            {
                "fields": (
                    "industry",
                    "category",
                    "client",
                )
            },
        ),
        (
            "Location & Contract",
            {
                "fields": (
                    "country",
                    "location",
                    "salary_range",
                    "contract_duration",
                    "vacancies",
                    "application_deadline",
                )
            },
        ),
        (
            "Job Details",
            {
                "fields": (
                    "description",
                    "requirements",
                    "responsibilities",
                )
            },
        ),
        (
            "System Info",
            {
                "fields": ("created_at", "updated_at"),
            },
        ),
    )


@admin.register(JobApplication, site=admin_site)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "job",
        "email",
        "phone",
        "nationality",
        "status",
        "created_at",
    )
    list_editable = ("status",)
    list_filter = (
        "status",
        "nationality",
        "job",
        "created_at",
    )
    search_fields = (
        "first_name",
        "last_name",
        "email",
        "phone",
        "skills",
        "previous_experience",
    )
    autocomplete_fields = ("job",)
    readonly_fields = ("created_at", "updated_at")
    date_hierarchy = "created_at"
    save_on_top = True
    ordering = ("-created_at",)

    fieldsets = (
        (
            "Applicant Information",
            {
                "fields": (
                    ("first_name", "last_name"),
                    ("email", "phone"),
                    ("date_of_birth", "nationality"),
                    "current_location",
                )
            },
        ),
        (
            "Job & Status",
            {
                "fields": (
                    "job",
                    "status",
                )
            },
        ),
        (
            "Documents",
            {
                "fields": (
                    "resume",
                    "passport_copy",
                    "photo",
                )
            },
        ),
        (
            "Experience & Skills",
            {
                "fields": (
                    "years_of_experience",
                    "skills",
                    "previous_experience",
                )
            },
        ),
        (
            "Internal Notes",
            {
                "fields": ("notes",),
            },
        ),
        (
            "System Info",
            {
                "fields": ("created_at", "updated_at"),
            },
        ),
    )

    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    full_name.short_description = "Applicant"
