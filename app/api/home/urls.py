from django.urls import include, path
from rest_framework.routers import DefaultRouter
from app.api.home.views import HomeViewSet

router = DefaultRouter()
router.register(r"home", HomeViewSet, basename="home")

urlpatterns = [
    path("", include(router.urls)),
]
