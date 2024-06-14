from rest_framework.routers import DefaultRouter

from .views import CertificateViewSet, ExamRealizedViewSet

router = DefaultRouter()
router.register(r'certificates', CertificateViewSet, basename="certificates")
router.register(r'examsRealized', ExamRealizedViewSet, basename="examsRealized")

urlpatterns = router.urls