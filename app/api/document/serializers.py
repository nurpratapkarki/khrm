from rest_framework import serializers
from app.models.document import Document


class DocumentSerializer(serializers.ModelSerializer):
    document_type_display = serializers.CharField(
        source="get_document_type_display", read_only=True
    )

    class Meta:
        model = Document
        fields = "__all__"
        read_only_fields = ["download_count", "uploaded_at"]
