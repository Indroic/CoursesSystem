from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Course, Lesson, Module

class CoursesAdmin(admin.ModelAdmin):
    """ Modelo de Administracion de Cursos """

    # Modelo de Cursos
    model = Course

    # campos de Cursos al buscar
    search_fields = ('name', 'uploaded_by__username')

    # campos de Cursos al mostrar en el listado
    list_display = ('name',  'level', 'miniature', 'num_modules', 'uploaded_by')

    # Orden de Cursos en el listado
    fieldsets = (
        (_("Details"), {'fields': ('name', 'description', 'level', 'miniature', 'uploaded_by') } ),)
    
    # filtros de Cursos
    list_filter = ('level', 'uploaded_by')


class ModuleAdmin(admin.ModelAdmin):
    # modelos de Modulos
    model = Module

    # campos de Modulos al mostrar en el listado
    list_display = ('name', 'course', 'num_lessons')

    # campos de Modulos al buscar
    search_fields = ('name', 'course__name', 'course__uploaded_by__username')

    # filtros de Modulos
    list_filter = ('course', 'name')

    # Metodos
    def save_model(self, request, obj: Module, form, change):

        # aumenta el numero de modulos siempre y cuando no sea un cambio
        if not change:
            obj.course.num_modules += + 1
            obj.course.save()

        return super().save_model(request, obj, form, change)



class LessonAdmin(admin.ModelAdmin):
    # modelos de Lecciones
    model = Lesson

    # campos de Lecciones al mostrar en el listado
    list_display = ('title', 'created_at', 'module')

    # campos de Lecciones al buscar
    search_fields = ('title', 'module__name', 'module__course__uploaded_by__username')

    # Orden de Lecciones en el listado
    fieldsets = (
        (_("Details"), {'fields': ('title', 'description', 'miniature', 'video', 'module') } ),
    )

    # filtros de Lecciones
    list_filter = ('updated_at', 'created_at', 'module')

    # Metodos
    def save_model(self, request, obj: Lesson, form, change):

        # aumenta el numero de lecciones siempre y cuando no sea un cambio
        if not change:
            obj.module.num_lessons += + 1
            obj.module.save()

        return super().save_model(request, obj, form, change)

    

# Registra los modelos de administracion
admin.site.register(Course, CoursesAdmin)
admin.site.register(Module, ModuleAdmin)
admin.site.register(Lesson, LessonAdmin)
