from rest_framework.permissions import BasePermission
from .models import User
class isUser(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        
        if request.user != User.objects.get(id=view.kwargs["pk"]):
            return False
        
        return True