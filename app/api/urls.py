from django.urls import path, include
from rest_framework.routers import DefaultRouter

from app.api.office.urls import router as office_router
from app.api.industry.urls import router as industry_router
from app.api.job.urls import router as job_router
from app.api.inquiry.urls import router as inquiry_router
from app.api.training.urls import router as training_router
from app.api.medianews.urls import router as medianews_router
from app.api.document.urls import router as document_router
from app.api.misc.urls import router as misc_router
from app.api.contact.urls import router as contact_router
from app.api.csr.urls import router as csr_router
from app.api.career.urls import router as career_router
from app.api.japan.urls import router as japan_router
from app.api.home.urls import router as home_router

router = DefaultRouter()
router.registry.extend(office_router.registry)
router.registry.extend(industry_router.registry)
router.registry.extend(job_router.registry)
router.registry.extend(inquiry_router.registry)
router.registry.extend(training_router.registry)
router.registry.extend(medianews_router.registry)
router.registry.extend(document_router.registry)
router.registry.extend(misc_router.registry)
router.registry.extend(contact_router.registry)
router.registry.extend(csr_router.registry)
router.registry.extend(career_router.registry)
router.registry.extend(japan_router.registry)
router.registry.extend(home_router.registry)

urlpatterns = [
    path("", include(router.urls)),
]

