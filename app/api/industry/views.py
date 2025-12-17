from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from app.models.industry import Industry, Client, Testimonial
from app.models.job import Job  
from app.api.industry.serializers import (
    IndustryListSerializer,
    IndustryDetailSerializer,
    ClientSerializer,
    TestimonialSerializer
)

from app.api.job.serializers import JobListSerializer



class IndustryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for industries"""
    permission_classes = [AllowAny]
    lookup_field = "slug"
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "description"]
    ordering_fields = ["display_order", "name"]
    ordering = ["display_order"]

    def get_queryset(self):
        queryset = Industry.objects.all()
        if self.action == "list":
            queryset = queryset.defer("overview")
        return queryset

    def get_serializer_class(self):
        if self.action == "retrieve":
            return IndustryDetailSerializer
        return IndustryListSerializer

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Get featured industries"""
        industries = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(industries, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def jobs(self, request, slug=None):
        """Get jobs for specific industry"""
        industry = self.get_object()
        if JobListSerializer:
            jobs = Job.objects.filter(industry=industry, status="open")
            serializer = JobListSerializer(jobs, many=True)
            return Response(serializer.data)
        return Response({"detail": "Job serializers not available"}, status=501)

    @action(detail=True, methods=["get"])
    def clients(self, request, slug=None):
        """Get clients for specific industry"""
        industry = self.get_object()
        clients = Client.objects.filter(industry=industry)
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)


class ClientViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for clients"""
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["industry", "country", "is_featured"]
    search_fields = ["name"]
    ordering_fields = ["display_order", "name"]
    ordering = ["display_order"]

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Get featured clients"""
        clients = self.queryset.filter(is_featured=True)[:10]
        serializer = self.get_serializer(clients, many=True)
        return Response(serializer.data)


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for testimonials"""
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["client", "rating", "is_featured"]
    ordering = ["-created_at"]

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Get featured testimonials"""
        testimonials = self.queryset.filter(is_featured=True)[:5]
        serializer = self.get_serializer(testimonials, many=True)
        return Response(serializer.data)
