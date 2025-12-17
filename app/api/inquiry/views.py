from rest_framework import viewsets, status, filters
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from app.models.inquiry import EmployerInquiry
from app.api.inquiry.serializers import EmployerInquirySerializer


class EmployerInquiryViewSet(viewsets.ModelViewSet):
    """API endpoint for employer inquiries"""
    queryset = EmployerInquiry.objects.all()
    serializer_class = EmployerInquirySerializer
    permission_classes = [AllowAny]  # Change to IsAuthenticated for admin access
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["status", "industry", "country"]
    ordering = ["-created_at"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "message": "Inquiry submitted successfully! We will contact you soon.",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )
