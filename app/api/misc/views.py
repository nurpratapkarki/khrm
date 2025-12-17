from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from app.api.misc.serializers import (
    FAQSerializer,
    PrivacyPolicySerializer,
    TermsOfServiceSerializer,
)
from app.models.misc import FAQ, PrivacyPolicy, TermsOfService


class PrivacyPolicyViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for privacy policy"""

    queryset = PrivacyPolicy.objects.filter(is_active=True)
    serializer_class = PrivacyPolicySerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def list(self, request, *args, **kwargs):
        """Return the latest active privacy policy as a single object"""
        policy = self.queryset.order_by("-last_updated").first()
        if policy:
            serializer = self.get_serializer(policy)
            return Response(serializer.data)
        return Response({})


class TermsOfServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for terms of service"""

    queryset = TermsOfService.objects.filter(is_active=True)
    serializer_class = TermsOfServiceSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def list(self, request, *args, **kwargs):
        """Return the latest active terms of service as a single object"""
        terms = self.queryset.order_by("-last_updated").first()
        if terms:
            serializer = self.get_serializer(terms)
            return Response(serializer.data)
        return Response({})


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for FAQs"""

    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["category"]
    search_fields = ["question", "answer"]
    ordering = ["category", "display_order"]

    @action(detail=False, methods=["get"])
    def by_category(self, request):
        """Get FAQs grouped by category"""
        faqs_by_category = {}
        for category, label in FAQ.CATEGORY:
            faqs = self.queryset.filter(category=category)
            faqs_by_category[category] = self.get_serializer(faqs, many=True).data
        return Response(faqs_by_category)
