from django.contrib import admin

from .models import Exam, Question, Option


class ExamAdmin(admin.ModelAdmin):
    """Modelo de administracion de Examenes"""

    # Campos a mostrar en el listado
    list_display = ('title', 'course', 'num_questions')

    # Filtros para la barra de busqueda
    list_filter = ('title', 'course', 'num_questions')

    # Campos de busqueda
    search_fields = ('title', 'num_questions', 'course__name', 'course__uploaded_by__username')

class QuestionAdmin(admin.ModelAdmin):
    """Modelo de administracion de Preguntas"""

    # Campos a mostrar en el listado
    list_display = ('exam', 'question')
    
    # Filtros para la barra de busqueda
    list_filter = ('exam', 'question')
    
    # Campos de busqueda
    search_fields = ('exam__title', 'question')


    # Al crear una pregunta, aumenta el numero de preguntas del examen
    def save_model(self, request, obj: Question, form, change):

        # Verifica que al guardar no sea una nueva pregunta, y no una actualizacion
        if not change:

            # Aumenta  el numero de preguntas en el examen
            obj.exam.num_questions += 1

            # actualiza el examen
            obj.exam.save()

        # Ejecuta la funcion original
        return super().save_model(request, obj, form, change)

class OptionAdmin(admin.ModelAdmin):
    """Modelo de administracion de Opciones"""
    
    # Campos a mostrar en el listado
    list_display = ('question', 'content', 'is_correct')

    # Filtros para la barra de busqueda
    list_filter = ('question', 'is_correct')

    # Campos de busqueda
    search_fields = ('question__question', 'content')



# Registra los modelos de administracion

admin.site.register(Exam, ExamAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Option, OptionAdmin)
