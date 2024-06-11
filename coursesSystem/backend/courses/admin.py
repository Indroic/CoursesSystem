from django.contrib import admin
from .models import Course, Lesson



class LessonAdmin(admin.ModelAdmin):
    model = Lesson
    list_display = ('title', 'description', 'created_at', 'course')

    fieldsets = (
        ("Details", {'fields': ('title', 'description', 'miniature', 'video', 'course') } ),
    )

    list_filter = ('updated_at', 'created_at', 'course')

    def save_model(self, request, obj: Lesson, form, change):
        if not change:
            obj.course.num_lessons += + 1
            obj.course.save()

        return super().save_model(request, obj, form, change)
class CoursesAdmin(admin.ModelAdmin):
    model = Course

    list_display = ('name', 'description', 'level', 'miniature', 'num_lessons', 'uploaded_by')

    fieldsets = (
        ("Details", {'fields': ('name', 'description', 'level', 'miniature', 'uploaded_by') } ),)
    
    list_filter = ('level', 'uploaded_by')
    


admin.site.register(Course, CoursesAdmin)
admin.site.register(Lesson, LessonAdmin)
