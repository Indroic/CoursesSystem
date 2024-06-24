from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User

class CustomUserAdmin(UserAdmin):

    """
    Panel de administracion de los Usuarios
    """
    # establecemos el modelo
    model = User
    
    # establecemos los campos de modificacion de un usuario
    fieldsets = (
        (None, {'fields': ('username', 'avatar')}),
        (_('Personal info'), {'fields': ('ci', 'email', 'first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

    # Establecemos los campos de registro de usuario
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "ci", "username", "first_name", "last_name", 
                "email", "password1", "password2",  "avatar", "is_staff", "is_superuser", "user_permissions", "groups"
            )}
        ),
    )
    # establecemos los campos a mostrar en el listado y busqueda
    list_display = ('ci', 'email', 'username', 'first_name', 'last_name', 'is_superuser')
    search_fields = ('ci', 'email', 'username', 'first_name', 'last_name')
    ordering = ('ci', 'email', 'username', 'first_name', 'last_name')


admin.site.register(User, CustomUserAdmin)