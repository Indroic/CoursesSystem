from rest_framework.permissions import BasePermission

from .models import Exam, Question, Option


class CanAddExam(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()
        
        if request.user.is_superuser:
            return True
        
        for permiso in permisos_usuario:
            if permiso.codename == 'add_exam':
                return True

        return False
    

class CanChangeExam(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()
        exam = Exam.objects.get(id=view.kwargs["pk"])

        if request.user.is_superuser:
            return True

        if request.user != exam.course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'change_exam':
                return True


        return False

class CanDeleteExam(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()
        exam = Exam.objects.get(id=view.kwargs["pk"])

        if request.user.is_superuser:
            return True

        if request.user != exam.course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'delete_exam':
                return True

        return False
    
class CanAddQuestion(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()
        question = Question.objects.get(id=view.kwargs["pk"])

        if request.user.is_superuser:
            
            return True

        if request.user != question.exam.course.uploaded_by:
            
            return False
        
        for permiso in permisos_usuario:

            if permiso.codename == 'add_question':
                return True

        return False
    

class CanChangeQuestion(BasePermission):
    def has_permission(self, request, view):
        
        question = Question.objects.get(id=view.kwargs["pk"])
        permisos_usuario = request.user.user_permissions.all()

        if request.user.is_superuser:
            return True

        if request.user != question.exam.course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'change_question':
                return True


        return False

class CanDeleteQuestion(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()
        question = Question.objects.get(id=view.kwargs["pk"])

        if request.user.is_superuser:
            return True

        if request.user != question.exam.course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'delete_question':
                return True

        return False
    

class CanAddOption(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()
        option = Option.objects.get(id=view.kwargs["pk"])

        if request.user.is_superuser:
            
            return True

        if request.user != option.question.exam.course.uploaded_by:
            
            return False
        
        for permiso in permisos_usuario:

            if permiso.codename == 'add_option':
                return True

        return False
    

class CanChangeOption(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()
        option = Option.objects.get(id=view.kwargs["pk"])

        if request.user.is_superuser:
            return True

        if request.user != option.question.exam.course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'change_option':
                return True


        return False

class CanDeleteOption(BasePermission):
    def has_permission(self, request, view):
        
        permisos_usuario = request.user.user_permissions.all()
        option = Option.objects.get(id=view.kwargs["pk"])

        if request.user.is_superuser:
            return True

        if request.user != option.question.exam.course.uploaded_by:
            return False

        for permiso in permisos_usuario:
            if permiso.codename == 'delete_option':
                return True

        return False