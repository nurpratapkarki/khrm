from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from app.models.document import Document
from app.api.document.serializers import DocumentSerializer


class DocumentViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for documents"""
    queryset = Document.objects.filter(is_active=True)
    serializer_class = DocumentSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["document_type"]
    search_fields = ["title", "description"]
    ordering = ["display_order"]

    @action(detail=True, methods=["post"])
    def download(self, request, pk=None):
        """Track download and return file URL"""
        document = self.get_object()
        document.download_count += 1
        document.save(update_fields=["download_count"])
        return Response(
            {
                "file_url": request.build_absolute_uri(document.file.url),
                "filename": document.title,
                "download_count": document.download_count,
            }
        )

    @action(detail=False, methods=["get"])
    def by_type(self, request):
        """Get documents grouped by type"""
        docs_by_type = {}
        for doc_type, label in Document.DOCUMENT_TYPE:
            documents = self.queryset.filter(document_type=doc_type)
            if documents.exists():
                docs_by_type[doc_type] = self.get_serializer(documents, many=True).data
        return Response(docs_by_type)
