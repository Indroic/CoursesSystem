from rest_framework import routers
from .views import CourseViewSet, LessonViewSet, ModuleViewSet

router = routers.DefaultRouter()
router.register(r'courses', CourseViewSet, basename="courses")
router.register(r'modules', ModuleViewSet, basename="modules")
router.register(r'lessons', LessonViewSet, basename="lessons")

urlpatterns = router.urls