from rest_framework import serializers
from app.models.japan import (
    JapanLandingPage,
    JapanBulletPoint,
    JapanTeamMember,
    JapanProgramType,
    JapanProgram,
    JapanProgramTrainingPoint,
    WhyChooseJapanProgram,
)


class JapanBulletPointSerializer(serializers.ModelSerializer):
    section_display = serializers.CharField(
        source="get_section_display", read_only=True
    )

    class Meta:
        model = JapanBulletPoint
        fields = ["id", "section", "section_display", "title", "description", "order"]


class JapanTeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = JapanTeamMember
        fields = ["id", "name", "role", "bio", "photo", "order"]


class JapanLandingPageSerializer(serializers.ModelSerializer):
    bullet_points = JapanBulletPointSerializer(many=True, read_only=True)
    team_members = JapanTeamMemberSerializer(many=True, read_only=True)

    class Meta:
        model = JapanLandingPage
        fields = [
            "id",
            "intro_title",
            "intro_description",
            "commitment_title",
            "commitment_intro",
            "preparation_title",
            "preparation_intro",
            "trust_title",
            "trust_intro",
            "vision_title",
            "vision_intro",
            "commitment_image",
            "preparation_image",
            "trust_image",
            "vision_image",
            "bullet_points",
            "team_members",
        ]


class JapanProgramTrainingPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = JapanProgramTrainingPoint
        fields = (
            "id",
            "point",
            "order",
        )


class WhyChooseJapanProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseJapanProgram
        fields = (
            "id",
            "why_choose",
            "order",
        )


class JapanProgramSerializer(serializers.ModelSerializer):
    # Program type is FK. Maybe show name?
    program_type_name = serializers.CharField(source="program_type.name", read_only=True)
    training_points = JapanProgramTrainingPointSerializer(many=True, read_only=True)
    why_choose_points = WhyChooseJapanProgramSerializer(many=True, read_only=True)

    class Meta:
        model = JapanProgram
        fields = (
            "id",
            "program_type",
            "program_type_name",
            "subtitle",
            "overview",
            "language_training_title",
            "training_duration",
            "target_level",
            "objective",
            "image",
            "is_active",
            "training_points",
            "why_choose_points",
            "created_at",
            "updated_at",
        )
