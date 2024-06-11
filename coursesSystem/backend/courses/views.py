from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import permission_classes as permission_classes_decorator
from rest_framework.permissions import IsAuthenticated


from .models import Course, Lesson
from .serializers import CourseSerializer, LessonSerializer
from .permissions import (CanAddCourse, 
                          CanChangeCourse, 
                          CanDeleteCourse,
                          CanAddLesson,
                          CanChangeLesson,
                          CanDeleteLesson)



# Create your views here.
class CourseViewSet(ModelViewSet):

    queryset = Course.objects.all()

    serializer_class = CourseSerializer


    def get_permissions(self, *args, **kwargs):

        permission_classes = [IsAuthenticated]

        if self.action == "create":
            permission_classes.append(CanAddCourse)
        
        if self.action == "update" or self.action == "partial_update":
            permission_classes.append(CanChangeCourse)

        if self.action == "destroy":
            permission_classes.append(CanDeleteCourse)

        return [permission() for permission in permission_classes]


class LessonViewSet(ModelViewSet):

    queryset = Lesson.objects.all()

    serializer_class = LessonSerializer


    def create(self, request, *args, **kwargs):

        funcion_principal = super().create(request, *args, **kwargs)
        if funcion_principal.status_code == 201:
            curso = Course.objects.get(id=request.data["course"])
            curso.num_lessons += 1
            curso.save()
        

        return funcion_principal
    
    def get_permissions(self):

        permission_classes = [IsAuthenticated]

        if self.action == "create":
            permission_classes.append(CanAddLesson)

        if self.action == "update" or self.action == "partial_update":
            permission_classes.append(CanChangeLesson)

        if self.action == "destroy":
            permission_classes.append(CanDeleteLesson)

        return [permission() for permission in permission_classes]

