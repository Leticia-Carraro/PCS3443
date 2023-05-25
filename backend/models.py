from django.db import models

class Plane(models.Model):
    plane = models.CharField(max_lenght = 100, unique = True)

class Maintenance(models.Model):
    plane = models.ForeingKey("planes.Plane", on_delete = models.CASCADE)
    date = models.DateField()
    
    class Meta:
        constraints =[
            models.UniqueConstraint(fields=["date", "plane"], name = "uq_%(app_label)s_%(class)s_date")
        ]