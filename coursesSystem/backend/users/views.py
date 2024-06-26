from django.contrib.auth.models import Permission
from django.utils.translation import gettext_lazy as _

from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, status

from rest_framework_simplejwt.views import TokenVerifyView

from .models import User
from .serializers import UserSerializer, RegisterSerializer, TokenVerifySerializer
from .permissions import isUser


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

    
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
        serialize_data = TokenVerifySerializer(data=request.data)
        if serialize_data.is_valid():
            user = User.objects.get(username=serialize_data.data["username"])

            funcion_principal = super().post(request, *args, **kwargs)

            funcion_principal.data["user_permissions"] = user.get_all_permissions()
            funcion_principal.data["user_id"] = str(user.id)

            return funcion_principal
        

        return Response(serialize_data.error_messages, status=status.HTTP_400_BAD_REQUEST)