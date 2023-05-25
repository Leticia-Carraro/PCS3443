from django.db import models

class Socio(models.Model):
    Categorias = models.TextChoices("Categorias", " ALUNO PILOTO INSTRUTOR")

    Matricula = models.CharField(max_lenght=100, unique=True)
    Categoria = models.CharField(choices=Categorias, max_length=10)
    Nome = models.CharField(max_lenght=100)
    CPF = models.CharField(max_lenght=11)
    Email = models.CharField(max_lenght=100)
    DataDeNascimento = models.DateField()
    Endereco = models.CharField(max_lenght=100)
    
    class Meta:
        abstract = True
        
class Aluno(Socio):
    Matricula = "ALUNO"
    NotaPonderada = models.FloatField()
    
class Piloto(Socio):
    Matricula = "PILOTO"
    Breve = models.CharField(max_length=100)
    
class Instrutor(Piloto):
    Matricula = "INSTRUTOR"
    NomeDoCurso = models.CharField(max_length=100)
    DataDiploma = models.DateField()
    Instituicao = models.CharField(max_length=100)
    
class Funcionario(models.Model):
    IdFuncionario = models.CharField(max_lenght=100, unique=True)
    Nome = models.CharField(max_lenght=100)
    CPF = models.CharField(max_lenght=11)
    DataDeNascimento = models.DateField()
    Endereco = models.CharField(max_lenght=100)
    
class Usuario(models.Model):
    Socio = models.OneToOneField(
        Socio,
        on_delete=models.CASCADE,
        primary_key=False
    )
    Funcionario = models.OneToOneField(
        Funcionario,
        on_delete=models.CASCADE,
        primary_key=False
    )
    Username = models.CharField(max_lenght=50, unique=True)
    Senha = models.CharField(max_lenght=50)
    
class Voo(models.Model):
    TipoConceitos = models.TextChoices("TipoConceitos", " A B C D")
    
    IdVoo = models.CharField(max_length=100, unique=True)
    Socio = models.ForeignKey(Socio, on_delete=models.CASCADE)
    Instrutor = models.ForeignKey(Instrutor, on_delete=models.CASCADE)
    Data = models.DateField()
    HorarioSaida = models.TimeField()
    HorarioChegada = models.TimeField()
    Parecer = models.CharField(choices=TipoConceitos, max_length=1)
