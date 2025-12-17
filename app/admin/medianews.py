from django.contrib import admin
from django.utils.html import format_html

from app.models.medianews import MediaAlbum, MediaPhoto, NewsPost
from app.admin.base import admin_site

class MediaPhotoInline(admin.TabularInline):
    model = MediaPhoto
    extra = 1
    fields = ("image_preview", "image", "caption", "display_order")
    readonly_fields = ("image_preview",)
    ordering = ("display_order",)

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height:60px;border-radius:4px;" />',
                obj.image.url,
            )
        return "—"

    image_preview.short_description = "Preview"


@admin.register(MediaAlbum,site=admin_site)
class MediaAlbumAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "album_type",
        "date",
        "display_order",
        "photo_count",
    )

    list_filter = (
        "album_type",
        "date",
    )

    search_fields = (
        "title",
        "description",
    )

    list_editable = ("display_order",)

    ordering = ("-date", "display_order")
    prepopulated_fields = {"slug": ("title",)}

    fieldsets = (
        (
            "Album Information",
            {
                "fields": (
                    "title",
                    "slug",
                    "album_type",
                    "description",
                )
            },
        ),
        (
            "Media & Display",
            {
                "fields": (
                    "cover_image",
                    "date",
                    "display_order",
                )
            },
        ),
    )

    inlines = [MediaPhotoInline]

    save_on_top = True
    list_per_page = 20

    def photo_count(self, obj):
        return obj.photo.count()

    photo_count.short_description = "Photos"


@admin.register(NewsPost, site=admin_site)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "post_type",
        "author",
        "publish_status",
        "is_featured",
        "published_date",
    )

    list_filter = (
        "post_type",
        "is_published",
        "is_featured",
        "published_date",
    )

    search_fields = (
        "title",
        "summary",
        "content",
    )

    ordering = ("-published_date", "-created_at")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("author",)

    fieldsets = (
        (
            "Post Content",
            {
                "fields": (
                    "title",
                    "slug",
                    "post_type",
                    "featured_image",
                    "summary",
                    "content",
                )
            },
        ),
        (
            "Publishing",
            {
                "fields": (
                    "author",
                    "is_published",
                    "is_featured",
                    "published_date",
                )
            },
        ),
        (
            "System Info",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )

    readonly_fields = ("created_at", "updated_at")
    save_on_top = True
    list_per_page = 25

    actions = ("publish_posts", "unpublish_posts")

    def publish_status(self, obj):
        if obj.is_published:
            return format_html('<strong style="color:green;">{}</strong>', 'Published')
        return format_html('<strong style="color:red;">{}</strong>', 'Draft')

    publish_status.short_description = "Status"

    @admin.action(description="Publish selected posts")
    def publish_posts(self, request, queryset):
        queryset.update(is_published=True)

    @admin.action(description="Unpublish selected posts")
    def unpublish_posts(self, request, queryset):
        queryset.update(is_published=False)
