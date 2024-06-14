from rest_framework import serializers
from .models import Exam, Question, Option
from courses.models import Course
# Serializadores para los formularios de examenes

class ExamSerializer(serializers.ModelSerializer):

    """Serializador para el examen"""
    
    # Relacion con el modelo Course
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    
    class Meta:
        # Modelo al que pertenece
        model = Exam
        
        # Campos a mostrar
        fields = ("id", "title", "course", "num_questions")

class QuestionSerializer(serializers.ModelSerializer):
    
    """Serializador para la pregunta"""

    # Relacion con el modelo Exam
    exam = serializers.PrimaryKeyRelatedField(queryset=Exam.objects.all())

    class Meta:

        # Modelos al que pertenece
        model = Question

        # Campos a mostrar
        fields = ('__all__')

class OptionSerializer(serializers.ModelSerializer):

    """Serializador para las opciones"""

    # Relacion con el modelo Question
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())

    class Meta:

        # Modelo al que pertenece
        model = Option

        # Campos a mostrar
        fields = ('__all__')