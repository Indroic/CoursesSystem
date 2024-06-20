from rest_framework import serializers
from .models import User


# Serializadores

# Serializador de Usuario
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("__all__")

# Serializador de Registro
class RegisterSerializer(serializers.Serializer):
    # campo de la cedula de identidad
    ci = serializers.IntegerField()

    # campo de correo electronico
    email = serializers.EmailField(max_length=255)

    # campo de nombre de usuario
    username = serializers.CharField(max_length=150)

    # campos de primer y segundo nombre
    first_name = serializers.CharField(max_length=150)

    last_name = serializers.CharField(max_length=150)

    # campo de avatar
    avatar = serializers.ImageField(required=False)

    # campo de contraseña
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)

    # Validaciones
    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')
        ci = attrs.get('ci', '')
        # verifica que el nombre de usuario no tenga espacios
        if not username.isalnum():
            raise serializers.ValidationError(
                'El nombre de usuario solo puede contener letras, números y simbolos')
        # verifica que el CI este en uso
        if User.objects.filter(ci=ci).exists():
            raise serializers.ValidationError(
                'El CI ya se encuentra registrado')
        # verifica que el email no este en uso
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                'El email ya se encuentra registrado')
        # verifica que el nombre de usuario no este en uso
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError(
                'El nombre de usuario ya se encuentra registrado')

        return attrs

    # Crea un nuevo usuario con los datos validados
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class TokenVerifySerializer(serializers.Serializer):
    token = serializers.CharField(max_length=1000)

    username = serializers.CharField(max_length=100)