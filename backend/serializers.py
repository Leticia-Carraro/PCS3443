from django.utils import timezone
from rest_framework import serializers
from .models import Maintenance, Plane

class CurrentViewKwargs:
    requires_context = True
    def __init__(self, kwargs_key) -> None:
        self._kwargs_key = kwargs_key
    def __call__(self, field):
        return field.context["view"].kwargs[self._kwargs_key]
    def __repr__(self) -> str:
        return f"{self.__clas__.__name__}({self._kwargs_key})"


class MaintenanceSerializer(serializers.ModelSerializer):
    plane_id = serializers.HiddenField(default = CurrentViewKwargs("pk"))
    class Meta:
        model = Maintenance
        fields = ["id", "plane_id", "date"]
    def validate_date(self, value):
        if value > timezone.now().date():
            raise serializers.ValidationError("Date can not be in the future")
        return value

class PlaneSerializer(serializers.ModelSerializer):
    maintenace_set = MaintenanceSerializer(many = True, read_only = True)
    class Meta:
        model = Plane
        fields = ["id", "name", "maintenance_set"]

# test commit