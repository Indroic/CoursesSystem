from django.contrib.auth.models import Permission

from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, status

from rest_framework_simplejwt.views import TokenVerifyView

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



class TokenVerifyView(TokenVerifyView):

    def post(self, request, *args, **kwargs):
        user = User.objects.get(username=request.data["username"])

        funcion_principal = super().post(request, *args, **kwargs)

        permisos = []
        
        for permiso in Permission.objects.filter(group__user=user):
            permisos.append("{}.{}".format(permiso.content_type.app_label, permiso.codename))
        
        for permiso in Permission.objects.filter(user=user):
            permisos.append("{}.{}".format(permiso.content_type.app_label, permiso.codename) )

        funcion_principal.data["user_permissions"] = permisos

        return funcion_principal