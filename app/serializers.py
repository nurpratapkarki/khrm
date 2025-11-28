
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


# ==================== USER SERIALIZERS ====================

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']


# ==================== CORE COMPANY SERIALIZERS ====================

class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = '__all__'


class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = '__all__'


class LeadershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leadership
        fields = '__all__'


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'


# ==================== INDUSTRY & CLIENT SERIALIZERS ====================

class IndustryListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for lists"""
    class Meta:
        model = Industry
        fields = ['id', 'name', 'slug', 'icon', 'description', 'image', 'is_featured']


class IndustryDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer with related data"""
    job_count = serializers.SerializerMethodField()
    client_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Industry
        fields = '__all__'
    
    def get_job_count(self, obj):
        return obj.jobs.filter(status='open').count()
    
    def get_client_count(self, obj):
        return obj.clients.count()


class ClientSerializer(serializers.ModelSerializer):
    industry_name = serializers.CharField(source='industry.name', read_only=True)
    
    class Meta:
        model = Client
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.name', read_only=True, allow_null=True)
    
    class Meta:
        model = Testimonial
        fields = '__all__'


# ==================== JOB & RECRUITMENT SERIALIZERS ====================

class JobCategorySerializer(serializers.ModelSerializer):
    industry_name = serializers.CharField(source='industry.name', read_only=True)
    skill_level_display = serializers.CharField(source='get_skill_level_display', read_only=True)
    
    class Meta:
        model = JobCategory
        fields = '__all__'


class JobListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for job listings"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    industry_name = serializers.CharField(source='industry.name', read_only=True)
    client_name = serializers.CharField(source='client.name', read_only=True, allow_null=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    application_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'slug', 'category_name', 'industry_name', 
            'client_name', 'country', 'location', 'vacancies', 'status',
            'status_display', 'salary_range', 'contract_duration', 
            'is_featured', 'application_deadline', 'created_at',
            'application_count'
        ]
    
    def get_application_count(self, obj):
        return obj.applications.count()


class JobDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer with full information"""
    category = JobCategorySerializer(read_only=True)
    industry = IndustryListSerializer(read_only=True)
    client = ClientSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    application_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Job
        fields = '__all__'
    
    def get_application_count(self, obj):
        return obj.applications.count()


class JobApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = JobApplication
        fields = '__all__'
        read_only_fields = ['status', 'notes', 'created_at', 'updated_at']


class JobApplicationCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating applications"""
    class Meta:
        model = JobApplication
        exclude = ['status', 'notes', 'created_at', 'updated_at']


class EmployerInquirySerializer(serializers.ModelSerializer):
    industry_name = serializers.CharField(source='industry.name', read_only=True, allow_null=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = EmployerInquiry
        fields = '__all__'
        read_only_fields = ['status', 'notes', 'created_at', 'updated_at']


# ==================== TRAINING SERIALIZERS ====================

class TrainingCourseSerializer(serializers.ModelSerializer):
    course_type_display = serializers.CharField(source='get_course_type_display', read_only=True)
    
    class Meta:
        model = TrainingCourse
        fields = '__all__'


class TrainingFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingFacility
        fields = '__all__'


# ==================== MEDIA & CONTENT SERIALIZERS ====================

class MediaPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaPhoto
        fields = '__all__'


class MediaAlbumListSerializer(serializers.ModelSerializer):
    """List serializer with photo count"""
    album_type_display = serializers.CharField(source='get_album_type_display', read_only=True)
    photo_count = serializers.SerializerMethodField()
    
    class Meta:
        model = MediaAlbum
        fields = ['id', 'title', 'slug', 'album_type', 'album_type_display', 
                  'description', 'cover_image', 'date', 'photo_count']
    
    def get_photo_count(self, obj):
        return obj.photos.count()


class MediaAlbumDetailSerializer(serializers.ModelSerializer):
    """Detail serializer with all photos"""
    photos = MediaPhotoSerializer(many=True, read_only=True)
    album_type_display = serializers.CharField(source='get_album_type_display', read_only=True)
    
    class Meta:
        model = MediaAlbum
        fields = '__all__'


class NewsPostListSerializer(serializers.ModelSerializer):
    """List serializer for news"""
    author_name = serializers.CharField(source='author.username', read_only=True, allow_null=True)
    post_type_display = serializers.CharField(source='get_post_type_display', read_only=True)
    
    class Meta:
        model = NewsPost
        fields = [
            'id', 'title', 'slug', 'post_type', 'post_type_display',
            'featured_image', 'summary', 'author_name', 'is_featured',
            'published_date', 'created_at'
        ]


class NewsPostDetailSerializer(serializers.ModelSerializer):
    """Detail serializer with full content"""
    author = UserSerializer(read_only=True)
    post_type_display = serializers.CharField(source='get_post_type_display', read_only=True)
    
    class Meta:
        model = NewsPost
        fields = '__all__'


# ==================== DOCUMENT SERIALIZERS ====================

class DocumentSerializer(serializers.ModelSerializer):
    document_type_display = serializers.CharField(source='get_document_type_display', read_only=True)
    
    class Meta:
        model = Document
        fields = '__all__'
        read_only_fields = ['download_count', 'uploaded_at']


class PrivacyPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacyPolicy
        fields = '__all__'


class TermsOfServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsOfService
        fields = '__all__'


# ==================== FAQ & CONTACT SERIALIZERS ====================

class FAQSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = FAQ
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    inquiry_type_display = serializers.CharField(source='get_inquiry_type_display', read_only=True)
    
    class Meta:
        model = ContactMessage
        fields = '__all__'
        read_only_fields = ['is_read', 'replied', 'notes', 'created_at']


# ==================== CSR SERIALIZERS ====================

class CSRProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSRProject
        fields = '__all__'


# ==================== CAREER & JAPAN LANDING SERIALIZERS ====================


class CareerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = [
            'id', 'title', 'slug', 'department', 'location',
            'employment_type', 'summary', 'is_active', 'priority', 'posted_at',
        ]


class CareerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = '__all__'


class JapanBulletPointSerializer(serializers.ModelSerializer):
    section_display = serializers.CharField(source='get_section_display', read_only=True)

    class Meta:
        model = JapanBulletPoint
        fields = ['id', 'section', 'section_display', 'title', 'description', 'order']


class JapanTeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = JapanTeamMember
        fields = ['id', 'name', 'role', 'bio', 'photo', 'order']


class JapanLandingPageSerializer(serializers.ModelSerializer):
    bullet_points = JapanBulletPointSerializer(many=True, read_only=True)
    team_members = JapanTeamMemberSerializer(many=True, read_only=True)

    class Meta:
        model = JapanLandingPage
        fields = [
            'id',
            'intro_title', 'intro_description',
            'commitment_title', 'commitment_intro',
            'preparation_title', 'preparation_intro',
            'trust_title', 'trust_intro',
            'vision_title', 'vision_intro',
            'bullet_points', 'team_members',
        ]
