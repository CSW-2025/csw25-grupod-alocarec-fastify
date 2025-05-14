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
## Certifique-se de ter um arquivo `.env` baseado no `.env.example`.


Obter token usuario admin pre criado
http://localhost:3000/documentation/static/index.html#/usuarios/post_usuarios_login
{
  "email": "admin@admin.com",
  "senha": "admin123"
}