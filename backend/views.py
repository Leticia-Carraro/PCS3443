from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet

from .models import Plane 
from .seriaizers import MaintenaceSerializer, PlaneSerializer
 
class PlaneViewSet(ModelViewSet):
    queryset = Plane.objects.all()
    serializer_class = PlaneSerializer
    
    def get_queryset(self):
        if self.action == "list":
            return self.queryset.prefetch_related("maintenance_set")
        return self.queryset
    
    @action(
        methods = ["POST"],
        detail = True,
        serializer_class = MaintenaceSerializer,
        url_path = "add-maintenance",
    )
    def add_maintenance(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)