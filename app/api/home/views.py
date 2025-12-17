from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from app.models.office import Company, Office
from app.models.industry import Client, Industry, Testimonial
from app.models.job import Job

from app.api.office.serializers import CompanySerializer, OfficeSerializer
from app.api.industry.serializers import (
    ClientSerializer,
    IndustryListSerializer,
    TestimonialSerializer,
)
from app.api.job.serializers import JobListSerializer


class HomeViewSet(viewsets.ViewSet):
    """API endpoint for home page data"""

    permission_classes = [AllowAny]

    def list(self, request):
        """Get all home page data in single request"""
        data = {
            # Company model
            "company_info": CompanySerializer(Company.objects.first()).data
            if Company.objects.exists()
            else None,
            # Featured Clients
            "featured_clients": ClientSerializer(
                Client.objects.filter(is_featured=True)[:10], many=True
            ).data,
            # Featured Industries
            "industries": IndustryListSerializer(
                Industry.objects.filter(is_featured=True), many=True
            ).data,
            # Featured Testimonials
            "testimonials": TestimonialSerializer(
                Testimonial.objects.filter(is_featured=True)[:5], many=True
            ).data,
            # Featured Jobs
            "featured_jobs": JobListSerializer(
                Job.objects.filter(status="open", is_featured=True)[:6], many=True
            ).data,
            # Offices
            "offices": OfficeSerializer(
                Office.objects.filter(is_active=True), many=True
            ).data,
        }
        return Response(data)
