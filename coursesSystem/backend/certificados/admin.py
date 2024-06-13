from django.contrib import admin
from .models import Certificate, ExamRealized

class CertificateAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'course', 'examrealized', 'date')
    list_display_links = ('id', 'user', 'course', 'examrealized', 'date')
    list_filter = ('user', 'course', 'examrealized', 'date')
    search_fields = ('user__username', 'course__name', "id", "date")


class ExamRealizedAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'exam', 'date')
    list_display_links = ('id', 'user', 'exam', 'date')
    list_filter = ('user', 'exam', 'date')
    search_fields = ('user__username', 'exam__title', "id", "date")



admin.site.register(Certificate, CertificateAdmin)
admin.site.register(ExamRealized, ExamRealizedAdmin)

