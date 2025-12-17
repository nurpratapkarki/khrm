from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from app.models.csr import CSRProject
from app.api.csr.serializers import CSRProjectSerializer


class CSRProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for CSR projects"""
    queryset = CSRProject.objects.filter(is_active=True)
    serializer_class = CSRProjectSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"
    ordering = ["-date"]
