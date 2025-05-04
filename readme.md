# Aloca Rec

Este é um projeto usando o framework Fastify com TypeScrip e PostgreSQL com Prisma. 

## ✅ Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

# Opcional
- [Node.js](https://nodejs.org/) (caso queira rodar comandos locais, como `npm run`)

## 🚀 Como rodar o projeto

1. **Suba os containers com Docker:**

```bash
docker-compose up --build
```

2. **Execute a migração inicial:**

- Se tiver o Node e o NPM instalados:
```bash
npm run migrate init
```
-  Caso contrário: 
```bash
docker compose exec app npx prisma migrate dev --name init
```

## Certifique-se de ter um arquivo `.env` baseado no `.env.example`.
