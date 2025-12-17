from django.urls import include, path
from rest_framework.routers import DefaultRouter
from app.api.medianews.views import MediaAlbumViewSet, NewsPostViewSet

router = DefaultRouter()
router.register(r"media-albums", MediaAlbumViewSet, basename="media-album")
router.register(r"news", NewsPostViewSet, basename="news")

urlpatterns = [
    path("", include(router.urls)),
]
