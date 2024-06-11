from rest_framework.permissions import BasePermission

from .models import Course, Lesson


class CanAddCourse(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()
        
        if request.user.is_superuser:
            return True
        
        for permiso in permisos_usuario:
            if permiso.codename == 'add_course':
                return True

        return False
    

class CanChangeCourse(BasePermission):
    def has_permission(self, request, view):
        
        course = Course.objects.get(id=view.kwargs["pk"])
        permisos_usuario = request.user.user_permissions.all()

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
    
class CanAddLesson(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()

        if request.user.is_superuser:
            
            return True

        if request.user != Course.objects.get(id=request.data["course"]).uploaded_by:
            
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

        if request.user != lesson.course.uploaded_by:
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

        if request.user != lesson.course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'delete_lesson':
                return True

        return False