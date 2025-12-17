from django.urls import include, path
from rest_framework.routers import DefaultRouter
from app.api.career.views import CareerViewSet

router = DefaultRouter()
router.register(r"careers", CareerViewSet, basename="career")

urlpatterns = [
    path("", include(router.urls)),
]
