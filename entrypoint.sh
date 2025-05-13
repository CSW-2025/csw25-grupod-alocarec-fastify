#!/bin/sh
# filepath: ./entrypoint.sh

# Aguarda o banco de dados estar pronto
until npx prisma db wait; do
  echo "Aguardando o banco de dados ficar pronto..."
  sleep 2
done

# Executa as migrations do Prisma
npx prisma migrate dev --name init

# Inicia a aplicação (ajuste conforme seu start)
npm run dev