from django.urls import path
from rest_framework import routers
from .views import TokenVerifyView, UserViewSet, RegisterViewSet

from rest_framework_simplejwt.views import  TokenRefreshView, TokenObtainPairView
# URLS del modulo

# crea un nuevo enrutador
router = routers.DefaultRouter()

# registra los enrutadores de usuario y el registro de usuario
router.register(r'users', UserViewSet, basename="users")
router.register(r'register', RegisterViewSet, basename="register-user")

# urls para el inicio de sesion mediante JWT( Json Web Token )
urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
