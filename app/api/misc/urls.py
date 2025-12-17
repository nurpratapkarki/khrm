from django.urls import include, path
from rest_framework.routers import DefaultRouter

from app.api.misc.views import (
    FAQViewSet,
    PrivacyPolicyViewSet,
    TermsOfServiceViewSet,
)

router = DefaultRouter()
router.register(r"privacy-policy", PrivacyPolicyViewSet, basename="privacy-policy")
router.register(r"terms-of-service", TermsOfServiceViewSet, basename="terms-of-service")
router.register(r"faqs", FAQViewSet, basename="faq")

urlpatterns = [
    path("", include(router.urls)),
]
