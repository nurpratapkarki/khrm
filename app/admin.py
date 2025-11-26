from django.contrib import admin
from django.utils.html import format_html
from types import MethodType

from .models import *


# ==================== INLINE ADMINS ====================

class MediaPhotoInline(admin.TabularInline):
    model = MediaPhoto
    extra = 1
    fields = ['image', 'caption', 'display_order']


class TestimonialInline(admin.TabularInline):
    model = Testimonial
    extra = 0
    fields = ['person_name', 'person_position', 'rating', 'is_featured']


# ==================== CORE COMPANY ADMINS ====================

@admin.register(Office)
class OfficeAdmin(admin.ModelAdmin):
    list_display = ['name', 'country', 'city', 'phone', 'is_headquarters', 'is_active']
    list_filter = ['country', 'is_headquarters', 'is_active']
    search_fields = ['name', 'city', 'address']
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'country', 'city', 'address')
        }),
        ('Contact Details', {
            'fields': ('phone', 'email', 'whatsapp')
        }),
        ('Location', {
            'fields': ('latitude', 'longitude')
        }),
        ('Settings', {
            'fields': ('is_headquarters', 'is_active', 'display_order', 'office_image')
        }),
    )


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Company Details', {
            'fields': ('establishment_year', 'license_number', 'total_deployments')
        }),
        ('About Section', {
            'fields': ('about_text', 'about_image')
        }),
        ('Mission, Vision & Values', {
            'fields': ('mission', 'vision', 'values')
        }),
        ('Hero Banner', {
            'fields': ('hero_headline', 'hero_subtext', 'hero_image')
        }),
    )
    
    def has_add_permission(self, request):
        # Only allow one instance
        return not CompanyInfo.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Leadership)
class LeadershipAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'display_order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'position']
    list_editable = ['display_order', 'is_active']


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['name', 'issuing_authority', 'certificate_number', 'issue_date', 'expiry_date']
    list_filter = ['issuing_authority']
    search_fields = ['name', 'certificate_number']


# ==================== INDUSTRY & CLIENT ADMINS ====================

@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'icon', 'is_featured', 'display_order']
    list_filter = ['is_featured']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['display_order', 'is_featured']


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'industry', 'country', 'is_featured', 'display_order']
    list_filter = ['industry', 'country', 'is_featured']
    search_fields = ['name']
    list_editable = ['display_order', 'is_featured']
    inlines = [TestimonialInline]
    
    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" width="100" />', obj.logo.url)
        return '-'
    logo_preview.short_description = 'Logo Preview'


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['person_name', 'company_name', 'rating', 'is_featured', 'created_at']
    list_filter = ['rating', 'is_featured', 'created_at']
    search_fields = ['person_name', 'company_name', 'testimonial_text']
    list_editable = ['is_featured']


# ==================== JOB & RECRUITMENT ADMINS ====================

@admin.register(JobCategory)
class JobCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'skill_level', 'industry']
    list_filter = ['skill_level', 'industry']
    search_fields = ['name']


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'country', 'vacancies', 'status', 'is_featured', 'created_at']
    list_filter = ['status', 'is_featured', 'industry', 'country', 'created_at']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['status', 'is_featured']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'category', 'industry', 'client')
        }),
        ('Location', {
            'fields': ('country', 'location')
        }),
        ('Job Details', {
            'fields': ('description', 'requirements', 'responsibilities', 'salary_range', 'contract_duration')
        }),
        ('Status', {
            'fields': ('vacancies', 'status', 'is_featured', 'application_deadline')
        }),
    )


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'job', 'email', 'phone', 'status', 'created_at']
    list_filter = ['status', 'nationality', 'created_at']
    search_fields = ['first_name', 'last_name', 'email', 'phone']
    date_hierarchy = 'created_at'
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Job Information', {
            'fields': ('job', 'status', 'notes')
        }),
        ('Personal Information', {
            'fields': ('first_name', 'last_name', 'email', 'phone', 'date_of_birth', 'nationality', 'current_location')
        }),
        ('Documents', {
            'fields': ('resume', 'passport_copy', 'photo')
        }),
        ('Experience', {
            'fields': ('years_of_experience', 'previous_experience', 'skills')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    full_name.short_description = 'Name'
    
    actions = ['mark_as_screening', 'mark_as_interview', 'mark_as_selected', 'mark_as_rejected']
    
    def mark_as_screening(self, request, queryset):
        queryset.update(status='screening')
    mark_as_screening.short_description = "Mark as Screening"
    
    def mark_as_interview(self, request, queryset):
        queryset.update(status='interview')
    mark_as_interview.short_description = "Mark as Interview"
    
    def mark_as_selected(self, request, queryset):
        queryset.update(status='selected')
    mark_as_selected.short_description = "Mark as Selected"
    
    def mark_as_rejected(self, request, queryset):
        queryset.update(status='rejected')
    mark_as_rejected.short_description = "Mark as Rejected"


@admin.register(EmployerInquiry)
class EmployerInquiryAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'contact_person', 'number_of_workers', 'status', 'created_at']
    list_filter = ['status', 'industry', 'country', 'created_at']
    search_fields = ['company_name', 'contact_person', 'email']
    date_hierarchy = 'created_at'
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Company Information', {
            'fields': ('company_name', 'contact_person', 'email', 'phone', 'country')
        }),
        ('Manpower Requirements', {
            'fields': ('industry', 'required_positions', 'number_of_workers', 'job_description')
        }),
        ('Timeline', {
            'fields': ('expected_start_date', 'contract_duration')
        }),
        ('Documents', {
            'fields': ('demand_letter', 'additional_documents')
        }),
        ('Status & Notes', {
            'fields': ('status', 'notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['mark_as_processing', 'mark_as_approved', 'mark_as_completed']
    
    def mark_as_processing(self, request, queryset):
        queryset.update(status='processing')
    mark_as_processing.short_description = "Mark as Processing"
    
    def mark_as_approved(self, request, queryset):
        queryset.update(status='approved')
    mark_as_approved.short_description = "Mark as Approved"
    
    def mark_as_completed(self, request, queryset):
        queryset.update(status='completed')
    mark_as_completed.short_description = "Mark as Completed"


# ==================== TRAINING ADMINS ====================

@admin.register(TrainingCourse)
class TrainingCourseAdmin(admin.ModelAdmin):
    list_display = ['name', 'course_type', 'duration', 'certification_provided', 'is_active', 'display_order']
    list_filter = ['course_type', 'certification_provided', 'is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['display_order', 'is_active']


@admin.register(TrainingFacility)
class TrainingFacilityAdmin(admin.ModelAdmin):
    list_display = ['name', 'capacity', 'display_order']
    search_fields = ['name', 'description']
    list_editable = ['display_order']


# ==================== MEDIA & CONTENT ADMINS ====================

@admin.register(MediaAlbum)
class MediaAlbumAdmin(admin.ModelAdmin):
    list_display = ['title', 'album_type', 'date', 'photo_count', 'display_order']
    list_filter = ['album_type', 'date']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'date'
    inlines = [MediaPhotoInline]
    
    def photo_count(self, obj):
        return obj.photos.count()
    photo_count.short_description = 'Photos'


@admin.register(MediaPhoto)
class MediaPhotoAdmin(admin.ModelAdmin):
    list_display = ['album', 'caption', 'display_order', 'uploaded_at']
    list_filter = ['album', 'uploaded_at']
    search_fields = ['caption']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" />', obj.image.url)
        return '-'
    image_preview.short_description = 'Preview'


@admin.register(NewsPost)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'post_type', 'author', 'is_published', 'is_featured', 'published_date']
    list_filter = ['post_type', 'is_published', 'is_featured', 'published_date']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'
    readonly_fields = ['created_at', 'updated_at']
    list_editable = ['is_published', 'is_featured']
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'post_type', 'featured_image', 'summary', 'content')
        }),
        ('Publishing', {
            'fields': ('author', 'is_published', 'is_featured', 'published_date')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


# ==================== DOCUMENT ADMINS ====================

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['title', 'document_type', 'file_size', 'download_count', 'is_active', 'uploaded_at']
    list_filter = ['document_type', 'is_active', 'uploaded_at']
    search_fields = ['title', 'description']
    readonly_fields = ['download_count', 'uploaded_at']
    list_editable = ['is_active']


# ==================== FAQ & CONTACT ADMINS ====================

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'category', 'display_order', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['question', 'answer']
    list_editable = ['display_order', 'is_active']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'inquiry_type', 'is_read', 'replied', 'created_at']
    list_filter = ['inquiry_type', 'is_read', 'replied', 'created_at']
    search_fields = ['name', 'email', 'company', 'message']
    date_hierarchy = 'created_at'
    readonly_fields = ['created_at']
    list_editable = ['is_read', 'replied']
    
    actions = ['mark_as_read', 'mark_as_replied']
    
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark as Read"
    
    def mark_as_replied(self, request, queryset):
        queryset.update(replied=True)
    mark_as_replied.short_description = "Mark as Replied"


# ==================== CSR ADMIN ====================

@admin.register(CSRProject)
class CSRProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'location', 'date', 'is_active']
    list_filter = ['is_active', 'date']
    search_fields = ['title', 'description', 'location']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'date'

# ==================== LEGAL ADMIN ====================

@admin.register(PrivacyPolicy)
class PrivacyPolicyAdmin(admin.ModelAdmin):
    list_display = ['title', 'last_updated', 'is_active']
    list_filter = ['is_active', 'last_updated']
    search_fields = ['title', 'content']
    readonly_fields = ['last_updated']
    list_editable = ['is_active']


@admin.register(TermsOfService)
class TermsOfServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'last_updated', 'is_active']
    list_filter = ['is_active', 'last_updated']
    search_fields = ['title', 'content']
    readonly_fields = ['last_updated']
    list_editable = ['is_active']

# ==================== CUSTOM ADMIN GROUPING ====================

ADMIN_SIDEBAR_GROUP_ORDER = [
    'Homepage',
    'Study',
    'Services',
    'Success',
    'Content Hub',
    'Team',
    'Communications',
    'Media',
    'Legal',
    'System',  # fallback bucket for everything else
]


MODEL_TO_GROUP = {
    # Homepage
    'CompanyInfo': 'Homepage',
    'Office': 'Homepage',
    'Certification': 'Homepage',

    # Study (training / learning)
    'TrainingCourse': 'Study',
    'TrainingFacility': 'Study',

    # Services (core manpower / recruitment flows)
    'Industry': 'Services',
    'JobCategory': 'Services',
    'Job': 'Services',
    'JobApplication': 'Services',
    'EmployerInquiry': 'Services',

    # Success (clients, testimonials, CSR)
    'Client': 'Success',
    'Testimonial': 'Success',
    'CSRProject': 'Success',

    # Content Hub (knowledge / documents / articles)
    'Document': 'Content Hub',
    'FAQ': 'Content Hub',
    'NewsPost': 'Content Hub',

    # Team
    'Leadership': 'Team',

    # Communications (inbound messages & enquiries)
    'ContactMessage': 'Communications',

    # Media (albums, photos)
    'MediaAlbum': 'Media',
    'MediaPhoto': 'Media',
    # Legal (privacy, terms, etc.)
    'PrivacyPolicy': 'Legal',
    'TermsOfService': 'Legal',
}


APP_TO_GROUP = {
    # Core Django / framework apps live under System
    'auth': 'System',
    'contenttypes': 'System',
    'sessions': 'System',
    'admin': 'System',
    'sites': 'System',
}


def _get_group_name_for_model(app_label: str, model_name: str) -> str:
    """Return the sidebar group name for a given model.

    Falls back to app-level mapping and finally to the System group.
    """

    # Exact model mapping (by class name) has highest priority
    if model_name in MODEL_TO_GROUP:
        return MODEL_TO_GROUP[model_name]

    # Then, fall back to app-level grouping when configured
    if app_label in APP_TO_GROUP:
        return APP_TO_GROUP[app_label]

    # Default bucket for anything we have not explicitly mapped
    return 'System'


def _build_grouped_app_list(original_app_list):
    """Transform Django's default app list into functional sidebar groups.

    This keeps the default model dicts (URLs, permissions, etc.) but
    re-groups them into semantic sections like "Homepage", "Services", etc.
    """

    # Flatten the default app/model structure for easier regrouping
    flat_models = []
    for app in original_app_list:
        app_label = app.get('app_label')
        for model in app.get('models', []):
            flat_models.append({
                'app': app,
                'model': model,
                'app_label': app_label,
                'model_name': model.get('object_name'),
            })

    # Bucket models into our custom groups
    grouped = {}
    for entry in flat_models:
        group_name = _get_group_name_for_model(entry['app_label'], entry['model_name'])

        if group_name not in grouped:
            grouped[group_name] = {
                'name': group_name,
                # Synthetic label just for CSS/hooks; underscore keeps it tidy
                'app_label': group_name.lower().replace(' ', '_'),
                'app_url': '',
                'has_module_perms': False,
                'models': [],
            }

        grouped[group_name]['models'].append(entry['model'])

        # If any underlying app has perms, surface that on the group
        if entry['app'].get('has_module_perms'):
            grouped[group_name]['has_module_perms'] = True

        # Reuse the first available app_url so the group heading can still link somewhere
        if not grouped[group_name]['app_url'] and entry['app'].get('app_url'):
            grouped[group_name]['app_url'] = entry['app']['app_url']

    # Sort models within each group by their display name
    for group in grouped.values():
        group['models'].sort(key=lambda m: m['name'].lower())

    # Build the final ordered list of groups
    ordered_app_list = []
    for name in ADMIN_SIDEBAR_GROUP_ORDER:
        group = grouped.get(name)
        if group and group['models'] and group['has_module_perms']:
            ordered_app_list.append(group)

    # Append any additional, unexpected groups at the end (sorted by name)
    extra_groups = [
        g for n, g in grouped.items()
        if n not in ADMIN_SIDEBAR_GROUP_ORDER and g['models'] and g['has_module_perms']
    ]
    extra_groups.sort(key=lambda g: g['name'].lower())
    ordered_app_list.extend(extra_groups)

    return ordered_app_list


_original_get_app_list = admin.site.get_app_list


def _custom_get_app_list(self, request):
    """Wrapper around the default get_app_list that applies our grouping."""

    original_app_list = _original_get_app_list(request)
    return _build_grouped_app_list(original_app_list)


# Attach the custom method to the existing AdminSite instance so that we
# don't lose any of the built-in model registrations.
admin.site.get_app_list = MethodType(_custom_get_app_list, admin.site)

