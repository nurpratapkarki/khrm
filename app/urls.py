from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

# Core Company
router.register(r'offices', views.OfficeViewSet, basename='office')
router.register(r'company-info', views.CompanyInfoViewSet, basename='company-info')
router.register(r'leadership', views.LeadershipViewSet, basename='leadership')
router.register(r'certifications', views.CertificationViewSet, basename='certification')

# Industry & Clients
router.register(r'industries', views.IndustryViewSet, basename='industry')
router.register(r'clients', views.ClientViewSet, basename='client')
router.register(r'testimonials', views.TestimonialViewSet, basename='testimonial')

# Jobs & Recruitment
router.register(r'job-categories', views.JobCategoryViewSet, basename='job-category')
router.register(r'jobs', views.JobViewSet, basename='job')
router.register(r'job-applications', views.JobApplicationViewSet, basename='job-application')
router.register(r'employer-inquiries', views.EmployerInquiryViewSet, basename='employer-inquiry')

# Training
router.register(r'training-courses', views.TrainingCourseViewSet, basename='training-course')
router.register(r'training-facilities', views.TrainingFacilityViewSet, basename='training-facility')

# Media & Content
router.register(r'media-albums', views.MediaAlbumViewSet, basename='media-album')
router.register(r'news', views.NewsPostViewSet, basename='news')

# Documents
router.register(r'documents', views.DocumentViewSet, basename='document')

# Legal
router.register(r'privacy-policy', views.PrivacyPolicyViewSet, basename='privacy-policy')
router.register(r'terms-of-service', views.TermsOfServiceViewSet, basename='terms-of-service')

# FAQ & Contact
router.register(r'faqs', views.FAQViewSet, basename='faq')
router.register(r'contact-messages', views.ContactMessageViewSet, basename='contact-message')

# CSR
router.register(r'csr-projects', views.CSRProjectViewSet, basename='csr-project')

# Home
router.register(r'home', views.HomeViewSet, basename='home')

urlpatterns = [
    path('api/', include(router.urls)),
]