from rest_framework import serializers
from app.models.career import Career


class CareerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = [
            "id",
            "title",
            "slug",
            "image",
            "department",
            "location",
            "employment_type",
            "summary",
            "is_active",
            "priority",
            "posted_at",
        ]


class CareerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = "__all__"
