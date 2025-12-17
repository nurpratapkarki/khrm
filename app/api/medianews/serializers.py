from rest_framework import serializers
from app.models.medianews import MediaAlbum, MediaPhoto, NewsPost


class UserLiteSerializer(serializers.ModelSerializer):
    class Meta:
        from django.contrib.auth.models import User
        model = User
        fields = ["id", "username", "first_name", "last_name"]


class MediaPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaPhoto
        fields = "__all__"


class MediaAlbumListSerializer(serializers.ModelSerializer):
    """List serializer with photo count"""
    album_type_display = serializers.CharField(
        source="get_album_type_display", read_only=True
    )
    photo_count = serializers.SerializerMethodField()

    class Meta:
        model = MediaAlbum
        fields = [
            "id",
            "title",
            "slug",
            "album_type",
            "album_type_display",
            "description",
            "cover_image",
            "date",
            "photo_count",
        ]

    def get_photo_count(self, obj):
        return obj.photo.count()


class MediaAlbumDetailSerializer(serializers.ModelSerializer):
    """Detail serializer with all photos"""
    photos = MediaPhotoSerializer(many=True, read_only=True, source="photo")
    album_type_display = serializers.CharField(
        source="get_album_type_display", read_only=True
    )

    class Meta:
        model = MediaAlbum
        fields = "__all__"


class NewsPostListSerializer(serializers.ModelSerializer):
    """List serializer for news"""
    author_name = serializers.CharField(
        source="author.username", read_only=True, allow_null=True
    )
    post_type_display = serializers.CharField(
        source="get_post_type_display", read_only=True
    )

    class Meta:
        model = NewsPost
        fields = [
            "id",
            "title",
            "slug",
            "post_type",
            "post_type_display",
            "featured_image",
            "summary",
            "author_name",
            "is_published",
            "is_featured",
            "published_date",
            "created_at",
        ]


class NewsPostDetailSerializer(serializers.ModelSerializer):
    """Detail serializer with full content"""
    author = UserLiteSerializer(read_only=True)
    post_type_display = serializers.CharField(
        source="get_post_type_display", read_only=True
    )

    class Meta:
        model = NewsPost
        fields = "__all__"
