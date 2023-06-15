from django.db import models
import uuid

class Usuario(models.Model):
    id_usuario = models.UUIDField(editable = False,
                                    default = uuid.uuid4 )
    username = models.CharField(max_length = 30, unique=True)
    password = models.CharField(max_length = 300)
    id_funcionario = models.ForeignKey("funcionario.Funcionario", 
                                       on_delete = models.DO_NOTHING,
                                       null = True)
    id_funcionario = models.ForeignKey("socio.Socio", 
                                       on_delete = models.DO_NOTHING,
                                       null = True)
    class Meta:
        indexes = [models.Index(fields=['id_usuario'])]

class Funcionario(models.Model):
    id_funcionario = models.UUIDField(editable = False,
                                    default = uuid.uuid4 )
    nome = models.CharField(max_lenght = 100)
    cpf = models.CharField(max_length = 11)
    data_nascimento = models.DateField()
    endereco = models.CharField(max_length = 100)
    class Meta:
        indexes = [ models.Index(fields=['id_funcionario']) ],
        ordering = ['nome']

class Voo(models.Model):
    id_voo = models.UUIDField(editable = False,
                                    default = uuid.uuid4 )
    data = models.DateField()
    horario_saida = models.TimeField()
    horario_chegada = models.TimeField()
    id_socio = models.ForeignKey("socio.Socio", on_delete= models.DO_NOTHING)
    id_instrutor = models.ForeignKey

class Socio(models.Model):
    matricula = models.AutoField(primary_key=True,
                                 editable=False)
    categoria = models.CharField(max_length=30)
    nome = models.CharField(max_lenght = 100)
    cpf = models.CharField(max_length = 11)
    data_nascimento = models.DateField()
    endereco = models.CharField(max_length = 100)
    id_usuario = models.ForeignKey("usuario.Usuario", on_delete = models.DO_NOTHING)
    email = models.EmailField(max_length=100)
    