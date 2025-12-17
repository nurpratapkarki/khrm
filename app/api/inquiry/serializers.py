from rest_framework import serializers
from app.models.inquiry import EmployerInquiry


class EmployerInquirySerializer(serializers.ModelSerializer):
    industry_name = serializers.CharField(
        source="industry.name", read_only=True, allow_null=True
    )
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = EmployerInquiry
        fields = "__all__"
        read_only_fields = ["status", "notes", "created_at", "updated_at"]
