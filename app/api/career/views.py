from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend

from app.models.career import Career
from app.api.career.serializers import CareerListSerializer, CareerDetailSerializer


class CareerViewSet(viewsets.ReadOnlyModelViewSet):
    """Internal career opportunities at KHRM (separate from overseas jobs)."""
    queryset = Career.objects.filter(is_active=True)
    permission_classes = [AllowAny]
    lookup_field = "slug"
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["department", "location", "employment_type"]
    search_fields = ["title", "summary", "responsibilities", "requirements"]
    ordering_fields = ["posted_at", "priority"]
    ordering = ["priority", "-posted_at"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return CareerDetailSerializer
        return CareerListSerializer
