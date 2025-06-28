# Aloca Rec - Guia de Instalação e Teste

Este é um projeto de sistema de alocação de recursos (salas e equipamentos) desenvolvido com Fastify, TypeScript, PostgreSQL e Prisma para o backend, e Next.js para o frontend.

## 👥 Participantes do Grupo
- Nathan Dame Abreu
- Thales Xavier Caceres
- Giuliano Roy Pontello
- Leonardo Bertoletti
- João Pedro Salles

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Docker](https://www.docker.com/) (versão 20.10 ou superior)
- [Docker Compose](https://docs.docker.com/compose/) (versão 2.0 ou superior)
- [Node.js](https://nodejs.org/) (versão 18 ou superior) - **OBRIGATÓRIO** para o frontend

## 🚀 Passo a Passo para Rodar o Projeto

### 1. Extraia o Arquivo ZIP
- Extraia o arquivo `csw25-grupod-alocarec-fastify.zip` em uma pasta de sua preferência
- Navegue até a pasta extraída:
```bash
cd csw25-grupod-alocarec-fastify
```

### 2. Configure o Ambiente
Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
```bash
cp .env.example .env
```

### 3. Suba o Backend (Docker)
```bash
docker-compose up --build
```

Aguarde alguns minutos para que o backend seja inicializado:
- **Backend API**: http://localhost:3000
- **Banco PostgreSQL**: localhost:5432
- **Documentação Swagger**: http://localhost:3000/documentation

### 4. Execute o Seed do Banco
Para popular o banco com dados iniciais:
```bash
docker-compose exec api npx prisma db seed
```

### 5. Configure e Rode o Frontend (Local)
Abra um **novo terminal** e navegue até a pasta do frontend:
```bash
cd web
npm install
npm run dev
```

O frontend estará disponível em: **http://localhost:3003**

## 👤 Usuários Pré-Criados para Teste

O sistema vem com 5 usuários pré-criados com diferentes perfis de acesso:

### 1. **Administrador** (Acesso Total)
- **Email**: `admin@admin.com`
- **Senha**: `senha123`
- **Perfil**: Admin
- **Permissões**: Acesso total ao sistema

### 2. **Coordenador** (Gestão Acadêmica)
- **Email**: `coordenador@coord.com`
- **Senha**: `senha123`
- **Perfil**: Coordenador
- **Permissões**: Gestão de turmas, disciplinas e currículos

### 3. **Professor** (Docente)
- **Email**: `professor@prof.com`
- **Senha**: `senha123`
- **Perfil**: Professor
- **Permissões**: Reservar salas e recursos, visualizar suas reservas

### 4. **Professor Miguel Xavier** (Docente)
- **Email**: `miguel.xavier@prof.com`
- **Senha**: `senha123`
- **Perfil**: Professor
- **Permissões**: Reservar salas e recursos, visualizar suas reservas

### 5. **Aluno** (Estudante)
- **Email**: `aluno@aluno.com`
- **Senha**: `senha123`
- **Perfil**: Aluno
- **Permissões**: Visualizar reservas, acesso limitado

## 🧪 Como Testar o Sistema

### 1. **Acesse o Frontend**
Abra seu navegador e acesse: http://localhost:3003

### 2. **Faça Login**
- Use qualquer um dos usuários listados acima
- O sistema irá redirecionar automaticamente para a página de login se não estiver autenticado

### 3. **Teste as Funcionalidades**

#### **Como Administrador** (`admin@admin.com`):
1. **Gestão de Usuários**: Acesse `/usuarios` para criar, editar e excluir usuários
2. **Gestão de Salas**: Acesse `/salas` para gerenciar salas e prédios
3. **Gestão de Recursos**: Acesse `/recursos` para gerenciar equipamentos
4. **Visualizar Reservas**: Veja todas as reservas do sistema na página inicial

#### **Como Professor** (`professor@prof.com`):
1. **Fazer Reservas**: Acesse `/reservas/nova` para criar novas reservas
2. **Visualizar Reservas**: Veja suas reservas na página inicial
3. **Gerenciar Recursos**: Acesse `/recursos` para ver equipamentos disponíveis

#### **Como Aluno** (`aluno@aluno.com`):
1. **Visualizar Reservas**: Veja as reservas disponíveis na página inicial
2. **Acesso Limitado**: Permissões restritas conforme perfil

### 4. **Teste a API Diretamente**
Acesse a documentação Swagger: http://localhost:3000/documentation

**Exemplo de Login via API:**
```bash
curl -X POST http://localhost:3000/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@admin.com",
    "senha": "senha123"
  }'
```

## 📋 Funcionalidades Disponíveis

### **Backend (API)**
- ✅ Autenticação JWT
- ✅ CRUD de Usuários
- ✅ CRUD de Salas
- ✅ CRUD de Recursos
- ✅ CRUD de Reservas
- ✅ CRUD de Prédios
- ✅ CRUD de Tipos de Recurso
- ✅ CRUD de Perfis
- ✅ CRUD de Turmas
- ✅ CRUD de Disciplinas
- ✅ CRUD de Currículos
- ✅ CRUD de Aulas

### **Frontend (Web)**
- ✅ Sistema de Login/Logout
- ✅ Dashboard com Reservas
- ✅ Formulário de Reservas
- ✅ Gestão de Salas
- ✅ Gestão de Recursos
- ✅ Gestão de Usuários
- ✅ Proteção de Rotas
- ✅ Tratamento de Erros

## 🐛 Solução de Problemas

### **Erro: "reservas.map is not a function"**
- **Causa**: Usuário não autenticado ou token expirado
- **Solução**: Faça login novamente ou verifique se o token está válido

### **Erro de Conexão com Banco**
- **Causa**: Container do PostgreSQL não inicializou
- **Solução**: Aguarde alguns minutos e tente novamente

### **Erro de Porta em Uso**
- **Causa**: Porta 3000 ou 3003 já está sendo usada
- **Solução**: Pare outros serviços ou altere as portas no `docker-compose.yml`

### **Erro no Frontend: "Cannot find module"**
- **Causa**: Dependências não instaladas
- **Solução**: Execute `npm install` na pasta `web`

### **Frontend não conecta com Backend**
- **Causa**: Backend não está rodando
- **Solução**: Verifique se o Docker está rodando e execute `docker-compose up`

## 🧪 Executando os Testes

```bash
# Instalar dependências do backend
npm install

# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

## 📁 Estrutura do Projeto

```
csw25-grupod-alocarec-fastify/
├── src/                    # Código fonte do backend
│   ├── domains/           # Domínios da aplicação
│   ├── config/            # Configurações
│   └── middleware/        # Middlewares
├── web/                   # Frontend Next.js (RODA LOCAL)
│   ├── src/
│   │   ├── app/          # Páginas da aplicação
│   │   ├── components/   # Componentes React
│   │   ├── views/        # Views/Formulários
│   │   └── helpers/      # Utilitários
├── prisma/               # Schema e migrações do banco
├── __tests__/           # Testes automatizados
└── infra/               # Configurações de infraestrutura
```

## 🔧 Comandos Úteis

### **Backend (Docker)**
```bash
# Parar os containers
docker-compose down

# Ver logs dos containers
docker-compose logs -f

# Acessar o container da API
docker-compose exec api sh

# Executar migrações do banco
docker-compose exec api npx prisma migrate dev

# Resetar o banco de dados
docker-compose exec api npx prisma migrate reset

# Gerar cliente Prisma
docker-compose exec api npx prisma generate
```

### **Frontend (Local)**
```bash
# Navegar para pasta do frontend
cd web

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar testes do frontend
npm test
```

## 📞 Suporte

Em caso de dúvidas ou problemas:
1. Verifique se todos os pré-requisitos estão instalados
2. Consulte os logs dos containers: `docker-compose logs`
3. Verifique se as portas não estão sendo usadas por outros serviços
4. Tente reiniciar os containers: `docker-compose down && docker-compose up --build`
5. Para problemas no frontend, verifique se o Node.js está instalado e execute `npm install` na pasta `web`

---

**Desenvolvido para a disciplina de Construção de Software - 2025** 