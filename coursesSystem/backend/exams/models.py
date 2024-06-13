import uuid
from django.db import models

from courses.models import Course


# Create your models here.
class Exam(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=200, blank=False, null=False)
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='exams')

    num_questions = models.IntegerField(default=0, editable=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self,):
        return f"{self.title}, {self.course}"


class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='questions')
    
    question = models.CharField(max_length=5000)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.question}, {self.exam}"


    def delete(self, *args, **kwargs):
        if self.exam.num_questions > 0:
            self.exam.num_questions -= 1
            self.exam.save()
        return super().delete(*args, **kwargs)


class Option(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    
    content = models.CharField(max_length=10000)

    is_correct = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

