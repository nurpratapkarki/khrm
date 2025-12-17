from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from app.models.medianews import MediaAlbum, NewsPost
from app.api.medianews.serializers import (
    MediaAlbumListSerializer,
    MediaAlbumDetailSerializer,
    NewsPostListSerializer,
    NewsPostDetailSerializer,
)


class MediaAlbumViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for photo albums"""
    queryset = MediaAlbum.objects.all()
    permission_classes = [AllowAny]
    lookup_field = "slug"
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["album_type"]
    ordering = ["-date"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return MediaAlbumDetailSerializer
        return MediaAlbumListSerializer

    @action(detail=False, methods=["get"])
    def by_type(self, request):
        """Get albums grouped by type"""
        albums_by_type = {}
        for album_type, label in MediaAlbum.ALBUM_TYPE:
            albums = self.queryset.filter(album_type=album_type)
            if albums.exists():
                albums_by_type[album_type] = MediaAlbumListSerializer(
                    albums, many=True
                ).data
        return Response(albums_by_type)


class NewsPostViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for news posts"""
    queryset = NewsPost.objects.filter(is_published=True)
    permission_classes = [AllowAny]
    lookup_field = "slug"
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["post_type"]
    search_fields = ["title", "summary", "content"]
    ordering = ["-created_at"] # Use created_at as published_date is missing in model

    def get_serializer_class(self):
        if self.action == "retrieve":
            return NewsPostDetailSerializer
        return NewsPostListSerializer

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Get featured news posts"""
        # Model doesn't have is_featured based on my read?
        # Let's check medianews.py again.
        # Lines 47-78. Only is_published.
        # So maybe just return latest?
        posts = self.queryset[:5]
        serializer = NewsPostListSerializer(posts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def related(self, request, slug=None):
        """Get related news posts"""
        post = self.get_object()
        related = self.queryset.filter(post_type=post.post_type).exclude(id=post.id)[:5]
        serializer = NewsPostListSerializer(related, many=True)
        return Response(serializer.data)
