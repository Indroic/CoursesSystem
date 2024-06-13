from django.contrib import admin
from .models import Course, Lesson

class CoursesAdmin(admin.ModelAdmin):
    model = Course
    search_fields = ('name', 'uploaded_by__username')
    list_display = ('name',  'level', 'miniature', 'num_lessons', 'uploaded_by')

    fieldsets = (
        ("Details", {'fields': ('name', 'description', 'level', 'miniature', 'uploaded_by') } ),)
    
    list_filter = ('level', 'uploaded_by')

class LessonAdmin(admin.ModelAdmin):
    model = Lesson
    list_display = ('title', 'created_at', 'course')
    search_fields = ('title', 'course__name', 'course__uploaded_by__username')

    fieldsets = (
        ("Details", {'fields': ('title', 'description', 'miniature', 'video', 'course') } ),
    )

    list_filter = ('updated_at', 'created_at', 'course')

    def save_model(self, request, obj: Lesson, form, change):
        if not change:
            obj.course.num_lessons += + 1
            obj.course.save()

        return super().save_model(request, obj, form, change)

    


admin.site.register(Course, CoursesAdmin)
admin.site.register(Lesson, LessonAdmin)
