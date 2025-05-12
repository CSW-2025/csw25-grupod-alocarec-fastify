FROM node:22-slim AS builder

# Instalar dependências necessárias, incluindo o OpenSSL e build-essential para bcryptjs
RUN apt-get update -y && apt-get install -y openssl build-essential python3

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# Stage final
FROM node:22-slim

# Instalar apenas as dependências de runtime necessárias
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

CMD ["npm", "start"]
