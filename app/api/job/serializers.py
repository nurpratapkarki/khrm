from rest_framework import serializers

from app.models.job import Job, JobCategory, JobApplication
from app.api.industry.serializers import IndustryListSerializer, ClientSerializer


class JobCategorySerializer(serializers.ModelSerializer):
    industry_name = serializers.CharField(source="industry.name", read_only=True)
    skill_level_display = serializers.CharField(
        source="get_skill_level_display", read_only=True
    )

    class Meta:
        model = JobCategory
        fields = "__all__"


class JobListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for job listings"""

    category_name = serializers.CharField(source="category.name", read_only=True)
    industry_name = serializers.CharField(source="industry.name", read_only=True)
    client_name = serializers.CharField(
        source="client.name", read_only=True, allow_null=True
    )
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    application_count = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "slug",
            "image",
            "category_name",
            "industry_name",
            "client_name",
            "country",
            "location",
            "vacancies",
            "status",
            "status_display",
            "salary_range",
            "contract_duration",
            "is_featured",
            "application_deadline",
            "created_at",
            "application_count",
        ]

    def get_application_count(self, obj):
        return obj.applications.count()


class JobDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer with full information"""

    category = JobCategorySerializer(read_only=True)
    industry = IndustryListSerializer(read_only=True)
    client = ClientSerializer(read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    application_count = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = "__all__"

    def get_application_count(self, obj):
        return obj.applications.count()


class JobApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source="job.title", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = JobApplication
        fields = "__all__"
        read_only_fields = ["status", "notes", "created_at", "updated_at"]


class JobApplicationCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating applications"""

    class Meta:
        model = JobApplication
        exclude = ["status", "notes", "created_at", "updated_at"]
