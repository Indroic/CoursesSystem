from rest_framework.permissions import BasePermission

from courses.models import Course
from .models import Exam, Question, Option

# Permisos para Examenes

class CanAddExam(BasePermission):
    """ Permiso para agregar Examenes """
    def has_permission(self, request, view):
        
        # Obtiene los permisos del usuario
        permisos_usuario = request.user.user_permissions.all()

        # Obtiene el curso
        course = Course.objects.get(id=request.data["course"])
        
        # Verifica si el usuario es superusuario
        if request.user.is_superuser:
            return True

        # Verifica si el usuario es el autor del curso al cual se le creara un examen
        if request.user != course.uploaded_by:
            return False

        # Verifica si el usuario tiene el permiso adecuado
        for permiso in permisos_usuario:
            if permiso.codename == 'add_exam':
                return True

        return False
    

class CanChangeExam(BasePermission):
    """ Permiso para cambiar Examenes """
    def has_permission(self, request, view):
        # Obtiene los permisos del usuario
        permisos_usuario = request.user.user_permissions.all()

        # Obtiene el examen
        exam = Exam.objects.get(id=request.data["pk"])

        # Verifica si el usuario es superusuario
        if request.user.is_superuser:
            return True
        
        # Verifica si el usuario es el autor del examen
        if request.user != exam.course.uploaded_by:
            return False

        # Verifica si el usuario tiene el permiso adecuado
        for permiso in permisos_usuario:
            if permiso.codename == 'change_exam':
                return True


        return False

class CanDeleteExam(BasePermission):
    """ Permiso para borrar Examenes """
    def has_permission(self, request, view):
        
        # Obtiene los permisos del usuario
        permisos_usuario = request.user.user_permissions.all()
        
        # Obtiene el examen
        exam = Exam.objects.get(id=request.data["pk"])

        # Verifica si el usuario es superusuario
        if request.user.is_superuser:
            return True

        # Verifica si el usuario es el autor del examen
        if request.user != exam.course.uploaded_by:
            return False

        # Verifica si el usuario tiene el permiso adecuado
        for permiso in permisos_usuario:
            if permiso.codename == 'delete_exam':
                return True

        return False
    
# Permisos para Preguntas

class CanAddQuestion(BasePermission):
    """ Permiso para agregar Preguntas """
    def has_permission(self, request, view):
        
        # Obtiene los permisos del usuario
        permisos_usuario = request.user.user_permissions.all()
        
        # Obtiene el examen
        exam = Exam.objects.get(id=request.data["exam"])

        # Verifica si el usuario es superusuario
        if request.user.is_superuser:
            
            return True

        # Verifica si el usuario es el autor del examen
        if request.user != exam.course.uploaded_by:
            
            return False
        
        # Verifica si el usuario tiene el permiso adecuado
        for permiso in permisos_usuario:

            if permiso.codename == 'add_question':
                return True

        return False
    

class CanChangeQuestion(BasePermission):
    """ Permiso para cambiar Preguntas """
    def has_permission(self, request, view):
        
        # Obtiene los permisos del usuario
        question = Question.objects.get(id=view.kwargs["pk"])

        # Obtiene el examen
        permisos_usuario = request.user.user_permissions.all()

        # Verifica si el usuario es superusuario
        if request.user.is_superuser:
            return True

        # Verifica si el usuario es el autor del examen
        if request.user != question.exam.course.uploaded_by:
            return False

        # Verifica si el usuario tiene el permiso adecuado
        for permiso in permisos_usuario:
            if permiso.codename == 'change_question':
                return True


        return False

class CanDeleteQuestion(BasePermission):
    """ Permiso para borrar Preguntas """
    def has_permission(self, request, view):
        
        # Obtiene los permisos del usuario
        permisos_usuario = request.user.user_permissions.all()
        
        # Obtiene el examen
        question = Question.objects.get(id=view.kwargs["pk"])

        # Verifica si el usuario es superusuario
        if request.user.is_superuser:
            return True

        # Verifica si el usuario es el autor del examen
        if request.user != question.exam.course.uploaded_by:
            return False

        # Verifica si el usuario tiene el permiso adecuado
        for permiso in permisos_usuario:
            if permiso.codename == 'delete_question':
                return True

        return False
    

# Permisos para Opciones

class CanAddOption(BasePermission):
    """ Permiso para agregar Opciones """
    def has_permission(self, request, view):
        
        # Obtiene los permisos del usuario
        permisos_usuario = request.user.user_permissions.all()
        
        # Obtiene la pregunta
        question = Question.objects.get(id=request.data["question"])

        # Verifica si el usuario es superusuario
        if request.user.is_superuser:
            
            return True

        # Verifica si el usuario es el autor del examen
        if request.user != question.exam.course.uploaded_by:
            
            return False
        
        # Verifica si el usuario tiene el permiso adecuado
        for permiso in permisos_usuario:

            if permiso.codename == 'add_option':
                return True

        return False
    

class CanChangeOption(BasePermission):
    """ Permiso para cambiar Opciones """
    def has_permission(self, request, view):
        
        # Obtiene los permisos del usuario
        permisos_usuario = request.user.user_permissions.all()
        
        # Obtiene la opccion
        option = Option.objects.get(id=view.kwargs["pk"])

        # Verifica si el usuario es superusuario
        if request.user.is_superuser:
            return True

        # Verifica si el usuario es el autor del examen
        if request.user != option.question.exam.course.uploaded_by:
            return False

        # Verifica si el usuario tiene el permiso adecuado
        for permiso in permisos_usuario:
            if permiso.codename == 'change_option':
                return True


        return False

class CanDeleteOption(BasePermission):
    """ Permiso para borrar Opciones """
    def has_permission(self, request, view):

        # Obtiene los permisos del usuario
        permisos_usuario = request.user.user_permissions.all()
        
        # Obtiene la opccion
        option = Option.objects.get(id=view.kwargs["pk"])


        # Verifica si el usuario es superusuario
        if request.user.is_superuser:
            return True

        # Verifica si el usuario es el autor del examen
        if request.user != option.question.exam.course.uploaded_by:
            return False

        # Verifica si el usuario tiene el permiso adecuado
        for permiso in permisos_usuario:
            if permiso.codename == 'delete_option':
                return True

        return False