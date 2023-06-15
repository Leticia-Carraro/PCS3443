from django.db import models
import uuid

class Usuario(models.Model):
    id_usuario = models.UUIDField(editable = False,
                                    default = uuid.uuid4 )
    username = models.CharField(max_length = 30, unique=True)
    password = models.CharField(max_length = 300)

class Funcionario(models.Model):
    id_funcionario = models.UUIDField(editable = False,
                                    default = uuid.uuid4 )
    nome = models.CharField(max_lenght = 100)
    cpf = models.CharField(max_length = 11)
    data_nascimento = models.DateField()
    endereco = models.CharField(max_length = 100)
    id_usuario = models.ForeignKey("usuario.Usuario", on_delete = models.DO_NOTHING)

class Maintenance(models.Model):
    plane = models.ForeingKey("planes.Plane", on_delete = models.CASCADE)
    date = models.DateField()
    
    class Meta:
        constraints =[
            models.UniqueConstraint(fields=["date", "plane"], name = "uq_%(app_label)s_%(class)s_date")
        ]