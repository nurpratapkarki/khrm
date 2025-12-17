from rest_framework import serializers
from app.models.contact import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    inquiry_type_display = serializers.CharField(
        source="get_inquiry_type_display", read_only=True
    )

    class Meta:
        model = ContactMessage
        fields = "__all__"
        read_only_fields = ["is_read", "replied", "notes", "created_at"]
