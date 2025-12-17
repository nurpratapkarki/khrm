from rest_framework import serializers

from app.models.office import Branch, Certification, Company, Leadership, Office


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = "__all__"


class OfficeSerializer(serializers.ModelSerializer):
    branch_name = serializers.CharField(source="branch.country", read_only=True)

    class Meta:
        model = Office
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class LeadershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leadership
        fields = "__all__"


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = "__all__"
