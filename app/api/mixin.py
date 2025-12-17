from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]
        read_only_fields = ["id"]


class ImageURLMixin(serializers.Serializer):
    def build_image_url(self, image):
        request = self.context.get("request")
        if image and hasattr(image, "url"):
            return request.build_absolute_uri(image.url) if request else image.url
        return None
