from rest_framework import serializers
from app.models.csr import CSRProject


class CSRProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSRProject
        fields = "__all__"
