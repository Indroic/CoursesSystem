import uuid
from django.db import models
from django.conf import settings
from exams.models import Exam
from courses.models import Course
# Create your models here.


class ExamRealizado(models.Model):
    id = models.UUIDField(primary_key=True, editable=False)
    
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)

    user =  models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    date = models.DateTimeField(auto_now=True, editable=False)


class Certificado(models.Model):
    id  = models.UUIDField(primary_key=True, editable=False)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    examrealizado = models.ForeignKey(ExamRealizado, on_delete=models.CASCADE)

    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    date = models.DateTimeField( auto_now=True, editable=False)

