from django.urls import include, path
from rest_framework.routers import DefaultRouter
from app.api.contact.views import ContactMessageViewSet

router = DefaultRouter()
router.register(r"contact-messages", ContactMessageViewSet, basename="contact-message")

urlpatterns = [
    path("", include(router.urls)),
]
