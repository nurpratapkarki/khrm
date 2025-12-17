from django.conf import settings
from django.urls import include, path, re_path
from django.views.static import serve
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    # Ap endpoint
    path("api/", include("app.api.urls")),
    path(
        "google_sso/", include("django_google_sso.urls", namespace="django_google_sso")
    ),
    # Auth endpoints
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/auth/verify/", TokenVerifyView.as_view(), name="token_verify"),
    re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
]

from app.admin.base import admin_site

urlpatterns += [
    path("", admin_site.urls),
]
