"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static  
from django.views.i18n import set_language
from rest_framework.routers import DefaultRouter

from users.urls import urlpatterns as user_urls, router as user_router
from courses.urls import router as courses_router
from exams.urls import router as exam_router
from certificados.urls import router as certificate_router

root_router = DefaultRouter()

# agrega las URL del modulo de usuarios
root_router.registry.extend(user_router.registry)

# agrega las URL del modulo de cursos
root_router.registry.extend(courses_router.registry)

# agrega las URL del modulo de examenes
root_router.registry.extend(exam_router.registry)

# agrega las URL del modulo de certificados
root_router.registry.extend(certificate_router.registry)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(root_router.urls)),
    path('api/set_language/', set_language, name='set_language'),

]

# Urls del JWT
urlpatterns += user_urls


# generador de las URL para los archivos multimedia
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


