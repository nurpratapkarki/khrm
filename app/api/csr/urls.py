from django.urls import include, path
from rest_framework.routers import DefaultRouter
from app.api.csr.views import CSRProjectViewSet

router = DefaultRouter()
router.register(r"csr-projects", CSRProjectViewSet, basename="csr-project")

urlpatterns = [
    path("", include(router.urls)),
]
