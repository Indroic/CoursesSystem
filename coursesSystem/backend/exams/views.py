from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .serializers import ExamSerializer, QuestionSerializer, OptionSerializer
from .models import Exam, Question, Option
from .permissions import(CanAddExam, 
                         CanDeleteQuestion, 
                         CanChangeExam, 
                         CanAddOption, 
                         CanDeleteExam, 
                         CanAddQuestion, 
                         CanChangeOption, 
                         CanDeleteOption, 
                         CanChangeQuestion)

class ExamViewSet(ModelViewSet):
    """ Endpoint para ver, crear, actualizar y borrar Examenes """

    # Serializador para Examenes
    serializer_class = ExamSerializer

    # Queryset para Examenes
    queryset = Exam.objects.all()

    search_fields = ['title', 'course__name', 'course__uploaded_by__username', 'course__id', 'id']

    # Permisos
    def get_permissions(self):

        # Permisos para Examenes
        permission_classes = [IsAuthenticated]

        if self.action == "list" or self.action == "retrieve":
            permission_classes = []

        # Condicion para agregar un permiso cuando se intente crear un examen
        if self.action == "create":
            permission_classes.append(CanAddExam)

        # Condicion para agregar un permiso cuando se intente borrar un examen
        if self.action == "update" or self.action == "partial_update":
            permission_classes.append(CanChangeExam)

        # Condicion para agregar un permiso cuando se intente borrar un examen
        if self.action == "destroy":
            permission_classes.append(CanDeleteExam)

        return [permission() for permission in permission_classes]



class QuestionViewSet(ModelViewSet):
    """ Endpoint para ver, crear, actualizar y borrar Preguntas """

    # Serializador para Preguntas
    serializer_class = QuestionSerializer

    # Queryset para Preguntas
    queryset = Question.objects.all()

    search_fields = ['question', 'exam__title', 'exam__course__name', 'exam__course__uploaded_by__username', 'exam__id', 'id']

    # Funcion para crear Preguntas
    def create(self, request, *args, **kwargs):

        # Ejecuta la funcion original
        funcion_principal = super().create(request, *args, **kwargs)
        
        # Verifica que la creacion de la pregunta sea exitosa
        if funcion_principal.status_code == 201:
            
            # Aumenta el numero de preguntas en el examen
            exam = Exam.objects.get(id=request.data["exam"])

            # actualiza el examen
            exam.num_questions += 1
            exam.save()
        

        return funcion_principal


    # Permisos
    def get_permissions(self):

        # Permisos para Examenes
        permission_classes = [IsAuthenticated]

        if self.action == "list" or self.action == "retrieve":
            permission_classes = []


        # Condicion para agregar un permiso cuando se intente crear un examen
        if self.action == "create":
            permission_classes.append(CanAddQuestion)

        # Condicion para agregar un permiso cuando se intente borrar un examen
        if self.action == "update" or self.action == "partial_update":
            permission_classes.append(CanChangeQuestion)

        # Condicion para agregar un permiso cuando se intente borrar un examen
        if self.action == "destroy":
            permission_classes.append(CanDeleteQuestion)


        return [permission() for permission in permission_classes]
    


class OptionViewSet(ModelViewSet):
    """ Endpoint para ver, crear, actualizar y borrar Opciones """

    # Serializador para Opciones
    serializer_class = OptionSerializer
    
    # Queryset para Opciones
    queryset = Option.objects.all()

    search_fields = ['content', 'question__question', 'question__exam__title', 'question__exam__course__name', 'question__exam__course__uploaded_by__username', 'question__exam__id', 'question__id', 'id']

    # Permisos
    def get_permissions(self):

        # Permisos para Examenes
        permission_classes = [IsAuthenticated]

        if self.action == "list" or self.action == "retrieve":
            permission_classes = []


        # Condicion para agregar un permiso cuando se intente crear un examen
        if self.action == "create":
            permission_classes.append(CanAddOption)

        # Condicion para agregar un permiso cuando se intente borrar un examen
        if self.action == "update" or self.action == "partial_update":
            permission_classes.append(CanChangeOption)

        # Condicion para agregar un permiso cuando se intente borrar un examen
        if self.action == "destroy":
            permission_classes.append(CanDeleteOption)

        return [permission() for permission in permission_classes]