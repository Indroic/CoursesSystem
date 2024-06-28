import uuid
import os
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from exams.models import Exam
from courses.models import Course

from .utils import generar_pdf
# Create your models here.



class ExamRealized(models.Model):
    id = models.UUIDField(primary_key=True, 
                          default=uuid.uuid4,
                          editable=False)
    
    exam = models.ForeignKey(Exam, 
                             on_delete=models.CASCADE, 
                             verbose_name=_("Exam"))

    user =  models.ForeignKey(settings.AUTH_USER_MODEL, 
                              on_delete=models.CASCADE, 
                              verbose_name=_("User"))

    date = models.DateTimeField(auto_now=True, 
                                editable=False,
                                verbose_name=_("Date"))
    
    class Meta:
        verbose_name = _("Exam Realized")
        verbose_name_plural = _("Exams Realized")

    def __str__(self):
        return f"{self.user} - {self.exam} - {self.date}"


class Certificate(models.Model):
    id  = models.UUIDField(primary_key=True, 
                           default=uuid.uuid4, 
                           editable=False)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, 
                             on_delete=models.CASCADE, 
                             verbose_name=_("User"))

    examrealized = models.ForeignKey(ExamRealized, 
                                     on_delete=models.CASCADE, 
                                     verbose_name=_("Exam Realized"))

    course = models.ForeignKey(Course, 
                               on_delete=models.CASCADE, 
                               verbose_name=_("Course"))

    pdf = models.FileField(upload_to="certificates/", 
                           null=True, 
                           blank=True, 
                           editable=False,
                           verbose_name=_("PDF"))

    date = models.DateTimeField(auto_now=True, 
                                editable=False,
                                verbose_name=_("Date"))
    
    class Meta:
        verbose_name = _("Certificate")
        verbose_name_plural = _("Certificates")

    def __str__(self):
        return f"{self.user} - {self.course} - {self.date}"
    

    def save(self, *args, **kwargs):

       pdf = generar_pdf(self.user, self.course)

       self.pdf = pdf

       super().save(*args, **kwargs)