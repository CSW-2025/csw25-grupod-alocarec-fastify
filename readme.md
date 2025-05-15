# Aloca Rec

Este é um projeto usando o framework Fastify com TypeScrip e PostgreSQL com Prisma. 

# Participantes do grupo
Nathan Dame Abreu
Thales Xavier Caceres
Giuliano Roy Pontello
Leonardo Bertoletti
João Pedro Salles

https://github.com/jpsalles21/csw25-grupod-alocarec-fastify.git

## ✅ Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

# Opcional
- [Node.js](https://nodejs.org/) (caso queira rodar comandos locais, como `npm run`)

- Para criar uma instância na AWS usando este projeto, você precisará instalar algumas ferramentas adicionais:

- [AWS CLI](https://aws.amazon.com/cli/) (para autenticação e gerenciamento de recursos AWS)
- [Terraform](https://www.terraform.io/downloads) (para provisionar a infraestrutura como código)

## 🚀 Como rodar o projeto localmente

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

**Como rodar o projeto no EC2**
  
> Para acessar a instância EC2 criada, é necessário um par de chaves SSH.  
> Gere um par de chaves com o comando abaixo (caso ainda não tenha) e coloque o arquivo `T1API.pub` (chave pública) na pasta `infra`:
>
> ```bash
> ssh-keygen -t rsa -b 4096 -f infra/T1API
> ```
> 
> O arquivo `T1API` será sua chave privada (guarde com segurança) e `T1API.pub` será usada pelo Terraform.

1. Instale o AWS CLI e o Terraform em sua máquina.
2. Configure suas credenciais AWS:
   - Copie o arquivo `.env.aws.example` para `.env.aws`:
     ```bash
     cp .env.aws.example .env.aws
     ```
   - Preencha as variáveis com suas credenciais AWS.
   - Execute o script para configurar as credenciais:
     ```powershell
     ./set-aws-creds.ps1
     ```
3. Siga as instruções do Terraform para provisionar a infraestrutura:
   ```bash
   cd infra

   terraform init #Inicializa o diretório do Terraform, baixando os plugins necessários e preparando o ambiente para uso.
  
   terraform plan #Este comando mostra um plano de execução, detalhando todas as ações que o Terraform realizará para criar, atualizar ou destruir recursos na infraestrutura antes de aplicar qualquer alteração.

   terraform apply #Aplica as mudanças planejadas, criando, atualizando ou destruindo recursos conforme definido nos arquivos de configuração.
   ```

> **Obs:** O arquivo `.env.aws` não é versionado. Use sempre o `.env.aws.example` como modelo.
