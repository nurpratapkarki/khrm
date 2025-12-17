from django.urls import include, path
from rest_framework.routers import DefaultRouter
from app.api.training.views import TrainingCourseViewSet, TrainingFacilityViewSet

router = DefaultRouter()
router.register(r"training-courses", TrainingCourseViewSet, basename="training-course")
router.register(r"training-facilities", TrainingFacilityViewSet, basename="training-facility")

urlpatterns = [
    path("", include(router.urls)),
]
