# Aloca Rec - Guia de Instalação e Teste (faça o passo a passo para chegar no Frontend)

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
## 📁 Arquitetura do Frontend

O frontend foi desenvolvido com **Next.js 14** seguindo as melhores práticas de arquitetura moderna:

### **Tecnologias Utilizadas:**
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **CSS Modules** - Estilos modulares para evitar conflitos
- **JWT** - Autenticação baseada em tokens

### **Estrutura de Pastas:**
```
web/
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── layout.tsx         # Layout principal da aplicação
│   │   ├── page.tsx           # Página inicial (Dashboard)
│   │   ├── login/             # Página de login
│   │   ├── logout/            # Página de logout
│   │   ├── usuarios/          # Gestão de usuários
│   │   ├── salas/             # Gestão de salas
│   │   ├── recursos/          # Gestão de recursos
│   │   └── reservas/          # Gestão de reservas
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Button/           # Botões customizados
│   │   ├── Card/             # Cards de conteúdo
│   │   ├── Input/            # Campos de entrada
│   │   ├── Loading/          # Indicadores de carregamento
│   │   ├── ErrorMessage/     # Mensagens de erro
│   │   └── HeaderNav/        # Navegação principal
│   ├── views/                # Views/Formulários específicos
│   │   ├── LoginForm.tsx     # Formulário de login
│   │   ├── ReservasForm.tsx  # Formulário de reservas
│   │   ├── SalasForm.tsx     # Formulário de salas
│   │   ├── UsuariosForm.tsx  # Formulário de usuários
│   │   ├── RecursosForm.tsx  # Formulário de recursos
│   │   └── ReservaTableView.tsx # Tabela de reservas
│   ├── helpers/              # Utilitários e configurações
│   │   ├── api.ts           # Configuração da API
│   │   └── auth.ts          # Gerenciamento de autenticação
│   └── @types/              # Definições de tipos TypeScript
└── public/                  # Arquivos estáticos
```

### **Padrões de Arquitetura:**

#### **1. Componentização Modular**
- Componentes pequenos e reutilizáveis
- Separação clara entre lógica e apresentação
- Props tipadas com TypeScript

#### **2. CSS Modules**
- Estilos encapsulados por componente
- Evita conflitos de nomes de classes
- Melhora a manutenibilidade

#### **3. Proteção de Rotas**
- Hook personalizado `useAuth` para gerenciar autenticação
- Componente `ProtectedRoute` para proteger páginas
- Redirecionamento automático para login

#### **4. Gerenciamento de Estado**
- React Hooks para estado local
- Context API para estado global (quando necessário)
- Estado de loading e erro em cada componente

#### **5. Tratamento de Erros**
- Try/catch em chamadas de API
- Estados de erro visuais para o usuário
- Logs de erro para debug

#### **6. Responsividade**
- Design mobile-first
- CSS flexbox e grid
- Componentes adaptáveis

### **Fluxo de Autenticação:**
1. Usuário acessa página protegida
2. `ProtectedRoute` verifica token
3. Se não autenticado, redireciona para `/login`
4. Após login bem-sucedido, redireciona para página original
5. Token é armazenado em cookie seguro

### **Comunicação com API:**
- Axios ou fetch para requisições HTTP
- Headers de autorização automáticos
- Interceptors para tratamento de erros 401
- Base URL configurável via variáveis de ambiente

## 🔧 Comandos Úteis

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

<<<<<<< HEAD
**Desenvolvido para a disciplina de Construção de Software - 2025** 
=======
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
>>>>>>> e546d3bf7102accf9d18a86df502467ba65365ec
