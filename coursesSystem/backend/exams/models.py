import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _


from courses.models import Course


# Create your models here.
class Exam(models.Model):
    """ Modelo de definicion de Examenes """
    # campo id
    id = models.UUIDField(primary_key=True, 
                          default=uuid.uuid4, 
                          editable=False)
    
    # Titulo
    title = models.CharField(max_length=200, 
                             blank=False,
                             null=False,
                             verbose_name=_("Title"))
    
    # Curso al que pertenece el examen
    course = models.ForeignKey(Course, 
                               on_delete=models.CASCADE, 
                               related_name='courses',
                               unique=False,
                               null=False,
                               blank=False,
                               verbose_name=_("Course"))

    # Numero de preguntas que tiene un examen
    num_questions = models.IntegerField(default=0, 
                                        editable=False,
                                        verbose_name=_("Number of Questions"))
    
    # Fecha de creacion
    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name=_("Created At"))
    
    # Fecha de actualizacion
    updated_at = models.DateTimeField(auto_now=True,
                                      verbose_name=_("Updated At"))


    class Meta:
        """Metadatos del modelo Exam"""

        # Nombre del Modelo
        verbose_name = _("Exam")

        # Nombre plural
        verbose_name_plural = _("Exams")

    # Retorna el titulo del examen junto con el curso al que pertenece
    def __str__(self):
        return f"{self.title}, {self.course}"


class Question(models.Model):
    """Modelo de definicion de Preguntas"""

    # campo id
    id = models.UUIDField(primary_key=True, 
                          default=uuid.uuid4, 
                          editable=False)

    # Examen al que pertenece la pregunta
    exam = models.ForeignKey(Exam, 
                             on_delete=models.CASCADE, 
                             related_name='questions',
                             verbose_name=_("Exam"))
    
    # Contenido de la pregunta
    question = models.CharField(max_length=5000,
                                verbose_name=_("Question"))
    
    # Creacion
    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name=_("Created At"))
    
    # Actualizacion
    updated_at = models.DateTimeField(auto_now=True,
                                      verbose_name=_("Updated At"))
    

    class Meta:
        """Metadatos del modelo Question"""

        # Nombre del modelo
        verbose_name = _("Question")

        # Nombre plural
        verbose_name_plural = _("Questions")

    # Retorna la pregunta junto con el examen
    def __str__(self):
        return f"{self.question}, {self.exam}"


    # Esta funcion se encarga de reducirle la cantidad de preguntas que tiene un examen cada vez que se borre una pregunta
    def delete(self, *args, **kwargs):

        # verifica que el numero sea mayor a 0
        if self.exam.num_questions > 0:

            # disminuye el numero de preguntas
            self.exam.num_questions -= 1

            # actualiza el examen
            self.exam.save()

        # Ejecuta la funcion original
        return super().delete(*args, **kwargs)


class Option(models.Model):
    """Modelo de definicion de Opciones"""

    # campo id
    id = models.UUIDField(primary_key=True, 
                          default=uuid.uuid4, 
                          editable=False)


    # Pregunta a la que pertenece la opcion
    question = models.ForeignKey(Question, 
                                 on_delete=models.CASCADE, 
                                 related_name='options',
                                 verbose_name=_("Question"))
    
    # Contenido
    content = models.CharField(max_length=10000,
                               verbose_name=_("Content"))

    # Es correcta
    is_correct = models.BooleanField(default=False,
                                     verbose_name=_("Is Correct"))
    
    # Creacion
    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name=_("Created At"))
    
    # Actualizacion
    updated_at = models.DateTimeField(auto_now=True,
                                      verbose_name=_("Updated At"))
    
    class Meta:
        """Metadatos del modelo Option"""

        # Nombre del modelo
        verbose_name = _("Option")

        # Nombre plural
        verbose_name_plural = _("Options")

    
    # Retorna la opcion junto con la pregunta
    def __str__(self):
        return f"{self.content}, {self.question}"