import uuid
import os
from django.db import models
from django.conf import settings

def generar_nombre_miniatura(instance, filename):
    # obtiene la extension del archivo
    extension = filename.split('.')[-1]

    # obtiene el nombre del curso
    curso = instance.title
    
    # genera una cadena de caracteres para el nombre del archivo y elimina todos los "-" que tenga
    caracteres = str(uuid.uuid4()).replace('-', '')

    # crea el nuevo nombre
    nuevo_nombre = curso + "." + caracteres + "." + extension

    # crea el nuevo nombre y reemplaza todos los espacios por "-"
    nuevo_nombre = str(curso + "." + caracteres + "." + extension).replace(" ", "-")

    # retorna el nuevo nombre
    return "miniatures/{0}".format(nuevo_nombre)

def generar_nombre_video(instance, filename):
    # obtiene la extension del archivo
    extension = filename.split('.')[-1]

    # obtiene el titulo de la leccion
    leccion = instance.title
    
    # genera una cadena de caracteres para el nombre del archivo y elimina todos los "-" que tenga
    caracteres = str(uuid.uuid4()).replace('-', '')

    # crea el nuevo nombre y reemplaza todos los espacios por "-"
    nuevo_nombre = str(leccion + "." + caracteres + "." + extension).replace(" ", "-")

    # retorna el nuevo nombre
    return "videos/{0}".format(nuevo_nombre)


# Create your models here.
class Course(models.Model):
    
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    
    name = models.CharField(max_length=200)
    
    
    description = models.CharField(max_length=200)
    
    
    level = models.CharField(max_length=20, unique=False, null=False, blank=False, default="inicial", choices=(("inicial", "inicial"),
                                                                                                                ("intermedio", "intermedio"),
                                                                                                                ("avanzado", "avanzado")))
    
    
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='courses')
    
    
    miniature = models.ImageField(upload_to=generar_nombre_miniatura, blank=False, null=False, default="miniatures/default.jpg")
    
    
    num_leccions = models.IntegerField(default=0)
    
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.name + " - " + self.uploaded_by.username
    
    def delete(self, *args, **kwargs):
        if self.miniature.path != settings.DEFAULT_MINIATURE:
            try:
                os.remove(self.miniature.path)
            except FileNotFoundError:
                pass

        return super().delete(*args, **kwargs)



class Leccion(models.Model):
    
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    
    title = models.CharField(max_length=200)
    
    
    description = models.CharField(max_length=200)
    
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='leccions')
    
    
    miniature = models.ImageField(upload_to=generar_nombre_miniatura, blank=False, null=False, default="miniatures/default.jpg")


    video = models.FileField(upload_to=generar_nombre_video, blank=True, null=True)


    created_at = models.DateTimeField(auto_now_add=True)
    
    
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title + " - " + self.course.name + " - " + self.course.uploaded_by.username


    def delete(self, *args, **kwargs):

        if self.miniature.path != settings.DEFAULT_MINIATURE:
            try:
                os.remove(self.miniature.path)
            except FileNotFoundError:
                pass


        if self.video.path != '':
            try:
                os.remove(self.video.path)
            except FileNotFoundError:
                pass



        if self.course.num_leccions <= 0:
            return super().delete(*args, **kwargs)
        
        self.course.num_leccions -= 1
        
        self.course.save()
        
        

        return super().delete(*args, **kwargs)
    