from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .serializers import ExamSerializer
from .models import Exam, Question, Option
from .permissions import(CanAddExam, 
                         CanDeleteQuestion, 
                         CanChangeExam, 
                         CanAddOption, 
                         CanDeleteExam, 
                         CanAddQuestion, 
                         CanChangeOption, 
                         CanDeleteOption, 
                         CanChangeQuestion)

class ExamViewSet(ModelViewSet):
    serializer_class = ExamSerializer
    queryset = Exam.objects.all()

    def get_permissions(self):

        permission_classes = [IsAuthenticated]

        if self.action == "create":
            permission_classes.append(CanAddExam)

        if self.action == "update" or self.action == "partial_update":
            permission_classes.append(CanChangeExam)

        if self.action == "destroy":
            permission_classes.append(CanDeleteExam)

        return [permission() for permission in permission_classes]



class QuestionViewSet(ModelViewSet):
    serializer_class = ExamSerializer

    queryset = Question.objects.all()

    def create(self, request, *args, **kwargs):
        exam = self.get_object()

        exam.num_questions += 1

        exam.save()

        return super().create(request, *args, **kwargs)

    def get_permissions(self):

        permission_classes = [IsAuthenticated]

        if self.action == "create":
            permission_classes.append(CanAddQuestion)

        if self.action == "update" or self.action == "partial_update":
            permission_classes.append(CanChangeQuestion)

        if self.action == "destroy":
            permission_classes.append(CanDeleteQuestion)

        return [permission() for permission in permission_classes]

class OptionViewSet(ModelViewSet):
    serializer_class = ExamSerializer
    
    queryset = Option.objects.all()

    def get_permissions(self):

        permission_classes = [IsAuthenticated]

        if self.action == "create":
            permission_classes.append(CanAddOption)

        if self.action == "update" or self.action == "partial_update":
            permission_classes.append(CanChangeOption)

        if self.action == "destroy":
            permission_classes.append(CanDeleteOption)

        return [permission() for permission in permission_classes]