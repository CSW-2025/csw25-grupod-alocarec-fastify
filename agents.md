# agents.md

## Visão Geral do Projeto

Este projeto é uma API de alocação de recursos acadêmicos, construída com Fastify, TypeScript e PostgreSQL (Prisma). Ele possui autenticação JWT, perfis de usuário (Admin, Professor, Aluno, Coordenador) e endpoints protegidos por perfil.

## Como rodar o projeto

1. **Suba os containers com Docker:**
   ```bash
   docker-compose up --build
   ```

2. **Certifique-se de ter um arquivo `.env` baseado no `.env.example`.**

3. **Acesse a documentação Swagger:**  
   [http://localhost:3000/documentation/static/index.html](http://localhost:3000/documentation/static/index.html)

## Usuário Admin Padrão

- **Email:** `admin@admin.com`
- **Senha:** `admin123`
- **Perfil:** Admin

Esse usuário é criado automaticamente pelo seed do banco.

## Autenticação

- A API utiliza JWT.
- Para acessar endpoints protegidos, obtenha um token via:
  ```
  POST /usuarios/login
  {
    "email": "admin@admin.com",
    "senha": "admin123"
  }
  ```
- Use o token retornado no header:
  ```
  Authorization: Bearer <token>
  ```

## Perfis e Permissões

- **Admin:** acesso total a todos os endpoints.
- **Professor, Coordenador, Aluno:** acesso restrito conforme middleware de cada rota.

## Testes Automatizados

- Os testes utilizam Jest.
- Para rodar os testes:
  ```bash
  npm test
  ```
- Os testes de controller de pedidos (`__tests__/domains/pedido/pedido.controller.spec.ts`) fazem login via endpoint `/usuarios/login` e usam o token real do admin.
- Os mocks dos serviços devem refletir o retorno real da API (datas como string, ids nulos como 0).

## Dicas para Agentes Codex/IA

- Sempre use o endpoint `/usuarios/login` para obter tokens válidos.
- Para criar, atualizar ou deletar recursos, use o token do admin.
- Se precisar de outros perfis, crie usuários via endpoint `/usuarios` e faça login.
- Os testes devem ser rodados em ambiente limpo, com banco seedado.
- Se encontrar erro 403, verifique se o token está correto e se o payload do JWT inclui o perfil esperado.

## Estrutura de Diretórios

- `src/domains/`: Domínios da aplicação (usuario, pedido, recurso, etc).
- `src/config/`: Configurações globais (JWT, banco, etc).
- `__tests__/`: Testes automatizados.
- `prisma/seed.ts`: Script de seed do banco.

---

**Este arquivo serve para orientar agentes automáticos (Codex, ChatGPT, etc) sobre como analisar, subir e validar o código deste projeto.** 