import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Não conecta automaticamente em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  prisma.$connect()
    .then(() => console.log('Conexão com o banco de dados estabelecida!'))
    .catch((err: unknown) => {
      console.error('Erro ao conectar com o banco de dados:', err);
      process.exit(1);
    });
}

export { prisma };
