import uuid
import os
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.conf import settings
from django.db import models


def generar_nombre(instance, filename):
    """
    Genera un nombre unico para el archivo y lo retorna
    """


    # obtiene la extension del archivo
    extension = filename.split('.')[-1]
    # obtiene el nombre del usuario
    usuario = instance.username
    
    # genera una cadena de caracteres para el nombre del archivo y elimina todos los "-" que tenga
    caracteres = str(uuid.uuid4()).replace('-', '')
    # crea el nuevo nombre
    nuevo_nombre = usuario + "." + caracteres + "." + extension
    # retorna el nuevo nombre
    return "avatars/{0}".format(nuevo_nombre)

class UserManager(BaseUserManager):
    """
    Gestor de usuarios
    """

    def create_user(self, ci, email, username, first_name, last_name, password):
        """
        Crea un nuevo usuario
        """
        user = User(ci=ci, email=email,  username=username, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        
        return user

    def create_superuser(self, ci, email, username, first_name, last_name, password):
        """
        Crea un super usuario
        """
        user = User(ci=ci, email=email, username=username, first_name=first_name, last_name=last_name, rol="admin")
        
        user.is_superuser = True

        user.is_staff = True

        user.set_password(password)
        user.save()
        
        return user
# Create your models here.
class User(AbstractUser):
    """Modelo de Usuario

    Modelo de Usuario encargado de almacenar los datos de los usuarios


    """
    # campo de identificacion unico
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # campo de cedula de identidad
    ci = models.IntegerField(unique=True, blank=False, null=False)

    # campo de email electronico
    email = models.EmailField(unique=True, blank=False, null=False)

    # campo de nombre de usuario
    username = models.CharField(max_length=200, blank=False, null=False, unique=True)

    #campo de primer nombre del usuario
    first_name = models.CharField(max_length=200, blank=False, null=False, unique=False)

    # campo del primero apellido
    last_name = models.CharField(max_length=200, blank=False, null=False, unique=False)

    # campo de contraseña
    password = models.CharField(max_length=200, blank=False, null=False, unique=False)

    # campo de imagen de perfil del usuario
    avatar = models.ImageField(upload_to=generar_nombre, blank=False, null=False, default="avatars/default.jpg")
    
    # campo de rol
    rol = models.CharField(max_length=20, choices=[("admin", "admin"), ("staff", "staff"), ("profesor", "profesor"), ("estudiante", "estudiante")], default="estudiante")


    # atributos de django
    # se establece el campo de username como el campo de identificacion
    USERNAME_FIELD = 'username'
    # se establecen los campos obligatorios
    REQUIRED_FIELDS = ['ci', 'email', 'first_name', 'last_name', 'password']

    #se establece el manejador de usuarios
    objects = UserManager()

    
    def delete(self, *args, **kwargs):
        if self.avatar.path != settings.DEFAULT_AVATAR:
            try:
                os.remove(self.avatar.path)
            except FileNotFoundError:
                pass

        return super().delete(*args, **kwargs)