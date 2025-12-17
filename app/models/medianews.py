from django.contrib.auth.models import User
from django.db import models
from django.utils.text import slugify

class MediaAlbum(models.Model):
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
        ordering = ['-date']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class MediaPhoto(models.Model):
    album = models.ForeignKey(MediaAlbum, on_delete=models.CASCADE, related_name="photo")
    image = models.ImageField(upload_to="gallery/photos/")
    caption = models.CharField(max_length=255, blank=True)
    display_order = models.IntegerField(default=0)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order']

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


