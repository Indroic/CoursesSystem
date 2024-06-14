from rest_framework import serializers
from .models import Exam, Question, Option

# Serializadores para los formularios de examenes

class ExamSerializer(serializers.ModelSerializer):

    """Serializador para el examen"""

    class Meta:
        # Modelo al que pertenece
        model = Exam
        
        # Campos a mostrar
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    
    """Serializador para la pregunta"""

    class Meta:

        # Modelos al que pertenece
        model = Question

        # Campos a mostrar
        fields = '__all__'

class OptionSerializer(serializers.ModelSerializer):

    """Serializador para las opciones"""

    class Meta:

        # Modelo al que pertenece
        model = Option

        # Campos a mostrar
        fields = '__all__'