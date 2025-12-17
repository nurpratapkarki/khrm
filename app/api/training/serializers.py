from rest_framework import serializers
from app.models.training import TrainingCourse, TrainingFacility


class TrainingCourseSerializer(serializers.ModelSerializer):
    course_type_display = serializers.CharField(
        source="get_course_type_display", read_only=True
    )

    class Meta:
        model = TrainingCourse
        fields = "__all__"


class TrainingFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingFacility
        fields = "__all__"
