import uuid
import os
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

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
    
    
    id = models.UUIDField(primary_key=True, 
                          default=uuid.uuid4, 
                          editable=False)
    
    
    name = models.CharField(max_length=200, 
                            unique=True, 
                            null=False, 
                            blank=False,
                            verbose_name=_('Name of Course'))
    
    
    description = models.CharField(max_length=10000,
                                   unique=False, 
                                   null=False, 
                                   blank=False,
                                   verbose_name=_('Course Description'))
    
    
    level = models.CharField(max_length=20, 
                             unique=False, 
                             null=False, 
                             blank=False, 
                             default=_("Initial"), 
                             choices=((_("Initial"), _("Initial")),
                                      (_("Medium"), _("Medium")),
                                      (_("Advanced"), _("Advanced"))),
                             verbose_name=_('Course Level'))
    
    
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, 
                                    on_delete=models.CASCADE, 
                                    related_name='courses',
                                    verbose_name=_('Uploaded by'))
    
    
    miniature = models.ImageField(upload_to=generar_nombre_miniatura, 
                                  blank=False, 
                                  null=False, 
                                  default="miniatures/default.jpg",
                                  verbose_name=_('Miniature'))
    
    
    num_lessons = models.IntegerField(default=0,
                                      editable=False,
                                      verbose_name=_('Number of Lessons'))
    
    
    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name=_('Created at'))
    
    
    updated_at = models.DateTimeField(auto_now=True,
                                      verbose_name=_('Updated at'))


    class Meta:
        verbose_name = _('Course')
        verbose_name_plural = _('Courses')


    def __str__(self):
        return self.name + " - " + self.uploaded_by.username
    
    def delete(self, *args, **kwargs):
        if self.miniature.path != settings.DEFAULT_MINIATURE:
            try:
                os.remove(self.miniature.path)
            except FileNotFoundError:
                pass

        return super().delete(*args, **kwargs)



class Lesson(models.Model):
    
    
    id = models.UUIDField(primary_key=True, 
                          default=uuid.uuid4, 
                          editable=False)
    
    
    title = models.CharField(max_length=500,
                             unique=True, 
                             null=False, 
                             blank=False,
                             verbose_name=_('Title'))
    
    
    description = models.CharField(max_length=10000,
                                   unique=False, 
                                   null=False, 
                                   blank=False,
                                   verbose_name=_('Description'))
    
    
    course = models.ForeignKey(Course, 
                               on_delete=models.CASCADE, 
                               related_name='Lessons',
                               verbose_name=_('Course'))
    
    
    miniature = models.ImageField(upload_to=generar_nombre_miniatura, 
                                  blank=False, 
                                  null=False, 
                                  default="miniatures/default.jpg",
                                  verbose_name=_('Miniature'))


    video = models.FileField(upload_to=generar_nombre_video, 
                             blank=True, 
                             null=True,
                             verbose_name=_('Video'))


    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name=_('Created at'))
    
    
    updated_at = models.DateTimeField(auto_now=True,
                                      verbose_name=_('Updated at'))
    
    class Meta:
        verbose_name = _('Lesson')
        verbose_name_plural = _('Lessons')

    def __str__(self):
        return self.title + " - " + self.course.name + " - " + self.course.uploaded_by.username


    def delete(self, *args, **kwargs):

        if self.miniature.path != settings.DEFAULT_MINIATURE:
            try:
                os.remove(self.miniature.path)
            except FileNotFoundError:
                pass

        try:
            os.remove(self.video.path)
        except Exception as e:
            pass



        if self.course.num_lessons <= 0:
            return super().delete(*args, **kwargs)
        
        self.course.num_lessons -= 1
        
        self.course.save()
        
        

        return super().delete(*args, **kwargs)
    