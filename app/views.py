from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count
from django.utils import timezone
from .models import *
from .serializers import *


# ==================== CORE COMPANY VIEWSETS ====================

class OfficeViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for offices"""
    queryset = Office.objects.filter(is_active=True)
    serializer_class = OfficeSerializer
    permission_classes = [AllowAny]
    lookup_field = 'country'
    
    @action(detail=False, methods=['get'])
    def headquarters(self, request):
        """Get headquarters office"""
        hq = Office.objects.filter(is_headquarters=True, is_active=True).first()
        if hq:
            serializer = self.get_serializer(hq)
            return Response(serializer.data)
        return Response({'detail': 'Headquarters not found'}, status=404)


class CompanyInfoViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for company information"""
    queryset = CompanyInfo.objects.all()
    serializer_class = CompanyInfoSerializer
    permission_classes = [AllowAny]
    
    def list(self, request, *args, **kwargs):
        """Return single company info object"""
        company_info = CompanyInfo.objects.first()
        if company_info:
            serializer = self.get_serializer(company_info)
            return Response(serializer.data)
        return Response({})


class LeadershipViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for leadership team"""
    queryset = Leadership.objects.filter(is_active=True)
    serializer_class = LeadershipSerializer
    permission_classes = [AllowAny]


class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for certifications"""
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [AllowAny]


# ==================== INDUSTRY & CLIENT VIEWSETS ====================

class IndustryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for industries"""
    queryset = Industry.objects.all()
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['display_order', 'name']
    ordering = ['display_order']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return IndustryDetailSerializer
        return IndustryListSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured industries"""
        industries = self.queryset.filter(is_featured=True)
        serializer = self.get_serializer(industries, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def jobs(self, request, slug=None):
        """Get jobs for specific industry"""
        industry = self.get_object()
        jobs = Job.objects.filter(industry=industry, status='open')
        serializer = JobListSerializer(jobs, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def clients(self, request, slug=None):
        """Get clients for specific industry"""
        industry = self.get_object()
        clients = Client.objects.filter(industry=industry)
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)


class ClientViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for clients"""
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['industry', 'country', 'is_featured']
    search_fields = ['name']
    ordering_fields = ['display_order', 'name']
    ordering = ['display_order']
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured clients"""
        clients = self.queryset.filter(is_featured=True)[:10]
        serializer = self.get_serializer(clients, many=True)
        return Response(serializer.data)


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for testimonials"""
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['client', 'rating', 'is_featured']
    ordering = ['-created_at']
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured testimonials"""
        testimonials = self.queryset.filter(is_featured=True)[:5]
        serializer = self.get_serializer(testimonials, many=True)
        return Response(serializer.data)


# ==================== JOB & RECRUITMENT VIEWSETS ====================

class JobCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for job categories"""
    queryset = JobCategory.objects.all()
    serializer_class = JobCategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['skill_level', 'industry']


class JobViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for jobs"""
    queryset = Job.objects.filter(status='open')
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'industry', 'category', 'country', 'is_featured']
    search_fields = ['title', 'description', 'requirements']
    ordering_fields = ['created_at', 'application_deadline', 'vacancies']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return JobDetailSerializer
        return JobListSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured jobs"""
        jobs = self.queryset.filter(is_featured=True)[:6]
        serializer = JobListSerializer(jobs, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def countries(self, request):
        """Get list of countries with jobs"""
        countries = Job.objects.filter(status='open').values_list('country', flat=True).distinct()
        return Response(list(countries))
    
    @action(detail=True, methods=['get'])
    def related(self, request, slug=None):
        """Get related jobs"""
        job = self.get_object()
        related = Job.objects.filter(
            industry=job.industry,
            status='open'
        ).exclude(id=job.id)[:3]
        serializer = JobListSerializer(related, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get job statistics"""
        stats = {
            'total_open_jobs': Job.objects.filter(status='open').count(),
            'total_vacancies': Job.objects.filter(status='open').aggregate(total=Count('vacancies'))['total'] or 0,
            'jobs_by_country': list(Job.objects.filter(status='open').values('country').annotate(count=Count('id'))),
            'jobs_by_industry': list(Job.objects.filter(status='open').values('industry__name').annotate(count=Count('id'))),
        }
        return Response(stats)


class JobApplicationViewSet(viewsets.ModelViewSet):
    """API endpoint for job applications"""
    queryset = JobApplication.objects.all()
    permission_classes = [AllowAny]  # Change to IsAuthenticated for production
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['job', 'status', 'nationality']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return JobApplicationCreateSerializer
        return JobApplicationSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {'message': 'Application submitted successfully!', 'data': serializer.data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class EmployerInquiryViewSet(viewsets.ModelViewSet):
    """API endpoint for employer inquiries"""
    queryset = EmployerInquiry.objects.all()
    serializer_class = EmployerInquirySerializer
    permission_classes = [AllowAny]  # Change to IsAuthenticated for admin access
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'industry', 'country']
    ordering = ['-created_at']
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {'message': 'Inquiry submitted successfully! We will contact you soon.', 'data': serializer.data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


# ==================== TRAINING VIEWSETS ====================

class TrainingCourseViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for training courses"""
    queryset = TrainingCourse.objects.filter(is_active=True)
    serializer_class = TrainingCourseSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['course_type', 'certification_provided']
    search_fields = ['name', 'description']
    ordering = ['display_order']
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get courses grouped by type"""
        courses_by_type = {}
        for course_type, label in TrainingCourse.COURSE_TYPE:
            courses = self.queryset.filter(course_type=course_type)
            courses_by_type[course_type] = self.get_serializer(courses, many=True).data
        return Response(courses_by_type)


class TrainingFacilityViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for training facilities"""
    queryset = TrainingFacility.objects.all()
    serializer_class = TrainingFacilitySerializer
    permission_classes = [AllowAny]
    ordering = ['display_order']


# ==================== MEDIA & CONTENT VIEWSETS ====================

class MediaAlbumViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for photo albums"""
    queryset = MediaAlbum.objects.all()
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['album_type']
    ordering = ['-date']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return MediaAlbumDetailSerializer
        return MediaAlbumListSerializer
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get albums grouped by type"""
        albums_by_type = {}
        for album_type, label in MediaAlbum.ALBUM_TYPE:
            albums = self.queryset.filter(album_type=album_type)
            albums_by_type[album_type] = MediaAlbumListSerializer(albums, many=True).data
        return Response(albums_by_type)


class NewsPostViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for news posts"""
    queryset = NewsPost.objects.filter(is_published=True)
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['post_type', 'is_featured']
    search_fields = ['title', 'summary', 'content']
    ordering = ['-published_date']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return NewsPostDetailSerializer
        return NewsPostListSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured news posts"""
        posts = self.queryset.filter(is_featured=True)[:5]
        serializer = NewsPostListSerializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def related(self, request, slug=None):
        """Get related news posts"""
        post = self.get_object()
        related = self.queryset.filter(
            post_type=post.post_type
        ).exclude(id=post.id)[:5]
        serializer = NewsPostListSerializer(related, many=True)
        return Response(serializer.data)


# ==================== DOCUMENT VIEWSETS ====================

class DocumentViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for documents"""
    queryset = Document.objects.filter(is_active=True)
    serializer_class = DocumentSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['document_type']
    search_fields = ['title', 'description']
    ordering = ['display_order']
    
    @action(detail=True, methods=['post'])
    def download(self, request, pk=None):
        """Track download and return file URL"""
        document = self.get_object()
        document.download_count += 1
        document.save(update_fields=['download_count'])
        return Response({
            'file_url': request.build_absolute_uri(document.file.url),
            'filename': document.title,
            'download_count': document.download_count
        })
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get documents grouped by type"""
        docs_by_type = {}
        for doc_type, label in Document.DOCUMENT_TYPE:
            documents = self.queryset.filter(document_type=doc_type)
            docs_by_type[doc_type] = self.get_serializer(documents, many=True).data
        return Response(docs_by_type)


# ==================== LEGAL CONTENT VIEWSETS ====================

class PrivacyPolicyViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for privacy policy"""
    queryset = PrivacyPolicy.objects.filter(is_active=True)
    serializer_class = PrivacyPolicySerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def list(self, request, *args, **kwargs):
        """Return the latest active privacy policy as a single object"""
        policy = self.queryset.order_by('-last_updated').first()
        if policy:
            serializer = self.get_serializer(policy)
            return Response(serializer.data)
        return Response({})


class TermsOfServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for terms of service"""
    queryset = TermsOfService.objects.filter(is_active=True)
    serializer_class = TermsOfServiceSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def list(self, request, *args, **kwargs):
        """Return the latest active terms of service as a single object"""
        terms = self.queryset.order_by('-last_updated').first()
        if terms:
            serializer = self.get_serializer(terms)
            return Response(serializer.data)
        return Response({})


# ==================== FAQ & CONTACT VIEWSETS ====================

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for FAQs"""
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['question', 'answer']
    ordering = ['category', 'display_order']
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get FAQs grouped by category"""
        faqs_by_category = {}
        for category, label in FAQ.CATEGORY:
            faqs = self.queryset.filter(category=category)
            faqs_by_category[category] = self.get_serializer(faqs, many=True).data
        return Response(faqs_by_category)


class ContactMessageViewSet(viewsets.ModelViewSet):
    """API endpoint for contact messages"""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]  # Change to IsAuthenticated for admin
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['inquiry_type', 'is_read', 'replied']
    ordering = ['-created_at']
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {'message': 'Thank you for contacting us! We will get back to you soon.', 'data': serializer.data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


# ==================== CSR VIEWSETS ====================

class CSRProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for CSR projects"""
    queryset = CSRProject.objects.filter(is_active=True)
    serializer_class = CSRProjectSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    ordering = ['-date']


# ==================== HOME PAGE VIEWSET ====================

class HomeViewSet(viewsets.ViewSet):
    """API endpoint for home page data"""
    permission_classes = [AllowAny]
    
    def list(self, request):
        """Get all home page data in single request"""
        data = {
            'company_info': CompanyInfoSerializer(CompanyInfo.objects.first()).data if CompanyInfo.objects.exists() else None,
            'featured_clients': ClientSerializer(Client.objects.filter(is_featured=True)[:10], many=True).data,
            'industries': IndustryListSerializer(Industry.objects.filter(is_featured=True), many=True).data,
            'testimonials': TestimonialSerializer(Testimonial.objects.filter(is_featured=True)[:5], many=True).data,
            'featured_jobs': JobListSerializer(Job.objects.filter(status='open', is_featured=True)[:6], many=True).data,
            'offices': OfficeSerializer(Office.objects.filter(is_active=True), many=True).data,
        }
        return Response(data)
