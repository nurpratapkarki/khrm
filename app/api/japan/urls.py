from django.urls import include, path
from rest_framework.routers import DefaultRouter
from app.api.japan.views import JapanLandingViewSet, JapanProgramViewSet

router = DefaultRouter()
router.register(r"japan-landing", JapanLandingViewSet, basename="japan-landing")
router.register(r"japan-programs", JapanProgramViewSet, basename="japan-program")

urlpatterns = [
    path("", include(router.urls)),
]
