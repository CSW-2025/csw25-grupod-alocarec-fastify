#!/bin/bash
# Atualiza o sistema
dnf update -y

# Instala o Docker
dnf install -y docker
systemctl start docker
systemctl enable docker
usermod -aG docker ec2-user

# Instala o Git
dnf install -y git

# Instala o Docker Compose (versão binária mais recente)
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Clona o repositório e executa com Docker Compose
cd /home/ec2-user
git clone https://github.com/jpsalles21/csw25-grupod-alocarec-fastify.git
cd csw25-grupod-alocarec-fastify
cp .env.example .env

docker-compose up -d

