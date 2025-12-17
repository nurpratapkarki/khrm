from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from app.models.office import Office, Branch, Company, Leadership, Certification
from app.api.office.serializers import (
    OfficeSerializer,
    BranchSerializer,
    CompanySerializer,
    LeadershipSerializer,
    CertificationSerializer,
)


class BranchViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for branches"""
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = [AllowAny]


class OfficeViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for offices"""
    queryset = Office.objects.filter(is_active=True)
    serializer_class = OfficeSerializer
    permission_classes = [AllowAny]
    lookup_field = "id"  # Using id or country if unique per branch, but id is safer

    @action(detail=False, methods=["get"])
    def headquarters(self, request):
        """Get headquarters office"""
        hq = Office.objects.filter(is_headquarter=True, is_active=True).first()
        if hq:
            serializer = self.get_serializer(hq)
            return Response(serializer.data)
        return Response({"detail": "Headquarters not found"}, status=404)


class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for company information"""
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        """Return single company info object"""
        company_info = Company.objects.first()
        if company_info:
            serializer = self.get_serializer(company_info)
            return Response(serializer.data)
        return Response({})


class LeadershipViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for leadership team"""
    queryset = Leadership.objects.all()
    serializer_class = LeadershipSerializer
    permission_classes = [AllowAny]
    ordering = ["display_order"]


class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for certifications"""
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [AllowAny]
    ordering = ["display_order"]
