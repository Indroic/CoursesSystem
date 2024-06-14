import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _


from courses.models import Course


# Create your models here.
class Exam(models.Model):
    id = models.UUIDField(primary_key=True, 
                          default=uuid.uuid4, 
                          editable=False)

    title = models.CharField(max_length=200, 
                             blank=False,
                             null=False,
                             verbose_name=_("Title"))
    
    course = models.ForeignKey(Course, 
                               on_delete=models.CASCADE, 
                               related_name='exams',
                               verbose_name=_("Course"))

    num_questions = models.IntegerField(default=0, 
                                        editable=False,
                                        verbose_name=_("Number of Questions"))

    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name=_("Created At"))

    updated_at = models.DateTimeField(auto_now=True,
                                      verbose_name=_("Updated At"))

    class Meta:
        verbose_name = _("Exam")
        verbose_name_plural = _("Exams")

    def __str__(self):
        return f"{self.title}, {self.course}"


class Question(models.Model):
    id = models.UUIDField(primary_key=True, 
                          default=uuid.uuid4, 
                          editable=False)

    exam = models.ForeignKey(Exam, 
                             on_delete=models.CASCADE, 
                             related_name='questions',
                             verbose_name=_("Exam"))
    
    question = models.CharField(max_length=5000,
                                verbose_name=_("Question"))
    
    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name=_("Created At"))
    
    updated_at = models.DateTimeField(auto_now=True,
                                      verbose_name=_("Updated At"))
    
    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")

    def __str__(self):
        return f"{self.question}, {self.exam}"

    def delete(self, *args, **kwargs):
        if self.exam.num_questions > 0:
            self.exam.num_questions -= 1
            self.exam.save()
        return super().delete(*args, **kwargs)


class Option(models.Model):
    id = models.UUIDField(primary_key=True, 
                          default=uuid.uuid4, 
                          editable=False)

    question = models.ForeignKey(Question, 
                                 on_delete=models.CASCADE, 
                                 related_name='options',
                                 verbose_name=_("Question"))
    
    content = models.CharField(max_length=10000,
                               verbose_name=_("Content"))

    is_correct = models.BooleanField(default=False,
                                     verbose_name=_("Is Correct"))

    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name=_("Created At"))
    updated_at = models.DateTimeField(auto_now=True,
                                      verbose_name=_("Updated At"))
    
    class Meta:
        verbose_name = _("Option")
        verbose_name_plural = _("Options")

    def __str__(self):
        return f"{self.content}, {self.question}"