from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from app.models.job import Job, JobCategory, JobApplication
from app.api.job.serializers import (
    JobCategorySerializer,
    JobListSerializer,
    JobDetailSerializer,
    JobApplicationSerializer,
    JobApplicationCreateSerializer,
)


class JobCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for job categories"""
    queryset = JobCategory.objects.all()
    serializer_class = JobCategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["skill_level", "industry"]


class JobViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for jobs"""
    permission_classes = [AllowAny]
    lookup_field = "slug"
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["status", "industry", "category", "country", "is_featured"]
    search_fields = ["title", "description", "requirements"]
    ordering_fields = ["created_at", "application_deadline", "vacancies"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = (
            Job.objects.filter(status="open")
            .select_related("category", "industry", "client")
            .annotate(application_count=Count("applications"))
        )
        if self.action == "list":
            queryset = queryset.defer("description", "requirements", "responsibilities")
        return queryset

    def get_serializer_class(self):
        if self.action == "retrieve":
            return JobDetailSerializer
        return JobListSerializer

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Get featured jobs"""
        jobs = self.get_queryset().filter(is_featured=True)[:6]
        serializer = JobListSerializer(jobs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def countries(self, request):
        """Get list of countries with jobs"""
        countries = (
            Job.objects.filter(status="open")
            .values_list("country", flat=True)
            .distinct()
        )
        return Response(list(countries))

    @action(detail=True, methods=["get"])
    def related(self, request, slug=None):
        """Get related jobs"""
        job = self.get_object()
        related = Job.objects.filter(industry=job.industry, status="open").exclude(
            id=job.id
        )[:3]
        serializer = JobListSerializer(related, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def statistics(self, request):
        """Get job statistics"""
        stats = {
            "total_open_jobs": Job.objects.filter(status="open").count(),
            "total_vacancies": Job.objects.filter(status="open").aggregate(
                total=Count("vacancies")
            )["total"]
            or 0,
            "jobs_by_country": list(
                Job.objects.filter(status="open")
                .values("country")
                .annotate(count=Count("id"))
            ),
            "jobs_by_industry": list(
                Job.objects.filter(status="open")
                .values("industry__name")
                .annotate(count=Count("id"))
            ),
        }
        return Response(stats)


class JobApplicationViewSet(viewsets.ModelViewSet):
    """API endpoint for job applications"""
    queryset = JobApplication.objects.all().select_related("job")
    permission_classes = [AllowAny]  # Change to IsAuthenticated for production
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["job", "status", "nationality"]
    ordering = ["-created_at"]

    def get_serializer_class(self):
        if self.action == "create":
            return JobApplicationCreateSerializer
        return JobApplicationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"message": "Application submitted successfully!", "data": serializer.data},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )
