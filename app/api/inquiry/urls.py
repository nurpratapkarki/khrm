from django.urls import include, path
from rest_framework.routers import DefaultRouter
from app.api.inquiry.views import EmployerInquiryViewSet

router = DefaultRouter()
router.register(r"employer-inquiries", EmployerInquiryViewSet, basename="employer-inquiry")

urlpatterns = [
    path("", include(router.urls)),
]
