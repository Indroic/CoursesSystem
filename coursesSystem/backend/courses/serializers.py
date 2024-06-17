from rest_framework import serializers

from .models import Course, Module,Lesson


class CourseSerializer(serializers.ModelSerializer):
    """ Serializador de Cursos """
    class Meta:
        """ Metadatos del serializador """

        # Modelo a serializar
        model = Course

        # Campos a serializar
        fields = '__all__'


class ModuleSerializer(serializers.ModelSerializer):
    """ Serializador de Modulos """

    # Relacion con el modelo de cursos
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        """ Metadatos del serializador """

        # modelos a serializar
        model = Module

        # Campos a serializar
        fields = '__all__'



class LessonSerializer(serializers.ModelSerializer):
    """ Serializador de Lecciones """

    # Relacion con el modelo de modulos
    module = serializers.PrimaryKeyRelatedField(queryset=Module.objects.all())

    class Meta:
        """ Metadatos del serializador """

        # modelos a serializar
        model = Lesson

        # Campos a serializar
        fields = '__all__'
