import uuid
import os
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

def generar_nombre_miniatura(instance, filename):
    # obtiene la extension del archivo
    extension = filename.split('.')[-1]

    # obtiene el nombre del curso
    curso = instance.name
    
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
    
    # Crea un identificador unico
    id = models.UUIDField(primary_key=True, 
                          default=uuid.uuid4, 
                          editable=False)
    
    # Define el nombre del curso
    name = models.CharField(max_length=200, 
                            unique=True, 
                            null=False, 
                            blank=False,
                            verbose_name=_('Name of Course'))
    
    # Define la descripccion del curso
    description = models.CharField(max_length=10000,
                                   unique=False, 
                                   null=False, 
                                   blank=False,
                                   verbose_name=_('Course Description'))
    
    # Define el nivel del curso
    level = models.CharField(max_length=20, 
                             unique=False, 
                             null=False, 
                             blank=False, 
                             default=_("Initial"), 
                             choices=((_("Initial"), _("Initial")),
                                      (_("Medium"), _("Medium")),
                                      (_("Advanced"), _("Advanced"))),
                             verbose_name=_('Course Level'))
    
    # Define el autor
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, 
                                    on_delete=models.CASCADE, 
                                    related_name='courses',
                                    verbose_name=_('Uploaded by'))
    
    # Define la miniatura
    miniature = models.ImageField(upload_to=generar_nombre_miniatura, 
                                  blank=False, 
                                  null=False, 
                                  default="miniatures/default.jpg",
                                  verbose_name=_('Miniature'))
    
    # Define el numero de lecciones
    num_modules = models.IntegerField(default=0,
                                      editable=False,
                                      verbose_name=_('Number of Modules'))
    
    # Define la fecha de creacion
    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name=_('Created at'))
    
    # Define la fecha de actualizacion
    updated_at = models.DateTimeField(auto_now=True,
                                      verbose_name=_('Updated at'))


    class Meta:
        """ Metadatos de clase """

        # Nombre de la tabla
        verbose_name = _('Course')

        # Nombre de la tabla plural
        verbose_name_plural = _('Courses')


    def __str__(self):
        return self.name + " - " + self.uploaded_by.username
    
    # Funcion de eliminacion
    def delete(self, *args, **kwargs):
        # Verifica que la miniatura no sea la por defecto
        if self.miniature.path != settings.DEFAULT_MINIATURE:
            try:
                # Elimina la miniatura
                os.remove(self.miniature.path)
            except FileNotFoundError:
                pass
        # Retorna la funcion anterior
        return super().delete(*args, **kwargs)


class Module(models.Model):
    # Crea un identificador unico
    id = models.UUIDField(primary_key=True, 
                          default=uuid.uuid4, 
                          editable=False)
    
    # Define el nombre del modulo
    name = models.CharField(max_length=200, 
                            unique=True, 
                            null=False,
                            blank=False,
                            verbose_name=_('Name of Module'))
    
    # Define la descripccion del modulo
    description = models.CharField(max_length=10000,
                                   unique=False, 
                                   null=False, 
                                   blank=False,
                                   verbose_name=_('Module Description'))
    
    # Define el curso
    course = models.ForeignKey(Course, 
                               on_delete=models.CASCADE, 
                               related_name='Modules',
                               verbose_name=_('Course'))
    
    # Define el numero de lecciones que tiene
    num_lessons = models.IntegerField(default=0,
                                      editable=False,
                                      verbose_name=_('Number of Lessons'))
    
    # Define la fecha de creacion
    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name=_('Created at'))
    
    # Define la fecha de actualizacion
    updated_at = models.DateTimeField(auto_now=True,
                                      verbose_name=_('Updated at'))
    
    class Meta:
        """ Metadatos de clase """

        # Nombre de la tabla
        verbose_name = _('Module')

        # Nombre de la tabla plural
        verbose_name_plural = _('Modules')

    def delete(self, *args, **kwargs):
        if self.course.num_modules > 0:
            self.course.num_modules -= 1
        
            self.course.save()    

        return super().delete(*args, **kwargs)
        

    def __str__(self):
        return self.name + " - " + str(self.course)

class Lesson(models.Model):
    
    # Crea un identificador unico
    id = models.UUIDField(primary_key=True, 
                          default=uuid.uuid4, 
                          editable=False)
    
    # Define el titulo
    title = models.CharField(max_length=500,
                             unique=True, 
                             null=False, 
                             blank=False,
                             verbose_name=_('Title'))
    
    # Define la descripccion
    description = models.CharField(max_length=10000,
                                   unique=False, 
                                   null=False, 
                                   blank=False,
                                   verbose_name=_('Description'))
    
    # Define el Modelo de lecciones
    module = models.ForeignKey(Module, 
                               on_delete=models.CASCADE, 
                               related_name='Modules',
                               verbose_name=_('Module'))
    
    # Define la miniatura
    miniature = models.ImageField(upload_to=generar_nombre_miniatura, 
                                  blank=False, 
                                  null=False, 
                                  default="miniatures/default.jpg",
                                  verbose_name=_('Miniature'))

    # Define el video
    video = models.FileField(upload_to=generar_nombre_video, 
                             blank=True, 
                             null=True,
                             verbose_name=_('Video'))

    # Define la fecha de creacion
    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name=_('Created at'))
    
    # Define la fecha de actualizacion
    updated_at = models.DateTimeField(auto_now=True,
                                      verbose_name=_('Updated at'))
    
    class Meta:
        """ Metadatos de clase """

        # Nombre de la tabla
        verbose_name = _('Lesson')

        # Nombre de la tabla plural
        verbose_name_plural = _('Lessons')

    def __str__(self):
        return self.title + " - " + self.module.name + " - " + self.module.course.uploaded_by.username


    # Funcion de eliminacion
    def delete(self, *args, **kwargs):
        # Verifica que la miniatura no sea la por defecto
        if self.miniature.path != settings.DEFAULT_MINIATURE:
            try:
                # Elimina la miniatura
                os.remove(self.miniature.path)
            except FileNotFoundError:
                pass

        try:
            # Elimina el video
            os.remove(self.video.path)
        except Exception as e:
            pass


        # Disminuye el numero de lecciones en el curso siempre y cuando el numero de lecciones sea mayor a 0
        if self.module.num_lessons > 0:
            self.module.num_lessons -= 1
        
            self.module.save()    

        return super().delete(*args, **kwargs)
        
