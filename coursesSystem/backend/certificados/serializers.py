from rest_framework import serializers
from .models import Certificate, ExamRealized
from exams.models import Exam
from users.models import User
class CertificateSerializer(serializers.ModelSerializer):
    
    """ Serilizadores para las certificaciones """

    # Campo de relacion con el examen
    examrealized = serializers.PrimaryKeyRelatedField(queryset=ExamRealized.objects.all())

    class Meta:
        """ Metadatos del serializador """

        # Modelos del serializador
        model = Certificate

        # Campos del serializador
        fields = '__all__'


class ExamRealizedSerializer(serializers.ModelSerializer):

    """ Serilizadores para los examenes realizados """

    # Campo de relacion con el examen
    exam = serializers.PrimaryKeyRelatedField(queryset=Exam.objects.all())

    # Campo de relacion con el usuario
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        """ Metadatos del serializador """

        # Modelos del serializador
        model = ExamRealized

        # Campos del serializador
        fields = '__all__'