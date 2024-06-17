from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated


from .models import Course, Module, Lesson
from .serializers import CourseSerializer, LessonSerializer, ModuleSerializer
from .permissions import (CanAddCourse, 
                          CanChangeCourse, 
                          CanDeleteCourse,
                          CanAddLesson,
                          CanChangeLesson,
                          CanDeleteLesson,
                          CanAddModule,
                          CanChangeModule,
                          CanDeleteModule
                          )




class CourseViewSet(ModelViewSet):
    """ Endpoint para ver, crear, actualizar y borrar cursos """
    
    
    queryset = Course.objects.all()

    # Serializador
    serializer_class = CourseSerializer


    # Permisos
    def get_permissions(self, *args, **kwargs):

        # Permisos para modulos
        permission_classes = [IsAuthenticated]

        # Condicion para agregar un permiso cuando se intente crear un curso
        if self.action == "list" or self.action == "retrieve":
            permission_classes = []

        # Condicion para agregar un permiso cuando se intente crear un curso
        if self.action == "create":
            permission_classes.append(CanAddCourse)
        
        # Condicion para agregar un permiso cuando se intente borrar un curso
        if self.action == "update" or self.action == "partial_update":
            permission_classes.append(CanChangeCourse)

        # Condicion para agregar un permiso cuando se intente borrar un curso
        if self.action == "destroy":
            permission_classes.append(CanDeleteCourse)

        return [permission() for permission in permission_classes]

class ModuleViewSet(ModelViewSet):
    """ Endpoint para ver, crear, actualizar y borrar modulos """

    # Permisos para modulos
    queryset = Module.objects.all()

    # Serializador
    serializer_class = ModuleSerializer


    # Crea un modulo
    def create(self, request, *args, **kwargs):
        
        # Ejecuta la funcion original
        funcion_principal = super().create(request, *args, **kwargs)

        # Verifica que la creacion del modulo sea exitosa
        if funcion_principal.status_code == 201:

            # Aumenta el numero de modulos en el curso
            course = Course.objects.get(id=request.data["course"])

            # actualiza el curso
            course.num_modules += 1
            course.save()
        

        return funcion_principal
    
    # Permisos
    def get_permissions(self):

        # Permisos para modulos
        permission_classes = [IsAuthenticated]

        # Condicion para agregar un permiso cuando se intente crear un modulo
        if self.action == "create":
            permission_classes.append(CanAddModule)

        # Condicion para agregar un permiso cuando se intente borrar un modulo
        if self.action == "update" or self.action == "partial_update":
            permission_classes.append(CanChangeModule)

        # Condicion para agregar un permiso cuando se intente borrar un modulo
        if self.action == "destroy":
            permission_classes.append(CanDeleteModule)

        return [permission() for permission in permission_classes]






class LessonViewSet(ModelViewSet):
    """ Endpoint para ver, crear, actualizar y borrar Lecciones """

    # Permisos para modulos
    queryset = Lesson.objects.all()

    # Serializador
    serializer_class = LessonSerializer


    # Crea una leccion
    def create(self, request, *args, **kwargs):
        
        # Ejecuta la funcion original
        funcion_principal = super().create(request, *args, **kwargs)

        # Verifica que la creacion de la leccion sea exitosa
        if funcion_principal.status_code == 201:

            # Aumenta el numero de lecciones en el modulo
            modulo = Module.objects.get(id=request.data["module"])

            # actualiza el modulo
            modulo.num_lessons += 1
            modulo.save()
        

        return funcion_principal
    
    # Permisos
    def get_permissions(self):

        # Permisos para modulos
        permission_classes = [IsAuthenticated]

        # Condicion para agregar un permiso cuando se intente crear un modulo
        if self.action == "create":
            permission_classes.append(CanAddLesson)

        # Condicion para agregar un permiso cuando se intente borrar un modulo
        if self.action == "update" or self.action == "partial_update":
            permission_classes.append(CanChangeLesson)

        # Condicion para agregar un permiso cuando se intente borrar un modulo
        if self.action == "destroy":
            permission_classes.append(CanDeleteLesson)

        return [permission() for permission in permission_classes]

