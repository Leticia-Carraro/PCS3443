from django.db import models

class Funcionario(models.Model):
    id_funcionario = models.Index()
    nome = models.CharField(max_lenght = 100)
    cpf = models.CharField(max_length = 11)
    data_nascimento = models.DateField()
    endereco = models.CharField(max_length = 100)
    

class Maintenance(models.Model):
    plane = models.ForeingKey("planes.Plane", on_delete = models.CASCADE)
    date = models.DateField()
    
    class Meta:
        constraints =[
            models.UniqueConstraint(fields=["date", "plane"], name = "uq_%(app_label)s_%(class)s_date")
        ]
