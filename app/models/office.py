from django.db import models


class Company(models.Model):
    establishment_year = models.IntegerField(default=2023)
    license_number = models.CharField(max_length=255)
    total_deployment = models.IntegerField(default=2500)
    experience_years = models.IntegerField(default=2)
    client_satisfaction = models.IntegerField(default=100)
    mission = models.TextField()
    vision = models.TextField()
    values = models.TextField()
    about_text = models.TextField()
    about_image = models.ImageField(upload_to="company/")

    # Branding
    logo = models.ImageField(upload_to="company/logo/")
    mission_image = models.ImageField(upload_to="company/mission/", blank=True)
    vision_image = models.ImageField(upload_to="company/vision/", blank=True)
    values_image = models.ImageField(upload_to="company/values", blank=True)
    about_background_image = models.ImageField(upload_to="company/bg_image", blank=True)
    hero_image = models.ImageField(upload_to="hero/", blank=True)
    hero_image1 = models.ImageField(upload_to="hero/", blank=True)
    hero_image2 = models.ImageField(upload_to="hero/", blank=True)
    hero_image3 = models.ImageField(upload_to="hero/", blank=True)
    hero_headline = models.CharField(
        max_length=200, default="Trusted International Recruitment Partner Since 2023"
    )
    # hero_subtext = models.CharField(max_length=200, default="Nepal • UAE • Kuwait")

    class Meta:
        verbose_name = "Company Info"
        verbose_name_plural = "Company Infos"

    def __str__(self):
        return "Company Info"


class Branch(models.Model):
    country = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Branch"
        verbose_name_plural = "Branches"
        ordering = ["country"]

    def __str__(self):
        return self.country


class Office(models.Model):
    name = models.CharField(max_length=200)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="offices")
    address = models.TextField()
    city = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=50)
    facebook = models.URLField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
    is_headquarter = models.BooleanField(default=False)
    office_image = models.ImageField(upload_to="company/office", blank=True)
    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["display_order", "branch__country"]
        verbose_name_plural = "Offices"

    def __str__(self):
        return f"{self.name} {self.branch.country}"


class Leadership(models.Model):
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    bio = models.TextField()
    photo = models.ImageField(upload_to="leadership/", blank=True)
    email = models.URLField(blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["display_order"]
        verbose_name_plural = "Leadership"

    def __str__(self):
        return self.name


class Certification(models.Model):
    name = models.CharField(max_length=255)
    issuing_authority = models.CharField(max_length=255)
    certificate_number = models.CharField(max_length=255)
    issue_date = models.DateField(blank=True)
    certificate_image = models.ImageField(upload_to="certificates/", blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["display_order"]
        verbose_name_plural = "Certifications"

    def __str__(self):
        return self.name
