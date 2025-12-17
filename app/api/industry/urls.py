from django.urls import include, path
from rest_framework.routers import DefaultRouter
from app.api.industry.views import IndustryViewSet, ClientViewSet, TestimonialViewSet

router = DefaultRouter()
router.register(r"industries", IndustryViewSet, basename="industry")
router.register(r"clients", ClientViewSet, basename="client")
router.register(r"testimonials", TestimonialViewSet, basename="testimonial")

urlpatterns = [
    path("", include(router.urls)),
]
