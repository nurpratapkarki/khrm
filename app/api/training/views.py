from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from app.models.training import TrainingCourse, TrainingFacility
from app.api.training.serializers import TrainingCourseSerializer, TrainingFacilitySerializer


class TrainingCourseViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for training courses"""
    queryset = TrainingCourse.objects.filter(is_active=True)
    serializer_class = TrainingCourseSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["course_type", "certification_provided"]
    search_fields = ["name", "description"]
    ordering = ["display_order"]

    @action(detail=False, methods=["get"])
    def by_type(self, request):
        """Get courses grouped by type"""
        courses_by_type = {}
        for course_type, label in TrainingCourse.COURSE_TYPE:
            courses = self.queryset.filter(course_type=course_type)
            if courses.exists():
                courses_by_type[course_type] = self.get_serializer(courses, many=True).data
        return Response(courses_by_type)


class TrainingFacilityViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for training facilities"""
    queryset = TrainingFacility.objects.all()
    serializer_class = TrainingFacilitySerializer
    permission_classes = [AllowAny]
    ordering = ["display_order"]
