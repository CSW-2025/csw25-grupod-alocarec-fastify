FROM node:22-slim

# Instalar dependências necessárias, incluindo o OpenSSL
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npx prisma generate

