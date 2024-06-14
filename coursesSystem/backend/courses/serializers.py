from rest_framework import serializers

from .models import Course, Lesson


class CourseSerializer(serializers.ModelSerializer):
    """ Serializador de Cursos """
    class Meta:
        """ Metadatos del serializador """

        # Modelo a serializar
        model = Course

        # Campos a serializar
        fields = '__all__'




class LessonSerializer(serializers.ModelSerializer):
    """ Serializador de Lecciones """

    # Relacion con el modelo de cursos
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        """ Metadatos del serializador """

        # modelos a serializar
        model = Lesson

        # Campos a serializar
        fields = '__all__'
