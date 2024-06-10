from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, status

from .models import User
from .serializers import UserSerializer, RegisterSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

# Clase encargada de registrar un nuevo usuario
class RegisterViewSet(viewsets.ViewSet):
    serializer_class = RegisterSerializer

    # funcion para crear un nuevo usuario mediante una peticion post o put
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "User Registered successfully"}, status=status.HTTP_201_CREATED)
    
    # funciones a ignorar, solo estan para que no genere errores(osea, estan de adorno)

    def list(self, request):
        return Response("nothing here :)", status=status.HTTP_200_OK)
    
    def retrieve(self, request, pk=None):
        return Response("you are bothersome people, really 7-7", status=status.HTTP_200_OK)
    
    def update(self, request, pk=None):
        return Response("you are very bothersome people, really 7-7", status=status.HTTP_200_OK)
    
    def partial_update(self, request, pk=None):
        return Response("...", status=status.HTTP_200_OK)
    
    def destroy(self, request, pk):
        return Response("do not continue with your attempts >:v", status=status.HTTP_200_OK)
