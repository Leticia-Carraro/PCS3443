# Clube de Aviação 
Esse trabalho foi estruturado para a disciplina de PCS 3443. 

O objetivo foi desenvolver um sistema para uma escola de aviação a partir de certos requisitos. 
As ferramentas utilizadas foram Next e Prisma.

## Arquivos importantes
### Prisma
Prisma é um ORM(Object Relational Mapper) que consiste de três partes: 
* Prisma Client: Auto generado é um construtor de queries
* Prisma Migrate: Sistema de Migração
* Prisma Studio: GUI para visualizar e editar a database
Para criação das tabelas, basta escrever sua estrtura no arquivo de schema, conectar ao database e migrar - as queries executadas podm ser vistas no arquivo e migrations.

WIP falta complementar