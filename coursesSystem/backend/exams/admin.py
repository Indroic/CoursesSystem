from django.contrib import admin

from .models import Exam, Question, Option


class ExamAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'num_questions')
    list_filter = ('title', 'course', 'num_questions')
    search_fields = ('title', 'num_questions', 'course__name', 'course__uploaded_by__username')

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('exam', 'question')
    
    list_filter = ('exam', 'question')
    
    search_fields = ('exam__title', 'question')


    def save_model(self, request, obj: Question, form, change):
        if not change:
            obj.exam.num_questions += 1
            obj.exam.save()

        return super().save_model(request, obj, form, change)

class OptionAdmin(admin.ModelAdmin):
    list_display = ('question', 'content', 'is_correct')
    list_filter = ('question', 'is_correct')
    search_fields = ('question__question', 'content')




admin.site.register(Exam, ExamAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Option, OptionAdmin)





# Register your models here.
