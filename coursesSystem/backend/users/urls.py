from django.urls import path
from rest_framework import routers
from .views import UserViewSet, RegisterViewSet

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
# URLS del modulo

# crea un nuevo enrutador
router = routers.DefaultRouter()

# registra los enrutadores de usuario y el registro de usuario
router.register(r'users', UserViewSet, basename="users")
router.register(r'register', RegisterViewSet, basename="register-user")

urlpatterns = router.urls

# urls para el inicio de sesion mediante JWT( Json Web Token )
urlpatterns += [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
