from django.contrib.auth.models import Permission
from django.utils.translation import gettext_lazy as _

from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, status

from rest_framework_simplejwt.views import TokenVerifyView

from .models import User
from .serializers import UserSerializer, RegisterSerializer
from .permissions import isUser


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    # Permisos para este endpoint
    def get_permissions(self):
        permission_classes = [IsAuthenticated]

        if self.action == 'create':
            permission_classes.append(IsAdminUser)
        
        if self.action == 'list':
            permission_classes.append(IsAdminUser)
        
        if self.action == 'update' or self.action == 'partial_update':
            permission_classes.append(IsAdminUser)
        
        if self.action == 'retrieve':
            permission_classes.append(isUser)
        
        return [permission() for permission in permission_classes]

# Clase encargada de registrar un nuevo usuario
class RegisterViewSet(viewsets.ViewSet):
    serializer_class = RegisterSerializer

    # funcion para crear un nuevo usuario mediante una peticion post o put
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": _("User Registered successfully")}, status=status.HTTP_201_CREATED)
    
    # funciones a ignorar, solo estan para que no genere errores(osea, estan de adorno)

    def list(self, request):
        return Response(_("nothing here :)"), status=status.HTTP_200_OK)
    
    def retrieve(self, request, pk=None):
        return Response(_("you are bothersome people, really 7-7"), status=status.HTTP_200_OK)
    
    def update(self, request, pk=None):
        return Response(_("you are very bothersome people, really 7-7"), status=status.HTTP_200_OK)
    
    def partial_update(self, request, pk=None):
        return Response("...", status=status.HTTP_200_OK)
    
    def destroy(self, request, pk):
        return Response(_("do not continue with your attempts >:v"), status=status.HTTP_200_OK)



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
        funcion_principal.data["user_id"] = str(user.id)

        return funcion_principal