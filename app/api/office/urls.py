from django.urls import include, path
from rest_framework.routers import DefaultRouter
from app.api.office.views import BranchViewSet, OfficeViewSet, CompanyViewSet, LeadershipViewSet, CertificationViewSet

router = DefaultRouter()
router.register(r"branches", BranchViewSet, basename="branch")
router.register(r"offices", OfficeViewSet, basename="office")
router.register(r"company", CompanyViewSet, basename="company")
router.register(r"leadership", LeadershipViewSet, basename="leadership")
router.register(r"certifications", CertificationViewSet, basename="certification")

urlpatterns = [
    path("", include(router.urls)),
]
