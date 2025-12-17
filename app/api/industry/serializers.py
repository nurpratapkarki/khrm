from rest_framework import serializers
from app.models.industry import Industry, Client, Testimonial

class IndustryListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for lists"""

    class Meta:
        model = Industry
        fields = ["id", "name", "slug", "icon", "description", "image", "is_featured"]


class IndustryDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer with related data"""

    job_count = serializers.SerializerMethodField()
    client_count = serializers.SerializerMethodField()

    class Meta:
        model = Industry
        fields = "__all__"

    def get_job_count(self, obj):
        # We need to import Job safely or use related name in a way that doesn't cycle
        # Assuming 'jobs' related name exists.
        # Filtering by status='open' requires knowing about Job model structure.
        return obj.jobs.filter(status="open").count()

    def get_client_count(self, obj):
        return obj.clients.count()


class ClientSerializer(serializers.ModelSerializer):
    industry_name = serializers.CharField(source="industry.name", read_only=True)

    class Meta:
        model = Client
        fields = "__all__"


class TestimonialSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(
        source="client.name", read_only=True, allow_null=True
    )

    class Meta:
        model = Testimonial
        fields = "__all__"
