from rest_framework.permissions import BasePermission

from .models import Course, Module, Lesson

# Permisos para Cursos
class CanAddCourse(BasePermission):

    # Permisos para Cursos
    def has_permission(self, request, view):
        
        # Obtiene los permisos del usuario
        permisos_usuario = request.user.user_permissions.all()
        
        # Verifica si el usuario es superusuario
        if request.user.is_superuser:
            return True
        
        # Verifica si el usuario tiene el permiso adecuado
        for permiso in permisos_usuario:
            if permiso.codename == 'add_course':
                return True

        return False
    

class CanChangeCourse(BasePermission):

    # Permisos para Cursos
    def has_permission(self, request, view):
        
        # Obtiene los permisos del usuario
        permisos_usuario = request.user.user_permissions.all()
        
        # Obtiene el curso
        course = Course.objects.get(id=view.kwargs["pk"])

        # Verifica si el usuario es superusuario
        if request.user.is_superuser:
            return True

        if request.user != course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'change_course':
                return True


        return False

class CanDeleteCourse(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()
        course = Course.objects.get(id=view.kwargs["pk"])

        if request.user.is_superuser:
            return True

        if request.user != course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'delete_course':
                return True

        return False


# Permisos para Modulos
    
class CanAddModule(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()

        if request.user.is_superuser:
            
            return True

        if request.user != Course.objects.get(id=request.data["course"]).uploaded_by:
            
            return False
        
        for permiso in permisos_usuario:

            if permiso.codename == 'add_module':
                return True

        return False
    

class CanChangeModule(BasePermission):
    def has_permission(self, request, view):
        
        module = Module.objects.get(id=view.kwargs["pk"])
        permisos_usuario = request.user.user_permissions.all()

        if request.user.is_superuser:
            return True

        if request.user != module.course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'change_module':
                return True


        return False

class CanDeleteModule(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()
        module = Module.objects.get(id=view.kwargs["pk"])

        if request.user.is_superuser:
            return True

        if request.user != module.course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'delete_module':
                return True

        return False

# Permisos para Lecciones
    
class CanAddLesson(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()

        if request.user.is_superuser:
            
            return True

        if request.user != Module.objects.get(id=request.data["module"]).course.uploaded_by:
            
            return False
        
        for permiso in permisos_usuario:

            if permiso.codename == 'add_lesson':
                return True

        return False
    

class CanChangeLesson(BasePermission):
    def has_permission(self, request, view):
        
        lesson = Lesson.objects.get(id=view.kwargs["pk"])
        permisos_usuario = request.user.user_permissions.all()

        if request.user.is_superuser:
            return True

        if request.user != lesson.module.course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'change_lesson':
                return True


        return False

class CanDeleteLesson(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()
        lesson = Lesson.objects.get(id=view.kwargs["pk"])

        if request.user.is_superuser:
            return True

        if request.user != lesson.module.course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'delete_lesson':
                return True

        return False