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

First, run the development server:

```bash
ln .env.docker .env
npm instal
docker compose -f docker-compose.yml up -d
npx prisma migrate deploy
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

After that you could acess database with
```
npx prisma studio
```
