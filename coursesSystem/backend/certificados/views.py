from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .models import Certificate, ExamRealized
from .serializers import CertificateSerializer, ExamRealizedSerializer

class CertificateViewSet(ModelViewSet):
    """ API endpoint para ver, crear, actualizar y borrar certificaciones """
    
    # Serializador
    serializer_class = CertificateSerializer

    # Consulta de todos los certificados
    queryset = Certificate.objects.all()

    # Permisos
    permission_classes = [IsAuthenticated]



class ExamRealizedViewSet(ModelViewSet):
    """ API endpoint para ver, crear, actualizar y borrar examenes realizados """

    # Serializador
    serializer_class = ExamRealizedSerializer
    
    # Consulta de todos los examenes realizados
    queryset = ExamRealized.objects.all()

    # Permisos
    permission_classes = [IsAuthenticated]

    