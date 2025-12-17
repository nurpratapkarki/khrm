from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from app.models.japan import JapanLandingPage, JapanProgram
from app.api.japan.serializers import (
    JapanLandingPageSerializer,
    JapanProgramSerializer,
)


class JapanLandingViewSet(viewsets.ViewSet):
    """Provides the single Japan landing page configuration with nested content."""
    permission_classes = [AllowAny]

    def list(self, request):
        page = JapanLandingPage.objects.order_by("-created_at").first()
        if not page:
            return Response({})
        serializer = JapanLandingPageSerializer(page)
        return Response(serializer.data)


class JapanProgramViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for Japan Training Programs"""
    serializer_class = JapanProgramSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["overview", "target_level"]
    ordering_fields = ["created_at", "program_type"]

    def get_queryset(self):
        return JapanProgram.objects.filter(is_active=True).prefetch_related(
            "training_points", "why_choose_points"
        )
