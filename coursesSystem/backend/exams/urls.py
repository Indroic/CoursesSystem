from rest_framework.routers import DefaultRouter

from .views import ExamViewSet, QuestionViewSet, OptionViewSet

router = DefaultRouter()
router.register(r'exams', ExamViewSet, basename="exams")
router.register(r'questions', QuestionViewSet, basename="questions")
router.register(r'options', OptionViewSet, basename="options")

urlpatterns = router.urls