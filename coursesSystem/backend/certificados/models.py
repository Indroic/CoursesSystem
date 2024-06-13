import uuid
from django.db import models
from django.conf import settings
from exams.models import Exam
from courses.models import Course
# Create your models here.


class ExamRealized(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)

    user =  models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    date = models.DateTimeField(auto_now=True, editable=False)


    def __str__(self):
        return f"{self.user} - {self.exam} - {self.date}"


class Certificate(models.Model):
    id  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    examrealized = models.ForeignKey(ExamRealized, on_delete=models.CASCADE)

    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    date = models.DateTimeField( auto_now=True, editable=False)


    def __str__(self):
        return f"{self.user} - {self.course} - {self.date}"