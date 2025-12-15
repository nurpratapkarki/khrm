from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils.text import slugify

# ==================== CORE COMPANY MODELS ====================


class Office(models.Model):
    """Company offices in different countries"""

    COUNTRY_CHOICES = [
        ("nepal", "Nepal"),
        ("uae", "UAE"),
        ("kuwait", "Kuwait"),
    ]

    name = models.CharField(max_length=200)
    country = models.CharField(max_length=50, choices=COUNTRY_CHOICES)
    address = models.TextField()
    city = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=50, blank=True)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    is_headquarters = models.BooleanField(default=False)
    office_image = models.ImageField(upload_to="offices/", blank=True)
    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["display_order", "country"]

    def __str__(self):
        return f"{self.name} - {self.country}"


class CompanyInfo(models.Model):
    """Single instance model for company information"""

    establishment_year = models.IntegerField(default=2003)
    license_number = models.CharField(max_length=100)
    total_deployments = models.IntegerField(default=25000)
    mission = models.TextField()
    vision = models.TextField()
    values = models.TextField()
    about_text = models.TextField()
    about_image = models.ImageField(upload_to="company/", blank=True)
    # Branding & visual identity
    logo = models.ImageField(upload_to="company/logo/", blank=True)
    mission_image = models.ImageField(upload_to="company/sections/", blank=True)
    vision_image = models.ImageField(upload_to="company/sections/", blank=True)
    values_image = models.ImageField(upload_to="company/sections/", blank=True)
    about_background_image = models.ImageField(
        upload_to="company/sections/", blank=True
    )
    hero_image = models.ImageField(upload_to="hero/", blank=True)
    hero_image1 = models.ImageField(upload_to="hero/", blank=True)
    hero_image2 = models.ImageField(upload_to="hero/", blank=True)
    hero_image3 = models.ImageField(upload_to="hero/", blank=True)
    hero_headline = models.CharField(
        max_length=200, default="Trusted International Recruitment Partner Since 2003"
    )
    hero_subtext = models.CharField(max_length=200, default="Nepal • UAE • Kuwait")

    class Meta:
        verbose_name = "Company Information"
        verbose_name_plural = "Company Information"

    def __str__(self):
        return "Company Information"


class Leadership(models.Model):
    """Leadership team members"""

    name = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    bio = models.TextField()
    photo = models.ImageField(upload_to="leadership/")
    email = models.EmailField(blank=True)
    linkedin = models.URLField(blank=True)
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]
        verbose_name_plural = "Leadership"

    def __str__(self):
        return f"{self.name} - {self.position}"


class Certification(models.Model):
    """Company certifications and licenses"""

    name = models.CharField(max_length=200)
    issuing_authority = models.CharField(max_length=200)
    certificate_number = models.CharField(max_length=100, blank=True)
    issue_date = models.DateField(null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)
    certificate_image = models.ImageField(upload_to="certifications/")
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.name


# ==================== INDUSTRY & CLIENT MODELS ====================


class Industry(models.Model):
    """Industries served by KHRM"""

    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    icon = models.CharField(max_length=50, help_text="CSS icon class or emoji")
    description = models.TextField()
    overview = models.TextField(blank=True)
    image = models.ImageField(upload_to="industries/", blank=True)
    display_order = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ["display_order"]
        verbose_name_plural = "Industries"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Client(models.Model):
    """Client companies"""

    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to="clients/")
    website = models.URLField(blank=True)
    industry = models.ForeignKey(
        Industry, on_delete=models.SET_NULL, null=True, related_name="clients"
    )
    country = models.CharField(max_length=100)
    is_featured = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["display_order", "name"]

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    """Client testimonials"""

    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="testimonials",
        null=True,
        blank=True,
    )
    person_name = models.CharField(max_length=200)
    person_position = models.CharField(max_length=200)
    person_photo = models.ImageField(upload_to="testimonials/", blank=True)
    company_name = models.CharField(max_length=200, blank=True)
    testimonial_text = models.TextField()
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.person_name} - {self.company_name}"


# ==================== JOB & RECRUITMENT MODELS ====================


class JobCategory(models.Model):
    """Job categories (Skilled, Semi-skilled, Professional)"""

    SKILL_LEVEL = [
        ("skilled", "Skilled"),
        ("semi_skilled", "Semi-Skilled"),
        ("professional", "Professional"),
        ("unskilled", "Unskilled"),
    ]

    name = models.CharField(max_length=200)
    skill_level = models.CharField(max_length=50, choices=SKILL_LEVEL)
    industry = models.ForeignKey(
        Industry, on_delete=models.CASCADE, related_name="job_categories"
    )
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Job Categories"
        ordering = ["industry", "name"]

    def __str__(self):
        return f"{self.name} ({self.get_skill_level_display()})"


class Job(models.Model):
    """Job openings"""

    STATUS_CHOICES = [
        ("open", "Open"),
        ("closed", "Closed"),
        ("filled", "Filled"),
        ("on_hold", "On Hold"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    image = models.ImageField(upload_to="jobs/", blank=True)
    category = models.ForeignKey(
        JobCategory, on_delete=models.CASCADE, related_name="jobs"
    )
    industry = models.ForeignKey(
        Industry, on_delete=models.CASCADE, related_name="jobs"
    )
    client = models.ForeignKey(
        Client, on_delete=models.SET_NULL, null=True, blank=True, related_name="jobs"
    )
    country = models.CharField(max_length=100)
    location = models.CharField(max_length=200)

    description = models.TextField()
    requirements = models.TextField()
    responsibilities = models.TextField(blank=True)
    salary_range = models.CharField(max_length=100, blank=True)
    contract_duration = models.CharField(max_length=100, blank=True)

    vacancies = models.IntegerField(default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="open")

    is_featured = models.BooleanField(default=False)
    application_deadline = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        """Automatically generate a unique slug based on the title."""
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            # Ensure slug uniqueness in case multiple jobs share the same title
            while Job.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} - {self.country}"


class JobApplication(models.Model):
    """Job applications from candidates"""

    STATUS_CHOICES = [
        ("submitted", "Submitted"),
        ("screening", "Screening"),
        ("interview", "Interview Scheduled"),
        ("medical", "Medical Process"),
        ("selected", "Selected"),
        ("rejected", "Rejected"),
        ("deployed", "Deployed"),
    ]

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")

    # Personal Information
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    nationality = models.CharField(max_length=100)
    current_location = models.CharField(max_length=200)

    # Documents
    resume = models.FileField(
        upload_to="applications/resumes/",
        validators=[FileExtensionValidator(["pdf", "doc", "docx"])],
    )
    passport_copy = models.FileField(upload_to="applications/passports/", blank=True)
    photo = models.ImageField(upload_to="applications/photos/", blank=True)

    # Experience
    years_of_experience = models.IntegerField(default=0)
    previous_experience = models.TextField(blank=True)
    skills = models.TextField(blank=True)

    # Status
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="submitted"
    )
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.job.title}"


# ==================== EMPLOYER MODELS ====================


class EmployerInquiry(models.Model):
    """Manpower requests from employers"""

    STATUS_CHOICES = [
        ("new", "New"),
        ("processing", "Processing"),
        ("quotation_sent", "Quotation Sent"),
        ("approved", "Approved"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    company_name = models.CharField(max_length=200)
    contact_person = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    country = models.CharField(max_length=100)

    industry = models.ForeignKey(
        Industry, on_delete=models.SET_NULL, null=True, related_name="inquiries"
    )
    required_positions = models.TextField(help_text="List of positions needed")
    number_of_workers = models.IntegerField()
    job_description = models.TextField(blank=True)

    expected_start_date = models.DateField(null=True, blank=True)
    contract_duration = models.CharField(max_length=100, blank=True)

    demand_letter = models.FileField(upload_to="employer/demand_letters/", blank=True)
    additional_documents = models.FileField(upload_to="employer/documents/", blank=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Employer Inquiries"

    def __str__(self):
        return f"{self.company_name} - {self.number_of_workers} workers"


# ==================== TRAINING MODELS ====================


class TrainingCourse(models.Model):
    """Training courses offered"""

    COURSE_TYPE = [
        ("language", "Language"),
        ("vocational", "Vocational"),
        ("technical", "Technical"),
        ("soft_skills", "Soft Skills"),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    course_type = models.CharField(max_length=50, choices=COURSE_TYPE)
    description = models.TextField()
    duration = models.CharField(max_length=100)
    course_image = models.ImageField(upload_to="training/courses/", blank=True)

    syllabus = models.TextField(blank=True)
    prerequisites = models.TextField(blank=True)
    certification_provided = models.BooleanField(default=True)

    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["display_order", "name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class TrainingFacility(models.Model):
    """Training facilities/rooms"""

    name = models.CharField(max_length=200)
    description = models.TextField()
    capacity = models.IntegerField()
    image = models.ImageField(upload_to="training/facilities/")
    display_order = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Training Facilities"
        ordering = ["display_order"]

    def __str__(self):
        return self.name


# ==================== MEDIA & CONTENT MODELS ====================


class MediaAlbum(models.Model):
    """Photo albums"""

    ALBUM_TYPE = [
        ("office", "Office"),
        ("training", "Training"),
        ("interviews", "Interviews"),
        ("orientation", "Orientation"),
        ("client_visits", "Client Visits"),
        ("events", "Events"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    album_type = models.CharField(max_length=50, choices=ALBUM_TYPE)
    description = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="gallery/covers/")
    date = models.DateField()
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["-date"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class MediaPhoto(models.Model):
    """Individual photos in albums"""

    album = models.ForeignKey(
        MediaAlbum, on_delete=models.CASCADE, related_name="photos"
    )
    image = models.ImageField(upload_to="gallery/photos/")
    caption = models.CharField(max_length=300, blank=True)
    display_order = models.IntegerField(default=0)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.album.title} - Photo {self.display_order}"


class NewsPost(models.Model):
    """News and updates"""

    POST_TYPE = [
        ("news", "News"),
        ("deployment", "Deployment"),
        ("event", "Event"),
        ("announcement", "Announcement"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    post_type = models.CharField(max_length=50, choices=POST_TYPE)
    featured_image = models.ImageField(upload_to="news/")
    summary = models.TextField(max_length=300)
    content = models.TextField()

    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)

    published_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_date"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


# ==================== DOCUMENT MODELS ====================


class Document(models.Model):
    """Downloadable documents and forms"""

    DOCUMENT_TYPE = [
        ("employer_form", "Employer Form"),
        ("candidate_form", "Candidate Form"),
        ("demand_letter", "Demand Letter Template"),
        ("power_of_attorney", "Power of Attorney"),
        ("medical_checklist", "Medical Checklist"),
        ("policy", "Policy Document"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=200)
    document_type = models.CharField(max_length=50, choices=DOCUMENT_TYPE)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="documents/")
    file_size = models.CharField(max_length=50, blank=True)
    download_count = models.IntegerField(default=0)

    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order", "title"]

    def __str__(self):
        return self.title


# ==================== LEGAL CONTENT MODELS ====================


class PrivacyPolicy(models.Model):
    """Privacy policy content"""

    title = models.CharField(max_length=200, default="Privacy Policy")
    slug = models.SlugField(unique=True, default="privacy-policy")
    content = models.TextField()
    last_updated = models.DateField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Privacy Policy"
        verbose_name_plural = "Privacy Policies"

    def __str__(self):
        return self.title


class TermsOfService(models.Model):
    """Terms of service content"""

    title = models.CharField(max_length=200, default="Terms of Service")
    slug = models.SlugField(unique=True, default="terms-of-service")
    content = models.TextField()
    last_updated = models.DateField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Terms of Service"
        verbose_name_plural = "Terms of Service"

    def __str__(self):
        return self.title


# ==================== FAQ & CONTACT MODELS ====================


class FAQ(models.Model):
    """Frequently Asked Questions"""

    CATEGORY = [
        ("general", "General"),
        ("job_seekers", "Job Seekers"),
        ("employers", "Employers"),
        ("training", "Training"),
        ("visa", "Visa & Documentation"),
    ]

    category = models.CharField(max_length=50, choices=CATEGORY)
    question = models.CharField(max_length=300)
    answer = models.TextField()
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"
        ordering = ["category", "display_order"]

    def __str__(self):
        return self.question


class ContactMessage(models.Model):
    """Contact form submissions"""

    INQUIRY_TYPE = [
        ("general", "General Inquiry"),
        ("employer", "Employer/Recruitment"),
        ("job_seeker", "Job Application"),
        ("training", "Training Inquiry"),
        ("complaint", "Complaint"),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    company = models.CharField(max_length=200, blank=True)
    inquiry_type = models.CharField(max_length=50, choices=INQUIRY_TYPE)
    message = models.TextField()

    is_read = models.BooleanField(default=False)
    replied = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.inquiry_type}"


# ==================== OPTIONAL: CSR MODEL ====================


class CSRProject(models.Model):
    """Corporate Social Responsibility projects"""

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    impact_statement = models.TextField()
    featured_image = models.ImageField(upload_to="csr/")
    date = models.DateField()
    location = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "CSR Project"
        ordering = ["-date"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


# ==================== CAREER & JAPAN LANDING MODELS ====================


class Career(models.Model):
    """Internal career opportunities at KHRM (not overseas jobs)."""

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    image = models.ImageField(upload_to="career")
    department = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=200)
    employment_type = models.CharField(max_length=100, blank=True)

    summary = models.TextField(blank=True)
    responsibilities = models.TextField(blank=True)
    requirements = models.TextField(blank=True)

    application_email = models.EmailField(blank=True)
    apply_url = models.URLField(blank=True)

    is_active = models.BooleanField(default=True)
    priority = models.IntegerField(default=0)
    posted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["priority", "-posted_at"]
        verbose_name = "Career"
        verbose_name_plural = "Careers"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class JapanLandingPage(models.Model):
    """Structured content for Japan-focused homepage section."""

    intro_title = models.CharField(max_length=200)
    intro_description = models.TextField()

    commitment_title = models.CharField(max_length=200)
    commitment_intro = models.TextField(blank=True)

    preparation_title = models.CharField(max_length=200)
    preparation_intro = models.TextField(blank=True)

    trust_title = models.CharField(max_length=200)
    trust_intro = models.TextField(blank=True)

    vision_title = models.CharField(max_length=200)
    vision_intro = models.TextField(blank=True)

    # Optional imagery for each major section
    commitment_image = models.ImageField(upload_to="japan/sections/", blank=True)
    preparation_image = models.ImageField(upload_to="japan/sections/", blank=True)
    trust_image = models.ImageField(upload_to="japan/sections/", blank=True)
    vision_image = models.ImageField(upload_to="japan/sections/", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Japan Landing Page"
        verbose_name_plural = "Japan Landing Pages"

    def __str__(self):
        return self.intro_title


class JapanBulletPoint(models.Model):
    """Bullet points for the different sections of the Japan landing page."""

    SECTION_CHOICES = [
        ("commitment", "Commitment"),
        ("preparation", "Preparation System"),
        ("trust", "Why Japan Trusts KHRM"),
        ("vision", "Vision"),
    ]

    page = models.ForeignKey(
        JapanLandingPage,
        on_delete=models.CASCADE,
        related_name="bullet_points",
    )
    section = models.CharField(max_length=20, choices=SECTION_CHOICES)
    title = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["section", "order"]

    def __str__(self):
        return f"{self.get_section_display()} - {self.title or self.description[:40]}"


class JapanTeamMember(models.Model):
    """People behind Japan recruitment (for Japan landing page)."""

    page = models.ForeignKey(
        JapanLandingPage,
        on_delete=models.CASCADE,
        related_name="team_members",
    )
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200, blank=True)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to="japan/team/", blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Japan Team Member"
        verbose_name_plural = "Japan Team Members"

    def __str__(self):
        return self.name


class JapanProgram(models.Model):
    PROGRAM_CHOICES = (
        ("SSW", "Specified Skilled Worker (SSW) Program"),
        ("ENGINEER", "Engineer / Specialist in Humanities / International Services"),
    )
    program_type = models.CharField(
        max_length=20, choices=PROGRAM_CHOICES, db_index=True
    )
    subtitle = models.CharField(
        max_length=255, blank=True, help_text="Secondary title or short description"
    )
    overview = models.TextField(help_text="Program overview and description")
    # Language Training Section
    language_training_title = models.CharField(
        max_length=255, default="Japanese Language Training"
    )
    training_duration = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Required for SSW; optional for Engineer/Specialist",
    )
    target_level = models.CharField(
        max_length=150, help_text="JLPT/JFT or professional communication level"
    )
    objective = models.TextField(help_text="Objective of the training")
    image = models.ImageField(upload_to="japan_programs/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Japan Training Program"
        verbose_name_plural = "Japan Training Programs"
        ordering = ["program_type", "-created_at"]

    def __str__(self):
        return f"{self.get_program_type_display()}"

    def clean(self):
        """
        Enforce duration only for SSW program
        """
        if self.program_type == "SSW" and not self.training_duration:
            raise ValidationError(
                {"training_duration": "Training duration is required for SSW programs."}
            )


class JapanProgramTrainingPoint(models.Model):
    program = models.ForeignKey(
        JapanProgram, related_name="training_points", on_delete=models.CASCADE
    )

    point = models.CharField(max_length=255, help_text="Single training point")

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Training Point"
        verbose_name_plural = "Training Points"

    def __str__(self):
        return self.point


class WhyChooseJapanProgram(models.Model):
    program = models.ForeignKey(
        JapanProgram, related_name="why_choose_points", on_delete=models.CASCADE
    )
    why_choose = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Why Choose Japan Program"
        verbose_name_plural = "Why Choose Japan Programs"

    def __str__(self):
        return self.why_choose
