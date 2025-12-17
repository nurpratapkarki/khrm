from django.urls import include, path
from rest_framework.routers import DefaultRouter
from app.api.job.views import JobCategoryViewSet, JobViewSet, JobApplicationViewSet

router = DefaultRouter()
router.register(r"job-categories", JobCategoryViewSet, basename="job-category")
router.register(r"jobs", JobViewSet, basename="job")
router.register(
    r"job-applications", JobApplicationViewSet, basename="job-application"
)

urlpatterns = [
    path("", include(router.urls)),
]
